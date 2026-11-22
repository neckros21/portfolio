import { site } from "@/content/site";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Offer } from "@/components/sections/Offer";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Développeur web",
  url: site.url,
  sameAs: [site.malt],
  address: { "@type": "PostalAddress", addressLocality: "Bruxelles", addressCountry: "BE" },
  knowsAbout: site.stack,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Offer />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
