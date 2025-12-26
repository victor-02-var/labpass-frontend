import React from 'react';
import { Printer, Code2, GraduationCap } from 'lucide-react';

const cases = [
    {
        title: "University Labs",
        icon: <GraduationCap size={32}/>,
        desc: "Don't sign into your personal Google Drive on a public library computer. Just beam the file."
    },
    {
        title: "Print Kiosks",
        icon: <Printer size={32}/>,
        desc: "Need to print a PDF but the shop PC is full of viruses? Send it via LabPass without logging in."
    },
    {
        title: "Mobile Dev",
        icon: <Code2 size={32}/>,
        desc: "Quickly move APKs or assets from your dev machine to your test device over local WiFi."
    }
];

const UseCases = () => {
  return (
    <section className="py-24 px-6 bg-indigo-950 border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
             <div className="inline-block bg-pink-500 border-2 border-black px-4 py-1 rounded-full text-white font-bold text-xs uppercase tracking-widest mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Mission Profiles
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none">
                When to use <span className="text-yellow-400">LabPass?</span>
             </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((item, i) => (
                // CHANGE: Changed bg-white to bg-[#F4F3EE] (Warm Parchment)
                <div key={i} className="group relative bg-[#F4F3EE] border-4 border-black p-8 rounded-[2rem] hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_#4f46e5]">
                    <div className="w-16 h-16 bg-yellow-400 border-4 border-black rounded-xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-pink-500 group-hover:text-white transition-colors">
                        {item.icon}
                    </div>
                    <h3 className="text-2xl font-black text-black uppercase mb-3">{item.title}</h3>
                    <p className="text-gray-600 font-bold leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;