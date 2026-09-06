# PublicAsa.co

Plataforma inmobiliaria tipo marketplace (similar a Fincaraíz o
Metrocuadrado) con agentes de IA integrados y un navegador de mapa
(estilo Google Maps) para explorar inmuebles publicados.

## Modelo de negocio

- Los usuarios se registran, publican inmuebles y son contactados por
  interesados (flujo tipo clasificados/marketplace, no transaccional).
- A futuro se integrará un pipeline de agentes de IA que procesará
  fotos, generará descripciones, hará geolocalización y sugerirá
  pricing de los inmuebles publicados.
- El SEO es crítico: los inmuebles individuales deben indexarse en
  Google, por lo que las páginas de detalle deben ser server-rendered
  (App Router / RSC) con metadata dinámica, no client-side only.

## Estado actual

Solo existe el esqueleto del proyecto (sin lógica de negocio, sin
modelos de datos, sin autenticación real). El objetivo de esta etapa
era tener `npm run dev` corriendo sin errores sobre una base
escalable.

## Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS
- Prisma ORM
- PostgreSQL vía Supabase (usa `DATABASE_URL` pooled + `DIRECT_URL`
  directa para migraciones, patrón estándar de Supabase + Prisma)

## Estructura de carpetas

```
/app            Rutas, layouts y páginas (App Router). Aquí vive el frontend
                y, cuando se necesiten, los API routes bajo /app/api.
/components     Componentes de UI reutilizables. Vacío por ahora.
/lib
  /agents       Lógica de agentes de IA (fotos, descripciones,
                geolocalización, pricing). Vacío intencionalmente:
                se irá poblando cuando se construya el pipeline.
  /db           Cliente de acceso a datos (prisma.ts: singleton de
                PrismaClient para evitar múltiples conexiones en dev).
/prisma         schema.prisma (sin modelos todavía) y migraciones.
/public         Assets estáticos.
```

## Variables de entorno

Ver [.env.example](.env.example). Copiar a `.env` y completar:
- `DATABASE_URL` / `DIRECT_URL`: credenciales del proyecto Supabase.
- `NEXTAUTH_SECRET`: generar con `openssl rand -base64 32`.
- Claves de Google Maps y de proveedores de IA (Anthropic/OpenAI) se
  usarán cuando se implemente el navegador de mapa y el pipeline de
  agentes respectivamente.

## Cómo correr el proyecto

```bash
npm install
cp .env.example .env   # y completar valores reales
npx prisma generate
npm run dev
```

## Próximos pasos previstos (no implementados aún)

1. Modelos Prisma: `User`, `Property`, `PropertyImage`, `Lead`/contacto.
2. Autenticación (NextAuth) y flujo de registro/publicación.
3. Páginas de detalle de inmueble server-rendered con metadata
   dinámica (SEO) y datos estructurados (schema.org `RealEstateListing`).
4. Navegador de mapa (Google Maps / Mapbox) para explorar inmuebles
   por ubicación.
5. Pipeline de agentes de IA en `/lib/agents`: procesamiento de fotos,
   generación de descripciones, geolocalización automática, sugerencia
   de pricing.

## Convenciones para trabajar en este repo

- No agregar lógica de negocio ni abstracciones especulativas antes
  de que exista la necesidad concreta (evitar over-engineering en
  esta etapa temprana).
- Priorizar server components y SSR/SSG donde sea posible por el
  requisito de SEO fuerte.
