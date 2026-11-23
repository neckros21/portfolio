import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Politique de sécurité du contenu : seules les ressources du site lui-même sont autorisées,
// plus l'envoi du formulaire vers FormSubmit. Pas de nonce pour garder les pages statiques (rapides).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://formsubmit.co${isDev ? " ws:" : ""}`,
  "form-action 'self' https://formsubmit.co",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.129.10", "192.168.56.1"],
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Aperçus des projets : cache navigateur d'une semaine
      { source: "/previews/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
