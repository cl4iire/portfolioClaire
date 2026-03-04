import type { ProjectData } from '../../types';

const imagesModules = import.meta.glob(
  '../../../assets/projects/films/Indies/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const images = Object.values(imagesModules).sort((a, b) => a.localeCompare(b));

const project: ProjectData = {
  id: 'in-the-indies',
  category: 'film',
  title: 'In the Indies',
  year: '2025',
  type: 'Emission en direct',
  duration: "20'",
  composition: {
    FR: "un interview, un VT information, un concert live",
    ENG: 'an interview, a VT information, a live concert',
  },
  producer: 'Paul Finnegan',
  videoUrl: 'https://youtu.be/kTqFGUEIue8',
  role: {
    FR: "Script de l'émission, Opérateur Son",
    ENG: 'Show Script, Sound Operator',
  },
  description: {
    FR: "Emission en direct qui tourne autour du monde des contenus indépendants, en particulier le cinéma, la musique et le gaming. Le but est d'introduire un nouveau public aux domaines plus spécialisés de l'industrie du divertissement et de montrer comment les petits créateurs façonnent le paysage médiatique. L'émission se devait de respecter le temps imposé de 20 minutes et contenir : un interview, un VT information, un concert live.",
    ENG: 'Live broadcast revolving around the world of independent content, particularly cinema, music, and gaming. The goal is to introduce a new audience to more specialized areas of the entertainment industry. The show had to respect the 20-minute time limit and contain: an interview, a VT information, a live concert.',
  },
  images,
};

export default project;
