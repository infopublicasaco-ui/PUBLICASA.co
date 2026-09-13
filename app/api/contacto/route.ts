import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { sendEmail, getContactEmailHtml, getConfirmationEmailHtml } from "@/lib/email/send";

// Validación con Zod
const contactSchema = z.object({
  propertyId: z.string().min(1, "Property ID es requerido"),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(150),
  email: z.string().email("El email no es válido"),
  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .regex(/^[\d\s\-\+\(\)]+$/, "El teléfono solo debe contener números y caracteres válidos")
    .max(30),
  mensaje: z.string().max(1000).optional().default(""),
  consentimiento: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
  honeypot: z.string().max(0, "Validación fallida"), // debe estar vacío
});

type ContactFormData = z.infer<typeof contactSchema>;

// Simple in-memory rate limiting (max 5 solicitudes por IP por hora)
const requestLog = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestLog.get(ip);

  if (!record || now > record.resetTime) {
    // Nueva hora o primer request
    requestLog.set(ip, { count: 1, resetTime: now + 3600000 });
    return true;
  }

  if (record.count >= 5) {
    return false; // Rate limit excedido
  }

  record.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : request.ip || "unknown";
  return ip;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Rate limiting por IP
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta más tarde." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validación con Zod
    const parsedData = contactSchema.parse(body);

    // Obtener sesión del usuario autenticado (si existe)
    const session = await auth();
    const userId = session?.user?.id;

    // Crear el registro de contacto
    const contactRequest = await prisma.contactRequest.create({
      data: {
        propertyId: parsedData.propertyId,
        nombre: parsedData.nombre,
        email: parsedData.email,
        telefono: parsedData.telefono,
        mensaje: parsedData.mensaje,
        consentimientoDatos: parsedData.consentimiento,
        ipAddress: ip,
        origen: "formulario_web",
        interesadoId: userId || null,
      },
      include: {
        property: {
          select: {
            id: true,
            titulo: true,
            propietarioId: true,
            propietario: {
              select: {
                nombre: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Enviar correos en background (no bloquear respuesta)
    Promise.all([
      // Correo al vendedor
      sendEmail({
        to: contactRequest.property.propietario.email,
        subject: `Nuevo contacto para: ${contactRequest.property.titulo}`,
        html: getContactEmailHtml(
          parsedData.nombre,
          parsedData.email,
          parsedData.telefono,
          parsedData.mensaje,
          contactRequest.property.titulo,
          contactRequest.property.id
        ),
      }),
      // Correo de confirmación al comprador
      sendEmail({
        to: parsedData.email,
        subject: "Solicitud de contacto recibida - PUBLICASA.co",
        html: getConfirmationEmailHtml(parsedData.nombre, contactRequest.property.titulo),
      }),
    ]).catch((err) => {
      console.error("Error enviando emails:", err);
      // No hacer fallar la respuesta si los emails no se envían
    });

    return NextResponse.json(
      {
        success: true,
        message: "Solicitud enviada correctamente",
        contactRequestId: contactRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Validación fallida" },
        { status: 400 }
      );
    }

    console.error("Error en POST /api/contacto:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

// Endpoint PATCH para actualizar el estado de un contacto
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de contacto requerido" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { estado } = body;

    if (!estado) {
      return NextResponse.json(
        { error: "Estado es requerido" },
        { status: 400 }
      );
    }

    // Verificar que el usuario es el propietario del inmueble
    const contactRequest = await prisma.contactRequest.findUnique({
      where: { id },
      include: {
        property: {
          select: { propietarioId: true },
        },
      },
    });

    if (!contactRequest) {
      return NextResponse.json(
        { error: "Contacto no encontrado" },
        { status: 404 }
      );
    }

    if (contactRequest.property.propietarioId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para actualizar este contacto" },
        { status: 403 }
      );
    }

    // Actualizar estado
    const updatedContactRequest = await prisma.contactRequest.update({
      where: { id },
      data: {
        estado,
        leida: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Estado actualizado",
        contactRequest: updatedContactRequest,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /api/contacto:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
