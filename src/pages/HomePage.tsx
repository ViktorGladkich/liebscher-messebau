
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SEO } from '../components/SEO';
import { ZoomParallax } from '../components/ui/zoom-parallax';
import { TextRevealByWord } from '../components/ui/text-reveal';

// Move static data outside component to prevent recreation on render
const processSteps = [
  {
    id: 1,
    title: "Beratung & Strategie",
    desc: "Am Anfang steht das Verstehen. Wir analysieren Ihre Marke, Ihre Ziele und Ihre Zielgruppe, um ein räumliches Narrativ zu entwickeln, das funktioniert.",
    img: "/src/assets/processSteps/beratung_Strategie.jpg"
  },
  {
    id: 2,
    title: "Design & Architektur",
    desc: "Unsere Architekten übersetzen Konzepte in präzise Pläne. Fotorealistische 3D-Visualisierungen geben Ihnen Sicherheit noch vor dem ersten Bauabschnitt.",
    img: "/src/assets/processSteps/design_Architektur.jpg"
  },
  {
    id: 3,
    title: "Produktion",
    desc: "In unseren Berliner Werkstätten fertigen wir mit höchster Präzision. Ob Holz, Metall oder Kunststoff – wir beherrschen den Materialmix perfekt.",
    img: "/src/assets/processSteps/produktion.jpg"
  },
  {
    id: 4,
    title: "Logistik & Montage",
    desc: "Wir bringen Ihren Stand sicher ans Ziel. Europaweit. Unser festes Montageteam garantiert einen stressfreien Aufbau und eine pünktliche Übergabe.",
    img: "/src/assets/processSteps/logistik_Montage.jpg"
  }
];

const materials = [
  {
    id: 1,
    name: "Holzmanufaktur",
    desc: "Präzision in Eiche, Nussbaum und innovativen Verbundstoffen.",
    img: "/src/assets/materials/holzmanufaktur.jpg"
  },
  {
    id: 2,
    name: "Metallbau",
    desc: "Statische Exzellenz trifft auf filigrane Ästhetik in Stahl und Alu.",
    img: "/src/assets/materials/metallbau.jpg"
  },
  {
    id: 3,
    name: "Oberflächen",
    desc: "Lackierungen, Textilien und Folierungen für die perfekte Haptik.",
    img: "/src/assets/materials/oberflaechen.jpg"
  },
  {
    id: 4,
    name: "Lichttechnik",
    desc: "Atmosphärische Inszenierung durch intelligente LED-Systeme.",
    img: "/src/assets/materials/lichttechnik.jpg"
  }
];

const zoomImages = [
    {
        src: '/src/assets/zoomImages/zoom1.png',
        alt: 'Modern architecture building',
    },
    {
        src: '/src/assets/zoomImages/zoom2.png',
        alt: 'Wood Detail',
    },
    {
        src: '/src/assets/zoomImages/zoom3.png',
        alt: 'Light Installation',
    },
    {
        src: '/src/assets/zoomImages/zoom4.png',
        alt: 'Curved Wood',
    },
    {
        src: '/src/assets/zoomImages/zoom5.png',
        alt: 'Interior Design',
    },
    {
        src: '/src/assets/zoomImages/zoom6.png',
        alt: 'Construction Detail',
    },
    {
        src: '/src/assets/zoomImages/zoom7.png',
        alt: 'Finished Booth',
    },
];

const globalHubs = [
  { city: "Berlin", role: "HQ & Production" },
  { city: "Dubai", role: "Logistics Hub MEA" },
  { city: "Shanghai", role: "Partner Hub Asia" },
  { city: "New York", role: "Partner Hub USA" }
];

export const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState(0);

  // Use Custom Hook for revealing text
  useScrollReveal('.animate-text');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Process Section - Sticky Image Logic
      const steps = gsap.utils.toArray<HTMLElement>('.process-step');
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(`.process-img`, { opacity: 0, duration: 0.6, ease: 'power2.inOut', overwrite: true });
            gsap.to(`.process-img-${i}`, { opacity: 1, duration: 0.6, ease: 'power2.inOut', overwrite: true });
            gsap.to(`.step-indicator-${i}`, { width: '4rem', backgroundColor: '#9E8E76', duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(`.process-img`, { opacity: 0, duration: 0.6, ease: 'power2.inOut', overwrite: true });
            gsap.to(`.process-img-${i}`, { opacity: 1, duration: 0.6, ease: 'power2.inOut', overwrite: true });
            gsap.to(`.step-indicator-${i}`, { width: '4rem', backgroundColor: '#9E8E76', duration: 0.3 });
          },
          onLeave: () => {
            gsap.to(`.step-indicator-${i}`, { width: '2rem', backgroundColor: '#D1CDC4', duration: 0.3 });
          },
          onLeaveBack: () => {
            gsap.to(`.step-indicator-${i}`, { width: '2rem', backgroundColor: '#D1CDC4', duration: 0.3 });
          }
        });
      });

      // 2. Marquee animation
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO 
        title="Startseite" 
        description="Liebscher Messestandbau Berlin. Exzellenz im Messebau, individuelle Architektur und globale Logistik für Ihren Markenauftritt." 
      />
      <div ref={containerRef} className="bg-secondary">
        <Hero />
        
        {/* Intro Section - Semantic Article */}
        <article className="intro-section py-24 md:py-32 px-6 md:px-12 container mx-auto border-b border-primary/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="animate-text block text-xs font-bold uppercase tracking-widest text-accent mb-6">
                Full Service Messebau
              </span>
              <h2 className="animate-text text-4xl md:text-5xl font-serif leading-[1.1] text-primary">
                Markenidentität,<br/>
                <span className="italic text-accent">dreidimensional</span> gedacht.
              </h2>
            </div>
            <div className="lg:col-span-1 hidden lg:block"></div>
            <div className="lg:col-span-6 pt-2">
              <p className="animate-text text-xl text-primary/80 font-light leading-relaxed mb-8">
                Wir sind Liebscher. Seit über 25 Jahren Partner für Unternehmen, die auf Messen nicht nur anwesend sein wollen, sondern wirken möchten.
              </p>
              <p className="animate-text text-gray-600 font-light leading-relaxed mb-10">
                Unser Ansatz verbindet strategische Beratung mit architektonischer Exzellenz und handwerklicher Präzision. Als inhabergeführtes Unternehmen legen wir Wert auf kurze Wege, persönliche Ansprechpartner und absolute Verlässlichkeit.
              </p>
              <div className="animate-text">
                <Link to="/about" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors p-2 -ml-2">
                   Lernen Sie uns kennen <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Zoom Parallax Showcase */}
        <div className="hidden md:block">
            <ZoomParallax images={zoomImages} />
        </div>

        {/* Process Section - Semantic Section */}
        <section className="bg-white relative" aria-label="Unser Prozess">
          <div className="flex flex-col lg:flex-row">
            
            {/* Sticky Image Column (Left) */}
            <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 overflow-hidden bg-primary z-10">
               {processSteps.map((step, i) => (
                 <div 
                   key={step.id} 
                   className={`process-img process-img-${i} absolute inset-0 w-full h-full pointer-events-none`}
                   style={{ opacity: i === 0 ? 1 : 0 }}
                 >
                   <div className="absolute inset-0 bg-black/20 z-10"></div>
                   <img 
                     src={step.img} 
                     alt={step.title} 
                     className="w-full h-full object-cover" 
                     loading="lazy" 
                   />
                   <div className="absolute bottom-12 left-12 z-20 text-white">
                     <span className="block text-9xl font-serif mb-4 opacity-30 leading-none">0{step.id}</span>
                     <h3 className="text-4xl font-serif">{step.title}</h3>
                   </div>
                 </div>
               ))}
            </div>

            {/* Scrolling Content Column (Right) */}
            <div className="w-full lg:w-1/2 bg-secondary relative z-20">
               {processSteps.map((step, i) => (
                 <div key={step.id} className="process-step min-h-[50vh] lg:min-h-screen flex flex-col justify-center px-6 md:px-24 py-16 md:py-24 border-b border-primary/5 lg:border-none">
                    {/* Mobile Image */}
                    <div className="lg:hidden w-full aspect-video mb-8 overflow-hidden rounded-sm relative">
                      <img src={step.img} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                        0{step.id}
                      </div>
                    </div>

                    <div className={`step-indicator-${i} hidden lg:block w-8 h-[2px] bg-[#D1CDC4] mb-8 transition-all duration-500`}></div>
                    
                    <span className="animate-text block text-xs font-bold uppercase tracking-widest text-accent mb-4">
                      Phase 0{step.id}
                    </span>
                    <h3 className="animate-text text-3xl md:text-4xl font-serif text-primary mb-6">
                      {step.title}
                    </h3>
                    <p className="animate-text text-lg text-gray-600 font-light leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                 </div>
               ))}
            </div>

          </div>
        </section>

        {/* Global Network Section - REDESIGNED WITH TEXT REVEAL */}
        <section className="bg-secondary relative">
           <TextRevealByWord 
              text="Von Berlin in die Welt. Wir realisieren Projekte in über 12 Ländern. Präzision kennt keine Grenzen." 
           />
           
           <div className="container mx-auto px-6 md:px-12 pb-32">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {globalHubs.map((hub, i) => (
                 <div key={i} className="group border-t border-primary/20 pt-8 hover:border-primary transition-colors duration-500">
                   <div className="flex items-start justify-between">
                      <div>
                        <span className="block text-2xl font-serif text-primary mb-2">{hub.city}</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">{hub.role}</span>
                      </div>
                      <ArrowRight size={18} className="text-accent opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* Atelier Section */}
        <section className="atelier-section py-32 bg-[#EAE7DF] px-6 md:px-12 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Material List */}
              <div className="relative z-10">
                 <span className="animate-text block text-xs font-bold uppercase tracking-widest text-accent mb-8">
                   Das Atelier
                 </span>
                 <h2 className="animate-text text-4xl md:text-6xl font-serif text-primary leading-tight mb-16">
                   Handwerk in <br/>Perfektion.
                 </h2>
                 
                 <div className="space-y-4">
                   {materials.map((mat, index) => (
                     <div 
                        key={mat.id}
                        className="group cursor-pointer border-t border-primary/10 py-6 md:py-8 touch-manipulation"
                        onMouseEnter={() => setActiveMaterial(index)}
                        onClick={() => setActiveMaterial(index)} // Enable click for mobile
                     >
                       <div className="flex justify-between items-baseline mb-2">
                         <div className="flex items-center gap-6">
                           <span className={`text-xs font-mono transition-colors duration-300 ${activeMaterial === index ? 'text-accent' : 'text-gray-400'}`}>0{index+1}</span>
                           <h3 className={`text-xl md:text-3xl font-serif transition-all duration-300 ${activeMaterial === index ? 'text-primary translate-x-4' : 'text-primary/60'}`}>
                             {mat.name}
                           </h3>
                         </div>
                         <ArrowRight size={18} className={`transition-all duration-300 ${activeMaterial === index ? 'opacity-100 -rotate-45 text-accent' : 'opacity-0'}`} />
                       </div>
                       <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeMaterial === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="text-gray-500 font-light pl-10 md:pl-12 max-w-md text-sm md:text-base">
                            {mat.desc}
                          </p>
                       </div>
                     </div>
                   ))}
                   <div className="border-t border-primary/10"></div>
                 </div>
              </div>

              {/* Right: Changing Image Display */}
              <div className="h-[400px] md:h-[700px] w-full relative mt-8 lg:mt-0">
                 {materials.map((mat, index) => (
                   <div 
                     key={mat.id} 
                     className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-out overflow-hidden rounded-sm"
                     style={{ opacity: activeMaterial === index ? 1 : 0 }}
                   >
                     <img 
                       src={mat.img} 
                       alt={mat.name} 
                       className="w-full h-full object-cover scale-105"
                       loading="lazy"
                     />
                     <div className="absolute inset-0 bg-primary/10"></div>
                   </div>
                 ))}
                 
                 {/* Decorative floating badge */}
                 <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-6 max-w-xs shadow-xl hidden md:block animate-text rounded-sm">
                    <span className="block text-xs uppercase tracking-widest text-accent mb-2">Made in Berlin</span>
                    <p className="text-primary font-serif text-lg leading-tight">
                      Eigene Fertigung auf über 2.500m² Produktionsfläche.
                    </p>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* Projects Preview */}
        <Projects />

        {/* Scrolling Client Marquee */}
        <section className="py-20 overflow-hidden bg-primary text-secondary border-t border-white/5" aria-label="Unsere Kunden">
          <div className="container mx-auto px-6 mb-12 text-center">
             <span className="animate-text inline-block px-4 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white/50">
               Vertrauen seit Jahrzehnten
             </span>
          </div>
          <div className="marquee relative w-full flex overflow-hidden mask-gradient">
            <div className="marquee-inner flex gap-16 md:gap-24 items-center whitespace-nowrap pl-16">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {['Siemens', 'Bosch', 'Daimler', 'Lufthansa', 'Deutsche Bahn', 'SAP', 'Bayer', 'Allianz'].map(brand => (
                    <span key={brand} className="text-3xl md:text-5xl font-serif text-white/30 hover:text-white transition-colors duration-300">
                      {brand}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Parallax */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" 
               className="w-full h-full object-cover filter brightness-[0.4]"
               alt="CTA Background" 
               loading="lazy"
             />
             <div className="absolute inset-0 bg-primary/40"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-3xl">
             <span className="animate-text block text-accent text-xs uppercase tracking-[0.2em] mb-6">Start Your Project</span>
             <h2 className="animate-text text-4xl md:text-7xl font-serif text-white mb-10 leading-none">
               Ihr Vision.<br/>Unsere Bühne.
             </h2>
             <div className="animate-text">
              <Link to="/contact" className="group inline-flex items-center gap-4 bg-white text-primary px-8 py-4 md:px-10 md:py-5 text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300">
                <span>Unverbindlich Anfragen</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
             </div>
          </div>
        </section>
      </div>
    </>
  );
};
