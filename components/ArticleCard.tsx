'use client';

import React from 'react';
import { Article } from '../lib/articles';
import { Clock, ArrowUpRight, Brain, Globe, Building2, BarChart2 } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  featured?: boolean;
}

export default function ArticleCard({ article, onSelect, featured = false }: ArticleCardProps) {
  const isIndian = article.scope === 'Indian';

  return (
    <article
      onClick={() => onSelect(article)}
      className={`group relative bg-white dark:bg-[#0f172a] rounded-2xl border border-stone-200/90 dark:border-slate-800/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:border-stone-400 dark:hover:border-slate-600 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-12 md:gap-6' : ''
      }`}
    >
      {/* Visual / Image Section */}
      <div className={`relative overflow-hidden bg-stone-100 dark:bg-slate-800 ${
        featured ? 'md:col-span-5 h-64 md:h-full' : 'h-48 w-full'
      }`}>
        <img
          src={article.imageUrl || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80"}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Subtle gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Floating Category & Scope Tags */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
            isIndian 
              ? 'bg-amber-600/90 text-white border border-amber-400/40' 
              : 'bg-indigo-600/90 text-white border border-indigo-400/40'
          }`}>
            {isIndian ? <Building2 className="w-2.5 h-2.5" /> : <Globe className="w-2.5 h-2.5" />}
            {article.scope}
          </span>

          <span className="bg-black/60 backdrop-blur-md text-stone-200 text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10">
            {article.category}
          </span>
        </div>

        {/* Read Time */}
        <div className="absolute bottom-3 left-3 text-white/90 text-[11px] font-mono flex items-center gap-1 drop-shadow">
          <Clock className="w-3 h-3 text-amber-400" />
          {article.readTime}
        </div>
      </div>

      {/* Card Content */}
      <div className={`p-5 sm:p-6 flex-1 flex flex-col justify-between ${
        featured ? 'md:col-span-7 md:py-6 md:pr-6 md:pl-0' : ''
      }`}>
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-slate-400 mb-2.5 font-mono">
            <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              {article.source}
            </span>
            <span className="text-[11px] text-stone-400 dark:text-slate-500">{article.publishedAt}</span>
          </div>

          {/* Headline */}
          <h3 className={`font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-[1.3] mb-3 ${
            featured ? 'text-xl sm:text-2xl line-clamp-3' : 'text-lg line-clamp-2'
          }`}>
            {article.title}
          </h3>

          {/* Narrative Summary */}
          <p className="text-stone-600 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed line-clamp-3 mb-4 font-normal">
            {article.summary}
          </p>
        </div>

        {/* Strategic MBA Callout Box */}
        <div className="mt-auto pt-3 border-t border-stone-100 dark:border-slate-800/80">
          <div className="bg-[#FAF7F2] dark:bg-slate-900/90 border border-[#EDE4D5] dark:border-slate-800 p-3 rounded-xl mb-3.5 transition-colors group-hover:border-amber-300/80 dark:group-hover:border-amber-800/50">
            <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
              <Brain className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              MBA Strategic Takeaway
            </div>
            <p className="text-[11.5px] text-stone-700 dark:text-slate-300 leading-snug line-clamp-2">
              {article.mbaTakeaway}
            </p>
          </div>

          {/* Metrics Preview + Action */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {article.tickers?.slice(0, 3).map(ticker => (
                <span key={ticker} className="bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-md border border-stone-200/60 dark:border-slate-700/60">
                  ${ticker}
                </span>
              ))}
            </div>

            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0 font-mono text-[11px]">
              Deep Brief <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
