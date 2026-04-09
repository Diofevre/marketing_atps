---
name: seo-check
description: SEO + performance audit for a Next.js page. Checks metadata completeness, structured data, Core Web Vitals issues, and image optimization. Runs in isolated seo-performance agent context.
argument-hint: <page path or route>
context: fork
agent: seo-performance
effort: high
paths:
  - "app/**/page.tsx"
  - "app/**/layout.tsx"
allowed-tools: Read, Grep, Glob, Bash
---

# SEO & Performance Check — $ARGUMENTS

You are the **seo-performance** agent. Run a thorough SEO and performance audit.

## Step 1 — Read the Target

1. Read `$ARGUMENTS` (the page or layout file)
2. Read `app/layout.tsx` for root metadata context
3. Read `app/sitemap.ts` and `app/robots.ts`
4. If a section page, also read its section components for CWV issues

## Step 2 — SEO Checklist

### Metadata (must-have)
- [ ] `title` tag — unique, 50–60 chars, includes keyword
- [ ] `description` — unique, 150–160 chars, compelling
- [ ] `openGraph.title` + `openGraph.description` + `openGraph.images`
- [ ] `alternates.canonical` — absolute URL
- [ ] `robots` — correct index/follow settings

### Structured Data (JSON-LD)
- [ ] Root layout has `SoftwareApplication` + `Organization` schemas
- [ ] Blog/news pages have `Article` schema
- [ ] FAQ sections have `FAQPage` schema
- [ ] Data is valid (check field names + required fields per schema.org spec)

### Content Quality
- [ ] H1 on every page (one only)
- [ ] Logical H2→H3→H4 hierarchy
- [ ] Alt text on all images (descriptive, not "image1.png")
- [ ] Internal links use `<Link href="...">` (not `<a href="...">` for same-domain)

## Step 3 — Core Web Vitals Checklist

### LCP (target < 2.5s)
- [ ] Above-fold images have `priority` prop
- [ ] Hero section uses Server Component where possible
- [ ] No render-blocking CSS/JS

### CLS (target < 0.1)
- [ ] All images have explicit `width` + `height` OR `fill` + `sizes`
- [ ] No layout shifts from fonts (DM Sans via `next/font` ✓)
- [ ] Dynamic content has skeleton/placeholder

### INP (target < 200ms)
- [ ] No unnecessary `"use client"` bloating the JS bundle
- [ ] Heavy components below the fold use `dynamic()` import
- [ ] No synchronous expensive operations in render

## Step 4 — Output Format

```
# SEO Check: [Page Name]

## Scores
| Category | Score | Status |
|----------|-------|--------|
| Metadata | X/10 | ✅/⚠️/🔴 |
| Structured Data | X/10 | ✅/⚠️/🔴 |
| LCP | X/10 | ✅/⚠️/🔴 |
| CLS | X/10 | ✅/⚠️/🔴 |
| INP | X/10 | ✅/⚠️/🔴 |
| **OVERALL** | **X/10** | |

## 🔴 Critical Issues
(Affects ranking or user experience)

## 🟡 Warnings
(Should be addressed)

## ✅ Passing

## 🔧 Code Fixes
(Ready-to-paste code snippets for each issue)
```
