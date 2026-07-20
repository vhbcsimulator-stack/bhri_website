import { useEffect } from 'react';

// Observes every [data-reveal] element on the page and adds .is-revealed
// once it scrolls into view. Pass deps that change when async content
// renders so newly-added elements get observed too.
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
    if (elements.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
