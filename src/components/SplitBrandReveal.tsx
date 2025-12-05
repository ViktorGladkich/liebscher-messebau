import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import bgImage from "../assets/bgImage.jpg";
const column1 = [
  "/projects/luminaGrandHall3.jpg",
  "/projects/urbanMobility3.jpg",
  "/projects/urbanMobility4.jpg",
];

const column2 = [
  "/zoomImages/zoom3.png",
  "/zoomImages/zoom4.png",
  "/zoomImages/zoom6.jpg",
];

const column3 = [
  "/materials/holzmanufaktur.jpg",
  "/materials/metallbau.jpg",
  "/materials/oberflaechen.jpg",
];

export const SplitBrandReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Increased scroll distance for reading time
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
        { yPercent: -40, ease: 'none', duration: 3 }, // Move up significantly
        0
      );

      // Column 2 moves DOWN (starts higher)
      tl.fromTo('.col-move-down',
        { yPercent: -40 },
        { yPercent: 0, ease: 'none', duration: 3 },
        0
      );

      // 4. Word-by-Word Text Reveal
      // Starts after the doors open (around time 0.8)
      tl.fromTo('.manifesto-word',
        { opacity: 0.1, filter: 'blur(8px)', y: 10 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          y: 0,
          stagger: 0.1, // Reveal one by one
          duration: 2, 
          ease: 'power2.out' 
        },
        0.8 
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const manifestoText = "Wir bauen nicht nur Messestände. Wir schaffen Realitäten. Räume, die atmen. Details, die sprechen. Jeder Winkel eine bewusste Entscheidung für Ihre Marke.";
  const words = manifestoText.split(" ");
  

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#1C1C1C]">
      
      {/* --- THE HIDDEN CONTENT (REVEALED BEHIND) --- */}
      <div className="reveal-content absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden">
         
         {/* Background Grid Columns */}
         <div className="absolute inset-0 grid grid-cols-3 gap-4 md:gap-8 px-4 md:px-8 opacity-30 pointer-events-none">
            
            {/* Column 1 */}
            <div className="col-move-up flex flex-col gap-4 md:gap-8 pt-[20vh]">
               {column1.map((src, i) => (
                 <div key={i} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover" />
                 </div>
               ))}
               {column1.map((src, i) => (
                 <div key={`dup-${i}`} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>

            {/* Column 2 (Center) - Starts offset upwards */}
            <div className="col-move-down flex flex-col gap-4 md:gap-8 -mt-[80vh]">
               {column2.map((src, i) => (
                 <div key={i} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover" />
                 </div>
               ))}
               {column2.map((src, i) => (
                 <div key={`dup-${i}`} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>

            {/* Column 3 */}
            <div className="col-move-up flex flex-col gap-4 md:gap-8 pt-[10vh]">
               {column3.map((src, i) => (
                 <div key={i} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover" />
                 </div>
               ))}
               {column3.map((src, i) => (
                 <div key={`dup-${i}`} className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-800">
                    <img src={src} alt="Architecture" className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>

         </div>

         {/* Central Manifesto Overlay */}
         <div className="max-w-5xl relative z-30 text-center px-6 mix-blend-screen">
            <span className="block text-accent text-xs font-bold uppercase tracking-[0.3em] mb-12 opacity-80">The Inner Circle</span>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#EAE7DF] leading-tight drop-shadow-2xl">
              {words.map((word, i) => (
                <span key={i} className="manifesto-word inline-block mr-2 md:mr-3 text-white/90">
                  {word}
                </span>
              ))}
            </h2>

            <div className="mt-16 flex justify-center">
               <div className="w-[1px] h-24 bg-gradient-to-b from-accent to-transparent"></div>
            </div>
         </div>
      </div>

      {/* --- THE SPLIT COVER (TEXT) --- */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* Top Half */}
        <div className="split-top absolute inset-0 flex items-center justify-center bg-[#1C1C1C] overflow-hidden border-b border-white/5" 
             style={{ clipPath: 'inset(0 0 50% 0)' }}>
           
           {/* Background Image for Top Half */}
           <div className="absolute inset-0">
             <div className="absolute inset-0 bg-black/50 z-10"></div>
             <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-60 " />
           </div>

           <h1 className="relative z-20 text-[12vw] md:text-[14vw] font-serif font-bold text-[#EAE7DF] tracking-tighter leading-none whitespace-nowrap drop-shadow-2xl">
             LIEBSCHER
           </h1>
        </div>

        {/* Bottom Half */}
        <div className="split-bottom absolute inset-0 flex items-center justify-center bg-[#1C1C1C] overflow-hidden border-t border-white/5"
             style={{ clipPath: 'inset(50% 0 0 0)' }}>
           
           {/* Background Image for Bottom Half */}
           <div className="absolute inset-0">
             <div className="absolute inset-0 bg-black/50 z-10"></div>
             <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-60 " />
           </div>

           <h1 className="relative z-20 text-[12vw] md:text-[14vw] font-serif font-bold text-[#EAE7DF] tracking-tighter leading-none whitespace-nowrap drop-shadow-2xl">
             LIEBSCHER
           </h1>
        </div>

      </div>

    </section>
  );
};
