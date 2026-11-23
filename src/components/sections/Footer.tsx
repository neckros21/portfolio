"use client";

import { site } from "@/content/site";
import { useContent } from "@/components/LangProvider";

export function Footer() {
  const c = useContent();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © 2026 Alexandros D. — {site.company} · {c.footer.company} {site.bce} — {c.footer.rights}
        </p>
        <p>{c.area}</p>
        <nav className="flex gap-6">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener" className="link-underline text-fg/70">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
