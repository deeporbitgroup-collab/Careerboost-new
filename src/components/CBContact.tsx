import { useI18n } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const copy = {
  it: {
    title: "Cosa aspetti?",
    subtitle:
      "Il tuo tempo è prezioso, non sprecarlo. Contattaci oggi stesso e saremo lieti di rispondere alle tue domande il prima possibile.",
    cta: "Parla con un nostro esperto",
  },
  en: {
    title: "What are you waiting for?",
    subtitle:
      "Your time is valuable, don't waste it. Get in touch today and we'll be glad to answer your questions as soon as possible.",
    cta: "Talk to one of our experts",
  },
} as const;

export function CBContact() {
  const { language } = useI18n();
  const c = copy[language];
  const anim = useScrollAnimation({ animationClass: "animate-fade-up" });
  return (
    <section id="contatti" className="relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: "radial-gradient(40% 60% at 50% 50%, rgba(36,48,212,0.5), transparent)",
        }}
      />

      <div ref={anim.ref} className="relative mx-auto max-w-6xl px-6 py-20 text-center md:py-28" style={anim.style}>
        <h2 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          {c.subtitle}
        </p>

        <a
          href="mailto:info@careerboost.it"
          className="mt-8 inline-block rounded-full bg-cb-accent px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {c.cta}
        </a>
      </div>
    </section>
  );
}
