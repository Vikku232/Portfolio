import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Mail, Download, CheckCircle2, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { toggleSound, playClickSound, playHoverSound } from '../utils/sound';

export default function Navbar({ onOpenContact }) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [resumeAlert, setResumeAlert] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const alertTimerRef = useRef(null);

  // Clean up alert timer on unmount
  useEffect(() => {
    return () => {
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    };
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showConfirmModal) {
        setShowConfirmModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirmModal]);

  // Step 1: Open Confirmation Popup
  const requestResumeDownload = () => {
    playClickSound();
    setShowConfirmModal(true);
  };

  // Step 2: User Confirms "Yes" -> Download PDF and show on-screen alert
  const confirmDownloadResume = () => {
    playClickSound();
    setShowConfirmModal(false);

    // Trigger PDF download
    const link = document.createElement('a');
    link.href = '/Vikash_Kumar_Resume.pdf';
    link.download = 'Vikash_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Trigger sleek on-screen alert banner with auto-dismiss
    setResumeAlert(true);
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => {
      setResumeAlert(false);
    }, 4500);
  };

  // Step 3: User clicks "No, Cancel" or closes popup
  const cancelDownloadResume = () => {
    playClickSound();
    setShowConfirmModal(false);
  };

  // Monitor scroll depth and dynamically detect background theme underneath header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Dark sections in the portfolio (All sections except Hero)
      const darkSectionIds = ['about', 'experience', 'skills', 'projects', 'education', 'contact'];
      let inDark = false;

      for (const id of darkSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Header sits at y: 0 to ~70px
          if (rect.top <= 70 && rect.bottom >= 25) {
            inDark = true;
            break;
          }
        }
      }
      setIsDarkBg(inDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = toggleSound();
    setIsMuted(!active);
    if (active) playClickSound();
  };

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EDUCATION', href: '#education' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3.5 sm:py-4 transition-all duration-300 ${
        isScrolled
          ? isDarkBg
            ? 'bg-[#120306]/85 backdrop-blur-xl border-b border-[#4A1018]/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'bg-[#F5F5F7]/85 backdrop-blur-xl border-b border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            playClickSound();
            if (window.lenis) {
              window.lenis.scrollTo(0);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onMouseEnter={playHoverSound}
          className="group flex items-center gap-3 tracking-tight cursor-pointer shrink-0"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 group-hover:scale-105 ${
              isDarkBg
                ? 'bg-gradient-to-br from-[#4A1018] to-[#1A0407] text-white border border-[#7A1926]/50 shadow-[0_0_12px_rgba(122,25,38,0.4)]'
                : 'bg-black text-white'
            }`}
          >
            VP
          </div>
          <div className="flex flex-col">
            <span
              className={`font-extrabold text-sm tracking-wider font-display transition-colors duration-300 ${
                isDarkBg ? 'text-white' : 'text-neutral-900'
              }`}
            >
              VIKASH KUMAR PANDEY
            </span>
            <span
              className={`text-[10px] tracking-widest font-mono transition-colors duration-300 ${
                isDarkBg ? 'text-[#F3B3BC] font-semibold' : 'text-neutral-500'
              }`}
            >
              Backend Developer
            </span>
          </div>
        </a>

        {/* Center Desktop/Tablet Navigation Pill */}
        <nav
          className={`hidden md:flex items-center gap-0.5 p-1 rounded-full transition-all duration-300 ${
            isDarkBg
              ? 'bg-[#180508]/90 backdrop-blur-md border border-[#4A1018]/45 shadow-lg'
              : 'bg-white/80 backdrop-blur-md border border-black/10 shadow-sm'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={playHoverSound}
              onClick={(e) => {
                e.preventDefault();
                playClickSound();
                if (window.lenis) {
                  window.lenis.scrollTo(link.href);
                } else {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-3 xl:px-3.5 py-1.5 text-[11px] xl:text-xs font-semibold rounded-full transition-all duration-200 tracking-wider font-mono cursor-pointer ${
                isDarkBg
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-neutral-700 hover:text-black hover:bg-black/5'
              }`}
            >
              <span className="hover-underline-maroon">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Action Icons & Socials */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Social Links Group */}
          <div className="flex items-center gap-1.5">
            {/* GitHub link */}
            <a
              href="https://github.com/Vikku232"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              aria-label="GitHub Profile"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                isDarkBg
                  ? 'bg-[#180508]/90 backdrop-blur border border-[#4A1018]/45 text-neutral-200 hover:text-white hover:bg-[#25080E]'
                  : 'bg-white/80 backdrop-blur border border-black/10 text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
            >
              <GithubIcon size={15} />
            </a>

            {/* LinkedIn link */}
            <a
              href="https://www.linkedin.com/in/vikash-kr-pandey-554a1631a/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              aria-label="LinkedIn Profile"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                isDarkBg
                  ? 'bg-[#180508]/90 backdrop-blur border border-[#4A1018]/45 text-neutral-200 hover:text-[#38BDF8] hover:bg-[#25080E]'
                  : 'bg-white/80 backdrop-blur border border-black/10 text-neutral-700 hover:text-[#0A66C2] hover:bg-neutral-100'
              }`}
            >
              <LinkedinIcon size={15} />
            </a>
          </div>

          {/* Subtle Vertical Divider */}
          <div
            className={`hidden sm:block w-[1px] h-4 mx-0.5 ${
              isDarkBg ? 'bg-[#5A141E]/50' : 'bg-neutral-300'
            }`}
          />

          {/* Action Buttons Group */}
          <div className="flex items-center gap-2">
            {/* Download Resume Button */}
            <button
              onClick={requestResumeDownload}
              onMouseEnter={playHoverSound}
              title="Download Official Resume (PDF)"
              className={`h-9 inline-flex items-center gap-1.5 px-3.5 rounded-full text-xs font-semibold tracking-wider transition-all font-mono cursor-pointer border select-none ${
                isDarkBg
                  ? 'bg-gradient-to-r from-[#320810] to-[#180508] hover:from-[#5A121E] hover:to-[#2A080E] text-[#F3B3BC] hover:text-white border-[#5A141E]/80 hover:border-[#7A1926] shadow-[0_0_15px_rgba(122,25,38,0.35)] hover:scale-105'
                  : 'bg-white hover:bg-neutral-50 text-neutral-800 hover:text-black border-neutral-300 hover:border-black shadow-sm hover:scale-105'
              }`}
            >
              <Download size={13} className="shrink-0 text-[#E6B0B8]" />
              <span className="hidden sm:inline">RESUME</span>
              <span className="sm:hidden">CV</span>
            </button>

            {/* Contact / Hire CTA Button */}
            <button
              onClick={() => {
                playClickSound();
                if (onOpenContact) onOpenContact();
                else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onMouseEnter={playHoverSound}
              className={`h-9 hidden sm:inline-flex items-center gap-1.5 px-4 rounded-full text-xs font-semibold tracking-wider transition-all font-mono select-none ${
                isDarkBg
                  ? 'bg-gradient-to-r from-[#4A1018] to-[#200408] hover:from-[#6A1824] text-white border border-[#7A1926]/50 shadow-[0_0_15px_rgba(122,25,38,0.35)]'
                  : 'bg-black text-white hover:bg-neutral-800 shadow'
              }`}
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`md:hidden p-2 transition-colors ${isDarkBg ? 'text-white' : 'text-black'}`}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mt-3 mx-auto max-w-sm rounded-2xl p-6 border shadow-2xl flex flex-col gap-4 animate-fadeIn ${
            isDarkBg
              ? 'bg-[#12151D]/95 backdrop-blur-xl border-white/15 text-white'
              : 'bg-white/95 backdrop-blur-xl border-neutral-200 text-neutral-800'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                playClickSound();
                setMobileMenuOpen(false);
                if (window.lenis) {
                  window.lenis.scrollTo(link.href);
                } else {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`text-sm font-bold py-1 tracking-wider font-mono cursor-pointer ${
                isDarkBg ? 'text-neutral-200 hover:text-white' : 'text-neutral-800 hover:text-black'
              }`}
            >
              <span className="hover-underline-maroon">{link.label}</span>
            </a>
          ))}

          {/* Mobile Download Resume Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              requestResumeDownload();
            }}
            className={`w-full py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-2 font-mono cursor-pointer border ${
              isDarkBg
                ? 'bg-[#25080E] text-[#F3B3BC] border-[#5A141E] hover:bg-[#380A12] shadow-[0_0_15px_rgba(122,25,38,0.3)]'
                : 'bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200'
            }`}
          >
            <Download size={14} className="text-[#E6B0B8]" />
            <span>DOWNLOAD RESUME</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(false);
              if (window.lenis) {
                window.lenis.scrollTo('#contact');
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`w-full py-2.5 text-xs font-bold rounded-lg mt-1 flex items-center justify-center gap-2 font-mono cursor-pointer ${
              isDarkBg ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      )}

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

      {/* On-Screen Resume Downloaded Alert Banner */}
      {resumeAlert && (
        <div
          role="alert"
          className="fixed top-20 right-4 sm:right-8 z-[100] max-w-sm w-[calc(100%-2rem)] bg-gradient-to-r from-[#20050A]/95 via-[#140306]/95 to-[#0A0A0C]/95 backdrop-blur-xl border-2 border-[#7A1926] shadow-[0_12px_40px_rgba(122,25,38,0.7)] rounded-2xl p-4 text-white flex items-start gap-3 transition-all duration-300 animate-fadeIn"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-950/90 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-mono font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>RESUME DOWNLOADED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </h4>
              <button
                onClick={() => setResumeAlert(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-0.5"
                aria-label="Close notification"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-[11px] text-neutral-300 mt-1 font-sans leading-relaxed">
              <span className="font-semibold text-white font-mono">Vikash_Kumar_Resume.pdf</span> has been downloaded successfully to your device.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
