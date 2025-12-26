import React from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      number: 1,
      title: 'Information Protocol',
      content: [
        'LabPass is designed as a zero-knowledge bridge. We only collect session data when it is technically necessary to facilitate the peer-to-peer handshake between your devices.',
        'Information we do NOT collect:',
        '- Your permanent name or identity',
        '- Your phone number or email address',
        '- Long-term geographical tracking data',
        '- File contents (all files exist only in your browser RAM)'
      ]
    },
    {
      number: 2,
      title: 'Technical Implementation',
      content: [
        'We use your temporary session ID and socket connection to:',
        '- Establish a signaling room for your devices',
        '- Relay encrypted handshakes for WebRTC pairing',
        '- Maintain the live bridge during active transfers',
        '- Trigger the remote "Nuke" command across linked devices'
      ]
    },
    {
      number: 3,
      title: 'The Volatile Data Rule',
      content: [
        "Data retention on LabPass is strictly limited to the duration of your session. Once you close the tab, trigger a Nuke command, or exceed the 5-minute idle timer, all data residing in the volatile memory (RAM) is permanently purged and cannot be recovered."
      ]
    },
    {
      number: 4,
      title: 'Third-Party Interfacing',
      content: [
        "We do not sell, trade, or otherwise transfer your session data to outside parties. Our signaling server acts as a pass-through only. This Privacy Policy applies only to the LabPass terminal and does not cover external websites linked within our 'About' or 'Documentation' sections."
      ]
    },
    {
      number: 5,
      title: 'Your Security Rights',
      content: [
        'You have the absolute right to terminate a session at any time. By utilizing the "Nuke Session" feature, you are exercising your right to immediate data erasure across all paired browser environments.'
      ]
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
            <ShieldCheck className="h-10 w-10 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-black text-3xl md:text-5xl text-black tracking-tighter uppercase leading-none mb-2">
              Privacy Policy
            </h1>
            <p className="text-black font-bold font-mono text-xs md:text-sm uppercase tracking-widest opacity-70">
              Encryption Standard: AES-256-Signal
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.number} className="relative group bg-white border-4 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
              
              <h2 className="text-xl md:text-2xl font-black text-black mb-6 flex items-center gap-4 uppercase tracking-tight">
                <span className="bg-black text-white font-mono text-sm px-3 py-1 rounded border-2 border-black group-hover:bg-pink-500 group-hover:border-pink-500 transition-colors">
                  0{section.number}
                </span> 
                {section.title}
              </h2>
              
              <div className="ml-0 md:ml-12 space-y-3 text-base md:text-lg leading-relaxed text-black font-medium">
                {section.content.map((line, idx) =>
                  line.startsWith('-') ? (
                    <li key={idx} className="list-none flex items-start gap-3 text-indigo-700 font-bold">
                      <div className="w-2 h-2 bg-pink-500 border border-black rounded-full mt-2.5 flex-shrink-0" />
                      {line.slice(2)}
                    </li>
                  ) : (
                    <p key={idx}>{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-black text-white p-6 rounded-2xl border-4 border-indigo-500 text-center font-mono text-xs md:text-sm">
            <Lock size={16} className="inline-block mr-2 mb-1 text-yellow-400" />
            <span className="uppercase tracking-widest">Last Updated: October 2025</span>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;