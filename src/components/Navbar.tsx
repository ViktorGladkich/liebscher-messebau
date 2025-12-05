import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";


export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();

      // Make visible before animating
      gsap.set(".menu-overlay", { visibility: "visible" });

      tl.to(".menu-overlay", { y: "0%", duration: 0.8, ease: "power4.inOut" })
        .fromTo(
          ".menu-item",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".menu-info",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4"
        );
    } else {
      document.body.style.overflow = "";
      const tl = gsap.timeline();

      tl.to(".menu-overlay", {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          // Hide visibility after animation finishes to prevent selecting text
          gsap.set(".menu-overlay", { visibility: "hidden" });
        },
      });
    }
  }, [isOpen]);

  // Updated navigation structure - Added Home, Removed Journal
  const navLinks = [
    { name: "Startseite", to: "/", label: "01" },
    { name: "Kollektion", to: "/projects", label: "02" },
    { name: "Expertise", to: "/expertise", label: "03" },
    { name: "Studio", to: "/about", label: "04" },
    { name: "Kontakt", to: "/contact", label: "05" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "py-1 bg-secondary/80 backdrop-blur-md border-b border-primary/5"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-2 flex justify-between items-center">
          <Link 
            to="/" 
            className="pointer-events-auto z-50 relative group cursor-hover flex items-center "
            aria-label="Liebscher Home"
          >
             <div className={`transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
               <img 
                 src="/logo/liebscher_logo.png" 
                 alt="Liebscher Logo" 
                 className="w-32 md:w-20 object-contain brightness-150"
               />
             </div>
             
             {/* Typographic Lockup */}
             <div className={`flex flex-col justify-center -ml-4 transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
               <span className="text-xl md:text-2xl font-sans font-bold leading-none tracking-tight uppercase">
                 Liebscher
               </span>
               <div className="flex items-center gap-2 mt-1">
                 <span className="h-[1px] w-4 bg-current opacity-50"></span>
                 <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-mono opacity-80 leading-none">
                   Messebau
                 </span>
               </div>
             </div>
          </Link>

          <div className="flex items-center gap-8">
            <button
  className={`z-50 flex items-center gap-3 focus:outline-none group cursor-hover transition-colors duration-300 ${
    scrolled ? "text-primary" : "text-secondary"
  }`}
  onClick={() => setIsOpen(!isOpen)}
  aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
  aria-expanded={isOpen}
>
  <span className="hidden md:block text-xs uppercase tracking-widest transition-colors">
    {isOpen ? "Schließen" : "Menü"}
  </span>
  <div className="relative w-8 h-8 flex items-center justify-center transition-colors">
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </div>
</button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      {/* Added 'invisible' class to prevent content from being seen/copied when closed */}
      <div className="menu-overlay fixed inset-0 bg-primary z-40 transform -translate-y-full text-secondary flex flex-col justify-center invisible">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 h-full py-32">
          <div className="hidden lg:flex flex-col justify-between menu-info opacity-0">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                Kontakt
              </h3>
              <p className="text-xl font-serif leading-relaxed text-gray-300">
                Industriestraße 45
                <br />
                10115 Berlin
                <br />
                Deutschland
              </p>
              <br />
              <p className="text-lg text-gray-300 hover:text-white transition-colors cursor-pointer cursor-hover">
                info@liebscher-messe.de
              </p>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Liebscher Messestandbau
            </div>
          </div>

          <nav className="flex flex-col justify-center space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`menu-item group flex items-baseline gap-6 py-2 border-b border-gray-800 hover:border-white/20 transition-colors cursor-hover ${
                  location.pathname === link.to ? "border-white" : ""
                }`}
                onClick={handleLinkClick}
              >
                <span className="text-xs font-mono text-accent">
                  {link.label}
                </span>
                <span className="text-5xl md:text-7xl font-serif text-gray-300 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 ease-out">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
