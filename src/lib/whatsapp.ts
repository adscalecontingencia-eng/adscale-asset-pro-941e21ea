import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "553198416336";
const SITE_ORIGIN = "https://adscalecontingencia.com";
const DEFAULT_MESSAGE =
  "Olá! Vim do site da AD Scale e tenho interesse nos ativos de contingência";

/** Build a human-readable label for the current page. */
function getPageContext(): { path: string; title: string; url: string } {
  if (typeof window === "undefined") {
    return { path: "/", title: "AD Scale", url: SITE_ORIGIN };
  }
  const path = window.location.pathname || "/";
  const title = document.title || "AD Scale";
  const url = `${SITE_ORIGIN}${path}${window.location.search}`;
  return { path, title, url };
}

const SESSION_KEY = "adscale_session_id";
const ATTRIBUTION_KEY = "adscale_attribution";

/** First-touch attribution: stored once per visitor, kept across pages. */
type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  search_engine?: string;
  search_keyword?: string;
  landing_page?: string;
  captured_at?: string;
};

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      (crypto?.randomUUID && crypto.randomUUID()) ||
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function detectDevice(ua: string): string {
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    return /iPad|Tablet/i.test(ua) ? "tablet" : "mobile";
  }
  return "desktop";
}

function parseSearchEngine(referrer: string): {
  engine?: string;
  keyword?: string;
} {
  if (!referrer) return {};
  try {
    const u = new URL(referrer);
    const host = u.hostname.toLowerCase();
    const q = u.searchParams;

    if (host.includes("google.")) {
      return { engine: "google", keyword: q.get("q") ?? undefined };
    }
    if (host.includes("bing.")) {
      return { engine: "bing", keyword: q.get("q") ?? undefined };
    }
    if (host.includes("duckduckgo.")) {
      return { engine: "duckduckgo", keyword: q.get("q") ?? undefined };
    }
    if (host.includes("yahoo.")) {
      return { engine: "yahoo", keyword: q.get("p") ?? undefined };
    }
    if (host.includes("yandex.")) {
      return { engine: "yandex", keyword: q.get("text") ?? undefined };
    }
    if (host.includes("ecosia.")) {
      return { engine: "ecosia", keyword: q.get("q") ?? undefined };
    }
    return {};
  } catch {
    return {};
  }
}

/** Capture attribution on first page-load and persist for the session. */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(ATTRIBUTION_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Attribution;
    } catch {
      // fall through to recapture
    }
  }

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  const { engine, keyword } = parseSearchEngine(referrer);

  const attr: Attribution = {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_term: params.get("utm_term") ?? keyword ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    gclid: params.get("gclid") ?? undefined,
    fbclid: params.get("fbclid") ?? undefined,
    referrer: referrer || undefined,
    search_engine: engine,
    search_keyword: keyword,
    landing_page: window.location.pathname + window.location.search,
    captured_at: new Date().toISOString(),
  };

  localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attr));
  return attr;
}

/** Determina o canal de atribuição (organic, cpc, referral, direct, etc.). */
function resolveChannel(attr: Attribution): string {
  const medium = (attr.utm_medium || "").toLowerCase();
  if (medium) {
    if (["cpc", "ppc", "paid", "paid_social", "paidsocial"].includes(medium)) return "cpc";
    if (medium === "organic") return "organic";
    if (medium === "referral") return "referral";
    if (medium === "email") return "email";
    if (medium === "social") return "social";
    return medium;
  }
  if (attr.gclid) return "cpc";
  if (attr.fbclid) return "cpc";
  if (attr.search_engine) return "organic";
  if (attr.referrer) return "referral";
  return "direct";
}

/** Resume da origem do tráfego para anexar à mensagem do WhatsApp. */
function buildOriginSummary(): string {
  if (typeof window === "undefined") return "";
  const attr = captureAttribution();
  const channel = resolveChannel(attr);

  const lines: string[] = [];

  if (attr.utm_source || attr.utm_medium || attr.utm_campaign) {
    if (attr.utm_source) lines.push(`utm_source: ${attr.utm_source}`);
    if (attr.utm_medium) lines.push(`utm_medium: ${attr.utm_medium}`);
    if (attr.utm_campaign) lines.push(`utm_campaign: ${attr.utm_campaign}`);
  } else if (attr.gclid) {
    lines.push("utm_source: google", "utm_medium: cpc", `gclid: ${attr.gclid}`);
  } else if (attr.fbclid) {
    lines.push("utm_source: facebook", "utm_medium: cpc", `fbclid: ${attr.fbclid}`);
  } else if (attr.search_engine) {
    lines.push(`utm_source: ${attr.search_engine}`, "utm_medium: organic");
    if (attr.search_keyword) lines.push(`utm_campaign: ${attr.search_keyword}`);
  } else if (attr.referrer) {
    try {
      const host = new URL(attr.referrer).hostname.replace(/^www\./, "");
      lines.push(`utm_source: ${host}`, "utm_medium: referral");
    } catch {
      /* ignore */
    }
  } else {
    lines.push("utm_source: direct", "utm_medium: none");
  }

  lines.push(`canal: ${channel}`);
  return `\n\nOrigem:\n${lines.join("\n")}`;
}

/** Build the wa.me URL com mensagem personalizada incluindo página e UTMs. */
export function buildWhatsAppUrl(opts?: { message?: string; cta?: string }): string {
  const { url } = getPageContext();
  const base = opts?.message ?? DEFAULT_MESSAGE;
  const origin = buildOriginSummary();
  const ctx = `\n\n${url}${origin}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(base + ctx)}`;
}

/** Default URL com mensagem padrão — mantido para compatibilidade. */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

/** Fire-and-forget click tracking. Never blocks navigation. */
export function trackWhatsAppClick(opts?: {
  ctaLabel?: string;
  source?: string;
  message?: string;
}): void {
  if (typeof window === "undefined") return;

  const attr = captureAttribution();
  const ua = navigator.userAgent || "";
  const channel = resolveChannel(attr);

  const currentPath = window.location.pathname + window.location.search;
  const route = window.location.pathname || "/";
  const landingPage = (attr.landing_page && attr.landing_page.trim()) || currentPath || route;

  const payload = {
    route,
    source: opts?.source ?? "whatsapp_button",
    cta_label: opts?.ctaLabel ?? null,
    utm_source: attr.utm_source ?? null,
    utm_medium: attr.utm_medium ?? null,
    utm_campaign: attr.utm_campaign ?? null,
    utm_term: attr.utm_term ?? null,
    utm_content: attr.utm_content ?? null,
    referrer: attr.referrer ?? null,
    search_engine: attr.search_engine ?? null,
    search_keyword: attr.search_keyword ?? null,
    gclid: attr.gclid ?? null,
    fbclid: attr.fbclid ?? null,
    landing_page: landingPage,
    user_agent: ua,
    device: detectDevice(ua),
    session_id: getSessionId(),
    channel,
  };


  // Fire-and-forget — never block the user's WhatsApp redirect.
  void supabase
    .from("whatsapp_clicks")
    .insert(payload)
    .then(({ error }) => {
      if (error) console.warn("[whatsapp-track]", error.message);
    });
}

/**
 * Single-call helper: tracks the click and returns the wa.me URL.
 * Use as `onClick={() => onWhatsAppClick({ ctaLabel: 'hero_primary' })}` paired with `href={WHATSAPP_URL}`.
 */
export function onWhatsAppClick(opts?: {
  ctaLabel?: string;
  source?: string;
}): void {
  trackWhatsAppClick(opts);
}
