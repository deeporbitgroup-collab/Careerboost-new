import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useI18n } from "@/i18n";

const videoSlots = [
  { src: "/videos/video-1.MP4" },
  { src: "/videos/video-2.MP4" },
  { src: "/videos/video-3.MP4" },
];

const reviews = {
  it: [
    {
      name: "Matteo", flag: "🇮🇹", rating: 5,
      review: "Un'esperienza davvero utile: i mentor si sono dimostrati preparati, disponibili e capaci di fornire indicazioni pratiche e concrete. Grazie al loro supporto ho affrontato con maggiore serenità il percorso di ammissione.",
    },
    {
      name: "Hannah", flag: "🇨🇭", rating: 5,
      review: "Mi hanno messo in contatto con una ragazza che lavora in una delle migliori aziende del settore: ha pianificato per me un percorso chiaro e dettagliato, passo dopo passo, su misura.",
    },
    {
      name: "Francesco", flag: "🇮🇹", rating: 5,
      review: "Un aiuto pratico e concreto: mi hanno supportato nella scelta dell'università mettendomi in contatto con studenti già iscritti. Un mix perfetto di qualità, serietà e prezzo.",
    },
    {
      name: "Lavinia", flag: "🇮🇹", rating: 4,
      review: "Il supporto è stato decisivo: uno studente già iscritto mi ha creato una timeline personalizzata con scadenze, studio e materiali. Ogni volta che serviva, era disponibile.",
    },
    {
      name: "Friedrich", flag: "🇩🇪", rating: 4.5,
      review: "Si sono dimostrati seri e professionali, dal meeting gratuito per capire i miei obiettivi fino alla realizzazione del progetto personalizzato per me.",
    },
    {
      name: "Simon", flag: "🇫🇷", rating: 5,
      review: "Hanno condiviso il loro network e mi hanno aiutato con CV e colloquio. Il team è composto da oltre 100 giovani professionisti provenienti dalle migliori università e aziende.",
    },
  ],
  en: [
    {
      name: "Matteo", flag: "🇮🇹", rating: 5,
      review: "A genuinely useful experience: the mentors were knowledgeable, available and able to give practical, concrete guidance. Thanks to their support I approached the admissions process with much more confidence.",
    },
    {
      name: "Hannah", flag: "🇨🇭", rating: 5,
      review: "They put me in touch with someone working at one of the top companies in the field: she planned a clear, detailed, step-by-step path tailored to me.",
    },
    {
      name: "Francesco", flag: "🇮🇹", rating: 5,
      review: "Practical, concrete help: they supported me in choosing my university by connecting me with students already enrolled. A perfect mix of quality, seriousness and price.",
    },
    {
      name: "Lavinia", flag: "🇮🇹", rating: 4,
      review: "The support was decisive: a student already enrolled built me a personalized timeline with deadlines, study plan and materials. Whenever I needed them, they were available.",
    },
    {
      name: "Friedrich", flag: "🇩🇪", rating: 4.5,
      review: "They were serious and professional throughout, from the free meeting to understand my goals all the way to delivering a project built specifically for me.",
    },
    {
      name: "Simon", flag: "🇫🇷", rating: 5,
      review: "They shared their network and helped me with my CV and interview. The team is made up of over 100 young professionals from the best universities and companies.",
    },
  ],
} as const;

const values = {
  it: [
    {
      title: "Qualità del prodotto",
      description: "Garantiamo massima qualità e serietà del lavoro in ogni servizio, dalla preparazione tecnica al mentoring personalizzato.",
    },
    {
      title: "Mentori selezionati",
      description: "Ogni mentor entra nella rete CareerBoost dopo un rigoroso processo di selezione basato su competenze, esperienza e capacità di trasmettere valore.",
    },
    {
      title: "Supporto costante",
      description: "Gruppi WhatsApp dedicati e un team sempre reperibile: non sei mai solo nel percorso, dall'inizio fino al traguardo.",
    },
  ],
  en: [
    {
      title: "Product quality",
      description: "We guarantee maximum quality and rigor in every service, from technical preparation to personalized mentoring.",
    },
    {
      title: "Selected mentors",
      description: "Every mentor joins the CareerBoost network after a rigorous selection process based on skills, experience and the ability to deliver real value.",
    },
    {
      title: "Constant support",
      description: "Dedicated WhatsApp groups and a team that's always reachable: you're never alone on the journey, from start to finish.",
    },
  ],
} as const;

const copy = {
  it: {
    kicker: "Il nostro metodo",
    title: "Come ti portiamo al successo",
    videoLabel: "Video",
    reviewsLabel: "Cosa dicono di noi",
  },
  en: {
    kicker: "Our method",
    title: "How we set you up for success",
    videoLabel: "Video",
    reviewsLabel: "What people say about us",
  },
} as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;
        return (
          <span key={i} className="relative text-xl">
            {half ? (
              <>
                <span style={{ color: "#E0E0E0", position: "absolute" }}>★</span>
                <span style={{ color: "#FFD700", clipPath: "polygon(0 0,50% 0,50% 100%,0 100%)", position: "relative" }}>★</span>
              </>
            ) : (
              <span style={{ color: filled ? "#FFD700" : "#E0E0E0" }}>★</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function ReviewCarousel() {
  const { language } = useI18n();
  const reviewList = reviews[language];
  const [index, setIndex] = useState(0);

  const getStyle = (i: number): React.CSSProperties => {
    const diff = ((i - index) + reviewList.length) % reviewList.length;
    if (diff === 0) return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 20 };
    if (diff === 1) return { transform: "translateX(70%) scale(0.9)", opacity: 0.55, zIndex: 10 };
    if (diff === reviewList.length - 1) return { transform: "translateX(-70%) scale(0.9)", opacity: 0.55, zIndex: 10 };
    return { opacity: 0, zIndex: 0 };
  };

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {reviewList.map((r, i) => (
          <div
            key={r.name}
            className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
            style={getStyle(i)}
          >
            <div className="w-[85%] rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">{r.name}</span>
                  <span className="text-xl">{r.flag}</span>
                </div>
                <StarRating rating={r.rating} />
              </div>
              <p className="text-sm leading-relaxed text-gray-500">{r.review}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 justify-center gap-2 pt-3">
        {reviewList.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === i ? "w-6 bg-cb-accent" : "w-1.5 bg-black/15 hover:bg-black/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function VideoCarousel() {
  const [active, setActive] = useState(0);
  const [mutedMap, setMutedMap] = useState(videoSlots.map(() => true));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((el, i) => { if (el) el.muted = mutedMap[i]; });
  }, [mutedMap]);

  const toggleMute = (i: number) => {
    setMutedMap((prev) => { const next = [...prev]; next[i] = !next[i]; return next; });
  };

  const getStyle = (i: number): React.CSSProperties => {
    const n = videoSlots.length;
    const diff = ((i - active) + n) % n;
    if (diff === 0) return { transform: "translateX(0) scale(1)", opacity: 1, filter: "none", zIndex: 20 };
    if (diff === 1) return { transform: "translateX(55%) scale(0.88)", opacity: 0.6, filter: "blur(2px)", zIndex: 10 };
    if (diff === n - 1) return { transform: "translateX(-55%) scale(0.88)", opacity: 0.6, filter: "blur(2px)", zIndex: 10 };
    return { opacity: 0, zIndex: 0 };
  };

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {videoSlots.map((vid, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
            style={getStyle(i)}
          >
            <div className="relative h-full aspect-[9/16] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-md">
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={vid.src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => toggleMute(i)}
                className="absolute bottom-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/75"
              >
                {mutedMap[i] ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 justify-center gap-2 pt-3">
        {videoSlots.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-6 bg-cb-accent" : "w-1.5 bg-black/15 hover:bg-black/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function CBMethodology() {
  const { language } = useI18n();
  const c = copy[language];
  return (
    <section
      className="px-6 py-20 md:py-28"
      style={{ background: "linear-gradient(160deg, #dbeafe 0%, #f0f5ff 35%, #ffffff 70%)" }}
    >
      <div className="mx-auto max-w-6xl">

        <div className="mx-auto max-w-2xl text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-accent">{c.kicker}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            {c.title}
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14 md:items-stretch" style={{ minHeight: "480px" }}>

          <div className="flex flex-col">
            <p className="mb-4 shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">{c.videoLabel}</p>
            <div className="flex-1 min-h-0">
              <VideoCarousel />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="mb-4 shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">{c.reviewsLabel}</p>
            <div className="flex-1 min-h-0">
              <ReviewCarousel />
            </div>
          </div>

        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {values[language].map(({ title, description }) => (
            <div key={title} className="rounded-2xl border border-[#dbeafe] bg-white/80 p-6 shadow-sm">
              <div className="mb-3 size-1.5 rounded-full bg-cb-glow" />
              <h3 className="text-base font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
