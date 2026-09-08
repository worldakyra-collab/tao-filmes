"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useCallback } from "react";
import { BRAND, SITE_MENU_ITEMS } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;
const ITEM_STAGGER = 0.1;

export function MenuButton({
  open,
  onClick,
  className = "",
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative z-[60] flex h-12 w-12 items-center justify-center ${className}`}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
    >
      <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
      <div className="relative h-5 w-6">
        <motion.span
          className="absolute top-0 left-0 block h-px w-full origin-center bg-foreground"
          animate={
            open
              ? { rotate: 45, y: 9, width: "100%" }
              : { rotate: 0, y: 0, width: "100%" }
          }
          transition={{ duration: 0.55, ease: EASE }}
        />
        <motion.span
          className="absolute top-[9px] left-0 block h-px origin-left bg-foreground"
          animate={
            open
              ? { opacity: 0, width: 0, x: 12 }
              : { opacity: 1, width: "66%", x: 0 }
          }
          transition={{ duration: 0.45, ease: EASE }}
        />
        <motion.span
          className="absolute bottom-0 left-0 block h-px w-full origin-center bg-foreground"
          animate={
            open
              ? { rotate: -45, y: -9, width: "100%" }
              : { rotate: 0, y: 0, width: "100%" }
          }
          transition={{ duration: 0.55, ease: EASE }}
        />
        <motion.span
          className="absolute top-1/2 -right-1 h-1 w-1 -translate-y-1/2 rounded-full bg-brand-green/60"
          animate={open ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </div>
    </button>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuLink({
  href,
  label,
  index,
  isOpen,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  index: number;
  isOpen: boolean;
  isActive: boolean;
  onNavigate: () => void;
}) {
  return (
    <motion.li
      className="relative overflow-hidden"
      initial={{ opacity: 0, x: 48 }}
      animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{
        duration: 0.7,
        delay: isOpen ? index * ITEM_STAGGER + 0.2 : 0,
        ease: EASE,
      }}
    >
      <Link
        href={href}
        onClick={onNavigate}
        className={`group relative block py-1.5 md:py-2 ${
          isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground"
        }`}
      >
        <span className="font-serif text-[clamp(1.85rem,5vw,3.4rem)] leading-[1.05] tracking-tight transition-colors duration-500">
          {label}
        </span>
        <motion.span
          className="mt-1 block h-px origin-left bg-brand-green/70"
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </Link>
    </motion.li>
  );
}

export function SiteMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const smoothY = useSpring(cursorY, { stiffness: 120, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    },
    [cursorX, cursorY],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[55] bg-background/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            className="fixed inset-y-0 right-0 z-[56] w-full md:w-[min(92vw,720px)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.85, ease: EASE }}
            onMouseMove={handleMouseMove}
          >
            <div className="relative h-full overflow-hidden border-l border-foreground/[0.06] bg-background/95 backdrop-blur-xl">
              <motion.div
                className="pointer-events-none absolute h-px w-24 bg-gradient-to-r from-brand-green/50 via-foreground/30 to-transparent"
                style={{ left: smoothX, top: smoothY, x: -48 }}
              />

              <div className="flex h-full flex-col justify-between px-10 py-24 md:px-16 md:py-28 lg:px-20">
                <div className="flex items-start justify-between gap-6">
                  <motion.p
                    className="text-[10px] tracking-[0.35em] text-foreground/30 uppercase"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                  >
                    Páginas
                  </motion.p>
                  <MenuButton open onClick={onClose} />
                </div>

                <nav className="my-8 min-h-0 flex-1 overflow-y-auto">
                  <ul className="flex flex-col gap-0.5 md:gap-1">
                    {SITE_MENU_ITEMS.map((item, i) => (
                      <MenuLink
                        key={item.href}
                        href={item.href}
                        label={item.label.toUpperCase()}
                        index={i}
                        isOpen={isOpen}
                        isActive={isActivePath(pathname, item.href)}
                        onNavigate={onClose}
                      />
                    ))}
                  </ul>
                </nav>

                <motion.div
                  className="flex items-end justify-between border-t border-foreground/[0.06] pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                >
                  <p className="max-w-[200px] text-xs leading-relaxed text-foreground/35">
                    {BRAND.tagline}
                  </p>
                  <span className="text-[10px] tracking-[0.25em] text-foreground/25 uppercase">
                    {BRAND.name}
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
