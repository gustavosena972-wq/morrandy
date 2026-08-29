import { OrdersTable } from "@/components/admin/orders-table";
import { db } from "@/lib/db";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  const serialized = orders.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Pedidos</h1>
      <p className="mt-2 text-[var(--muted)]">Acompanhe pagamentos, envios e entregas.</p>
      <OrdersTable initialOrders={serialized} />
    </div>
  );
}
