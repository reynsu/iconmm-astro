// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Despliegue en GitHub Pages (sitio de proyecto): https://reynsu.github.io/iconmm-astro/
  // `site` alimenta el sitemap, los canónicos y Open Graph; `base` prefija todas las rutas internas
  // (ver src/lib/url.ts). Para publicar en un dominio propio basta con cambiar estos dos valores.
  site: "https://reynsu.github.io",
  base: "/iconmm-astro",
  integrations: [react(), sitemap()],

  build: {
    // Una sola petición menos en el camino crítico: la hoja de estilos va dentro del HTML.
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
