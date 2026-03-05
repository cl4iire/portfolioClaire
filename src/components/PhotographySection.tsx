import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LazyImage } from "./LazyImage";

interface PhotographySectionProps {
  albums: { id: string; title: { FR: string; ENG: string }; description?: { FR: string; ENG: string }; items: { title: string; desc: string; url: string }[]; articleImages?: string[] }[];
  t: any;
  onImageClick: (images: string[], index: number) => void;
  lang: 'FR' | 'ENG';
}

export const PhotographySection = ({ albums, t, onImageClick, lang }: PhotographySectionProps) => {
  return (
    <section id="photography" className="py-24 bg-bg border-y border-title-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-sm uppercase tracking-[0.5em] mb-2 opacity-40">{t.visualArchives}</h2>
            <p className="text-4xl font-display uppercase text-title">{t.photographyWall}</p>
          </div>
        </div>

        {albums.map((album) => (
          <div className="mb-24" key={album.id}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] mb-2 opacity-60 border-l-2 border-accent pl-4">{album.title[lang]}</h3>
                {album.description?.[lang] && (
                  <p className="text-[10px] opacity-50 pl-4 text-justify">{album.description[lang]}</p>
                )}
              </div>
              {album.articleImages?.length ? (
                <motion.button
                  whileHover={{ x: 10 }}
                  onClick={() => onImageClick(album.articleImages!, 0)}
                  className="flex flex-col items-start gap-1 group cursor-pointer"
                >
                  <span className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold">
                    [ {t.seeArticle} ] <ArrowRight size={16} className="group-hover:text-accent transition-colors" />
                  </span>
                  <span className="text-[10px] opacity-40 uppercase tracking-widest font-mono">Blues Magazine 2025</span>
                </motion.button>
              ) : null}
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {album.items.map((photo, i) => (
                <PhotoItem
                  key={i}
                  photo={photo}
                  onClick={() => onImageClick(album.items.map(p => p.url), i)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

function PhotoItem({ photo, onClick }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pinterest-item cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-sm bg-bg">
        <LazyImage
          src={photo.url}
          alt={photo.title}
          className="w-full"
          imgClassName="group-hover:scale-105"
          naturalHeight
        />
        {photo.desc && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <p className="text-white text-[10px] uppercase tracking-[0.2em] leading-relaxed">{photo.desc}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
