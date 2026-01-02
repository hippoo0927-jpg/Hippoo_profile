import React from 'react';
import VisionClock from './components/VisionClock';
import AIChat from './components/AIChat';
import { PROFILE_DATA, ICONS } from './constants';

const App: React.FC = () => {
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    // [수정] overflow-hidden을 제거하거나 상황에 맞게 조절, 모바일 대응을 위해 h-screen 설정 유지
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Spline Iframe */}
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

      {/* Top Header Section - [수정] 모바일에서는 패딩과 간격을 줄임 */}
      <header className="absolute top-4 md:top-8 left-0 w-full px-4 md:px-12 flex justify-between items-start z-10 pointer-events-none">
        <div className="glass px-3 py-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl pointer-events-auto backdrop-blur-3xl shadow-2xl border border-white/20 flex items-center gap-2 md:gap-4 transition-transform hover:scale-105">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 border-2 border-white/20 shadow-inner">
            <img src="https://picsum.photos/200/200?grayscale" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-white text-sm md:text-lg font-semibold tracking-tight leading-tight">{PROFILE_DATA.name}</h1>
            <p className="text-white/60 text-[10px] md:text-xs font-medium uppercase tracking-widest">{PROFILE_DATA.role}</p>
          </div>
        </div>

        {/* 시계도 모바일에서는 조금 작게 보일 수 있게 내부 컴포넌트 확인 필요 */}
        <div className="scale-75 md:scale-100 origin-right">
            <VisionClock />
        </div>
      </header>

      {/* Left Sidebar UI - [수정] 모바일에서는 왼쪽 하단으로 이동시키거나 크기 조절 */}
      <div className="absolute left-4 md:left-8 top-[60%] md:top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 pointer-events-none">
        <div className="glass-dark p-1.5 md:p-2 rounded-xl md:rounded-2xl flex flex-col gap-2 pointer-events-auto floating shadow-2xl">
          <button 
            onClick={() => handleSocialClick(PROFILE_DATA.socials.discord)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:bg-[#5865F2] hover:text-white transition-all hover:scale-110 active:scale-95 group"
          >
            <ICONS.Discord className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={() => handleSocialClick(PROFILE_DATA.socials.youtube)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:bg-[#FF0000] hover:text-white transition-all hover:scale-110 active:scale-95"
          >
            <ICONS.YouTube className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={() => handleSocialClick(PROFILE_DATA.socials.instagram)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:bg-[#E4405F] hover:text-white transition-all hover:scale-110 active:scale-95"
          >
            <ICONS.Instagram className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="h-px w-full bg-white/10 my-0.5" />
          <button 
            onClick={() => handleSocialClick(PROFILE_DATA.socials.email)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center bg-white/10 text-white/70 hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95"
          >
            <ICONS.Mail className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* Right Sidebar - AI Assistant [수정] 모바일에서는 위치와 크기를 더 타이트하게 조정 */}
      <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 z-20 pointer-events-auto max-w-[calc(100%-2rem)] md:max-w-none">
        <AIChat />
      </div>

    </div>
  );
};

export default App;
