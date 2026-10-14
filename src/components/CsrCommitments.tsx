import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Counter from "@/components/Counter";
import { csr } from "@/data/pages";

function Stats({ stats }: { stats: { value: number; label: string }[] }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-line-dark bg-ink p-7 text-paper md:p-9">
      <p className="eyebrow text-paper/45">En cifras</p>
      <dl className={stats.length > 2 ? "grid grid-cols-2 gap-6" : "space-y-8"}>
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="text-5xl font-semibold tracking-[-0.04em] tabular-nums md:text-6xl">
              <Counter value={s.value} />
            </dd>
            <dt className="mt-2 max-w-[14rem] text-sm leading-snug text-paper/55">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function CsrCommitments() {
  const content = csr.commitments.map((c) => ({
    title: c.title,
    description: c.body,
    eyebrow: (
      <p className="eyebrow mb-5 flex items-center gap-3">
        <span className="text-signal">[{c.index}]</span> Compromiso
      </p>
    ),
    meta: (
      <div className="mt-6">
        <ul className="space-y-2.5">
          {c.points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[15px] text-ink/80">
              <IconCheck className="mt-1 size-4 shrink-0 text-signal" />
              {p}
            </li>
          ))}
        </ul>
        {c.link && (
          <a href={c.link.href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-signal">
            {c.link.label} <IconArrowRight className="size-4" />
          </a>
        )}
      </div>
    ),
    content: <Stats stats={c.stats} />,
  }));

  return <StickyScroll content={content} contentClassName="rounded-3xl" />;
}
