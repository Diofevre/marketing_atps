---
name: redesign
description: Lance le redesign complet d'une section de la page marketing. Lis le fichier source, analyse les problèmes (hauteurs fixes, espacement, contraste, mobile), prends un screenshot si le dev server tourne, puis implémente les corrections. Usage direct : /redesign hero
argument-hint: "[section: hero|bento|product|about|benefits|testimonials|work|pricing|faqs|nav|footer]"
allowed-tools: Read Edit Glob Grep Bash
---

# /redesign $ARGUMENTS

Lance le redesign de la section `$ARGUMENTS` de la page marketing Diofevre ATPS.

## Mapping section → fichier

| Argument | Fichier source |
|----------|---------------|
| `hero` | `components/sections/Hero.tsx` |
| `bento` | `components/sections/Bento.tsx` |
| `product` | `components/sections/ProductOverview.tsx` |
| `about` | `components/sections/About.tsx` |
| `benefits` | `components/sections/KeyBenefits.tsx` |
| `testimonials` | `components/sections/Testimonials.tsx` |
| `work` | `components/sections/Work.tsx` |
| `pricing` | `components/sections/Pricing.tsx` |
| `faqs` | `components/sections/Faqs.tsx` |
| `nav` | `components/layout/Navigation.tsx` |
| `footer` | `components/layout/Footer.tsx` |

## Étapes obligatoires

1. **Lire** le fichier source de la section
2. **Analyser** : hauteurs hardcodées, espacements, contraste WCAG, hiérarchie visuelle, mobile-first
3. **Si une image Figma est collée** dans le chat → la lire visuellement et extraire les tokens (couleurs, tailles, espacements)
4. **Lister** les problèmes trouvés avec justification UX
5. **Implémenter** les corrections
6. **Vérifier** les clés i18n dans `messages/en.json` et `messages/fr.json`

## Règles

- Toujours utiliser `useTranslations("namespace")` — jamais de strings hardcodées
- Préserver les variants Framer Motion de `lib/motion.ts`
- Tailwind CSS v4 : classes utilitaires directement, jamais `@apply`
- `next/image` avec `width` + `height` explicites
- Mobile-first : tester 375px → 768px → 1440px
- Un composant à la fois
