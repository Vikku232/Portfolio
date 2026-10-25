import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const stageRef = useRef(null);
  const sideFaceRef = useRef(null);
  const frontFaceRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial entrance animation on load
      const enterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      enterTl
        .fromTo(
          textLeftRef.current,
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 }
        )
        .fromTo(
          stageRef.current,
          { scale: 0.88, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.1)' },
          '-=0.8'
        );

      // 2. PINNED ScrollTrigger:
      // Smooth natural rotation that unpins effortlessly into AboutMe
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=650', // Smooth comfortable distance: rotates and glides directly into next section
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Step 1: Side silhouette rotates away in 3D (0 to 0.45 of timeline)
      scrollTl.to(
        sideFaceRef.current,
        {
          rotateY: 65,
          rotateX: -4,
          x: 45,
          opacity: 0,
          scale: 0.95,
          ease: 'power1.inOut',
          duration: 0.45,
        },
        0
      );

      // Step 2: Front face rotates in to face directly forward (0.15 to 0.55 of timeline)
      scrollTl.fromTo(
        frontFaceRef.current,
        {
          rotateY: -65,
          rotateX: 4,
          x: -45,
          opacity: 0,
          scale: 0.95,
        },
        {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power1.inOut',
          duration: 0.4,
        },
        0.15
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Subtle 3D mouse parallax on the stage
  const handleMouseMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to(el, {
      rotateY: x * 8,
      rotateX: -y * 6,
      duration: 0.4,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(stageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full flex items-end justify-center overflow-hidden bg-[#F5F5F7] px-4 md:px-12 select-none"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F0F0F3 100%)',
      }}
    >
      {/* Background Big Crisp Solid Black Typography: VIKASH */}
      <div className="absolute inset-0 flex items-center justify-center w-full px-4 sm:px-8 z-0 pointer-events-none select-none">
        <h1
          ref={textLeftRef}
          className="font-black text-black font-display leading-none select-none text-center whitespace-nowrap"
          style={{
            fontSize: 'clamp(70px, 15vw, 240px)',
            letterSpacing: '-0.045em',
          }}
        >
          VIKASH
        </h1>
      </div>

      {/* Center 3D Silhouette Head Container - Anchored to bottom like reference video */}
      <div
        ref={stageRef}
        className="relative z-10 flex items-end justify-center w-full max-w-[620px] h-full max-h-[92vh] pb-0"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 1. Side Silhouette (Visible initially, looking up/side) */}
        <div
          ref={sideFaceRef}
          className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <img
            src="/assets/hero_silhouette.png"
            alt="Vikash Kumar Pandey - Profile Silhouette"
            className="h-[76vh] max-h-[660px] w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            style={{
              filter: 'contrast(115%) brightness(95%) drop-shadow(0 25px 50px rgba(0,0,0,0.22))',
            }}
          />
        </div>

        {/* 2. Front Face Silhouette (Turns forward as user scrolls down!) */}
        <div
          ref={frontFaceRef}
          className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none opacity-0"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <img
            src="/assets/hero_front_silhouette.png"
            alt="Vikash Kumar Pandey - Front Facing Silhouette"
            className="h-[76vh] max-h-[660px] w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            style={{
              filter: 'contrast(115%) brightness(95%) drop-shadow(0 25px 50px rgba(0,0,0,0.22))',
            }}
          />
        </div>
      </div>
    </section>
  );
}
