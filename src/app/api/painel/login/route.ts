import {
  checkPassword,
  clearCookie,
  clientIp,
  noteAttempt,
  painelConfigured,
  readSession,
  sessionCookie,
  tooManyAttempts,
} from "@/lib/painel-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return Response.json({ ok: readSession(request), pronto: painelConfigured() });
}

export async function POST(request: Request) {
  if (!painelConfigured()) {
    return Response.json({ error: "O painel ainda não tem senha configurada." }, { status: 503 });
  }

  const ip = clientIp(request);
  if (tooManyAttempts(ip)) {
    return Response.json({ error: "Muitas tentativas. Espere alguns minutos." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as { senha?: string } | null;
  const senha = body?.senha || "";
  if (!checkPassword(senha)) {
    noteAttempt(ip, false);
    return Response.json({ error: "Senha incorreta." }, { status: 401 });
  }

  noteAttempt(ip, true);
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": sessionCookie(request) } },
  );
}

export async function DELETE() {
  return Response.json({ ok: true }, { headers: { "Set-Cookie": clearCookie() } });
}
