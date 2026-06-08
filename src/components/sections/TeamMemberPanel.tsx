"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type TeamMember } from "@/lib/data";
import { BRAND } from "@/lib/constants";
import { RevealNameLine } from "@/components/ui/RevealNameLine";

const PANEL_DURATION = 0.9;

type TeamMemberPanelProps = {
  member: TeamMember | null;
  onClose: () => void;
};

function PanelContent({ member }: { member: TeamMember }) {
  return (
    <div className="px-8 md:px-16 lg:px-20 pb-16">
      <motion.p
        className="text-center text-[10px] md:text-xs tracking-[0.45em] uppercase text-black/40 pt-10 md:pt-14"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {BRAND.name.toUpperCase()}
      </motion.p>

      <div className="text-center mt-8 md:mt-12 mb-12 md:mb-20">
        <RevealNameLine delay={0.15}>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[0.95]">
            {member.firstName}
          </h2>
        </RevealNameLine>
        <RevealNameLine delay={0.3}>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[0.95]">
            {member.lastName}
          </h2>
        </RevealNameLine>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 40vw"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <p className="absolute -top-2 left-0 text-[10px] tracking-[0.4em] uppercase text-black/15 pointer-events-none select-none hidden lg:block">
            {BRAND.name.toUpperCase()}
          </p>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-tight mb-8 md:mb-10">
            {member.role}
          </h3>

          <div className="space-y-6">
            {member.bio.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-sm md:text-base text-black/70 leading-relaxed md:leading-loose"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 + index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function TeamMemberPanel({ member, onClose }: TeamMemberPanelProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (member) {
      setShowContent(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [member]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && member) onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <div
          className="fixed inset-0 z-[200] flex"
          style={{ perspective: 1400 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative h-full w-[90%] bg-[#F5F5F0] overflow-y-auto overflow-x-hidden shadow-[12px_0_60px_rgba(0,0,0,0.5)]"
            style={{ transformOrigin: "left center" }}
            initial={{ x: "-100%", rotateY: -16, opacity: 0.5 }}
            animate={{ x: 0, rotateY: 0, opacity: 1 }}
            exit={{ x: "-100%", rotateY: -16, opacity: 0.5 }}
            transition={{
              duration: PANEL_DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => setShowContent(true)}
          >
            {showContent && <PanelContent member={member} />}
          </motion.div>

          <motion.div
            className="relative w-[10%] min-w-[64px] h-full bg-[#000000] shrink-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/5 transition-colors duration-500"
              aria-label="Fechar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: PANEL_DURATION }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1 1L13 13M13 1L1 13" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
