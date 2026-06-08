"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { type TeamMember, TEAM } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { TeamMemberPanel } from "@/components/sections/TeamMemberPanel";

function MemberBlock({
  member,
  index,
  onOpen,
}: {
  member: TeamMember;
  index: number;
  onOpen: (member: TeamMember) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0.15, 0.55, 0.15]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [40, 0]);
  const imageLeft = index % 2 === 0;

  return (
    <article
      ref={ref}
      className="group relative min-h-[85vh] md:min-h-[90vh] flex items-center"
    >
      <div className="mx-auto w-full max-w-6xl xl:max-w-7xl px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-center">
          <motion.div
            className={`flex flex-col justify-center order-2 ${
              imageLeft
                ? "lg:order-2 lg:items-start lg:text-left"
                : "lg:order-1 lg:items-start lg:text-left"
            }`}
            style={{ y: textY }}
          >
            <Reveal delay={0.1}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 block mb-6">
                {member.id}
              </span>
            </Reveal>

            <Reveal delay={0.2}>
              <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-white">
                {member.name}
              </h3>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/30">
                {member.role}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <button
                type="button"
                onClick={() => onOpen(member)}
                className="mt-8 flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors duration-500 group/btn"
              >
                <span className="h-px w-8 bg-white/20 group-hover/btn:w-12 group-hover/btn:bg-brand-green transition-all duration-700" />
                <span>Ver perfil</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover/btn:translate-x-1 transition-transform duration-500"
                >
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" />
                </svg>
              </button>
            </Reveal>
          </motion.div>

          <div
            className={`relative shrink-0 flex justify-center order-1 ${
              imageLeft
                ? "lg:order-1 lg:justify-start"
                : "lg:order-2 lg:justify-end"
            }`}
          >
            <div className="relative aspect-[3/4] w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ opacity: imageOpacity }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 35vw"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000]" />

              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[2s]">
                <Image
                  src={member.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 35vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

type TeamProps = {
  standalone?: boolean;
};

export function Team({ standalone = true }: TeamProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="bg-[#000000]">
      <div className="px-6 md:px-12 pt-32 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1800px]">
          <motion.div
            className="flex items-center gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">
              04
            </span>
            <span className="h-px w-12 bg-white/[0.06]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">
              Quem faz acontecer
            </span>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Equipe
          </motion.h1>
        </div>
      </div>

      <div className="space-y-0">
        {TEAM.map((member, index) => (
          <MemberBlock
            key={member.id}
            member={member}
            index={index}
            onOpen={setSelectedMember}
          />
        ))}
      </div>

      {!standalone && <div className="h-48" />}

      <TeamMemberPanel
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}
