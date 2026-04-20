# The Songwriter's Desk

Tools, templates and honest advice for working songwriters.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) + React (for tool components). Deploys as static HTML anywhere — Vercel, Cloudflare Pages, Netlify.

---

## First-time setup (10 minutes)

1. **Install Node.js** (if you don't already have it). Download from [nodejs.org](https://nodejs.org) — pick the LTS version. This is free and one-time.

2. **Open a terminal** in this folder (`songwritersdesk`).

3. **Install dependencies:**
   ```
   npm install
   ```

4. **Run the site locally:**
   ```
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser. You should see the site.

5. **Build for production** (creates a `dist/` folder of static files):
   ```
   npm run build
   ```

---

## How the site is organised

```
songwritersdesk/
├── public/              # Static assets served as-is (favicon, robots.txt, images)
├── src/
│   ├── content/blog/    # Blog posts — plain markdown files with frontmatter
│   ├── components/      # Reusable Astro + React components
│   │   └── tools/       # React components for each interactive tool
│   ├── layouts/         # Page layouts (the common HTML shell)
│   ├── pages/           # Every file here becomes a URL
│   │   ├── index.astro         → /
│   │   ├── about.astro         → /about
│   │   ├── blog/index.astro    → /blog
│   │   ├── blog/[...slug].astro → /blog/<post-slug>
│   │   ├── tools/index.astro   → /tools
│   │   └── tools/songstarter.astro → /tools/songstarter
│   └── styles/          # Global CSS
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind theme + colours
└── package.json
```

---

## Common tasks

### Write a new blog post

Create a file in `src/content/blog/` with a URL-friendly name like `my-new-post.md`.
Start with the frontmatter block — copy it from an existing post:

```markdown
---
title: "My new post"
description: "One-sentence summary for search engines and link previews."
pubDate: 2026-04-22
author: "Dan Healy"
tags: ["craft"]
draft: false
---

Post content here, in Markdown...
```

Set `draft: true` to hide it; set `draft: false` (or remove the field) to publish.
The file's name (without `.md`) becomes the URL slug: `my-new-post.md` → `/blog/my-new-post`.

### Add a new tool

1. Create the React component at `src/components/tools/MyTool.jsx`.
2. Create the page at `src/pages/tools/my-tool.astro`, importing the component with `client:load`.
3. Add an entry to the `tools` array in `src/pages/tools/index.astro`.
4. Set `status: 'live'` when it's ready; otherwise `'coming-soon'`.

### Flip from "coming soon" to full site

In `src/pages/index.astro`, change the line:

```js
const COMING_SOON = true;
```

to:

```js
const COMING_SOON = false;
```

Rebuild and redeploy.

### Hook up the email signup

The coming-soon form in `src/pages/index.astro` has a placeholder `action` URL.
Replace `https://example.com/subscribe` with your real form endpoint from
ConvertKit / Beehiiv / Mailerlite / whatever you use. Both Beehiiv and ConvertKit
have free tiers that work fine.

### Turn on analytics

In `src/layouts/BaseLayout.astro`, uncomment the Plausible line and set `data-domain`
to your real domain. Or swap for any other analytics tool you like.

### Turn on AdSense

Apply at [google.com/adsense](https://www.google.com/adsense) once you have 25+
posts and measurable organic traffic. Once approved, uncomment the AdSense script
in `src/layouts/BaseLayout.astro` and paste your client ID.

---

## Deploying to Vercel (5 minutes)

1. **Create a GitHub repo** and push this folder to it.
2. **Go to [vercel.com](https://vercel.com)** → New Project → Import your repo.
3. Vercel will detect Astro automatically. Framework preset: Astro. Build command: `npm run build`. Output directory: `dist`. Click Deploy.
4. After a minute you'll have a live URL like `songwritersdesk.vercel.app`.
5. **Add your custom domain**: Vercel project → Settings → Domains → add `songwritersdesk.com` and `www.songwritersdesk.com`. Vercel will give you DNS records to add in Hostinger (an A record and a CNAME).
6. **In Hostinger**: Domains → songwritersdesk.com → DNS / nameservers → add the A and CNAME records Vercel showed you.
7. Wait 10–60 minutes for DNS to propagate. You're live.

---

## What's in place right now

- [x] Homepage with coming-soon mode and an email capture form
- [x] Homepage full version (flip `COMING_SOON` to `false` to see it)
- [x] About page
- [x] Tools hub page
- [x] Songstarter tool (working, deterministic pools for v1 — swap to an LLM call for v2)
- [x] Blog index + dynamic post pages
- [x] Two example blog posts
- [x] SEO basics (Open Graph tags, sitemap, robots.txt, canonical URLs)
- [x] Accessible, mobile-friendly design
- [ ] The other five MVP tools (slant rhyme, split sheet, royalty calc, title gen, structure builder) — placeholders only, coming soon
- [ ] Real email capture endpoint (placeholder in form action)
- [ ] Analytics (commented out, ready to enable)
- [ ] AdSense (commented out, ready to enable after approval)

---

## Next steps in priority order

1. Set up the real email signup (ConvertKit or Beehiiv, free tier) and paste the form endpoint into `index.astro`.
2. Deploy to Vercel with the steps above.
3. Point `songwritersdesk.com` at Vercel via Hostinger DNS.
4. Build out the slant rhyme finder (the highest-traffic tool after Songstarter).
5. Write weekly blog posts. Flip `COMING_SOON` to `false` once you have the slant rhyme tool live.
