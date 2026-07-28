// Sticky navbar height (logo h-12 + py-4 top/bottom) plus a little breathing room.
export const STICKY_OFFSET = 96;

// Scrolls the window so the element with `id` sits just below the sticky navbar.
// Returns true if the element existed and we scrolled.
export function scrollToId(id, offset = STICKY_OFFSET) {
  const element = document.getElementById(id);
  if (!element) return false;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  return true;
}

// Same as scrollToId, but keeps retrying for a short while so it still works
// when the target section is rendered after async content loads.
export function scrollToIdWhenReady(id, offset = STICKY_OFFSET, timeout = 2000) {
  const deadline = Date.now() + timeout;
  let frame = 0;

  const attempt = () => {
    if (scrollToId(id, offset)) return;
    if (Date.now() > deadline) return;
    frame = requestAnimationFrame(attempt);
  };

  attempt();
  return () => cancelAnimationFrame(frame);
}
