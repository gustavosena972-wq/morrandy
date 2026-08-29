import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="mt-auto border-t border-white/8 bg-[#050507]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="font-display text-lg tracking-[0.3em] text-[var(--cream)]">MORRANDY</div>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            Semi joias com acabamento premium. Compra segura, entrega cuidadosa e atendimento humano.
          </p>
        </div>
        <div className="flex gap-6 text-sm text-[var(--muted)]">
          <Link href="/loja" className="hover:text-[var(--cream)]">
            Loja
          </Link>
          <Link href="/checkout" className="hover:text-[var(--cream)]">
            Checkout
          </Link>
        </div>
      </div>
    </footer>
  );
}
