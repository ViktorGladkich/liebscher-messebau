import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { projectsData } from "../lib/data";
import type { ProjectData } from "../types";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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

  // Get the latest/highlight project
  const featuredProject = projectsData[0];

  // Optimized filtering using useMemo instead of useEffect + setState
  const visibleProjects = useMemo(() => {
    if (filter === "Alle") {
      return projectsData;
    }
    return projectsData.filter((p) => p.category === filter);
  }, [filter]);

  // Columns for the masonry layout
  const col1 = visibleProjects.filter((_, i) => i % 2 === 0);
  const col2 = visibleProjects.filter((_, i) => i % 2 !== 0);

  useEffect(() => {
    // Header Animation
    const ctx = gsap.context(() => {
      // Hero Text Reveal
      gsap.fromTo(
        ".hero-reveal",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Featured Project Scale In
      gsap.fromTo(
        ".featured-wrapper",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.6 }
      );

      // Filters
      gsap.fromTo(
        ".filter-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          delay: 1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-secondary min-h-screen w-full">
      {/* 1. Cinematic Header & Featured Project */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-primary text-secondary px-6 md:px-12 rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden">
        <div className="container mx-auto">
          <div className="mb-16 md:mb-24">
            <span className="hero-reveal block text-xs font-bold uppercase tracking-widest text-accent mb-6">
              Selected Works
            </span>
            <h1 className="hero-reveal text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9]">
              Räume mit
              <br />
              <span className="italic text-white/30">Charakter.</span>
            </h1>
          </div>

          {/* Featured Project Card */}
          <div className="featured-wrapper relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg group cursor-pointer">
            <Link to={`/projects/${featuredProject.id}`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
              <img
                src={featuredProject.imageUrl}
                alt={featuredProject.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                  <div>
                    <span className="inline-block px-3 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-widest mb-4 backdrop-blur-md">
                      Featured Project
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-2">
                      {featuredProject.title}
                    </h2>
                    <p className="text-white/70 text-lg font-light">
                      {featuredProject.description}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-white">
                    <span className="text-xs uppercase tracking-widest group-hover:mr-4 transition-all duration-300">
                      Case Study ansehen
                    </span>
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Filters */}
      <div className="container mx-auto px-6 md:px-12 mt-24 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-primary/10 pb-8 gap-8">
          <h3 className="text-2xl font-serif text-primary">
            Alle Projekte ({visibleProjects.length})
          </h3>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-item text-xs uppercase tracking-widest transition-all duration-300 relative group py-2 ${
                  filter === cat
                    ? "text-primary"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                {cat}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-300 ${
                    filter === cat ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Masonry Layout with WOW Cards */}
      <div className="container mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24">
          <div className="flex flex-col gap-24 lg:gap-32">
            {col1.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="flex flex-col gap-24 lg:gap-32 md:pt-48">
            {col2.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {visibleProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-serif text-xl">
            Keine Projekte in dieser Kategorie.
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group cursor-pointer w-full block"
    >
      {/* Image Container with Parallax Hover Effect */}
      <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-gray-200">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 ease-out border border-white/20">
            <span className="text-white text-xs uppercase tracking-widest">
              View
            </span>
          </div>
        </div>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-expo-out group-hover:scale-110"
        />

        {/* Floating Tag inside image */}
        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-[-10px] group-hover:translate-y-0">
          <span className="bg-white/90 backdrop-blur text-primary px-4 py-2 text-[10px] uppercase tracking-widest font-bold">
            {project.year}
          </span>
        </div>
      </div>

      {/* Enhanced Content Info */}
      <div className="flex flex-col gap-3 px-2">
        <div className="flex justify-between items-start border-b border-primary/10 pb-4 group-hover:border-primary/50 transition-colors duration-500">
          <div>
            <h3 className="text-3xl md:text-4xl font-serif text-primary group-hover:text-accent transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
            <p className="text-gray-500 font-light mt-2 text-sm max-w-sm line-clamp-2">
              {project.description}
            </p>
          </div>
          <ArrowUpRight
            className="text-gray-300 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            size={24}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-widest text-gray-400 mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-300 mb-1">Kunde</span>
            <span className="text-primary">{project.client}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-gray-300 mb-1">Kategorie</span>
            <span className="text-primary">{project.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
