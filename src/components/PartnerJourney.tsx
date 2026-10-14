import { Timeline } from "@/components/ui/timeline";
import { partners } from "@/data/pages";

export default function PartnerJourney() {
  const data = partners.journey.map((step) => ({
    title: (
      <span className="flex items-baseline gap-4">
        <span className="font-mono text-sm tracking-[0.18em] text-signal-ink">{step.step}</span>
        {step.title}
      </span>
    ),
    content: (
      <div className="rounded-3xl border border-line bg-white/60 p-6 md:p-8">
        <p className="max-w-xl text-base leading-relaxed text-pretty text-ink/75 md:text-lg">{step.body}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return <Timeline data={data} />;
}
