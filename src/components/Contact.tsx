import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-primary text-secondary px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          
          <div className="max-w-lg">
            <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-8">04 — Kontakt</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-12">
              Lassen Sie uns etwas <span className="italic text-accent">Großes</span> schaffen.
            </h2>
            
            <div className="space-y-2 mb-12">
               <p className="text-lg font-light opacity-80">info@liebscher-messe.de</p>
               <p className="text-lg font-light opacity-80">+49 30 1234 5678</p>
            </div>

            <div className="flex gap-8">
              <a href="#" className="text-sm uppercase tracking-widest hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="text-sm uppercase tracking-widest hover:text-accent transition-colors">LinkedIn</a>
            </div>
          </div>

          <form className="w-full md:max-w-md space-y-12 mt-12 md:mt-0">
             <div className="group relative">
               <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-white/30" />
             </div>
             <div className="group relative">
               <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-white/30" />
             </div>
             <div className="group relative">
               <input type="text" placeholder="Unternehmen" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-white/30" />
             </div>
             <div className="group relative">
               <textarea rows={3} placeholder="Nachricht" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 resize-none"></textarea>
             </div>
             
             <button type="button" className="group flex items-center gap-4 text-white hover:text-accent transition-colors">
               <span className="text-sm uppercase tracking-widest">Senden</span>
               <span className="w-12 h-[1px] bg-current group-hover:w-20 transition-all duration-300"></span>
             </button>
          </form>

        </div>
      </div>
    </section>
  );
};