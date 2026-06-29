/**
 * motion.js — the site's animation layer (calm edition).
 *
 * Lenis smooth-scroll setup plus a single gentle `reveal` action (fade + rise
 * into view). Everything degrades to static/instant under prefers-reduced-motion,
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
 * reveal — gentle fade + rise into view. Pass { children: true } to stagger
 * direct children instead of the node itself.
 */
export function reveal(node, opts = {}) {
  if (!isBrowser) return {};
  ensureGsap();
  const {
    y = 18,
    opacity = 0,
    duration = 0.7,
    delay = 0,
    stagger = 0.08,
    start = 'top 88%',
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
