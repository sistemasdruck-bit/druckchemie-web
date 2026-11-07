-- =====================================================================
-- Druckchemie Mexico — Solicitudes de cotización (cotizador del sitio)
-- Ejecutar UNA vez en Supabase → SQL Editor → New query → Run.
-- Es seguro volver a correrlo: no duplica ni borra datos.
-- =====================================================================

create table if not exists public.cotizaciones (
  id             uuid primary key default gen_random_uuid(),
  folio          bigint generated always as identity unique,
  nombre         text not null,
  empresa        text,
  email          text not null,
  telefono       text,
  ciudad_estado  text,
  prensa_marca   text,
  prensa_modelo  text,
  tipo_impresion text,
  comentarios    text,
  atendida       boolean not null default false,
  created_at     timestamptz not null default now()
);
create index if not exists cotizaciones_created_idx on public.cotizaciones(created_at desc);

create table if not exists public.cotizacion_items (
  id               uuid primary key default gen_random_uuid(),
  cotizacion_id    uuid not null references public.cotizaciones(id) on delete cascade,
  producto_slug    text not null,
  producto_nombre  text not null,
  categoria_nombre text,
  cantidad         numeric(12,2) not null check (cantidad > 0),
  unidad           text not null
);
create index if not exists cotizacion_items_cot_idx on public.cotizacion_items(cotizacion_id);

-- Seguridad: solo el servidor (llave secreta) escribe y lee estas tablas.
-- Sin políticas, el público con la llave anon no puede ver ni modificar nada.
alter table public.cotizaciones     enable row level security;
alter table public.cotizacion_items enable row level security;

-- Verificación: debe devolver 0 y 0 en una instalación nueva.
select (select count(*) from public.cotizaciones)     as cotizaciones,
       (select count(*) from public.cotizacion_items) as partidas;
