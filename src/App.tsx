import React, { useEffect, useRef, Suspense, lazy } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CookieConsent } from "./components/CookieConsent";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

// Lazy Load Pages for Performance Optimization
const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((module) => ({ default: module.AboutPage }))
);
const ExpertisePage = lazy(() =>
  import("./pages/ExpertisePage").then((module) => ({
    default: module.ExpertisePage,
  }))
);
const ProjectsPage = lazy(() =>
  import("./pages/ProjectsPage").then((module) => ({
    default: module.ProjectsPage,
  }))
);
const ProjectDetail = lazy(() =>
  import("./pages/ProjectDetail").then((module) => ({
    default: module.ProjectDetail,
  }))
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  }))
);
const ImpressumPage = lazy(() =>
  import("./pages/ImpressumPage").then((module) => ({
    default: module.ImpressumPage,
  }))
);
const DatenschutzPage = lazy(() =>
  import("./pages/DatenschutzPage").then((module) => ({
    default: module.DatenschutzPage,
  }))
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransitionOverlay = () => {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { yPercent: 0 });
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        delay: 0.1,
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [location]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-primary z-[60] pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <span className="text-secondary font-serif text-2xl italic">
        Liebscher
      </span>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-secondary text-primary">
    <div className="animate-pulse font-serif italic text-xl">Laden...</div>
  </div>
);

const AppContent: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(".loader-line", {
      scaleX: 1,
      duration: 1.5,
      ease: "expo.inOut",
    })
      .to(
        ".loader-text",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(".loader-container", {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.5,
      });
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-secondary cursor-none text-primary font-sans selection:bg-accent selection:text-white">
      <CustomCursor />
      <PageTransitionOverlay />

      {/* Initial Loader Overlay */}
      <div className="loader-container fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center text-secondary">
        <div className="overflow-hidden mb-8">
          <h1 className="loader-text text-4xl font-serif italic opacity-0 transform translate-y-10">
            Liebscher
          </h1>
        </div>
        <div className="w-64 h-[1px] bg-white/20 overflow-hidden">
          <div className="loader-line w-full h-full bg-secondary transform scale-x-0 origin-left"></div>
        </div>
      </div>

      <Navbar />

      <main className="flex flex-col w-full min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
          </Routes>
        </Suspense>
      </main>
      <CookieConsent />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;
