import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Code, Cpu, Award, Sparkles, CheckCircle } from 'lucide-react';
import { playHoverSound } from '../utils/sound';
import { renderTechIcon } from './TechIcons';

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const skills = [
    'Python & PyTest',
    'Machine Learning & RAG',
    'Generative AI',
    'Java & Spring Boot',
    'React & Tailwind CSS',
    'Three.js & WebGL',
    'GSAP 3 & ScrollTrigger',
    'Playwright Testing',
    'REST APIs & Cloud',
    'Creative Direction',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-14 md:py-18 px-4 md:px-12 bg-[#0A0A0C] text-white overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 15%, rgba(72, 12, 22, 0.42) 0%, rgba(26, 4, 8, 0.25) 50%, rgba(10, 10, 12, 1) 90%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2
          className="about-reveal text-3xl md:text-5xl font-black font-display tracking-tight uppercase mb-8"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #E6B0B8 45%, #54111D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
          }}
        >
          ABOUT ME
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text / Bio Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="about-reveal space-y-4 text-sm md:text-base font-sans text-neutral-300 leading-relaxed font-normal">
              <p className="text-lg md:text-xl text-white font-semibold leading-snug">
                I am a Software Engineer Intern at Accutai and creative technologist specializing in scalable enterprise architectures, Generative AI pipelines, and high-performance interactive web experiences.
              </p>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                Passionate about merging production-grade backend engineering (Java, Spring Boot, Python RAG models) with immersive frontend interfaces (React, GSAP 3, Three.js). I engineer reliable, tested systems backed by automated Playwright & PyTest suites.
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="about-reveal grid grid-cols-3 gap-4 my-6 py-4 border-y border-white/10">
              <div>
                <span className="block text-2xl md:text-3xl font-black font-display text-white">1+</span>
                <span className="text-[11px] font-mono text-[#F3B3BC] tracking-wider">YEARS EXP.</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-black font-display text-white">10+</span>
                <span className="text-[11px] font-mono text-[#F3B3BC] tracking-wider">PROJECTS BUILT</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-black font-display text-white">7.5</span>
                <span className="text-[11px] font-mono text-[#F3B3BC] tracking-wider">CGPA</span>
              </div>
            </div>

            {/* Skills & Tech Stack Chips */}
            <div className="about-reveal">
              <span className="text-xs font-mono font-bold tracking-widest text-[#F3B3BC] block mb-2 uppercase">
                TECHNIQUES & TOOLKIT
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => {
                  const icon = renderTechIcon(skill, 13);
                  return (
                    <span
                      key={skill}
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#180508]/80 border border-[#4A1018]/50 text-xs font-mono text-neutral-200 hover:text-white hover:bg-[#25080E] hover:border-[#7A1926]/70 transition-colors cursor-default shadow-sm group/pill"
                    >
                      {icon && (
                        <span className="shrink-0 flex items-center justify-center transition-transform group-hover/pill:scale-110">
                          {icon}
                        </span>
                      )}
                      <span>{skill}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Portrait Column (5 cols) */}
          <div className="lg:col-span-5 flex justify-center perspective-1000">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="about-reveal relative w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-[#1C0508] via-[#0E0305] to-[#0A0A0C] border border-[#5A141E]/45 p-2 transition-all duration-500 hover:border-[#7A1926]/70 hover:shadow-[0_20px_50px_rgba(74,16,24,0.35)]"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
                <img
                  src="/assets/vikash_real.jpg"
                  alt="Vikash Kumar Pandey - Java Backend Developer"
                  className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Dark Maroon Vignette & Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-[#25060B]/25 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                  <div className="bg-[#0F0305]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#5A141E]/50">
                    <span className="block text-xs font-mono font-bold text-white tracking-wider">
                      VIKASH KUMAR PANDEY
                    </span>
                    <span className="block text-[10px] font-mono text-[#F3B3BC]">
                      Backend Developer
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0F0305]/85 backdrop-blur px-2.5 py-1 rounded-full border border-[#5A141E]/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-mono text-white/90">ACCUTAI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
