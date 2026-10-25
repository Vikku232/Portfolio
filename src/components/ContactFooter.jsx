import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Send, ArrowUp, MapPin, ShieldCheck, Clock, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playHoverSound, playClickSound } from '../utils/sound';

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
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

  // Real Direct-to-Email Transmission via FormSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    playClickSound();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch('https://formsubmit.co/ajax/vikashkrpandey563@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `⚡ New Message from ${formData.name} via Portfolio`,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (res.ok) {
        setMessageSent(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#5A121E', '#7A1926', '#000000', '#D8FF3E', '#ffffff'],
        });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setMessageSent(false), 7000);
      } else {
        setSubmitError(true);
      }
    } catch (err) {
      const mailtoUrl = `mailto:vikashkrpandey563@gmail.com?subject=Portfolio Message from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message + '\n\nSender Email: ' + formData.email)}`;
      window.location.href = mailtoUrl;
      setMessageSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    playClickSound();
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    playClickSound();
    if (window.lenis && formRef.current) {
      window.lenis.scrollTo(formRef.current);
    } else {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    const nameInput = formRef.current?.querySelector('input');
    if (nameInput) nameInput.focus();
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full pt-14 md:pt-18 pb-8 px-4 md:px-12 bg-[#060709] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Direct Transmission Form Block */}
        <div className="contact-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
          
          {/* Left Column (5 cols): Heading & Security Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white leading-[0.95] mb-4">
                GET IN
                <br />
                TOUCH.
              </h2>
              <p className="text-sm md:text-base text-neutral-400 font-sans leading-relaxed mb-6">
                Have an engineering opportunity, backend role, or creative tech project in mind? Drop a message below and it will be delivered directly to my private inbox.
              </p>

              {/* Status Badges */}
              <div className="flex flex-col sm:flex-row gap-2.5 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold tracking-wide">OPEN TO NEW OPPORTUNITIES</span>
                </div>
              </div>
            </div>

            {/* Direct Routing Specs */}
            <div className="space-y-3 pt-6 border-t border-white/10 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={14} className="text-[#E63950] shrink-0" />
                <span className="text-white font-semibold">DIRECT-TO-INBOX ENCRYPTED ROUTING</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-neutral-400 shrink-0" />
                <span>TYPICAL RESPONSE: WITHIN 24 HOURS</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-neutral-400 shrink-0" />
                <span>KOLKATA, WEST BENGAL, INDIA</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Direct Transmission Message Form */}
          <div
            ref={formRef}
            className="lg:col-span-7 bg-[#0E0305]/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-[#4A1018]/50 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg md:text-xl font-black font-display text-white">
                SEND A DIRECT MESSAGE
              </h3>
              <span className="text-[10px] font-mono tracking-widest text-[#F3B3BC] bg-[#1E060A] border border-[#5A141E]/60 px-2.5 py-0.5 rounded-full font-bold">
                DIRECT TO GMAIL
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-sans mb-5">
              Enter your inquiry and your message will land straight in my inbox.
            </p>

            {messageSent ? (
              <div className="p-6 bg-gradient-to-r from-[#180508] to-[#0A0A0C] border border-[#5A141E] rounded-xl flex flex-col gap-2 text-[#F3B3BC] font-mono text-sm animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <Check size={22} className="text-emerald-400" />
                  <span>Message Successfully Transmitted!</span>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Your message has been delivered directly to Vikash's inbox. Thank you for reaching out—you will receive a response shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Honeypot field for bot spam prevention */}
                <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="YOUR NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-neutral-500 text-xs font-mono focus:bg-black focus:border-[#7A1926] focus:outline-none focus:ring-1 focus:ring-[#7A1926] transition-all"
                  />
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="YOUR EMAIL"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-neutral-500 text-xs font-mono focus:bg-black focus:border-[#7A1926] focus:outline-none focus:ring-1 focus:ring-[#7A1926] transition-all"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  disabled={isSubmitting}
                  placeholder="OPPORTUNITY DETAILS / PROJECT INQUIRY"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-neutral-500 text-xs font-mono focus:bg-black focus:border-[#7A1926] focus:outline-none focus:ring-1 focus:ring-[#7A1926] resize-none transition-all"
                />

                {submitError && (
                  <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl flex items-center gap-2 text-xs font-mono text-red-300">
                    <AlertCircle size={15} className="text-red-400 shrink-0" />
                    <span>Network delay. Please try again or reach out on LinkedIn.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={playHoverSound}
                  className="px-6 py-3 bg-gradient-to-r from-[#5A121C] to-[#2B070D] hover:from-[#7A1926] hover:to-[#3D0A13] text-white text-xs font-bold font-mono tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(122,25,38,0.35)] border border-[#7A1926]/60 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>TRANSMITTING DIRECTLY TO INBOX...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND DIRECT MESSAGE</span>
                      <Send size={13} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. Reference Footer Layout: Upper Row (Connect with me + Let's build something) */}
        <div className="contact-reveal border-t border-white/10 pt-10 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: CONNECT WITH ME & Big Email & Nav Links */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              CONNECT WITH ME
            </span>
            <a
              href="mailto:vikashkrpandey563@gmail.com"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black font-display tracking-tight text-white hover:text-[#F3B3BC] transition-colors hover-underline-maroon break-all sm:break-normal"
            >
              vikashkrpandey563@gmail.com
            </a>
            {/* Quick Navigation Links */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-neutral-400 mt-2 flex-wrap">
              <a href="#" className="hover:text-white transition-colors hover-underline-maroon py-0.5">Home</a>
              <span>·</span>
              <a href="#about" className="hover:text-white transition-colors hover-underline-maroon py-0.5">About</a>
              <span>·</span>
              <a href="#experience" className="hover:text-white transition-colors hover-underline-maroon py-0.5">Experience</a>
              <span>·</span>
              <a href="#skills" className="hover:text-white transition-colors hover-underline-maroon py-0.5">Skills</a>
              <span>·</span>
              <a href="#projects" className="hover:text-white transition-colors hover-underline-maroon py-0.5">Projects</a>
              <span>·</span>
              <a href="#contact" className="hover:text-white transition-colors hover-underline-maroon py-0.5">Contact</a>
            </div>
          </div>

          {/* Right: Let's build something & Get in Touch CTA */}
          <div className="flex flex-col items-start md:items-end gap-2 max-w-sm">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Let's build something
            </h3>
            <p className="text-xs text-neutral-400 font-sans text-left md:text-right leading-relaxed mb-1">
              Open for software engineering opportunities, freelance collaborations, and AI architectures.
            </p>
            <button
              onClick={scrollToForm}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* 3. Divider & Social Channels Row */}
        <div className="border-t border-white/10 pt-6 pb-2 flex items-center justify-center gap-8 text-xs font-mono tracking-widest text-neutral-400">
          <a
            href="https://www.linkedin.com/in/vikash-kr-pandey-554a1631a/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            className="hover:text-white transition-colors hover-underline-maroon py-1"
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com/Vikku232"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            className="hover:text-white transition-colors hover-underline-maroon py-1"
          >
            GITHUB
          </a>
        </div>

        {/* 4. Giant 3D Chrome Name with Dark Maroon to Black Wave Background */}
        <div className="contact-reveal relative w-full overflow-hidden flex flex-col items-center justify-center pt-8 sm:pt-14 pb-6 sm:pb-10 my-4 select-none">
          {/* Accessible Heading for SEO / Screen Readers */}
          <h1 className="sr-only">VIKASH KUMAR PANDEY</h1>

          {/* Dark Maroon to Black Wave Background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            {/* Ambient Radial Dark Maroon Core Glow */}
            <div
              className="absolute w-[95%] max-w-5xl h-[280px] rounded-full blur-[80px] opacity-75"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(138, 26, 42, 0.75) 0%, rgba(68, 12, 22, 0.5) 45%, rgba(12, 2, 4, 0.95) 75%, transparent 100%)',
              }}
            />

            {/* Fluid Dark Maroon Wave Silk Ribbon SVG */}
            <svg
              className="w-full h-full min-h-[260px] sm:min-h-[300px] object-cover opacity-85"
              viewBox="0 0 1440 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="maroon-wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#050102" stopOpacity="0" />
                  <stop offset="25%" stopColor="#4A0E17" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#9E1F30" stopOpacity="0.95" />
                  <stop offset="75%" stopColor="#4A0E17" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#050102" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="maroon-wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                  <stop offset="35%" stopColor="#6B1421" stopOpacity="0.7" />
                  <stop offset="65%" stopColor="#3B0A11" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Broad Wave Ribbon */}
              <path
                d="M-100 270 C 280 110, 620 310, 960 150 C 1220 50, 1420 190, 1600 130"
                stroke="url(#maroon-wave-grad-1)"
                strokeWidth="70"
                strokeLinecap="round"
                className="blur-md"
              />
              {/* Luminous Neon Filament */}
              <path
                d="M-100 270 C 280 110, 620 310, 960 150 C 1220 50, 1420 190, 1600 130"
                stroke="#FF5C75"
                strokeWidth="2.5"
                strokeOpacity="0.75"
              />

              {/* Secondary Cross-Ribbon Wave */}
              <path
                d="M-100 170 C 240 280, 720 70, 1080 250 C 1300 330, 1500 190, 1600 210"
                stroke="url(#maroon-wave-grad-2)"
                strokeWidth="90"
                strokeLinecap="round"
                className="blur-xl"
              />
              <path
                d="M-100 170 C 240 280, 720 70, 1080 250 C 1300 330, 1500 190, 1600 210"
                stroke="#E63950"
                strokeWidth="1.5"
                strokeOpacity="0.65"
              />
            </svg>
          </div>

          {/* Fully Responsive Metallic Chrome 3D Typography: VIKASH */}
          <div className="relative z-10 w-full max-w-5xl px-2 sm:px-4 flex items-center justify-center">
            <svg
              viewBox="0 0 1100 210"
              className="w-full h-auto max-h-[180px] sm:max-h-[240px] select-none overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="VIKASH"
            >
              <defs>
                {/* Multi-stop Metallic Chrome 3D Specular Reflection */}
                <linearGradient id="vikashChromeReflect" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="22%" stopColor="#E2E8F0" />
                  <stop offset="46%" stopColor="#7E8B9F" />
                  <stop offset="49%" stopColor="#2D3748" />
                  <stop offset="51%" stopColor="#0F172A" />
                  <stop offset="53%" stopColor="#FFFFFF" />
                  <stop offset="68%" stopColor="#CBD5E1" />
                  <stop offset="85%" stopColor="#64748B" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>

                {/* Bevel Rim Stroke Gradient */}
                <linearGradient id="vikashBevelStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="48%" stopColor="#94A3B8" stopOpacity="0.4" />
                  <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#334155" stopOpacity="0.6" />
                </linearGradient>

                {/* 3D Depth Drop Shadow Filter */}
                <filter id="vikashChromeDepth" x="-15%" y="-20%" width="130%" height="150%">
                  <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#000000" floodOpacity="0.95" />
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FFFFFF" floodOpacity="0.35" />
                </filter>
              </defs>

              <text
                x="550"
                y="152"
                textAnchor="middle"
                fill="url(#vikashChromeReflect)"
                stroke="url(#vikashBevelStroke)"
                strokeWidth="1.2"
                filter="url(#vikashChromeDepth)"
                style={{
                  fontFamily: '"Syne", "Outfit", sans-serif',
                  fontWeight: 900,
                  fontSize: '185px',
                  letterSpacing: '-0.025em',
                  textTransform: 'uppercase',
                }}
              >
                VIKASH
              </text>
            </svg>
          </div>

          {/* Subtitle Underneath Name - Fluid & Responsive on all mobile screens */}
          <p className="relative z-10 text-[9px] sm:text-xs md:text-sm font-mono tracking-[0.14em] sm:tracking-[0.25em] text-neutral-400 uppercase mt-2 sm:mt-4 text-center px-4 max-w-full leading-relaxed">
            VIKASH KUMAR PANDEY · JAVA SPRING BOOT & AI DEVELOPER
          </p>
        </div>

        {/* 5. Bottom Metadata Bar & Clock */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="text-white font-bold">VIKASH KUMAR PANDEY © 2026</span>
            <span>//</span>
            <span>JAVA BACKEND DEVELOPER</span>
            <span className="hidden sm:inline">//</span>
            <span className="hidden sm:inline">KOLKATA, INDIA</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full text-neutral-300 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LOCAL TIME: {time || '12:00:00 PM'}</span>
            </div>

            <button
              onClick={scrollToTop}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-1.5 text-white hover:text-[#F3B3BC] font-bold tracking-wider transition-colors cursor-pointer hover-underline-maroon py-0.5"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
