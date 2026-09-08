import type { Metadata } from "next";
import { SystemCrashScreen } from "@/components/ui/SystemCrashScreen";

export const metadata: Metadata = {
  title: "Contato — ERRO DO SISTEMA",
  description: "Esta rota foi isolada pelo sistema.",
};

export default function ContatoPage() {
  return <SystemCrashScreen route="/contato" />;
}
