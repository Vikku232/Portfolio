import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Layers, MessageSquare, Mail, Terminal, Database, Cpu } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { playHoverSound, playClickSound } from '../utils/sound';
import { renderTechIcon } from './TechIcons';

gsap.registerPlugin(ScrollTrigger);

export const PROJECTS_DATA = [
  {
    id: 'school-admission-portal',
    title: 'School Admission Portal',
    subtitle: 'Senior Secondary School ERP (11th & 12th)',
    category: 'FULL STACK ENTERPRISE & EDU-TECH',
    client: 'ROYAL INT. SENIOR SEC. SCHOOL',
    year: '2026',
    image: '/assets/school_portal.png',
    badge: 'FEATURED · ENTERPRISE ERP',
    github: 'https://github.com/Vikku232/School-Admission-Portal',
    live: 'https://school-9ja1tuv2z-vikku232s-projects.vercel.app',
    description:
      'Engineered an enterprise-grade School Admission & Management Portal dedicated to Senior Secondary Classes 11th & 12th (RIPS). Features stream selection (Science PCM/PCB, Commerce, Humanities), multi-step digital admission application, document verification pipeline, fee invoice calculation, student & guardian portals, attendance, and exam management.',
    bullets: [
      'Engineered Class 11th & 12th admission workflow with stream-specific subject selection (Science, Commerce, Humanities).',
      'Implemented Spring Boot RESTful services with JWT authentication, RBAC, and Supabase / PostgreSQL database integration.',
      'Designed responsive, high-performance UI using React 19, TypeScript, Tailwind CSS, Motion animations, and TanStack Query.',
      'Built modules for fee management, invoice generation, attendance tracking, document uploads, and automated notifications.',
    ],
    tags: [
      'React 19',
      'TypeScript',
      'Spring Boot',
      'REST API',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'Git',
    ],
    deliverables: 'Class 11 & 12 Admission Portal, Spring Boot REST API, Student/Admin Dashboard, Supabase DB',
    isHero: true,
  },
  {
    id: 'ai-email-reply',
    title: 'AI-Email-Reply-Assistant',
    subtitle: 'AI Powered Gmail Chrome Extension',
    category: 'FULL STACK & GENERATIVE AI',
    client: 'OPEN SOURCE / PERSONAL',
    year: '2026',
    image: '/assets/ai_email.jpg',
    badge: 'FEATURED · GEMINI AI',
    github: 'https://github.com/Vikku232/AI-Email-Reply-Assistant',
    live: 'https://ai-email-reply.netlify.app/',
    description:
      'Developed an AI-powered Gmail Chrome Extension for generating professional email replies using Google Gemini API. Built full-stack architecture with React frontend and Spring Boot backend using REST APIs, backed by MySQL.',
    bullets: [
      'Developed an AI-powered Gmail Chrome Extension for generating professional email replies using Gemini API.',
      'Built full-stack architecture with React frontend and Spring Boot backend using REST APIs.',
      'Integrated MySQL database for efficient data management and real-time response handling.',
      'Enhanced user productivity by automating email drafting with dynamic AI-generated replies.',
    ],
    tags: [
      'React',
      'Spring Boot',
      'REST API',
      'MySQL',
      'Google Gemini API',
      'JavaScript',
      'HTML',
      'CSS',
      'Git',
    ],
    deliverables: 'Chrome Extension, Spring Boot REST Backend, MySQL DB, Gemini API Integration',
    isHero: false,
  },
  {
    id: 'connect-sphere',
    title: 'ConnectSphere',
    subtitle: 'Real-Time Chat Application',
    category: 'FULL STACK & WEBSOCKETS',
    client: 'OPEN SOURCE / PERSONAL',
    year: '2026',
    image: '/assets/connectsphere.jpg',
    badge: 'REAL-TIME WEBSOCKET',
    github: 'https://github.com/Vikku232/ConnectSphere',
    live: 'https://connect-sphere-vikku.netlify.app/',
    description:
      'Developed a real-time chat application where users can join with usernames and exchange instant messages. Implemented WebSocket-based communication for seamless real-time messaging, with a clean and responsive interface.',
    bullets: [
      'Developed a real-time chat application where users can join with usernames and exchange instant messages.',
      'Implemented WebSocket-based communication for seamless real-time messaging.',
      'Built and integrated React frontend with Spring Boot backend for full-stack functionality.',
      'Deployed the application with a clean and responsive chat interface.',
    ],
    tags: ['React.js', 'Spring Boot', 'WebSocket', 'Tailwind CSS', 'REST API', 'Git'],
    deliverables: 'WebSocket Server, Live Messaging Frontend, Responsive UI, Session Management',
    isHero: false,
  },
];

export default function CuratedProjects({ onSelectProject }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 6;
    const rotateY = (x / rect.width) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-14 md:py-18 px-4 md:px-12 bg-[#09090B] text-white overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 10%, rgba(72, 12, 22, 0.42) 0%, rgba(20, 3, 6, 0.25) 50%, rgba(9, 9, 11, 1) 90%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <h2
              className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #E6B0B8 45%, #54111D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.03em',
              }}
            >
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs md:text-sm text-neutral-400 max-w-md font-sans leading-relaxed">
            Production-grade full-stack systems engineering combining Spring Boot, React, Supabase, REST APIs, WebSockets, and Generative AI integrations.
          </p>
        </div>

        {/* Featured Real Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((proj, index) => (
            <div
              key={proj.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onMouseEnter={playHoverSound}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#180508]/85 via-[#100305]/90 to-[#0A0A0C] border border-[#4A1018]/45 shadow-2xl hover:border-[#7A1926]/70 hover:shadow-[0_20px_50px_rgba(74,16,24,0.35)] transition-all duration-500 flex flex-col justify-between"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Media Preview Container */}
              <div
                onClick={() => {
                  playClickSound();
                  onSelectProject(proj);
                }}
                className="relative h-44 sm:h-52 w-full overflow-hidden bg-neutral-900 cursor-pointer"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                  <span className="bg-black/80 backdrop-blur text-white text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full border border-white/20">
                    {proj.badge}
                  </span>
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                      }}
                      className="pointer-events-auto flex items-center gap-1.5 bg-[#4A1018]/90 hover:bg-[#7A1926] backdrop-blur text-white text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#7A1926]/60 shadow-[0_0_12px_rgba(122,25,38,0.5)] transition-all hover:scale-105"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>LIVE DEMO</span>
                      <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>

                {/* View Details Float */}
                <div className="absolute bottom-3 right-3 z-10 bg-black/75 backdrop-blur text-white px-2.5 py-1 rounded-full text-[11px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>EXPAND</span>
                  <ArrowUpRight size={12} />
                </div>
              </div>

              {/* Card Meta & Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-transparent">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span className="font-semibold text-emerald-400">{proj.category}</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-display text-white mb-0.5">
                    {proj.title}
                  </h3>
                  <span className="block text-[11px] font-mono text-[#F3B3BC] mb-3">
                    {proj.subtitle}
                  </span>

                  {/* Bullet Highlights from Resume */}
                  <div className="space-y-1.5 mb-4">
                    {proj.bullets.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-sans leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="line-clamp-2">{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((t) => {
                      const icon = renderTechIcon(t, 12);
                      return (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#25080E]/90 border border-[#5A141E]/50 text-[10px] font-mono text-neutral-200 font-medium"
                        >
                          {icon && <span className="shrink-0">{icon}</span>}
                          <span>{t}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClickSound}
                        onMouseEnter={playHoverSound}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#5A121E] to-[#200408] hover:from-[#7A1926] hover:to-[#380A12] text-white text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(90,18,30,0.35)] border border-[#7A1926]/40 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE DEMO</span>
                        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-colors border border-white/10"
                    >
                      <GithubIcon size={14} />
                      <span>CODE</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      playClickSound();
                      onSelectProject(proj);
                    }}
                    onMouseEnter={playHoverSound}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-colors hover-underline-maroon py-0.5 cursor-pointer"
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
