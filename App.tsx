
import React from 'react';
import VisionClock from './components/VisionClock';
import AIChat from './components/AIChat';
import { PROFILE_DATA, ICONS } from './constants';

const App: React.FC = () => {
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

      {/* Ambient Gradient Overlays for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

      {/* Top Header Section */}
      <header className="absolute top-8 left-0 w-full px-12 flex justify-between items-start z-10 pointer-events-none">
        <div className="glass px-6 py-4 rounded-3xl pointer-events-auto backdrop-blur-3xl shadow-2xl border border-white/20 flex items-center gap-4 transition-transform hover:scale-105">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-white/20 shadow-inner">
            <img src="https://picsum.photos/200/200?grayscale" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-white text-lg font-semibold tracking-tight leading-tight">{PROFILE_DATA.name}</h1>
            <p className="text-white/60 text-xs font-medium uppercase tracking-widest">{PROFILE_DATA.role}</p>
          </div>
        </div>

        <VisionClock />
      </header>

      {/* Left Sidebar UI - Social Buttons */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 pointer-events-none">
        <div className="glass-dark p-2 rounded-2xl flex flex-col gap-2 pointer-events-auto floating shadow-2xl">
          <button 
            onClick={() => handleSocialClick(PROFILE_DATA.socials.discord)}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:bg-[#5865F2] hover:text-white transition-all hover:scale-110 active:scale-95 group"
            title="Discord"
          >
            <ICONS.Discord className="w-6 h-6" />
          </button>
          <button 
            onClick={() => handleSocialClick(PROFILE_DATA.socials.youtube)}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:bg-[#FF0000] hover:text-white transition-all hover:scale-110 active:scale-95"
            title="YouTube"
          >
            <ICONS.YouTube className="w-6 h-6" />
          </button>
          <button 
            onClick={() => handleSocialClick(PROFILE_DATA.socials.instagram)}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:bg-[#E4405F] hover:text-white transition-all hover:scale-110 active:scale-95"
            title="Instagram"
          >
            <ICONS.Instagram className="w-6 h-6" />
          </button>
          <div className="h-px w-full bg-white/10 my-1" />
          <button 
            onClick={() => handleSocialClick(PROFILE_DATA.socials.email)}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95"
            title="Email"
          >
            <ICONS.Mail className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Sidebar - AI Assistant */}
      <div className="absolute right-8 bottom-8 z-10 pointer-events-auto">
        <AIChat />
      </div>

      {/* UI Decorative Focus Rings and Hints removed as requested */}
    </div>
  );
};

export default App;
