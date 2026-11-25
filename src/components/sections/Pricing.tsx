"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useContent } from "@/components/LangProvider";

export function Pricing() {
  const all = useContent();
  const c = all.pricing;
  return (
    <section id="tarifs" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Reveal>
              <p className="mb-5 text-sm text-accent">{c.eyebrow}</p>
            </Reveal>
            <SplitText text={c.title} className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl" />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg text-fg/60 lg:justify-self-end">{c.intro}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {c.plans.map((p, i) => {
            const featured = i === 1;
            return (
              <Reveal key={p.name} delay={i * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`relative flex h-full flex-col rounded-3xl p-8 md:p-10 ${
                    featured ? "bg-fg text-bg shadow-2xl shadow-accent/20" : "border border-line bg-surface"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                      {c.popular}
                    </span>
                  )}
                  <h3 className="font-serif text-3xl italic">{p.name}</h3>
                  <p className={`mt-3 min-h-12 ${featured ? "text-bg/65" : "text-fg/60"}`}>{p.text}</p>

                  <div className="mt-8 flex items-baseline gap-2">
                    {p.from && <span className={`text-sm ${featured ? "text-bg/60" : "text-muted"}`}>{c.from}</span>}
                    <span className="text-5xl font-semibold tracking-[-0.03em] tabular-nums">{p.price}</span>
                  </div>
                  <p className={`mt-2 text-sm ${featured ? "text-bg/60" : "text-muted"}`}>{p.delay}</p>

                  <ul className={`mt-8 mb-10 grid gap-3 border-t pt-8 text-[15px] ${featured ? "border-bg/15" : "border-line"}`}>
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m5 10.5 3.2 3L15 7" />
                        </svg>
                        <span className={featured ? "text-bg/85" : "text-fg/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`group mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium transition-transform hover:scale-[1.02] ${
                      featured ? "bg-accent text-white" : "border border-fg/20 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {c.cta}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-6 grid gap-8 rounded-3xl border border-line bg-surface p-8 md:p-10 lg:grid-cols-[0.9fr_1.3fr_auto] lg:items-center">
            <div>
              <h3 className="font-serif text-3xl italic">{c.care.name}</h3>
              <p className="mt-3 text-fg/60">{c.care.text}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-[-0.03em] tabular-nums">{c.care.price}</span>
                <span className="text-muted">{c.care.period}</span>
              </p>
            </div>
            <ul className="grid gap-3 text-[15px] sm:grid-cols-2">
              {c.care.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 10.5 3.2 3L15 7" />
                  </svg>
                  <span className="text-fg/80">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-fg/20 px-6 py-3.5 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {c.care.cta}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-fg/60">
            {c.note}{" "}
            <a href="#contact" className="link-underline font-medium text-fg">
              {all.nav.contact} →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
