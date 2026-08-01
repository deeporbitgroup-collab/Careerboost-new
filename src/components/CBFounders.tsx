import { Linkedin } from "lucide-react";
import { useI18n } from "@/i18n";

interface Founder {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin: string;
}

const founders: Record<"it" | "en", Founder[]> = {
  it: [
    {
      name: "Leone Fassio",
      role: "Founder — DeepOrbit Group",
      bio: "Founder di CareerPilot, Qoraai, Aurévia, Entity & SkaleStudio. Dean's List ESCP Business School. Investment Banking · Fante Group, Private Banking · Nevastar Finance, Real Estate Investment · Yard Reaas.",
      photo: "/founders/leone-fassio.jpg",
      linkedin: "https://www.linkedin.com/in/leone-fassio/",
    },
    {
      name: "Giacomo Suriano",
      role: "Co-Founder — CareerBoost",
      bio: "M&A Investment Banking · Nomura, J.P. Morgan Private Bank, Equity Capital Markets · UniCredit, Fund & Asset Management · Kervis SGR.",
      photo: "/founders/giacomo-suriano.jpg",
      linkedin: "https://www.linkedin.com/in/giacomo-suriano/",
    },
    {
      name: "Samuele Barni",
      role: "Co-Founder — CareerBoost",
      bio: "Consulente finanziario indipendente con approccio orientato al cliente. Formazione presso l'Università degli Studi di Firenze.",
      photo: "/founders/samuele-barni.jpg",
      linkedin: "https://www.linkedin.com/in/samuele-barni-038b6a194/",
    },
    {
      name: "Marco Merolla",
      role: "Co-Founder — CareerBoost",
      bio: "Doppia laurea in Giurisprudenza (LMG/01) e Management (LM77). Consigliere Forum dei Giovani del Comune di Napoli.",
      photo: "/founders/marco-merolla.jpg",
      linkedin: "https://www.linkedin.com/in/marcomerolla1/",
    },
  ],
  en: [
    {
      name: "Leone Fassio",
      role: "Founder — DeepOrbit Group",
      bio: "Founder of CareerPilot, Qoraai, Aurévia, Entity & SkaleStudio. Dean's List ESCP Business School. Investment Banking · Fante Group, Private Banking · Nevastar Finance, Real Estate Investment · Yard Reaas.",
      photo: "/founders/leone-fassio.jpg",
      linkedin: "https://www.linkedin.com/in/leone-fassio/",
    },
    {
      name: "Giacomo Suriano",
      role: "Co-Founder — CareerBoost",
      bio: "M&A Investment Banking · Nomura, J.P. Morgan Private Bank, Equity Capital Markets · UniCredit, Fund & Asset Management · Kervis SGR.",
      photo: "/founders/giacomo-suriano.jpg",
      linkedin: "https://www.linkedin.com/in/giacomo-suriano/",
    },
    {
      name: "Samuele Barni",
      role: "Co-Founder — CareerBoost",
      bio: "Independent financial advisor with a client-first approach. Educated at the University of Florence.",
      photo: "/founders/samuele-barni.jpg",
      linkedin: "https://www.linkedin.com/in/samuele-barni-038b6a194/",
    },
    {
      name: "Marco Merolla",
      role: "Co-Founder — CareerBoost",
      bio: "Dual degree in Law (LMG/01) and Management (LM77). Youth Forum Councillor for the City of Naples.",
      photo: "/founders/marco-merolla.jpg",
      linkedin: "https://www.linkedin.com/in/marcomerolla1/",
    },
  ],
};

const copy = {
  it: {
    kicker: "Team",
    title: "Founders & Partners",
    subtitle:
      "Professionisti con esperienze dirette nelle realtà più selettive della finanza e del business — mentori che hanno vissuto il percorso che ti insegnano.",
    linkedinLabel: (name: string) => `${name} su LinkedIn`,
  },
  en: {
    kicker: "Team",
    title: "Founders & Partners",
    subtitle:
      "Professionals with direct experience at the most selective firms in finance and business — mentors who have lived the path they teach.",
    linkedinLabel: (name: string) => `${name} on LinkedIn`,
  },
} as const;

export function CBFounders() {
  const { language } = useI18n();
  const c = copy[language];
  return (
    <section
      id="founders"
      className="px-6 py-20 md:py-28"
      style={{ background: "#06060e" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.kicker}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            {c.subtitle}
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {founders[language].map((f) => (
            <div key={f.name} className="flex flex-col">
              {/* Rectangular photo */}
              <div className="overflow-hidden rounded-xl">
                <img
                  src={f.photo}
                  alt={f.name}
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  style={{ filter: "grayscale(100%) contrast(1.05)" }}
                />
              </div>

              {/* Text below photo */}
              <div className="mt-4 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">{f.name}</h3>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-white/30 transition-colors hover:text-cb-glow"
                    aria-label={c.linkedinLabel(f.name)}
                  >
                    <Linkedin className="size-3.5" strokeWidth={1.75} />
                  </a>
                </div>
                <p className="text-xs font-medium text-cb-glow">{f.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
