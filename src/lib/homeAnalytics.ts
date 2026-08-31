/**
 * Eventos de analytics específicos da homepage.
 * Envia para o gtag já carregado no index.html (Google Ads / GA4).
 * Nunca lança erro — se o gtag não estiver disponível, o clique segue normalmente.
 */
export type HomeEventName =
  | "homepage_category_profiles"
  | "homepage_category_bm"
  | "homepage_category_pages"
  | "homepage_category_structures"
  | "homepage_category_managed_accounts"
  | "homepage_category_api"
  | "homepage_whatsapp_hero"
  | "homepage_whatsapp_profiles"
  | "homepage_whatsapp_bm"
  | "homepage_whatsapp_pages"
  | "homepage_whatsapp_structures"
  | "homepage_whatsapp_managed"
  | "homepage_whatsapp_api"
  | "homepage_whatsapp_unsure"
  | "homepage_whatsapp_final";

export function trackHomeEvent(
  event: HomeEventName,
  params?: { category?: string; cta_location?: string }
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("event", event, {
    category: params?.category,
    cta_location: params?.cta_location,
    page_path: window.location.pathname || "/",
    transport_type: "beacon",
  });
}
