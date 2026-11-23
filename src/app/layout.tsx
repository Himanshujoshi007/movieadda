import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "MovieAdda — Watch Movies & TV Shows in HD",
  description:
    "Stream trending movies, binge-worthy TV series, and official HD trailers powered by MovieAdda Multi-Stream Engine.",
  keywords: ["movieadda", "movies", "tv shows", "stream movies", "trailers", "hd cinema"],
  authors: [{ name: "MovieAdda Team" }],
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
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#141414] text-[#ffffff] antialiased min-h-screen" suppressHydrationWarning>
        {adsenseClientId && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
        {children}
      </body>
    </html>
  );
}
