import type { ProjectData, PhotoAlbumMeta, LocaleText } from './types';
import friday from './projects/films/friday';
import indies from './projects/films/indies';
import progrey from './projects/films/progrey';
import sources from './projects/films/sources';
import aroundMe from './projects/documentaries/aroundMe';

// Auto-import photography images from new assets structure
const motorAndBluesModules = import.meta.glob(
  '/src/assets/projects/photographies/motors_and_blues/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const motorArticleModules = import.meta.glob(
  '/src/assets/projects/photographies/motors_and_blues/article/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',
  { eager: true, import: 'default' }
) as Record<string, string>;
const motorArticleImages: string[] = Object.values(motorArticleModules);

const voyagesModules = import.meta.glob(
  '/src/assets/projects/photographies/voyages/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',
  { eager: true, import: 'default' }
) as Record<string, string>;

function filenameToTitle(filePath: string) {
  const parts = filePath.split("/");
  const file = parts[parts.length - 1];
  const base = file.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ");
}

const MOTOR_AND_BLUES = Object.entries(motorAndBluesModules)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([path, url], i) => ({
    title: `Motor & Blues ${i + 1}`,
    desc: filenameToTitle(path),
    url
  }));

const VOYAGES_2026 = Object.entries(voyagesModules)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([path, url]) => ({
    title: filenameToTitle(path),
    desc: "Travel 2026",
    url
  }));

export const TRANSLATIONS = {
  FR: {
    films: "Films",
    documentaries: "Documentaires",
    photography: "Photographies",
    about: "À propos",
    contact: "Contact",
    cv: "CV",
    futurProjects: "Projet documentaire, Master",
    director: "Réalisatrice",
    editor: "Monteuse",
    cinematographer: "Directrice de la photographie",
    productionFolder: "Dossier de Production",
    playReel: "[ VOIR LA VIDÉO ]",
    visualArchives: "Archives Visuelles",
    photographyWall: "Mur de Photographies",
    theDirector: "La Réalisatrice",
    bio: "Prochainement diplômée d’une licence des Métiers du Multimédia et de L’internet, j’ai pu effectuer ma dernière année de licence à l’institut Technologique de  Dundalk (DKIT, Irlande) en Cinema and Television Production dans le cadre du programme Erasmus. Cette expérience  m’a permis d’affiner mon projet professionnel et de confirmer mon appétence dans la production documentaire. Enthousiaste, passionnée par les voyages et les questions contemporaines, je souhaite poursuivre mon parcours dans un master spécialisé dans l’audiovisuel et la création documentaire.",
    bioSub: "Se concentrant sur l'intersection de l'émotion humaine et des paysages cinématographiques. Chaque image est un mot dans un script plus large.",
    teachings: "Compétences",
    programs: "Programmes",
    seeMore: "Voir plus",
    seeLess: "Voir moins",
    theEnd: "Fin.",
    status: "STATUT : DISPONIBLE POUR COLLABORATION",
    location: "LIEU : FRANCE / MONDE",
    locationLine: "Basée en France / Ouverte aux déplacements",
    credits: "Crédits",
    designedWith: "Conçu avec passion pour Claire Buhaceanu Laborde",
    rights: "Tous droits réservés",
    producedBy: "produit par",
    roles: "Rôles",
    action: "Description",
    duration: "Durée",
    composition: "Composition",
    extScene: "EXT. SCÈNE",
    day: "JOUR",
    behindTheScenes: "Coulisses",
    seeArticle: "Voir l'article",
    teachingsList: [
      "Écriture pour le Cinéma et la TV",
      "Studio de production TV",
      "Cinéma Européen - Analyse filmique",
      "Questions juridiques et éthiques dans le cinéma et la télévision",
      "Cinématographie et post-production",
      "Production Documentaire : Théorie et Pratique",
      "Réalisation pour le cinéma et la télévision",
      "Conception sonore pour le cinéma et la télévision",
    ],
    programsLabels: {
      pr: "Première Pro",
      ae: "After Effects",
      avid: "Avid Suite",
      resolve: "Blackmagic Design",
      lr: "Lightroom",
    },
  },
  ENG: {
    films: "Films",
    documentaries: "Documentaries",
    photography: "Photography",
    about: "About",
    contact: "Contact",
    cv: "CV",
    futurProjects: "Documentary Project, Master",
    director: "Director",
    editor: "Editor",
    cinematographer: "Cinematographer",
    productionFolder: "Production Folder",
    playReel: "[ WATCH VIDEO ]",
    visualArchives: "Visual Archives",
    photographyWall: "Photography Wall",
    theDirector: "The Director",
    bio: "Final‑year student in the French B.U.T. MMI (Bachelor Universitaire de Technologie — Multimedia & Internet Professions) at an IUT (University Technical Institute). The B.U.T. is a 3‑year, 180‑ECTS, professionally oriented university bachelor’s degree, broadly comparable to a Bachelor of Applied Science. During my final year I studied in Ireland at Dundalk Institute of Technology (DkIT) in Cinema and Television Production, which helped refine my professional path and confirm my interest in documentary production. Enthusiastic and passionate about travel and contemporary issues, I aim to continue with a master’s focused on audiovisual and documentary creation.",
    bioSub: "Focusing on the intersection of human emotion and cinematic landscapes. Every frame is a word in a larger script.",
    teachings: "Teachings",
    programs: "Programs",
    seeMore: "See more",
    seeLess: "See less",
    theEnd: "The End.",
    status: "STATUS: OPEN_FOR_COLLABORATION",
    location: "LOCATION: FRANCE_GLOBAL",
    locationLine: "Based in France / Open to Travel",
    credits: "Credits",
    designedWith: "Designed with passion for Claire Buhaceanu Laborde",
    rights: "All Rights Reserved",
    producedBy: "produced by",
    roles: "Roles",
    action: "Description",
    duration: "Duration",
    composition: "Composition",
    notes: "NOTES",
    classified: "CLASSIFIED CONTENT",
    extScene: "EXT. SCENE",
    day: "DAY",
    behindTheScenes: "Behind the Scenes",
    seeArticle: "See the article",
    teachingsList: [
      "Screenwriting for Film and TV",
      "TV Studio Production",
      "European Cinema",
      "Legal and Ethical Issues in Film and Television",
      "Cinematography and Post‑Production",
      "Documentary Production: Theory and Practice",
      "Directing for Film and Television",
      "Sound Design for Film and Television",
    ],
    programsLabels: {
      pr: "Premiere Pro",
      ae: "After Effects",
      avid: "Avid Suite",
      resolve: "Blackmagic Design",
      lr: "Lightroom",
    },
  }
};

export const PROJECTS: ProjectData[] = [
  aroundMe,
  friday,
  indies,
  progrey,
  sources,
];

export const PHOTOGRAPHY = {
  motorAndBlues: MOTOR_AND_BLUES,
  voyages2026: VOYAGES_2026
};

// Auto-generate photography albums grouped by leaf folder under `photographies/`
type PhotoItem = { title: string; desc: string; url: string; srcPath: string };
export type PhotoAlbum = { id: string; title: LocaleText; description?: LocaleText; items: PhotoItem[]; articleImages?: string[] };

// Extract the order-array key from a photo's original source path
function orderKey(albumId: string, srcPath: string): string {
  const parts = srcPath.split('/');
  return albumId === 'voyages2025'
    ? parts.slice(-2).join('/')   // e.g. "bardenas2025/14.webp"
    : parts[parts.length - 1];   // e.g. "1.webp"
}

function applyOrder(albumId: string, items: PhotoItem[], order: string[] | undefined): PhotoItem[] {
  const numericSort = (a: PhotoItem, b: PhotoItem) => {
    const n = (p: string) => parseInt(p.split('/').pop() ?? '0', 10);
    return n(a.srcPath) - n(b.srcPath);
  };
  if (!order?.length) return [...items].sort(numericSort);
  return [...items].sort((a, b) => {
    const ia = order.indexOf(orderKey(albumId, a.srcPath));
    const ib = order.indexOf(orderKey(albumId, b.srcPath));
    if (ia === -1 && ib === -1) return numericSort(a, b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

const allPhotoModules = import.meta.glob(
  '/src/assets/projects/photographies/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',
  { eager: true, import: 'default' }
) as Record<string, string>;

// Load optional per-album metadata from data/projects/photographies/*.ts
const albumMetaModules = import.meta.glob('./projects/photographies/*.ts', { eager: true });
const META_BY_ID: Record<string, PhotoAlbumMeta> = {};
Object.values(albumMetaModules).forEach((mod: any) => {
  const m = (mod as any).default as PhotoAlbumMeta | undefined;
  if (m?.id) META_BY_ID[m.id] = m;
});

function prettifyFolderName(id: string) {
  return id
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

const albumMap = new Map<string, PhotoAlbum>();
Object.entries(allPhotoModules).forEach(([path, url]) => {
  if (path.includes('/article/')) return; // article images handled separately
  const parts = path.split('/');
  const leafFolder = parts[parts.length - 2] || 'photos';
  const parentFolder = parts[parts.length - 3] || '';

  // Merge all voyage sub-albums into a single "voyages2025" album
  const albumId = parentFolder === 'voyages' ? 'voyages2025' : leafFolder;
  const leafMeta = META_BY_ID[leafFolder];
  const albumMeta = META_BY_ID[albumId];

  const album = albumMap.get(albumId) || {
    id: albumId,
    title: albumId === 'voyages2025'
      ? { FR: 'Voyages 2025', ENG: 'Travels 2025' }
      : (albumMeta?.title ?? { FR: prettifyFolderName(albumId), ENG: prettifyFolderName(albumId) }),
    description: albumId === 'voyages2025'
      ? { FR: 'Londres · Irlande · Espagne · Marrakech ...', ENG: 'London · Ireland · Spain · Marrakech ...' }
      : albumMeta?.description,
    items: [] as PhotoItem[]
  };
  album.items.push({
    title: filenameToTitle(path),
    desc: (leafMeta?.title?.FR ?? prettifyFolderName(leafFolder)),
    url,
    srcPath: path
  });
  albumMap.set(albumId, album);
});

export const PHOTOGRAPHY_ALBUMS: PhotoAlbum[] = Array.from(albumMap.values()).map(a => ({
  ...a,
  items: applyOrder(a.id, a.items, META_BY_ID[a.id]?.order),
  ...(a.id === 'motors_and_blues' && motorArticleImages.length ? { articleImages: motorArticleImages } : {})
})).sort((a, b) => {
  if (a.id === 'motors_and_blues') return -1;
  if (b.id === 'motors_and_blues') return 1;
  return a.title.FR.localeCompare(b.title.FR);
});
