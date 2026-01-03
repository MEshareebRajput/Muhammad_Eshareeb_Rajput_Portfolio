import React from 'react';
import AnimWrapper from '../components/AnimWrapper';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-6">
      <AnimWrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">What I Do</h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </div>
      </AnimWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => (
          <AnimWrapper key={service.id} animation="fade-up" delay={idx * 150}>
            <div className="bg-zinc-900/50 p-8 border border-zinc-800 hover:border-zinc-500 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] h-full">
              <div className="mb-6 p-4 bg-zinc-950 inline-block rounded-full group-hover:scale-110 transition-transform duration-300 border border-zinc-800 group-hover:border-white/20">
                <service.icon size={32} className="text-white group-hover:text-zinc-200" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                {service.description}
              </p>
            </div>
          </AnimWrapper>
        ))}
      </div>
    </div>
  );
};

export default Services;
