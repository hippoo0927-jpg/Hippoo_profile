
import React, { useState, useEffect } from 'react';

const VisionClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="glass px-3 py-1.5 sm:px-6 sm:py-3 rounded-[1.25rem] sm:rounded-full flex flex-col items-center justify-center text-white select-none pointer-events-auto shadow-xl border border-white/20">
      <span className="text-xs sm:text-xl font-bold tracking-tight leading-none">{formatTime(time)}</span>
      <span className="text-[7px] sm:text-[10px] uppercase tracking-widest opacity-50 font-black mt-0.5">{formatDate(time)}</span>
    </div>
  );
};

export default VisionClock;
