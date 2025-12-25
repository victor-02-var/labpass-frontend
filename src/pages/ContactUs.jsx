import React from 'react';
import { Mail, Instagram, MessageSquare, Clock, ShieldCheck, Github } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl font-sans">
      
      {/* 1. Header Section - Terminal Style */}
      <div className="flex items-center mb-10 border-b border-zinc-800 pb-8">
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mr-5">
          <Mail className="h-10 w-10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
        </div>
        <div>
          <h1 className="font-mono text-3xl font-bold text-white tracking-tighter uppercase italic">
            Contact Us
          </h1>
         
        </div>
      </div>

      {/* 2. Intro Note */}
      <p className="mb-12 text-lg text-zinc-400 leading-relaxed">
        We’d love to hear from you! If you have technical feedback, bug reports, or feature requests for <span className="text-cyan-400 font-semibold">LabPass</span>, our secure bridge is always open.
      </p>

      {/* 3. Contact Cards Grid */}
      <div className="space-y-6">
        
        {/* Email Card */}
        <div className="flex items-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-cyan-500/30 transition-all group backdrop-blur-sm">
          <div className="p-3 bg-zinc-950 rounded-xl mr-5 group-hover:bg-cyan-500/10 transition-colors">
            <Mail className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">Official Support</p>
            <a href="mailto:support.labpass@gmail.com" className="text-white text-lg font-bold hover:text-cyan-400 transition-colors">
              support.labpass@gmail.com
            </a>
          </div>
        </div>

        {/* Instagram/GitHub Card (Multi-Social) */}
        <div className="flex items-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-cyan-500/30 transition-all group backdrop-blur-sm">
          <div className="p-3 bg-zinc-950 rounded-xl mr-5 group-hover:bg-cyan-500/10 transition-colors">
            <Github className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">Developer Hub</p>
            <a href="https://github.com/labpass" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-bold hover:text-cyan-400 transition-colors">
              github.com/labpass
            </a>
          </div>
        </div>

        {/* Info Blocks Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Response Time */}
          <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-[10px] uppercase tracking-widest">
              <Clock size={12} /> Sync Interval
            </div>
            <p className="text-white font-bold text-base">Response Time</p>
            <p className="text-zinc-500 text-sm">Our terminal operators typically respond within 24 hours.</p>
          </div>

          {/* Feedback Note */}
          <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 flex flex-col gap-2">
             <div className="flex items-center gap-2 text-cyan-500 font-mono text-[10px] uppercase tracking-widest">
              <ShieldCheck size={12} /> Community Security
            </div>
            <p className="text-white font-bold text-base">Lab Integrity</p>
            <p className="text-zinc-500 text-sm">Your feedback helps us create a safer file bridge for students everywhere.</p>
          </div>
        </div>

      </div>

      {/* 4. Closing Prompt */}
     
    </div>
  );
};

export default ContactUs;