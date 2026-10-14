/**
 * Prefijo de despliegue. En GitHub Pages el sitio vive en /iconmm-astro/, así que toda ruta
 * absoluta interna ("/partners", "/images/…") debe pasar por aquí. `base` no lleva barra final.
 */
export const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Añade el prefijo de despliegue a una ruta interna que empiece por "/". */
export const withBase = (path: string) => (path.startsWith("/") ? `${base}${path}` : path);
