
import { Program, Principle, Stat, Testimonial, PricingTier } from './types';

// Live Legacy Athlete app — members open this for workout tracking, progress
// charts, and coach communication. External to this site (separate Firebase app).
export const ATHLETE_APP_URL = 'https://fitness-app-7e42f.web.app/';

export const PROGRAMS: Program[] = [
  {
    id: '01',
    title: 'THE SESSION',
    category: '90 Minutes',
    description: 'Athletes join a small group training session led by our coaching staff. 90 minutes of focused work — 30 minutes of athletic performance training, then 60 minutes of basketball skills and games.',
    benefits: ['Small Group Setting', 'Expert Coaching', 'Structured Plan'],
    image: '/images/013A5807-45.jpg'
  },
  {
    id: '02',
    title: 'THE WORK',
    category: 'Skill + Movement',
    description: 'We combine fundamental basketball skill work with athletic movement training. You get a complete picture of how we build total athletes.',
    benefits: ['Skill Development', 'Athletic Movement', 'Clear Feedback'],
    image: '/images/013A5892-56.jpg'
  },
  {
    id: '03',
    title: 'THE ENVIRONMENT',
    category: 'No Pressure',
    description: 'There is no testing day, no pressure, and no tryouts. We coach first and evaluate naturally through training.',
    benefits: ['No Tryouts', 'Natural Evaluation', ' Supportive Environment'],
    image: '/images/013A5924-58.jpg'
  }
];

export const ROADMAP_STEPS = [
  {
    phase: "01",
    title: "THE SESSION",
    description: "Complete your first 90-minute coached session. Experience the environment and the work firsthand.",
    tag: "Day 1"
  },
  {
    phase: "02",
    title: "RECOMMENDATION",
    description: "After training, we’ll recommend the best path forward based on age, level, and goals. No guessing.",
    tag: "Post-Session"
  },
  {
    phase: "03",
    title: "THE PATH",
    description: "Choose the option that makes the most sense. Most athletes train 2–3 times per week to see real results.",
    tag: "Day 2+"
  },
  {
    phase: "04",
    title: "CONSISTENCY",
    description: "Start your routine. No contracts, just commitment to the process.",
    tag: "Ongoing"
  }
];

export const PRINCIPLES: Principle[] = [
  {
    id: 1,
    title: "TOTAL ATHLETE",
    quote: "Foundation first.",
    description: "We don't just coach a shot; we build the athlete. We focus on everything from your physical health to your mental strength."
  },
  {
    id: 2,
    title: "PURE FOCUS",
    quote: "Small wins, big results.",
    description: "Excellence is found in the details. We focus on the small habits that others ignore to give you a massive edge."
  },
  {
    id: 3,
    title: "SMART PLAY",
    quote: "Outthink, outplay.",
    description: "Skills are nothing without the IQ to use them. We train you to deconstruct defense and lead your team."
  }
];

export const STATS: Stat[] = [
  { label: 'Athletes Trained', value: 100, suffix: '+' },
  { label: 'Sessions Coached', value: 1000, suffix: '+' },
  { label: 'Years Experience', value: 20, suffix: '+' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Matt V.",
    role: "Parent",
    content: "Coach Mark has taught my son the fundamentals and built his confidence by strengthening his body. The results are easy to see.",
  },
  {
    id: 2,
    // No attribution provided yet — card renders without a byline.
    name: "",
    role: "",
    content: "The Legacy program not only focuses on building skills, but sharpening mental fortitude and problem solving. The practice translates to the game seamlessly.",
  },
  {
    id: 3,
    name: "Gaynor P.",
    role: "Parent",
    content: "Coach Mark and his program has been a gamechanger for our son. He has helped Avery develop better ball handling skills and build his confidence on the court. Most importantly — Avery is working hard and having fun every step of the way. We can't thank Mark enough for the time and positive energy he has poured into our son.",
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'drop-in',
    name: 'DROP-IN',
    price: '22.50',
    originalPrice: '45',
    description: 'Limited Time: 50% Off First Session',
    features: [
      '90-Minute Coached Session',
      'Pay Per Visit',
      'No Commitment Required'
    ],
    recommended: false,
    cta: 'Book Session'
  },
  {
    id: '1x-week',
    name: '1X / WEEK',
    price: '179',
    description: '$45/session',
    features: [
      '1 Session Per Week',
      'Billed Monthly'
    ],
    recommended: false,
    cta: 'Subscribe'
  },
  {
    id: '2x-week',
    name: '2X / WEEK',
    price: '259',
    description: '$32/session',
    features: [
      '2 Sessions Per Week',
      'Billed Monthly'
    ],
    recommended: true,
    cta: 'Subscribe'
  },
  {
    id: '3x-week',
    name: '3X / WEEK',
    price: '309',
    description: '$26/session',
    features: [
      '3 Sessions Per Week',
      'Billed Monthly'
    ],
    recommended: false,
    cta: 'Subscribe'
  },
  {
    id: '4x-week',
    name: '4X / WEEK',
    price: '359',
    description: '$22/session',
    features: [
      '4 Sessions Per Week',
      'Billed Monthly'
    ],
    recommended: false,
    cta: 'Subscribe'
  },
  {
    id: 'performance-solo',
    name: 'PERFORMANCE SOLO',
    price: '99',
    description: 'Performance Add-on Only',
    features: [
      'Performance Training',
      'Billed Monthly'
    ],
    recommended: false,
    cta: 'Subscribe'
  },
  {
    id: 'end-summer-camp',
    name: 'HOLIDAY CAMP',
    price: '75',
    description: 'Single-day training • 9AM–3PM • Pick a date above',
    features: [
      'One-Day Camp',
      'Skill + Performance Training',
      'All Levels Welcome'
    ],
    recommended: false,
    cta: 'RSVP'
  },
  {
    id: 'fall-3v3',
    name: 'FALL 3V3 LEAGUE',
    price: '195',
    description: '6 Weeks: Sept 25 – Oct 30, 2026 • Flat Rate / Player',
    features: [
      '5 Weeks of Competitive Doubleheaders',
      '1 Week Single-Elimination Playoffs',
      'Includes Reversible Team Jersey'
    ],
    recommended: false,
    cta: 'Register'
  }
];
