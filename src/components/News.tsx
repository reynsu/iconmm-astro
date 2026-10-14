import { FocusCards } from "@/components/ui/focus-cards";
import { news } from "@/data/site";

export default function News() {
  return (
    <FocusCards
      cards={news.map((item) => ({ title: item.title, src: item.image, eyebrow: item.date, href: item.link, cta: "Leer más" }))}
    />
  );
}
