import Link from "next/link";
import { db } from "@/lib/db";
import { formatBRL } from "@/lib/money";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Produtos</h1>
          <p className="mt-2 text-[var(--muted)]">Cadastre colares, brincos, anéis e conjuntos.</p>
        </div>
        <Link href="/admin/produtos/novo" className="btn-primary">
          Nova peça
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/8">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">Peça</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Estoque</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-white/8">
                <td className="px-4 py-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-[var(--muted)]">{p.category?.name || "Sem categoria"}</div>
                </td>
                <td className="px-4 py-3">{formatBRL(p.priceCents)}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${p.active ? "bg-emerald-500/15 text-emerald-200" : "bg-white/10 text-[var(--muted)]"}`}>
                    {p.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/produtos/${p.id}`} className="text-[var(--gold)] hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
