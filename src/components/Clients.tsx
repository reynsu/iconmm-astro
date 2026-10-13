import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { clients } from "@/data/site";

export default function Clients() {
  return (
    <InfiniteMovingCards
      items={clients}
      speed="slow"
      className="max-w-none [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
      itemClassName="group flex h-20 w-40 items-center justify-center rounded-2xl border border-line bg-white/[0.025] px-6 py-0 md:h-24 md:w-48 dark:border-line dark:bg-white/[0.025]"
      renderItem={(client) => (
        <img
          src={client.src}
          alt={client.name}
          loading="lazy"
          className="max-h-11 w-auto max-w-full object-contain opacity-70 brightness-0 invert transition duration-300 group-hover:opacity-100"
        />
      )}
    />
  );
}
