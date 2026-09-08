"use client";

import Image from "next/image";

type GalleryItem = {
  id: string;
  label: string;
  image: string;
  alt: string;
  featured?: boolean;
};

const BLOCKS: GalleryItem[][] = [
  [
    {
      id: "01",
      label: ".01",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=85",
      alt: "Figura em campo aberto",
    },
    {
      id: "02",
      label: ".02",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&q=85",
      alt: "Silhueta velada",
    },
    {
      id: "03",
      label: ".03",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=2000&q=85",
      alt: "Retrato editorial",
    },
  ],
  [
    {
      id: "04",
      label: ".04",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85",
      alt: "Editorial de moda",
    },
    {
      id: "05",
      label: ".05",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=85",
      alt: "Detalhe joia",
    },
    {
      id: "06",
      label: ".06",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&q=85",
      alt: "Cena urbana",
    },
  ],
];

function CornerLabel({ label }: { label: string }) {
  return (
    <span className="absolute right-3 bottom-3 z-10 font-[family-name:var(--font-dm-sans)] text-[11px] tracking-[0.08em] text-white md:right-4 md:bottom-4 md:text-xs">
      {label}
    </span>
  );
}

function FeaturedMark() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex flex-col items-center text-white">
      <svg
        aria-hidden
        viewBox="0 0 48 18"
        className="mb-3 h-4 w-auto md:mb-4 md:h-5"
        fill="currentColor"
      >
        <path d="M2 14 C10 2 22 1 30 8 C34 11 36 12 46 6 L46 9 C36 16 32 14 28 11 C20 5 12 6 2 16 Z" />
      </svg>
      <div className="mb-2 flex items-center gap-1.5 md:mb-3 md:gap-2">
        <span className="h-2.5 w-5 rounded-full bg-white md:h-3 md:w-6" />
        <span className="h-2.5 w-5 rounded-full bg-white md:h-3 md:w-6" />
        <span className="h-2.5 w-5 rounded-full bg-white md:h-3 md:w-6" />
        <span className="ml-0.5 flex h-5 items-center rounded-full border border-white px-2 font-[family-name:var(--font-dm-sans)] text-[10px] tracking-[0.14em] uppercase md:h-6 md:px-2.5 md:text-[11px]">
          tf
        </span>
      </div>
      <p className="font-[family-name:var(--font-dm-sans)] text-[clamp(1.1rem,2.8vw,2rem)] font-bold tracking-[0.28em] uppercase">
        TAOFILMES
      </p>
    </div>
  );
}

/**
 * [ a ]     [ b ↓ ]
 *      [    c grande    ]
 */
function GalleryBlock({ items }: { items: GalleryItem[] }) {
  const [left, right, featured] = items;

  return (
    <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-32">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-0 lg:gap-x-24">
        <figure className="w-full max-w-[420px] justify-self-start md:max-w-none">
          <div className="relative aspect-[5/4] w-full overflow-hidden">
            <Image
              src={left.image}
              alt={left.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 38vw"
            />
            <CornerLabel label={left.label} />
          </div>
        </figure>

        <figure className="w-full max-w-[420px] justify-self-end md:mt-24 md:max-w-none lg:mt-32">
          <div className="relative aspect-[5/4] w-full overflow-hidden">
            <Image
              src={right.image}
              alt={right.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 38vw"
            />
            <CornerLabel label={right.label} />
          </div>
        </figure>
      </div>

      <figure className="mx-auto mt-14 w-[92%] max-w-[980px] md:mt-20 md:w-[78%] lg:mt-24">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={featured.image}
            alt={featured.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 92vw, 78vw"
          />
          <div className="absolute inset-0 bg-black/10" />
          <FeaturedMark />
          <CornerLabel label={featured.label} />
        </div>
      </figure>
    </div>
  );
}

export function AsymmetricGallery() {
  return (
    <section
      aria-label="Galeria"
      className="relative isolate overflow-hidden bg-[#f4f1ea]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 8% 42%, #e8e2d6 0%, #e8e2d6 28%, transparent 58%), radial-gradient(90% 70% at 72% 18%, #ebe6dc 0%, transparent 55%), radial-gradient(80% 60% at 88% 78%, #e6e0d4 0%, transparent 50%)",
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[8%] h-[85%] w-[70%] text-[#e4ddd0] opacity-90"
        viewBox="0 0 800 900"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M-40 180 C120 40 280 60 360 220 C420 340 300 420 220 520 C140 620 80 760 -20 820 C-80 700 -120 420 -40 180 Z" />
      </svg>

      {BLOCKS.map((items, index) => (
        <GalleryBlock key={`block-${index}`} items={items} />
      ))}
    </section>
  );
}
