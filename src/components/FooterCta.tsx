import { IconArrowRight, IconPhone } from "@tabler/icons-react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { offices } from "@/data/site";
import { withBase } from "@/lib/url";

const [emea] = offices;

export default function FooterCta() {
  return (
    <BackgroundLines className="overflow-hidden" svgOptions={{ duration: 12 }}>
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center md:px-8 md:py-32">
        <p className="eyebrow text-paper/50">
          <span className="text-signal-paper">[05]</span> Contacto
        </p>
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-paper md:text-7xl">
          ¿Hablamos de tu <em className="font-serif font-normal tracking-normal text-signal italic">próxima pantalla</em>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-paper/60">
          Nuestro equipo comercial te ayuda a encontrar la solución que mejor encaja, y el de soporte está disponible
          para que tu red esté siempre lista.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <HoverBorderGradient
            as="a"
            href={withBase("/contacto")}
            containerClassName="rounded-full bg-paper/20"
            className="flex items-center gap-2 bg-paper px-6 py-3 text-[15px] font-medium text-ink"
          >
            Hablar con ventas <IconArrowRight className="size-4" />
          </HoverBorderGradient>
          <a
            href={`tel:${emea.phone.replace(/\s/g, "")}`}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-paper/15 px-6 font-mono text-sm text-paper/80 transition hover:border-paper/40 hover:text-paper"
          >
            <IconPhone className="size-4 text-signal-paper" /> {emea.phone}
          </a>
        </div>
      </div>
    </BackgroundLines>
  );
}
