
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { Cpu, Truck, Hammer, Leaf, Monitor, PenTool } from 'lucide-react';

const processes = [
  {
    id: '01',
    title: 'Strategie & Konzeption',
    text: 'Jedes Projekt beginnt mit Zuhören. Wir analysieren Ihre Marke, Ihre Ziele und Ihre Zielgruppe. Unser Designteam entwickelt daraus räumliche Narrative, die nicht nur gut aussehen, sondern funktionieren. Wir denken in Besucherströmen, Interaktionspunkten und emotionalen Kurven.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'Design & Architektur',
    text: 'Unsere Architekten übersetzen das Konzept in präzise Pläne. Wir nutzen modernste CAD-Technologie und VR-Visualisierungen, damit Sie Ihren Stand erleben können, bevor der erste Nagel eingeschlagen wird. Lichtplanung, Materialauswahl und Statik gehen Hand in Hand.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'Produktion & Handwerk',
    text: 'In unseren Berliner Werkstätten trifft traditionelles Handwerk auf CNC-Präzision. Unsere Tischler, Metallbauer und Lackierer fertigen jedes Element mit höchstem Anspruch. Wir glauben an Materialien, die altern, nicht verschleißen.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'Logistik & Realisierung',
    text: 'Ein Messestand ist ein logistisches Meisterwerk. Unser Team koordiniert den weltweiten Transport, Zollformalitäten und den Aufbau vor Ort. Just-in-Time, millimetergenau und stressfrei für Sie. Wenn die Messe beginnt, ist alles perfekt.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop'
  }
];

const capabilities = [
  { icon: <PenTool size={24} />, title: "CAD & Planung", desc: "Detailplanung in Vectorworks & AutoCAD." },
  { icon: <Hammer size={24} />, title: "CNC Fertigung", desc: "Computergesteuerte Präzision für komplexe Formen." },
  { icon: <Monitor size={24} />, title: "VR/AR Visualisierung", desc: "Begehbare Modelle vor Baubeginn." },
  { icon: <Truck size={24} />, title: "Globale Logistik", desc: "Zollabwicklung und Transport weltweit." },
  { icon: <Leaf size={24} />, title: "Sustainable Build", desc: "Zertifizierte Materialien & Recycling." },
  { icon: <Cpu size={24} />, title: "Smart Tech", desc: "Integration von Medientechnik & IoT." },
];

export const ExpertisePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Intro Reveal
      gsap.fromTo('.exp-reveal',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );

      // Process Sections Parallax & Reveal
      // Use matchMedia to handle animations differently or just ensure triggers are robust
      gsap.utils.toArray<HTMLElement>('.process-section').forEach((section) => {
        // Image Parallax
        const img = section.querySelector('.process-img');
        if (img) {
          gsap.fromTo(img,
            { scale: 1.1 },
            { 
              scale: 1, 
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }
        
        // Content Fade In
        const content = section.querySelector('.process-content');
        if (content) {
          gsap.fromTo(content,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%', // Trigger earlier to ensure visibility
              }
            }
          );
        }
      });

      // Capabilities Animation
      gsap.fromTo('.cap-card',
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
             trigger: '.capabilities-grid',
             start: 'top 85%'
          } 
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-secondary min-h-screen pt-32 pb-32">
      
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="max-w-4xl">
           <span className="exp-reveal block text-xs font-bold uppercase tracking-widest text-accent mb-8">
             02 — Unsere Expertise
           </span>
           <h1 className="exp-reveal text-5xl md:text-7xl font-serif leading-[1.1] text-primary mb-12">
             Von der Skizze zur<br/>
             <span className="italic text-accent">gebauten Realität.</span>
           </h1>
           <p className="exp-reveal text-lg md:text-xl font-light leading-relaxed text-gray-600 max-w-2xl">
             Wir verstehen uns nicht nur als Handwerker, sondern als Partner für Ihre Markenkommunikation. Unser Prozess ist transparent, strukturiert und auf Exzellenz ausgerichtet.
           </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="flex flex-col gap-0 mb-32">
        {processes.map((proc, index) => (
          // Adjusted for mobile: 
          // 1. Removed sticky top-0 on mobile (added md:sticky)
          // 2. Changed min-h-[80vh] to md:min-h-[80vh]
          // 3. Adjusted padding
          <div key={proc.id} className="process-section relative md:min-h-[80vh] flex items-center border-t border-primary/10 md:sticky md:top-0 bg-secondary">
            <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
              <div className={`flex flex-col md:flex-row gap-12 md:gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Image */}
                <div className="w-full md:w-1/2 overflow-hidden h-[300px] md:h-[600px] relative group rounded-sm shadow-md">
                   <img 
                     src={proc.image} 
                     alt={proc.title} 
                     className="process-img w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                </div>

                {/* Content */}
                <div className="process-content w-full md:w-1/2">
                   <span className="text-4xl md:text-8xl font-serif text-primary/10 block mb-4 md:mb-6">{proc.id}</span>
                   <h3 className="text-2xl md:text-4xl font-serif text-primary mb-6">{proc.title}</h3>
                   <div className="w-12 h-[1px] bg-accent mb-6"></div>
                   <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed max-w-md">
                     {proc.text}
                   </p>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Capabilities Section */}
      <section className="py-24 bg-primary text-secondary px-6 md:px-12">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">Technische Kompetenz</span>
            <h2 className="text-3xl md:text-5xl font-serif">Das Werkzeug für Ihre Vision.</h2>
          </div>
          
          <div className="capabilities-grid grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-16">
            {capabilities.map((cap, i) => (
              <div key={i} className="cap-card p-6 border border-white/10 hover:bg-white/5 transition-colors duration-300 flex flex-col items-center text-center">
                 <div className="mb-4 text-accent">{cap.icon}</div>
                 <h3 className="text-xl font-serif mb-2">{cap.title}</h3>
                 <p className="text-sm font-light text-white/60">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-32 px-6 md:px-12">
         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">Verantwortung</span>
               <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8">Nachhaltigkeit<br/>ist kein Trend.</h2>
               <p className="text-gray-600 font-light leading-relaxed text-lg mb-8">
                 Temporäre Architektur erzeugt oft permanenten Müll. Wir ändern das. Unser "Green Stand"-System setzt auf Modularität, Wiederverwendbarkeit und recycelbare Materialien. Wir kompensieren den CO2-Fußabdruck jedes Transports und arbeiten mit lokalen Partnern, um Emissionen zu minimieren.
               </p>
               <ul className="space-y-4 font-serif text-primary text-xl">
                 <li className="flex items-center gap-4"><div className="w-2 h-2 bg-accent rounded-full"></div> 100% Ökostrom in der Fertigung</li>
                 <li className="flex items-center gap-4"><div className="w-2 h-2 bg-accent rounded-full"></div> Modulare Systembauweise</li>
                 <li className="flex items-center gap-4"><div className="w-2 h-2 bg-accent rounded-full"></div> Recycling-Partnerschaften</li>
               </ul>
            </div>
            <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-sm">
               <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2513&auto=format&fit=crop" alt="Sustainable Materials" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-primary/10"></div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <div className="container mx-auto px-6 md:px-12 mt-16 text-center">
         <h2 className="text-3xl md:text-5xl font-serif mb-8">Bereit für den nächsten Schritt?</h2>
         <a href="#/contact" className="inline-block text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
           Projekt anfragen
         </a>
      </div>

    </div>
  );
};
