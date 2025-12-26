import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { 
  Trash2, Download, Smartphone, ShieldAlert, CheckCircle, 
  Loader2, FileIcon, Link2, Share2, Clock, Zap 
} from 'lucide-react';

const AUTO_DELETE_MS = 3 * 60 * 1000; // 3 Minutes

const HostView = ({ sessionId }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [now, setNow] = useState(Date.now());

  // IMPORTANT: Replace with your actual Frontend URL
  const FRONTEND_URL = "https://labpass-frontend.vercel.app"; 
  const shareUrl = `${FRONTEND_URL}?sid=${sessionId}`;

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to relay server");
      socket.emit("join-session", sessionId);
    });

    socket.on("peer-joined", () => {
      setIsConnected(true);
    });

    socket.on("receive-file", (fileData) => {
      const newFile = {
        ...fileData,
        id: Date.now() + Math.random(),
        receivedAt: Date.now(),
        expiresAt: Date.now() + AUTO_DELETE_MS
      };
      setReceivedFiles(prev => [...prev, newFile]);
    });

    socket.on("force-wipe", handleNuke);

    socket.on("connect_error", (err) => {
      console.error("Connection Error:", err.message);
    });

    return () => {
      socket.off("peer-joined");
      socket.off("receive-file");
      socket.off("force-wipe");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      setReceivedFiles(prevFiles => {
        const validFiles = prevFiles.filter(f => f.expiresAt > currentTime);
        if (validFiles.length !== prevFiles.length) {
          return validFiles;
        }
        return prevFiles;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNuke = () => {
    localStorage.removeItem("lab_session_id");
    window.location.reload();
  };

  const downloadFile = (fileData) => {
    const link = document.createElement("a");
    link.href = fileData.data;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getProgressWidth = (expiresAt) => {
    const timeLeft = expiresAt - now;
    const percentage = (timeLeft / AUTO_DELETE_MS) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  const formatTimeLeft = (expiresAt) => {
    const secondsLeft = Math.max(0, Math.ceil((expiresAt - now) / 1000));
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-indigo-950 font-sans selection:bg-pink-500 selection:text-white relative overflow-x-hidden flex items-center justify-center p-4">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none -z-10" />
      
      {/* --- MAIN CARD CONTAINER --- */}
      <div className="w-full max-w-md relative animate-in fade-in zoom-in-95 duration-500">
        
        {/* Decorative Card Shadow Block */}
        <div className="absolute inset-0 bg-black rounded-[2.5rem] translate-x-3 translate-y-3" />

        {/* Changed bg-white to bg-indigo-100 for theme consistency */}
        <div className="relative bg-indigo-100 border-4 border-black rounded-[2.5rem] overflow-hidden flex flex-col">
          
          {/* HEADER: Status Bar (Kept Yellow for contrast) */}
          <div className="p-6 border-b-4 border-black bg-yellow-400 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 border-4 border-black rounded-xl flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors ${isConnected ? 'text-green-600' : 'text-gray-400'}`}>
                {isConnected ? <CheckCircle size={24} strokeWidth={3} /> : <Loader2 size={24} className="animate-spin" strokeWidth={3} />}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-black/60 mb-1">System Status</p>
                <div className={`inline-block px-2 py-0.5 border-2 border-black rounded text-xs font-black uppercase tracking-tight ${isConnected ? 'bg-green-500 text-white' : 'bg-white text-black'}`}>
                  {isConnected ? 'LINK_ESTABLISHED' : 'WAITING_SIGNAL'}
                </div>
              </div>
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-yellow-400">
              <Smartphone size={20} />
            </div>
          </div>

          {/* BODY: QR & Files - Changed bg-white to bg-indigo-100 */}
          <div className="p-8 flex flex-col items-center bg-indigo-100">
            
            {/* QR Code Section */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-pink-500 rounded-2xl translate-x-2 translate-y-2 border-4 border-black" />
              <div className="relative p-4 bg-white border-4 border-black rounded-2xl transition-transform hover:-translate-y-1 hover:translate-x-1">
                <QRCodeSVG value={shareUrl} size={160} level="H" />
              </div>
            </div>
            
            {/* Session ID Box */}
            <div className="w-full mb-8">
              <div className="flex items-center justify-center gap-2 mb-2 text-indigo-900/60">
                <Link2 size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure ID</span>
              </div>
              <div className="bg-black text-white p-4 rounded-xl text-center border-4 border-black shadow-[4px_4px_0px_0px_#a855f7]">
                <p className="text-xl font-mono tracking-widest font-bold select-all">{sessionId}</p>
              </div>
            </div>

            {/* File List Area */}
            <div className="w-full space-y-4">
              {receivedFiles.length > 0 ? (
                receivedFiles.map((file) => (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    key={file.id} 
                    // Changed bg-purple-100 to bg-white for better contrast against the new indigo background
                    className="relative bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {/* Auto-delete Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-2 bg-black w-full z-0">
                       <div 
                         className="h-full bg-pink-500 transition-all duration-1000 ease-linear origin-left"
                         style={{ width: `${getProgressWidth(file.expiresAt)}%` }}
                       />
                    </div>

                    <div className="relative z-10 p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 border-4 border-black rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <FileIcon size={24} strokeWidth={2.5} />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                         <div className="flex items-center gap-2 mb-1">
                            <Clock size={12} className="text-black" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-black">
                               {formatTimeLeft(file.expiresAt)} Left
                            </span>
                         </div>
                         <p className="font-bold text-black text-sm truncate pr-2">{file.name}</p>
                      </div>

                      <button 
                        onClick={() => downloadFile(file)}
                        className="w-12 h-12 bg-green-400 border-4 border-black rounded-full flex items-center justify-center hover:bg-green-300 active:translate-y-1 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <Download size={20} className="text-black" strokeWidth={3} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                // Updated empty state colors to blend better with indigo background
                <div className="border-4 border-dashed border-indigo-300/50 rounded-2xl p-8 text-center bg-white/40">
                  <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600">
                    <Share2 size={32} />
                  </div>
                  <p className="text-xs font-black text-indigo-900/50 uppercase tracking-widest">
                    Awaiting Data Stream
                  </p>
                </div>
              )}
            </div>

            {/* Footer / Actions */}
            <div className="mt-10 w-full">
              <button 
                onClick={handleNuke}
                className="w-full group relative py-4 bg-red-500 text-white border-4 border-black rounded-xl font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none active:bg-red-600 transition-all flex items-center justify-center gap-3"
              >
                <Trash2 size={20} strokeWidth={3} />
                Terminate Session
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 opacity-60 font-mono">
                <ShieldAlert size={14} className="text-indigo-900" />
                <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider">
                  RAM-only storage. Auto-wipes in 3m.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HostView;