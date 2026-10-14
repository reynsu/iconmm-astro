import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconArrowUpRight, IconBuilding, IconMapPin, IconPlus } from "@tabler/icons-react";
import { careers } from "@/data/pages";
import { cn } from "@/lib/utils";

function Column({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="eyebrow text-signal">{title}</p>
      <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink/75">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink/40" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JobList() {
  const [open, setOpen] = useState<string | null>(careers.jobs[0]?.slug ?? null);

  return (
    <ol className="border-t border-line">
      {careers.jobs.map((job, i) => {
        const isOpen = open === job.slug;
        return (
          <li key={job.slug} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`job-${job.slug}`}
              onClick={() => setOpen(isOpen ? null : job.slug)}
              className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-6 text-left md:grid-cols-[3rem_1fr_auto] md:py-8"
            >
              <span className="pt-1 font-mono text-[11px] tracking-[0.18em] text-signal">0{i + 1}</span>
              <span>
                <span className="block text-xl font-semibold tracking-[-0.025em] text-ink transition group-hover:text-signal md:text-3xl">
                  {job.title}
                </span>
                <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  <span className="inline-flex items-center gap-1.5"><IconBuilding className="size-3.5" />{job.department}</span>
                  <span className="inline-flex items-center gap-1.5"><IconMapPin className="size-3.5" />{job.location}</span>
                  <span>{job.modality}</span>
                </span>
              </span>
              <span
                className={cn(
                  "mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition duration-300",
                  isOpen ? "rotate-45 bg-ink text-paper" : "group-hover:border-ink/40",
                )}
              >
                <IconPlus className="size-4" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`job-${job.slug}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-8 pl-[3.5rem] md:grid-cols-[1.2fr_1fr_1fr] md:pl-[4rem] md:pb-10">
                    <div>
                      <p className="max-w-md text-[15px] leading-relaxed text-pretty text-ink/80">{job.summary}</p>
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-signal"
                      >
                        Inscribirme <IconArrowUpRight className="size-4" />
                      </a>
                    </div>
                    <Column title={job.functions.length ? "Funciones" : "Qué ofrecemos"} items={job.functions.length ? job.functions : job.offer} />
                    <Column title="Qué buscamos" items={job.profile} />
                    {job.functions.length > 0 && (
                      <div className="md:col-start-2 md:col-span-2">
                        <Column title="Qué ofrecemos" items={job.offer} />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
