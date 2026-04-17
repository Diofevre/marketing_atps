# SEO Roadmap — 90 Days

**Dernière mise à jour** : 2026-04-17
**Contexte** : Freemium relaunch (FREE + €10/mo). Positioning shift vers *"built by student pilots, for student pilots"*. Domaine 15 ans d'autorité, FR + EN.

Ce doc est la feuille de route stratégique pour l'équipe content + SEO. Les changements techniques (JSON-LD, metadata, i18n) sont déjà en prod au moment de la rédaction. Ce qui suit est le **plan d'exécution humain**.

---

## Phase 1 — Landing pages à créer (prio 1, semaines 1-3)

Ces pages capturent des intents commerciaux et informationnels forts. Chacune doit avoir des versions FR + EN avec hreflang, metadata unique, JSON-LD adapté, et 3+ liens internes entrants.

### 1. `/free-atpl-questions`
- **Intent** : informational → transactional (lead magnet)
- **Keywords** : "free ATPL question bank", "ATPL practice questions free", "EASA ATPL sample questions"
- **Difficulté** : faible (peu de concurrence sur le free tier)
- **H1** : "Free ATPL Question Bank: 500+ Questions with Explanations" / "Banque de questions ATPL gratuite : 500+ questions avec explications"
- **Contenu** : 500 questions en accès direct (sans compte), sample par matière, CTA vers FREE signup
- **Schema** : `CreativeWork` + `isAccessibleForFree: true`, `Quiz`
- **Lien entrant** : CTA Hero home, lien footer, card dans `/pricing`

### 2. `/atpl-study-guide`
- **Intent** : informational (pillar content)
- **Keywords** : "ATPL study guide", "how to study for ATPL exam", "ATPL 14 subjects"
- **Difficulté** : moyenne-forte (PilotInstitute, autres gros acteurs)
- **H1** : "Complete ATPL Study Guide: Master All 14 EASA Subjects"
- **Contenu** : pillar page longue, 14 blocs (un par matière) avec résumé + lien vers article détaillé
- **Schema** : `HowTo` avec étapes + `Course`
- **Lien entrant** : hero home secondaire, footer, tous les articles blog liés

### 3. `/compare/bristol-groundschool`
- **Intent** : commercial (bottom funnel)
- **Keywords** : "Bristol Groundschool alternative", "MyATPS vs BGS", "cheaper ATPL platform"
- **Difficulté** : moyenne (BGS a du DA mais niche spécifique)
- **H1** : "MyATPS vs Bristol Groundschool: Honest Comparison for Student Pilots"
- **Contenu** : table de comparaison honnête prix + features + engagement, testimonials d'élèves ayant utilisé les deux
- **Schema** : `Article` + `FAQPage` des questions fréquentes sur la comparaison
- **Lien entrant** : `/pricing`, footer

### 4. `/compare/airhead`
Même structure que BGS. Keyword "Airhead alternative".

### 5. `/atpl-exam-tips`
- **Intent** : informational (confidence builder, brand-building)
- **Keywords** : "ATPL exam tips", "how to pass ATPL first time", "ATPL study strategy"
- **Difficulté** : faible à moyenne
- **H1** : "14 Tips to Pass Your ATPL on the First Attempt (From Students Who Did)"
- **Contenu** : 14 tips authentiques écrits *par* des élèves ayant réussi, chaque tip illustré
- **Schema** : `FAQPage` + `Article`

### 6. `/atpl-certification-path` (priorité 2)
- Eligibility + timeline vers ATPL
- Keywords : "ATPL prerequisites", "how to become airline pilot"

---

## Phase 2 — Schemas JSON-LD à ajouter (semaines 2-4)

| Schema | Où | Impact |
|---|---|---|
| `Course` | `/atpl-study-guide`, futures pages /guides/[subject] | Rich card cours dans SERP |
| `Organization` enrichi | `app/[locale]/layout.tsx` — ajouter `foundingDate: "2011"`, `founders`, `sameAs` (LinkedIn, X), `address` | Knowledge panel Google |
| `HowTo` | `/atpl-study-guide`, `/atpl-exam-tips` | Étapes dans SERP |
| `VideoObject` | Si démos produit vidéo | Rich result vidéo |
| `Review` / `AggregateRating` enrichi | `/pricing` (déjà partiel), pages guides | Étoiles en SERP |
| `FAQPage` per-page | Chaque landing doit avoir sa propre FAQ schema, pas juste la globale | Featured snippets Q&A |
| `BreadcrumbList` | Toutes les landing non-home | Rich breadcrumbs |
| `EducationalOccupationalProgram` | Layout global | Niche educational visibility |

---

## Phase 3 — Long-tail keywords à capturer (semaines 4-8)

Liste priorisée (volume estimé × compétition). Chaque keyword → 1 page ou 1 article blog.

| # | Query | Vol. estimé /mo | Compet. | Page cible |
|---|---|---|---|---|
| 1 | "how to pass ATPL first time" | 800-1200 | Moyen | `/atpl-exam-tips` |
| 2 | "ATPL 14 subjects overview" | 600-900 | Moyen | `/atpl-study-guide` |
| 3 | "best free ATPL question bank 2026" | 500-700 | Moyen-Fort | `/free-atpl-questions` |
| 4 | "cheap alternative to Bristol Groundschool" | 400-600 | Fort | `/compare/bristol-groundschool` |
| 5 | "ATPL self-study vs ground school" | 450-650 | Moyen | Nouveau `/atpl-self-study-guide` |
| 6 | "ATPL study plan 6 months" | 350-500 | Faible | `/atpl-study-guide` + blog dédié |
| 7 | "EASA ATPL exam pass rate" | 300-450 | Faible-Moyen | Blog dédié |
| 8 | "ATPL Navigation subject guide" | 250-400 | Faible | `/guides/atpl-navigation` |
| 9 | "ATPL cost comparison" | 280-420 | Moyen | `/compare/bristol-groundschool` |
| 10 | "how long does ATPL take to study" | 320-480 | Faible | `/atpl-study-guide` |
| 11 | "myatps reviews" | 100-200 | — | Enrichir testimonials + `/pricing` |
| 12 | "ATPL mock exam practice online" | 180-300 | Moyen | CTA sur `/free-atpl-questions` |
| 13 | "ATPL aviation knowledge areas" | 140-220 | Faible | `/atpl-study-guide` |
| 14 | "Airhead vs MyATPS ATPL" | 80-150 | Faible | `/compare/airhead` |
| 15 | "ATPL prerequisites flight hours" | 160-260 | Faible | `/atpl-certification-path` |

---

## Phase 4 — Architecture de linking interne

### Hubs (pages qui accumulent le link juice)

1. **`/atpl-study-guide`** — hub pilier informational
   - Liens sortants : 14 guides par matière, `/atpl-exam-tips`
   - Liens entrants : hero home secondaire, footer, tous les articles blog

2. **`/pricing`** — hub commercial (déjà fort)
   - Liens sortants : pages compare, `/free-atpl-questions`
   - Liens entrants : nav primaire, footer, CTA de chaque landing

3. **`/blog`** — hub éditorial
   - Liens sortants : articles individuels
   - Liens entrants : nav, footer, articles liés entre eux

### Spokes (pages satellites à connecter aux hubs)
- `/compare/bristol-groundschool` ← entrant depuis `/pricing`, `/atpl-exam-tips`
- `/free-atpl-questions` ← entrant depuis hero, `/pricing`, chaque guide
- `/atpl-exam-tips` ← entrant depuis `/atpl-study-guide`, blog articles

### Règles anchor text
- Privilégier les anchors descriptives : *"Read our complete ATPL study guide"* (pas *"Learn more"*)
- Varier les anchors autour d'un même lien (important pour ne pas looker over-optimized)
- Interlink latéral entre articles blog de la même thématique

---

## Phase 5 — Technical SEO quick wins

Check et fix :
1. **Alt text systématique** sur tous les `<Image>` — actuellement certains sont vides. Créer namespace `images.*` dans i18n.
2. **OG images dynamiques par page** — utiliser `opengraph-image.tsx` avec `ImageResponse` pour générer des OG visuels différents par route.
3. **Breadcrumbs partout** (pas juste `/pricing`) — factoriser en composant `<BreadcrumbNav />`.
4. **Reduced motion** — respect `prefers-reduced-motion` dans `lib/motion.tsx` pour accessibilité + Core Web Vitals.
5. **Internal 404 monitoring** — check régulièrement GSC "Pages not indexed" pour voir si des liens cassés émergent.

---

## Phase 6 — Off-site & backlinks (sans spam)

Google donne énormément de poids aux backlinks d'autorité. Voici les vraies opportunités :

### Annuaires aviation à soumettre
- **AOPA Europe** — demander inscription dans leur liste de ressources pilotes
- **EASA.europa.eu** — si une page de ressources étudiantes existe, candidater
- **Pilot Career News** (UK) — guest post
- **Flyer Magazine** (UK) — advertising + mention éditoriale
- **Aeroteam / Pilotes Privés** (FR) — forum + annuaire

### Forums / communautés (contribuer, pas spammer)
- **r/flying** (Reddit) — répondre aux questions ATPL, mention uniquement quand pertinent
- **r/EASA_PPL** — idem
- **PPrune.org** — signature forum + profil entreprise, contribuer aux threads
- **Reddit r/aviationcareers** — AMAs possibles

### B2B2C — partenariats écoles de pilotage
**Pitch** : *"MyATPS est gratuit pour vos élèves (plan FREE) et 10€/mo pour l'upgrade. Liste-nous dans votre page ressources étudiants, on vous mentionne dans la nôtre."*

Écoles cibles EU :
- CAE Oxford Aviation Academy (UK)
- L3Harris Flight Academy (UK)
- Breda Aviation Academy (ES)
- Ecole Nationale de l'Aviation Civile (FR)
- EASA-approved schools list sur easa.europa.eu

### HARO (Help A Reporter Out)
- Inscription gratuite sur helpareporter.com
- Répondre aux requêtes sur "aviation training", "online learning for pilots", "ATPL affordability"
- ROI : backlinks haute autorité (Forbes, TechCrunch, niche media)

### Guest posts ciblés
1. PilotInstitute.com (blog aviation populaire)
2. FlightChops (YouTube + blog)
3. Pilot Career News UK
4. Aeroclass.org

---

## Phase 7 — Calendrier 90 jours

### Semaines 1-2 : Quick wins
- [x] Positioning "built by student pilots" déployé (hero, about, footer, metadata)
- [ ] Alt text audit + fix sur tous les `<Image>` du home
- [ ] Organization schema enrichi (`foundingDate`, `sameAs`, etc.)
- [ ] Inscription HARO
- [ ] Setup monitoring Google Search Console (vérifier ownership + submit sitemap)

### Semaines 3-6 : Pages + schemas
- [ ] Créer `/free-atpl-questions` (FR + EN)
- [ ] Créer `/atpl-study-guide` (FR + EN) — pillar
- [ ] Créer `/compare/bristol-groundschool` (FR + EN)
- [ ] Créer `/atpl-exam-tips` (FR + EN)
- [ ] Breadcrumb component partout, JSON-LD associé

### Semaines 7-12 : Content + backlinks
- [ ] 1 article de blog/semaine (voir `docs/content-strategy.md`)
- [ ] Pitch 5 écoles de pilotage pour partenariat B2B2C
- [ ] 3 guest post pitches (PilotInstitute, etc.)
- [ ] Contribuer activement à r/flying, PPrune (5 posts/mois, sans spam)
- [ ] Répondre à 2-3 pitch HARO/semaine

---

## Métriques de succès (à suivre dans GSC + GA4)

| KPI | Baseline | Target W12 |
|---|---|---|
| Pages indexées | ~50 | ~80+ |
| Trafic organique | ~500/mo | 1500/mo |
| Keywords rankés top-10 | ~15 | ~50 |
| Backlinks DR>20 | ~20 | ~50 |
| CTR moyen SERP | 1.2% | 2.5% |
| Conversions FREE signup depuis organic | baseline | +300% |

---

## Ce qu'on NE FAIT PAS (explicitement)

- **Auto-création de comptes Yelp / répertoires généralistes** : Yelp est pour commerces locaux, pas SaaS international. ToS violation + risque de ban.
- **Paid backlinks** : jamais. Google pénalise, et notre autorité organique historique est notre atout.
- **AI-generated content en masse** : chaque article doit être écrit ou fortement retravaillé par un humain. La détection Google devient rapide, et notre angle "student-written" serait brisé par du content AI générique.
- **Keyword stuffing** : ne pas saturer les metadata. Priorité à la clarté utilisateur.
- **Cloaking / doorway pages** : évidemment.

---

## Ressources & outils recommandés

- **Google Search Console** (gratuit, monitoring indexation/clicks)
- **Ahrefs** ou **Semrush** (~€100/mo, keyword research + competitor analysis)
- **Screaming Frog SEO Spider** (gratuit jusqu'à 500 URLs, crawl technique)
- **Schema Markup Validator** (schema.org — vérifier les JSON-LD avant deploy)
- **PageSpeed Insights** (Core Web Vitals)
- **HARO** (helpareporter.com, backlinks presse)
