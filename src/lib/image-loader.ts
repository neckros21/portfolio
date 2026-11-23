"use client";

// Les aperçus des projets sont pré-convertis en WebP (640, 1080 et 1440 px de large) :
// ce sont de simples fichiers statiques, servis instantanément par le CDN de Vercel,
// sans conversion à la première visite.
const widths = [640, 1080, 1440];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const match = src.match(/^\/previews\/([a-z0-9-]+)\.jpg$/);
  if (!match) return src;
  const w = widths.find((v) => v >= width) ?? widths[widths.length - 1];
  return `/previews/${match[1]}-${w}.webp`;
}
