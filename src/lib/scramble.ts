// Shared pieces of the "decrypt" text effect (used by DecryptText and the menu).

// Lowercase letters, digits and symbols, minus the very widest glyphs (m, w, @, %, &).
export const CHARSET = 'abcdefghijklnopqrstuvxyz0123456789#$*+=?/<>!';
export const TICK = 42; // how often the unresolved characters re-roll, in ms
export const smooth = (x: number) => x * x * (3 - 2 * x); // gentle start and finish
export const randomChar = () => CHARSET[(Math.random() * CHARSET.length) | 0];

/**
 * Fill `el` with scrambled characters and resolve them, left to right, into `text`.
 * The text keeps its length throughout. `delay` holds it fully scrambled before it
 * starts resolving (for staggering a list). Returns a function that stops it early;
 * `onEnd` runs once, whether it finished or was stopped.
 */
export function resolveText(
  el: HTMLElement,
  text: string,
  { duration = 420, delay = 0, onEnd }: { duration?: number; delay?: number; onEnd?: () => void } = {},
): () => void {
  const start = performance.now() + delay;
  let raf = 0;
  let lastRoll = -Infinity;
  let rolled = '';
  let ended = false;
  const end = () => {
    if (ended) return;
    ended = true;
    cancelAnimationFrame(raf);
    onEnd?.();
  };
  const step = (now: number) => {
    const p = Math.min(1, Math.max(0, (now - start) / duration));
    const resolved = Math.floor(smooth(p) * text.length);
    if (now - lastRoll >= TICK) {
      lastRoll = now;
      rolled = '';
      for (const ch of text) rolled += ch === ' ' ? ' ' : randomChar();
    }
    el.textContent = text.slice(0, resolved) + rolled.slice(resolved);
    if (p < 1) raf = requestAnimationFrame(step);
    else end();
  };
  step(performance.now());
  return end;
}
