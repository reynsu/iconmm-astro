import { useState } from "react";
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
import { nav } from "@/data/site";
import { withBase } from "@/lib/url";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar className="fixed">
      <NavBody>
        <NavbarLogo />
        <NavItems items={nav} />
        <NavbarButton href={withBase("/contacto")} variant="dark" className="relative z-20 rounded-full bg-ink px-5 font-medium text-paper">
          Contacto
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
              className="w-full border-b border-line pb-3 text-lg text-ink"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            href={withBase("/contacto")}
            variant="dark"
            onClick={() => setIsOpen(false)}
            className="w-full rounded-full bg-ink font-medium text-paper"
          >
            Contacto
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
