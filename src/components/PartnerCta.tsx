import { IconArrowDown } from "@tabler/icons-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function PartnerCta() {
  return (
    <div className="text-center">
      <h2 className="mx-auto max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-balance text-ink md:text-6xl">
        Abre tu empresa a{" "}
        <PointerHighlight containerClassName="inline-block align-baseline" rectangleClassName="border-signal/70" pointerClassName="text-signal">
          <span className="relative z-10 px-2 font-serif font-normal tracking-normal text-ink/80 italic">nuevas oportunidades</span>
        </PointerHighlight>{" "}
        de negocio
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted">
        Cuéntanos a qué clientes llegas y te proponemos cómo empezar.
      </p>
      <div className="mt-10 flex justify-center">
        <HoverBorderGradient as="a" href="#hablamos" containerClassName="rounded-full" className="flex items-center gap-2 px-6 py-3 text-[15px] font-medium">
          Quiero ser partner <IconArrowDown className="size-4" />
        </HoverBorderGradient>
      </div>
    </div>
  );
}
