import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/session";
import { productSchema } from "@/lib/validators";
import { parseBRLToCents } from "@/lib/money";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const products = await db.product.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const form = Object.fromEntries(await request.formData());
  const parsed = productSchema.safeParse(form);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos.", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const imagesRaw = data.images?.trim();
  let images = "[]";
  if (imagesRaw) {
    try {
      const arr = JSON.parse(imagesRaw);
      if (!Array.isArray(arr)) throw new Error("invalid");
      images = JSON.stringify(arr.filter((x) => typeof x === "string"));
    } catch {
      images = JSON.stringify(
        imagesRaw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    }
  }

  const product = await db.product.create({
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
      images,
      featured: Boolean(data.featured),
      active: data.active !== false,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
