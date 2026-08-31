import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "torres_admin";

const SESSION_HOURS = 12;

function secret(): string {
  const value = process.env.ADMIN_SECRET;
  if (!value) {
    throw new Error("ADMIN_SECRET não configurado no .env.local");
  }
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createAdminToken(): string {
  const expiresAt = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = `${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expiresAtStr, signature] = token.split(".");
  if (!expiresAtStr || !signature) return false;
  const expected = sign(expiresAtStr);
  if (expected.length !== signature.length) return false;
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return false;
  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  return true;
}

export function isAdminRequest(token: string | undefined): boolean {
  return verifyAdminToken(token);
}