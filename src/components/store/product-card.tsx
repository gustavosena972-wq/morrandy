"use client";

import Link from "next/link";
import { formatBRL } from "@/lib/money";
import { parseImages } from "@/lib/catalog";

type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  compareCents?: number | null;
  images: string;
  material?: string;
};

export function ProductCard({ slug, name, priceCents, compareCents, images, material }: ProductCardProps) {
  const imgs = parseImages(images);
  const cover = imgs[0];

  return (
    <article className="group overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition hover:-translate-y-1">
      <Link href={`/produto/${slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f3efe8]">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-24 w-24 rounded-full border-2 border-[#6e5424] bg-[#6e5424]/15" />
            </div>
          )}
        </div>
        <div className="space-y-2 p-5">
          {material ? <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6e5424]">{material}</p> : null}
          <h3 className="font-display text-xl font-bold text-black">{name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-black">{formatBRL(priceCents)}</span>
            {compareCents && compareCents > priceCents ? (
              <span className="text-sm font-semibold text-[#555] line-through">{formatBRL(compareCents)}</span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
