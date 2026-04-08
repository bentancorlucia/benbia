import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Smoother default easing
gsap.defaults({ ease: 'power3.out' });

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isMobile = window.innerWidth <= 768;

if (!prefersReduced) {
  // === Hero entrance timeline ===
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Set initial states
  gsap.set('.hero__subtitle', { y: 30, opacity: 0 });
  gsap.set('.hero__cta', { y: 20, opacity: 0 });

  heroTl
    // Headline lines — fade + slide reveal with stagger
    .to('.hero__line', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power4.out',
    }, 0.4)
    // Subtitle fade in
    .to('.hero__subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.9)
    // CTA button fades in
    .to('.hero__cta', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, 1.1)
    // Scroll indicator
    .to('.hero__scroll', {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        const el = document.querySelector('.hero__scroll') as HTMLElement;
        if (el) el.style.animationPlayState = 'running';
      },
    }, 1.4);

  // === Hero parallax on scroll (disabled on mobile — causes jank) ===
  if (!isMobile) {
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
  }

  // === Manifesto word reveal on scroll ===
  const manifestoWords = document.querySelectorAll('.manifesto__word');

  if (manifestoWords.length > 0) {
    const manifestoInner = document.querySelector('.manifesto__inner') as HTMLElement;

    // Smoother word-by-word reveal with eased transitions
    gsap.set(manifestoWords, { opacity: 0.12, filter: 'blur(2px)' });
    // Start section slightly transparent for smooth entrance
    if (manifestoInner) gsap.set(manifestoInner, { opacity: 0.3, scale: 0.97 });

    ScrollTrigger.create({
      trigger: '#manifiesto',
      start: 'top top',
      end: isMobile ? '+=120%' : '+=200%',
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
          const blur = 2 - 2 * t; // 2px → 0px
          gsap.set(word, {
            opacity: wordOpacity,
            filter: `blur(${blur}px)`,
          });
        });
      },
    });
  }

  // === Services section animations (Bento Grid) ===
  const servicesSection = document.querySelector('#servicios');

  if (servicesSection) {
    const servicesTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#servicios',
        start: 'top 75%',
        end: 'top 30%',
        toggleActions: 'play none none none',
      },
    });

    servicesTl
      .to('.services__label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to('.services__title-line', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
      }, 0.2);

    const serviceCards = document.querySelectorAll('.services__card');

    serviceCards.forEach((card, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }).to(card, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: i * 0.08,
        ease: 'power3.out',
      }, 0);
    });
  }

  // === Process section — timeline reveal ===
  const processSection = document.querySelector('#proceso');

  if (processSection) {
    const processTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#proceso',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    processTl
      .to('.process__label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .to('.process__title-line', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
      }, 0.2)
      .to('.process__header-desc', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.5);

    const processSteps = document.querySelectorAll('.process__step');

    processSteps.forEach((step, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }).to(step, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.1,
        ease: 'power3.out',
      }, 0);
    });
  }
}

// Export for potential reuse
export { gsap, ScrollTrigger };
