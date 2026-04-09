---
description: Create a new world-class landing page section from scratch. Pass a description of what the section should convey (e.g. "feature highlights with icons" or "stats counter section")
allowed-tools: Read, Edit, Write, Bash, Grep, Glob
argument-hint: <section description>
---

You are creating a new landing page section for the MyATPS marketing site.

**User request**: $ARGUMENTS

## Step 1 — Understand the Context

Read these files first to understand the project patterns:
- `lib/motion.tsx` — available animation variants and reusable components
- `components/sections/Hero.tsx` — reference for animation + structure patterns  
- `components/sections/Bento.tsx` — reference for card-based layouts
- `app/globals.css` — global styles

## Step 2 — Design the Section

Apply these design principles:
- **Generous whitespace**: `py-24 md:py-32` for section padding
- **Strong visual hierarchy**: overline label → title → description → content → CTA
- **Scroll-triggered animations**: `whileInView` with `viewportSettings`
- **Staggered reveals**: use `StaggerContainer` for grids of cards
- **Mobile-first**: design for small screen first, enhance with `md:` `lg:` prefixes

Color palette:
- Background variations: `bg-[#F7F6F7]` / `bg-white` / `bg-[#1b0c25]` (dark)
- Primary text: `text-[#1b0c25]`
- Muted text: `text-[#1b0c25]/60`
- Borders: `border-[#1b0c25]/10`
- Accents: use sparingly

## Step 3 — Write the Component

File location: `components/sections/[SectionName].tsx`

Template to follow:
```tsx
"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { FadeInUp, StaggerContainer, viewportSettings } from "@/lib/motion"
// Import specific variants as needed

interface SectionNameProps {
  className?: string
}

export function SectionName({ className }: SectionNameProps) {
  return (
    <section className={cn("py-24 md:py-32", className)}>
      <Container>
        <FadeInUp className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1b0c25]/40 mb-4">
            Section Label
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1b0c25] leading-[1.1] tracking-tight">
            Compelling Headline That<br />
            <span className="text-[#1b0c25]/50">Makes People Want to Continue</span>
          </h2>
          <p className="mt-5 text-lg text-[#1b0c25]/60 leading-relaxed">
            Supporting description that clarifies and builds on the headline.
          </p>
        </FadeInUp>

        {/* Main content area */}
      </Container>
    </section>
  )
}
```

## Step 4 — Add New Animation Variants (if needed)

If the section requires new animation patterns, add them to `lib/motion.tsx` following the existing pattern:
```tsx
// Section name animation
export const sectionNameVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}
```

## Step 5 — Output

1. Create the new section file at `components/sections/[SectionName].tsx`
2. Show a summary of design decisions made
3. Mention how to add it to the main page (`app/(landing)/layout.tsx` or home page)

Make it exceptional — this is a premium product targeting pilots. The design should feel polished, professional, and inspiring.
