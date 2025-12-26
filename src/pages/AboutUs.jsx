import React from 'react';
import { Terminal, ShieldCheck, Cpu, Zap, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-indigo-950 font-sans selection:bg-pink-500 selection:text-white flex flex-col items-center pt-36 pb-12 px-4 relative overflow-hidden">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />

      {/* --- MAIN CONTAINER --- */}
      <div className="container max-w-3xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Header Section */}
        <div className="flex items-center mb-12 border-b-4 border-black pb-8 bg-yellow-400 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-4 rounded-xl bg-white border-4 border-black mr-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Terminal className="h-10 w-10 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-black text-4xl md:text-5xl text-black tracking-tighter uppercase leading-none mb-2">
              About Us
            </h1>
            <p className="text-black font-bold font-mono text-xs md:text-sm uppercase tracking-widest opacity-70">
              The Mission & The Method
            </p>
          </div>
        </div>

        {/* Intro Card */}
        <div className="mb-8 bg-white border-4 border-black p-6 md:p-8 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
           <div className="absolute -top-3 -right-3 bg-indigo-500 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black rotate-[2deg]">
              Origin Story
           </div>
           <p className="text-lg md:text-xl text-black font-medium leading-relaxed">
             Welcome to <span className="bg-yellow-200 px-1 border-b-4 border-yellow-500 font-bold">LabPass</span>. We are building the specialized peer-to-peer bridge for the modern student developer.
           </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-indigo-50 border-4 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                <ShieldCheck className="h-8 w-8 text-black mb-4" strokeWidth={2.5} />
                <h3 className="font-black text-xl mb-2 uppercase">The Problem</h3>
                <p className="text-sm font-bold text-gray-600">
                    Logging into personal email or cloud accounts on public lab computers is a security risk. Cookies, keyloggers, and forgotten sessions are real threats.
                </p>
            </div>
            
            <div className="bg-pink-50 border-4 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                <Zap className="h-8 w-8 text-black mb-4" strokeWidth={2.5} />
                <h3 className="font-black text-xl mb-2 uppercase">The Solution</h3>
                <p className="text-sm font-bold text-gray-600">
                    A friction-less terminal. Move that code snippet or PDF to the desktop instantly without ever typing a password or syncing an account.
                </p>
            </div>
        </div>

        {/* Team / Closing Section */}
        <div className="bg-indigo-100 border-4 border-black p-6 md:p-8 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-6">
            <div className="hidden md:block bg-white p-3 rounded-xl border-4 border-black">
                <Users className="h-8 w-8 text-black" />
            </div>
            <div>
                <h3 className="font-black text-xl uppercase mb-3 text-indigo-900">Built by Builders</h3>
                <p className="text-black font-medium leading-relaxed mb-4">
                    Founded by developers who know the struggle of shared workstations, LabPass brings a secure, account-free experience to a simple-to-use terminal that is made for speed, safety, and transparency.
                </p>
                <div className="inline-block bg-black text-white px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors">
                    <Cpu size={14} className="inline mr-2 mb-0.5"/>
                    v1.0.0 Stable
                </div>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;