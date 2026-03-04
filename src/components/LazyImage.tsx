import { useState } from "react";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;      // applied to the wrapper div (sizing, aspect-ratio, etc.)
  imgClassName?: string;   // applied to the img (hover effects, extra transitions)
  naturalHeight?: boolean; // when true: img is h-auto (for masonry/columns layouts)
  priority?: boolean;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function LazyImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  naturalHeight = false,
  priority = false,
  onLoad,
  onClick,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${naturalHeight ? "min-h-[60px]" : ""} ${className}`}
      onClick={onClick}
    >

      {/* Skeleton shown while image loads */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-title-5">
          <div
            className="w-7 h-7 rounded-full border-2 animate-spin"
            style={{
              borderColor: 'rgba(255,255,255,0.10)',
              borderTopColor: 'rgba(255,255,255,0.55)',
            }}
          />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchpriority={priority ? ("high" as any) : ("low" as any)}
        referrerPolicy="no-referrer"
        className={[
          naturalHeight ? "w-full h-auto" : "w-full h-full object-cover",
          "transition-[opacity,filter,transform] duration-500 ease-out",
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-[1.02]",
          imgClassName,
        ].join(" ")}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={() => setLoaded(true)}
      />
    </div>
  );
}
