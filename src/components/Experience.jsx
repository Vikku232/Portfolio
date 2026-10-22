import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Briefcase, CheckCircle2, Sparkles, Building2, Terminal } from 'lucide-react';
import { playHoverSound } from '../utils/sound';
import { renderTechIcon } from './TechIcons';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    id: 'accutai',
    company: 'Accutai Software Private Limited',
    role: 'Software Engineer Intern',
    status: 'Active',
    period: 'August 2026 - Present',
    location: 'Kolkata, West Bengal, India',
    domain: 'Enterprise Software & AI Solutions',
    badgeColor: '#D8FF3E',
    accentColor: '#00E5FF',
    logoType: 'cyan',
    logo: '/accutai_logo.jpg',
    logoBg: '#FFFFFF',
    overview:
      'Engineering scalable web architectures and intelligent AI integrations. Developing React UI components, integrating backend REST APIs with Spring Boot & Java, implementing Python machine learning models and Generative AI RAG pipelines, managing collaborative Git workflows, and configuring Playwright & PyTest automated testing suites.',
    points: [
      'Engineered responsive React UI components and connected enterprise REST APIs with Spring Boot.',
      'Implemented Generative AI workflows, Python machine learning scripts, and RAG pipelines.',
      'Configured automated test suites with Playwright & PyTest to maintain strict production quality.',
    ],
    tech: [
      'Python',
      'Machine Learning',
      'Generative AI',
      'RAG',
      'Java',
      'Spring Boot',
      'React',
      'Playwright',
      'PyTest',
    ],
  },
  {
    id: 'cognifyz',
    company: 'Cognifyz Technologies',
    role: 'Web Development Intern',
    status: 'Completed',
    period: 'Feb 2026 – Mar 2026',
    location: 'Remote / Virtual Internship',
    domain: 'Frontend Engineering & Responsive UI',
    badgeColor: '#FFA94D',
    accentColor: '#FF6B6B',
    logoType: 'purple',
    logo: '/cognifyz_logo.jpg',
    logoBg: '#FFFFFF',
    overview:
      'Engineered interactive, cross-device web interfaces and delivered end-to-end client-facing web applications across Level 1–3 internship milestones with rigorous code quality standards.',
    points: [
      'Developed multiple frontend projects using HTML, CSS, and JavaScript during Level 1–3 internship tasks.',
      'Built responsive web pages, landing pages, and interactive UI components.',
      'Implemented responsive layouts and improved user experience across different devices.',
      'Demonstrated strong problem-solving, communication, and web development skills throughout the internship.',
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive Layouts', 'UI/UX Design', 'Git'],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-title',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

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
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-14 md:py-18 px-4 md:px-12 bg-[#0A0A0C] text-white overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 0%, rgba(72, 12, 22, 0.42) 0%, rgba(26, 4, 8, 0.25) 50%, rgba(10, 10, 12, 1) 90%)',
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Giant Chrome / Metallic Header with Dark Maroon undertone */}
        <div className="exp-title mb-8">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black font-display tracking-tight uppercase select-none"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E6B0B8 45%, #54111D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.04em',
              filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.8))',
            }}
          >
            EXPERIENCE
          </h2>
        </div>

        {/* Stacked Experience Cards */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={playHoverSound}
              className="relative w-full rounded-2xl p-5 sm:p-6 md:p-8 bg-gradient-to-br from-[#160508]/90 via-[#0E0305]/95 to-[#0A0A0C]/95 border border-[#4A1018]/45 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#7A1926]/70"
              style={{
                boxShadow: index === 0 ? '0 0 50px -15px rgba(122, 25, 38, 0.25)' : 'none',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Column: Brand, Role, Meta (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                  <div>
                    {/* Status Pill */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider flex items-center gap-1.5 font-semibold"
                        style={{
                          backgroundColor: `${exp.badgeColor}15`,
                          border: `1px solid ${exp.badgeColor}40`,
                          color: exp.badgeColor,
                        }}
                      >
                        {exp.status === 'Active' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        )}
                        <span>INTERNSHIP · {exp.status}</span>
                      </span>
                    </div>

                    {/* Company Logo + Name inline */}
                    <div className="flex items-center gap-4 mb-2">
                      <div
                        className="shrink-0 inline-flex items-center justify-center rounded-xl overflow-hidden shadow-lg"
                        style={{
                          background: exp.logoBg,
                          width: '64px',
                          height: '64px',
                          boxShadow: `0 0 18px 0 ${exp.badgeColor}35`,
                          border: `1.5px solid ${exp.badgeColor}35`,
                        }}
                      >
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain"
                          style={{ padding: '5px' }}
                        />
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight leading-tight"
                        style={{ color: exp.badgeColor }}
                      >
                        {exp.company}
                      </h3>
                    </div>

                    {/* Role Title */}
                    <h4 className="text-xl sm:text-2xl font-bold font-sans text-white mb-6">
                      {exp.role}
                    </h4>
                  </div>

                  {/* Meta details list */}
                  <div className="space-y-3 font-mono text-xs text-neutral-400">
                    <div className="flex items-center gap-3">
                      <Calendar size={15} style={{ color: exp.badgeColor }} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={15} className="text-[#00E5FF]" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase size={15} className="text-neutral-400" />
                      <span>{exp.domain}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Responsibilities & Impact (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="block text-[11px] font-mono font-bold tracking-widest text-neutral-400 uppercase mb-3">
                      RESPONSIBILITIES & ENGINEERING IMPACT
                    </span>

                    <p className="text-sm md:text-base text-neutral-300 font-sans leading-relaxed mb-6">
                      {exp.overview}
                    </p>

                    {/* Key Impact Bullets */}
                    <div className="space-y-3.5 mb-8">
                      {exp.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2
                            size={18}
                            className="shrink-0 mt-0.5"
                            style={{ color: exp.badgeColor }}
                          />
                          <span className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies & Methodologies Pills */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="block text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase mb-3">
                      TECHNOLOGIES & TOOLS USED
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => {
                        const icon = renderTechIcon(t, 14);
                        return (
                          <span
                            key={t}
                            onMouseEnter={playHoverSound}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#180508]/80 border border-[#4A1018]/40 text-xs font-mono text-neutral-200 hover:text-white hover:border-[#7A1926]/70 hover:bg-[#25080D] transition-all cursor-default shadow-sm group/pill"
                          >
                            {icon && (
                              <span className="shrink-0 flex items-center justify-center transition-transform group-hover/pill:scale-110">
                                {icon}
                              </span>
                            )}
                            <span>{t}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
