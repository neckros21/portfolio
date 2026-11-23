"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { whatsappHref } from "@/content/site";
import { useContent, useLang } from "@/components/LangProvider";

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36A9.42 9.42 0 0 1 2.6 12.1C2.6 6.9 6.84 2.66 12.06 2.66c2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.4-9.45 9.4zm8.04-17.44A11.3 11.3 0 0 0 12.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.25l5.6-1.47a11.3 11.3 0 0 0 5.84 1.6h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02z" />
    </svg>
  );
}

// Bouton WhatsApp flottant : apparaît après le haut de page, bulle « Une question ? » au survol
export function WhatsAppFloat() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const lang = useLang();
  const c = useContent();
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 300));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappHref(lang)}
          target="_blank"
          rel="noopener"
          aria-label={c.whatsapp.aria}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed right-5 bottom-5 z-50 flex items-center md:right-8 md:bottom-8"
        >
          <span className="pointer-events-none mr-3 hidden translate-x-2 rounded-full bg-fg px-4 py-2 text-sm font-medium whitespace-nowrap text-bg opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
            {c.whatsapp.bubble}
          </span>
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-25 [animation-duration:2.4s]" />
            <WhatsAppIcon className="relative h-7 w-7" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
