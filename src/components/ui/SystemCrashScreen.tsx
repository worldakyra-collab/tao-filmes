"use client";

import { useEffect, useState } from "react";
import { lockBodyScroll } from "@/lib/scroll-lock";

type SystemCrashProps = {
  route: "/sobre" | "/contato";
};

const COPY = {
  "/sobre": {
    code: "0xTAO_ESSENCE_FAULT",
    process: "tao.filmes.sobre",
    lines: [
      "A memória da essência corrompeu o buffer.",
      "O sistema tentou carregar “quem somos” e travou.",
      "Esta página foi isolada para proteger o restante do site.",
    ],
  },
  "/contato": {
    code: "0xTAO_SIGNAL_LOST",
    process: "tao.filmes.contato",
    lines: [
      "O canal de comunicação não respondeu a tempo.",
      "O sistema bloqueou esta rota antes que algo pior acontecesse.",
      "Você não deveria conseguir falar conosco por aqui.",
    ],
  },
} as const;

export function SystemCrashScreen({ route }: SystemCrashProps) {
  const copy = COPY[route];
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const unlock = lockBodyScroll();
    return unlock;
  }, []);

  useEffect(() => {
    const blink = window.setInterval(() => setCursorOn((v) => !v), 530);
    return () => window.clearInterval(blink);
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#050505] px-5 font-mono text-[#c8c8c0] select-none"
      role="alert"
      aria-live="assertive"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(180,40,40,0.12),transparent_55%)]"
      />

      <div className="relative w-full max-w-xl border border-[#3a3a36] bg-[#0c0c0a] shadow-[0_0_0_1px_rgba(0,0,0,0.8),0_24px_80px_rgba(0,0,0,0.65)]">
        <div className="border-b border-[#2a2a26] bg-[#141410] px-4 py-2.5 text-[10px] tracking-[0.18em] text-[#8a8a80] uppercase">
          Sistema · Exceção fatal
        </div>

        <div className="space-y-5 px-5 py-6 md:px-7 md:py-8">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-[#b84a4a] uppercase">
              STOP: {copy.code}
            </p>
            <p className="mt-2 text-sm text-[#e8e8e0]">
              Processo <span className="text-[#b84a4a]">{copy.process}</span>{" "}
              interrompido.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-[#b84a4a]/50 pl-4 text-[13px] leading-relaxed text-[#9a9a90]">
            {copy.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="pt-1 text-[#6a6a60]">
              scroll=DISABLED · pointer=LIMITED · route=QUARANTINE
              <span className={cursorOn ? "opacity-100" : "opacity-0"}>█</span>
            </p>
          </div>

          <pre className="overflow-x-auto bg-black/50 px-3 py-3 text-[10px] leading-5 text-[#6e6e66]">
{`> dump --route ${route}
> fault at 0x0000TAO
> last message: "não era para você abrir isso"
> recommendation: abandonar esta página`}
          </pre>
        </div>
      </div>
    </div>
  );
}
