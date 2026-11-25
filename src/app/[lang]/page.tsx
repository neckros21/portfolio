import { isLocale } from "@/i18n/config";
import { getContent, site } from "@/content/site";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Offer } from "@/components/sections/Offer";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const c = getContent(isLocale(lang) ? lang : "fr");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: c.role,
    url: `${site.url}/${lang}`,
    telephone: site.phone.tel,
    sameAs: site.socials.map((s) => s.href),
    address: { "@type": "PostalAddress", addressLocality: "Bruxelles", addressCountry: "BE" },
    knowsAbout: site.stack,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Offer />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
