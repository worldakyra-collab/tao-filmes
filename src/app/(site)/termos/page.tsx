import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termos — TAO Filmes",
  description: "Termos de uso do site da TAO Filmes.",
};

export default function TermosPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-white md:px-10">
      <h1 className="font-serif text-5xl md:text-6xl">Termos de serviço</h1>
      <p className="mt-6 text-sm leading-relaxed text-white/70">
        Ao usar este site você vê o portfólio e os canais de contato da TAO Filmes. O uso é pessoal. Copiar filmes, fotos ou textos para outro trabalho comercial precisa de autorização.
      </p>
      <h2 className="mt-10 font-serif text-3xl">O que o site não é</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Uma proposta, um contrato ou um orçamento. Trabalho contratado só vale com acordo escrito entre as partes. Prazos e valores não saem daqui.
      </p>
      <h2 className="mt-10 font-serif text-3xl">Contas e painel</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        O painel é interno. Entrar sem autorização, testar senha ou publicar conteúdo que não é da TAO Filmes é uso indevido.
      </p>
      <h2 className="mt-10 font-serif text-3xl">Disponibilidade</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        O site pode sair do ar para manutenção. Links para Instagram, YouTube e para a Humana & Trad seguem as regras desses destinos.
      </p>
      <h2 className="mt-10 font-serif text-3xl">Lei</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Vale a lei brasileira. Dúvidas: <a className="underline" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. A privacidade está em{" "}
        <Link href="/privacidade" className="underline">página própria</Link>.
      </p>
      <p className="mt-10 text-xs leading-relaxed text-white/45">
        Este texto descreve o uso do site. Ele não substitui uma revisão jurídica.
      </p>
    </article>
  );
}
