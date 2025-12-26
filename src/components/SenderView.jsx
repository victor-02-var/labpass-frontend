import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';
import { UploadCloud, CheckCircle, Loader2, Wifi, Link, LogOut, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SenderView = () => {
  // 1. Helper to get Session ID from URL (for QR scans)
  const getSessionFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const sessionParam = params.get('session');
    return sessionParam ? sessionParam.toUpperCase() : '';
  };

  // 2. Initialize state
  const urlSessionId = getSessionFromUrl();
  const [sessionId, setSessionId] = useState(urlSessionId);
  const [inputSessionId, setInputSessionId] = useState('');
  
  // Status: 'idle' (waiting for input), 'connecting' (handshaking), 'connected' (ready)
  // If URL has ID, start as 'connecting' immediately
  const [connectionStatus, setConnectionStatus] = useState(urlSessionId ? 'connecting' : 'idle');
  const [uploadStatus, setUploadStatus] = useState('idle');

  // 3. Connection Logic
  useEffect(() => {
    // Only attempt connection if we have an ID and we are in the 'connecting' state
    if (sessionId && connectionStatus === 'connecting') {
      
      if (!socket.connected) {
        socket.connect();
      }

      const handleJoin = () => {
        socket.emit("join-session", sessionId);
      };

      const onJoined = () => {
        // Add a small artificial delay so the user sees the "Success" animation briefly
        setTimeout(() => {
            setConnectionStatus('connected');
        }, 800);
      };

      const onConnectError = () => {
        alert("Connection Failed. Check your network or Session ID.");
        setConnectionStatus('idle');
        setSessionId('');
      };

      // Listeners
      socket.on("connect", handleJoin);
      socket.on("joined", onJoined);
      socket.on("connect_error", onConnectError);

      // If already connected, trigger join immediately
      if (socket.connected) {
         handleJoin();
      }

      return () => {
        socket.off("connect", handleJoin);
        socket.off("joined", onJoined);
        socket.off("connect_error", onConnectError);
      };
    }
  }, [sessionId, connectionStatus]);

  // 4. Handle Manual Connection (Button Click)
  const handleManualConnect = () => {
    const sid = inputSessionId.trim().toUpperCase();
    if (!sid) {
      alert("Please enter a valid Session ID");
      return;
    }
    setSessionId(sid); 
    setConnectionStatus('connecting');
  };

  // 5. Handle Disconnect (Reset everything)
  const handleDisconnect = () => {
    socket.disconnect();
    setSessionId('');
    setInputSessionId('');
    setConnectionStatus('idle');
    setUploadStatus('idle');

    // Clean the URL so refreshing doesn't auto-connect again
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({path: newUrl}, '', newUrl);
  };

  // 6. File Upload Logic
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    if (files.length > 7) {
      alert('Please select up to 7 files at a time.');
      return;
    }

    setUploadStatus('uploading');

    let completed = 0;
    const total = files.length;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const base64Data = loadEvent.target.result;
        
        socket.emit("send-file", {
          sessionId,
          name: file.name,
          data: base64Data
        });

        completed++;
        if (completed === total) {
          setTimeout(() => {
            setUploadStatus('success');
            setTimeout(() => setUploadStatus('idle'), 3000);
          }, 800);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // --- VIEW 1: LOADING / CONNECTING ---
  if (connectionStatus === 'connecting') {
     return (
        <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />
            
            <div className="w-full max-w-sm relative z-10 animate-in fade-in zoom-in-95 duration-500">
                {/* Shadow Block */}
                <div className="absolute inset-0 bg-black rounded-[2rem] translate-x-3 translate-y-3" />
                
                <div className="relative bg-white border-4 border-black rounded-[2rem] p-10 flex flex-col items-center text-center">
                    <div className="relative mb-8">
                        {/* Ping Animation */}
                        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                        <div className="relative w-20 h-20 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center">
                            <Loader2 size={40} className="text-black animate-spin" strokeWidth={2.5} />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-black text-black uppercase mb-2">Establishing Uplink</h2>
                    <p className="text-gray-500 font-bold font-mono">Target: {sessionId}</p>
                    
                    <div className="mt-8 w-full bg-gray-100 h-2 rounded-full overflow-hidden border-2 border-black">
                        <div className="h-full bg-pink-500 w-2/3 animate-[pulse_1s_ease-in-out_infinite]"></div>
                    </div>
                </div>
            </div>
        </div>
     );
  }

  // --- VIEW 2: MANUAL INPUT ---
  if (connectionStatus === 'idle') {
    return (
      <div className="min-h-screen bg-indigo-950 font-sans selection:bg-pink-500 selection:text-white flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />

        <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
           <div className="absolute inset-0 bg-black rounded-[2rem] translate-x-3 translate-y-3" />
           
           <div className="relative bg-white border-4 border-black rounded-[2rem] overflow-hidden p-8 flex flex-col items-center text-center">
             
             <div className="w-16 h-16 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
               <Link size={32} className="text-black" />
             </div>

             <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Join Session</h2>
             <p className="text-gray-500 font-bold mb-8 max-w-xs">Enter the ID displayed on the host device.</p>
             
             <input
               type="text"
               value={inputSessionId}
               onChange={(e) => setInputSessionId(e.target.value.toUpperCase())}
               placeholder="SESSION ID"
               className="w-full px-6 py-4 bg-gray-100 border-4 border-black rounded-xl text-black font-mono text-center text-xl uppercase tracking-[0.2em] focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-500/20 placeholder:text-gray-400 mb-6"
             />
             
             <button
               onClick={handleManualConnect}
               className="w-full py-4 bg-black text-white font-black uppercase tracking-widest rounded-xl hover:bg-gray-800 active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(236,72,153,1)] flex items-center justify-center gap-2"
             >
               Connect Now <ArrowRight size={18} />
             </button>
             
             <p className="text-xs font-bold text-gray-400 mt-6 uppercase tracking-wider">
               Scan QR to auto-connect
             </p>
           </div>
        </div>
      </div>
    );
  }

  // --- VIEW 3: UPLOAD SCREEN (Connected) ---
  return (
    <div className="min-h-screen bg-indigo-950 font-sans selection:bg-pink-500 selection:text-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        <div className="absolute inset-0 bg-black rounded-[2.5rem] translate-x-3 translate-y-3" />

        <div className="relative bg-indigo-100 border-4 border-black rounded-[2.5rem] overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="bg-yellow-400 border-b-4 border-black p-6 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="relative">
                 <span className="absolute inset-0 bg-green-500 animate-ping rounded-full opacity-50"></span>
                 <div className="relative w-10 h-10 bg-black text-green-400 rounded-lg flex items-center justify-center border-2 border-black">
                   <Wifi size={20} strokeWidth={3} />
                 </div>
               </div>
               <div className="text-left leading-tight">
                 <p className="text-[10px] font-black uppercase tracking-widest text-black/60">Connected To</p>
                 <p className="text-xl font-mono font-black text-black tracking-widest">{sessionId}</p>
               </div>
             </div>
             <div className="bg-white px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Zap size={16} className="text-black fill-pink-500"/>
             </div>
          </div>

          <div className="p-8">
            
            {/* Big Upload Area */}
            <div className="relative group mb-8">
              <label className={`
                 relative block w-full aspect-square rounded-3xl border-4 border-black border-dashed cursor-pointer overflow-hidden transition-all duration-300
                 ${uploadStatus === 'idle' ? 'bg-white hover:bg-pink-50 hover:border-pink-500' : ''}
                 ${uploadStatus === 'uploading' ? 'bg-indigo-50 border-indigo-400' : ''}
                 ${uploadStatus === 'success' ? 'bg-green-50 border-green-500' : ''}
              `}>
                <input type="file" multiple className="hidden" onChange={handleFileSelect} disabled={uploadStatus === 'uploading'} />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  
                  {uploadStatus === 'idle' && (
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                       <div className="w-20 h-20 bg-pink-500 text-white rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 group-hover:scale-110 transition-transform">
                         <UploadCloud size={40} strokeWidth={2.5} />
                       </div>
                       <p className="text-2xl font-black text-black uppercase leading-none mb-2">Tap to Upload</p>
                       <p className="text-sm font-bold text-gray-400">Select up to 7 files</p>
                    </motion.div>
                  )}

                  {uploadStatus === 'uploading' && (
                    <div className="flex flex-col items-center">
                       <Loader2 size={60} className="text-indigo-600 animate-spin mb-4" strokeWidth={2.5} />
                       <p className="text-xl font-black text-indigo-900 uppercase animate-pulse">Transmitting...</p>
                    </div>
                  )}

                  {uploadStatus === 'success' && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                       <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                         <CheckCircle size={40} strokeWidth={3} />
                       </div>
                       <p className="text-2xl font-black text-green-700 uppercase">Sent Successfully!</p>
                    </motion.div>
                  )}
                </div>
              </label>
            </div>

            {/* Disconnect Button */}
            <button 
              onClick={handleDisconnect}
              className="w-full py-4 bg-white border-4 border-black rounded-xl font-black uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600 active:translate-y-1 transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
            >
              <LogOut size={20} strokeWidth={3} />
              Disconnect
            </button>
            
            <p className="text-[10px] font-bold text-indigo-900/40 text-center mt-6 uppercase tracking-wider">
              Secure P2P Channel Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderView;