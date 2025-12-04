
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white/40 pb-12 px-6 md:px-12 pt-12 border-t border-white/5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest gap-8 md:gap-4">
        
        <div className="text-center md:text-left">
          <span className="block font-bold text-white/60 mb-1">© {currentYear} Liebscher Messestandbau</span>
          <span className="text-[10px] opacity-50 lowercase">Individueller Messebau aus Berlin</span>
        </div>
        
        <nav className="flex flex-wrap justify-center space-x-8">
          <Link to="/impressum" className="hover:text-white transition-colors cursor-hover p-2">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-white transition-colors cursor-hover p-2">Datenschutz</Link>
          <Link to="/contact" className="hover:text-white transition-colors cursor-hover p-2">Kontakt</Link>
        </nav>
      </div>
    </footer>
  );
};
