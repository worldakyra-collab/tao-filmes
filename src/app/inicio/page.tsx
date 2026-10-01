import type { Metadata } from "next";
import { InicioHero } from "@/components/sections/InicioHero";

export const metadata: Metadata = {
  title: "Início — TAO Filmes",
  description:
    "Do conceito à tela. Produzimos conteúdo audiovisual com propósito, estética e impacto.",
};

export default function InicioPage() {
  return <InicioHero />;
}
