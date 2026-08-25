import React, { useState } from 'react';
import { Check, Users, ShieldCheck, CalendarDays, ArrowRight, Trophy } from 'lucide-react';
import { PRESEASON_TIERS, PRESEASON_DATES } from '../constants';

const API_BASE = import.meta.env.VITE_FUNCTIONS_URL || '';
const getApiUrl = (endpoint: string) => (API_BASE ? `${API_BASE}/${endpoint}` : `/api/${endpoint}`);

/**
 * Paid-ad landing page for the 8-Week Preseason Challenge (`/challenge`).
 *
 * Deliberately stripped down: no site nav, no pricing tiers to compare, no login,
 * no payment. Cold ad traffic gets one job — leave a name and email — because the
 * client is paying per click and every extra step is paid traffic walking away.
 * Enrollment and payment happen afterwards, once the coach has the lead.
 */
const FREQUENCIES = ['Not sure yet', ...PRESEASON_TIERS.map((t) => t.frequency)];

const inputClass =
  'w-full bg-stone-950 border border-stone-800 px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm placeholder:text-stone-600';

const ChallengeLanding: React.FC = () => {
  const [form, setForm] = useState({
    parentName: '',
    email: '',
    phone: '',
    athleteName: '',
    frequency: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      // Preserve the ad campaign tag (?utm_source=... or ?src=...) so leads can be
      // attributed back to the ad set that paid for them.
      const params = new URLSearchParams(window.location.search);
      const source = params.get('utm_source') || params.get('src') || 'challenge-page';

      const res = await fetch(getApiUrl('submitChallengeLead'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-black min-h-screen text-white selection:bg-orange-600 selection:text-white">
      {/* Minimal header — wordmark only. No nav: every link here is a way for paid
          traffic to leave without converting. */}
      <header className="border-b border-stone-900 px-6 md:px-12 py-5 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className="font-athletic text-2xl tracking-tighter">LEGACY</span>
          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1" />
        </div>
      </header>

      <section className="relative overflow-hidden px-6 md:px-12 py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/hero-legacy.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
        </div>

        {/* Flex on mobile so the form can sit between the hook and the supporting
            detail; an explicitly-placed grid on desktop puts the form alongside.
            Ordering matters here: on a phone the detail copy would otherwise push
            the form ~280px below the fold, on traffic that is being paid for. */}
        <div className="relative max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Hook */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-3.5 py-1.5 rounded-full mb-6">
              <CalendarDays className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.25em]">{PRESEASON_DATES}</span>
            </div>

            <h1 className="font-athletic text-5xl md:text-7xl leading-[0.95] mb-6">
              8-WEEK PRESEASON{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 text-transparent bg-clip-text">CHALLENGE</span>
            </h1>

            <p className="text-white text-lg md:text-2xl font-athletic">
              DON'T WAIT FOR TRYOUTS TO GET READY.
            </p>
          </div>

          {/* Supporting detail — below the form on mobile, under the hook on desktop. */}
          <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
            <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              8 weeks of coached basketball and athletic performance training, built to get young
              athletes into the season stronger, faster, more skilled and more confident.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Small-group coaching — never lost in a crowd',
                'Skill work plus real athletic performance training',
                'Pre & post assessment so progress is measured, not guessed',
                'Optional Fall 3v3 Prep League at a bundled rate',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-300">
                  <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 border border-stone-800 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest text-stone-400">
                <Users className="w-3.5 h-3.5 text-orange-500" /> Ages 11–18
              </span>
              <span className="inline-flex items-center gap-2 border border-stone-800 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" /> All Levels
              </span>
              <span className="inline-flex items-center gap-2 border border-stone-800 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest text-stone-400">
                <Trophy className="w-3.5 h-3.5 text-orange-500" /> Pilsen, Chicago
              </span>
            </div>
          </div>

          {/* Capture form */}
          <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full bg-stone-900/50 border border-stone-800 rounded-sm p-7 md:p-9 backdrop-blur-sm lg:sticky lg:top-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(234,88,12,0.3)]">
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
                <h2 className="font-athletic text-3xl uppercase mb-3">You're On The List</h2>
                <p className="text-stone-400 text-sm max-w-xs mx-auto mb-8">
                  Check your inbox for the details — Coach Mark will be in touch shortly to get
                  {form.athleteName ? ` ${form.athleteName}` : ' your athlete'} started.
                </p>
                <a
                  href="/#preseason"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-widest text-[10px] px-8 py-4 rounded-sm transition-colors"
                >
                  See Pricing &amp; Enroll <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[10px] tracking-[0.3em] text-orange-500 uppercase">Limited Spots</span>
                  <h2 className="font-athletic text-2xl md:text-3xl uppercase mt-1">Claim Your Spot</h2>
                  <p className="text-stone-500 text-xs mt-2">
                    Takes 20 seconds. We'll send the full details and get you started.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    type="text"
                    autoComplete="name"
                    placeholder="Your name *"
                    value={form.parentName}
                    onChange={update('parentName')}
                    className={inputClass}
                  />
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="Email address *"
                    value={form.email}
                    onChange={update('email')}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={update('phone')}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Athlete's name (optional)"
                    value={form.athleteName}
                    onChange={update('athleteName')}
                    className={inputClass}
                  />
                  <select
                    value={form.frequency}
                    onChange={update('frequency')}
                    className={`${inputClass} appearance-none cursor-pointer ${form.frequency ? '' : 'text-stone-600'}`}
                  >
                    <option value="">How often? (optional)</option>
                    {FREQUENCIES.map((f) => (
                      <option key={f} value={f} className="text-white">{f}</option>
                    ))}
                  </select>

                  {error && <p className="text-red-500 text-xs">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold uppercase tracking-[0.2em] text-xs py-5 rounded-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>Claim My Spot <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-stone-600 text-[10px] text-center leading-relaxed">
                    No payment required now. We'll contact you with the details.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-900 px-6 md:px-12 py-8 text-center">
        <p className="text-stone-700 text-[9px] uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} The Legacy Athlete™ · Pilsen, Chicago
        </p>
      </footer>
    </main>
  );
};

export default ChallengeLanding;
