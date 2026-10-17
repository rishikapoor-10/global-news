'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '../lib/articles';
import { X, ExternalLink, Volume2, VolumeX, Building2, Globe, Sparkles, TrendingUp, BarChart3, ShieldCheck } from 'lucide-react';

interface ReaderModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ReaderModal({ article, onClose }: ReaderModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Reset TTS on article change
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [article]);

  if (!article) return null;

  const toggleTTS = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const textToSpeak = `${article.title}. Reported by ${article.source}. Executive Summary: ${article.summary}. Strategic Takeaway: ${article.mbaTakeaway}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white dark:bg-[#0c121e] border border-stone-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 dark:border-slate-800/80 bg-stone-50/70 dark:bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              article.scope === 'Indian' 
                ? 'bg-amber-600 text-white' 
                : 'bg-indigo-600 text-white'
            }`}>
              {article.scope}
            </span>
            <span className="text-xs text-stone-500 dark:text-slate-400 font-mono">
              {article.source} • {article.publishedAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTTS}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPlaying 
                  ? 'bg-amber-500 text-white shadow-md animate-pulse' 
                  : 'bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700'
              }`}
              title="Voice Briefing"
            >
              {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Voice' : 'Listen'}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-slate-200 hover:bg-stone-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {article.imageUrl && (
            <div className="rounded-2xl overflow-hidden h-60 sm:h-72 w-full shadow-inner relative">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white text-xs font-mono drop-shadow">
                Verified Tier-1 Wire • {article.category}
              </div>
            </div>
          )}

          <div>
            <div className="text-amber-700 dark:text-amber-400 font-mono text-[11px] uppercase tracking-widest font-bold mb-2">
              {article.category} Analysis
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-[1.25]">
              {article.title}
            </h1>
          </div>

          {/* Quantitative Unit Metrics Dashboard */}
          {article.metrics && article.metrics.length > 0 && (
            <div className="p-4 bg-[#FAF7F2] dark:bg-slate-900/80 rounded-2xl border border-[#EBE3D3] dark:border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-slate-400 font-bold mb-3 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Key Financial & Economic Indicators
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {article.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-stone-200/60 dark:border-slate-700/60">
                    <div className="text-[10px] font-mono text-stone-500 dark:text-slate-400 uppercase tracking-tight">{m.label}</div>
                    <div className="text-sm sm:text-base font-bold text-stone-900 dark:text-amber-300 font-mono mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Executive Summary */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-400 dark:text-slate-500 mb-2 font-bold">
              Executive Briefing Narrative
            </h4>
            <p className="text-stone-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
              {article.summary}
            </p>
          </div>

          {/* Strategic MBA Framework */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-600 dark:border-amber-400 p-4 sm:p-5 rounded-r-2xl">
            <h4 className="text-amber-900 dark:text-amber-300 font-mono text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              MBA Leadership Application (Strategy & Capital Allocation)
            </h4>
            <p className="text-stone-800 dark:text-slate-200 text-xs sm:text-[13.5px] leading-relaxed">
              {article.mbaTakeaway}
            </p>
          </div>

          {/* Relevant Tickers */}
          {article.tickers && article.tickers.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-mono text-stone-500 dark:text-slate-400 block mb-2">
                Impacted Instruments & Asset Classes:
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tickers.map(ticker => (
                  <span key={ticker} className="bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 font-mono text-xs px-2.5 py-1 rounded-lg text-stone-800 dark:text-slate-200 font-medium">
                    ${ticker}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reader Footer Link */}
        <div className="p-4 sm:px-6 border-t border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-stone-500 dark:text-slate-400 font-mono">
            Direct Publication Verification
          </span>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-black dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <span>Read full story at {article.source}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
