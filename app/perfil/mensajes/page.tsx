import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { MisMessages } from "@/components/mensajes/MisMessages";

export const metadata = {
  title: "Mis Mensajes | PUBLICASA.co",
};

export default async function MensajesPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    redirect("/login");
  }

  // Obtener todos los mensajes del usuario
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { remitente_id: currentUser.id },
        { destinatario_id: currentUser.id },
      ],
    },
    include: {
      remitente: true,
      destinatario: true,
      property: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Obtener lista de usuarios con los que ha conversado
  const conversationUserIds = new Set<string>();
  
  messages.forEach((msg) => {
    if (msg.remitente_id === currentUser.id) {
      conversationUserIds.add(msg.destinatario_id);
    } else {
      conversationUserIds.add(msg.remitente_id);
    }
  });

  const conversations = await prisma.user.findMany({
    where: {
      id: { in: Array.from(conversationUserIds) },
    },
  });

  return (
    <main>
      <MisMessages
        currentUser={currentUser}
        conversations={conversations}
        initialMessages={messages}
      />
    </main>
  );
}
