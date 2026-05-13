-- Roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Admins can view roles"
  on public.user_roles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- WhatsApp clicks tracking
create table public.whatsapp_clicks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  route text,
  source text,
  cta_label text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  search_engine text,
  search_keyword text,
  gclid text,
  fbclid text,
  landing_page text,
  user_agent text,
  device text,
  session_id text
);

create index on public.whatsapp_clicks (created_at desc);
create index on public.whatsapp_clicks (utm_source);
create index on public.whatsapp_clicks (utm_campaign);
create index on public.whatsapp_clicks (search_keyword);

alter table public.whatsapp_clicks enable row level security;

create policy "Anyone can insert clicks"
  on public.whatsapp_clicks for insert
  to anon, authenticated
  with check (true);

create policy "Admins can view clicks"
  on public.whatsapp_clicks for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));