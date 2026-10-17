import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meridian Economics | High-Signal Business & Economic Portal for MBAs',
  description: 'Consolidated international (WSJ, NYT, FT) and Indian business news (Business Standard, CNBC-TV18, Mint) curated for the top 0.1% GK and executive decision makers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600;1,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen antialiased bg-[#FBF9F5] text-stone-900 font-sans selection:bg-amber-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
