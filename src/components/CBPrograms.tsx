import { useI18n } from "@/i18n";

const programs = {
  it: [
    {
      image: "/masterclass/ib.png",
      title: "Investment Banking Masterclass",
      description:
        "Un corso all-in-one che accelera il tuo ingresso e successo nel mondo dell'IB, da accounting a temi avanzati di corporate finance, fino alla tassazione e profili legali delle operazioni straordinarie.",
    },
    {
      image: "/masterclass/pe.png",
      title: "Private Equity Masterclass",
      description:
        "Dal caso studio alla deal room: il percorso pratico per entrare nei principali fondi di PE e boutique di advisory.",
    },
    {
      image: "/masterclass/awm.png",
      title: "Asset & Wealth Management Masterclass",
      description:
        "Dai mercati al portafoglio: acquisisci le competenze per entrare nelle principali SGR e private bank in Italia e in Europa.",
    },
  ],
  en: [
    {
      image: "/masterclass/ib.png",
      title: "Investment Banking Masterclass",
      description:
        "An all-in-one course that accelerates your entry and success in IB, from accounting to advanced corporate finance topics, through to taxation and the legal profiles of extraordinary transactions.",
    },
    {
      image: "/masterclass/pe.png",
      title: "Private Equity Masterclass",
      description:
        "From case study to deal room: the practical path to breaking into leading PE funds and advisory boutiques.",
    },
    {
      image: "/masterclass/awm.png",
      title: "Asset & Wealth Management Masterclass",
      description:
        "From markets to portfolio: build the skills to join leading asset managers and private banks in Italy and across Europe.",
    },
  ],
} as const;

const copy = {
  it: { title: "Le nostre masterclass", cta: "Scopri di più" },
  en: { title: "Our masterclasses", cta: "Learn more" },
} as const;

export function CBPrograms() {
  const { language } = useI18n();
  const c = copy[language];
  return (
    <section id="masterclass" className="relative overflow-hidden bg-navy px-6 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(45% 40% at 20% 30%, rgba(36,48,212,0.45), transparent), radial-gradient(45% 40% at 80% 70%, rgba(36,48,212,0.35), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {c.title}
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {programs[language].map(({ image, title, description }) => (
            <div
              key={title}
              className="group overflow-hidden rounded-2xl bg-navydark shadow-sm shadow-black/20"
            >
              <div className="w-full overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>
                <a
                  href="#contatti"
                  className="mt-5 inline-block rounded-full bg-cb-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  {c.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
