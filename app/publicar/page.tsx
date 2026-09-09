import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PublicarWizard } from "@/components/publicar/PublicarWizard";

export default async function PublicarPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return <PublicarWizard />;
}
