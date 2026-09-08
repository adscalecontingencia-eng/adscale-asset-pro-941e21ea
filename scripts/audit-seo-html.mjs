#!/usr/bin/env node
/**
 * Auditoria estrutural do HTML prerenderizado (dist/).
 *
 * Roda depois de `vite build` + `scripts/prerender.mjs` e verifica, para TODA
 * URL indexável, se o HTML inicial representa semanticamente a página real.
 *
 * Critério: estrutura, não apenas contagem de palavras.
 *   - title / meta description / canonical presentes e canônicos
 *   - exatamente um H1
 *   - corpo textual real (parágrafos + listas), não só breadcrumb/H1
 *   - H2 quando a página tem seções
 *   - links internos crawláveis (<a href>)
 *   - ausência de meta robots noindex em página que está no sitemap
 *   - presença no sitemap correto
 *
 * Saída: relatório por URL + resumo PASS / WARNING / FAIL.
 * FAIL => exit code 1 (bloqueia deploy). WARNING nunca bloqueia.
 */
import { readFileSync, existsSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";

const SITE = "https://www.adscalecontingencia.com";
const DIST = resolve("dist");

/** Páginas indexáveis cujo corpo é legalmente curto e sem seções. */
const THIN_BY_DESIGN = new Set(["/politica-de-privacidade", "/termos-de-uso"]);
/** Rotas que não devem estar no sitemap (mas continuam válidas). */
const OUT_OF_SITEMAP = new Set(["/404"]);

/** Limiares. Só o que é estrutural gera FAIL. */
const FAIL = { words: 120, paragraphs: 2, internalLinks: 2 };
const WARN = { words: 250, h2: 2, internalLinks: 3, titleMax: 60, descMax: 160, descMin: 50 };

// ---------- helpers ----------
const strip = (u) => (u.length > 1 ? u.replace(/\/$/, "") : u);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

function routeOf(file) {
  let r = "/" + relative(DIST, file).replace(/\\/g, "/");
  r = r.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  return r === "" || r === "/index" ? "/" : r;
}

function sitemapUrls() {
  const set = new Set();
  for (const f of ["public/sitemap-paginas.xml", "public/sitemap-posts.xml", "public/sitemap.xml"]) {
    const p = resolve(f);
    if (!existsSync(p)) continue;
    const xml = readFileSync(p, "utf8");
    for (const m of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)) {
      const loc = m[1].trim();
      if (loc.endsWith(".xml")) continue; // sitemap index
      set.add(strip(loc.replace(SITE, "")) || "/");
    }
  }
  return set;
}

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : "";
}

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------- coleta ----------
const files = walk(DIST).filter((f) => !f.endsWith("404.html"));
const inSitemap = sitemapUrls();
const rows = [];
const seen = new Set();

for (const file of files) {
  const route = routeOf(file);
  if (seen.has(route)) continue; // /x.html e /x/index.html são a mesma rota
  seen.add(route);

  const html = readFileSync(file, "utf8");
  const head = html.split(/<body/i)[0] || html;

  const title = attr(head, /<title>([\s\S]*?)<\/title>/i);
  const description = attr(head, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const canonical = attr(head, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const robots = attr(head, /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const noindex = /noindex/i.test(robots);

  // Bloco prerenderizado (o que o crawler lê antes do JS).
  const seoBlock = html.split('<div id="prerendered-seo"')[1]?.split('<div id="root">')[0] ?? "";
  const bodyOnly = seoBlock
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ");

  const h1s = seoBlock.match(/<h1[\s>]/gi)?.length ?? 0;
  const h2s = seoBlock.match(/<h2[\s>]/gi)?.length ?? 0;
  const h3s = seoBlock.match(/<h3[\s>]/gi)?.length ?? 0;
  const paragraphs = (bodyOnly.match(/<p[\s>]/gi)?.length ?? 0) + (bodyOnly.match(/<li[\s>]/gi)?.length ?? 0);
  const words = textOf(bodyOnly).split(" ").filter(Boolean).length;
  const internalLinks = new Set(
    [...seoBlock.matchAll(new RegExp(`href="${SITE}([^"#]*)`, "g"))].map((m) => strip(m[1] || "/")),
  );
  internalLinks.delete(route);

  const expectedCanonical = SITE + (route === "/" ? "/" : route);
  const sitemapOk = OUT_OF_SITEMAP.has(route) ? true : inSitemap.has(route);
  const thinOk = THIN_BY_DESIGN.has(route);

  const fails = [];
  const warns = [];

  if (!title) fails.push("sem <title>");
  if (!description) fails.push("sem meta description");
  if (!canonical) fails.push("sem canonical");
  else if (strip(canonical) !== strip(expectedCanonical)) fails.push(`canonical divergente (${canonical})`);
  if (h1s === 0) fails.push("sem H1");
  else if (h1s > 1) fails.push(`${h1s} H1 na mesma página`);

  if (!noindex && !thinOk) {
    // Falha estrutural: página indexável sem corpo real.
    if (paragraphs < FAIL.paragraphs) fails.push(`corpo ausente (${paragraphs} parágrafos/itens)`);
    if (words < FAIL.words) fails.push(`texto insuficiente (${words} palavras)`);
    if (h2s === 0 && h3s === 0) fails.push("nenhum H2 — seções da página não foram renderizadas");
    if (internalLinks.size < FAIL.internalLinks) fails.push(`${internalLinks.size} links internos crawláveis`);
  }
  if (noindex && inSitemap.has(route)) fails.push("noindex em URL presente no sitemap");
  if (!sitemapOk && !noindex) warns.push("ausente do sitemap");
  if (!noindex && !thinOk) {
    if (words < WARN.words) warns.push(`corpo curto (${words} palavras)`);
    if (h2s < WARN.h2) warns.push(`poucos H2 (${h2s})`);
    if (internalLinks.size < WARN.internalLinks) warns.push(`poucos links internos (${internalLinks.size})`);
  }
  if (title.length > WARN.titleMax) warns.push(`title com ${title.length} caracteres`);
  if (description && (description.length > WARN.descMax || description.length < WARN.descMin))
    warns.push(`description com ${description.length} caracteres`);

  rows.push({
    url: route,
    title,
    h1: h1s,
    canonical,
    indexable: !noindex,
    h2: h2s,
    words,
    paragraphs,
    internalLinks: internalLinks.size,
    sitemap: OUT_OF_SITEMAP.has(route) ? "n/a" : inSitemap.has(route) ? "sim" : "não",
    status: fails.length ? "FAIL" : warns.length ? "WARNING" : "PASS",
    issues: [...fails, ...warns],
  });
}

rows.sort((a, b) => a.url.localeCompare(b.url));

// ---------- X-Robots-Tag ----------
const headerConfigs = ["public/_headers", "netlify.toml", "vercel.json", "public/.htaccess"].filter((f) =>
  existsSync(resolve(f)),
);
const xRobotsNote = headerConfigs.length
  ? `verificar X-Robots-Tag em: ${headerConfigs.join(", ")}`
  : "sem configuração de cabeçalhos HTTP no projeto (hospedagem estática) — nenhum X-Robots-Tag noindex possível";

// ---------- relatório ----------
const counts = { PASS: 0, WARNING: 0, FAIL: 0 };
for (const r of rows) counts[r.status]++;

const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log("\n[seo-audit] Relatório do HTML prerenderizado\n");
console.log(
  pad("URL", 56) + pad("IDX", 5) + pad("H1", 3) + pad("H2", 4) + pad("PAL", 6) + pad("LINKS", 6) + pad("MAPA", 6) + "STATUS",
);
console.log("-".repeat(96));
for (const r of rows) {
  console.log(
    pad(r.url, 56) +
      pad(r.indexable ? "sim" : "no", 5) +
      pad(r.h1, 3) +
      pad(r.h2, 4) +
      pad(r.words, 6) +
      pad(r.internalLinks, 6) +
      pad(r.sitemap, 6) +
      r.status,
  );
}
console.log("-".repeat(96));
for (const r of rows.filter((x) => x.status !== "PASS")) {
  console.log(`  ${r.status === "FAIL" ? "✗" : "⚠"} ${r.url}: ${r.issues.join("; ")}`);
}
console.log(`\n[seo-audit] X-Robots-Tag: ${xRobotsNote}`);
console.log(
  `[seo-audit] URLs analisadas: ${rows.length} | PASS: ${counts.PASS} | WARNING: ${counts.WARNING} | FAIL: ${counts.FAIL}`,
);

writeFileSync(
  resolve("dist/seo-audit.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), counts, xRobotsNote, rows }, null, 2),
);

if (counts.FAIL > 0) {
  console.error(
    `\n[seo-audit] ${counts.FAIL} URL(s) indexável(is) sem conteúdo principal no HTML prerenderizado. Corrija antes de publicar.`,
  );
  process.exit(1);
}
