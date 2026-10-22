import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CuratedProjects from './components/CuratedProjects';
import TechnicalSkills from './components/TechnicalSkills';
import Experience from './components/Experience';
import EducationCertifications from './components/EducationCertifications';
import AboutMe from './components/AboutMe';
import ContactFooter from './components/ContactFooter';
import ProjectModal from './components/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Luxurious momentum-based smooth scroll using Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    window.lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  const handleOpenContact = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#contact');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-white selection:bg-[#7A1926] selection:text-white overflow-x-hidden font-sans">
      {/* Floating Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Layout */}
      <main className="w-full flex flex-col">
        {/* 1. Hero Section with 3D Three.js Silhouette Head */}
        <Hero />

        {/* 2. Intro / Biography Section with Real User Portrait */}
        <AboutMe />

        {/* 3. Professional Experience (Accutai & Cognifyz Technologies) */}
        <Experience />

        {/* 4. Technical Skills Arsenal (Java, Spring Boot, React, SQL, Tools) */}
        <TechnicalSkills />

        {/* 5. Curated Projects Section (AI Email Assistant & ConnectSphere) */}
        <CuratedProjects onSelectProject={setSelectedProject} />

        {/* 6. Education & Certifications (GMIT B.Tech, Ardent Computech, Euphoria Genx) */}
        <EducationCertifications />

        {/* 7. Real Contact & Interactive Footer */}
        <ContactFooter />
      </main>

      {/* Interactive Case Study Lightbox / Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
