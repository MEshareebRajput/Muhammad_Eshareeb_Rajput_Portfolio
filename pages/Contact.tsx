import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import AnimWrapper from '../components/AnimWrapper';
import { SOCIALS, PERSONAL_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const email = PERSONAL_INFO.email ? PERSONAL_INFO.email.trim() : '';
      if (!email) {
        throw new Error("Configuration Error: Owner email is missing.");
      }

const response = await fetch(`https://formsubmit.co/ajax/13eb2303e63075157c357bb3f8635874`, {
  method: "POST",
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    message: formData.message,
    _subject: `New Portfolio Contact: ${formData.name}`,
    _template: 'table',
    _captcha: 'false'
  })
});
      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error("FormSubmit Error:", result);
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error: any) {
      console.error(error);
      let msg = "Unable to send message automatically.";
      
      // Handle the specific "web server" error which indicates a referrer/origin issue
      if (error.message && error.message.includes("web server")) {
        msg = "Security check failed. Please ensure you are not running this file locally.";
      } else if (error.message && error.message.includes("Unexpected token")) {
        msg = "Service response error. Please try again.";
      }
      
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      {/* Contact Info Side */}
      <div>
        <AnimWrapper animation="fade-up">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Let's Work Together</h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-md">
            Have a project in mind? Reach out to discuss how we can elevate your digital presence.
          </p>
        </AnimWrapper>

        <div className="grid grid-cols-2 gap-6">
          {SOCIALS.map((social, idx) => (
            <AnimWrapper key={idx} delay={idx * 100}>
              <a 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 transition-all duration-300 group"
              >
                <div className="p-3 bg-zinc-950 rounded-full group-hover:scale-110 transition-transform">
                  <social.icon size={20} className="text-zinc-400 group-hover:text-white" />
                </div>
                <span className="text-zinc-300 font-medium group-hover:text-white">{social.platform}</span>
              </a>
            </AnimWrapper>
          ))}
        </div>
        
        <AnimWrapper delay={600} className="mt-12 space-y-4">
           <div className="p-6 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors">
              <p className="text-sm text-zinc-500 mb-2">Direct Email</p>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xl font-serif text-white break-all hover:underline">{PERSONAL_INFO.email}</a>
           </div>
           <div className="p-6 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors">
              <p className="text-sm text-zinc-500 mb-2">Phone</p>
              <p className="text-xl font-serif text-white">{PERSONAL_INFO.phone}</p>
           </div>
        </AnimWrapper>
      </div>

      {/* Form Side */}
      <AnimWrapper animation="slide-right" delay={200}>
        <form onSubmit={handleSubmit} className="bg-zinc-950 p-8 md:p-12 border border-zinc-900 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Success Overlay */}
          {isSuccess && (
            <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center z-20 animate-fade-in-up">
              <CheckCircle size={64} className="text-white mb-4" />
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-zinc-400 text-center max-w-xs">Thank you for reaching out. I will get back to you shortly.</p>
              <button 
                type="button" 
                onClick={() => setIsSuccess(false)}
                className="mt-6 text-sm underline text-zinc-500 hover:text-white"
              >
                Send another message
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded flex flex-col gap-2">
              <div className="flex items-center gap-3 text-red-200">
                <AlertCircle size={20} className="flex-shrink-0" />
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
              <a 
                href={`mailto:${PERSONAL_INFO.email}?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(formData.message)}`}
                className="text-xs text-red-300 hover:text-white underline ml-8"
              >
                Click here to open your email client instead
              </a>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm uppercase tracking-widest text-zinc-500">Name</label>
            <input 
              id="name"
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-zinc-700 py-3 text-white focus:outline-none focus:border-white transition-colors"
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm uppercase tracking-widest text-zinc-500">Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-zinc-700 py-3 text-white focus:outline-none focus:border-white transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm uppercase tracking-widest text-zinc-500">Message</label>
            <textarea 
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-zinc-700 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex justify-center items-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>Sending <Loader2 size={18} className="animate-spin" /></>
            ) : (
              <>Send Message <Send size={18} /></>
            )}
          </button>
        </form>
      </AnimWrapper>
    </div>
  );
};

export default Contact;