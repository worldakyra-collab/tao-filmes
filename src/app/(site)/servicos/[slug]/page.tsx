import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkVideo } from "@/components/ui/WorkVideo";
import { getHomeWork, HOME_WORKS } from "@/lib/home-works";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return HOME_WORKS.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getHomeWork(slug);
  if (!work) return { title: "Serviço — TAO Filmes" };

  return {
    title: `${work.title} — TAO Filmes`,
    description: work.lead,
  };
}

export default async function ServicoPage({ params }: PageProps) {
  const { slug } = await params;
  const work = getHomeWork(slug);
  if (!work) notFound();

  return (
    <article className="px-6 pt-28 pb-24 md:px-12 md:pt-36">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-[11px] tracking-[0.28em] text-white/50 uppercase">
          {work.category} / {work.year}
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight break-words sm:text-5xl md:text-7xl">
          {work.title}
        </h1>

        <WorkVideo src={work.video} />

        <div className="mt-12 max-w-2xl space-y-6 text-[15px] leading-relaxed text-white/70">
          {work.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
