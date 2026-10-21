"use client";

import { FormEvent, useState } from "react";
import { BRAND } from "@/lib/constants";

const TIPOS = [
  { id: "acesso", label: "Saber quais dados vocês têm" },
  { id: "correcao", label: "Corrigir um dado" },
  { id: "exclusao", label: "Apagar um dado" },
  { id: "revogacao", label: "Retirar um consentimento" },
] as const;

export default function LgpdPage() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSending(true);
    setStatus("");
    const response = await fetch("/api/lgpd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.get("nome"),
        email: form.get("email"),
        tipo: form.get("tipo"),
        mensagem: form.get("mensagem"),
      }),
    });
    setSending(false);
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus(data?.error || "Não foi possível enviar.");
      return;
    }
    event.currentTarget.reset();
    setStatus("Pedido recebido. A resposta vai para o e-mail informado.");
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-white md:px-10">
      <h1 className="font-serif text-5xl md:text-6xl">Pedido da LGPD</h1>
      <p className="mt-6 text-sm leading-relaxed text-white/70">
        Use só os campos abaixo. Não envie documento, senha nem dado de outra pessoa. Se preferir, escreva direto para {BRAND.email}.
      </p>
      <form onSubmit={(event) => void onSubmit(event)} className="mt-10 flex max-w-lg flex-col gap-6">
        <label className="flex flex-col gap-2 text-[11px] tracking-[0.18em] text-white/50 uppercase">
          Nome
          <input required name="nome" autoComplete="name" maxLength={80} className="border-b border-white/20 bg-transparent py-3 text-base tracking-normal text-white normal-case outline-none" />
        </label>
        <label className="flex flex-col gap-2 text-[11px] tracking-[0.18em] text-white/50 uppercase">
          E-mail
          <input required type="email" name="email" autoComplete="email" maxLength={120} className="border-b border-white/20 bg-transparent py-3 text-base tracking-normal text-white normal-case outline-none" />
        </label>
        <label className="flex flex-col gap-2 text-[11px] tracking-[0.18em] text-white/50 uppercase">
          Pedido
          <select name="tipo" required className="border-b border-white/20 bg-black py-3 text-base tracking-normal text-white normal-case outline-none">
            {TIPOS.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-[11px] tracking-[0.18em] text-white/50 uppercase">
          Mensagem
          <textarea required name="mensagem" maxLength={1000} rows={5} className="border-b border-white/20 bg-transparent py-3 text-base tracking-normal text-white normal-case outline-none" />
        </label>
        <button type="submit" disabled={sending} className="w-fit rounded-full bg-white px-7 py-3 text-[11px] tracking-[0.22em] text-black uppercase disabled:opacity-50">
          {sending ? "Enviando..." : "Enviar pedido"}
        </button>
        {status ? <p className="text-sm text-white/70">{status}</p> : null}
      </form>
    </article>
  );
}
