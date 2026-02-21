import { ThemeProvider } from 'next-themes'
import { Navbar, Footer } from '@/components/layout'
import { LanguageProvider, ViewsProvider } from '@/components/common'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { getPersonSchema, getWebsiteSchema } from '@/lib/jsonLd'
import { LANGUAGE_COOKIE, resolveLanguage } from '@/lib/i18n'
import { cookies } from 'next/headers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Buddhsen Tripathi',
  description: 'Full Stack Web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'TypeScript', 'Portfolio', 'Buddhsen Tripathi', 'Software Engineer', 'Web Developer', 'Java', 'Web Security'],
  authors: [{ name: 'Buddhsen Tripathi' }],
  creator: 'Buddhsen Tripathi',
  metadataBase: new URL('https://buddhsentripathi.com'),
  alternates: {
    canonical: 'https://buddhsentripathi.com',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buddhsentripathi.com',
    title: 'Buddhsen Tripathi',
    description: 'Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
    siteName: 'Buddhsen Tripathi Portfolio',
    images: [
      {
        url: '/default-image.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buddhsen Tripathi',
    description: 'Full stack Web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
    creator: '@btr1pathi',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = [
  { '@context': 'https://schema.org', ...getPersonSchema() },
  getWebsiteSchema(),
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const initialLanguage = resolveLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value)

  return (
    <html lang={initialLanguage === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/profpic.jpg" as="image" />
        <link rel="alternate" type="application/rss+xml" title="Buddhsen Tripathi's Blog" href="https://buddhsentripathi.com/feed.xml" />
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
      <body className={`font-sans bg-background text-foreground max-w-[800px] mx-auto pt-12 flex flex-col min-h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          storageKey="theme"
        >
          <LanguageProvider initialLanguage={initialLanguage}>
            <ViewsProvider>
              <Navbar />
              <main className="flex-grow">
                <div className="px-8 py-12">
                  {children}
                </div>
              </main>
              <Footer />
            </ViewsProvider>
          </LanguageProvider>
        </ThemeProvider>
        <div className='mb-32 md:mb-16'></div>
      </body>
    </html>
  )
}
