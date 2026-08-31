-- Barbearia do Torres — schema de agendamento
-- Executar no SQL Editor do projeto Supabase (Database > SQL Editor > New query).
--
-- Variáveis de ambiente necessárias no .env.local:
--   NEXT_PUBLIC_SUPABASE_URL     (Project Settings > API > Project URL)
--   SUPABASE_SERVICE_ROLE_KEY    (Project Settings > API > service_role, NUNCA expor no cliente)
--   ADMIN_SECRET                 (senha de acesso ao painel /admin)

create extension if not exists pgcrypto;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  duration_minutes integer not null default 40 check (duration_minutes > 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  service_id uuid not null references public.services(id),
  service_name text not null,
  duration_minutes integer not null,
  date date not null,
  start_time time not null,
  status text not null default 'pendente'
    check (status in ('pendente', 'confirmado', 'cancelado', 'concluido')),
  created_at timestamptz not null default now(),
  -- trava anti-duplicidade: um único agendamento por data+horário de início
  constraint appointments_unique_slot unique (date, start_time)
);

create index if not exists appointments_date_idx on public.appointments (date);
create index if not exists appointments_status_idx on public.appointments (status);

create table if not exists public.availability_blocks (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  start_time time,
  end_time time,
  reason text,
  created_at timestamptz not null default now()
);

create index if not exists availability_blocks_date_idx on public.availability_blocks (date);

-- Seed: serviços iniciais (ajuste durações conforme a operação)
insert into public.services (name, duration_minutes) values
  ('Corte Clássico', 40),
  ('Barba & Navalha', 30),
  ('Visagismo', 60)
on conflict do nothing;