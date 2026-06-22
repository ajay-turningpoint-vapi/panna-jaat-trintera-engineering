export function Logo({ className = "", mono = false, titleColor }) {
  const primary = "var(--accent-blue)";
  const dark = titleColor ?? (mono ? "currentColor" : "#ffffff");
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Trinetra Engineering"
        width="40"
        height="40"
        className="object-contain"
      />
      <div className="leading-none">
        <div className="text-[15px] font-bold tracking-[0.18em]" style={{ color: dark }}>
          TRINETRA
        </div>
        <div className="text-[10px] font-medium tracking-[0.32em]" style={{ color: primary }}>
          ENGINEERING
        </div>
      </div>
    </div>
  );
}
