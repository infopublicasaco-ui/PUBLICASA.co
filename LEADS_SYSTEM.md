# Sistema de Captura de Leads - PUBLICASA.co

## 📋 Descripción General

Sistema completo para capturar, validar, gestionar y notificar contactos de interesados en propiedades. Incluye validación en tiempo real, protección anti-spam, notificaciones por email y dashboard de gestión para vendedores.

---

## 🎯 Características Implementadas

### 1. **Formulario de Contacto Mejorado**
- ✅ Validación de email con formato correcto (contiene `@`)
- ✅ Validación de teléfono (mínimo 7 dígitos, solo números y caracteres válidos)
- ✅ Mensajes de error específicos por campo
- ✅ Errores aparecen SOLO al intentar enviar (no en tiempo real)
- ✅ Texto predeterminado: "Hola, encontré esta propiedad en Publicasa.co y me gustaría más información."
- ✅ Honeypot field para detectar bots (posicionado fuera de pantalla)

**Archivo**: `components/ContactForm.tsx`

### 2. **API Endpoint de Contactos**
- ✅ `POST /api/contacto` - Crear nuevo contacto
  - Validación con Zod
  - Rate limiting: máximo 5 solicitudes por IP por hora
  - Captura IP del cliente
  - Integración con sesión de usuario (si está autenticado)
  - Respuestas HTTP apropiadas (201, 400, 429, 500)

- ✅ `PATCH /api/contacto?id={id}` - Actualizar estado de contacto
  - Solo para propietarios del inmueble
  - Cambia estado del lead (NUEVO → CONTACTADO → EN_NEGOCIACION → CERRADO/DESCARTADO)
  - Marca como leído

**Archivo**: `app/api/contacto/route.ts`

### 3. **Sistema de Emails**
- ✅ Nodemailer configurado para SMTP
- ✅ Dos tipos de emails:
  1. **Correo al Vendedor**
     - Recibe datos completos del contacto
     - Enlace directo a su panel de control
     - HTML profesional con datos organizados
  
  2. **Correo de Confirmación al Comprador**
     - Confirma que su solicitud fue recibida
     - Indica que el propietario lo contactará
     - Tranquilizante y profesional

- ✅ Envío asíncrono (no bloquea la respuesta al usuario)
- ✅ Modo desarrollo: loguea emails a consola si no hay SMTP configurado

**Archivo**: `lib/email/send.ts`

**Configuración de Entorno**:
```env
SMTP_HOST=tu-smtp.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@publicasa.co
SMTP_PASS=tu-contraseña
SMTP_FROM=noreply@publicasa.co
```

### 4. **Base de Datos**
- ✅ Schema actualizado con nuevos campos:
  - `estado` (ContactRequestStatus): NUEVO, CONTACTADO, EN_NEGOCIACION, CERRADO, DESCARTADO
  - `ip_address`: IP del usuario que envió el contacto
  - `consentimiento_datos`: Boolean (consentimiento GDPR)
  - `origen`: String (formulario_web, etc.)

- ✅ Índices para búsquedas rápidas:
  - `idx_estado`: para filtrar por estado
  - `idx_property`: para búsquedas por propiedad
  - `idx_created_at`: para ordenar por fecha

**Archivo**: `prisma/schema.prisma`

### 5. **Dashboard de Gestión de Leads**
- ✅ Tabla interactiva en el perfil del vendedor
- ✅ Columnas:
  - Nombre del contacto (con badge "Nuevo" si no se ha leído)
  - Email y teléfono del interesado
  - Propiedad a la que se refiere
  - Estado actual (selector dropdown)
  - Fecha de contacto

- ✅ Funcionalidades:
  - Cambiar estado en tiempo real
  - Indicadores visuales (colores por estado)
  - Contador de nuevos contactos
  - Estado de carga mientras se actualiza

**Archivo**: `components/perfil/LeadsTable.tsx`

---

## 🔒 Seguridad

### Anti-Spam
- **Honeypot Field**: Campo oculto CSS que bots podrían llenar
- **Rate Limiting**: Máximo 5 solicitudes por IP por hora
- **Validación Zod**: Validación estricta de datos
- **Email Validation**: Verifica formato correcto

### Protección de Datos
- **Consentimiento**: Requiere aceptación de términos
- **GDPR Ready**: Campo de consentimiento de datos
- **IP Tracking**: Se registra IP para detección de abuso
- **Acceso Controlado**: Solo el vendedor ve sus propios contactos

---

## 📊 Estados del Lead

```
NUEVO (Azul)
├─ CONTACTADO (Púrpura)
│  ├─ EN_NEGOCIACION (Naranja)
│  │  ├─ CERRADO (Verde) ✓
│  │  └─ DESCARTADO (Gris) ✗
```

---

## 📧 Ejemplo de Emails

### Email al Vendedor
**Asunto**: Nuevo contacto para: [Título Propiedad]

Incluye:
- Nombre del interesado
- Email de contacto (con link mailto:)
- Teléfono (con link tel:)
- Mensaje del interesado
- Link directo al panel para ver el contacto

### Email al Comprador
**Asunto**: Solicitud de contacto recibida - PUBLICASA.co

Incluye:
- Confirmación de recepción
- Nombre de la propiedad
- Expectativa de que el propietario lo contactará
- Datos que proporcionó

---

## 🚀 Próximos Pasos Opcionales

1. **WhatsApp Integration**
   - Botón de envío directo por WhatsApp
   - API de WhatsApp Business

2. **Llamadas Directas**
   - Integración con proveedores telefónicos
   - Logging de llamadas

3. **Dashboard Avanzado**
   - Gráficas de leads por mes/estado
   - Filtros y búsqueda
   - Exportación CSV

4. **Automatización**
   - Respuestas automáticas
   - Recordatorios para leads sin contactar
   - Seguimiento automático

---

## 🧪 Testing

### Verificado en Navegador
- ✅ Validación de email con @ requerido
- ✅ Validación de teléfono (7+ dígitos, caracteres válidos)
- ✅ Mensajes de error específicos por campo
- ✅ Errores solo al enviar (no en tiempo real inicialmente)
- ✅ Honeypot previene bots
- ✅ Rate limiting por IP
- ✅ API responde con códigos HTTP correctos

### Para Testing Local
1. Configure variables de entorno SMTP o deje en modo desarrollo
2. Llene el formulario con datos válidos
3. Verifique la consola del servidor para logs de email
4. Acceda a `/perfil` para ver el dashboard de leads

---

## 📝 Notas de Implementación

- El envío de emails es **asíncrono** (Promise.all sin await)
- Los errores de email **no fallan** la respuesta al usuario
- El rate limiting se mantiene en memoria (reseteado cada hora)
- El dashboard usa Client Component para interactividad
- La tabla es responsiva y scrollable en móvil

---

## 🔗 Enlaces Relevantes

- **Formulario**: `components/ContactForm.tsx`
- **API**: `app/api/contacto/route.ts`
- **Emails**: `lib/email/send.ts`
- **Dashboard**: `components/perfil/LeadsTable.tsx`
- **Perfil**: `app/perfil/page.tsx`

---

**Fecha**: Septiembre 2026
**Estado**: ✅ Completamente Implementado
