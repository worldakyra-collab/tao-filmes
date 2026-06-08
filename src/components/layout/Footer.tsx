import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 md:px-12 py-12 md:py-16">
      <div className="mx-auto max-w-[1800px] flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <p className="font-serif text-2xl md:text-3xl tracking-tight mb-2">
            {BRAND.name}
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-muted">
            {BRAND.tagline}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
          <a
            href={`mailto:${BRAND.email}`}
            className="text-sm text-white/50 hover:text-white transition-colors duration-500 group"
          >
            <span className="accent-line">{BRAND.email}</span>
          </a>
          <div className="flex gap-8">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-brand-blue transition-colors duration-500"
            >
              Instagram
            </a>
            <a
              href={BRAND.vimeo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-white/40 hover:text-brand-green transition-colors duration-500"
            >
              Vimeo
            </a>
          </div>
        </div>

        <p className="text-[10px] tracking-[0.15em] uppercase text-white/20">
          © {new Date().getFullYear()} {BRAND.name}
        </p>
      </div>
    </footer>
  );
}
