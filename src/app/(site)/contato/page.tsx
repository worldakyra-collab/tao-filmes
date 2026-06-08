import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Contact } from "@/components/sections/Contact";
import { PAGE_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contato — TAO Filmes",
  description: "Entre em contato com a TAO Filmes.",
};

export default function ContatoPage() {
  const meta = PAGE_META.contato;

  return (
    <>
      <PageHero
        title={meta.title}
        subtitle={meta.subtitle}
        number={meta.number}
      />
      <Contact standalone />
    </>
  );
}
