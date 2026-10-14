import { useMotionValue } from "motion/react";
import { IconCertificate, IconHeadset, IconSchool } from "@tabler/icons-react";
import { CardPattern, generateRandomString } from "@/components/ui/evervault-card";
import { partners } from "@/data/pages";
import { useEffect, useState } from "react";

const icons = {
  certificate: IconCertificate,
  school: IconSchool,
  headset: IconHeadset,
};

function BenefitCard({ benefit }: { benefit: (typeof partners.benefits)[number] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");
  useEffect(() => setRandomString(generateRandomString(1500)), []);

  const Icon = icons[benefit.icon as keyof typeof icons];

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
        setRandomString(generateRandomString(1500));
      }}
      className="group/card relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl border border-line-dark bg-ink-2 p-7 md:p-8"
    >
      <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />
      <div className="relative z-10 flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-full border border-paper/15 bg-paper/5 text-paper">
          <Icon className="size-5" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] text-signal-paper uppercase">{benefit.code}</span>
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl leading-tight font-semibold tracking-[-0.03em] text-balance text-paper">{benefit.title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-paper/60">{benefit.body}</p>
      </div>
    </div>
  );
}

export default function PartnerBenefits() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {partners.benefits.map((b) => (
        <BenefitCard key={b.code} benefit={b} />
      ))}
    </div>
  );
}
