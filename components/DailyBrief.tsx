'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '../lib/articles';
import { X, ChevronLeft, ChevronRight, Globe, Building2, Sparkles, ExternalLink, Key, ArrowRight } from 'lucide-react';

interface DailyBriefProps {
  articles: Article[];
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyBrief({ articles, isOpen, onClose }: DailyBriefProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        if (currentIndex < articles.length - 1) setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, articles.length, onClose]);

  if (!isOpen || articles.length === 0) return null;

  const current = articles[currentIndex];

  const handleNext = () => {
    if (currentIndex < articles.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060913]/95 backdrop-blur-xl text-white flex flex-col justify-between p-4 sm:p-8 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px] px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Executive Deck • Slide {currentIndex + 1} of {articles.length}
          </span>
          <span className="text-slate-500 text-xs font-mono hidden md:inline">
            Press ← / → keys to navigate
          </span>
        </div>

        {/* Progress Bar indicator */}
        <div className="hidden sm:flex items-center gap-1.5 max-w-xs w-36 bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / articles.length) * 100}%` }}
          />
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Body */}
      <div className="max-w-4xl mx-auto w-full my-auto py-4 sm:py-6">
        <div className="flex items-center gap-2.5 mb-4">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
            current.scope === 'Indian' ? 'bg-amber-600' : 'bg-indigo-600'
          }`}>
            {current.scope === 'Indian' ? <Building2 className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
            {current.scope}
          </span>
          <span className="text-amber-400 font-mono text-xs font-semibold">{current.source}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-xs">{current.category}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-extrabold leading-[1.25] mb-6 text-slate-100">
          {current.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
          <div className="md:col-span-7 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 shadow-xl">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
              The Strategic Pulse
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              {current.summary}
            </p>
          </div>

          <div className="md:col-span-5 bg-gradient-to-br from-amber-950/40 to-slate-900/90 border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold mb-2 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                Top 0.1% Decision Takeaway
              </div>
              <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                {current.mbaTakeaway}
              </p>
            </div>

            {current.metrics && current.metrics.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">{current.metrics[0].label}</span>
                  <span className="text-sm font-bold font-mono text-amber-300">{current.metrics[0].value}</span>
                </div>
                {current.metrics[1] && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono block">{current.metrics[1].label}</span>
                    <span className="text-sm font-bold font-mono text-slate-200">{current.metrics[1].value}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav Controller */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 max-w-5xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
            currentIndex === 0 
              ? 'border-slate-800/60 text-slate-600 cursor-not-allowed' 
              : 'border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Brief</span>
        </button>

        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono tracking-tight"
        >
          <span>Source: {current.source}</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <button
          onClick={handleNext}
          disabled={currentIndex === articles.length - 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
            currentIndex === articles.length - 1 
              ? 'border-slate-800/60 text-slate-600 cursor-not-allowed' 
              : 'border-amber-400/80 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
          }`}
        >
          <span>Next Brief</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
