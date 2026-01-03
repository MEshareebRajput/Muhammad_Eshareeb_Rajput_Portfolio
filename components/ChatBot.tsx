import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, User, Bot } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { PERSONAL_INFO, SKILLS, PROJECTS, SERVICES } from '../constants';

// Initialize Gemini Client
const initGemini = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
{
  role: 'model',
  text: `Hi! I'm ${PERSONAL_INFO.name}'s AI assistant. I can explain his skills, experience, and professional work in WordPress, Shopify, and Digital Marketing. You can ask things like: "What projects has he completed recently?"`
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = initGemini();
      if (!ai) {
        setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I can't connect right now. (Missing API Key)" }]);
        setIsLoading(false);
        return;
      }

      // Construct System Context
      const systemInstruction = `
        You are an AI assistant for ${PERSONAL_INFO.name}'s portfolio website.
        Your goal is to professionally and concisely answer questions about ${PERSONAL_INFO.name}.
        
        Here is the context about ${PERSONAL_INFO.name}:
        Bio: ${PERSONAL_INFO.bio}
        Email: ${PERSONAL_INFO.email}
        Skills: ${SKILLS.map(s => s.name).join(', ')}.
        Services: ${SERVICES.map(s => s.title).join(', ')}.
        Key Projects: ${PROJECTS.map(p => `${p.title} (${p.category})`).join(', ')}.
        
        Tone: Professional, helpful, slightly bold but polite.
        Keep answers under 50 words unless asked for detail.
      `;

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
      });

      // Send history + new message
      // Note: For simplicity in this demo, we are just sending the new message with system context.
      // In a full chat app, you'd map 'messages' state to the chat history.
      
      // Since @google/genai chats maintain their own history in the object instance, 
      // we would ideally persist the 'chat' instance. 
      // For this stateless functional component demo, we'll just send the prompt fresh 
      // or rely on a simple generation if complexity is high.
      // Let's use standard generateContent for single-turn Q&A style for robustness in this simple UI.
      
      const prompt = `User Question: "${userMsg}"\nAnswer as the assistant based on the system instructions provided.`;
      
      const response: GenerateContentResponse = await chat.sendMessage({
         message: userMsg 
      });

      const text = response.text || "I didn't catch that. Could you rephrase?";
      
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
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
            <h3 className="font-serif font-bold text-white">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition">
              <X size={18} />
            </button>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-black/50 backdrop-blur-sm">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
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
                  <Loader2 size={16} className="animate-spin text-zinc-400" />
                  <span className="text-xs text-zinc-400">Thinking...</span>
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