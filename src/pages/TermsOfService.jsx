import React from 'react';
import { Scale, FileText, ShieldAlert, Cpu } from 'lucide-react';

const TermsOfService = () => {
  const terms = [
    {
      label: 'Service Authorization',
      content:
        'By accessing the LabPass terminal, you are granted a temporary, non-exclusive license to utilize our P2P bridge for the purpose of moving data between your personal device and a public workstation.'
    },
    {
      label: 'Session Ownership',
      content:
        "Every session generated is unique. You are responsible for maintaining the privacy of your session ID. LabPass does not store these IDs on a persistent database; once the session is closed, the connection token is destroyed."
    },
    {
      label: 'Volatile Storage Disclaimer',
      content:
        'We utilize browser RAM for all file handshakes. We do not count traffic contents, but we may utilize local analytics to monitor server load. No data is written to permanent disk storage during this process.'
    },
    {
      label: 'Data Integrity & Safety',
      content:
        'All handshakes are facilitated through secure socket rooms adhering to strict P2P industry practices. We never sell, lease, or monetize user session information or file metadata.'
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-950 font-sans selection:bg-pink-500 selection:text-white flex flex-col items-center pt-36 pb-12 px-4 relative overflow-hidden">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />

      {/* --- MAIN CONTAINER --- */}
      <div className="container max-w-4xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {/* Header Section */}
        <div className="flex items-center mb-12 border-b-4 border-black pb-8 bg-yellow-400 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-4 rounded-xl bg-white border-4 border-black mr-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Scale className="h-10 w-10 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-black text-3xl md:text-5xl text-black tracking-tighter uppercase leading-none mb-2">
              Terms Of Use
            </h1>
            <p className="text-black font-bold font-mono text-xs md:text-sm uppercase tracking-widest opacity-70">
              Legal Protocol & Licensing
            </p>
          </div>
        </div>

        {/* Intro Section */}
        <div className="mb-12 bg-white border-4 border-black p-6 md:p-8 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="absolute -top-3 -right-3 bg-pink-500 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black rotate-[3deg]">
              Digital Sovereignty
            </div>
            <p className="text-lg md:text-xl text-black font-medium leading-relaxed">
              We respect your rights at <span className="bg-indigo-100 px-1 border-b-4 border-indigo-500 font-bold text-indigo-700">LabPass</span>. We are dedicated to safeguarding the temporary nature of your personal data and ensuring a secure P2P environment.
            </p>
        </div>

        {/* Terms Cards */}
        <div className="space-y-6">
          {terms.map((term, index) => (
            <div key={index} className="group relative bg-indigo-50 border-4 border-black rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-all hover:bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              
              <h2 className="text-xl font-black text-black mb-4 flex items-center gap-3 uppercase tracking-tight">
                <div className="w-3 h-3 bg-pink-500 border-2 border-black rounded-none group-hover:rotate-45 transition-transform" />
                {term.label}
              </h2>
              
              <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed group-hover:text-black transition-colors">
                {term.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Stamp */}
        <div className="mt-12 text-center opacity-60">
           <div className="inline-flex items-center gap-2 border-2 border-indigo-500/50 rounded-full px-4 py-1">
             <FileText size={12} className="text-indigo-400" />
             <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest">
               Document Ver 1.0 // Non-Binding Preview
             </span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TermsOfService;