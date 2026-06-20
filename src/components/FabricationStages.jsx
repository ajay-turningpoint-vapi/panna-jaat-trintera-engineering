import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    n: "01",
    title: "Cutting",
    copy: "CRCA sheet enters our 3kW fiber laser. Tolerances held to ±0.1 mm across 2500×1250 plates — every cut nest is QA-stamped before bending.",
    tag: "Fiber laser · ±0.1 mm",
  },
  {
    n: "02",
    title: "Bending",
    copy: "Hydraulic CNC press-brakes form the leg profiles in a single pass. Bend radii match structural targets so welded joints never carry hidden stress.",
    tag: "CNC press-brake · 100T",
  },
  {
    n: "03",
    title: "Forming",
    copy: "MIG-welded sub-assemblies are jigged on dedicated frames. Squareness, parallelism and weld penetration are inspected at every joint, every shift.",
    tag: "MIG · jig-checked",
  },
  {
    n: "04",
    title: "Powder Coat",
    copy: "Seven-tank pre-treatment strips oils and phosphates the steel. Electrostatic spray lays a uniform 60-micron powder film with edge-to-edge coverage.",
    tag: "60µm electrostatic film",
  },
  {
    n: "05",
    title: "Bake Cure",
    copy: "Frames roll into a 200°C convection oven for a 20-minute cross-link cure. The powder fuses into a hard, scuff-proof finish ready for a decade of daily use.",
    tag: "200°C · 20 min · IR-monitored",
  },
];

export function FabricationStages() {
  const ref = useRef(null);
  const fxRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (reduce) return;
    const root = fxRef.current;
    const section = ref.current;
    if (!root || !section) return;

    const ctx = gsap.context(() => {
      const mk = (sel) => root.querySelectorAll(sel);
      const stTotal = { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6 };

      // STAGE 01 — Cutting
      gsap.fromTo(mk(".fx-laser"), { x: -180, opacity: 0 }, {
        x: 180, opacity: 1, ease: "none",
        scrollTrigger: { ...stTotal, start: "top top", end: "25% bottom" },
      });
      gsap.fromTo(mk(".fx-spark"), { scale: 0, opacity: 0 }, {
        scale: 1.4, opacity: 1, stagger: 0.04, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "18% top", end: "28% top", scrub: 0.4 },
      });
      gsap.to(mk(".fx-spark"), {
        opacity: 0, scale: 0.2,
        scrollTrigger: { trigger: section, start: "28% top", end: "35% top", scrub: 0.4 },
      });

      // STAGE 02 — Bending
      gsap.fromTo(mk(".fx-ram"), { y: -120, opacity: 0 }, {
        y: 0, opacity: 1, ease: "power3.in",
        scrollTrigger: { trigger: section, start: "26% top", end: "45% top", scrub: 0.5 },
      });
      gsap.fromTo(mk(".fx-ram-shock"), { scaleX: 0, opacity: 0 }, {
        scaleX: 1, opacity: 0.6,
        scrollTrigger: { trigger: section, start: "42% top", end: "52% top", scrub: 0.3 },
      });

      // STAGE 03 — Forming
      gsap.fromTo(mk(".fx-weld"), { opacity: 0, scale: 0.6 }, {
        opacity: 1, scale: 1,
        scrollTrigger: { trigger: section, start: "52% top", end: "62% top", scrub: 0.3 },
      });
      gsap.to(mk(".fx-weld"), {
        opacity: 0.2, repeat: -1, yoyo: true, duration: 0.08, ease: "steps(2)",
      });
      gsap.fromTo(mk(".fx-weld-spark"), { y: -20, opacity: 0 }, {
        y: 80, opacity: 1, stagger: 0.05, ease: "power1.in",
        scrollTrigger: { trigger: section, start: "55% top", end: "72% top", scrub: 0.6 },
      });

      // STAGE 04 — Powder Coat
      gsap.fromTo(mk(".fx-mist"), { opacity: 0, y: 40, scale: 0.8 }, {
        opacity: 0.7, y: 0, scale: 1.2, stagger: 0.08, ease: "sine.out",
        scrollTrigger: { trigger: section, start: "60% top", end: "78% top", scrub: 0.8 },
      });
      gsap.fromTo(mk(".fx-spray"), { scaleY: 0, opacity: 0 }, {
        scaleY: 1, opacity: 0.55, transformOrigin: "top center",
        scrollTrigger: { trigger: section, start: "62% top", end: "76% top", scrub: 0.4 },
      });

      // STAGE 05 — Bake Cure
      gsap.fromTo(mk(".fx-oven"), { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1.05,
        scrollTrigger: { trigger: section, start: "80% top", end: "95% bottom", scrub: 0.4 },
      });
      gsap.to(mk(".fx-oven"), {
        opacity: 0.55, repeat: -1, yoyo: true, duration: 1.4, ease: "sine.inOut",
      });
      gsap.fromTo(mk(".fx-bake-heat"), { opacity: 0, y: 30 }, {
        opacity: 0.8, y: -40, stagger: 0.07, ease: "sine.out",
        scrollTrigger: { trigger: section, start: "82% top", end: "100% bottom", scrub: 0.6 },
      });
      gsap.fromTo(mk(".fx-thermo-fill"), { scaleY: 0 }, {
        scaleY: 1, transformOrigin: "bottom center", ease: "none",
        scrollTrigger: { trigger: section, start: "80% top", end: "100% bottom", scrub: 0.3 },
      });

      // Label crossfades
      const total = STAGES.length;
      gsap.utils.toArray(".fx-label").forEach((el, i) => {
        const seg = 1 / total;
        const s = i * seg;
        gsap.fromTo(el, { autoAlpha: 0, y: 12 }, {
          autoAlpha: 1, y: 0,
          scrollTrigger: { trigger: section, start: `${(s + 0.01) * 100}% top`, end: `${(s + 0.05) * 100}% top`, scrub: true },
        });
        gsap.to(el, {
          autoAlpha: 0, y: -12,
          scrollTrigger: { trigger: section, start: `${(s + seg - 0.04) * 100}% top`, end: `${(s + seg) * 100}% top`, scrub: true },
        });
      });
    }, fxRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={ref}
      id="process"
      className="relative bg-ink text-white"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 blueprint-bg opacity-20" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.06) 40%, transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="relative pt-24 pb-6 px-6">
          <div className="mx-auto max-w-7xl flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
                <span className="font-serif italic text-base normal-case tracking-normal mr-2">03</span>
                — Fabrication
              </div>
              <h2 className="mt-3 text-4xl md:text-6xl font-bold leading-[0.95] max-w-3xl">
                Raw sheet to <span className="font-serif italic text-accent-blue">precision frame</span>.
              </h2>
            </div>
            <ProgressBar progress={scrollYProgress} />
          </div>
        </div>

        {/* Stage */}
        <div className="relative flex-1 px-6">
          <div className="mx-auto max-w-7xl h-full grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative h-[55vh] lg:h-[70vh] flex items-center justify-center">
              <BuildSVG progress={scrollYProgress} reduce={!!reduce} />
              <MicroFX fxRef={fxRef} />
            </div>

            <div className="lg:col-span-6 relative">
              {STAGES.map((s, i) => (
                <StageCopy key={s.n} stage={s} index={i} progress={scrollYProgress} total={STAGES.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressBar({ progress }) {
  const w = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="w-full sm:w-72 max-w-full">
      <div className="flex justify-between text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">
        <span>Stage</span>
        <motion.span style={{ opacity: useTransform(progress, [0, 1], [0.4, 1]) }}>Scroll →</motion.span>
      </div>
      <div className="h-px w-full bg-white/15 overflow-hidden">
        <motion.div style={{ width: w }} className="h-full bg-accent-blue" />
      </div>
    </div>
  );
}

function StageCopy({
  stage, index, progress, total,
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;

  let opacityRange;
  let opacityOutput;
  if (index === 0) {
    opacityRange = [0, Math.max(0, end - 0.05), Math.min(1, end + 0.05)];
    opacityOutput = [1, 1, 0];
  } else if (index === total - 1) {
    opacityRange = [Math.max(0, start - 0.05), Math.min(1, start + 0.05), 1];
    opacityOutput = [0, 1, 1];
  } else {
    opacityRange = [
      Math.max(0, start - 0.05),
      Math.min(1, start + 0.05),
      Math.max(0, end - 0.05),
      Math.min(1, end + 0.05),
    ];
    opacityOutput = [0, 1, 1, 0];
  }

  const opacity = useTransform(progress, opacityRange, opacityOutput);
  const y = useTransform(progress, [start, end], [30, -30]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="font-serif italic text-7xl md:text-9xl text-accent-blue/70 leading-none">{stage.n}</div>
      <h3 className="mt-4 text-4xl md:text-5xl font-bold">{stage.title}</h3>
      <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed max-w-lg">{stage.copy}</p>
      <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-widest text-white/70 font-mono">
        {stage.tag}
      </div>
    </motion.div>
  );
}

function BuildSVG({ progress, reduce }) {
  const p = progress;

  const sheetOpacity = useTransform(p, [0, 0.25, 0.35], [1, 1, 0.15]);
  const cutsDash = useTransform(p, [0.1, 0.35], [200, 0]);
  const cutsOpacity = useTransform(p, [0.1, 0.25, 0.55], [0, 1, 0.3]);
  const bendLeft = useTransform(p, [0.4, 0.65], [0, -38]);
  const bendRight = useTransform(p, [0.4, 0.65], [0, 38]);
  const worktopY = useTransform(p, [0.5, 0.75], [-60, 0]);
  const worktopOpacity = useTransform(p, [0.5, 0.7], [0, 1]);
  const finishColor = useTransform(p, [0.7, 0.95], ["#3a4a66", "#0d2b66"]);
  const finishGlow = useTransform(p, [0.75, 1], [0, 0.6]);

  return (
    <svg viewBox="0 0 600 600" className="w-full h-full max-w-[560px]">
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#94a3b8" />
          <stop offset="0.5" stopColor="#cbd5e1" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <g opacity="0.18" stroke="white" strokeWidth="0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="0" y1={60 * i} x2="600" y2={60 * i} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={60 * i} y1="0" x2={60 * i} y2="600" />
        ))}
      </g>

      <motion.rect
        x="100" y="220" width="400" height="160" rx="4"
        fill="url(#metal)"
        style={{ opacity: sheetOpacity }}
      />
      <motion.g style={{ opacity: sheetOpacity }}>
        <text x="120" y="248" fill="#0f172a" fontSize="11" fontFamily="monospace" opacity="0.6">CRCA · 1.6mm · 2500×1250</text>
      </motion.g>

      <motion.g style={{ opacity: cutsOpacity }} stroke="var(--accent-blue)" strokeWidth="1.6" fill="none">
        <motion.path d="M180 220 L180 380" strokeDasharray="200" style={{ strokeDashoffset: cutsDash }} />
        <motion.path d="M420 220 L420 380" strokeDasharray="200" style={{ strokeDashoffset: cutsDash }} />
        <motion.path d="M100 300 L500 300" strokeDasharray="400" style={{ strokeDashoffset: cutsDash }} />
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.circle key={i} cx={210 + i * 15} cy="260" r="2.5" fill="var(--accent-blue)" />
        ))}
      </motion.g>

      <g transform="translate(300 360)">
        <motion.rect
          x="-180" y="-60" width="360" height="14" rx="2"
          fill="url(#metal)"
          style={{ y: worktopY, opacity: worktopOpacity }}
        />
        <motion.g style={{ rotate: bendLeft, originX: -160, originY: -40 }}>
          <motion.rect
            x="-170" y="-50" width="20" height="110" rx="2"
            style={{ fill: finishColor }}
          />
        </motion.g>
        <motion.g style={{ rotate: bendRight, originX: 160, originY: -40 }}>
          <motion.rect
            x="150" y="-50" width="20" height="110" rx="2"
            style={{ fill: finishColor }}
          />
        </motion.g>
        <motion.rect
          x="-150" y="20" width="300" height="8" rx="2"
          style={{ fill: finishColor, opacity: worktopOpacity }}
        />
        <motion.g style={{ opacity: worktopOpacity }}>
          <motion.rect
            x="-130" y="-40" width="260" height="55" rx="2"
            style={{ fill: finishColor, opacity: 0.85 }}
          />
          {Array.from({ length: 22 }).map((_, i) => (
            <circle key={i} cx={-115 + (i % 11) * 24} cy={-25 + Math.floor(i / 11) * 22} r="2" fill="#0a0f1f" opacity="0.45" />
          ))}
        </motion.g>
      </g>

      <motion.ellipse
        cx="300" cy="470" rx="200" ry="14"
        fill="var(--accent-blue)"
        style={{ opacity: finishGlow }}
        filter="url(#glow)"
      />
      <motion.ellipse cx="300" cy="478" rx="180" ry="8" fill="black" opacity="0.35" style={{ opacity: worktopOpacity }} />
    </svg>
  );
}

function MicroFX({ fxRef }) {
  return (
    <div ref={fxRef} className="pointer-events-none absolute inset-0">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">
        {STAGES.map((s) => (
          <span key={s.n} className="fx-label opacity-0 px-2 py-1 rounded bg-white/5 border border-white/10">
            {s.n} · {s.title}
          </span>
        ))}
      </div>

      <div className="fx-laser absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="relative">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-b from-white to-slate-400 shadow-[0_0_18px_4px_rgba(120,200,255,0.6)]" />
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-cyan-300 via-blue-400 to-transparent" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="fx-spark absolute block w-1 h-1 rounded-full bg-amber-300 shadow-[0_0_8px_2px_rgba(251,191,36,0.7)]"
            style={{ left: `${(i - 6) * 6}px`, top: `${Math.sin(i) * 10}px` }}
          />
        ))}
      </div>

      <div className="fx-ram absolute top-[18%] left-1/2 -translate-x-1/2 w-40 h-10 rounded-b-md bg-gradient-to-b from-slate-300 to-slate-500 shadow-[0_8px_0_-2px_rgba(0,0,0,0.4)]">
        <div className="absolute -bottom-1 left-2 right-2 h-1 bg-accent-blue rounded" />
      </div>
      <div className="fx-ram-shock absolute top-[42%] left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white to-transparent origin-center" />

      <div className="fx-weld absolute top-[55%] left-[58%] w-6 h-6 rounded-full bg-white opacity-0 mix-blend-screen shadow-[0_0_30px_12px_rgba(180,220,255,0.9)]" />
      <div className="absolute top-[55%] left-[58%]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="fx-weld-spark absolute block w-0.5 h-2 bg-amber-400 shadow-[0_0_6px_rgba(251,146,60,0.9)]"
            style={{ left: `${(i - 5) * 4}px`, transform: `rotate(${(i - 5) * 8}deg)` }}
          />
        ))}
      </div>

      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="fx-mist absolute rounded-full bg-accent-blue/30 blur-2xl"
          style={{ width: 80 + i * 10, height: 80 + i * 10, left: `${20 + i * 8}%`, top: `${30 + (i % 3) * 18}%` }}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={`spray-${i}`}
          className="fx-spray absolute block w-px h-24 bg-gradient-to-b from-white/80 via-accent-blue/40 to-transparent"
          style={{ left: `${42 + i * 4}%`, top: "32%", transform: `rotate(${(i - 2) * 6}deg)` }}
        />
      ))}

      <div className="fx-oven absolute inset-x-10 bottom-10 h-32 rounded-full bg-orange-500/40 blur-3xl opacity-0" />
      <div className="absolute inset-x-12 bottom-12 h-3 rounded bg-gradient-to-r from-amber-400/0 via-orange-400/70 to-amber-400/0 blur-md fx-oven opacity-0" />
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={`heat-${i}`}
          className="fx-bake-heat absolute block w-6 h-16 rounded-full bg-gradient-to-t from-orange-300/40 to-transparent blur-md opacity-0"
          style={{ left: `${28 + i * 7}%`, bottom: "22%" }}
        />
      ))}
      <div className="absolute right-6 bottom-12 w-3 h-32 rounded-full bg-white/10 border border-white/15 overflow-hidden">
        <div className="fx-thermo-fill absolute inset-0 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200" />
      </div>
      <span className="absolute right-10 bottom-12 text-[9px] font-mono uppercase tracking-[0.2em] text-white/60">200°C</span>
    </div>
  );
}
