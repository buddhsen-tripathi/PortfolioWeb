import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import NavigationBar from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import TopLoader from "@/components/top-loader";
import OnekoCat from "@/components/OnekoCat";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { ViewsProvider } from "@/components/blog/views-context";
import {
  getPersonSchema,
  getWebsiteSchema,
  getProfilePageSchema,
} from "@/lib/jsonLd";

export const metadata = {
  title: {
    template: "%s | Buddhsen Tripathi",
    default: "Buddhsen Tripathi - Full Stack Developer",
  },
  description:
    "Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs",
  keywords: [
    "Buddhsen Tripathi",
    "Full Stack Developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Buddhsen Tripathi" }],
  creator: "Buddhsen Tripathi",
  publisher: "Buddhsen Tripathi",
  metadataBase: new URL("https://buddhsentripathi.com"),
  manifest: "/manifest.json",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buddhsentripathi.com",
    title: "Buddhsen Tripathi - Full Stack Developer",
    description:
      "Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs",
    siteName: "Buddhsen Tripathi",
    images: [
      {
        url: "/default-image.webp",
        width: 1200,
        height: 630,
        alt: "Buddhsen Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buddhsen Tripathi - Full Stack Developer",
    description:
      "Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs",
    images: ["/default-image.webp"],
    creator: "@btr1pathi",
  },
  alternates: {
    canonical: "https://buddhsentripathi.com",
  },
};

import { GeistPixelSquare } from "geist/font/pixel";
import { Space_Mono, Press_Start_2P } from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export default function RootLayout({ children }) {
  const jsonLd = [
    { "@context": "https://schema.org", ...getPersonSchema() },
    getWebsiteSchema(),
    getProfilePageSchema(),
  ];

  return (
    <html lang="en" suppressHydrationWarning className={`${spaceMono.variable} ${pressStart.variable}`}>
      <head>
        <meta name="theme-color" content="#0B0D0E" />
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Buddhsen Tripathi's Blog"
          href="https://buddhsentripathi.com/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
        </Script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TopLoader />
          <SmoothScrollProvider>
            <ViewsProvider>
              <div className="grid min-h-[100dvh] grid-cols-[minmax(0,1fr)] grid-rows-[1fr_auto] overflow-x-hidden">
                <main
                  className={`${GeistPixelSquare.className} max-w-[1800px] px-6 pt-14 md:mx-auto md:px-0 md:pt-24`}
                >
                  <OnekoCat />
                  {children}
                </main>
                <Footer />
                <NavigationBar />
                <Toaster />
                <ScrollToTopButton />
              </div>
            </ViewsProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
