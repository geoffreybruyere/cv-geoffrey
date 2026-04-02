# CLAUDE.md — bruyere.cc

## Projet
Site CV personnel de Geoffrey Bruyère — one-page, state of the art, vibe coded.
Objectif : montrer qui je suis et que je maîtrise les outils IA de développement.

## Stack
- Astro (output: static)
- Tailwind v4
- Motion (animations au scroll)
- Lucide (icônes)
- Google Fonts : Rufina + Figtree
- Déployé sur Cloudflare Pages via GitHub (push = deploy automatique)

## Commandes
- Développement local : `npm run dev`
- Build de vérification : `npm run build`
- Preview build local : `npm run preview`
- Deploy : `git push origin main` → Cloudflare Pages build automatique

## Structure du projet
```
src/
  pages/
    index.astro          → page unique, importe toutes les sections
  components/
    Hero.astro
    Manifeste.astro
    Parcours.astro
    Competences.astro
    Chiffres.astro
    SideProjects.astro
    Contact.astro
  layouts/
    Layout.astro         → <head>, fonts, dark mode toggle, smooth scroll
  styles/
    global.css           → variables CSS, reset minimal
public/
  og/                    → image Open Graph (1200x630)
```

## Charte graphique

### Palette
| Rôle | Hex |
|---|---|
| Fond principal | #FCFCFA |
| Fond secondaire | #EEEEE8 |
| Texte principal | #141210 |
| Accent jaune | #FEFE7D |
| Accent foncé (labels) | #484800 |
| Warm silver (secondaire) | #ACACAA |

### Typographies
- **Rufina** — serif, titres et chiffres clés — weight 400 et 700
- **Figtree** — géométrique, corps et UI — weight 300, 500, 600

### Règles visuelles
- Nom hero : Rufina 700, très grand (clamp 3rem → 7rem), #141210
- Labels de section : Figtree 500, UPPERCASE, lettrespace large, #484800
- Eyebrow / badge statut : précédé d'un filet horizontal #FEFE7D 1.5px
- Accroche / statement : bordure gauche 2px #FEFE7D + padding-left
- CTA principal : fond #FEFE7D, texte #141210, Figtree 600 UPPERCASE
- Chiffres clés : Rufina 700, fond #FEFE7D, border-radius 2px
- Maximum 1 CTA primaire par écran

## Dark mode
- Toggle sur l'icône lune/soleil dans le header
- Implémenté via classe `.dark` sur `<html>`
- Script inline dans Layout.astro pour éviter le flash au chargement
- Variables CSS distinctes pour light et dark dans global.css

## Animations
- Toutes les animations via **Motion** (pas de CSS keyframes custom)
- Fade in + translateY au scroll sur chaque section
- Stagger sur les cards et listes
- Smooth scroll via CSS `scroll-behavior: smooth`

## Contraintes Cloudflare Pages
- `output: 'static'` obligatoire dans astro.config.mjs
- Pas de Node.js runtime APIs (fs, path, crypto...)
- Pas de packages SSR serveur en production
- Variables d'environnement : Cloudflare Pages Dashboard → Settings → Environment Variables
- Jamais dans un fichier .env commité

## Règles de développement
- Un composant Astro par section, nommé avec une majuscule
- Classes Tailwind uniquement — pas de style inline, pas de CSS arbitraire sauf variables
- Jamais modifier global.css sans le signaler explicitement
- Tester `npm run build` avant chaque commit important
- Pas de dépendances inutiles — garder le bundle léger

## Workflow type
1. Créer ou modifier le composant dans `src/components/`
2. L'importer dans `src/pages/index.astro`
3. Vérifier visuellement avec `npm run dev`
4. Builder avec `npm run build` pour valider
5. `git add . && git commit -m "feat: description" && git push origin main`

## Contenu — sections et ordre

### 1. Hero
- Nom : Geoffrey Bruyère (Rufina 700, très grand)
- Badge statut : "En recherche active · Aix-en-Provence"
- Titre : CEO | CMO | Marque, Croissance & Transformation IA
- Positioning statement complet
- CTA : "Me contacter" → ancre #contact

### 2. Manifeste
- Titre : "Les marques et le rêve"
- Texte éditorial — point de vue sur pourquoi les marques cessent de faire rêver
- Ton : personnel, direct, opinionated

### 3. Parcours (timeline verticale)
- Co-fondateur Core Summit | 2026–présent
- CMO Voyage Privé | 2024–2025
- Co-fondateur & CEO BonneGueule | 2010–2022
- Conseil en stratégie | 2009–2011

### 4. Compétences (2 blocs)
- Savoir-faire dirigeant
- IA — Stratégie & exécution

### 5. Chiffres clés (cards accent)
- 12 ans · BonneGueule
- 10M€ CA · +50% CAGR
- NPS 95 · 63% repeat
- 60 collaborateurs · 10 boutiques
- ~1Md€ · Voyage Privé ComEx
- >10M€ budget marketing géré

### 6. Side projects
- Core Summit — lien vers coresummit.fr
- Description courte : séminaire de leadership en montagne pour fondateurs et CEOs

### 7. Contact
- Email : geoffreybruyere@gmail.com
- LinkedIn : lien
- Localisation : Aix-en-Provence / Paris / Monde
