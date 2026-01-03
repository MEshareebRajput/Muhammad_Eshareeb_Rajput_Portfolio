import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Download, Eye, Globe, Layers } from "lucide-react";
import AnimWrapper from "../components/AnimWrapper";
import { PERSONAL_INFO, SKILLS } from "../constants";
import { RoutePath } from "../types";

const Home: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center min-h-[90vh] pt-20 px-6 max-w-7xl mx-auto gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left z-10">
          <AnimWrapper animation="fade-up" delay={100}>
            <p className="text-zinc-400 text-sm md:text-base uppercase tracking-[0.2em] mb-4">
              Portfolio & Resume
            </p>
          </AnimWrapper>
          
          <AnimWrapper animation="fade-up" delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight text-white mb-6">
              {PERSONAL_INFO.name}
            </h1>
          </AnimWrapper>
          
          <AnimWrapper animation="fade-up" delay={300}>
            <h2 className="text-xl md:text-2xl text-zinc-300 font-light mb-8">
              {PERSONAL_INFO.title}
            </h2>
          </AnimWrapper>
          
          <AnimWrapper animation="fade-up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="https://drive.google.com/file/d/1FyL-AOzjElK2PB6eGwoA1nIzObWCRWbZ/view" 
                target="_blank"
                className="group relative px-8 py-3 bg-white text-black font-semibold rounded-none overflow-hidden hover:text-white transition-colors duration-300"
              >
                <div className="absolute inset-0 w-full h-full bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={18} /> Download CV
                </span>
              </a>
              
              <NavLink 
                to={RoutePath.PORTFOLIO}
                className="group px-8 py-3 border border-zinc-700 text-white font-semibold hover:border-white hover:bg-zinc-900 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                View Work <Eye size={18} className="group-hover:text-zinc-300" />
              </NavLink>
            </div>
          </AnimWrapper>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full max-w-md md:max-w-full relative">
          <AnimWrapper animation="zoom-in" delay={300}>
            <div className="relative aspect-[3/4] bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 group">
              <img 
                src="https://scontent.fkhi8-1.fna.fbcdn.net/v/t39.30808-6/588641536_122183775542512663_6342891929635303843_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vXA8iVNHoy0Q7kNvwFkm1Sq&_nc_oc=Adk2uptkeq3ihSwW4FNw9QNoh-gEhU5pfo3q0vX939MsyUQ8m7-JDqN0m_99ImbZaoI&_nc_zt=23&_nc_ht=scontent.fkhi8-1.fna&_nc_gid=4P4rdGm6va49-W8_SrMsrA&oh=00_AfqwLWsnmso_DY_-xmEZ0z7tdOkDT7vUfnSlnryFIBwPmA&oe=695F5C2E"
                alt="Muhammad Eshareeb" 
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
          </AnimWrapper>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-black relative overflow-hidden border-t border-zinc-900">
        {isHovering && (
          <div
            className="pointer-events-none fixed w-40 h-40 rounded-full bg-white/5 backdrop-blur-xl transition-transform duration-200"
            style={{ left: cursorPos.x - 80, top: cursorPos.y - 80 }}
          />
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimWrapper animation="fade-up">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h3 className="text-zinc-500 text-sm tracking-[0.2em] uppercase mb-3">Capabilities</h3>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
                  Core <span className="text-zinc-600">Expertise</span>
                </h2>
              </div>
              <NavLink to={RoutePath.SKILLS} className="group flex items-center gap-3 text-white px-6 py-3 border border-zinc-800 hover:bg-white hover:text-black transition-all duration-300">
                Explore All Skills <ArrowRight size={18} />
              </NavLink>
            </div>
          </AnimWrapper>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800"
            onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {SKILLS.slice(0, 3).map((skill, idx) => (
              <AnimWrapper key={idx} animation="fade-up" delay={idx * 150} className="h-full">
                <div className="relative h-96 bg-zinc-950 p-10 flex flex-col justify-between group overflow-hidden hover:bg-zinc-900 transition-colors duration-500">
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 border border-zinc-800 rounded-full text-xs text-zinc-400 mb-4 group-hover:border-zinc-600 transition-colors">
                      {skill.category}
                    </span>
                    <h4 className="text-3xl font-serif text-white">{skill.name}</h4>
                  </div>

                  <div className="absolute right-6 top-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-6xl font-bold text-zinc-800 group-hover:text-zinc-700 select-none font-serif">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">Proficiency</span>
                      <span className="text-xl font-bold text-white">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1 mt-2 overflow-hidden">
                      <div className="bg-white h-full transition-all duration-1000 ease-out" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                </div>
              </AnimWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODULAR BENTO GRID --- */}
      <section className="py-24 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
            <AnimWrapper animation="fade-up" delay={100} className="md:col-span-2">
              <div className="h-full bg-zinc-950 border border-zinc-900 p-8 rounded-3xl flex flex-col justify-between hover:border-zinc-700 transition-colors group">
                <Globe className="text-zinc-500 mb-8 group-hover:text-white transition-colors" size={32} />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Global Vision</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Building scalable digital products that connect brands with global audiences through strategic development.
                  </p>
                </div>
              </div>
            </AnimWrapper>

            <AnimWrapper animation="fade-up" delay={200}>
              <div className="h-full bg-white p-8 rounded-3xl flex flex-col justify-center items-center text-black">
                <span className="text-5xl font-serif font-black mb-2">95%</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Client Satisfaction</span>
              </div>
            </AnimWrapper>

            <AnimWrapper animation="fade-up" delay={300}>
              <div className="h-full bg-zinc-950 border border-zinc-900 p-8 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">Available for <br /> new projects</p>
              </div>
            </AnimWrapper>

            <AnimWrapper animation="fade-up" delay={400} className="md:col-span-4">
              <div className="h-full bg-zinc-900/40 border border-zinc-800 p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-black rounded-2xl border border-zinc-800">
                    <Layers size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Digital Craft & Stack</h3>
                    <p className="text-zinc-500 text-sm">Focused on performance, clarity, and real‑world impact.</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Digital Marketing", "Shopify Development", "Social Media Management"].map(stack => (
                    <span key={stack} className="px-5 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-[10px] uppercase font-bold tracking-widest text-zinc-300">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </AnimWrapper>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Home;
