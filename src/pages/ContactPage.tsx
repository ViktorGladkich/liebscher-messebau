import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ContactPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo('.contact-reveal',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      );

      // 2. Info Columns Reveal
      gsap.fromTo('.info-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.8 }
      );

      // 3. Form Reveal
      gsap.fromTo('.form-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 1 }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-secondary min-h-screen w-full pt-32 md:pt-48 pb-32">
      
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="max-w-5xl">
          <span className="contact-reveal block text-xs font-bold uppercase tracking-widest text-accent mb-8">
            04 — Kontakt
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] text-primary">
            <div className="overflow-hidden mb-2">
              <span className="contact-reveal block">Starten wir</span>
            </div>
            <div className="overflow-hidden">
              <span className="contact-reveal block">die <span className="italic text-accent">Konversation.</span></span>
            </div>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 border-t border-primary/10 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
          
          {/* Left Column: Info */}
          <div className="space-y-16">
            
            <div className="info-item grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Neugeschäft</h4>
                  <a href="mailto:newbusiness@liebscher-messe.de" className="block text-xl md:text-2xl font-serif text-primary hover:text-accent transition-colors mb-2">
                    newbusiness@<br/>liebscher.de
                  </a>
                  <p className="text-gray-500 font-light">+49 30 1234 5678</p>
               </div>
               <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Presse & Info</h4>
                  <a href="mailto:info@liebscher-messe.de" className="block text-xl md:text-2xl font-serif text-primary hover:text-accent transition-colors mb-2">
                    info@<br/>liebscher.de
                  </a>
               </div>
            </div>

            <div className="info-item">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Studio Berlin</h4>
              <p className="text-xl font-light text-primary leading-relaxed">
                Industriestraße 45<br/>
                10115 Berlin<br/>
                Deutschland
              </p>
              <a href="#" className="inline-block mt-4 text-xs uppercase tracking-widest border-b border-primary/30 pb-1 hover:border-primary transition-colors">
                Auf Karte zeigen
              </a>
            </div>

            <div className="info-item">
               <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Social</h4>
               <div className="flex flex-col gap-4 items-start">
                  {['Instagram', 'LinkedIn', 'Pinterest', 'Behance'].map((social) => (
                    <a key={social} href="#" className="text-lg text-primary hover:text-accent transition-colors flex items-center gap-4 group">
                      {social}
                      <span className="w-0 h-[1px] bg-accent group-hover:w-8 transition-all duration-300"></span>
                    </a>
                  ))}
               </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="lg:pl-12">
             <form className="space-y-12">
                <div className="form-item group relative">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Ihr Name</label>
                  <input type="text" placeholder="Wie dürfen wir Sie ansprechen?" className="w-full bg-transparent border-b border-primary/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-primary/20 text-primary" />
                </div>
                
                <div className="form-item group relative">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email Adresse</label>
                  <input type="email" placeholder="name@firma.de" className="w-full bg-transparent border-b border-primary/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-primary/20 text-primary" />
                </div>

                <div className="form-item group relative">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Unternehmen</label>
                  <input type="text" placeholder="Firmenname (Optional)" className="w-full bg-transparent border-b border-primary/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-primary/20 text-primary" />
                </div>

                <div className="form-item group relative">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Budget Rahmen</label>
                  <select className="w-full bg-transparent border-b border-primary/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors text-primary appearance-none cursor-pointer">
                     <option value="" disabled selected>Bitte wählen</option>
                     <option value="s">€50k — €100k</option>
                     <option value="m">€100k — €250k</option>
                     <option value="l">€250k — €500k</option>
                     <option value="xl">€500k</option>
                  </select>
                </div>

                <div className="form-item group relative">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nachricht</label>
                  <textarea rows={4} placeholder="Erzählen Sie uns von Ihrem Projekt..." className="w-full bg-transparent border-b border-primary/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-primary/20 text-primary resize-none"></textarea>
                </div>

                <div className="form-item pt-8">
                  <button type="button" className="group flex items-center gap-6 text-primary hover:text-accent transition-colors">
                    <span className="text-sm uppercase tracking-widest font-bold">Nachricht senden</span>
                    <span className="w-16 h-[1px] bg-primary group-hover:bg-accent group-hover:w-24 transition-all duration-300"></span>
                  </button>
                </div>
             </form>
          </div>

        </div>
      </div>

    </div>
  );
};