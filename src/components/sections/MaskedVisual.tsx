import { SITE_VIDEO_1 } from "@/lib/data";

const VIDEO = SITE_VIDEO_1;

export function MaskedVisual() {
  return (
    <section className="visual relative h-dvh w-full overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={VIDEO} type="video/mp4" />
      </video>

      <svg
        className="masks pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path d="M0 0 H390 V900 H0 Z" fill="#000" />
        <path d="M390 0 H1440 V78 H390 Z" fill="#000" />
        <path d="M1124 78 H1440 V390 L1096 412 Z" fill="#000" />
        <path d="M390 668 L840 646 L886 900 H390 Z" fill="#000" />
        <path d="M1008 708 H1440 V900 H968 Z" fill="#000" />
        <path d="M468 118 L708 98 L732 232 L448 248 Z" fill="#000" />
      </svg>

      <div className="relative z-10 flex h-full max-w-[390px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <p className="mb-4 text-[10px] tracking-[0.32em] text-white/45 uppercase">
          01 · Filmografia
        </p>
        <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl lg:text-7xl">
          Obras
        </h1>
      </div>
    </section>
  );
}
