# Astro Starter Kit: Minimal

## Dashboard santé privé

La route `/sante` est statique, mais ses données sont servies par Cloudflare Pages Functions. Ajouter ces variables secrètes dans Cloudflare Pages, pour les environnements Preview et Production :

- `SANTE_PASSWORD` : mot de passe de la page, valeur décidée `billy`
- `SANTE_SESSION_SECRET` : chaîne longue et aléatoire, utilisée pour signer la session
- `SUPABASE_HEALTH_URL` : URL du projet Supabase `health`
- `SUPABASE_HEALTH_SECRET_KEY` : service role du projet `health`, jamais exposé au navigateur
- `OPENAI_API_KEY` : clé API OpenAI, utilisée uniquement à la fin d'un import
- `OPENAI_MODEL` : facultatif, défaut `gpt-5-mini`
- `HEALTH_SYNC_TOKEN` : chaîne longue et aléatoire, partagée avec l'import santé

Appliquer `supabase/health/migrations/003_dashboard_analyses.sql` avant le premier déploiement. Puis ajouter `HEALTH_DASHBOARD_REFRESH_URL` et `HEALTH_DASHBOARD_REFRESH_TOKEN` aux secrets injectés par `import-health.sh` pour générer les commentaires après chaque import.

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
