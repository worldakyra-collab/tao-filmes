import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { deny, readSession } from "@/lib/painel-auth";
import {
  INICIO_LIMITE,
  readEstado,
  touchVisitor,
  worksByIds,
  writeEstado,
  type PainelWork,
} from "@/lib/painel-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const estado = await readEstado();
  const publicado = estado.version > 0;
  const interno = readSession(request);
  return Response.json({
    version: estado.version,
    limite: INICIO_LIMITE,
    inicio: publicado || interno ? worksByIds(estado, estado.inicioIds) : [],
    obras: publicado || interno ? worksByIds(estado, estado.obrasIds) : [],
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    action?: string;
    id?: string;
    work?: PainelWork;
    title?: string;
    year?: string;
    client?: string;
    category?: string;
    inicio?: boolean;
    substituirId?: string;
    substituirIds?: string[];
    obrasIds?: string[];
  };

  if (body.action === "pulso" && body.id && body.id.length <= 80) {
    touchVisitor(body.id);
    return Response.json({ ok: true });
  }

  if (body.action === "versao") {
    const estado = await readEstado();
    return Response.json({ version: estado.version });
  }

  if (!readSession(request)) return deny();

  if (body.action === "editar" && body.id) {
    const estado = await readEstado();
    const work = estado.works.find((item) => item.id === body.id);
    if (!work) return Response.json({ error: "Página não encontrada." }, { status: 404 });
    work.title = (body.title || "").trim() || work.title;
    work.year = (body.year || "").trim();
    work.client = (body.client || "").trim();
    work.category = (body.category || "").trim();
    estado.version += 1;
    await writeEstado(estado);
    return Response.json({ ok: true, version: estado.version });
  }

  if (body.action === "atualizar") {
    const estado = await readEstado();
    estado.version += 1;
    await writeEstado(estado);
    return Response.json({ version: estado.version });
  }

  if (body.action === "publicar" && body.work && body.obrasIds) {
    const estado = await readEstado();
    estado.works = estado.works.filter((item) => item.id !== body.work!.id);
    estado.works.push(body.work);
    estado.obrasIds = body.obrasIds.filter((id) => estado.works.some((item) => item.id === id));

    if (body.inicio) {
      const sair = new Set(body.substituirIds ?? (body.substituirId ? [body.substituirId] : []));
      const ids = estado.inicioIds.filter((id) => !sair.has(id));
      if (!ids.includes(body.work.id) && ids.length < INICIO_LIMITE) {
        estado.inicioIds = [...ids, body.work.id];
      } else {
        estado.inicioIds = ids;
      }
    }

    await writeEstado(estado);
    return Response.json({ ok: true, inicio: estado.inicioIds.length, obras: estado.obrasIds.length });
  }

  return Response.json({ error: "Ação inválida." }, { status: 400 });
}

export async function PUT(request: Request) {
  if (!readSession(request)) return deny();

  const form = await request.formData();
  const file = form.get("video");
  if (!(file instanceof File) || !file.type.startsWith("video/")) {
    return Response.json({ error: "Escolha um vídeo." }, { status: 400 });
  }
  if (file.size > 400 * 1024 * 1024) {
    return Response.json({ error: "O vídeo passa de 400 MB." }, { status: 400 });
  }

  const folder = path.join(process.cwd(), "public", "video");
  await mkdir(folder, { recursive: true });
  const safe = file.name.replace(/[^\w.\-]+/g, "-").toLowerCase();
  const filename = `${Date.now()}-${safe}`;
  await writeFile(path.join(folder, filename), Buffer.from(await file.arrayBuffer()));
  return Response.json({ video: `/video/${filename}` });
}
