---
description: Generate structured content and metadata for a new blog or news article. Pass the topic/title and type (blog or news).
allowed-tools: Read, Write, Glob, Grep
argument-hint: <blog|news> <article title or topic>
---

Create a new content entry for the MyATPS marketing site.

**Request**: $ARGUMENTS

## Step 1 — Read the Data Structure

Read the existing blog/news data files in `lib/api/` to understand the content schema.
Also check `components/sections/Blog.tsx` and `components/sections/NewsList.tsx` for how content is rendered.

## Step 2 — Generate the Content

Create a comprehensive article appropriate for the MyATPS audience — student pilots preparing for ATPL exams. The content should be:

- **Educational**: ATPL-relevant topics, exam tips, aviation concepts
- **Authoritative**: Written from the perspective of experienced pilots/instructors
- **SEO-optimized**: Target ATPL-related keywords naturally
- **Well-structured**: H2/H3 headings, short paragraphs, bullet points where appropriate

## Step 3 — Metadata to Generate

For each article, produce:
```typescript
{
  slug: "kebab-case-slug",
  title: "Full Article Title",
  excerpt: "150–160 character excerpt with primary keyword",
  content: "Full MDX/HTML content...",
  category: "Study Tips | Exam Prep | Aviation News | Platform Updates",
  tags: ["atpl", "exam", ...],
  publishedAt: "2026-04-08",
  readTime: "X min read",
  author: {
    name: "MyATPS Team",
    role: "Aviation Expert"
  },
  seo: {
    title: "SEO Title | MyATPS",
    description: "Meta description 150–160 chars",
    ogImage: "/images/blog/og-image-slug.png"
  }
}
```

## Step 4 — Add to Data File

Write the entry to the appropriate data file following the existing schema exactly.
