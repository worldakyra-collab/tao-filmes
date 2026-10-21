import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 5) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json({ error: "Muitos pedidos. Tente mais tarde." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as {
    nome?: string;
    email?: string;
    tipo?: string;
    mensagem?: string;
  } | null;

  const nome = (body?.nome || "").trim().slice(0, 80);
  const email = (body?.email || "").trim().slice(0, 120);
  const tipo = (body?.tipo || "").trim().slice(0, 40);
  const mensagem = (body?.mensagem || "").trim().slice(0, 1000);
  if (!nome || !email.includes("@") || !tipo || mensagem.length < 5) {
    return Response.json({ error: "Preencha nome, e-mail e a mensagem." }, { status: 400 });
  }

  const folder = path.join(process.cwd(), "data");
  await mkdir(folder, { recursive: true });
  const line = JSON.stringify({ em: new Date().toISOString(), nome, email, tipo, mensagem }) + "\n";
  await appendFile(path.join(folder, "lgpd-pedidos.jsonl"), line);
  return Response.json({ ok: true });
}
