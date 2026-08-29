export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function parseBRLToCents(value: string | number): number {
  if (typeof value === "number") return Math.round(value * 100);
  const normalized = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  const num = Number.parseFloat(normalized);
  if (Number.isNaN(num)) return 0;
  return Math.round(num * 100);
}
