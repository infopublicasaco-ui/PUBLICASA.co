import { ROLE_BADGE_COLORS } from "@/lib/colors";
import { AvatarEditor } from "./AvatarEditor";

interface ProfileHeaderCardProps {
  nombre: string;
  email: string;
  rol: string;
  telefono?: string | null;
  imagen: string | null;
}

export function ProfileHeaderCard({ nombre, email, rol, telefono, imagen }: ProfileHeaderCardProps) {
  const rolColor = ROLE_BADGE_COLORS[rol] || { bg: "bg-gray-100", text: "text-gray-700" };
  const ROLE_LABELS: Record<string, string> = {
    ADMIN: "Administrador",
    PROPIETARIO: "Propietario",
    COMPRADOR: "Comprador",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <AvatarEditor nombre={nombre} imageUrl={imagen} />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{nombre}</h1>
      <p className="mt-1 text-sm text-gray-500">{email}</p>
      {telefono && <p className="text-sm text-gray-500">Tel: {telefono}</p>}
      <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${rolColor.bg} ${rolColor.text.replace('text-', 'bg-').replace('-', '-opacity-10 ')}`}>
        {ROLE_LABELS[rol] || rol}
      </span>
    </div>
  );
}
