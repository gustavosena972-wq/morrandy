"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatBRL } from "@/lib/money";
import { parseImages } from "@/lib/catalog";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    description: string;
    priceCents: number;
    compareCents: number | null;
    material: string;
    stock: number;
    images: string;
  };
};

export function ProductDetail({ product }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const imgs = parseImages(product.images);

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div className="glass overflow-hidden rounded-[2rem]">
          <div className="aspect-[4/5] bg-gradient-to-br from-[#f3efe8] to-white">
            {imgs[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imgs[0]} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="h-32 w-32 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5" />
              </div>
            )}
          </div>
        </div>

        <div>
          {product.material ? (
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">{product.material}</p>
          ) : null}
          <h1 className="font-display mt-3 text-5xl text-[var(--cream)]">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{formatBRL(product.priceCents)}</span>
            {product.compareCents && product.compareCents > product.priceCents ? (
              <span className="text-[var(--muted)] line-through">{formatBRL(product.compareCents)}</span>
            ) : null}
          </div>
          <p className="mt-6 leading-relaxed text-[var(--muted)]">{product.description || "Peça Morrandy com acabamento premium."}</p>
          <p className="mt-4 text-sm text-[var(--muted)]">
            {product.stock > 0 ? `${product.stock} unidade(s) disponível(is)` : "Indisponível"}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-[var(--line)] bg-white shadow-sm">
              <button type="button" className="p-3" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir">
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-10 text-center">{qty}</span>
              <button
                type="button"
                className="p-3"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                aria-label="Aumentar"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              disabled={product.stock <= 0}
              className="btn-primary disabled:opacity-40"
              onClick={() =>
                addItem(
                  {
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    priceCents: product.priceCents,
                    image: imgs[0],
                  },
                  qty,
                )
              }
            >
              <ShoppingBag className="h-4 w-4" />
              Adicionar ao carrinho
            </button>
          </div>

          <Link href="/carrinho" className="btn-ghost mt-4 inline-flex text-sm">
            Ir para o carrinho
          </Link>
        </div>
      </div>
    </div>
  );
}
