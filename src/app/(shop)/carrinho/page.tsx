"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatBRL } from "@/lib/money";

export default function CarrinhoPage() {
  const { items, subtotalCents, setQuantity, removeItem, clear } = useCart();
  const shipping = subtotalCents >= 29900 || subtotalCents === 0 ? 0 : 1990;

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-5xl text-[var(--cream)]">Carrinho</h1>

        {items.length === 0 ? (
          <div className="glass mt-8 rounded-3xl p-10 text-center">
            <p className="text-[var(--muted)]">Seu carrinho está vazio.</p>
            <Link href="/loja" className="btn-primary mt-6 inline-flex">
              Explorar loja
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <article key={item.productId} className="glass flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <h2 className="font-display text-2xl">{item.name}</h2>
                  <p className="mt-1 text-[var(--muted)]">{formatBRL(item.priceCents)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" className="rounded-full border border-[var(--line)] bg-white p-2" onClick={() => setQuantity(item.productId, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" className="rounded-full border border-[var(--line)] bg-white p-2" onClick={() => setQuantity(item.productId, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded-full border border-[var(--line)] bg-white p-2 text-red-600" onClick={() => removeItem(item.productId)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="font-semibold">{formatBRL(item.priceCents * item.quantity)}</div>
              </article>
            ))}

            <div className="glass rounded-3xl p-6">
              <div className="flex justify-between text-[var(--muted)]">
                <span>Subtotal</span>
                <span>{formatBRL(subtotalCents)}</span>
              </div>
              <div className="mt-2 flex justify-between text-[var(--muted)]">
                <span>Frete</span>
                <span>{shipping === 0 ? "Grátis" : formatBRL(shipping)}</span>
              </div>
              <div className="mt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatBRL(subtotalCents + shipping)}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/checkout" className="btn-primary">
                  Finalizar compra
                </Link>
                <button type="button" className="btn-ghost" onClick={clear}>
                  Limpar carrinho
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
