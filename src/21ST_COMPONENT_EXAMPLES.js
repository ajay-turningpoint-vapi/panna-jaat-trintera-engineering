// 21st.dev Component Integration Examples
// Add these to your Home.jsx or relevant components

// ===== EXAMPLE 1: Animated Button (for CTA sections) =====
/*
import AnimatedButton from "@/components/ui/animated-button";

// In your Hero or Contact section:
<AnimatedButton 
  href="#products"
  className="inline-flex items-center gap-2 rounded-full bg-accent-blue text-white px-6 py-3.5 text-sm font-semibold hover:-translate-y-0.5 transition-all shadow-lg shadow-accent-blue/30"
>
  Browse Products <ArrowUpRight className="h-4 w-4" />
</AnimatedButton>
*/

// ===== EXAMPLE 2: Card Components (for Services/Products) =====
/*
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// In Services section:
const ServiceCard = ({ icon: Icon, title, copy }) => (
  <Card className="border border-border bg-white/50 backdrop-blur hover:shadow-lg transition-all">
    <CardHeader>
      <Icon className="h-6 w-6 text-accent-blue mb-2" />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{copy}</CardDescription>
    </CardContent>
  </Card>
);

// Usage in Services:
{services.map((service) => (
  <ServiceCard key={service.title} {...service} />
))}
*/

// ===== EXAMPLE 3: Badge Components (for highlighting) =====
/*
import { Badge } from "@/components/ui/badge";

// In Hero section or stat cards:
<Badge className="bg-accent-blue/20 text-accent-blue border border-accent-blue/40">
  <Factory className="h-3 w-3 mr-1" />
  Made in India · Vasai East Factory
</Badge>
*/

// ===== EXAMPLE 4: Gradient Text =====
/*
import GradientText from "@/components/ui/gradient-text";

// In Hero headline:
<h1 className="text-5xl font-bold">
  Your Office Floor,
  <br />
  <GradientText>Engineered Direct.</GradientText>
</h1>
*/

// ===== EXAMPLE 5: Scroll Animation =====
/*
import ScrollAnimate from "@/components/ui/scroll-animate";

// Wrap content that should animate on scroll:
<ScrollAnimate effect="fadeInUp" duration={0.5}>
  <div className="your-content">...</div>
</ScrollAnimate>
*/

// ===== EXAMPLE 6: Wave Divider (ALREADY INTEGRATED) =====
import DynamicWaves from "@/components/ui/DynamicWaves";

// Currently used between Hero and TrustBar in Home.jsx
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

// ===== EXAMPLE 7: Combine Multiple Components =====
/*
// Enhanced Services Section with Cards + Badges
function EnhancedServices() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-bold mb-12">
          Our <GradientText>Services</GradientText>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ScrollAnimate key={service.title} effect="fadeInUp">
              <Card className="hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <service.icon className="h-6 w-6 text-accent-blue" />
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.copy}</CardDescription>
                  <AnimatedButton href={`#${service.slug}`} className="mt-4">
                    Learn More →
                  </AnimatedButton>
                </CardContent>
              </Card>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
*/

// ===== INSTALLATION CHECKLIST =====
/*
After installing each component, follow this checklist:

[] 1. Run: npx @21st-dev/registry add @21st-dev/[component-name]
[] 2. Check file installed at: src/components/ui/[component-name].jsx
[] 3. Add import to Home.jsx: import { ComponentName } from "@/components/ui/[component-name]";
[] 4. Find appropriate section in Home.jsx
[] 5. Implement using examples above
[] 6. Test in browser (npm run dev)
[] 7. Customize styling with Tailwind classes as needed
[] 8. Commit to git when satisfied
*/

export default {};
