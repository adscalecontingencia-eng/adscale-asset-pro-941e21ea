import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildWhatsAppUrl, captureAttribution, trackWhatsAppClick } from "@/lib/whatsapp";

/**
 * Global side-effects:
 *  - Capture first-touch attribution (UTM, gclid, Google keyword) on every route change.
 *  - Intercept clicks on any wa.me link and log them to whatsapp_clicks.
 *
 * Mounted once inside the Router so useLocation works.
 */
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    captureAttribution();
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a[href*='wa.me']") as HTMLAnchorElement | null;
      if (!link) return;
      const ctaLabel =
        link.getAttribute("data-cta") ||
        (link.textContent || "").trim().slice(0, 80) ||
        "wa_link";

      // Rewrite href on the fly so the WhatsApp message includes the page of origin.
      try {
        link.href = buildWhatsAppUrl();
      } catch {
        /* no-op */
      }

      trackWhatsAppClick({ ctaLabel, source: "whatsapp_button" });

      // Google Ads conversion ping (non-blocking — link still opens normally).
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      if (typeof w.gtag === "function") {
        w.gtag("event", "conversion", {
          send_to: "AW-18226021110/U42jCK374rwcEPaF7PJD",
          value: 1.0,
          currency: "BRL",
        });
      }
    };
    document.addEventListener("click", handler, { capture: true });

    return () => document.removeEventListener("click", handler, { capture: true } as EventListenerOptions);
  }, []);

  return null;
};

export default AnalyticsTracker;
