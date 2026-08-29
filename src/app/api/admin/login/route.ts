import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createAdminSession } from "@/lib/session";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    const admin = await db.adminUser.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!admin) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const ok = await bcrypt.compare(parsed.data.password, admin.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    await createAdminSession({ sub: admin.id, email: admin.email, name: admin.name });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
