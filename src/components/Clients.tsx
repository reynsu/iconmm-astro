import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { clients } from "@/data/site";

const half = Math.ceil(clients.length / 2);
const rows = [clients.slice(0, half), clients.slice(half)];

export default function Clients() {
  return (
    <div className="space-y-4">
      {rows.map((row, i) => (
        <InfiniteMovingCards
          key={i}
          items={row}
          speed="slow"
          direction={i === 0 ? "left" : "right"}
          className="max-w-none [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]"
          itemClassName="group flex h-20 w-44 items-center justify-center rounded-2xl border border-line bg-white/70 px-6 py-0 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] md:h-24 md:w-52"
          renderItem={(client) => (
            <img
              src={client.src}
              alt={client.name}
              loading="lazy"
              className="max-h-11 w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          )}
        />
      ))}
    </div>
  );
}
