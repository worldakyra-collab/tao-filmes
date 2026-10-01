"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SITE_MENU_ITEMS } from "@/lib/constants";

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
      initial={{ opacity: 0, y: 10 }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{
        duration: 0.45,
        delay: isOpen ? index * ITEM_STAGGER + 0.08 : 0,
        ease: EASE,
      }}
    >
      <Link
        href={href}
        onClick={onNavigate}
        className="group flex items-center justify-between gap-8 py-1.5"
      >
        <span
          className={`text-[1.65rem] leading-none font-medium tracking-tight transition-colors duration-300 md:text-[1.85rem] ${
            isActive ? "text-white" : "text-white/55 group-hover:text-white"
          }`}
        >
          {label}
        </span>
        <span
          className={`size-1.5 shrink-0 rounded-full bg-white transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[55] bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-label="Menu"
            className="fixed top-4 right-4 z-[56] w-[min(88vw,340px)] rounded-[1.75rem] bg-[#0A0A0A] px-6 pt-5 pb-6 text-[#F5F5F0] shadow-[0_24px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/12 md:top-5 md:right-8"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[11px] tracking-[0.28em] text-white/45 uppercase">
                Menu
              </p>
              <button
                type="button"
                onClick={onClose}
                className="flex size-8 items-center justify-center text-white/80 transition-opacity hover:opacity-60"
                aria-label="Fechar menu"
              >
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav>
              <ul className="flex flex-col">
                {SITE_MENU_ITEMS.map((item, i) => (
                  <MenuLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    index={i}
                    isOpen={isOpen}
                    isActive={isActivePath(pathname, item.href)}
                    onNavigate={onClose}
                  />
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
