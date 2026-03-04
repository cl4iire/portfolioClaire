/**
 * TEMPORARY TOOL — delete after use.
 * Access via: http://localhost:3000/?editor
 *
 * Drag photos to reorder. Copy the generated `order` array and paste it
 * inside the PhotoAlbumMeta object in the matching .ts metadata file.
 * Then delete this file and the ?editor check in main.tsx.
 */
import { useState, useRef } from 'react';
import { PHOTOGRAPHY_ALBUMS } from '../data/portfolio';
import type { PhotoAlbum } from '../data/portfolio';

type Item = PhotoAlbum['items'][number];

function orderKey(albumId: string, srcPath: string): string {
  const parts = srcPath.split('/');
  return albumId === 'voyages2025'
    ? parts.slice(-2).join('/')
    : parts[parts.length - 1];
}

function generateCode(albumId: string, items: Item[]): string {
  const keys = items.map(item => `'${orderKey(albumId, item.srcPath)}'`);
  return `  order: [\n    ${keys.join(',\n    ')},\n  ],`;
}

export function PhotoOrderEditor() {
  const [albums, setAlbums] = useState<PhotoAlbum[]>(() =>
    PHOTOGRAPHY_ALBUMS.map(a => ({ ...a, items: [...a.items] }))
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // All drag tracking in refs — zero React re-renders during drag
  const dragRef = useRef<{ albumId: string; index: number } | null>(null);
  const highlighted = useRef<HTMLElement | null>(null);

  function clearHighlight() {
    if (highlighted.current) {
      highlighted.current.style.outline = '2px solid transparent';
      highlighted.current = null;
    }
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, albumId: string, index: number) {
    dragRef.current = { albumId, index };
    e.dataTransfer.effectAllowed = 'move';
    const el = e.currentTarget;
    requestAnimationFrame(() => { el.style.opacity = '0.25'; });
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, albumId: string) {
    if (dragRef.current?.albumId !== albumId) return;
    e.preventDefault();
    const el = e.currentTarget;
    if (el !== highlighted.current) {
      clearHighlight();
      el.style.outline = '2px solid #facc15';
      highlighted.current = el;
    }
  }

  function handleDrop(albumId: string, dropIndex: number) {
    const drag = dragRef.current;
    clearHighlight();
    if (!drag || drag.albumId !== albumId || drag.index === dropIndex) return;
    setAlbums(prev => prev.map(album => {
      if (album.id !== albumId) return album;
      const items = [...album.items];
      const [moved] = items.splice(drag.index, 1);
      items.splice(dropIndex, 0, moved);
      return { ...album, items };
    }));
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    (e.currentTarget).style.opacity = '1';
    clearHighlight();
    dragRef.current = null;
  }

  function copy(albumId: string, items: Item[]) {
    navigator.clipboard.writeText(generateCode(albumId, items));
    setCopiedId(albumId);
    setTimeout(() => setCopiedId(null), 2500);
  }

  return (
    <div className="min-h-screen bg-bg text-title font-mono">

      {/* Sticky toolbar */}
      <div className="sticky top-0 z-50 bg-bg border-b border-title-5 px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-1">
        <span className="text-[10px] uppercase tracking-[0.4em] opacity-50">Photo Order Editor</span>
        <span className="text-[9px] opacity-25 hidden sm:block">
          Drag to reorder · Copy output · Paste into .ts file · Delete this component when done
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {albums.map((album) => {
          const metaFile = album.id === 'voyages2025' ? 'voyages2025.ts' : `${album.id}.ts`;

          return (
            <div key={album.id} className="mb-24">

              {/* Album header — identical to photography wall */}
              <h3 className="text-xs uppercase tracking-[0.3em] mb-2 opacity-60 border-l-2 border-accent pl-4">
                {album.title.FR}
              </h3>
              {album.description?.FR && (
                <p className="text-[10px] opacity-50 mb-6 pl-4">{album.description.FR}</p>
              )}

              {/* Columns layout — identical to photography wall */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mb-8">
                {album.items.map((photo, i) => (
                  <div
                    key={photo.srcPath}
                    draggable
                    onDragStart={(e) => handleDragStart(e, album.id, i)}
                    onDragOver={(e) => handleDragOver(e, album.id)}
                    onDrop={() => handleDrop(album.id, i)}
                    onDragEnd={handleDragEnd}
                    className="break-inside-avoid cursor-grab active:cursor-grabbing select-none"
                    style={{ outline: '2px solid transparent', borderRadius: '2px' }}
                  >
                    <div className="relative overflow-hidden rounded-sm bg-bg group">
                      <img
                        src={photo.url}
                        alt=""
                        draggable={false}
                        className="w-full h-auto pointer-events-none block"
                      />
                      {/* Position number — always visible */}
                      <div className="absolute top-1.5 left-1.5 bg-black/80 text-yellow-400 text-[9px] font-bold leading-none px-1.5 py-1 rounded-sm">
                        {i + 1}
                      </div>
                      {/* Key label on hover */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/75 text-white/80 text-[8px] text-center py-1 px-2 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        {orderKey(album.id, photo.srcPath)}
                      </div>
                      {/* Drag dots on hover */}
                      <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-70 transition-opacity duration-150">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                          <circle cx="3.5" cy="2.5" r="1.2"/><circle cx="8.5" cy="2.5" r="1.2"/>
                          <circle cx="3.5" cy="6" r="1.2"/><circle cx="8.5" cy="6" r="1.2"/>
                          <circle cx="3.5" cy="9.5" r="1.2"/><circle cx="8.5" cy="9.5" r="1.2"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Generated code output */}
              <div className="border border-title-10 rounded overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-title-10 bg-black/20">
                  <span className="text-[9px] opacity-40">
                    → paste inside <code className="text-blue-400 opacity-100">{metaFile}</code>
                  </span>
                  <button
                    onClick={() => copy(album.id, album.items)}
                    className={`text-[10px] font-bold px-3 py-1 rounded transition-colors cursor-pointer ${
                      copiedId === album.id
                        ? 'bg-green-600 text-white'
                        : 'bg-yellow-400 text-black hover:bg-yellow-300'
                    }`}
                  >
                    {copiedId === album.id ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="px-4 py-3 text-[10px] text-green-400 overflow-x-auto whitespace-pre-wrap leading-relaxed m-0">
{generateCode(album.id, album.items)}
                </pre>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
