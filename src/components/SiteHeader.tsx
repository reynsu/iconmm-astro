import { useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { StickyBanner } from "@/components/ui/sticky-banner";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarButton,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { event, nav } from "@/data/site";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StickyBanner className="relative z-50 min-h-11 border-b border-line bg-ink-2 py-2 pr-10">
        <a
          href={event.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 text-center text-[13px] text-fg/80"
        >
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          <span>
            DENEVA estará en <strong className="font-medium text-fg">{event.name}</strong>
            <span className="hidden sm:inline">
              {" "}· {event.city}, {event.dates} — soluciones PIS y digital signage
            </span>
          </span>
          <IconArrowUpRight className="size-4 shrink-0 text-signal transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </StickyBanner>

      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={nav} />
          <NavbarButton href="#contacto" variant="gradient" className="relative z-20 rounded-full px-5 font-medium">
            Hablemos
          </NavbarButton>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {nav.map((item) => (
              <a
                key={item.link}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="w-full border-b border-line pb-3 text-lg text-fg/90"
              >
                {item.name}
              </a>
            ))}
            <NavbarButton
              href="#contacto"
              variant="gradient"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-full font-medium"
            >
              Hablemos
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  );
}
