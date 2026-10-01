import type { Metadata } from "next";
import TesteScrollExpansionDemo from "@/components/ui/scroll-expansion-hero-demo";

export const metadata: Metadata = {
  title: "Obras — TAO Filmes",
  description: "Página de teste 2 do componente ScrollExpandMedia.",
};

export default function Teste2Page() {
  return <TesteScrollExpansionDemo showGallery={false} showStackCards />;
}
