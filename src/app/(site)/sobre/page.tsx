import type { Metadata } from "next";
import { SystemCrashScreen } from "@/components/ui/SystemCrashScreen";

export const metadata: Metadata = {
  title: "Sobre — ERRO DO SISTEMA",
  description: "Esta rota foi isolada pelo sistema.",
};

export default function SobrePage() {
  return <SystemCrashScreen route="/sobre" />;
}
