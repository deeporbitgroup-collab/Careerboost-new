import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";

const sections = {
  it: [
    { label: "Mentoring", to: "/mentoring" },
    { label: "Preparazione", to: "/preparazione" },
    { label: "Talent Pool", to: "/talent-pool-about" },
  ],
  en: [
    { label: "Mentoring", to: "/mentoring" },
    { label: "Preparation", to: "/preparazione" },
    { label: "Talent Pool", to: "/talent-pool-about" },
  ],
} as const;

const socials = ["LinkedIn", "Instagram", "TikTok", "Facebook"];

const copy = {
  it: {
    copiedLabel: "Copiata!",
    copyLabel: "Copia mail",
    rightsReserved: "All rights reserved.",
    sectionsLabel: "Sezioni",
    socialLabel: "Social",
  },
  en: {
    copiedLabel: "Copied!",
    copyLabel: "Copy email",
    rightsReserved: "All rights reserved.",
    sectionsLabel: "Sections",
    socialLabel: "Social",
  },
} as const;

export function CBFooter() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { language } = useI18n();
  const c = copy[language];

  const copyEmail = async () => {
    await navigator.clipboard.writeText("info@careerboost.it");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      className="px-6 pt-12 pb-8"
      style={{ background: "linear-gradient(180deg, #0a0a1f 0%, #06070f 100%)" }}
    >
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col justify-between gap-10 sm:flex-row">

          {/* Brand */}
          <div>
            <button
              onClick={() => navigate("/")}
              className="font-semibold text-white hover:opacity-90 transition-opacity"
            >
              CareerBoost
            </button>

            <div className="mt-4 space-y-1 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <span>info@careerboost.it</span>
                <button
                  onClick={copyEmail}
                  className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-white/70 transition-colors hover:bg-white/10"
                >
                  {copied ? c.copiedLabel : c.copyLabel}
                </button>
              </div>
              <p>+39 351 318 5768</p>
            </div>

            <p className="mt-4 text-xs text-white/30">
              © {new Date().getFullYear()} CareerBoost
              <br />
              {c.rightsReserved}
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16">

            {/* Sezioni */}
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-xs uppercase tracking-[0.15em] text-white/30">{c.sectionsLabel}</p>
              {sections[language].map((s) => (
                <button
                  key={s.to}
                  onClick={() => navigate(s.to)}
                  className="text-left text-sm text-white/50 transition-colors hover:text-white"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Social */}
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-xs uppercase tracking-[0.15em] text-white/30">{c.socialLabel}</p>
              {socials.map((label) => (
                <span key={label} className="text-sm text-white/50">
                  {label}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
