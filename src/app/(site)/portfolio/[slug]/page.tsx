import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { getProjectBySlug, PROJECTS, type Project } from "@/lib/data";
import { readEstado } from "@/lib/painel-store";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

async function findProject(slug: string): Promise<Project | undefined> {
  const known = getProjectBySlug(slug);
  if (known) return known;

  const estado = await readEstado();
  const work = estado.works.find((item) => item.id === slug);
  if (!work) return undefined;

  return {
    id: work.id,
    slug: work.id,
    title: work.title,
    category: work.category,
    year: work.year,
    client: work.client,
    image: "",
    video: work.video,
    layout: "left",
    description: work.client || work.category,
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) return { title: "Projeto — TAO Filmes" };

  return {
    title: `${project.title} — TAO Filmes`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
