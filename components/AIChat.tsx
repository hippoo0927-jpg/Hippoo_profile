
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { PROFILE_DATA } from '../constants';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Hello! I'm ${PROFILE_DATA.name}'s digital twin. Ask me anything about my journey or the experiences I build.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getAIResponse(input);
    const modelMsg: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="glass-dark w-full max-w-sm rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/10">
      <div className="p-4 border-b border-white/10 bg-white/5">
        <h3 className="text-sm font-semibold text-white/90">Personal Assistant</h3>
      </div>
      
      <div 
        ref={scrollRef}
        className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-hide"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-blue-600/60 text-white rounded-tr-none' 
                : 'bg-white/10 text-white/80 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none text-xs text-white/50 animate-pulse">
              AI is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white/5 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me something..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button 
          onClick={handleSend}
          className="bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIChat;
