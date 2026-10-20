import { NextResponse } from 'next/server';
import { TOP_01_GK_BRIEFS } from '../../../lib/articles';
import { fetchLiveNews } from '../../../lib/liveFeeds';

// Cache dynamically for 30 minutes, or revalidate on cron triggers
export const revalidate = 1800;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get('scope'); // 'International' | 'Indian' | 'all'
  const category = searchParams.get('category'); // 'Markets' | 'Economy' | etc.

  let articles = [];
  try {
    articles = await fetchLiveNews();
  } catch (e) {
    console.error("Live fetch fallback:", e);
  }

  // Filter by scope if requested
  if (scope && scope !== 'all') {
    articles = articles.filter(a => a.scope.toLowerCase() === scope.toLowerCase());
  }

  // Filter by category if requested
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
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    }
  });
}
