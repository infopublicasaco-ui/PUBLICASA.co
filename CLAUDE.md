# PUBLICASA.co

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

- Formulario real de publicación (`/publicar`): cualquier usuario
  autenticado (sin importar su `rol`) puede publicar un inmueble.
  Crea la `Property` en `estado: PENDIENTE_REVISION`, que espera
  aprobación en el panel de moderación (ver "Moderación" abajo).
  Los campos de habitaciones/baños/parqueaderos/
  piso/ascensor se ocultan cuando `tipo = LOTE`. Las características de
  sector/adicionales se arman con checkboxes fijos (mismas claves que
  usa el seed) en vez de un editor de JSON libre.
- **Fotos son URLs pegadas por el usuario, no upload real.** Se
  decidió así para no depender de configurar un bucket de Supabase
  Storage con políticas de acceso todavía; el campo en BD
  (`PropertyPhoto.url`) es un string en ambos casos, así que migrar a
  carga real de archivos más adelante no requiere tocar el modelo de
  datos, solo el input del formulario.

- **Navegador de mapa interactivo**: home es ahora una página
  responsiva con filtros (Comprar/Arrendar, tipo, precio, búsqueda
  por ciudad/barrio) a la izquierda y mapa de Leaflet + OpenStreetMap
  a la derecha. Los inmuebles se muestran como pins con etiquetas de
  precio compacto ($930M). Usa clustering automático para 3+ marcadores
  cercanos. El mapa es client-side only (dynamic, ssr: false) para no
  inflar el bundle del servidor.

- **Pipeline de agentes IA**: procesa inmuebles publicados de forma
  asíncrona (no bloquea la publicación). Ofrece:
  - Generación de descripciones mejoradas (Claude): contexto por tipo,
    operación, zona. Prompt especializado para copy inmobiliario.
  - Sugerencia de precio (Claude/OpenAI con fallback): basada en
    características (habitaciones, área, estrato, antigüedad) + ubicación.
    Devuelve % diferencia vs precio actual + recomendación de ajuste.
  - Análisis de fotos (Claude Vision): detecta tipo inmueble visible,
    calidad (excelente/buena/regular/pobre), luminosidad, características
    visibles (mobiliario, decoración, orden) y sugerencias de mejora.
    Procesa cada foto, consolida análisis en resumen. Se guarda en
    campo JSON `analisisVisual`.
  - Flujo: usuario publica → Property ACTIVO de una vez → en background,
    fetch async a /api/agents/process-property → descripción, precio
    sugerido y análisis visual se guardan en la BD sin interferencia.
  - Configuración: ANTHROPIC_API_KEY y OPENAI_API_KEY en `.env`
    (ambas opcionales, fallback automático).

- **Moderación (`/admin`)**: cola de inmuebles en `PENDIENTE_REVISION`
  que un `Role.ADMIN` aprueba o rechaza.
  - **Rechazar no borra**: pasa a `RECHAZADO` y guarda `motivoRechazo`
    (obligatorio). Borrar destruiría el trabajo del propietario y sería
    irreversible; así el propietario ve en `/perfil` y en el detalle qué
    debe corregir, y el admin puede reinstaurar el inmueble aprobándolo.
  - **El rol se valida en Node, no en el middleware**: `middleware.ts`
    corre en Edge y solo garantiza que haya sesión. La comprobación de
    `ADMIN` vive en `app/admin/page.tsx` y en `/api/admin/*`, que son la
    autoridad real. La página responde `notFound()` (404) en vez de 403
    para no revelar que el panel existe.
  - Un inmueble no aprobado sigue siendo visible por enlace directo (el
    propietario aterriza ahí tras publicar) pero lleva `noindex` y no
    aparece en listados ni acepta solicitudes de contacto.

- **Solicitudes de contacto**: formulario en el detalle (solo si el
  inmueble está `ACTIVO`) que guarda un `ContactRequest`. Funciona con
  o sin cuenta: si hay sesión se toman nombre/email de ella, si no, el
  visitante los escribe. Exige email **o** teléfono para que el
  propietario pueda responder.
  - **Notificación in-app, no email todavía**: el propietario ve las
    solicitudes en `/perfil` con contador de no leídas (`leida`). Se
    eligió así para no depender de un proveedor de email (Resend/SMTP)
    ni de WhatsApp Business API; la bandeja es requisito previo de
    cualquiera de esos canales, así que montarlos encima después no
    cambia el modelo de datos.

- **Edición de inmuebles** (`/propiedades/[id]/editar`): propietarios
  pueden actualizar todo (título, descripción, características, fotos,
  precio, ubicación). Cierra el ciclo de moderación: un inmueble
  `RECHAZADO` que se edita y guarda vuelve a `PENDIENTE_REVISION`
  (limpia `motivoRechazo`). Inmuebles `ACTIVO` que se editan siguen en
  `ACTIVO` sin interrupción. Solo el propietario puede acceder (retorna
  404 a otros).

Pendiente: carga real de fotos (upload a Supabase Storage en vez de
pegar URLs), notificación por email/WhatsApp de las solicitudes de
contacto, activación del pipeline de IA (ANTHROPIC_API_KEY).

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
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: opcional, Measurement ID de GA4
  (`G-XXXXXXX`). Ver sección "Google Analytics" abajo.
- Claves de Google Maps y de proveedores de IA (Anthropic/OpenAI) se
  usarán cuando se implemente el navegador de mapa y el pipeline de
  agentes respectivamente.

## Google Analytics

- Se usa `@next/third-parties` (paquete oficial de Next.js/Google), no
  un `<script>` a mano ni `react-ga`: inyecta gtag.js de forma
  optimizada (carga diferida, sin bloquear el render) y es el método
  que recomienda la propia documentación de Next.js 14 App Router.
- **Opcional igual que Google OAuth**: `<GoogleAnalytics gaId={...} />`
  solo se renderiza en `app/layout.tsx` si `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  está en `.env`. Sin esa variable, no se carga ningún script de
  analítica y el resto del sitio funciona igual.
- Va en el layout raíz (no por página) para medir todo el sitio,
  incluidas las páginas SSR/ISR — `@next/third-parties` funciona en
  Server Components sin necesitar marcar el layout como dinámico.
- La Política de Cookies (`/legal/cookies`) ya mencionaba Google
  Analytics como cookie de medición; con esta variable configurada esa
  mención pasa a ser cierta en producción.

## Cómo correr el proyecto

```bash
npm install
cp .env.example .env   # y completar valores reales
npx prisma migrate dev
npm run db:seed        # datos de prueba
npm run dev
```

## Próximos pasos previstos (no implementados aún)

1. **Arreglar el hash de contraseñas del seed**: `lib/db/seed.ts` usa un
   `fakeHash` con sha256 de cuando aún no había login. La autenticación
   real usa `bcrypt.compare`, así que **ningún usuario del seed puede
   iniciar sesión** (incluido `admin@publicasa.co`). Para probar el panel
   de moderación hay que crear un ADMIN con `bcrypt.hash` a mano. Cambiar
   `fakeHash` por `bcrypt.hash` y volver a sembrar lo resuelve.

2. **Activación del pipeline de IA** (descripciones, pricing, análisis visual):
   - Configurar `ANTHROPIC_API_KEY` en `.env` (es la única requerida).
   - El flujo ya está implementado, solo falta la credencial.
   - Endpoint `/api/agents/process-property` corre en background tras
     publicar o editar un inmueble.

3. Carga real de fotos (Supabase Storage) en vez de pegar URLs.
   - Bucket con políticas de acceso (lectura pública para fotos, escritura
     solo propietario).
   - Upload form en /publicar y /editar con drag-drop / file picker.
   - Reemplazar URL strings con referencias a storage.

4. Notificar las solicitudes de contacto por fuera de la app (email vía
   Resend o WhatsApp); hoy solo hay bandeja in-app en `/perfil`.

5. Mejoras al mapa:
   - Click en pin abre modal/drawer del detalle.
   - Geolocation del usuario (botón "Ubicar me").
   - Búsqueda por radio de distancia desde ubicación.
   - Opciones de vista (satellite, terrain).

6. Dashboard del propietario (en /perfil):
   - Estadísticas: visualizaciones, contactos, ofertas.
   - Historial de precios sugeridos.
   - Editor rápido inline de descripción/precio.

## Convenciones para trabajar en este repo

- No agregar lógica de negocio ni abstracciones especulativas antes
  de que exista la necesidad concreta (evitar over-engineering en
  esta etapa temprana).
- Priorizar server components y SSR/SSG donde sea posible por el
  requisito de SEO fuerte.
