import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { SessionUser } from "./types";

const COOKIE = "devhub_session";
function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET is not configured");
  return value;
}
export function signSession(user: SessionUser) {
  const payload = Buffer.from(JSON.stringify({ user, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}
export function verifySession(value?: string): SessionUser | null {
  if (!value) return null;
  try {
    const [payload, signature] = value.split(".");
    const expected = createHmac("sha256", secret()).update(payload).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.exp < Date.now()) return null;
    return data.user as SessionUser;
  } catch { return null; }
}
export async function getUser() {
  return verifySession(cookies().get(COOKIE)?.value);
}
export const sessionCookieName = COOKIE;
