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
