import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/sound';
import { renderTechIcon } from './TechIcons';

export default function ProjectModal({ project, onClose }) {
  const detailsRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Disable body scroll and pause Lenis smooth scroll so it does not hijack inner wheel events
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (window.lenis) {
      window.lenis.stop();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow || 'unset';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [onClose]);

  if (!project) return null;

  const handleImageWheel = (e) => {
    if (detailsRef.current) {
      detailsRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[94vh] md:max-h-[88vh] bg-[#0E1015] text-white rounded-2xl md:rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden modal-scroll"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Close Button - Always pinned in top right */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all backdrop-blur border border-white/20 cursor-pointer shadow-xl hover:scale-105 active:scale-95"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Media Preview Column */}
        <div
          onWheel={handleImageWheel}
          className="w-full md:w-1/2 bg-neutral-950 flex items-center justify-center overflow-hidden h-48 sm:h-64 md:h-auto md:min-h-full relative shrink-0 select-none"
        >
          {/* Subtle blurred ambient backdrop of the screenshot */}
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125"
          />
          {/* Main screenshot */}
          <img
            src={project.image}
            alt={project.title}
            className="relative z-10 w-full h-full object-cover object-top md:object-contain scale-100 hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-black/80 backdrop-blur px-2.5 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-mono text-neutral-200 border border-white/15 shadow-md">
            {project.badge || 'SELECTED WORK'}
          </div>
        </div>

        {/* Details Column - Natural layout on mobile, independent scroll on desktop */}
        <div
          ref={detailsRef}
          data-lenis-prevent
          className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between md:overflow-y-auto md:max-h-[88vh] modal-scroll"
          style={{
            overscrollBehavior: 'contain',
          }}
        >
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-amber-400 mb-1.5 sm:mb-2">
              <Sparkles size={13} className="shrink-0" />
              <span>{project.category || 'CREATIVE DIRECTION'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white mb-2 sm:mb-3 leading-tight">
              {project.title}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed mb-4 sm:mb-6 font-sans">
              {project.description ||
                'A multi-disciplinary exploration combining 3D spatial computing, tactile visual language, and interactive storytelling.'}
            </p>

            {/* Spec metadata */}
            <div className="space-y-2.5 sm:space-y-3 border-y border-white/10 py-3 sm:py-4 mb-4 sm:mb-6 text-[11px] sm:text-xs font-mono">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-neutral-500">CLIENT / COLLABORATOR:</span>
                <span className="text-neutral-200 font-semibold">{project.client || 'GLOBAL BRAND'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">TIMELINE:</span>
                <span className="text-neutral-200 font-semibold">{project.year || '2026'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-neutral-500 shrink-0">DELIVERABLES:</span>
                <span className="text-neutral-200 font-semibold text-right sm:text-right">{project.deliverables || 'Full-Stack Architecture, REST APIs'}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
              {(project.tags || ['Three.js', 'GSAP', 'WebGL', 'Tailwind']).map((t) => {
                const icon = renderTechIcon(t, 12);
                return (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-neutral-300"
                  >
                    {icon && <span className="shrink-0">{icon}</span>}
                    <span>{t}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Action Footer - Responsive flex layout */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4 border-t border-white/10 mt-3 sm:mt-auto">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-[#6B111E] to-[#1C0407] hover:from-[#8A1A2A] hover:to-[#2B070D] text-white font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all font-mono shadow-[0_0_20px_rgba(107,17,30,0.45)] border border-[#7A1926]/50 cursor-pointer active:scale-95 text-center"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>OPEN LIVE DEMO</span>
                <ExternalLink size={14} className="shrink-0" />
              </a>
            )}
            <button
              onClick={() => {
                playClickSound();
                window.open(project.github || 'https://github.com/Vikku232', '_blank');
              }}
              className="w-full sm:flex-1 py-3 px-4 bg-white text-black font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors font-mono cursor-pointer active:scale-95 text-center"
            >
              <span>VIEW GITHUB REPO</span>
              <ExternalLink size={14} className="shrink-0" />
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-full sm:w-auto py-3 px-5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs tracking-wider rounded-xl transition-colors cursor-pointer font-mono active:scale-95 text-center"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
