import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { social } from "@/data/site";

const icons: Record<string, React.ReactNode> = {
  LinkedIn: <IconBrandLinkedin className="h-full w-full" />,
  Instagram: <IconBrandInstagram className="h-full w-full" />,
  X: <IconBrandX className="h-full w-full" />,
  YouTube: <IconBrandYoutube className="h-full w-full" />,
  Facebook: <IconBrandFacebook className="h-full w-full" />,
};

export default function SocialDock() {
  return (
    <>
      <FloatingDock
        items={social.map((s) => ({ title: s.name, href: s.href, icon: icons[s.name] }))}
        desktopClassName="mx-0"
        mobileClassName="hidden"
      />
      <ul className="flex flex-wrap gap-2 md:hidden" aria-label="Redes sociales">
        {social.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className="flex size-10 items-center justify-center rounded-full bg-paper/10 p-2.5 text-paper"
            >
              {icons[s.name]}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
