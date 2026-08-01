import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

const videoSlots = [
  { src: "/videos/video-1.MP4" },
  { src: "/videos/video-2.MP4" },
  { src: "/videos/video-3.MP4" },
];

const reviews = [
  {
    name: "Matteo",
    flag: "🇮🇹",
    rating: 5,
    review:
      "Un'esperienza davvero utile: i mentor si sono dimostrati preparati, disponibili e capaci di fornire indicazioni pratiche e concrete. Grazie al loro supporto ho affrontato con maggiore serenità il percorso di ammissione, avendo sempre chiari i passaggi da seguire.",
  },
  {
    name: "Hannah",
    flag: "🇨🇭",
    rating: 5,
    review:
      "Mi hanno messo in contatto con una ragazza che lavora in una delle migliori aziende del settore: ha pianificato per me un percorso chiaro e dettagliato, passo dopo passo, su misura.",
  },
  {
    name: "Francesco",
    flag: "🇮🇹",
    rating: 5,
    review:
      "Un aiuto pratico e concreto: mi hanno supportato nella scelta dell'università mettendomi in contatto con studenti già iscritti. Un mix perfetto di qualità, serietà e prezzo.",
  },
  {
    name: "Lavinia",
    flag: "🇮🇹",
    rating: 4,
    review:
      "Il supporto è stato decisivo: uno studente già iscritto mi ha creato una timeline personalizzata con scadenze, studio e materiali. Ogni volta che serviva, era disponibile con consulenze aggiuntive.",
  },
  {
    name: "Friedrich",
    flag: "🇩🇪",
    rating: 4.5,
    review:
      "Si sono dimostrati seri e professionali, dal meeting gratuito per capire i miei obiettivi fino alla realizzazione del progetto personalizzato per me.",
  },
  {
    name: "Simon",
    flag: "🇫🇷",
    rating: 5,
    review:
      "Hanno condiviso il loro network e mi hanno aiutato con CV e colloquio. Il team è composto da oltre 100 giovani professionisti provenienti dalle migliori università e aziende.",
  },
];

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

type Review = { name: string; flag: string; rating: number; review: string };

function ReviewCarousel({ items }: { items: Review[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getStyle = (i: number): React.CSSProperties => {
    const diff = ((i - activeIndex) + items.length) % items.length;
    if (diff === 0) return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 20 };
    if (diff === 1) return { transform: "translateX(70%) scale(0.9)", opacity: 0.55, zIndex: 10 };
    if (diff === items.length - 1) return { transform: "translateX(-70%) scale(0.9)", opacity: 0.55, zIndex: 10 };
    return { opacity: 0, zIndex: 0 };
  };

  return (
    <div className="flex h-full flex-col">
      {/* Cards */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {items.map((r, i) => (
          <div
            key={r.name}
            className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
            style={getStyle(i)}
          >
            <div className="w-[85%] rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-lg">
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

      {/* Dots */}
      <div className="flex shrink-0 justify-center gap-2 pt-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-6 bg-cb-accent" : "w-1.5 bg-black/15 hover:bg-black/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function CBTalentPool() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, videoIndex]);

  const prevVideo = () => setVideoIndex((i) => (i - 1 + videoSlots.length) % videoSlots.length);
  const nextVideo = () => setVideoIndex((i) => (i + 1) % videoSlots.length);

  return (
    <section
      id="talent-pool"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(160deg, #dbeafe 0%, #f5f8ff 35%, #ffffff 70%)" }}
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Title */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-accent">CareerBoost</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            In evidenza
          </h2>
        </div>

        {/* 2-col: reviews left / video right — stretch so left matches video height */}
        <div className="grid gap-10 md:grid-cols-[1fr_260px] md:gap-14 md:items-stretch lg:grid-cols-[1fr_290px]">

          {/* Left — two review carousels stacked */}
          <div className="flex flex-col">
            <p className="mb-4 shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Cosa dicono di noi
            </p>

            {/* Flex column that fills all remaining height, split in two */}
            <div className="flex flex-1 flex-col min-h-0 gap-0">
              <div className="flex-1 min-h-0">
                <ReviewCarousel items={reviews.slice(0, 3)} />
              </div>
              <div className="shrink-0 border-t border-gray-200 my-2" />
              <div className="flex-1 min-h-0">
                <ReviewCarousel items={reviews.slice(3)} />
              </div>
            </div>
          </div>

          {/* Right — video */}
          <div className="flex flex-col">
            <p className="mb-4 shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Video
            </p>

            <div className="relative flex-1 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              <video
                key={videoIndex}
                ref={videoRef}
                src={videoSlots[videoIndex].src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />

              {/* Speaker */}
              <button
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
                aria-label={muted ? "Attiva audio" : "Disattiva audio"}
              >
                {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
              </button>

              {/* Prev / Next */}
              <button
                onClick={prevVideo}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Dots */}
            <div className="mt-3 shrink-0 flex justify-center gap-2">
              {videoSlots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setVideoIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    videoIndex === i ? "w-6 bg-cb-accent" : "w-1.5 bg-black/15 hover:bg-black/30"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
