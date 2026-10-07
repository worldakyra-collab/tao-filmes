import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Serviços — TAO Filmes",
  description: "Clipes musicais, filmes publicitários e produções audiovisuais.",
};

export default function ServicosPage() {
  return <Services />;
}
