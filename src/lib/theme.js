import { readable } from 'svelte/store';

const KEY = 'theme';
const isBrowser = typeof document !== 'undefined';

export function getTheme() {
  if (!isBrowser) return 'light';
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export function setTheme(t) {
  if (!isBrowser) return;
  const next = t === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(KEY, next); } catch (e) {}
  document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/** Readable store that tracks the current theme. */
export const theme = readable(getTheme(), (set) => {
  if (!isBrowser) return;
  set(getTheme());
  const handler = (e) => set(e.detail);
  document.addEventListener('themechange', handler);
  return () => document.removeEventListener('themechange', handler);
});
