import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { PublicarWizard } from "@/components/publicar/PublicarWizard";

export default async function PublicarPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { telefono: true, whatsapp: true },
  });

  return (
    <PublicarWizard
      initialTelefono={user?.telefono ?? ""}
      initialWhatsapp={user?.whatsapp ?? ""}
    />
  );
}
