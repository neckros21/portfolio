"use client";

import { motion } from "motion/react";
import { site, whatsappHref } from "@/content/site";
import { useContent, useLang } from "@/components/LangProvider";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";

export function Contact() {
  const lang = useLang();
  const c = useContent().contact;
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-48">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="text-center">
          <Reveal>
            <p className="mb-6 text-sm text-accent">{c.eyebrow}</p>
          </Reveal>
          <SplitText text={c.title} className="text-5xl leading-[1.02] font-semibold tracking-[-0.04em] md:text-8xl" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-lg text-lg text-fg/60">
              {c.text}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>

          <div className="grid content-start gap-6">
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-line bg-bg/70 p-6 backdrop-blur md:p-8">
                <p className="text-sm text-muted">{c.direct}</p>
                <motion.a
                  href={whatsappHref(lang)}
                  target="_blank"
                  rel="noopener"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-5 flex items-center gap-4 rounded-2xl bg-[#25d366] px-5 py-4 font-medium text-white"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                  <span className="flex-1">{c.whatsapp}</span>
                  <span aria-hidden>↗</span>
                </motion.a>
                <a href={`tel:${site.phone.tel}`} className="group mt-3 flex items-center gap-4 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden className="h-5 w-5 text-accent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.37c0-.52-.35-.97-.85-1.09l-4.42-1.1c-.44-.12-.9.05-1.17.41l-.97 1.29a1.13 1.13 0 0 1-1.21.38 12.04 12.04 0 0 1-7.14-7.14 1.13 1.13 0 0 1 .38-1.21l1.29-.97c.36-.27.53-.73.41-1.17l-1.1-4.42a1.13 1.13 0 0 0-1.09-.85H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
                  </svg>
                  <span className="flex-1 tabular-nums">{site.phone.label}</span>
                  <span className="text-sm text-muted transition-colors group-hover:text-accent">{c.call}</span>
                </a>
                <a href={site.malt} target="_blank" rel="noopener" className="group mt-3 flex items-center gap-4 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-accent">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#fc5757] text-[10px] font-bold text-white">M</span>
                  <span className="flex-1">{c.malt}</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-3xl border border-line bg-bg/70 p-6 backdrop-blur md:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted">{c.fiverr}</p>
                  <span className="rounded-full bg-[#1dbf73]/15 px-3 py-1 text-xs font-medium text-[#1a9e60] dark:text-[#3ddc91]">{c.secure}</span>
                </div>
                <div className="mt-5 grid gap-3">
                  {site.gigs.map((gig) => {
                    const g = { ...gig, ...c.gigs[gig.id] };
                    return (
                    <motion.a
                      key={g.href}
                      href={g.href}
                      target="_blank"
                      rel="noopener"
                      whileHover={{ y: -3 }}
                      className="group block rounded-2xl border border-line p-5 transition-colors hover:border-[#1dbf73]"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-serif text-2xl">{g.label}</span>
                        <span className="shrink-0 text-sm text-muted">{c.from} {g.from}</span>
                      </div>
                      <p className="mt-1 text-sm text-fg/60">{g.text}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#1a9e60] dark:text-[#3ddc91]">
                        {c.viewGig}
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </motion.a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-muted">{c.socials}</span>
            {site.socials.slice(2).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {s.label}
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
