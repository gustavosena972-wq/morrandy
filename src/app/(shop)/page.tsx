import Link from "next/link";
import { Gem, Package, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/store/hero";
import { ProductCard } from "@/components/store/product-card";
import { getFeaturedProducts } from "@/lib/catalog";

const highlights = [
  {
    title: "Acabamento premium",
    text: "Semi joias selecionadas com foco em brilho, conforto e durabilidade.",
    icon: Gem,
  },
  {
    title: "Compra segura",
    text: "Checkout protegido, validação de estoque e confirmação clara do pedido.",
    icon: ShieldCheck,
  },
  {
    title: "Entrega cuidadosa",
    text: "Embalagem pensada para presente e proteção total das peças.",
    icon: Package,
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(8);

  return (
    <>
      <HeroSection />

      <section id="colecao" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6e5424]">Coleção</p>
              <h2 className="font-display mt-2 text-4xl font-bold text-black">Peças em destaque</h2>
            </div>
            <Link href="/loja" className="btn-ghost text-sm">
              Ver tudo
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="relative overflow-hidden rounded-[2rem] border border-[#6e5424]/30 bg-white/90 p-10 text-center shadow-[0_20px_50px_rgba(60,40,10,0.08)]">
              <div className="pointer-events-none absolute inset-[6px] rounded-[1.7rem] border border-[#6e5424]/15" />
              <div className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(212,175,95,0.2),transparent_70%)]" />
              <p className="relative font-display text-3xl font-bold text-black">Em breve</p>
              <p className="relative mx-auto mt-3 max-w-lg font-semibold text-[#2a2622]">
                As peças Morrandy serão cadastradas em instantes. A vitrine já está pronta.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          {highlights.map(({ title, text, icon: Icon }, i) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-[1.75rem] border border-[#6e5424]/25 bg-[linear-gradient(165deg,#ffffff_0%,#faf6ef_100%)] p-7 shadow-[0_16px_40px_rgba(60,40,10,0.08)] transition duration-400 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(60,40,10,0.14)]"
            >
              <div className="pointer-events-none absolute inset-[5px] rounded-[1.45rem] border border-[#6e5424]/12" />
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(212,175,95,0.22),transparent_70%)] transition group-hover:scale-110" />

              <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#6e5424]/25 bg-[linear-gradient(145deg,#fff,#f3e8d0)] text-[#6e5424] shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-[#6e5424]/70">0{i + 1}</p>
              <h3 className="relative mt-2 font-display text-2xl font-bold text-black">{title}</h3>
              <p className="relative mt-3 text-sm font-semibold leading-relaxed text-[#2a2622]">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
