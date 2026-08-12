import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { universities, companies } from "@/data/coveredLogos";
import { CURATED_MENTOR_IDS } from "@/data/curatedMentors";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";

interface MentorAvatar { name: string; photo: string; }

const mainButtons = {
  it: [
    { label: "Mentoring",    to: "/mentoring" },
    { label: "Preparazione", to: "/preparazione" },
    { label: "Talent Pool",  to: "/talent-pool-about" },
  ],
  en: [
    { label: "Mentoring",    to: "/mentoring" },
    { label: "Preparation",  to: "/preparazione" },
    { label: "Talent Pool",  to: "/talent-pool-about" },
  ],
} as const;

const copy = {
  it: {
    kicker: "CareerBoost",
    titleLine1: "Costruiamo il tuo",
    titleLine2: "percorso verso le",
    titleLine3: "migliori opportunità",
    subtitle:
      "Dallo studio alla carriera: mentor d'eccellenza al tuo fianco, preparazione mirata e visibilità diretta presso le aziende partner.",
    mentorCount: "Mentor selezionati a mano",
    mentorCountSub: "dalle migliori aziende e università",
    alumniFrom: "Alumni da aziende come",
    studentsFrom: "Studenti e alumni da",
  },
  en: {
    kicker: "CareerBoost",
    titleLine1: "We build your",
    titleLine2: "path towards the",
    titleLine3: "best opportunities",
    subtitle:
      "From study to career: outstanding mentors by your side, targeted preparation and direct visibility with partner companies.",
    mentorCount: "Hand-picked mentors",
    mentorCountSub: "from the best companies and universities",
    alumniFrom: "Alumni from companies like",
    studentsFrom: "Students and alumni from",
  },
} as const;

const fallbackAvatars: MentorAvatar[] = [
  { name: "Leone",   photo: "/founders/leone-fassio.jpg" },
  { name: "Giacomo", photo: "/founders/giacomo-suriano.jpg" },
  { name: "Marco",   photo: "/founders/marco-merolla.jpg" },
  { name: "Samuele", photo: "/founders/samuele-barni.jpg" },
];

/* ── Altair-style animated dark background ───────────────────────────────── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Base very-dark gradient */}
      <div className="absolute inset-0" style={{ background: "#030310" }} />

      {/* Main blue glow — upper centre-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 75% at 58% -5%, rgba(36,48,212,0.92) 0%, rgba(15,20,80,0.55) 45%, transparent 75%)",
        }}
      />

      {/* Secondary softer glow — left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 40% at 8% 35%, rgba(79,209,232,0.10) 0%, transparent 70%)",
        }}
      />

      {/* SVG liquid-metal distortion layer (subtle, adds depth) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.35, mixBlendMode: "screen" }}
      >
        <defs>
          <radialGradient id="h-rg1" cx="55%" cy="15%" r="55%">
            <stop offset="0%" stopColor="#2430d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#030310" stopOpacity="0" />
          </radialGradient>
          <filter id="h-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.008 0.006" numOctaves="3" seed="5" result="noise">
              <animate
                attributeName="baseFrequency"
                values="0.008 0.006;0.012 0.010;0.009 0.013;0.008 0.006"
                dur="28s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#h-rg1)" filter="url(#h-blur)" />
      </svg>

      {/* Bottom fade to keep section transition clean */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, #030310)" }}
      />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const navigate = useNavigate();
  const { language } = useI18n();
  const c = copy[language];
  const [mentors, setMentors] = useState<MentorAvatar[]>([]);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("first_name, last_name, photo_url")
      .eq("role", "ASSOCIATE")
      .eq("status", "approved")
      .not("photo_url", "is", null)
      .in("id", CURATED_MENTOR_IDS)
      .limit(6)
      .then(({ data }) => {
        if (!data) return;
        const items = data
          .filter((p: any) => p.photo_url?.trim())
          .map((p: any) => ({
            name:  `${(p.first_name || "").trim()} ${(p.last_name || "").trim()}`.trim(),
            photo: p.photo_url as string,
          }))
          .filter((p) => p.name.length > 0)
          .slice(0, 4);
        if (items.length > 0) setMentors(items);
      });
  }, []);

  const displayAvatars = mentors.length > 0 ? mentors : fallbackAvatars;

  /* triple for seamless −33.333 % loop */
  const cLoop = useMemo(() => [...companies,    ...companies,    ...companies],    []);
  const uLoop = useMemo(() => [...universities, ...universities, ...universities], []);

  /* Edge fade overlays for marquees — plain gradient divs instead of a CSS
     mask-image, which some browser/GPU combinations can render as fully
     transparent (invisible row) when combined with an animated child. */
  const EdgeFade = () => (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#030310] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#030310] to-transparent" />
    </>
  );

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "80vh", background: "#030310" }}
    >
      <HeroBackground />

      {/* ── Main content: LEFT text | RIGHT buttons ── */}
      <div className="relative flex flex-1 items-center px-6 pt-16 pb-8 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">

            {/* ── LEFT: title + subtitle + mentor circles ── */}
            <div className="flex-1">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cb-accent">
                {c.kicker}
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight text-white md:text-5xl lg:text-6xl">
                {c.titleLine1}
                <br />
                {c.titleLine2}
                <br />
                <span className="text-cb-accent">{c.titleLine3}</span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
                {c.subtitle}
              </p>

              {/* Mentor avatars */}
              <div className="mt-9 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {displayAvatars.slice(0, 4).map((m, i) => (
                    <div
                      key={i}
                      className="size-10 overflow-hidden rounded-full border-2"
                      style={{ borderColor: "#030310" }}
                    >
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="h-full w-full object-cover object-top"
                        style={{ filter: "grayscale(100%) brightness(1.1) contrast(1.05)" }}
                      />
                    </div>
                  ))}
                  <div
                    className="flex size-10 items-center justify-center rounded-full border-2 bg-cb-accent text-[11px] font-bold text-white"
                    style={{ borderColor: "#030310" }}
                  >
                    +56
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{c.mentorCount}</p>
                  <p className="text-xs text-white/45">{c.mentorCountSub}</p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: stacked CTA pills ── */}
            <div className="flex w-full flex-col gap-4 md:w-[280px] lg:w-[300px]">
              {mainButtons[language].map(({ label, to }) => (
                <button
                  key={to}
                  onClick={() => navigate(to)}
                  className="rounded-full border border-cb-glow/50 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_0_16px_rgba(79,209,232,0.45)] backdrop-blur-sm transition-all duration-200 hover:border-cb-glow hover:bg-white/10 hover:shadow-[0_0_24px_rgba(79,209,232,0.7)]"
                >
                  {label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Logo marquees (white logos, no pill containers) ── */}
      <div className="relative shrink-0 pb-6">

        {/* companies */}
        <p className="mb-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
          {c.alumniFrom}
        </p>
        <div className="relative mx-auto max-w-3xl overflow-hidden">
          <EdgeFade />
          <div
            className="flex w-max items-center gap-10 animate-scroll-carousel"
            style={{ animationDuration: "55s" }}
          >
            {cLoop.map((c, i) => (
              <img
                key={`c-${i}`}
                src={c.logoWhite ?? c.logo}
                alt={c.name}
                loading="eager"
                decoding="async"
                className="h-6 w-auto shrink-0 object-contain opacity-70 transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </div>

        {/* universities */}
        <p className="mt-6 mb-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
          {c.studentsFrom}
        </p>
        <div className="relative mx-auto max-w-3xl overflow-hidden">
          <EdgeFade />
          <div
            className="flex w-max items-center gap-10 animate-scroll-carousel-reverse"
            style={{ animationDuration: "70s" }}
          >
            {uLoop.map((u, i) => (
              <img
                key={`u-${i}`}
                src={u.logoWhite ?? u.logo}
                alt={u.name}
                loading="eager"
                decoding="async"
                className="h-6 w-auto shrink-0 object-contain opacity-70 transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
