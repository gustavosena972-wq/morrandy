import Link from "next/link";
import { HeroSection } from "@/components/store/hero";
import { ProductCard } from "@/components/store/product-card";
import { getFeaturedProducts } from "@/lib/catalog";

export default async function HomePage() {
  const featured = await getFeaturedProducts(8);

  return (
    <>
      <HeroSection />

      <section id="colecao" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold-deep)]">Coleção</p>
              <h2 className="font-display mt-2 text-4xl font-semibold text-[var(--cream)]">Peças em destaque</h2>
            </div>
            <Link href="/loja" className="btn-ghost text-sm">
              Ver tudo
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="glass rounded-3xl p-10 text-center">
              <p className="font-display text-2xl text-[var(--cream)]">Em breve</p>
              <p className="mt-3 font-medium text-[var(--muted)]">
                As peças Morrandy serão cadastradas em instantes. A vitrine já está pronta.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
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
      </section>

      <section id="sobre" className="px-4 pb-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {[
            ["Acabamento premium", "Semi joias selecionadas com foco em brilho, conforto e durabilidade."],
            ["Compra segura", "Checkout protegido, validação de estoque e confirmação clara do pedido."],
            ["Entrega cuidadosa", "Embalagem pensada para presente e proteção total das peças."],
          ].map(([title, text]) => (
            <article key={title} className="glass rounded-3xl p-6">
              <h3 className="font-display text-2xl text-[var(--cream)]">{title}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--muted)]">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
