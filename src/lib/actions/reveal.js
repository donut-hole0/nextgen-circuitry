/**
 * reveal — Svelte action for smooth scroll-into-view animations.
 *
 * Adds the class `is-revealed` to an element the first time it scrolls into
 * view, letting CSS handle the actual transition. Respects users who have
 * `prefers-reduced-motion` set — they see content immediately, no movement.
 *
 * Usage:
 *   <div use:reveal>...</div>
 *   <div use:reveal={{ delay: 120 }}>...</div>
 */
export function reveal(node, options = {}) {
  const { delay = 0, threshold = 0.15, once = true } = options;

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    node.classList.add('is-revealed');
    return {};
  }

  node.classList.add('reveal');
  if (delay) node.style.transitionDelay = `${delay}ms`;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add('is-revealed');
          if (once) observer.unobserve(node);
        } else if (!once) {
          node.classList.remove('is-revealed');
        }
      }
    },
    { threshold, rootMargin: '0px 0px -8% 0px' }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
