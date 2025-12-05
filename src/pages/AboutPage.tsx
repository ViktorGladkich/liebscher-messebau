import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Trophy } from "lucide-react";
import { SEO } from "../components/SEO";
import { Link } from "react-router-dom";
import heroAbout from "../assets/heroAbout.jpg"
const milestones = [
  {
    year: "1998",
    title: "Der Ursprung",
    desc: "Max Liebscher gründet das Atelier in einer Kreuzberger Hinterhofwerkstatt. Fokus: Individueller Möbelbau für Galerien.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
  },
  {
    year: "2005",
    title: "Expansion",
    desc: "Umzug an den Westhafen. Erste Großprojekte für internationale Automobilkunden markieren den Einstieg in den Premium-Messebau.",
    img: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2574&auto=format&fit=crop",
  },
  {
    year: "2012",
    title: "Global Scale",
    desc: "Aufbau des Logistik-Netzwerks mit Hubs in Dubai und Shanghai. Wir realisieren Projekte auf 3 Kontinenten gleichzeitig.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
  },
  {
    year: "2018",
    title: "Digital Unit",
    desc: "Gründung der In-House Planungsabteilung für VR/AR. Der Messestand wird zur hybriden Erlebnisplattform.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
  },
  {
    year: "2024",
    title: "Green Future",
    desc: 'Vollständige Umstellung auf modulare "Green Stand" Systeme. CO2-neutraler Standbau als neuer Standard.',
    img: "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?q=80&w=2568&auto=format&fit=crop",
  },
];

const team = [
  {
    name: "Jens Mario",
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
  {
    name: "Elena Mueler",
    role: "Lead Architect",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
  },
  {
    name: "James Wright",
    role: "Head of Logistics",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
  },
];

const awards = [
  {
    year: "2023",
    name: "German Design Award",
    category: "Excellent Architecture",
  },
  { year: "2022", name: "iF Design Award", category: "Fair Construction" },
  { year: "2021", name: "Red Dot", category: "Spatial Communication" },
  { year: "2019", name: "BrandEx Award", category: "Best Stand L" },
];

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(
        ".hero-char",
        { y: 150, opacity: 0, rotateX: -90, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".hero-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power2.out" }
      );

      // 2. Manifesto Highlight
      const text = document.querySelector(".manifesto-text");
      if (text) {
        const words = text.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { color: "#333" },
          {
            color: "#EAE7DF",
            stagger: 0.1,
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );
      }

      // 3. Timeline Sticky Logic (Desktop Only)
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          ScrollTrigger.create({
            trigger: ".timeline-section",
            start: "top top",
            end: "bottom bottom",
            pin: ".timeline-left",
            pinSpacing: false,
          });

          // Change the Year based on scroll position
          milestones.forEach((item, index) => {
            ScrollTrigger.create({
              trigger: `#milestone-${index}`,
              start: "top center",
              end: "bottom center",
              onEnter: () => {
                const yearEl = document.getElementById("sticky-year");
                if (yearEl) yearEl.innerText = item.year;
                gsap.fromTo(
                  "#sticky-year",
                  { y: 20, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.4 }
                );
              },
              onEnterBack: () => {
                const yearEl = document.getElementById("sticky-year");
                if (yearEl) yearEl.innerText = item.year;
                gsap.fromTo(
                  "#sticky-year",
                  { y: -20, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.4 }
                );
              },
            });
          });
        },
      });

      // 4. Team List Hover Animation
      gsap.utils.toArray<HTMLElement>(".team-row").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: { trigger: row, start: "top 90%" },
          }
        );
      });

      // 5. Stats Counter
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((stat) => {
        const endValue = parseInt(stat.getAttribute("data-value") || "0");
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: stat, start: "top 85%" },
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
        description="Liebscher Messestandbau Berlin - Das Atelier für temporäre Architektur."
      />

      <div
        ref={containerRef}
        className="bg-[#111] min-h-screen text-[#EAE7DF] selection:bg-accent selection:text-white"
      >
        {/* --- 1. HERO SECTION (FULL WIDTH) --- */}
        <header className="relative w-full h-[90dvh] md:min-h-[90vh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
          {/* Header Background Image (Full Width) */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/30 z-10" />
            <img
              src={heroAbout}
              className="w-full h-full object-cover opacity-80"
              alt="Atelier Background"
            />
          </div>

          <div className="relative z-20 container mx-auto px-6 md:px-12">
            <h1 className="text-[14vw] md:text-[13vw] font-serif leading-[0.85] tracking-tighter uppercase overflow-hidden mb-8 md:mb-12">
              {"DAS ATELIER".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block origin-bottom">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            <div className="hero-sub grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl border-t border-white/10 pt-8 md:pt-12">
              <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-300">
                Wir sind Architekten der Vergänglichkeit. Wir bauen Räume für
                Tage, die Erinnerungen für Jahre schaffen.
              </p>
            </div>
          </div>
        </header>

        {/* --- 2. MANIFESTO (SCROLL REVEAL) --- */}
        <section className="py-24 md:py-48 px-6 md:px-12 container mx-auto">
          <div className="manifesto-text text-3xl md:text-6xl lg:text-7xl font-serif leading-[1.3] max-w-5xl mx-auto text-center">
            {"Qualität ist kein Zufall. Sie ist das Ergebnis von intelligenter Anstrengung. Wir glauben an Materialien, die altern, nicht verschleißen. Wir glauben an Design, das dient, nicht blendet."
              .split(" ")
              .map((word, i) => (
                <span
                  key={i}
                  className="word inline-block mr-2 md:mr-3 transition-colors duration-300"
                >
                  {word}
                </span>
              ))}
          </div>
        </section>

        {/* --- 3. THE JOURNEY (TIMELINE) --- */}
        <section className="timeline-section relative py-24 md:py-32 border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row">
            {/* Left: Sticky Year (Desktop Only) */}
            <div className="timeline-left hidden md:flex md:w-1/3 md:h-screen sticky top-0 flex-col justify-center pb-32 md:pb-0">
              <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
                Die Historie
              </span>
            </div>

            {/* Right: Scrolling Content */}
            <div className="timeline-right w-full md:w-2/3 flex flex-col gap-24 md:gap-48 pb-16 md:pb-32">
              {milestones.map((item, index) => (
                <div
                  id={`milestone-${index}`}
                  key={index}
                  className="flex flex-col gap-6 md:gap-8 group"
                >
                  {/* Mobile Date Header */}
                  <div className="md:hidden flex items-end gap-4 border-b border-white/10 pb-4">
                    <span className="text-5xl font-serif text-[#EAE7DF] leading-none">
                      {item.year}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                      Meilenstein
                    </span>
                  </div>

                  <div className="w-full aspect-video overflow-hidden rounded-sm bg-white/5 relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105"
                    />
                  </div>
                  <div className="max-w-xl">
                    <h3 className="text-2xl md:text-4xl font-serif mb-4 text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: AWARDS & RECOGNITION --- */}
        <section className="py-24 bg-[#1a1a1a] border-y border-white/5">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-6">
                  Exzellenz
                </span>
                <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                  Ausgezeichnetes
                  <br />
                  Design.
                </h2>
                <p className="text-gray-400 font-light leading-relaxed max-w-md">
                  Unsere Arbeit wird international anerkannt. Nicht für die
                  Trophäen im Regal, sondern als Bestätigung unseres Anspruchs
                  an Qualität und Innovation.
                </p>
              </div>

              <div className="flex flex-col">
                {awards.map((award, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-6 border-b border-white/10 group hover:bg-white/5 transition-colors px-4 -mx-4 rounded-sm"
                  >
                    <div className="flex items-center gap-6">
                      <Trophy
                        size={16}
                        className="text-accent opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                      <div>
                        <span className="block text-xl font-serif text-white">
                          {award.name}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">
                          {award.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-mono text-gray-500 group-hover:text-white transition-colors">
                      {award.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. TEAM (INTERACTIVE LIST) --- */}
        <section className="py-24 md:py-32 bg-[#EAE7DF] text-[#111]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-16 md:mb-24">
              <h2 className="text-5xl md:text-8xl font-serif tracking-tight">
              Team
              </h2>
              
            </div>

            <div className="relative">
              {/* Team List */}
              <div className="relative z-10">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="team-row group relative border-t border-[#111]/10 py-8 md:py-10 cursor-pointer transition-colors hover:bg-white"
                    onMouseEnter={() => setHoveredMember(index)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-baseline gap-4 md:gap-8">
                        <span className="text-xs font-mono text-gray-400">
                          0{index + 1}
                        </span>
                        <h3 className="text-2xl md:text-5xl font-serif group-hover:translate-x-4 transition-transform duration-300">
                          {member.name}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
                        <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-accent transition-colors">
                          {member.role}
                        </span>
                        <div className="hidden md:flex w-8 h-8 items-center justify-center border border-[#111]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Plus size={16} />
                        </div>
                      </div>
                    </div>

                    {/* MOBILE TEAM IMAGE (Visible only on mobile) */}
                    <div className="md:hidden mt-6 mb-2 overflow-hidden rounded-sm relative w-full aspect-[4/5] bg-gray-200">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 text-[10px] uppercase tracking-widest font-bold">
                        Berlin Studio
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-[#111]/10"></div>
              </div>

              {/* Floating Image (Desktop Only) */}
              <div className="hidden lg:block fixed top-1/2 right-[15vw] w-[300px] h-[400px] pointer-events-none z-20 mix-blend-multiply transform -translate-y-1/2">
                {team.map((member, index) => (
                  <img
                    key={index}
                    src={member.img}
                    alt={member.name}
                    className={`absolute inset-0 w-full h-full object-cover shadow-2xl transition-all duration-500 ease-out ${
                      hoveredMember === index
                        ? "opacity-100 scale-100 rotate-2"
                        : "opacity-0 scale-90 -rotate-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. STATS --- */}
        <section className="py-24 md:py-32 bg-[#111] border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-serif text-white mb-2 block">
                  <span className="stat-number" data-value="25">
                    0
                  </span>
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                  Jahre Erfahrung
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-serif text-white mb-2 block">
                  <span className="stat-number" data-value="45">
                    0
                  </span>
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                  Experten
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-serif text-white mb-2 block">
                  <span className="stat-number" data-value="12">
                    0
                  </span>
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                  Länder
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-serif text-white mb-2 block">
                  <span className="stat-number" data-value="350">
                    0
                  </span>
                  +
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                  Projekte
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- 6. CTA --- */}
        <section className="py-24 md:py-32 bg-[#1a1a1a] text-center relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-6 md:mb-8">
              Let's Talk
            </span>
            <h2 className="text-4xl md:text-7xl font-serif text-white mb-10 md:mb-12">
              Bereit für <span className="italic text-accent">Exzellenz?</span>
            </h2>
            <Link
              to="/contact"
              className="inline-block px-10 md:px-12 py-4 md:py-5 border border-white/20 text-white text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-[#111] transition-all duration-300"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
