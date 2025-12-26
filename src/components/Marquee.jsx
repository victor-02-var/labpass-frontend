import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Marquee = () => {
  const items = [
    "NO LOGS KEPT", "P2P ENCRYPTED", "RAM STORAGE ONLY", 
    "ZERO FOOTPRINT", "OPEN SOURCE", "VOLATILE MEMORY"
  ];

  return (
    <div className="bg-yellow-400 border-y-4 border-black py-4 overflow-hidden flex relative z-20 rotate-[-1deg] scale-105 my-12">
      <motion.div 
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 text-2xl font-black text-black uppercase tracking-tighter">
                {item}
                <Zap size={24} className="fill-black" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;