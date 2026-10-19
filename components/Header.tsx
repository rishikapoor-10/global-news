'use client';

import React from 'react';
import { BookOpen, Moon, Sun, Scroll, Calendar, Clock } from 'lucide-react';

interface HeaderProps {
  currentTheme: 'paper' | 'dark' | 'light';
  setTheme: (t: 'paper' | 'dark' | 'light') => void;
  onOpenBrief: () => void;
  currentDate?: string;
}

export default function Header({ currentTheme, setTheme, onOpenBrief, currentDate }: HeaderProps) {
  // Fallback to formatted local date if not supplied
  const displayDate = currentDate || new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="border-b border-stone-200/90 dark:border-slate-800/80 bg-white/90 dark:bg-[#0c121e]/90 backdrop-blur-md sticky top-[33px] z-40 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Masthead / Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-stone-900 to-stone-800 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center text-amber-400 dark:text-stone-950 shadow-md ring-1 ring-black/5">
              <span className="font-serif font-black text-xl sm:text-2xl leading-none italic">M</span>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-serif font-black text-2xl sm:text-[26px] tracking-tight text-stone-900 dark:text-white">
                  MERIDIAN <span className="font-sans font-light text-amber-700 dark:text-amber-400 text-lg sm:text-xl">ECONOMICS</span>
                </span>
                <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 px-2 py-0.5 rounded-md">
                  MBA Terminal
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-slate-400 hidden sm:block tracking-tight font-medium">
                Tier-1 Macro, Economic & Strategic Synthesis • International & Indian Corridors
              </p>
            </div>
          </div>

          {/* Right Top Date & Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Real-time Dynamic Date Pill on Top Right */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-slate-200 font-mono text-xs shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold">{displayDate}</span>
            </div>

            {/* Daily Brief Deck Button */}
            <button
              onClick={onOpenBrief}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-stone-900 hover:bg-black dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 rounded-xl shadow-sm hover:shadow transition-all active:scale-95 group"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-400 dark:text-slate-950 group-hover:rotate-6 transition-transform" />
              <span className="font-medium tracking-tight">Executive Deck</span>
            </button>

            {/* Aesthetic Theme Switcher */}
            <div className="flex items-center p-1 bg-stone-100 dark:bg-slate-900 rounded-xl border border-stone-200/80 dark:border-slate-800 text-xs">
              <button
                onClick={() => setTheme('paper')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  currentTheme === 'paper' 
                    ? 'bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-300 shadow-sm font-semibold' 
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-slate-300'
                }`}
                title="Paper Editorial Aesthetic"
              >
                <Scroll className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Paper</span>
              </button>

              <button
                onClick={() => setTheme('light')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  currentTheme === 'light' 
                    ? 'bg-white text-stone-900 shadow-sm font-semibold' 
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-slate-300'
                }`}
                title="Clean Light"
              >
                <Sun className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Light</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  currentTheme === 'dark' 
                    ? 'bg-slate-800 text-amber-400 shadow-sm font-semibold' 
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-slate-300'
                }`}
                title="Bloomberg Dark"
              >
                <Moon className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Dark</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
