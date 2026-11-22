import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © 2026 Alexandros D. — {site.company} · N° d&apos;entreprise {site.bce} — Tous droits réservés.
        </p>
        <p>{site.area}</p>
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
