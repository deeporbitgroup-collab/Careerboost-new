import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n";

// action: "route" → navigate(value)  |  "portal" → navigate to client portal with category
const mentoringDropdown = {
  it: [
    { label: "About", action: "route", value: "/mentoring" },
    { label: "Liceo → Università", action: "portal", value: "Take+Off" },
    { label: "Trasferimenti Universitari", action: "portal", value: "Layover" },
    { label: "Università → Master", action: "portal", value: "Summit" },
    { label: "Internship Placement", action: "portal", value: "Altitude" },
  ],
  en: [
    { label: "About", action: "route", value: "/mentoring" },
    { label: "High School → University", action: "portal", value: "Take+Off" },
    { label: "University Transfers", action: "portal", value: "Layover" },
    { label: "University → Master's", action: "portal", value: "Summit" },
    { label: "Internship Placement", action: "portal", value: "Altitude" },
  ],
} as const;

const talentPoolDropdown = {
  it: [
    { label: "About", action: "route", value: "/talent-pool-about" },
    { label: "Piattaforma", action: "route", value: "/talent-pool" },
  ],
  en: [
    { label: "About", action: "route", value: "/talent-pool-about" },
    { label: "Platform", action: "route", value: "/talent-pool" },
  ],
} as const;

const preparazioneDropdown = {
  it: [
    { label: "About", action: "route", value: "/preparazione" },
    { label: "Masterclass", action: "route", value: "/preparazione#masterclass" },
    { label: "Mock Interview", action: "route", value: "/preparazione#mock-interview" },
    { label: "CV e Cover Letter", action: "route", value: "/preparazione#cv-cover" },
  ],
  en: [
    { label: "About", action: "route", value: "/preparazione" },
    { label: "Masterclass", action: "route", value: "/preparazione#masterclass" },
    { label: "Mock Interview", action: "route", value: "/preparazione#mock-interview" },
    { label: "CV & Cover Letter", action: "route", value: "/preparazione#cv-cover" },
  ],
} as const;

const copy = {
  it: {
    home: "Home",
    mentoring: "Mentoring",
    preparazione: "Preparazione",
    talentPool: "Talent Pool",
    areaPersonale: "Area Personale",
    menu: "Menu",
  },
  en: {
    home: "Home",
    mentoring: "Mentoring",
    preparazione: "Preparation",
    talentPool: "Talent Pool",
    areaPersonale: "My Account",
    menu: "Menu",
  },
} as const;

type DropdownItem = { label: string; action: string; value: string };

const Navbar = () => {
  const { language, setLanguage } = useI18n();
  const c = copy[language];
  const [isOpen, setIsOpen] = useState(false);
  const [mentoringOpen, setMentoringOpen] = useState(false);
  const [mobileMentoringOpen, setMobileMentoringOpen] = useState(false);
  const [talentPoolOpen, setTalentPoolOpen] = useState(false);
  const [mobileTalentPoolOpen, setMobileTalentPoolOpen] = useState(false);
  const [prepOpen, setPrepOpen] = useState(false);
  const [mobilePrepOpen, setMobilePrepOpen] = useState(false);

  const mentoringRef = useRef<HTMLDivElement>(null);
  const talentPoolRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mentoringRef.current && !mentoringRef.current.contains(e.target as Node))
        setMentoringOpen(false);
      if (talentPoolRef.current && !talentPoolRef.current.contains(e.target as Node))
        setTalentPoolOpen(false);
      if (prepRef.current && !prepRef.current.contains(e.target as Node))
        setPrepOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAll = () => {
    setIsOpen(false);
    setMentoringOpen(false);
    setMobileMentoringOpen(false);
    setTalentPoolOpen(false);
    setMobileTalentPoolOpen(false);
    setPrepOpen(false);
    setMobilePrepOpen(false);
  };

  const handleItem = (item: DropdownItem) => {
    closeAll();
    if (item.action === "portal") {
      navigate(`/client-portal/services?category=${item.value}`);
    } else {
      navigate(item.value);
    }
  };

  const dropdownPanel = (items: readonly DropdownItem[], width = "w-52") => (
    <div className={`absolute left-0 top-full mt-3 ${width} overflow-hidden rounded-xl border border-white/10 bg-navy shadow-2xl shadow-black/40`}>
      {items.map((item, i) => (
        <button
          key={item.label}
          onClick={() => handleItem(item)}
          className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/8 hover:text-white ${
            i === 0
              ? "border-b border-white/10 font-semibold text-white"
              : "font-medium text-white/65"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  const mobileDropdown = (items: readonly DropdownItem[]) => (
    <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
      {items.map((item, i) => (
        <button
          key={item.label}
          onClick={() => handleItem(item)}
          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 hover:text-white ${
            i === 0 ? "font-semibold text-white" : "text-white/60"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-navy/80 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <button
          onClick={() => { closeAll(); navigate("/"); }}
          className="text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          CareerBoost
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">

          {/* Home */}
          <button
            onClick={() => { closeAll(); navigate("/"); }}
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {c.home}
          </button>

          {/* Mentoring */}
          <div className="relative" ref={mentoringRef}>
            <button
              onClick={() => { setMentoringOpen((v) => !v); setTalentPoolOpen(false); setPrepOpen(false); }}
              className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {c.mentoring}
              <ChevronDown className={`size-3.5 transition-transform duration-200 ${mentoringOpen ? "rotate-180" : ""}`} />
            </button>
            {mentoringOpen && dropdownPanel(mentoringDropdown[language])}
          </div>

          {/* Preparazione */}
          <div className="relative" ref={prepRef}>
            <button
              onClick={() => { setPrepOpen((v) => !v); setMentoringOpen(false); setTalentPoolOpen(false); }}
              className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {c.preparazione}
              <ChevronDown className={`size-3.5 transition-transform duration-200 ${prepOpen ? "rotate-180" : ""}`} />
            </button>
            {prepOpen && dropdownPanel(preparazioneDropdown[language])}
          </div>

          {/* Talent Pool */}
          <div className="relative" ref={talentPoolRef}>
            <button
              onClick={() => { setTalentPoolOpen((v) => !v); setMentoringOpen(false); setPrepOpen(false); }}
              className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {c.talentPool}
              <ChevronDown className={`size-3.5 transition-transform duration-200 ${talentPoolOpen ? "rotate-180" : ""}`} />
            </button>
            {talentPoolOpen && dropdownPanel(talentPoolDropdown[language], "w-44")}
          </div>

        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLanguage("it")}
              className={`rounded-full px-2.5 py-1 transition-colors ${language === "it" ? "bg-cb-accent text-white" : "text-white/50 hover:text-white"}`}
              aria-pressed={language === "it"}
            >
              IT
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-full px-2.5 py-1 transition-colors ${language === "en" ? "bg-cb-accent text-white" : "text-white/50 hover:text-white"}`}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>
          <button
            onClick={() => navigate("/client-portal/auth")}
            className="rounded-full bg-cb-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {c.areaPersonale}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy px-6 pb-6 pt-4">
          <div className="flex flex-col gap-1">

            {/* Home */}
            <button
              onClick={() => { closeAll(); navigate("/"); }}
              className="w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              {c.home}
            </button>

            {/* Mentoring */}
            <div>
              <button
                onClick={() => setMobileMentoringOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                {c.mentoring}
                <ChevronDown className={`size-4 transition-transform duration-200 ${mobileMentoringOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileMentoringOpen && mobileDropdown(mentoringDropdown[language])}
            </div>

            {/* Preparazione */}
            <div>
              <button
                onClick={() => setMobilePrepOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                {c.preparazione}
                <ChevronDown className={`size-4 transition-transform duration-200 ${mobilePrepOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePrepOpen && mobileDropdown(preparazioneDropdown[language])}
            </div>

            {/* Talent Pool */}
            <div>
              <button
                onClick={() => setMobileTalentPoolOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                {c.talentPool}
                <ChevronDown className={`size-4 transition-transform duration-200 ${mobileTalentPoolOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileTalentPoolOpen && mobileDropdown(talentPoolDropdown[language])}
            </div>

          </div>

          <div className="mt-4 flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLanguage("it")}
              className={`w-1/2 rounded-full px-2.5 py-2 transition-colors ${language === "it" ? "bg-cb-accent text-white" : "text-white/50 hover:text-white"}`}
              aria-pressed={language === "it"}
            >
              Italiano
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`w-1/2 rounded-full px-2.5 py-2 transition-colors ${language === "en" ? "bg-cb-accent text-white" : "text-white/50 hover:text-white"}`}
              aria-pressed={language === "en"}
            >
              English
            </button>
          </div>

          <div className="mt-3">
            <button
              onClick={() => { closeAll(); navigate("/client-portal/auth"); }}
              className="w-full rounded-full bg-cb-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {c.areaPersonale}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
