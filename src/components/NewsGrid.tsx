import { IconArrowUpRight } from "@tabler/icons-react";
import { FocusCards } from "@/components/ui/focus-cards";
import { newsAll } from "@/data/pages";

export default function NewsGrid() {
  const withImage = newsAll.filter((n) => n.image);
  const [featured, ...rest] = withImage;
  const older = newsAll.filter((n) => !n.image);

  return (
    <div className="space-y-20">
      {/* Destacada */}
      <a
        href={featured.link}
        target="_blank"
        rel="noreferrer"
        className="group grid overflow-hidden rounded-[2rem] border border-line bg-ink text-paper md:grid-cols-[1.25fr_1fr]"
      >
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[26rem]">
          <img
            src={featured.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between p-7 md:p-10">
          <p className="eyebrow flex items-center gap-3 text-paper/50">
            <span className="text-signal">●</span> Destacado · {featured.date}
          </p>
          <div>
            <h2 className="mt-8 text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-4xl">{featured.title}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/60">{featured.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-signal">
              Leer la noticia <IconArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </a>

      {/* Rejilla */}
      <FocusCards
        className="lg:grid-cols-3"
        cards={rest.map((n) => ({ title: n.title, src: n.image!, eyebrow: n.date, href: n.link, cta: "Leer más" }))}
      />

      {/* Anteriores */}
      <div>
        <p className="eyebrow">Anteriores</p>
        <ol className="mt-5 border-t border-line">
          {older.map((n) => (
            <li key={n.title} className="border-b border-line">
              <a
                href={n.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:gap-8"
              >
                <span className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-muted uppercase md:w-28">{n.date}</span>
                <span className="text-lg font-medium tracking-[-0.015em] text-ink transition group-hover:text-signal md:text-xl">{n.title}</span>
                <IconArrowUpRight className="ml-auto hidden size-4 shrink-0 text-muted transition group-hover:text-signal md:block" />
              </a>
            </li>
          ))}
        </ol>
        <a
          href="https://www.iconmm.com/es/noticias/"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition hover:border-ink/40"
        >
          Hemeroteca completa en iconmm.com <IconArrowUpRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
