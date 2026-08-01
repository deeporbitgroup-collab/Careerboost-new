import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n";

const services = {
  it: [
    {
      title: "Mentoring",
      image: "/services/mentoring.jpg",
      description:
        "Affiancamento one-to-one da parte di professionisti che hanno già percorso la tua strada: scegli il mentor giusto e costruisci il tuo percorso verso il primo lavoro o il master ideale.",
      anchor: "#about-mentoring",
      cta: "Scopri",
    },
    {
      title: "Preparazione Tecnica",
      image: "/services/preparazione.jpg",
      description:
        "Mock interview, masterclass specialistiche su Investment Banking, Private Equity e Asset Management, crash course e revisione CV per arrivare ai processi selettivi con la preparazione giusta.",
      anchor: "#about-preparazione",
      cta: "Scopri",
    },
    {
      title: "Talent Pool",
      image: "/services/talent-pool.jpg",
      description:
        "Crea il tuo profilo con CV, cover letter e video di presentazione: le aziende partner ti trovano direttamente, gestiscono colloqui e offerte in un'unica piattaforma dedicata.",
      anchor: "#about-talent-pool",
      cta: "Scopri",
    },
  ],
  en: [
    {
      title: "Mentoring",
      image: "/services/mentoring.jpg",
      description:
        "One-to-one support from professionals who have already walked your path: pick the right mentor and build your route to your first job or your ideal Master's.",
      anchor: "#about-mentoring",
      cta: "Discover",
    },
    {
      title: "Technical Preparation",
      image: "/services/preparazione.jpg",
      description:
        "Mock interviews, specialist masterclasses on Investment Banking, Private Equity and Asset Management, crash courses and CV review to reach selection processes fully prepared.",
      anchor: "#about-preparazione",
      cta: "Discover",
    },
    {
      title: "Talent Pool",
      image: "/services/talent-pool.jpg",
      description:
        "Create your profile with CV, cover letter and video introduction: partner companies find you directly and manage interviews and offers on one dedicated platform.",
      anchor: "#about-talent-pool",
      cta: "Discover",
    },
  ],
} as const;

const copy = {
  it: { kicker: "CareerBoost", title: "I nostri servizi" },
  en: { kicker: "CareerBoost", title: "Our services" },
} as const;

export function CBOurServices() {
  const { language } = useI18n();
  const c = copy[language];
  const scrollTo = (anchor: string) => {
    const el = document.getElementById(anchor.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-20 md:py-28 bg-navy">
      <div className="mx-auto max-w-6xl px-6">

        {/* Title */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">{c.kicker}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {services[language].map((s) => (
            <div
              key={s.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-transparent transition-all duration-300 hover:border-white/60 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.06)]"
            >
              {/* Image */}
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                  {s.description}
                </p>

                {/* Scopri → bottom right */}
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => scrollTo(s.anchor)}
                    className="flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-100"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    {s.cta}
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
