const SIZE_CLASSES = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-20 w-20 text-2xl",
} as const;

export function Avatar({
  nombre,
  imageUrl,
  size = "md",
}: {
  nombre: string;
  imageUrl?: string | null;
  size?: keyof typeof SIZE_CLASSES;
}) {
  const sizeClass = SIZE_CLASSES[size];
  const inicial = nombre.trim().charAt(0).toUpperCase() || "?";

  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={nombre}
        className={`${sizeClass} shrink-0 rounded-lg border border-gray-200 object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-lg bg-brand-blueLight font-bold text-brand-blue`}
    >
      {inicial}
    </div>
  );
}
