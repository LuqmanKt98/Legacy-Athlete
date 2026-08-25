
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import PreseasonCountdown from './PreseasonCountdown';
import { PRESEASON_DATES, PRESEASON_START } from '../constants';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ballContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.set(headlineRef.current, { y: 120, opacity: 0, filter: 'blur(30px)' });
    gsap.set(ctaRef.current, { y: 60, opacity: 0 });
    // Rests at 1.06 rather than 1 so the mouse-parallax drift below never
    // exposes an edge of the full-bleed image.
    gsap.set(ballContainerRef.current, { scale: 1.18, opacity: 0 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.4 });

    tl.to(ballContainerRef.current, {
      scale: 1.06,
      opacity: 1,
      duration: 3,
      ease: "expo.out"
    })
    .to(glowRef.current, {
      opacity: 1,
      scale: 1,
      duration: 2.5,
    }, "-=2.5")
    .to(headlineRef.current, { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)', 
      duration: 2 
    }, "-=1.8")
    .to(ctaRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 1.5 
    }, "-=1.2");

    // Scroll-linked Deep Zoom Effect
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Slow push-in as the hero exits. The old 7x zoom was tuned for a
        // circular crop; a full-bleed photo only needs a subtle drift.
        gsap.set(ballContainerRef.current, {
          scale: 1.06 + (progress * 0.5),
          opacity: 1 - (progress * 1.3),
          y: progress * 120
        });
        
        // Glow expansion
        gsap.set(glowRef.current, {
          scale: 1 + (progress * 4),
          opacity: 1 - (progress * 1.2)
        });

        // Parallax and fade for text
        gsap.set(headlineRef.current, {
          y: progress * -350,
          opacity: 1 - (progress * 2),
          scale: 1 + (progress * 0.1)
        });
        
        gsap.set(ctaRef.current, {
          y: progress * -250,
          opacity: 1 - (progress * 2.5)
        });
      }
    });

    // Mouse movement interaction
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(ballContainerRef.current, {
        x: xPos,
        y: yPos,
        duration: 3,
        ease: "power2.out"
      });
      
      gsap.to(glowRef.current, {
        x: xPos * 1.2,
        y: yPos * 1.2,
        duration: 4,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Background Glow Layer */}
      <div 
        ref={glowRef}
        className="absolute w-[100vh] h-[100vh] rounded-full blur-[180px] pointer-events-none z-0 opacity-80"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 0, 0.25) 0%, transparent 70%)'
        }}
      />

      {/* Main Visual: full-bleed team poster */}
      <div
        ref={ballContainerRef}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <img
          src="/images/hero-legacy.jpg"
          alt="Legacy athletes training"
          /* LCP image — load eagerly rather than lazily. */
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />

        {/* Darkest through the centre, where the headline sits and where the
            poster carries its own LEGACY wordmark. Keeps the athletes at the
            edges readable without two competing wordmarks stacked up. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 60% at 50% 45%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.66) 45%, rgba(0,0,0,0.45) 100%)'
          }}
        />

        {/* Blends the photo into the black page above and below. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Content Overlay — offset below the fixed header (utility bar + nav)
          rather than inset-0, so the eyebrow never sits underneath it. */}
      <div className="absolute inset-x-0 top-[9.5rem] bottom-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        {/* Hero now promotes the 8-Week Preseason Challenge, per the client's
            2026-08-25 brief ("basically need to change the hero section to promote
            8 week challenge"). Copy matches the mockup he supplied.
            NOTE: this is seasonal — after the Sept 14 cohort starts, the countdown
            self-hides, but the headline itself should be revisited once the
            campaign ends. */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {['Ages 11–18', 'Beginners Through Advanced', PRESEASON_DATES].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center border border-orange-500/30 bg-orange-600/10 px-3.5 py-1.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-orange-400 font-bold"
            >
              {badge}
            </span>
          ))}
        </div>

        <h1
          ref={headlineRef}
          className="font-athletic text-5xl md:text-[7rem] leading-[0.9] text-white mb-6"
        >
          8-WEEK PRESEASON <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text">CHALLENGE</span>
        </h1>

        <div ref={ctaRef} className="flex flex-col items-center max-w-4xl">
          <p className="text-white text-base md:text-2xl font-athletic mb-5 uppercase">
            Don't wait for tryouts to get ready.
          </p>

          <p className="text-stone-400 text-xs md:text-base leading-relaxed mb-10 max-w-2xl">
            Build the skills, athleticism, confidence and game-readiness your athlete needs before
            the new season starts.
          </p>

          <PreseasonCountdown target={PRESEASON_START} className="mb-10" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <MagneticButton
              className="w-full sm:w-auto !px-12 !py-5 text-lg !bg-orange-600 !text-white hover:!bg-orange-500 shadow-[0_0_60px_rgba(234,88,12,0.25)]"
              onClick={() => document.getElementById('preseason')?.scrollIntoView({ behavior: 'smooth' })}
            >
              JOIN THE CHALLENGE
            </MagneticButton>

            <MagneticButton
              type="secondary"
              className="w-full sm:w-auto !px-12 !py-5 text-lg"
              onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
            >
              BOOK FREE ASSESSMENT
            </MagneticButton>
          </div>

          <p className="text-stone-600 text-[9px] md:text-[10px] uppercase tracking-[0.25em] mt-8">
            Cohort begins Sept 14 · 8-Week Preseason Bundle
          </p>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center opacity-40 pointer-events-none">
        <div className="w-px h-28 bg-gradient-to-b from-orange-600 via-orange-500/30 to-transparent"></div>
        <span className="text-[8px] tracking-[1.2em] text-stone-800 uppercase mt-8 ml-3">Start Now</span>
      </div>
    </section>
  );
};

export default Hero;
