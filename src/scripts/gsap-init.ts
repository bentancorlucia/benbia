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

  // === Services section animations ===
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
        clipPath: 'inset(0% 0 0% 0)',
        duration: 1,
        stagger: 0.12,
        ease: 'power4.inOut',
      }, 0.2);

    const serviceItems = document.querySelectorAll('.services__item');

    serviceItems.forEach((item) => {
      const line = item.querySelector('.services__item-line');
      const inner = item.querySelector('.services__item-inner');
      const lastLine = item.querySelector('.services__item-line--last');

      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (line) {
        itemTl.to(line, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        }, 0);
      }

      if (inner) {
        itemTl.to(inner, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        }, 0.15);
      }

      if (lastLine) {
        itemTl.to(lastLine, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        }, 0.3);
      }
    });
  }

  // === Process section — stacked deck on scroll ===
  const processCards = document.querySelectorAll('.process__card') as NodeListOf<HTMLElement>;
  const processPinned = document.querySelector('.process__pinned') as HTMLElement;

  if (processPinned && processCards.length > 0) {
    const totalCards = processCards.length;
    const STACK_OFFSET = 8;
    const STACK_SCALE = 0.03;

    const stackY = (depth: number) => depth * STACK_OFFSET;
    const stackScale = (depth: number) => 1 - depth * STACK_SCALE;
    const stackBright = (depth: number) => 1 - depth * 0.10;

    processCards.forEach((card, i) => {
      gsap.set(card, {
        y: stackY(i),
        scale: stackScale(i),
        zIndex: totalCards - i,
        opacity: 1,
        filter: `brightness(${stackBright(i)})`,
        rotation: 0,
        xPercent: 0,
      });
    });

    const transitions = totalCards - 1;
    const processHeader = processPinned.querySelector('.process__header') as HTMLElement;
    const processDeck = processPinned.querySelector('.process__deck') as HTMLElement;

    // Initial state: content ready to fade in
    gsap.set([processHeader, processDeck], { opacity: 0, y: 40 });

    const ENTER = 0.06;  // 6% of timeline for fade-in
    const EXIT = 0.08;   // 8% of timeline for fade-out
    const CARDS = 1 - ENTER - EXIT; // middle portion for card transitions

    const deckTl = gsap.timeline({
      scrollTrigger: {
        trigger: processPinned,
        start: 'top top',
        end: `+=${transitions * 150 + 60}%`,
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
      },
    });

    // === ENTER: smooth fade-in of header then deck ===
    deckTl.to(processHeader, {
      opacity: 1,
      y: 0,
      duration: ENTER * 0.6,
      ease: 'power2.out',
    }, 0);
    deckTl.to(processDeck, {
      opacity: 1,
      y: 0,
      duration: ENTER * 0.8,
      ease: 'power2.out',
    }, ENTER * 0.2);

    // === CARD TRANSITIONS ===
    for (let step = 0; step < transitions; step++) {
      const frontCard = processCards[step % totalCards];
      const backDepth = totalCards - 1;

      const seg = CARDS / transitions;
      const t = ENTER + step * seg;

      // Front card: lift up slightly then sweep to back
      deckTl.to(frontCard, {
        y: stackY(0) - 20,
        scale: 1,
        filter: 'brightness(1)',
        zIndex: totalCards + 1,
        duration: seg * 0.3,
        ease: 'power3.out',
      }, t);

      deckTl.to(frontCard, {
        y: stackY(backDepth),
        scale: stackScale(backDepth),
        filter: `brightness(${stackBright(backDepth)})`,
        zIndex: 0,
        duration: seg * 0.7,
        ease: 'power3.inOut',
      }, t + seg * 0.3);

      // Other cards glide forward
      for (let offset = 1; offset < totalCards; offset++) {
        const cardIdx = (step + offset) % totalCards;
        const card = processCards[cardIdx];
        const depthAfter = offset - 1;
        const isFront = depthAfter === 0;

        deckTl.to(card, {
          y: stackY(depthAfter),
          scale: isFront ? 1 : stackScale(depthAfter),
          filter: `brightness(${isFront ? 1 : stackBright(depthAfter)})`,
          zIndex: totalCards - depthAfter,
          duration: seg * 0.85,
          ease: 'power3.inOut',
        }, t + seg * 0.15);
      }
    }

    // === EXIT: smooth fade-out, deck first then header ===
    deckTl.to(processDeck, {
      opacity: 0,
      y: -30,
      duration: EXIT * 0.7,
      ease: 'power2.in',
    }, 1 - EXIT);
    deckTl.to(processHeader, {
      opacity: 0,
      y: -20,
      duration: EXIT * 0.8,
      ease: 'power2.in',
    }, 1 - EXIT * 0.7);
  }
}

// Export for potential reuse
export { gsap, ScrollTrigger };
