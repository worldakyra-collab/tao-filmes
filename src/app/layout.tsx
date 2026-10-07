import type { Metadata } from "next";
import { Anton, Archivo_Black, DM_Sans, Instrument_Serif } from "next/font/google";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TAO Filmes — Transformação em movimento",
  description:
    "Produtora audiovisual de Belém do Pará, criada em 2017. Direção, montagem, som e música.",
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
      className={`${dmSans.variable} ${anton.variable} ${archivoBlack.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
