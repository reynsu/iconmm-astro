import { IconArrowUpRight, IconCalendarEvent, IconMapPin } from "@tabler/icons-react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { event } from "@/data/site";
import { pic } from "@/lib/images";

export default function InnoTransCard() {
  return (
    <WobbleCard containerClassName="min-h-[280px] text-paper" className="p-0">
      <div className="grid items-center gap-8 p-7 md:grid-cols-[1.2fr_1fr] md:p-10 lg:gap-14">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-3 text-paper/55">
            <span className="text-signal-paper">●</span> {event.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            {event.title}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-pretty text-paper/65 md:text-base">{event.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-paper/60">
            <span className="inline-flex items-center gap-2">
              <IconCalendarEvent className="size-4 text-signal-paper" /> {event.dates}
            </span>
            <span className="inline-flex items-center gap-2">
              <IconMapPin className="size-4 text-signal-paper" /> Messe {event.city}
            </span>
          </div>
          <div className="mt-8">
            <HoverBorderGradient
              as="a"
              href={event.url}
              containerClassName="rounded-full bg-paper/20"
              className="flex items-center gap-2 bg-paper px-5 py-2.5 text-sm font-medium text-ink"
            >
              Más info <IconArrowUpRight className="size-4" />
            </HoverBorderGradient>
          </div>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-full bg-signal/30 blur-3xl" />
          <img
            {...pic(event.image, "(min-width: 768px) 40vw, 90vw")}
            alt="Cartel de InnoTrans 2026, the future of mobility"
            loading="lazy"
            className="w-full rotate-2 rounded-2xl object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-paper/10 transition duration-500 hover:rotate-0"
          />
        </div>
      </div>
    </WobbleCard>
  );
}
