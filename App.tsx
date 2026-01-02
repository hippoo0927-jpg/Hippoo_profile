
import React, { useState } from 'react';
import VisionClock from './components/VisionClock';
import ViewCounter from './components/ViewCounter';
import RealTimeChat from './components/RealTimeChat';
import { PROFILE_DATA, ICONS } from './constants';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Spline Iframe - Radial Glass */}
      <div className="absolute inset-0 z-0 scale-105">
        <iframe 
          src='https://my.spline.design/radialglass-eKB2T1RLigKOsKHnmwJbnrfJ/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-auto"
          title="Spline 3D Radial Glass"
        />
      </div>

      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

      {/* Top Header Section - Enhanced for all screen sizes */}
      <header className="absolute top-4 sm:top-8 left-0 w-full px-4 sm:px-12 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto max-w-[80%]">
          {/* Profile Card */}
          <div className="glass px-3 py-2 sm:px-5 sm:py-3 rounded-2xl backdrop-blur-3xl shadow-2xl border border-white/20 flex items-center gap-2 sm:gap-3 transition-all hover:scale-105">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20 flex-shrink-0">
              <img src="https://picsum.photos/200/200?grayscale" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="text-white text-[10px] sm:text-base font-bold truncate leading-none">{PROFILE_DATA.name}</h1>
              <p className="text-white/50 text-[8px] sm:text-[10px] font-medium uppercase tracking-tighter truncate mt-0.5">{PROFILE_DATA.role}</p>
            </div>
          </div>
          
          {/* Today View Counter (Live Traffic) - Fixed Visibility */}
          <div className="flex-shrink-0">
            <ViewCounter />
          </div>
        </div>

        <div className="pointer-events-auto hidden xs:block">
          <VisionClock />
        </div>
      </header>

      {/* Social Sidebar */}
      <div className="absolute left-4 sm:left-8 bottom-24 sm:top-1/2 sm:-translate-y-1/2 z-20 pointer-events-none">
        <div className="glass-dark p-2 rounded-2xl flex flex-row sm:flex-col gap-2 pointer-events-auto floating shadow-2xl border border-white/10">
          <button onClick={() => handleSocialClick(PROFILE_DATA.socials.discord)} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-white/5 text-white/70 hover:bg-[#5865F2] hover:text-white transition-all"><ICONS.Discord className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          <button onClick={() => handleSocialClick(PROFILE_DATA.socials.youtube)} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-white/5 text-white/70 hover:bg-[#FF0000] hover:text-white transition-all"><ICONS.YouTube className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          <button onClick={() => handleSocialClick(PROFILE_DATA.socials.instagram)} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-white/5 text-white/70 hover:bg-[#E4405F] hover:text-white transition-all"><ICONS.Instagram className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          <div className="hidden sm:block h-px w-full bg-white/10 my-1" />
          <button onClick={() => handleSocialClick(PROFILE_DATA.socials.email)} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-white/5 text-white/70 hover:bg-white hover:text-black transition-all"><ICONS.Mail className="w-4 h-4 sm:w-5 sm:h-5" /></button>
        </div>
      </div>

      {/* Right Sidebar - Chat Toggle (Menu Icon) */}
      <div className="absolute right-4 sm:right-8 bottom-6 sm:bottom-8 z-30 flex flex-col items-end gap-4">
        {isChatOpen && (
          <div className="animate-in fade-in zoom-in-95 slide-in-from-right-8 duration-300 origin-bottom-right">
            <RealTimeChat onClose={() => setIsChatOpen(false)} />
          </div>
        )}
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-500 transform ${
            isChatOpen ? 'bg-white text-black rotate-90 scale-110' : 'glass text-white border-2 border-white/30 hover:scale-110'
          }`}
        >
          {isChatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <div className="flex flex-col gap-1.5 items-center">
               <span className="w-7 h-0.5 bg-current rounded-full"></span>
               <span className="w-7 h-0.5 bg-current rounded-full"></span>
               <span className="w-4 h-0.5 bg-current rounded-full self-start ml-1"></span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
