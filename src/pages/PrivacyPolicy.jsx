import React from 'react';
import { ShieldCheck, Lock, Trash2, EyeOff } from 'lucide-react';

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
    <div className="container mx-auto px-6 py-16 max-w-4xl font-sans bg-zinc-950 text-zinc-300">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-12 border-b border-zinc-900 pb-8">
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
          <ShieldCheck className="h-10 w-10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
        </div>
        <div>
          <h1 className="font-mono text-3xl font-bold text-white tracking-tighter uppercase italic">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 tracking-widest uppercase">Encryption Standard: AES-256-Signal</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.number} className="relative group">
            {/* Numbering logic from your TownMate example */}
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-cyan-500 font-mono text-sm border border-cyan-500/30 px-2 py-0.5 rounded">
                0{section.number}
              </span> 
              {section.title}
            </h2>
            
            <div className="ml-10 space-y-4 text-base md:text-lg leading-relaxed text-zinc-400">
              {section.content.map((line, idx) =>
                line.startsWith('-') ? (
                  <li key={idx} className="list-none flex items-center gap-3 text-cyan-500/80">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
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
    
    </div>
  );
};

export default PrivacyPolicy;