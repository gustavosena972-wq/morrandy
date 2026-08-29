import { ProductCard } from "@/components/store/product-card";
import { getActiveProducts, getCategories } from "@/lib/catalog";

export default async function LojaPage() {
  const [products, categories] = await Promise.all([getActiveProducts(), getCategories()]);

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold-deep)]">Loja</p>
          <h1 className="font-display mt-2 text-5xl font-semibold text-[var(--cream)]">Todas as peças</h1>
          <p className="mt-3 max-w-2xl font-medium text-[var(--muted)]">
            Explore colares, brincos, anéis, pulseiras e conjuntos Morrandy.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.id}
              className="rounded-full border border-[var(--line)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--cream)] shadow-sm"
            >
              {c.name}
            </span>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <h2 className="font-display text-3xl">Catálogo em preparação</h2>
            <p className="mt-3 text-[var(--muted)]">Cadastre as peças no painel admin para publicar aqui.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                slug={p.slug}
                name={p.name}
                priceCents={p.priceCents}
                compareCents={p.compareCents}
                images={p.images}
                material={p.material}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
