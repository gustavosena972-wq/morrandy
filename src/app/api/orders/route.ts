import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/session";
import { checkoutSchema } from "@/lib/validators";
import { orderCode } from "@/lib/catalog";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const orders = await db.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos.", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    for (const item of data.items) {
      const product = await db.product.findUnique({ where: { id: item.productId } });
      if (!product || !product.active) {
        return NextResponse.json({ error: `Produto indisponível: ${item.name}` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Estoque insuficiente: ${product.name}` }, { status: 400 });
      }
    }

    const subtotalCents = data.items.reduce((s, i) => s + i.priceCents * i.quantity, 0);
    const shippingCents = subtotalCents >= 29900 ? 0 : 1990;
    const totalCents = subtotalCents + shippingCents;

    const order = await db.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          code: orderCode(),
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          customerCpf: data.customerCpf ?? "",
          shippingStreet: data.shippingStreet,
          shippingNumber: data.shippingNumber,
          shippingDistrict: data.shippingDistrict,
          shippingCity: data.shippingCity,
          shippingState: data.shippingState.toUpperCase(),
          shippingZip: data.shippingZip,
          shippingComplement: data.shippingComplement ?? "",
          paymentMethod: data.paymentMethod,
          notes: data.notes ?? "",
          subtotalCents,
          shippingCents,
          totalCents,
          items: {
            create: data.items.map((item) => ({
              productId: item.productId,
              productName: item.name,
              productSlug: item.slug,
              unitPriceCents: item.priceCents,
              quantity: item.quantity,
            })),
          },
        },
        include: { items: true },
      });

      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return created;
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao processar pedido." }, { status: 500 });
  }
}
