
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay for better UX on initial load
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Here you would typically trigger your analytics init script
    console.log('Analytics initialized');
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // smooth expo ease
          className="fixed bottom-6 left-6 z-[9000] w-[calc(100%-3rem)] md:max-w-sm"
        >
          <div className="bg-[#1a1a1a] border border-white/10 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm relative overflow-hidden backdrop-blur-xl">
             
             {/* Decorative subtle background glow */}
             <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-[60px] pointer-events-none"></div>

             <div className="flex items-start gap-5 mb-6 relative z-10">
                <div className="p-3 bg-white/5 border border-white/5 rounded-full text-accent shrink-0">
                   <Cookie size={20} />
                </div>
                <div>
                   <h3 className="text-white font-serif text-xl mb-3">Privatsphäre</h3>
                   <p className="text-gray-400 text-xs font-light leading-relaxed tracking-wide">
                     Wir nutzen Cookies und Tracking-Technologien, um Ihr digitales Erlebnis zu personalisieren und unsere Marketingstrategien zu verfeinern. Details finden Sie in unserer <Link to="/datenschutz" className="text-white hover:text-accent underline decoration-white/20 underline-offset-4 transition-colors">Datenschutzerklärung</Link>.
                   </p>
                </div>
             </div>

             <div className="flex flex-col gap-3 relative z-10">
                <button 
                  onClick={handleAccept}
                  className="group w-full py-4 bg-white text-primary text-xs uppercase tracking-[0.15em] font-bold hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Alle Akzeptieren</span>
                </button>
                <button 
                  onClick={handleDecline}
                  className="w-full py-3 bg-transparent border border-white/10 text-white/50 text-[10px] uppercase tracking-[0.15em] hover:border-white/30 hover:text-white transition-colors duration-300"
                >
                  Nur Essenzielle
                </button>
             </div>
             
             {/* Close Button */}
             <button 
               onClick={handleDecline}
               className="absolute top-4 right-4 text-white/10 hover:text-white transition-colors p-2"
               aria-label="Schließen"
             >
               <X size={14} />
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
