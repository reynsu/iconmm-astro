# ICON Multimedia — rediseño "papel"

Nueva home de [iconmm.com](https://www.iconmm.com/) construida con **Astro**, **React** (islas), **Tailwind CSS v4**,
componentes de **[Aceternity UI](https://ui.aceternity.com/components)** y **three.js** para la bailarina del hero.

Mantiene las mismas secciones y textos que la home original (hero + InnoTrans, cuatro soluciones, clientes, ICEX,
noticias y pie con oficinas y asociaciones) con un estilo claro y editorial: fondo papel, tinta y el rojo ICON.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Estructura

- `src/pages/index.astro` — la página, sección a sección.
- `src/data/site.ts` — todo el contenido (textos, soluciones, clientes, oficinas, noticias).
- `src/components/` — secciones interactivas (islas React) y piezas Astro.
- `src/components/PaperDancer.tsx` — la bailarina en 3D (three.js).
- `src/components/ui/` — componentes de Aceternity, instalados con `npx shadcn@latest add @aceternity/<nombre>` y adaptados a la paleta.
- `src/styles/global.css` — tokens de color, tipografías y utilidades.
- `public/data/dancer.bin` — posiciones y colores de los ~3.800 trozos de papel (26 KB).

## La bailarina de papel

El hero original es una bailarina compuesta por cuadrados dispersos. Aquí se reconstruye en 3D:

1. Se muestrea la imagen original (`animation-header-05.png`) en una retícula de 6 px y se guardan posición y color de
   cada píxel opaco en un binario compacto (`public/data/dancer.bin`).
2. `PaperDancer.tsx` dibuja cada muestra como un trozo de papel (plano ligeramente curvado, `InstancedMesh`,
   material mate a doble cara) con tamaño, giro y profundidad aleatorios pero deterministas.
3. El puntero empuja los trozos cercanos y los levanta hacia la cámara; un muelle amortiguado los devuelve poco a poco
   a su sitio con un ligero aleteo. Al cargar, los trozos llegan desde fuera y se ensamblan.
4. El bucle se pausa cuando el hero no está en pantalla o la pestaña está oculta, y respeta `prefers-reduced-motion`.

Para regenerar los datos a partir de otra imagen: muestrear los píxeles con alfa ≥ 240 (descarta la sombra) y escribir
`uint32 N | int16 x,y ×N | uint8 r,g,b ×N`.

## Componentes de Aceternity usados

`resizable-navbar`, `hero-highlight`, `flip-words`, `hover-border-gradient`, `wobble-card`, `3d-card`, `lens`,
`pointer-highlight`, `infinite-moving-cards`, `glowing-effect`, `focus-cards`, `background-lines`, `floating-dock`,
`text-hover-effect`.

Adaptaciones relevantes:

- `focus-cards`: tarjetas enlazadas con antetítulo (fecha) y llamada a la acción; rejilla configurable.
- `wobble-card`: el ruido se genera en línea (SVG) en lugar de cargar `/noise.webp`.
- `hover-border-gradient`, `hero-highlight`, `text-hover-effect`, `background-lines`, `floating-dock`: paleta de marca.
- `infinite-moving-cards`: acepta `renderItem` para mostrar logos.
