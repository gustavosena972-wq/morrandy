# Morrandy — Loja de semi joias

Projeto **independente** da CodeCraft Solutions e do CodeCraft Gestão.

Loja virtual completa com vitrine futurista, carrinho, checkout, estoque e painel admin.

## Stack

- Next.js 16 + TypeScript + Tailwind CSS
- Prisma + **PostgreSQL (Neon)** — app de banco separado
- Sessão admin com JWT (`jose`) + senha com `bcrypt`
- Animações com Framer Motion

## Banco no Neon (app separado)

Não usa Supabase. Banco **só da Morrandy** no [Neon](https://console.neon.tech).

1. Entre em [console.neon.tech](https://console.neon.tech) (Google ou GitHub)
2. **Create project** → nome `morrandy`
3. Copie:
   - connection string **pooled** → `DATABASE_URL`
   - connection string **direct** → `DIRECT_URL`
4. Cole no `.env` (veja `.env.example`)

```bash
cd C:\Users\sandr\Projects\morrandy
npx prisma db push
npm run db:seed
npm run dev
```

Abra:

- Loja: http://localhost:3000
- Admin: http://localhost:3000/admin/login

Credenciais padrão (altere no `.env`):

- E-mail: `admin@morrandy.com.br`
- Senha: `Morrandy@2026`

## Cadastrar peças

1. Entre no admin
2. **Produtos → Nova peça**
3. Preencha nome, preço, estoque e URLs das fotos (uma por linha)
4. Marque **Destaque** para aparecer na home

## Segurança

- Admin protegido por middleware + cookie httpOnly
- Validação de checkout com Zod
- Baixa de estoque transacional no pedido
- Troque `SESSION_SECRET` no `.env` antes de publicar
- **Nunca** commite `.env` nem exponha `DATABASE_URL` no front

## Próximos passos (quando quiser)

- Upload de fotos (Neon + Vercel Blob / Cloudinary)
- Gateway PIX/cartão (Asaas, Mercado Pago)
- Deploy na Vercel apontando para o Neon
