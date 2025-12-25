import React from 'react';
import { FileText, ShieldAlert, Cpu, Globe, Scale } from 'lucide-react';

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
    <div className="container mx-auto px-6 py-16 max-w-4xl font-sans bg-zinc-950">
      {/* Header Section - Software License Style */}
      <div className="flex items-center mb-10 border-b border-zinc-900 pb-8">
        <div className="flex items-center space-x-5">
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <Scale className="h-9 w-9 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-mono text-3xl font-bold text-white tracking-tighter uppercase italic">
              Terms Of Use
            </h1>
            
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="text-zinc-300 leading-relaxed space-y-12">
        <p className="text-lg text-zinc-400">
          We respect your digital sovereignty at <span className="text-cyan-400 font-semibold">LabPass</span> and are dedicated to safeguarding the temporary nature of your personal data.
        </p>

        {terms.map((term, index) => (
          <div key={index} className="relative group border-l-2 border-zinc-900 pl-8 hover:border-cyan-500/50 transition-colors duration-500">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              {term.label}
            </h2>
            <p className="text-base md:text-lg text-zinc-500 group-hover:text-zinc-300 transition-colors">
              {term.content}
            </p>
          </div>
        ))}

        
      </div>
    </div>
  );
};

export default TermsOfService;