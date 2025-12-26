import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. IMPORT LENIS (Make sure to install: npm install lenis)
import Lenis from 'lenis';
import { 
  ArrowRight, Lock, Zap, Shield, Star, Download, User, Share2, 
  Settings, Cpu, Globe, HardDrive, Users, MessageSquare 
} from 'lucide-react';

import ComparisonChart from '../components/ComparisonChart'; 
import UseCases from '../components/UseCases';
import FAQ from '../components/FAQ';
import SupportedFormats from '../components/SupportedFormats';
import FinalCTA from '../components/FinalCTA';

/* --- REVEAL COMPONENT --- */
const Reveal = ({ children, delay = 0, width = "100%" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 } 
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    style={{ width }}
  >
    {children}
  </motion.div>
);

/* --- DATA --- */
const testimonials = [
  {
    id: 1,
    name: "Arjun Verma",
    role: "B.Tech CSE",
    company: "Final Year Student",
    content: "Forgot my pendrive during the Data Structures practical. Beamed the code from my phone to the lab PC instantly just 5 mins before the internal submission. Literally saved my grades.",
    rating: 5,
    avatarColor: "bg-green-400"
  },
  {
    id: 2,
    name: "Sneha Patel",
    role: "B.Pharm",
    company: "Pharmacy Dept",
    content: "The Xerox shop PC near college is always full of viruses. I stopped logging into my email there. Now I just use LabPass to send my assignment PDFs for printing. It's so much safer.",
    rating: 5,
    avatarColor: "bg-purple-400"
  },
{
    id: 3,
    name: "Rohan Das",
    role: "Mechanical Eng.",
    company: "3rd Year Student",
    content: "Honestly, I just use it because Bluetooth is too slow for 50MB lab reports and I hate logging into my Google Drive on public lab computers. It does one thing and does it well.",
    rating: 5,
    avatarColor: "bg-pink-400"
  }
];

const LandingPage = ({ onReceive, onSend }) => {
  
  // 2. INITIALIZE SMOOTH SCROLL (LENIS)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // The duration of the scroll animation (Higher = smoother/slower)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing function
      direction: 'vertical', 
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-indigo-950 text-indigo-50 font-sans selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none -z-10" />
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
           <motion.div 
             animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-20 right-[-100px] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" 
           />
           <motion.div 
             animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }} 
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-0 left-[-100px] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl" 
           />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-4 border-black bg-yellow-400 text-black font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-2">
                <Zap className="fill-black" size={16} />
                System Online: Ready to Transfer
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] leading-[0.9]">
                Transfer files <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">instantly.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-indigo-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed bg-indigo-900/50 p-4 rounded-xl border-2 border-indigo-500/30 backdrop-blur-sm">
                The <span className="text-yellow-400 font-bold">Zero-Hassle</span> bridge for your devices. Scan a QR, send your files, and leave <span className="text-pink-400 font-bold italic">zero digital footprint</span>.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <ActionButton onClick={onSend} variant="primary" icon={<ArrowRight />}>
                Send File
                </ActionButton>
                <ActionButton onClick={onReceive} variant="secondary" icon={<Download />}>
                Receive File
                </ActionButton>
            </div>
          </Reveal>
        </div>
      </section>
      

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-[#F4F3EE] border-y-4 border-black text-black">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider flex items-center justify-center gap-3">
                    <Settings className="text-black fill-yellow-400" size={40}/>
                    How It Works
                </h2>
                <p className="text-gray-600 font-bold mt-4">Three simple steps. No installation required.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-2 bg-gray-300 rounded-full z-0" />
            
            <Reveal delay={0.1}>
                <FeatureCard number="1" title="Create Room" desc="Open LabPass to create a secure, temporary connection tunnel." icon={<Zap className="text-white" />} color="bg-pink-500" />
            </Reveal>
            <Reveal delay={0.3}>
                <FeatureCard number="2" title="Connect Device" desc="Scan the QR code. The connection is direct and encrypted." icon={<Share2 className="text-white" />} color="bg-purple-500" />
            </Reveal>
            <Reveal delay={0.5}>
                <FeatureCard number="3" title="Instant Transfer" desc="Files move directly to RAM. Once you close the tab, data is wiped." icon={<Shield className="text-white" />} color="bg-cyan-500" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* USE CASES & COMPARISON */}
      <Reveal>
         <UseCases />
      </Reveal>

      <section className="py-24 px-6 bg-[#F4F3EE] border-b-4 border-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-left">
                <Reveal>
                    <div className="inline-block bg-black text-white px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border-2 border-pink-500 shadow-[4px_4px_0px_0px_#ec4899]">
                        Performance Metrics
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-black leading-[0.9] mb-6">
                        DOMINATE <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">THE OLD WAYS.</span>
                    </h2>
                    <p className="text-lg font-bold text-gray-600 mb-8 leading-relaxed">
                        Stop emailing yourself code snippets. Stop logging into Cloud drives on public computers. LabPass outperforms traditional methods in privacy, speed, and anonymity.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 font-bold text-black">
                            <div className="w-8 h-8 bg-green-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">✓</div>
                            100% RAM-Based (No Trace)
                        </div>
                        <div className="flex items-center gap-3 font-bold text-black">
                            <div className="w-8 h-8 bg-green-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">✓</div>
                            Zero Account Friction
                        </div>
                    </div>
                </Reveal>
            </div>
            
            <div className="lg:w-1/2 w-full">
                <Reveal delay={0.2}>
                    <ComparisonChart />
                </Reveal>
            </div>
        </div>
      </section>

      {/* SECURITY */}
      <Reveal>
        <SecuritySection />
      </Reveal>

      {/* STATS */}
      <Reveal>
        <ActivitySection />
      </Reveal>
      
      {/* SUPPORTED FORMATS */}
      <Reveal>
        <SupportedFormats /> 
      </Reveal>

      {/* REVIEWS & CTA */}
      <Reveal>
        <AnimatedReviews />
      </Reveal>
      
      <Reveal>
        <FAQ />
      </Reveal>

      <Reveal>
        <FinalCTA onStart={onSend} />
      </Reveal>
      
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const ActionButton = ({ children, onClick, variant, icon }) => {
  const isPrimary = variant === 'primary';
  return (
    <button 
      onClick={onClick}
      className={`
        relative group w-full sm:w-auto px-8 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-100 active:translate-y-2 active:shadow-none
        border-4 border-black
        ${isPrimary 
          ? 'bg-pink-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-400' 
          : 'bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100'}
      `}
    >
      {children} 
      {icon && React.cloneElement(icon, { size: 20, className: "group-hover:scale-110 transition-transform" })}
    </button>
  );
};

const FeatureCard = ({ number, title, desc, icon, color }) => (
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className={`w-24 h-24 ${color} border-4 border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-6 transform transition-transform hover:-translate-y-2 hover:rotate-3`}>
      {React.cloneElement(icon, { size: 40 })}
      <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center font-black text-black">
        {number}
      </div>
    </div>
    <h3 className="font-black text-2xl text-black mb-2">{title}</h3>
    <p className="text-gray-600 font-medium leading-relaxed max-w-[260px]">{desc}</p>
  </div>
);

const SecuritySection = () => (
  <section id="protocol" className="py-32 px-6 bg-indigo-950 border-y-4 border-black text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <div className="inline-block bg-yellow-400 text-black border-2 border-black font-bold px-3 py-1 text-xs mb-4 uppercase tracking-widest transform -rotate-1 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
            Security Protocol
          </div>
          <h3 className="text-5xl md:text-6xl font-black mb-8 leading-[0.9]">
            BUILT FOR THE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
              VOLATILE WEB.
            </span>
          </h3>
          <p className="text-indigo-200 text-xl leading-relaxed mb-10 font-bold max-w-md">
            We don't just encrypt data. We ensure it never exists in a permanent state. Invisible to forensics.
          </p>
          <div className="space-y-6">
            <SecurityItem icon={<Cpu />} title="End-to-End Signaling" />
            <SecurityItem icon={<Lock />} title="No-Log Architecture" />
            <SecurityItem icon={<Shield />} title="Browser Sandboxing" />
          </div>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-6 w-full">
          <div className="space-y-6 mt-12">
            <StatBox value="0" label="Databases" color="bg-white text-black" />
            <StatBox value="100%" label="RAM Based" color="bg-purple-500 text-white" />
          </div>
          <div className="space-y-6">
            <StatBox value="5m" label="Auto-Erase" color="bg-yellow-400 text-black" />
            <StatBox value="P2P" label="Direct Link" color="bg-pink-500 text-white" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ActivitySection = () => (
  <section className="py-20 px-6 bg-indigo-950 border-t-4 border-black relative">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard icon={<Globe className="text-white" size={24} />} label="Active Sessions" value="42,081" color="bg-purple-500" />
        <StatCard icon={<HardDrive className="text-white" size={24} />} label="Data Transferred" value="1.42 TB" color="bg-pink-500" />
        <StatCard icon={<Users className="text-white" size={24} />} label="Happy Users" value="12.8k+" color="bg-cyan-500" />
      </div>
    </div>
  </section>
);

const AnimatedReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-indigo-950 border-t-4 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-4 py-1 bg-cyan-500 border-2 border-black rounded-full text-black font-bold text-xs uppercase tracking-widest mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
            User Feedback
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none mb-6">
            Trusted by <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Everyone.</span>
          </h2>
          <p className="text-indigo-300 text-lg font-medium max-w-md mb-8">
            See why students, administrators, and designers rely on LabPass for their daily transfers.
          </p>
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-4 border-2 border-black transition-all duration-300 ${
                  activeIndex === index ? "w-12 bg-pink-500" : "w-4 bg-indigo-800"
                } rounded-full`}
              />
            ))}
          </div>
        </div>
        <div className="relative h-[400px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute inset-0"
            >
              <div className="h-full bg-white border-4 border-black rounded-3xl p-8 flex flex-col justify-between shadow-[12px_12px_0px_0px_#000]">
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={24} className="fill-yellow-400 text-black stroke-[3]" />
                    ))}
                  </div>
                  <div className="relative">
                    <MessageSquare size={40} className="text-indigo-100 absolute -top-2 -left-2 -z-10 transform -scale-x-100" />
                    <p className="text-xl md:text-2xl font-bold text-black leading-snug">
                      "{testimonials[activeIndex].content}"
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-t-4 border-gray-100 pt-6 mt-4">
                  <div className={`h-16 w-16 ${testimonials[activeIndex].avatarColor} border-4 border-black rounded-xl flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]`}>
                    <User size={32} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-black text-black text-xl uppercase">{testimonials[activeIndex].name}</h3>
                    <p className="text-sm font-bold text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded inline-block">
                       {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ value, label, color }) => (
  <div className={`${color} p-8 border-4 border-black rounded-3xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] text-center transform transition hover:scale-105`}>
    <p className="text-5xl font-black mb-2 tracking-tighter">{value}</p>
    <p className="text-xs uppercase font-bold tracking-widest opacity-80">{label}</p>
  </div>
);

const SecurityItem = ({ title, icon }) => (
  <div className="flex items-center gap-4 p-4 bg-indigo-900/50 border-4 border-indigo-500/30 rounded-xl hover:bg-indigo-800 hover:border-pink-500 transition-all cursor-default group">
    <div className="bg-yellow-400 text-black p-2 rounded-lg border-2 border-black group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
    </div>
    <p className="font-black text-lg text-indigo-100 group-hover:text-white transition-colors">{title}</p>
  </div>
);

const StatCard = ({ icon, label, value, color }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-black rounded-2xl translate-x-2 translate-y-2" />
    <div className="relative p-6 bg-indigo-900 border-4 border-black rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 hover:translate-x-1 transition-transform bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className={`w-12 h-12 ${color} border-4 border-black rounded-lg flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]`}>
        {icon}
      </div>
      <h4 className="text-4xl font-black text-white mb-1">{value}</h4>
      <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest">{label}</p>
    </div>
  </div>
);

export default LandingPage;