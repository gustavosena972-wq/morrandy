import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="font-display text-lg font-semibold tracking-[0.18em] text-[var(--cream)]">MORRANDY</div>
          <p className="mt-2 max-w-md text-sm font-medium text-[var(--muted)]">
            Semi joias com acabamento premium. Compra segura, entrega cuidadosa e atendimento humano.
          </p>
        </div>
        <div className="flex gap-6 text-sm font-semibold text-[var(--cream)]">
          <Link href="/loja" className="hover:text-[var(--gold-deep)]">
            Loja
          </Link>
          <Link href="/checkout" className="hover:text-[var(--gold-deep)]">
            Checkout
          </Link>
        </div>
      </div>
    </footer>
  );
}
