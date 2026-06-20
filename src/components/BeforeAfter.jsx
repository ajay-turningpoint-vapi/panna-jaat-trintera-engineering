import { useEffect, useRef, useState } from "react";

export function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After" }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const getPos = (clientX) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPos(p);
  };

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) getPos(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", (e) => { if (dragging.current) getPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted select-none cursor-ew-resize"
      onMouseDown={(e) => { dragging.current = true; getPos(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; getPos(e.touches[0].clientX); }}
    >
      {/* After — full width base */}
      <img src={after} alt={afterLabel} loading="lazy" decoding="async"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none" />

      {/* Before — clipped left */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${pos}%` }}>
        <img src={before} alt={beforeLabel} loading="lazy" decoding="async"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, minWidth: "100%" }} />
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg border border-border flex items-center justify-center pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ink">
            <path d="M8 6L2 12l6 6M16 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 z-10 text-[10px] tracking-[0.3em] font-bold uppercase bg-ink/90 text-white px-2 py-1 rounded pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 z-10 text-[10px] tracking-[0.3em] font-bold uppercase bg-accent-blue text-white px-2 py-1 rounded pointer-events-none">
        {afterLabel}
      </span>
    </div>
  );
}
