import manifest from "@/data/images.json";
import { withBase } from "@/lib/url";

type Entry = { width: number; height: number; widths: number[] };
const M = manifest as Record<string, Entry>;

/**
 * Atributos de <img> para una imagen de public/images: variantes WebP en varios anchos
 * (generadas con `npm run images`) más las medidas intrínsecas para reservar el espacio.
 * Si la imagen no está en el manifiesto, devuelve el src original (con prefijo de despliegue).
 */
export function pic(src: string, sizes?: string) {
  const base = src.replace(/\.(jpe?g|png)$/i, "");
  const e = M[base];
  if (!e) return { src: withBase(src) };
  const largest = e.widths[e.widths.length - 1];
  return {
    src: withBase(`${base}-${largest}.webp`),
    srcSet: e.widths.map((w) => `${withBase(base)}-${w}.webp ${w}w`).join(", "),
    sizes,
    width: e.width,
    height: e.height,
  };
}

/** Igual que `pic`, con los nombres de atributo HTML (para plantillas .astro). */
export function picAttrs(src: string, sizes?: string) {
  const { srcSet, ...rest } = pic(src, sizes);
  return { ...rest, srcset: srcSet };
}
