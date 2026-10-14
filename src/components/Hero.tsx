import { IconArrowRight } from "@tabler/icons-react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import PaperDancer from "@/components/PaperDancer";

const words = ["cartelería digital", "información al viajero", "probadores inteligentes", "kioscos de autoservicio"];

export default function Hero() {
  return (
    <HeroHighlight
      containerClassName="h-auto min-h-0 items-stretch justify-start bg-transparent [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
      className="w-full"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pt-28 pb-10 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:pt-32 lg:pb-16">
        <div className="relative z-10 order-2 lg:order-1">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block size-1.5 rounded-full bg-signal" />
            Fabricantes de software de digital signage
          </p>
          <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.9rem)] leading-[0.96] font-semibold tracking-[-0.045em] text-balance text-ink">
            Enabling
            <br />a{" "}
            <Highlight className="rounded-[0.35em] from-signal to-signal-deep px-[0.18em] pb-[0.06em] text-paper">
              smart future
            </Highlight>
          </h1>
          <div className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted md:text-xl">
            Software propio para
            <FlipWords words={words} duration={2600} className="px-1.5 font-serif text-[1.15em] text-ink italic" />
            <br className="hidden sm:block" />
            Una plataforma para gestionar una pantalla o miles, desde Palencia y Ciudad de México.
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <HoverBorderGradient
              as="a"
              href="#soluciones"
              containerClassName="rounded-full"
              className="flex items-center gap-2 px-6 py-3 text-[15px] font-medium"
            >
              Descubrir soluciones <IconArrowRight className="size-4" />
            </HoverBorderGradient>
            <a
              href="/contacto"
              className="group inline-flex h-12 items-center gap-2 px-2 text-[15px] font-medium text-ink/70 transition hover:text-ink"
            >
              Hablar con nosotros
              <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <PaperDancer className="relative h-[62vw] max-h-[520px] min-h-[300px] w-full cursor-crosshair lg:h-[640px] lg:max-h-none lg:w-[calc(100%+6rem)] lg:-translate-x-6" />
          <p className="eyebrow mt-2 text-center text-[10px] lg:hidden">Toca la bailarina</p>
        </div>
      </div>
    </HeroHighlight>
  );
}
