import React, { useEffect, useState } from 'react';

/**
 * Countdown to the preseason cohort start.
 *
 * The pre-existing Countdown.tsx hardcoded a 2025 date and was never rendered;
 * this replaces it with a dated, self-retiring version. Once the cohort has
 * started the timer hides itself rather than sitting at zero or counting
 * negative — the hero is seasonal and will outlive the campaign.
 */
interface PreseasonCountdownProps {
  /** Cohort start, in local time. */
  target: Date;
  className?: string;
}

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

const diffToParts = (ms: number): TimeLeft => ({
  days: Math.floor(ms / (1000 * 60 * 60 * 24)),
  hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
  minutes: Math.floor((ms / 1000 / 60) % 60),
  seconds: Math.floor((ms / 1000) % 60),
});

const PreseasonCountdown: React.FC<PreseasonCountdownProps> = ({ target, className = '' }) => {
  const remaining = () => target.getTime() - Date.now();
  const [msLeft, setMsLeft] = useState<number>(remaining);

  useEffect(() => {
    const id = setInterval(() => setMsLeft(remaining()), 1000);
    return () => clearInterval(id);
    // `target` is a stable prop from a module constant; re-arm if it ever changes.
  }, [target]);

  // Cohort already under way — render nothing rather than a dead clock.
  if (msLeft <= 0) return null;

  const t = diffToParts(msLeft);
  const cells: Array<[number, string]> = [
    [t.days, 'Days'],
    [t.hours, 'Hours'],
    [t.minutes, 'Mins'],
    [t.seconds, 'Secs'],
  ];

  return (
    <div className={className}>
      <p className="flex items-center justify-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-orange-500 font-bold mb-4">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
        </span>
        Preseason Kickoff Countdown
      </p>

      <div className="flex items-stretch justify-center gap-2 sm:gap-3">
        {cells.map(([value, label], i) => (
          <React.Fragment key={label}>
            {i > 0 && <span className="self-center text-stone-700 text-xl font-athletic pb-4">:</span>}
            <div className="bg-black/50 border border-stone-800 rounded-sm px-3 sm:px-5 py-3 min-w-[62px] sm:min-w-[76px] backdrop-blur-sm">
              {/* Tabular figures stop the row jittering as the seconds tick. */}
              <p className="font-athletic text-2xl sm:text-4xl text-white tabular-nums leading-none">
                {String(value).padStart(2, '0')}
              </p>
              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-stone-500 mt-1.5">{label}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PreseasonCountdown;
