import { useEffect } from 'react';

// Observes every [data-reveal] element on the page and adds .is-revealed
// once it scrolls into view. Pass deps that change when async content
// renders so newly-added elements get observed too.
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const revealSelector = '[data-reveal]:not(.is-revealed)';
    const elements = document.querySelectorAll(revealSelector);

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

    // Some reveal elements (for example, gallery photos behind "View More")
    // are mounted after this effect runs. Register those nodes as they are
    // inserted so they do not remain permanently transparent.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.matches(revealSelector)) observer.observe(node);
          node.querySelectorAll(revealSelector).forEach((el) => observer.observe(el));
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
