# Dexyn Site OS

Framework comercial para crear sitios web premium y gestionarlos desde un workspace SaaS. Construido con React, TypeScript, Vite, Tailwind CSS, Lucide React y Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

Produccion:

```bash
npm run build
npm run preview
```

Vercel usa `npm run build` y el directorio `dist`.

## Rutas

- `/`: demo publica de Lumen House.
- `/login`: acceso al workspace.
- `/dashboard`: proyectos, filtros, creacion y estados de publicacion.
- Editor: orden y visibilidad de secciones, preview, identidad visual y publicacion.

La sesion y los proyectos funcionan localmente con `localStorage` para que el producto sea usable sin credenciales externas. La frontera de persistencia esta aislada en `src/dashboard/auth.tsx`, `src/dashboard/store.ts` y `src/dashboard/context.ts`; en produccion se pueden sustituir por Supabase Auth, Postgres y Storage sin cambiar la interfaz del editor.

## Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Abre `SQL Editor`, pega y ejecuta `supabase/schema.sql`.
3. En `Project Settings > API`, copia `Project URL` y `anon public key`.
4. Duplica `.env.example` como `.env.local` y completa:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
```

5. Reinicia `npm run dev`.
6. En `/login`, introduce tu email. Supabase enviara un magic link; al abrirlo volveras a `/dashboard`.

Nunca uses la `service_role key` en este frontend. Solo la clave `anon public` debe llegar al navegador, y el aislamiento real lo hacen las policies RLS del SQL.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. Importa el repositorio en Vercel.
3. En `Project Settings > General`, deja `Root Directory` vacío (`/`). No uses `dx-plantilla`: esa carpeta ya no existe.
4. Usa `npm run build` como Build Command y `dist` como Output Directory.
5. En Vercel, abre `Settings > Environment Variables` y añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` para Production, Preview y Development según corresponda.
6. En Supabase, abre `Authentication > URL Configuration` y añade:
	- `http://localhost:5173/**`
	- `https://tu-dominio.vercel.app/**`
	- Tu dominio personalizado cuando lo conectes.
7. En `Site URL`, usa la URL pública principal de Vercel o tu dominio final.
8. Haz un redeploy después de guardar las variables.

`vercel.json` mantiene funcionando las rutas SPA `/login` y `/dashboard` cuando el usuario entra directamente o refresca una página.

## Crear un cliente

1. Edita `src/data/business.ts` con identidad, contacto, imagenes, servicios, equipo, testimonios, precios y FAQ.
2. Edita `src/themes/theme.ts` con colores, tipografias y radios.
3. Edita `src/config/site-config.ts` para activar, desactivar o reordenar secciones.
4. Cambia las meta etiquetas de `index.html`.
5. Desde `/dashboard`, crea o ajusta el proyecto y publica su estado.

## Arquitectura

- `src/App.tsx`: router entre demo publica y SaaS.
- `src/PublicDemo.tsx`: demo publica configurada por datos.
- `src/dashboard`: auth, store local, workspace, editor y estilos del SaaS.
- `src/data`: contenido editable de un negocio.
- `src/themes`: tokens visuales inyectados como variables CSS.
- `src/config`: page builder, navegación y SEO.
- `src/types`: contratos tipados para contenido y dominios comerciales.
- `src/components/ui`: primitives de diseño.
- `src/components/navigation`: navbars y menú móvil.
- `src/components/hero`: variantes centered, split, fullscreen y minimal.
- `src/components/sections`: secciones completas de la demo.
- `src/components/cards`: cards genéricas y pricing.
- `src/components/business`: menú, ecommerce, propiedades, habitaciones y membresías.
- `src/components/forms`: lead, booking, newsletter y estados de formulario.
- `src/components/media`: galerías, video y before/after.
- `src/components/pricing`: cards y tablas comparativas.
- `src/components/testimonials`: cards y grids de testimonios.
- `src/components/social`: puntuaciones y reseñas.
- `src/lib/form-adapter.ts`: adapter demo o endpoint HTTP.

## Dominios soportados

Los tipos de `src/types/domains.ts` cubren restaurantes (`MenuCategory`), hoteles (`Room`), inmobiliarias (`Property`), ecommerce (`Product`) y gimnasios (`Membership`). Los componentes reciben datos por props y no conocen el cliente concreto.

## Produccion

Para convertir la vertical slice local en SaaS multiusuario:

1. Crear proyecto Supabase.
2. Conectar Auth al provider de `src/dashboard`.
3. Persistir `Project` en Postgres con organizaciones y roles.
4. Migrar assets a Supabase Storage.
5. Añadir RLS por `organization_id`.
6. Configurar dominios y publicación en Vercel.

El build y lint deben pasar antes de publicar:

```bash
npm run build
npm run lint
```
