import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Smoother default easing
gsap.defaults({ ease: 'power3.out' });

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  // === Hero entrance timeline ===
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Set initial states
  gsap.set('.hero__label', { y: 30, opacity: 0 });
  gsap.set('.hero__subtitle', { y: 30, opacity: 0 });
  gsap.set('.hero__cta', { y: 30, opacity: 0, scale: 0.95 });
  gsap.set('.hero__geometry', { opacity: 0, scale: 0.9 });

  heroTl
    // Geometry fades in with scale
    .to('.hero__geometry', {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'power2.out',
    }, 0)
    // Label
    .to('.hero__label', {
      opacity: 1,
      y: 0,
      duration: 0.7,
    }, 0.2)
    // Headline lines — clip-path reveal with stagger
    .to('.hero__line', {
      opacity: 1,
      clipPath: 'inset(0% 0 0% 0)',
      duration: 0.9,
      stagger: 0.12,
      ease: 'power4.inOut',
    }, 0.4)
    // Subtitle with blur-in effect
    .to('.hero__subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.9)
    // CTA button pops in
    .to('.hero__cta', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.4)',
    }, 1.1)
    // Scroll indicator
    .to('.hero__scroll', {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
    }, 1.4);

  // === Hero parallax on scroll ===
  gsap.to('.hero__geometry', {
    yPercent: -15,
    rotation: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
  });

  gsap.to('.hero__content', {
    yPercent: 12,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
    },
  });

  // === Manifesto word reveal on scroll ===
  const manifestoWords = document.querySelectorAll('.manifesto__word');

  if (manifestoWords.length > 0) {
    const manifestoSection = document.getElementById('manifiesto');
    const manifestoInner = document.querySelector('.manifesto__inner') as HTMLElement;

    // Smoother word-by-word reveal with eased transitions
    gsap.set(manifestoWords, { opacity: 0.12, filter: 'blur(1px)' });
    // Start section slightly transparent for smooth entrance
    if (manifestoInner) gsap.set(manifestoInner, { opacity: 0.3, scale: 0.97 });

    ScrollTrigger.create({
      trigger: '#manifiesto',
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const raw = self.progress;

        // Phase 1: Entrance (0–10%) — section fades/scales in
        // Phase 2: Word reveal (10–75%)
        // Phase 3: Hold fully visible (75–85%)
        // Phase 4: Exit (85–100%) — section fades out

        // Entrance
        if (manifestoInner) {
          const enterT = Math.min(raw / 0.1, 1);
          const exitT = raw > 0.85 ? (raw - 0.85) / 0.15 : 0;
          const sectionOpacity = enterT * (1 - exitT * 0.7);
          const sectionScale = 0.97 + 0.03 * enterT - 0.02 * exitT;
          gsap.set(manifestoInner, {
            opacity: sectionOpacity,
            scale: sectionScale,
          });
        }

        // Word reveal — mapped to 10%–75% of scroll
        const wordProgress = Math.max(0, Math.min((raw - 0.1) / 0.65, 1));
        manifestoWords.forEach((word, i) => {
          const wordStart = i / manifestoWords.length;
          const wordEnd = (i + 1) / manifestoWords.length;
          let t: number;
          if (wordProgress >= wordEnd) {
            t = 1;
          } else if (wordProgress <= wordStart) {
            t = 0;
          } else {
            t = (wordProgress - wordStart) / (wordEnd - wordStart);
            t = t * t; // Quadratic ease
          }
          const wordOpacity = 0.12 + 0.88 * t;
          const blur = 1 - t; // 1px → 0px
          gsap.set(word, {
            opacity: wordOpacity,
            filter: `blur(${blur}px)`,
          });
        });
      },
    });
  }
}

// Export for potential reuse
export { gsap, ScrollTrigger };
