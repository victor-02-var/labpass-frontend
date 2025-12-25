import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  ArrowRight, Lock, Zap, Shield, Star, Terminal, User, Share2, 
  ShieldCheck, Cpu, Globe, HardDrive, Users, Quote, ChevronLeft, ChevronRight 
} from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Akshay ",
    role: "CS Major",
    company: "Delhi University",
    content: "The labs here wipe data on reboot. LabPass is a lifesaver for getting code from my phone to the desktop instantly without leaving a trace.",
    rating: 5,
  },
  {
    id: 2,
    name: "Pratik",
    role: "Lab Administrator",
    company: "Cyber Security Dept",
    content: "I recommend this to all our students. It solves a huge security headache for us because it never touches the physical disk. Absolute zero footprint.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Design Student",
    company: "Creative Collective",
    content: "I have to transfer large image references. AirDrop gets wonky on university WiFi, but the P2P bridge here works every single time.",
    rating: 5,
  }
];

const LandingPage = ({ onReceive, onSend }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-cyan-500/30 relative overflow-x-hidden">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-cyan-500/5 blur-[120px] rounded-full -z-10 animate-pulse" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-44 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] md:text-xs font-mono mb-8 tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Encrypted P2P Uplink Active
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 leading-[0.9] pb-2">
            Bridge files <br className="hidden md:block" /> without a trace.
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            The zero-trust bridge for shared environments. Scan a QR, beam your data to RAM, and leave <span className="text-zinc-200 font-medium italic">zero digital footprint</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button 
              onClick={onSend}
              className="group relative w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 text-base font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all duration-300 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Send File <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            <button 
              onClick={onReceive}
              className="group relative w-full sm:w-auto px-8 py-4 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 text-base rounded-xl font-bold hover:bg-zinc-800/60 transition-all text-center backdrop-blur-sm text-zinc-300"
            >
              Receive File
            </button>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="how-it-works" className="py-32 px-6 relative border-y border-zinc-900/50 bg-zinc-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-black tracking-tighter mb-4 text-white">
                <Terminal className="text-cyan-500" /> INSTANT HANDSHAKE.
             </h2>
            <p className="text-lg text-zinc-500 max-w-xl mx-auto font-light">Engineered for speed, built for privacy. No accounts, no installs, no history.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative">
            <Step icon={<Zap />} number="01" title="Generate Link" desc="Open LabPass on the target machine to create a unique, disposable P2P tunnel." />
            <Step icon={<Share2 />} number="02" title="Secure Pairing" desc="Scan the generated QR code with your mobile device. Connection is direct and local." />
            <Step icon={<ShieldCheck />} number="03" title="Volatile Transfer" desc="Data streams directly to RAM. Once the tab closes, the data is physically gone." />
          </div>
        </div>
      </section>

      {/* 3. SECURITY & ACTIVITY */}
      <SecuritySection />
      <ActivitySection />

      {/* 4. NEW ANIMATED TESTIMONIALS */}
      <AnimatedReviews />

    </div>
  );
};

// --- SUB-COMPONENTS ---

const AnimatedReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} id="reviews" className="py-32 px-6 relative overflow-hidden bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Navigation & Title */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-widest mb-6">
                <Star className="mr-2 h-3 w-3 fill-cyan-400" />
                Trusted by Developers
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                Verified Field <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Reports.</span>
              </h2>
              <p className="mt-6 text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                Don't just take our word for it. See what engineers and lab admins say about our volatile bridge protocol.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      activeIndex === index ? "w-10 bg-cyan-500 shadow-[0_0_10px_#22d3ee]" : "w-4 bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Animated Card Stack */}
          <div className="relative h-[400px] w-full group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, x: 30, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -30, rotate: -2 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                <div className="h-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  {/* Glass Background Pattern */}
                  <div className="absolute top-0 right-0 p-8 text-cyan-500/10 -rotate-12">
                    <Quote size={120} />
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div className="flex gap-1">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-cyan-500 text-cyan-500" />
                      ))}
                    </div>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-200 italic">
                      "{testimonials[activeIndex].content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 relative z-10 border-t border-zinc-800/50 pt-8">
                    <div className="h-14 w-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 shadow-inner">
                      <User size={30} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg tracking-tight">{testimonials[activeIndex].name}</h3>
                      <p className="text-sm font-mono text-cyan-500/60 uppercase tracking-widest">
                        {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Decorative Card Shadows */}
            <div className="absolute -inset-4 bg-cyan-500/5 blur-3xl rounded-full -z-10 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ActivitySection = () => (
  <section className="py-20 md:py-24 px-6 border-y border-zinc-900/50 bg-zinc-950 relative overflow-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <ActivityCard 
          icon={<Globe className="text-cyan-500" size={20} />} 
          label="Computers Connected" 
          value="42,081" 
          detail="Active connections right now" 
        />
        <ActivityCard 
          icon={<HardDrive className="text-emerald-500" size={20} />} 
          label="Total Files Sent" 
          value="1.42 TB" 
          detail="Safe transfers through RAM" 
        />
        <ActivityCard 
          icon={<Users className="text-amber-500" size={20} />} 
          label="Happy Users" 
          value="12.8k+" 
          detail="People using LabPass daily" 
        />
      </div>
    </div>
  </section>
);

const ActivityCard = ({ icon, label, value, detail }) => (
  <div className="p-6 md:p-8 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl md:rounded-3xl backdrop-blur-sm group hover:border-cyan-500/30 transition-all duration-500">
    <div className="flex items-center gap-3 mb-4 md:mb-6">
      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
    </div>
    <div className="space-y-1">
      <h4 className="text-3xl md:text-4xl font-black text-white tracking-tighter">{value}</h4>
      <p className="text-[11px] md:text-xs text-zinc-600 font-light italic">{detail}</p>
    </div>
  </div>
);

const SecuritySection = () => (
  <section id="protocol" className="py-32 px-6 bg-zinc-950">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-xs font-mono text-cyan-500 uppercase tracking-[0.4em] mb-6">Security Infrastructure</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-[1.1]">Built for the <br/>volatile web.</h3>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-light">
            We don't just encrypt data. We ensure it never exists in a permanent state. LabPass is architected to be 
            <span className="text-zinc-200 font-medium"> invisible to forensics</span>.
          </p>
          <div className="space-y-8">
            <SecurityFeature icon={<Cpu size={18}/>} title="End-to-End Signaling" desc="Handshakes are encrypted and session-specific, using WebRTC for peer-to-peer data channels." />
            <SecurityFeature icon={<Lock size={18}/>} title="No-Log Architecture" desc="Our signaling servers never touch your file contents or metadata. We don't even have a database." />
            <SecurityFeature icon={<Shield size={18}/>} title="Browser Sandboxing" desc="Files stay within the browser's volatile memory (RAM) and are purged the moment the session ends." />
          </div>
        </div>

        <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
          <div className="space-y-4 mt-12">
            <StatCard value="0" label="Databases used" color="text-cyan-500" />
            <StatCard value="100%" label="RAM Based" color="text-emerald-500" />
          </div>
          <div className="space-y-4">
            <StatCard value="5m" label="Auto-Erase" color="text-white" />
            <StatCard value="P2P" label="Direct Link" color="text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatCard = ({ value, label, color }) => (
  <div className="p-10 bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem] text-center backdrop-blur-xl group hover:border-zinc-700 transition-colors">
    <p className={`text-4xl md:text-5xl font-black mb-2 ${color} tracking-tighter`}>{value}</p>
    <p className="text-[10px] uppercase font-mono text-zinc-500 tracking-[0.2em]">{label}</p>
  </div>
);

const SecurityFeature = ({ title, desc, icon }) => (
  <div className="flex gap-5 group">
    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-500 group-hover:border-cyan-500/50 transition-colors shadow-xl">
      {icon}
    </div>
    <div>
      <p className="text-white font-bold text-lg tracking-tight mb-1">{title}</p>
      <p className="text-zinc-500 text-sm leading-relaxed font-light">{desc}</p>
    </div>
  </div>
);

const Step = ({ icon, title, desc, number }) => (
  <div className="relative flex flex-col items-center text-center group">
    <span className="absolute -top-10 text-7xl font-black text-zinc-900/40 select-none group-hover:text-cyan-500/5 transition-colors">{number}</span>
    <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 group-hover:border-cyan-500/50 rounded-[2rem] flex items-center justify-center mb-8 text-cyan-400 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-10">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="font-bold mb-4 text-white text-2xl tracking-tighter">{title}</h3>
    <p className="text-zinc-500 text-base leading-relaxed max-w-[280px] font-light">{desc}</p>
  </div>
);

export default LandingPage;