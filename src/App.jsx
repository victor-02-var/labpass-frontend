import React, { useState, useEffect } from 'react';
import HostView from './components/HostView';
import SenderView from './components/SenderView';
import LandingPage from './pages/Home'; 
import AboutUs from './pages/AboutUs'; 
import PrivacyPolicy from './pages/PrivacyPolicy'; 
import ContactUs from './pages/ContactUs';       
import TermsOfService from './pages/TermsOfService'; 
import { Terminal, Cpu, Clock, ShieldCheck, Zap, RefreshCw, ArrowRight } from 'lucide-react';

function App() {
  const [mode, setMode] = useState(null); 
  const [sessionId, setSessionId] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [currentView, setCurrentView] = useState('main'); 
  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const params = new URLSearchParams(window.location.search);
    const sidFromUrl = params.get('sid');

    if (sidFromUrl) {
      setSessionId(sidFromUrl);
      setMode('sender');
      setHasStarted(true); 
    } else {
      let storedId = localStorage.getItem("lab_session_id");
      if (!storedId) {
        storedId = Math.random().toString(36).substring(2, 8).toUpperCase();
        localStorage.setItem("lab_session_id", storedId);
      }
      setSessionId(storedId);
      setMode('host');
    }
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mode) {
    return (
      <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center font-mono overflow-hidden relative text-cyan-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-zinc-950 to-zinc-950" />
        <Zap className="animate-bounce mb-4" size={32} />
        <div className="tracking-[0.5em] animate-pulse uppercase text-xs">[ INITIALIZING_LABPASS_PROTOCOL ]</div>
      </div>
    );
  }

  const isLandingMode = !hasStarted && currentView === 'main';

  const renderContent = () => {
    switch (currentView) {
      case 'about': return <AboutUs />;
      case 'privacy': return <PrivacyPolicy />;
      case 'contact': return <ContactUs />;
      case 'terms': return <TermsOfService />;
      case 'main':
      default:
        if (!hasStarted) {
          return (
            <LandingPage 
              // UPDATED: "Receive" on a lab machine means showing the QR (Host)
              onReceive={() => { 
                setMode('host'); 
                setHasStarted(true); 
              }} 
              // UPDATED: "Send" means navigating to the upload interface (Sender)
              onSend={() => { 
                setMode('sender'); 
                setHasStarted(true); 
              }} 
            />
          );
        }
        return (
          <div className="relative z-10 w-full max-w-md mx-auto pt-32 pb-20 px-4">
            {mode === 'host' ? (
              <HostView sessionId={sessionId} />
            ) : (
              <SenderView sessionId={sessionId} />
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 bg-zinc-950 text-zinc-200">
      
      {/* --- DYNAMIC UNIFIED HEADER --- */}
      <header className={`fixed top-0 w-full z-[100] transition-all duration-300 border-b ${
        scrolled || !isLandingMode ? 'py-4 bg-zinc-950/80 backdrop-blur-xl border-zinc-800/50' : 'py-6 bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LEFT: Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group flex-1"
            onClick={() => { setCurrentView('main'); setHasStarted(false); }}
          >
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center group-hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Zap size={18} className="text-zinc-950 fill-zinc-950" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-black tracking-tighter text-lg uppercase text-white leading-none">LABPASS</h1>
              <span className="text-[8px] font-mono text-cyan-500/60 tracking-widest uppercase mt-1">
                {isLandingMode ? 'PROTOCOL.V1' : `SYS.${currentView.toUpperCase()}`}
              </span>
            </div>
          </div>

          {/* CENTER: Contextual Switch */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            {isLandingMode ? (
              <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it works</a>
                <a href="#protocol" className="hover:text-cyan-400 transition-colors">Security</a>
                <button onClick={() => setCurrentView('about')} className="hover:text-cyan-400 transition-colors">About</button>
              </div>
            ) : (
              <div className="flex items-center gap-10 border-x border-zinc-800/50 px-10">
                <MetadataItem label="SESSION" value={sessionId} icon={<Terminal size={12}/>} />
                <MetadataItem label="STATUS" value="ENCRYPTED" color="text-emerald-500" icon={<ShieldCheck size={12}/>} />
                <MetadataItem label="TIME" value={time.toLocaleTimeString([], { hour12: false })} icon={<Clock size={12}/>} />
              </div>
            )}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center justify-end gap-6 flex-1">
            {isLandingMode ? (
              <button 
                onClick={() => { setMode('host'); setHasStarted(true); }}
                className="px-5 py-2 bg-zinc-100 text-zinc-950 text-xs font-black rounded-lg hover:bg-cyan-400 transition-all active:scale-95 uppercase tracking-wider"
              >
                Launch App
              </button>
            ) : (
              <>
                {hasStarted && (
                  <div className="hidden sm:flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-mono text-emerald-500 uppercase font-bold tracking-tighter">UPLINK_LIVE</span>
                  </div>
                )}
                <button 
                  onClick={() => window.location.reload()}
                  className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-cyan-400 transition-all"
                  title="Restart System"
                >
                  <RefreshCw size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow flex flex-col relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />
        <div className="relative z-10 flex-grow flex flex-col">
          {renderContent()}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full py-12 px-6 border-t border-zinc-900 bg-zinc-950 relative z-50">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-10">
            <FooterLink label="Protocol" isActive={currentView === 'about'} onClick={() => setCurrentView('about')} />
            <FooterLink label="Contact" isActive={currentView === 'contact'} onClick={() => setCurrentView('contact')} />
            <FooterLink label="Privacy" isActive={currentView === 'privacy'} onClick={() => setCurrentView('privacy')} />
            <FooterLink label="Terms" isActive={currentView === 'terms'} onClick={() => setCurrentView('terms')} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-zinc-900/50 pt-8 gap-6 text-[10px] font-mono text-zinc-600">
            <p className="tracking-[0.2em]">© 2025 LABPASS TERMINAL // E2E_BRIDGE</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded border border-zinc-800">
               <Cpu size={12} /> STATUS: <span className="text-emerald-600">SECURE_STABLE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const MetadataItem = ({ label, value, color = "text-zinc-400", icon }) => (
  <div className="flex flex-col items-center group cursor-default">
    <p className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1 group-hover:text-cyan-500 transition-colors">
      {icon} {label}
    </p>
    <p className={`text-[10px] font-mono ${color} tracking-tight`}>{value}</p>
  </div>
);

const FooterLink = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick} 
    className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-500 hover:text-white'}`}
  >
    {label}
  </button>
);

export default App;