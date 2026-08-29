import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/session";
import { productSchema } from "@/lib/validators";
import { parseBRLToCents } from "@/lib/money";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { id } = await ctx.params;
  const form = Object.fromEntries(await request.formData());
  const parsed = productSchema.safeParse(form);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const data = parsed.data;
  const imagesRaw = data.images?.trim();
  let images: string | undefined;
  if (imagesRaw !== undefined) {
    try {
      const arr = JSON.parse(imagesRaw);
      images = JSON.stringify(Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : []);
    } catch {
      images = JSON.stringify(
        imagesRaw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    }
  }

  const product = await db.product.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description ?? "",
      priceCents: parseBRLToCents(data.price),
      compareCents: data.comparePrice ? parseBRLToCents(data.comparePrice) : null,
      material: data.material ?? "",
      sku: data.sku ?? "",
      stock: data.stock,
      categoryId: data.categoryId || null,
      ...(images !== undefined ? { images } : {}),
      featured: Boolean(data.featured),
      active: data.active !== false,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { id } = await ctx.params;
  await db.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
