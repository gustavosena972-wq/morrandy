"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#6e5424]/25 bg-white/85 p-6 shadow-[0_24px_60px_rgba(60,40,10,0.1)] backdrop-blur-md sm:p-8">
          <div className="pointer-events-none absolute inset-[6px] rounded-[1.7rem] border border-[#6e5424]/15" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(212,175,95,0.25),transparent_70%)]" />

          <p className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-[#6e5424]/40 bg-[linear-gradient(90deg,#fff,#f8efd8)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#6e5424]">
            <Sparkles className="h-3.5 w-3.5" />
            Nova coleção
          </p>
          <h1 className="relative font-display text-5xl font-bold leading-[1.05] text-black sm:text-6xl lg:text-7xl">
            Brilho futurista.
            <span className="block text-[#6e5424]">Elegância atemporal.</span>
          </h1>
          <p className="relative mt-6 max-w-xl text-lg font-semibold leading-relaxed text-[#2a2622]">
            Morrandy é uma loja de semi joias pensada para quem quer peças limpas, sofisticadas e com presença —
            do colar minimalista ao conjunto de impacto.
          </p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <Link
              href="/loja"
              className="inline-flex items-center gap-2 rounded-full bg-[#6e5424] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(110,84,36,0.35)] transition hover:bg-[#5a441c]"
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
          {/* layered frames */}
          <div className="absolute inset-3 rounded-[2.2rem] border border-[#6e5424]/20" />
          <div className="absolute inset-0 overflow-hidden rounded-[2.4rem] border border-[#6e5424]/35 bg-[linear-gradient(145deg,#fffdf8_0%,#f3e8d4_42%,#fff9ef_100%)] shadow-[0_30px_70px_rgba(60,40,10,0.16)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.9),transparent_45%),radial-gradient(circle_at_75%_70%,rgba(212,175,95,0.22),transparent_50%)]" />
            <motion.div
              aria-hidden
              className="absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,236,180,0.55),transparent_70%)]"
              animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-1/4 right-[-10%] h-2/5 w-2/5 rounded-full bg-[radial-gradient(circle,rgba(212,175,95,0.35),transparent_70%)]"
              animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute inset-0 grid place-items-center">
              <div className="relative text-center">
                <div className="mx-auto mb-5 grid h-28 w-28 place-items-center rounded-full border border-[#6e5424]/35 bg-white/70 shadow-[inset_0_0_30px_rgba(212,175,95,0.25)] backdrop-blur-sm">
                  <span className="font-display text-6xl font-bold tracking-[0.12em] text-[#6e5424]">M</span>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Morrandy</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#6e5424]">semi joias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
