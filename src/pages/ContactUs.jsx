import React from 'react';
import { Mail, Github, Clock, ShieldCheck } from 'lucide-react';

const ContactUs = () => {
  return (
    // CHANGE: Removed 'items-center justify-center'. Added 'pt-36' to push content down.
    <div className="min-h-screen bg-indigo-950 font-sans selection:bg-pink-500 selection:text-white flex flex-col items-center pt-36 pb-12 px-4 relative overflow-hidden">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />

      {/* --- MAIN CONTAINER --- */}
      <div className="container max-w-3xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Header Section */}
        <div className="flex items-center mb-12 border-b-4 border-black pb-8 bg-yellow-400 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-4 rounded-xl bg-white border-4 border-black mr-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Mail className="h-10 w-10 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-black text-3xl md:text-5xl text-black tracking-tighter uppercase leading-none mb-2">
              Contact Us
            </h1>
            <p className="text-black font-bold font-mono text-xs md:text-sm uppercase tracking-widest opacity-70">
              Get in touch with the team
            </p>
          </div>
        </div>

        {/* Intro Note */}
        <div className="mb-12 bg-white border-4 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
           <div className="absolute -top-3 -left-3 bg-pink-500 text-white text-[10px] font-black uppercase px-2 py-1 border-2 border-black rotate-[-5deg]">
              Open Channel
           </div>
           <p className="text-lg text-black font-medium leading-relaxed">
             We’d love to hear from you! If you have technical feedback, bug reports, or feature requests for <span className="bg-indigo-100 px-1 border-b-4 border-indigo-500 font-bold">LabPass</span>, our secure bridge is always open.
           </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="space-y-6">
          
          {/* Email Card */}
          <a href="mailto:support.labpass@gmail.com" className="block group">
            <div className="flex items-center p-6 bg-indigo-100 rounded-2xl border-4 border-black transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-3 bg-white rounded-xl mr-5 border-4 border-black group-hover:bg-yellow-400 transition-colors">
                <Mail className="h-6 w-6 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-1">Official Support</p>
                <p className="text-black text-lg md:text-xl font-black group-hover:text-pink-600 transition-colors break-all">
                  support.labpass@gmail.com
                </p>
              </div>
            </div>
          </a>

          {/* GitHub Card */}
          <a href="https://github.com/labpass" target="_blank" rel="noopener noreferrer" className="block group">
            <div className="flex items-center p-6 bg-indigo-100 rounded-2xl border-4 border-black transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-3 bg-white rounded-xl mr-5 border-4 border-black group-hover:bg-yellow-400 transition-colors">
                <Github className="h-6 w-6 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-1">Developer Hub</p>
                <p className="text-black text-lg md:text-xl font-black group-hover:text-pink-600 transition-colors">
                  github.com/labpass
                </p>
              </div>
            </div>
          </a>

          {/* Info Blocks Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Response Time */}
            <div className="p-6 bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-pink-600 font-black text-[10px] uppercase tracking-widest bg-pink-50 w-fit px-2 py-1 rounded border-2 border-pink-100">
                <Clock size={12} strokeWidth={3} /> Sync Interval
              </div>
              <p className="text-black font-black text-xl mt-2">Response Time</p>
              <p className="text-gray-500 text-sm font-bold">Our terminal operators typically respond within 24 hours.</p>
            </div>

            {/* Feedback Note */}
            <div className="p-6 bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2">
               <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-2 py-1 rounded border-2 border-indigo-100">
                <ShieldCheck size={12} strokeWidth={3} /> Community
              </div>
              <p className="text-black font-black text-xl mt-2">Lab Integrity</p>
              <p className="text-gray-500 text-sm font-bold">Your feedback helps us create a safer file bridge for students everywhere.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;