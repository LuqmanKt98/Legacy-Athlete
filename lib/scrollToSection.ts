/**
 * Scroll to a section by id, reliably.
 *
 * `scrollIntoView({ behavior: 'smooth' })` is not dependable over long
 * distances: browsers cap or abandon smooth scrolls, and mobile Safari in
 * particular frequently stops partway. On this page the checkout sits ~20,000px
 * below the preseason section, so "Enroll & Pay" was leaving people stranded in
 * the middle of the page — often on a blank divider — which reads as the button
 * being broken.
 *
 * Short hops stay smooth because that reads nicely. Anything long enough to be
 * unreliable jumps instantly, which is also the better experience: nobody wants
 * to watch 20,000px of page fly past.
 */
const SMOOTH_MAX_DISTANCE_PX = 3000;

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const distance = Math.abs(el.getBoundingClientRect().top);
  el.scrollIntoView({
    behavior: distance > SMOOTH_MAX_DISTANCE_PX ? 'auto' : 'smooth',
    block: 'start',
  });
}
