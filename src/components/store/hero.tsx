"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-3xl border-2 border-black/10 bg-white/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:p-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-[#6e5424] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#6e5424]">
            <Sparkles className="h-3.5 w-3.5" />
            Nova coleção
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-black sm:text-6xl lg:text-7xl">
            Brilho futurista.
            <span className="block text-[#6e5424]">Elegância atemporal.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-relaxed text-[#2a2622]">
            Morrandy é uma loja de semi joias pensada para quem quer peças limpas, sofisticadas e com presença —
            do colar minimalista ao conjunto de impacto.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/loja"
              className="inline-flex items-center gap-2 rounded-full bg-[#6e5424] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#5a441c]"
            >
              Ver loja
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#colecao"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-black hover:text-white"
            >
              Explorar coleção
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-[2rem] border-2 border-black/20 bg-white/85 shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-display text-7xl font-bold tracking-[0.12em] text-[#6e5424]">M</div>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-black">Morrandy · semi joias</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
