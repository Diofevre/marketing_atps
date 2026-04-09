---
name: design-review
description: Deep design review of a React component — visual hierarchy, spacing, Tailwind usage, Framer Motion quality, accessibility, and TypeScript. Runs in an isolated design-genius agent context for maximum design intelligence.
argument-hint: <file path or component name>
context: fork
agent: design-genius
effort: high
paths:
  - "components/**/*.tsx"
  - "app/**/*.tsx"
allowed-tools: Read, Grep, Glob, Bash
---

# Design Review — $ARGUMENTS

You are the **design-genius** agent. Perform an exhaustive design and code quality review.

## 1 — Read Everything First

- Read the target file: `$ARGUMENTS`
- Read `lib/motion.tsx` to understand available animation variants
- Read `app/globals.css` for global styles
- Check `components/ui/container.tsx` if the component uses containers

## 2 — Evaluate Against These Standards

### Visual Hierarchy (weight 30%)
- Is there a clear title → subtitle → body → CTA flow?
- Are font sizes sufficiently contrasted? (e.g. 48px title vs 18px body)
- Does whitespace create breathing room? (`py-24 md:py-32` for sections)
- Is the visual weight guiding the eye in the right direction?

### Spacing & Rhythm (weight 20%)
- Tailwind spacing scale only — no arbitrary values
- Container max-width consistent with rest of site
- Grid gaps appropriate: `gap-6 md:gap-8` for cards

### Framer Motion (weight 20%)
- Using variants from `@/lib/motion` or adding new ones there
- Easing: `[0.25, 0.1, 0.25, 1]` standard
- `viewportSettings` for scroll triggers
- Stagger on card grids
- Exit animations on conditional renders
- `useReducedMotion` for heavy animations

### Tailwind & Code Quality (weight 15%)
- `cn()` for ALL conditional classes
- No `style={{}}` inline styles
- No hardcoded hex values outside project palette (`#F7F6F7`, `#1b0c25`)
- No `console.log`
- No `any` TypeScript types
- `next/image` with dimensions for all images
- Lucide React for icons

### Accessibility (weight 15%)
- Semantic HTML: `<section>`, `<article>`, `<button>`, `<a>`
- `alt` text on all images
- Interactive elements keyboard-navigable
- Color contrast ≥ 4.5:1

## 3 — Output Format

```
# Design Review: [ComponentName]

## Scores
| Category | Score | Key Finding |
|----------|-------|-------------|
| Visual Hierarchy | X/10 | ... |
| Spacing & Rhythm | X/10 | ... |
| Framer Motion | X/10 | ... |
| Code Quality | X/10 | ... |
| Accessibility | X/10 | ... |
| **OVERALL** | **X/10** | |

## 🔴 Critical (fix now)
- [line N] Issue → specific fix with code snippet

## 🟡 Warnings (fix soon)
- [line N] Issue → suggestion

## ✅ What's excellent
- Specific praise with reasoning

## 💡 Upgrade suggestions
- Concrete improvement with code snippet
```

Provide line numbers for every finding. Be a demanding but fair design critic.
