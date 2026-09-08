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

Implementado y validado end-to-end:
- Modelo de datos completo (`User`, `Property`, `PropertyPhoto`,
  `ContactRequest`, `SavedSearch` + tablas de NextAuth) con migración
  aplicada y seed de datos realistas.
- Listado (`/`) y detalle (`/propiedades/[id]`) de inmuebles,
  server-rendered con ISR (`revalidate = 60`), metadata dinámica y
  JSON-LD (`RealEstateListing`) para SEO.
- Autenticación completa: registro, login (credenciales + Google
  opcional), perfil, middleware de rutas protegidas. Ver sección
  "Autenticación" abajo para el detalle de decisiones.

Pendiente: formulario real de publicación de inmuebles (`/publicar`
hoy es un placeholder protegido), navegador de mapa, pipeline de
agentes IA.

## Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS
- Prisma ORM
- PostgreSQL vía Supabase. La conexión **directa** (`db.<ref>.supabase.co`)
  es IPv6-only; en este entorno de desarrollo no había salida IPv6, así
  que tanto `DATABASE_URL` como `DIRECT_URL` usan el **pooler Supavisor**
  (`aws-0-<region>.pooler.supabase.com`): puerto 6543 (`pgbouncer=true`)
  para runtime y puerto 5432 (session mode) para migraciones. Si el
  entorno donde corras esto sí tiene IPv6, puedes volver a la conexión
  directa para `DIRECT_URL`.
- NextAuth.js v5 (Auth.js, beta) — ver sección "Autenticación".

## Estructura de carpetas

```
/app            Rutas, layouts y páginas (App Router), incluidos los
                API routes bajo /app/api (auth, registro).
  /propiedades/[id]  Detalle de inmueble (SEO, ISR).
  /login, /registro, /perfil, /publicar   Auth y áreas de usuario.
/components     Componentes de UI. /components/auth para formularios
                de login/registro (client components).
/lib
  /agents       Lógica de agentes de IA (fotos, descripciones,
                geolocalización, pricing). Vacío intencionalmente:
                se irá poblando cuando se construya el pipeline.
  /auth         Config de NextAuth, dividida en dos archivos (ver
                "Autenticación").
  /db           Cliente Prisma (prisma.ts) + queries (properties.ts)
                + seed.ts.
/prisma         schema.prisma y migraciones.
/public         Assets estáticos.
/types          Módulo de augmentation de tipos de next-auth.
middleware.ts   Protección de rutas (edge runtime).
```

## Autenticación

Decisiones tomadas al implementar el Paso 3 (registro/login):

- **NextAuth v5 (Auth.js, `next-auth@beta`)**, no v4: es la versión
  pensada para App Router (config centralizada, `auth()` server-side
  sin `getServerSession`, integración directa con middleware). Vive en
  beta pero es el patrón recomendado por Vercel para Next 14/15.
- **Config partida en dos archivos** (`lib/auth/config.ts` +
  `lib/auth/index.ts`): Prisma no puede correr en el Edge Runtime, y
  `middleware.ts` sí corre ahí. `config.ts` es edge-safe (sin Prisma,
  sin bcrypt, sin providers) y solo trae el callback `authorized` que
  decide qué rutas están protegidas. `index.ts` (Node runtime) tiene
  el adapter de Prisma, Credentials, Google y los callbacks de
  jwt/session. El middleware importa únicamente `config.ts`.
- **Sesión JWT, no database**: NextAuth exige `session: { strategy:
  "jwt" }` cuando se combina un Credentials provider con un adapter
  (las sesiones de credenciales no se pueden persistir en la tabla
  `Session`). El adapter de Prisma se sigue usando para que Google
  pueda crear/vincular el `User` y `Account` correspondientes.
- **Google OAuth es opcional**: el provider solo se agrega si
  `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` están en `.env` (ver
  `lib/auth/index.ts`). Sin esas variables, el botón "Continuar con
  Google" ni siquiera se renderiza (login/registro lo calculan server-side
  con `Boolean(process.env.GOOGLE_CLIENT_ID && ...)`). Hace falta crear
  credenciales OAuth en Google Cloud Console para activarlo.
- **El registro (`POST /api/registro`) es un endpoint propio**, no
  parte de NextAuth: valida datos, hashea con `bcrypt` (10 rounds) y
  crea el `User`. Justo después, el cliente llama a
  `signIn("credentials", ...)` para loguear automáticamente sin pasos
  extra (clave para que el registro sea rápido, como pidió el negocio).
- **Rol al registrarse no bloquea nada**: es solo un dato informativo
  (`Role.COMPRADOR` por defecto). El formulario de registro deja
  elegir "buscar" o "publicar" inmuebles, pero cualquier usuario puede
  publicar o contactar sin importar su rol. Los usuarios creados por
  Google entran con `COMPRADOR` por defecto (no hay forma de pedir el
  rol durante el redirect de OAuth sin fricción extra).
- **Schema de `User` extendido** para soportar el adapter: `password`
  ahora es `String?` (null si el usuario solo usa Google),
  `emailVerified`/`image` se agregaron para el perfil de Google, y se
  sumaron los modelos estándar `Account`, `Session`,
  `VerificationToken` que exige `@auth/prisma-adapter`.
- **`Nav` es un client component** que usa `useSession()` (con
  `SessionProvider` envolviendo `{children}` en `layout.tsx`), en vez
  de llamar `auth()` en el layout server-side. Llamar `auth()` (lee
  cookies) en el layout raíz forzaba renderizado dinámico en **todas**
  las páginas, incluida la home con ISR — rompía el cacheo pensado
  para SEO/performance. Mantener el chequeo de sesión del Nav en el
  cliente evita ese problema.
- **Middleware protege** `/perfil/:path*` y `/publicar/:path*`
  (matcher en `middleware.ts`); redirige a `/login?callbackUrl=...`
  si no hay sesión.

## Variables de entorno

Ver [.env.example](.env.example). Copiar a `.env` y completar:
- `DATABASE_URL` / `DIRECT_URL`: credenciales del proyecto Supabase
  (ver nota de IPv6/pooler arriba).
- `NEXTAUTH_SECRET`: generar con `openssl rand -base64 32`.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: opcionales, solo si se
  quiere activar login con Google.
- Claves de Google Maps y de proveedores de IA (Anthropic/OpenAI) se
  usarán cuando se implemente el navegador de mapa y el pipeline de
  agentes respectivamente.

## Cómo correr el proyecto

```bash
npm install
cp .env.example .env   # y completar valores reales
npx prisma migrate dev
npm run db:seed        # datos de prueba
npm run dev
```

## Próximos pasos previstos (no implementados aún)

1. Formulario real de publicación de inmuebles en `/publicar`
   (creación de `Property` + carga de fotos).
2. Navegador de mapa (Google Maps / Mapbox) para explorar inmuebles
   por ubicación.
3. Pipeline de agentes de IA en `/lib/agents`: procesamiento de fotos,
   generación de descripciones, geolocalización automática, sugerencia
   de pricing.
4. Formulario de solicitud de contacto (`ContactRequest`) en la página
   de detalle — hoy el detalle solo enlaza a WhatsApp/llamada directa.

## Convenciones para trabajar en este repo

- No agregar lógica de negocio ni abstracciones especulativas antes
  de que exista la necesidad concreta (evitar over-engineering en
  esta etapa temprana).
- Priorizar server components y SSR/SSG donde sea posible por el
  requisito de SEO fuerte.
