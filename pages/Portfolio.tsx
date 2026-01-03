import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import AnimWrapper from '../components/AnimWrapper';
import { PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-zinc-900 pb-12">
          <AnimWrapper>
            <h4 className="text-zinc-500 text-xs md:text-sm tracking-[0.2em] uppercase mb-4">Selected Works</h4>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Portfolio</h2>
          </AnimWrapper>
          
          <AnimWrapper delay={100}>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-xs uppercase tracking-wider px-6 py-2 rounded-full border transition-all duration-300 ${
                    filter === cat 
                      ? 'bg-white text-black border-white font-bold' 
                      : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimWrapper>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <AnimWrapper key={project.id} animation="fade-up" delay={idx * 100}>
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <article className="h-full flex flex-col bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 hover:bg-zinc-900/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1">
                  
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden border-b border-zinc-800/50">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-zinc-950/80 backdrop-blur-md text-zinc-200 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-zinc-700/50">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-6">
                      <h3 className="text-2xl font-serif font-bold text-white mb-3 leading-tight group-hover:text-zinc-100 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                        <span className="flex items-center justify-center w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs uppercase tracking-widest text-white font-bold group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 gap-2">
                          View Project <ExternalLink size={14} />
                        </span>
                    </div>
                  </div>
                </article>
              </a>
            </AnimWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;