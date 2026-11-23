import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import "lenis/dist/lenis.css";
import "../globals.css";
import { isLocale, locales } from "@/i18n/config";
import { getContent, site } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { LangProvider } from "@/components/LangProvider";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const c = getContent(lang);
  return {
    metadataBase: new URL(site.url),
    title: `${site.name} — ${c.role}`,
    description: c.description,
    authors: [{ name: "Alexandros D." }],
    creator: "Alexandros D.",
    alternates: { canonical: `/${lang}`, languages: { fr: "/fr", en: "/en", "x-default": "/fr" } },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_BE" : "en_GB",
      title: `${site.name} — ${c.role}`,
      description: c.description,
      images: [{ url: "/previews/mode.jpg", width: 1440, height: 900 }],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e11" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${geist.variable} ${instrument.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"],[style*="translateY(110%)"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <LangProvider lang={lang}>
          <SmoothScroll>{children}</SmoothScroll>
        </LangProvider>
      </body>
    </html>
  );
}
