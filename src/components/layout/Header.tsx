"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BRAND } from "@/lib/constants";
import { MenuButton, SiteMenu } from "@/components/layout/SiteMenu";
import { lockBodyScroll } from "@/lib/scroll-lock";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const isSobre = pathname === "/sobre";
  const isContato = pathname === "/contato";
  const isTeste = pathname === "/teste-2";
  const isCrash = isSobre || isContato;
  const menuOnly = isCrash || isTeste;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const showBackground = (!isCrash && !isTeste) || scrolled || menuOpen;

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-700 ${
          menuOpen
            ? "bg-[#000000]/90 backdrop-blur-md"
            : isCrash || isTeste
              ? "bg-transparent"
              : showBackground
                ? "bg-background/90 backdrop-blur-md"
                : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        <div className="relative mx-auto flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
          {menuOnly ? (
            <div className="ml-auto">
              <MenuButton open={menuOpen} onClick={toggleMenu} />
            </div>
          ) : (
            <>
              <Link
                href="/inicio"
                className="group relative font-serif text-xl tracking-[0.08em] uppercase transition-opacity duration-500 hover:opacity-70 md:text-2xl"
              >
                <span className="relative z-10">{BRAND.name}</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-brand-green/50"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
              </Link>
              <MenuButton open={menuOpen} onClick={toggleMenu} />
            </>
          )}
        </div>
      </motion.header>

      <SiteMenu isOpen={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
