import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Education from './pages/Education';
import Contact from './pages/Contact';
import { RoutePath } from './types';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path={RoutePath.HOME} element={<Home />} />
            <Route path={RoutePath.ABOUT} element={<About />} />
            <Route path={RoutePath.SKILLS} element={<Skills />} />
            <Route path={RoutePath.EDUCATION} element={<Education />} />
            <Route path={RoutePath.SERVICES} element={<Services />} />
            <Route path={RoutePath.PORTFOLIO} element={<Portfolio />} />
            <Route path={RoutePath.CONTACT} element={<Contact />} />
          </Routes>
        </main>

        <footer className="py-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} Muhammad Eshareeb Rajput Portfolio. All Rights Reserved.</p>
        </footer>

        <ChatBot />
      </div>
    </Router>
  );
};

export default App;
