import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Repeat2,
  ChevronDown,
  Linkedin,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { universities, companies } from "@/data/coveredLogos";
import { CURATED_MENTOR_IDS } from "@/data/curatedMentors";
import { MENTOR_BIOS } from "@/data/mentorBios";
import { useI18n, type Language } from "@/i18n";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

interface Mentor {
  id: string;
  name: string;
  photo: string;
  university?: string;
  university2?: string;
  masterProgram?: string;
  sector?: string;
  linkedinUrl?: string;
  bio?: string;
}

type ExplorerCategory = "university" | "master" | "career";

// Universities hidden from the "University" explorer tab on request (kept
// out of the value list; mentors there still surface under Master/Career).
const EXCLUDED_UNIVERSITIES = new Set([
  "queen's university belfast",
  "queens university belfast",
  "university of belfast",
  "universitat pompeu fabra",
  "university of pisa",
  "università degli studi di genova",
]);

// Master's programmes hidden from the "Master Degree" explorer tab on
// request (mentors there still surface under University/Career).
const EXCLUDED_MASTERS = new Set(["heriot-watt university"]);

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const pathwayNav = {
  it: [
    { id: "pathway-liceo",         label: "Liceo → Università",        icon: GraduationCap },
    { id: "pathway-trasferimenti", label: "Trasferimenti Universitari", icon: Repeat2 },
    { id: "pathway-master",        label: "Università → Master",        icon: BookOpen },
    { id: "pathway-internship",    label: "Internship Placement",       icon: Briefcase },
  ],
  en: [
    { id: "pathway-liceo",         label: "High School → University",  icon: GraduationCap },
    { id: "pathway-trasferimenti", label: "University Transfers",      icon: Repeat2 },
    { id: "pathway-master",        label: "University → Master's",     icon: BookOpen },
    { id: "pathway-internship",    label: "Internship Placement",      icon: Briefcase },
  ],
} as const;

const internshipServices = {
  it: [
    {
      title: "Orientamento Settoriale",
      desc: "Call con un professionista che lavora nel settore d'interesse. Analizziamo requisiti, competenze chiave e dinamiche del mercato. Career tips pratici calibrati sul tuo profilo.",
    },
    {
      title: "Personalized Career Roadmap",
      desc: "Ti mettiamo in contatto con un professionista nel tuo campo di interesse. L'esperto esamina il tuo CV e ti intervista per conoscerti meglio. Progetta una roadmap pratica con corsi, competenze, certificazioni e networking.",
    },
    {
      title: "CV, Cover & Interview",
      desc: "CV + cover letter riscritti da un esperto del tuo settore target. Simulazioni di colloquio incluse. Accesso a masterclass specialistiche per la tua area.",
    },
    {
      title: "Expert Career Session",
      desc: "Sessione 1:1 di 60 minuti con un professionista del settore, personalizzata su colloqui, preparazione tecnica e strategia di ruolo. Specifichi in anticipo esattamente di cosa hai bisogno.",
    },
    {
      title: "Outreach Power Pack",
      desc: "Modello pay-per-interview: paghi solo per i colloqui ottenuti. Email di outreach dedicata con il tuo nome. Identifichiamo aziende dove il tuo profilo ha più probabilità di successo. €250 per ogni colloquio confermato — nessuna fee iniziale.",
    },
  ],
  en: [
    {
      title: "Sector Orientation",
      desc: "A call with a professional working in the sector you're interested in. We break down requirements, key skills and market dynamics. Practical career tips tailored to your profile.",
    },
    {
      title: "Personalized Career Roadmap",
      desc: "We connect you with a professional in your field of interest. The expert reviews your CV and interviews you to get to know you better. They design a practical roadmap with courses, skills, certifications and networking.",
    },
    {
      title: "CV, Cover & Interview",
      desc: "CV + cover letter rewritten by an expert in your target sector. Mock interviews included. Access to specialist masterclasses for your area.",
    },
    {
      title: "Expert Career Session",
      desc: "A 60-minute 1:1 session with a sector professional, tailored to interviews, technical preparation and role strategy. You specify in advance exactly what you need.",
    },
    {
      title: "Outreach Power Pack",
      desc: "A pay-per-interview model: you only pay for the interviews you get. A dedicated outreach email under your name. We identify companies where your profile has the best chance of success. €250 per confirmed interview — no upfront fee.",
    },
  ],
} as const;

const masterServices = {
  it: [
    {
      title: "Timeline Personalizzata e Piano di Studio",
      desc: "Timeline con scadenze e piano studio per i test d'ingresso al master. Accesso scontato alle migliori risorse di preparazione. Creata da uno studente dell'università di interesse e presentata in un meeting online 1:1.",
    },
    {
      title: "Riscrizione del CV",
      desc: "CV riscritto da uno studente della tua università di interesse. Analisi dettagliata del profilo prima della riscrittura. Il risultato finale viene presentato in un meeting online 1:1.",
    },
    {
      title: "Analisi Comparativa",
      desc: "Creata da 2+ studenti delle università di interesse. Dati quantitativi + insight non pubblici per facilitare la scelta. Conclusione con KPI di confronto e opinioni personali.",
    },
    {
      title: "Presentazioni Approfondite",
      desc: "Presentazione realizzata da uno studente dell'università di interesse. Dati quantitativi + esperienza personale. Conclusione con consigli di carriera personalizzati.",
    },
    {
      title: "Mentor Office Hours",
      desc: "Call online di 60 minuti con un mentor. Chiedi qualsiasi cosa su GMAT, ammissioni ai master, scelta del programma e molto altro.",
    },
  ],
  en: [
    {
      title: "Personalized Timeline & Study Plan",
      desc: "A timeline with deadlines and a study plan for Master's entrance tests. Discounted access to the best preparation resources. Built by a student from your target university and presented in a 1:1 online meeting.",
    },
    {
      title: "CV Rewrite",
      desc: "CV rewritten by a student from your target university. Detailed profile analysis before the rewrite. The final result is presented in a 1:1 online meeting.",
    },
    {
      title: "Comparative Analysis",
      desc: "Built by 2+ students from your target universities. Quantitative data + non-public insight to help you decide. Wraps up with comparison KPIs and personal opinions.",
    },
    {
      title: "In-Depth Presentations",
      desc: "A presentation built by a student from your target university. Quantitative data + personal experience. Wraps up with personalized career advice.",
    },
    {
      title: "Mentor Office Hours",
      desc: "A 60-minute online call with a mentor. Ask anything about the GMAT, Master's admissions, choosing a program and more.",
    },
  ],
} as const;

const liceoServices = {
  it: [
    {
      title: "Timeline d'accesso",
      desc: "Timeline con scadenze e piano studio per i test d'ingresso. Accesso scontato alle migliori risorse di preparazione. Creata da uno studente dell'università di interesse e presentata in un meeting online 1:1.",
      transferOnly: false,
    },
    {
      title: "Analisi Comparativa",
      desc: "Creata da 2+ studenti delle università di interesse. Dati quantitativi + insight non pubblici per facilitare la scelta. Conclusione con KPI di confronto e opinioni personali.",
      transferOnly: false,
    },
    {
      title: "Presentazione Approfondita",
      desc: "Presentazione realizzata da uno studente dell'università di interesse. Dati quantitativi + esperienza personale. Conclusione con consigli di carriera personalizzati sul tuo profilo.",
      transferOnly: false,
    },
    {
      title: "Mentor Office Hours",
      desc: "Call online di 60 minuti con un mentor. Chiedi qualsiasi cosa su ammissioni, test d'ingresso, piani di studio e molto altro.",
      transferOnly: false,
    },
    {
      title: "Verifica Idoneità al Trasferimento",
      desc: "Contatto diretto con gli Admission Office delle università di interesse. Verifica dell'idoneità al trasferimento e dei requisiti richiesti. Supporto nella raccolta della documentazione necessaria.",
      transferOnly: true,
    },
  ],
  en: [
    {
      title: "Admissions Timeline",
      desc: "A timeline with deadlines and a study plan for entrance tests. Discounted access to the best preparation resources. Built by a student from your target university and presented in a 1:1 online meeting.",
      transferOnly: false,
    },
    {
      title: "Comparative Analysis",
      desc: "Built by 2+ students from your target universities. Quantitative data + non-public insight to help you decide. Wraps up with comparison KPIs and personal opinions.",
      transferOnly: false,
    },
    {
      title: "In-Depth Presentation",
      desc: "A presentation built by a student from your target university. Quantitative data + personal experience. Wraps up with career advice personalized to your profile.",
      transferOnly: false,
    },
    {
      title: "Mentor Office Hours",
      desc: "A 60-minute online call with a mentor. Ask anything about admissions, entrance tests, study plans and more.",
      transferOnly: false,
    },
    {
      title: "Transfer Eligibility Check",
      desc: "Direct contact with the Admissions Offices of your target universities. Verification of transfer eligibility and required documents. Support gathering the necessary paperwork.",
      transferOnly: true,
    },
  ],
} as const;

const accordionCopy = {
  it: { transferOnly: "Solo trasferimenti" },
  en: { transferOnly: "Transfers only" },
} as const;

/* ── Shared accordion list ──────────────────────────────────────────────────── */
function AccordionList({
  services,
  sectionKey,
  openKey,
  setOpenKey,
  language,
}: {
  services: { title: string; desc: string; transferOnly?: boolean }[];
  sectionKey: string;
  openKey: string | null;
  setOpenKey: (k: string | null) => void;
  language: Language;
}) {
  return (
    <div className="flex flex-col divide-y divide-white/8">
      {services.map((svc, i) => {
        const key = `${sectionKey}-${i}`;
        const isOpen = openKey === key;
        return (
          <div key={svc.title}>
            <button
              onClick={() => setOpenKey(isOpen ? null : key)}
              className="flex w-full items-center gap-3 py-4 text-left"
            >
              <span className="flex-1 text-sm font-semibold text-white md:text-base">{svc.title}</span>
              {svc.transferOnly && (
                <span className="mr-2 shrink-0 rounded-full border border-cb-glow/40 bg-cb-glow/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cb-glow">
                  {accordionCopy[language].transferOnly}
                </span>
              )}
              <ChevronDown
                className={`size-4 shrink-0 text-white/30 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-cb-glow" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="pb-4 text-sm leading-relaxed text-white/50">
                {svc.desc}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Mentor card (big square-cornered photo, stacked details below) ─────────── */
function MentorCard({ mentor, viewLinkedinLabel }: { mentor: Mentor; viewLinkedinLabel: string }) {
  return (
    <div className="flex flex-col">
      <div className="aspect-[3/4] w-full overflow-hidden border border-white/10 bg-navydark">
        <img
          src={mentor.photo}
          alt={mentor.name}
          loading="lazy"
          className="h-full w-full object-cover object-top"
          style={{ filter: "grayscale(100%) brightness(1.1) contrast(1.05)" }}
        />
      </div>
      <div className="mt-5 flex items-center gap-2">
        <p className="text-base font-semibold tracking-tight text-white">{mentor.name}</p>
        {mentor.linkedinUrl && (
          <a
            href={mentor.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={viewLinkedinLabel}
            className="shrink-0 text-white/30 transition hover:text-cb-glow"
          >
            <Linkedin className="size-4" />
          </a>
        )}
      </div>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-white/40">
        {[mentor.university, mentor.masterProgram, mentor.sector].filter(Boolean).join(" · ")}
      </p>
      {(mentor.bio || mentor.sector || mentor.university) && (
        <p className="mt-3.5 text-sm italic leading-relaxed text-white/60">
          {mentor.bio || [mentor.sector, mentor.university].filter(Boolean).join(" — ")}
        </p>
      )}
    </div>
  );
}

/* ── Section-scoped mentor picker: fixed category, value list → mentor rows ── */
function SectionMentorPicker({
  groups,
  emptyLabel,
  viewLinkedinLabel,
}: {
  groups: [string, Mentor[]][];
  emptyLabel: string;
  viewLinkedinLabel: string;
}) {
  const [value, setValue] = useState<string | null>(null);
  const mentors = useMemo(() => groups.find(([v]) => v === value)?.[1] ?? [], [groups, value]);

  if (groups.length === 0) return null;

  return (
    <div className="mt-12 border-t border-white/10 pt-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">Mentors</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
        {groups.map(([v]) => {
          const isActive = value === v;
          return (
            <button
              key={v}
              onClick={() => setValue(isActive ? null : v)}
              className={`text-sm underline-offset-4 transition-colors duration-150 ${
                isActive ? "text-white underline decoration-cb-glow" : "text-white/55 hover:text-white/85"
              }`}
            >
              {v}
            </button>
          );
        })}
      </div>
      {value && (
        <div className="mt-6">
          {mentors.length === 0 ? (
            <p className="text-sm text-white/40">{emptyLabel}</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-4">
              {mentors.map((m) => (
                <MentorCard key={m.id} mentor={m} viewLinkedinLabel={viewLinkedinLabel} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Navydark image card ────────────────────────────────────────────────────── */
function PathwayCard({ image, alt, bullets }: { image: string; alt: string; bullets: string[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navydark shadow-lg shadow-black/30">
      <div className="h-56 w-full overflow-hidden md:h-64">
        <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="space-y-3 p-6">
        {bullets.map((b) => (
          <div key={b} className="flex items-start gap-3">
            <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cb-glow" />
            <p className="text-sm leading-relaxed text-white/60">{b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const copy = {
  it: {
    kicker: "Mentoring",
    title: "Mentoring strutturato. Risultati concreti.",
    subtitle:
      "Oltre 60 mentor selezionati — studenti delle migliori università e professionisti delle principali aziende internazionali — ti guidano nelle tappe chiave del tuo percorso.",
    ourMentors: "I nostri mentor",
    ourUniversities: "Università dei nostri mentor",
    ourCompanies: "Aziende dei nostri mentor",
    explorer: {
      kicker: "Come funziona ora",
      title: "Non scegli tu il mentor dal catalogo. Ci pensiamo noi.",
      body: "Il mentoring non è più un servizio a piattaforma: dopo una call gratuita con il team capiamo obiettivi, tempistiche e ciò di cui hai davvero bisogno, e ti affianchiamo il mentor più adatto dal nostro gruppo ristretto — a te basta esplorare chi ne fa parte.",
      categories: {
        university: "University",
        master: "Master Degree",
        career: "Professional Career",
      },
      viewLinkedin: "Profilo LinkedIn",
      empty: "Nessun mentor disponibile per questa categoria al momento.",
    },
    pathwaysKicker: "Percorsi",
    pathwaysTitle: "I percorsi di mentoring",
    pathwaysBadge: "Acquistabili singolarmente o come pacchetto",
    startYourPath: "Inizia il tuo percorso",
    internship: {
      title: "Internship Placement",
      desc: "Supporto completo per entrare nel mondo del lavoro: dall'orientamento settoriale all'outreach mirato, fino alle simulazioni di colloquio con professionisti del settore.",
      alt: "Internship Placement — team in ufficio moderno",
      bullets: [
        "Outreach mirato: paghi solo per i colloqui ottenuti",
        "CV + cover letter riscritti da professionisti del settore",
        "Simulazioni di colloquio con esperti del tuo campo",
        "Roadmap personalizzata basata sul tuo profilo",
      ],
    },
    master: {
      title: "Università → Master",
      desc: "Dalla scelta del programma alla candidatura: un mentor che ha già percorso questa strada ti guida con dati reali, insight non pubblici e un piano operativo concreto.",
      alt: "Università verso Master — cerimonia di laurea",
      bullets: [
        "Timeline personalizzata con scadenze per il GMAT e le ammissioni",
        "CV riscritto da uno studente del master di interesse",
        "Accesso scontato alle risorse di preparazione selezionate",
        "Analisi comparativa tra i programmi target",
      ],
    },
    liceo: {
      titleLine1: "Liceo → Università",
      titleLine2: "& Trasferimenti",
      desc: "Accedi all'università dei tuoi sogni o trasferisciti in un ateneo migliore: mentor che ci sono già passati ti guidano con timeline concrete, analisi comparative e presentazioni approfondite.",
      alt: "Liceo verso Università — studenti in aula universitaria",
      bullets: [
        "Timeline personalizzata con scadenze per i test d'ingresso",
        "Presentazione approfondita dell'ateneo di interesse",
        "Analisi comparativa tra più università",
        "Sessioni 1:1 con studenti già ammessi",
      ],
    },
    becomeMentor: {
      kicker: "Sei un professionista?",
      title: "Entra nella rete CareerBoost e affianca i prossimi talenti nel loro percorso.",
      subtitle: "Condividi la tua esperienza, costruisci il tuo profilo e aiuta studenti e giovani professionisti a raggiungere i loro obiettivi.",
      cta: "Crea il tuo portale →",
    },
  },
  en: {
    kicker: "Mentoring",
    title: "Structured mentoring. Real results.",
    subtitle:
      "Over 60 selected mentors — students from top universities and professionals from leading international companies — guide you through the key stages of your journey.",
    ourMentors: "Our mentors",
    ourUniversities: "Universities of our mentors",
    ourCompanies: "Companies of our mentors",
    explorer: {
      kicker: "How it works now",
      title: "You don't pick a mentor off a list. We do.",
      body: "Mentoring isn't a self-service platform anymore: after a free call with the team, we understand your goals, timeline and what you actually need, then match you with the right mentor from our small bench — you're welcome to explore who's part of it.",
      categories: {
        university: "University",
        master: "Master Degree",
        career: "Professional Career",
      },
      viewLinkedin: "LinkedIn profile",
      empty: "No mentors available for this category right now.",
    },
    pathwaysKicker: "Pathways",
    pathwaysTitle: "Mentoring pathways",
    pathwaysBadge: "Available individually or as a package",
    startYourPath: "Start your journey",
    internship: {
      title: "Internship Placement",
      desc: "Complete support to enter the job market: from sector orientation to targeted outreach, all the way to mock interviews with sector professionals.",
      alt: "Internship Placement — team in a modern office",
      bullets: [
        "Targeted outreach: you only pay for the interviews you get",
        "CV + cover letter rewritten by sector professionals",
        "Mock interviews with experts in your field",
        "Personalized roadmap based on your profile",
      ],
    },
    master: {
      title: "University → Master's",
      desc: "From choosing your program to applying: a mentor who has already walked this path guides you with real data, non-public insight and a concrete action plan.",
      alt: "University to Master's — graduation ceremony",
      bullets: [
        "Personalized timeline with deadlines for the GMAT and admissions",
        "CV rewritten by a student on your target Master's program",
        "Discounted access to selected preparation resources",
        "Comparative analysis across target programs",
      ],
    },
    liceo: {
      titleLine1: "High School → University",
      titleLine2: "& Transfers",
      desc: "Get into your dream university or transfer to a better one: mentors who have already been through it guide you with concrete timelines, comparative analysis and in-depth presentations.",
      alt: "High school to university — students in a university lecture hall",
      bullets: [
        "Personalized timeline with deadlines for entrance tests",
        "In-depth presentation of your target university",
        "Comparative analysis across multiple universities",
        "1:1 sessions with already-admitted students",
      ],
    },
    becomeMentor: {
      kicker: "Are you a professional?",
      title: "Join the CareerBoost network and support the next generation of talent on their journey.",
      subtitle: "Share your experience, build your profile and help students and young professionals reach their goals.",
      cta: "Create your portal →",
    },
  },
} as const;

/* ── Main component ─────────────────────────────────────────────────────────── */
export function CBAboutMentoring() {
  const navigate = useNavigate();
  const { language } = useI18n();
  const c = copy[language];
  const [associates, setMentors] = useState<Mentor[]>([]);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id, first_name, last_name, photo_url, sector, university, university_2, master_program, linkedin_url")
      .eq("role", "ASSOCIATE")
      .eq("status", "approved")
      .not("photo_url", "is", null)
      .in("id", CURATED_MENTOR_IDS)
      .then(({ data }) => {
        if (!data) return;
        const items = data
          .filter((p: any) => p.photo_url?.trim())
          .map((p: any) => ({
            id: p.id as string,
            name: `${(p.first_name || "").trim()} ${(p.last_name || "").trim()}`.trim(),
            photo: p.photo_url as string,
            university: p.university?.trim() || undefined,
            university2: p.university_2?.trim() || undefined,
            masterProgram: p.master_program?.trim() || undefined,
            sector: p.sector?.trim() || undefined,
            linkedinUrl: p.linkedin_url?.trim() || undefined,
            bio: MENTOR_BIOS[p.id as string] || undefined,
          }))
          .filter((p) => p.name.length > 0)
          .sort((a, b) => a.name.localeCompare(b.name));
        setMentors(items);
      });
  }, []);

  /* ── Explorer: University / Master Degree / Professional Career ── */
  const explorerGroups = useMemo(() => {
    const build = (pick: (m: Mentor) => (string | undefined)[]) => {
      const map = new Map<string, Mentor[]>();
      for (const m of associates) {
        for (const raw of pick(m)) {
          const value = raw?.trim();
          if (!value) continue;
          if (!map.has(value)) map.set(value, []);
          const bucket = map.get(value)!;
          if (!bucket.some((x) => x.id === m.id)) bucket.push(m);
        }
      }
      return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    };
    return {
      university: build((m) => [m.university, m.university2]).filter(
        ([value]) => !EXCLUDED_UNIVERSITIES.has(value.toLowerCase())
      ),
      master: build((m) => [m.masterProgram]).filter(
        ([value]) => !EXCLUDED_MASTERS.has(value.toLowerCase())
      ),
      career: build((m) => [m.sector]),
    } satisfies Record<ExplorerCategory, [string, Mentor[]][]>;
  }, [associates]);

  const uniLoop = useMemo(() => [...universities, ...universities, ...universities], []);
  const companyLoop = useMemo(() => [...companies, ...companies, ...companies], []);

  const titleAnim = useScrollAnimation({ animationClass: "animate-fade-up" });
  const pathwaysNavAnim = useStaggeredAnimation(pathwayNav[language].length, { animationClass: "animate-fade-up", staggerDelay: 90 });
  const internshipAnim = useScrollAnimation({ animationClass: "animate-fade-up" });
  const masterAnim = useScrollAnimation({ animationClass: "animate-fade-up" });
  const liceoAnim = useScrollAnimation({ animationClass: "animate-fade-up" });
  const becomeMentorAnim = useScrollAnimation({ animationClass: "animate-fade-up" });

  return (
    <section
      id="about-mentoring"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #0a0a1f 0%, #06060e 30%, #0a0a1f 55%, #06060e 80%, #0a0a1f 100%)" }}
    >

      {/* ── Title ── */}
      <div className="mx-auto max-w-6xl px-6">
        <div ref={titleAnim.ref} className="mx-auto max-w-3xl text-center" style={titleAnim.style}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.kicker}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/55 md:text-base">
            {c.subtitle}
          </p>
        </div>
      </div>

      {/* ── Logo carousels (bare white marks, no cards) ── */}
      <div className="relative mt-12 mx-auto max-w-4xl overflow-hidden">
        <p className="mb-5 px-6 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
          {c.ourUniversities}
        </p>
        <div className="pointer-events-none absolute bottom-0 left-0 top-8 z-10 w-16 bg-gradient-to-r from-[#0a0a1f] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-8 z-10 w-16 bg-gradient-to-l from-[#0a0a1f] to-transparent" />
        <div
          className="flex w-max items-center gap-10 animate-scroll-carousel"
          style={{ animationDuration: "55s" }}
        >
          {uniLoop.map((u, i) => (
            <img
              key={`u-${i}`}
              src={u.logoWhite ?? u.logo}
              alt={u.name}
              loading="eager"
              decoding="async"
              className="h-8 w-auto shrink-0 object-contain opacity-70 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>
      <div className="relative mt-10 mx-auto max-w-4xl overflow-hidden">
        <p className="mb-5 px-6 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
          {c.ourCompanies}
        </p>
        <div className="pointer-events-none absolute bottom-0 left-0 top-8 z-10 w-16 bg-gradient-to-r from-[#0a0a1f] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-8 z-10 w-16 bg-gradient-to-l from-[#0a0a1f] to-transparent" />
        <div
          className="flex w-max items-center gap-10 animate-scroll-carousel-reverse"
          style={{ animationDuration: "50s" }}
        >
          {companyLoop.map((co, i) => (
            <img
              key={`c-${i}`}
              src={co.logoWhite ?? co.logo}
              alt={co.name}
              loading="eager"
              decoding="async"
              className="h-8 w-auto shrink-0 object-contain opacity-70 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>

      {/* ── I percorsi di mentoring ── */}
      <div className="mx-auto mt-20 max-w-6xl px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.pathwaysKicker}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{c.pathwaysTitle}</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cb-glow/30 bg-cb-glow/8 px-3 py-1 text-xs font-medium text-cb-glow">
            {c.pathwaysBadge}
          </span>
        </div>

        <div
          ref={pathwaysNavAnim.containerRef}
          className="grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x md:grid-cols-4"
        >
          {pathwayNav[language].map(({ id, label, icon: Icon }, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`group flex items-center gap-3.5 py-5 text-left transition-colors duration-300 sm:px-6 sm:first:pl-0 sm:last:pr-0 ${pathwaysNavAnim.getItemProps(i).className}`}
              style={pathwaysNavAnim.getItemProps(i).style}
            >
              <span className="font-mono text-[11px] text-cb-glow/40 transition-colors duration-300 group-hover:text-cb-glow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon className="size-4 shrink-0 text-white/30 transition-colors duration-300 group-hover:text-cb-glow" strokeWidth={1.5} />
              <span className="relative text-sm font-medium leading-snug text-white/55 transition-colors duration-300 group-hover:text-white">
                {label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-cb-glow transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          INTERNSHIP PLACEMENT  —  accordion left | card right
      ══════════════════════════════════════════════════════════════════════ */}
      <div id="pathway-internship" className="mx-auto mt-20 max-w-6xl scroll-mt-24 px-6">
        <div ref={internshipAnim.ref} className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16" style={internshipAnim.style}>

          {/* Left — accordion */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.kicker}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {c.internship.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {c.internship.desc}
            </p>
            <div className="mt-8">
              <AccordionList
                services={internshipServices[language]}
                sectionKey="internship"
                openKey={openKey}
                setOpenKey={setOpenKey}
                language={language}
              />
            </div>
            <button
              onClick={() => navigate("/client-portal/auth")}
              className="mt-8 rounded-full bg-cb-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {c.startYourPath}
            </button>
          </div>

          {/* Right — card */}
          <PathwayCard
            image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=85"
            alt={c.internship.alt}
            bullets={c.internship.bullets}
          />

          {/* Full width — mentors */}
          <div className="md:col-span-2">
            <SectionMentorPicker
              groups={explorerGroups.career}
              emptyLabel={c.explorer.empty}
              viewLinkedinLabel={c.explorer.viewLinkedin}
            />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          UNIVERSITÀ → MASTER  —  card left | accordion right
      ══════════════════════════════════════════════════════════════════════ */}
      <div id="pathway-master" className="mx-auto mt-20 max-w-6xl scroll-mt-24 px-6">
        <div ref={masterAnim.ref} className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16" style={masterAnim.style}>

          {/* Left — card */}
          <PathwayCard
            image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=85"
            alt={c.master.alt}
            bullets={c.master.bullets}
          />

          {/* Right — accordion */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.kicker}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {c.master.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {c.master.desc}
            </p>
            <div className="mt-8">
              <AccordionList
                services={masterServices[language]}
                sectionKey="master"
                openKey={openKey}
                setOpenKey={setOpenKey}
                language={language}
              />
            </div>
            <button
              onClick={() => navigate("/client-portal/auth")}
              className="mt-8 rounded-full bg-cb-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {c.startYourPath}
            </button>
          </div>

          {/* Full width — mentors */}
          <div className="md:col-span-2">
            <SectionMentorPicker
              groups={explorerGroups.master}
              emptyLabel={c.explorer.empty}
              viewLinkedinLabel={c.explorer.viewLinkedin}
            />
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LICEO → UNIVERSITÀ & TRASFERIMENTI  —  accordion left | card right
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="mx-auto mt-20 max-w-6xl scroll-mt-24 px-6">
        {/* twin anchors so both nav cards scroll here */}
        <div id="pathway-liceo" />
        <div id="pathway-trasferimenti" style={{ marginTop: -1 }} />

        <div ref={liceoAnim.ref} className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16" style={liceoAnim.style}>

          {/* Left — accordion */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.kicker}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {c.liceo.titleLine1}<br />{c.liceo.titleLine2}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {c.liceo.desc}
            </p>
            <div className="mt-8">
              <AccordionList
                services={liceoServices[language]}
                sectionKey="liceo"
                openKey={openKey}
                setOpenKey={setOpenKey}
                language={language}
              />
            </div>
            <button
              onClick={() => navigate("/client-portal/auth")}
              className="mt-8 rounded-full bg-cb-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {c.startYourPath}
            </button>
          </div>

          {/* Right — card */}
          <PathwayCard
            image="https://images.unsplash.com/photo-1758270704787-615782711641?w=800&q=85"
            alt={c.liceo.alt}
            bullets={c.liceo.bullets}
          />

          {/* Full width — mentors */}
          <div className="md:col-span-2">
            <SectionMentorPicker
              groups={explorerGroups.university}
              emptyLabel={c.explorer.empty}
              viewLinkedinLabel={c.explorer.viewLinkedin}
            />
          </div>

        </div>
      </div>

      {/* ── Diventa mentor ── */}
      <div ref={becomeMentorAnim.ref} className="mx-auto mt-16 max-w-6xl px-6" style={becomeMentorAnim.style}>
        <div className="border-t border-white/10 pt-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">{c.becomeMentor.kicker}</p>
          <p className="mt-3 text-lg font-semibold text-white md:text-xl">
            {c.becomeMentor.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/45 max-w-xl mx-auto">
            {c.becomeMentor.subtitle}
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="mt-6 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/70 transition hover:border-cb-glow/50 hover:text-white"
          >
            {c.becomeMentor.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
