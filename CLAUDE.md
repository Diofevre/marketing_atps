# CLAUDE.md — Agent Redesign · marketing_atps

## Stack technique

- **Framework** : Next.js 16 + React 19 + TypeScript
- **Style** : Tailwind CSS v4 (pas de `tailwind.config.js` — config inline dans `globals.css`)
- **Animations** : Framer Motion 12
- **i18n** : next-intl v4 (EN/FR) — toutes les chaînes via `useTranslations()` / `getTranslations()`
- **UI** : shadcn/ui + radix-ui + lucide-react
- **Dev server** : `npm run dev` → http://localhost:3000

## Palette de couleurs (NE PAS MODIFIER sans accord)

| Variable | Valeur | Usage |
|----------|--------|-------|
| Brand dark | `#1b0c25` | Fond sombre, texte principal |
| Brand pink | `#c34f96` / `#ff49d4` | Accents, gradients |
| Brand violet | `#d37bff` / `#80a9fc` | Gradients secondaires |
| White | `rgba(255,255,255,0.x)` | Fonds glassmorphism |

## Architecture des sections (page home)

```
app/[locale]/page.tsx
├── Navigation        → components/layout/Navigation.tsx
├── Hero              → components/sections/Hero.tsx
├── Bento             → components/sections/Bento.tsx
├── ProductOverview   → components/sections/ProductOverview.tsx
├── About             → components/sections/About.tsx
├── KeyBenefits       → components/sections/KeyBenefits.tsx
├── Testimonials      → components/sections/Testimonials.tsx
├── Work              → components/sections/Work.tsx
├── Pricing           → components/sections/Pricing.tsx
├── Faqs              → components/sections/Faqs.tsx
├── BlogSection       → components/sections/Blog.tsx
└── Footer            → components/layout/Footer.tsx
```

## Règles absolues pour tout redesign

1. **Jamais casser l'i18n** — toujours `useTranslations("namespace")` ou `getTranslations()`, jamais de string hardcodée visible
2. **Préserver les animations Framer Motion** — ne pas supprimer les variants existants dans `lib/motion.ts`
3. **Mobile-first** — vérifier les breakpoints `sm:` / `lg:` sur chaque modification
4. **Tailwind v4** — pas de `@apply`, utiliser des classes utilitaires directement
5. **Images** : toujours `next/image` avec `width` + `height` explicites
6. **Pas de `new PrismaClient()`** dans ce repo (marketing only, pas de DB directe)

## Workflow redesign (ordre recommandé)

1. Lire le fichier source de la section cible
2. Identifier les problèmes : hauteurs fixes, espacements incohérents, contraste, hiérarchie
3. Proposer les changements avec justification UX
4. Implémenter section par section, jamais en masse
5. Vérifier sur mobile (375px) ET desktop (1440px)

## Points d'amélioration identifiés

- **Hero** : `lg:h-[1236px]` hardcodé → utiliser `min-h` + flex
- **Bento** : `min-h-[1664px]` → trop rigide, passer en auto
- **Couleurs** : variables CSS manquantes dans `:root` pour brand colors
- **Typography** : échelle non systématique (mélange px fixes et rem)

## MCP disponibles dans cette session

| MCP | Commande | Usage redesign |
|-----|----------|----------------|
| `figma` | `figma_get_file`, `figma_get_node` | Lire maquettes Figma → clé API à configurer |
| `puppeteer` | `puppeteer_navigate`, `puppeteer_screenshot` | Screenshots live de http://localhost:3000 |
| `sequential-thinking` | `create_thinking_sequence` | Analyse structurée avant implémentation |
| `github` | GitHub API | PRs, branches, issues |

## Assets disponibles

```
public/images/
├── bgHero.png          # Background hero section
├── bgCha.png           # Background chat card
├── scare1.png / scare2.png  # Éléments décoratifs flottants
├── imageAd.png         # Bento card 1 (Quiz)
├── imageSm.png         # Bento card 2 (Dictionary)
├── imageData.png       # Bento card 3 (Sharing)
├── imagePred.png       # Bento card 4 (Library)
└── avatars + testimonials images
```

## Commandes utiles

```bash
npm run dev       # Dev server
npm run build     # Build production
npm run lint      # ESLint
```
