import { ABOUT_VIDEO } from "@/lib/data";

export function AboutLead() {
  return (
    <section className="relative min-h-dvh overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={ABOUT_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sobre-essence.svg?v=6"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-fill select-none"
        draggable={false}
      />
    </section>
  );
}
