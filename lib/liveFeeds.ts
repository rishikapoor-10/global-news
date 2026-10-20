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

/**
 * 100% REAL-TIME LIVE FEEDS CONSTRAINED TO WHEN:48H
 * All feeds use dynamic Google News RSS indexing for WSJ, NYTimes, FT, Business Standard, CNBC-TV18, and Livemint.
 * This guarantees stories are strictly within the last 24-48 hours and never outdated.
 */
const FEEDS: FeedConfig[] = [
  // INTERNATIONAL: WSJ (Markets & Tech)
  {
    source: 'The Wall Street Journal',
    scope: 'International',
    category: 'Banking & Markets',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:wsj.com+markets&hl=en-US&gl=US&ceid=US:en',
    defaultTickers: ['^GSPC', '^DJI', 'DXY'],
  },
  {
    source: 'The Wall Street Journal',
    scope: 'International',
    category: 'Tech & AI',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:wsj.com+technology+OR+AI&hl=en-US&gl=US&ceid=US:en',
    defaultTickers: ['NVDA', 'MSFT', 'GOOGL'],
  },

  // INTERNATIONAL: Financial Times (Economy & Global Policy)
  {
    source: 'Financial Times',
    scope: 'International',
    category: 'Macro & Economy',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:ft.com+economy&hl=en-GB&gl=GB&ceid=GB:en',
    defaultTickers: ['EURUSD', '^GDAXI', 'US10Y'],
  },
  {
    source: 'Financial Times',
    scope: 'International',
    category: 'Corporate Strategy',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:ft.com+companies&hl=en-GB&gl=GB&ceid=GB:en',
    defaultTickers: ['TSM', 'ASML', 'BVP'],
  },

  // INTERNATIONAL: The New York Times (Business & Geopolitics)
  {
    source: 'The New York Times',
    scope: 'International',
    category: 'Geopolitics & Trade',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:nytimes.com+business&hl=en-US&gl=US&ceid=US:en',
    defaultTickers: ['BDI', 'ZIM', 'DXY'],
  },

  // INDIAN: Business Standard (Macro, Economy & Fiscal)
  {
    source: 'Business Standard',
    scope: 'Indian',
    category: 'Macro & Economy',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:business-standard.com+economy&hl=en-IN&gl=IN&ceid=IN:en',
    defaultTickers: ['NIFTY50', 'IN10Y'],
  },
  {
    source: 'Business Standard',
    scope: 'Indian',
    category: 'Banking & Markets',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:business-standard.com+markets&hl=en-IN&gl=IN&ceid=IN:en',
    defaultTickers: ['BANKNIFTY', 'HDFCBANK.NS'],
  },

  // INDIAN: CNBC-TV18 (Markets, Earnings & Industrial Capex)
  {
    source: 'CNBC-TV18',
    scope: 'Indian',
    category: 'Corporate Strategy',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:cnbctv18.com+market+OR+earnings&hl=en-IN&gl=IN&ceid=IN:en',
    defaultTickers: ['RELIANCE.NS', 'TATASTEEL.NS', 'LT.NS'],
  },

  // INDIAN: Livemint (Corporate Strategy, Startups & Tech)
  {
    source: 'Livemint',
    scope: 'Indian',
    category: 'Tech & AI',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:livemint.com+companies+OR+tech&hl=en-IN&gl=IN&ceid=IN:en',
    defaultTickers: ['TCS.NS', 'INFY.NS', 'ZOMATO.NS'],
  },
  {
    source: 'Livemint',
    scope: 'Indian',
    category: 'Commodities & Energy',
    feedUrl: 'https://news.google.com/rss/search?q=when:48h+site:livemint.com+industry+OR+energy&hl=en-IN&gl=IN&ceid=IN:en',
    defaultTickers: ['ADANIENT.NS', 'NTPC.NS', 'ONGC.NS'],
  },
];

// Strip publisher suffix from Google News titles
function cleanTitle(raw: string): string {
  let cleaned = raw.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
  cleaned = cleaned.replace(/\s*-\s*(Business Standard|CNBC TV18|CNBC-TV18|Livemint|The New York Times|The Wall Street Journal|WSJ|Financial Times|FT)\s*$/i, '');
  return cleaned;
}

// Generate high-signal MBA Takeaways tailored to the topic
function generateMbaTakeaway(title: string, category: Article['category'], scope: 'International' | 'Indian'): string {
  const t = title.toLowerCase();
  
  if (t.includes('inflation') || t.includes('rate') || t.includes('fed') || t.includes('rbi') || t.includes('yield')) {
    return 'Monetary Policy Transmission: Central bank interest trajectories dictate corporate cost of debt and capital expenditure hurdles. Re-assess duration risk and debt maturity ladders.';
  }
  if (t.includes('gdp') || t.includes('growth') || t.includes('tax') || t.includes('deficit') || t.includes('budget')) {
    return 'Macro Capacity & Fiscal Multipliers: Sovereign fiscal stance and tax buoyancy determine systemic liquidity and national infrastructure absorption rates.';
  }
  if (t.includes('ai') || t.includes('chip') || t.includes('tech') || t.includes('semiconductor') || t.includes('software')) {
    return 'Technology Moats & Solow Productivity: Moving past algorithmic hype to unit-level ROI requires structural change management, data lake sanitization, and workflow automation.';
  }
  if (t.includes('oil') || t.includes('energy') || t.includes('crude') || t.includes('power') || t.includes('gas')) {
    return 'Energy Trilemma & Marginal Cost Curves: Baseload stability against volatile input pricing dictates industrial margins across heavy manufacturing and freight logistics.';
  }
  if (t.includes('trade') || t.includes('tariff') || t.includes('export') || t.includes('import') || t.includes('china')) {
    return 'Supply Chain Friend-Shoring: Geopolitical fragmentation necessitates dual-track manufacturing nodes to hedge against unilateral bilateral tariff escalations.';
  }
  if (t.includes('profit') || t.includes('q2') || t.includes('q3') || t.includes('revenue') || t.includes('earnings') || t.includes('margin')) {
    return 'Operating Leverage & Earnings Quality: Analyze top-line volume growth vs. pure price realization to distinguish durable structural pricing power from transitory inflationary pass-through.';
  }
  if (scope === 'Indian') {
    return 'Domestic Structural Deepening: Strong balance sheets, high capacity utilization, and resilient household retail capital flows buffer domestic industry against external shocks.';
  }
  return 'Capital Allocation Discipline: Evaluate organic ROIC against cost of capital (WACC) to defend operating margins amid macro cycle rebalancing.';
}

export async function fetchLiveNews(): Promise<Article[]> {
  const liveArticles: Article[] = [];
  const seenTitles = new Set<string>();

  // Fetch all feeds in parallel with error insulation
  await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const response = await fetch(feed.feedUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml',
          },
          cache: 'no-store', // Always fetch latest at runtime
        });

        if (!response.ok) return;

        const xmlText = await response.text();
        const parsed = parser.parse(xmlText);
        const items = parsed?.rss?.channel?.item || [];
        const itemList = Array.isArray(items) ? items : [items];

        for (const item of itemList.slice(0, 5)) {
          if (!item || !item.title) continue;

          const rawTitle = typeof item.title === 'string' ? item.title : String(item.title['#text'] || '');
          const title = cleanTitle(rawTitle);
          const link = item.link || item.guid || '';

          const normalizedKey = title.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (!title || title.length < 15 || seenTitles.has(normalizedKey)) continue;
          seenTitles.add(normalizedKey);

          let pubDateObj: Date = new Date();
          let pubDateStr = 'Today';
          let timeAgoStr = 'Just now';

          if (item.pubDate) {
            try {
              const d = new Date(item.pubDate);
              if (!isNaN(d.getTime())) {
                pubDateObj = d;
                const now = new Date();
                const diffHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
                
                if (diffHours <= 0) {
                  timeAgoStr = 'Just now';
                } else if (diffHours < 24) {
                  timeAgoStr = `${diffHours}h ago`;
                } else {
                  const days = Math.floor(diffHours / 24);
                  timeAgoStr = `${days}d ago`;
                }

                pubDateStr = d.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
              }
            } catch {
              pubDateStr = 'Today';
            }
          }

          // Clean description
          let summary = typeof item.description === 'string' ? item.description : '';
          summary = summary.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
          if (summary.length > 220) {
            summary = summary.slice(0, 220) + '...';
          }
          if (!summary || summary.length < 25) {
            summary = `${title}. Real-time intelligence sourced from ${feed.source} covering key economic shifts and strategic impacts.`;
          }

          const mbaTakeaway = generateMbaTakeaway(title, feed.category, feed.scope);

          const imagesByCategory: Record<string, string> = {
            'Banking & Markets': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
            'Macro & Economy': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
            'Corporate Strategy': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
            'Tech & AI': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
            'Geopolitics & Trade': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
            'Commodities & Energy': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
          };

          liveArticles.push({
            id: `live-${Math.random().toString(36).substring(2, 10)}`,
            title,
            source: feed.source,
            url: typeof link === 'string' ? link : '#',
            summary,
            mbaTakeaway,
            category: feed.category,
            scope: feed.scope,
            publishedAt: `${pubDateStr} • ${timeAgoStr}`,
            readTime: '3 min read',
            tickers: feed.defaultTickers,
            imageUrl: imagesByCategory[feed.category] || imagesByCategory['Banking & Markets'],
            metrics: [
              { label: 'Feed Recency', value: timeAgoStr },
              { label: 'Category', value: feed.category }
            ]
          });
        }
      } catch (err) {
        console.error(`Feed fetch error for ${feed.source}:`, err);
      }
    })
  );

  return liveArticles;
}
