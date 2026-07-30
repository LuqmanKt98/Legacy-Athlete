
export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface Principle {
  id: number;
  title: string;
  quote: string;
  description: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Testimonial {
  id: number;
  /** Empty string when attribution hasn't been provided yet — renders without a byline. */
  name: string;
  role: string;
  content: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}
