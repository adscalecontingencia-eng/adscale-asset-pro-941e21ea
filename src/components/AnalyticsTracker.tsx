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
/**
 * Fallback de categoria por rota: qualquer botão de WhatsApp fora da homepage
 * (landings de produto, blog, etc.) já é classificado pelo tipo de ativo da página.
 */
const ROUTE_CATEGORY: { match: RegExp; category: string }[] = [
  { match: /^\/(perfis-facebook|perfil-facebook-antigo|perfil-aged)/, category: "perfis" },
  { match: /^\/(business-manager|bm-verificada|bm-ilimitada|recuperacao-bm)/, category: "business_manager" },
  { match: /^\/paginas-facebook/, category: "paginas" },
  { match: /^\/(ativos-ads|solucoes-meta-ads|contingencia)/, category: "estruturas" },
  { match: /^\/aluguel-de-contas-meta-ads/, category: "contas_gerenciadas" },
  { match: /^\/whatsapp-cloud-api/, category: "bm_api" },
  { match: /^\/(blog|guia-)/, category: "conteudo" },
];

function categoryFromRoute(path: string): string {
  return ROUTE_CATEGORY.find((r) => r.match.test(path))?.category ?? "geral";
}

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
      const category =
        link.getAttribute("data-wa-category") ||
        categoryFromRoute(window.location.pathname || "/");

      const ctaId = link.getAttribute("data-cta") || ctaLabel;

      // Rewrite href on the fly so the WhatsApp message includes the page of origin.
      // `data-wa-message` preserva mensagens contextuais por categoria.
      try {
        const custom = link.getAttribute("data-wa-message") || undefined;
        link.href = buildWhatsAppUrl({
          ...(custom ? { message: custom } : {}),
          cta: ctaId,
          category,
        });
      } catch {
        /* no-op */
      }

      trackWhatsAppClick({ ctaLabel, source: "whatsapp_button", category, ctaId });


      // Google Ads conversion ping (non-blocking — link still opens normally).
      // transport_type: 'beacon' garante o envio mesmo se o navegador trocar de página.
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      if (typeof w.gtag === "function") {
        const path = window.location.pathname || "/";
        // Rótulo legível por página para separar conversões no Google Ads.
        let pageGroup: "presell" | "landing" | "other" = "other";
        if (path === "/" || path === "") pageGroup = "landing";
        else if (path.startsWith("/solucoes-meta-ads")) pageGroup = "presell";

        w.gtag("event", "conversion", {
          send_to: "AW-18226021110/U42jCK374rwcEPaF7PJD",
          value: 1.0,
          currency: "BRL",
          transport_type: "beacon",
          event_label: pageGroup,
          page_group: pageGroup,
          page_path: path,
          page_location: window.location.href,
          cta_label: ctaLabel,
          asset_category: category,
          cta_id: ctaId,
        });

        // Evento secundário (GA4-style) para segmentação adicional no Google Ads / Analytics.
        w.gtag("event", "whatsapp_click", {
          page_group: pageGroup,
          page_path: path,
          page_location: window.location.href,
          cta_label: ctaLabel,
          asset_category: category,
          cta_id: ctaId,
          transport_type: "beacon",
        });
      }

    };
    document.addEventListener("click", handler, { capture: true });

    return () => document.removeEventListener("click", handler, { capture: true } as EventListenerOptions);
  }, []);

  return null;
};

export default AnalyticsTracker;
