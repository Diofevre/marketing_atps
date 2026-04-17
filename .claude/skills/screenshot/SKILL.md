---
name: screenshot
description: Prend un screenshot de la page live via Puppeteer MCP pour analyser visuellement le rendu actuel. Nécessite npm run dev lancé sur localhost:3000. Usage : /screenshot ou /screenshot hero
argument-hint: "[section? : hero|bento|about|pricing|...]"
disable-model-invocation: true
allowed-tools: Bash
---

# /screenshot $ARGUMENTS

Prend un screenshot de http://localhost:3000 pour analyse visuelle.

## Prérequis

- `npm run dev` lancé dans un terminal séparé
- MCP `puppeteer` connecté (vérifier avec `/mcp`)

## Actions

1. Si `$ARGUMENTS` est vide → screenshot full page
2. Si section fournie → navigate vers `http://localhost:3000/#$ARGUMENTS`
3. Screenshot de la viewport courante
4. Analyse : contraste, alignement, espacement, responsive

## Après le screenshot

Signaler :
- Les éléments visuellement cassés
- Les problèmes de contraste (WCAG AA minimum)
- Les débordements horizontaux
- Les espacements incohérents
