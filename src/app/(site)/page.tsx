import type { Metadata } from "next";
import { InicioPortfolio } from "@/components/sections/InicioPortfolio";

export const metadata: Metadata = {
  title: "Início — TAO Filmes",
  description:
    "Do conceito à tela. Produzimos conteúdo audiovisual com propósito, estética e impacto.",
};

export default function Home() {
  return <InicioPortfolio />;
}
