import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/session";

type Ctx = { params: Promise<{ id: string }> };

const allowed = new Set(["pending", "paid", "shipped", "delivered", "cancelled"]);

export async function PATCH(request: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { id } = await ctx.params;
  const body = (await request.json()) as { status?: string };
  if (!body.status || !allowed.has(body.status)) {
    return NextResponse.json({ error: "Status inválido." }, { status: 400 });
  }

  const order = await db.order.update({ where: { id }, data: { status: body.status } });
  return NextResponse.json(order);
}
