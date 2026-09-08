import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TAO Filmes — Transformação em movimento",
  description:
    "Produtora audiovisual premium. Clipes musicais, filmes publicitários, conteúdo digital e produções cinematográficas.",
  openGraph: {
    title: "TAO Filmes",
    description: "Transformação em movimento",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
