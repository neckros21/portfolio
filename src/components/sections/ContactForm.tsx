"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { useContent, useLang } from "@/components/LangProvider";

const FORM_ALIAS = "1caf13d06081d3093035c445cfc89cb3";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full rounded-2xl border bg-surface/60 px-5 py-4 text-fg outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/10";

export function ContactForm() {
  const f = useContent().form;
  const lang = useLang();
  const projects = f.projects;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [projectIdx, setProjectIdx] = useState(0);
  const project = projects[projectIdx];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = f.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = f.errEmail;
    if ((data.message ?? "").trim().length < 10) next.message = f.errMessage;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      // FormSubmit : l'alias remplace l'adresse e-mail, qui n'apparaît donc pas dans le code du site
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_ALIAS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nouveau message du portfolio — ${data.name.trim()}`,
          _template: "table",
          _captcha: "false",
          _replyto: data.email,
          _honey: data._honey ?? "",
          Nom: data.name.trim(),
          "E-mail": data.email,
          Projet: project,
          Langue: lang.toUpperCase(),
          Message: data.message.trim(),
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      if (!res.ok || String(json?.success) !== "true") throw new Error();
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
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">{f.sentTitle}</h3>
            <p className="mt-3 max-w-sm text-fg/60">{f.sentText}</p>
            <button onClick={() => setStatus("idle")} className="link-underline mt-8 text-sm text-accent">
              {f.again}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0, y: -12 }} onSubmit={onSubmit} noValidate className="grid gap-5 text-left">
            <div>
              <p className="mb-3 text-sm text-muted">{f.project}</p>
              <div className="flex flex-wrap gap-2">
                {projects.map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProjectIdx(i)}
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
                <span className="text-sm text-muted">{f.name}</span>
                <input name="name" autoComplete="name" placeholder={f.namePh} aria-invalid={!!errors.name} className={`${field} ${errors.name ? "border-red-500/70" : "border-line"}`} />
                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-muted">{f.email}</span>
                <input name="email" type="email" autoComplete="email" placeholder={f.emailPh} aria-invalid={!!errors.email} className={`${field} ${errors.email ? "border-red-500/70" : "border-line"}`} />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm text-muted">{f.message}</span>
              <textarea
                name="message"
                rows={5}
                placeholder={f.messagePh}
                aria-invalid={!!errors.message}
                className={`${field} resize-none ${errors.message ? "border-red-500/70" : "border-line"}`}
              />
              {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
            </label>

            {/* Champ piège anti-spam, invisible pour les visiteurs */}
            <input name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <div className="flex flex-col-reverse gap-4 xl:flex-row xl:items-center xl:justify-between">
              <p className="text-center text-xs text-muted xl:text-left">{f.note}</p>
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
                    {f.sending}
                  </>
                ) : (
                  <>
                    {f.send} <span aria-hidden>→</span>
                  </>
                )}
              </motion.button>
            </div>
            {status === "error" && (
              <p className="text-sm text-red-500" role="alert">
                {f.error}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
