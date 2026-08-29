import Link from "next/link";
import { db } from "@/lib/db";
import { formatBRL } from "@/lib/money";

export default async function AdminHomePage() {
  const [products, orders, revenue] = await Promise.all([
    db.product.count(),
    db.order.count(),
    db.order.aggregate({ _sum: { totalCents: true }, where: { status: { not: "cancelled" } } }),
  ]);

  const pending = await db.order.count({ where: { status: "pending" } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Painel Morrandy</h1>
      <p className="mt-2 text-[var(--muted)]">Visão geral da loja de semi joias.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Produtos", String(products)],
          ["Pedidos", String(orders)],
          ["Pendentes", String(pending)],
          ["Receita", formatBRL(revenue._sum.totalCents || 0)],
        ].map(([label, value]) => (
          <article key={label} className="glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/produtos/novo" className="btn-primary">
          Cadastrar peça
        </Link>
        <Link href="/admin/produtos" className="btn-ghost">
          Ver produtos
        </Link>
        <Link href="/admin/pedidos" className="btn-ghost">
          Ver pedidos
        </Link>
      </div>
    </div>
  );
}
