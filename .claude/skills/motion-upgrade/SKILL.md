---
name: motion-upgrade
description: Upgrade all Framer Motion animations in a component to the project's elite animation standards. Auto-activates when working on components with basic or missing animations. Adds scroll reveals, stagger effects, hover interactions, and word-by-word title reveals.
argument-hint: <file path>
context: fork
agent: design-genius
effort: high
paths:
  - "components/sections/*.tsx"
  - "components/layout/*.tsx"
allowed-tools: Read, Edit, Grep, Glob
---

# Motion Upgrade — $ARGUMENTS

You are the **design-genius** agent. Upgrade the Framer Motion animations to the project's elite standard.

## Step 1 — Read Context

1. Read `$ARGUMENTS`
2. Read ALL of `lib/motion.tsx` — understand every available variant
3. Identify the component type: section / card / layout / hero

## Step 2 — Assess Current State

Categorize each animated or unanimated element:
- **Missing animation** — static elements that should reveal on scroll
- **Weak animation** — basic fade without proper variants
- **Wrong easing** — not using `[0.25, 0.1, 0.25, 1]`
- **Missing stagger** — card grids without stagger effect
- **Missing hover** — interactive elements without `whileHover`
- **No exit** — conditional elements without `exit` variant

## Step 3 — Apply Elite Animation Patterns

### Section Title Block
```tsx
<FadeInUp className="text-center mb-16">
  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1b0c25]/40 mb-4">
    Label
  </p>
  <h2>Title</h2>
</FadeInUp>
```

### Hero Title (word-by-word reveal with blur)
```tsx
<motion.h1 initial="hidden" animate="visible" variants={staggerContainer}>
  {"Pass your ATPL exams".split(" ").map((word, i) => (
    <motion.span key={i} variants={heroTitleWordVariants} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  ))}
</motion.h1>
```

### Card Grid with Stagger
```tsx
<StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={bentoCardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-[#1b0c25]/8 p-6"
    >
      {/* content */}
    </motion.div>
  ))}
</StaggerContainer>
```

### Scroll-Triggered Section
```tsx
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={viewportSettings}
  variants={fadeInVariants}
>
```

### Toggle/Conditional with AnimatePresence
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
```

### Counter Animation
```tsx
// Use motion value + spring for number counters
const count = useMotionValue(0)
const spring = useSpring(count, { duration: 1200, bounce: 0 })
// Set count.set(targetValue) when in view
```

## Step 4 — Add New Variants (if needed)

For new patterns, add to `lib/motion.tsx`:
```tsx
// [ComponentName] animations
export const newVariantName: Variants = {
  hidden: { opacity: 0.001, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
}
```

## Rules
- `opacity: 0.001` NOT `0` for initial (prevents flash)
- ALWAYS `viewportSettings` for scroll triggers
- NEVER animate `width`/`height` directly — use `scaleX`/`scaleY` or height trick
- All new variants go to `lib/motion.tsx` — NEVER inline in the component
- Keep `"use client"` at the top
- Preserve all business logic — only enhance animations

## Output
1. Apply all changes to the component
2. Update `lib/motion.tsx` if new variants were added
3. List every animation added/upgraded with a one-line rationale
