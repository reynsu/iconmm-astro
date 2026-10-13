# ICON Multimedia — rediseño

Nueva home de [iconmm.com](https://www.iconmm.com/) construida con **Astro**, **React** (islas), **Tailwind CSS v4** y componentes de **[Aceternity UI](https://ui.aceternity.com/components)**.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Estructura

- `src/pages/index.astro` — la página, sección a sección.
- `src/data/site.ts` — todo el contenido (textos, cifras, clientes, oficinas, noticias).
- `src/components/` — secciones interactivas (islas React) y piezas Astro.
- `src/components/ui/` — componentes de Aceternity, instalados con `npx shadcn@latest add @aceternity/<nombre>` y adaptados al proyecto.
- `src/styles/global.css` — tokens de color, tipografías y utilidades.

## Componentes de Aceternity usados

`resizable-navbar`, `sticky-banner`, `spotlight-new`, `text-flipping-board`, `moving-border`, `infinite-moving-cards`, `sticky-scroll-reveal`, `glowing-effect`, `world-map`, `card-hover-effect`, `background-beams`.

Adaptaciones relevantes:

- `world-map`: proyecta las rutas con `getPin` de `dotted-map` (la fórmula equirectangular original las desplaza) y no depende de `next-themes`.
- `sticky-scroll-reveal`: funciona con el scroll de la página en lugar de un contenedor con scroll propio.
- `infinite-moving-cards`: acepta `renderItem` para mostrar logos.
- `text-flipping-board` y `glowing-effect`: paleta de marca.
