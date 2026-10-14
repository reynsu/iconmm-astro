import { IconBook, IconCake, IconClock, IconHeart, IconSun, IconTrophy } from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { careers } from "@/data/pages";

const icons = { clock: IconClock, sun: IconSun, cake: IconCake, book: IconBook, heart: IconHeart, trophy: IconTrophy };

export default function Perks() {
  return (
    <BentoGrid className="md:auto-rows-[13rem]">
      {careers.perks.map((perk, i) => {
        const Icon = icons[perk.icon as keyof typeof icons];
        return (
          <BentoGridItem
            key={perk.title}
            className={i === 0 || i === 5 ? "md:col-span-2" : ""}
            header={
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-ink">
                  <Icon className="size-5" />
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-signal">0{i + 1}</span>
              </div>
            }
            title={<span className="text-lg font-semibold tracking-[-0.02em] text-ink">{perk.title}</span>}
            description={<span className="text-[14px] leading-relaxed text-muted">{perk.body}</span>}
          />
        );
      })}
    </BentoGrid>
  );
}
