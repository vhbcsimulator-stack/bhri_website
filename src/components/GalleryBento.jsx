import { useState } from 'react';

// Modern bento-style image grid used by the Facilities and Developments
// galleries on ProjectDetailsPage. Tiles reveal with a staggered zoom-in
// and carry their own hover choreography (image zoom, title lift, icon pop).
// Wraps to new rows instead of scrolling; a "View More" button reveals
// the rest of the set beyond `initialCount`.
export default function GalleryBento({ items, wideFourth = false, onOpen, initialCount = 5 }) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, initialCount);
  const hiddenCount = items.length - initialCount;

  return (
    <div className="max-w-7xl mx-auto">
      <div
        data-reveal
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[190px] md:auto-rows-[220px] gap-4"
      >
        {visibleItems.map((item, index) => {
          let classes = '';
          if (index === 0) classes = 'col-span-2 row-span-2';
          else if (wideFourth && index === 3) classes = 'col-span-2';

          return (
            <button
              key={item.id || index}
              type="button"
              onClick={() => onOpen(index)}
              data-reveal="zoom"
              style={{ '--reveal-delay': `${Math.min(index * 0.06, 0.36)}s` }}
              className={`${classes} relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-black/30 cursor-button text-left transition-shadow duration-500`}
            >
              <img
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                src={item.image}
                loading="lazy"
              />

              {/* Base + hover gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-emerald/85 via-deep-emerald/5 to-transparent transition-opacity duration-500" />
              <div className="absolute inset-0 bg-deep-emerald/0 group-hover:bg-deep-emerald/10 transition-colors duration-500" />

              {/* Index badge */}
              <span className="absolute top-4 left-4 font-subhead-sm text-white/80 tracking-widest text-[11px] bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Zoom affordance */}
              {/* <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <span className="material-symbols-outlined text-lg">zoom_in</span>
              </span> */}

              {/* Title */}
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="font-headline-md text-white text-xl md:text-2xl transform group-hover:-translate-y-1.5 transition-transform duration-500 drop-shadow-sm">
                  {item.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-outline-variant/50 bg-surface-container-lowest hover:bg-primary hover:border-primary text-primary hover:text-on-primary font-subhead-sm uppercase tracking-wider text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>{expanded ? 'Show Less' : `View More Photos (+${hiddenCount})`}</span>
            <span className={`material-symbols-outlined text-lg transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
