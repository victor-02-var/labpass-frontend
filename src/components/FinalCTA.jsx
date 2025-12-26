import React from 'react';
import { ArrowRight, ShieldBan } from 'lucide-react';

const FinalCTA = ({ onStart }) => {
  return (
    // CHANGE: Switched to Dark Indigo (bg-indigo-950) to match the footer area
    <section className="py-20 px-6 bg-indigo-950 border-t-4 border-black text-center relative overflow-hidden">
      
      {/* Background Pattern to match Hero/SupportedFormats */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        
        {/* CHANGE: Badge updated to Yellow for high contrast against dark bg */}
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest mb-4 rotate-[-2deg] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <ShieldBan size={12} className="text-black" />
            Stop using USB drives
        </div>
        
        {/* CHANGE: Heading text to White */}
        <h2 className="text-3xl md:text-5xl font-black text-white leading-[0.9] mb-6 uppercase">
            Don't leave your <br/>
            {/* CHANGE: "Digital DNA" now uses a gradient gradient to pop against dark */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              Digital DNA
            </span> 
            <span className="ml-3">behind.</span>
        </h2>
        
        {/* CHANGE: Description text to Indigo-200 for readability */}
        <p className="text-base md:text-lg font-bold text-indigo-200 mb-8 max-w-xl mx-auto leading-relaxed">
            The safest way to use a public computer is to never log in. Bridge your files instantly with LabPass.
        </p>

        {/* CHANGE: Button kept White for maximum contrast, with Pink shadow */}
        <button 
            onClick={onStart}
            className="group relative px-8 py-3 bg-white text-black font-black text-lg rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_#ec4899] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#ec4899] active:translate-y-2 active:shadow-none transition-all flex items-center gap-2 mx-auto"
        >
            Start Transfer
            <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} size={20} />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;