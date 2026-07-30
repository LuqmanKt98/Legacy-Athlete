
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ATHLETE_APP_URL } from '../constants';

interface FooterProps {
  onPortalClick?: () => void;
}

// Temporary: mw@legacyathlete.com isn't set up yet, routing to his Gmail for now.
const COACH_EMAIL = 'm.waite11@gmail.com';

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Footer: React.FC<FooterProps> = ({ onPortalClick }) => {
  return (
    <footer className="bg-black py-24 px-8 md:px-16 border-t border-stone-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-12 md:mb-0">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-athletic text-2xl tracking-tighter">LEGACY</span>
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1"></div>
          </div>
          <p className="text-stone-600 text-[10px] uppercase tracking-[0.2em] max-w-xs">
            The private development system for high-performance athletes committed to mastery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-300 mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: 'Programs', id: 'session' },
                { label: 'About', id: 'mission' },
                { label: 'Results', id: 'results' },
                { label: 'Schedule', id: 'weekly-schedule' },
              ].map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={scrollTo(item.id)} className="text-stone-500 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-300 mb-6">Portal</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={onPortalClick} className="text-stone-500 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">Login</button>
              </li>
              <li>
                <a
                  href={ATHLETE_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the Live Athlete App (opens in a new tab)"
                  className="group inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-400 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  Live Athlete App
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a href={`mailto:${COACH_EMAIL}`} className="text-stone-500 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">Support</a>
              </li>
              <li>
                <a href="#assessment" onClick={scrollTo('assessment')} className="text-stone-500 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">Free Assessment</a>
              </li>
            </ul>
          </div>
          <div className="hidden md:block">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-300 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${COACH_EMAIL}`} className="text-stone-500 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">{COACH_EMAIL}</a>
              </li>
              <li>
                <a href="#location" onClick={scrollTo('location')} className="text-stone-500 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">Pilsen, Chicago</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-stone-900 flex flex-col lg:flex-row justify-between items-start gap-8 text-stone-700 text-[9px] uppercase tracking-[0.3em]">
        <div className="max-w-3xl space-y-4">
          <p className="text-stone-600 font-bold">
            © {new Date().getFullYear()} THE LEGACY ATHLETE™. ALL RIGHTS RESERVED. REGISTERED TRADEMARK OF THE LEGACY CO.
          </p>
          <p className="leading-relaxed text-stone-500 normal-case tracking-normal text-[10px]">
            <strong>INTELLECTUAL PROPERTY &amp; COPYRIGHT WARNING:</strong> All curriculum materials, physical athletic protocols, basketball skill sequencing systems, mechanical feedback algorithms, training session diagrams, proprietary benchmarks, and digital/interactive metrics displayed on this platform are copyrighted trade secrets of The Legacy Co.
          </p>
          <p className="leading-relaxed text-stone-500 normal-case tracking-normal text-[10px]">
            Unauthorized copying, distribution, video recording, public transmission, coaching replication, or commercial duplication of these elite development programs is strictly prohibited by law. Violators will be prosecuted to the maximum extent of the law under federal and international trademark and copyright enforcement statutes.
          </p>
        </div>
        <div className="space-x-8 shrink-0">
          <a href="#" className="hover:text-stone-400">Privacy Policy</a>
          <a href="#" className="hover:text-stone-400">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
