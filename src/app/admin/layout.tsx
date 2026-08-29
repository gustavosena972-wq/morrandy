import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";
import { getAdminSession } from "@/lib/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--cream)]">
      {session ? (
        <header className="border-b border-[var(--line)] bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div>
              <Link href="/admin" className="font-display text-2xl tracking-[0.25em]">
                MORRANDY
              </Link>
              <p className="text-xs text-[var(--muted)]">Painel admin · {session.name}</p>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-sm">
              <Link href="/admin/produtos" className="btn-ghost px-4 py-2 text-sm">
                Produtos
              </Link>
              <Link href="/admin/pedidos" className="btn-ghost px-4 py-2 text-sm">
                Pedidos
              </Link>
              <Link href="/" className="btn-ghost px-4 py-2 text-sm">
                Ver loja
              </Link>
              <LogoutButton />
            </nav>
          </div>
        </header>
      ) : null}
      <main>{children}</main>
    </div>
  );
}
