
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Check, ArrowRight, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HolidayCampsProps {
  /** planId is always EVENT_PLAN_ID (all camps share one flat-rate SKU) — eventLabel
   *  carries the specific date/name chosen so Payment can display and email the right one. */
  onSelectCamp: (planId: string, eventLabel: string) => void;
}

// All dates share one flat-rate plan — see PLAN_PRICES_CENTS["end-summer-camp"] in
// functions/src/index.ts. Add a new date here only; no backend change needed unless
// the price itself changes.
const EVENT_PLAN_ID = 'end-summer-camp';
// $65 since 2026-08-25 ("make only one camp option for $65"). Must match
// PLAN_PRICES_CENTS["end-summer-camp"] and the Firestore `packages` doc.
const PRICE = 65;

interface Camp {
  id: string;
  name: string;
  date: string; // display string, matches client brief exactly
}

// Client-provided list (brief, 2026-07-28) — aligned to 2026–2027 CPS holidays/breaks.
const CAMPS: Camp[] = [
  { id: 'labor-day', name: 'Labor Day Camp', date: 'Monday, September 7, 2026' },
  { id: 'indigenous-peoples-day', name: "Indigenous Peoples' Day Camp", date: 'Monday, October 12, 2026' },
  { id: 'parent-teacher-nov', name: 'Parent-Teacher Conference Camp', date: 'Monday, November 2, 2026' },
  { id: 'general-election-day', name: 'General Election Day Camp', date: 'Tuesday, November 3, 2026' },
  { id: 'thanksgiving-break', name: 'Thanksgiving Break Camp', date: 'Wednesday, November 25, 2026' },
  { id: 'winter-break', name: 'Winter Break Camp', date: 'Monday, December 21, 2026' },
  { id: 'mlk-day', name: 'Martin Luther King Jr. Day Camp', date: 'Monday, January 18, 2027' },
  { id: 'presidents-day', name: "Presidents' Day Camp", date: 'Monday, February 15, 2027' },
  { id: 'spring-break', name: 'Spring Break Camp', date: 'Monday, March 22, 2027' },
  { id: 'parent-teacher-apr', name: 'Parent-Teacher Conference Camp', date: 'Monday, April 12, 2027' },
  { id: 'memorial-day', name: 'Memorial Day Camp', date: 'Monday, May 31, 2027' },
];

const INCLUDED = [
  'Full-day skill + performance training',
  'Small-sided competitive play',
  'Strength, speed & mobility work',
  'All ages and levels welcome',
];

const HolidayCamps: React.FC<HolidayCampsProps> = ({ onSelectCamp }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string>(CAMPS[0].id);
  const selectedCamp = CAMPS.find(c => c.id === selectedId) ?? CAMPS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      if (listRef.current) {
        gsap.fromTo(listRef.current.querySelectorAll('.camp-card'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: listRef.current, start: 'top 85%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-play the entrance animation when the selected camp's detail panel changes.
  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(detailRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }, [selectedId]);

  const handleRSVP = () => {
    onSelectCamp(EVENT_PLAN_ID, `${selectedCamp.name} — ${selectedCamp.date}`);
    document.getElementById('payment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="holiday-camps"
      ref={sectionRef}
      className="bg-black text-white py-24 px-6 md:px-12 overflow-hidden scroll-mt-40"
    >
      <div className="max-w-5xl mx-auto">
        {/* Intro */}
        <div className="text-center mb-16">
          <p className="text-orange-500 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 flex items-center justify-center gap-2">
            <Sun className="w-3.5 h-3.5" /> No-School Training Days
          </p>
          <h1 className="text-5xl md:text-8xl font-athletic mb-8 leading-none bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
            SELECT HOLIDAY CAMP
          </h1>
          <p className="text-stone-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            All camps align with the 2026–2027 Chicago Public Schools major holidays &amp; breaks.
            <span className="text-white"> Secure your child's training day off-school.</span>
          </p>
        </div>

        {/* Camp list */}
        <div ref={listRef} className="grid grid-cols-1 gap-4 mb-16">
          {CAMPS.map((camp) => {
            const active = camp.id === selectedId;
            return (
              <button
                key={camp.id}
                onClick={() => setSelectedId(camp.id)}
                aria-pressed={active}
                className={`camp-card w-full text-left p-6 rounded-sm border transition-colors flex items-center justify-between gap-4 ${
                  active
                    ? 'border-orange-500 bg-orange-600/[0.06]'
                    : 'border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <span className="inline-block bg-orange-600/15 text-orange-500 text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm mb-3">
                    Single Day
                  </span>
                  <h3 className={`font-athletic text-xl md:text-2xl uppercase mb-1 ${active ? 'text-orange-500' : 'text-white'}`}>
                    {camp.name}
                  </h3>
                  <p className="text-stone-500 text-xs uppercase tracking-widest">{camp.date}</p>
                </div>
                {active && (
                  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected camp detail + checkout */}
        <div ref={detailRef} className="bg-stone-900/30 border border-stone-800 rounded-sm p-8 md:p-12">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.3em] text-orange-500 uppercase block mb-2">Selected</span>
            <h2 className="font-athletic text-3xl md:text-4xl uppercase mb-1">{selectedCamp.name}</h2>
            <p className="text-stone-500 text-xs uppercase tracking-widest">{selectedCamp.date}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/30 border border-stone-800 p-6 rounded-sm text-center">
              <Calendar className="w-5 h-5 text-orange-500 mx-auto mb-4" />
              <p className="text-stone-500 uppercase tracking-widest text-[10px] mb-2">Date</p>
              <p className="text-lg font-athletic">{selectedCamp.date}</p>
            </div>
            <div className="bg-black/30 border border-stone-800 p-6 rounded-sm text-center">
              <Clock className="w-5 h-5 text-orange-500 mx-auto mb-4" />
              <p className="text-stone-500 uppercase tracking-widest text-[10px] mb-2">Time</p>
              <p className="text-lg font-athletic">9:00 AM – 3:00 PM</p>
            </div>
            <div className="bg-black/30 border border-stone-800 p-6 rounded-sm text-center">
              <span className="text-orange-500 font-athletic text-xl leading-none block mb-4">$</span>
              <p className="text-stone-500 uppercase tracking-widest text-[10px] mb-2">RSVP</p>
              <p className="text-lg font-athletic">${PRICE} / Athlete</p>
            </div>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <h3 className="text-white uppercase tracking-widest text-xs mb-6 text-center">What's Included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {INCLUDED.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-300 text-sm">
                  <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={handleRSVP}
              className="w-full sm:w-auto bg-white text-black px-12 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:scale-105 hover:bg-orange-600 hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              RSVP – ${PRICE} <ArrowRight className="w-3 h-3" />
            </button>
            <p className="text-stone-600 text-[10px] uppercase tracking-widest mt-4">
              ${PRICE} + tax • Secure checkout via Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidayCamps;
