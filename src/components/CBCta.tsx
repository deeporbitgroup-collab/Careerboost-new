import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const copy = {
  it: { kicker: "Inizia ora", title: "Cosa aspetti?", cta: "Parla con un nostro esperto" },
  en: { kicker: "Get started", title: "What are you waiting for?", cta: "Talk to one of our experts" },
} as const;

export function CBCta() {
  const navigate = useNavigate();
  const { language } = useI18n();
  const c = copy[language];
  const anim = useScrollAnimation({ animationClass: "animate-fade-up" });
  return (
    <section
      ref={anim.ref}
      className="relative overflow-hidden px-6 py-20 text-center"
      style={{ background: "radial-gradient(60% 70% at 50% 50%, rgba(36,48,212,0.45), transparent), #0a0a1f", ...anim.style }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.kicker}</p>
      <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">{c.title}</h2>
      <div className="mt-8">
        <button
          onClick={() => navigate("/client-portal/auth")}
          className="rounded-full bg-cb-accent px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          {c.cta}
        </button>
      </div>
    </section>
  );
}
