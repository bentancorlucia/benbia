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
  gsap.set('.reveal', { opacity: 0, y: 40 });

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
}
