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

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm mb-12">
      {/* Thumbnail */}
      <div className="bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 min-h-96 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="text-6xl font-serif opacity-30 mb-4">{article.stat.value}</div>
          <p className="text-sm opacity-60 uppercase tracking-wide">{article.category.toUpperCase()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-12 flex flex-col justify-center gap-6">
        <div className="flex gap-2 items-center">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
            {article.category}
          </span>
          {article.isNew && (
            <span className="bg-brand-green text-white text-xs font-bold px-2 py-1 rounded">
              Nuevo
            </span>
          )}
        </div>

        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          {article.excerpt}
        </p>

        <div className="bg-emerald-50 border-l-4 border-brand-green p-4 rounded">
          <div className="text-3xl font-serif font-bold text-brand-green">
            {article.stat.value}
          </div>
          <div className="text-sm text-gray-700 mt-1">
            {article.stat.label}
          </div>
        </div>

        <div className="flex gap-2 text-sm text-gray-500 flex-wrap">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <a href="#" className="inline-flex items-center gap-2 text-brand-green font-semibold hover:gap-3 transition-all">
          Leer análisis completo →
        </a>
      </div>
    </article>
  );
}
