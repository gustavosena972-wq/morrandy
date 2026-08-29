import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { db } from "@/lib/db";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  if (id === "novo") redirect("/admin/produtos/novo");

  const [product, categories] = await Promise.all([
    db.product.findUnique({ where: { id } }),
    db.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/admin/produtos" className="text-sm text-[var(--gold)] hover:underline">
        ← Voltar
      </Link>
      <h1 className="font-display mt-4 text-4xl">Editar peça</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
