import "./globals.css";
import Script from "next/script";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/site/site-header";
import Backdrop from "@/components/site/backdrop";
import Footer from "@/components/sections/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { ViewsProvider } from "@/components/blog/views-context";
import { geistSans } from "@/lib/fonts";
import { fetchGitHubStars } from "@/lib/github";
import { getPersonSchema, getWebsiteSchema } from "@/lib/jsonLd";
import { getSiteConfig } from "@/lib/r2Client";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return {
    title: {
      template: config.seo.titleTemplate,
      default: config.seo.defaultTitle,
    },
    description: config.seo.defaultDescription,
    keywords: config.seo.keywords,
    authors: [{ name: config.identity.name }],
    creator: config.identity.name,
    publisher: config.identity.name,
    metadataBase: new URL(config.contact.url),
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
      icon: config.assets.favicon,
      shortcut: config.assets.favicon,
    },
    openGraph: {
      type: "website",
      locale: config.seo.locale,
      url: config.contact.url,
      title: config.seo.defaultTitle,
      description: config.seo.defaultDescription,
      siteName: config.identity.name,
      images: [
        {
          url: config.assets.ogImage,
          width: 1200,
          height: 630,
          alt: config.identity.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.defaultTitle,
      description: config.seo.defaultDescription,
      images: [config.assets.ogImage],
      creator: config.seo.twitterHandle,
    },
    alternates: {
      canonical: config.contact.url,
    },
  };
}

export default async function RootLayout({ children }) {
  const config = await getSiteConfig();
  const repoStars = await fetchGitHubStars(config.repo);
  const jsonLd = [
    { "@context": "https://schema.org", ...getPersonSchema(config) },
    getWebsiteSchema(config),
  ];

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="theme-color" content={config.seo.themeColor} />
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://cdn.buddhsentripathi.com" crossOrigin="anonymous" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${config.identity.name}'s Blog`}
          href={`${config.contact.url}/feed.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <ViewsProvider>
              <TooltipProvider delayDuration={150}>
                <Backdrop />
                <div className="relative mx-auto flex min-h-dvh w-full max-w-[var(--frame-width)] flex-col border-x border-border bg-surface">
                  <SiteHeader repoStars={repoStars} links={config.nav} repo={config.repo} />
                  <main className="flex-1">{children}</main>
                  <Footer
                    name={config.identity.name}
                    footerQuote={config.assets.footerQuote}
                    footerArt={config.assets.footerArt}
                  />
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
