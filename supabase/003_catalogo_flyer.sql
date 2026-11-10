-- =====================================================================
-- Druckchemie Mexico — Catálogo según el flyer 2026 (Solución de fuente,
-- Aditivos, Auxiliares y Lavadores). Rodillos no se toca (está en código).
-- Ejecutar en Supabase → SQL Editor → Run. Es seguro volver a correrlo.
-- Lo que ya no está en el flyer NO se borra: queda inactivo (oculto en el
-- sitio) y se puede reactivar desde /admin si se necesita.
-- =====================================================================
begin;

-- 1) Renombrar categorías existentes (conserva imágenes/fichas ya subidas)
update public.categorias set slug = 'aditivos'
 where slug = 'aditivos-alcohol'
   and not exists (select 1 from public.categorias where slug = 'aditivos');
update public.categorias set slug = 'auxiliares'
 where slug = 'aditivos-placas'
   and not exists (select 1 from public.categorias where slug = 'auxiliares');

-- 2) Categorías finales
insert into public.categorias (slug, nombre, resumen, orden, activo) values
  ('soluciones-fuente', 'Solución de Fuente',
   'Para máquinas de hoja y rotativas: soluciones de fuente para impresión convencional, híbrida y UV.', 1, true),
  ('aditivos', 'Aditivos',
   'Alcoholes, sustitutos de alcohol y endurecedores para el agua de fuente.', 2, true),
  ('auxiliares', 'Auxiliares',
   'Limpieza, activación y protección de placas, y mantenimiento de sistemas de recirculación.', 3, true),
  ('lavadores-convencionales', 'Lavadores para Tinta Convencional',
   'Lavadores manuales y automáticos para rodillos y mantillas en impresión con tinta convencional.', 4, true),
  ('lavadores-uv', 'Lavadores para Tintas UV',
   'Lavadores y regeneradores para rodillos y mantillas en impresión con tintas UV.', 5, true),
  ('lavadores-hibridos', 'Lavadores para Máquinas Híbridas',
   'Lavadores para prensas que trabajan con tintas UV y convencionales, aprobados por los principales fabricantes.', 6, true)
on conflict (slug) do update
  set nombre = excluded.nombre, resumen = excluded.resumen,
      orden = excluded.orden, activo = true;

-- 3) Productos finales (old_slug = nombre anterior para conservar el registro)
-- (la lista se repite en cada paso porque el SQL Editor de Supabase no conserva tablas temporales)

-- 3a) Reubicar/renombrar los productos que ya existían
with f(cat, slug, old_slug, nombre, descripcion, orden) as (values
  ('soluciones-fuente', 'wassertop-dh-plus', null::text, 'Wassertop DH Plus', 'Solución para máquinas convencionales, híbridas y UV. Baja dosificación (2-4%), buffer muy estable; para placas CTP.', 1),
  ('soluciones-fuente', 'wassertop-sf-3-0', null, 'Wassertop SF 3.0', 'Diseñada para México y la industria de empaque, con certificados ISEGA y FOGRA.', 2),
  ('soluciones-fuente', 'alkoless', null, 'Alkoless', 'Solución para disminución de alcohol.', 3),

  ('aditivos', 'alcohol-isopropilico', 'ipa', 'Alcohol Isopropílico', 'Alcohol con 99.8% de pureza garantizada. Calidad de importación.', 1),
  ('aditivos', 'iso-300', 'iso-300-dtf', 'ISO 300', 'Alcohol económico, apropiado para impresión.', 2),
  ('aditivos', 'alkogreen', null, 'Alkogreen', 'Sustituto de alcohol ecológico, con ahorro de hasta 50%.', 3),
  ('aditivos', 'calcilot', null, 'Calcilot', 'Endurecedor para agua de ósmosis.', 4),
  ('aditivos', 'macnilot', null, 'Macnilot', 'Endurecedor para agua de ósmosis a base de magnesio.', 5),

  ('auxiliares', 'dc-plate-cleaner', 'dc-plate-cleaner-rosa', 'DC Plate Cleaner', 'Limpia placas estándar. ¡Económico y eficiente!', 1),
  ('auxiliares', 'plattenreiniger-special-eu', 'platterreiniger-eu', 'Plattenreiniger Special EU', 'Limpia placas para tinta convencional y UV.', 2),
  ('auxiliares', 'start-aktiv', 'start-aktiv-dft', 'Start Aktiv', 'Activador de placas y cubre rayones.', 3),
  ('auxiliares', 'dc-gum', null, 'DC Gum', 'Limpia placas con goma integrada (2 productos en 1).', 4),
  ('auxiliares', 'alkakleen', null, 'Alkakleen', 'Lavador para sistemas de recirculación, incluyendo mangueras.', 5),

  ('lavadores-convencionales', 'k60', 'k60-dft', 'K60', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Mezclable con agua, seca rápido.', 1),
  ('lavadores-convencionales', 'uniwash-3g', null, 'Uniwash 3G', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Libre de olores, seca rápido.', 2),
  ('lavadores-convencionales', 'eurostar-65', null, 'Eurostar 65', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Mezclable con agua, libre de olores, certificado FOGRA.', 3),
  ('lavadores-convencionales', 'gummi-frisch', null, 'Gummi Frisch', 'Rejuvenecedor de mantillas. Seca rápido y deja la mantilla humectada.', 4),
  ('lavadores-convencionales', 'space-acryl', null, 'Space Acryl', 'Lavador para barniz base agua, para torre y mantilla.', 5),

  ('lavadores-uv', 'uv-19', null, 'UV 19', 'Lavador manual y/o automático para tintas UV.', 1),
  ('lavadores-uv', 'gummi-uv', null, 'Gummi UV', 'Regenerador de hule para rodillos y mantillas. Seca rápido.', 2),

  ('lavadores-hibridos', 'eurostar-uv-mix', null, 'Eurostar UV Mix', 'Lavador de rodillos y mantillas para máquinas híbridas; solvente para tintas UV y convencionales.', 1),
  ('lavadores-hibridos', 'uv-multi-2-8', null, 'UV Multi 2.8', 'Aprobado por Man Roland y KBA. Certificado FOGRA.', 2),
  ('lavadores-hibridos', 'multi-clean-uv', null, 'Multi Clean UV', 'Aprobado por Heidelberg y Man Roland. Con certificado FOGRA.', 3)
)
update public.productos p
   set categoria_id = c.id, slug = f.slug, nombre = f.nombre,
       descripcion = f.descripcion, orden = f.orden, activo = true
  from f
  join public.categorias c on c.slug = f.cat
 where p.slug in (f.slug, coalesce(f.old_slug, f.slug))
   and not exists (select 1 from public.productos q
                    where q.categoria_id = c.id and q.slug = f.slug and q.id <> p.id);

-- 3b) Dar de alta los nuevos
with f(cat, slug, old_slug, nombre, descripcion, orden) as (values
  ('soluciones-fuente', 'wassertop-dh-plus', null::text, 'Wassertop DH Plus', 'Solución para máquinas convencionales, híbridas y UV. Baja dosificación (2-4%), buffer muy estable; para placas CTP.', 1),
  ('soluciones-fuente', 'wassertop-sf-3-0', null, 'Wassertop SF 3.0', 'Diseñada para México y la industria de empaque, con certificados ISEGA y FOGRA.', 2),
  ('soluciones-fuente', 'alkoless', null, 'Alkoless', 'Solución para disminución de alcohol.', 3),

  ('aditivos', 'alcohol-isopropilico', 'ipa', 'Alcohol Isopropílico', 'Alcohol con 99.8% de pureza garantizada. Calidad de importación.', 1),
  ('aditivos', 'iso-300', 'iso-300-dtf', 'ISO 300', 'Alcohol económico, apropiado para impresión.', 2),
  ('aditivos', 'alkogreen', null, 'Alkogreen', 'Sustituto de alcohol ecológico, con ahorro de hasta 50%.', 3),
  ('aditivos', 'calcilot', null, 'Calcilot', 'Endurecedor para agua de ósmosis.', 4),
  ('aditivos', 'macnilot', null, 'Macnilot', 'Endurecedor para agua de ósmosis a base de magnesio.', 5),

  ('auxiliares', 'dc-plate-cleaner', 'dc-plate-cleaner-rosa', 'DC Plate Cleaner', 'Limpia placas estándar. ¡Económico y eficiente!', 1),
  ('auxiliares', 'plattenreiniger-special-eu', 'platterreiniger-eu', 'Plattenreiniger Special EU', 'Limpia placas para tinta convencional y UV.', 2),
  ('auxiliares', 'start-aktiv', 'start-aktiv-dft', 'Start Aktiv', 'Activador de placas y cubre rayones.', 3),
  ('auxiliares', 'dc-gum', null, 'DC Gum', 'Limpia placas con goma integrada (2 productos en 1).', 4),
  ('auxiliares', 'alkakleen', null, 'Alkakleen', 'Lavador para sistemas de recirculación, incluyendo mangueras.', 5),

  ('lavadores-convencionales', 'k60', 'k60-dft', 'K60', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Mezclable con agua, seca rápido.', 1),
  ('lavadores-convencionales', 'uniwash-3g', null, 'Uniwash 3G', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Libre de olores, seca rápido.', 2),
  ('lavadores-convencionales', 'eurostar-65', null, 'Eurostar 65', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Mezclable con agua, libre de olores, certificado FOGRA.', 3),
  ('lavadores-convencionales', 'gummi-frisch', null, 'Gummi Frisch', 'Rejuvenecedor de mantillas. Seca rápido y deja la mantilla humectada.', 4),
  ('lavadores-convencionales', 'space-acryl', null, 'Space Acryl', 'Lavador para barniz base agua, para torre y mantilla.', 5),

  ('lavadores-uv', 'uv-19', null, 'UV 19', 'Lavador manual y/o automático para tintas UV.', 1),
  ('lavadores-uv', 'gummi-uv', null, 'Gummi UV', 'Regenerador de hule para rodillos y mantillas. Seca rápido.', 2),

  ('lavadores-hibridos', 'eurostar-uv-mix', null, 'Eurostar UV Mix', 'Lavador de rodillos y mantillas para máquinas híbridas; solvente para tintas UV y convencionales.', 1),
  ('lavadores-hibridos', 'uv-multi-2-8', null, 'UV Multi 2.8', 'Aprobado por Man Roland y KBA. Certificado FOGRA.', 2),
  ('lavadores-hibridos', 'multi-clean-uv', null, 'Multi Clean UV', 'Aprobado por Heidelberg y Man Roland. Con certificado FOGRA.', 3)
)
insert into public.productos (categoria_id, slug, nombre, descripcion, orden, activo)
select c.id, f.slug, f.nombre, f.descripcion, f.orden, true
  from f join public.categorias c on c.slug = f.cat
on conflict (categoria_id, slug) do update
  set nombre = excluded.nombre, descripcion = excluded.descripcion,
      orden = excluded.orden, activo = true;

-- 4) Ocultar todo lo que no está en el flyer
with f(cat, slug, old_slug, nombre, descripcion, orden) as (values
  ('soluciones-fuente', 'wassertop-dh-plus', null::text, 'Wassertop DH Plus', 'Solución para máquinas convencionales, híbridas y UV. Baja dosificación (2-4%), buffer muy estable; para placas CTP.', 1),
  ('soluciones-fuente', 'wassertop-sf-3-0', null, 'Wassertop SF 3.0', 'Diseñada para México y la industria de empaque, con certificados ISEGA y FOGRA.', 2),
  ('soluciones-fuente', 'alkoless', null, 'Alkoless', 'Solución para disminución de alcohol.', 3),

  ('aditivos', 'alcohol-isopropilico', 'ipa', 'Alcohol Isopropílico', 'Alcohol con 99.8% de pureza garantizada. Calidad de importación.', 1),
  ('aditivos', 'iso-300', 'iso-300-dtf', 'ISO 300', 'Alcohol económico, apropiado para impresión.', 2),
  ('aditivos', 'alkogreen', null, 'Alkogreen', 'Sustituto de alcohol ecológico, con ahorro de hasta 50%.', 3),
  ('aditivos', 'calcilot', null, 'Calcilot', 'Endurecedor para agua de ósmosis.', 4),
  ('aditivos', 'macnilot', null, 'Macnilot', 'Endurecedor para agua de ósmosis a base de magnesio.', 5),

  ('auxiliares', 'dc-plate-cleaner', 'dc-plate-cleaner-rosa', 'DC Plate Cleaner', 'Limpia placas estándar. ¡Económico y eficiente!', 1),
  ('auxiliares', 'plattenreiniger-special-eu', 'platterreiniger-eu', 'Plattenreiniger Special EU', 'Limpia placas para tinta convencional y UV.', 2),
  ('auxiliares', 'start-aktiv', 'start-aktiv-dft', 'Start Aktiv', 'Activador de placas y cubre rayones.', 3),
  ('auxiliares', 'dc-gum', null, 'DC Gum', 'Limpia placas con goma integrada (2 productos en 1).', 4),
  ('auxiliares', 'alkakleen', null, 'Alkakleen', 'Lavador para sistemas de recirculación, incluyendo mangueras.', 5),

  ('lavadores-convencionales', 'k60', 'k60-dft', 'K60', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Mezclable con agua, seca rápido.', 1),
  ('lavadores-convencionales', 'uniwash-3g', null, 'Uniwash 3G', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Libre de olores, seca rápido.', 2),
  ('lavadores-convencionales', 'eurostar-65', null, 'Eurostar 65', 'Lavador manual y/o con sistema automático para rodillos y mantillas. Mezclable con agua, libre de olores, certificado FOGRA.', 3),
  ('lavadores-convencionales', 'gummi-frisch', null, 'Gummi Frisch', 'Rejuvenecedor de mantillas. Seca rápido y deja la mantilla humectada.', 4),
  ('lavadores-convencionales', 'space-acryl', null, 'Space Acryl', 'Lavador para barniz base agua, para torre y mantilla.', 5),

  ('lavadores-uv', 'uv-19', null, 'UV 19', 'Lavador manual y/o automático para tintas UV.', 1),
  ('lavadores-uv', 'gummi-uv', null, 'Gummi UV', 'Regenerador de hule para rodillos y mantillas. Seca rápido.', 2),

  ('lavadores-hibridos', 'eurostar-uv-mix', null, 'Eurostar UV Mix', 'Lavador de rodillos y mantillas para máquinas híbridas; solvente para tintas UV y convencionales.', 1),
  ('lavadores-hibridos', 'uv-multi-2-8', null, 'UV Multi 2.8', 'Aprobado por Man Roland y KBA. Certificado FOGRA.', 2),
  ('lavadores-hibridos', 'multi-clean-uv', null, 'Multi Clean UV', 'Aprobado por Heidelberg y Man Roland. Con certificado FOGRA.', 3)
)
update public.productos p set activo = false
 where not exists (select 1 from f join public.categorias c on c.slug = f.cat
                    where c.id = p.categoria_id and f.slug = p.slug);
update public.categorias set activo = false
 where slug not in ('soluciones-fuente','aditivos','auxiliares',
                    'lavadores-convencionales','lavadores-uv','lavadores-hibridos');

commit;

-- Verificación: 6 categorías activas y 23 productos activos.
select c.orden, c.nombre, count(p.id) filter (where p.activo) as productos_activos
  from public.categorias c left join public.productos p on p.categoria_id = c.id
 where c.activo
 group by c.orden, c.nombre order by c.orden;
