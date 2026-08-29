# Morrandy — banco dedicado no Neon

- **App:** Neon (não Supabase)
- **Projeto:** empty-fire-69087472 (pode renomear para `morrandy` em Settings)
- **Database:** neondb
- **Região:** us-east-2

## Setup

1. Connection strings no `.env` (`DATABASE_URL` pooled + `DIRECT_URL` direct)
2. `npx prisma db push`
3. `npm run db:seed`
4. `npm run dev`
