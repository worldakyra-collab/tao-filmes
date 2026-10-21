import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { HOME_WORKS } from "@/lib/home-works";

export type PainelWork = {
  id: string;
  title: string;
  year: string;
  client: string;
  category: string;
  video: string;
};

export type PainelEstado = {
  version: number;
  inicioIds: string[];
  obrasIds: string[];
  works: PainelWork[];
};

const filePath = path.join(process.cwd(), "data", "painel-estado.json");
const INICIO_MAX = 5;

const OBRAS_SEED: PainelWork[] = [
  { id: "obra-01", title: "A Tabi Film", year: "2025", client: "Maison Margiela", category: "Iconic Shoe Masterpiece", video: "https://www.youtube.com/watch?v=nvWnxO4nS_4" },
  { id: "obra-02", title: "Il Tappeto Verde", year: "2025", client: "Juventus", category: "Junior Project", video: "https://drive.google.com/file/d/16mBAtVSWEQg73REo2fFsejcdFLfT1KjX/view" },
  { id: "obra-03", title: "Dans Valentino", year: "2025", client: "Valentino", category: "Le Pavillon Des Folies", video: "https://drive.google.com/file/d/16mBAtVSWEQg73REo2fFsejcdFLfT1KjX/view" },
  { id: "obra-04", title: "Mosaico", year: "2024", client: "Buccellati", category: "Bren Heritage Film", video: "https://www.youtube.com/watch?v=nvWnxO4nS_4" },
  { id: "obra-05", title: "Maison De L'Amour", year: "2024", client: "Gucci", category: "A Defining Fashion Film", video: "https://drive.google.com/file/d/16mBAtVSWEQg73REo2fFsejcdFLfT1KjX/view" },
];

function seed(): PainelEstado {
  const inicio = HOME_WORKS.slice(0, INICIO_MAX).map((work) => ({
    id: `inicio-${work.slug}`,
    title: work.title,
    year: work.year,
    client: "",
    category: work.category,
    video: work.video,
  }));

  return {
    version: 0,
    inicioIds: inicio.map((work) => work.id),
    obrasIds: OBRAS_SEED.map((work) => work.id),
    works: [...inicio, ...OBRAS_SEED],
  };
}

export async function readEstado(): Promise<PainelEstado> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as PainelEstado;
  } catch {
    const estado = seed();
    await writeEstado(estado);
    return estado;
  }
}

export async function writeEstado(estado: PainelEstado) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(estado, null, 2));
}

export function worksByIds(estado: PainelEstado, ids: string[]) {
  return ids
    .map((id) => estado.works.find((work) => work.id === id))
    .filter((work): work is PainelWork => Boolean(work));
}

export const INICIO_LIMITE = INICIO_MAX;

const pulses = new Map<string, number>();

export function touchVisitor(id: string) {
  pulses.set(id, Date.now());
}

export function visitorCount() {
  const limit = Date.now() - 20000;
  for (const [id, seen] of pulses) {
    if (seen < limit) pulses.delete(id);
  }
  return pulses.size;
}
