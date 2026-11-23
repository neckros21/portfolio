"use client";

// Lien classique (rechargement complet) : chaque langue a sa propre mise en page racine
import { locales } from "@/i18n/config";
import { useContent, useLang } from "@/components/LangProvider";

export function LangSwitch() {
  const lang = useLang();
  const c = useContent();
  return (
    <div role="group" aria-label={c.lang.label} className="flex items-center rounded-full border border-line p-0.5 text-xs font-semibold">
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          aria-label={c.lang[l]}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${l === lang ? "bg-fg text-bg" : "text-fg/55 hover:text-fg"}`}
        >
          {l}
        </a>
      ))}
    </div>
  );
}
