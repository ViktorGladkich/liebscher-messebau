import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { projectsData } from "../lib/data";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "Alle",
  "Technologie",
  "Automotive",
  "Interieur",
  "Nachhaltigkeit",
];

export const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState("Alle");
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(() => {
    return filter === "Alle"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);
  }, [filter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Character Reveal
      const chars = document.querySelectorAll(".header-char");
      if (chars.length) {
        gsap.fromTo(
          chars,
          { y: 150, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

      // 2. Filter / Content Fade In
      gsap.fromTo(
        ".header-content-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.8,
          ease: "power2.out",
          stagger: 0.1,
        }
      );

      // 3. Grid Items Entrance & Parallax
      const items = gsap.utils.toArray<HTMLElement>(".project-card");
      items.forEach((item) => {
        const el = item as HTMLElement;
        // Entrance - Trigger slightly earlier on mobile
        gsap.fromTo(
          el,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%", // Earlier start to ensure visibility
            },
          }
        );

        // Internal Image Parallax
        const img = el.querySelector<HTMLImageElement>(".project-img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [visibleProjects]); // Re-run animation when filter changes

  return (
    <div
      ref={containerRef}
      className="bg-[#111] min-h-screen w-full text-[#EAE7DF] selection:bg-accent selection:text-white pb-32 overflow-x-hidden"
    >
      {/* --- CINEMATIC HEADER WITH IMAGE BACKGROUND --- */}
      {/* Reduced min-h on mobile from 70vh to 50vh to show content sooner */}
      <header className="relative w-full min-h-[50vh] md:min-h-[70vh] flex flex-col justify-end pt-32 pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-[#111]/30 z-10" />
          <img
            src="/projects/luminaGrandHall2.jpg"
            alt="Projects Header"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          {/* Main Title */}
          <div className="relative overflow-hidden mb-8 md:mb-16">
            <h1 className="text-[13vw] md:text-[11vw] font-serif font-medium leading-[0.8] tracking-tighter uppercase mix-blend-overlay text-white/90 break-words">
              {"Projekte".split("").map((char, i) => (
                <span
                  key={i}
                  className="header-char inline-block origin-bottom"
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* Description & Filters Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-12 border-t border-white/20 pt-8">
            {/* Description */}
            <p className="header-content-reveal max-w-md text-gray-300 font-light text-base md:text-lg leading-relaxed">
              Ein Archiv unserer prägendsten Arbeiten. Kuratierte Räume zwischen
              temporärer Architektur und dauerhaftem Eindruck.
            </p>

            <nav className="header-content-reveal w-full lg:w-auto overflow-x-auto overflow-y-hidden pb-0 lg:pb-0 scrollbar-hide touch-pan-x">
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 md:gap-12 px-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-sm uppercase tracking-[0.15em] transition-all duration-300 relative group py-2 whitespace-nowrap ${
                      filter === cat
                        ? "text-white font-bold"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {cat}
                    {/* Active/Hover Underline */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-500 ease-out ${
                        filter === cat
                          ? "w-full"
                          : "w-0 group-hover:w-full opacity-50"
                      }`}
                    ></span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* --- PROJECT GRID --- */}
      {/* Reduced mt on mobile from 24 to 12 */}
      <div className="container mx-auto px-6 md:px-12 mt-12 md:mt-24">
        {/* Grid Layout: 2 Columns with Offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-32">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card w-full ${
                index % 2 === 1 ? "md:mt-32" : ""
              }`}
            >
              <Link to={`/projects/${project.id}`} className="block group">
                {/* Image Wrapper */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a] mb-6 md:mb-8">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>

                  {/* Floating Button (Appears on Hover) - Hidden on Touch */}
                  <div className="hidden md:flex absolute inset-0 z-20 items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 bg-[#EAE7DF] rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 ease-out text-[#111]">
                      <span className="text-xs font-bold uppercase tracking-widest">
                        View
                      </span>
                    </div>
                  </div>

                  {/* Image with Parallax Class */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="project-img w-full h-[115%] object-cover origin-top transition-filter duration-700"
                  />

                  {/* Top Right Tag */}
                  <div className="absolute top-0 right-0 p-4 md:p-6 z-20">
                    <span className="bg-[#111] text-[#EAE7DF] text-[10px] font-mono px-3 py-1 uppercase border border-white/10 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex justify-between items-start border-t border-white/10 pt-6 group-hover:border-accent/50 transition-colors duration-500">
                  <div className="max-w-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                        0{index + 1}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-serif text-[#EAE7DF] group-hover:text-white transition-colors leading-tight mb-2">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 font-light group-hover:text-gray-400 transition-colors">
                      {project.description}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-accent group-hover:text-accent group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* --- CALL TO ACTION SECTION --- */}
        <section className="relative bg-[#1a1a1a] rounded-lg text-white py-20 mt-20 flex flex-col items-center justify-center px-6 md:px-12">
          <div className="max-w-3xl text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Bereit für Ihr nächstes Projekt?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-light">
              Lassen Sie uns gemeinsam Ihre Vision zum Leben erwecken.
              Kontaktieren Sie uns für eine Beratung oder ein Angebot.
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 md:px-12 py-4 md:py-5 border border-white/20 text-white text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-[#111] transition-all duration-300"
            >
              Kontakt aufnehmen
            </Link>
          </div>

          {/* Optional subtle background pattern or shapes */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute w-72 h-72 bg-accent/10 rounded-full top-[-20%] left-[-10%] animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-white/5 rounded-full bottom-[-30%] right-[-15%] animate-pulse"></div>
          </div>
        </section>
        {visibleProjects.length === 0 && (
          <div className="py-32 text-center text-gray-600 font-serif text-xl">
            Keine Projekte in dieser Kategorie gefunden.
          </div>
        )}
      </div>
    </div>
  );
};
