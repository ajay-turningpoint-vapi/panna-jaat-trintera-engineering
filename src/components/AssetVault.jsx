import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Box, Layers3, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

const formats = [
  {
    icon: FileText,
    label: "AutoCAD",
    ext: ".dwg",
    note: "2D blocks at 1:50 with seat / leg / raceway layers pre-tagged.",
  },
  {
    icon: Box,
    label: "Revit",
    ext: ".rfa",
    note: "Parametric families with worksurface, mounts and clearance zones.",
  },
  {
    icon: Layers3,
    label: "SketchUp",
    ext: ".skp",
    note: "Low-poly 3D for fit-out walkthroughs and concept renders.",
  },
  {
    icon: Box,
    label: "STEP / IGES",
    ext: ".stp",
    note: "Solid CAD for interference checks against MEP and ceiling grids.",
  },
];

function DisplayCard({ icon, title, description, ext, className, style }) {
  return (
    <motion.div
      style={style}
      className={cn(
        "group relative flex h-38 w-full max-w-[20rem] sm:max-w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-border/80 bg-white/95 shadow-md hover:shadow-xl backdrop-blur-sm px-5 py-4 transition-all duration-300 hover:border-accent-blue hover:bg-white [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="relative inline-flex rounded-lg bg-accent-blue/10 p-2 text-accent-blue">
          {icon}
        </span>
        <p className="text-base font-bold text-ink">{title}</p>
      </div>
      
      <p className="text-xs text-steel leading-relaxed mt-2 pr-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded">
          {ext}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-steel/60 group-hover:text-accent-blue transition-colors flex items-center gap-1.5">
          <Download className="h-3 w-3" /> Request File
        </span>
      </div>
    </motion.div>
  );
}

export function AssetVault() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate dynamic stacking offsets based on viewport width
  const xOffset = isMobile ? 12 : 24;
  const yOffset = isMobile ? 16 : 20;

  // Scroll transforms for card stacking
  const card1Y = useTransform(scrollYProgress, [0.08, 0.33], [300, yOffset]);
  const card1X = useTransform(scrollYProgress, [0.08, 0.33], [50, xOffset]);
  const card1Rotate = useTransform(scrollYProgress, [0.08, 0.33], [12, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0.08, 0.33], [0, 1]);

  const card2Y = useTransform(scrollYProgress, [0.38, 0.63], [400, yOffset * 2]);
  const card2X = useTransform(scrollYProgress, [0.38, 0.63], [100, xOffset * 2]);
  const card2Rotate = useTransform(scrollYProgress, [0.38, 0.63], [24, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.38, 0.63], [0, 1]);

  const card3Y = useTransform(scrollYProgress, [0.68, 0.93], [500, yOffset * 3]);
  const card3X = useTransform(scrollYProgress, [0.68, 0.93], [150, xOffset * 3]);
  const card3Rotate = useTransform(scrollYProgress, [0.68, 0.93], [36, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.68, 0.93], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-muted">
      {/* Sticky section viewport container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Title Block & Call-to-Action */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
                <span className="font-serif italic text-base normal-case tracking-normal mr-2">07</span>
                — Architect Asset Vault
              </div>
              <h2 className="mt-4 text-5xl md:text-6xl font-bold leading-[0.95] text-balance">
                Drop a Trinetra block into your <span className="font-serif italic text-accent-blue">floor plan</span>.
              </h2>
              <p className="mt-6 text-steel text-base md:text-lg leading-relaxed max-w-lg">
                Architects, PMCs and corporate interior designers get CAD, BIM and 3D model files for every workstation in our catalogue — one click, no form gating.
              </p>
            </Reveal>

            {/* Bulk Download Section */}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border bg-ink text-white p-5 max-w-lg shadow-lg">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent-blue font-semibold">Bulk download</div>
                  <div className="mt-1 text-sm font-semibold">Complete vault — all 9 workstations, every format.</div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-blue px-5 py-2.5 text-xs font-semibold hover:translate-y-[-2px] transition-transform shrink-0 shadow-md shadow-accent-blue/20"
                >
                  <Download className="h-3.5 w-3.5" /> Email Vault
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Stacked Cards Container */}
          <div className="lg:col-span-6 flex justify-center items-center h-[20rem] sm:h-[24rem] lg:h-[28rem] relative w-full overflow-visible">
            <div className="grid [grid-template-areas:'stack'] place-items-center relative w-full max-w-[24rem] h-full overflow-visible">
              
              {/* Card 0: AutoCAD (Base Card) */}
              <DisplayCard
                icon={<FileText className="h-5 w-5" strokeWidth={1.5} />}
                title={formats[0].label}
                description={formats[0].note}
                ext={formats[0].ext}
                className="[grid-area:stack]"
                style={{
                  zIndex: 10,
                  transform: "translateX(0px) translateY(0px) rotateY(0deg) skewY(-8deg)",
                }}
              />

              {/* Card 1: Revit */}
              <DisplayCard
                icon={<Box className="h-5 w-5" strokeWidth={1.5} />}
                title={formats[1].label}
                description={formats[1].note}
                ext={formats[1].ext}
                className="[grid-area:stack]"
                style={{
                  zIndex: 20,
                  y: card1Y,
                  x: card1X,
                  rotate: card1Rotate,
                  opacity: card1Opacity,
                  transform: "skewY(-8deg)",
                }}
              />

              {/* Card 2: SketchUp */}
              <DisplayCard
                icon={<Layers3 className="h-5 w-5" strokeWidth={1.5} />}
                title={formats[2].label}
                description={formats[2].note}
                ext={formats[2].ext}
                className="[grid-area:stack]"
                style={{
                  zIndex: 30,
                  y: card2Y,
                  x: card2X,
                  rotate: card2Rotate,
                  opacity: card2Opacity,
                  transform: "skewY(-8deg)",
                }}
              />

              {/* Card 3: STEP / IGES */}
              <DisplayCard
                icon={<Box className="h-5 w-5" strokeWidth={1.5} />}
                title={formats[3].label}
                description={formats[3].note}
                ext={formats[3].ext}
                className="[grid-area:stack]"
                style={{
                  zIndex: 40,
                  y: card3Y,
                  x: card3X,
                  rotate: card3Rotate,
                  opacity: card3Opacity,
                  transform: "skewY(-8deg)",
                }}
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

