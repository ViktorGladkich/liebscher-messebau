import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Plus } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SEO } from "../components/SEO";
gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "1998",
    title: "Gründung",
    desc: "Max Liebscher gründet das Atelier in einer Kreuzberger Hinterhofwerkstatt. Der Fokus liegt auf individuellen Möbelbauten für lokale Galerien.",
  },
  {
    year: "2005",
    title: "Erste Expansion",
    desc: "Umzug in die Industriehallen am Westhafen. Erste Großprojekte für internationale Automobilkunden markieren den Einstieg in den Premium-Messebau.",
  },
  {
    year: "2012",
    title: "Global Rollout",
    desc: "Aufbau des internationalen Logistik-Netzwerks mit Partner-Hubs in Dubai, Shanghai und New York. Wir realisieren Projekte auf 3 Kontinenten gleichzeitig.",
  },
  {
    year: "2018",
    title: "Digital Unit",
    desc: "Gründung der In-House Planungsabteilung für VR/AR und digitale Interaktion. Der Messestand wird zur hybriden Erlebnisplattform.",
  },
  {
    year: "2024",
    title: "Next Gen",
    desc: "Vollständige Umstellung auf modulare, nachhaltige Systembauweise bei gleichbleibend hohem Designanspruch. CO2-neutraler Standbau als Standard.",
  },
];

const teamMembers = [
  {
    name: "Max Liebscher",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
  },
  {
    name: "Sarah Kogen",
    role: "Head of Design",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
  },
  {
    name: "David Alver",
    role: "Technical Director",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
  },
];

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useScrollReveal(".about-reveal", 0.5);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Horizontal Scroll Section (The DNA)
      // Only enable on desktop to avoid scroll jank on mobile
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const sections = gsap.utils.toArray(".dna-panel");
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".dna-scroll-wrapper",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () =>
              "+=" +
              (document.querySelector(".dna-scroll-wrapper")?.scrollWidth || 0),
          },
        });
      });

      // 2. Timeline Animation
      const line = timelineRef.current?.querySelector(".timeline-center-line");

      // Animate the line drawing downwards
      if (line) {
        gsap.fromTo(
          line,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }

      // Animate events popping in
      gsap.utils.toArray(".timeline-event-row").forEach((row) => {
        const element = row as HTMLElement;
        const content = element.querySelector(
          ".timeline-content-box"
        ) as HTMLElement | null;
        const year = element.querySelector(
          ".timeline-year-big"
        ) as HTMLElement | null;
        const dot = element.querySelector(
          ".timeline-dot-active"
        ) as HTMLElement | null;

        gsap.fromTo(
          content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: "top 70%",
            },
          }
        );

        // Dot activation
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: element,
                start: "top 60%",
              },
            }
          );
        }

        // Year parallax
        if (year) {
          gsap.fromTo(
            year,
            { opacity: 0, scale: 0.8, y: 50 },
            {
              opacity: 0.15, // Slightly visible
              scale: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
              },
            }
          );
        }
      });

      // 3. Team Hover Effect
      gsap.utils.toArray(".team-card").forEach((card) => {
        const element = card as HTMLElement;
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Über Uns"
        description="Die Geschichte von Liebscher Messestandbau. Vom Berliner Atelier zum globalen Partner für temporäre Architektur."
      />
      <div ref={containerRef} className="bg-secondary min-h-screen">
        {/* 1. HERO SECTION */}
        <header className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 container mx-auto">
          <div className="max-w-6xl">
            <span className="about-reveal block text-xs font-bold uppercase tracking-widest text-accent mb-8">
              Das Studio
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif leading-[0.9] text-primary mb-16">
              <div className="overflow-hidden">
                <span className="about-reveal block">Architektur</span>
              </div>
              <div className="overflow-hidden">
                <span className="about-reveal block">für den</span>
              </div>
              <div className="overflow-hidden">
                <span className="about-reveal block italic text-accent">
                  Augenblick.
                </span>
              </div>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 about-reveal">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600">
                Wir sind kein klassischer Messebauer. Wir sind ein Kollektiv aus
                Architekten, Designern und Handwerkern, die temporäre Räume mit
                der Qualität von permanenter Architektur schaffen.
              </p>
              <div className="flex items-end justify-start md:justify-end">
                <div className="animate-bounce p-4 border rounded-full border-primary/20">
                  <ArrowDown size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 2. FULL WIDTH IMAGE BREAK */}
        <section className="w-full h-[50vh] md:h-[80vh] overflow-hidden relative">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
            alt="Studio Atmosphere"
            className="w-full h-full object-cover parallax-img"
            data-speed="0.5"
            loading="lazy"
          />
        </section>

        {/* 3. HORIZONTAL SCROLL - "THE DNA" */}
        {/* Adjusted to be vertical on mobile for better UX, horizontal on desktop */}
        <section className="dna-scroll-wrapper overflow-hidden min-h-screen bg-primary text-secondary flex flex-col md:flex-row items-center">
          <div className="flex flex-col md:flex-row h-full w-full md:w-[300vw]">
            {/* Panels */}
            {[
              "Radikale Präzision.",
              "Ästhetische Strenge.",
              "Globale Denkweise.",
            ].map((title, i) => (
              <article
                key={i}
                className="dna-panel w-full md:w-screen min-h-screen flex items-center justify-center px-6 md:px-24 border-b md:border-b-0 md:border-r border-white/10 relative py-20 md:py-0"
              >
                <span className="absolute top-24 left-6 md:left-24 text-8xl md:text-9xl font-serif opacity-5">
                  0{i + 1}
                </span>
                <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <span className="text-accent text-xs uppercase tracking-widest mb-4 block">
                      Unsere DNA
                    </span>
                    <h2
                      className="text-4xl md:text-7xl font-serif mb-8"
                      dangerouslySetInnerHTML={{
                        __html: title.replace(" ", "<br/>"),
                      }}
                    ></h2>
                    <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed">
                      {i === 0 &&
                        "Wir tolerieren keine Ungenauigkeit. Unsere Wurzeln liegen im deutschen Handwerk. Jede Fuge, jeder Materialübergang wird mit der Obsession eines Uhrmachers geplant und ausgeführt."}
                      {i === 1 &&
                        'Weniger ist mehr, aber "weniger" ist schwerer zu bauen. Wir reduzieren visuelles Rauschen, um Ihrer Marke Raum zum Atmen zu geben. Minimalismus ist für uns kein Trend, sondern Haltung.'}
                      {i === 2 &&
                        "Design in Berlin, Realisierung in Dubai, New York oder Shanghai. Wir verstehen kulturelle Nuancen und logistische Herausforderungen. Wir sind dort zuhause, wo Ihre Marke sein muss."}
                    </p>
                  </div>
                  <div className="aspect-[4/5] bg-white/5 overflow-hidden rounded-sm order-1 lg:order-2">
                    <img
                      src={
                        [
                          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop",
                          "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
                          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2700&auto=format&fit=crop",
                        ][i]
                      }
                      className="w-full h-full object-cover opacity-80"
                      alt="DNA Visual"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. ADVANCED HISTORY TIMELINE */}
        <section
          ref={timelineRef}
          className="py-24 md:py-48 bg-secondary container mx-auto px-6 md:px-12 relative overflow-hidden"
        >
          <div className="text-center mb-24 md:mb-40">
            <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-4">
              Unsere Geschichte
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-primary">
              Evolution of Excellence
            </h2>
          </div>

          <div className="timeline-container relative max-w-6xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 h-full transform md:-translate-x-1/2"></div>
            <div className="timeline-center-line absolute left-4 md:left-1/2 top-0 w-[2px] bg-primary transform md:-translate-x-1/2 z-10 origin-top"></div>

            <div className="space-y-32 md:space-y-48">
              {timelineEvents.map((event, i) => (
                <article
                  key={i}
                  className={`timeline-event-row flex flex-col md:flex-row items-center relative ${
                    i % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Side */}
                  <div
                    className={`w-full md:w-1/2 relative px-8 md:px-24 pl-12 md:pl-24 ${
                      i % 2 === 0 ? "text-left md:text-right" : "text-left"
                    }`}
                  >
                    {/* Big Background Year */}
                    <span
                      className={`timeline-year-big absolute -top-8 md:-top-20 text-[5rem] md:text-[9rem] lg:text-[11rem] font-serif text-primary leading-none select-none pointer-events-none z-0 opacity-0
                          ${
                            i % 2 === 0
                              ? "right-auto md:right-12 left-0 md:left-auto"
                              : "left-0 md:left-12"
                          }
                        `}
                    >
                      {event.year}
                    </span>

                    <div className="timeline-content-box relative z-10 pt-12">
                      <h3 className="text-2xl md:text-5xl font-serif text-primary mb-6">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 font-light leading-relaxed text-base md:text-lg">
                        {event.desc}
                      </p>
                    </div>
                  </div>

                  {/* Dot on Line */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="w-4 h-4 rounded-full bg-secondary border border-primary"></div>
                    <div className="timeline-dot-active absolute w-4 h-4 rounded-full bg-primary scale-0"></div>
                  </div>

                  {/* Empty Side */}
                  <div className="hidden md:block w-1/2"></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. TEAM SECTION */}
        <section className="py-32 bg-[#EAE7DF] px-6 md:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-24">
              <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-4">
                Leadership
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-primary">
                Die Köpfe dahinter.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="team-card group relative overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-gray-300">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-6 border-t border-primary/10 pt-4 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-serif text-primary">
                        {member.name}
                      </h3>
                      <span className="text-xs uppercase tracking-widest text-gray-500">
                        {member.role}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. VALUES / MANIFESTO */}
        <section className="py-32 md:py-40 bg-primary text-secondary text-center px-6">
          <div className="container mx-auto max-w-4xl">
            <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-12">
              Unser Versprechen
            </span>
            <p className="text-3xl md:text-5xl font-serif leading-tight">
              "Wir bauen nicht nur Wände.
              <br />
              <span className="text-white/30">Wir bauen die Bühne für</span>
              <br />
              Ihren Erfolg."
            </p>
          </div>
          <div className="container mx-auto px-6 md:px-12 mt-16 text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-8">
              Bereit für den nächsten Schritt?
            </h2>
            <Link
              to="/contact"
              className="inline-block text-sm uppercase text-accent tracking-widest border-b border-accent pb-1 hover:text-white hover:border-accent transition-colors"
            >
              Projekt anfragen
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
