import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";
import { db } from "@/lib/db";

export default async function NewProductPage() {
  const categories = await db.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/admin/produtos" className="text-sm text-[var(--gold)] hover:underline">
        ← Voltar
      </Link>
      <h1 className="font-display mt-4 text-4xl">Nova peça</h1>
      <p className="mt-2 text-[var(--muted)]">Cadastre nome, preço, estoque e fotos quando você enviar.</p>
      <ProductForm categories={categories} />
    </div>
  );
}
