"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useContent } from "@/components/LangProvider";

type Project = (typeof site.projects)[number];

function BrowserFrame({ project, label }: { project: Project; label: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div className="[perspective:1400px]" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div style={{ rotateX, rotateY }} className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(91,91,246,0.22)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 truncate rounded-md bg-bg px-3 py-1 text-xs text-muted">
            {project.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image src={project.image} alt={`${label} ${project.name}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-top" />
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const c = useContent().projects;
  return (
    <section id="projets" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <p className="mb-5 text-sm text-accent">{c.eyebrow}</p>
          </Reveal>
          <SplitText text={c.title} className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl" />
        </div>
        <Reveal delay={0.2}>
          <p className="max-w-sm text-fg/55">
            {c.intro}
          </p>
        </Reveal>
      </div>

      <div className="space-y-28 md:space-y-40">
        {site.projects.map((p, i) => {
          const t = c.items[p.slug];
          return (
          <article
            key={p.slug}
            className={`grid items-center gap-10 lg:gap-16 ${i % 2 === 1 ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]"}`}
          >
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <BrowserFrame project={p} label={c.preview} />
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex items-center gap-3 text-sm text-muted">
                <span>0{i + 1}</span>
                <span className="h-px w-8 bg-line" />
                <span>{t.sector}</span>
              </div>
              <h3 className="mt-5 font-serif text-5xl md:text-6xl">{p.name}</h3>
              <p className="mt-5 leading-relaxed text-fg/65">{t.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {t.features.map((f) => (
                  <li key={f} className="rounded-full border border-line px-3 py-1.5 text-xs text-fg/75">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2" aria-label={c.palette}>
                {p.colors.map((c) => (
                  <span key={c} className="h-6 w-6 rounded-full border border-line" style={{ background: c }} />
                ))}
                <span className="ml-2 rounded-full bg-surface px-3 py-1 text-xs text-muted">{c.concept}</span>
              </div>
              <a href={p.url} target="_blank" rel="noopener" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-bg">
                {c.view}
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </Reveal>
          </article>
          );
        })}
      </div>
    </section>
  );
}
