import { Reveal } from "@/components/Reveal";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ArrowUpRight } from "lucide-react";

const stories = [
  {
    client: "L&T Finance",
    location: "Mumbai",
    summary:
      "A bare floorplate transformed into a fully cable-managed open-plan office — linear modular workstations with matching cabin tables, fabricated and installed from our Vasai East factory.",
    before: "/case1_before.png",
    after: "/case1_after.png",
  },
  {
    client: "Kotak Bank",
    location: "Lower Parel",
    summary:
      "Bespoke conference table paired with D-leg cabin workstations across 14 executive cabins — all manufactured to the bank's finish and dimension specification.",
    before: "/case2_before.png",
    after: "/case2_after.png",
  },
];

export function CaseStudies() {
  return (
    <section id="stories" className="relative py-32 px-6 bg-muted">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">05 — Projects</div>
            <h2 className="mt-4 text-5xl md:text-6xl font-bold leading-[0.95] max-w-3xl text-balance">
              Empty floorplate to <span className="text-accent-blue">live workplace.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-sm text-steel text-base">
            Real installations delivered by Trinetra Engineering — from raw space to fully fitted office.
          </Reveal>
        </div>

        <div className="space-y-20">
          {stories.map((s, i) => (
            <article key={s.client}>
              <Reveal>
                <BeforeAfter before={s.before} after={s.after} />
              </Reveal>
              <Reveal delay={0.1} className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent-blue font-semibold">
                    Case {String(i + 1).padStart(2, "0")} — {s.location}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-ink">{s.client}</h3>
                  <p className="mt-3 text-sm text-steel leading-relaxed max-w-2xl">{s.summary}</p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-xs font-bold text-ink hover:border-accent-blue hover:text-accent-blue transition-colors shrink-0 self-start"
                >
                  Start a similar project <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
