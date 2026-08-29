"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Falha no login.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Morrandy</p>
        <h1 className="font-display mt-2 text-4xl">Admin</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Acesso restrito à operação da loja.</p>
        <div className="mt-6 space-y-3">
          <input className="input" name="email" type="email" placeholder="E-mail" required />
          <input className="input" name="password" type="password" placeholder="Senha" required />
        </div>
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full">
          {busy ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
