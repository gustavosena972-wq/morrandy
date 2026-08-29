"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatBRL } from "@/lib/money";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, clear } = useCart();
  const shipping = subtotalCents >= 29900 || subtotalCents === 0 ? 0 : 1990;
  const total = subtotalCents + shipping;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [doneCode, setDoneCode] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      customerName: String(fd.get("customerName") || ""),
      customerEmail: String(fd.get("customerEmail") || ""),
      customerPhone: String(fd.get("customerPhone") || ""),
      customerCpf: String(fd.get("customerCpf") || ""),
      shippingStreet: String(fd.get("shippingStreet") || ""),
      shippingNumber: String(fd.get("shippingNumber") || ""),
      shippingDistrict: String(fd.get("shippingDistrict") || ""),
      shippingCity: String(fd.get("shippingCity") || ""),
      shippingState: String(fd.get("shippingState") || ""),
      shippingZip: String(fd.get("shippingZip") || ""),
      shippingComplement: String(fd.get("shippingComplement") || ""),
      paymentMethod: String(fd.get("paymentMethod") || "pix"),
      notes: String(fd.get("notes") || ""),
      items: items.map((i) => ({
        productId: i.productId,
        slug: i.slug,
        name: i.name,
        priceCents: i.priceCents,
        quantity: i.quantity,
      })),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { error?: string; order?: { code: string } };
    setBusy(false);

    if (!res.ok) {
      setError(data.error || "Não foi possível concluir o pedido.");
      return;
    }

    clear();
    setDoneCode(data.order?.code || "");
    router.refresh();
  }

  if (items.length === 0 && !doneCode) {
    return (
      <div className="px-4 py-16 text-center sm:px-6">
        <p className="text-[var(--muted)]">Seu carrinho está vazio.</p>
        <Link href="/loja" className="btn-primary mt-6 inline-flex">
          Voltar à loja
        </Link>
      </div>
    );
  }

  if (doneCode) {
    return (
      <div className="px-4 py-16 sm:px-6">
        <div className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Pedido confirmado</p>
          <h1 className="font-display mt-3 text-4xl">Obrigada pela compra</h1>
          <p className="mt-4 text-[var(--muted)]">
            Seu código Morrandy é <strong className="text-[var(--cream)]">{doneCode}</strong>. Em breve você receberá as
            instruções de pagamento.
          </p>
          <Link href="/loja" className="btn-primary mt-8 inline-flex">
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6">
          <h1 className="font-display text-4xl">Checkout seguro</h1>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="input sm:col-span-2" name="customerName" placeholder="Nome completo" required />
            <input className="input" name="customerEmail" type="email" placeholder="E-mail" required />
            <input className="input" name="customerPhone" placeholder="WhatsApp / telefone" required />
            <input className="input sm:col-span-2" name="customerCpf" placeholder="CPF (opcional)" />
          </div>

          <h2 className="pt-2 font-semibold">Endereço de entrega</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="input sm:col-span-2" name="shippingStreet" placeholder="Rua" required />
            <input className="input" name="shippingNumber" placeholder="Número" required />
            <input className="input" name="shippingDistrict" placeholder="Bairro" required />
            <input className="input" name="shippingCity" placeholder="Cidade" required />
            <input className="input" name="shippingState" placeholder="UF" maxLength={2} required />
            <input className="input" name="shippingZip" placeholder="CEP" required />
            <input className="input sm:col-span-2" name="shippingComplement" placeholder="Complemento" />
          </div>

          <h2 className="pt-2 font-semibold">Pagamento</h2>
          <select className="input" name="paymentMethod" defaultValue="pix">
            <option value="pix">PIX</option>
            <option value="card">Cartão (manual / integração futura)</option>
          </select>
          <textarea className="input min-h-24" name="notes" placeholder="Observações do pedido" />

          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? "Processando..." : "Confirmar pedido"}
          </button>
        </form>

        <aside className="glass h-fit rounded-3xl p-6">
          <h2 className="font-display text-3xl">Resumo</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-4">
                <span>
                  {i.name} × {i.quantity}
                </span>
                <span>{formatBRL(i.priceCents * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-[var(--line)] pt-4">
            <div className="flex justify-between text-[var(--muted)]">
              <span>Subtotal</span>
              <span>{formatBRL(subtotalCents)}</span>
            </div>
            <div className="flex justify-between text-[var(--muted)]">
              <span>Frete</span>
              <span>{shipping === 0 ? "Grátis" : formatBRL(shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-[var(--cream)]">
              <span>Total</span>
              <span>{formatBRL(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
