"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { SplitText } from "@/components/motion/SplitText";
import { ease } from "@/components/motion/Reveal";

export function Hero() {
  const items = [...site.stack, ...site.stack];
  return (
    <section id="top" className="relative overflow-hidden pt-36 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-lime/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-night-2 px-4 py-2 text-sm text-snow/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          Disponible pour de nouveaux projets
        </motion.p>
        <SplitText
          as="h1"
          text={site.hero.title}
          delay={0.3}
          className="max-w-5xl text-5xl leading-[1.02] font-semibold tracking-[-0.04em] sm:text-6xl md:text-[5.5rem]"
        />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1 }}
          className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-lg leading-relaxed text-snow/65">{site.hero.text}</p>
          <div className="flex shrink-0 gap-3">
            <a href="#projets" className="group flex items-center gap-2 rounded-full bg-snow px-6 py-3.5 font-medium text-night">
              Voir mes projets
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a href={site.malt} target="_blank" rel="noopener" className="rounded-full border border-line px-6 py-3.5 transition-colors hover:border-snow/40">
              Profil Malt
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="mt-24 overflow-hidden border-y border-line py-5"
        aria-label={`Technologies : ${site.stack.join(", ")}`}
      >
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap" aria-hidden>
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-12 font-serif text-3xl text-snow/50 italic">
              {t}
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
