import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { RoutePath } from '../types';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Home', path: RoutePath.HOME },
    { name: 'About', path: RoutePath.ABOUT },
    { name: 'Skills', path: RoutePath.SKILLS },
    { name: 'Education', path: RoutePath.EDUCATION },
    { name: 'Services', path: RoutePath.SERVICES },
    { name: 'Projects', path: RoutePath.PORTFOLIO },
    { name: 'Contact', path: RoutePath.CONTACT },
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <NavLink to={RoutePath.HOME} className="text-2xl font-serif font-bold text-white tracking-tighter">
          Portfolio<span className="text-zinc-500">.</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `text-sm uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white border-b border-white pb-1' : 'text-zinc-500 hover:text-white'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 animate-slide-in-right">
          <div className="flex flex-col p-6 space-y-4">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `text-lg font-serif ${isActive ? 'text-white pl-2 border-l-2 border-white' : 'text-zinc-400'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;