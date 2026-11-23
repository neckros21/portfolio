"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";

const projects = ["Site vitrine", "Boutique en ligne", "Refonte d'un site", "Autre"];
type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full rounded-2xl border bg-surface/60 px-5 py-4 text-fg outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/10";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [project, setProject] = useState(projects[0]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = "Adresse e-mail invalide.";
    if ((data.message ?? "").trim().length < 10) next.message = "Quelques mots de plus sur votre projet ?";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, project }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative rounded-3xl border border-line bg-bg/70 p-6 backdrop-blur md:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-accent text-2xl text-bg"
            >
              ✓
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">Message envoyé !</h3>
            <p className="mt-3 max-w-sm text-fg/60">Merci, je vous réponds très vite, en général dans l&apos;heure.</p>
            <button onClick={() => setStatus("idle")} className="link-underline mt-8 text-sm text-accent">
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -12 }} onSubmit={onSubmit} noValidate className="grid gap-5 text-left">
            <div>
              <p className="mb-3 text-sm text-muted">Votre projet</p>
              <div className="flex flex-wrap gap-2">
                {projects.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProject(p)}
                    aria-pressed={project === p}
                    className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${project === p ? "border-accent text-bg" : "border-line text-fg/70 hover:border-fg/30"}`}
                  >
                    {project === p && <motion.span layoutId="project-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className="relative">{p}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm text-muted">Nom</span>
                <input name="name" autoComplete="name" placeholder="Votre nom" aria-invalid={!!errors.name} className={`${field} ${errors.name ? "border-red-500/70" : "border-line"}`} />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-muted">E-mail</span>
                <input name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" aria-invalid={!!errors.email} className={`${field} ${errors.email ? "border-red-500/70" : "border-line"}`} />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm text-muted">Message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Votre activité, ce que vous aimeriez sur votre site, vos délais…"
                aria-invalid={!!errors.message}
                className={`${field} resize-none ${errors.message ? "border-red-500/70" : "border-line"}`}
              />
              {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
            </label>

            {/* Champ piège anti-spam, invisible pour les visiteurs */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <div className="flex flex-col-reverse gap-4 xl:flex-row xl:items-center xl:justify-between">
              <p className="text-center text-xs text-muted xl:text-left">Réponse en moins d&apos;une heure · Premier échange gratuit</p>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 font-medium whitespace-nowrap text-bg disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/40 border-t-bg" />
                    Envoi…
                  </>
                ) : (
                  <>
                    Envoyer le message <span aria-hidden>→</span>
                  </>
                )}
              </motion.button>
            </div>
            {status === "error" && (
              <p className="text-sm text-red-500" role="alert">
                L&apos;envoi n&apos;a pas fonctionné. Réessayez, ou écrivez-moi directement sur WhatsApp.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
