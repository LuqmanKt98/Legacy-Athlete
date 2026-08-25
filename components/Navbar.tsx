
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, MessageCircle, MapPin, Clock, Smartphone, ArrowUpRight, Flame, CalendarDays, Sun } from 'lucide-react';
import { ATHLETE_APP_URL } from '../constants';

// Three announcements share one strip rather than stacking three bars — the fixed
// header is already ~150px on mobile and a third bar would eat the hero.
const ANNOUNCEMENTS = [
  {
    id: 'preseason',
    icon: CalendarDays,
    text: '8-Week Preseason Bundle — Sept 14 to Nov 8',
    cta: 'Enroll Now',
  },
  {
    id: 'fall-3v3',
    icon: Flame,
    text: 'Fall 3v3 League — Season Prep Active',
    cta: 'Register Now',
  },
  {
    id: 'holiday-camps',
    icon: Sun,
    text: 'Labor Day Camp — Monday, September 7',
    cta: 'Reserve a Spot',
  },
];

const ROTATE_MS = 5000;

interface NavbarProps {
  onPortalClick: () => void;
  onLoginClick: () => void;
  isLoggedIn?: boolean;
  onConsoleClick?: () => void;
}

// Branded Workspace mailbox, live since 2026-08-15. Coach alert emails still copy
// his personal Gmail as well — see COACH_NOTIFICATION_EMAILS in functions/src/index.ts.
const COACH_EMAIL = 'Mw@legacyathlete.fit';

const NAV_ITEMS = [
  { label: 'About', id: 'mission' },
  { label: 'Programs', id: 'session' },
  { label: 'Schedule', id: 'weekly-schedule' },
  { label: 'Results', id: 'results' },
  { label: 'Members', id: 'members' },
];

const Navbar: React.FC<NavbarProps> = ({ onPortalClick, onLoginClick, isLoggedIn, onConsoleClick }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    gsap.fromTo(wrapRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1 }
    );
  }, []);

  // Cycle the announcement strip. Held static for anyone who prefers reduced
  // motion — a banner that swaps itself out is exactly what that setting is for.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(
      () => setAnnouncementIndex((i) => (i + 1) % ANNOUNCEMENTS.length),
      ROTATE_MS
    );
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div ref={wrapRef} className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-black/10">
        {/* Announcement strip — preseason bundle, 3v3 league and Labor Day camp,
            each linking to its own section. Rotates so all three get the top slot
            without tripling the header height. */}
        <div className="relative w-full bg-gradient-to-r from-orange-600 to-blue-600">
          {ANNOUNCEMENTS.map((a, i) => {
            const Icon = a.icon;
            const active = i === announcementIndex;
            return (
              <button
                key={a.id}
                onClick={(e) => handleScroll(e, a.id)}
                aria-hidden={!active}
                tabIndex={active ? 0 : -1}
                className={`w-full flex items-center justify-center gap-2 py-1.5 px-4 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.25em] hover:brightness-110 transition-opacity duration-500 ${
                  active ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                <Icon className="w-3 h-3 flex-shrink-0 motion-safe:animate-pulse" />
                <span>{a.text}</span>
                <span className="hidden sm:inline">— {a.cta}</span>
              </button>
            );
          })}
        </div>

        {/* Utility Bar — visible at every breakpoint, mobile included.
            Labels shorten below sm so all four links fit one row on a phone. */}
        <div className="flex items-center justify-between gap-2 px-4 sm:px-8 md:px-16 py-2.5 border-b border-stone-900/60 bg-black/60 text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.25em] text-stone-500">
          <a
            href="#location"
            onClick={(e) => handleScroll(e, 'location')}
            className="hover:text-orange-500 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" />
            <span className="hidden sm:inline">Pilsen, Chicago location</span>
            <span className="sm:hidden">Pilsen</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            <a
              href="#apply"
              onClick={(e) => handleScroll(e, 'apply')}
              className="hover:text-orange-500 transition-colors flex items-center gap-1.5"
            >
              <Clock className="w-3 h-3 text-orange-500 flex-shrink-0" />
              <span className="hidden sm:inline">Book Today's Session</span>
              <span className="sm:hidden">Book</span>
            </a>

            {/* `uppercase` repeated here — buttons don't inherit text-transform from the bar. */}
            <button onClick={onPortalClick} className="uppercase hover:text-orange-500 transition-colors flex items-center gap-1.5">
              <Smartphone className="w-3 h-3 flex-shrink-0" />
              <span className="hidden sm:inline">Member Portal</span>
              <span className="sm:hidden">Portal</span>
            </button>

            {/* Live pulse marks this as the one link that leaves the site — it's
                the members' destination, so it gets the only color in the bar. */}
            <a
              href={ATHLETE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the Live Athlete App (opens in a new tab)"
              className="group text-orange-500 hover:text-orange-400 font-bold transition-colors flex items-center gap-1.5"
            >
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
              </span>
              <span className="hidden sm:inline">Live Athlete App</span>
              <span className="sm:hidden">App</span>
              <ArrowUpRight className="w-3 h-3 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={`mailto:${COACH_EMAIL}`}
              className="hidden md:flex hover:text-orange-500 transition-colors items-center gap-1.5"
            >
              <MessageCircle className="w-3 h-3" /> Email Coach
            </a>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="flex justify-between items-center px-8 md:px-16 py-6 md:py-7">
          <div className="flex items-center space-x-2">
            <span className="font-athletic text-2xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>LEGACY</span>
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1"></div>
          </div>

          <div className="hidden md:flex space-x-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className="text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <button
                onClick={onConsoleClick}
                className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-medium text-orange-500 hover:text-orange-400 transition-all duration-300 px-4 py-2"
              >
                Console
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-medium text-stone-400 hover:text-white transition-all duration-300 px-4 py-2"
              >
                Login
              </button>
            )}
            <button
              onClick={() => document.getElementById('assessment')?.scrollIntoView({behavior: 'smooth'})}
              className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-medium border border-orange-600/60 text-orange-500 px-6 py-2 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
            >
              Book Assessment
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-stone-400 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className="text-xl uppercase tracking-[0.4em] text-stone-400 hover:text-white transition-colors duration-300 font-athletic"
            >
              {item.label}
            </a>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => { setIsOpen(false); onConsoleClick?.(); }}
              className="text-[10px] uppercase tracking-[0.3em] font-medium text-orange-500 hover:text-orange-400 transition-colors"
            >
              Console
            </button>
          ) : (
            <button
              onClick={() => { setIsOpen(false); onLoginClick(); }}
              className="text-[10px] uppercase tracking-[0.3em] font-medium text-stone-400 hover:text-white transition-colors"
            >
              Login
            </button>
          )}
          <a
            href={ATHLETE_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            aria-label="Open the Live Athlete App (opens in a new tab)"
            className="group flex items-center gap-2.5 border border-orange-500/60 bg-orange-600/10 text-orange-500 px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-orange-600 hover:text-white hover:border-orange-500 transition-all duration-300"
          >
            <Smartphone className="w-4 h-4" />
            Open Athlete App
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            onClick={() => {
              setIsOpen(false);
              document.getElementById('assessment')?.scrollIntoView({behavior: 'smooth'});
            }}
            className="text-[10px] uppercase tracking-[0.3em] font-medium border border-orange-600 text-orange-500 px-10 py-4 rounded-full"
          >
            Book Assessment
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
