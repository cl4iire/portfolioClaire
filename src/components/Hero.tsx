import { useState } from "react";
import { motion, MotionValue } from "motion/react";
import { ChevronDown } from "lucide-react"; 
import backgroundHero from "../assets/about/backgroundHero.webp";
import clairePhoto from "../assets/about/claire.webp";

import logoPr from "../assets/logos/Adobe_Premiere_Pro.png";
import logoAe from "../assets/logos/After_Effects.png";
import logoAvid from "../assets/logos/Avid_logo_purple_2017.png";
import logoResolve from "../assets/logos/Blackmagic_Design_Logo.png";
import logoLr from "../assets/logos/Lighroom.png";

interface HeroProps {
  backgroundY: MotionValue<string>;
  t: any;
}

export const Hero = ({ backgroundY, t }: HeroProps) => {
  const [showTeachings, setShowTeachings] = useState(false);
  
  return (
    <section id="hero" className="relative min-h-screen flex flex-col bg-bg text-title overflow-hidden">
      
      {/* Moitié Supérieure - Fond et Titre */}
      <div className="h-[50vh] w-full relative overflow-hidden shrink-0">
        <motion.img
          style={{ y: backgroundY }}
          src={backgroundHero}
          className="w-full h-[120%] object-cover object-bottom opacity-50"
          alt="Hero background"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-60% to-black/70" />
        
        <div className="absolute top-27 left-1/2 -translate-x-1/2 text-center z-10 w-full px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-6xl font-display leading-none uppercase tracking-tighter"
          >
            Claire Buhaceanu <br /> Laborde
          </motion.h1>
        </div>
      </div>

      {/* Moitié Inférieure - Contenu */}
      <div className="flex-1 w-full flex flex-col items-center px-6 text-center pb-24 z-20">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="-mt-24 md:-mt-36 mb-10 p-2 w-48 md:w-60 shadow-2xl relative z-30"
        >
          <img
            src={clairePhoto}
            className="w-full h-auto"
            alt="Claire"
            referrerPolicy="no-referrer"
            width={800}
            height={1200}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-6xl w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            
            <div className="md:col-span-2">
              <div 
                className="text-xs md:text-sm leading-relaxed opacity-70 font-mono"
                dangerouslySetInnerHTML={{ __html: t.bio }}
              />

              <div className="mt-6 border border-title-20 rounded-sm overflow-hidden">
                <h2 className="m-0">
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-70 hover:opacity-100 transition bg-title-5 hover:bg-title-10"
                    onClick={() => setShowTeachings(!showTeachings)}
                    aria-expanded={showTeachings}
                    aria-controls="teachings-list"
                  >
                    {t.teachings}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${showTeachings ? "rotate-180" : ""}`}
                    />
                  </button>
                </h2>
                
                <motion.div
                  id="teachings-list"
                  initial={false}
                  animate={{ height: showTeachings ? "auto" : 0, opacity: showTeachings ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="px-6 py-4 text-xs md:text-sm opacity-70 space-y-2 list-disc list-inside">
                    {(t.teachingsList ?? []).map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Programmes */}
            <div>
              <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60 mb-3">{t.programs}</h2>
              <ul className="text-xs md:text-sm opacity-70 space-y-3">
                <li>
                  <a href="https://www.adobe.com/products/premiere.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-title hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    <img src={logoPr} alt="Premiere Pro" className="h-5 md:h-6 object-contain shrink-0" width={64} height={64} />
                    {t.programsLabels?.pr ?? 'Premiere Pro'}
                  </a>
                </li>
                <li>
                  <a href="https://www.adobe.com/products/aftereffects.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-title hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    <img src={logoAe} alt="After Effects" className="h-5 md:h-6 object-contain shrink-0" width={64} height={64} />
                    {t.programsLabels?.ae ?? 'After Effects'}
                  </a>
                </li>
                <li>
                  <a href="https://www.avid.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-title hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    <img src={logoAvid} alt="Avid Suite" className="h-5 md:h-6 object-contain shrink-0" width={64} height={64} />
                    {t.programsLabels?.avid ?? 'Avid Suite'}
                  </a>
                </li>
                <li>
                  <a href="https://www.blackmagicdesign.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-title hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    <img src={logoResolve} alt="Blackmagic Design" className="h-5 md:h-6 object-contain shrink-0" width={64} height={64} />
                    {t.programsLabels?.resolve ?? 'Blackmagic Design'}
                  </a>
                </li>
                <li>
                  <a href="https://www.adobe.com/products/photoshop-lightroom.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-title hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    <img src={logoLr} alt="Lightroom" className="h-5 md:h-6 object-contain shrink-0" width={64} height={64} />
                    {t.programsLabels?.lr ?? 'Lightroom'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20"
        >
          <div className="w-[1px] h-12 bg-title" />
        </motion.div>

      </div>
    </section>
  );
};