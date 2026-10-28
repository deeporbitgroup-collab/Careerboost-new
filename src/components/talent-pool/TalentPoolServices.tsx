/**
 * Reusable UI for the Talent Pool premium services. All copy/data comes from
 * src/data/talentPoolServices.ts and is picked by the current Talent Pool
 * language. Every CTA opens a prefilled WhatsApp chat with the CareerBoost team.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Database,
  Send,
  FileText,
  Sparkles,
  MessageCircle,
  MapPin,
  Briefcase,
  Check,
  ArrowRight,
} from "lucide-react";
import { useTalentPoolLanguage } from "@/contexts/TalentPoolLanguageContext";
import {
  TALENT_POOL_SERVICES,
  DATABASE_SECTORS,
  DATABASE_CITIES,
  buildWhatsAppUrl,
  type WhatsAppContext,
} from "@/data/talentPoolServices";

/** A button that opens a prefilled WhatsApp chat for a given entry point. */
export const WhatsAppButton = ({
  context,
  label,
  className = "",
  variant = "default",
  size = "default",
}: {
  context: WhatsAppContext;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
}) => {
  const { language } = useTalentPoolLanguage();
  const copy = TALENT_POOL_SERVICES[language];
  const url = buildWhatsAppUrl(copy.prefill[context]);
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 h-4 w-4" />
        {label ?? copy.ctaWhatsApp}
      </a>
    </Button>
  );
};

const SERVICE_ICONS = {
  database: Database,
  software: Send,
  cvcl: FileText,
} as const;

type ServiceKey = keyof typeof SERVICE_ICONS;

/** One service card: title, tagline, bullets and a WhatsApp CTA. */
const ServiceCard = ({ serviceKey }: { serviceKey: ServiceKey }) => {
  const { language } = useTalentPoolLanguage();
  const copy = TALENT_POOL_SERVICES[language];
  const svc = copy[serviceKey];
  const Icon = SERVICE_ICONS[serviceKey];

  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-sky-blue/20 bg-white p-5 shadow-sm transition-all hover:border-sky-blue/40 hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h4 className="text-sm font-bold leading-tight text-foreground">{svc.title}</h4>
          <p className="text-xs font-medium text-emerald-600">{svc.tagline}</p>
        </div>
      </div>
      <ul className="flex-1 space-y-1.5">
        {svc.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-snug text-steel-gray">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <WhatsAppButton
        context={svc.whatsapp}
        className="w-full bg-[#25D366] text-white hover:bg-[#1da851]"
        size="sm"
      />
    </div>
  );
};

/**
 * Promo block with the three services. Used below the registration form and in
 * the student dashboard. Light theme, bilingual.
 */
export const ServicesPromoGrid = ({ className = "" }: { className?: string }) => {
  const { language } = useTalentPoolLanguage();
  const copy = TALENT_POOL_SERVICES[language];

  return (
    <section
      className={`overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-4 shadow-sm md:p-6 ${className}`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-sky-700">
          <Sparkles className="h-3.5 w-3.5" />
          {copy.promo.badge}
        </span>
        <h3 className="text-base font-bold text-foreground md:text-lg">{copy.promo.heading}</h3>
      </div>
      <p className="mb-4 text-xs text-steel-gray md:text-sm">{copy.promo.subheading}</p>
      <div className="grid gap-3 md:grid-cols-3">
        <ServiceCard serviceKey="database" />
        <ServiceCard serviceKey="software" />
        <ServiceCard serviceKey="cvcl" />
      </div>
    </section>
  );
};

/** Full-offer modal, opened from the landing banner. */
const PremiumServicesModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const { language } = useTalentPoolLanguage();
  const copy = TALENT_POOL_SERVICES[language];
  const sectors = DATABASE_SECTORS[language];
  const cities = DATABASE_CITIES[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            {copy.modal.badge}
          </span>
          <DialogTitle className="text-xl">{copy.modal.title}</DialogTitle>
          <DialogDescription className="text-sm">{copy.modal.subtitle}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[55vh] pr-4">
          <div className="space-y-4">
            {(["database", "software", "cvcl"] as ServiceKey[]).map((key) => {
              const svc = copy[key];
              const Icon = SERVICE_ICONS[key];
              return (
                <div key={key} className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h4 className="text-sm font-bold">{svc.title}</h4>
                  </div>
                  <ul className="space-y-1">
                    {svc.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-sky-700">
                  <Briefcase className="h-3.5 w-3.5" />
                  {copy.modal.sectorsLabel}
                </p>
                <ul className="space-y-1">
                  {sectors.map((s) => (
                    <li key={s} className="text-xs text-muted-foreground">
                      • {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
                  <MapPin className="h-3.5 w-3.5" />
                  {copy.modal.citiesLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cities.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-medium text-sky-800"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="space-y-2 border-t pt-4">
          <WhatsAppButton
            context="landing"
            className="w-full bg-[#25D366] text-white hover:bg-[#1da851]"
            size="lg"
          />
          <p className="text-center text-[11px] text-muted-foreground">{copy.modal.footnote}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Landing banner strip (dark theme, gold accent). Opens the full-offer modal.
 * Mirrors the existing "CV Builder" strip so it sits naturally on the landing.
 */
export const PremiumServicesBanner = () => {
  const { language } = useTalentPoolLanguage();
  const copy = TALENT_POOL_SERVICES[language];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="group flex cursor-pointer flex-col items-center justify-between gap-3 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-amber-950/40 px-5 py-2.5 backdrop-blur-md transition-all hover:border-amber-400/60 sm:flex-row md:py-3"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-amber-600/10">
            <Sparkles className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-amber-50">
              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                {copy.landingBanner.badge}
              </span>
              {copy.landingBanner.title}
            </p>
            <p className="text-xs text-slate-300">{copy.landingBanner.subtitle}</p>
          </div>
        </div>
        <Button className="w-full shrink-0 bg-gradient-to-r from-amber-500 to-amber-600 font-bold tracking-wide text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500 sm:w-auto">
          {copy.landingBanner.button}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <PremiumServicesModal open={open} onOpenChange={setOpen} />
    </>
  );
};

/**
 * Golden Standard box for the registration CV/cover-letter step. Explains that
 * form AND content must meet industry standards, then routes to the expert
 * rewrite service on WhatsApp.
 */
export const GoldenStandardBox = () => {
  const { language } = useTalentPoolLanguage();
  const copy = TALENT_POOL_SERVICES[language];
  const gs = copy.goldenStandard;

  const Column = ({ title, items }: { title: string; items: string[] }) => (
    <div>
      <p className="mb-1 text-xs font-bold text-sky">{title}</p>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-steel-gray">
            <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="space-y-3 rounded-lg border border-amber-200 bg-amber-50/60 p-4">
      <p className="flex items-center gap-2 text-sm font-bold text-amber-900">
        <Sparkles className="h-4 w-4" />
        {gs.title}
      </p>
      <p className="text-xs text-amber-800">{gs.intro}</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Column title={gs.formTitle} items={gs.form} />
        <Column title={gs.contentTitle} items={gs.content} />
        <Column title={gs.coverTitle} items={gs.cover} />
      </div>
      <div className="rounded-md border border-sky-blue/30 bg-sky-blue/5 p-3">
        <p className="mb-2 text-xs font-medium text-steel-gray">{gs.ctaLine}</p>
        <WhatsAppButton
          context="cvcl"
          label={gs.ctaButton}
          variant="outline"
          size="sm"
          className="w-full border-sky-blue/40 text-sky hover:bg-sky-blue/10"
        />
      </div>
    </div>
  );
};
