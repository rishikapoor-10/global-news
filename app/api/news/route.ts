import { NextResponse } from 'next/server';
import { CURATED_MBA_ARTICLES, TOP_01_GK_BRIEFS } from '../../../lib/articles';
import { fetchLiveNews } from '../../../lib/liveFeeds';

// Revalidate every hour
export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get('scope'); // 'International' | 'Indian' | 'all'
  const category = searchParams.get('category'); // 'Markets' | 'Economy' | etc.

  let liveNews = [];
  try {
    liveNews = await fetchLiveNews();
  } catch (e) {
    console.error("Live fetch fallback:", e);
  }

  // Merge live stories with foundational curated library
  const combined = [...liveNews, ...CURATED_MBA_ARTICLES];
  
  // Deduplicate by title
  const seen = new Set<string>();
  let articles = combined.filter(item => {
    const key = item.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (scope && scope !== 'all') {
    articles = articles.filter(a => a.scope.toLowerCase() === scope.toLowerCase());
  }

  if (category && category !== 'All') {
    articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    currentDate: currentDateFormatted,
    total: articles.length,
    gkBriefs: TOP_01_GK_BRIEFS,
    articles
  });
}
