"use client";

interface Article {
  id: number;
  category: string;
  isNew: boolean;
  title: string;
  excerpt: string;
  content: string;
  stat: { value: string; label: string };
  author: string;
  date: string;
  readTime: string;
}

export function ArticleCard({ article }: { article: Article }) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    "Sabana de Bogotá": { bg: "bg-blue-100", text: "text-blue-700" },
    "Financiación": { bg: "bg-amber-100", text: "text-amber-700" },
    "Mercado Nacional": { bg: "bg-emerald-100", text: "text-emerald-700" },
  };

  const colors = categoryColors[article.category] || { bg: "bg-gray-100", text: "text-gray-700" };

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
      {/* Thumbnail */}
      <div className={`${colors.bg} h-48 flex items-center justify-center`}>
        <div className="text-center opacity-40">
          <div className={`text-4xl font-serif font-bold ${colors.text}`}>
            {article.stat.value}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <span className={`${colors.bg} ${colors.text} text-xs font-bold px-3 py-1 rounded-full w-fit`}>
          {article.category}
        </span>

        <h3 className="text-xl font-bold text-gray-900 leading-snug">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed flex-1">
          {article.excerpt}
        </p>

        <div className={`${colors.bg} p-3 rounded`}>
          <div className={`text-lg font-serif font-bold ${colors.text}`}>
            {article.stat.value}
          </div>
          <div className="text-xs text-gray-700">
            {article.stat.label}
          </div>
        </div>

        <div className="flex gap-2 text-xs text-gray-500">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <a href="#" className="inline-flex items-center gap-2 text-brand-green font-semibold text-sm hover:gap-3 transition-all">
          Leer más →
        </a>
      </div>
    </article>
  );
}
