import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag ref={ref} className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function SplitText({ text, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span ref={ref} className={className} style={{ display: "inline-block" }}>{text}</span>;
  }

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", paddingRight: "0.28em" }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
