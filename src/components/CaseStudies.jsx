import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Clock, MapPin, Users, ArrowRight } from "lucide-react";

const stories = [
  {
    client: "L&T Finance — Mumbai",
    seats: "120 seats",
    duration: "21 days",
    before: "/case1_before.png",
    after: "/case1_after.png",
    summary:
      "A bare 6,500 sq.ft floorplate transformed into 120 cable-managed workstations with matching cabin tables — fabricated, finished, and installed in three weeks.",
    result:
      "Result: 120 workstations delivered and installed 2 days ahead of schedule. L&T Finance's Mumbai floor was fully operational before their lease start date — saving them ₹3.2L in idle rent.",
    timeline: [
      { day: "D0", title: "Site survey", note: "Walk-through, slab levels, raceway routes." },
      { day: "D2", title: "CAD layout", note: "12 layout iterations against fire & HVAC plans." },
      { day: "D5", title: "Sheet cutting", note: "CRCA sheets laser-cut & CNC bent in-house." },
      { day: "D10", title: "Powder coating", note: "7-tank pretreatment, oven cure at 200°C." },
      { day: "D16", title: "Pre-assembly", note: "QC on every weld, raceway dry-run." },
      { day: "D21", title: "Installation", note: "On-site fit-out, snag-list closed in 36 hours." },
    ],
  },
  {
    client: "Kotak Bank — Lower Parel",
    seats: "Boardroom + 14 cabins",
    duration: "28 days",
    before: "/case2_before.png",
    after: "/case2_after.png",
    summary:
      "Bespoke 3000 mm single-piece conference table with hidden raceway, paired with D-leg cabin workstations. Veneer matched to the bank's brand spec.",
    result:
      "Result: Boardroom table and 14 executive cabin sets handcrafted to match corporate brand identity. Installation completed over a single weekend with zero disruption to weekday operations.",
    timeline: [
      { day: "D0", title: "Brand workshop", note: "Veneer, RAL, and leg-profile signed off." },
      { day: "D4", title: "Prototype", note: "1:1 leg & raceway sample shipped for approval." },
      { day: "D9", title: "Production", note: "Conference top milled in one piece." },
      { day: "D18", title: "Finishing", note: "Hand-rubbed PU coat, ABS edge banding." },
      { day: "D24", title: "Logistics", note: "Crated, lifted via crane to the 12th floor." },
      { day: "D28", title: "Handover", note: "Live cable test, 2-year warranty issued." },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="stories" className="relative py-32 px-6 bg-muted">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">★ — Case Studies</div>
            <h2 className="mt-4 text-5xl md:text-6xl font-bold leading-[0.95] max-w-3xl text-balance">
              Empty floorplate to <span className="text-accent-blue">live workplace.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-md text-steel">
            Every project follows the same six-step fabrication workflow — surveyed, drawn, cut, coated, assembled, installed. Drag the slider to see the transformation.
          </Reveal>
        </div>

        <div className="space-y-24">
          {stories.map((s, idx) => (
            <article key={s.client} className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7">
                <Reveal>
                  <BeforeAfter before={s.before} after={s.after} />
                </Reveal>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={0.1}>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent-blue font-semibold">
                    Case {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 text-3xl font-bold text-ink leading-tight">{s.client}</h3>
                  <p className="mt-4 text-base text-steel leading-relaxed">{s.summary}</p>
                  <p className="mt-3 text-sm font-semibold text-accent-blue leading-relaxed border-l-2 border-accent-blue/30 pl-3">{s.result}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Pill icon={Users} text={s.seats} />
                    <Pill icon={Clock} text={s.duration} />
                    <Pill icon={MapPin} text="India" />
                  </div>
                </Reveal>

                <Reveal delay={0.2} className="mt-8">
                  <ol className="relative border-l border-border pl-6 space-y-5">
                    {s.timeline.map((t) => (
                      <li key={t.day} className="relative">
                        <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-accent-blue ring-4 ring-muted" />
                        <div className="flex items-baseline gap-3">
                          <span className="text-xs font-mono font-bold text-accent-blue tabular-nums">{t.day}</span>
                          <span className="text-sm font-semibold text-ink">{t.title}</span>
                        </div>
                        <p className="text-sm text-steel mt-0.5">{t.note}</p>
                      </li>
                    ))}
                  </ol>
                </Reveal>
                <Reveal delay={0.3} className="mt-8">
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent-blue transition-colors">
                    Start a similar project <ArrowRight className="h-4 w-4" />
                  </a>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pill({ icon: Icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink">
      <Icon className="h-3.5 w-3.5 text-accent-blue" />
      {text}
    </span>
  );
}
