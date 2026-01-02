
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
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Top Header Section - Fixed Horizontal Layout for all devices */}
      <header className="absolute top-4 sm:top-8 left-0 w-full px-4 sm:px-12 flex flex-row items-center justify-between z-20 pointer-events-none">
        <div className="flex flex-row items-center gap-2 sm:gap-4 pointer-events-auto">
          {/* Left: Profile Card */}
          <div className="glass px-3 py-1.5 sm:px-5 sm:py-3 rounded-[1.25rem] sm:rounded-[1.5rem] backdrop-blur-3xl shadow-2xl border border-white/20 flex items-center gap-2 sm:gap-3 transition-all hover:scale-105">
            <div className="w-7 h-7 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20 flex-shrink-0">
              <img src="https://picsum.photos/200/200?grayscale" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 pr-1">
              <h1 className="text-white text-[10px] sm:text-base font-black truncate leading-none">{PROFILE_DATA.name}</h1>
              <p className="text-white/40 text-[7px] sm:text-[10px] font-black uppercase tracking-tighter truncate mt-0.5 sm:mt-1">{PROFILE_DATA.role}</p>
            </div>
          </div>
          
          {/* Right of Profile: View Counter */}
          <div className="flex-shrink-0">
            <ViewCounter />
          </div>
        </div>

        {/* Right Top: Clock and Date */}
        <div className="pointer-events-auto flex-shrink-0 ml-2">
          <VisionClock />
        </div>
      </header>

      {/* Social Sidebar - Vertical alignment preserved */}
      <div className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="glass-dark p-2 rounded-2xl sm:rounded-[1.5rem] flex flex-col gap-2 sm:gap-3 pointer-events-auto floating shadow-2xl border border-white/10 backdrop-blur-3xl">
          <button onClick={() => handleSocialClick(PROFILE_DATA.socials.discord)} className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/5 text-white/60 hover:bg-[#5865F2] hover:text-white transition-all transform hover:scale-110"><ICONS.Discord className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          <button onClick={() => handleSocialClick(PROFILE_DATA.socials.youtube)} className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/5 text-white/60 hover:bg-[#FF0000] hover:text-white transition-all transform hover:scale-110"><ICONS.YouTube className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          <button onClick={() => handleSocialClick(PROFILE_DATA.socials.instagram)} className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/5 text-white/60 hover:bg-[#E4405F] hover:text-white transition-all transform hover:scale-110"><ICONS.Instagram className="w-5 h-5 sm:w-6 sm:h-6" /></button>
          <div className="h-px w-full bg-white/10 my-0.5 sm:my-1" />
          <button onClick={() => handleSocialClick(PROFILE_DATA.socials.email)} className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/5 text-white/60 hover:bg-white hover:text-black transition-all transform hover:scale-110"><ICONS.Mail className="w-4 h-4 sm:w-5 sm:h-5" /></button>
        </div>
      </div>

      {/* Right Bottom Chat Toggle */}
      <div className="absolute right-4 sm:right-10 bottom-6 sm:bottom-10 z-30 flex flex-col items-end gap-6">
        {isChatOpen && (
          <div className="animate-in fade-in zoom-in-95 slide-in-from-right-8 duration-500 origin-bottom-right">
            <RealTimeChat onClose={() => setIsChatOpen(false)} />
          </div>
        )}
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-700 transform ${
            isChatOpen ? 'bg-white text-black rotate-90 scale-110' : 'glass text-white border-2 border-white/30 hover:scale-110 shadow-white/5'
          }`}
        >
          {isChatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <div className="flex flex-col gap-1 sm:gap-1.5 items-center">
               <span className="w-6 sm:w-8 h-0.5 bg-current rounded-full"></span>
               <span className="w-6 sm:w-8 h-0.5 bg-current rounded-full"></span>
               <span className="w-4 sm:w-5 h-0.5 bg-current rounded-full self-start ml-1 opacity-60"></span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
