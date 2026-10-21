import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { deny, readSession } from "@/lib/painel-auth";

export const dynamic = "force-dynamic";

type PainelTrabalho = {
  id: string;
  title: string;
  video: string;
};

const filePath = path.join(process.cwd(), "data", "painel-trabalhos.json");

async function readList(): Promise<PainelTrabalho[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as PainelTrabalho[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const items = await readList();
  return Response.json(items);
}

export async function POST(request: Request) {
  if (!readSession(request)) return deny();

  const form = await request.formData();
  const file = form.get("video");
  const title = String(form.get("title") || "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Escolha um vídeo." }, { status: 400 });
  }
  if (!file.type.startsWith("video/")) {
    return Response.json({ error: "O arquivo precisa ser um vídeo." }, { status: 400 });
  }
  if (!title) {
    return Response.json({ error: "Dê um nome ao trabalho." }, { status: 400 });
  }

  const folder = path.join(process.cwd(), "public", "video");
  await mkdir(folder, { recursive: true });

  const safe = file.name.replace(/[^\w.\-]+/g, "-").toLowerCase();
  const filename = `${Date.now()}-${safe}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(folder, filename), bytes);

  const items = await readList();
  const item: PainelTrabalho = {
    id: filename,
    title,
    video: `/video/${filename}`,
  };
  items.unshift(item);
  await writeFile(filePath, JSON.stringify(items, null, 2));

  return Response.json(item);
}
