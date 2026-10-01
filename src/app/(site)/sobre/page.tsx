import type { Metadata } from "next";
import { SobreSpotlight } from "@/components/sections/SobreSpotlight";

export const metadata: Metadata = {
  title: "Sobre — TAO Filmes",
  description: "Transformação em movimento. Conheça a essência da TAO Filmes.",
};

export default function SobrePage() {
  return <SobreSpotlight />;
}
