<img width="1920" height="1280" alt="image" src="https://github.com/user-attachments/assets/75f5f4b8-d633-423e-b204-e037f6c95ad3" />

## Project Overview

Personal portfolio and blog, live at [buddhsentripathi.com](https://buddhsentripathi.com). Built with Next.js 16 (App Router), TypeScript, Tailwind v4, and an MDX-powered blog backed by Cloudflare R2 and Supabase. The focus is on performance, SEO, and a clean developer experience.

> The previous iteration of the portfolio lives on the [`ver/04-26`](https://github.com/buddhsen-tripathi/PortfolioWeb/tree/ver/04-26) branch.

## Features

### Core Pages
-   **Home:** Hero with bio, contribution graph, social links, hackathons feed, and CTA
-   **Projects:** Project showcase with tech badges, GitHub stars, and live previews
-   **Blogs:** Technical and personal articles with view counters, TOC, and tabbed navigation
-   **Experience:** Timeline of professional work with responsibilities and stack
-   **Hackathons, Research, Newsletter:** Dedicated pages for each

### Blog System
-   MDX posts stored on Cloudflare R2 and rendered with `next-mdx-remote`
-   Per-post view counter backed by Supabase with batched fetches
-   Table of contents, reading time, and syntax highlighting via `highlight.js`
-   RSS feed (`/feed.xml`) and dynamic sitemap (`/sitemap.xml`)

### Additional Features
-   **Dark/Light Mode:** Theme toggling via `next-themes`
-   **Newsletter:** Email sign-ups backed by Supabase
-   **Visitor Counter:** Tracks unique visitors
-   **SEO Optimized:** Full JSON-LD (Person, Website, ProfilePage, BlogPosting, Breadcrumb) plus per-page OpenGraph, Twitter cards, and canonical URLs
-   **Analytics:** Google Analytics integration
-   **Animations:** Smooth transitions with Motion (ex-Framer Motion)

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [Next.js](https://nextjs.org/) 16 (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 6 |
| **Runtime / Package Manager** | [Bun](https://bun.sh) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) v4, [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://radix-ui.com/) |
| **Animation** | [Motion](https://motion.dev/) |
| **Database** | [Supabase](https://supabase.io/) (views & subscribers) |
| **Storage** | [Cloudflare R2](https://www.cloudflare.com/r2/) (blog content & images) |
| **Content** | [MDX](https://mdxjs.com/) with `next-mdx-remote` |
| **Deployment** | [Vercel](https://vercel.com/) |

## Getting Started

Follow these steps to get the project running locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/buddhsen-tripathi/PortfolioWeb.git
    cd PortfolioWeb
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up Environment Variables:**
    Copy `.env.example` to `.env.local` and fill in your credentials (see Environment Variables section below).

4.  **Run the development server:**
    ```bash
    bun run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the development server |
| `bun run build` | Build for production |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |

## Environment Variables

Create a `.env.local` file with the following variables:

### Required
| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL (server-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 access key |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 secret key |
| `R2_BUCKET_NAME` | R2 bucket name for blog content |
| `R2_ENDPOINT` | R2 endpoint URL |
| `R2_ACCOUNT_ID` | Cloudflare account ID |

### Optional
| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub token for contribution graph / star counts |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |

Supabase expects a `views` table (`slug text primary key`, `count int`) with an RPC `increment_view_count(post_slug text)`, plus a `newsletter_subscribers` table (`email text primary key`).

## Project Structure

```
src/
├── app/
│   ├── api/                  # API routes
│   │   ├── github/           # Contribution graph + star counts
│   │   ├── location/         # Visitor geolocation
│   │   ├── socials/          # Live social metrics
│   │   ├── subscribe/        # Newsletter subscription
│   │   ├── views/            # Blog view counter (single + batch)
│   │   └── visitors/         # Visitor tracking
│   ├── blogs/                # Blog list, [slug], MDX utilities
│   ├── experience/           # Experience page
│   ├── hackathons/           # Hackathons page
│   ├── research/             # Research page
│   ├── newsletter/           # Newsletter page
│   ├── projects/             # Projects listing
│   ├── feed.xml/             # RSS feed route
│   ├── sitemap.xml/          # Sitemap route
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Tailwind v4 theme + base styles
├── components/
│   ├── blog/                 # MDX components, view counter, TOC
│   ├── common/               # Shared (newsletter subscription, etc.)
│   ├── sections/             # Page sections (hero, projects, experience, etc.)
│   ├── layout/               # Layout wrappers and timeline
│   ├── ui/                   # shadcn/ui primitives
│   ├── icons/                # Icon components
│   └── illustrations/        # Custom SVG illustrations
├── constants/                # Projects, experiences, nav links, SEO content
├── lib/
│   ├── jsonLd.ts             # JSON-LD schema generators
│   ├── r2Client.ts           # Cloudflare R2 integration
│   ├── supabaseAdmin.ts      # Supabase server client
│   ├── github.ts             # GitHub API helpers
│   └── utils.ts              # Utility functions
├── utils/                    # Fonts and misc
└── public/                   # Static assets
```

## Connect

-   **Website:** [buddhsentripathi.com](https://buddhsentripathi.com)
-   **LinkedIn:** [buddhsen-tripathi](https://linkedin.com/in/buddhsen-tripathi)
-   **Twitter/X:** [@senbuilds](https://twitter.com/senbuilds)

## Credits

-   Original template: [ShivaBhattacharjee/Portfolio-latest](https://github.com/ShivaBhattacharjee/Portfolio-latest)

## License

This project is open source under the [MIT License](LICENSE).

## Learn More

-   [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
-   [Tailwind CSS v4](https://tailwindcss.com/docs) - Utility-first CSS framework
-   [shadcn/ui](https://ui.shadcn.com/) - Re-usable UI components
-   [Supabase](https://supabase.com/docs) - Open source Firebase alternative
-   [Cloudflare R2](https://developers.cloudflare.com/r2/) - Object storage

Built by [Buddhsen Tripathi](https://buddhsentripathi.com) 💙
