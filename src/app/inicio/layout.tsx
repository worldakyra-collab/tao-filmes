import { Barlow } from "next/font/google";
import { Header } from "@/components/layout/Header";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inicio-sans",
});

export default function InicioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${barlow.variable} h-dvh overflow-hidden bg-black text-white`}>
      <Header />
      {children}
    </div>
  );
}
