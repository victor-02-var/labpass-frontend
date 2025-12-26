import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
    {
        q: "Is my data stored on a server?",
        a: "No. Your data is streamed peer-to-peer (P2P). Our server only acts as a 'signal tower' to introduce the two devices. Once connected, data flows directly between them."
    },
    {
        q: "Is there a file size limit?",
        a: "Since data is stored in your browser's RAM, the limit depends on your device memory. We recommend keeping transfers under 500MB for stability."
    },
    {
        q: "What happens if I close the tab?",
        a: "The session is instantly destroyed. Since nothing is written to the hard drive, the data evaporates immediately."
    }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    // CHANGE: Used a custom hex #F4F3EE for a deeper, warmer "Parchment" off-white
    <section className="py-24 px-6 bg-[#F4F3EE] border-t-4 border-black relative">
       
       {/* Decorative Dot Pattern (subtle texture) */}
       <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>

       <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-black text-white rounded-lg border-4 border-gray-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    <HelpCircle size={32} />
                </div>
                <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Protocol Queries</h2>
            </div>

            <div className="space-y-4">
                {questions.map((item, i) => (
                    <div key={i} className="border-4 border-black rounded-2xl bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                        <button 
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openIndex === i ? 'bg-indigo-50' : 'bg-white hover:bg-[#FDFDFD]'}`}
                        >
                            <span className="font-black text-lg text-black uppercase">{item.q}</span>
                            <ChevronDown 
                                size={24} 
                                className={`text-black transition-transform border-2 border-black rounded-full ${openIndex === i ? 'rotate-180 bg-yellow-400' : 'bg-white'}`} 
                            />
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div 
                                    initial={{ height: 0 }} 
                                    animate={{ height: "auto" }} 
                                    exit={{ height: 0 }} 
                                    className="overflow-hidden bg-indigo-50"
                                >
                                    <div className="p-6 pt-0 text-gray-700 font-bold leading-relaxed border-t-4 border-black/10">
                                        {item.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
       </div>
    </section>
  );
};

export default FAQ;