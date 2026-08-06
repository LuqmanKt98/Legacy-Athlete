import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Zap, Shield, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Aggregate cohort-level figures — NOT attributed to any named individual athlete.
// Per client brief (2026-07-28): shown as illustrative "proof of concept" data.
// If real per-athlete testimonials/before-after stories are wanted later, that needs
// real subject names and verified numbers from the client before it can be published —
// intentionally not fabricated here.
const cohortMetrics = [
  {
    id: "sprint",
    label: "3/4 Court Sprint Speed",
    start: 7.15,
    end: 6.04,
    unit: "s",
    improvement: "-15.5% speed friction",
    desc: "Timed at regular checkpoints to track explosive acceleration.",
    icon: <Zap className="w-5 h-5 text-orange-500" />
  },
  {
    id: "vertical",
    label: "Vertical Leap Elevation",
    start: 21.0,
    end: 28.5,
    unit: " in",
    improvement: "+35.7% vertical jump",
    desc: "Measured at regular checkpoints to track lower-body power.",
    icon: <Trophy className="w-5 h-5 text-orange-500" />
  },
  {
    id: "lane_agility",
    label: "Lane Agility Timing",
    start: 14.80,
    end: 11.65,
    unit: "s",
    improvement: "-21.2% rapid reaction",
    desc: "Isolating defensive slides, quick backpedals, and hip redirection.",
    icon: <Shield className="w-5 h-5 text-orange-500" />
  },
  {
    id: "broad_jump",
    label: "Broad Jump Distance",
    start: 7.20,
    end: 8.80,
    unit: " ft",
    improvement: "+22.2% horizontal drive",
    desc: "Measures hip extension power and eccentric landing stability.",
    icon: <Sparkles className="w-5 h-5 text-orange-500" />
  }
];

const MeasurableIncreases: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(".mi-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );

      if (prefersReducedMotion) {
        cohortMetrics.forEach((m) => {
          const counterEl = sectionRef.current?.querySelector(`[data-counter="${m.id}"]`);
          const barEl = sectionRef.current?.querySelector(`[data-progress-bar="${m.id}"]`);
          const percentEl = sectionRef.current?.querySelector(`[data-percent-id="${m.id}"]`);
          if (counterEl) counterEl.textContent = m.end.toFixed(m.id === "vertical" || m.id === "broad_jump" ? 1 : 2) + m.unit;
          if (barEl) gsap.set(barEl, { scaleX: 1 });
          if (percentEl) gsap.set(percentEl, { opacity: 1, y: 0 });
        });
      } else {
        cohortMetrics.forEach((m) => {
          const counterEl = sectionRef.current?.querySelector(`[data-counter="${m.id}"]`);
          const barEl = sectionRef.current?.querySelector(`[data-progress-bar="${m.id}"]`);
          const percentEl = sectionRef.current?.querySelector(`[data-percent-id="${m.id}"]`);
          if (!counterEl || !barEl || !percentEl) return;

          gsap.set(barEl, { scaleX: 0, transformOrigin: "left" });
          gsap.set(percentEl, { opacity: 0, y: 12 });

          const countObj = { val: m.start };
          const tl = gsap.timeline({
            scrollTrigger: { trigger: counterEl, start: "top 85%", toggleActions: "play none none reverse" }
          });

          tl.to(countObj, {
            val: m.end,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              const decimals = (m.id === "vertical" || m.id === "broad_jump") ? 1 : 2;
              counterEl.textContent = countObj.val.toFixed(decimals) + m.unit;
            }
          })
          .to(barEl, { scaleX: 1, duration: 1.4, ease: "expo.out" }, "-=1.6")
          .to(percentEl, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="measurable-increases"
      className="py-32 px-8 bg-black relative border-b border-stone-900 scroll-mt-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.03)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="mi-header mb-16 text-center lg:text-left">
          <span className="text-[10px] tracking-[0.4em] text-orange-500 uppercase block mb-4">Our Average Cohort Results</span>
          <h2 className="font-athletic text-4xl md:text-6xl text-white font-black uppercase">Measurable Athletic Improvement</h2>
          <p className="text-stone-500 text-xs md:text-sm uppercase tracking-widest mt-4 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Every vertical lift, 3/4 court sprint speed, and lateral slide are calculated to ensure real player output translation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {cohortMetrics.map((m) => (
            <div key={m.id} className="bg-stone-900/20 border border-stone-850 p-6 md:p-8 rounded-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-600/10 border border-orange-500/20 rounded flex items-center justify-center">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-xs md:text-sm uppercase tracking-widest font-bold">{m.label}</h4>
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">{m.desc}</p>
                  </div>
                </div>
                <span
                  data-counter={m.id}
                  className="font-athletic text-3xl md:text-5xl text-white font-black tracking-tight"
                >
                  {m.start.toFixed(m.id === "vertical" || m.id === "broad_jump" ? 1 : 2)}
                </span>
              </div>

              <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden mb-4 border border-stone-900">
                <div
                  data-progress-bar={m.id}
                  className="h-full bg-gradient-to-r from-orange-600 to-orange-400 scale-x-0 origin-left"
                />
              </div>

              <div data-percent-id={m.id} className="flex items-center justify-between opacity-0 translate-y-3">
                <span className="text-[9px] text-stone-500 uppercase tracking-widest font-semibold">Cohort Progression</span>
                <span className="text-[10px] bg-orange-600/10 border border-orange-500/20 px-3 py-1 text-orange-500 font-bold uppercase tracking-wider rounded-full">
                  {m.improvement}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-stone-900/10 border border-stone-850 p-8 rounded flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 max-w-xl">
            <h4 className="font-athletic text-2xl text-white mb-2 uppercase font-bold">How We Record Athlete Performance</h4>
            <p className="text-stone-400 text-xs uppercase tracking-widest leading-relaxed">
              We measure and time our athletes at regular checkpoints — vertical, sprint, and lane agility — so progress is tracked against their own baseline, not a guess. Results are recorded and shared through the member portal.
            </p>
          </div>
          <button
            onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs font-bold uppercase tracking-widest border border-orange-500 text-orange-500 px-8 py-4 rounded hover:bg-orange-600 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex-shrink-0 cursor-pointer bg-orange-600/5"
          >
            Claim Free Assessment Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default MeasurableIncreases;
