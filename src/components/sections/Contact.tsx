"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-48">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[900px] -translate-x-1/2 translate-y-1/2 rounded-full bg-lime/15 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-10">
        <Reveal>
          <p className="mb-6 text-sm text-lime">Contact</p>
        </Reveal>
        <SplitText text="Un projet de site ? Parlons-en." className="text-5xl leading-[1.02] font-semibold tracking-[-0.04em] md:text-8xl" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-lg text-lg text-snow/60">
            Écrivez-moi sur Malt : je réponds en moins d&apos;une heure et je vous propose un premier échange gratuit.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <motion.a
            href={site.malt}
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-lime px-10 py-5 text-lg font-medium text-night"
          >
            Me contacter sur Malt
            <span>↗</span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
