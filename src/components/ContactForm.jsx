import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(180),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  product: z.string().min(1, "Pick a product interest"),
  seats: z.string().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more (10+ chars)").max(1500),
});

const getInputCls = (hasError) =>
  `w-full rounded-lg border ${
    hasError
      ? "border-red-500 focus:ring-red-500/30 focus:border-red-500"
      : "border-border focus:ring-accent-blue/30 focus:border-accent-blue"
  } bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-foreground focus:outline-none transition`;

export function ContactForm({ defaultProduct }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { product: defaultProduct ?? "" },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://formsubmit.co/ajax/trinetraengg.svp@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New workstation inquiry — ${data.product}`,
          _template: "table",
          ...data,
        }),
      });
      if (!res.ok) throw new Error("Network");
      setSent(true);
      reset({ product: defaultProduct ?? "" });
      toast.success("Inquiry received", { description: "We'll reply within 1 working day." });
    } catch {
      toast.error("Could not send right now", {
        description: "Please email trinetraengg.svp@gmail.com or call +91 99756 71961.",
      });
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-green-600/30 bg-green-500/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
        <h3 className="mt-4 text-xl font-bold text-ink">Inquiry Received — Thank You!</h3>
        <p className="mt-2 text-sm text-steel">
          Our team at Vasai East will review your requirements and respond within one working day with a quote and production timeline.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-accent-blue hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} placeholder="Your name" className={getInputCls(!!errors.name)} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input {...register("company")} placeholder="Company name (optional)" className={getInputCls(!!errors.company)} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register("email")} placeholder="Your email (e.g. you@company.com)" className={getInputCls(!!errors.email)} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} placeholder="Your phone number" className={getInputCls(!!errors.phone)} />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Product interest" error={errors.product?.message}>
          <select {...register("product")} className={getInputCls(!!errors.product)}>
            <option value="">Select a product of interest</option>
            <option>Linear Modular Workstation</option>
            <option>L-Type Modular Workstation</option>
            <option>Sharing Workstation</option>
            <option>120° Workstation</option>
            <option>Conference Table</option>
            <option>Round Meeting Table</option>
            <option>Cabin Table</option>
            <option>Custom Sheet Metal Fabrication</option>
          </select>
        </Field>
        <Field label="Approx. seats needed" error={errors.seats?.message}>
          <input {...register("seats")} placeholder="How many seats do you need? (e.g. 40)" className={getInputCls(!!errors.seats)} />
        </Field>
      </div>
      <Field label="Describe your office or what you need" error={errors.message?.message}>
        <textarea
          rows={5}
          {...register("message")}
          placeholder="Describe your room size, how many seats you need, or paste a link to your floor drawing."
          className={getInputCls(!!errors.message) + " resize-y"}
        />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-blue hover:bg-ink text-white px-6 py-4 text-base font-bold transition-all disabled:opacity-60 shadow-lg shadow-accent-blue/20"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        {isSubmitting ? "Sending..." : "Request a Quote"}
      </button>
      <p className="text-center text-xs text-muted-foreground mt-2">
        We respond within one working day · trinetraengg.svp@gmail.com
      </p>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-steel mb-1.5">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
