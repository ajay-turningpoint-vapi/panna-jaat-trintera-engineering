/* Mobile horizontal scroll card container — desktop shows normal grid */
export function ScrollCards({ children, cols = 3, className = "" }) {
  return (
    <>
      {/* Mobile: horizontal scroll */}
      <div className={`md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-none`}>
        {children.map((child, i) => (
          <div key={i} className="snap-start shrink-0 w-[80vw] max-w-[320px]">
            {child}
          </div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className={`hidden md:grid md:grid-cols-${cols === 3 ? "2" : "2"} lg:grid-cols-${cols} gap-6 ${className}`}>
        {children}
      </div>
    </>
  );
}
