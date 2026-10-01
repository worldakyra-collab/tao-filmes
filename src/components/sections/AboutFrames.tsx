import Image from "next/image";

const PORTRAIT =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80";
const LANDSCAPE =
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80";
const WIDE =
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=2000&q=80";

export function AboutFrames() {
  return (
    <section aria-label="Imagens" className="bg-black px-[9vw] py-24 md:py-32">
      <div className="mx-auto grid max-w-[920px] grid-cols-12 items-start">
        <div className="relative col-span-7 aspect-[3/4] sm:col-span-3 sm:col-start-2">
          <Image
            src={PORTRAIT}
            alt="Retrato"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 22vw, 55vw"
          />
        </div>

        <div className="relative col-span-12 mt-8 aspect-[16/9] sm:col-span-5 sm:col-start-8 sm:mt-1">
          <Image
            src={LANDSCAPE}
            alt="Sala de cinema"
            fill
            className="object-cover"
            sizes="(min-width: 640px) 34vw, 100vw"
          />
        </div>

        <div className="relative col-span-12 mt-12 aspect-[2.6/1] sm:mt-14 md:mt-16">
          <Image
            src={WIDE}
            alt="Câmera de cinema"
            fill
            className="object-cover"
            sizes="80vw"
          />
        </div>
      </div>
    </section>
  );
}
