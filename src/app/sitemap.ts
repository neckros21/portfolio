import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return (["fr", "en"] as const).map((lang) => ({
    url: `${site.url}/${lang}`,
    changeFrequency: "monthly",
    priority: lang === "fr" ? 1 : 0.9,
    alternates: { languages: { fr: `${site.url}/fr`, en: `${site.url}/en` } },
  }));
}
