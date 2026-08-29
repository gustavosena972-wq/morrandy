"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatBRL } from "@/lib/money";

type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  compareCents: number | null;
  material: string;
  sku: string;
  stock: number;
  images: string;
  featured: boolean;
  active: boolean;
  categoryId: string | null;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    if (!fd.get("slug")) fd.set("slug", slug || slugify(name));

    const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
    const method = product ? "PATCH" : "POST";

    const res = await fetch(url, { method, body: fd });
    setBusy(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Erro ao salvar.");
      return;
    }

    router.push("/admin/produtos");
    router.refresh();
  }

  async function onDelete() {
    if (!product || !confirm("Excluir esta peça?")) return;
    const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/produtos");
      router.refresh();
    }
  }

  let imagesText = "";
  if (product?.images) {
    try {
      imagesText = JSON.parse(product.images).join("\n");
    } catch {
      imagesText = product.images;
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass mt-8 space-y-4 rounded-3xl p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-[var(--muted)]">Nome</label>
          <input
            className="input"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!product) setSlug(slugify(e.target.value));
            }}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-[var(--muted)]">Slug (URL)</label>
          <input className="input" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
        <div>
          <label className="mb-1 block text-sm text-[var(--muted)]">Preço (R$)</label>
          <input
            className="input"
            name="price"
            defaultValue={product ? (product.priceCents / 100).toFixed(2).replace(".", ",") : ""}
            placeholder="89,90"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-[var(--muted)]">Preço comparativo (opcional)</label>
          <input
            className="input"
            name="comparePrice"
            defaultValue={
              product?.compareCents ? (product.compareCents / 100).toFixed(2).replace(".", ",") : ""
            }
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-[var(--muted)]">Estoque</label>
          <input className="input" name="stock" type="number" min={0} defaultValue={product?.stock ?? 0} required />
        </div>
        <div>
          <label className="mb-1 block text-sm text-[var(--muted)]">Categoria</label>
          <select className="input" name="categoryId" defaultValue={product?.categoryId || ""}>
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-[var(--muted)]">Material</label>
          <input className="input" name="material" defaultValue={product?.material || ""} placeholder="Banho ouro 18k" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-[var(--muted)]">SKU</label>
          <input className="input" name="sku" defaultValue={product?.sku || ""} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-[var(--muted)]">Descrição</label>
          <textarea className="input min-h-28" name="description" defaultValue={product?.description || ""} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-[var(--muted)]">URLs das fotos (uma por linha)</label>
          <textarea className="input min-h-28 font-mono text-xs" name="images" defaultValue={imagesText} placeholder="https://..." />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} />
          Destaque na home
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="active" defaultChecked={product?.active ?? true} />
          Ativo na loja
        </label>
      </div>

      {product ? <p className="text-xs text-[var(--muted)]">Preço atual: {formatBRL(product.priceCents)}</p> : null}

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={busy} className="btn-primary">
          {busy ? "Salvando..." : "Salvar peça"}
        </button>
        {product ? (
          <button type="button" className="btn-ghost" onClick={onDelete}>
            Excluir
          </button>
        ) : null}
      </div>
    </form>
  );
}
