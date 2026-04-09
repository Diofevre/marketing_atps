# MyATPS Marketing — Claude Instructions

## Project Identity
**MyATPS** is the complete ATPL exam preparation platform for student pilots.
This repo is the **marketing landing site** — not the app itself.
Stack: **Next.js 16 · React 19 · TypeScript strict · Tailwind CSS v4 · Framer Motion 12 · DM Sans**

## Commands
```bash
npm run dev     # dev server → localhost:3000
npm run build   # production build
npm run lint    # ESLint
```

## Architecture
```
app/
  (landing)/          # route group — no URL segment
    blog/             # blog listing + [slug]
    news/             # news listing + [slug]
    contact/          # contact page
    privacy/          # privacy policy
  layout.tsx          # root layout (DM Sans, metadata, JSON-LD)
  page.tsx            # redirects to (landing)

components/
  sections/           # full-page sections: Hero, Blog, News, Pricing, Bento…
  layout/             # Navigation + Footer
  news/               # NewsCard, NewsFeaturedPost, NewsGrid, NewsSidebarPanel
  ui/                 # shadcn/ui primitives — modify with caution
  BenefitCard.tsx
  ButtonDemo.tsx
  TitleSection.tsx

lib/
  motion.tsx          # ALL Framer Motion variants + reusable wrappers (FadeInUp, FadeIn, ScaleIn, StaggerContainer)
  utils.ts            # cn() from clsx + tailwind-merge
  constants.ts        # APP_URL, SITE_URL
  api/                # data fetching helpers
  types/              # shared TypeScript types
```

## Design Language

| Token | Value |
|-------|-------|
| Body background | `#F7F6F7` (warm near-white) |
| Primary dark | `#1b0c25` (deep purple-black) |
| Font | DM Sans — `var(--font-dm-sans)` |
| Border radius | Tailwind `rounded-*` scale only |

### Tailwind CSS v4
- Config is in `tailwind.config.ts` — always check it before inventing new tokens
- Use `cn()` from `@/lib/utils` for ALL conditional class merging
- NEVER use `style={{}}` inline — Tailwind or CSS variables only
- NEVER hardcode pixels — use Tailwind spacing/sizing scale

### Framer Motion — Animation Conventions
All variants live in **`@/lib/motion`** — import from there, do NOT duplicate.

**Available reusable components** (prefer these over raw motion):
```tsx
import { FadeInUp, FadeIn, ScaleIn, StaggerContainer } from "@/lib/motion"
```

**Standard easing**: `[0.25, 0.1, 0.25, 1]` — always use this
**Viewport trigger**: use `viewportSettings` from `@/lib/motion` (`once: true, margin: "-100px"`)
**Durations**: 0.4s micro / 0.6s standard / 0.8s hero/title / 1s slow

Available variant sets (import by name from `@/lib/motion`):
- Hero: `heroBadgeVariants`, `heroTitleWordVariants`, `heroDescriptionVariants`, `heroButtonVariants`, `heroCardVariants`
- Section reveals: `fadeInUpVariants`, `fadeInUpDelayedVariants`, `fadeInVariants`, `scaleInVariants`
- Cards: `bentoCardVariants`, `pricingCardVariants`, `testimonialCardVariants`, `benefitCardVariants`, `workStepVariants`, `faqItemVariants`
- Containers/stagger: `staggerContainer`, `staggerContainerFast`, `bentoContainerVariants`, `pricingContainerVariants`, etc.
- Layout: `navigationVariants`, `mobileMenuVariants`, `footerContainerVariants`, etc.

**When adding new animations**: add variant to `lib/motion.tsx` with proper JSDoc comment, then import.

## Component Conventions
- Props interface: `interface ComponentNameProps { ... }` — defined BEFORE the component
- Named exports for all components; default export optional for pages
- Imports order: React → external libs → `@/` aliases → relative paths
- Always `"use client"` for components using hooks, motion, or browser APIs
- Semantic HTML first: `<section>`, `<article>`, `<nav>`, `<button>`, `<a>`

## Strict Rules
- **NO** `any` TypeScript types
- **NO** `style={{}}` inline styles (use Tailwind or CSS vars)
- **NO** hardcoded hex colors outside design token scope
- **NO** `console.log` / `console.warn` left in code
- **NO** `// TODO` without an associated issue
- Images: always `next/image` with `width`/`height` or `fill` + `sizes`
- Icons: Lucide React named imports only

## SEO
- Per-page metadata via `export const metadata` or `generateMetadata()`
- Every page: `title`, `description`, `openGraph.images`
- Structured data (JSON-LD) in root `layout.tsx`
- `NEXT_PUBLIC_SITE_URL` env var for canonical URLs

## Git
Conventional commits: `feat:` `fix:` `refactor:` `perf:` `chore:` `docs:`
Active branch: `fix_design` → merges to `main`
