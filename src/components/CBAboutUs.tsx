import {
  Users,
  GraduationCap,
  BookOpen,
  Briefcase,
  Target,
  Presentation,
  MessageSquare,
  FileText,
  Building2,
  Eye,
  Star,
  Handshake,
} from "lucide-react";
import { useI18n } from "@/i18n";

const pillars = {
  it: [
    {
      title: "Mentoring",
      icon: Users,
      items: [
        { label: "Liceo → Università", icon: GraduationCap },
        { label: "Università → Master", icon: BookOpen },
        { label: "Internship Placement", icon: Briefcase },
      ],
    },
    {
      title: "Preparazione",
      icon: Target,
      items: [
        { label: "Masterclass", icon: Presentation },
        { label: "Mock Interview", icon: MessageSquare },
        { label: "CV & Cover Letter", icon: FileText },
      ],
    },
    {
      title: "Talent Pool",
      icon: Building2,
      items: [
        { label: "Visibilità presso aziende registrate", icon: Eye },
        { label: "Valorizzazione del profilo", icon: Star },
        { label: "Selezione Diretta", icon: Handshake },
      ],
    },
  ],
  en: [
    {
      title: "Mentoring",
      icon: Users,
      items: [
        { label: "High School → University", icon: GraduationCap },
        { label: "University → Master's", icon: BookOpen },
        { label: "Internship Placement", icon: Briefcase },
      ],
    },
    {
      title: "Preparation",
      icon: Target,
      items: [
        { label: "Masterclasses", icon: Presentation },
        { label: "Mock Interview", icon: MessageSquare },
        { label: "CV & Cover Letter", icon: FileText },
      ],
    },
    {
      title: "Talent Pool",
      icon: Building2,
      items: [
        { label: "Visibility with registered companies", icon: Eye },
        { label: "Profile enhancement", icon: Star },
        { label: "Direct selection", icon: Handshake },
      ],
    },
  ],
} as const;

const copy = {
  it: {
    kicker: "Chi siamo",
    title: "Un unico partner per il tuo percorso",
    p1: "CareerBoost supporta studenti e giovani professionisti nelle principali tappe del loro percorso: dal liceo all'università, nei trasferimenti universitari, nell'accesso ai Master e nel placement di internship e opportunità professionali.",
    p2: "Uniamo mentoring, preparazione pratica e accesso a opportunità concrete, con oltre 60 mentor provenienti dalle migliori aziende e università internazionali, materiali dedicati alla preparazione e una Talent Pool che permette alle aziende di entrare direttamente in contatto con profili selezionati.",
  },
  en: {
    kicker: "About us",
    title: "One partner for your entire journey",
    p1: "CareerBoost supports students and young professionals through the key stages of their journey: from high school to university, through university transfers, into Master's admissions, and into internship placement and professional opportunities.",
    p2: "We bring together mentoring, hands-on preparation and access to real opportunities, with over 60 mentors from top international companies and universities, dedicated preparation materials, and a Talent Pool that lets companies connect directly with selected profiles.",
  },
} as const;

export function CBAboutUs() {
  const { language } = useI18n();
  const c = copy[language];
  return (
    <section id="chi-siamo" className="px-6 py-20 md:py-28" style={{ background: "#06060e" }}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.kicker}</p>
          <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-white md:text-4xl">
            {c.title}
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/60 md:text-base">
            <p>{c.p1}</p>
            <p>{c.p2}</p>
          </div>
        </div>

        {/* 3-pillar diagram */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars[language].map(({ title, icon: PillarIcon, items }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-cb-accent to-[#4338ca] px-5 py-4 shadow-lg shadow-cb-accent/20">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <PillarIcon className="size-[18px] text-white" strokeWidth={1.75} />
                </div>
                <span className="text-base font-semibold text-white">{title}</span>
              </div>

              <div className="h-6 w-px bg-white/15" />

              <div className="flex w-full flex-col gap-3">
                {items.map(({ label, icon: ItemIcon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-navydark px-4 py-3.5 transition-colors hover:border-cb-accent/40"
                  >
                    <ItemIcon className="size-4 shrink-0 text-cb-glow" strokeWidth={1.75} />
                    <span className="text-sm font-medium text-white/85">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
