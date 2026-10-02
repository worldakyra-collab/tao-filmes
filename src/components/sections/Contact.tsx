"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type ContactProps = {
  standalone?: boolean;
};

const FIELDS = [
  { id: "name", label: "Nome", type: "text", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "project", label: "Projeto", type: "text", autoComplete: "off" },
] as const;

export function Contact({ standalone = false }: ContactProps) {
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
                Produtora de Belém do Pará. Fale com o Giovanni pelo WhatsApp
                ou por e-mail.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-12 space-y-6">
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted block mb-2">
                  WhatsApp
                </span>
                <span className="text-lg md:text-xl text-white/70 group-hover:text-white transition-colors duration-500">
                  {BRAND.phoneDisplay}
                </span>
                <span className="block h-px w-0 group-hover:w-full max-w-xs bg-brand-green transition-all duration-700 mt-2" />
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="block group"
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted block mb-2">
                  Email
                </span>
                <span className="block max-w-full text-lg break-all text-white/70 transition-colors duration-500 group-hover:text-white md:text-xl">
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
                  href={BRAND.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-brand-blue transition-colors duration-500"
                >
                  YouTube
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
                <style>{`
                  .contact-field {
                    color-scheme: dark;
                  }
                  .contact-field:-webkit-autofill,
                  .contact-field:-webkit-autofill:hover,
                  .contact-field:-webkit-autofill:focus {
                    -webkit-text-fill-color: #f5f5f0 !important;
                    caret-color: #f5f5f0;
                    box-shadow: 0 0 0 1000px #0a0a0a inset !important;
                    -webkit-box-shadow: 0 0 0 1000px #0a0a0a inset !important;
                    transition: background-color 99999s ease-out 0s;
                  }
                  .contact-field:-webkit-autofill + label {
                    top: -1.5rem !important;
                    color: #3d6b4f !important;
                  }
                `}</style>
                {FIELDS.map((field) => (
                  <div key={field.id} className="relative">
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder=" "
                      className="contact-field peer w-full border-b border-white/10 bg-transparent py-4 text-white outline-none transition-colors duration-500 focus:border-white/30"
                    />
                    <label
                      htmlFor={field.id}
                      className="pointer-events-none absolute top-4 left-0 text-[10px] tracking-[0.3em] text-muted uppercase transition-all duration-300 peer-focus:-top-6 peer-focus:text-brand-green peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-brand-green"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    autoComplete="off"
                    placeholder=" "
                    className="contact-field peer w-full resize-none border-b border-white/10 bg-transparent py-4 text-white outline-none transition-colors duration-500 focus:border-white/30"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute top-4 left-0 text-[10px] tracking-[0.3em] text-muted uppercase transition-all duration-300 peer-focus:-top-6 peer-focus:text-brand-green peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-brand-green"
                  >
                    Mensagem
                  </label>
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
