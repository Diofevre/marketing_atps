---
name: refactor-component
description: Refactor a React component for clarity, performance, and TypeScript quality. Runs in isolated component-architect context. Use when a component is too large, poorly typed, or architecturally messy.
argument-hint: <file path>
context: fork
agent: component-architect
effort: high
paths:
  - "components/**/*.tsx"
allowed-tools: Read, Edit, Grep, Glob, Bash
---

# Component Refactor — $ARGUMENTS

You are the **component-architect** agent. Refactor the target component with surgical precision.

## Step 1 — Read and Understand

1. Read `$ARGUMENTS` fully
2. Read `lib/motion.tsx` for animation patterns
3. Read `lib/utils.ts` for `cn()` usage
4. Check related components to understand the visual context

## Step 2 — Identify Problems

Scan for these refactor targets:

**TypeScript**
- Props interface missing or incomplete → define `interface ComponentNameProps`
- `any` types → replace with specific types
- Missing return type on complex functions

**Component Structure**
- Component > 200 lines → candidate for splitting
- Repeated JSX patterns (>3 times) → extract sub-component or map
- Magic strings/numbers → extract as constants
- Complex inline logic in JSX → extract to variables or functions

**Framer Motion**
- Ad-hoc `animate={{ opacity: 0 }}` → use variants from `lib/motion.tsx`
- Missing `viewportSettings` on scroll triggers
- `initial={{ opacity: 0 }}` (not `0.001`) → fix for flash prevention

**React Patterns**
- `useEffect` for derived state → remove, compute inline
- Missing `useCallback` on handlers passed to children
- Unnecessary `"use client"` → remove if no hooks/browser APIs used
- Incorrect dependency arrays in `useEffect`/`useMemo`

**Tailwind**
- Conditional classes without `cn()` → wrap in `cn()`
- `style={{}}` → convert to Tailwind utilities
- Repeated class strings → extract to `const classes = cn(...)`

## Step 3 — Refactor Plan

Before editing, list:
1. What will be changed and why
2. What will NOT be changed (preserve existing functionality)
3. Whether any sub-components need to be extracted

## Step 4 — Execute

Apply all refactors. The component must:
- Compile without TypeScript errors
- Look and behave identically to the original
- Be strictly better in quality

## Step 5 — Summary

List every change made with a one-line reason.
