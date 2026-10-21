"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "tao-cookies";

export function CookieNotice() {
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);

  useEffect(() => {
    localStorage.removeItem(KEY);
    if (!sessionStorage.getItem(KEY)) setOpen(true);
    const reopen = () => {
      setManage(false);
      setOpen(true);
    };
    window.addEventListener("tao-cookies", reopen);
    return () => window.removeEventListener("tao-cookies", reopen);
  }, []);

  function save(value: "essencial" | "recusar") {
    sessionStorage.setItem(KEY, value);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-xl rounded-3xl bg-[#F5F5F0] p-5 text-[#0A0A0A] shadow-2xl md:inset-x-auto md:right-6 md:bottom-6">
      <p className="font-serif text-2xl">Cookies</p>
      <p className="mt-2 text-sm leading-relaxed text-[#0A0A0A]/75">
        Este site não usa anúncio nem pixel de rastreamento. Guardamos só a sua escolha aqui e, se você entrar no painel, a sessão desse acesso.{" "}
        <Link href="/privacidade" className="underline underline-offset-2">
          Privacidade
        </Link>
      </p>
      {manage ? (
        <p className="mt-4 text-sm leading-relaxed text-[#0A0A0A]/75">
          Essenciais, sempre ligados: a escolha deste aviso e a sessão do painel. Não há cookie de anúncio nem de medição.
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => save("essencial")} className="rounded-full bg-black px-5 py-2 text-[11px] tracking-[0.16em] text-white uppercase">
          Aceitar essenciais
        </button>
        <button type="button" onClick={() => setManage((current) => !current)} className="rounded-full px-5 py-2 text-[11px] tracking-[0.16em] uppercase ring-1 ring-black/30">
          Gerenciar
        </button>
      </div>
    </div>
  );
}
