import { useI18n } from "@/i18n";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const copy = {
  it: {
    mockInterview: {
      kicker: "Preparazione Tecnica",
      title: "Mock Interview",
      p1: "Simulazioni di colloquio realistiche condotte da professionisti che lavorano o hanno lavorato nelle aziende e nei settori che stai targetando. Ogni sessione copre l'area tecnica, comportamentale e soft skills, con feedback dettagliato al termine per identificare punti di forza e aree di miglioramento.",
      p2: "Le mock interview sono disponibili sia come sessione singola sia abbinate a un percorso completo di preparazione con crash course e revisione del profilo.",
      cta: "Prenota la tua Mock Interview",
      bullets: [
        "Simulazioni su area tecnica, comportamentale e soft skills",
        "Condotte da professionisti dei settori target",
        "Feedback dettagliato al termine di ogni sessione",
        "Sessione singola o abbinata a percorso completo",
      ],
    },
    cvCover: {
      kicker: "Preparazione",
      title: "CV e Cover Letter",
      p1: "Il tuo CV è la prima impressione che dai alle aziende più selettive. Il nostro team di esperti — professionisti attivi nei settori di finanza, consulenza e legal — riscrive e ottimizza il tuo profilo per superare lo screening automatico e colpire i recruiter nel minor tempo possibile.",
      p2: "Ogni cover letter è costruita sulla tua storia, calibrata sull'azienda target e scritta per comunicare chiaramente motivazione e valore aggiunto.",
      cta: "Richiedi la revisione del tuo profilo",
      bullets: [
        "CV riscritto da un esperto del tuo settore di interesse",
        "Cover letter personalizzata e narrativa efficace",
        "Posizionamento ottimizzato per ATS e recruiter",
        "Feedback e revisioni inclusi fino al risultato finale",
      ],
    },
  },
  en: {
    mockInterview: {
      kicker: "Technical Preparation",
      title: "Mock Interview",
      p1: "Realistic interview simulations run by professionals who work or have worked at the companies and in the sectors you're targeting. Every session covers the technical, behavioral and soft-skills areas, with detailed feedback at the end to identify strengths and areas to improve.",
      p2: "Mock interviews are available both as a single session and paired with a complete preparation path including crash courses and profile review.",
      cta: "Book your Mock Interview",
      bullets: [
        "Simulations covering technical, behavioral and soft skills",
        "Run by professionals from your target sectors",
        "Detailed feedback at the end of every session",
        "Single session or paired with a full preparation path",
      ],
    },
    cvCover: {
      kicker: "Preparation",
      title: "CV & Cover Letter",
      p1: "Your CV is the first impression you make on the most selective companies. Our team of experts — active professionals in finance, consulting and legal — rewrites and optimizes your profile to get past automated screening and catch a recruiter's eye as quickly as possible.",
      p2: "Every cover letter is built around your story, calibrated to the target company and written to clearly communicate motivation and added value.",
      cta: "Request a review of your profile",
      bullets: [
        "CV rewritten by an expert in your sector of interest",
        "Personalized cover letter with an effective narrative",
        "Positioning optimized for ATS and recruiters",
        "Feedback and revisions included through to the final result",
      ],
    },
  },
} as const;

export function CBServices() {
  const { language } = useI18n();
  const c = copy[language];
  const mockInterviewAnim = useScrollAnimation({ animationClass: "animate-fade-up" });
  const cvCoverAnim = useScrollAnimation({ animationClass: "animate-fade-up" });
  return (
    <>
      {/* ── Mock Interview ── */}
      <section id="mock-interview" className="px-6 py-20 md:py-28" style={{ background: "#06060e" }}>
        <div className="mx-auto max-w-6xl">
          <div ref={mockInterviewAnim.ref} className="grid gap-12 md:grid-cols-2 md:items-center md:gap-20" style={mockInterviewAnim.style}>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">
                {c.mockInterview.kicker}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {c.mockInterview.title}
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
                {c.mockInterview.p1}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
                {c.mockInterview.p2}
              </p>
              <a
                href="#contatti"
                className="mt-8 inline-block rounded-full bg-cb-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {c.mockInterview.cta}
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl bg-navydark shadow-lg shadow-black/20">
              <div className="h-64 w-full overflow-hidden">
                <img
                  src="/preparazione/mock-interview.png"
                  alt="Mock Interview"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4 p-6">
                {c.mockInterview.bullets.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cb-glow" />
                    <p className="text-sm leading-relaxed text-white/60">{p}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CV e Cover Letter ── */}
      <section id="cv-cover" className="bg-navy px-6 pb-20 md:pb-28" style={{ background: "#0a0a1f" }}>
        <div className="mx-auto max-w-6xl">
          <div ref={cvCoverAnim.ref} className="grid gap-12 md:grid-cols-2 md:items-center md:gap-20" style={cvCoverAnim.style}>

            <div className="overflow-hidden rounded-2xl bg-navydark shadow-lg shadow-black/20">
              <div className="h-64 w-full overflow-hidden">
                <img
                  src="/preparazione/cv-cover.png"
                  alt="CV e Cover Letter"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4 p-6">
                {c.cvCover.bullets.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cb-glow" />
                    <p className="text-sm leading-relaxed text-white/60">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">
                {c.cvCover.kicker}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {c.cvCover.title}
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
                {c.cvCover.p1}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
                {c.cvCover.p2}
              </p>
              <a
                href="#contatti"
                className="mt-8 inline-block rounded-full bg-cb-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {c.cvCover.cta}
              </a>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
