import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function NumberTicker({ value, decimalPlaces = 0, className = "", prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, motionVal, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix +
          Intl.NumberFormat("en-IN", { maximumFractionDigits: decimalPlaces }).format(
            Number(latest.toFixed(decimalPlaces))
          ) +
          suffix;
      }
    });
  }, [spring, decimalPlaces, prefix, suffix]);

  return <span ref={ref} className={className}>0</span>;
}
