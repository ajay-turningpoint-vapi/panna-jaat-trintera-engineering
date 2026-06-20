import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Users, Maximize2, Layers, IndianRupee, ArrowUpRight } from "lucide-react";

const TYPES = [
  { id: "linear", name: "Linear bench", seatArea: 2.8, perSeat: 18500 },
  { id: "lshape", name: "L-shape", seatArea: 3.6, perSeat: 24500 },
  { id: "120", name: "120° cluster", seatArea: 4.2, perSeat: 28500 },
  { id: "conf", name: "Conference", seatArea: 5.5, perSeat: 42000 },
];

export function Configurator() {
  const [seats, setSeats] = useState(48);
  const [typeId, setTypeId] = useState("linear");
  const [finish, setFinish] = useState("texture");

  const type = TYPES.find((t) => t.id === typeId);
  const finishMul = finish === "matte" ? 1 : finish === "texture" ? 1.08 : 1.22;

  const { area, total, leadDays, perSeat } = useMemo(() => {
    const perSeat = Math.round(type.perSeat * finishMul);
    const total = perSeat * seats;
    const area = +(seats * type.seatArea).toFixed(1);
    const leadDays = Math.max(18, 14 + Math.ceil(seats / 12) * 2);
    return { area, total, leadDays, perSeat };
  }, [seats, type, finishMul]);

  const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <Reveal className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
              <span className="font-serif italic text-base normal-case tracking-normal mr-2">05</span>
              — Workspace planner
            </div>
            <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-[0.9] text-balance">
              Simulate your <span className="font-serif italic text-accent-blue">floorplate</span> in real time.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5 text-steel text-lg">
            A live, factory-direct estimate — seats, area and lead time recalculate as you tune. No login. No sales call before you're ready.
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-7 rounded-3xl border border-border bg-white p-8 space-y-10">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-[0.3em] font-bold text-ink">Seats</label>
                <span className="font-serif italic text-5xl text-accent-blue tabular-nums">{seats}</span>
              </div>
              <input
                type="range"
                min={4}
                max={240}
                step={4}
                value={seats}
                onChange={(e) => setSeats(+e.target.value)}
                className="mt-3 w-full accent-[var(--accent-blue)]"
              />
              <div className="mt-1 flex justify-between text-[10px] tracking-widest uppercase text-muted-foreground">
                <span>4</span><span>120</span><span>240</span>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-ink mb-3">Workstation type</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TYPES.map((t) => {
                  const active = t.id === typeId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTypeId(t.id)}
                      className={`rounded-xl px-3 py-3 text-left text-sm font-semibold border transition-all ${
                        active
                          ? "bg-ink text-white border-ink shadow-lg shadow-ink/20"
                          : "bg-white text-ink border-border hover:border-accent-blue"
                      }`}
                    >
                      {t.name}
                      <div className={`mt-1 text-[10px] tracking-widest uppercase ${active ? "text-accent-blue" : "text-muted-foreground"}`}>
                        {t.seatArea} m² / seat
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-ink mb-3">Finish grade</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "matte", label: "Matte powder", note: "Standard CRCA" },
                  { id: "texture", label: "Textured", note: "Anti-scratch" },
                  { id: "premium", label: "Premium", note: "PU + edge band" },
                ].map((f) => {
                  const active = f.id === finish;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFinish(f.id)}
                      className={`rounded-xl px-3 py-3 text-left border transition-all ${
                        active
                          ? "border-accent-blue bg-accent-blue/5"
                          : "border-border hover:border-accent-blue/50"
                      }`}
                    >
                      <div className="text-sm font-semibold text-ink">{f.label}</div>
                      <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">{f.note}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live output */}
          <div className="lg:col-span-5 rounded-3xl bg-ink text-white p-8 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 blueprint-bg opacity-30" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-blue/20 blur-3xl" />

            <div className="relative">
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">Live estimate</div>
              <motion.div
                key={total}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/40">Project total (ex-GST)</div>
                <div className="mt-1 font-display text-5xl md:text-6xl font-bold tabular-nums leading-none">
                  <IndianRupee className="inline h-8 w-8 mb-2 text-accent-blue" />
                  {inr.format(total)}
                </div>
                <div className="mt-2 text-xs text-white/50 tabular-nums">
                  ≈ ₹{inr.format(perSeat)} / seat · factory-direct
                </div>
              </motion.div>
            </div>

            <div className="relative mt-8 grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
              <Stat icon={Users} label="Seats" value={`${seats}`} />
              <Stat icon={Maximize2} label="Area" value={`${area} m²`} />
              <Stat icon={Layers} label="Lead" value={`${leadDays} days`} />
            </div>

            <a
              href="#contact"
              className="relative mt-6 inline-flex items-center justify-between gap-2 rounded-2xl bg-accent-blue px-5 py-4 text-sm font-semibold hover:translate-y-[-2px] transition-transform"
            >
              <span>Lock this configuration & request BOM</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="relative mt-3 text-[11px] text-white/40">
              Indicative pricing. Final quote includes site survey, raceway routing and installation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="bg-ink/80 backdrop-blur p-4">
      <Icon className="h-4 w-4 text-accent-blue" strokeWidth={1.5} />
      <div className="mt-3 text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      <div className="mt-1 text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}
