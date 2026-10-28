/**
 * Talent Pool premium services — single source of truth for copy, data and the
 * WhatsApp contact. Everything the promo surfaces (landing banner/modal, the
 * registration invite, the student-dashboard grid, the Golden Standard box)
 * reads from here, so copy/number/sectors are edited in ONE place.
 *
 * All services are contact-first: every CTA opens a WhatsApp chat with the
 * CareerBoost team (no prices shown on the site, by design).
 */
import type { TalentPoolLanguage } from "@/contexts/TalentPoolLanguageContext";

/** CareerBoost team WhatsApp number (international format, no "+"). */
export const CAREERBOOST_WHATSAPP = "447826932893";

/** Build a wa.me link with a context-specific prefilled message. */
export const buildWhatsAppUrl = (prefilledMessage: string): string =>
  `https://wa.me/${CAREERBOOST_WHATSAPP}?text=${encodeURIComponent(prefilledMessage)}`;

/** Which prefilled message to use, per entry point. */
export type WhatsAppContext =
  | "landing"
  | "registration"
  | "database"
  | "software"
  | "cvcl";

/** Sectors covered by the tailored database (same names in both languages
 *  except where Italian differs). */
export const DATABASE_SECTORS: Record<TalentPoolLanguage, string[]> = {
  it: [
    "Mercati — Hedge Fund · Asset Management · Wealth Management",
    "Investment Banking",
    "Private Equity",
    "Consulenza",
    "Luxury Goods",
  ],
  en: [
    "Markets — Hedge Funds · Asset Management · Wealth Management",
    "Investment Banking",
    "Private Equity",
    "Consulting",
    "Luxury Goods",
  ],
};

/** Cities covered by the tailored database. */
export const DATABASE_CITIES: Record<TalentPoolLanguage, string[]> = {
  it: [
    "Londra",
    "Milano",
    "Parigi",
    "Madrid",
    "Dubai",
    "New York",
    "Los Angeles",
    "San Francisco",
    "Miami",
  ],
  en: [
    "London",
    "Milan",
    "Paris",
    "Madrid",
    "Dubai",
    "New York",
    "Los Angeles",
    "San Francisco",
    "Miami",
  ],
};

interface ServiceCopy {
  title: string;
  tagline: string;
  bullets: string[];
  /** Which WhatsApp prefill this card's CTA should use. */
  whatsapp: WhatsAppContext;
}

interface ServicesContent {
  ctaWhatsApp: string;
  ctaMoreInfo: string;
  /** Prefilled WhatsApp messages, per entry point. */
  prefill: Record<WhatsAppContext, string>;
  /** Landing banner strip. */
  landingBanner: { badge: string; title: string; subtitle: string; button: string };
  /** Full-offer modal (opened from the landing banner). */
  modal: {
    badge: string;
    title: string;
    subtitle: string;
    sectorsLabel: string;
    citiesLabel: string;
    footnote: string;
  };
  /** Promo block header (registration + dashboard). */
  promo: { badge: string; heading: string; subheading: string };
  /** The three services. */
  database: ServiceCopy;
  software: ServiceCopy;
  cvcl: ServiceCopy;
  /** Golden Standard box shown on the registration CV/cover-letter step. */
  goldenStandard: {
    title: string;
    intro: string;
    formTitle: string;
    form: string[];
    contentTitle: string;
    content: string[];
    coverTitle: string;
    cover: string[];
    ctaLine: string;
    ctaButton: string;
  };
}

export const TALENT_POOL_SERVICES: Record<TalentPoolLanguage, ServicesContent> = {
  it: {
    ctaWhatsApp: "Scrivici su WhatsApp",
    ctaMoreInfo: "Scopri di più",
    prefill: {
      landing:
        "Ciao CareerBoost! Vorrei saperne di più sul Database su misura e sul software per le email.",
      registration:
        "Ciao CareerBoost! Mi sto registrando alla Talent Pool e mi interessano i vostri servizi (Database / Software email / Riscrittura CV).",
      database:
        "Ciao CareerBoost! Mi interessa il Database su misura. Città: ___ · Settore: ___",
      software:
        "Ciao CareerBoost! Mi interessa il software di invio email + il template gratuito.",
      cvcl:
        "Ciao CareerBoost! Vorrei far riscrivere CV e cover letter da un esperto del mio settore.",
    },
    landingBanner: {
      badge: "Servizio Premium",
      title: "Vuoi ancora più possibilità?",
      subtitle:
        "Database su misura di decision-maker + software per le email personalizzate. Scopri come.",
      button: "Scopri il servizio",
    },
    modal: {
      badge: "Servizio Premium CareerBoost",
      title: "Moltiplica le tue possibilità",
      subtitle:
        "Oltre alla Talent Pool, costruiamo per te un database su misura di persone con potere decisionale, nella tua città e nel tuo settore — e ti diamo gli strumenti per contattarle davvero.",
      sectorsLabel: "Settori coperti",
      citiesLabel: "Città coperte",
      footnote:
        "Nessun impegno: scrivici su WhatsApp e ti spieghiamo tutto, prezzo incluso.",
    },
    promo: {
      badge: "Aumenta le tue possibilità",
      heading: "Servizi per andare oltre la Talent Pool",
      subheading:
        "Strumenti pensati per chi vuole fare sul serio. Tutto parte da un messaggio su WhatsApp.",
    },
    database: {
      title: "Database su misura",
      tagline: "600+ contatti giusti, pronti all'uso.",
      bullets: [
        "Un Excel con 600+ contatti (almeno 2 per azienda) di decision-maker da Analyst Senior in su.",
        "Nella tua città e nel tuo settore di interesse.",
        "Nome, cognome, indirizzo, email e posizione di ciascuno.",
        "Profilati per affinità (stessa università/percorso = più probabilità di risposta).",
      ],
      whatsapp: "database",
    },
    software: {
      title: "Software email + Template gratis",
      tagline: "Email personalizzate a tutti i contatti, in automatico.",
      bullets: [
        "Colleghi il tuo account Google e invii email personalizzate su persona e azienda.",
        "Il tuo CV allegato automaticamente a ogni contatto del database.",
        "Semplicissimo da usare.",
        "In regalo un template email ottimizzato per aumentare il tasso di risposta.",
      ],
      whatsapp: "software",
    },
    cvcl: {
      title: "CV & Cover Letter da esperto",
      tagline: "Non conta solo la forma, ma come esponi i contenuti.",
      bullets: [
        "Non conta solo l'impaginazione: conta come racconti esperienze e risultati, cosa metti in evidenza, struttura e linguaggio.",
        "Un CV o una cover scritti o formattati male = scarto immediato.",
        "Riscritti da un professionista del settore in cui vuoi lavorare.",
      ],
      whatsapp: "cvcl",
    },
    goldenStandard: {
      title: "Lo standard che fa la differenza",
      intro:
        "CV e cover letter che non seguono gli standard del settore vengono scartati subito — per la forma e per come sono scritti. Punta a questo:",
      formTitle: "Forma",
      form: [
        "1 pagina, in PDF, ordine cronologico inverso.",
        "Sezioni chiare: Education, Experience, Skills.",
        "Font standard, formattazione coerente, zero refusi.",
      ],
      contentTitle: "Contenuto (come esponi)",
      content: [
        "Ogni voce = verbo d'azione + risultato quantificato.",
        "Selezioni solo ciò che è rilevante per il ruolo.",
        "Racconto chiaro e sintetico, con i termini del settore target.",
      ],
      coverTitle: "Cover letter",
      cover: [
        "1 pagina, 3–4 paragrafi: perché loro / perché tu / fit.",
        "Argomentata con esempi concreti e indirizzata a una persona.",
      ],
      ctaLine: "Non sei sicuro che forma e contenuti siano a norma?",
      ctaButton: "Fattelo riscrivere da un esperto →",
    },
  },
  en: {
    ctaWhatsApp: "Message us on WhatsApp",
    ctaMoreInfo: "Learn more",
    prefill: {
      landing:
        "Hi CareerBoost! I'd like to know more about the tailored Database and the email software.",
      registration:
        "Hi CareerBoost! I'm registering for the Talent Pool and I'm interested in your services (Database / Email software / CV rewrite).",
      database:
        "Hi CareerBoost! I'm interested in the tailored Database. City: ___ · Sector: ___",
      software:
        "Hi CareerBoost! I'm interested in the email software + the free template.",
      cvcl:
        "Hi CareerBoost! I'd like my CV and cover letter rewritten by an expert in my sector.",
    },
    landingBanner: {
      badge: "Premium Service",
      title: "Want even more opportunities?",
      subtitle:
        "A tailored database of decision-makers + software to send personalized emails. See how.",
      button: "Discover the service",
    },
    modal: {
      badge: "CareerBoost Premium Service",
      title: "Multiply your opportunities",
      subtitle:
        "Beyond the Talent Pool, we build you a tailored database of decision-makers in your city and sector — and give you the tools to actually reach them.",
      sectorsLabel: "Sectors covered",
      citiesLabel: "Cities covered",
      footnote:
        "No commitment: message us on WhatsApp and we'll explain everything, pricing included.",
    },
    promo: {
      badge: "Boost your chances",
      heading: "Services to go beyond the Talent Pool",
      subheading:
        "Tools for those who are serious about it. It all starts with a WhatsApp message.",
    },
    database: {
      title: "Tailored Database",
      tagline: "600+ right contacts, ready to use.",
      bullets: [
        "An Excel sheet with 600+ contacts (at least 2 per company) of decision-makers from Senior Analyst up.",
        "In your city and your sector of interest.",
        "Name, surname, address, email and position for each.",
        "Profiled for affinity (same university/path = higher reply rate).",
      ],
      whatsapp: "database",
    },
    software: {
      title: "Email software + Free template",
      tagline: "Personalized emails to every contact, automatically.",
      bullets: [
        "Connect your Google account and send emails personalized to each person and company.",
        "Your CV attached automatically to every contact in the database.",
        "Extremely simple to use.",
        "A free email template optimized to increase your reply rate.",
      ],
      whatsapp: "software",
    },
    cvcl: {
      title: "Expert CV & Cover Letter",
      tagline: "It's not just the format — it's how you present the content.",
      bullets: [
        "It's not only layout: it's how you tell your experience and results, what you highlight, structure and language.",
        "A CV or cover letter written or formatted poorly = instant rejection.",
        "Rewritten by a professional working in your target sector.",
      ],
      whatsapp: "cvcl",
    },
    goldenStandard: {
      title: "The standard that makes the difference",
      intro:
        "CVs and cover letters that don't meet industry standards get rejected instantly — for their form and for how they're written. Aim for this:",
      formTitle: "Form",
      form: [
        "1 page, in PDF, reverse-chronological order.",
        "Clear sections: Education, Experience, Skills.",
        "Standard font, consistent formatting, zero typos.",
      ],
      contentTitle: "Content (how you present it)",
      content: [
        "Every entry = action verb + quantified result.",
        "Keep only what's relevant to the role.",
        "Clear, concise narrative, using your target sector's terms.",
      ],
      coverTitle: "Cover letter",
      cover: [
        "1 page, 3–4 paragraphs: why them / why you / fit.",
        "Backed by concrete examples and addressed to a person.",
      ],
      ctaLine: "Not sure your form and content are up to standard?",
      ctaButton: "Have it rewritten by an expert →",
    },
  },
};
