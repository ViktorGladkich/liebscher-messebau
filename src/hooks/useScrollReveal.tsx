import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (selector: string = '.animate-text', delay: number = 0) => {
  useEffect(() => {
    const elements = gsap.utils.toArray<HTMLElement>(selector);
    
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      elements.forEach((element) => {
        gsap.fromTo(element, 
          { 
            y: 30, 
            opacity: 0, 
            filter: 'blur(5px)' // Reduced blur for better performance
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            delay: delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%', // Triggers slightly earlier for better UX
              end: 'bottom 15%',
              toggleActions: 'play none none reverse', // Don't replay constantly to save CPU
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [selector, delay]);
};
