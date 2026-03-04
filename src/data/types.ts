export type LocaleText = {
  FR: string;
  ENG: string;
};

export interface ProjectData {
  id: string;
  category: 'film' | 'documentary';
  title: string;
  year: string;
  type: string;
  duration?: string | null;
  composition?: LocaleText | null;
  producer: string;
  videoUrl: string; // YouTube/Vimeo link or '#'
  role: LocaleText;
  description: LocaleText;
  images: string[]; // main gallery, first image used as cover
  behindTheScenes?: string[]; // optional BTS gallery
  documentationUrl?: string; // optional production folder PDF
}

export interface PhotoAlbumMeta {
  id: string; // must match the leaf folder name under assets/photographies
  title: LocaleText;
  description?: LocaleText;
  order?: string[]; // filenames in display order; use "subfolder/filename" for voyages2025
}
