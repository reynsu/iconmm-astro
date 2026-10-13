import { IconArrowUpRight } from "@tabler/icons-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { solutions, type Solution } from "@/data/site";

function Visual({ solution }: { solution: Solution }) {
  return (
    <figure className="relative h-72 w-full overflow-hidden rounded-2xl border border-line bg-ink-2 sm:h-96 lg:h-full">
      <img src={solution.image} alt={solution.imageAlt} loading="lazy" className="size-full object-cover" />
      {/* velo + línea de escaneo: la foto se lee como una pantalla encendida */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_3px,rgba(0,0,0,0.18)_3px,rgba(0,0,0,0.18)_4px)] opacity-40 mix-blend-multiply" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
        <div>
          <p className="eyebrow text-fg/60">{solution.category}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-fg">{solution.name}</p>
        </div>
        <span className="font-mono text-6xl font-medium text-white/10">{solution.code}</span>
      </figcaption>
    </figure>
  );
}

export default function Solutions() {
  const content = solutions.map((solution) => ({
    title: solution.name,
    description: solution.description,
    eyebrow: (
      <p className="eyebrow mb-5 flex items-center gap-3 !text-signal">
        <span>{solution.code}</span>
        <span className="h-px w-8 bg-signal/40" />
        <span>{solution.category}</span>
      </p>
    ),
    meta: (
      <>
        <ul className="mt-8 flex flex-wrap gap-2">
          {solution.features.map((feature) => (
            <li key={feature} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-fg/80">
              {feature}
            </li>
          ))}
        </ul>
        <a
          href={solution.link}
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg transition hover:text-signal"
        >
          Descubrir {solution.name}
          <IconArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </>
    ),
    content: <Visual solution={solution} />,
  }));

  return <StickyScroll content={content} contentClassName="border border-line" />;
}
