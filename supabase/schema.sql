-- Morrandy — tabelas isoladas com prefixo mr_
-- Projeto Supabase: gestao-empresarial (dtfsmfvamqtiiwjfcvyt)
-- Não altera tabelas cc_* do Finora nem outras existentes.
-- SQL Editor → cole → RUN (idempotente: create if not exists)

create table if not exists public.mr_admin_users (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.mr_categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.mr_products (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text not null default '',
  price_cents integer not null,
  compare_cents integer,
  material text not null default '',
  sku text not null default '',
  stock integer not null default 0,
  images text not null default '[]',
  featured boolean not null default false,
  active boolean not null default true,
  category_id text references public.mr_categories (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mr_products_active_featured_idx
  on public.mr_products (active, featured);

create index if not exists mr_products_category_id_idx
  on public.mr_products (category_id);

create table if not exists public.mr_orders (
  id text primary key,
  code text not null unique,
  status text not null default 'pending',
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_cpf text not null default '',
  shipping_street text not null,
  shipping_number text not null,
  shipping_district text not null,
  shipping_city text not null,
  shipping_state text not null,
  shipping_zip text not null,
  shipping_complement text not null default '',
  payment_method text not null default 'pix',
  subtotal_cents integer not null,
  shipping_cents integer not null default 0,
  total_cents integer not null,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mr_orders_status_created_at_idx
  on public.mr_orders (status, created_at desc);

create table if not exists public.mr_order_items (
  id text primary key,
  order_id text not null references public.mr_orders (id) on delete cascade,
  product_id text references public.mr_products (id) on delete set null,
  product_name text not null,
  product_slug text not null,
  unit_price_cents integer not null,
  quantity integer not null
);

create index if not exists mr_order_items_order_id_idx
  on public.mr_order_items (order_id);

-- Bloqueia acesso público via API REST do Supabase.
-- O app usa Prisma no servidor com a connection string do Postgres.
alter table public.mr_admin_users enable row level security;
alter table public.mr_categories enable row level security;
alter table public.mr_products enable row level security;
alter table public.mr_orders enable row level security;
alter table public.mr_order_items enable row level security;
