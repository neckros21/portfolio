import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: site.description,
  authors: [{ name: "Alexandros D." }],
  creator: "Alexandros D.",
  openGraph: {
    type: "website",
    locale: "fr_BE",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [{ url: "/previews/coiffure.jpg", width: 1440, height: 900 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e11" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geist.variable} ${instrument.variable} antialiased`} suppressHydrationWarning>
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
