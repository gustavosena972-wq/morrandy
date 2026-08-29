import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const categories = [
  { name: "Colares", slug: "colares", sortOrder: 1 },
  { name: "Brincos", slug: "brincos", sortOrder: 2 },
  { name: "Anéis", slug: "aneis", sortOrder: 3 },
  { name: "Pulseiras", slug: "pulseiras", sortOrder: 4 },
  { name: "Conjuntos", slug: "conjuntos", sortOrder: 5 },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@morrandy.com.br";
  const password = process.env.ADMIN_PASSWORD ?? "Morrandy@2026";
  const name = process.env.ADMIN_NAME ?? "Administrador Morrandy";

  const passwordHash = await bcrypt.hash(password, 12);
  await db.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });

  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: cat,
    });
  }

  console.log("Seed OK");
  console.log(`Admin: ${email}`);
  console.log(`Senha: ${password}`);
  console.log("Cadastre as peças no painel /admin/produtos");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
