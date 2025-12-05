
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "../lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Use top 5 projects for the stack showcase
  const stackProjects = projectsData.slice(0, 5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const nextCard = cardsRef.current[index + 1];

        // If there is a next card, animate the current one as the next one scrolls up
        if (nextCard) {
          ScrollTrigger.create({
            trigger: nextCard,
            start: "top bottom", // When top of next card hits bottom of viewport
            end: "top top+=150", // Until next card hits top of viewport (plus offset)
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              
              // 1. Subtle Scale Down
              gsap.to(card, {
                scale: 1 - (0.05 * progress), // Only scale down to 0.95
                ease: "none",
                overwrite: 'auto'
              });

              // 2. Subtle Darkening via Overlay (instead of filter)
              // This prevents the "black screen" effect while still giving depth
              const overlay = card.querySelector('.stack-overlay');
              if (overlay) {
                gsap.to(overlay, {
                  opacity: 0.4 * progress, // Max opacity 0.4
                  ease: "none",
                  overwrite: 'auto'
                });
              }
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects-stack"
      className="bg-[#111] relative pt-32 pb-48 border-t border-white/5"
    >
      <div className="container mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 text-[#EAE7DF]">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-4">
              02 — Kollektion
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-none">
              Ausgewählte
              <br />
              Arbeiten.
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:text-accent hover:border-accent transition-colors"
          >
            Alle Projekte ansehen <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12">
        {stackProjects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="sticky top-24 md:top-32 mb-12 last:mb-0 perspective-1000"
          >
            <div className="relative w-full aspect-[4/5] md:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl bg-[#1a1a1a] border border-white/5 group transform-gpu">
              
              {/* Image Layer */}
              <div className="absolute inset-0">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                
                {/* Default Hover Overlay (for interaction) */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>
                
                {/* Stacking Depth Overlay (Controlled by GSAP) */}
                <div className="stack-overlay absolute inset-0 bg-black opacity-0 z-20 pointer-events-none transition-none"></div>
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-30 pointer-events-none">
                {/* Top Row */}
                <div className="flex justify-between items-start text-white">
                  <span className="text-4xl md:text-6xl font-serif opacity-30 select-none">
                    0{index + 1}
                  </span>
                  <div className="px-4 py-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-xs uppercase tracking-widest">
                    {project.year}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 pointer-events-auto">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="block text-accent text-xs font-bold uppercase tracking-widest mb-2">
                      {project.category}
                    </span>
                    <Link to={`/projects/${project.id}`} className="block">
                        <h3 className="text-4xl md:text-7xl font-serif text-white mb-4 leading-none group-hover:text-accent transition-colors duration-300">
                        {project.title}
                        </h3>
                    </Link>
                    <p className="text-white/70 max-w-lg font-light md:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden md:block">
                      {project.description}
                    </p>
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="w-16 h-16 md:w-24 md:h-24 bg-white text-primary rounded-full flex items-center justify-center hover:scale-110 hover:bg-accent hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <ArrowUpRight size={32} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-24 md:hidden">
        <Link
          to="/projects"
          className="inline-block text-xs uppercase tracking-widest text-white border-b border-white/20 pb-1"
        >
          Alle Projekte
        </Link>
      </div>
    </section>
  );
};
