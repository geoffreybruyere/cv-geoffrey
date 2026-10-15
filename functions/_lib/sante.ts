export interface Env {
  SANTE_PASSWORD: string;
  SANTE_SESSION_SECRET: string;
  SUPABASE_HEALTH_URL: string;
  SUPABASE_HEALTH_SECRET_KEY: string;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  HEALTH_SYNC_TOKEN?: string;
}

const encoder = new TextEncoder();
const sessionDurationMs = 1000 * 60 * 60 * 24 * 30;

function base64Url(bytes: Uint8Array): string {
  let text = "";
  for (const byte of bytes) text += String.fromCharCode(byte);
  return btoa(text).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return result === 0;
}

export async function validPassword(password: unknown, expected: string): Promise<boolean> {
  return typeof password === "string" && constantTimeEqual(password, expected);
}

export async function createSession(secret: string): Promise<string> {
  const payload = base64Url(encoder.encode(JSON.stringify({ expiresAt: Date.now() + sessionDurationMs })));
  return `${payload}.${await sign(payload, secret)}`;
}

export async function hasValidSession(request: Request, secret: string): Promise<boolean> {
  const cookie = request.headers.get("Cookie")?.match(/(?:^|;\s*)sante_session=([^;]+)/)?.[1];
  if (!cookie) return false;

  const [payload, signature] = cookie.split(".");
  if (!payload || !signature || !constantTimeEqual(signature, await sign(payload, secret))) return false;

  try {
    const { expiresAt } = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)));
    return typeof expiresAt === "number" && expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookie(value: string): string {
  return `sante_session=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${sessionDurationMs / 1000}`;
}

export function clearSessionCookie(): string {
  return "sante_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
}

export function json(data: unknown, options: ResponseInit = {}): Response {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(data), { ...options, headers });
}

export async function supabaseFetch(env: Env, path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${env.SUPABASE_HEALTH_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: env.SUPABASE_HEALTH_SECRET_KEY,
      Authorization: `Bearer ${env.SUPABASE_HEALTH_SECRET_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}
