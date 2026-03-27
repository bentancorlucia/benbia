import { gsap, ScrollTrigger } from './gsap-init';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  // === Batch reveal for .reveal elements ===
  ScrollTrigger.batch('.reveal', {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        overwrite: true,
      });
    },
    start: 'top 85%',
    once: true,
  });

  // Set initial state for reveal elements
  gsap.set('.reveal', { opacity: 0, y: 40 });

  // === Reveal variants ===

  // Scale reveal
  ScrollTrigger.batch('.reveal-scale', {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'back.out(1.2)',
        stagger: 0.1,
        overwrite: true,
      });
    },
    start: 'top 85%',
    once: true,
  });
  gsap.set('.reveal-scale', { opacity: 0, scale: 0.92 });

  // Blur reveal
  ScrollTrigger.batch('.reveal-blur', {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
        overwrite: true,
      });
    },
    start: 'top 85%',
    once: true,
  });
  gsap.set('.reveal-blur', { opacity: 0, filter: 'blur(12px)' });

  // Left reveal
  ScrollTrigger.batch('.reveal-left', {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        overwrite: true,
      });
    },
    start: 'top 85%',
    once: true,
  });
  gsap.set('.reveal-left', { opacity: 0, x: -40 });

  // Right reveal
  ScrollTrigger.batch('.reveal-right', {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        overwrite: true,
      });
    },
    start: 'top 85%',
    once: true,
  });
  gsap.set('.reveal-right', { opacity: 0, x: 40 });

  // === Section dividers ===
  document.querySelectorAll('.section-divider').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => el.classList.add('is-visible'),
    });
  });

  // === Process timeline line draw ===
  const processLine = document.getElementById('process-line');
  if (processLine) {
    const lineLength = processLine.getBoundingClientRect().height || 500;
    gsap.set(processLine, {
      strokeDasharray: lineLength,
      strokeDashoffset: lineLength,
    });

    ScrollTrigger.create({
      trigger: '.process__timeline',
      start: 'top 70%',
      end: 'bottom 30%',
      onUpdate: (self) => {
        gsap.set(processLine, {
          strokeDashoffset: lineLength * (1 - self.progress),
        });
      },
    });
  }

  // === Process step dots pulse on enter ===
  const processDots = document.querySelectorAll('.process__step-dot-inner');
  processDots.forEach((dot) => {
    ScrollTrigger.create({
      trigger: dot,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(dot, {
          scale: 0,
        }, {
          scale: 1,
          duration: 0.6,
          ease: 'back.out(2)',
        });
      },
    });
  });

  // Services animations are handled in gsap-init.ts

  // === Portfolio mockup entrance ===
  const mockupDesktop = document.querySelector('.mockup-desktop');
  const mockupMobile = document.querySelector('.mockup-mobile');

  if (mockupDesktop) {
    gsap.set(mockupDesktop, { opacity: 0, y: 30 });
    ScrollTrigger.create({
      trigger: '.portfolio',
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(mockupDesktop, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
        if (mockupMobile) {
          gsap.fromTo(mockupMobile, {
            opacity: 0,
            y: 40,
            x: 20,
          }, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            delay: 0.25,
            ease: 'power3.out',
          });
        }
      },
    });
  }

  // === Contact section entrance ===
  const contactText = document.querySelector('.contact__text');
  const contactForm = document.querySelector('.contact__form');

  if (contactText && contactForm) {
    gsap.set(contactText, { opacity: 0, x: -30 });
    gsap.set(contactForm, { opacity: 0, x: 30 });

    ScrollTrigger.create({
      trigger: '.contact',
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to(contactText, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
        gsap.to(contactForm, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
        });
      },
    });
  }

  // Manifesto blob animations are handled in gsap-init.ts

}
