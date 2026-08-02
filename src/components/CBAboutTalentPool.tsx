import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { partnerCompanies } from "@/data/partnerCompanies";
import { useI18n } from "@/i18n";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const studentSteps = {
  it: [
    {
      n: "01",
      title: "Crea il tuo profilo",
      desc: "Registrati e carica CV, cover letter e, se vuoi, un video di presentazione di 60 secondi. Il tutto in meno di 10 minuti.",
    },
    {
      n: "02",
      title: "Entra nel Talent Pool",
      desc: "Il tuo profilo diventa immediatamente visibile alle aziende partner già registrate in piattaforma.",
    },
    {
      n: "03",
      title: "Gestisci colloqui e offerte",
      desc: "Le aziende ti contattano direttamente: ricevi notifiche, gestisci colloqui, test tecnici e offerte — tutto in un unico posto.",
    },
  ],
  en: [
    {
      n: "01",
      title: "Create your profile",
      desc: "Sign up and upload your CV, cover letter and, if you want, a 60-second introduction video. All in under 10 minutes.",
    },
    {
      n: "02",
      title: "Join the Talent Pool",
      desc: "Your profile becomes immediately visible to partner companies already registered on the platform.",
    },
    {
      n: "03",
      title: "Manage interviews and offers",
      desc: "Companies contact you directly: get notifications, manage interviews, technical tests and offers — all in one place.",
    },
  ],
} as const;

const companySteps = {
  it: [
    {
      n: "01",
      title: "Registrazione gratuita",
      desc: "Accedi all'area aziende in pochi minuti, senza costi di iscrizione. Compila il profilo aziendale e imposta i tuoi criteri di ricerca.",
    },
    {
      n: "02",
      title: "Sfoglia i candidati selezionati",
      desc: "Visualizza CV, cover letter e video di presentazione di profili già verificati da CareerBoost — dalle boutique alle corporate.",
    },
    {
      n: "03",
      title: "Contatta e seleziona",
      desc: "Fissa colloqui, invia test tecnici e formula offerte direttamente dalla piattaforma. Notifiche automatiche via email gestiscono tutto.",
    },
  ],
  en: [
    {
      n: "01",
      title: "Free registration",
      desc: "Access the companies area in minutes, with no sign-up costs. Fill in your company profile and set your search criteria.",
    },
    {
      n: "02",
      title: "Browse selected candidates",
      desc: "View CVs, cover letters and introduction videos from profiles already verified by CareerBoost — from boutiques to corporates.",
    },
    {
      n: "03",
      title: "Contact and select",
      desc: "Schedule interviews, send technical tests and make offers directly from the platform. Automatic email notifications handle the rest.",
    },
  ],
} as const;

const copy = {
  it: {
    kicker: "Talent Pool",
    title: "Connetti il tuo profilo alle migliori aziende",
    subtitle:
      "La Talent Pool di CareerBoost connette studenti e giovani professionisti con aziende registrate — dalle boutique specializzate alle grandi corporate italiane e internazionali.",
    registeredCompanies: "Aziende registrate",
    studentCard: {
      kicker: "Per Studenti",
      title: "Entra nel radar delle aziende migliori",
      subtitle: "Crea un profilo completo e lascia che le aziende vengano da te. Nessuna candidatura al buio: visibilità immediata, opportunità concrete.",
      cta: "Crea il tuo profilo",
      alt: "Studenti che lavorano su laptop",
      bullets: [
        "Profilo con CV, cover letter e video di presentazione",
        "Visibilità diretta presso aziende partner verificate",
        "Colloqui, test e offerte gestiti in un'unica piattaforma",
      ],
    },
    companyCard: {
      kicker: "Per Aziende",
      title: "Trova i talenti già selezionati per te",
      subtitle: "Profili verificati da CareerBoost, candidature qualificate e un processo di selezione completamente automatizzato.",
      cta: "Registrati come azienda",
      alt: "HR che valuta il profilo di un candidato in un colloquio",
      bullets: [
        "Accesso gratuito a candidati verificati e selezionati",
        "Chat, test tecnici e fissaggio colloqui integrati",
        "Notifiche email automatiche — zero tempo perso",
      ],
    },
    studentSection: {
      kicker: "Studenti",
      title: "Come funziona per te",
      subtitle: "Registrati una volta sola. Il tuo profilo rimane visibile a tutte le aziende partner — senza dover candidarti di volta in volta.",
      cta: "Registrati gratuitamente",
      alt: "Studente che usa la piattaforma su laptop",
      personalAreaLabel: "Area personale",
      personalAreaDesc: "Dashboard dedicata: monitora le aziende che hanno visualizzato il tuo profilo, gestisci colloqui programmati e accedi ai materiali di preparazione.",
    },
    companySection: {
      kicker: "Aziende",
      title: "Accedi ai talenti, senza perdere tempo",
      subtitle: "Nessun processo complicato. Registrati gratuitamente, sfoglia i profili selezionati e contatta direttamente i candidati che ti interessano.",
      alt: "Team aziendale che analizza i profili dei candidati su un laptop",
      dashboardLabel: "Dashboard aziendale",
      dashboardDesc: "Accesso immediato a tutti i profili disponibili: CV, cover letter, video di presentazione e storico di candidature — in un'unica schermata.",
      automationLabel: "Automazione integrata",
      automationDesc: "Notifiche e colloqui in automatico",
      cta: "Registrati come azienda →",
    },
  },
  en: {
    kicker: "Talent Pool",
    title: "Connect your profile to the best companies",
    subtitle:
      "CareerBoost's Talent Pool connects students and young professionals with registered companies — from specialist boutiques to major Italian and international corporates.",
    registeredCompanies: "Registered companies",
    studentCard: {
      kicker: "For Students",
      title: "Get on the radar of the best companies",
      subtitle: "Create a complete profile and let companies come to you. No applying into the void: immediate visibility, real opportunities.",
      cta: "Create your profile",
      alt: "Students working on laptops",
      bullets: [
        "Profile with CV, cover letter and introduction video",
        "Direct visibility with verified partner companies",
        "Interviews, tests and offers managed on one platform",
      ],
    },
    companyCard: {
      kicker: "For Companies",
      title: "Find talent already selected for you",
      subtitle: "Profiles verified by CareerBoost, qualified applications and a fully automated selection process.",
      cta: "Register as a company",
      alt: "HR professional reviewing a candidate's profile during an interview",
      bullets: [
        "Free access to verified, hand-picked candidates",
        "Built-in chat, technical tests and interview scheduling",
        "Automatic email notifications — zero time wasted",
      ],
    },
    studentSection: {
      kicker: "Students",
      title: "How it works for you",
      subtitle: "Sign up once. Your profile stays visible to all partner companies — no need to apply again and again.",
      cta: "Sign up for free",
      alt: "Student using the platform on a laptop",
      personalAreaLabel: "Personal area",
      personalAreaDesc: "A dedicated dashboard: track which companies have viewed your profile, manage scheduled interviews and access preparation materials.",
    },
    companySection: {
      kicker: "Companies",
      title: "Access talent, without wasting time",
      subtitle: "No complicated process. Sign up for free, browse selected profiles and contact the candidates you're interested in directly.",
      alt: "Company team reviewing candidate profiles on a laptop",
      dashboardLabel: "Company dashboard",
      dashboardDesc: "Immediate access to every available profile: CV, cover letter, introduction video and application history — all on one screen.",
      automationLabel: "Built-in automation",
      automationDesc: "Automatic notifications and interview scheduling",
      cta: "Register as a company →",
    },
  },
} as const;

/* ── White line-art route map: London ↔ Milan hubs ─────────────────────────── */
const routeMapLabels = {
  it: { london: "LONDRA", milan: "MILANO" },
  en: { london: "LONDON", milan: "MILAN" },
} as const;

function RouteMap() {
  const { language } = useI18n();
  const labels = routeMapLabels[language];
  return (
    <div className="relative mx-auto w-full max-w-[300px] md:max-w-none">
      <svg viewBox="0 0 320 300" className="h-full w-full" fill="none" aria-hidden="true">

        {/* Abstract, decorative coastline sketch — western Europe, single stroke */}
        <path
          d="M46,26
             C 40,44 54,54 48,70
             C 40,90 60,96 56,116
             C 52,140 78,146 74,168
             C 70,192 96,196 100,218
             C 104,240 128,244 140,262
             C 156,282 190,270 210,252
             C 226,238 214,222 232,210
             C 250,198 244,176 262,168
             C 278,160 270,140 252,134
             C 236,128 240,108 224,100
             C 208,92 210,72 192,66
             C 172,60 168,40 148,36
             C 122,30 96,24 46,26 Z"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />

        {/* Flight path London → Milan */}
        <path
          d="M92,64 C 130,50 150,110 196,192"
          stroke="#4FD1E8"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Plane glyph, sat on the path partway along */}
        <g transform="translate(148,118) rotate(58)">
          <path
            d="M0,-7 L1.6,-1.5 L8,1 L8,2.6 L1.6,1.6 L0.8,6.5 L2.6,8.2 L2.6,9.4 L0,8.4 L-2.6,9.4 L-2.6,8.2 L-0.8,6.5 L-1.6,1.6 L-8,2.6 L-8,1 L-1.6,-1.5 Z"
            fill="#ffffff"
          />
        </g>

        {/* London hub */}
        <g transform="translate(92,64)">
          <circle
            r="16"
            stroke="rgba(79,209,232,0.3)"
            strokeWidth="1"
            className="origin-center animate-ping"
            style={{ transformBox: "fill-box", animationDuration: "3s" }}
          />
          <circle r="10" stroke="rgba(79,209,232,0.45)" strokeWidth="1" />
          <circle r="3.5" fill="#4FD1E8" />
          <text
            x="0"
            y="-24"
            textAnchor="middle"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1.5"
            fill="#ffffff"
            fillOpacity="0.85"
          >
            {labels.london}
          </text>
        </g>

        {/* Milan hub */}
        <g transform="translate(196,192)">
          <circle
            r="16"
            stroke="rgba(79,209,232,0.3)"
            strokeWidth="1"
            className="origin-center animate-ping"
            style={{ transformBox: "fill-box", animationDuration: "3s", animationDelay: "1.2s" }}
          />
          <circle r="10" stroke="rgba(79,209,232,0.45)" strokeWidth="1" />
          <circle r="3.5" fill="#4FD1E8" />
          <text
            x="0"
            y="30"
            textAnchor="middle"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1.5"
            fill="#ffffff"
            fillOpacity="0.85"
          >
            {labels.milan}
          </text>
        </g>
      </svg>
    </div>
  );
}

export function CBAboutTalentPool() {
  const navigate = useNavigate();
  const { language } = useI18n();
  const c = copy[language];
  const companyLoop = useMemo(() => [...partnerCompanies, ...partnerCompanies, ...partnerCompanies], []);

  const titleAnim = useScrollAnimation({ animationClass: "animate-fade-up" });
  const introCardsAnim = useStaggeredAnimation(2, { animationClass: "animate-fade-up", staggerDelay: 150 });
  const studentSectionAnim = useScrollAnimation({ animationClass: "animate-fade-up" });
  const companySectionAnim = useScrollAnimation({ animationClass: "animate-fade-up" });

  return (
    <section
      id="about-talent-pool"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #0a0a1f 0%, #06060e 30%, #0a0a1f 55%, #06060e 80%, #0a0a1f 100%)" }}
    >

      {/* ── Title ── */}
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={titleAnim.ref}
          className="grid items-center gap-10 md:grid-cols-[300px_1fr] md:gap-14"
          style={titleAnim.style}
        >
          <RouteMap />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.kicker}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {c.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/55 md:text-base">
              {c.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* ── Partner companies carousel (bare white marks, no cards) ── */}
      <div className="relative mt-14 mx-auto max-w-4xl overflow-hidden">
        <p className="mb-5 px-6 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
          {c.registeredCompanies}
        </p>
        <div className="pointer-events-none absolute bottom-0 left-0 top-8 z-10 w-16 bg-gradient-to-r from-[#0a0a1f] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-8 z-10 w-16 bg-gradient-to-l from-[#0a0a1f] to-transparent" />
        <div className="flex w-max items-center gap-10 animate-scroll-carousel" style={{ animationDuration: "35s" }}>
          {companyLoop.map((item, i) => (
            <img
              key={`${item.name}-${i}`}
              src={item.logoWhite ?? item.logo}
              alt={item.name}
              loading="eager"
              decoding="async"
              className="h-8 w-auto shrink-0 object-contain opacity-70 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>

      {/* ── Intro cards: Student | Company ── */}
      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div ref={introCardsAnim.containerRef} className="grid gap-6 md:grid-cols-2">

          {/* Student card */}
          <div className={`group overflow-hidden rounded-2xl border border-white/10 bg-navydark shadow-lg shadow-black/30 ${introCardsAnim.getItemProps(0).className}`} style={introCardsAnim.getItemProps(0).style}>
            <div className="h-56 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85"
                alt={c.studentCard.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.studentCard.kicker}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{c.studentCard.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {c.studentCard.subtitle}
              </p>
              <div className="mt-5 space-y-2.5">
                {c.studentCard.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cb-glow" />
                    <p className="text-xs leading-relaxed text-white/55">{b}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/talent-pool")}
                className="mt-6 rounded-full bg-cb-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {c.studentCard.cta}
              </button>
            </div>
          </div>

          {/* Company card */}
          <div className={`group overflow-hidden rounded-2xl border border-white/10 bg-navydark shadow-lg shadow-black/30 ${introCardsAnim.getItemProps(1).className}`} style={introCardsAnim.getItemProps(1).style}>
            <div className="h-56 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1758518730264-9235a1e5416b?w=900&q=85"
                alt={c.companyCard.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.companyCard.kicker}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{c.companyCard.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {c.companyCard.subtitle}
              </p>
              <div className="mt-5 space-y-2.5">
                {c.companyCard.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cb-glow" />
                    <p className="text-xs leading-relaxed text-white/55">{b}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/company-register")}
                className="mt-6 rounded-full border border-cb-glow/60 bg-cb-glow/10 px-5 py-2.5 text-sm font-semibold text-cb-glow transition hover:bg-cb-glow/20"
              >
                {c.companyCard.cta}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SEZIONE STUDENTI
      ══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto mt-20 max-w-6xl px-6">
        <div ref={studentSectionAnim.ref} className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16" style={studentSectionAnim.style}>

          {/* Left — steps timeline */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.studentSection.kicker}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {c.studentSection.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {c.studentSection.subtitle}
            </p>

            {/* Vertical timeline */}
            <div className="relative mt-10 flex flex-col gap-0">
              {studentSteps[language].map(({ n, title, desc }, i) => (
                <div key={n} className="relative flex gap-5">
                  {/* connector line */}
                  {i < studentSteps[language].length - 1 && (
                    <div className="absolute left-[18px] top-[36px] h-[calc(100%-8px)] w-px bg-white/10" />
                  )}
                  {/* circle */}
                  <div className="relative z-10 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-cb-glow/40 bg-cb-glow/8 text-xs font-bold text-cb-glow">
                    {n}
                  </div>
                  <div className={`pb-8 ${i === studentSteps[language].length - 1 ? "pb-0" : ""}`}>
                    <p className="text-sm font-semibold text-white md:text-base">{title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/talent-pool")}
              className="mt-8 rounded-full bg-cb-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {c.studentSection.cta}
            </button>
          </div>

          {/* Right — screenshots card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-navydark shadow-lg shadow-black/30">
            <div className="h-52 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=85"
                alt={c.studentSection.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="divide-y divide-white/8 px-6 pt-4 pb-6">
              <div className="grid grid-cols-3 gap-3 pb-4">
                {[
                  { src: "/tp-screens/tp-screen-1.png", alt: "Partner Companies" },
                  { src: "/tp-screens/tp-screen-2.png", alt: "Interviews" },
                  { src: "/tp-screens/tp-screen-3.png", alt: "Student Dashboard" },
                ].map(({ src, alt }) => (
                  <div key={alt} className="overflow-hidden rounded-lg border border-white/10">
                    <img src={src} alt={alt} className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="pt-4 space-y-2">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">{c.studentSection.personalAreaLabel}</p>
                <p className="text-xs leading-relaxed text-white/50">
                  {c.studentSection.personalAreaDesc}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SEZIONE AZIENDE
      ══════════════════════════════════════════════════════════════ */}
      <div className="mx-auto mt-20 max-w-6xl px-6">
        <div ref={companySectionAnim.ref} className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16" style={companySectionAnim.style}>

          {/* Left — screenshots card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-navydark shadow-lg shadow-black/30">
            <div className="h-52 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1758691737083-0e7fdbde0f05?w=900&q=85"
                alt={c.companySection.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="divide-y divide-white/8 px-6 pt-4 pb-6">
              <div className="grid grid-cols-2 gap-3 pb-4">
                {[
                  { src: "/tp-screens/tp-company-1.png", alt: "Available Students" },
                  { src: "/tp-screens/tp-company-2.png", alt: "Company Profile" },
                ].map(({ src, alt }) => (
                  <div key={alt} className="overflow-hidden rounded-lg border border-white/10">
                    <img src={src} alt={alt} className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="pt-4 space-y-2">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">{c.companySection.dashboardLabel}</p>
                <p className="text-xs leading-relaxed text-white/50">
                  {c.companySection.dashboardDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right — steps + automation + CTA */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">{c.companySection.kicker}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {c.companySection.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {c.companySection.subtitle}
            </p>

            {/* Vertical timeline */}
            <div className="relative mt-10 flex flex-col gap-0">
              {companySteps[language].map(({ n, title, desc }, i) => (
                <div key={n} className="relative flex gap-5">
                  {i < companySteps[language].length - 1 && (
                    <div className="absolute left-[18px] top-[36px] h-[calc(100%-8px)] w-px bg-white/10" />
                  )}
                  <div className="relative z-10 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-xs font-bold text-white/60">
                    {n}
                  </div>
                  <div className={`pb-8 ${i === companySteps[language].length - 1 ? "pb-0" : ""}`}>
                    <p className="text-sm font-semibold text-white md:text-base">{title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Automation logos */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
                {c.companySection.automationLabel}
              </p>
              <div className="flex items-center gap-3">
                {/* Gmail badge */}
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-navydark px-3 py-2">
                  <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
                    <path d="M0 5.457v13.909c0 .904.732 1.636 1.636 1.636h3.819V11.73l-5.455-4.09V5.457z" fill="#C5221F"/>
                    <path d="M24 5.457v2.183l-5.455 4.09V21.002h3.819A1.636 1.636 0 0024 19.366V5.457z" fill="#C5221F"/>
                    <path d="M24 7.64l-12 9-12-9L1.964 3.493C3.582 2.28 5.892 3.434 5.892 5.457v.91L12 10.457l6.109-4.09v-.91c0-2.023 2.309-3.178 3.927-1.964L24 7.64z" fill="#FBBC04"/>
                  </svg>
                  <span className="text-xs font-semibold text-white/80">Gmail</span>
                </div>
                {/* Calendar badge */}
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-navydark px-3 py-2">
                  <svg viewBox="0 0 24 24" className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.75 3H6.25A3.25 3.25 0 003 6.25v11.5A3.25 3.25 0 006.25 21h11.5A3.25 3.25 0 0021 17.75V6.25A3.25 3.25 0 0017.75 3z" fill="#1a73e8"/>
                    <path d="M8 1v4M16 1v4M3 9h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                    <text x="12" y="17" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">CAL</text>
                  </svg>
                  <span className="text-xs font-semibold text-white/80">Google Calendar</span>
                </div>
                <p className="text-xs text-white/35">{c.companySection.automationDesc}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/company-register")}
              className="mt-6 w-full rounded-xl border border-cb-glow/50 bg-cb-glow/10 px-6 py-3.5 text-sm font-semibold text-cb-glow transition hover:bg-cb-glow/20"
            >
              {c.companySection.cta}
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
