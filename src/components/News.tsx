import { FocusCards } from "@/components/ui/focus-cards";
import { news } from "@/data/site";
import type { ImgAttrs } from "@/lib/img-types";

export default function News({ images }: { images: Record<string, ImgAttrs> }) {
  return (
    <FocusCards
      cards={news.map((item) => ({ title: item.title, src: item.image, image: images[item.image], eyebrow: item.date, href: item.link, cta: "Leer más" }))}
    />
  );
}
