import React, { useState, useEffect } from 'react';
import HostView from './components/HostView';
import SenderView from './components/SenderView';
import LandingPage from './pages/Home'; 
import AboutUs from './pages/AboutUs'; 
import PrivacyPolicy from './pages/PrivacyPolicy'; 
import ContactUs from './pages/ContactUs';       
import TermsOfService from './pages/TermsOfService'; 
import { Terminal, Cpu, Clock, ShieldCheck, Zap, RefreshCw, Gamepad2 } from 'lucide-react';

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

  // --- 1. LOADING SCREEN (Gamified) ---
  if (!mode) {
    return (
      <div className="h-screen bg-indigo-950 flex flex-col items-center justify-center font-sans overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-20" />
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 border-8 border-black border-t-pink-500 rounded-full animate-spin mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white" />
            <div className="text-yellow-400 font-black tracking-[0.2em] animate-pulse text-xl drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                LOADING SYSTEM...
            </div>
        </div>
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
              onReceive={() => { 
                setMode('host'); 
                setHasStarted(true); 
              }} 
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
    <div className="min-h-screen flex flex-col font-sans selection:bg-pink-500 selection:text-white bg-indigo-950 text-indigo-50">
      
      {/* --- DYNAMIC HEADER (Neo-Brutalism) --- */}
     {/* --- DYNAMIC HEADER (Transparent Glass) --- */}
      <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled || !isLandingMode 
          ? 'py-3 bg-indigo-950/60 backdrop-blur-md border-b border-white/10 text-white shadow-lg' 
          : 'py-6 bg-transparent text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* LEFT: Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group flex-1"
            onClick={() => { setCurrentView('main'); setHasStarted(false); }}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 border-white/20 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] ${scrolled || !isLandingMode ? 'bg-white/10' : 'bg-black/50 border-white'}`}>
              <Zap size={20} className="text-yellow-400 fill-yellow-400" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-black tracking-tighter text-xl uppercase leading-none text-white">
                LABPASS
              </h1>
              <span className={`text-[10px] font-bold tracking-widest uppercase mt-0.5 ${scrolled || !isLandingMode ? 'text-indigo-200' : 'text-indigo-300'}`}>
                {isLandingMode ? 'VER 1.0' : `MODE: ${currentView.toUpperCase()}`}
              </span>
            </div>
          </div>

          {/* CENTER: Contextual Switch */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            {isLandingMode ? (
              <div className="flex items-center gap-8 text-sm font-black uppercase tracking-widest text-indigo-200">
                <a href="#how-it-works" className="hover:text-pink-500 transition-colors hover:-translate-y-0.5 inline-block">How It Works</a>
                <a href="#protocol" className="hover:text-pink-500 transition-colors hover:-translate-y-0.5 inline-block">Security</a>
                <button onClick={() => setCurrentView('about')} className="hover:text-pink-500 transition-colors hover:-translate-y-0.5 inline-block">ABOUT</button>
              </div>
            ) : (
             <div className="flex items-center justify-center px-6 py-2 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm">
  <p className="text-xs font-black text-indigo-100 uppercase tracking-widest whitespace-nowrap">
    Zero-Friction Data Transfer with End-to-End Encryption
  </p>
</div>
            )}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center justify-end gap-6 flex-1">
            {isLandingMode ? (
              <button 
                onClick={() => { setMode('host'); setHasStarted(true); }}
                className="px-6 py-2.5 font-black text-xs rounded-lg uppercase tracking-wider border-2 border-white/20 bg-pink-500 text-white hover:bg-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)] active:translate-y-0.5 transition-all"
              >
                Launch App
              </button>
            ) : (
              <>
                {hasStarted && (
                  <div className="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/50 px-3 py-1.5 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-wider">ONLINE</span>
                  </div>
                )}
                <button 
                  onClick={() => window.location.reload()}
                  className="p-2 border border-white/20 rounded-lg transition-all hover:bg-white/10 active:scale-95 text-white"
                  title="Restart System"
                >
                  <RefreshCw size={18} strokeWidth={2} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow flex flex-col relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_2px,transparent_2px),linear-gradient(to_bottom,#4f46e5_2px,transparent_2px)] bg-[size:3rem_3rem] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 flex-grow flex flex-col">
          {renderContent()}
        </div>
      </main>

      {/* --- FOOTER (Indigo Theme) --- */}
      <footer className="w-full py-12 px-6 bg-indigo-900 text-yellow-400 border-t-2 border-yellow-500 relative z-50">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-10">
            <FooterLink label="ABOUT" isActive={currentView === 'about'} onClick={() => setCurrentView('about')} />
            <FooterLink label="Contact" isActive={currentView === 'contact'} onClick={() => setCurrentView('contact')} />
            <FooterLink label="Privacy" isActive={currentView === 'privacy'} onClick={() => setCurrentView('privacy')} />
            <FooterLink label="Terms" isActive={currentView === 'terms'} onClick={() => setCurrentView('terms')} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center w-full border-t border-yellow-500/50 pt-8 gap-6 text-xs font-mono">
            <p className="tracking-[0.2em] text-yellow-300">© 2025 LABPASS TERMINAL // LEVEL_1</p>
      
          </div>
        </div>
      </footer>
    </div>
  );
}

const MetadataItem = ({ label, value, icon, dark }) => (
  <div className="flex flex-col items-center group cursor-default">
    <p className={`text-[9px] font-black uppercase tracking-widest mb-0.5 flex items-center gap-1 ${dark ? 'text-black/50' : 'text-indigo-300'}`}>
      {icon} {label}
    </p>
    <p className={`text-xs font-mono font-bold tracking-tight ${dark ? 'text-black' : 'text-white'}`}>{value}</p>
  </div>
);

const FooterLink = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick} 
    className={`text-sm uppercase tracking-[0.2em] font-black transition-all hover:-translate-y-1 ${isActive ? 'text-pink-500' : 'text-zinc-400 hover:text-white'}`}
  >
    {label}
  </button>
);

export default App;