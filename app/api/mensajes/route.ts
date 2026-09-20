import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const { contenido, destinatario_id, property_id } = await req.json();

  if (!contenido || !destinatario_id) {
    return Response.json(
      { error: "contenido y destinatario_id requeridos" },
      { status: 400 }
    );
  }

  const message = await prisma.message.create({
    data: {
      contenido,
      remitente_id: user.id,
      destinatario_id,
      property_id: property_id || null,
    },
    include: {
      remitente: true,
      destinatario: true,
      property: true,
    },
  });

  return Response.json(message);
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { remitente_id: user.id },
        { destinatario_id: user.id },
      ],
    },
    include: {
      remitente: true,
      destinatario: true,
      property: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(messages);
}
