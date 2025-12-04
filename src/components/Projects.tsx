import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { projectsData } from '../lib/data';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Show only first 4 items for home preview
  const previewProjects = projectsData.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. TEXT ANIMATIONS
      gsap.utils.toArray<HTMLElement>('.animate-text').forEach((element) => {
        gsap.fromTo(element, 
          { y: 50, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );
      });

      // 2. Parallax for project images
      gsap.utils.toArray<HTMLElement>('.project-item').forEach((item) => {
        const img = item.querySelector('img');
        gsap.fromTo(img, 
          { scale: 1.2 },
          { 
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex justify-between items-end mb-24 border-b border-primary/10 pb-8">
          <div className="animate-text">
            <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-4">02 — Ausgewählte Arbeiten</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">Kollektion</h2>
          </div>
          <Link to="/projects" className="animate-text hidden md:block text-sm uppercase tracking-widest hover:text-accent transition-colors">Alle ansehen</Link>
        </div>

        <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {previewProjects.map((project, index) => (
            <Link 
              to={`/projects/${project.id}`}
              key={project.id} 
              className={`project-item group cursor-pointer ${index % 2 === 1 ? 'md:mt-24' : ''}`}
            >
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline animate-text">
                  <h3 className="text-2xl font-serif text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="block text-xs font-mono text-gray-300">{project.year}</span>
                </div>
                <div className="flex justify-between items-center text-right animate-text">
                  <span className="text-xs font-light text-gray-500">{project.location}</span>
                  <span className="block text-xs uppercase tracking-widest text-gray-400">{project.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center md:hidden animate-text">
          <Link to="/projects" className="text-sm uppercase tracking-widest border-b border-primary pb-1">Alle ansehen</Link>
        </div>

      </div>
    </section>
  );
};
