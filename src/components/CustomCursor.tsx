
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initial state: Hidden until mouse moves
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15, // Very responsive
        ease: 'power2.out',
        opacity: 1
      });
    };

    const onHover = () => {
      gsap.to(cursor, { 
        scale: 4, 
        backgroundColor: '#EAE7DF', // Surface color
        mixBlendMode: 'difference',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const onLeave = () => {
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: '#1C1C1C', // Primary color
        mixBlendMode: 'normal',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const addListeners = () => {
      // Select all interactive elements
      const clickables = document.querySelectorAll('a, button, input, textarea, select, .cursor-hover');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', onHover);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // Add listeners initially and after a short delay for dynamic content
    addListeners();
    const timeout = setTimeout(addListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      const clickables = document.querySelectorAll('a, button, input, textarea, select, .cursor-hover');
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
      clearTimeout(timeout);
    };
  }, [location]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{ willChange: 'transform' }}
    />
  );
};
