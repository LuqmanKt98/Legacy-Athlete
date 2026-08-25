import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Placeholder set built from existing site photography — swap for the client's own
// facility/culture photos once provided (per brief: "I will provide images to add").
// The historic Naismith portrait was removed at the client's request (2026-08-04 brief).
const images = [
  { src: '/images/013A6138-9.jpg', alt: 'Legacy Athlete training session', colSpan: 'md:col-span-2 md:row-span-2' },
  { src: '/images/013A5807-45.jpg', alt: 'Coached small-group session', colSpan: 'md:col-span-1 md:row-span-1' },
  { src: '/images/013A5892-56.jpg', alt: 'Skill and movement training', colSpan: 'md:col-span-1 md:row-span-1' },
  // Spans 2 columns so the 4-image set fills the 4x2 grid exactly with no empty cell.
  { src: '/images/013A5924-58.jpg', alt: 'Legacy Athlete facility', colSpan: 'md:col-span-2 md:row-span-1' },
];

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-header",
        { y: 30 },
        { y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );

      if (galleryRef.current) {
        const items = galleryRef.current.querySelectorAll('.gallery-item');
        gsap.fromTo(items,
          { y: 40, scale: 0.95 },
          { y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: galleryRef.current, start: "top 80%" } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-32 px-8 bg-black relative border-b border-stone-900 scroll-mt-40">
      <div className="max-w-7xl mx-auto">
        <div className="gallery-header text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] text-orange-500 uppercase block mb-4">THE FACILITY & CULTURE</span>
          <h2 className="font-athletic text-4xl md:text-6xl text-white font-black uppercase">INSIDE LEGACY</h2>
        </div>

        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]"
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className={`gallery-item relative rounded-sm overflow-hidden group cursor-pointer bg-stone-900 ${image.colSpan}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
