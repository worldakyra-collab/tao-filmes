"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anton } from "next/font/google";
import { BRAND, SITE_MENU_ITEMS } from "@/lib/constants";

const display = Anton({ weight: "400", subsets: ["latin"] });

const WORKS = [
  { label: "Documentário", href: "/teste-2" },
  { label: "Publicidade", href: "/teste-2" },
  { label: "Animação", href: "/teste-2" },
  { label: "Videoclipe", href: "/teste-2" },
] as const;

const linkClass =
  "block text-[13px] leading-6 text-[#0A0A0A]/80 transition-opacity hover:opacity-60 md:text-sm";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/teste-2") {
    return null;
  }

  return (
    <footer className="bg-black px-3 py-4 md:px-5 md:py-6">
      <div className="rounded-[1.6rem] bg-[#F5F5F0] px-6 pt-8 pb-5 text-[#0A0A0A] md:rounded-[2rem] md:px-10 md:pt-10 md:pb-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap gap-x-14 gap-y-8">
            <div>
              <p className={linkClass}>Belém do Pará</p>
              <p className={linkClass}>Produtora audiovisual</p>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {BRAND.phoneDisplay}
              </a>
              <a href={`mailto:${BRAND.email}`} className={`${linkClass} break-all`}>
                {BRAND.email}
              </a>
            </div>
            <nav>
              {SITE_MENU_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-8">
            <nav>
              {WORKS.map((item) => (
                <Link key={item.label} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Instagram
              </a>
              <a
                href={BRAND.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                YouTube
              </a>
            </nav>
          </div>
        </div>

        <p
          className={`${display.className} mt-8 max-w-full text-[clamp(1.85rem,12.4vw,10.5rem)] leading-[0.78] tracking-[-0.045em] whitespace-nowrap uppercase md:mt-10`}
        >
          TAO Filmes
        </p>

        <div className="mt-4 flex flex-col gap-3 border-t border-[#0A0A0A]/15 pt-4 text-[11px] tracking-[0.16em] text-[#0A0A0A]/70 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}</p>
          <nav className="flex gap-6">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              Instagram
            </a>
            <a
              href={BRAND.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              YouTube
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
