import { Avatar } from "./Avatar";
import { DirectContactButtons } from "./DirectContactButtons";

export function SellerContactInfo({
  nombre,
  imageUrl,
  whatsapp,
  telefono,
  showDirectButtons = true,
}: {
  nombre: string;
  imageUrl?: string | null;
  whatsapp?: string;
  telefono?: string;
  showDirectButtons?: boolean;
}) {
  return (
    <div>
      <Avatar nombre={nombre} imageUrl={imageUrl} size="md" />
      <p className="mt-3 text-sm font-medium text-gray-900">
        También puedes contactar directamente a {nombre}
      </p>
      {showDirectButtons && (
        <div className="mt-3">
          <DirectContactButtons nombre={nombre} whatsapp={whatsapp} telefono={telefono} />
        </div>
      )}
    </div>
  );
}
