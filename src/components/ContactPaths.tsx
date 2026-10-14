import { IconArrowRight, IconBriefcase, IconHeadset } from "@tabler/icons-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { contact } from "@/data/pages";

const icons = { briefcase: IconBriefcase, headset: IconHeadset };

export default function ContactPaths() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {contact.paths.map((p) => {
        const Icon = icons[p.icon as keyof typeof icons];
        return (
          <div key={p.id} className="relative rounded-[2rem] border border-line bg-white/50 p-2">
            <GlowingEffect spread={40} glow disabled={false} proximity={80} inactiveZone={0.01} borderWidth={2} />
            <div className="relative flex h-full flex-col justify-between rounded-[1.6rem] bg-paper p-7 md:p-9">
              <span className="flex size-11 items-center justify-center rounded-full bg-ink text-paper">
                <Icon className="size-5" />
              </span>
              <div className="mt-10">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink md:text-3xl">{p.title}</h2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{p.body}</p>
                <a href={`#${p.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-signal">
                  {p.cta} <IconArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
