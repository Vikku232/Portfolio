import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle,
  Calendar,
  School,
  Trophy,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  GitBranch,
  Download,
  FileText,
  X,
} from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/sound';
import { renderTechIcon } from './TechIcons';

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    id: 'btech',
    category: 'DEGREE',
    period: '2023 – 2027',
    title: 'B.Tech in Computer Science & Engineering',
    institution: 'Gargi Memorial Institute of Technology, Kolkata',
    score: 'CGPA: 7.3 (till 5th Semester)',
    scoreBadge: 'CGPA 7.3',
    highlight: 'Core CS Foundations, OOP, Data Structures & Algorithms, Software Architecture & Enterprise Java',
    description:
      'Pursuing Bachelor of Technology with focus on scalable enterprise backend systems, distributed architectures, algorithms, and real-time WebSocket applications.',
    skills: ['Java', 'Spring Boot', 'Data Structures', 'OOP', 'SQL', 'Algorithms', 'Git'],
    isCurrent: true,
    subtrees: [
      {
        id: 'web-design',
        category: 'CERTIFICATION',
        period: '2024',
        title: 'Web Design Training',
        institution: 'Ardent Computech Pvt. Ltd.',
        score: 'CERTIFIED · PROFESSIONAL',
        scoreBadge: 'CERTIFIED',
        highlight: 'Hands-on training covering modern UI design, responsive page structures, and DOM scripting.',
        description:
          'Comprehensive hands-on training focusing on production frontend workflows, cross-browser styling, dynamic layout engines, and interactive web scripting.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'Git'],
      },
      {
        id: 'php-backend',
        category: 'CERTIFICATION',
        period: '2024',
        title: 'PHP Backend Development Training',
        institution: 'Euphoria Genx',
        score: 'CERTIFIED · BACKEND',
        scoreBadge: 'CERTIFIED',
        highlight:
          'Comprehensive backend engineering training focusing on server-side logic, database transactions, and secure form validation.',
        description:
          'Engineered server-side backend logic, relational MySQL database management, secure authentication flows, and transactional data validation pipelines.',
        skills: ['Core PHP', 'MySQL', 'REST API', 'Authentication', 'Security'],
      },
    ],
  },
  {
    id: 'higher-sec',
    category: 'SCHOOLING',
    period: '2023',
    title: 'Higher Secondary (Class XII)',
    institution: 'Vikram Vidyalaya (Branch)',
    score: 'Science Stream (PCM)',
    scoreBadge: 'PCM STREAM',
    highlight: 'Mathematics, Physics, Chemistry & Computer Science',
    description:
      'Completed Higher Secondary Education with an analytical foundation in calculus, physics, and computational thinking under state board curriculum.',
    skills: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    isCurrent: false,
  },
  {
    id: 'secondary',
    category: 'SCHOOLING',
    period: '2021',
    title: 'Secondary (Class X)',
    institution: 'Vikram Vidyalaya (Branch)',
    score: 'Secondary Board Examination',
    scoreBadge: 'BOARD EXAM',
    highlight: 'Foundational STEM, Mathematics & Science',
    description:
      'Completed secondary board schooling with academic excellence across core STEM curricula, foundation mathematics, and analytical sciences.',
    skills: ['Mathematics', 'Science', 'English', 'Logic'],
    isCurrent: false,
  },
];

export default function EducationCertifications() {
  const sectionRef = useRef(null);
  const [activeHoverId, setActiveHoverId] = useState(null);
  const [btechHovered, setBtechHovered] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmDownloadResume = () => {
    playClickSound();
    setShowConfirmModal(false);

    const link = document.createElement('a');
    link.href = '/Vikash_Kumar_Resume.pdf';
    link.download = 'Vikash_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cancelDownloadResume = () => {
    playClickSound();
    setShowConfirmModal(false);
  };

  const isBTechSubtreeActive =
    btechHovered ||
    activeHoverId === 'btech' ||
    activeHoverId === 'web-design' ||
    activeHoverId === 'php-backend';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRowClick = (id) => {
    playClickSound();
    setActiveHoverId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-[#0A0A0C] text-white overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 12%, rgba(72, 12, 22, 0.45) 0%, rgba(26, 4, 8, 0.25) 50%, rgba(10, 10, 12, 1) 90%)',
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 1. Header Centered in Middle */}
        <div className="edu-reveal text-center max-w-3xl mx-auto mb-6">
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-black font-display tracking-tight uppercase"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E6B0B8 45%, #54111D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.035em',
            }}
          >
            EDUCATION & CERTIFICATIONS
          </h2>
          <p className="mt-3 text-xs md:text-sm text-neutral-400 font-sans leading-relaxed max-w-xl mx-auto">
            Formal Computer Science engineering training, certified web technologies, and backend development accreditations.
          </p>
        </div>

        {/* 2. Interactive Spine Timeline with B.Tech Subtree Hierarchy */}
        <div className="relative max-w-4xl mx-auto mt-6">
          
          {/* Straight Vertical Glowing Spine Line Running Down */}
          <div
            className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-12 w-[2px] -translate-x-1/2 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, #E6B0B8 0%, #7A1926 20%, #7A1926 80%, rgba(122, 25, 38, 0.25) 100%)',
              boxShadow: '0 0 14px rgba(122, 25, 38, 0.65)',
            }}
          />

          {/* Timeline Stacked Rows */}
          <div className="space-y-6">
            {TIMELINE_DATA.map((item) => {
              const isOpen = activeHoverId === item.id;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    if (item.subtrees) setBtechHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (item.subtrees) {
                      setBtechHovered(false);
                      if (['btech', 'web-design', 'php-backend'].includes(activeHoverId)) {
                        setActiveHoverId(null);
                      }
                    }
                  }}
                  className="edu-reveal relative pl-9 sm:pl-12 md:pl-16"
                >
                  
                  {/* Glowing Node on the Main Vertical Line */}
                  <div
                    className={`absolute left-4 sm:left-6 md:left-8 top-5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 z-10 flex items-center justify-center ${
                      isOpen
                        ? 'w-5 h-5 bg-[#E6B0B8] border-2 border-[#7A1926] shadow-[0_0_18px_#E6B0B8] scale-125'
                        : 'w-3.5 h-3.5 bg-[#180508] border-2 border-[#5A141E] hover:border-[#E6B0B8] hover:shadow-[0_0_12px_#7A1926]'
                    }`}
                  >
                    {isOpen && <span className="w-1.5 h-1.5 rounded-full bg-[#5A141E]" />}
                  </div>

                  {/* Horizontal Branch Connector Line */}
                  <div
                    className={`absolute left-4 sm:left-6 md:left-8 top-5 h-[1.5px] transition-all duration-300 pointer-events-none ${
                      isOpen
                        ? 'w-5 sm:w-6 md:w-8 bg-gradient-to-r from-[#E6B0B8] to-[#7A1926] shadow-[0_0_8px_#7A1926]'
                        : 'w-5 sm:w-6 md:w-8 bg-[#4A1018]/50 hover:bg-[#7A1926]'
                    }`}
                  />

                  {/* Main Item Row: Single-line default, expands downward smoothly on hover */}
                  <div
                    onMouseEnter={() => {
                      playHoverSound();
                      setActiveHoverId(item.id);
                    }}
                    onMouseLeave={() => {
                      if (activeHoverId === item.id) setActiveHoverId(null);
                    }}
                    onClick={() => handleRowClick(item.id)}
                    className={`w-full rounded-2xl border transition-all duration-400 overflow-hidden cursor-pointer ${
                      isOpen
                        ? 'bg-gradient-to-b from-[#1C0509]/95 via-[#120306]/95 to-[#0A0A0C] border-[#7A1926] shadow-[0_12px_35px_rgba(122,25,38,0.35)]'
                        : 'bg-[#120407]/75 hover:bg-[#18050A]/90 border-[#4A1018]/45 hover:border-[#7A1926]/70 shadow-md'
                    }`}
                  >
                    {/* Compact Single-Line Header Bar */}
                    <div className="py-3 px-4 sm:px-5 flex items-center justify-between gap-3 sm:gap-4 select-none">
                      
                      {/* Left: Period Badge & Category */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                            isOpen
                              ? 'bg-[#3D0A12] text-[#F3B3BC] border-[#7A1926]'
                              : 'bg-white/5 text-neutral-300 border-white/10'
                          }`}
                        >
                          {item.period}
                        </span>

                        <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-neutral-500 uppercase px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                          {item.category}
                        </span>
                      </div>

                      {/* Center: Degree / Course Title & Institution in one single line */}
                      <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
                        <h3
                          className={`text-xs sm:text-sm md:text-base font-bold font-display truncate transition-colors ${
                            isOpen ? 'text-white' : 'text-neutral-200'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <span className="hidden md:inline text-neutral-500 font-mono text-xs shrink-0">/</span>
                        <span className="hidden md:inline text-xs font-mono text-neutral-400 truncate">
                          {item.institution}
                        </span>
                      </div>

                      {/* Right: Score Pill & Animated Expand Chevron */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        {item.subtrees && (
                          <span
                            className={`hidden sm:inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all ${
                              isBTechSubtreeActive
                                ? 'bg-[#5A121E] text-white border-[#7A1926] shadow-[0_0_10px_#7A1926]'
                                : 'bg-[#3D0A12] text-[#F3B3BC] border-[#7A1926]/60'
                            }`}
                          >
                            <GitBranch size={10} />
                            <span>{isBTechSubtreeActive ? '2 SUBTREES EXPANDED ▾' : '2 SUBTREES · HOVER TO EXPAND'}</span>
                          </span>
                        )}

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                            item.isCurrent
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                              : 'bg-[#25080E] text-[#F3B3BC] border border-[#5A141E]/50'
                          }`}
                        >
                          {item.scoreBadge}
                        </span>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                            isOpen
                              ? 'rotate-180 bg-[#7A1926] text-white shadow-[0_0_8px_#7A1926]'
                              : 'text-neutral-400'
                          }`}
                        >
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Smooth Expandable Drawer: Reveals remaining content on hover */}
                    <div
                      className={`transition-all duration-400 ease-out overflow-hidden px-4 sm:px-5 ${
                        isOpen ? 'max-h-[380px] opacity-100 pb-5 pt-1' : 'max-h-0 opacity-0 pb-0 pt-0'
                      }`}
                    >
                      <div className="pt-3 border-t border-white/10 space-y-3">
                        <div className="md:hidden flex items-center gap-2 text-xs font-mono text-[#F3B3BC]">
                          <School size={13} className="shrink-0" />
                          <span>{item.institution}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs text-neutral-300 font-mono">
                          <Sparkles size={14} className="text-[#F3B3BC] shrink-0 mt-0.5" />
                          <span>{item.highlight}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-[#F3B3BC]">
                          <Trophy size={13} className="shrink-0 text-amber-400" />
                          <span>Official Record: {item.score}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.skills.map((skill) => {
                            const icon = renderTechIcon(skill, 11);
                            return (
                              <span
                                key={skill}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#25080E]/90 border border-[#5A141E]/60 text-[10px] font-mono text-neutral-200"
                              >
                                {icon && <span className="shrink-0">{icon}</span>}
                                <span>{skill}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. SUBTREE BRANCH: Certifications Nested Directly Inside / Under B.Tech - Visible ONLY on B.Tech hover */}
                  {item.subtrees && item.subtrees.length > 0 && (
                    <div
                      className={`transition-all duration-500 ease-out overflow-hidden ${
                        isBTechSubtreeActive
                          ? 'max-h-[900px] opacity-100 mt-3 pointer-events-auto'
                          : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                      }`}
                    >
                      <div className="relative ml-3 sm:ml-5 md:ml-6 pl-5 sm:pl-7 border-l-2 border-[#7A1926]/70 space-y-3 pt-1">
                        
                        {/* Subtree Visual Indicator Tag */}
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider text-[#F3B3BC] uppercase pt-1 select-none">
                          <GitBranch size={12} className="text-[#E6B0B8]" />
                          <span>SUBTREE CERTIFICATIONS · GMIT DEGREE TENURE</span>
                        </div>

                        {item.subtrees.map((sub) => {
                          const isSubOpen = activeHoverId === sub.id;

                          return (
                            <div
                              key={sub.id}
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                playHoverSound();
                                setActiveHoverId(sub.id);
                              }}
                              onMouseLeave={(e) => {
                                e.stopPropagation();
                                if (activeHoverId === sub.id) setActiveHoverId(null);
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(sub.id);
                              }}
                              className="relative group/sub cursor-pointer"
                            >
                              {/* Subtree Branch Node on the sub-line */}
                              <div
                                className={`absolute -left-[26px] sm:-left-[34px] top-4 -translate-y-1/2 rounded-full transition-all duration-300 z-10 flex items-center justify-center ${
                                  isSubOpen
                                    ? 'w-4 h-4 bg-[#E6B0B8] border-2 border-[#7A1926] shadow-[0_0_12px_#E6B0B8] scale-110'
                                    : 'w-2.5 h-2.5 bg-[#1C0509] border border-[#7A1926] group-hover/sub:border-[#E6B0B8]'
                                }`}
                              />

                              {/* Subtree Horizontal Branch Line */}
                              <div
                                className={`absolute -left-[24px] sm:-left-[32px] top-4 w-6 sm:w-8 h-[1.5px] transition-all duration-300 pointer-events-none ${
                                  isSubOpen
                                    ? 'bg-[#E6B0B8] shadow-[0_0_8px_#7A1926]'
                                    : 'bg-[#5A141E]/60 group-hover/sub:bg-[#7A1926]'
                                }`}
                              />

                              {/* Subtree Single-line Bar */}
                              <div
                                className={`w-full rounded-xl border transition-all duration-300 overflow-hidden ${
                                  isSubOpen
                                    ? 'bg-gradient-to-b from-[#22060B]/95 via-[#140306]/95 to-[#0A0A0C] border-[#7A1926] shadow-[0_8px_25px_rgba(122,25,38,0.4)]'
                                    : 'bg-[#150408]/75 hover:bg-[#1A050A]/90 border-[#4A1018]/50 hover:border-[#7A1926]/70'
                                }`}
                              >
                                {/* Single-line Header Bar */}
                                <div className="py-2.5 px-3.5 sm:px-4 flex items-center justify-between gap-3 select-none">
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span
                                      className={`text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-colors ${
                                        isSubOpen
                                          ? 'bg-[#3D0A12] text-[#F3B3BC] border-[#7A1926]'
                                          : 'bg-white/5 text-neutral-300 border-white/10'
                                      }`}
                                    >
                                      {sub.period}
                                    </span>
                                    <span className="hidden sm:inline-block text-[8px] font-mono tracking-widest text-neutral-400 uppercase px-1.5 py-0.5 rounded bg-black/40 border border-white/5">
                                      {sub.category}
                                    </span>
                                  </div>

                                  <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-hidden">
                                    <h4
                                      className={`text-xs sm:text-sm font-bold font-display truncate transition-colors ${
                                        isSubOpen ? 'text-white' : 'text-neutral-200 group-hover/sub:text-white'
                                      }`}
                                    >
                                      {sub.title}
                                    </h4>
                                    <span className="hidden md:inline text-neutral-500 font-mono text-xs">/</span>
                                    <span className="hidden md:inline text-xs font-mono text-neutral-400 truncate">
                                      {sub.institution}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#25080E] text-[#F3B3BC] border border-[#5A141E]/50">
                                      {sub.scoreBadge}
                                    </span>
                                    <div
                                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${
                                        isSubOpen
                                          ? 'rotate-180 bg-[#7A1926] text-white shadow-[0_0_8px_#7A1926]'
                                          : 'text-neutral-400 group-hover/sub:text-white'
                                      }`}
                                    >
                                      <ChevronDown size={12} />
                                    </div>
                                  </div>
                                </div>

                                {/* Expandable Drawer on hover */}
                                <div
                                  className={`transition-all duration-300 ease-out overflow-hidden px-3.5 sm:px-4 ${
                                    isSubOpen ? 'max-h-[300px] opacity-100 pb-4 pt-1' : 'max-h-0 opacity-0 pb-0 pt-0'
                                  }`}
                                >
                                  <div className="pt-2.5 border-t border-white/10 space-y-2.5">
                                    <div className="md:hidden flex items-center gap-2 text-xs font-mono text-[#F3B3BC]">
                                      <School size={12} className="shrink-0" />
                                      <span>{sub.institution}</span>
                                    </div>
                                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                                      {sub.description}
                                    </p>
                                    <div className="flex items-start gap-2 bg-black/40 p-2 rounded-lg border border-white/5 text-[11px] text-neutral-300 font-mono">
                                      <Sparkles size={12} className="text-[#F3B3BC] shrink-0 mt-0.5" />
                                      <span>{sub.highlight}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 pt-0.5">
                                      {sub.skills.map((skill) => {
                                        const icon = renderTechIcon(skill, 10);
                                        return (
                                          <span
                                            key={skill}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#25080E]/90 border border-[#5A141E]/60 text-[9px] font-mono text-neutral-200"
                                          >
                                            {icon && <span className="shrink-0">{icon}</span>}
                                            <span>{skill}</span>
                                          </span>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* 5. Bottom Terminal Node: Verified Candidate Resume CTA */}
          <div className="edu-reveal relative pl-9 sm:pl-12 md:pl-16 pt-5">
            {/* Terminal Glowing Node on Main Line */}
            <div
              className="absolute left-4 sm:left-6 md:left-8 top-10 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#7A1926] border-2 border-[#E6B0B8] shadow-[0_0_14px_#7A1926] z-10"
            />
            
            {/* Terminal Branch */}
            <div className="absolute left-4 sm:left-6 md:left-8 top-10 w-5 sm:w-6 md:w-8 h-[1.5px] bg-[#7A1926]" />

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#20050A] via-[#100305] to-[#0A0A0C] border border-[#5A141E]/70 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-400 shrink-0 animate-pulse" />
                <div>
                  <span className="block text-xs font-mono font-bold tracking-wider text-white">
                    VERIFIED CANDIDATE · B.TECH CSE (GMIT)
                  </span>
                  <span className="block text-[11px] text-neutral-400 font-sans">
                    Proven enterprise backend capabilities, React full-stack, and active internships.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowConfirmModal(true);
                }}
                onMouseEnter={playHoverSound}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5A121E] to-[#200408] hover:from-[#7A1926] hover:to-[#380A12] text-white text-xs font-mono font-bold tracking-wider transition-all border border-[#7A1926]/50 shadow-[0_0_20px_rgba(122,25,38,0.35)] cursor-pointer hover:scale-105 select-none"
              >
                <Download size={14} className="text-[#F3B3BC] shrink-0" />
                <span>DOWNLOAD OFFICIAL RESUME</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Resume Download Confirmation Modal */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelDownloadResume();
          }}
        >
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-[#1C0509] via-[#120306] to-[#0A0A0C] border-2 border-[#7A1926] shadow-[0_20px_60px_rgba(122,25,38,0.7)] p-6 text-white relative">
            {/* Top Close Button */}
            <button
              onClick={cancelDownloadResume}
              onMouseEnter={playHoverSound}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/10"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* Icon Header */}
            <div className="w-12 h-12 rounded-2xl bg-[#2D0A12] border border-[#7A1926] flex items-center justify-center text-[#F3B3BC] shadow-[0_0_20px_rgba(122,25,38,0.5)]">
              <FileText size={22} />
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-bold font-display tracking-tight text-white mt-4">
              Download Official Resume?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-2 leading-relaxed">
              Do you want to download <span className="font-mono text-white font-semibold">Vikash_Kumar_Resume.pdf</span> to your device?
            </p>

            {/* File Info Pill */}
            <div className="mt-4 p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300">Format: <strong className="text-white">PDF</strong></span>
            </div>

            {/* Action Buttons: Yes / No */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={cancelDownloadResume}
                onMouseEnter={playHoverSound}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-300 hover:text-white font-mono text-xs font-bold tracking-wider transition-all border border-white/10 cursor-pointer text-center select-none"
              >
                NO, CANCEL
              </button>
              <button
                type="button"
                onClick={confirmDownloadResume}
                onMouseEnter={playHoverSound}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#7A1926] to-[#400B14] hover:from-[#962031] hover:to-[#550E1A] text-white font-mono text-xs font-bold tracking-wider transition-all border border-[#E6B0B8]/40 shadow-[0_0_20px_rgba(122,25,38,0.5)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] text-center select-none"
              >
                <Download size={14} />
                <span>YES, DOWNLOAD</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
