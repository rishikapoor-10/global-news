export interface Article {
  id: string;
  title: string;
  source: string;
  url: string;
  summary: string;
  mbaTakeaway: string;
  category: 'Macro & Economy' | 'Banking & Markets' | 'Corporate Strategy' | 'Tech & AI' | 'Geopolitics & Trade' | 'Commodities & Energy';
  scope: 'International' | 'Indian';
  imageUrl?: string;
  publishedAt: string;
  readTime: string;
  tickers?: string[];
  metrics?: { label: string; value: string }[];
}

export const CURATED_MBA_ARTICLES: Article[] = [
  // ==========================================
  // SECTION 1: INTERNATIONAL TIER-1 (WSJ, NYT, FT, BLOOMBERG, REUTERS)
  // ==========================================
  {
    id: "intl-1",
    title: "Federal Reserve Holds Benchmark Rates Steady as Inflation Moderates Toward 2.4% Target",
    source: "The Wall Street Journal",
    url: "https://www.wsj.com/economy/central-banking",
    category: "Macro & Economy",
    scope: "International",
    publishedAt: "25 mins ago",
    readTime: "3 min read",
    tickers: ["^GSPC", "^DJI", "DXY"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    summary: "The FOMC maintained its policy rate band while signaling balanced risks between labor softening and residual shelter inflation. Treasury yields slipped 6 bps following the Chair's press conference.",
    mbaTakeaway: "Cost of Capital Trajectory: Expect corporate debt refinancing windows to open in Q4. Corporate treasury teams should review duration exposure and floating-to-fixed interest rate swaps.",
    metrics: [
      { label: "Fed Funds Rate", value: "5.00% - 5.25%" },
      { label: "US 10Y Yield", value: "4.12% (-6bps)" }
    ]
  },
  {
    id: "intl-2",
    title: "Semiconductor Giants Diversify Supply Chains: Arizona & Dresden Mega-Fabs Near 3nm Production",
    source: "Financial Times",
    url: "https://www.ft.com/technology",
    category: "Corporate Strategy",
    scope: "International",
    publishedAt: "1 hour ago",
    readTime: "4 min read",
    tickers: ["TSM", "NVDA", "ASML", "INTC"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    summary: "Subsidized through US and EU CHIPS legislations, leading foundries are expanding geographically to insulate against geopolitical choke points in the Malacca and Taiwan Straits, though capex depreciation schedules will compress near-term gross margins.",
    mbaTakeaway: "Strategic Resilience vs. Unit Economics: Building geographic redundancy sacrifices pure Lean JIT supply efficiency in exchange for operational continuity. Expect 15-20% higher silicon unit costs across hardware OEMs.",
    metrics: [
      { label: "Subsidized Capex", value: "$85B+" },
      { label: "Wafer Premium", value: "+18%" }
    ]
  },
  {
    id: "intl-3",
    title: "Global M&A Surges in Energy Transition: Oil Majors Target Renewable Infrastructure & Grid Assets",
    source: "The New York Times",
    url: "https://www.nytimes.com/section/business",
    category: "Commodities & Energy",
    scope: "International",
    publishedAt: "2 hours ago",
    readTime: "4 min read",
    tickers: ["XOM", "SHEL", "BP"],
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    summary: "With cash reserves accumulated during cyclical hydrocarbon peaks, energy majors have initiated aggressive buyouts of offshore wind, smart battery storage, and transmission grid corridors across Europe and North America.",
    mbaTakeaway: "Capital Allocation Discipline: Cash cow businesses (fossil exploration) funding high-growth, low-beta regulated utilities is the quintessential BCG Matrix redeployment in action.",
    metrics: [
      { label: "Deal Volume", value: "$42.4B QTD" },
      { label: "Avg EBITDA Multiple", value: "11.8x" }
    ]
  },
  {
    id: "intl-4",
    title: "Enterprise AI Adoption Curves: McKinsey Report Unveils ROI Bottlenecks in Mid-Cap Firms",
    source: "Bloomberg",
    url: "https://www.bloomberg.com/technology",
    category: "Tech & AI",
    scope: "International",
    publishedAt: "3 hours ago",
    readTime: "5 min read",
    tickers: ["MSFT", "GOOGL", "NOW"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    summary: "While 78% of Global 2000 enterprises have launched generative AI pilots, fewer than 19% have realized quantifiable EBITDA margin expansions, primarily due to unstructured data lakes and lack of change management.",
    mbaTakeaway: "The Solow Computer Paradox 2.0: Technology deployment alone does not equal productivity. Value capture requires workflow re-engineering, internal process changes, and unit-economic attribution.",
    metrics: [
      { label: "Pilot Conversion", value: "19%" },
      { label: "Avg Spend Per Org", value: "$4.2M" }
    ]
  },
  {
    id: "intl-5",
    title: "WTO Flags Fragmented Tariff Coalitions as Global Trade Volumes Diverge into Regional Corridors",
    source: "The Wall Street Journal",
    url: "https://www.wsj.com/world",
    category: "Geopolitics & Trade",
    scope: "International",
    publishedAt: "4 hours ago",
    readTime: "3 min read",
    tickers: ["BDI", "ZIM"],
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    summary: "Bilateral trade agreements are outpacing multilateral WTO pacts. Trade between 'friend-shored' partner nations increased 7.2% year-over-year, while direct trans-pacific shipments contracted slightly.",
    mbaTakeaway: "Supply Chain Geography: Multinationals must design dual-track supply chains (China+1, India-Middle East-Europe corridor) to navigate fluctuating tariff exposure.",
    metrics: [
      { label: "Friend-Shoring Index", value: "+7.2% YoY" },
      { label: "Tariff Variance", value: "4.8% spread" }
    ]
  },
  {
    id: "intl-6",
    title: "European Central Bank Signals Growth Headwinds as German Industrial Output Contracts",
    source: "Financial Times",
    url: "https://www.ft.com/global-economy",
    category: "Macro & Economy",
    scope: "International",
    publishedAt: "5 hours ago",
    readTime: "4 min read",
    tickers: ["EURUSD", "^GDAXI"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    summary: "The ECB faces diverging growth trajectories across the Eurozone. German automotive and chemical sectors suffer from high energy inputs and Chinese EV competition, prompting debates on faster rate cuts.",
    mbaTakeaway: "Competitiveness Erosion: High energy tariffs and legacy manufacturing frameworks highlight the danger of delayed energy diversification and slow consumer software innovation.",
    metrics: [
      { label: "German Factory Orders", value: "-1.8% MoM" },
      { label: "ECB Deposit Facility", value: "3.25%" }
    ]
  },
  {
    id: "intl-7",
    title: "Private Credit Boom Hits $1.7 Trillion: Institutional Investors Pivot from Public Junk Bonds",
    source: "The Wall Street Journal",
    url: "https://www.wsj.com/finance/investing",
    category: "Banking & Markets",
    scope: "International",
    publishedAt: "6 hours ago",
    readTime: "4 min read",
    tickers: ["BX", "APO", "KKR", "ARES"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    summary: "Alternative asset managers (Blackstone, Apollo, Ares) are disintermediating traditional Wall Street investment bank syndicated loan desks, providing direct bilateral loans to PE portfolio companies with flexible terms.",
    mbaTakeaway: "Shadow Banking Microstructure: Direct lending provides speed of execution and privacy, but illiquidity and opaque default mark-to-market valuations represent systemic leverage risk in stress scenarios.",
    metrics: [
      { label: "Global AUM", value: "$1.7 Trillion" },
      { label: "Direct Loan Spread", value: "SOFR + 575bps" }
    ]
  },
  {
    id: "intl-8",
    title: "Hyperscalers Capex Exceeds $200B: Data Center Power Grid Capacity Becomes Primary Bottleneck",
    source: "The New York Times",
    url: "https://www.nytimes.com/section/technology",
    category: "Tech & AI",
    scope: "International",
    publishedAt: "7 hours ago",
    readTime: "4 min read",
    tickers: ["MSFT", "AMZN", "GOOGL", "CEG"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    summary: "Microsoft, Amazon, and Google have secured dedicated nuclear and geothermal power purchase agreements (PPAs) as utility grid interconnect queues stretch up to 7 years in Northern Virginia and Ireland.",
    mbaTakeaway: "Critical Infrastructure Moats: In the AI era, computational leadership is constrained not by algorithms, but by physical baseload gigawatts. Energy utilities are the newpicks-and-shovels play.",
    metrics: [
      { label: "Big-4 Tech Capex", value: "$210B (Annualized)" },
      { label: "Grid Queue Wait", value: "4-7 Years" }
    ]
  },
  {
    id: "intl-9",
    title: "OPEC+ Enforces Production Discipline Amid Rising Non-OPEC Crude Supply from Americas",
    source: "Reuters",
    url: "https://www.reuters.com/business/energy",
    category: "Commodities & Energy",
    scope: "International",
    publishedAt: "8 hours ago",
    readTime: "3 min read",
    tickers: ["BNO", "USO", "XOM"],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    summary: "Record shale production from the US Permian Basin, Guyana, and Brazil limits OPEC+'s pricing power, keeping Brent crude anchored in the $72-$82 range despite Middle Eastern geopolitical frictions.",
    mbaTakeaway: "Marginal Cost Price Setting: Competitive fringe expansion from non-cartel producers caps geopolitical risk premiums, dampening inflationary shocks for import-dependent emerging economies.",
    metrics: [
      { label: "Brent Crude", value: "$74.80/bbl" },
      { label: "US Production", value: "13.4M bpd (Record)" }
    ]
  },
  {
    id: "intl-10",
    title: "Sovereign Wealth Funds Shift Allocations: Gulf Capital Deploys Billions into Asian Tech Hubs",
    source: "Financial Times",
    url: "https://www.ft.com/wealth",
    category: "Banking & Markets",
    scope: "International",
    publishedAt: "9 hours ago",
    readTime: "3 min read",
    tickers: ["ADIA", "PIF", "QIA"],
    imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80",
    summary: "Abu Dhabi's Mubadala, Saudi PIF, and Qatar Investment Authority have rebalanced their geographic mandates, increasing venture, data center, and private equity allocations into India, Japan, and Southeast Asia.",
    mbaTakeaway: "Geoeconomic Hedging: Petrodollar redeployment into high-growth Asian consumption corridors reduces bilateral dependency on Western capital markets.",
    metrics: [
      { label: "Gulf Allocation to Asia", value: "22% (up from 9%)" },
      { label: "Combined SWF Assets", value: "$4.1 Trillion" }
    ]
  },
  {
    id: "intl-11",
    title: "Commercial Real Estate Distress: Bank Provisions Rise as Office Refinancing Walls Mature",
    source: "The Wall Street Journal",
    url: "https://www.wsj.com/real-estate/commercial",
    category: "Banking & Markets",
    scope: "International",
    publishedAt: "10 hours ago",
    readTime: "4 min read",
    tickers: ["KRE", "CBRE", "JLL"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    summary: "Over $900B in US commercial mortgages mature this year. Regional banks are negotiating debt modifications and 'extend-and-pretend' pacts to avert steep write-downs on Class-B office real estate.",
    mbaTakeaway: "Asset Liability Mismatch: Hybrid work permanently altered occupancy cash flows. Banks face tier-1 capital compression unless buildings are converted or recapitalized at 40-50% discounts.",
    metrics: [
      { label: "US Office Vacancy", value: "19.8% (Historic Peak)" },
      { label: "Debt Maturing 2026", value: "$920 Billion" }
    ]
  },
  {
    id: "intl-12",
    title: "Global Dollar Hegemony: BRICS Common Settlement Mechanisms Face Currency Liquidity Hurdles",
    source: "Bloomberg",
    url: "https://www.bloomberg.com/markets",
    category: "Geopolitics & Trade",
    scope: "International",
    publishedAt: "11 hours ago",
    readTime: "4 min read",
    tickers: ["DXY", "CNY", "INR"],
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
    summary: "Despite aggressive pushes for local currency bilateral settlements (Ruble-Rupee, Yuan-Rial), lack of deep capital markets and currency convertibility ensures the US Dollar remains in 88% of global FX transactions.",
    mbaTakeaway: "Network Effects of FX: The USD reserve currency status is defended by the immense liquidity of US Treasuries, transparent rule of law, and deep derivative swap markets that alternatives cannot yet mirror.",
    metrics: [
      { label: "USD Share of Global FX", value: "88.5%" },
      { label: "SWIFT Settlement Share", value: "47.8%" }
    ]
  },
  {
    id: "intl-13",
    title: "Defense Spend Reaches 2.4% NATO Average: Aerospace Contractors Face Multi-Year Backlogs",
    source: "The New York Times",
    url: "https://www.nytimes.com/section/world",
    category: "Corporate Strategy",
    scope: "International",
    publishedAt: "12 hours ago",
    readTime: "3 min read",
    tickers: ["LMT", "RTX", "BA.L", "RHM.DE"],
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    summary: "European and Indo-Pacific defense spending commitments have triggered massive procurement cycles for munitions, autonomous drone fleets, and air defense interceptors, expanding order books through 2032.",
    mbaTakeaway: "Counter-Cyclical Moats: Defense primes enjoy cost-plus government contracts and long-term revenue visibility, making them classic defensive portfolio diversifiers during macro volatility.",
    metrics: [
      { label: "Avg Defense Backlog", value: "7.4x Annual Rev" },
      { label: "NATO Defense Spending", value: "$1.47 Trillion" }
    ]
  },
  {
    id: "intl-14",
    title: "Automotive Price Wars: BYD & Western Automakers Clash Over EV Platform Margins in SE Asia",
    source: "Financial Times",
    url: "https://www.ft.com/automobiles",
    category: "Corporate Strategy",
    scope: "International",
    publishedAt: "13 hours ago",
    readTime: "4 min read",
    tickers: ["TSLA", "1211.HK", "STLA"],
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    summary: "Vertical integration of LFP battery cells allows Chinese EV makers to undercut legacy automakers by $8,000 to $12,000 per vehicle in neutral markets like Thailand, Indonesia, and Australia.",
    mbaTakeaway: "Vertical Integration Cost Curves: Controlling battery manufacturing from lithium refining to battery pack packaging enables a cost structure that pure car assemblers cannot match without protective tariffs.",
    metrics: [
      { label: "Battery Pack Cost", value: "$75/kWh (BYD)" },
      { label: "SE Asia EV Market Share", value: "73% Chinese Brands" }
    ]
  },
  {
    id: "intl-15",
    title: "Venture Capital Consolidation: Late-Stage Down-Rounds Shake SaaS Valuations Back to Historical 6x ARR",
    source: "The Wall Street Journal",
    url: "https://www.wsj.com/tech",
    category: "Tech & AI",
    scope: "International",
    publishedAt: "14 hours ago",
    readTime: "3 min read",
    tickers: ["^IXIC", "BVP"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    summary: "The 2021-era 30x-50x ARR valuations have completely unwound. Investors now demand Rule of 40 (growth + free cash flow margin) discipline, forcing unprofitable unicorns into structured structured recapitalizations.",
    mbaTakeaway: "Valuation Multiple Mean Reversion: In high interest rate regimes, terminal value discounting punishes distant cash flows. Sustainable unit economics trump growth-at-all-costs.",
    metrics: [
      { label: "Median SaaS Multiple", value: "6.2x ARR (down from 28x)" },
      { label: "Late Stage Down-Rounds", value: "31% of Deals" }
    ]
  },

  // ==========================================
  // SECTION 2: INDIAN TIER-1 (BUSINESS STANDARD, CNBC-TV18, MINT, ECONOMIC TIMES)
  // ==========================================
  {
    id: "in-1",
    title: "RBI Monetary Policy Committee Maintains Repo at 6.5%: Emphasizes Food Inflation Vigilance",
    source: "Business Standard",
    url: "https://www.business-standard.com/economy",
    category: "Macro & Economy",
    scope: "Indian",
    publishedAt: "40 mins ago",
    readTime: "3 min read",
    tickers: ["NIFTY50", "BANKNIFTY", "IN10Y"],
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    summary: "The Reserve Bank of India retained the benchmark repo rate at 6.50% with a stance of 'withdrawal of accommodation'. Governor emphasized sustained domestic GDP resilience at 7.2% despite volatile climate impacts on perishables.",
    mbaTakeaway: "Monetary-Fiscal Playbook: India's macroeconomic fundamentals remain the strongest among major economies. High real rates prevent asset overheating while enabling long-term capex.",
    metrics: [
      { label: "Repo Rate", value: "6.50%" },
      { label: "FY26 Projected GDP", value: "7.2%" }
    ]
  },
  {
    id: "in-2",
    title: "India Inc Capex Cycle Gains Momentum: Private Capital Expenditure Expands in Metals, Renewables & Logistics",
    source: "CNBC-TV18",
    url: "https://www.cnbctv18.com/market",
    category: "Corporate Strategy",
    scope: "Indian",
    publishedAt: "1 hour ago",
    readTime: "4 min read",
    tickers: ["RELIANCE.NS", "TATASTEEL.NS", "ADANIPORTS.NS", "LT.NS"],
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    summary: "Corporate balance sheets across Nifty 100 show historic low debt-to-equity ratios (0.58x avg), sparking an inflection from government infrastructure spending to private sector factory setups under PLI schemes.",
    mbaTakeaway: "Deleveraging to Re-leveraging Cycle: Indian corporate earnings growth is now powered by operating leverage and capacity utilization climbing above 75%, making industrial cyclical equities attractive.",
    metrics: [
      { label: "Corp D/E Ratio", value: "0.58x (10-yr low)" },
      { label: "Capacity Utilization", value: "76.4%" }
    ]
  },
  {
    id: "in-3",
    title: "Quick Commerce Wars: Zepto, Blinkit & Instamart Reshape FMCG Distribution Networks",
    source: "Mint",
    url: "https://www.livemint.com/companies",
    category: "Corporate Strategy",
    scope: "Indian",
    publishedAt: "2 hours ago",
    readTime: "4 min read",
    tickers: ["ZOMATO.NS", "SWIGGY.NS"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    summary: "10-minute delivery is now eating into traditional General Trade (Kirana) and Modern Trade market share in top 10 Indian metros. FMCG giants like HUL, Marico, and ITC report 12-18% of urban sales originating from dark stores.",
    mbaTakeaway: "Disruption of Porter's Buyer Channels: Dark stores function as localized inventory nodes with superior inventory turns (12-15 days vs. 45 days in traditional wholesale). High SKU velocity creates defensive retail media ad margin.",
    metrics: [
      { label: "Dark Store Density", value: "1 store / 2.5km²" },
      { label: "FMCG Urban Share", value: "14.2%" }
    ]
  },
  {
    id: "in-4",
    title: "India Semiconductor Mission: Micron, Tata Electronics & CG Power Break Ground on OSAT Units",
    source: "The Economic Times",
    url: "https://economictimes.indiatimes.com/tech",
    category: "Tech & AI",
    scope: "Indian",
    publishedAt: "3 hours ago",
    readTime: "5 min read",
    tickers: ["TATACHEM.NS", "CGPOWER.NS"],
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
    summary: "With combined investments surpassing ₹1.2 lakh crore under central & state incentives, India's chip assembly and test ecosystems in Dholera and Sanand are targeting commercial package shipments by 2026.",
    mbaTakeaway: "Industrial Cluster Economics: Creating ancillary chemical, gas, and precision tooling clusters within 50 km radii is critical. First-mover advantage will determine India's ranking in the global electronics value chain.",
    metrics: [
      { label: "Cumulative Outlay", value: "₹1,26,000 Cr" },
      { label: "Target Ecosystem Jobs", value: "80,000+" }
    ]
  },
  {
    id: "in-5",
    title: "FII vs. DII Inflow Dynamics: Mutual Fund SIP Books Hit Record ₹23,500 Crore Monthly Run-Rate",
    source: "Business Standard",
    url: "https://www.business-standard.com/markets",
    category: "Banking & Markets",
    scope: "Indian",
    publishedAt: "4 hours ago",
    readTime: "3 min read",
    tickers: ["HDFCAMC.NS", "NIPPONLIFE.NS"],
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    summary: "The financialization of Indian household savings into domestic equity markets has created an unprecedented buffer against foreign institutional capital flight during global rate turbulence.",
    mbaTakeaway: "Structural Capital Deepening: The democratization of retail equity investing via UPI and mobile platforms has altered market microstructure, lowering equity risk premia and providing stable domestic liquidity.",
    metrics: [
      { label: "Monthly SIP Flow", value: "₹23,547 Cr" },
      { label: "DII Net Absorption", value: "+$4.1B QTD" }
    ]
  },
  {
    id: "in-6",
    title: "National Highway Toll Revenues Climb 18% as FASTag & Logistics Corridors Slash Turnaround Times",
    source: "Business Standard",
    url: "https://www.business-standard.com/infrastructure",
    category: "Macro & Economy",
    scope: "Indian",
    publishedAt: "5 hours ago",
    readTime: "3 min read",
    tickers: ["IRB.NS", "NHAI"],
    imageUrl: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80",
    summary: "Annual FASTag electronic toll collection surpassed ₹64,000 crore. Average freight truck speeds increased from 25 km/h to 38 km/h on key golden quadrilateral stretches, lowering national transit holding costs.",
    mbaTakeaway: "Supply Chain Velocity: Faster truck turnarounds increase asset utilization for logistics fleet operators by 30%, compressing working capital days for manufacturers across India.",
    metrics: [
      { label: "FASTag Toll Collections", value: "₹64,809 Cr" },
      { label: "Avg Freight Speed", value: "38.2 km/h (+52%)" }
    ]
  },
  {
    id: "in-7",
    title: "Banking Sector Asset Quality at 12-Year High: Gross NPA Ratio Falls to 2.8% Across Scheduled Banks",
    source: "CNBC-TV18",
    url: "https://www.cnbctv18.com/banking",
    category: "Banking & Markets",
    scope: "Indian",
    publishedAt: "6 hours ago",
    readTime: "3 min read",
    tickers: ["SBIN.NS", "HDFCBANK.NS", "ICICIBANK.NS", "KOTAKBANK.NS"],
    imageUrl: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800&q=80",
    summary: "Systemic gross non-performing assets (GNPA) fell to 2.8% and Net NPAs to 0.6%, driven by IBC recoveries, aggressive write-offs, and prudent retail underwriting backed by Aadhaar credit bureaus.",
    mbaTakeaway: "Twin Balance Sheet Advantage: Clean banking books combined with under-leveraged corporate balance sheets create the macroeconomic foundation for multi-year private credit expansion.",
    metrics: [
      { label: "Gross NPA", value: "2.8% (12-yr low)" },
      { label: "Capital Adequacy (CRAR)", value: "16.8%" }
    ]
  },
  {
    id: "in-8",
    title: "Green Hydrogen Subsidies: Adani, Reliance & L&T Bid for SIGHT Electrolyser Manufacturing Tranches",
    source: "Mint",
    url: "https://www.livemint.com/industry/energy",
    category: "Commodities & Energy",
    scope: "Indian",
    publishedAt: "7 hours ago",
    readTime: "4 min read",
    tickers: ["ADANIENT.NS", "RELIANCE.NS", "LT.NS"],
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    summary: "India's National Green Hydrogen Mission is distributing ₹17,490 crore in manufacturing incentives to drive the levelized cost of green hydrogen down toward $1.5/kg by 2030.",
    mbaTakeaway: "Learning Curves in Cleantech: Whoever achieves scale in indigenized electrolyser manufacturing first will dominate industrial decarbonization in heavy steel, fertilizer, and cement sectors.",
    metrics: [
      { label: "SIGHT Allocation", value: "₹17,490 Cr" },
      { label: "Target Green H2 Cost", value: "$1.50/kg by 2030" }
    ]
  },
  {
    id: "in-9",
    title: "Electronics Export Renaissance: Smartphone Shipments Exceed $15 Billion Driven by Apple Ecosystem",
    source: "The Economic Times",
    url: "https://economictimes.indiatimes.com/news/economy/foreign-trade",
    category: "Geopolitics & Trade",
    scope: "Indian",
    publishedAt: "8 hours ago",
    readTime: "3 min read",
    tickers: ["DIXON.NS", "TATACONSUM.NS"],
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    summary: "India has produced 1 out of every 7 iPhones globally through Foxconn, Pegatron, and Tata Electronics plants in Tamil Nadu and Karnataka, transforming electronics into India's 5th largest export commodity.",
    mbaTakeaway: "China+1 Execution: Moving from final assembly (low value-add 5%) toward domestic component sourcing (enclosure, printed circuits, camera modules) will expand domestic value retention to 25-30%.",
    metrics: [
      { label: "Annual Phone Exports", value: "$15.6 Billion" },
      { label: "Global iPhone Share", value: "14% Made in India" }
    ]
  },
  {
    id: "in-10",
    title: "Real Estate Luxury Super-Cycle: Gurugram, Mumbai & Bengaluru Record ₹10Cr+ Housing Sell-Outs",
    source: "Business Standard",
    url: "https://www.business-standard.com/companies",
    category: "Corporate Strategy",
    scope: "Indian",
    publishedAt: "9 hours ago",
    readTime: "3 min read",
    tickers: ["DLF.NS", "GODREJPROP.NS", "MACROTECH.NS"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    summary: "Top branded developers are selling out multi-crore luxury high-rises within hours of launch. The K-shaped consumption pattern is visible with ultra-luxury outpacing affordable housing demand.",
    mbaTakeaway: "K-Shaped Urban Consumer Trends: High-income wealth creation (tech founders, equity market gains, corporate CXOs) is fueling premiumization across real estate, premium automotive, and discretionary travel.",
    metrics: [
      { label: "Luxury Sales Growth", value: "+38% YoY" },
      { label: "DLF Pre-Sales QTD", value: "₹7,200 Cr" }
    ]
  },
  {
    id: "in-11",
    title: "SEBI Mandates T+0 Settlement: Clearing Corporation Tests Near-Instant Equity Trades",
    source: "CNBC-TV18",
    url: "https://www.cnbctv18.com/market",
    category: "Banking & Markets",
    scope: "Indian",
    publishedAt: "10 hours ago",
    readTime: "3 min read",
    tickers: ["BSE.NS", "CDSL.NS", "MCX.NS"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    summary: "SEBI's optional same-day settlement mechanism frees up capital for institutional and retail traders, positioning India alongside China at the frontier of market settlement efficiency.",
    mbaTakeaway: "Working Capital & Settlement Risk: Instant settlement compresses counterparty credit risk and releases trapped margins, boosting retail capital velocity.",
    metrics: [
      { label: "Settlement Cycle", value: "T+0 (Optional Pilot)" },
      { label: "Capital Freed Up", value: "₹3,500 Cr daily" }
    ]
  },
  {
    id: "in-12",
    title: "Aviation Capacity Constraint: IndiGo & Air India Await 1,500 Jet Orders Amid Pratt Engine Groundings",
    source: "Mint",
    url: "https://www.livemint.com/industry/transport",
    category: "Corporate Strategy",
    scope: "Indian",
    publishedAt: "11 hours ago",
    readTime: "4 min read",
    tickers: ["INDIGO.NS"],
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    summary: "India's domestic passenger air traffic crossed 15 crore travelers annually. IndiGo commands 62% market share, functioning as a duopoly with Tata-owned Air India.",
    mbaTakeaway: "Duopoly Pricing Power: High barriers to entry, engine supply shortages, and airport slot scarcities protect airline PRASK (Passenger Revenue per Available Seat Kilometer) yields.",
    metrics: [
      { label: "IndiGo Market Share", value: "62.4%" },
      { label: "Domestic Passengers", value: "15.3 Cr / Year" }
    ]
  },
  {
    id: "in-13",
    title: "Fintech Credit Regulations: RBI Tightens Unsecured Personal Loan Weights to Guard Against Delinquencies",
    source: "The Economic Times",
    url: "https://economictimes.indiatimes.com/wealth/borrow",
    category: "Banking & Markets",
    scope: "Indian",
    publishedAt: "12 hours ago",
    readTime: "3 min read",
    tickers: ["BAJFINANCE.NS", "PAYTM.NS"],
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    summary: "Higher risk weights on non-bank and bank unsecured lending curbed high-interest small-ticket instant consumer loans, forcing NBFCs to rebalance toward secured LAP (Loan Against Property) and MSME credit.",
    mbaTakeaway: "Prudential Regulatory Moats: Proactive central bank interventions deflate asset bubbles before they turn systemic, prioritizing banking stability over reckless credit growth.",
    metrics: [
      { label: "Unsecured Risk Weight", value: "125% (up from 100%)" },
      { label: "Small-Ticket Growth", value: "Decelerated to 14%" }
    ]
  },
  {
    id: "in-14",
    title: "Power Demand Peak Hits 250 GW: Thermal & Renewable Hybrid Round-The-Clock Contracts Surge",
    source: "Business Standard",
    url: "https://www.business-standard.com/industry/news",
    category: "Commodities & Energy",
    scope: "Indian",
    publishedAt: "13 hours ago",
    readTime: "3 min read",
    tickers: ["NTPC.NS", "TATAPOWER.NS", "POWERGRID.NS"],
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    summary: "Air conditioning penetration, manufacturing factories, and data centers pushed all-time peak electrical power load to 250 gigawatts, sparking urgent baseload coal plant expansions alongside 500 GW renewable targets.",
    mbaTakeaway: "Energy Trilemma (Security vs. Sustainability): Fast-growing industrializing nations must prioritize baseload reliability before decommissioning thermal infrastructure.",
    metrics: [
      { label: "Peak Power Load", value: "250.2 GW (Record)" },
      { label: "Renewable Target 2030", value: "500 GW" }
    ]
  },
  {
    id: "in-15",
    title: "Direct Tax Collections Surge 21%: Corporate & Personal Income Tax Reaches Record ₹19.5 Lakh Crore",
    source: "CNBC-TV18",
    url: "https://www.cnbctv18.com/economy",
    category: "Macro & Economy",
    scope: "Indian",
    publishedAt: "14 hours ago",
    readTime: "3 min read",
    tickers: ["NIFTY50"],
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    summary: "Technology-driven tax administration, annual information statements (AIS), and formalization of the informal sector pushed direct tax-to-GDP ratio to an all-time high of 6.6%.",
    mbaTakeaway: "Fiscal Capacity Expansion: Rising tax buoyancy equips the central government to maintain 3.3% GDP capital expenditure investments while consolidating the fiscal deficit toward 4.5% target.",
    metrics: [
      { label: "Direct Tax Collection", value: "₹19.58 Lakh Cr" },
      { label: "Tax-to-GDP Ratio", value: "6.6% (All-time high)" }
    ]
  }
];

export const TOP_01_GK_BRIEFS = [
  {
    tag: "GEOPOLITICS & MARITIME",
    headline: "The Red Sea / Suez diversion forces ships around the Cape of Good Hope (+12 days), absorbing 6.5% of global vessel capacity and inflating European freight shipping indices.",
    source: "World Bank Logistics Index"
  },
  {
    tag: "FINANCIAL ARCHITECTURE",
    headline: "Direct lending / private credit has exploded to a $1.7T asset class, bypassing Wall Street syndicated loan desks to finance private equity leveraged buyouts.",
    source: "Bank for International Settlements (BIS)"
  },
  {
    tag: "INDIA LOGISTICS REVOLUTION",
    headline: "India's national logistics cost dropped from 13.8% to 8.9% of GDP following GST harmonisation, dedicated freight corridors (DFCs), and Bharatmala expressways.",
    source: "NCAER Study"
  },
  {
    tag: "GLOBAL CURRENCY RESERVES",
    headline: "Central banks added 1,037 tonnes of gold in back-to-back years, signaling systemic de-dollarization hedging and sovereign portfolio insulation against Western sanctions.",
    source: "World Gold Council"
  },
  {
    tag: "AI INFRASTRUCTURE",
    headline: "Global data center power demand will grow 160% by 2030, consuming 8% of total US electrical generation and driving nuclear SMR (Small Modular Reactor) agreements.",
    source: "Goldman Sachs Global Investment Research"
  },
  {
    tag: "DEMOGRAPHICS & CAPEX",
    headline: "India's working-age population will expand by 9.7 million annually through 2030, in sharp contrast to China and Japan's contracting labor pools.",
    source: "UN Population Division"
  }
];
