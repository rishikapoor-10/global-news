import { NextResponse } from 'next/server';
import { CURATED_MBA_ARTICLES, TOP_01_GK_BRIEFS } from '../../../lib/articles';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get('scope'); // 'International' | 'Indian' | 'all'
  const category = searchParams.get('category'); // 'Markets' | 'Economy' | etc.

  let articles = [...CURATED_MBA_ARTICLES];

  if (scope && scope !== 'all') {
    articles = articles.filter(a => a.scope.toLowerCase() === scope.toLowerCase());
  }

  if (category && category !== 'All') {
    articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    total: articles.length,
    gkBriefs: TOP_01_GK_BRIEFS,
    articles
  });
}
