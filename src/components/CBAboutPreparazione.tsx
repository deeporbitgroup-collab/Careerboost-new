import { useState } from "react";
import {
  GraduationCap,
  Mic2,
  Zap,
  PenLine,
  TrendingUp,
  Globe,
  ArrowRight,
  ChevronDown,
  Languages,
} from "lucide-react";
import { useI18n } from "@/i18n";

const services = {
  it: [
    {
      icon: GraduationCap,
      title: "Masterclass specialistiche",
      anchor: "masterclass",
      description: null,
    },
    {
      icon: Mic2,
      title: "Mock interview tecniche e HR",
      anchor: "mock-interview",
      description: null,
    },
    {
      icon: Zap,
      title: "Crash course personalizzati",
      anchor: null,
      description:
        "Contenuti tecnici avanzati costruiti attorno ai tuoi gap formativi: dalla finanza aziendale alle valutazioni, dalla modellistica finanziaria all'analisi settoriale. Ogni crash course è mirato e conciso, pensato per alzare rapidamente il tuo livello prima di un processo selettivo.",
    },
    {
      icon: PenLine,
      title: "Revisione e Riscrittura CV & Cover Letter",
      anchor: "cv-cover",
      description: null,
    },
    {
      icon: TrendingUp,
      title: "Valutazione progressi e career coaching",
      anchor: null,
      description:
        "Una seconda mock interview a metà o fine percorso per misurare i progressi reali e individuare gli ultimi punti critici. Abbinata a una sessione di career coaching, ti aiuta a costruire una strategia chiara su candidature, posizionamento professionale e prossimi passi concreti.",
    },
    {
      icon: Globe,
      title: "Certificazioni linguistiche (LanguageBoost)",
      anchor: null,
      description:
        "Percorsi strutturati per IELTS, TOEFL, GMAT e certificazioni internazionali: materiali selezionati, simulazioni d'esame e supporto di esperti linguistici. Un certificato solido amplifica ogni sezione del tuo CV e apre le porte a master e posizioni internazionali.",
    },
  ],
  en: [
    {
      icon: GraduationCap,
      title: "Specialist masterclasses",
      anchor: "masterclass",
      description: null,
    },
    {
      icon: Mic2,
      title: "Technical & HR mock interviews",
      anchor: "mock-interview",
      description: null,
    },
    {
      icon: Zap,
      title: "Personalized crash courses",
      anchor: null,
      description:
        "Advanced technical content built around your specific gaps: from corporate finance to valuation, from financial modeling to sector analysis. Every crash course is targeted and concise, designed to quickly raise your level before a selection process.",
    },
    {
      icon: PenLine,
      title: "CV & Cover Letter Review and Rewrite",
      anchor: "cv-cover",
      description: null,
    },
    {
      icon: TrendingUp,
      title: "Progress evaluation & career coaching",
      anchor: null,
      description:
        "A second mock interview mid-way or at the end of your journey to measure real progress and spot any remaining weak points. Paired with a career coaching session, it helps you build a clear strategy on applications, professional positioning and concrete next steps.",
    },
    {
      icon: Globe,
      title: "Language certifications (LanguageBoost)",
      anchor: null,
      description:
        "Structured paths for IELTS, TOEFL, GMAT and international certifications: curated materials, exam simulations and support from language experts. A strong certificate strengthens every section of your CV and opens doors to Master's programs and international roles.",
    },
  ],
} as const;

const copy = {
  it: {
    kicker: "Preparazione",
    title: "Preparazione d'eccellenza per ogni ambizione",
    subtitle:
      "CareerBoost offre un ecosistema di servizi di preparazione per accompagnare studenti e neolaureati dall'università al mondo del lavoro, attraverso formazione tecnica specialistica, preparazione ai processi di selezione e accesso a un network di aziende leader.",
    servicesLabel: "I servizi di CareerBoost comprendono",
    featuredLabel: "In evidenza",
    languageBoostTitle: "Un nuovo standard nella formazione linguistica",
    languageBoostDesc:
      "Preparazione strutturata a IELTS, TOEFL, GMAT e certificazioni internazionali. Un certificato solido amplifica ogni sezione del tuo CV e apre le porte a master e posizioni internazionali.",
    languageBoostCta: "Scopri LanguageBoost",
  },
  en: {
    kicker: "Preparation",
    title: "Excellence-level preparation for every ambition",
    subtitle:
      "CareerBoost offers an ecosystem of preparation services to guide students and recent graduates from university into the job market, through specialist technical training, selection process preparation and access to a network of leading companies.",
    servicesLabel: "CareerBoost's services include",
    featuredLabel: "Featured",
    languageBoostTitle: "A new standard in language training",
    languageBoostDesc:
      "Structured preparation for IELTS, TOEFL, GMAT and international certifications. A strong certificate strengthens every section of your CV and opens doors to Master's programs and international roles.",
    languageBoostCta: "Discover LanguageBoost",
  },
} as const;

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export function CBAboutPreparazione() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useI18n();
  const c = copy[language];

  return (
    <section id="about-preparazione" className="py-20 md:py-28" style={{ background: "#06060e" }}>
      <div className="mx-auto max-w-6xl px-6">

        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">
            {c.kicker}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.title}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
            {c.subtitle}
          </p>
        </div>

        {/* 2-col: list left / LanguageBoost right */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">

          {/* Left — services list */}
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {c.servicesLabel}
            </p>

            <div className="flex flex-col divide-y divide-white/8">
              {services[language].map(({ icon: Icon, title, anchor, description }, i) =>
                anchor ? (
                  /* Linked item — arrow right, scrolls to section */
                  <button
                    key={title}
                    onClick={() => scrollTo(anchor)}
                    className="group flex items-center gap-4 py-4 text-left transition"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cb-glow/20 bg-cb-glow/8">
                      <Icon className="size-5 text-cb-glow" strokeWidth={1.5} />
                    </div>
                    <span className="flex-1 text-base font-semibold text-white md:text-lg">
                      {title}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-white/25 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-cb-glow" />
                  </button>
                ) : (
                  /* Descriptive item — accordion with down arrow */
                  <div key={title}>
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon className="size-5 text-white/40" strokeWidth={1.5} />
                      </div>
                      <span className="flex-1 text-base font-semibold text-white md:text-lg">
                        {title}
                      </span>
                      <ChevronDown
                        className={`size-4 shrink-0 text-white/30 transition-transform duration-200 ${
                          openIndex === i ? "rotate-180 text-cb-glow" : ""
                        }`}
                      />
                    </button>
                    {openIndex === i && (
                      <p className="pb-4 pl-14 text-sm leading-relaxed text-white/50 md:text-base">
                        {description}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right — LanguageBoost card */}
          <div className="flex flex-col gap-4 lg:pt-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {c.featuredLabel}
            </p>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navydark p-6">
              <svg
                className="pointer-events-none absolute right-0 top-0 h-full w-3/4 opacity-30"
                viewBox="0 0 300 200"
                fill="none"
              >
                <path
                  d="M20 20 C 80 20, 40 100, 100 100 S 180 20, 220 60 S 260 160, 280 120"
                  stroke="#2430d4"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="relative flex items-center gap-2 text-sm font-semibold text-cb-glow">
                <Languages className="size-4" strokeWidth={1.5} />
                LanguageBoost
              </div>

              <h3 className="relative mt-4 text-lg font-semibold leading-snug text-white">
                {c.languageBoostTitle}
              </h3>

              <p className="relative mt-3 text-sm leading-relaxed text-white/50">
                {c.languageBoostDesc}
              </p>

              <a
                href="#cv-cover"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("cv-cover");
                }}
                className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cb-glow transition hover:opacity-80"
              >
                {c.languageBoostCta}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
