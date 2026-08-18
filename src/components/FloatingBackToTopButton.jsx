import { useEffect, useState } from 'react';

const SHOW_AFTER_PX = 400;

/** Public-site shortcut that appears once the visitor has moved beyond the top of the page. */
export function FloatingBackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollTop = window.scrollY
        || document.documentElement.scrollTop
        || document.body.scrollTop;

      setIsVisible(scrollTop > SHOW_AFTER_PX);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    document.addEventListener('scroll', updateVisibility, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      document.removeEventListener('scroll', updateVisibility, { capture: true });
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      className={`cursor-pointer group fixed bottom-5 right-5 z-[60] inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_8px_24px_rgba(0,67,33,0.3)] transition-[opacity,transform,background-color,box-shadow] duration-200 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[0_12px_30px_rgba(0,67,33,0.38)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 motion-reduce:transform-none sm:bottom-7 sm:right-7 ${
        isVisible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      tabIndex={isVisible ? 0 : -1}
    >
      <span
        aria-hidden="true"
        className="material-symbols-outlined text-xl leading-none transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none"
      >
        arrow_upward
      </span>
    </button>
  );
}

export default FloatingBackToTopButton;
