/**
 * motion.js — the site's animation layer.
 *
 * One place for Lenis smooth-scroll setup and a small kit of GSAP-powered
 * Svelte actions (reveal, line-mask reveal, parallax, magnetic, spotlight,
 * count-up). Everything degrades to static/instant under prefers-reduced-motion,
 * and every action is SSR-safe (no-ops on the server).
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const isBrowser = typeof window !== 'undefined';
const prefersReduced = () =>
  isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let registered = false;
export function ensureGsap() {
  if (isBrowser && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Init Lenis + drive ScrollTrigger from it. Returns a cleanup fn. */
export function initSmoothScroll() {
  if (!isBrowser) return () => {};
  ensureGsap();
  if (prefersReduced()) return () => {};

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6
  });

  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  // expose for anchor links / nav
  window.__lenis = lenis;

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    window.__lenis = null;
  };
}

/** Smoothly scroll to a target (selector, element, or y) via Lenis if present. */
export function scrollTo(target, opts = {}) {
  if (!isBrowser) return;
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -80, ...opts });
  else if (target?.scrollIntoView) target.scrollIntoView({ behavior: 'smooth' });
}

/**
 * reveal — fade + rise into view. Pass { children: true } to stagger direct
 * children instead of the node itself.
 */
export function reveal(node, opts = {}) {
  if (!isBrowser) return {};
  ensureGsap();
  const {
    y = 30,
    opacity = 0,
    duration = 0.95,
    delay = 0,
    stagger = 0.09,
    start = 'top 86%',
    children = false
  } = opts;

  const targets = children ? Array.from(node.children) : node;

  if (prefersReduced()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return {};
  }

  const tween = gsap.from(targets, {
    y,
    opacity,
    duration,
    delay,
    stagger: children ? stagger : 0,
    ease: 'power3.out',
    scrollTrigger: { trigger: node, start, once: true }
  });

  return {
    destroy() {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    }
  };
}

/**
 * intro — like reveal, but fires immediately on mount (no ScrollTrigger).
 * Use for above-the-fold hero elements that must always animate in on load,
 * regardless of where they sit relative to the fold.
 */
export function intro(node, opts = {}) {
  if (!isBrowser) return {};
  ensureGsap();
  const { y = 30, opacity = 0, duration = 1, delay = 0, stagger = 0.09, children = false } = opts;
  const targets = children ? Array.from(node.children) : node;

  if (prefersReduced()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return {};
  }

  const tween = gsap.from(targets, {
    y,
    opacity,
    duration,
    delay,
    stagger: children ? stagger : 0,
    ease: 'power3.out'
  });
  return { destroy() { tween.kill(); } };
}

/** introLines — line-mask reveal on mount (no ScrollTrigger). For hero headlines. */
export function introLines(node, opts = {}) {
  if (!isBrowser) return {};
  ensureGsap();
  const { duration = 1.05, stagger = 0.12, delay = 0.1 } = opts;
  const lines = node.querySelectorAll('.ln');

  if (prefersReduced()) {
    gsap.set(lines, { yPercent: 0, opacity: 1 });
    return {};
  }

  const tween = gsap.from(lines, {
    yPercent: 115,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: 'power4.out'
  });
  return { destroy() { tween.kill(); } };
}

/**
 * linesUp — cinematic line-mask reveal. Markup must contain children with the
 * class `.ln` wrapped by an `overflow:hidden` parent (.line). Animates each
 * `.ln` up from below its mask, staggered.
 */
export function linesUp(node, opts = {}) {
  if (!isBrowser) return {};
  ensureGsap();
  const { duration = 1.05, stagger = 0.12, delay = 0.05, start = 'top 88%' } = opts;
  const lines = node.querySelectorAll('.ln');

  if (prefersReduced()) {
    gsap.set(lines, { yPercent: 0, opacity: 1 });
    return {};
  }

  const tween = gsap.from(lines, {
    yPercent: 115,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: 'power4.out',
    scrollTrigger: { trigger: node, start, once: true }
  });

  return {
    destroy() {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    }
  };
}

/** parallax — subtle scrubbed vertical drift. amount in % of element height. */
export function parallax(node, opts = {}) {
  if (!isBrowser || prefersReduced()) return {};
  ensureGsap();
  const { amount = 14, start = 'top bottom', end = 'bottom top' } = opts;

  const tween = gsap.fromTo(
    node,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: { trigger: node, start, end, scrub: true }
    }
  );

  return {
    destroy() {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    }
  };
}

/** magnetic — element eases toward the cursor while hovered. */
export function magnetic(node, opts = {}) {
  if (!isBrowser || prefersReduced()) return {};
  ensureGsap();
  const { strength = 0.35 } = opts;
  const xTo = gsap.quickTo(node, 'x', { duration: 0.6, ease: 'power3.out' });
  const yTo = gsap.quickTo(node, 'y', { duration: 0.6, ease: 'power3.out' });

  const move = (e) => {
    const r = node.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    xTo(mx * strength);
    yTo(my * strength);
  };
  const reset = () => {
    xTo(0);
    yTo(0);
  };

  node.addEventListener('pointermove', move);
  node.addEventListener('pointerleave', reset);

  return {
    destroy() {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', reset);
    }
  };
}

/** spotlight — writes --mx/--my CSS vars so a card can light up under the cursor. */
export function spotlight(node) {
  if (!isBrowser) return {};
  const move = (e) => {
    const r = node.getBoundingClientRect();
    node.style.setProperty('--mx', `${e.clientX - r.left}px`);
    node.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  node.addEventListener('pointermove', move);
  return {
    destroy() {
      node.removeEventListener('pointermove', move);
    }
  };
}

/** countUp — animate a number from 0 to target when it scrolls into view. */
export function countUp(node, opts = {}) {
  if (!isBrowser) return {};
  ensureGsap();
  const { to = 0, duration = 1.8, delay = 0, prefix = '', suffix = '', onLoad = false } = opts;
  const format = (v) => `${prefix}${Math.round(v)}${suffix}`;

  if (prefersReduced()) {
    node.textContent = format(to);
    return {};
  }

  node.textContent = format(0);
  const state = { v: 0 };
  const tween = gsap.to(state, {
    v: to,
    duration,
    delay,
    ease: 'power2.out',
    onUpdate: () => (node.textContent = format(state.v)),
    // hero stats animate on load; below-the-fold stats wait for scroll
    scrollTrigger: onLoad ? undefined : { trigger: node, start: 'top 90%', once: true }
  });

  return {
    destroy() {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    }
  };
}
