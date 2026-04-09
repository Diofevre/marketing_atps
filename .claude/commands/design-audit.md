---
description: Full design quality audit of a component or section. Reviews visual hierarchy, spacing, animations, accessibility, and TypeScript quality. Pass a file path or component name.
allowed-tools: Read, Grep, Glob, Bash
argument-hint: <file path or component name>
---

Perform a comprehensive design + code quality audit for: **$ARGUMENTS**

## Step 1 — Find and Read the File

If a component name was given (e.g. "Hero" or "Pricing"), find it:
- Search in `components/sections/`, `components/layout/`, `components/news/`
- Read the full file content

Also read `lib/motion.tsx` for animation context and `app/globals.css` for global styles.

## Step 2 — Audit Criteria

### Visual Design (1–10)
- [ ] Typography hierarchy: clear size/weight contrast between heading levels
- [ ] Spacing: generous whitespace, consistent padding scale
- [ ] Color usage: stays within project palette, sufficient contrast
- [ ] Border radius: consistent rounded values from Tailwind scale
- [ ] Shadows/elevation: appropriate for depth hierarchy

### Animation Quality (1–10)
- [ ] Uses variants from `@/lib/motion` (not ad-hoc animate props)
- [ ] Easing: `[0.25, 0.1, 0.25, 1]` cubic-bezier
- [ ] Durations: 0.4s micro / 0.6s standard / 0.8s hero (not too fast/slow)
- [ ] Scroll-triggered: `whileInView` with `viewportSettings` (once: true, margin: "-100px")
- [ ] Stagger: cards in grids use `staggerChildren`
- [ ] Exit animations on conditional renders
- [ ] `useReducedMotion` considered for complex animations

### Component Architecture (1–10)
- [ ] TypeScript: props interface defined before component
- [ ] No `any` types
- [ ] `cn()` for all conditional class merging
- [ ] Import order: React → external → @/ → relative
- [ ] `"use client"` only when actually needed
- [ ] Named export for component

### Accessibility (1–10)
- [ ] Semantic HTML: section, article, button, nav, etc.
- [ ] Alt text on all images
- [ ] Interactive elements keyboard-navigable
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] No `onClick` on non-interactive elements (use button/a)
- [ ] Labels for form inputs

### Code Quality (1–10)
- [ ] No `style={{}}` inline styles
- [ ] No hardcoded pixel values
- [ ] No `console.log` left in code
- [ ] No hardcoded hex colors outside project palette
- [ ] Images use `next/image` with dimensions
- [ ] Icons use Lucide React named imports

## Step 3 — Output Format

```
# Design Audit: [ComponentName]

## Scores
| Category | Score | Notes |
|----------|-------|-------|
| Visual Design | X/10 | ... |
| Animation Quality | X/10 | ... |
| Component Architecture | X/10 | ... |
| Accessibility | X/10 | ... |
| Code Quality | X/10 | ... |
| **Overall** | **X/10** | |

## Critical Issues 🔴
(Must fix — affects UX, accessibility, or correctness)
- Issue description + specific line reference + fix

## Warnings 🟡
(Should fix — affects quality or maintainability)
- Issue description + suggested improvement

## Strengths ✅
(What's done well — reinforce good patterns)
- What's working and why

## Quick Wins 💡
(Easy improvements with high impact)
- Specific change with code snippet
```

Be honest and specific. Line references are required for any issue found.
