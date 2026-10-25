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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[92vh] md:max-h-[88vh] bg-[#0E1015] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black/95 text-white flex items-center justify-center transition-all backdrop-blur border border-white/15 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Media Preview Column */}
        <div
          onWheel={handleImageWheel}
          className="w-full md:w-1/2 bg-neutral-950 flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[280px] md:min-h-full relative shrink-0 select-none"
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
            className="relative z-10 w-full h-full object-cover object-top md:object-contain scale-100 hover:scale-[1.03] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-neutral-200 border border-white/15 shadow-md">
            {project.badge || 'SELECTED WORK'}
          </div>
        </div>

        {/* Details Column - Scrollable with custom styled scrollbar */}
        <div
          ref={detailsRef}
          data-lenis-prevent
          className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[calc(92vh-220px)] md:max-h-[88vh] modal-scroll"
          style={{
            overscrollBehavior: 'contain',
          }}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
              <Sparkles size={14} />
              <span>{project.category || 'CREATIVE DIRECTION'}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white mb-3">
              {project.title}
            </h2>

            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
              {project.description ||
                'A multi-disciplinary exploration combining 3D spatial computing, tactile visual language, and interactive storytelling.'}
            </p>

            {/* Spec metadata */}
            <div className="space-y-3 border-y border-white/10 py-4 mb-6 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500">CLIENT / COLLABORATOR:</span>
                <span className="text-neutral-200 font-semibold">{project.client || 'GLOBAL BRAND'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">TIMELINE:</span>
                <span className="text-neutral-200 font-semibold">{project.year || '2026'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">DELIVERABLES:</span>
                <span className="text-neutral-200 font-semibold">{project.deliverables || '3D Motion, WebGL, Identity'}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(project.tags || ['Three.js', 'GSAP', 'WebGL', 'Tailwind']).map((t) => {
                const icon = renderTechIcon(t, 13);
                return (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                  >
                    {icon && <span className="shrink-0">{icon}</span>}
                    <span>{t}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-3 pt-4 flex-wrap">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="flex-1 py-3 px-5 bg-gradient-to-r from-[#6B111E] to-[#1C0407] hover:from-[#8A1A2A] hover:to-[#2B070D] text-white font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all font-mono shadow-[0_0_20px_rgba(107,17,30,0.45)] border border-[#7A1926]/50 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPEN LIVE DEMO</span>
                <ExternalLink size={14} />
              </a>
            )}
            <button
              onClick={() => {
                playClickSound();
                window.open(project.github || 'https://github.com/Vikku232', '_blank');
              }}
              className="flex-1 py-3 px-5 bg-white text-black font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors font-mono cursor-pointer"
            >
              <span>VIEW GITHUB REPO</span>
              <ExternalLink size={14} />
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="py-3 px-5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs tracking-wider rounded-xl transition-colors cursor-pointer font-mono"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
