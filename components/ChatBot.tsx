import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, PROJECTS, SERVICES, INTERNSHIPS, BRAND_EXPERIENCE } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

// ================== LOCAL ANSWER ENGINE ==================
// No external API — everything is derived from constants.ts (your own data).

const norm = (s: string) => s.toLowerCase();

const listProjects = (category?: string) => {
  const items = category
    ? PROJECTS.filter(p => norm(p.category) === norm(category))
    : PROJECTS;
  if (items.length === 0) return `I don't have any ${category} projects listed right now.`;
  return items.map(p => `• ${p.title} — ${p.description} (${p.link})`).join('\n');
};

const getAnswer = (question: string): string => {
  const q = norm(question);

  // Greetings
  if (/\b(hi|hello|hey|salam|assalam)\b/.test(q)) {
    return `Hi! I'm ${PERSONAL_INFO.name}'s assistant. Ask me about his projects, skills, or services.`;
  }

  // Contact
  if (/\b(email|contact|reach|phone|whatsapp|number)\b/.test(q)) {
    return `You can reach ${PERSONAL_INFO.name} at ${PERSONAL_INFO.email} or ${PERSONAL_INFO.phone}.`;
  }

  // Location
  if (/\b(location|based|city|where)\b/.test(q)) {
    return `${PERSONAL_INFO.name} is based in ${PERSONAL_INFO.location}.`;
  }

  // Bio / about
  if (/\b(who|about|bio|introduce)\b/.test(q)) {
    return PERSONAL_INFO.bio;
  }

  // Shopify projects
  if (/shopify/.test(q)) {
    return `Shopify projects:\n${listProjects('Shopify')}`;
  }

  // WordPress projects
  if (/wordpress|word press/.test(q)) {
    return `WordPress projects:\n${listProjects('WordPress')}`;
  }

  // Design projects
  if (/design|logo|poster|flyer/.test(q)) {
    return `Design work:\n${listProjects('Design')}`;
  }

  // All projects
  if (/project|work|portfolio/.test(q)) {
    return `Here are the projects:\n${listProjects()}`;
  }

  // Skills
  if (/skill|expert|good at|know/.test(q)) {
    const top = SKILLS.sort((a, b) => b.level - a.level).slice(0, 8).map(s => s.name);
    return `Key skills: ${top.join(', ')}.`;
  }

  // Services
  if (/service|offer|hire|help with/.test(q)) {
    return `Services offered:\n${SERVICES.map(s => `• ${s.title} — ${s.description}`).join('\n')}`;
  }

  // Experience / internships
  if (/experience|intern|worked|career/.test(q)) {
    const exp = [...INTERNSHIPS, ...BRAND_EXPERIENCE]
      .map(e => `• ${e.role} at ${e.company} (${e.year})`)
      .join('\n');
    return `Experience:\n${exp}`;
  }

  // Fallback
  return `I can tell you about ${PERSONAL_INFO.name}'s projects, skills, services, or experience — try asking something like "Show me his Shopify projects" or "What are his skills?"`;
};

// ================== COMPONENT ==================

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Hi! I'm ${PERSONAL_INFO.name}'s assistant. I can tell you about his skills, projects, and services in WordPress, Shopify, and Digital Marketing. Try: "What projects has he completed recently?"`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Small delay so it feels like it's "thinking" — purely cosmetic, fully local.
    setTimeout(() => {
      const reply = getAnswer(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
      setIsLoading(false);
    }, 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden flex flex-col animate-fade-in-up origin-bottom-right">
          <div className="bg-zinc-800 p-4 border-b border-zinc-700 flex justify-between items-center">
            <h3 className="font-serif font-bold text-white">Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition">
              <X size={18} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-black/50 backdrop-blur-sm">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-white text-black rounded-tr-none'
                    : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1 opacity-50 text-xs">
                    {m.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                    <span>{m.role === 'user' ? 'You' : 'Assistant'}</span>
                  </div>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg rounded-tl-none p-3 flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-zinc-900 border-t border-zinc-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about projects..."
              className="flex-1 bg-zinc-950 border border-zinc-800 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-zinc-600 transition"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-white text-black p-2 rounded-md hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
