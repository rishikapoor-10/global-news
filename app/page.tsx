'use client';

import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import GkTicker from '../components/GkTicker';
import ArticleCard from '../components/ArticleCard';
import ReaderModal from '../components/ReaderModal';
import DailyBrief from '../components/DailyBrief';
import { CURATED_MBA_ARTICLES, Article } from '../lib/articles';
import { Globe, Building2, Layers, Search, Filter, Sparkles, TrendingUp, Compass, Award, BarChart3, Newspaper, SlidersHorizontal } from 'lucide-react';

export default function HomePage() {
  const [theme, setTheme] = useState<'paper' | 'dark' | 'light'>('paper');
  const [scopeFilter, setScopeFilter] = useState<'All' | 'International' | 'Indian'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDailyBriefOpen, setIsDailyBriefOpen] = useState(false);

  // Categories list
  const categories = [
    'All', 
    'Macro & Economy', 
    'Banking & Markets', 
    'Corporate Strategy', 
    'Tech & AI', 
    'Geopolitics & Trade', 
    'Commodities & Energy'
  ];

  // Filtered logic
  const filteredArticles = useMemo(() => {
    return CURATED_MBA_ARTICLES.filter(article => {
      // Scope filter
      if (scopeFilter !== 'All' && article.scope !== scopeFilter) {
        return false;
      }
      // Category filter
      if (categoryFilter !== 'All' && article.category !== categoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesSummary = article.summary.toLowerCase().includes(query);
        const matchesSource = article.source.toLowerCase().includes(query);
        const matchesTickers = article.tickers?.some(t => t.toLowerCase().includes(query));
        return matchesTitle || matchesSummary || matchesSource || matchesTickers;
      }
      return true;
    });
  }, [scopeFilter, categoryFilter, searchQuery]);

  const intlCount = CURATED_MBA_ARTICLES.filter(a => a.scope === 'International').length;
  const indianCount = CURATED_MBA_ARTICLES.filter(a => a.scope === 'Indian').length;

  return (
    <div className={theme === 'dark' ? 'dark' : theme === 'paper' ? 'theme-paper' : ''}>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] transition-colors">
        
        {/* Top 0.1% Macro Intelligence Ticker */}
        <GkTicker />

        {/* Global Navigation Header */}
        <Header 
          currentTheme={theme} 
          setTheme={setTheme} 
          onOpenBrief={() => setIsDailyBriefOpen(true)} 
        />

        {/* Hero Section */}
        <section className="border-b border-stone-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm py-9 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              
              {/* Left Editorial Branding */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-500/25 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Executive Intelligence • Top 0.1% Synthesis
                </div>
                
                <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.15]">
                  Strategic News for <span className="italic font-serif underline decoration-amber-500/60 decoration-wavy underline-offset-8">Leaders</span> & Economists.
                </h1>

                <p className="mt-3.5 text-stone-600 dark:text-slate-400 text-sm sm:text-[15px] leading-relaxed">
                  Direct synthesis from <strong>Wall Street Journal, Financial Times, NYTimes, Business Standard</strong> and <strong>CNBC-TV18</strong>. Stripped of noise; focused on capital allocation, policy shifts, and unit economics.
                </p>
              </div>

              {/* Scope Switcher Component (International vs. Indian) */}
              <div className="bg-stone-200/60 dark:bg-slate-800/80 p-1.5 rounded-2xl flex items-center gap-1 border border-stone-300/60 dark:border-slate-700/80 shadow-inner self-start lg:self-auto">
                <button
                  onClick={() => setScopeFilter('All')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    scopeFilter === 'All'
                      ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-sm ring-1 ring-black/5'
                      : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Consolidated ({CURATED_MBA_ARTICLES.length})</span>
                </button>

                <button
                  onClick={() => setScopeFilter('International')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    scopeFilter === 'International'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-stone-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>International ({intlCount})</span>
                </button>

                <button
                  onClick={() => setScopeFilter('Indian')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    scopeFilter === 'Indian'
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                      : 'text-stone-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Indian ({indianCount})</span>
                </button>
              </div>

            </div>

            {/* Filter Pills & Interactive Search Bar */}
            <div className="mt-8 pt-6 border-t border-stone-200/60 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono text-stone-400 dark:text-slate-500 mr-2 flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3" /> Sector:
                </span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      categoryFilter === cat
                        ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold shadow-sm'
                        : 'bg-white/80 dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700/80 text-stone-600 dark:text-slate-300 hover:border-stone-400 dark:hover:border-slate-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar with Keyboard Indicator */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Filter stories, metrics, tickers ($NVDA)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-stone-300/80 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-stone-900 dark:text-white placeholder:text-stone-400 shadow-sm"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Feed Header */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-white">
                {scopeFilter === 'All' ? 'Consolidated Global & Domestic Wire' : `${scopeFilter} Intelligence Stream`}
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-200/60 dark:bg-slate-800 text-stone-600 dark:text-slate-400">
                {filteredArticles.length} Stories
              </span>
            </div>

            <div className="text-xs font-mono text-stone-500 dark:text-slate-400 hidden sm:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Verified Tier-1 Only
            </div>
          </div>

          {/* Grid View */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-slate-900/60 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
              <Newspaper className="w-10 h-10 text-stone-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-stone-700 dark:text-slate-300 font-serif text-lg font-bold">No stories match your filter</p>
              <p className="text-stone-400 text-xs mt-1">Try switching categories or clearing search keywords.</p>
              <button
                onClick={() => { setScopeFilter('All'); setCategoryFilter('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 text-xs bg-stone-900 dark:bg-amber-500 text-white dark:text-slate-950 rounded-xl font-bold hover:shadow"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={(art) => setSelectedArticle(art)}
                  featured={index === 0 && scopeFilter === 'All'}
                />
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-200/80 dark:border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8 bg-white/40 dark:bg-slate-900/40 text-xs font-mono text-stone-500 dark:text-slate-400">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-stone-900 dark:text-white text-base">MERIDIAN ECONOMICS</span>
              <span>— Curated for Top 0.1% Business GK & Executive Synthesis</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Sources: WSJ • FT • NYT • Business Standard • CNBC-TV18 • Mint</span>
            </div>
          </div>
        </footer>

        {/* Reader Modal */}
        <ReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />

        {/* Daily Brief Fullscreen View */}
        <DailyBrief
          articles={filteredArticles}
          isOpen={isDailyBriefOpen}
          onClose={() => setIsDailyBriefOpen(false)}
        />

      </div>
    </div>
  );
}
