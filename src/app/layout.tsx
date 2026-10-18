import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/site/site-header";
import Backdrop from "@/components/site/backdrop";
import Footer from "@/components/sections/footer";
import TopLoader from "@/components/top-loader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { ViewsProvider } from "@/components/blog/views-context";
import {
  getPersonSchema,
  getWebsiteSchema,
  getProfilePageSchema,
} from "@/lib/jsonLd";
import { siteConfig } from "@/site.config";
import { fetchGitHubStars } from "@/lib/github";

export const metadata = {
  title: {
    template: siteConfig.seo.titleTemplate,
    default: siteConfig.seo.defaultTitle,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.identity.name }],
  creator: siteConfig.identity.name,
  publisher: siteConfig.identity.name,
  metadataBase: new URL(siteConfig.contact.url),
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
    icon: siteConfig.assets.favicon,
    shortcut: siteConfig.assets.favicon,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.contact.url,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    siteName: siteConfig.identity.name,
    images: [
      {
        url: siteConfig.assets.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.identity.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.assets.ogImage],
    creator: siteConfig.seo.twitterHandle,
  },
  alternates: {
    canonical: siteConfig.contact.url,
  },
};

import { geistSans } from "@/lib/fonts";
import { GeistMono } from "geist/font/mono";


export default async function RootLayout({ children }) {
  const repoStars = await fetchGitHubStars(siteConfig.repo);
  const jsonLd = [
    { "@context": "https://schema.org", ...getPersonSchema() },
    getWebsiteSchema(),
    getProfilePageSchema(),
  ];

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="theme-color" content={siteConfig.seo.themeColor} />
        <meta name="color-scheme" content="dark light" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.identity.name}'s Blog`}
          href={`${siteConfig.contact.url}/feed.xml`}
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
              <TooltipProvider delayDuration={150}>
                <Backdrop />
                <div className="relative mx-auto flex min-h-dvh w-full max-w-[var(--frame-width)] flex-col border-x border-border bg-surface">
                  <SiteHeader repoStars={repoStars} />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
                <ScrollToTopButton />
              </TooltipProvider>
            </ViewsProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
