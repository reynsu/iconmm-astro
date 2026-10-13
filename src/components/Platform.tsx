import type { ReactNode } from "react";
import {
  IconActivity,
  IconChartHistogram,
  IconCpu,
  IconLayoutGrid,
  IconShieldCheck,
} from "@tabler/icons-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { capabilities, sectors } from "@/data/site";

const ICONS: Record<string, ReactNode> = {
  layers: <IconLayoutGrid className="size-5" />,
  activity: <IconActivity className="size-5" />,
  cpu: <IconCpu className="size-5" />,
  shield: <IconShieldCheck className="size-5" />,
  chart: <IconChartHistogram className="size-5" />,
};

// Posición de cada tarjeta en la rejilla de 12 columnas
const AREAS = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-7",
];

function Tile({ area, children }: { area?: string; children: ReactNode }) {
  return (
    <li className={cn("min-h-[13rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border border-line p-2 md:rounded-[1.5rem] md:p-2.5">
        <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-line bg-ink-2 p-6 shadow-[0_0_27px_0_rgba(0,0,0,0.5)]">
          {children}
        </div>
      </div>
    </li>
  );
}

// Mini red de pantallas que se encienden en secuencia
function ScreenWall() {
  return (
    <div aria-hidden className="grid flex-1 grid-cols-6 content-center gap-1.5 py-4">
      {Array.from({ length: 36 }, (_, i) => (
        <span
          key={i}
          className="aspect-video rounded-[3px] border border-white/5 bg-white/[0.04] [animation:screen-on_4.8s_ease-in-out_infinite]"
          style={{ animationDelay: `${((i * 7) % 36) * 0.13}s` }}
        />
      ))}
      <style>{`@keyframes screen-on{0%,70%,100%{background:rgb(255 255 255/.04);box-shadow:none}78%{background:#fc4444;box-shadow:0 0 12px 1px rgb(252 68 68/.6)}88%{background:rgb(252 68 68/.35)}}`}</style>
    </div>
  );
}

export default function Platform() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-3">
      {capabilities.map((item, i) => (
        <Tile key={item.title} area={AREAS[i]}>
          <div className="flex size-10 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-signal">
            {ICONS[item.icon]}
          </div>
          {i === 0 && <ScreenWall />}
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{item.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted md:text-[15px]">{item.description}</p>
          </div>
        </Tile>
      ))}
      <Tile area="md:col-span-2 lg:col-span-5">
        <p className="eyebrow">Sectores</p>
        <ul className="flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <li key={sector} className="rounded-full border border-line px-3 py-1.5 text-sm text-fg/85">
              {sector}
            </li>
          ))}
        </ul>
      </Tile>
    </ul>
  );
}
