import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, PROJECTS, SERVICES, INTERNSHIPS, BRAND_EXPERIENCE, SOCIALS } from '../constants';
import { Project } from '../types';

const WHATSAPP_LINK = SOCIALS.find(s => s.platform === 'WhatsApp')?.url || 'https://wa.me/923282300151';

interface Message {
  role: 'user' | 'model';
  text: string;
  projects?: Project[];
  showWhatsapp?: boolean;
}

// ================== LOCAL FAQ ENGINE ==================
// Fully local — answers are generated from constants.ts plus the knowledge below.
// Add/update personal data here when you want the portfolio assistant to know more.

const norm = (s: string) =>
  s.toLowerCase().replace(/[^\w\s@.+#/-]/g, ' ').replace(/\s+/g, ' ').trim();

type Rule = {
  test: (q: string) => boolean;
  reply: (q: string) => { text: string; projects?: Project[]; showWhatsapp?: boolean };
};

const KNOWLEDGE = {
  name: PERSONAL_INFO.name,
  email: PERSONAL_INFO.email,
  phone: PERSONAL_INFO.phone,
  location: PERSONAL_INFO.location,

  role: 'Social Media Manager | Digital Marketing',
  additionalRole: 'Shopify Developer / WordPress Developer',
  availability: 'Based in Karachi, Pakistan and available for remote work.',
  experienceSummary:
    'Hands-on experience in social media management, digital marketing, content creation, Meta Ads, e-commerce, Shopify and WordPress.',

  marketing: [
    'Social Media Management',
    'Social Media Marketing',
    'Content Creation',
    'Digital Marketing',
    'Meta Ads',
    'Facebook',
    'Instagram',
    'TikTok',
    'X',
    'Canva',
    'Social Media Analytics',
    'E-commerce Marketing'
  ],

  ecommerce: [
    'Shopify store setup and management',
    'Shopify website customization',
    'WordPress website development and management',
    'WooCommerce-compatible WordPress work',
    'Product/content updates',
    'Basic e-commerce operations'
  ],

  web: [
    'WordPress',
    'Shopify',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'MERN-stack background'
  ],

  design: [
    'Canva-based social media designs',
    'Posts',
    'Banners',
    'Promotional creatives',
    'Marketing graphics'
  ],

  brands: [
    'Mr Clothing Craft',
    'Hardware Galaxy Solutions',
    'Tough Gym Fitness'
  ],

  workflow:
    'For marketing work, he can help with content planning, social media management, creative posts, campaigns, ads and analytics. For websites, he can work with WordPress and Shopify.',

  contact:
    `You can contact ${PERSONAL_INFO.name} by email, phone or WhatsApp.`
};

const rules: Rule[] = [
  // ---------- Casual ----------
  {
    test: q => /\b(how are you|kya hal|kaisa hai|kese ho|whats up|what s up)\b/.test(q),
    reply: () => ({
      text: `I'm doing great, thanks for asking! 😊 I'm ${KNOWLEDGE.name}'s portfolio assistant. Ask me about his experience, skills, services, projects, Shopify, WordPress, digital marketing or social media work.`
    })
  },
  {
    test: q => /\b(hi|hello|hey|salam|assalam|aoa)\b/.test(q),
    reply: () => ({
      text: `Hi there! I'm ${KNOWLEDGE.name}'s portfolio assistant. You can ask me about his skills, experience, projects, services, social media work, Shopify, WordPress, or contact details.`
    })
  },
  {
    test: q => /\b(thank|shukriya|thanks)\b/.test(q),
    reply: () => ({
      text: `You're welcome! 😊 If you want to discuss a project or collaboration, ${KNOWLEDGE.name} can be contacted directly on WhatsApp.`,
      showWhatsapp: true
    })
  },
  {
    test: q => /\b(bye|goodbye|allah hafiz|khuda hafiz|see you)\b/.test(q),
    reply: () => ({
      text: `Take care! If you'd like to discuss a project, reach out anytime.`,
      showWhatsapp: true
    })
  },
  {
    test: q => /\b(who are you|what are you|bot ho|ai ho|assistant)\b/.test(q),
    reply: () => ({
      text: `I'm a portfolio assistant built to answer common questions about ${KNOWLEDGE.name}'s work, skills, services, experience and projects.`
    })
  },

  // ---------- Contact ----------
  {
    test: q => /\b(email|contact|reach|phone|number|call|mail)\b/.test(q),
    reply: () => ({
      text: `${KNOWLEDGE.name}'s contact details:\n• Email: ${KNOWLEDGE.email}\n• Phone: ${KNOWLEDGE.phone}\n• WhatsApp: available below`,
      showWhatsapp: true
    })
  },
  {
    test: q => /\b(whatsapp|wa)\b/.test(q),
    reply: () => ({
      text: `Sure — you can chat with ${KNOWLEDGE.name} directly on WhatsApp.`,
      showWhatsapp: true
    })
  },
  {
    test: q => /\b(location|based|city|where.*(live|located)|karachi|remote)\b/.test(q),
    reply: () => ({
      text: KNOWLEDGE.availability
    })
  },

  // ---------- About ----------
  {
    test: q => /\b(who is|about him|bio|introduce|about eshareeb|about muhammad)\b/.test(q),
    reply: () => ({
      text: `${PERSONAL_INFO.bio}\n\nCurrent positioning: ${KNOWLEDGE.role}. He also works with Shopify and WordPress for e-commerce and website projects.`
    })
  },
  {
    test: q => /\b(role|title|position|job title|what does he do|what does eshareeb do)\b/.test(q),
    reply: () => ({
      text: `His current professional focus is ${KNOWLEDGE.role}. He also has practical experience with ${KNOWLEDGE.additionalRole}.`
    })
  },
  {
    test: q => /\b(available|availability|hire him|hire|freelance|freelancer|remote work|work remotely)\b/.test(q),
    reply: () => ({
      text: `${KNOWLEDGE.name} is available for freelance and remote opportunities. He can help with social media management, digital marketing, content creation, Shopify and WordPress work.`,
      showWhatsapp: true
    })
  },

  // ---------- Marketing ----------
  {
    test: q => /\b(digital marketing|marketing)\b/.test(q),
    reply: () => ({
      text: `Digital marketing experience includes:\n• ${KNOWLEDGE.marketing.join('\n• ')}`
    })
  },
  {
    test: q => /\b(social media|social media manager|social media management|instagram|facebook|tiktok|twitter|x)\b/.test(q),
    reply: () => ({
      text: `Social media work includes:\n• Social Media Management\n• Content Creation\n• Facebook & Instagram management\n• TikTok content\n• X/social content\n• Meta Ads\n• Analytics and performance review\n• Promotional campaigns`
    })
  },
  {
    test: q => /\b(meta ads|facebook ads|instagram ads|paid ads|advertising|ads)\b/.test(q),
    reply: () => ({
      text: `He has hands-on experience with Meta Ads Manager and social advertising, including campaign setup/management, creative planning and performance monitoring.`
    })
  },
  {
    test: q => /\b(content|content creation|posts|social posts|creative)\b/.test(q),
    reply: () => ({
      text: `Content work includes social media posts, promotional creatives, campaign content and Canva-based marketing designs. He focuses on content suitable for fashion, e-commerce, business and fitness brands.`
    })
  },
  {
    test: q => /\b(canva|graphic design|designing|designer|poster|banner|flyer|creative design)\b/.test(q),
    reply: () => ({
      text: `He creates marketing and social media designs using Canva, including posts, banners, promotional graphics and campaign creatives. His portfolio includes edited/design work created for client and brand projects.`
    })
  },
  {
    test: q => /\b(video editing|video editor|premiere|after effects|capcut)\b/.test(q),
    reply: () => ({
      text: `His main focus is social media management, digital marketing and content creation. Video editing is not listed as a primary professional skill, so for detailed video-production requirements it's best to discuss the exact project directly.`,
      showWhatsapp: true
    })
  },

  // ---------- Shopify / WordPress ----------
  {
    test: q => /\b(shopify|shopify developer|shopify store|ecommerce store)\b/.test(q),
    reply: () => ({
      text: `Shopify experience includes store setup and management, website customization and e-commerce content/product work. Here are the Shopify projects in the portfolio:`,
      projects: PROJECTS.filter(p => norm(p.category) === 'shopify')
    })
  },
  {
    test: q => /\b(wordpress|word press|woocommerce)\b/.test(q),
    reply: () => ({
      text: `WordPress experience includes website development, customization and management, with WooCommerce-compatible e-commerce work. Here are the WordPress projects in the portfolio:`,
      projects: PROJECTS.filter(p => norm(p.category) === 'wordpress')
    })
  },
  {
    test: q => /\b(website|web development|web developer|frontend|react|javascript|mern|html|css)\b/.test(q),
    reply: () => ({
      text: `His technical background includes ${KNOWLEDGE.web.join(', ')}. His current professional focus is digital marketing/social media, while WordPress and Shopify remain part of his practical e-commerce and website skill set.`
    })
  },

  // ---------- Projects ----------
  {
    test: q => /\b(project|work|portfolio|recently|case stud|show me)\b/.test(q),
    reply: () => ({
      text: `Here's a look at his portfolio projects:`,
      projects: PROJECTS
    })
  },
  {
    test: q => /\b(design|logo|poster|flyer|graphic)\b/.test(q),
    reply: () => ({
      text: `Here's his design work:`,
      projects: PROJECTS.filter(p => norm(p.category) === 'design')
    })
  },
  {
    test: q => /\b(mr clothing craft|clothing brand|fashion brand)\b/.test(q),
    reply: () => ({
      text: `Mr Clothing Craft is one of his brand/e-commerce experiences. His work includes social media management, digital marketing, content creation and Shopify-related website work.`
    })
  },
  {
    test: q => /\b(hardware galaxy|hardware galaxy solutions)\b/.test(q),
    reply: () => ({
      text: `Hardware Galaxy Solutions is a B2B enterprise IT/networking brand he has worked with on social media content and marketing assets across platforms such as Facebook, Instagram, X and LinkedIn.`
    })
  },
  {
    test: q => /\b(tough gym|tough gym fitness|gym project)\b/.test(q),
    reply: () => ({
      text: `Tough Gym Fitness is a fitness/gym web and marketing project in his portfolio, including WordPress website work and social media/creative assets.`
    })
  },

  // ---------- Skills ----------
  {
    test: q => /\b(skill|skills|expert|good at|know how to|stack|technology|technologies)\b/.test(q),
    reply: () => {
      const top = [...SKILLS].sort((a, b) => b.level - a.level).slice(0, 12).map(s => s.name);
      return {
        text: `Key portfolio skills include:\n• ${top.join('\n• ')}\n\nAdditional areas: ${KNOWLEDGE.marketing.join(', ')}.`
      };
    }
  },

  // ---------- Services ----------
  {
    test: q => /\b(service|services|offer|help with|what can he do|what do you offer)\b/.test(q),
    reply: () => ({
      text: `${SERVICES.map(s => `• ${s.title} — ${s.description}`).join('\n')}\n\nHe can also discuss custom social media, digital marketing, Shopify and WordPress requirements directly.`,
      showWhatsapp: true
    })
  },
  {
    test: q => /\b(pricing|price|cost|rate|budget|charges|how much)\b/.test(q),
    reply: () => ({
      text: `Pricing depends on the project scope, deliverables, platforms and timeline. For an exact quote, share the project details with ${KNOWLEDGE.name} on WhatsApp.`,
      showWhatsapp: true
    })
  },

  // ---------- Experience ----------
  {
    test: q => /\b(experience|intern|worked|career|background|companies|brands)\b/.test(q),
    reply: () => {
      const exp = [...INTERNSHIPS, ...BRAND_EXPERIENCE]
        .map(e => `• ${e.role} at ${e.company} (${e.year})`)
        .join('\n');
      return {
        text: `Experience:\n${exp}\n\nFocus areas include ${KNOWLEDGE.experienceSummary}`
      };
    }
  },

  // ---------- Education ----------
  {
    test: q => /\b(education|qualification|degree|college|diploma|study|studied)\b/.test(q),
    reply: () => ({
      text: `His background includes Intermediate Pre-Engineering studies and professional IT/web-development training. His learning path also includes web development, React/MERN-related training and digital marketing.`
    })
  },

  // ---------- Process ----------
  {
    test: q => /\b(process|how do you work|workflow|how can we work|start a project|project start)\b/.test(q),
    reply: () => ({
      text: `A typical workflow is:\n1. Understand the business and project requirements\n2. Define the content/website deliverables\n3. Prepare the required creatives, updates or campaigns\n4. Implement and review the work\n5. Monitor results and make improvements\n\nFor a custom project, share your requirements directly on WhatsApp.`,
      showWhatsapp: true
    })
  },

  // ---------- Collaboration ----------
  {
    test: q => /\b(collab|collaboration|partnership|client|clients|agency|company)\b/.test(q),
    reply: () => ({
      text: `He is open to freelance, remote and client-based opportunities, especially around social media management, digital marketing, e-commerce, Shopify and WordPress.`,
      showWhatsapp: true
    })
  }
];

const getAnswer = (question: string): { text: string; projects?: Project[]; showWhatsapp?: boolean } => {
  const q = norm(question);

  for (const rule of rules) {
    if (rule.test(q)) return rule.reply(q);
  }

  // Fallback — couldn't confidently match.
  return {
    text: `I don't have a ready answer for that yet. You can ask me about ${KNOWLEDGE.name}'s skills, experience, projects, social media work, digital marketing, Shopify, WordPress, services or contact details. For anything else, message him directly on WhatsApp.`,
    showWhatsapp: true
  };
};

// ================== UI SUBCOMPONENTS ==================

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-zinc-950 border border-zinc-800 rounded-md p-2.5 hover:border-zinc-600 transition group"
  >
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-white text-xs font-semibold truncate">{project.title}</p>
        <p className="text-zinc-400 text-[11px] mt-0.5 line-clamp-2">{project.description}</p>
        <span className="inline-block mt-1 text-[10px] uppercase tracking-wide text-zinc-500">{project.category}</span>
      </div>
      <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white transition shrink-0 mt-0.5" />
    </div>
  </a>
);

const WhatsappCTA: React.FC = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-2 inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-md transition"
  >
    Chat on WhatsApp <ExternalLink size={12} />
  </a>
);

// ================== COMPONENT ==================

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Hi! I'm ${PERSONAL_INFO.name}'s assistant. Ask me about his skills, projects, or services — try "Show me his Shopify projects".`
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

    setTimeout(() => {
      const { text, projects, showWhatsapp } = getAnswer(userMsg);
      setMessages(prev => [...prev, { role: 'model', text, projects, showWhatsapp }]);
      setIsLoading(false);
    }, 350);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden flex flex-col animate-fade-in-up origin-bottom-right">
          <div className="bg-zinc-800 p-4 border-b border-zinc-700 flex justify-between items-center">
            <h3 className="font-serif font-bold text-white">Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition">
              <X size={18} />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-black/50 backdrop-blur-sm">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-3 text-sm whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-white text-black rounded-tr-none'
                    : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                }`}>
                  <div className="flex items-center gap-2 mb-1 opacity-50 text-xs">
                    {m.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                    <span>{m.role === 'user' ? 'You' : 'Assistant'}</span>
                  </div>
                  {m.text}

                  {m.projects && m.projects.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {m.projects.map(p => <ProjectCard key={p.id} project={p} />)}
                    </div>
                  )}

                  {m.showWhatsapp && <WhatsappCTA />}
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
