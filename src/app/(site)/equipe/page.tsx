import type { Metadata } from "next";
import { Team } from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "Equipe — TAO Filmes",
  description: "Conheça quem faz a TAO Filmes acontecer.",
};

export default function EquipePage() {
  return <Team />;
}
