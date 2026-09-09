import Link from "next/link";

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function EmptyState({ icon, title, description, ctaText, ctaHref }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-4 inline-block rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}
