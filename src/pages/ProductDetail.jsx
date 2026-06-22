import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Check,
  Phone
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { products, getProduct } from "@/lib/products";
import { AnimatedGradientText } from "@/components/ui/AnimatedGradientText";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { HScrollCarousel } from "@/components/HScrollCarousel";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const [active, setActive] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  // Set document title and meta description dynamically
  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Trinetra Engineering`;
      
      // Update meta description if exists
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", product.tagline);
      }
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink">Product not found</h1>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-accent-blue hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground [@media(min-width:1201px)]:max-w-[1200px] [@media(min-width:1201px)]:mx-auto [@media(min-width:1201px)]:shadow-2xl [@media(min-width:1201px)]:border-x [@media(min-width:1201px)]:border-border relative">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/"><Logo titleColor="var(--ink)" /></Link>
          <Link to="/" className="text-sm font-medium text-steel hover:text-accent-blue inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> All products
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-12 md:py-20 px-6 border-b border-border">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted border border-border">
                <img
                  src={product.gallery[active]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-opacity duration-500"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </Reveal>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
                    active === i ? "border-accent-blue" : "border-border hover:border-accent-blue/40"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="text-xs tracking-[0.3em] uppercase font-bold text-accent-blue">{product.code}</div>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-[1.05] text-balance">
                <AnimatedGradientText>{product.name}</AnimatedGradientText>
              </h1>
              <p className="mt-4 text-lg text-steel">{product.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.features.map((f) => (
                  <span key={f} className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink">
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <a href="#inquire" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-3 text-sm font-semibold hover:bg-accent-blue transition-colors">
                  Request quote <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="tel:+919975671961" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:border-accent-blue hover:text-accent-blue transition-colors">
                  Call engineer
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Trinetra Strip */}
      <section className="bg-ink text-white py-12 px-6 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 md:border-r md:border-white/10 md:pr-8">
                <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold mb-3">Why Trinetra Engineering</div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight">
                  Manufactured Direct. Customised to Your Requirement.
                </h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  With over 4+ years of hands-on experience in sheet metal fabrication and modular workstation manufacturing, we deliver customised solutions — from raw CRCA sheet to installed and powder-coated workstations — under one roof in Vasai East.
                </p>
              </div>
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-blue tabular-nums">
                    <NumberTicker value={4} suffix="+ Years" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/85">Of Excellence</div>
                  <p className="text-[11px] text-white/50">Backed by strong technical expertise and hands-on experience in sheet metal solutions.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-blue tabular-nums">
                    <NumberTicker value={100} suffix="%" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/85">Custom Built</div>
                  <p className="text-[11px] text-white/50">Every workstation is manufactured to your exact layout, finish and dimension requirements.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-extrabold text-accent-blue">Direct</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white/85">Factory-to-Site</div>
                  <p className="text-[11px] text-white/50">Fabricated at our Vasai East factory and delivered directly to your site. No middlemen.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">Why this product</div>
              <h2 className="mt-3 text-xl md:text-2xl font-bold leading-tight">Key benefits</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {product.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.08}>
                <div className="flex gap-4 rounded-xl border border-border bg-white p-5">
                  <CheckCircle2 className="h-6 w-6 text-accent-blue shrink-0" />
                  <p className="text-base text-ink">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Testimonial */}
      <section className="py-16 px-6 bg-white border-t border-border">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl mx-auto rounded-3xl bg-muted/30 border border-border p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-muted-foreground/5 pointer-events-none select-none">
                <span className="text-8xl font-serif">“</span>
              </div>
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold mb-6">Our Completed Projects Include</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {["Magnus Hotel — Pune", "Kotak Bank — Lower Parel", "L&T Finance — Pune", "Business Bay — Malad", "Disa at Hiranandani Estate — Thane", "Friends Business Bay — Borivali", "Veedol Ltd. — Vikhroli", "Arenesha AI Lab Spaces — Hyderabad"].map((proj) => (
                  <div key={proj} className="flex items-center gap-3 rounded-xl border border-border/60 bg-white px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-accent-blue shrink-0" />
                    <span className="text-sm font-semibold text-ink">{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specs */}
      <section className="py-20 px-6 bg-muted">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">Technical</div>
              <h2 className="mt-3 text-xl md:text-2xl font-bold leading-tight">Specifications</h2>
              <p className="mt-4 text-sm text-steel">All dimensions are customizable. Tolerances per IS 513.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <dl className="rounded-2xl bg-white border border-border overflow-hidden divide-y divide-border">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-3 gap-4 px-6 py-4">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground font-semibold col-span-1 self-center">{s.label}</dt>
                    <dd className="text-sm font-semibold text-ink col-span-2">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <div className="text-xs uppercase tracking-[0.3em] text-accent-blue font-semibold mb-3">Typical applications</div>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <span key={a} className="rounded-full bg-white border border-border px-3 py-1.5 text-xs font-semibold text-ink">{a}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Value Stacking - What You Get */}
      <section className="py-20 px-6 bg-white border-t border-border">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-bold">The Deployment Package</div>
              <h2 className="mt-3 text-xl md:text-2xl font-bold leading-tight text-ink">
                What's Included in <AnimatedGradientText>Your Project</AnimatedGradientText>
              </h2>
              <p className="mt-3 text-sm text-steel">When you source modular workstations direct from Trinetra, you don't just buy steel and wood. You get the complete enterprise-ready deployment package.</p>
            </div>
          </Reveal>
          
          <HScrollCarousel
            desktopClassName="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            itemClassName="h-full"
          >
            {[
              {
                title: "Custom Factory Fabrication",
                desc: "Workstations cut, bent, welded, and powder-coated to your exact floor plan specs. No generic retail fits."
              },
              {
                title: "Free 24-Hour 3D Layouts",
                desc: "Send us your raw DWG layout files. Our engineers will return fully optimized 2D/3D space plans within one working day."
              },
              {
                title: "Physical Sample Box Shipped",
                desc: "Evaluate wood pre-lams, powder-coat finishes, and aluminum extrusion swatches in your office before ordering."
              },
              {
                title: "Zero Middleman Pricing",
                desc: "Buy direct from our Vasai East factory. Eliminate distributor commissions, showroom markups, and dealer fees."
              },
              {
                title: "Factory-Direct Crew Install",
                desc: "We do not use random sub-contractors. Our own factory-trained assembly crew handles site logistics and installation."
              },
              {
                title: "Compliance & Load Certs",
                desc: "All structural components are certified under BIFMA standards with IS 513 cold-rolled carbon steel frames."
              }
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05} className="h-full">
                <div className="p-6 rounded-2xl border border-border bg-muted/20 hover:border-accent-blue/40 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="h-9 w-9 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-4">
                      <Check className="h-5 w-5 font-bold" />
                    </div>
                    <h4 className="text-base font-bold text-ink mb-2">{item.title}</h4>
                    <p className="text-xs text-steel leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </HScrollCarousel>
        </div>
      </section>

      {/* Trust Certifications */}
      <section className="py-16 px-6 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-10">
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-bold">Quality You Can Trust</div>
              <h2 className="mt-3 text-xl md:text-2xl font-bold leading-tight text-ink">Certified & Guaranteed</h2>
              <p className="mt-3 text-sm text-steel max-w-xl mx-auto">Every workstation we ship meets stringent quality benchmarks — backed by certifications and a decade-long guarantee.</p>
            </div>
          </Reveal>
          <HScrollCarousel
            desktopClassName="grid md:grid-cols-3 lg:grid-cols-5 gap-6"
            itemClassName="h-full"
          >
            {[
              { img: "/badges/iso_9001.png", title: "ISO 9001:2015", subtitle: "Certified Operations", desc: "Standardized fabrication and assembly workflow." },
              { img: "/badges/bifma.png", title: "BIFMA Compliant", subtitle: "Durability Standards", desc: "Safety, load stability, and ergonomic compliance." },
              { img: "/badges/steel_quality.png", title: "IS 513 Steel Grade", subtitle: "Heavy Cold-Rolled Carbon", desc: "Autobody-grade steel sheet for sag-proof joints." },
              { img: "/badges/ten_year_guarantee.png", title: "10-Year Guarantee", subtitle: "Ironclad Warranty", desc: "Free replacement for any frame bending or rusting." },
              { img: "/badges/make_in_india.png", title: "100% Make In India", subtitle: "Factory-Direct Value", desc: "Proudly manufactured locally in Vasai East." },
            ].map((c) => (
              <Reveal key={c.title} className="h-full">
                <div className="bg-white rounded-2xl border border-border p-5 h-full text-center hover:border-accent-blue/40 transition-colors shadow-sm flex flex-col justify-between items-center">
                  <div>
                    <div className="inline-flex items-center justify-center mb-4 h-20 w-20 overflow-hidden rounded-full border border-border/40 bg-muted/10">
                      <img src={c.img} alt={c.title} className="h-full w-full object-contain" />
                    </div>
                    <h4 className="text-sm font-bold text-ink leading-tight">{c.title}</h4>
                    <div className="text-[10px] font-semibold text-accent-blue mt-1 uppercase tracking-wider">{c.subtitle}</div>
                    <p className="text-xs text-steel mt-2 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </HScrollCarousel>
        </div>
      </section>

      {/* Why Trinetra — Our Commitment */}
      <section className="py-20 px-6 bg-muted/50 border-b border-border">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-3xl border-2 border-accent-blue bg-white p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-8 text-accent-blue/5 pointer-events-none select-none">
                <ShieldCheck className="h-64 w-64 -mr-16 -mt-16" />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-ink">Why Trinetra Engineering</h3>
              </div>

              <p className="text-sm text-steel mb-8 leading-relaxed">
                Backed by 4+ years of hands-on experience in sheet metal fabrication and modular workstation manufacturing,
                Trinetra delivers customised solutions — from raw CRCA sheet to installed, powder-coated workstations —
                under one roof in Vasai East. Quality manufacturing and timely delivery are at the core of every project.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-widest text-accent-blue font-bold">Quality Manufacturing</div>
                  <h4 className="text-lg font-bold text-ink leading-snug">CRCA Powder Coated, Every Time</h4>
                  <p className="text-xs text-steel leading-relaxed">
                    Every workstation is manufactured using cold-rolled carbon steel (CRCA) with a precision powder coat finish —
                    delivering consistent quality and durability across your entire fit-out.
                  </p>
                </div>

                <div className="space-y-3 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
                  <div className="text-xs uppercase tracking-widest text-accent-blue font-bold">Cost-Effective & Timely</div>
                  <h4 className="text-lg font-bold text-ink leading-snug">Factory-Direct. No Middlemen.</h4>
                  <p className="text-xs text-steel leading-relaxed">
                    Sourcing directly from our Vasai East factory eliminates dealer markups and gives you full
                    production visibility. Share your requirements and we'll confirm a delivery schedule.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Inquiry */}
      <section id="inquire" className="py-20 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">Get a quote</div>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-[1.05] text-balance">
                Inquire about the <span className="text-accent-blue">{product.name}</span>.
              </h2>
              <p className="mt-4 text-base text-steel">Tell us seat count, preferred finish and timeline. We respond within one working day.</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <ContactForm defaultProduct={product.name} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold mb-4">Ready to Proceed?</div>
            <h3 className="text-2xl md:text-3xl font-bold text-ink leading-tight">
              Get a Quote for the <span className="text-accent-blue">{product.name}</span>
            </h3>
            <p className="mt-4 text-sm text-steel max-w-2xl mx-auto leading-relaxed">
              Tell us your seat count, preferred dimensions, finish colour and site address.
              Our team at Vasai East will respond with a detailed quote within one working day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#inquire"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-semibold hover:bg-accent-blue transition-colors shadow-md"
              >
                Request a Quote <ArrowUpRight className="h-4 w-4" />
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

      {/* Related */}
      <section className="py-20 px-6 bg-ink text-white">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-xl md:text-2xl font-bold">Also consider</h2>
          </Reveal>
          <HScrollCarousel
            className="mt-10"
            desktopClassName="grid md:grid-cols-3 gap-6"
            itemClassName="h-full"
          >
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/products/${r.slug}`}
                className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-accent-blue transition-colors block h-full"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={r.img} alt={r.name} loading="lazy" decoding="async" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs tracking-[0.3em] text-accent-blue uppercase font-bold">{r.code}</div>
                    <div className="mt-1 font-bold">{r.name}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </HScrollCarousel>
        </div>
      </section>

      {/* Sticky Bottom CTA Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-border py-4 px-6 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 transform ${
        showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <span className="text-[10px] tracking-widest text-accent-blue font-bold uppercase">{product.code}</span>
            <h4 className="text-sm font-bold text-ink">{product.name}</h4>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a 
              href="tel:+919975671961" 
              className="inline-flex items-center justify-center p-3 rounded-full border border-border text-steel hover:text-accent-blue hover:border-accent-blue transition-colors"
              aria-label="Call engineer"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a 
              href="#inquire" 
              className="flex-1 sm:flex-none text-center inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-5 py-2.5 text-xs font-bold hover:bg-accent-blue transition-colors"
            >
              Request Factory Quote <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
