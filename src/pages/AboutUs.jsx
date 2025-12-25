import React from 'react';
import { Terminal, ShieldCheck, Cpu, Zap } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl font-sans">
      {/* Header Section - Kept LabPass Style, Content Structure from TownMate */}
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <Terminal className="h-12 w-12 text-cyan-400 mb-4" />
        <h1 className="font-mono text-3xl font-bold text-white tracking-tighter uppercase italic">
          About LabPass
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mt-2 rounded-full"></div>
      </div>

      {/* Content Section - Based on your TownMate example */}
      <div className="text-zinc-300 leading-relaxed space-y-8 text-base md:text-lg">
        <p>
          Welcome to <span className="font-semibold text-cyan-400">LabPass</span>, a specialized peer-to-peer bridge designed specifically for modern students and developers.
        </p>

        <p>
          LabPass was born out of a simple idea — making it convenient for young professionals and students to transfer files to shared computer labs without risking their digital privacy. No more logging into personal accounts on public hardware.
        </p>

        <p>
          From assisting you in moving large code snippets to that one critical PDF for your assignment, our platform ensures your files reach the desktop without the friction of email syncs or the danger of saved cookies.
        </p>

        <p>
          Founded by developers who know the struggle of shared workstations, LabPass brings a secure, account-free experience to a simple-to-use terminal that is made for speed, safety, and transparency.
        </p>

        <p>
          Whether you are moving a quick screenshot or a complex project file, LabPass is here to act as your temporary digital bridge between your mobile device and the community workstation.
        </p>

        
      </div>
    </div>
  );
};

export default AboutUs;