
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import heroImg from "../assets/hero.png";
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Idle animation for scroll prompt
      gsap.to('.scroll-prompt', {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut'
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1500', // Scroll distance
          scrub: 1, // Slightly tighter scrub
          pin: true,
          anticipatePin: 1,
        }
      });

      // 0. Scroll prompt fades out immediately
      tl.to('.scroll-prompt', {
        opacity: 0,
        duration: 0.1,
        ease: 'power1.out'
      }, 0);

      // 1. Initial text panel slides completely off to the left
      // Removing blur to fix the "just blurry" issue and ensuring it leaves the viewport
      tl.to('.hero-initial-text', {
        xPercent: -100, 
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      }, 0);

      // 2. Image expands to full width
      tl.to('.hero-image-wrapper', {
        width: '100%',
        duration: 1, 
        ease: 'power2.inOut'
      }, 0);

      // 3. Image overlay darkens slightly for text readability
      tl.to('.hero-overlay', {
        opacity: 0.5,
        duration: 1
      }, 0);

      // 4. New text reveals in center with a delay
      tl.fromTo('.hero-final-text', 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: 'power3.out' 
        },
        ">-0.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-primary">
      <div className="w-full h-full relative flex">
        
        {/* Left Side: Initial Text - Dark Theme */}
        {/* Added will-change-transform for smoother animation */}
        <div className="hero-initial-text absolute top-0 left-0 w-[45%] h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10 bg-primary will-change-transform">
           <div className="overflow-hidden">
             <span className="block text-xs font-bold uppercase tracking-widest text-accent mb-6">
               Liebscher Messestandbau
             </span>
           </div>
           {/* Text is light beige against dark background */}
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-secondary leading-[1.05] mb-8">
             Räume, die <br/><span className="italic text-accent">bleiben.</span>
           </h1>
           <p className="text-white/60 font-light max-w-md leading-relaxed text-lg">
             Wir transformieren Markenidentität in dreidimensionale Erlebnisse. 
             Präzision, Ästhetik und handwerkliche Exzellenz aus Berlin.
           </p>
           
           <div className="scroll-prompt mt-20 flex items-center gap-4 text-white/30">
             <div className="h-[1px] w-12 bg-white/20"></div>
             <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
           </div>
        </div>

        {/* Right Side: Image Wrapper */}
        <div className="hero-image-wrapper absolute top-0 right-0 w-[55%] h-full overflow-hidden z-0 bg-black will-change-transform">
           <div className="hero-overlay absolute inset-0 bg-black/0 z-10 pointer-events-none transition-opacity"></div>
           <img 
             src={heroImg}
             className="w-full h-full object-cover"
             alt="Architecture Detail"
           />
        </div>

        {/* Final Text (Centered, Hidden Initially) */}
        <div className="hero-final-text absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center px-4 opacity-0">
           <span className="text-accent text-sm uppercase tracking-[0.3em] mb-6 drop-shadow-md">Beyond Space</span>
           <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-secondary mix-blend-overlay opacity-90">
             Unforgettable
           </h2>
        </div>

      </div>
    </section>
  );
};
