
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { PROFILE_DATA } from '../constants';

interface Message {
  id: string;
  user: string;
  text: string;
  role: 'user' | 'model';
  timestamp: string;
  color?: string;
}

interface RealTimeChatProps {
  onClose?: () => void;
}

const RealTimeChat: React.FC<RealTimeChatProps> = ({ onClose }) => {
  const [nickname, setNickname] = useState<string>(localStorage.getItem('chat_nickname') || '');
  const [tempNickname, setTempNickname] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [onlineCount, setOnlineCount] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate real-time vibes with fluctuating online users
    const interval = setInterval(() => {
      setOnlineCount(Math.floor(Math.random() * 5) + 8); // 8~12 users online
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (nickname && messages.length === 0) {
      setMessages([
        {
          id: 'sys-1',
          user: 'System Bot',
          text: `👋 Welcome ${nickname}! You are now connected to the Global Vision Node.`,
          role: 'model',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          color: 'text-blue-400'
        }
      ]);
    }
  }, [nickname]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSetNickname = () => {
    if (tempNickname.trim().length >= 2) {
      const cleanNick = tempNickname.trim().substring(0, 12);
      setNickname(cleanNick);
      localStorage.setItem('chat_nickname', cleanNick);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      user: nickname,
      text: input,
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // AI acting as a room participant
    const responseText = await getAIResponse(`(Context: You are in a real-time group chat. User nickname is ${nickname}) ${input}`);
    
    const modelMsg: Message = {
      id: (Date.now() + 1).toString(),
      user: 'Hippoo_ [Host]',
      text: responseText,
      role: 'model',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: 'text-purple-400'
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  if (!nickname) {
    return (
      <div className="glass-dark w-[90vw] sm:w-96 rounded-[2.5rem] overflow-hidden p-10 flex flex-col items-center gap-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-3xl transition-all">
        <div className="relative">
           <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-2xl rotate-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-black rounded-full animate-pulse"></div>
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black text-white tracking-tight">Spatial Chat</h3>
          <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">Enter the Oasis Network</p>
        </div>

        <div className="w-full space-y-4">
          <div className="relative group">
            <input
              type="text"
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetNickname()}
              placeholder="Pick a nickname..."
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-center font-bold placeholder:text-white/20"
              autoFocus
            />
          </div>
          <button
            onClick={handleSetNickname}
            disabled={tempNickname.trim().length < 2}
            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
          >
            Connect Now
          </button>
        </div>
        <p className="text-[10px] text-white/20 uppercase tracking-widest">{onlineCount + 24} nodes currently active</p>
      </div>
    );
  }

  return (
    <div className="glass-dark w-[95vw] sm:w-[480px] rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/20 max-h-[85vh] backdrop-blur-3xl">
      {/* Dynamic Header */}
      <div className="px-6 py-5 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
             </div>
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Main Channel</h3>
            <div className="flex items-center gap-2">
               <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">{onlineCount} Online</span>
               <span className="text-white/20 text-[10px]">•</span>
               <span className="text-white/40 text-[10px] font-medium">@{nickname}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            if(confirm('Are you sure you want to change your identity?')) {
              localStorage.removeItem('chat_nickname');
              setNickname('');
            }
          }}
          className="p-2 rounded-full hover:bg-white/10 text-white/20 hover:text-white transition-all"
          title="Change Nickname"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        </button>
      </div>
      
      {/* Message Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 min-h-[400px] overflow-y-auto p-6 space-y-6 scrollbar-hide bg-black/20"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} group animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex items-center gap-2 mb-1.5 px-1 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <span className={`text-[10px] font-black uppercase tracking-widest ${m.color || 'text-white/30'}`}>
                {m.user}
              </span>
              <span className="text-[9px] text-white/10 font-medium">{m.timestamp}</span>
            </div>
            <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-[14px] leading-relaxed shadow-xl border ${
              m.role === 'user' 
                ? 'bg-blue-600/30 text-white rounded-tr-none border-blue-400/20' 
                : 'glass text-white/90 rounded-tl-none border-white/10'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start animate-pulse">
            <div className="flex items-center gap-2 mb-1.5 px-1">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Hippoo_ [Thinking]</span>
            </div>
            <div className="glass px-5 py-3 rounded-3xl rounded-tl-none border border-white/10">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-5 bg-white/5 border-t border-white/10 flex gap-3 backdrop-blur-2xl">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Say something to the room..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-white text-black hover:bg-blue-500 hover:text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 transform active:scale-90 disabled:opacity-20 shadow-2xl group"
        >
          <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RealTimeChat;
