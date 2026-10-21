import type { Metadata } from "next";
import { ColaboracaoPage } from "@/components/colaboracao/ColaboracaoPage";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "TAO Filmes × Humana & Trad",
  description:
    "Apresentação da colaboração entre a TAO Filmes, produtora audiovisual, e a Humana & Trad, interpretação.",
};

export default function HumanaPage() {
  return (
    <>
      <Header />
      <ColaboracaoPage />
      <Footer />
    </>
  );
}
