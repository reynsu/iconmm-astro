import { useEffect, useState } from "react";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import PrototypeSwitcher from "@/components/PrototypeSwitcher";
import { STATS_VARIANTS, StatsVariant } from "@/components/CsrStatsVariants";
import { csr } from "@/data/pages";

// PROTOTIPO · tres variantes del panel "En cifras", conmutables con ?variant=A|B|C en /rsc.
function useVariant() {
  const [variant, setVariant] = useState(STATS_VARIANTS[0].key);
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("variant");
    if (v && STATS_VARIANTS.some((x) => x.key === v)) setVariant(v);
  }, []);
  const change = (key: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", key);
    history.replaceState(null, "", url);
    setVariant(key);
  };
  return [variant, change] as const;
}

export default function CsrCommitments() {
  const [variant, setVariant] = useVariant();

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
    content: <StatsVariant key={variant} variant={variant} stats={c.stats} index={c.index} />,
  }));

  return (
    <>
      <StickyScroll content={content} contentClassName="rounded-3xl" />
      <PrototypeSwitcher variants={STATS_VARIANTS} current={variant} onChange={setVariant} />
    </>
  );
}
