"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/content/site";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-night/80 backdrop-blur-md" : ""}`}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="flex items-center gap-3 text-sm font-medium">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-snow font-serif text-lg text-night italic">A</span>
          {site.name}
        </a>
        <nav className="flex items-center gap-6 text-sm text-snow/70 md:gap-8">
          {site.nav.slice(0, 2).map((l) => (
            <a key={l.href} href={l.href} className="link-underline hidden hover:text-snow sm:inline">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-lime px-4 py-2 font-medium text-night transition-transform hover:scale-105">
            Me contacter
          </a>
        </nav>
      </div>
    </header>
  );
}
