"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

export function ProductCard({ id, slug, name, priceCents, compareCents, images, material }: ProductCardProps) {
  const imgs = parseImages(images);
  const cover = imgs[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[0_10px_30px_rgba(28,25,22,0.06)]"
    >
      <Link href={`/produto/${slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#f3efe8] to-white">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt={name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-24 w-24 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 shadow-[0_0_40px_rgba(184,146,74,0.2)]" />
            </div>
          )}
        </div>
        <div className="space-y-2 p-5">
          {material ? <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold-deep)]">{material}</p> : null}
          <h3 className="font-display text-xl text-[var(--cream)]">{name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-[var(--cream)]">{formatBRL(priceCents)}</span>
            {compareCents && compareCents > priceCents ? (
              <span className="text-sm text-[var(--muted)] line-through">{formatBRL(compareCents)}</span>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
