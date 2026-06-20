import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";

export default function ProductCatalog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/"><Logo /></Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-steel hover:text-accent-blue inline-flex items-center gap-2 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <a
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 text-sm font-semibold hover:bg-accent-blue transition-colors"
            >
              Request Quote <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Header */}
      <section className="relative py-16 md:py-24 px-6 bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 blueprint-bg opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">Product Catalogue</div>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold leading-[0.95]">
              All Workstation &<br />
              <span className="text-accent-blue">Table Products</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/60 max-w-xl">
              Every product is manufactured in CRCA powder coated steel at our Vasai East factory — customised to your dimensions and finish.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-12 md:py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <Reveal key={p.code} delay={(i % 3) * 0.06}>
                <Link
                  to={`/products/${p.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-border hover:border-accent-blue transition-all hover:shadow-xl hover:shadow-accent-blue/5 h-full block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] font-bold uppercase bg-ink text-white px-2 py-1 rounded">
                      {p.code}
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-ink">{p.name}</h3>
                    <p className="mt-2 text-sm text-steel line-clamp-2 leading-relaxed">{p.tagline}</p>
                    <ul className="mt-4 space-y-1.5">
                      {p.specs.slice(0, 3).map((s) => (
                        <li key={s.label} className="flex gap-2 text-sm text-steel">
                          <ChevronRight className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                          <span><strong className="text-ink font-semibold">{s.label}:</strong> {s.value}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-accent-blue group-hover:gap-2 transition-all">
                      View details <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-accent-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-muted border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-ink">Don't see what you need?</h2>
            <p className="mt-3 text-sm text-steel max-w-lg mx-auto leading-relaxed">
              We manufacture custom workstations and sheet metal solutions to any specification. Share your requirement and we'll build it.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-semibold hover:bg-accent-blue transition-colors"
              >
                Request a Custom Quote <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+919975671961"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-ink hover:border-accent-blue hover:text-accent-blue transition-colors"
              >
                Call +91 99756 71961
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-white/60 py-8 px-6 text-center text-sm">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo mono className="text-white" />
          <span>© {new Date().getFullYear()} Trinetra Engineering — Vasai East, Maharashtra</span>
        </div>
      </footer>
    </div>
  );
}
