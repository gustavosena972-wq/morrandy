import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t-2 border-black bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="font-display text-lg font-bold tracking-[0.12em] text-black">MORRANDY</div>
          <p className="mt-2 max-w-md text-sm font-semibold text-[#2a2622]">
            Semi joias com acabamento premium. Compra segura, entrega cuidadosa e atendimento humano.
          </p>
        </div>
        <div className="flex gap-6 text-sm font-bold text-black">
          <Link href="/loja" className="hover:text-[#6e5424]">
            Loja
          </Link>
          <Link href="/checkout" className="hover:text-[#6e5424]">
            Checkout
          </Link>
        </div>
      </div>
    </footer>
  );
}
