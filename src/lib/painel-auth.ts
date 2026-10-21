import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "tao_painel";
const MAX_AGE = 60 * 60 * 12;
const attempts = new Map<string, { count: number; until: number }>();

function secret() {
  return process.env.PAINEL_SEGREDO || process.env.PAINEL_SENHA || "";
}

export function painelConfigured() {
  return Boolean(process.env.PAINEL_SENHA && secret());
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function readSession(request: Request) {
  if (!painelConfigured()) return false;
  const header = request.headers.get("cookie") || "";
  const raw = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (!raw) return false;
  const [exp, sig] = decodeURIComponent(raw).split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
}

export function sessionCookie(request: Request) {
  const exp = String(Date.now() + MAX_AGE * 1000);
  const token = `${exp}.${sign(exp)}`;
  const secure = new URL(request.url).protocol === "https:";
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${secure ? "; Secure" : ""}`;
}

export function clearCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function checkPassword(value: string) {
  const expected = process.env.PAINEL_SENHA || "";
  if (!expected) return false;
  const given = createHmac("sha256", secret()).update(value).digest();
  const real = createHmac("sha256", secret()).update(expected).digest();
  return timingSafeEqual(given, real);
}

export function tooManyAttempts(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.until < now) return false;
  return current.count >= 8;
}

export function noteAttempt(ip: string, ok: boolean) {
  const now = Date.now();
  if (ok) {
    attempts.delete(ip);
    return;
  }
  const current = attempts.get(ip);
  if (!current || current.until < now) {
    attempts.set(ip, { count: 1, until: now + 15 * 60 * 1000 });
    return;
  }
  current.count += 1;
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export function deny() {
  return Response.json({ error: "Entre com a senha." }, { status: 401 });
}
