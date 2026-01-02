
import React, { useState, useEffect } from 'react';

const VisionClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="glass px-6 py-3 rounded-full flex flex-col items-center justify-center text-white select-none pointer-events-auto shadow-xl">
      <span className="text-xl font-medium tracking-tight leading-none">{formatTime(time)}</span>
      <span className="text-[10px] uppercase tracking-widest opacity-60 mt-0.5">{formatDate(time)}</span>
    </div>
  );
};

export default VisionClock;
