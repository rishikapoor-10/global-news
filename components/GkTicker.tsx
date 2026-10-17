'use client';

import React from 'react';
import { Sparkles, Globe2, ArrowUpRight } from 'lucide-react';
import { TOP_01_GK_BRIEFS } from '../lib/articles';

export default function GkTicker() {
  return (
    <aside aria-label="Executive Intelligence Ticker" className="bg-[#0c121e] text-slate-200 border-b border-slate-800/80 text-[11px] py-2 px-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        {/* Left Badge */}
        <div className="flex items-center gap-2 font-mono font-bold text-amber-400 shrink-0 uppercase tracking-widest text-[10px] pl-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline">Macro Pulse</span>
          <span className="sm:hidden">Pulse</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 font-normal">Top 0.1% Intel</span>
        </div>
        
        {/* Scrolling Intelligence Marquee */}
        <div className="overflow-hidden whitespace-nowrap flex-1 mask-fade">
          <div className="animate-marquee flex items-center gap-10">
            {TOP_01_GK_BRIEFS.concat(TOP_01_GK_BRIEFS).map((brief, idx) => (
              <div key={idx} className="inline-flex items-center gap-2.5 group cursor-default">
                <span className="bg-amber-500/10 border border-amber-500/25 text-amber-300 font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded tracking-wide">
                  {brief.tag}
                </span>
                <span className="text-slate-200 font-medium tracking-tight group-hover:text-amber-300 transition-colors">
                  {brief.headline}
                </span>
                <span className="text-slate-500 text-[10px] font-mono">
                  [{brief.source}]
                </span>
                <span className="text-slate-700 mx-2 text-xs">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Label */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400 text-[10px] font-mono shrink-0 pr-1">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300 border border-slate-700/60">
            Live Stream
          </span>
        </div>
      </div>
    </aside>
  );
}
