<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://cdn.buddhsentripathi.com/assets/readme/home-dark.webp?v=2">
  <img alt="Home page of buddhsentripathi.com: hero, socials grid, and work section, with the section index on the left" src="https://cdn.buddhsentripathi.com/assets/readme/home-light.webp?v=2">
</picture>

# buddhsentripathi.com

My portfolio and blog, live at [buddhsentripathi.com](https://buddhsentripathi.com). It's a Next.js 16 app with TypeScript and Tailwind v4. Blog posts are MDX stored on Cloudflare R2, view counts and newsletter sign-ups live in Supabase, and everything personal comes from one config file, so you can fork it and make it yours.

Older versions are kept on branches: [`ver/10-26`](https://github.com/buddhsen-tripathi/PortfolioWeb/tree/ver/10-26) (the pixel-font design before this one) and [`ver/04-26`](https://github.com/buddhsen-tripathi/PortfolioWeb/tree/ver/04-26).

## What's on the site

The home page is one long scroll, and each section links to its full page:

| Section | What it shows |
|---|---|
| Intro | Photo, a short hello, location with live local time |
| Socials | Grid of profiles; hover one for a live preview card (GitHub, X, LinkedIn, LeetCode, TryHackMe, Codeforces) |
| Work | Featured projects with screenshots, status badges, tech badges, and GitHub stars |
| Experience | Roles grouped by company, with tenure |
| Hackathons | Top placements, first places first |
| Writing | Latest posts with excerpts |
| GitHub | Contribution graph |
| Contact | Book a call, copy email, resume |

Full pages: `/projects`, `/experience`, `/hackathons`, `/blogs` (with a post page for each), `/newsletter`, and `/research` (hidden until it has entries).

Other details:

- Light and dark themes, including a footer illustration of New York in a day and a night version.
- A section index in the left gutter on wide screens, and an "On this page" index on blog posts.
- A night-sky backdrop beside the page, with the odd shooting star. It respects reduced motion.
- A star button in the header showing this repo's star count.
- RSS at `/feed.xml`, a sitemap at `/sitemap.xml`, JSON-LD for search engines, and Open Graph cards on every page.

## Tech stack

| | |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| Language | TypeScript |
| Package manager | [Bun](https://bun.sh) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4, Radix primitives, [Geist](https://vercel.com/font) Sans and Mono |
| Animation | [Motion](https://motion.dev/) |
| Content | MDX via `next-mdx-remote`, code blocks with `prism-react-renderer` |
| Storage | [Cloudflare R2](https://developers.cloudflare.com/r2/) behind `cdn.buddhsentripathi.com` (posts and all images) |
| Database | [Supabase](https://supabase.com/) (view counts, newsletter) |
| Hosting | [Vercel](https://vercel.com/) |

## Run it locally

```bash
git clone https://github.com/buddhsen-tripathi/PortfolioWeb.git
cd PortfolioWeb
bun install
cp .env.example .env.local   # fill in what you need, see below
bun run dev
```

Then open [localhost:3000](http://localhost:3000). The site runs without any keys; the parts that need one (blog posts from R2, view counts, the GitHub graph) just stay empty.

## Make it yours

Everything personal lives in [`src/site.config.ts`](src/site.config.ts), and it's the only file you need to edit. Pages, metadata, JSON-LD, the RSS feed, the sitemap, `robots.txt`, and the web manifest all read from it.

| Key | What it controls |
|---|---|
| `identity` | Name, alternate name, job title, bio, affiliation, location and time zone, light and dark photos |
| `home` | The hero text, the contact line, and each home section's heading |
| `pages` | For every page: its heading, search description, and intro line (plus the 404 text and newsletter promises) |
| `contact` | Email, site URL, booking link, resume |
| `repo` | The GitHub repo shown on the header's star button |
| `assets` | Open Graph images, favicon, footer illustration and sign-off line |
| `socials` | One handle per platform (see below) |
| `socialPreviews` | Hover-card details for platforms without a public API (LinkedIn) |
| `seo` | Default title and description, title template, theme color |
| `nav` | Header links |
| `experiences`, `projects`, `hackathons`, `research` | The content lists |
| `writing.external` | Posts published elsewhere (like X articles) that show in the blog list |
| `integrations` | The namespace for the footer visitor counter |

Components only hold generic interface words like "Featured" or "Keep reading". Anything about you belongs in the config.

### Socials

35 platforms are built in, from X, GitHub, and LinkedIn to Hugging Face, Kaggle, LeetCode, and Hack The Box. Type a handle to show one and leave it as `""` to hide it everywhere, including the search-engine profile links. Full profile URLs work too, which helps for Mastodon instances.

```ts
socials: {
  github: "buddhsen-tripathi",
  huggingface: "Buddhsen",
  youtube: "",          // hidden
  // ...
}
```

Icons, brand colors, and URL patterns are in [`src/lib/socials.tsx`](src/lib/socials.tsx).

### Projects

Set `featured: true` on the projects you want on the home page; the rest show on `/projects`. `status` is one of `acquired`, `live`, `building`, `research`, or `active`, and each gets its own badge. Add a `github` repo and the card shows its star count.

### Adding a page

[`buildMetadata`](src/lib/metadata.ts) fills in the canonical URL, Open Graph, and Twitter tags from the site defaults:

```tsx
// src/app/uses/page.tsx
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Uses",
  description: "The tools I work with.",
  path: "/uses",
});
```

## Images and posts on R2

Nothing heavy is committed. Images and blog posts live in an R2 bucket under `assets/` and are served from the CDN, so config entries use full URLs like `https://cdn.buddhsentripathi.com/assets/projects/nimu-dark.png`.

To add images, drop them in `public/` and run `bun run migrate:assets`. It uploads anything new and skips what's already there. Blog diagrams render into the git-ignored `public/blog-images/` folder and upload the same way.

The CDN caches missing files for 12 hours, so don't open an image URL before you've uploaded it. If you did, add a version query (`?v=20261018`) to the URL in the config.

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Start the dev server |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | ESLint |
| `bun run migrate:assets` | Upload new files from `public/` to R2 |
| `bun run migrate:blogs` | Upload blog posts to R2 |

## Environment variables

All optional for local development. Copy `.env.example` to `.env.local`.

| Variable | Used for |
|---|---|
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_ENDPOINT` | Blog posts and the upload scripts |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | View counts and newsletter sign-ups |
| `GITHUB_TOKEN` | Contribution graph |
| `NEXT_PUBLIC_GA_ID` | Google Analytics |

Supabase needs a `views` table (`slug text primary key`, `count int`) with an `increment_view_count(post_slug text)` function, and a `newsletter_subscribers` table (`email text primary key`).

## Project structure

```
src/
├── site.config.ts        # all personal content and settings
├── app/
│   ├── page.tsx          # home page
│   ├── layout.tsx        # frame, header, footer, fonts
│   ├── globals.css       # theme tokens and shared styles
│   ├── projects/  experience/  hackathons/  blogs/  newsletter/  research/
│   ├── api/              # github, location, socials, subscribe, views, visitors
│   ├── feed.xml/  sitemap.xml/
│   └── not-found.tsx
├── components/
│   ├── home/             # home page sections
│   ├── site/             # header, section index, backdrop, page header, section
│   ├── projects/         # project card
│   ├── blog/             # MDX components, contents list, view counter
│   └── ui/  icons/  common/  sections/  kibo-ui/
├── lib/                  # socials registry, metadata, JSON-LD, R2, GitHub, helpers
└── constants/            # re-exports content lists from site.config.ts
```

## Credits

Started from [ShivaBhattacharjee/Portfolio-latest](https://github.com/ShivaBhattacharjee/Portfolio-latest).

## License

[MIT](LICENSE). Fork it, change the config, and make it yours.

Built by [Buddhsen Tripathi](https://buddhsentripathi.com) ([@senbuilds](https://x.com/senbuilds)).
