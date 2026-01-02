
import React, { useState, useEffect } from 'react';

const ViewCounter: React.FC = () => {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem('view_date');
    const storedViews = localStorage.getItem('today_views');

    let currentViews = 0;

    if (storedDate !== today) {
      currentViews = Math.floor(Math.random() * 50) + 120;
      localStorage.setItem('view_date', today);
    } else {
      currentViews = parseInt(storedViews || '100', 10) + 1;
    }

    setViews(currentViews);
    localStorage.setItem('today_views', currentViews.toString());
  }, []);

  return (
    <div className="glass px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-[1.25rem] flex items-center gap-2 sm:gap-2.5 text-white select-none pointer-events-auto shadow-xl transition-all hover:scale-105 border border-white/20">
      <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-[6px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-blue-400/80 leading-none mb-0.5 sm:mb-1">Live</span>
        <span className="text-[10px] sm:text-base font-bold leading-none tabular-nums tracking-tighter">
          {views.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ViewCounter;
