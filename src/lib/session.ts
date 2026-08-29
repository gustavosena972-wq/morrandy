import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "morrandy_admin_session";

function secret() {
  const key = process.env.SESSION_SECRET;
  if (!key || key.length < 32) {
    throw new Error("SESSION_SECRET ausente ou curta demais (mín. 32 caracteres).");
  }
  return new TextEncoder().encode(key);
}

export type AdminSession = { sub: string; email: string; name: string };

export async function createAdminSession(payload: AdminSession) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub || typeof payload.email !== "string" || typeof payload.name !== "string") return null;
    return { sub: String(payload.sub), email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
