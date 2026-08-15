# Druck Chemie México — Sitio web

Sitio web nuevo de Druck Chemie México: Next.js (TypeScript + Tailwind CSS)
desplegado en Railway, con Supabase como backend (base de datos, auth,
storage) y GitHub como control de versiones. Cada push a `main` dispara un
build/deploy automático en Railway.

## Estructura de secciones

- `/` — Inicio
- `/nosotros` — Misión, visión, valores
- `/productos` — Catálogo por categorías (dato base en `src/data/productos.ts`,
  pendiente de migrar a Supabase)
- `/galeria` — Placeholder hasta recibir fotografías reales
- `/contacto` — Formulario de contacto (`/api/contacto` guarda el lead en
  Supabase si está configurado; si no, lo registra en logs del servidor)
- `/cotizador` — Placeholder del futuro cotizador conectado a Supabase
- `/blog` — Placeholder de noticias/blog dinámico
- `/clientes` — Placeholder del área de clientes con Supabase Auth

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # y completar las llaves de Supabase
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Ver `.env.example`. Las mismas variables deben configurarse en Railway
(Settings → Variables) para que el sitio en producción se conecte a
Supabase.

## Despliegue

El servicio en Railway está conectado a este repositorio de GitHub con
auto-deploy habilitado: cualquier push a la rama `main` reconstruye y
despliega automáticamente.
