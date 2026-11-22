import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

export function Offer() {
  return (
    <section id="offre" className="border-t border-line bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="mb-5 text-sm text-accent">Offre</p>
        </Reveal>
        <SplitText text="Un site pro, sans prise de tête." className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-6xl" />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {site.offer.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08} className="bg-surface">
              <div className="group h-full p-8 transition-colors hover:bg-bg">
                <span className="font-serif text-4xl text-accent italic">0{i + 1}</span>
                <h3 className="mt-8 text-xl font-medium">{o.title}</h3>
                <p className="mt-3 text-fg/55">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-28 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h3 className="font-serif text-5xl leading-none md:text-6xl">
              Comment ça <em className="text-accent">se passe</em>
            </h3>
          </Reveal>
          <ol className="divide-y divide-line border-y border-line">
            {site.steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.08}>
                  <div className="grid grid-cols-[3rem_1fr] gap-4 py-7 md:grid-cols-[4rem_12rem_1fr]">
                    <span className="text-muted">0{i + 1}</span>
                    <span className="text-xl font-medium">{s.title}</span>
                    <span className="col-start-2 text-fg/55 md:col-start-3">{s.text}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
