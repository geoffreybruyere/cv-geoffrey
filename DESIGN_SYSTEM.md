# Design System — Geoffrey Bruyère CV

## Palette

| Rôle | Nom | Hex |
|---|---|---|
| Fond principal (light) | Gris ultra-clair | `#FCFCFA` |
| Fond principal (dark) | Quasi-noir chaud | `#141210` |
| Fond secondaire | Gris doux | `#EEEEE8` |
| Fond secondaire (dark) | Noir doux | `#2C2C2A` |
| Texte principal (light) | Quasi-noir chaud | `#141210` |
| Texte principal (dark) | Gris ultra-clair | `#FCFCFA` |
| Texte secondaire (light) | Warm silver | `#A0A09E` |
| Texte secondaire (dark) | Warm silver clair | `#B4B4B2` |
| Texte body (light) | Gris moyen | `#686864` |
| Texte body (dark) | Gris moyen clair | `#A4A4A0` |
| Texte emphase légère (light) | Gris foncé | `#535250` |
| Texte emphase légère (dark) | Gris clair chaud | `#DAD8CE` |
| Accent | Jaune fluo pastel | `#FEFE7D` |
| Foncé de l'accent (labels) | Jaune sombre | `#484800` |

## Typographie

### Rufina — titres & affichage

- **Nom hero** : weight 700, `clamp(2.5rem, 6vw, 3.5rem)`, letter-spacing `-0.02em`
- **Titres de sections** : weight 400, ~`1.05rem`
- **Chiffres clés / KPI** : weight 700, `1.8rem`
- **Logo nav (si sticky)** : weight 400, letter-spacing `0.06em`

### Figtree — corps & UI

- **Eyebrows & labels** : weight 500, `11px`, UPPERCASE, letter-spacing `0.12-0.15em`
- **Sous-titres (CEO · CMO…)** : weight 400, `0.95rem`, letter-spacing `0.02em`
- **Corps de texte** : weight 300, `0.88rem`, line-height `1.75`
- **Corps emphase** : weight 400 (pas de bold 700)
- **CTAs** : weight 600, `11px`, UPPERCASE, letter-spacing `0.1em`
- **Nav links** : weight 500, `11px`, UPPERCASE, letter-spacing `0.12em`
- **Tags & badges** : weight 500, `11px`, UPPERCASE

## Composants récurrents

### Eyebrow (label de statut)

- Filet horizontal `#FEFE7D` 24px × 1.5px + texte uppercase
- Texte : `#ACACAA` (light) / `#888780` (dark)

### Accroche / statement

- `border-left: 2px solid #FEFE7D`
- `padding-left: 1.25rem`
- Texte body `#888780`, emphase `#5F5E5A` (light) / `#D3D1C7` (dark)

### KPI row

- Chiffres Rufina 700 `1.8rem` séparés par des lignes verticales `0.5px #EEEEE8`
- Labels Figtree 300 `11px` `#ACACAA`

### Section label

- Format : `"01 · PARCOURS"`
- Figtree 600 `11px` UPPERCASE letter-spacing `0.15em` color `#484800`

### CTA principal

- Background `#FEFE7D`, texte `#141210`
- Figtree 600 `11px` UPPERCASE letter-spacing `0.1em`
- Précédé d'un bullet `●` (font-size `8px`)
- `border-radius: 2px`

### CTA secondaire

- `border: 0.5px solid #EEEEE8`, fond transparent
- Même typo que CTA principal

## Dark mode

- Toggle via classe sur `<html>` ou `<body>`
- Tous les éléments utilisent des CSS custom properties
- Le jaune accent `#FEFE7D` reste identique dans les deux modes
- Le toggle track passe en `#FEFE7D` quand dark mode est actif

## Spacing

- Max-width contenu : `768px` (centré)
- Padding horizontal : `2rem` (desktop), `1.5rem` (mobile)
- Sections séparées par des lignes `0.5px #EEEEE8`
