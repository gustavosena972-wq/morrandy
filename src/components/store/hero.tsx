"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,118,0.18),transparent_65%)] blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/25 bg-[var(--gold)]/10 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-[var(--gold)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Nova coleção
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-5xl leading-[0.95] text-[var(--cream)] sm:text-6xl lg:text-7xl"
          >
            Brilho futurista.
            <span className="block text-[var(--gold)]">Elegância atemporal.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg"
          >
            Morrandy é uma loja de semi joias pensada para quem quer peças limpas, sofisticadas e com presença —
            do colar minimalista ao conjunto de impacto.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/loja"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[#1a1208] transition hover:brightness-110"
            >
              Ver loja
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#colecao"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm text-[var(--cream)] transition hover:border-[var(--gold)]/35 hover:bg-white/5"
            >
              Explorar coleção
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <motion.div
            className="absolute inset-8 rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-md"
            animate={{ rotate: [0, 2, 0, -2, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-[2rem] border border-[var(--gold)]/20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-display text-6xl tracking-[0.4em] text-[var(--gold)]">M</div>
              <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Morrandy · semi joias</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
