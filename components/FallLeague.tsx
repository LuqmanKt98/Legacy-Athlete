import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Trophy, Users, Shield, Calendar, ArrowRight, Flame } from 'lucide-react';
import { scrollToSection } from '../lib/scrollToSection';

gsap.registerPlugin(ScrollTrigger);

interface FallLeagueProps {
  onSelectPlan: (planId: string) => void;
}

const FallLeague: React.FC<FallLeagueProps> = ({ onSelectPlan }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const registerCardRef = useRef<HTMLDivElement>(null);

  const division = {
    name: "Middle School Prep Division",
    age: "Grades 6th – 8th",
    focus: "Skill translation, spacing fundamentals, and high-frequency touches before school team selections.",
    time: "Fridays | 6:30 PM – 8:30 PM",
    spotsLeft: 6
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (introRef.current) {
        gsap.fromTo(introRef.current,
          { y: 40 },
          { y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: introRef.current, start: "top 85%" } }
        );
      }
      if (benefitsRef.current) {
        const cards = benefitsRef.current.querySelectorAll('.benefit-card');
        gsap.fromTo(cards,
          { y: 30 },
          { y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: benefitsRef.current, start: "top 80%" } }
        );
      }
      if (detailsRef.current && registerCardRef.current) {
        gsap.fromTo([detailsRef.current, registerCardRef.current],
          { y: 40 },
          { y: 0, duration: 1.0, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: detailsRef.current, start: "top 80%" } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRegister = () => {
    onSelectPlan('fall-3v3');
    scrollToSection('payment');
  };

  return (
    <section
      ref={sectionRef}
      id="fall-3v3"
      className="py-32 px-8 bg-black relative overflow-hidden border-t border-stone-900 scroll-mt-40"
    >
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <div ref={introRef} className="text-center mb-24">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full mb-6">
            <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.25em]">SEASON PREPARATION ACTIVE</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-athletic mb-8 leading-none bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
            FALL 3V3 LEAGUE
          </h1>
          <p className="text-stone-500 uppercase tracking-[0.4em] text-[10px] md:text-xs max-w-2xl mx-auto leading-relaxed">
            Five weeks of high-intensity games. One week of single-elimination playoffs. Engineered to build game-speed decision making before winter tryouts begin.
          </p>
        </div>

        {/* Core Value Pillars */}
        <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            {
              icon: <Users className="w-6 h-6 text-orange-500" />,
              title: "400% MORE TOUCHES",
              desc: "Compared to traditional 5v5 play. No standing in corners. Every player must handle, pass, defend, and make split-second live decisions on every single possession."
            },
            {
              icon: <Trophy className="w-6 h-6 text-blue-400" />,
              title: "6-WEEK TRANSITION CYCLE",
              desc: "5 weeks of regular season doubleheaders to establish team flow, chemistry, and offensive pacing. Week 6 is a high-stakes, single-elimination tournament to crown the champion."
            },
            {
              icon: <Shield className="w-6 h-6 text-orange-500" />,
              title: "SEASON READINESS",
              desc: "Get game-conditioned, build confidence under realistic pressure, and sharpen raw court IQ so you enter school season tryouts completely ahead of the competition."
            }
          ].map((item, i) => (
            <div key={i} className="benefit-card bg-stone-900/20 border border-stone-850 p-8 rounded-sm hover:border-stone-750 transition-colors">
              <div className="mb-6">{item.icon}</div>
              <h3 className="font-athletic text-xl mb-3 text-white tracking-wide uppercase">{item.title}</h3>
              <p className="text-stone-400 text-[11px] uppercase tracking-wider leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Division Details + Registration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          <div ref={detailsRef} className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-blue-400 uppercase font-bold block mb-3">COHORT BRACKET</span>
              <h2 className="text-3xl font-athletic uppercase text-white mb-6 tracking-wide">MIDDLE SCHOOL COHORT</h2>
              <p className="text-stone-400 text-xs uppercase tracking-widest leading-relaxed mb-8">
                Our fall league is structured specifically for middle school athletes to build chemistry, spacing habits, and crucial game-speed decision making.
              </p>

              <div className="bg-stone-950/60 border border-stone-900 p-6 rounded-sm space-y-4">
                <h4 className="font-athletic text-lg text-orange-500 uppercase">{division.name}</h4>
                <div className="flex items-center space-x-2 text-stone-400 text-[10px] uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5 text-stone-600" />
                  <span>{division.time}</span>
                  <span className="text-stone-800">|</span>
                  <span className="text-stone-500">{division.age}</span>
                </div>
                <p className="text-stone-400 text-[11px] uppercase tracking-wider leading-relaxed">
                  {division.focus}
                </p>

                <div className="pt-4 border-t border-stone-900/60 flex items-center justify-between">
                  <span className="text-[9px] text-stone-600 uppercase tracking-widest">LEAGUE STATUS</span>
                  <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded text-[8px] uppercase tracking-widest font-bold">
                    {division.spotsLeft} spots remaining
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[9px] text-stone-600 uppercase tracking-widest mt-6">
              * League gameplay is hosted on Friday evenings. Full rosters and matchup schedules are finalized one week before kickoff.
            </p>
          </div>

          <div ref={registerCardRef} className="lg:col-span-5 bg-stone-900/30 border border-stone-850 p-8 rounded-sm flex flex-col justify-between relative overflow-hidden group hover:border-stone-750 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-blue-500"></div>

            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-stone-500 uppercase tracking-widest text-[9px]">LEAGUE ENROLLMENT</span>
                <span className="text-orange-500 font-bold text-xs uppercase tracking-widest animate-pulse">FALL PREP</span>
              </div>

              <div>
                <h3 className="text-3xl font-athletic text-white uppercase mb-2">FALL 3V3 PREP</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  6 Weeks: Sept 25 – Oct 30, 2026
                </p>
              </div>

              <div className="border-t border-b border-stone-850/80 py-6 my-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-athletic text-white">$195</span>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest ml-2">Flat Rate / Player</span>
                </div>
                <p className="text-[9px] text-stone-500 uppercase tracking-widest leading-relaxed">
                  Includes game jersey, 5 regular season doubleheaders, fully refereed matchups, championship tournament bracket, and online stats/standings tracker.
                </p>
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  "5 Weeks of Competitive Doubleheaders",
                  "1 Week Single-Elimination Playoffs",
                  "Certified referees & active scorekeeping",
                  "Includes reversible custom team jersey",
                  "Full player profile & stats tracked online"
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[10px] text-stone-400 uppercase tracking-wider">
                    <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleRegister}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest text-[10px] py-4 rounded-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
            >
              <span>REGISTER FOR 3V3 LEAGUE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-stone-900 pt-16 text-center">
          <div>
            <p className="text-stone-500 uppercase tracking-widest text-[8px] mb-1">Duration</p>
            <p className="font-athletic text-2xl text-white">6 WEEKS</p>
          </div>
          <div>
            <p className="text-stone-500 uppercase tracking-widest text-[8px] mb-1">Game format</p>
            <p className="font-athletic text-2xl text-white">DOUBLEHEADERS</p>
          </div>
          <div>
            <p className="text-stone-500 uppercase tracking-widest text-[8px] mb-1">Team limit</p>
            <p className="font-athletic text-2xl text-white">8 TEAMS TOTAL</p>
          </div>
          <div>
            <p className="text-stone-500 uppercase tracking-widest text-[8px] mb-1">Playoffs format</p>
            <p className="font-athletic text-2xl text-white">1-WEEK BRACKET</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FallLeague;
