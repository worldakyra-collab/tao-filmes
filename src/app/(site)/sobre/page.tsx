import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { About } from "@/components/sections/About";
import { PAGE_META } from "@/lib/constants";
import { ABOUT_VIDEO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sobre — TAO Filmes",
  description: "Transformação em movimento. Conheça a essência da TAO Filmes.",
};

export default function SobrePage() {
  const meta = PAGE_META.sobre;

  return (
    <>
      <PageHero
        title={meta.title}
        subtitle={meta.subtitle}
        number={meta.number}
        video={ABOUT_VIDEO}
        image="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&q=80"
      />
      <About standalone />
    </>
  );
}
