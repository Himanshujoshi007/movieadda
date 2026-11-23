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
  themeColor: "#07070a",
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
      {
        "@type": "FAQPage",
        "@id": "https://movieadda-vip.netlify.app/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What makes MovieAdda the best platform to watch movies and TV shows free online?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "MovieAdda is powered by the next-generation Cinema Multi-Stream Engine offering multi-server redundancy, delivering crystal-clear 4K Ultra HD and 1080p playback with zero subscription fees.",
            },
          },
          {
            "@type": "Question",
            name: "How do I switch servers if a movie or TV episode stutters or buffers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Directly above the video frame, click the Stream Line switcher to toggle between Server 1 (VidSrc Pro), Server 2 (AutoEmbed HD), Server 3 (VidLink Fast), Server 4 (Smashy 4K), or Official 4K Cinema Video.",
            },
          },
          {
            "@type": "Question",
            name: "Can I stream MovieAdda on Mobile, iPad, and Smart TVs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, MovieAdda is fully responsive and touch-optimized for iOS, Android, macOS, Windows, Linux, and Smart TV browsers.",
            },
          },
          {
            "@type": "Question",
            name: "Is it completely free to watch movies on MovieAdda?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% free forever with no credit card, no sign-up, and no subscription fees required.",
            },
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": "https://movieadda-vip.netlify.app/#blockbusters",
        name: "Trending Blockbuster Movies on MovieAdda",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Movie",
              name: "Dune: Part Two",
              url: "https://movieadda-vip.netlify.app/?watch=693134",
              image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
              datePublished: "2024-03-01",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Movie",
              name: "Oppenheimer",
              url: "https://movieadda-vip.netlify.app/?watch=872585",
              image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
              datePublished: "2023-07-21",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Movie",
              name: "Interstellar",
              url: "https://movieadda-vip.netlify.app/?watch=157336",
              image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
              datePublished: "2014-11-05",
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "Movie",
              name: "Deadpool & Wolverine",
              url: "https://movieadda-vip.netlify.app/?watch=533535",
              image: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
              datePublished: "2024-07-26",
            },
          },
        ],
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
