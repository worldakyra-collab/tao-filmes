"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BRAND } from "@/lib/constants";
import { MenuButton, SiteMenu } from "@/components/layout/SiteMenu";
import { lockBodyScroll } from "@/lib/scroll-lock";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const block = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLImageElement && target.src.includes("camaleao")) {
        event.preventDefault();
      }
    };
    document.addEventListener("dragstart", block);
    document.addEventListener("contextmenu", block);
    return () => {
      document.removeEventListener("dragstart", block);
      document.removeEventListener("contextmenu", block);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const unlock = lockBodyScroll();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-50">
        <div className="relative flex items-center justify-end px-6 py-5 md:px-12 md:py-6">
          <Link
            href="/inicio"
            aria-label={BRAND.name}
            className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          >
            <img src="/camaleao.svg" alt="" draggable={false} className="h-16 w-auto select-none md:h-20" />
          </Link>
          <div className={`pointer-events-auto ${menuOpen ? "invisible" : ""}`}>
            <MenuButton open={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </header>

      <SiteMenu isOpen={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
