import type { ProjectData } from '../../types';

const imagesModules = import.meta.glob(
  '../../../assets/projects/documentaries/aroundMe/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const images = Object.values(imagesModules).sort((a, b) => a.localeCompare(b));

const project: ProjectData = {
  id: 'around-me',
  category: 'documentary',
  title: 'Around Me, in the Here and Now',
  year: '2026',
  type: 'Documentaire',
  duration: "3'",
  composition: null,
  producer: 'Claire Buhaceanu Laborde',
  videoUrl: 'https://youtu.be/GpzJsAe2mu8?si=1exsgXpzuvzFOSYl',
  role: {
    FR: 'Ecriture, Production, Editeur',
    ENG: 'Writing, Production, Editor',
  },
  description: {
    FR: 'Documentaire de 3 minutes réalisé dans le cadre d\'un concours avec pour thème "Around Me, in the Here and Now". Les fetes sont un moment de partages, de retrouvailles malgré la situation mondiale.',
    ENG: '3-minute documentary made for a competition themed "Around Me, in the Here and Now". The holidays are a time for sharing and reuniting despite the global situation.',
  },
  images: images.length > 0 ? images : [
    'https://picsum.photos/seed/claire1/800/450?grayscale',
    'https://picsum.photos/seed/claire2/800/450?grayscale',
  ],
};

export default project;
