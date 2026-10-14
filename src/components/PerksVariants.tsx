import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconBook, IconCake, IconClock, IconHeart, IconSun, IconTrophy } from "@tabler/icons-react";
import Perks from "@/components/Perks";
import PrototypeSwitcher from "@/components/PrototypeSwitcher";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { CardStack } from "@/components/ui/card-stack";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { careers } from "@/data/pages";
import { cn } from "@/lib/utils";

/**
 * PROTOTIPO · Cuatro variantes de la sección "Cómo trabajamos" (ventajas) en /empleo,
 * conmutables con ?variant=A|B|C|D y con la barra flotante inferior.
 *  A · Bento grid (actual, Aceternity bento-grid)
 *  B · Lista editorial con resalte deslizante (técnica de card-hover-effect)
 *  C · Marquesina oscura de tarjetas (infinite-moving-cards + glowing-effect)
 *  D · Pila de tarjetas rotatoria con índice (card-stack)
 */

const icons = { clock: IconClock, sun: IconSun, cake: IconCake, book: IconBook, heart: IconHeart, trophy: IconTrophy };
type Perk = (typeof careers.perks)[number];
const Icon = ({ perk, className }: { perk: Perk; className?: string }) => {
  const I = icons[perk.icon as keyof typeof icons];
  return <I className={className} />;
};

const VARIANTS = [
  { key: "A", name: "Bento grid" },
  { key: "B", name: "Lista editorial" },
  { key: "C", name: "Marquesina" },
  { key: "D", name: "Pila de tarjetas" },
];

/* ---------- B · Lista editorial con resalte deslizante ---------- */
function VariantB() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <ol className="border-t border-line" onMouseLeave={() => setHovered(null)}>
      {careers.perks.map((perk, i) => (
        <li key={perk.title} className="relative border-b border-line" onMouseEnter={() => setHovered(i)}>
          <AnimatePresence>
            {hovered === i && (
              <motion.span
                layoutId="perk-hover"
                className="absolute -inset-x-4 inset-y-1 rounded-2xl bg-white/80 shadow-[0_10px_40px_-20px_rgba(20,20,24,0.25)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.15 } }}
              />
            )}
          </AnimatePresence>
          <div className="relative grid items-center gap-x-6 gap-y-2 py-6 md:grid-cols-[3rem_1fr_1.2fr_3rem] md:py-7">
            <span className="font-mono text-[11px] tracking-[0.18em] text-signal">0{i + 1}</span>
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink md:text-4xl">{perk.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted md:text-base">{perk.body}</p>
            <span className="hidden size-10 items-center justify-center rounded-full border border-line text-ink md:flex">
              <Icon perk={perk} className="size-5" />
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- C · Marquesina oscura de tarjetas ---------- */
function VariantC() {
  const items = careers.perks.map((p, i) => ({ ...p, name: p.title, index: i }));
  return (
    <div className="-mx-4 rounded-[2rem] bg-ink py-10 md:-mx-8 md:py-14">
      <p className="eyebrow mb-8 px-6 text-center text-paper/50 md:px-10">Seis razones para venirte a Palencia</p>
      {[0, 1].map((row) => (
        <InfiniteMovingCards
          key={row}
          items={[...items, ...items]}
          speed="slow"
          direction={row === 0 ? "left" : "right"}
          className="max-w-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          itemClassName="relative w-[20rem] shrink-0 rounded-3xl border-0 bg-transparent p-0 py-0 md:w-[24rem]"
          renderItem={(perk) => (
            <div className="relative h-full rounded-3xl border border-paper/10 bg-ink-2 p-1">
              <GlowingEffect spread={30} glow disabled={false} proximity={60} inactiveZone={0.2} borderWidth={1.5} />
              <div className="relative flex min-h-[11rem] flex-col justify-between rounded-[1.3rem] p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-full bg-paper/10 text-paper">
                    <Icon perk={perk} className="size-5" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.18em] text-signal">0{perk.index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-paper">{perk.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-paper/55">{perk.body}</p>
                </div>
              </div>
            </div>
          )}
        />
      ))}
    </div>
  );
}

/* ---------- D · Pila de tarjetas rotatoria ---------- */
function VariantD() {
  const cards = careers.perks.map((p, i) => ({
    id: i,
    name: p.title,
    designation: `0${i + 1} · ${p.body}`,
    content: (
      <span className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-paper text-ink ring-1 ring-line">
          <Icon perk={p} className="size-5" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] text-signal uppercase">Ventaja 0{i + 1}</span>
      </span>
    ),
  }));
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="max-w-md text-lg leading-relaxed text-muted">
          Un entorno joven y flexible donde el compromiso, el compañerismo y la cercanía son clave.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {careers.perks.map((p, i) => (
            <li key={p.title} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3.5 py-1.5 text-sm text-ink">
              <span className="font-mono text-[10px] text-signal">0{i + 1}</span>
              {p.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center py-6 lg:justify-end">
        <CardStack items={cards} offset={12} scaleFactor={0.05} />
      </div>
    </div>
  );
}

/* ---------- conmutador ---------- */
const readVariant = () => {
  if (typeof window === "undefined") return "A";
  const v = new URLSearchParams(window.location.search).get("variant")?.toUpperCase();
  return VARIANTS.some((x) => x.key === v) ? (v as string) : "A";
};

export default function PerksVariants() {
  const [variant, setVariant] = useState("A");
  useEffect(() => setVariant(readVariant()), []);

  const change = (key: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", key);
    window.history.replaceState(null, "", url);
    setVariant(key);
  };

  return (
    <>
      <div className={cn(variant === "C" && "mt-0")}>
        {variant === "A" && <Perks />}
        {variant === "B" && <VariantB />}
        {variant === "C" && <VariantC />}
        {variant === "D" && <VariantD />}
      </div>
      <PrototypeSwitcher variants={VARIANTS} current={variant} onChange={change} />
    </>
  );
}
