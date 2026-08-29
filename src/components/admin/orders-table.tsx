"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatBRL } from "@/lib/money";

type Order = {
  id: string;
  code: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalCents: number;
  createdAt: string;
  items: { productName: string; quantity: number; unitPriceCents: number }[];
};

const statuses = [
  { id: "pending", label: "Pendente" },
  { id: "paid", label: "Pago" },
  { id: "shipped", label: "Enviado" },
  { id: "delivered", label: "Entregue" },
  { id: "cancelled", label: "Cancelado" },
];

export function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [busyId, setBusyId] = useState("");

  async function updateStatus(id: string, status: string) {
    setBusyId(id);
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusyId("");
    if (!res.ok) return;
    const updated = (await res.json()) as Order;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o)));
    router.refresh();
  }

  return (
    <div className="mt-8 space-y-4">
      {orders.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center text-[var(--muted)]">Nenhum pedido ainda.</div>
      ) : (
        orders.map((order) => (
          <article key={order.id} className="glass rounded-3xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">{order.code}</p>
                <h2 className="font-display mt-1 text-2xl">{order.customerName}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {order.customerEmail} · {order.customerPhone}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold">{formatBRL(order.totalCents)}</p>
                <select
                  className="input mt-2 min-w-40"
                  value={order.status}
                  disabled={busyId === order.id}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-[var(--muted)]">
              {order.items.map((item, idx) => (
                <li key={`${order.id}-${idx}`}>
                  {item.productName} × {item.quantity} — {formatBRL(item.unitPriceCents * item.quantity)}
                </li>
              ))}
            </ul>
          </article>
        ))
      )}
    </div>
  );
}
