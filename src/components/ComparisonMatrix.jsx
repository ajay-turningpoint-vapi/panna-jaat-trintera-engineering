import { Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const rows = [
  {
    label: "Middleman markup",
    retail: "30 – 50% dealer & distributor margins",
    trinetra: "0% — Direct factory-to-floorplate pricing",
  },
  {
    label: "Lead time",
    retail: "6 – 9 weeks (unpredictable supply lines)",
    trinetra: "3 weeks fixed — raw sheet to precision install",
  },
  {
    label: "Quality & durability",
    retail: "Retail-grade components, no raw material visibility",
    trinetra: "CRCA powder coated steel — controlled in-house from raw sheet",
  },
  {
    label: "Customisation",
    retail: "Fixed catalogue sizes — your layout fits their product",
    trinetra: "Any size, any finish — manufactured to your floor plan",
  },
  {
    label: "Single point of accountability",
    retail: "Vendor, dealer, installer all separate",
    trinetra: "One factory. One contract. One signature.",
  },
];

export function ComparisonMatrix() {
  return (
    <section className="relative py-32 px-6 bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 blueprint-bg opacity-20" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <Reveal className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
              <span className="font-serif italic text-base normal-case tracking-normal mr-2">06</span>
              — Why factory-direct
            </div>
            <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-[0.9] text-balance">
              The honest <span className="font-serif italic text-accent-blue">difference</span>, line by line.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5 text-white/60 text-lg">
            We don't compete with retail showrooms — we replace the supply chain that feeds them. Compare every operational vector that touches your handover date.
          </Reveal>
        </div>

        <div className="rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur">
          <div className="hidden md:grid grid-cols-12 px-8 py-5 text-[10px] tracking-[0.4em] uppercase text-white/40 border-b border-white/10">
            <div className="col-span-4">Operational vector</div>
            <div className="col-span-4 flex items-center gap-2">
              <X className="h-3.5 w-3.5" /> Traditional corporate retail
            </div>
            <div className="col-span-4 flex items-center gap-2 text-accent-blue">
              <Check className="h-3.5 w-3.5" /> Trinetra factory-direct
            </div>
          </div>

          {rows.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-6 px-6 md:px-8 py-7 border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] transition-colors group">
                <div className="md:col-span-4 flex items-baseline gap-3">
                  <span className="font-serif italic text-accent-blue text-lg">0{i + 1}</span>
                  <span className="text-lg font-semibold text-white">{r.label}</span>
                </div>
                <div className="md:col-span-4 text-white/50 text-sm leading-relaxed">
                  {r.retail}
                </div>
                <div className="md:col-span-4 text-white text-sm leading-relaxed font-medium relative pl-4">
                  <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-blue group-hover:scale-150 transition-transform" />
                  {r.trinetra}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
