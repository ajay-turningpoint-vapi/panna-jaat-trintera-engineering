import { cn } from "@/lib/utils";

export function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-[var(--accent-blue)] via-sky-400 to-[var(--accent-blue)] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient",
        className
      )}
    >
      {children}
    </span>
  );
}
