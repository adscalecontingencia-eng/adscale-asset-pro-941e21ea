#!/usr/bin/env tsx
/**
 * validate-seo-intent-map.ts
 *
 * Guarda a regra editorial do cluster de Perfis Facebook.
 * Ver docs/seo/cluster-perfis-facebook.md
 *
 * Não cria URLs nem redirects — apenas verifica que a divisão de intenções
 * continua íntegra (anti-canibalização).
 */
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const app = read("src/App.tsx");
const prerender = read("scripts/prerender.mjs");
const landings = read("src/data/landings.tsx");
const antigo = read("src/pages/PerfilFacebookAntigo.tsx");
const posts = read("src/data/blogPosts.ts");

const errors: string[] = [];

// 6. Nenhuma URL de variação pode existir
const FORBIDDEN = [
  "comprar-perfil-facebook",
  "comprar-perfil-antigo",
  "perfil-facebook-para-anuncios",
  "perfil-antigo-meta-ads",
  "perfil-aged-facebook-comprar",
];
for (const slug of FORBIDDEN) {
  if (app.includes(`"/${slug}"`) || prerender.includes(`"/${slug}"`)) {
    errors.push(`URL de variação proibida encontrada: /${slug} (usar a página designada no mapa)`);
  }
}

// 7. As três URLs canônicas do cluster devem existir e continuar separadas
for (const path of ["/perfis-facebook", "/perfil-facebook-antigo", "/perfil-aged"]) {
  if (!prerender.includes(`"${path}"`)) errors.push(`Rota do cluster ausente no prerender: ${path}`);
}

// 1. Intenção por página: title/H1 não podem invadir a intenção alheia
const perfisTitle = /title: "([^"]*Perfil Facebook[^"]*)",\s*\n\s*description:\s*\n\s*"Perfis Facebook para anúncios/.exec(landings)?.[1] ?? "";
if (/antig|aged/i.test(perfisTitle)) {
  errors.push(`/perfis-facebook não deve mirar "antigo"/"aged" no title: "${perfisTitle}"`);
}
if (/comprar perfil facebook(?!\s+antigo)/i.test(antigo.match(/<h1[\s\S]{0,200}?<\/h1>/)?.[0] ?? "")) {
  errors.push(`/perfil-facebook-antigo não deve mirar o termo genérico "comprar perfil facebook" no H1`);
}
const agedEntry = /path: "\/perfil-aged",\s*\n\s*title: "([^"]+)"/.exec(prerender)?.[1] ?? "";
if (!/aged/i.test(agedEntry)) errors.push(`/perfil-aged deve manter "aged" como termo principal do title`);

// 2. Artigos informacionais do cluster
for (const slug of [
  "perfil-facebook-vs-conta-de-anuncios",
  "perfil-facebook-antigo-vs-novo",
  "perfil-aged-vs-perfil-antigo-facebook",
  "estrutura-meta-ads-perfil-bm-conta-anuncios",
]) {
  if (!posts.includes(`slug: "${slug}"`)) errors.push(`Artigo do cluster ausente: /blog/${slug}`);
}

// 3/4. Links internos sem trailing slash e com âncoras do vocabulário aprovado
const ANCHORS: Record<string, RegExp> = {
  "/perfis-facebook": /perfis? facebook|perfis para (meta ads|anúncios)|opções de perfis/i,
  "/perfil-facebook-antigo": /perfil (facebook )?antigo|perfil com histórico/i,
  "/perfil-aged": /aged/i,
};
for (const [href, re] of Object.entries(ANCHORS)) {
  for (const [, anchor] of posts.matchAll(new RegExp(`\\[([^\\]]+)\\]\\(${href}\\)`, "g"))) {
    if (!re.test(anchor)) errors.push(`Âncora fora do vocabulário para ${href}: "${anchor}"`);
  }
  if (posts.includes(`(${href}/)`)) errors.push(`Link com barra final para ${href}`);
}

if (errors.length) {
  console.error(`\n[seo-intent-map] ${errors.length} violação(ões) do mapa de intenção:`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  console.error(`\n  → Ver docs/seo/cluster-perfis-facebook.md\n`);
  process.exit(1);
}

console.log("[seo-intent-map] cluster Perfis Facebook conforme o mapa de intenção.");
