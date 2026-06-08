import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Portfolio } from "@/components/sections/Portfolio";
import { PAGE_META } from "@/lib/constants";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfólio — TAO Filmes",
  description: "Projetos em destaque da TAO Filmes.",
};

export default function PortfolioPage() {
  const meta = PAGE_META.portfolio;

  return (
    <>
      <PageHero
        title={meta.title}
        subtitle={meta.subtitle}
        number={meta.number}
        image={PROJECTS[0].image}
      />
      <Portfolio standalone />
    </>
  );
}
