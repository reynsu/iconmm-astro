import { IconArrowRight, IconBook, IconCake, IconClock, IconHeart, IconSun, IconTrophy } from "@tabler/icons-react";
import { careers } from "@/data/pages";

/**
 * Ventajas de trabajar en ICON: lista editorial numerada. Al pasar el ratón, cada fila
 * reacciona en sitio (sin bloques deslizantes): el número da paso al icono, el título se
 * desplaza, la descripción gana contraste y una línea roja recorre la base de la fila.
 */

const icons = { clock: IconClock, sun: IconSun, cake: IconCake, book: IconBook, heart: IconHeart, trophy: IconTrophy };

export default function Perks() {
  return (
    <ol className="border-t border-line">
      {careers.perks.map((perk, i) => {
        const Icon = icons[perk.icon as keyof typeof icons];
        return (
          <li key={perk.title} className="group relative border-b border-line">
            {/* línea roja que recorre la base de la fila */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            />
            <div className="grid items-center gap-x-6 gap-y-2 py-6 md:grid-cols-[3.5rem_1fr_1.2fr_2.5rem] md:py-7">
              {/* número → icono */}
              <span className="relative flex h-10 items-center">
                <span className="font-mono text-[11px] tracking-[0.18em] text-signal-ink transition duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                  0{i + 1}
                </span>
                <span className="absolute left-0 flex size-10 scale-75 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Icon className="size-5" />
                </span>
              </span>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 md:text-4xl">
                {perk.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink md:text-base">
                {perk.body}
              </p>
              <IconArrowRight
                aria-hidden="true"
                className="ml-auto hidden size-5 -translate-x-2 text-signal opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
