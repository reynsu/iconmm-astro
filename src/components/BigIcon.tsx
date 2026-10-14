import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function BigIcon() {
  return (
    <div className="h-[32vw] max-h-[26rem] w-full" aria-hidden="true">
      <TextHoverEffect text="ICON" duration={0.2} />
    </div>
  );
}
