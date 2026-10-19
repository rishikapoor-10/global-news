import { XMLParser } from 'fast-xml-parser';
import { Article } from './articles';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

interface FeedConfig {
  source: string;
  scope: 'International' | 'Indian';
  category: Article['category'];
  feedUrl: string;
  defaultTickers: string[];
}

const FEEDS: FeedConfig[] = [
  // INTERNATIONAL (WSJ, NYT, Bloomberg/Reuters)
  {
    source: 'The Wall Street Journal',
    scope: 'International',
    category: 'Banking & Markets',
    feedUrl: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',
    defaultTickers: ['^GSPC', '^DJI', 'DXY'],
  },
  {
    source: 'The New York Times',
    scope: 'International',
    category: 'Macro & Economy',
    feedUrl: 'https://rss.nytimes.com/services/xml/rss/nyt/Economy.xml',
    defaultTickers: ['US10Y', 'FEDFUNDS'],
  },
  {
    source: 'The Wall Street Journal',
    scope: 'International',
    category: 'Tech & AI',
    feedUrl: 'https://feeds.a.dj.com/rss/RSSWSJD.xml',
    defaultTickers: ['NVDA', 'MSFT', 'GOOGL'],
  },
  // INDIAN (Business Standard, CNBC-TV18, Livemint)
  {
    source: 'Business Standard',
    scope: 'Indian',
    category: 'Macro & Economy',
    feedUrl: 'https://news.google.com/rss/search?q=business+standard+economy&hl=en-IN&gl=IN&ceid=IN:en',
    defaultTickers: ['NIFTY50', 'IN10Y'],
  },
  {
    source: 'CNBC-TV18',
    scope: 'Indian',
    category: 'Banking & Markets',
    feedUrl: 'https://news.google.com/rss/search?q=cnbctv18+markets&hl=en-IN&gl=IN&ceid=IN:en',
    defaultTickers: ['BANKNIFTY', 'RELIANCE.NS'],
  },
  {
    source: 'Livemint',
    scope: 'Indian',
    category: 'Corporate Strategy',
    feedUrl: 'https://news.google.com/rss/search?q=livemint+companies&hl=en-IN&gl=IN&ceid=IN:en',
    defaultTickers: ['TCS.NS', 'HDFCBANK.NS'],
  },
];

// Clean titles from Google News suffix e.g. "Headline - Business Standard"
function cleanTitle(raw: string, source: string): string {
  let cleaned = raw.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
  cleaned = cleaned.replace(/ - Business Standard$/i, '');
  cleaned = cleaned.replace(/ - CNBC TV18$/i, '');
  cleaned = cleaned.replace(/ - Livemint$/i, '');
  cleaned = cleaned.replace(/ - The New York Times$/i, '');
  cleaned = cleaned.replace(/ - The Wall Street Journal$/i, '');
  return cleaned;
}

// Generate contextual MBA Takeaways based on headline analysis
function generateMbaTakeaway(title: string, category: Article['category'], scope: 'International' | 'Indian'): string {
  const t = title.toLowerCase();
  
  if (t.includes('inflation') || t.includes('rate') || t.includes('fed') || t.includes('rbi')) {
    return 'Monetary Policy Transmission: Central bank interest trajectories dictate corporate cost of debt and capital expenditure hurdles. Re-assess duration risk and debt maturity ladders.';
  }
  if (t.includes('gdp') || t.includes('growth') || t.includes('tax') || t.includes('deficit')) {
    return 'Macro Capacity & Fiscal Multipliers: Sovereign fiscal stance and tax buoyancy determine systemic liquidity and national infrastructure absorption rates.';
  }
  if (t.includes('ai') || t.includes('chip') || t.includes('tech') || t.includes('semiconductor')) {
    return 'Technology Moats & Solow Productivity: Moving past algorithmic hype to unit-level ROI requires structural change management, data lake sanitization, and workflow automation.';
  }
  if (t.includes('oil') || t.includes('energy') || t.includes('crude') || t.includes('power')) {
    return 'Energy Trilemma & Marginal Cost Curves: Baseload stability against volatile input pricing dictates industrial margins across heavy manufacturing and freight logistics.';
  }
  if (t.includes('trade') || t.includes('tariff') || t.includes('export') || t.includes('import')) {
    return 'Supply Chain Friend-Shoring: Geopolitical fragmentation necessitates dual-track manufacturing nodes to hedge against unilateral bilateral tariff escalations.';
  }
  if (scope === 'Indian') {
    return 'Domestic Structural Deepening: Strong balance sheets, high capacity utilization, and resilient household retail capital flows buffer domestic industry against external shocks.';
  }
  return 'Capital Allocation Discipline: Evaluate organic ROIC against cost of capital (WACC) to defend operating margins amid macro cycle rebalancing.';
}

export async function fetchLiveNews(): Promise<Article[]> {
  const liveArticles: Article[] = [];
  const seenUrls = new Set<string>();

  for (const feed of FEEDS) {
    try {
      const response = await fetch(feed.feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        },
        next: { revalidate: 3600 }, // Cache on Next.js server for 1 hour
      });

      if (!response.ok) continue;

      const xmlText = await response.text();
      const parsed = parser.parse(xmlText);
      const items = parsed?.rss?.channel?.item || [];
      const itemList = Array.isArray(items) ? items : [items];

      // Take top 4 from each feed
      for (const item of itemList.slice(0, 4)) {
        if (!item || !item.title) continue;

        const rawTitle = typeof item.title === 'string' ? item.title : String(item.title['#text'] || '');
        const title = cleanTitle(rawTitle, feed.source);
        const link = item.link || item.guid || '';

        if (!title || seenUrls.has(link)) continue;
        seenUrls.add(link);

        let pubDateStr = 'Today';
        if (item.pubDate) {
          try {
            const date = new Date(item.pubDate);
            if (!isNaN(date.getTime())) {
              pubDateStr = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
            }
          } catch {
            pubDateStr = 'Recent';
          }
        }

        // Clean raw HTML description
        let summary = typeof item.description === 'string' ? item.description : '';
        summary = summary.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
        if (summary.length > 240) {
          summary = summary.slice(0, 240) + '...';
        }
        if (!summary || summary.length < 20) {
          summary = `${title}. Real-time reporting sourced from ${feed.source} covering key market impacts and economic shifts.`;
        }

        const mbaTakeaway = generateMbaTakeaway(title, feed.category, feed.scope);

        // Pick high-resolution curated cover image matching category
        const imagesByCategory: Record<string, string> = {
          'Banking & Markets': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
          'Macro & Economy': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
          'Corporate Strategy': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
          'Tech & AI': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          'Geopolitics & Trade': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
          'Commodities & Energy': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
        };

        liveArticles.push({
          id: `live-${Math.random().toString(36).substr(2, 9)}`,
          title,
          source: feed.source,
          url: typeof link === 'string' ? link : '#',
          summary,
          mbaTakeaway,
          category: feed.category,
          scope: feed.scope,
          publishedAt: pubDateStr,
          readTime: '3 min read',
          tickers: feed.defaultTickers,
          imageUrl: imagesByCategory[feed.category] || imagesByCategory['Banking & Markets'],
          metrics: [
            { label: 'Category', value: feed.category },
            { label: 'Intelligence Tier', value: 'Tier-1 Wire' }
          ]
        });
      }
    } catch (err) {
      console.error(`Error fetching feed ${feed.source}:`, err);
    }
  }

  return liveArticles;
}
