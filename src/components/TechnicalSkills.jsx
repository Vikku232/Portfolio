import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Sparkles, Layers, Play, Pause, RotateCw } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sound';
import {
  JavaIcon,
  SpringBootIcon,
  HibernateIcon,
  RestApiIcon,
  SqlIcon,
  SqliteIcon,
  GradleIcon,
  JavaScriptIcon,
  PythonIcon,
  CIcon,
  ReactIcon,
  TypeScriptIcon,
  TailwindIcon,
  Html5Icon,
  Css3Icon,
  BootstrapIcon,
  PostgresIcon,
  MysqlIcon,
  GitIcon,
  GithubIcon,
  IntelliJIcon,
  VSCodeIcon,
  PostmanIcon,
  PlaywrightIcon,
  PytestIcon,
  OopIcon,
  DsaIcon,
  MvcIcon,
  DtoIcon,
} from './TechIcons';

gsap.registerPlugin(ScrollTrigger);

// 6 Skill Categories matching Vikash Kumar Pandey's Resume Arsenal
const SKILL_CARDS = [
  {
    id: 'backend',
    category: 'BACKEND ARCHITECTURE',
    title: 'JAVA & SPRING BOOT',
    subtitle: 'Enterprise REST, Hibernate ORM & MVC',
    badge: 'CORE DOMAIN',
    accentColor: '#6DB33F',
    ringColor: '#6DB33F',
    ringGlow: 'rgba(109, 179, 63, 0.45)',
    primaryIcon: SpringBootIcon,
    items: [
      { name: 'Java', icon: JavaIcon, color: '#ED8B00', tag: 'Core & OOP' },
      { name: 'Spring Boot', icon: SpringBootIcon, color: '#6DB33F', tag: 'Microservices' },
      { name: 'Hibernate', icon: HibernateIcon, color: '#C9A86E', tag: 'JPA / ORM' },
      { name: 'REST APIs', icon: RestApiIcon, color: '#00E5FF', tag: 'Web Services' },
      { name: 'MVC Arch', icon: MvcIcon, color: '#EC4899', tag: 'Design Pattern' },
      { name: 'DTO Valid', icon: DtoIcon, color: '#F59E0B', tag: 'Validation' },
      { name: 'Gradle', icon: GradleIcon, color: '#05A065', tag: 'Build Tool' },
      { name: 'SQL & ACID', icon: SqlIcon, color: '#38BDF8', tag: 'Persistence' },
    ],
  },
  {
    id: 'languages',
    category: 'PROGRAMMING LANGUAGES',
    title: 'LANGUAGES & SCRIPTING',
    subtitle: 'Data structures, OOP & algorithmic systems',
    badge: 'FOUNDATIONS',
    accentColor: '#F7DF1E',
    ringColor: '#F7DF1E',
    ringGlow: 'rgba(247, 223, 30, 0.45)',
    primaryIcon: JavaIcon,
    items: [
      { name: 'Java', icon: JavaIcon, color: '#ED8B00', tag: 'Collections & OOP' },
      { name: 'JavaScript', icon: JavaScriptIcon, color: '#F7DF1E', tag: 'ES6+ Modern' },
      { name: 'Python', icon: PythonIcon, color: '#3776AB', tag: 'Scripting & Automation' },
      { name: 'C Lang', icon: CIcon, color: '#00599C', tag: 'Procedural Basics' },
      { name: 'DSA', icon: DsaIcon, color: '#10B981', tag: 'Algorithms' },
      { name: 'OOP Design', icon: OopIcon, color: '#A855F7', tag: 'Architecture' },
    ],
  },
  {
    id: 'frontend',
    category: 'FRONTEND ARCHITECTURE',
    title: 'REACT & MODERN UI',
    subtitle: 'Type-safe reactive interfaces & animations',
    badge: 'CLIENT SIDE',
    accentColor: '#61DAFB',
    ringColor: '#61DAFB',
    ringGlow: 'rgba(97, 218, 251, 0.45)',
    primaryIcon: ReactIcon,
    items: [
      { name: 'React', icon: ReactIcon, color: '#61DAFB', tag: 'Component Systems' },
      { name: 'TypeScript', icon: TypeScriptIcon, color: '#3178C6', tag: 'Type Safety' },
      { name: 'Tailwind CSS', icon: TailwindIcon, color: '#06B6D4', tag: 'Utility Styling' },
      { name: 'HTML5', icon: Html5Icon, color: '#E34F26', tag: 'Semantic Web' },
      { name: 'CSS3', icon: Css3Icon, color: '#1572B6', tag: 'Animations & Grid' },
      { name: 'Bootstrap', icon: BootstrapIcon, color: '#7952B3', tag: 'Responsive UI' },
    ],
  },
  {
    id: 'databases',
    category: 'DATABASES & PERSISTENCE',
    title: 'RELATIONAL & SCHEMAS',
    subtitle: 'ACID transactions, relational mapping & query optimization',
    badge: 'DATA LAYER',
    accentColor: '#4169E1',
    ringColor: '#4169E1',
    ringGlow: 'rgba(65, 105, 225, 0.45)',
    primaryIcon: PostgresIcon,
    items: [
      { name: 'PostgreSQL', icon: PostgresIcon, color: '#4169E1', tag: 'Relational DB' },
      { name: 'MySQL', icon: MysqlIcon, color: '#4479A1', tag: 'Enterprise SQL' },
      { name: 'SQLite', icon: SqliteIcon, color: '#29B6F6', tag: 'Embedded DB' },
      { name: 'Hibernate', icon: HibernateIcon, color: '#C9A86E', tag: 'Entity Mapping' },
      { name: 'SQL Schema', icon: SqlIcon, color: '#38BDF8', tag: 'ACID Compliance' },
      { name: 'REST Feeds', icon: RestApiIcon, color: '#00E5FF', tag: 'Pipelines' },
    ],
  },
  {
    id: 'tools',
    category: 'TOOLS & PLATFORMS',
    title: 'DEV WORKFLOW & CI',
    subtitle: 'Version control, professional IDEs & API testing',
    badge: 'TOOLCHAINS',
    accentColor: '#FF6C37',
    ringColor: '#FF6C37',
    ringGlow: 'rgba(255, 108, 55, 0.45)',
    primaryIcon: PostmanIcon,
    items: [
      { name: 'Git', icon: GitIcon, color: '#F05032', tag: 'Version Control' },
      { name: 'GitHub', icon: GithubIcon, color: '#FFFFFF', tag: 'Collaboration' },
      { name: 'IntelliJ IDEA', icon: IntelliJIcon, color: '#FE315D', tag: 'Java IDE' },
      { name: 'VS Code', icon: VSCodeIcon, color: '#007ACC', tag: 'Code Editor' },
      { name: 'Postman', icon: PostmanIcon, color: '#FF6C37', tag: 'API Debugging' },
      { name: 'Gradle', icon: GradleIcon, color: '#05A065', tag: 'Automation' },
    ],
  },
  {
    id: 'core_cs',
    category: 'CORE CS & TESTING',
    title: 'FOUNDATIONS & QA',
    subtitle: 'Complexity analysis, design patterns & automated test suites',
    badge: 'ENGINEERING',
    accentColor: '#10B981',
    ringColor: '#10B981',
    ringGlow: 'rgba(16, 185, 129, 0.45)',
    primaryIcon: DsaIcon,
    items: [
      { name: 'DSA', icon: DsaIcon, color: '#10B981', tag: 'Binary Trees & Graphs' },
      { name: 'OOP Design', icon: OopIcon, color: '#A855F7', tag: 'SOLID Principles' },
      { name: 'Playwright', icon: PlaywrightIcon, color: '#2EAD33', tag: 'E2E Testing' },
      { name: 'PyTest', icon: PytestIcon, color: '#0A9EDC', tag: 'Unit Testing' },
      { name: 'REST Arch', icon: RestApiIcon, color: '#00E5FF', tag: 'Stateless Design' },
      { name: 'MVC Design', icon: MvcIcon, color: '#EC4899', tag: 'Layer Separation' },
    ],
  },
];

export default function TechnicalSkills() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const deckRef = useRef(null);

  // Responsive screen check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Section entrance reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        deckRef.current,
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
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

  // Continuous auto loop: rotates cards every 3.6s, pausing on hover so user can read/click icons
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SKILL_CARDS.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered]);

  const handleSelectCard = (index) => {
    playClickSound();
    setActiveIdx(index);
  };

  const handlePrev = () => {
    playClickSound();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : SKILL_CARDS.length - 1));
  };

  const handleNext = () => {
    playClickSound();
    setActiveIdx((prev) => (prev < SKILL_CARDS.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculate 3D Card Transform for each card in the fan deck with continuous circular wrapping
  const getCardStyle = (index) => {
    const total = SKILL_CARDS.length; // 6 cards
    let diff = index - activeIdx;

    // Continuous circular shortest-distance loop:
    // Wraps cards circularly so transitioning from last to first card is seamless
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    if (diff === 0) {
      // Active center card
      return {
        transform: 'translateX(0px) translateY(-18px) translateZ(90px) rotateY(0deg) rotateZ(0deg) scale(1.03)',
        zIndex: 40,
        opacity: 1,
        pointerEvents: 'auto',
        filter: 'brightness(1.05) drop-shadow(0 25px 45px rgba(0, 0, 0, 0.8))',
      };
    }

    const sign = diff > 0 ? 1 : -1;

    if (isMobile) {
      // Compact Mobile Fan
      const xOffset = sign * Math.min(absDiff * 42, 90);
      const yOffset = absDiff * 10;
      const zOffset = -absDiff * 45;
      const rotY = -sign * Math.min(absDiff * 14, 24);
      const rotZ = sign * Math.min(absDiff * 5, 8);
      const scale = Math.max(1 - absDiff * 0.12, 0.72);
      return {
        transform: `translateX(${xOffset}px) translateY(${yOffset}px) translateZ(${zOffset}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
        zIndex: 30 - absDiff * 5,
        opacity: Math.max(1 - absDiff * 0.28, 0.25),
        pointerEvents: 'auto',
        filter: `brightness(${Math.max(1 - absDiff * 0.25, 0.45)})`,
      };
    }

    // Full Desktop 3D Arc Fanning in circular ring
    const xOffset = sign * (absDiff === 1 ? 165 : absDiff === 2 ? 300 : 410);
    const yOffset = absDiff * 10;
    const zOffset = -absDiff * 50;
    const rotY = -sign * (absDiff === 1 ? 16 : absDiff === 2 ? 26 : 32);
    const rotZ = sign * (absDiff === 1 ? 6 : absDiff === 2 ? 12 : 16);
    const scale = Math.max(1 - absDiff * 0.08, 0.74);

    return {
      transform: `translateX(${xOffset}px) translateY(${yOffset}px) translateZ(${zOffset}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
      zIndex: 30 - absDiff * 5,
      opacity: Math.max(1 - absDiff * 0.18, 0.4),
      pointerEvents: 'auto',
      filter: `brightness(${Math.max(1 - absDiff * 0.2, 0.5)})`,
    };
  };

  const activeCard = SKILL_CARDS[activeIdx];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-14 md:py-18 px-4 bg-[#0A0A0C] text-white overflow-hidden select-none"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 15%, rgba(72, 12, 22, 0.4) 0%, rgba(10, 10, 12, 0.98) 75%)`,
        transition: 'background-image 0.8s ease',
      }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-6">
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            TECHNICAL SKILLS
          </h2>
          <p className="mt-2 text-xs md:text-sm text-neutral-400 font-sans leading-relaxed">
            Interactive 3D Technology Deck with authentic brand frameworks, languages, databases & toolchains.
          </p>
        </div>

        {/* Top Category Filter Pills (Matches Reference Video UI) */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8 max-w-4xl px-2">
          {SKILL_CARDS.map((cat, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCard(idx)}
                onMouseEnter={playHoverSound}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#5A121C] to-[#2E070D] text-white font-bold border border-[#7A1926]/70 shadow-[0_0_20px_rgba(122,25,38,0.45)] scale-105'
                    : 'bg-[#180508]/50 text-neutral-400 hover:text-white hover:bg-[#25080E] border border-[#4A1018]/40'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: cat.accentColor }}
                />
                <span className="uppercase">{cat.category.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Fanning Card Deck Container */}
        <div
          ref={deckRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-5xl h-[440px] sm:h-[460px] flex items-center justify-center"
          style={{
            perspective: isMobile ? '800px' : '1300px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {SKILL_CARDS.map((card, idx) => {
            const style = getCardStyle(idx);
            const isActive = idx === activeIdx;
            const PrimaryIcon = card.primaryIcon;

            return (
              <div
                key={card.id}
                onClick={() => handleSelectCard(idx)}
                onMouseEnter={playHoverSound}
                style={{
                  ...style,
                  transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease, filter 0.65s ease',
                }}
                className={`absolute top-2 w-[250px] sm:w-[275px] md:w-[295px] h-[410px] sm:h-[430px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer border backdrop-blur-2xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-b from-[#1E060A]/95 via-[#120406]/95 to-[#0A0A0C]/95 border-[#5A141E]/60 shadow-[0_20px_50px_-15px_rgba(70,10,18,0.6)]'
                    : 'bg-gradient-to-b from-[#140407]/85 to-[#0A0A0C]/85 border-[#4A1018]/30 hover:border-[#7A1926]/50'
                }`}
              >
                {/* Active Neon Accent Rim Glow */}
                {isActive && (
                  <div
                    className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-50 blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${card.accentColor} 0%, transparent 60%)`,
                    }}
                  />
                )}

                {/* Card Top Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400">
                      {card.badge}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider"
                      style={{
                        backgroundColor: `${card.accentColor}20`,
                        color: card.accentColor,
                        border: `1px solid ${card.accentColor}40`,
                      }}
                    >
                      {card.items.length} STACK
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black font-display tracking-tight text-white">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-sans mt-0.5 line-clamp-1">
                    {card.subtitle}
                  </p>
                </div>

                {/* Center Futuristic Halo Ring Motif */}
                <div className="relative z-10 flex items-center justify-center my-1">
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing Outer Neon Ring */}
                    <div
                      className="absolute w-14 h-14 rounded-full animate-pulse"
                      style={{
                        boxShadow: `0 0 25px 6px ${card.ringColor}55`,
                        border: `2px solid ${card.ringColor}`,
                      }}
                    />
                    {/* Angled Rotating Ring Ring Arc */}
                    <div
                      className="absolute w-18 h-7 rounded-full border-2"
                      style={{
                        borderColor: card.ringColor,
                        transform: 'rotate(-25deg)',
                        boxShadow: `0 0 12px ${card.ringColor}`,
                      }}
                    />
                    {/* Primary Category Core Emblem */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/60 border border-white/20 relative z-10"
                      style={{
                        boxShadow: `inset 0 0 12px ${card.ringColor}33`,
                      }}
                    >
                      <PrimaryIcon size={24} />
                    </div>
                  </div>
                </div>

                {/* Grid of Authentic Colored Technology Icons */}
                <div className="relative z-10">
                  <div className="grid grid-cols-4 gap-1.5">
                    {card.items.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <div
                          key={item.name}
                          onMouseEnter={playHoverSound}
                          className="group/item relative flex flex-col items-center justify-center p-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                          {/* Colored Icon Glow on Hover */}
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-30 transition-opacity duration-300 blur-sm pointer-events-none"
                            style={{ backgroundColor: item.color }}
                          />

                          {/* Authentic Brand SVG Icon */}
                          <div className="relative z-10 flex items-center justify-center w-6 h-6 transition-transform duration-300 group-hover/item:scale-110">
                            <IconComp size={18} />
                          </div>

                          {/* Tech Name Label */}
                          <span className="relative z-10 mt-0.5 text-[9px] font-mono text-neutral-300 group-hover/item:text-white font-medium tracking-tight text-center truncate max-w-full">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer Status */}
                <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    PRODUCTION READY
                  </span>
                  <span
                    className="font-bold text-[11px]"
                    style={{ color: card.accentColor }}
                  >
                    SELECT ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Carousel Controls (Prev / Next, Auto-Loop Toggle & Dots) */}
        <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 mt-8 relative z-20">
          <button
            onClick={handlePrev}
            onMouseEnter={playHoverSound}
            aria-label="Previous skill card"
            className="w-12 h-12 rounded-full bg-white/5 border border-white/15 hover:border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 cursor-pointer shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Auto Loop Toggle Pill */}
          <button
            onClick={() => {
              playClickSound();
              setIsAutoPlay(!isAutoPlay);
            }}
            onMouseEnter={playHoverSound}
            aria-label={isAutoPlay ? 'Pause auto loop' : 'Play auto loop'}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider border flex items-center gap-1.5 transition-all cursor-pointer ${
              isAutoPlay
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {isAutoPlay ? <Pause size={12} /> : <Play size={12} />}
            <span>{isAutoPlay ? 'LOOP ACTIVE' : 'LOOP PAUSED'}</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {SKILL_CARDS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectCard(idx)}
                onMouseEnter={playHoverSound}
                aria-label={`Jump to skill category ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIdx
                    ? 'w-8 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            onMouseEnter={playHoverSound}
            aria-label="Next skill card"
            className="w-12 h-12 rounded-full bg-white/5 border border-white/15 hover:border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 cursor-pointer shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
