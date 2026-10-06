create extension if not exists pgcrypto;
create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null,
  bride_name text, groom_name text, event_date date, subtitle text, description text,
  cover_image_url text, gallery_urls text[] not null default '{}', drive_url text, photos_url text,
  visibility text not null default 'draft' check (visibility in ('draft','public','private')),
  password_hash text, sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.site_settings (key text primary key,value jsonb not null default '{}'::jsonb,updated_at timestamptz not null default now());
insert into public.site_settings(key,value) values
('brand','{"name":"Nhà Cưới – Nhà 1995 Studio","tagline":"Chạm vào khoảnh khắc, lưu giữ một đời."}'::jsonb),
('contact','{"facebook":"","zalo":"","phone":"","address":""}'::jsonb)
on conflict (key) do nothing;
alter table public.albums enable row level security;
alter table public.site_settings enable row level security;
drop policy if exists "public can read public albums" on public.albums;
drop policy if exists "authenticated can insert albums" on public.albums;
drop policy if exists "authenticated can update albums" on public.albums;
drop policy if exists "authenticated can delete albums" on public.albums;
drop policy if exists "public can read site settings" on public.site_settings;
drop policy if exists "authenticated can write site settings" on public.site_settings;
create policy "public can read public albums" on public.albums for select using (visibility='public' or auth.role()='authenticated');
create policy "authenticated can insert albums" on public.albums for insert to authenticated with check (true);
create policy "authenticated can update albums" on public.albums for update to authenticated using (true) with check (true);
create policy "authenticated can delete albums" on public.albums for delete to authenticated using (true);
create policy "public can read site settings" on public.site_settings for select using (true);
create policy "authenticated can write site settings" on public.site_settings for all to authenticated using (true) with check (true);
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end; $$;
drop trigger if exists albums_set_updated_at on public.albums;
create trigger albums_set_updated_at before update on public.albums for each row execute function public.set_updated_at();
drop trigger if exists settings_set_updated_at on public.site_settings;
create trigger settings_set_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
