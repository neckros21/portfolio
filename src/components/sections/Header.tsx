"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangSwitch } from "@/components/LangSwitch";
import { useContent } from "@/components/LangProvider";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const c = useContent();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-bg/80 backdrop-blur-md" : ""}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="flex items-center gap-3 text-sm font-medium">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-fg font-serif text-lg text-bg italic">A</span>
          {site.name}
        </a>
        <nav className="flex items-center gap-3 text-sm text-fg/70 sm:gap-4 md:gap-6">
          <a href="#projets" className="link-underline hidden hover:text-fg md:inline">{c.nav.projects}</a>
          <a href="#offre" className="link-underline hidden hover:text-fg md:inline">{c.nav.offer}</a>
          <LangSwitch />
          <ThemeToggle />
          <a href="#contact" className="hidden rounded-full bg-accent px-4 py-2 font-medium whitespace-nowrap text-bg transition-transform hover:scale-105 sm:inline-block">
            {c.nav.contact}
          </a>
        </nav>
      </div>
    </header>
  );
}
