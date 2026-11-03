-- =====================================================================
-- Druckchemie Mexico — Catálogo (categorías, productos, galería) + leads de contacto
-- Ejecutar UNA vez en Supabase → SQL Editor → New query → Run.
-- Es seguro volver a correrlo: no duplica datos.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------- Tablas ----------
create table if not exists public.categorias (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  nombre      text not null,
  resumen     text,
  imagen_url  text,
  orden       int  not null default 0,
  activo      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.productos (
  id                uuid primary key default gen_random_uuid(),
  categoria_id      uuid not null references public.categorias(id) on delete cascade,
  slug              text not null,
  nombre            text not null,
  descripcion       text,
  imagen_url        text,
  ficha_tecnica_url text,
  destacado         boolean not null default false,
  orden             int  not null default 0,
  activo            boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (categoria_id, slug)
);
create index if not exists productos_categoria_idx on public.productos(categoria_id, orden);

create table if not exists public.galeria (
  id          uuid primary key default gen_random_uuid(),
  titulo      text,
  descripcion text,
  imagen_url  text not null,
  orden       int  not null default 0,
  activo      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Mensajes del formulario de Contacto (prospectos). Solo el servidor escribe/lee.
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  empresa    text,
  email      text not null,
  telefono   text,
  mensaje    text not null,
  origen     text,
  atendido   boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;  -- sin políticas: el público no puede leerlos

-- ---------- updated_at automático ----------
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists trg_categorias_upd on public.categorias;
create trigger trg_categorias_upd before update on public.categorias
  for each row execute function public.set_updated_at();
drop trigger if exists trg_productos_upd on public.productos;
create trigger trg_productos_upd before update on public.productos
  for each row execute function public.set_updated_at();

-- ---------- Seguridad (Row Level Security) ----------
-- El público SOLO puede leer lo marcado como activo.
-- Altas/cambios/bajas se harán desde el panel /admin en el servidor (secret key).
alter table public.categorias enable row level security;
alter table public.productos  enable row level security;
alter table public.galeria    enable row level security;

drop policy if exists "lectura publica" on public.categorias;
create policy "lectura publica" on public.categorias for select using (activo);
drop policy if exists "lectura publica" on public.productos;
create policy "lectura publica" on public.productos  for select using (activo);
drop policy if exists "lectura publica" on public.galeria;
create policy "lectura publica" on public.galeria    for select using (activo);

-- ---------- Almacenamiento de imágenes y fichas técnicas ----------
insert into storage.buckets (id, name, public)
values ('imagenes', 'imagenes', true), ('fichas', 'fichas', true)
on conflict (id) do nothing;

-- ---------- Datos iniciales (catálogo actual del sitio) ----------
insert into public.categorias (slug, nombre, resumen, orden) values ('aditivos-alcohol', 'Aditivos (Alcohol)', 'Alcoholes isopropílicos y soluciones a base de alcohol para impresión offset y DTF, en distintos grados de pureza y concentración.', 1) on conflict (slug) do nothing;
insert into public.categorias (slug, nombre, resumen, orden) values ('soluciones-fuente', 'Soluciones para la Fuente', 'Soluciones de fuente para máquinas convencionales, híbridas y UV, incluyendo opciones libres de alcohol certificadas para empaque de alimentos.', 2) on conflict (slug) do nothing;
insert into public.categorias (slug, nombre, resumen, orden) values ('lavadores-convencionales', 'Lavadores Convencionales', 'Lavadores de mantequilla y caucho para limpieza manual y automática de prensas convencionales.', 3) on conflict (slug) do nothing;
insert into public.categorias (slug, nombre, resumen, orden) values ('aditivos-placas', 'Aditivos para Placas', 'Limpiadores, gomas protectoras y productos de mantenimiento para placas de impresión, incluyendo placas híbrido UV.', 4) on conflict (slug) do nothing;
insert into public.categorias (slug, nombre, resumen, orden) values ('lavadores-uv', 'Lavadores UV', 'Lavadores certificados FOGRA formulados específicamente para procesos de impresión UV.', 5) on conflict (slug) do nothing;
insert into public.categorias (slug, nombre, resumen, orden) values ('siliconas', 'Siliconas', 'Siliconas de distintas concentraciones para prensas con horno y uso comercial general.', 6) on conflict (slug) do nothing;
insert into public.categorias (slug, nombre, resumen, orden) values ('panos-lavado', 'Paños de Lavado', 'Paños de lavado compatibles con los principales fabricantes de prensas del mercado.', 7) on conflict (slug) do nothing;

insert into public.productos (categoria_id, slug, nombre, descripcion, orden)
select c.id, v.slug, v.nombre, v.descripcion, v.orden from public.categorias c,
(values
  ('ipa', 'IPA', 'Alcohol isopropílico importado, 99.8% de pureza.', 1),
  ('alcohol-al-99-dtf', 'Alcohol al 99% (DTF)', 'Alcohol nacional para impresión.', 2),
  ('iso-300-dtf', 'ISO 300 (DTF)', 'Alcohol económico con mezcla de metanol para impresión.', 3),
  ('ipa-plus-dtf', 'IPA Plus (DTF)', 'Alcohol concentrado, dosificación de 3% a 5%.', 4)
) as v(slug, nombre, descripcion, orden)
where c.slug = 'aditivos-alcohol'
on conflict (categoria_id, slug) do nothing;

insert into public.productos (categoria_id, slug, nombre, descripcion, orden)
select c.id, v.slug, v.nombre, v.descripcion, v.orden from public.categorias c,
(values
  ('wassertop-dh-plus', 'Wassertop DH Plus', 'Solución para máquinas convencionales, híbridas y UV con baja dosificación.', 1),
  ('wassertop-mx-dft', 'Wassertop MX (DFT)', 'Solución formulada para agua dura.', 2),
  ('alkoless-sf-2-6', 'Alkoless SF 2.6', 'Solución libre de alcohol, certificada para empaque de alimentos ISEGA.', 3),
  ('alkoless-sf-4-75', 'Alkoless SF 4.75', 'Solución libre de alcohol que elimina sales de baterías.', 4),
  ('wassertop-hs-2-44', 'Wassertop HS 2.44', 'Solución para prensas con horno.', 5)
) as v(slug, nombre, descripcion, orden)
where c.slug = 'soluciones-fuente'
on conflict (categoria_id, slug) do nothing;

insert into public.productos (categoria_id, slug, nombre, descripcion, orden)
select c.id, v.slug, v.nombre, v.descripcion, v.orden from public.categorias c,
(values
  ('k60-dft', 'K60 (DFT)', 'Lavado manual o automático, mezclable con agua.', 1),
  ('uniwash-3g', 'Uniwash 3G', 'Lavado rápido, libre de olores.', 2),
  ('eurostar-65', 'Eurostar 65', 'Certificado FOGRA e ISEGA.', 3)
) as v(slug, nombre, descripcion, orden)
where c.slug = 'lavadores-convencionales'
on conflict (categoria_id, slug) do nothing;

insert into public.productos (categoria_id, slug, nombre, descripcion, orden)
select c.id, v.slug, v.nombre, v.descripcion, v.orden from public.categorias c,
(values
  ('dc-plate-cleaner-rosa', 'DC Plate Cleaner — Rosa', 'Limpia placas para tinta convencional.', 1),
  ('neutral-gummierung', 'Neutral Gummierung', 'Goma protectora para placas.', 2),
  ('platterreiniger-eu', 'Platterreiniger EU', 'Para placas híbrido UV.', 3),
  ('start-aktiv-dft', 'Start Aktiv (DFT)', 'Limpia y pule rayones.', 4)
) as v(slug, nombre, descripcion, orden)
where c.slug = 'aditivos-placas'
on conflict (categoria_id, slug) do nothing;

insert into public.productos (categoria_id, slug, nombre, descripcion, orden)
select c.id, v.slug, v.nombre, v.descripcion, v.orden from public.categorias c,
(values
  ('eurostar-uv-mix', 'Eurostar UV Mix', 'Certificado FOGRA.', 1),
  ('balkleen-uv', 'Balkleen UV', 'Lavador certificado FOGRA para prensas KBA.', 2),
  ('eurostar-nv-5-0', 'Eurostar NV 5.0', 'Para máquinas con horno.', 3)
) as v(slug, nombre, descripcion, orden)
where c.slug = 'lavadores-uv'
on conflict (categoria_id, slug) do nothing;

insert into public.productos (categoria_id, slug, nombre, descripcion, orden)
select c.id, v.slug, v.nombre, v.descripcion, v.orden from public.categorias c,
(values
  ('silicona-surf-373', 'Silicona SURF 373', 'Alta calidad para prensas con horno.', 1),
  ('silicona-surf-plus', 'Silicona SURF Plus', 'Concentración media.', 2),
  ('silicona-ecomax', 'Silicona Ecomax', 'Silicón comercial de uso general.', 3)
) as v(slug, nombre, descripcion, orden)
where c.slug = 'siliconas'
on conflict (categoria_id, slug) do nothing;

insert into public.productos (categoria_id, slug, nombre, descripcion, orden)
select c.id, v.slug, v.nombre, v.descripcion, v.orden from public.categorias c,
(values
  ('panos-para-heidelberg', 'Paños para Heidelberg', 'Compatibles con prensas Heidelberg.', 1),
  ('panos-para-kba', 'Paños para KBA', 'Compatibles con prensas KBA.', 2),
  ('panos-para-komori', 'Paños para Komori', 'Compatibles con prensas Komori.', 3),
  ('panos-para-mitsubishi', 'Paños para Mitsubishi', 'Compatibles con prensas Mitsubishi.', 4),
  ('panos-para-goss', 'Paños para Goss', 'Compatibles con prensas Goss.', 5)
) as v(slug, nombre, descripcion, orden)
where c.slug = 'panos-lavado'
on conflict (categoria_id, slug) do nothing;

-- Verificación: debe mostrar 7 categorías y el total de productos.
select (select count(*) from public.categorias) as categorias,
       (select count(*) from public.productos)  as productos;
