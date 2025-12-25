import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';
import { UploadCloud, CheckCircle, Loader2, Wifi, Link } from 'lucide-react';

const SenderView = ({ sessionId: initialSessionId }) => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
  const [sessionId, setSessionId] = useState(initialSessionId || '');
  const [isConnected, setIsConnected] = useState(false);
  const [inputSessionId, setInputSessionId] = useState('');

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      if (sessionId) {
        socket.emit("join-session", sessionId);
      }
    });

    socket.on("joined", () => {
      setIsConnected(true);
    });

    return () => {
      socket.off("connect");
      socket.off("joined");
      socket.disconnect();
    };
  }, [sessionId]);

  const handleConnect = () => {
    const sid = inputSessionId.trim().toUpperCase() || sessionId;
    if (!sid) return;
    setSessionId(sid);
    socket.emit("join-session", sid);
  };

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

    files.forEach((file, index) => {
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

  if (!isConnected) {
    return (
      <div className="text-center">
        <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl backdrop-blur-md mb-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Link size={20} className="text-cyan-500" />
            <p className="text-sm text-zinc-500 uppercase font-mono">Connect to Session</p>
          </div>
          <input
            type="text"
            value={inputSessionId}
            onChange={(e) => setInputSessionId(e.target.value.toUpperCase())}
            placeholder="Enter Session ID"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 font-mono text-center uppercase tracking-widest focus:border-cyan-500 focus:outline-none mb-4"
          />
          <button
            onClick={handleConnect}
            className="w-full px-6 py-3 bg-cyan-500 text-zinc-950 font-bold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Connect
          </button>
          <p className="text-xs text-zinc-600 mt-4">
            Scan the QR code on the receiving device or enter the Session ID manually.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Connection Header */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl backdrop-blur-md mb-6 inline-flex items-center gap-3">
        <div className="bg-emerald-500/20 p-2 rounded-full animate-pulse">
            <Wifi size={20} className="text-emerald-400" />
        </div>
        <div className="text-left">
            <p className="text-xs text-zinc-500 uppercase font-mono">Linked to Terminal</p>
            <p className="text-lg font-bold font-mono text-cyan-400 tracking-widest">{sessionId}</p>
        </div>
      </div>

      {/* Big Upload Button Area */}
      <div className="relative group">
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${uploadStatus === 'success' ? 'from-emerald-500 to-green-600' : 'from-cyan-500 to-blue-600'} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
        
        <label className="relative block bg-zinc-900/90 border border-zinc-700/50 hover:border-cyan-500/50 p-12 rounded-3xl cursor-pointer transition-all overflow-hidden">
          <input type="file" multiple className="hidden" onChange={handleFileSelect} disabled={uploadStatus === 'uploading'} />
          
          <div className="flex flex-col items-center justify-center gap-4">
            {uploadStatus === 'idle' && (
                <>
                 <UploadCloud size={64} className="text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
                 <div>
                    <p className="text-xl font-bold text-zinc-100">Tap to Transmit</p>
                    <p className="text-sm text-zinc-500 mt-2">Select one or more files (hold Ctrl/Cmd to select multiple, up to 7)</p>
                 </div>
                </>
            )}

            {uploadStatus === 'uploading' && (
                <>
                 <Loader2 size={64} className="text-cyan-400 animate-spin" />
                 <p className="text-lg font-mono text-cyan-400 animate-pulse">TRANSMITTING DATA...</p>
                </>
            )}

            {uploadStatus === 'success' && (
                <>
                 <CheckCircle size={64} className="text-emerald-400 animate-in zoom-in duration-300" />
                 <p className="text-lg font-bold text-emerald-400">Transfer Complete</p>
                </>
            )}
          </div>
        </label>
      </div>
       <p className="text-xs text-zinc-600 mt-6 max-w-xs mx-auto">
        Privacy Note: Files are streamed directly to the terminal browser and are not saved on cloud servers.
       </p>
    </div>
  );
};

export default SenderView;