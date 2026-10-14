/**
 * Imágenes optimizadas con `astro:assets` (Sharp en tiempo de build).
 *
 * Sólo para plantillas .astro y frontmatter: las islas React no pueden importar `astro:assets`,
 * así que reciben el resultado (`ImgAttrs`) como prop. Los datos siguen refiriéndose a las
 * imágenes por su ruta histórica ("/images/kiosk.jpg"); aquí se resuelve al fichero de
 * src/assets/images y se generan las variantes WebP con `srcset`, `sizes` y medidas.
 */
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { ImgAttrs } from "@/lib/img-types";

export type { ImgAttrs };

const assets = import.meta.glob<ImageMetadata>("/src/assets/images/**/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

/** Metadatos de la imagen cuyo path de datos es "/images/…". */
export function asset(path: string): ImageMetadata {
  const img = assets[`/src/assets${path}`];
  if (!img) throw new Error(`Imagen no encontrada en src/assets: ${path}`);
  return img;
}

export type OptimizeOptions = {
  /** Anchos a generar; por defecto, los habituales para fotos a pantalla completa o media. */
  widths?: number[];
  /** Atributo `sizes` para que el navegador elija el ancho adecuado. */
  sizes?: string;
  format?: "webp" | "avif";
  quality?: number;
};

const PHOTO_WIDTHS = [480, 800, 1200, 1600];

/** Atributos de <img> listos para usar (en React, `srcSet`). */
export async function optimized(path: string, opts: OptimizeOptions = {}): Promise<ImgAttrs> {
  const src = asset(path);
  const isPhoto = src.width >= 600;
  const widths = (opts.widths ?? (isPhoto ? PHOTO_WIDTHS : [src.width])).filter((w) => w <= src.width);
  // si el original es más pequeño que el mayor ancho pedido, se incluye tal cual como variante mayor
  const maxWanted = Math.max(...(opts.widths ?? PHOTO_WIDTHS));
  if (src.width < maxWanted && !widths.includes(src.width)) widths.push(src.width);
  if (widths.length === 0) widths.push(src.width);
  const img = await getImage({
    src,
    widths,
    // el `src` de respaldo se limita al mayor ancho generado; sin esto saldría al tamaño original
    width: Math.max(...widths),
    sizes: opts.sizes,
    format: opts.format ?? "webp",
    quality: opts.quality ?? (isPhoto ? 70 : 85),
  });
  return {
    src: img.src,
    srcSet: img.srcSet.attribute || undefined,
    sizes: opts.sizes,
    width: Number(img.attributes.width),
    height: Number(img.attributes.height),
  };
}

/** Mapa path → atributos para una lista de imágenes (para pasar a una isla React). */
export async function optimizedMap(paths: string[], opts: OptimizeOptions = {}): Promise<Record<string, ImgAttrs>> {
  const unique = [...new Set(paths.filter(Boolean))];
  const entries = await Promise.all(unique.map(async (p) => [p, await optimized(p, opts)] as const));
  return Object.fromEntries(entries);
}
