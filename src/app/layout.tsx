import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://movieadda-vip.netlify.app"),
  title: "MovieAdda — Watch Movies & TV Shows in 4K Ultra HD Free",
  description:
    "Stream 100,000+ trending movies, binge-worthy TV series, and official 4K trailers powered by the MovieAdda Multi-Stream Cinema Engine. Fast, unblocked, and high definition.",
  keywords: [
    "movieadda",
    "watch movies online",
    "free movie streaming",
    "watch 4k movies free",
    "tv series streaming",
    "latest hollywood movies",
    "latest bollywood movies",
    "hd trailers",
    "movie stream engine",
  ],
  authors: [{ name: "Himanshu Joshi", url: "https://movieadda-vip.netlify.app" }],
  creator: "MovieAdda Team",
  publisher: "MovieAdda",
  alternates: {
    canonical: "https://movieadda-vip.netlify.app",
  },
  openGraph: {
    title: "MovieAdda — Watch Movies & TV Shows in 4K Ultra HD",
    description:
      "Stream trending blockbusters, award-winning cinema, and TV series in 4K Ultra HD with multi-server playback.",
    url: "https://movieadda-vip.netlify.app",
    siteName: "MovieAdda Cinema",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520Wvu.jpg",
        width: 1200,
        height: 630,
        alt: "MovieAdda 4K Ultra HD Streaming Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MovieAdda — 4K Ultra HD Cinema Platform",
    description: "Stream 100,000+ blockbusters & TV series with multi-server playback.",
    images: ["https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520Wvu.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-1539854412273273";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://movieadda-vip.netlify.app/#website",
        url: "https://movieadda-vip.netlify.app/",
        name: "MovieAdda",
        description: "Watch Movies & TV Shows in 4K Ultra HD Free",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://movieadda-vip.netlify.app/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://movieadda-vip.netlify.app/#organization",
        name: "MovieAdda",
        url: "https://movieadda-vip.netlify.app/",
        logo: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520Wvu.jpg",
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content={adsenseClientId} />
      </head>
      <body className="bg-[#141414] text-[#ffffff] antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
