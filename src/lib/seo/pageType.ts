export type PageType = "home" | "comercial" | "blog" | "pilar" | "outras";

const COMMERCIAL_PATHS = new Set([
  "/", "/bm-verificada", "/bm-ilimitada", "/contingencia-meta-ads",
  "/consultoria-meta-ads", "/business-manager", "/whatsapp-cloud-api",
  "/dominios-verificados", "/perfis-facebook", "/perfil-aged",
]);

export const COMMERCIAL_PAGES = [
  "/", "/bm-verificada", "/bm-ilimitada", "/contingencia-meta-ads",
  "/consultoria-meta-ads", "/business-manager", "/whatsapp-cloud-api",
  "/dominios-verificados", "/perfis-facebook", "/perfil-aged",
];

export function urlToPath(u: string): string {
  try {
    const url = new URL(u, "https://adscalecontingencia.com");
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return u.replace(/\/$/, "") || "/";
  }
}

export function classifyPageType(u: string): PageType {
  const p = urlToPath(u);
  if (p === "/") return "home";
  if (COMMERCIAL_PATHS.has(p)) return "comercial";
  if (p.startsWith("/blog/pilar/")) return "pilar";
  if (p.startsWith("/blog")) return "blog";
  return "outras";
}

export const PAGE_TYPE_WEIGHTS: Record<PageType, number> = {
  home: 1,
  comercial: 1,
  pilar: 0.7,
  blog: 0.5,
  outras: 0.3,
};
