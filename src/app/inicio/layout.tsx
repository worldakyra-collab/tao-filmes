import { Barlow, Oswald } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inicio-sans",
});

const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-inicio-display",
});

export default function InicioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${barlow.variable} ${oswald.variable} h-dvh overflow-hidden bg-black text-white`}
    >
      {children}
    </div>
  );
}
