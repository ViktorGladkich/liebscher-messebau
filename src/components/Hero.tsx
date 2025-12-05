
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import hero from "../assets/hero.png"
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // DESKTOP ANIMATION
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        // Idle animation for scroll prompt
        gsap.to('.scroll-prompt', {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: 'power1.inOut'
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=1500', // Scroll distance
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
          }
        });

        // 0. Scroll prompt fades out
        tl.to('.scroll-prompt', { opacity: 0, duration: 0.1 }, 0);

        // 1. Initial text panel slides off
        tl.to('.hero-initial-text', {
          xPercent: -100, 
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        }, 0);

        // 2. Image expands
        tl.to('.hero-image-wrapper', {
          width: '100%',
          duration: 1, 
          ease: 'power2.inOut'
        }, 0);

        // 3. Overlay darkens
        tl.to('.hero-overlay', { opacity: 0.5, duration: 1 }, 0);

        // 4. Final text reveals
        tl.fromTo('.hero-final-text', 
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
          ">-0.2"
        );
      });

      // MOBILE ANIMATION
      mm.add("(max-width: 767px)", () => {
         // Background Zoom Effect
         gsap.fromTo('.mobile-bg-img',
            { scale: 1.1 },
            { scale: 1, duration: 2, ease: 'power2.out' }
         );

         // Text Reveal
         gsap.fromTo('.mobile-hero-content > *', 
           { y: 30, opacity: 0 },
           { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
         );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] md:h-screen overflow-hidden bg-primary">
      <div className="md:hidden relative w-full h-full flex flex-col justify-end pb-24 px-6">
         <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 z-10" />
            <img 
              src={hero}
              className="mobile-bg-img w-full h-full object-cover"
              alt="Architecture Detail"
            />
         </div>

         {/* Mobile Content */}
         <div className="mobile-hero-content relative z-20 text-secondary mb-4">
            <div className="flex items-center gap-3 mb-6 opacity-80">
                <div className="h-[1px] w-8 bg-accent"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  Liebscher Messestandbau
                </span>
            </div>
            
            <h1 className="text-5xl font-serif leading-[1.05] mb-6 drop-shadow-lg">
               Räume,<br/>die <span className="italic text-accent">bleiben.</span>
            </h1>
            
            <p className="text-white/80 font-light text-base leading-relaxed max-w-xs mb-10 drop-shadow-md">
               Wir transformieren Markenidentität in dreidimensionale Erlebnisse. Architektonische Präzision aus Berlin.
            </p>
            
            {/* Scroll Indicator */}
            <div className="flex items-center gap-3 text-white/50">
               <span className="text-[10px] uppercase tracking-widest">Scroll</span>
               <div className="w-12 h-[1px] bg-white/30">
                  <div className="w-full h-full bg-accent origin-left animate-[scale-x_2s_ease-in-out_infinite]"></div>
               </div>
            </div>
         </div>
      </div>

      <div className="hidden md:flex w-full h-full relative">
        <div className="hero-initial-text absolute top-0 left-0 w-[45%] h-full flex flex-col justify-center px-12 lg:px-24 z-10 bg-primary will-change-transform">
           <div className="overflow-hidden">
             <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-6">
               Liebscher Messestandbau
             </span>
           </div>
           <h1 className="text-7xl lg:text-8xl font-serif text-secondary leading-[1.05] mb-8">
             Räume, die <br/><span className="italic text-accent">bleiben.</span>
           </h1>
           <p className="text-white/60 font-light max-w-md leading-relaxed text-lg">
             Wir transformieren Markenidentität in dreidimensionale Erlebnisse. 
             Präzision, Ästhetik und handwerkliche Exzellenz aus Berlin.
           </p>
           
           <div className="scroll-prompt mt-20 flex items-center gap-4 text-white/30">
             <div className="h-[1px] w-12 bg-white/20"></div>
             <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
           </div>
        </div>

        {/* Right Side: Image Wrapper */}
        <div className="hero-image-wrapper absolute top-0 right-0 w-[55%] h-full overflow-hidden z-0 bg-black will-change-transform">
           <div className="hero-overlay absolute inset-0 bg-black/0 z-10 pointer-events-none transition-opacity"></div>
           <img 
             src={hero}
             className="w-full h-full object-cover"
             alt="Architecture Detail"
           />
        </div>

        {/* Final Text (Centered, Hidden Initially) */}
        <div className="hero-final-text absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center px-4 opacity-0">
           <h2 className="text-8xl lg:text-9xl font-serif text-secondary mix-blend-overlay opacity-90">
             Liebscher
           </h2>
           <span className="text-accent text-lg uppercase tracking-[0.3em] mb-6 drop-shadow-md">Messebau</span>
        </div>

      </div>
    </section>
  );
};
