import { FileText, Box, Layers3, Download } from "lucide-react";
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

export function AssetVault() {
  return (
    <section className="relative py-32 px-6 bg-muted overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-14">
          <Reveal className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
              <span className="font-serif italic text-base normal-case tracking-normal mr-2">07</span>
              — Architect Asset Vault
            </div>
            <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-[0.9] text-balance">
              Drop a Trinetra block into your <span className="font-serif italic text-accent-blue">floor plan</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5 text-steel text-lg">
            Architects, PMCs and corporate interior designers get CAD, BIM and 3D model files for every workstation in our catalogue — one click, no form gating.
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {formats.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06}>
              <a
                href="#contact"
                className="group relative block rounded-2xl border border-border bg-white p-6 h-full overflow-hidden hover:border-accent-blue transition-colors"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-blue/0 group-hover:bg-accent-blue/10 blur-2xl transition-colors" />
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-ink/5 group-hover:bg-accent-blue/10 flex items-center justify-center transition-colors">
                    <f.icon className="h-6 w-6 text-ink group-hover:text-accent-blue transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif italic text-2xl text-accent-blue/70">0{i + 1}</span>
                </div>
                <div className="mt-8">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-bold text-ink">{f.label}</h3>
                    <span className="text-xs font-mono text-muted-foreground">{f.ext}</span>
                  </div>
                  <p className="mt-2 text-sm text-steel leading-relaxed">{f.note}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-blue">
                  <Download className="h-3.5 w-3.5" /> Request file
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border bg-ink text-white p-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent-blue font-semibold">Bulk download</div>
              <div className="mt-1 text-lg font-semibold">Complete vault — all 9 workstations, every format.</div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-blue px-6 py-3 text-sm font-semibold hover:translate-y-[-2px] transition-transform"
            >
              <Download className="h-4 w-4" /> Email me the vault
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
