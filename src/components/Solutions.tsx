import { IconArrowUpRight } from "@tabler/icons-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Lens } from "@/components/ui/lens";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { solutions } from "@/data/site";
import type { ImgAttrs } from "@/lib/img-types";

export default function Solutions({ images }: { images: Record<string, ImgAttrs> }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <header className="max-w-3xl">
        <p className="eyebrow flex items-center gap-3 text-paper/55">
          <span className="text-signal-paper">[01]</span> Soluciones
        </p>
        <h2 className="mt-5 text-4xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-paper md:text-6xl">
          Cuatro productos,{" "}
          <PointerHighlight
            containerClassName="inline-block align-baseline"
            rectangleClassName="border-signal/70"
            pointerClassName="text-signal-paper"
          >
            <span className="relative z-10 px-2 font-serif font-normal tracking-normal text-paper/90 italic">una plataforma</span>
          </PointerHighlight>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-paper/60 md:text-lg">
          Del andén al probador: software desarrollado en España que convierte cualquier pantalla en un canal de
          comunicación medible.
        </p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
        {solutions.map((s) => (
          <CardContainer key={s.id} containerClassName="w-full py-0" className="w-full">
            <CardBody className="group/card h-auto w-full rounded-3xl border border-line-dark bg-ink-2 p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:p-7">
              <div className="flex items-start justify-between gap-4">
                <CardItem as="p" translateZ={30} className="eyebrow text-signal-paper">
                  {s.code} · {s.category}
                </CardItem>
                <CardItem translateZ={20} className="flex gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-paper/10 px-2 py-0.5 font-mono text-[10px] text-paper/60">
                      {tag}
                    </span>
                  ))}
                </CardItem>
              </div>
              <CardItem as="h3" translateZ={60} className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-paper md:text-4xl">
                {s.name}
              </CardItem>
              <CardItem as="p" translateZ={40} className="mt-3 max-w-md text-[15px] leading-relaxed text-pretty text-paper/60">
                {s.description}
              </CardItem>
              <CardItem translateZ={90} className="mt-6 w-full">
                <Lens zoomFactor={1.7} lensSize={190}>
                  <img
                    {...images[s.image]}
                    alt={s.imageAlt}
                    loading="lazy"
                    className="aspect-[16/10] w-full rounded-2xl object-cover"
                  />
                </Lens>
              </CardItem>
              <div className="mt-6 flex items-center justify-between">
                <CardItem
                  as="a"
                  href={s.link}
                  translateZ={30}
                  className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-sm font-medium text-paper transition hover:bg-paper hover:text-ink"
                >
                  Saber más <IconArrowUpRight className="size-4" />
                </CardItem>
                <CardItem translateZ={20} className="font-mono text-[11px] tracking-[0.18em] text-paper/55 uppercase">
                  iconmm.com
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
