
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';

interface Message {
  id: string;
  user: string;
  text: string;
  role: 'user' | 'model' | 'system';
  timestamp: string;
  color?: string;
}

interface RealTimeChatProps {
  onClose?: () => void;
}

// Global channel for cross-tab communication
const chatChannel = new BroadcastChannel('oasis_global_chat');

const RealTimeChat: React.FC<RealTimeChatProps> = ({ onClose }) => {
  // Load initial states from localStorage
  const [nickname, setNickname] = useState<string>(() => localStorage.getItem('chat_nickname') || '');
  const [tempNickname, setTempNickname] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [onlineCount, setOnlineCount] = useState(Math.floor(Math.random() * 3) + 5);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync messages with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data as Message;
      // Only add if it's a new message
      setMessages((prev) => {
        if (prev.find(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
      
      if (msg.role === 'system' && msg.text.includes('connected')) {
        setOnlineCount(p => Math.min(p + 1, 30));
      }
    };

    chatChannel.onmessage = handleMessage;
    return () => {
      chatChannel.onmessage = null;
    };
  }, []);

  // Broadcast entry notification
  useEffect(() => {
    if (nickname && messages.length === 0) {
      const welcomeMsg: Message = {
        id: 'sys-' + Date.now(),
        user: 'System',
        text: `🌐 ${nickname} connected to the Oasis Network.`,
        role: 'system',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMsg]);
      chatChannel.postMessage(welcomeMsg);
    }
  }, [nickname]);

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
      id: 'msg-' + Date.now() + Math.random(),
      user: nickname,
      text: input,
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    chatChannel.postMessage(userMsg); 
    setInput('');

    // AI Moderator Response
    if (input.toLowerCase().includes('hi') || input.toLowerCase().includes('hello') || Math.random() > 0.8) {
        setIsLoading(true);
        const responseText = await getAIResponse(`(Context: Real-time chat with ${nickname}) ${input}`);
        const aiMsg: Message = {
            id: 'ai-' + Date.now() + Math.random(),
            user: 'Hippoo_ [Host]',
            text: responseText,
            role: 'model',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            color: 'text-blue-400'
        };
        setMessages(prev => [...prev, aiMsg]);
        chatChannel.postMessage(aiMsg);
        setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Do you want to reset your identity and history?')) {
      localStorage.removeItem('chat_nickname');
      localStorage.removeItem('chat_history');
      setNickname('');
      setMessages([]);
    }
  };

  if (!nickname) {
    return (
      <div className="glass-dark w-[85vw] sm:w-96 rounded-[2.5rem] overflow-hidden p-10 flex flex-col items-center gap-8 shadow-2xl border border-white/20 backdrop-blur-3xl animate-in fade-in zoom-in-95">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-2xl rotate-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-black text-white">Join Station</h3>
          <p className="text-white/40 text-[10px] mt-2 uppercase tracking-widest font-bold">Encrypted Multi-Tab Session</p>
        </div>
        <div className="w-full space-y-4">
          <input
            type="text"
            value={tempNickname}
            onChange={(e) => setTempNickname(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSetNickname()}
            placeholder="Identity Handle..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            autoFocus
          />
          <button
            onClick={handleSetNickname}
            disabled={tempNickname.trim().length < 2}
            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 disabled:opacity-20 shadow-xl"
          >
            Connect to Oasis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-dark w-[92vw] sm:w-[480px] rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/20 max-h-[75vh] backdrop-blur-3xl">
      <div className="px-6 py-5 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
               <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-4 border-black animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider leading-none mb-1">Live Node 01</h3>
            <div className="flex items-center gap-2">
               <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">{onlineCount} Active</span>
               <span className="text-white/20 text-[10px]">•</span>
               <span className="text-white/40 text-[10px] font-bold">@{nickname}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 rounded-xl hover:bg-white/10 text-white/20 hover:text-red-400 transition-all"
          title="Reset Session"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>
      
      <div ref={scrollRef} className="flex-1 min-h-[350px] overflow-y-auto p-6 space-y-6 scrollbar-hide bg-black/10">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.role === 'system' ? 'items-center my-4' : m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            {m.role !== 'system' && (
              <div className={`flex items-center gap-2 mb-1.5 px-1 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <span className={`text-[9px] font-black uppercase tracking-widest ${m.color || 'text-white/30'}`}>{m.user}</span>
                <span className="text-[8px] text-white/10 font-bold">{m.timestamp}</span>
              </div>
            )}
            <div className={`px-5 py-3.5 rounded-[1.25rem] text-[14px] leading-relaxed shadow-xl border ${
              m.role === 'system' ? 'bg-white/5 text-white/30 border-none italic text-[10px] py-1' :
              m.role === 'user' ? 'bg-blue-600/40 text-white rounded-tr-none border-blue-400/20' :
              'glass text-white/90 rounded-tl-none border-white/10'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-[10px] text-blue-400 font-bold animate-pulse px-2 uppercase">Hippoo is responding...</div>}
      </div>

      <div className="p-6 bg-white/5 border-t border-white/10 flex gap-3 backdrop-blur-3xl">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Message to the room..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-white text-black hover:bg-blue-500 hover:text-white w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-2xl group"
        >
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </div>
  );
};

export default RealTimeChat;
