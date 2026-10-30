import type { Metadata } from "next";
import { MediaCover } from "@/components/ui/MediaCover";
import { readEstado, worksByIds } from "@/lib/painel-store";

export const metadata: Metadata = {
  title: "Trabalhos — TAO Filmes",
  description: "Trabalhos da TAO Filmes.",
};

export const dynamic = "force-dynamic";

export default async function TrabalhosPage() {
  const estado = await readEstado();
  const works = worksByIds(estado, estado.trabalhosIds);

  return (
    <section className="bg-black px-6 pt-28 pb-24 text-white md:px-12 md:pt-36">
      <div className="mx-auto max-w-[1800px]">
        <h1 className="font-serif text-5xl tracking-tight md:text-7xl">Trabalhos</h1>
        <ul className="mt-16 flex flex-col gap-20 md:gap-28">
          {works.map((work, index) => {
            const mediaLeft = index % 2 === 0;
            return (
              <li key={work.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <div className={`relative block aspect-[16/10] overflow-hidden rounded-3xl bg-black ${mediaLeft ? "" : "md:order-2"}`}>
                  <MediaCover src={work.video} title={work.title} href={`/portfolio/${work.id}`} className="absolute inset-0 h-full w-full" />
                </div>
                <div className={mediaLeft ? "" : "md:order-1"}>
                  <p className="text-[10px] tracking-[0.25em] text-white/45 uppercase">{work.category}</p>
                  <h2 className="mt-3 font-serif text-4xl md:text-6xl">{work.title}</h2>
                  <p className="mt-3 text-sm text-white/50">{work.year}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
