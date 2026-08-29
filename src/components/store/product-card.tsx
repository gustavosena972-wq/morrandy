"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <article className="group relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_40px_rgba(60,40,10,0.1)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_rgba(60,40,10,0.16)]">
      {/* Outer gold frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-[#6e5424]/35" />
      <div className="pointer-events-none absolute inset-[5px] rounded-[1.45rem] border border-[#6e5424]/20" />

      <Link href={`/produto/${slug}`} className="relative block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(160deg,#f7f1e6_0%,#efe4d2_45%,#faf6f0_100%)]">
          {/* soft shine sweep */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.45)_48%,transparent_62%)] opacity-0 transition duration-700 group-hover:translate-x-4 group-hover:opacity-100" />

          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="relative flex h-full items-center justify-center">
              <div className="absolute h-40 w-40 rounded-full border border-[#6e5424]/25" />
              <div className="absolute h-28 w-28 rounded-full border border-[#6e5424]/40 bg-[radial-gradient(circle_at_30%_30%,#f4e7c8,#d4af5f44_55%,transparent)]" />
              <div className="absolute h-3 w-3 rounded-full bg-[#6e5424]/70 shadow-[0_0_18px_rgba(212,175,95,0.8)]" />
              <span className="font-display relative z-[1] text-5xl font-bold tracking-[0.18em] text-[#6e5424]/50">M</span>
            </div>
          )}

          <div className="absolute left-4 top-4 z-[2]">
            {material ? (
              <span className="rounded-full border border-[#6e5424]/30 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6e5424] backdrop-blur-sm">
                {material}
              </span>
            ) : (
              <span className="rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black/70 backdrop-blur-sm">
                Morrandy
              </span>
            )}
          </div>

          <div className="absolute bottom-4 right-4 z-[2] grid h-10 w-10 place-items-center rounded-full border border-[#6e5424]/30 bg-white/90 text-[#6e5424] opacity-0 shadow-sm backdrop-blur-sm transition duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="relative space-y-3 border-t border-[#6e5424]/15 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] px-5 py-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold leading-snug text-black transition group-hover:text-[#6e5424]">
              {name}
            </h3>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-black">{formatBRL(priceCents)}</span>
              {compareCents && compareCents > priceCents ? (
                <span className="text-sm font-semibold text-[#777] line-through">{formatBRL(compareCents)}</span>
              ) : null}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6e5424]/80">Ver peça</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
