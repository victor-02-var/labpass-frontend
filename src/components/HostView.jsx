import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';
import { QRCodeSVG } from 'qrcode.react';
import { Trash2, Download, Smartphone, ShieldAlert, CheckCircle, Loader2, FileIcon, Link2, Share2, Clock } from 'lucide-react';

const AUTO_DELETE_MS = 3 * 60 * 1000; // 3 Minutes in milliseconds

const HostView = ({ sessionId }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [now, setNow] = useState(Date.now()); // Used to trigger re-renders for the countdown

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
      // Add an ID and Expiry Timestamp to every new file
      const newFile = {
        ...fileData,
        id: Date.now() + Math.random(), // Unique ID
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

  // Timer Effect: Updates 'now' every second and filters out expired files
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);

      setReceivedFiles(prevFiles => {
        // Filter out files where expiresAt has passed
        const validFiles = prevFiles.filter(f => f.expiresAt > currentTime);
        
        // Only update state if files were actually removed (prevents unnecessary re-renders)
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

  // Helper to calculate width of the progress bar
  const getProgressWidth = (expiresAt) => {
    const timeLeft = expiresAt - now;
    const percentage = (timeLeft / AUTO_DELETE_MS) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  // Helper to format time left text
  const formatTimeLeft = (expiresAt) => {
    const secondsLeft = Math.max(0, Math.ceil((expiresAt - now) / 1000));
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pt-24 pb-12 px-4">
      
      <div className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-b ${isConnected ? 'from-emerald-500/20' : 'from-cyan-500/20'} to-transparent rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
        
        <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 rounded-[2.5rem] overflow-hidden shadow-3xl">
          
          <div className="p-6 border-b border-zinc-800/50 bg-zinc-950/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                {isConnected && (
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                  isConnected ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-zinc-800/50 border-zinc-700 text-zinc-500'
                }`}>
                  {isConnected ? <CheckCircle size={20} /> : <Loader2 size={20} className="animate-spin" />}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 leading-none mb-1">Status</p>
                <p className={`text-sm font-black tracking-tight ${isConnected ? 'text-white' : 'text-zinc-400'}`}>
                  {isConnected ? 'UPLINK_LIVE' : 'WAITING_FOR_SENDER'}
                </p>
              </div>
            </div>
            <Smartphone className={isConnected ? 'text-emerald-400' : 'text-zinc-800'} size={24} />
          </div>

          <div className="p-10 flex flex-col items-center">
            <div className="relative p-1">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
              
              <div className="p-4 bg-white rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500 hover:scale-[1.02]">
                <QRCodeSVG value={shareUrl} size={180} level="H" />
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-2 flex items-center justify-center gap-2">
                <Link2 size={12} /> Session ID
              </p>
              <div className="px-6 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl">
                <p className="text-2xl font-black text-white tracking-[0.3em] font-mono select-all">
                  {sessionId}
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            {receivedFiles.length > 0 ? (
              <div className="space-y-4">
                {receivedFiles.map((file) => (
                  <div key={file.id} className="relative overflow-hidden bg-cyan-400 text-zinc-950 rounded-[2rem] p-5 shadow-[0_20px_40px_rgba(34,211,238,0.2)] animate-in zoom-in-95 duration-300">
                    {/* Auto-delete Progress Bar Background */}
                    <div 
                        className="absolute bottom-0 left-0 h-1.5 bg-zinc-950/20 transition-all duration-1000 ease-linear"
                        style={{ width: `${getProgressWidth(file.expiresAt)}%` }}
                    />

                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-zinc-950/10 rounded-2xl flex items-center justify-center">
                        <FileIcon size={24} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <Clock size={10} className="text-zinc-900/60" />
                            <p className="text-[10px] font-mono uppercase font-black tracking-widest opacity-60">
                                Expires in {formatTimeLeft(file.expiresAt)}
                            </p>
                        </div>
                        <p className="font-bold truncate text-sm">{file.name}</p>
                      </div>
                      <button 
                        onClick={() => downloadFile(file)}
                        className="w-12 h-12 bg-white text-zinc-950 rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-xl"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="group/drop border-2 border-dashed border-zinc-800 hover:border-zinc-700 transition-colors rounded-[2rem] p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover/drop:opacity-100 transition-opacity" />
                <Share2 className="mx-auto mb-4 text-zinc-700 group-hover/drop:text-cyan-500 transition-colors" size={32} />
                <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                  Awaiting Incoming Data
                </p>
              </div>
            )}

            <div className="mt-10 space-y-4">
              <button 
                onClick={handleNuke}
                className="w-full group/nuke flex items-center justify-center gap-3 py-4 bg-rose-500/5 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-500 rounded-2xl transition-all duration-500"
              >
                <Trash2 size={16} className="text-rose-500 group-hover/nuke:text-white transition-colors group-hover/nuke:rotate-12" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-rose-500 group-hover/nuke:text-white">Destroy Session</span>
              </button>
              
              <div className="flex items-center justify-center gap-2 px-4 text-center">
                <ShieldAlert size={12} className="text-zinc-600" />
                <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest leading-relaxed">
                  Auto-wipe enabled (3m). Data resides in RAM only.
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