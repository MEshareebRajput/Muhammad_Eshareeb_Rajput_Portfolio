import React from 'react';
import AnimWrapper from '../components/AnimWrapper';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-6xl mx-auto px-6">
      <AnimWrapper>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 border-b border-zinc-800 pb-8">Technical Proficiency</h2>
      </AnimWrapper>

      <div className="space-y-16">
        {categories.map((cat, catIdx) => (
          <div key={cat}>
            <AnimWrapper animation="fade-up" delay={catIdx * 100}>
              <h3 className="text-2xl font-bold mb-8 text-zinc-300 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-zinc-500"></span> {cat}
              </h3>
            </AnimWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {SKILLS.filter(s => s.category === cat).map((skill, idx) => (
                <AnimWrapper key={idx} animation="slide-right" delay={(catIdx * 200) + (idx * 100)}>
                  <div className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-lg text-white">{skill.name}</span>
                      <span className="text-zinc-500 group-hover:text-white transition-colors">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-zinc-500 group-hover:bg-white transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </AnimWrapper>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
