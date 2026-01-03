import React from 'react';
import AnimWrapper from '../components/AnimWrapper';
import { EDUCATION, INTERNSHIPS, CERTIFICATIONS, BRAND_EXPERIENCE } from '../constants';

const Education: React.FC = () => {
  const combinedData = [
    { title: 'Internships', data: INTERNSHIPS },
    { title: 'Brand Experience', data: BRAND_EXPERIENCE },
    { title: 'Certifications', data: CERTIFICATIONS },
    { title: 'Education', data: EDUCATION },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-5xl mx-auto px-6">
      {combinedData.map((section, sIdx) => (
        <div key={sIdx} className="mb-16">
          <AnimWrapper>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">
              {section.title}
            </h2>
          </AnimWrapper>

          <div className="relative border-l border-zinc-800 ml-4 md:ml-0 md:pl-0 space-y-12">
            {section.data.map((edu, idx) => (
              <AnimWrapper key={edu.id} animation="slide-right" delay={idx * 150}>
                <div className="md:grid md:grid-cols-[150px_1fr] gap-8 relative">
                  {/* Dot */}
                  <div className="absolute -left-[5px] top-2 md:left-auto md:-left-[5px] w-2.5 h-2.5 bg-zinc-500 rounded-full ring-4 ring-black"></div>
                  
                  {/* Year */}
                  <div className="pl-8 md:pl-0 md:text-right">
                    <span className="text-xl font-bold text-zinc-500 font-serif">{edu.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="pl-8 md:pl-8 border-l border-zinc-800 md:border-l-0">
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.role}</h3>
                    <div className="text-zinc-400 text-lg">{edu.company}</div>
                    {edu.description && (
                      <p className="mt-4 text-zinc-500 leading-relaxed max-w-xl">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </AnimWrapper>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
