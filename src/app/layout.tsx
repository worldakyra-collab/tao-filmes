import type { Metadata } from "next";
import { Anton, Archivo_Black, DM_Sans, Instrument_Serif, Neucha } from "next/font/google";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import { SiteLive } from "@/components/layout/SiteLive";
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

const neucha = Neucha({
  variable: "--font-marker",
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
      className={`${dmSans.variable} ${anton.variable} ${archivoBlack.variable} ${instrumentSerif.variable} ${neucha.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black">
          Ir para o conteúdo
        </a>
        <SiteLive />
        <PageTransitionProvider>
          <div id="conteudo">{children}</div>
        </PageTransitionProvider>
        <CookieNotice />
      </body>
    </html>
  );
}
