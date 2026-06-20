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
      const { scrollLeft, clientWidth } = track;
      const idx = Math.round(scrollLeft / clientWidth);
      setActive(Math.min(idx, count - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count]);

  const scrollTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * i, behavior: "smooth" });
  };

  return (
    <>
      {/* ── MOBILE carousel ── */}
      <div className={`md:hidden ${className}`}>
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-none"
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

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
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
