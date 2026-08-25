import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Calendar, Users, ShieldCheck, ArrowRight, Gift } from 'lucide-react';
import {
  PRESEASON_TIERS,
  PRESEASON_DATES,
  PRESEASON_LEAGUE_PRICE,
  PRESEASON_LEAGUE_REGULAR,
} from '../constants';
import { scrollToSection } from '../lib/scrollToSection';

gsap.registerPlugin(ScrollTrigger);

interface PreseasonBundleProps {
  /** Receives the resolved plan id (with or without the league bundled) and a
   *  human-readable label for the confirmation screen and receipt email. */
  onSelectPlan: (planId: string, eventLabel: string) => void;
}

const IL_TAX_RATE = 0.1025;

const PreseasonBundle: React.FC<PreseasonBundleProps> = ({ onSelectPlan }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState(
    PRESEASON_TIERS.find((t) => t.recommended)?.id ?? PRESEASON_TIERS[0].id
  );
  const [withLeague, setWithLeague] = useState(false);

  const tier = PRESEASON_TIERS.find((t) => t.id === selectedId) ?? PRESEASON_TIERS[0];

  const subtotal = tier.price + (withLeague ? PRESEASON_LEAGUE_PRICE : 0);
  // Shown for transparency only — it's the difference against list prices, not a
  // discount applied at checkout. The server charges `subtotal` + tax.
  const savings =
    tier.wasPrice - tier.price +
    (withLeague ? PRESEASON_LEAGUE_REGULAR - PRESEASON_LEAGUE_PRICE : 0);
  const tax = subtotal * IL_TAX_RATE;
  const total = subtotal + tax;

  // Slide only — never fade from opacity:0. This section is a jump target (the
  // top banner and the Quick Access card both scrollIntoView straight to it),
  // which can land past the ScrollTrigger point and leave a faded element stuck
  // invisible. Animating position only means the worst case is "no animation",
  // never "section disappears".
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { y: 40 },
        { y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );
      if (tiersRef.current) {
        gsap.fromTo(tiersRef.current.querySelectorAll('.tier-card'),
          { y: 24 },
          { y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: tiersRef.current, start: 'top 85%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleEnroll = () => {
    const planId = withLeague ? `${tier.id}-league` : tier.id;
    const label = `8-Week Preseason Bundle (${tier.frequency})${withLeague ? ' + Fall 3v3 Prep League' : ''} — ${PRESEASON_DATES}`;
    onSelectPlan(planId, label);
    scrollToSection('payment');
  };

  const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, '')}`;

  return (
    <section
      id="preseason"
      ref={sectionRef}
      className="py-32 px-8 bg-black relative overflow-hidden border-t border-stone-900 scroll-mt-40"
    >
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full mb-6">
            <Calendar className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.25em]">{PRESEASON_DATES}</span>
          </div>
          <h2 className="font-athletic text-5xl md:text-8xl mb-6 leading-none">
            8-WEEK PRESEASON{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text">BUNDLE</span>
          </h2>
          <p className="text-white text-lg md:text-2xl font-athletic mb-6">DON'T WAIT FOR TRYOUTS TO GET READY.</p>
          <p className="text-stone-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Build the skills, athleticism, confidence, and game-readiness your athlete needs before the new season starts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="inline-flex items-center gap-2 border border-stone-800 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest text-stone-400">
              <Users className="w-3.5 h-3.5 text-orange-500" /> Ages 11–18
            </span>
            <span className="inline-flex items-center gap-2 border border-stone-800 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-500" /> Beginners Through Advanced
            </span>
          </div>
        </div>

        {/* Step 1 — frequency */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <span className="w-7 h-7 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">1</span>
            <div>
              <h3 className="font-athletic text-2xl md:text-3xl text-white uppercase">Choose Training Frequency</h3>
              <p className="text-stone-500 text-xs uppercase tracking-widest mt-1">
                How many times per week your athlete trains across the 8 weeks.
              </p>
            </div>
          </div>

          <div ref={tiersRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PRESEASON_TIERS.map((t) => {
              const active = t.id === selectedId;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  aria-pressed={active}
                  className={`tier-card text-left p-8 rounded-sm border transition-all relative ${
                    active
                      ? 'border-orange-500 bg-orange-600/[0.07]'
                      : 'border-stone-800 hover:border-stone-700 bg-stone-900/20'
                  }`}
                >
                  {t.recommended && (
                    <span className="absolute top-0 right-6 -translate-y-1/2 bg-orange-600 text-white text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${active ? 'border-orange-500 bg-orange-500' : 'border-stone-700'}`}>
                      {active && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
                    </span>
                    <h4 className="font-athletic text-2xl text-white uppercase">{t.frequency}</h4>
                  </div>
                  <p className="text-orange-500 text-xs uppercase tracking-widest mb-5 pl-7">{t.sessions}</p>

                  <div className="flex items-baseline gap-3 mb-1 pl-7">
                    <span className="font-athletic text-4xl text-white">${t.price}</span>
                    <span className="text-stone-600 text-lg line-through">${t.wasPrice}</span>
                  </div>
                  <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-5 pl-7">{t.perSession}</p>

                  <p className="text-stone-400 text-xs leading-relaxed mb-5 pl-7">{t.audience}</p>

                  <ul className="space-y-2.5 border-t border-stone-800 pt-5 pl-7">
                    {t.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[11px] text-stone-400">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 — league add-on */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <span className="w-7 h-7 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">2</span>
            <div>
              <h3 className="font-athletic text-2xl md:text-3xl text-white uppercase">3v3 Fall Prep League Add-On</h3>
              <p className="text-stone-500 text-xs uppercase tracking-widest mt-1">
                Bundle the 6-week Sunday afternoon league at a discounted rate.
              </p>
            </div>
          </div>

          <button
            onClick={() => setWithLeague((v) => !v)}
            aria-pressed={withLeague}
            className={`w-full text-left p-8 rounded-sm border transition-all ${
              withLeague ? 'border-amber-500 bg-amber-500/[0.07]' : 'border-stone-800 hover:border-stone-700 bg-stone-900/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <span className={`w-5 h-5 rounded-sm border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${withLeague ? 'border-amber-500 bg-amber-500' : 'border-stone-700'}`}>
                  {withLeague && <Check className="w-3 h-3 text-black" strokeWidth={4} />}
                </span>
                <div>
                  <h4 className="font-athletic text-xl md:text-2xl text-white uppercase">Fall 3v3 Prep League Registration</h4>
                  <span className="inline-block mt-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm">
                    Bundle Discount
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0 pl-8 sm:pl-0">
                <p className="font-athletic text-3xl text-amber-400">+${PRESEASON_LEAGUE_PRICE}</p>
                <p className="text-stone-600 text-sm line-through">Regular ${PRESEASON_LEAGUE_REGULAR}</p>
                <p className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold mt-0.5">
                  Save ${PRESEASON_LEAGUE_REGULAR - PRESEASON_LEAGUE_PRICE}
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-stone-800 pt-5 pl-8">
              {[
                '5 Weeks Doubleheaders + 1 Week Playoffs',
                'Custom Reversible Jersey Included',
                'Official Stats & Standings Online',
                'Coached Game Management & Feedback',
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[11px] text-stone-400">
                  <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </button>
        </div>

        {/* Order summary */}
        <div className="bg-stone-900/30 border border-stone-800 rounded-sm p-8 md:p-10">
          <span className="text-[10px] tracking-[0.3em] text-orange-500 uppercase block mb-2">Order Summary</span>
          <h3 className="font-athletic text-3xl text-white uppercase mb-8">Cohort Enrollment</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-white text-sm font-medium">8-Week Preseason Bundle ({tier.frequency})</p>
                <p className="text-stone-500 text-xs mt-0.5">{tier.sessions} · {PRESEASON_DATES}</p>
              </div>
              <p className="text-white font-mono text-sm flex-shrink-0">{money(tier.price)}</p>
            </div>

            {withLeague && (
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-amber-400 text-sm font-medium">Fall 3v3 Prep League Add-On</p>
                  <p className="text-stone-500 text-xs mt-0.5">6-Wk Sunday Doubleheaders + Jersey</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-amber-400 font-mono text-sm">{money(PRESEASON_LEAGUE_PRICE)}</p>
                  <p className="text-stone-600 font-mono text-xs line-through">{money(PRESEASON_LEAGUE_REGULAR)}</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-stone-800 pt-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-400">Subtotal</span>
              <span className="text-white font-mono">{money(subtotal)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-emerald-400 flex items-center gap-2">
                  <Gift className="w-3.5 h-3.5" /> Total Savings
                </span>
                <span className="text-emerald-400 font-mono">−{money(savings)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-stone-400">Estimated Tax (IL 10.25%)</span>
              <span className="text-white font-mono">{money(tax)}</span>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-6 pt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-1">Total Due Today</p>
              <p className="font-athletic text-5xl text-white">{money(total)}</p>
            </div>
            {savings > 0 && (
              <span className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-widest font-bold px-3 py-2 rounded-sm self-start sm:self-auto">
                Saved {money(savings)}
              </span>
            )}
          </div>

          <button
            onClick={handleEnroll}
            className="w-full mt-8 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest text-xs py-5 rounded-sm transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            Enroll &amp; Pay {money(total)} <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-stone-600 text-[10px] uppercase tracking-widest text-center mt-4">
            Secure checkout via Stripe · Final total confirmed at payment
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreseasonBundle;
