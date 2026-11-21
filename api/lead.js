// Website lead endpoint: form gate + presentation tracking → GoHighLevel (LeadConnector API v2),
// with the Google Sheet (Apps Script) as a backup. Secrets live in Vercel env vars only:
//   GHL_TOKEN        Private Integration token of the QUICKAISETUP LTD sub-account (Contacts: view + edit)
//   GHL_LOCATION_ID  nkZ6xULlicWYwPbLvEUx
import crypto from 'node:crypto';

const API = 'https://services.leadconnectorhq.com';
const VERSION = '2021-07-28';
const SHEET = 'https://script.google.com/macros/s/AKfycbzFvn6jZhTvPh9hrHAUTh_zI3_s-MeTufmi2P6fG5s8bvjqVyZ4coC0QrFC08_22XDEwA/exec';
// custom fields created in the QUICKAISETUP LTD sub-account on 2026-11-21
const CF = {
  businessType: 'waQhVczLhyPcidDKhOLD',
  answers: 'TKawfkUqq3nsQtgOurPj',
  progress: '17lW1M1MudHcUluUOERT',
  consent: 'BJwE6kPeMEAukjZVJotw',
};
const TYPES = ['bar', 'restaurant', 'salon', 'gym', 'hotel', 'other'];
const TOPICS = ['msg', 'phone', 'noshow', 'rev', 'list'];
const INTEREST = { msg: 'interest-messages', phone: 'interest-calls', noshow: 'interest-noshows', rev: 'interest-reviews', list: 'interest-reactivation' };
const ALLOWED_ORIGINS = ['https://www.quickaisetup.com', 'https://quickaisetup.com', 'http://localhost:8965', 'http://localhost:3000'];

const hits = new Map(); // best-effort per-instance rate limit
function limited(ip) {
  const now = Date.now(), w = hits.get(ip) || [];
  const recent = w.filter(t => now - t < 10 * 60 * 1000);
  recent.push(now); hits.set(ip, recent);
  return recent.length > 20;
}
const clean = (v, n = 200) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
const sign = id => crypto.createHmac('sha256', process.env.GHL_TOKEN || 'no-key').update(String(id)).digest('hex').slice(0, 32);

async function ghl(method, path, body) {
  const r = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${process.env.GHL_TOKEN}`, Version: VERSION, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let data = null; try { data = JSON.parse(text); } catch (e) {}
  if (!r.ok) throw new Error(`GHL ${method} ${path} ${r.status}: ${text.slice(0, 300)}`);
  return data;
}

async function toSheet(p) {
  try {
    await fetch(SHEET, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p), redirect: 'follow' });
  } catch (e) { console.error('sheet backup failed', e.message); }
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin'); }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return res.status(403).json({ ok: false, error: 'origin' });

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  const ip = clean((req.headers['x-forwarded-for'] || '').split(',')[0], 60) || 'unknown';
  if (limited(ip)) return res.status(429).json({ ok: false, error: 'rate' });
  const hasGhl = !!(process.env.GHL_TOKEN && process.env.GHL_LOCATION_ID);

  try {
    if (b.action === 'submit') {
      // spam traps: hidden field must be empty, and a human takes more than ~2.5 s
      if (clean(b.hp)) return res.status(200).json({ ok: true, cid: null });
      if (Number(b.ms) > 0 && Number(b.ms) < 2500) return res.status(200).json({ ok: true, cid: null });

      const name = clean(b.name, 120), email = clean(b.email, 160).toLowerCase(), phone = clean(b.phone, 40), website = clean(b.website, 200);
      const type = TYPES.includes(b.type) ? b.type : 'other', lang = b.lang === 'hu' ? 'hu' : 'en';
      const marketing = b.marketing === true, privacy = b.privacy === true;
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[+()\d\s-]{7,25}$/.test(phone) || !website || !privacy) {
        return res.status(400).json({ ok: false, error: 'invalid' });
      }
      const now = new Date().toISOString(), page = clean(b.page, 300);
      const consent = [
        `Privacy policy accepted: YES · ${now}`,
        `Text: "${clean(b.privacyText, 400)}"`,
        `Marketing (email/SMS): ${marketing ? 'YES' : 'NO'} · ${now}`,
        marketing ? `Text: "${clean(b.marketingText, 600)}"` : '',
        `Page: ${page} · Language: ${lang}`,
      ].filter(Boolean).join('\n');

      // backup first, so no lead is lost if GHL is down (same keys as the original audit form, plus extras)
      await toSheet({ fullName: name, workEmail: email, businessName: `${type} · ${website}`, website, mainGoal: `Sample presentation request (${type})`, consentGiven: true, consentTimestamp: now, sourcePage: page, userAgent: clean(req.headers['user-agent'], 300), phone, marketingConsent: marketing });

      if (!hasGhl) return res.status(200).json({ ok: true, cid: null, ghl: false });

      const parts = name.split(/\s+/);
      const up = await ghl('POST', '/contacts/upsert', {
        locationId: process.env.GHL_LOCATION_ID,
        firstName: parts[0], lastName: parts.slice(1).join(' ') || undefined, name,
        email, phone, website, source: 'Website · sample presentation',
        customFields: [{ id: CF.businessType, fieldValue: type }, { id: CF.consent, fieldValue: consent }, { id: CF.progress, fieldValue: 'started' }],
      });
      const cid = up && up.contact && up.contact.id;
      if (!cid) throw new Error('no contact id');
      const tags = ['web-presentation', `type-${type}`, `lang-${lang}`];
      if (marketing) tags.push('consent-marketing');
      await ghl('POST', `/contacts/${cid}/tags`, { tags });
      return res.status(200).json({ ok: true, cid, sig: sign(cid), ghl: true });
    }

    if (b.action === 'progress') {
      if (!hasGhl) return res.status(200).json({ ok: true, ghl: false });
      const cid = clean(b.cid, 60);
      if (!cid || b.sig !== sign(cid)) return res.status(403).json({ ok: false, error: 'sig' });
      const ans = b.answers && typeof b.answers === 'object' ? b.answers : {};
      const yes = TOPICS.filter(t => ans[t] === true), no = TOPICS.filter(t => ans[t] === false);
      const slide = Math.max(0, Math.min(99, Number(b.slide) || 0)), total = Math.max(0, Math.min(99, Number(b.total) || 0));
      const done = b.completed === true;
      const label = { msg: 'messages everywhere', phone: 'missed calls', noshow: 'no-shows / deposits', rev: 'Google reviews', list: 'old guest list' };
      const answersText = `Yes: ${yes.map(t => label[t]).join(', ') || '–'}\nNo: ${no.map(t => label[t]).join(', ') || '–'}`;
      await ghl('PUT', `/contacts/${cid}`, { customFields: [{ id: CF.answers, fieldValue: answersText }, { id: CF.progress, fieldValue: done ? 'completed' : `slide ${slide} of ${total}` }] });
      const tags = yes.map(t => INTEREST[t]);
      if (done) tags.push('pres-completed');
      if (b.own === true) tags.push('request-own-presentation');
      if (tags.length) await ghl('POST', `/contacts/${cid}/tags`, { tags });
      if (b.own === true) await ghl('POST', `/contacts/${cid}/notes`, { body: `Asked for their own personal presentation.\n${answersText}` });
      else if (done) await ghl('POST', `/contacts/${cid}/notes`, { body: `Watched the sample presentation to the end.\n${answersText}` });
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ ok: false, error: 'action' });
  } catch (e) {
    console.error(e.message);
    return res.status(502).json({ ok: false, error: 'upstream' });
  }
}
