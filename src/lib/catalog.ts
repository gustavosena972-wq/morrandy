import { db } from "@/lib/db";

export function parseImages(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export async function getActiveProducts() {
  return db.product.findMany({
    where: { active: true },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export async function getFeaturedProducts(limit = 8) {
  return db.product.findMany({
    where: { active: true, featured: true },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findFirst({
    where: { slug, active: true },
    include: { category: true },
  });
}

export async function getCategories() {
  return db.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export function orderCode() {
  const n = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MR-${n.slice(-4)}${r}`;
}
