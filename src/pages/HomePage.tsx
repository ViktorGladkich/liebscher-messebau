import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SEO } from "../components/SEO";
import { ZoomParallax } from "../components/ui/zoom-parallax";
import { SplitBrandReveal } from '../components/SplitBrandReveal';
import footerBanner from "../assets/hero1.jpg"

// Move static data outside component to prevent recreation on render
const processSteps = [
  {
    id: 1,
    title: "Beratung & Strategie",
    desc: "Am Anfang steht das Verstehen. Wir analysieren Ihre Marke, Ihre Ziele und Ihre Zielgruppe, um ein räumliches Narrativ zu entwickeln, das funktioniert.",
    img: "/processSteps/beratung_Strategie.jpg",
  },
  {
    id: 2,
    title: "Design & Architektur",
    desc: "Unsere Architekten übersetzen Konzepte in präzise Pläne. Fotorealistische 3D-Visualisierungen geben Ihnen Sicherheit noch vor dem ersten Bauabschnitt.",
    img: "/processSteps/design_Architektur.jpg",
  },
  {
    id: 3,
    title: "Produktion",
    desc: "In unseren Berliner Werkstätten fertigen wir mit höchster Präzision. Ob Holz, Metall oder Kunststoff – wir beherrschen den Materialmix perfekt.",
    img: "/processSteps/produktion.jpg",
  },
  {
    id: 4,
    title: "Logistik & Montage",
    desc: "Wir bringen Ihren Stand sicher ans Ziel. Europaweit. Unser festes Montageteam garantiert einen stressfreien Aufbau und eine pünktliche Übergabe.",
    img: "/processSteps/logistik_Montage.jpg",
  },
];

const materials = [
  {
    id: 1,
    name: "Holzmanufaktur",
    desc: "Präzision in Eiche, Nussbaum und innovativen Verbundstoffen.",
    img: "/materials/holzmanufaktur.jpg",
  },
  {
    id: 2,
    name: "Metallbau",
    desc: "Statische Exzellenz trifft auf filigrane Ästhetik in Stahl und Alu.",
    img: "/materials/metallbau.jpg",
  },
  {
    id: 3,
    name: "Oberflächen",
    desc: "Lackierungen, Textilien und Folierungen für die perfekte Haptik.",
    img: "/materials/oberflaechen.jpg",
  },
  {
    id: 4,
    name: "Lichttechnik",
    desc: "Atmosphärische Inszenierung durch intelligente LED-Systeme.",
    img: "/materials/lichttechnik.jpg",
  },
];

const zoomImages = [
  {
    src: "/zoomImages/zoom1.png",
    alt: "Modern architecture building",
  },
  {
    src: "/zoomImages/zoom2.png",
    alt: "Wood Detail",
  },
  {
    src: "/zoomImages/zoom3.png",
    alt: "Light Installation",
  },
  {
    src: "/zoomImages/zoom4.png",
    alt: "Curved Wood",
  },
  {
    src: "/zoomImages/zoom5.png",
    alt: "Interior Design",
  },
  {
    src: "/zoomImages/zoom6.jpg",
    alt: "Construction Detail",
  },
  {
    src: "/zoomImages/zoom7.jpg",
    alt: "Finished Booth",
  },
];


export const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState(0);

  // Use Custom Hook for revealing text
  useScrollReveal(".animate-text");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Process Section - Sticky Image Logic
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(`.process-img`, {
              opacity: 0,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: true,
            });
            gsap.to(`.process-img-${i}`, {
              opacity: 1,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: true,
            });
            gsap.to(`.step-indicator-${i}`, {
              width: "4rem",
              backgroundColor: "#9E8E76",
              duration: 0.3,
            });
          },
          onEnterBack: () => {
            gsap.to(`.process-img`, {
              opacity: 0,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: true,
            });
            gsap.to(`.process-img-${i}`, {
              opacity: 1,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: true,
            });
            gsap.to(`.step-indicator-${i}`, {
              width: "4rem",
              backgroundColor: "#9E8E76",
              duration: 0.3,
            });
          },
          onLeave: () => {
            gsap.to(`.step-indicator-${i}`, {
              width: "2rem",
              backgroundColor: "#D1CDC4",
              duration: 0.3,
            });
          },
          onLeaveBack: () => {
            gsap.to(`.step-indicator-${i}`, {
              width: "2rem",
              backgroundColor: "#D1CDC4",
              duration: 0.3,
            });
          },
        });
      });

      // 2. Marquee animation
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMaterialClick = (index: number) => {
    // If clicking the already active one, maybe toggle? For now, just set active.
    if (activeMaterial === index) return;
    setActiveMaterial(index);
  };
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
                Markenidentität,
                <br />
                <span className="italic text-accent">dreidimensional</span>{" "}
                gedacht.
              </h2>
            </div>
            <div className="lg:col-span-1 hidden lg:block"></div>
            <div className="lg:col-span-6 pt-2">
              <p className="animate-text text-xl text-primary/80 font-light leading-relaxed mb-8">
                Wir sind Liebscher. Seit über 25 Jahren Partner für Unternehmen,
                die auf Messen nicht nur anwesend sein wollen, sondern wirken
                möchten.
              </p>
              <p className="animate-text text-gray-600 font-light leading-relaxed mb-10">
                Unser Ansatz verbindet strategische Beratung mit
                architektonischer Exzellenz und handwerklicher Präzision. Als
                inhabergeführtes Unternehmen legen wir Wert auf kurze Wege,
                persönliche Ansprechpartner und absolute Verlässlichkeit.
              </p>
              <div className="animate-text">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors p-2 -ml-2"
                >
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
                    <span className="block text-9xl font-serif mb-4 opacity-30 leading-none">
                      0{step.id}
                    </span>
                    <h3 className="text-4xl font-serif">{step.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Scrolling Content Column (Right) */}
            <div className="w-full lg:w-1/2 bg-secondary relative z-20">
              {processSteps.map((step, i) => (
                <div
                  key={step.id}
                  className="process-step min-h-[50vh] lg:min-h-screen flex flex-col justify-center px-6 md:px-24 py-16 md:py-24 border-b border-primary/5 lg:border-none"
                >
                  {/* Mobile Image */}
                  <div className="lg:hidden w-full aspect-video mb-8 overflow-hidden rounded-sm relative">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                      0{step.id}
                    </div>
                  </div>

                  <div
                    className={`step-indicator-${i} hidden lg:block w-8 h-[2px] bg-[#D1CDC4] mb-8 transition-all duration-500`}
                  ></div>

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

        {/* Atelier Section */}
        <section className="atelier-section py-32 bg-[#EAE7DF] px-6 md:px-12 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start lg:items-center">
              {/* Left: Material List */}
              <div className="relative z-10">
                <span className="animate-text block text-xs font-bold uppercase tracking-widest text-accent mb-8">
                  Das Atelier
                </span>
                <h2 className="animate-text text-4xl md:text-6xl font-serif text-primary leading-tight mb-16">
                  Handwerk in <br />
                  Perfektion.
                </h2>

                <div className="space-y-4">
                  {materials.map((mat, index) => (
                    <div
                      key={mat.id}
                      className={`group cursor-pointer border-t py-6 md:py-8 touch-manipulation transition-all duration-300 ${
                        activeMaterial === index
                          ? "border-accent bg-white/50 pl-4 -ml-4 rounded-sm shadow-sm"
                          : "border-primary/10 hover:pl-2"
                      }`}
                      onMouseEnter={() => handleMaterialClick(index)}
                      onClick={() => handleMaterialClick(index)}
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <div className="flex items-center gap-6">
                          <span
                            className={`text-xs font-mono transition-colors duration-300 ${
                              activeMaterial === index
                                ? "text-accent font-bold"
                                : "text-gray-400"
                            }`}
                          >
                            0{index + 1}
                          </span>
                          <h3
                            className={`text-xl md:text-3xl font-serif transition-all duration-300 ${
                              activeMaterial === index
                                ? "text-primary translate-x-2"
                                : "text-primary/60"
                            }`}
                          >
                            {mat.name}
                          </h3>
                        </div>
                      </div>

                      {/* Animated Description & Mobile Image Accordion */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          activeMaterial === index
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-600 font-light pl-10 md:pl-12 max-w-md text-sm md:text-base mt-2 mb-4">
                          {mat.desc}
                        </p>

                        {/* MOBILE IMAGE: Shown inside the accordion for better UX on small screens */}
                        <div className="lg:hidden pl-10 pr-4 pb-4">
                          <div className="rounded-sm overflow-hidden h-48 w-full shadow-md relative">
                            <img
                              src={mat.img}
                              alt={mat.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-2 left-2 text-white text-[10px] uppercase tracking-widest font-bold">
                              Made in Berlin
                            </div>
                          </div>
                        </div>

                        <div className="pl-10 md:pl-12 hidden lg:block">
                          <div className="h-[1px] w-12 bg-accent/50"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-primary/10"></div>
                </div>
              </div>

              {/* Right: Changing Image Display (DESKTOP ONLY) */}
              <div className="hidden lg:block h-[700px] w-full relative mt-8 lg:mt-0 shadow-2xl rounded-sm overflow-hidden perspective-1000">
                {materials.map((mat, index) => (
                  <div
                    key={mat.id}
                    className={`material-img-${index} absolute inset-0 w-full h-full transition-all duration-700 ease-in-out overflow-hidden bg-primary`}
                    style={{
                      opacity: activeMaterial === index ? 1 : 0,
                      zIndex: activeMaterial === index ? 10 : 0,
                      clipPath:
                        activeMaterial === index
                          ? "inset(0% 0% 0% 0%)"
                          : "inset(0% 0% 100% 0%)",
                    }}
                  >
                    <img
                      src={mat.img}
                      alt={mat.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white max-w-xs transform translate-y-0 transition-transform duration-700">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="block text-[10px] uppercase tracking-widest text-white/80">
                          Premium Quality
                        </span>
                      </div>
                      <p className="font-serif text-2xl">{mat.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
<SplitBrandReveal />
        {/* Projects Preview */}
        <Projects />

        {/* Scrolling Client Marquee */}
        <section
          className="py-20 overflow-hidden bg-primary text-secondary border-t border-white/5"
          aria-label="Unsere Kunden"
        >
          <div className="container mx-auto px-6 mb-12 text-center">
            <span className="animate-text inline-block px-4 py-2 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white/50">
              Vertrauen seit Jahrzehnten
            </span>
          </div>
          <div className="marquee relative w-full flex overflow-hidden mask-gradient">
            <div className="marquee-inner flex gap-16 md:gap-24 items-center whitespace-nowrap pl-16">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {[
                    "Siemens",
                    "Bosch",
                    "Daimler",
                    "Lufthansa",
                    "Deutsche Bahn",
                    "SAP",
                    "Bayer",
                    "Allianz",
                  ].map((brand) => (
                    <span
                      key={brand}
                      className="text-3xl md:text-5xl font-serif text-white/30 hover:text-white transition-colors duration-300"
                    >
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
              src={footerBanner}
              className="w-full h-full object-cover filter brightness-[0.4]"
              alt="CTA Background"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/40"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <span className="animate-text block text-accent text-xs uppercase tracking-[0.2em] mb-6">
              Ihr Projekt
            </span>
            <h2 className="animate-text text-4xl md:text-7xl font-serif text-white mb-10 leading-none">
              Raum für
              <br />
              Ihre Vision.
            </h2>
            <div className="animate-text">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 bg-white text-primary px-8 py-4 md:px-10 md:py-5 text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
              >
                <span>Anfrage senden</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
