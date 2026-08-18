import { useRef, useState, useEffect } from "react";

export function HScrollCarousel({
  children,
  className = "",
  itemClassName = "",
  desktopClassName = "",
}) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = children.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const firstChild = track.firstElementChild;
      if (!firstChild) return;
      const snapWidth = firstChild.offsetWidth + 16; // width + gap-4
      const idx = Math.round(track.scrollLeft / snapWidth);
      setActive(Math.max(0, Math.min(idx, count - 1)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count]);

  const scrollTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const firstChild = track.firstElementChild;
    if (!firstChild) return;
    const snapWidth = firstChild.offsetWidth + 16; // width + gap-4
    track.scrollTo({ left: snapWidth * i, behavior: "smooth" });
  };

  return (
    <>
      {/* ── MOBILE carousel ── */}
      <div className={`md:hidden ${className}`}>
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-none items-stretch"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className={`snap-start shrink-0 w-[80vw] max-w-[320px] ${itemClassName}`}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Dot indicators and controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => scrollTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-white text-ink disabled:opacity-30 disabled:pointer-events-none hover:bg-accent-blue/5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className="flex justify-center gap-2">
            {children.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-accent-blue"
                    : "w-2 h-2 bg-border hover:bg-steel"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollTo(active + 1)}
            disabled={active === count - 1}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-white text-ink disabled:opacity-30 disabled:pointer-events-none hover:bg-accent-blue/5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        {/* Swipe hint */}
        <p className="text-center text-[10px] tracking-widest uppercase text-steel/50 mt-3 select-none">
          Swipe to explore
        </p>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className="hidden md:contents">
        <div className={desktopClassName}>
          {children}
        </div>
      </div>
    </>
  );
}
