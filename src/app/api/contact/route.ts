import { site } from "@/content/site";

// Formulaire de contact : relaie le message vers la boîte mail d'Alexandros via FormSubmit.
// L'adresse de destination reste côté serveur (variable d'environnement CONTACT_EMAIL).

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  const to = process.env.CONTACT_EMAIL;
  if (!to) return Response.json({ ok: false, error: "config" }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Champ piège invisible : rempli uniquement par les robots
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const project = clean(body.project, 60);
  const message = clean(body.message, 4000);
  if (!name || !isEmail(email) || message.length < 10) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Origin: site.url, Referer: `${site.url}/` },
    body: JSON.stringify({
      _subject: `Nouveau message du portfolio — ${name}`,
      _template: "table",
      _captcha: "false",
      _replyto: email,
      Nom: name,
      "E-mail": email,
      Projet: project || "Non précisé",
      Message: message,
    }),
  });

  const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
  if (!res.ok || !data || String(data.success) !== "true") {
    console.error("FormSubmit:", res.status, data?.message);
    return Response.json({ ok: false, error: "send" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
