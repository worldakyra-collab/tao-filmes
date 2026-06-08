"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BRAND } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type ContactProps = {
  standalone?: boolean;
};

export function Contact({ standalone = false }: ContactProps) {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section
      className={`px-6 md:px-12 py-24 md:py-32 ${
        standalone ? "" : "border-t border-white/5"
      }`}
    >
      <div className="mx-auto max-w-[1800px]">
        {!standalone && <SectionLabel number="04" title="Contato" />}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="font-serif text-4xl md:text-6xl tracking-tight text-balance leading-[1.1] mb-8">
                Vamos criar algo memorável.
              </h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                Conte-nos sobre seu projeto. Responderemos em até 48 horas.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-12 space-y-6">
              <a
                href={`mailto:${BRAND.email}`}
                className="block group"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted block mb-2">
                  Email
                </span>
                <span className="text-lg md:text-xl text-white/70 group-hover:text-white transition-colors duration-500">
                  {BRAND.email}
                </span>
                <span className="block h-px w-0 group-hover:w-full max-w-xs bg-brand-blue transition-all duration-700 mt-2" />
              </a>

              <div className="flex gap-8 pt-4">
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-brand-green transition-colors duration-500"
                >
                  Instagram
                </a>
                <a
                  href={BRAND.vimeo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-brand-blue transition-colors duration-500"
                >
                  Vimeo
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.2}>
              <form
                className="space-y-12"
                onSubmit={(e) => e.preventDefault()}
              >
                {[
                  { id: "name", label: "Nome", type: "text" },
                  { id: "email", label: "Email", type: "email" },
                  { id: "project", label: "Projeto", type: "text" },
                ].map((field) => (
                  <div key={field.id} className="relative">
                    <label
                      htmlFor={field.id}
                      className={`absolute left-0 transition-all duration-300 text-[10px] tracking-[0.3em] uppercase ${
                        focused === field.id
                          ? "text-brand-green -top-6"
                          : "text-muted top-4"
                      }`}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-white/30 transition-colors duration-500"
                      onFocus={() => setFocused(field.id)}
                      onBlur={(e) =>
                        setFocused(e.target.value ? field.id : null)
                      }
                    />
                  </div>
                ))}

                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-0 transition-all duration-300 text-[10px] tracking-[0.3em] uppercase ${
                      focused === "message"
                        ? "text-brand-green -top-6"
                        : "text-muted top-4"
                    }`}
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-white/30 transition-colors duration-500 resize-none"
                    onFocus={() => setFocused("message")}
                    onBlur={(e) =>
                      setFocused(e.target.value ? "message" : null)
                    }
                  />
                </div>

                <motion.button
                  type="submit"
                  className="group flex items-center gap-6 text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors duration-500"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="h-px w-12 bg-white/20 group-hover:w-16 group-hover:bg-brand-green transition-all duration-700" />
                  Enviar mensagem
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
