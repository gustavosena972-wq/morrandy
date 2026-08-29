"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function StoreHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#060608]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <motion.span
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-sm font-semibold tracking-[0.2em] text-[var(--gold)]"
            whileHover={{ rotate: 8, scale: 1.05 }}
          >
            M
          </motion.span>
          <div>
            <div className="font-display text-xl tracking-[0.35em] text-[var(--cream)]">MORRANDY</div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">semi joias</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
          <Link href="/loja" className="hover:text-[var(--cream)] transition-colors">
            Loja
          </Link>
          <Link href="/#colecao" className="hover:text-[var(--cream)] transition-colors">
            Coleção
          </Link>
          <Link href="/#sobre" className="hover:text-[var(--cream)] transition-colors">
            Sobre
          </Link>
        </nav>

        <Link
          href="/carrinho"
          className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--cream)] transition hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/10"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Carrinho</span>
          {count > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--gold)] px-1 text-[11px] font-bold text-[#1a1208]">
              {count}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
