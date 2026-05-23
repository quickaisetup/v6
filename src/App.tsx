import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Zap, 
  Infinity as InfinityIcon, 
  Cpu, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Smartphone,
  Calendar,
  Search,
  Target,
  ArrowRight,
  Activity,
  CheckCircle2,
  BarChart3,
  Globe,
  Star,
  ArrowUpRight,
  ChevronDown,
  ArrowDown,
  X,
  Send,
  Building2,
  Mail,
  User,
  Quote,
  ExternalLink,
  Clock,
  Bell,
  Database,
  CalendarCheck,
  Check,
  Rocket,
  ArrowLeft
} from 'lucide-react';

// --- Custom Hooks ---

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handleMatch = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
        
        handleMatch(mediaQuery);
        mediaQuery.addEventListener("change", handleMatch);
        return () => mediaQuery.removeEventListener("change", handleMatch);
    }, []);
    return isMobile;
};

// --- Components ---

const JourneyRoadmap = ({ activeGoalId, hasInteracted = false }: { activeGoalId: string, hasInteracted?: boolean }) => {
    const isMobile = useIsMobile();
    const containerRef = useRef(null);
    const { scrollYProgress: roadmapProgress } = useScroll({
      target: containerRef,
      offset: ["start center", "end center"]
    });
  
    const roadmapLineScale = useSpring(roadmapProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
  
    if (!['bookings', 'loyalty', 'operations', 'visibility', 'revenue'].includes(activeGoalId)) return null;
  
    const steps = [
        { id: '1', time: "2:13 AM", event: "New Inquiry", desc: "Customer sends message through Instagram, WhatsApp, LINE, or your website.", note: "Every inquiry captured instantly.", icon: Smartphone, color: "text-blue-400", bg: "bg-blue-400", side: "left", goals: ['bookings', 'operations', 'visibility'] },
        { id: '2', time: "2:13 AM", event: "Instant Response", desc: "AI answers questions naturally and qualifies the customer automatically.", note: "24/7 multilingual response.", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500", side: "right", goals: ['bookings', 'operations', 'visibility', 'loyalty', 'revenue'] },
        { id: '3', time: "2:14 AM", event: "Welcome Offer", desc: "System identifies if customer is local, tourist, or returning, then sends the correct offer.", note: "Personalized conversion logic.", icon: Target, color: "text-emerald-500", bg: "bg-emerald-500", side: "left", goals: ['bookings', 'loyalty', 'revenue', 'operations', 'visibility'] },
        { id: '4', time: "2:14 AM", event: "Data Capture", desc: "Name, email, and interests stored inside CRM automatically.", note: "Customer database grows automatically.", icon: Database, color: "text-purple-400", bg: "bg-purple-400", side: "right", goals: ['operations', 'loyalty', 'revenue', 'bookings', 'visibility'] },
        { id: '5', time: "Day Before", event: "Auto Reminders", desc: "System sends booking and same-day reminders to ensure arrival.", note: "Reduces no-shows automatically.", icon: Bell, color: "text-blue-400", bg: "bg-blue-400", side: "left", goals: ['bookings', 'operations', 'loyalty'] },
        { id: '6', time: "Session Day", event: "Arrival Recovery", desc: "If customer doesn't show, system triggers a 'We missed you' recovery flow.", note: "Lost revenue recovery.", icon: CalendarCheck, color: "text-emerald-400", bg: "bg-emerald-400", side: "right", goals: ['bookings', 'loyalty', 'revenue'] },
        { id: '7', time: "Post-Visit", event: "Intelligent Feedback", desc: "Satisfied guests get review requests; others sent to private feedback.", note: "Protects reputation automatically.", icon: Star, color: "text-purple-500", bg: "bg-purple-500", side: "left", goals: ['visibility', 'loyalty', 'operations'] },
        { id: '8', time: "Visibility Boost", event: "Review Velocity", desc: "System requests and responds to Google reviews to improve search ranking.", note: "Increased google ranking & trust.", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500", side: "right", goals: ['visibility', 'bookings', 'revenue'] },
        { id: '9', time: "30D Later", event: "Retention & Upsells", desc: "Return offers and loyalty rewards triggered to ensure recurring revenue.", note: "Turns visitors into recurring revenue.", icon: InfinityIcon, color: "text-blue-400", bg: "bg-blue-400", side: "left", goals: ['loyalty', 'revenue', 'bookings', 'operations'] }
    ];
  
    return (
        <section id="journey" ref={containerRef} className="py-24 md:py-48 px-6 bg-[#0B1224] relative overflow-hidden border-t border-white/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="text-center mb-16 md:mb-32 relative">
                        <SectionTag blue={false}>Operational Excellence</SectionTag>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[1.05] text-white">
                            Your business, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic">running 24/7.</span>
                        </h3>
                        <p className="text-white/50 text-sm md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            A fully automated engagement layer that handles the entire customer lifecycle, from first inquiry to lifetime loyalty.
                        </p>
                    </div>
                </Reveal>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line Container */}
                    <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-px bg-white/10 overflow-hidden">
                        {/* Animated Progress Line */}
                        <motion.div 
                            style={{ scaleY: isMobile ? 1 : roadmapLineScale, originY: 0 }}
                            className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-blue-500 via-emerald-400 to-blue-500"
                        />
                    </div>
                    
                    {steps
                    .filter(step => !hasInteracted || step.goals.includes(activeGoalId))
                    .map((step, idx) => (
                        <div key={step.id} className="relative mb-20 md:mb-32 group">
                            {/* Dot on line */}
                            <div className="absolute top-8 left-[20px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border-2 border-blue-500 z-30 group-hover:scale-125 transition-transform duration-300" />
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Content Side */}
                                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                                    <div className={`inline-flex items-center gap-2 mb-4 p-1 pr-3 rounded-full bg-white/[0.03] border border-white/5 ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-2 h-2 rounded-full ${step.bg} animate-pulse`} />
                                        <div className={`text-[10px] font-black uppercase tracking-[0.2em] text-white/40`}>{step.time}</div>
                                    </div>
                                    <h4 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4 transition-colors group-hover:text-blue-400 duration-500">{step.event}</h4>
                                    <p className="text-white/40 text-base md:text-xl leading-relaxed font-medium mb-6 max-w-md ml-0 md:ml-auto md:mr-0">
                                        {step.desc}
                                    </p>
                                    <div className={`flex items-center gap-3 ${idx % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'}`}>
                                        <div className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-blue-400/60 backdrop-blur-sm">
                                            {step.note}
                                        </div>
                                    </div>
                                </div>

                                {/* Icon Side (Center on desktop) */}
                                <div className="absolute left-0 md:relative md:w-0 flex items-center justify-center z-20">
                                    <motion.div 
                                        animate={isMobile ? undefined : { 
                                            y: [0, -8, 0],
                                        }}
                                        transition={isMobile ? undefined : { 
                                            duration: 4 + Math.random() * 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className={`w-10 h-10 md:w-24 md:h-24 rounded-2xl md:rounded-[2.5rem] bg-gradient-to-br from-white/[0.1] to-transparent border border-white/20 flex items-center justify-center relative shadow-2xl backdrop-blur-2xl group transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-blue-500/20`}
                                    >
                                        <div className={`absolute inset-0 rounded-2xl md:rounded-[2.5rem] blur-2xl ${step.bg} opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                                        <step.icon className={`w-5 h-5 md:w-10 md:h-10 ${step.color} relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]`} />
                                        
                                        {/* Decorative orbit ring */}
                                        {!isMobile && (
                                            <div className="absolute inset-[-15px] md:inset-[-25px] rounded-full border border-dashed border-white/10 animate-[spin_30s_linear_infinite] group-hover:border-blue-500/20 transition-colors" />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        </div>
                    ))}

                    {/* FAQ Mini-Section at the end of Roadmap */}
                    <div className="relative z-10 max-w-4xl mx-auto mt-24 md:mt-48 pt-16 md:pt-32 border-t border-white/5">
                        <div className="text-center mb-10 md:mb-20">
                            <SectionTag blue={false}>Operational Clarity</SectionTag>
                            <h4 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">Frequently Asked Questions</h4>
                            <p className="text-white/40 text-xs md:text-lg font-medium">Quick answers to common implementation questions.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            {[
                                { q: "How long does setup take?", a: "Most businesses are live in 7-14 days depending on the complexity of your current systems." },
                                { q: "Do I need to change my booking app?", a: "No. Our systems connect to your existing apps like Acuity, Mindbody, or your website." },
                                { q: "What if customers ask complex questions?", a: "The AI qualifies them. If it hits a limit, it gracefully hands off to your human team." },
                                { q: "Does this work in different languages?", a: "Yes. Our AI operates in 95+ languages automatically detecting the guest's language." }
                            ].map((item, i) => (
                                <div key={i}>
                                    <Reveal delay={i * 0.1}>
                                        <div className="p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all hover:bg-white/[0.04]">
                                            <h5 className="text-[12px] md:text-[15px] font-bold text-white mb-3 tracking-tight">{item.q}</h5>
                                            <p className="text-white/40 text-[10px] md:text-sm font-medium leading-relaxed">{item.a}</p>
                                        </div>
                                    </Reveal>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Reveal = ({ children, width = "w-full", delay = 0, y = 20 }: { children: React.ReactNode, width?: string, delay?: number, y?: number }) => {
    const isMobile = useIsMobile();
    const ref = useRef(null);
    const isInViewObserved = useInView(ref, { once: true, margin: isMobile ? "0px" : "-10%" });
    const isInView = isMobile ? true : isInViewObserved;
    
    return (
        <div ref={ref} className={`${width} relative`}>
            <motion.div
                initial={{ opacity: 0, y: y }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: y }}
                transition={{ duration: 0.8, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const Glow = ({ color = "bg-blue-600" }: { color?: string }) => (
    <div className={`absolute -z-10 blur-[120px] rounded-full opacity-20 pointer-events-none animate-pulse ${color}`} style={{ width: '400px', height: '400px' }} />
);

const Logo = () => (
  <div className="flex items-center group">
    <span className="text-xl md:text-2xl font-medium tracking-tighter text-white">
      quick<span style={{ color: '#2563EB', fontWeight: 800 }}>ai</span>setup
    </span>
  </div>
);

const SectionTag = ({ children, blue = true }: { children: React.ReactNode, blue?: boolean }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] backdrop-blur-md ${blue ? 'bg-blue-600/10 border-blue-500/20 text-blue-400' : 'bg-white/5 border-white/10 text-white/40'}`}
    >
        <div className={`w-1 h-1 rounded-full ${blue ? 'bg-blue-400' : 'bg-white/40'} animate-pulse`} />
        {children}
    </motion.div>
);

const AuditModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        workEmail: '',
        businessName: '',
        website: '',
        mainGoal: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [agreed, setAgreed] = useState(false);
    const [showHint, setShowHint] = useState(false);
    
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setSubmitted(false);
            setAgreed(false);
            setSubmitError(null);
            setFormData({
                fullName: '',
                workEmail: '',
                businessName: '',
                website: '',
                mainGoal: ''
            });
            setShowHint(false);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!agreed) {
            setShowHint(true);
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const payload = {
                fullName: formData.fullName,
                workEmail: formData.workEmail,
                businessName: formData.businessName,
                website: formData.website,
                mainGoal: formData.mainGoal,
                consentGiven: agreed,
                consentTimestamp: new Date().toISOString(),
                sourcePage: window.location.href,
                userAgent: navigator.userAgent
            };

            const response = await fetch('https://script.google.com/macros/s/AKfycbzFvn6jZhTvPh9hrHAUTh_zI3_s-MeTufmi2P6fG5s8bvjqVyZ4coC0QrFC08_22XDEwA/exec', {
                method: 'POST',
                mode: 'no-cors', // Standard for GAS to avoid CORS issues
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            // Note: with no-cors, response.ok will be false and status 0, 
            // but the request still reaches the server. 
            // In a real scenario with proper CORS handling on GAS:
            // if (!response.ok) throw new Error('Submission failed');
            
            // For now, assuming success if no throw
            setSubmitted(true);
        } catch (err) {
            console.error('Submission error:', err);
            setSubmitError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto py-6 md:py-12 px-4 md:px-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#0F172A]/98 backdrop-blur-2xl z-0"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(20px)" }}
                        transition={{ type: "spring", damping: 35, stiffness: 350 }}
                        className="w-full max-w-4xl bg-[#162036]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 relative z-10 mx-auto shadow-[0_0_150px_rgba(37,99,235,0.2)]"
                    >
                        <div className="absolute top-4 right-4 z-50">
                            <button onClick={onClose} className="text-white/20 hover:text-white transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full">
                                <X className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="flex flex-col items-center text-center py-12 md:py-24"
                                >
                                    <div className="relative mb-10">
                                        <motion.div 
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                            className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center relative z-10 shadow-2xl shadow-blue-600/40"
                                        >
                                            <Rocket className="w-10 h-10 md:w-14 md:h-14 text-white" />
                                        </motion.div>
                                        <motion.div 
                                            animate={{ 
                                                scale: [1, 1.4, 1],
                                                opacity: [0.3, 0.1, 0.3],
                                                rotate: [0, 90, 180, 270, 360]
                                            }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-[-20px] md:inset-[-40px] border border-dashed border-blue-500/30 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute -top-6 -right-6"
                                        >
                                            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-blue-300" />
                                        </motion.div>
                                    </div>
                                    
                                    <h3 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-6 leading-tight">Thank you, your audit request has been received.</h3>
                                    <p className="text-white/40 max-w-lg mx-auto text-sm md:text-xl leading-relaxed font-medium mb-10">
                                        Your growth audit is being prioritized. We're analyzing your digital presence to find the exact automation systems that will scale your business.
                                    </p>
                                    
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                            <div className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-blue-400">
                                                Audit Status: Processing
                                            </div>
                                        </div>
                                        <button 
                                            onClick={onClose}
                                            className="px-12 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white text-[10px] md:text-sm font-black uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95"
                                        >
                                            Return to Site
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="mb-8 md:mb-10 text-center lg:text-left pr-10">
                                        <div className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[8px] md:text-[10px] mb-2">Step 1: Finding your opportunities</div>
                                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-tight">Free Business Growth Audit</h3>
                                        <p className="text-white/40 mt-2 text-xs md:text-base font-medium">See exactly where you're losing customers and how to fix it.</p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                        <div className="lg:col-span-12 order-3 space-y-4 py-6 border-t border-white/5 relative">
                                            <AnimatePresence>
                                                {showHint && !agreed && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                        className="absolute bottom-full left-4 mb-2 z-50 pointer-events-none"
                                                    >
                                                        <div className="bg-blue-600 text-white text-[10px] md:text-xs font-bold px-4 py-2 rounded-lg shadow-2xl relative">
                                                            Check this box to enable us to send you the email
                                                            <div className="absolute top-full left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600" />
                                                            <motion.div
                                                                animate={{ y: [0, 4, 0] }}
                                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                                className="absolute -bottom-8 left-3.5"
                                                            >
                                                                <ArrowDown className="w-4 h-4 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <div 
                                                className="flex items-start gap-3 px-1 group cursor-pointer" 
                                                onClick={() => {
                                                    setAgreed(!agreed);
                                                    if (!agreed) setShowHint(false);
                                                }}
                                            >
                                                <div className={`mt-0.5 w-5 h-5 md:w-6 md:h-6 shrink-0 rounded border flex items-center justify-center transition-all duration-300 ${agreed ? 'bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'border-white/10 bg-white/5 group-hover:border-white/20'}`}>
                                                    {agreed && <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />}
                                                </div>
                                                <label className="text-[10px] md:text-[13px] text-white/40 leading-relaxed font-medium cursor-pointer select-none">
                                                    I agree to the <a href="https://my.quickaisetup.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-500/60 hover:text-blue-400 underline decoration-blue-500/20" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>, <a href="https://my.quickaisetup.com/legal/terms" target="_blank" rel="noopener noreferrer" className="text-blue-500/60 hover:text-blue-400 underline decoration-blue-500/20" onClick={(e) => e.stopPropagation()}>Terms of Service</a>, and <a href="https://d1yei2z3i6k35z.cloudfront.net/13085579/68d67fcd3986c_GDPRAdatkezeles-QuickAISetup.com.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500/60 hover:text-blue-400 underline decoration-blue-500/20" onClick={(e) => e.stopPropagation()}>GDPR Data Handling</a>. I also consent to receive hospitality growth strategies and updates.
                                                </label>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-7 space-y-6 order-2 lg:order-2 self-stretch flex flex-col justify-center">
                                            <div className="space-y-1">
                                                <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-500">Full Audit Payload</div>
                                                <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-tight">{formData.businessName || 'Your Business'} AI Opportunity Report</div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                {[
                                                    { t: "Flow Review", d: "Identify weak points where customers are dropping off." },
                                                    { t: "Growth Ops", d: "Clear ways to save time and increase your revenue." },
                                                    { t: "Efficiency Gaps", d: "Discover exactly where your business is losing bookings." },
                                                    { t: "Visibility Check", d: "Review how your brand appears to local customers." },
                                                    { t: "Operational Audit", d: "Practical ideas to automate your daily workflow." },
                                                    { t: "Personal Walkthrough", d: "A video explaining your biggest growth opportunities." }
                                                ].map((item) => (
                                                    <div key={item.t} className="flex gap-3">
                                                        <div className="mt-1">
                                                            <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-bold text-white tracking-tight">{item.t}</div>
                                                            <div className="text-[10px] text-white/30 font-medium leading-tight mt-0.5">{item.d}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:col-span-7 space-y-6 order-1 lg:order-1">
                                            <motion.form 
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                                                }}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4" 
                                                onSubmit={handleSubmit}
                                            >
                                                {[
                                                    { label: "Full Name", icon: User, placeholder: "John Doe", type: "text", value: formData.fullName, field: 'fullName' },
                                                    { label: "Work Email", icon: Mail, placeholder: "john@business.com", type: "email", value: formData.workEmail, field: 'workEmail' },
                                                    { label: "Business Name", icon: Building2, placeholder: "Your business", type: "text", value: formData.businessName, field: 'businessName' },
                                                    { label: "Website", icon: Globe, placeholder: "www.yourbrand.com", type: "text", value: formData.website, field: 'website' }
                                                ].map((field, i) => (
                                                    <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} key={i} className="md:col-span-1 space-y-1.5">
                                                        <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 px-2">{field.label}</label>
                                                        <div className="relative">
                                                            <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                                            <input 
                                                                required 
                                                                type={field.type} 
                                                                placeholder={field.placeholder} 
                                                                value={field.value}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, [field.field]: e.target.value }))}
                                                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors" 
                                                            />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="md:col-span-2 space-y-1.5">
                                                    <label className="text-[8px] font-bold uppercase tracking-widest text-white/30 px-2">Your Main Goal</label>
                                                    <textarea 
                                                        rows={2} 
                                                        required
                                                        placeholder="What would you like to automate or improve in your business?" 
                                                        value={formData.mainGoal}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, mainGoal: e.target.value }))}
                                                        className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none" 
                                                    />
                                                </motion.div>
                                                
                                                {submitError && (
                                                    <div className="md:col-span-2">
                                                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-500 text-[10px] uppercase tracking-widest font-bold text-center">
                                                            {submitError}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="md:col-span-2 pt-4">
                                                    <button 
                                                        type="submit"
                                                        disabled={submitting}
                                                        className={`w-full py-5 text-white font-bold uppercase tracking-[0.4em] text-[10px] rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${agreed ? 'bg-blue-600 hover:bg-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.3)] active:scale-[0.98]' : 'bg-white/10 hover:bg-white/20 border border-white/10'} ${submitting ? 'opacity-50 cursor-wait' : ''}`}
                                                    >
                                                        {submitting ? 'SENDING...' : 'REQUEST YOUR GROWTH AUDIT'}
                                                        <Send className={`w-3.5 h-3.5 ${submitting ? 'animate-pulse' : ''}`} />
                                                    </button>
                                                    <p className="mt-5 text-center text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Delivered to your inbox within 24-48 hours.</p>
                                                </div>
                                            </motion.form>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Nav = ({ onOpenAudit }: { onOpenAudit: () => void }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: "Why it matters", href: "#gap" },
        { label: "What we build", href: "#systems" },
        { label: "Results", href: "#proof" },
        { label: "Our Process", href: "#methodology" }
    ];

    return (
        <>
            <nav 
                className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 border-b flex items-center ${
                    scrolled 
                        ? 'bg-[#0f172a]/90 backdrop-blur-md py-3 md:py-4 border-white/5 shadow-lg' 
                        : 'bg-transparent py-6 md:py-8 border-transparent'
                }`}
            >
                <div className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full transition-all duration-500 ${scrolled ? 'border-none' : ''}`}>
                    <Logo />
                    <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={onOpenAudit}
                            className="hidden sm:block px-5 md:px-8 py-3 md:py-4 bg-blue-600 text-white text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20"
                        >
                            <span className="md:hidden">Audit</span>
                            <span className="hidden md:inline">Get Growth Audit</span>
                        </button>
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-3 text-white/40 hover:text-white transition-colors"
                        >
                            <div className="space-y-1.5 w-6">
                                <div className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <div className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                                <div className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[55] bg-[#0F172A] pt-32 px-10 lg:hidden"
                    >
                        <div className="flex flex-col gap-10">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.href}
                                    href={link.href} 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-bold tracking-tighter text-white/40 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button 
                                onClick={() => { onOpenAudit(); setMobileMenuOpen(false); }}
                                className="w-full py-6 bg-blue-600 text-white text-xs font-bold uppercase tracking-[0.4em] rounded-2xl mt-10"
                            >
                                Get Growth Audit
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const FaqItem = ({ q, a, index, active, setActive }: any) => (
    <div className="border-b border-white/5 overflow-hidden">
        <button 
            onClick={() => setActive(active === index ? null : index)}
            className="w-full py-8 md:py-10 flex items-center justify-between text-left group"
        >
            <span className={`text-base md:text-xl font-bold tracking-tight transition-colors ${active === index ? 'text-blue-400' : 'text-white/60 group-hover:text-white'}`}>{q}</span>
            <div className={`p-2 transition-transform duration-300 ${active === index ? 'rotate-180 text-blue-400' : 'text-white/20'}`}>
                <ChevronDown className="w-6 h-6" />
            </div>
        </button>
        <AnimatePresence>
            {active === index && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <p className="pb-10 text-white/40 leading-relaxed text-base md:text-lg max-w-2xl font-medium">{a}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const CountUp = ({ to, from = 0, prefix = "", suffix = "", decimals = 0, duration = 30, drift = false, driftRate = 0.15 }: { to: number, from?: number, prefix?: string, suffix?: string, decimals?: number, duration?: number, drift?: boolean, driftRate?: number }) => {
    const isMobile = useIsMobile();
    const [count, setCount] = useState(from);
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInViewObserved = useInView(nodeRef, { once: true, margin: isMobile ? "0px" : "-10%" });
    const isInView = isMobile ? true : isInViewObserved;

    useEffect(() => {
        if (isInView) {
            let startTimestamp: number | null = null;
            let animationFrameId: number;

            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                // Extra slow smooth ease for very long durations
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                
                const range = to - from;
                if (drift && progress === 1) {
                    const driftTime = (timestamp - startTimestamp - duration * 1000) / 1000;
                    setCount(to + driftTime * driftRate); 
                } else {
                    setCount(from + easeProgress * range);
                }
                
                if (progress < 1 || drift) {
                    animationFrameId = window.requestAnimationFrame(step);
                }
            };
            animationFrameId = window.requestAnimationFrame(step);

            return () => {
                if (animationFrameId) {
                    window.cancelAnimationFrame(animationFrameId);
                }
            };
        }
    }, [to, from, duration, isInView, drift, driftRate]);

    return (
        <span ref={nodeRef} className="font-variant-numeric tabular-nums whitespace-nowrap">
            {prefix}{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
        </span>
    );
};

const LiveChart = () => {
    const isMobile = useIsMobile();
    return (
        <div className="relative h-24 w-full mt-6 mb-10 group/chart">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-[0.06] pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-white/50" />
                ))}
            </div>
            
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="20%" stopColor="#3b82f6" stopOpacity="0.7" />
                        <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                        <stop offset="80%" stopColor="#2dd4bf" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                <motion.path
                    d="M 0 80 Q 40 20, 80 50 T 160 30 T 240 70 T 320 40 T 400 60 L 400 100 L 0 100 Z"
                    fill="url(#fillGradient)"
                    animate={isMobile ? undefined : {
                        d: [
                            "M 0 80 Q 40 20, 80 50 T 160 30 T 240 70 T 320 40 T 400 60 L 400 100 L 0 100 Z",
                            "M 0 75 Q 45 25, 85 48 T 165 32 T 245 68 T 325 38 T 400 58 L 400 100 L 0 100 Z",
                            "M 0 80 Q 40 20, 80 50 T 160 30 T 240 70 T 320 40 T 400 60 L 400 100 L 0 100 Z"
                        ]
                    }}
                    transition={isMobile ? undefined : {
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.path
                    d="M 0 80 Q 40 20, 80 50 T 160 30 T 240 70 T 320 40 T 400 60"
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isMobile ? { 
                        pathLength: 1 
                    } : { 
                        pathLength: 1,
                        d: [
                            "M 0 80 Q 40 20, 80 50 T 160 30 T 240 70 T 320 40 T 400 60",
                            "M 0 75 Q 45 25, 85 48 T 165 32 T 245 68 T 325 38 T 400 58",
                            "M 0 80 Q 40 20, 80 50 T 160 30 T 240 70 T 320 40 T 400 60"
                        ]
                    }}
                    transition={isMobile ? {
                        pathLength: { duration: 1.5, ease: "easeInOut" }
                    } : {
                        pathLength: { duration: 4, ease: "easeInOut" },
                        d: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                    }}
                />
            </svg>
        </div>
    );
};

const DashboardNotification = ({ message, delay = 0, icon: Icon, color = "blue", className = "" }: { message: string, delay?: number, icon: any, color?: string, className?: string, key?: any }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ 
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
            scale: [0.8, 1, 1, 0.8]
        }}
        transition={{ 
            duration: 10, 
            delay, 
            repeat: Infinity, 
            repeatDelay: 5,
            times: [0, 0.1, 0.9, 1]
        }}
        className={`hidden md:flex items-center gap-3 px-4 py-2.5 bg-[#0a0f1d]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl pointer-events-none whitespace-nowrap absolute z-30 ${className}`}
    >
        <div className={`w-2 h-2 rounded-full ${color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : (color === 'orange' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]')} animate-pulse`} />
        <Icon className="w-3.5 h-3.5 text-white/50" />
        <span className="text-[10px] font-black text-white/80 tracking-widest uppercase">{message}</span>
    </motion.div>
);

const HeroDashboard = () => {
    const isMobile = useIsMobile();
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    return (
        <motion.div 
            animate={isMobile ? undefined : { y: [0, -20, 0] }}
            transition={isMobile ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[360px] mx-auto xl:ml-auto xl:mr-0 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Ambient Background Depth */}
            <div className="absolute -inset-40 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0" />
            
            <motion.div 
                ref={cardRef}
                initial={{ opacity: 0, y: 10 }}
                whileHover={isMobile ? undefined : { scale: 1.02 }}
                animate={{ 
                    opacity: 1, 
                    y: 0,
                    rotateX: isMobile ? 0 : mousePos.y * -20,
                    rotateY: isMobile ? 0 : mousePos.x * 20,
                }}
                transition={isMobile ? { opacity: { duration: 1 } } : { 
                    rotateX: { type: "spring", stiffness: 100, damping: 20 },
                    rotateY: { type: "spring", stiffness: 100, damping: 20 },
                    scale: { type: "spring", stiffness: 400, damping: 25 },
                    opacity: { duration: 2 }
                }}
                className="relative z-10 bg-[#020617]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] overflow-hidden cursor-crosshair"
            >
                {/* Header: System Status */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <div className="relative flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">AI SYSTEM IN OPERATION</span>
                        </div>
                        <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest pl-4">247 • LIVE MONITORING</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                    </div>
                </div>

                {/* Primary Revenue Metric */}
                <div className="mb-6 relative">
                    <div className="flex items-baseline gap-4 mb-2">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
                            <CountUp to={14280} prefix="$" drift duration={120} driftRate={0.35} />
                        </h2>
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                        >
                            <TrendingUp className="w-3 h-3 text-emerald-400" />
                            <span className="text-[9px] font-black text-emerald-400">+12%</span>
                        </motion.div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[12px] font-black uppercase tracking-[0.25em] text-white/50">Revenue Captured</div>
                        <div className="text-[9.5px] font-medium text-white/10 italic tracking-wide">Automated systems active</div>
                    </div>
                </div>

                {/* Main KPI Grid - 2x2 for more Impact */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 mt-8 border-t border-white/5 pt-8">
                    {[
                        { val: 3, from: 20, unit: "s", label: "RESPONSE TIME", sub: "Was: 3h 12m", icon: Zap, color: "text-blue-400", bg: "bg-blue-500/10", dur: 60, trend: "down" },
                        { val: 428, from: 300, unit: "+", label: "NEW REVIEWS", sub: "300+ moving", icon: Star, color: "text-emerald-400", bg: "bg-emerald-500/10", dur: 120, trend: "up" },
                        { val: 26, from: 18, unit: "%", label: "RETURNING CUSTOMERS", sub: "Active visits", icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/10", dur: 120, trend: "up" },
                        { val: 86, from: 34, unit: "", label: "RECOVERED BOOKINGS", sub: "Saved leads", icon: CalendarCheck, color: "text-orange-400", bg: "bg-orange-500/10", dur: 120, trend: "up" }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col gap-3 group">
                            <div className="flex items-center gap-3">
                                <div className={`p-2.5 ${stat.bg} border border-white/10 rounded-xl group-hover:scale-110 transition-transform`}>
                                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold tracking-tighter text-white leading-tight">
                                        <CountUp to={stat.val} from={stat.from} suffix={stat.unit} duration={stat.dur} drift driftRate={0.03} />
                                    </span>
                                    <TrendingUp className={`w-2.5 h-2.5 ${stat.color} opacity-80 ${stat.trend === "down" ? "scale-y-[-1]" : ""}`} />
                                </div>
                            </div>
                            <div className="space-y-1 pl-0.5">
                                <div className={`text-[9px] font-black uppercase tracking-[0.15em] ${stat.color} leading-tight`}>{stat.label}</div>
                                <div className="text-[7px] font-bold text-white/10 uppercase tracking-widest leading-none">{stat.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Search Panel */}
                <div className="mt-8 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                                <Search className="w-3 h-3 text-indigo-400" />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400">Local Visibility</span>
                        </div>
                        <div className="px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-1.5 backdrop-blur-sm">
                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest leading-none">Growing</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "SEARCH", val: "98%" },
                            { label: "RATING", val: "Elite" },
                            { label: "RANK", val: "#1" }
                        ].map((item, i) => (
                            <div key={i} className="space-y-1 px-3 py-2 bg-white/[0.03] rounded-xl border border-white/5">
                                <div className="text-[7px] font-black uppercase tracking-[0.25em] text-white/20 leading-none">{item.label}</div>
                                <div className="text-xs font-bold text-white/80 leading-none">{item.val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Distributed Floating Notifications */}
            <DashboardNotification message="New customer caught" icon={Target} delay={1} color="blue" className="-top-12 -right-20" />
            <DashboardNotification message="New 5-star review" icon={Star} delay={8} color="emerald" className="top-20 -right-32" />
            <DashboardNotification message="Loyalty offer sent" icon={Zap} delay={4} color="blue" className="bottom-20 -left-40" />
            <DashboardNotification message="Follow-up sent" icon={Mail} delay={12} color="orange" className="-bottom-16 left-0" />
            <DashboardNotification message="Missed booking saved" icon={CalendarCheck} delay={18} color="emerald" className="top-[40%] -left-48" />
            <DashboardNotification message="Membership reward" icon={InfinityIcon} delay={22} color="purple" className="-top-24 left-[20%]" />
        </motion.div>
    );
};


interface GoalStat {
    label: string;
    val: number;
    unit: string;
    trend: 'up' | 'down';
}

interface Goal {
    id: string;
    title: string;
    tabSubtext: string;
    icon: any;
    headline: string;
    subheadline: string;
    systems: string[];
    benefits: string[];
    metrics: GoalStat[];
    testimonial: {
        q: string;
        name: string;
        business: string;
    };
    cta: string;
    color: string;
    result: string;
}

const goals: Goal[] = [
    {
        id: "operations",
        title: "Your business, running 24/7.",
        tabSubtext: "Reduce manual work, optimize operations & save time",
        icon: Zap,
        headline: "Replace repetitive customer handling with automated workflows.",
        subheadline: "We centralize customer communication, automate repetitive tasks, simplify operations, and help your staff save time with smart workflows and internal AI assistance.",
        systems: ["Omnichannel Communication", "Staff AI Assistant", "CRM Infrastructure", "Workflow Automation", "Customer Journey Automation"],
        benefits: ["less repetitive work", "smoother operations", "faster communication", "improved organization", "reduced operational overload"],
        metrics: [
            { label: "HOURS SAVED", val: 18, unit: "h", trend: "up" },
            { label: "REPETITIVE TASKS", val: 72, unit: "%", trend: "down" },
            { label: "RESPONSE SPEED", val: 3, unit: "s", trend: "down" },
            { label: "EFFICIENCY", val: 44, unit: "%", trend: "up" }
        ],
        testimonial: { 
            q: "“Our team spends dramatically less time answering repetitive questions.”", 
            name: "General Manager",
            business: "Prestige Wellness (Hungary)" 
        },
        cta: "Automate My Operations",
        color: "indigo",
        result: "Run smoother every day."
    },
    {
        id: "bookings",
        title: "Capture More Bookings",
        tabSubtext: "24/7 replies, reminders & inquiry recovery",
        icon: MessageSquare,
        headline: "Install a system that replies, follows up, and recovers lost bookings automatically.",
        subheadline: "We implement a multi-channel customer response system across Instagram, WhatsApp, Messenger, LINE, website chat, and phone inquiries. The system instantly replies to inquiries, follows up automatically, sends reminders, recovers abandoned bookings, and helps convert more visitors into paying customers.",
        systems: ["AI Concierge", "Omnichannel Messaging", "Booking Recovery", "Follow-Up Automation", "CRM Tracking"],
        benefits: ["faster replies", "fewer missed bookings", "recovered leads", "better customer experience", "more captured revenue"],
        metrics: [
            { label: "AVG RESPONSE", val: 3, unit: "s", trend: "down" },
            { label: "COVERAGE", val: 98, unit: "%", trend: "up" },
            { label: "RECOVERED", val: 34, unit: "+", trend: "up" },
            { label: "CONVERSION", val: 21, unit: "%", trend: "up" }
        ],
        testimonial: { 
            q: "“Since installing the automated inquiry system, we almost never miss a booking anymore.”", 
            name: "Team Member",
            business: "Elite Fight Club (Thailand)" 
        },
        cta: "Build My Booking System",
        color: "blue",
        result: "Capture every inquiry automatically."
    },
    {
        id: "loyalty",
        title: "Increase Repeat Visits",
        tabSubtext: "Loyalty systems, rewards & retention flows",
        icon: InfinityIcon,
        headline: "Build a loyalty and follow-up system customers keep returning to.",
        subheadline: "We create automated retention systems with rewards, referrals, follow-ups, VIP perks, return campaigns, and personalized customer journeys. Customers can earn rewards for referrals, Instagram stories, reviews, memberships, and repeat visits.",
        systems: ["Loyalty & Rewards", "Retention Automation", "Customer Journey Flows", "CRM Segmentation", "VIP Reward Logic"],
        benefits: ["more repeat visits", "stronger loyalty", "referral growth", "higher customer retention", "more engagement"],
        metrics: [
            { label: "REPEAT RATE", val: 24, unit: "%", trend: "up" },
            { label: "RETENTION", val: 41, unit: "%", trend: "up" },
            { label: "NEW CUSTOMERS", val: 400, unit: "/yr", trend: "up" },
            { label: "ENGAGEMENT", val: 2.8, unit: "x", trend: "up" }
        ],
        testimonial: { 
            q: "“Our loyalty system brought in hundreds of returning customers automatically.”", 
            name: "Management",
            business: "Gym Class Szeged (Hungary)" 
        },
        cta: "Build My Loyalty System",
        color: "emerald",
        result: "Automated logic for repeat visits."
    },
    {
        id: "visibility",
        title: "Improve Reviews & Visibility",
        tabSubtext: "Google reviews, reputation & AI search visibility",
        icon: Star,
        headline: "Automate review growth and improve how people discover your business online.",
        subheadline: "We install systems that automatically collect Google reviews, respond to reviews, filter negative feedback privately, and improve your visibility across Google and AI search platforms like ChatGPT and Gemini.",
        systems: ["Google Review Automation", "Reputation Management", "GEO / AI Search Visibility", "Feedback Collection", "Review Response Automation"],
        benefits: ["more Google reviews", "stronger reputation", "higher visibility", "more trust", "increased walk-ins"],
        metrics: [
            { label: "VERIFIED REVIEWS", val: 3000, unit: "+", trend: "up" },
            { label: "AVG RATING", val: 4.9, unit: "★", trend: "up" },
            { label: "VISIBILITY", val: 63, unit: "%", trend: "up" },
            { label: "RANKING", val: 1, unit: "#", trend: "up" }
        ],
        testimonial: { 
            q: "“We gained thousands of Google reviews and significantly improved walk-ins.”", 
            name: "Operational Head",
            business: "Saeng Tian Massage (Thailand)" 
        },
        cta: "Improve My Visibility",
        color: "pink",
        result: "Dominating local search automatically."
    },
    {
        id: "revenue",
        title: "Create New Revenue Streams",
        tabSubtext: "Upsells, reactivation & corporate outreach",
        icon: Target,
        headline: "Generate additional revenue automatically in the background.",
        subheadline: "We implement systems that reactivate old customers, generate upsells, automate outreach, and create new revenue opportunities through partnerships and corporate bookings.",
        systems: ["Corporate Outreach Engine", "Reactivation Campaigns", "Upsell Automation", "Booking Recovery", "CRM Segmentation"],
        benefits: ["more upsells", "recovered customers", "corporate bookings", "scalable outreach", "additional revenue channels"],
        metrics: [
            { label: "PARTNERSHIPS", val: 26, unit: "+", trend: "up" },
            { label: "UPSELL REVENUE", val: 42, unit: "%", trend: "up" },
            { label: "REACTIVATED", val: 57, unit: "+", trend: "up" },
            { label: "OUTBOUND REV", val: 29, unit: "k", trend: "up" }
        ],
        testimonial: { 
            q: "“Rage Fight Academy Pattaya experienced major long-term revenue growth through automation and retention systems.”", 
            name: "Business Owner",
            business: "Rage Fight Academy Pattaya (Thailand)" 
        },
        cta: "Build New Revenue Systems",
        color: "orange",
        result: "Generating revenue in the background."
    }
];



const GoalBrowser = ({ 
    activeGoalId, 
    setActiveGoalId, 
    hasInteracted, 
    setHasInteracted,
    setIsAuditModalOpen
}: { 
    activeGoalId: string, 
    setActiveGoalId: (id: string) => void, 
    hasInteracted: boolean, 
    setHasInteracted: (v: boolean) => void,
    setIsAuditModalOpen: (v: boolean) => void
}) => {
    const [scrolledInternally, setScrolledInternally] = useState(false);
    const [scrolledToEnd, setScrolledToEnd] = useState(false);
    const sectionRef = useRef(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    const activeGoal = goals.find(g => g.id === activeGoalId) || goals[0];

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setScrolledInternally(scrollLeft > 20);
            setScrolledToEnd(scrollLeft + clientWidth >= scrollWidth - 50);
        }
    };

    const handleGoalClick = (id: string) => {
        setActiveGoalId(id);
        setHasInteracted(true);
        setScrolledInternally(true);
        
        setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <section ref={sectionRef} id="systems" className="py-12 md:py-20 px-6 bg-slate-50 border-y border-slate-200 relative overflow-x-hidden min-h-screen flex flex-col justify-center">
            {/* Soft Ambient Accents */}
            <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-blue-500/[0.05] blur-[100px] pointer-events-none rounded-full" />
            
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <Reveal>
                    <div className="text-center mb-16 md:mb-10">
                        <SectionTag>Strategic Navigation</SectionTag>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05] mb-4 text-slate-900">
                            What would you like to improve <br className="hidden sm:block" />
                            <span className="text-blue-600/30 italic font-medium">in your business first?</span>
                        </h2>
                        <p className="text-slate-500 text-xs md:text-base font-medium max-w-lg mx-auto leading-relaxed">
                            Select your main business challenge to reveal the exactly how our systems solve it.
                        </p>
                    </div>
                </Reveal>

                <div className="relative mb-8 md:mb-10">
                    <div className="absolute -inset-2 md:-inset-4 bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] md:rounded-[3.5rem] -z-10 pointer-events-none" />
                    
                    <div className="relative">
                        {/* Mobile Gradient Masks */}
                        <div className={`lg:hidden absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${scrolledToEnd ? 'opacity-0' : 'opacity-100'}`} />
                        <div className={`lg:hidden absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${scrolledInternally ? 'opacity-100' : 'opacity-0'}`} />
                        
                        <div 
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="relative -mx-6 px-6 overflow-x-auto pb-8 lg:pb-0 scrollbar-hide snap-x snap-mandatory"
                        >
                            <div className="flex lg:grid lg:grid-cols-5 gap-4 md:gap-8 w-max lg:w-full min-w-full py-2">
                                {goals.map((goal, idx) => (
                                    <motion.button
                                        key={goal.id}
                                        onClick={() => handleGoalClick(goal.id)}
                                        initial={!hasInteracted ? { opacity: 0, y: 10 } : false}
                                        animate={{ 
                                            opacity: 1, 
                                            y: 0,
                                        }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`relative p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border text-left transition-all duration-300 group flex flex-col snap-center w-[280px] md:w-[400px] lg:w-full flex-shrink-0 ${
                                            activeGoalId === goal.id 
                                            ? 'bg-blue-600 border-blue-500 shadow-2xl shadow-blue-600/30 scale-[1.02] z-20' 
                                            : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50 shadow-sm z-10'
                                        } transition-all duration-500`}
                                    >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-all duration-700 ${
                                            activeGoalId === goal.id ? 'bg-white/20 text-white scale-110' : 'bg-slate-50 text-slate-400'
                                        }`}>
                                            <goal.icon className="w-5 h-5 md:w-7 md:h-7" />
                                        </div>
                                        
                                        <h3 className={`text-[14px] md:text-[20px] font-bold tracking-tight mb-2 md:mb-3 transition-colors duration-700 leading-tight ${
                                            activeGoalId === goal.id ? 'text-white' : 'text-slate-800'
                                        }`}>
                                            {goal.title}
                                        </h3>
        
                                        <p className={`text-[11px] md:text-[14px] font-medium leading-tight mb-4 md:mb-6 transition-colors duration-700 ${
                                            activeGoalId === goal.id ? 'text-white/80' : 'text-slate-400'
                                        }`}>
                                            {goal.tabSubtext}
                                        </p>
                                        
                                        <div className={`mt-auto flex items-center justify-between text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-700 ${
                                            activeGoalId === goal.id ? 'text-white/60' : 'text-slate-300 group-hover:text-blue-500'
                                        }`}>
                                            <span>{activeGoalId === goal.id ? 'Active Focus' : 'Explore Goal'}</span>
                                            <ArrowRight className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${activeGoalId === goal.id ? 'translate-x-1' : ''}`} />
                                        </div>
                                    </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {!scrolledInternally && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                className="lg:hidden absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                            >
                                <div className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] px-6 py-3 rounded-full shadow-[0_20px_40px_rgba(37,99,235,0.4)] flex items-center gap-3 whitespace-nowrap border-2 border-white/20 backdrop-blur-md">
                                    <span>Scroll to choose your goal</span>
                                    <motion.div
                                        animate={{ x: [0, 6, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div ref={detailRef} className="scroll-mt-24 md:scroll-mt-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeGoalId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 bg-white border border-slate-200 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl p-8 md:p-14 lg:p-20"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/[0.02] to-transparent pointer-events-none" />
                            
                            <div className="relative z-10 space-y-16">
                                {/* Header and Strategy */}
                                <div className="space-y-8 max-w-4xl">
                                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[9px] font-black uppercase tracking-[0.3em]">
                                        Architectural Strategy
                                    </div>
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-slate-900 leading-[1.1] transition-all duration-500">
                                        {activeGoal.headline}
                                    </h3>
                                    <p className="text-slate-500 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-3xl">
                                        {activeGoal.subheadline}
                                    </p>
                                </div>

                                {/* Core Architecture Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Systems Column */}
                                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Infrastructure</div>
                                            <Cpu className="w-4 h-4 text-blue-500" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="text-xl font-bold text-slate-900 leading-tight">Implementation Stack</div>
                                            <div className="space-y-2">
                                                {activeGoal.systems.map((s, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600 p-2 border-b border-slate-200/50 last:border-0">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30" />
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Benefits Column */}
                                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Business Impact</div>
                                            <Target className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="text-xl font-bold text-slate-900 leading-tight">Key Outcomes</div>
                                            <div className="space-y-2">
                                                {activeGoal.benefits.map((b, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600 p-2 border-b border-slate-200/50 last:border-0">
                                                        <div className="w-1.5 h-1.5 rounded-sm bg-emerald-500/30" />
                                                        {b}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Performance Column */}
                                    <div className="p-8 rounded-[2.5rem] bg-slate-900 space-y-6 text-white relative overflow-hidden group md:col-span-2 lg:col-span-1">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent opacity-50" />
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 flex justify-between items-center">
                                                <span>Benchmarked Output</span>
                                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-y-10 gap-x-4">
                                                {activeGoal.metrics.map((m, i) => (
                                                    <div key={i} className="space-y-1">
                                                        <div className="text-[9px] font-black uppercase tracking-widest text-white/40">{m.label}</div>
                                                        <div className="text-2xl md:text-3xl font-bold tracking-tighter">
                                                            <CountUp to={m.val} suffix={m.unit} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-8 pt-6 border-t border-white/5">
                                                <div className="text-[11px] font-bold text-white/80 leading-relaxed italic">"{activeGoal.testimonial.q}"</div>
                                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mt-3">{activeGoal.testimonial.name} • {activeGoal.testimonial.business}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action and Social Proof */}
                                <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-slate-100">
                                    <div className="flex items-center gap-6">
                                        <div className="flex -space-x-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                                    <img 
                                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=BizOwner${i + (activeGoal.id.length * 11)}`} 
                                                        alt="Business Owner" 
                                                        referrerPolicy="no-referrer"
                                                        loading="lazy"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900">Proven Implementation Model</div>
                                            <div className="text-xs text-slate-400 font-medium tracking-tight">Active systems deployed across 250+ businesses globally.</div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setIsAuditModalOpen(true)}
                                        className="w-full md:w-auto px-12 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-full shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-4 group"
                                    >
                                        {activeGoal.cta}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};


// --- Main App ---

const brands = [
  "Elite Fight Club (Thailand)",
  "Rage Fight Academy Pattaya (Thailand)",
  "Saeng Tian Massage (Thailand)",
  "Central Harmony Massage (Hungary)",
  "Why Not Bar (Hungary)",
  "Oxyfit Fitness (Hungary)",
  "Gym Class Szeged (Hungary)",
  "Julian Loy Fitness (Canada)",
  "Prestige Wellness (Hungary)",
  "Power Gym (Hungary)"
];

const BrandMarquee = () => {
    const row1 = [...brands, ...brands, ...brands, ...brands];

    return (
        <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0B1221] via-[#0B1221]/80 to-transparent z-20 pointer-events-none" />
            
            <div className="relative">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-8 md:gap-16 items-center opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                    {row1.map((brand, i) => (
                        <div key={i} className="flex items-center gap-4 md:gap-8">
                            <span className="text-white/[0.4] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] italic hover:text-blue-400 transition-colors cursor-default select-none">
                                {brand}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-blue-500/20" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default function App() {
  const isMobile = useIsMobile();
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeGoalId, setActiveGoalId] = useState(goals[0].id);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgTransformY1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const bgTransformScale1 = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const bgTransformY2 = useTransform(smoothProgress, [0, 1], [0, 300]);
  const bgTransformX2 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const bgTransformY3 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const bgTransformX3 = useTransform(smoothProgress, [0, 1], [0, 150]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0F172A] text-white selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0F172A; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #2563EB; }
      `}</style>
      
      {/* Dynamic Background Elements */}
      {!isMobile ? (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div 
              style={{ 
                  y: bgTransformY1,
                  scale: bgTransformScale1
              }}
              animate={{ 
                  opacity: [0.1, 0.15, 0.1],
                  rotate: [0, 10, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full"
          />
          <motion.div 
              style={{ 
                  y: bgTransformY2,
                  x: bgTransformX2
              }}
              animate={{ 
                  opacity: [0.05, 0.1, 0.05],
                  rotate: [0, -15, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-[30%] -right-[10%] w-[45%] h-[45%] bg-purple-600/10 blur-[120px] rounded-full"
          />
          <motion.div 
              style={{ 
                  y: bgTransformY3,
                  x: bgTransformX3
              }}
              animate={{ 
                  opacity: [0.03, 0.08, 0.03]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[130px] rounded-full"
          />
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#0F172A] opacity-80" />
      )}

      <Nav onOpenAudit={() => setIsAuditModalOpen(true)} />
      <AuditModal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-4 md:pt-32 md:pb-16 px-6 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[1200px] h-full md:h-[1000px] bg-blue-600/[0.1] blur-[150px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center relative z-10 w-full">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Reveal delay={0.1}>
                <SectionTag>Your partner in business growth</SectionTag>
            </Reveal>
            
            <motion.h1 
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.0] md:leading-[0.95] mb-8"
            >
                AI systems that keep your <br className="hidden md:block" />
                <span className="text-white/20 italic font-medium">business running 24/7.</span>
            </motion.h1>
            
            <Reveal delay={0.4}>
                <p className="max-w-2xl text-base md:text-lg lg:text-lg text-white/50 font-medium leading-relaxed mb-10">
                    We help gyms, hospitality, wellness, and service businesses capture more bookings, increase repeat visits, improve reviews, and reduce manual work automatically.
                </p>
            </Reveal>
            
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
            >
                <button 
                    onClick={() => setIsAuditModalOpen(true)}
                    className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-blue-600 text-white font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs rounded-full flex items-center justify-center gap-4 hover:bg-blue-700 transition-all hover:scale-105 shadow-2xl shadow-blue-600/40 active:scale-95 group relative overflow-hidden whitespace-nowrap"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">Get Your Growth Audit</span>
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                </button>
                <button 
                    onClick={() => setIsAuditModalOpen(true)}
                    className="flex items-center gap-3 text-white/40 hover:text-white transition-colors font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px] px-6 py-4 group"
                >
                    See Example Audit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
            <HeroDashboard />
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section id="proof" className="pt-8 pb-12 md:py-16 px-6 bg-[#0B1221] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
            <Reveal>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10 text-center lg:text-left">
                    <div>
                        <SectionTag blue={false}>Direct impact</SectionTag>
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                          Real results for <span className="text-white/20 italic font-medium">real businesses.</span>
                        </h3>
                    </div>
                </div>
            </Reveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                    { v: 800, sfx: "%", l: "Revenue Growth", s: "Rage Fight Academy Pattaya (Thailand)", i: TrendingUp, c: "text-blue-500", b: "bg-blue-500/5", g: ['bookings', 'ops'] },
                    { v: 3000, sfx: "+", l: "Verified Reviews", s: "Saeng Tian Massage (Thailand)", i: Star, c: "text-emerald-500", b: "bg-emerald-500/5", g: ['reviews', 'seo'] },
                    { v: 400, sfx: "+", l: "New Customers / Yr", s: "Gym Class Szeged (Hungary)", i: Users, c: "text-purple-500", b: "bg-purple-500/5", g: ['repeat', 'seo'] },
                    { v: 24, sfx: "/7", l: "Lead Capture", s: "Elite Fight Club (Thailand)", i: Smartphone, c: "text-pink-500", b: "bg-pink-500/5", g: ['bookings', 'ops'] }
                ]
                .sort((a, b) => {
                  const aMatch = a.g.includes(activeGoalId);
                  const bMatch = b.g.includes(activeGoalId);
                  if (aMatch && !bMatch) return -1;
                  if (!aMatch && bMatch) return 1;
                  return 0;
                })
                .map((stat, idx) => (
                    <motion.div 
                        key={stat.s}
                        initial={hasInteracted ? { opacity: 0, scale: 0.95 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        className={`bg-white/[0.02] border p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] relative overflow-hidden group transition-all shadow-xl flex flex-col justify-between ${idx === 0 && hasInteracted ? 'border-blue-500/40 bg-blue-500/[0.03]' : 'border-white/5'}`}
                    >
                        <div>
                            <div className={`text-[36px] md:text-5xl font-bold tracking-tighter mb-1.5 md:mb-3 ${stat.c}`}>
                                <CountUp to={stat.v} suffix={stat.sfx} duration={2.5} />
                            </div>
                            <div className="text-[10px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40 mb-1.5 md:mb-3 group-hover:text-white/60 transition-colors leading-tight">{stat.s}</div>
                        </div>
                        <div className={`text-[10px] md:text-[10px] ${stat.c} font-bold uppercase tracking-[0.2em]`}>{stat.l}</div>
                        
                        {/* Interactive Accent */}
                        <div className={`absolute -bottom-10 -right-10 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity ${stat.b.replace('bg-', 'bg-')}`} />
                    </motion.div>
                ))}
            </div>

            <BrandMarquee />
        </div>
      </section>

      <GoalBrowser 
        activeGoalId={activeGoalId} 
        setActiveGoalId={setActiveGoalId} 
        hasInteracted={hasInteracted} 
        setHasInteracted={setHasInteracted} 
        setIsAuditModalOpen={setIsAuditModalOpen}
      />

      {/* Customer Journey Viz - Cinematic / 2:13 AM Scenario */}
      <JourneyRoadmap activeGoalId={activeGoalId} hasInteracted={hasInteracted} />

      {/* Opportunity Gap */}
      <section id="gap" className="py-12 md:py-24 px-6 relative overflow-hidden bg-[#0F172A]">
          <div className="max-w-6xl mx-auto text-center border-t border-white/5 pt-16 md:pt-24">
              <Reveal>
                  <div className="mb-8 md:mb-20">
                      <SectionTag>The Problem we solve</SectionTag>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tighter leading-[1.05] max-w-4xl mx-auto">
                          You've built a great business. <br/>
                          <span className="text-white/20 italic font-medium">Now let's fix the leak.</span>
                      </h2>
                  </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-left items-start">
                  {[
                      { id: "bookings", t: "Stop missing inquiries", d: "Customers don’t like to wait. We make sure every person who reaches out gets an answer instantly.", i: Clock },
                      { id: "loyalty", t: "Bring customers back", d: "Most businesses focus only on getting new customers. We build systems that bring your existing ones back more often.", i: InfinityIcon },
                      { id: "operations", t: "Save your staff time", d: "Automate repetitive messaging so your team can focus on the operations and people right in front of them.", i: Zap },
                      { id: "visibility", t: "Grow your reputation", d: "Capture more reviews, respond to feedback faster, and ensure your business is the highest rated in your area.", i: Star }
                  ]
                  .filter(item => {
                      if (!hasInteracted) return true;
                      if (activeGoalId === 'bookings') return item.id === 'bookings' || item.id === 'operations';
                      if (activeGoalId === 'loyalty') return item.id === 'loyalty' || item.id === 'operations';
                      if (activeGoalId === 'visibility') return item.id === 'visibility' || item.id === 'operations';
                      if (activeGoalId === 'revenue') return item.id === 'loyalty' || item.id === 'bookings';
                      if (activeGoalId === 'operations') return item.id === 'operations' || item.id === 'bookings';
                      return true;
                  })
                  .map((item, idx) => (
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          key={item.t} 
                          className="group p-8 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all shadow-2xl shadow-black/20"
                      >
                          <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                              <item.i className="w-7 h-7" />
                          </div>
                          <h4 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-blue-400 transition-colors leading-tight">{item.t}</h4>
                          <p className="text-white/40 text-base md:text-lg leading-relaxed font-medium">{item.d}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-6 bg-[#0F172A] relative overflow-hidden border-t border-white/5">
          <div className="max-w-6xl mx-auto text-center">
              <div className="mb-8 md:mb-16">
                  <SectionTag>Results for your goal</SectionTag>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white/20 italic px-4">
                  Proven success story.
                  </h3>
              </div>
              
              <AnimatePresence mode="wait">
              <motion.div 
                  key={activeGoalId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="p-8 md:p-16 lg:p-20 rounded-[4rem] bg-white/[0.02] border border-white/5 relative group overflow-hidden"
              >
                  <div className="absolute top-0 right-0 p-12 translate-y-4 -translate-x-4">
                      <Quote className="w-16 h-16 text-blue-500/5 group-hover:text-blue-500/10 transition-colors" />
                  </div>
                  <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium tracking-tight mb-12 relative z-10 italic max-w-4xl mx-auto leading-relaxed">
                      {goals.find(g => g.id === activeGoalId)?.testimonial?.q || goals[0].testimonial.q}
                  </p>
                  <div className="flex items-center justify-center gap-6">
                      <div className="h-px w-8 bg-blue-500/20" />
                      <span className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.6em] text-white/30 whitespace-nowrap">
                      {(goals.find(g => g.id === activeGoalId) || goals[0])?.testimonial && (
                          <>
                              {(goals.find(g => g.id === activeGoalId) || goals[0]).testimonial.name}, {(goals.find(g => g.id === activeGoalId) || goals[0]).testimonial.business}
                          </>
                      )}
                      </span>
                      <div className="h-px w-8 bg-blue-500/20" />
                  </div>
              </motion.div>
              </AnimatePresence>
          </div>
      </section>

      {/* Roadmap / Methodology */}
      <section id="methodology" className="py-16 md:py-24 px-6 relative overflow-hidden bg-[#0F172A]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto">
            <Reveal>
                <div className="text-center mb-12 md:mb-16">
                    <SectionTag blue={true}>The Path Forward</SectionTag>
                    <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tighter mb-4 leading-[1.05]">A clear path <br/><span className="text-white/20 italic font-medium">to more revenue.</span></h3>
                    <p className="text-white/40 text-sm md:text-lg font-medium max-w-lg mx-auto leading-relaxed italic">
                        A simple, strategic 4-step process to transform how your business operates and grows.
                    </p>
                </div>
            </Reveal>
 
            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Connecting Path (Desktop) */}
                <div className="absolute top-[60px] left-20 right-20 h-px bg-white/5 hidden lg:block overflow-hidden">
                    <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-between gap-12 md:gap-y-20 lg:gap-4 relative z-10">
                    {[
                        { 
                            n: "01", 
                            t: "Find the gaps", 
                            d: "We map out exactly where you're losing inquiries and revenue.",
                            icon: Search,
                            color: "text-blue-400",
                            delay: 0
                        },
                        { 
                            n: "02", 
                            t: "Build the plan", 
                            d: "We design a custom system specifically for your business goals.",
                            icon: Cpu,
                            color: "text-blue-500",
                            delay: 0.1
                        },
                        { 
                            n: "03", 
                            t: "Launch systems", 
                            d: "We set everything live and ensure your team is ready.",
                            icon: Sparkles,
                            color: "text-emerald-500",
                            delay: 0.2
                        },
                        { 
                            n: "04", 
                            t: "Scale together", 
                            d: "We refine the logic to keep your business growing automatically.",
                            icon: TrendingUp,
                            color: "text-purple-400",
                            delay: 0.3
                        }
                    ].map((step, idx) => (
                        <div key={idx} className="w-full flex flex-col items-center group relative">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: step.delay, duration: 0.8 }}
                                className="flex flex-col items-center text-center w-full"
                            >
                                {/* Dynamic Pictogram Container */}
                                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                                    {/* Rotating Outer Ring */}
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full border border-dashed border-white/10 group-hover:border-blue-500/30 transition-colors"
                                    />
                                    
                                    {/* Continuous Floating Pictogram */}
                                    <motion.div
                                        animate={{ 
                                            y: [0, -6, 0],
                                            rotate: [-2, 2, -2]
                                        }}
                                        transition={{ 
                                            duration: 5, 
                                            repeat: Infinity, 
                                            ease: "easeInOut" 
                                        }}
                                        className={`w-20 h-20 rounded-2xl bg-[#162036] border border-white/5 flex items-center justify-center relative shadow-2xl group-hover:scale-110 transition-all duration-500 ${step.color}`}
                                    >
                                        <step.icon className="w-8 h-8" />
                                        
                                        {/* Step Number Tag */}
                                        <div className="absolute -top-3 -right-3 px-3 py-1 bg-blue-600 rounded-full text-[8px] font-black tracking-widest text-white whitespace-nowrap shadow-lg">
                                            Phase {step.n}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wider italic">{step.t}</h4>
                                <p className="text-white/40 text-xs md:text-sm font-medium leading-relaxed max-w-[180px]">{step.d}</p>
                            </motion.div>

                            {/* Sequential Indicators */}
                            {idx < 3 && (
                                <div className={`absolute z-20 pointer-events-none 
                                    ${idx % 2 === 0 
                                        ? "bottom-[-3rem] md:bottom-auto md:top-[4.5rem] md:-right-6 left-1/2 -translate-x-1/2 md:translate-x-0 lg:top-1/2 lg:-translate-y-1/2 lg:-right-4" 
                                        : "bottom-[-3rem] md:bottom-[-4.5rem] md:top-auto md:left-1/2 md:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:-right-4 lg:bottom-auto lg:left-auto lg:translate-x-0"
                                    }`}
                                >
                                    <motion.div
                                        animate={idx % 2 === 0 ? { x: [0, 5, 0] } : { y: [0, 5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="lg:hidden"
                                    >
                                        <ArrowRight className={`w-5 h-5 text-white/10 
                                            ${idx % 2 === 0 ? "rotate-90 md:rotate-0" : "rotate-90"}
                                        `} />
                                    </motion.div>
                                    
                                    <motion.div
                                        animate={{ x: [0, 8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="hidden lg:block"
                                    >
                                        <ArrowRight className="w-6 h-6 text-white/10" />
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 md:mt-20 text-center">
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsAuditModalOpen(true)}
                        className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 bg-blue-600 text-white font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs rounded-full shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-all relative overflow-hidden group whitespace-nowrap"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10">Start Phase 1 Now</span>
                        <ArrowUpRight className="inline-block ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                    </motion.button>
                </div>
            </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-16 md:py-24 px-6 bg-[#0B1221] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/[0.02] blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
                {/* Image Column */}
                <div className="hidden md:block md:col-span-12 lg:col-span-5 order-1">
                    <Reveal delay={0.2}>
                        <div className="relative flex justify-center lg:justify-start">
                            {/* Professional Headshot "Cut" */}
                            <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[4/5] group">
                                {/* Subtle Glowing backdrop */}
                                <div className="absolute -inset-10 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <img 
                                        src="https://i.ibb.co/SkBV7Jx/reportbs.png" 
                                        alt="Sándor Bárány" 
                                        className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-105"
                                        referrerPolicy="no-referrer"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Floating Credentials - Smaller/Tighter */}
                                <motion.div 
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-4 -right-4 p-4 bg-[#1A243A]/80 border border-white/10 rounded-xl shadow-2xl z-20 backdrop-blur-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500">
                                            <Star className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">Nightlife Awards</div>
                                            <div className="text-[10px] font-bold text-white">#1 Small Club '17</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Text Column */}
                <div className="lg:col-span-7 order-2">
                    <Reveal>
                        <div className="space-y-8">
                            <div className="flex items-center gap-5">
                                <div className="md:hidden w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/20 flex-shrink-0 bg-[#1A243A] shadow-xl">
                                    <img 
                                        src="https://i.ibb.co/SkBV7Jx/reportbs.png" 
                                        alt="Sándor Bárány" 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="mb-1">
                                        <SectionTag>Founder & Strategy</SectionTag>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-bold tracking-tighter leading-none mb-1 md:mb-3 uppercase italic">Sándor <span className="text-white/20 not-italic font-medium">Bárány.</span></h3>
                                    <div className="text-blue-500 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-xs">Founder, Quick AI Setup</div>
                                </div>
                            </div>

                            <div className="space-y-5 text-white/40 text-sm md:text-base leading-relaxed font-medium">
                                <p>
                                    Before building Quick AI Setup, Sándor spent years inside hospitality and customer-facing businesses, where <span className="text-white/60">speed, customer experience, reputation, and retention</span> directly impacted revenue every single day.
                                </p>
                                <p>
                                    He was the founder and manager of <span className="text-white/60 font-bold">Pont Club</span>, recognized as Hungary’s #1 small club in 2017, and managed customer experience operations for leading venues in Budapest.
                                </p>
                                <p>
                                    That background created a deep understanding of how businesses lose customers through slow replies, inconsistent follow-ups, and operational overload.
                                </p>
                                
                                <div className="pt-6 border-t border-white/5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-[10px] font-bold uppercase tracking-widest text-white/60">
                                        {[
                                            "Capture More Bookings", "Automate Customer Journeys", 
                                            "Automated Retention", "Reputation & Review Growth"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3 text-blue-500/60" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-6 bg-[#0B1221] border-y border-white/5">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
                <SectionTag blue={false}>Common Questions</SectionTag>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight italic text-white/20">Everything you need to know.</h3>
            </div>
            <div className="space-y-2">
                {[
                    { q: "Is this just another AI chatbot?", a: "No. Chatbots are isolated tools. We implement 'Operational Infrastructure' - a cohesive system that handles sales, support, and follow-ups across all channels with full CRM synchronization." },
                    { q: "Will this replace our staff?", a: "No. Our systems are designed for leverage. We automate the high-volume, repetitive interactions so your staff can focus on the premium face-to-face hospitality your brand is known for." },
                    { q: "How long is the deployment process?", a: "A full implementation - from signed audit to a live, governed operation - typically takes 4 to 6 weeks, depending on the complexity of your existing workflows." },
                    { q: "Which platforms do you integrate with?", a: "We specialize in deep integrations with WhatsApp, LINE, Instagram, Facebook Messenger, Email, and most major reservation/CRM platforms used in fitness and wellness." },
                    { q: "What is the expected ROI?", a: "We focus on measurable outcomes. Most partners report a significant lift in booking conversion and a radical reduction in manual communication workload within 60-90 days." }
                ].map((item, idx) => (
                    <FaqItem key={idx} index={idx} {...item} active={activeFaq} setActive={setActiveFaq} />
                ))}
            </div>
          </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-16 md:py-24 px-6 text-center relative overflow-hidden bg-[#101827]">
        <div className="absolute inset-0 bg-blue-600/[0.08] blur-[140px] pointer-events-none rounded-full translate-y-1/2" />
        
        {/* Decorative connection line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-blue-500/20 to-transparent" />
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
            <Reveal>
                <div className="space-y-6 md:space-y-8">
                    <SectionTag>The next step</SectionTag>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tighter mb-3 md:mb-6 leading-[1.05] text-white">
                        Build the system that <br/>
                        <span className="text-blue-500 italic font-bold">grows your business.</span>
                    </h2>
                    
                    <p className="text-xs md:text-sm text-white/30 mb-6 md:mb-10 max-w-lg mx-auto leading-relaxed px-4 font-medium italic">
                        Stop losing revenue to manual work. Start scaling with a system that works as hard as you do.
                    </p>
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block"
                    >
                        <button 
                            onClick={() => setIsAuditModalOpen(true)}
                            className="px-8 md:px-14 py-4 md:py-5 bg-blue-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 group flex items-center justify-center gap-3 md:gap-5 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <span className="relative z-10">Get Growth Audit</span>
                            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                        </button>
                    </motion.div>
                </div>
            </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-6 bg-[#080E1A] border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-24 mb-12 md:mb-16">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-6 md:space-y-8">
                <Logo />
                <p className="text-white/30 text-xs md:text-base leading-relaxed max-w-sm font-medium">
                    Operational systems for businesses that value time and growth. Delivering real outcomes for wellness and hospitality brands.
                </p>
                <div className="flex gap-4">
                    {[Smartphone, Globe, Search].map((I, i) => (
                        <div key={i} className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center text-white/10 hover:border-blue-500/40 hover:text-blue-500 cursor-pointer transition-all hover:bg-blue-600/5 bg-white/[0.02]">
                            <I className="w-4 h-4" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-7 flex flex-col sm:flex-row gap-10 md:gap-20 lg:gap-32">
                <div className="flex-1 space-y-6 md:space-y-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Solutions</h4>
                    <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
                        <li><a href="#systems" className="hover:text-blue-500 transition-colors">Booking Recovery</a></li>
                        <li><a href="#systems" className="hover:text-blue-500 transition-colors">Customer Messaging</a></li>
                        <li><a href="#systems" className="hover:text-blue-500 transition-colors">Loyalty Systems</a></li>
                        <li><a href="#systems" className="hover:text-blue-500 transition-colors">Search Dominance</a></li>
                    </ul>
                </div>
                <div className="flex-1 space-y-6 md:space-y-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Partnership</h4>
                    <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
                        <li><a href="#proof" className="hover:text-blue-500 transition-colors">Case Studies</a></li>
                        <li><a href="#methodology" className="hover:text-blue-500 transition-colors">Methodology</a></li>
                        <li><button onClick={() => setIsAuditModalOpen(true)} className="hover:text-blue-500 transition-colors text-left uppercase">Growth Audit</button></li>
                        <li><a href="mailto:brnysndr@gmail.com" className="hover:text-blue-500 transition-colors">Direct Inquiry</a></li>
                    </ul>
                </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-[9px] font-bold uppercase tracking-[0.4em] text-white/10">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-16">
                <span>&copy; 2024 Quick AI Setup // Helping Businesses Scale.</span>
                <a href="https://d1yei2z3i6k35z.cloudfront.net/13085579/68d67fcd3986c_GDPRAdatkezeles-QuickAISetup.com.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white/30 transition-colors uppercase">GDPR Data Handling</a>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-4">
                  <a href="https://my.quickaisetup.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white/30 transition-colors uppercase">Privacy Policy</a>
                  <a href="https://my.quickaisetup.com/legal/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white/30 transition-colors uppercase">Terms & Conditions</a>
              </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-16 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.8em] text-white/[0.02] text-center pointer-events-none select-none">
              Operational Systems // Performance Mastery // Verified Results
          </div>
      </footer>
    </div>
  );
}
