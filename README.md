# Portfolio — Claire Buhaceanu Laborde

Site portfolio de Claire Buhaceanu Laborde. 
Construit avec React, Vite et Tailwind CSS v4.

## Lancer le projet en local

**Prérequis :** Node.js

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

## Structure du projet

Le site auto-découvre les médias (photos, stills) depuis les dossiers `src/assets/projects/**` et assemble le contenu à partir de fichiers TypeScript dans `src/data/projects/**`.

### Dossiers principaux

**Médias (auto-scannés)**
- Films : `src/assets/projects/films/<projectId>/`
  - Coulisses (optionnel) : `src/assets/projects/films/<projectId>/<projectId>BehindScenes/`
- Documentaires : `src/assets/projects/documentaries/<projectId>/`
  - Documentation PDF (optionnel) : `src/assets/projects/documentaries/<projectId>/documentation/`
- Photographies : `src/assets/projects/photographies/`
  - Albums = dossiers feuilles, ex. `motors_and_blues/`, `voyages/bardenas2025/`, `voyages/Irlande2025/`, …

**Données (fichiers TS écrits à la main)**
- Films : `src/data/projects/films/<projectId>.ts`
- Documentaires : `src/data/projects/documentaries/<projectId>.ts`
- Métadonnées albums photo (optionnel) : `src/data/projects/photographies/<albumId>.ts`

**Fichiers clés**
- Agrégateur & traductions : `src/data/portfolio.ts`
- Types : `src/data/types.ts` (`ProjectData`, `PhotoAlbumMeta`)
- Variables CSS & utilitaires couleur : `src/index.css`

**Documents**
- CV (FR & ENG) : `src/assets/CV/`
- Projets futurs Master : `src/assets/futur/`

### Fonctionnement des médias

- Les images sont chargées via `import.meta.glob` de Vite, insensible à la casse : `{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}`.
- Films/Docs : toutes les images du dossier projet forment la galerie. La première image est la couverture. Les coulisses sont lues depuis le sous-dossier `<projectId>BehindScenes/` s'il existe.
- Photographies : chaque dossier feuille sous `src/assets/projects/photographies/**` devient automatiquement un album.

## Ajouter un film ou un documentaire

1. Déposer les stills (et coulisses optionnelles) :
   - Films : `src/assets/projects/films/<projectId>/`
     - Coulisses : `src/assets/projects/films/<projectId>/<projectId>BehindScenes/`
   - Docs : `src/assets/projects/documentaries/<projectId>/`
2. Créer un fichier de données exportant `ProjectData` :
   - Films : `src/data/projects/films/<projectId>.ts`
   - Docs : `src/data/projects/documentaries/<projectId>.ts`
3. Enregistrer le projet dans `src/data/portfolio.ts` en important le fichier et en l'ajoutant au tableau `PROJECTS`.

**Notes :**
- `videoUrl` peut être une URL YouTube (intégrée automatiquement avec miniature HD) ou `#` pour afficher une image statique.
- `documentationUrl` (optionnel) : importer un PDF via `?url` pour afficher un bouton "Dossier de Production".
- La première image découverte est utilisée comme couverture.

## Ajouter un album photo

1. Créer un dossier avec les photos :
   - `src/assets/projects/photographies/<albumId>/`
   - ou imbriqué dans voyages, ex. `src/assets/projects/photographies/voyages/<tripId>/`
2. (Optionnel) Ajouter des métadonnées localisées :
   - `src/data/projects/photographies/<albumId>.ts`
   - Doit exporter un `PhotoAlbumMeta` avec `{ id, title: {FR, ENG}, description?: {FR, ENG} }`.

Les albums sont générés automatiquement — aucune configuration supplémentaire n'est nécessaire.

## Réorganiser l'ordre des photos

L'ordre des photos dans chaque album est contrôlé par un tableau `order` dans le fichier de métadonnées correspondant.

### Utiliser l'éditeur drag & drop (recommandé)

L'éditeur visuel est intégré au projet. Il affiche les photos exactement comme sur le site et permet de réorganiser par glisser-déposer.

**1.** Lancer le serveur de développement (`npm run dev`)

**2.** Ouvrir l'éditeur : `http://localhost:3000/?editor`

**3.** Glisser-déposer les photos dans l'ordre souhaité — le numéro de position (jaune) se met à jour en temps réel

**4.** Cliquer sur **Copy** sous l'album

**5.** Coller dans le fichier de métadonnées correspondant :

| Album | Fichier |
|---|---|
| Motor & Blues | `src/data/projects/photographies/motors_and_blues.ts` |
| Voyages 2025 | `src/data/projects/photographies/voyages2025.ts` |

Coller le bloc `order: [...]` à l'intérieur de l'objet `meta` :

```ts
const meta: PhotoAlbumMeta = {
  id: 'motors_and_blues',
  title: { FR: 'Motor & Blues', ENG: 'Motor & Blues' },
  order: [
    '3.webp',
    '1.webp',
    '5.webp',
    // ...
  ],
};
```

Pour **Voyages 2025**, les clés incluent le sous-dossier (`bardenas2025/14.webp`, `Irlande2025/2.webp`…) ce qui permet d'intercaler librement les destinations.

**6.** Revenir sur `http://localhost:3000/` pour vérifier le résultat.

> Les photos absentes du tableau `order` s'ajoutent automatiquement à la fin (tri numérique).

### Notes

- L'éditeur est une page temporaire déjà intégrée — aucune installation requise.
- Si l'éditeur n'est plus nécessaire, supprimer `src/components/PhotoOrderEditor.tsx` et retirer les 3 lignes correspondantes dans `src/main.tsx`.

## Système de couleurs

Toutes les couleurs du site sont définies via des variables CSS dans `src/index.css` :

```css
--color-bg:     #000000   /* fond principal */
--color-title:  #ffffff   /* titres et éléments forts */
--color-text:   #f4f1ea   /* texte courant */
--color-accent: #ef4444   /* rouge accent */
```

Les classes utilitaires correspondantes (`bg-bg`, `text-title`, `text-accent`, etc.) sont toutes déclarées dans `src/index.css` et doivent être utilisées à la place des couleurs Tailwind natives.

## Fonctionnalités

- **Bilingue FR / ENG** — détection automatique de la langue du navigateur, bascule dans la navbar
- **CV** — visionneuse PDF plein écran avec sélection FR / ENG
- **Projets Futurs Master** — visionneuse PDF accessible depuis la navbar
- **Visionneuse d'images** — lightbox avec navigation clavier et swipe mobile
- **YouTube** — intégration façade (miniature HD → lecteur au clic)
- **Photographies** — mur masonry avec albums auto-générés
- **Responsive** — sidebar desktop, menu overlay mobile

## Dépannage

- **Rien n'apparaît dans le mur photo :** vérifier que les photos sont bien dans `src/assets/projects/photographies/**` et que les extensions sont `png/jpg/jpeg/webp`. Redémarrer le serveur Vite si des fichiers ont été déplacés.
- **Le PDF ne s'ouvre pas :** vérifier que le fichier est importé avec le suffixe `?url` (`import monPdf from './mon.pdf?url'`).

## Déploiement (GitHub Pages)

Ce projet Vite génère des fichiers statiques déployables sur GitHub Pages.

**1. Configurer le chemin de base**

- Site utilisateur (`username.github.io`) : laisser `base` par défaut (`/`).
- Site de projet (`username/portfolio`) : définir `base` dans `vite.config.ts` :

```ts
export default defineConfig(({ mode }) => ({
  base: '/portfolio/', // remplacer par le nom du dépôt
}))
```

**2. Déploiement automatique via GitHub Actions**

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch: {}

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Puis : Settings → Pages → Build and deployment → Source : "GitHub Actions".

**3. Publication manuelle**

```bash
npm run build
git add -f dist
git commit -m "Publish site"
git subtree push --prefix dist origin gh-pages
```

Settings → Pages → Branch : `gh-pages` / dossier `root`.

> Après tout changement de `base`, relancer `npm run build` avant de déployer.
