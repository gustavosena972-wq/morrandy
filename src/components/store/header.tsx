"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function StoreHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-black bg-[#6e5424] text-sm font-bold text-white">
            M
          </span>
          <div>
            <div className="font-display text-xl font-bold tracking-[0.12em] text-black">MORRANDY</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a2622]">semi joias</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold text-black md:flex">
          <Link href="/loja" className="hover:text-[#6e5424]">
            Loja
          </Link>
          <Link href="/#colecao" className="hover:text-[#6e5424]">
            Coleção
          </Link>
          <Link href="/#sobre" className="hover:text-[#6e5424]">
            Sobre
          </Link>
        </nav>

        <Link
          href="/carrinho"
          className="relative inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold text-black"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Carrinho</span>
          {count > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#6e5424] px-1 text-[11px] font-bold text-white">
              {count}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
