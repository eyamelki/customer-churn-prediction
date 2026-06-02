# Frontend

Ce dossier contient l'application frontend (Vite + React + TypeScript).

## Prérequis

- Node.js (version active LTS recommandée)
- npm, yarn ou pnpm

## Installation

1. Installer les dépendances :

```bash
npm install
# or: pnpm install
# or: yarn
```

## Exécuter en développement

Lancer le serveur de développement (hot-reload) :

```bash
npm run dev
```

Ouvrir ensuite http://localhost:5173 dans votre navigateur (port par défaut Vite).

## Construire pour la production

```bash
npm run build
```

Aperçu du build local :

```bash
npm run preview
```

## Scripts utiles

- `npm run dev` — démarre Vite en mode développement
- `npm run build` — compile TypeScript et crée le build de production
- `npm run preview` — prévisualise le build de production
- `npm run lint` — lance ESLint

## Structure importante

- `src/main.tsx` — point d'entrée
- `src/App.tsx` — composant principal

## Notes

- Les variables d'environnement peuvent être ajoutées via des fichiers `.env` si nécessaire.
- Si vous avez besoin d'une configuration ou d'un guide style contribution, créez un fichier `CONTRIBUTING.md`.

Si vous voulez, je peux ajouter des sections supplémentaires (tests, déploiement, variables d'environnement détaillées, etc.).

