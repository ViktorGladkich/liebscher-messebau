
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const column1 = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
];

const column2 = [
  "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop",
];

const column3 = [
  "/materials/holzmanufaktur.jpg",
  "/materials/metallbau.jpg",
  "/materials/lichttechnik.jpg",
];

export const SplitBrandReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%', // Longer scroll for more carousel movement
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // 1. Split Text Animation (The "Doors" opening)
      tl.to('.split-top', { yPercent: -100, ease: 'power2.inOut', duration: 1 }, 0)
        .to('.split-bottom', { yPercent: 100, ease: 'power2.inOut', duration: 1 }, 0);

      // 2. Content Reveal (Fade in)
      tl.fromTo('.reveal-content', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5, ease: 'power2.out' }, 
        0.1
      );

      // 3. Vertical Carousel Parallax
      // Column 1 & 3 move UP
      tl.fromTo('.col-move-up', 
        { yPercent: 0 },
        { yPercent: -30, ease: 'none', duration: 2 }, // Move up by 30% of their height
        0
      );

      // Column 2 moves DOWN (starts higher)
      tl.fromTo('.col-move-down',
        { yPercent: -30 },
        { yPercent: 0, ease: 'none', duration: 2 },
        0
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#1C1C1C]">
      
      {/* --- THE HIDDEN CONTENT (REVEALED BEHIND) --- */}
      <div className="reveal-content absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden">
         
         {/* Background Grid Columns */}
         <div className="absolute inset-0 grid grid-cols-3 gap-4 md:gap-8 px-4 md:px-8 opacity-40">
            
            {/* Column 1 */}
            <div className="col-move-up flex flex-col gap-4 md:gap-8 pt-[20vh]">
               {column1.map((src, i) => (
                 <div key={i} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover grayscale" />
                 </div>
               ))}
               {/* Duplicate for loop illusion */}
               {column1.map((src, i) => (
                 <div key={`dup-${i}`} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover grayscale" />
                 </div>
               ))}
            </div>

            {/* Column 2 (Center) - Starts offset upwards */}
            <div className="col-move-down flex flex-col gap-4 md:gap-8 -mt-[60vh]">
               {column2.map((src, i) => (
                 <div key={i} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover grayscale" />
                 </div>
               ))}
               {column2.map((src, i) => (
                 <div key={`dup-${i}`} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover grayscale" />
                 </div>
               ))}
            </div>

            {/* Column 3 */}
            <div className="col-move-up flex flex-col gap-4 md:gap-8 pt-[10vh]">
               {column3.map((src, i) => (
                 <div key={i} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover grayscale" />
                 </div>
               ))}
               {column3.map((src, i) => (
                 <div key={`dup-${i}`} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover grayscale" />
                 </div>
               ))}
            </div>

         </div>

         {/* Central Manifesto Overlay */}
         <div className="max-w-4xl relative z-30 text-center px-6 mix-blend-screen">
            <span className="block text-accent text-xs font-bold uppercase tracking-[0.3em] mb-8">The Inner Circle</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#EAE7DF] leading-tight drop-shadow-2xl">
              "Wir bauen nicht nur Messestände.<br/>
              Wir schaffen <span className="italic text-white">Realitäten.</span>"
            </h2>
            <div className="mt-12 flex justify-center">
               <div className="w-[1px] h-24 bg-gradient-to-b from-accent to-transparent"></div>
            </div>
         </div>
      </div>

      {/* --- THE SPLIT COVER (TEXT) --- */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* Top Half */}
        <div className="split-top absolute inset-0 flex items-center justify-center bg-[#1C1C1C] overflow-hidden border-b border-white/5" 
             style={{ clipPath: 'inset(0 0 50% 0)' }}>
           <h1 className="text-[12vw] md:text-[14vw] font-serif font-bold text-[#EAE7DF] tracking-tighter leading-none whitespace-nowrap">
             LIEBSCHER
           </h1>
        </div>

        {/* Bottom Half */}
        <div className="split-bottom absolute inset-0 flex items-center justify-center bg-[#1C1C1C] overflow-hidden border-t border-white/5"
             style={{ clipPath: 'inset(50% 0 0 0)' }}>
           <h1 className="text-[12vw] md:text-[14vw] font-serif font-bold text-[#EAE7DF] tracking-tighter leading-none whitespace-nowrap">
             LIEBSCHER
           </h1>
        </div>

      </div>

    </section>
  );
};
