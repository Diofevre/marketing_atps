---
description: Add or improve Framer Motion animations on a component. Analyzes current animations and enhances them with scroll reveals, stagger effects, hover interactions, and entrance animations.
allowed-tools: Read, Edit, Grep, Glob
argument-hint: <file path or component name>
---

Enhance the Framer Motion animations for: **$ARGUMENTS**

## Step 1 — Read and Understand

1. Read the target component file
2. Read `lib/motion.tsx` to understand all available variants and utilities
3. Identify what animations currently exist (if any)

## Step 2 — Animation Enhancement Strategy

Apply these animation patterns based on the component type:

### Section Containers
```tsx
// Wrap section content in scroll-triggered reveal
import { FadeInUp, viewportSettings } from "@/lib/motion"

<FadeInUp className="text-center mb-16">
  <h2>...</h2>
</FadeInUp>
```

### Card Grids
```tsx
// Stagger cards as they enter viewport
import { StaggerContainer, staggerContainer } from "@/lib/motion"
import { motion } from "framer-motion"

<StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <motion.div variants={bentoCardVariants}>Card 1</motion.div>
  <motion.div variants={bentoCardVariants}>Card 2</motion.div>
  <motion.div variants={bentoCardVariants}>Card 3</motion.div>
</StaggerContainer>
```

### Hero Titles (word-by-word reveal)
```tsx
import { motion } from "framer-motion"
import { staggerContainer, heroTitleWordVariants } from "@/lib/motion"

<motion.h1
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
>
  {"Pass your ATPL".split(" ").map((word, i) => (
    <motion.span key={i} variants={heroTitleWordVariants} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  ))}
</motion.h1>
```

### Interactive Hover Effects
```tsx
// Cards with hover lift
<motion.div
  variants={bentoCardVariants}
  whileHover={{ y: -4, transition: { duration: 0.2 } }}
  className="cursor-pointer"
>

// Buttons with subtle press
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15 }}
>
```

### Conditional/Toggle Elements
```tsx
import { AnimatePresence, motion } from "framer-motion"

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### Counters / Number Animations
```tsx
import { useMotionValue, useSpring, useInView } from "framer-motion"

// Animate a number from 0 to target when in view
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1500 })
  
  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])
  
  return <motion.span ref={ref}>{spring}</motion.span>
}
```

## Step 3 — New Variants (if needed)

If the component needs animation patterns not in `lib/motion.tsx`, add them there:
```tsx
// [Section name] animations
export const newVariantName: Variants = {
  hidden: { opacity: 0, y: 30 },
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

## Step 4 — Apply Changes

- Edit the component file with enhanced animations
- If new variants were created, also edit `lib/motion.tsx`
- Ensure `"use client"` is at the top if adding client-side animations
- Preserve all existing functionality — only ADD animations, don't change logic

## Rules
- Standard easing: ALWAYS `[0.25, 0.1, 0.25, 1]`
- Scroll triggers: ALWAYS `viewportSettings` (once: true, margin: "-100px")
- Duration range: 0.2s (micro) → 0.6s (standard) → 0.8s (hero)
- NEVER animate layout properties (width, height, top, left) — use transform instead
- `opacity: 0.001` instead of `opacity: 0` for initial state (avoids flash)
