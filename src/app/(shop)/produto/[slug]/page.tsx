import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/store/product-detail";
import { getProductBySlug } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
