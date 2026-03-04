import { ProjectItem } from "./ProjectItem";

interface ProjectSectionProps {
  id: string;
  title: string;
  projects: any[];
  t: any;
  lang: string;
  onImageClick: (images: string[], index: number) => void;
}

export const ProjectSection = ({ id, title, projects, t, lang, onImageClick }: ProjectSectionProps) => {
  return (
    <section id={id} className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-20">
        <h2 className="text-sm uppercase tracking-[0.5em] mb-4 opacity-40">{title}</h2>
        <div className="h-[1px] w-full bg-title-20" />
      </div>

      <div className="space-y-40">
        {projects.map((project, idx) => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            idx={idx} 
            t={t} 
            lang={lang} 
            onImageClick={onImageClick} 
          />
        ))}
      </div>
    </section>
  );
};
