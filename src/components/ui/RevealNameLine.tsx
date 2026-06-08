"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type RevealNameLineProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function RevealNameLine({
  children,
  delay = 0,
  className = "",
}: RevealNameLineProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "-105%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
