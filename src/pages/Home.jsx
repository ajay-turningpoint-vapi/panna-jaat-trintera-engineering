import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  ShieldCheck,
  Settings2,
  Wrench,
  Hammer,
  Cog,
  Paintbrush,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Building2,
  Factory,
  Layers,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal, SplitText } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { CaseStudies } from "@/components/CaseStudies";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { AssetVault } from "@/components/AssetVault";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { AnimatedGradientText } from "@/components/ui/AnimatedGradientText";
import DynamicWaves from "@/components/ui/DynamicWaves";
import { products } from "@/lib/products";
import { CircularServices } from "@/components/ui/CircularServices";

const services = [
  {
    icon: Building2,
    title: "Modular Workstation Manufacturing",
    copy: "From a 4-seat starter to a 200-seat floor — every bench sized, finished and cabled to your exact specification.",
    image: "/service_workstation.png",
  },
  {
    icon: Layers,
    title: "Sheet Metal Fabrication",
    copy: "CRCA sheet cut, bent, welded and powder coated in-house. Total quality control. Zero outsourcing.",
    image: "/service_fabrication.png",
  },
  {
    icon: Settings2,
    title: "Custom Design & Development",
    copy: "Send us your floor plan. We return a layout-optimised workstation design within 24 hours.",
    image: "/service_design.png",
  },
  {
    icon: Wrench,
    title: "Welding & Assembly",
    copy: "Every joint MIG-welded on a squareness jig. Structural integrity inspected at every shift.",
    image: "/service_welding.png",
  },
  {
    icon: Paintbrush,
    title: "Powder Coating & Finishing",
    copy: "7-step pretreatment. 60-micron electrostatic coat. Baked at 200°C. Built to last a decade.",
    image: "/service_coating.png",
  },
];

const stats = [
  { value: 4, suffix: "+", label: "Years of Excellence" },
  { value: 200, suffix: "+", label: "Seats Per Project" },
  { value: 8, suffix: "+", label: "Marquee Clients" },
  { value: 100, suffix: "%", label: "Custom Built" },
];

const projects = [
  { name: "Magnus Hotel", city: "Pune" },
  { name: "Kotak Bank", city: "Lower Parel" },
  { name: "L&T Finance", city: "Pune" },
  { name: "Business Bay", city: "Malad" },
  { name: "Disa at Hiranandani Estate", city: "Thane" },
  { name: "Friends Business Bay", city: "Borivali" },
  { name: "Veedol Ltd.", city: "Vikhroli" },
  { name: "Arenesha AI Lab Spaces", city: "Hyderabad" },
];

const focuses = [
  { icon: CheckCircle2, label: "Quality Manufacturing" },
  { icon: CheckCircle2, label: "Timely Delivery" },
  { icon: CheckCircle2, label: "Cost-Effective Solutions" },
  { icon: CheckCircle2, label: "Strong Client Relationships" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SmoothScroll />
      <Nav />
      <Hero />
      <WaveDivider />
      <TrustBar />
      <ProblemSection />
      <About />
      <Services />
      <HowWeWork />
      <Products />
      <CaseStudies />
      <ComparisonMatrix />
      <AssetVault />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

/* ───────── NAV ───────── */
function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"],
  );
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.08)"],
  );
  return (
    <motion.header
      style={{
        backgroundColor: bg,
        borderColor: border,
        backdropFilter: "blur(14px)",
      }}
      className="fixed top-0 inset-x-0 z-50 border-b"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/75">
          <a href="#about" className="hover:text-accent-blue transition-colors">
            About
          </a>
          <a
            href="#services"
            className="hover:text-accent-blue transition-colors"
          >
            Services
          </a>
          <a
            href="#products"
            className="hover:text-accent-blue transition-colors"
          >
            Products
          </a>
          <a
            href="#projects"
            className="hover:text-accent-blue transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="hover:text-accent-blue transition-colors"
          >
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 text-sm font-semibold hover:bg-accent-blue transition-colors"
        >
          Request Quote <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.header>
  );
}

/* ───────── HERO ───────── */
function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const y = useSpring(yRaw, { stiffness: 100, damping: 30 });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink text-white"
    >
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Trinetra Engineering modular workstation installation"
          className="h-full w-full object-cover opacity-60"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink" />
        <div className="absolute inset-0 blueprint-bg opacity-35" />
      </motion.div>

      {/* Chevron accent */}
      <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none">
        <svg
          viewBox="0 0 600 800"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="cv" x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0"
                stopColor="var(--accent-blue)"
                stopOpacity="0.0"
              />
              <stop
                offset="1"
                stopColor="var(--accent-blue)"
                stopOpacity="0.5"
              />
            </linearGradient>
          </defs>
          <path d="M150 0 L600 0 L600 800 L300 800 Z" fill="url(#cv)" />
          <path
            d="M150 0 L155 0 L305 800 L300 800 Z"
            fill="var(--accent-blue)"
            opacity="0.85"
          />
        </svg>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-6 pb-16 md:pb-24 pt-24 md:pt-32 w-full"
      >
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold tracking-widest uppercase text-white/80 border border-white/15 mb-6">
                <Factory className="h-3 w-3 text-accent-blue" />
                Made in India · Vasai East Factory
              </div>
            </Reveal>

            {/* AIDA - Attention: Bold, specific headline */}
            <h1 className="text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.93] font-bold text-balance">
              <SplitText text="Your Office Floor," />
              <br />
              <span className="text-accent-blue">
                <SplitText text="Engineered Direct." />
              </span>
            </h1>

            {/* AIDA - Interest: Who they are + what they do */}
            <Reveal
              delay={0.35}
              className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed"
            >
              Trinetra Engineering manufactures{" "}
              <strong className="text-white">modular workstations</strong> and{" "}
              <strong className="text-white">sheet metal solutions</strong> for
              India's most demanding offices — customised to your layout,
              powder-coated to your finish, and delivered directly from our
              Vasai factory.
            </Reveal>

            {/* AIDA - Desire: Social proof inline */}
            <Reveal delay={0.45} className="mt-4 text-sm text-white/50">
              Trusted by{" "}
              <span className="text-white/80">
                Kotak Bank · L&T Finance · Magnus Hotel
              </span>{" "}
              and 5 more marquee clients.
            </Reveal>

            {/* AIDA - Action: CTAs */}
            <Reveal delay={0.55} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-accent-blue text-white px-6 py-3.5 text-sm font-semibold hover:-translate-y-0.5 transition-all shadow-lg shadow-accent-blue/30"
              >
                Browse Products <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Request a Quote
              </a>
            </Reveal>
          </div>

          {/* Stats grid */}
          <div className="lg:col-span-4 hidden lg:block">
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 backdrop-blur">
                {stats.map(({ value, suffix, label }) => (
                  <div key={label} className="bg-ink/60 p-6">
                    <div className="text-3xl font-bold text-white tabular-nums">
                      <NumberTicker value={value} suffix={suffix} />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-white/55 mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/40 uppercase animate-bounce">
        Scroll to discover
      </div>
    </section>
  );
}

/* ───────── WAVE DIVIDER ───────── */
function WaveDivider() {
  return (
    <div className="relative -mb-px">
      <DynamicWaves
        height={120}
        color="#1a1a1a"
        opacity={0.3}
        amplitude={30}
        speed={0.04}
        waveCount={2}
      />
    </div>
  );
}

/* ───────── TRUST BAR (Marquee) ───────── */
function TrustBar() {
  const items = [
    "Modular Workstations",
    "◆",
    "Sheet Metal Fabrication",
    "◆",
    "Custom Design",
    "◆",
    "CRCA Powder Coated",
    "◆",
    "Welding & Assembly",
    "◆",
    "Powder Coating",
    "◆",
    "Wire Management",
    "◆",
    "Made in India",
    "◆",
    "Vasai East Factory",
    "◆",
    "4+ Years Excellence",
    "◆",
  ];
  const row = [...items, ...items, ...items];
  return (
    <section className="border-y border-border bg-ink text-white overflow-hidden py-5">
      <div className="flex marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="text-xl font-semibold tracking-tight px-5 text-white/75"
          >
            {t === "◆" ? <span className="text-accent-blue">◆</span> : t}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ───────── PROBLEM SECTION (PAS - Problem + Agitate) ───────── */
function ProblemSection() {
  const pain = [
    "Catalogue dealers can't customise for your floor plan — you fit your office around their sizes.",
    "Retail showrooms quote 6–9 weeks with no production transparency or accountability.",
    "Multiple vendors for fabrication, coating and installation means zero single point of responsibility.",
  ];

  return (
    <section className="relative py-14 md:py-24 px-6 bg-muted overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
            The Problem
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-[1.0] text-balance">
            Planning an office fit-out?{" "}
            <span className="text-accent-blue">
              Here's what slows most projects down.
            </span>
          </h2>
          <p className="mt-6 text-base text-steel leading-relaxed">
            Most procurement teams face the same three obstacles when sourcing
            office workstations for a fit-out. Trinetra Engineering is built to
            eliminate all three.
          </p>
        </Reveal>

        <div className="space-y-4">
          {pain.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex gap-4 rounded-2xl border border-border bg-white p-5">
                <div className="h-8 w-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-red-500">
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm text-steel leading-relaxed">{p}</p>
              </div>
            </Reveal>
          ))}

          {/* Solution bridge */}
          <Reveal delay={0.35}>
            <div className="flex gap-4 rounded-2xl border-2 border-accent-blue bg-accent-blue/5 p-5 mt-6">
              <ShieldCheck className="h-6 w-6 text-accent-blue shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-ink">
                  The Trinetra Solution
                </div>
                <p className="text-sm text-steel mt-1 leading-relaxed">
                  One factory. One team. Your layout, your finish, your timeline
                  — manufactured and delivered direct from Vasai East.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── ABOUT ───────── */
function About() {
  return (
    <section id="about" className="relative py-16 md:py-32 px-6">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
              01 — About Us
            </div>
            <h2 className="mt-4 text-5xl md:text-6xl font-bold text-balance leading-[0.95]">
              A trusted name in{" "}
              <AnimatedGradientText>sheet metal</AnimatedGradientText> for 4+
              years.
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-lg text-steel leading-relaxed">
              Trinetra Engineering is a trusted name in the sheet metal
              industry. Backed by strong technical expertise and hands-on
              experience, we deliver{" "}
              <strong className="text-ink">
                customised solutions tailored to industrial needs.
              </strong>
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-steel leading-relaxed">
              With over{" "}
              <strong className="text-ink">4+ years of excellence</strong>, we
              specialise in manufacturing high-quality Modular Workstations,
              Sheet Metal Components and Custom Fabrication solutions —
              committed to durability, precision and customer satisfaction.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              {focuses.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5"
                >
                  <Icon className="h-4 w-4 text-accent-blue shrink-0" />
                  <span className="text-sm font-semibold text-ink">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── SERVICES ───────── */
function Services() {
  return (
    <section
      id="services"
      className="relative py-16 md:py-32 px-6 bg-ink text-white overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-bg opacity-25" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
              02 — Services
            </div>
            <h2 className="mt-4 text-5xl md:text-6xl font-bold text-balance max-w-2xl leading-[0.95]">
              Everything under{" "}
              <span className="text-accent-blue">one roof.</span>
            </h2>
          </Reveal>
          <Reveal
            delay={0.2}
            className="max-w-md text-white/60 text-base md:text-lg"
          >
            From raw CRCA sheet to installed workstations — by one team.
          </Reveal>
        </div>

        <Reveal className="overflow-visible w-full mt-10">
          <CircularServices services={services} />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── HOW WE WORK ───────── */
const steps = [
  {
    n: "01",
    title: "Share Your Requirement",
    body: "Send us your seat count, room dimensions, preferred finish or an existing floor plan. Our team responds within one working day.",
    cta: null,
  },
  {
    n: "02",
    title: "Receive a Custom Layout",
    body: "We design a workstation layout optimised for your space — sized to your exact dimensions and cable management needs.",
    cta: null,
  },
  {
    n: "03",
    title: "In-House Fabrication",
    body: "Every piece is cut, bent, welded, powder coated and quality-checked at our Vasai East factory. No outsourcing. No quality shortcuts.",
    cta: null,
  },
  {
    n: "04",
    title: "Delivery & Installation",
    body: "Finished workstations are packed, transported to your site and assembled by our team — ready for your team to move in.",
    cta: null,
  },
];

function HowWeWork() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-12%", "12%"],
  );

  return (
    <section className="relative overflow-hidden">
      {/* Parallax fab image */}
      <div
        ref={ref}
        className="relative h-[420px] md:h-[500px] overflow-hidden"
      >
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-[12%] -bottom-[12%]"
        >
          <img
            src="/fab.jpg"
            alt="Sheet metal fabrication at Trinetra Engineering"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink" />
        </motion.div>
        <div className="relative h-full flex items-center mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
              03 — How We Work
            </div>
            <h2 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-[0.95]">
              From requirement
              <br />
              <span className="text-accent-blue">to installed workspace.</span>
            </h2>
            <p className="mt-5 text-lg text-white/65 max-w-lg">
              A straightforward four-step process — from the moment you contact
              us to the day your team moves in.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-ink text-white px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-none -mt-1">
            {steps.map((s) => (
              <div
                key={s.n}
                className="snap-start shrink-0 w-[72vw] max-w-[280px] rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-4xl font-bold text-white/10 leading-none mb-4">
                  {s.n}
                </div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs text-white/50 leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 -mt-1">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="group bg-ink hover:bg-accent-blue/10 transition-colors p-8 h-full relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-blue/0 group-hover:bg-accent-blue/15 blur-2xl transition-colors" />
                  <div className="text-5xl font-bold text-white/8 leading-none mb-6 group-hover:text-white/12 transition-colors">
                    {s.n}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/55 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-blue text-white px-6 py-3.5 text-sm font-semibold hover:-translate-y-0.5 transition-all shadow-lg shadow-accent-blue/30"
            >
              Start with your requirement <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── PRODUCTS ───────── */
function Products() {
  return (
    <section id="products" className="relative py-16 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8 md:mb-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
              04 — Products
            </div>
            <h2 className="mt-4 text-5xl md:text-6xl font-bold text-balance max-w-3xl leading-[0.95]">
              A modular system for{" "}
              <span className="text-accent-blue">every workplace.</span>
            </h2>
          </Reveal>
          <Reveal
            delay={0.15}
            className="max-w-md text-steel text-base md:text-lg hidden md:block"
          >
            From bench workstations to boardroom tables — all manufactured in
            CRCA powder coated steel.
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
          {products.slice(0, 4).map((p, i) => (
            <Reveal key={p.code} delay={(i % 2) * 0.08}>
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
                  <h3 className="text-lg md:text-xl font-bold text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-steel line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </p>
                  <ul className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
                    {p.specs.slice(0, 3).map((s) => (
                      <li
                        key={s.label}
                        className="flex gap-2 text-sm text-steel"
                      >
                        <ChevronRight className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-ink font-semibold">
                            {s.label}:
                          </strong>{" "}
                          {s.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 md:mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-accent-blue group-hover:gap-2 transition-all">
                    View details <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-accent-blue origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            </Reveal>
          ))}
        </div>

        {/* View all */}
        <Reveal delay={0.2} className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-8 py-4 text-sm font-semibold hover:bg-accent-blue transition-colors shadow-lg"
          >
            View All {products.length} Products{" "}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── PROJECTS ───────── */
function Projects() {
  return (
    <section
      id="projects"
      className="py-16 md:py-32 px-6 bg-ink text-white overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
            09 — Completed Projects
          </div>
          <h2 className="mt-4 text-5xl md:text-6xl font-bold leading-[0.95] max-w-3xl">
            Trusted across <span className="text-accent-blue">India.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/60 max-w-xl hidden md:block">
            From hospitality to banking to tech — Trinetra workstations are in
            production across India's most demanding workplaces.
          </p>
        </Reveal>
        <div className="mt-16 border-t border-white/10">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="group flex items-center justify-between gap-6 py-7 border-b border-white/10 hover:px-4 transition-all">
                <div className="flex items-center gap-8">
                  <div className="text-sm font-mono text-white/35 tabular-nums w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-lg md:text-4xl font-bold tracking-tight group-hover:text-accent-blue transition-colors">
                      {p.name}
                    </div>
                    <div className="text-sm text-white/45 mt-0.5">{p.city}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-7 w-7 text-white/30 group-hover:text-accent-blue group-hover:rotate-45 transition-all shrink-0" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── CONTACT ───────── */
function Contact() {
  return (
    <section
      id="contact"
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-semibold">
              10 — Contact
            </div>
            {/* AIDA - Action: Benefit-led headline */}
            <h2 className="mt-4 text-4xl md:text-6xl font-bold leading-[0.95] text-balance">
              Let's build your{" "}
              <span className="text-accent-blue">next workspace.</span>
            </h2>
            <p className="mt-6 text-lg text-steel max-w-md leading-relaxed">
              Share your seat count, floor plan or a reference image. Our team
              responds within one working day with a quote, finish options and a
              production timeline.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            <Reveal delay={0.1}>
              <a
                href="tel:+919975671961"
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 hover:border-accent-blue transition-colors group"
              >
                <div className="h-11 w-11 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Call
                  </div>
                  <div className="text-base font-bold text-ink">
                    +91 99756 71961
                  </div>
                  <div className="text-sm text-steel">+91 89760 96509</div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="mailto:trinetraengg.svp@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 hover:border-accent-blue transition-colors group"
              >
                <div className="h-11 w-11 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </div>
                  <div className="text-base font-bold text-ink">
                    trinetraengg.svp@gmail.com
                  </div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5">
                <div className="h-11 w-11 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Visit
                  </div>
                  <div className="text-sm text-steel mt-1 leading-relaxed">
                    Gala No. 3 & 4, K.T. Compound,
                    <br />
                    Opp. JJ Retails & Fixtures, Wakan Pada,
                    <br />
                    Vasai East – 401209
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── FOOTER ───────── */
function Footer() {
  return (
    <footer className="bg-ink text-white/65">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-12">
        <div>
          <Logo mono className="text-white" />
          <p className="mt-6 text-sm max-w-xs leading-relaxed">
            Modular workstations & sheet metal solutions — engineered with
            modularity, delivered with pride.
          </p>
          <p className="mt-4 text-xs text-white/35">
            www.trinetraengineering.com
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/35">
            Quick Links
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {["about", "services", "products", "projects", "contact"].map(
              (l) => (
                <li key={l}>
                  <a
                    href={`#${l}`}
                    className="hover:text-accent-blue capitalize transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/35">
            Contact
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>+91 99756 71961</li>
            <li>+91 89760 96509</li>
            <li>trinetraengg.svp@gmail.com</li>
            <li className="leading-relaxed">
              Gala 3 & 4, K.T. Compound,
              <br />
              Wakan Pada, Vasai East – 401209
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between text-xs text-white/35">
          <span>
            © {new Date().getFullYear()} Trinetra Engineering. All rights
            reserved.
          </span>
          <span>Vasai East, Maharashtra</span>
        </div>
      </div>
    </footer>
  );
}
