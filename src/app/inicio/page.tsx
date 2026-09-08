import type { Metadata } from "next";
import { InicioHero } from "@/components/sections/InicioHero";

export const metadata: Metadata = {
  title: "Início — Globe Express",
  description: "Saint Antönien, Switzerland Alps.",
};

export default function InicioPage() {
  return <InicioHero />;
}
