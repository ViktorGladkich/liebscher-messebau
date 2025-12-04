import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import type { ProjectData } from '../types';
import { projectsData } from '../lib/data';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const project = projectsData.find((p: ProjectData) => p.id === Number(id));
  const nextProject = projectsData.find((p: ProjectData) => p.id === (Number(id) % projectsData.length) + 1);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (project) {
      const ctx = gsap.context(() => {
        // Hero Parallax
        gsap.to('.detail-hero-img', {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.detail-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        // Text Reveal
        gsap.fromTo('.detail-reveal',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
        );

         // Gallery Fade Up
         gsap.utils.toArray<HTMLElement>('.gallery-img-wrapper').forEach((wrapper) => {
           gsap.fromTo(wrapper,
             { y: 50, opacity: 0 },
             { 
               y: 0, 
               opacity: 1, 
               duration: 1, 
               ease: 'power3.out',
               scrollTrigger: {
                 trigger: wrapper,
                 start: 'top 80%',
               }
             }
           );
         });

      }, containerRef);
      return () => ctx.revert();
    }
  }, [id, project]);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center bg-secondary">Projekt nicht gefunden.</div>;
  }

  return (
    <div ref={containerRef} className="bg-secondary min-h-screen w-full">
      
      {/* Hero Image */}
      <div className="detail-hero relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="detail-hero-img w-full h-[120%] object-cover origin-top"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 text-white mix-blend-difference">
           <div className="container mx-auto">
             <Link to="/projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mb-8 hover:opacity-70 transition-opacity">
               <ArrowLeft size={16} /> Zurück zur Übersicht
             </Link>
             <h1 className="detail-reveal text-5xl md:text-7xl lg:text-9xl font-serif leading-none">
               {project.title}
             </h1>
           </div>
        </div>
      </div>

      {/* Project Data Bar */}
      <div className="bg-secondary border-b border-primary/10 py-8 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-primary">
          <div className="detail-reveal">
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Kunde</span>
            <span className="text-lg font-serif">{project.client}</span>
          </div>
          <div className="detail-reveal">
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Ort</span>
            <span className="text-lg font-serif">{project.location}</span>
          </div>
          <div className="detail-reveal">
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Jahr</span>
            <span className="text-lg font-serif">{project.year}</span>
          </div>
          <div className="detail-reveal">
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Kategorie</span>
            <span className="text-lg font-serif">{project.category}</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          <div className="lg:w-1/3">
             <h2 className="text-3xl font-serif mb-8 text-primary">Die Aufgabe</h2>
             <p className="text-gray-600 font-light leading-relaxed text-lg">
               {project.challenge}
             </p>
          </div>
          <div className="lg:w-2/3">
             <h2 className="text-3xl font-serif mb-8 text-primary">Unsere Lösung</h2>
             <p className="text-primary font-serif text-2xl md:text-3xl leading-snug mb-8">
               "{project.solution}"
             </p>
             <p className="text-gray-600 font-light leading-relaxed text-lg">
               {project.description}
             </p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {project.gallery && project.gallery.map((img: string, index: number) => (
             <div 
               key={index} 
               className={`gallery-img-wrapper relative overflow-hidden bg-gray-200 ${
                 index % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
               }`}
             >
                <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
             </div>
           ))}
        </div>
      </div>

      {/* Next Project Footer */}
      {nextProject && (
        <Link to={`/projects/${nextProject.id}`} className="block relative group h-[40vh] overflow-hidden">
           <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-colors"></div>
           <img src={nextProject.imageUrl} className="w-full h-full object-cover" alt="Next" />
           <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
              <span className="text-xs uppercase tracking-widest mb-4 opacity-70">Nächstes Projekt</span>
              <h2 className="text-5xl md:text-7xl font-serif italic group-hover:scale-110 transition-transform duration-500">
                {nextProject.title}
              </h2>
              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                <span className="text-xs uppercase tracking-widest">Ansehen</span>
                <ArrowRight size={16} />
              </div>
           </div>
        </Link>
      )}

    </div>
  );
};
