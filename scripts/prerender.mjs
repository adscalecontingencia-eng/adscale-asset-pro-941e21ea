// Prerender static HTML for each route so Googlebot sees unique <title>, <meta description>,
// <link canonical>, and OG tags per page. Without this, every SPA route returns the same
// index.html and Google flags pages as "Detectada, mas não indexada" (duplicate content).
//
// Runs as a postbuild step. Reads dist/index.html and writes dist/<route>/index.html with
// per-route head tags injected. The original index.html (root) is left unchanged.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const SITE_URL = "https://adscalecontingencia.com";
const DIST = resolve("dist");
const TEMPLATE = readFileSync(resolve(DIST, "index.html"), "utf8");

// ---------- Parse blog posts from src/data/blogPosts.ts via regex ----------
const blogSource = readFileSync(resolve("src/data/blogPosts.ts"), "utf8");

// Match each post object block. Each post starts with `slug: "..."` and ends at the next `},` followed by `{` or end of array.
const postBlocks = blogSource.split(/\n\s*\{/);
const posts = [];
for (const block of postBlocks) {
  const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
  const title = block.match(/title:\s*"([^"]+)"/)?.[1];
  const description = block.match(/description:\s*"([^"]+)"/)?.[1];
  const ogImage = block.match(/ogImage:\s*"([^"]+)"/)?.[1] || "/og/og-default.jpg";
  const publishedAt = block.match(/publishedAt:\s*"([^"]+)"/)?.[1];
  const keywords = block.match(/keywords:\s*\[([^\]]+)\]/)?.[1]
    ?.match(/"([^"]+)"/g)
    ?.map((k) => k.slice(1, -1)) || [];
  if (slug && title && description) {
    posts.push({ slug, title, description, ogImage, publishedAt, keywords });
  }
}
console.log(`[prerender] Parsed ${posts.length} blog posts`);

// ---------- Static page metadata ----------
const staticPages = [
  {
    path: "/blog",
    title: "Blog AD Scale | Meta Ads, BM Verificada e Contingência",
    description: "Artigos práticos sobre BM Verificada, Trust Score, contingência Meta Ads, WhatsApp Cloud API e operações de alto volume.",
    keywords: ["blog meta ads", "blog bm verificada", "blog facebook ads", "contingência meta ads"],
  },
  {
    path: "/bm-verificada",
    title: "BM Verificada para Meta Ads e WhatsApp API | AD Scale",
    description: "Compre BM Verificada com Trust Score alto, domínio verificado e suporte para disparo via WhatsApp Cloud API. Curadoria 1 a 1.",
    keywords: ["comprar bm verificada", "bm verificada facebook", "bm para disparo via api", "bm verificada meta"],
  },
  {
    path: "/contingencia-meta-ads",
    title: "Contingência Meta Ads | Ativos para Operações de Alto Volume",
    description: "Estrutura completa de contingência para Meta Ads: BMs verificadas, perfis aged, páginas antigas e suporte estratégico para escalar com segurança.",
    keywords: ["contingência meta ads", "estrutura facebook ads", "ativos contingência", "operação alto volume meta"],
  },
  {
    path: "/consultoria-meta-ads",
    title: "Consultoria Meta Ads de Alto Volume | AD Scale",
    description: "Consultoria especializada em Meta Ads para operações de alto volume: arquitetura de contingência, BM verificada e proteção de ativos.",
    keywords: ["consultoria meta ads", "consultoria facebook ads", "consultoria alto volume meta"],
  },
  {
    path: "/sobre",
    title: "Sobre a AD Scale | Especialistas em Contingência Meta Ads",
    description: "Conheça a AD Scale, fornecedora de ativos verificados e contingência para operações profissionais de Meta Ads.",
    keywords: ["ad scale", "sobre ad scale", "fornecedor bm verificada"],
  },
  {
    path: "/autor/pedro-lucas",
    title: "Pedro Lucas | Fundador AD Scale, Especialista Meta Ads",
    description: "Pedro Lucas, fundador da AD Scale. Especialista em contingência Meta Ads, BM Verificada e operações de alto volume.",
    keywords: ["pedro lucas", "fundador ad scale", "especialista meta ads"],
  },
  {
    path: "/guia-facebook-ads-alto-volume",
    title: "Guia Facebook Ads Alto Volume 2026 | AD Scale",
    description: "Guia completo para escalar Facebook Ads em alto volume: estrutura de contingência, BM verificada, Trust Score e proteção de ativos.",
    keywords: ["facebook ads alto volume", "guia facebook ads", "escalar facebook ads", "alto volume meta ads"],
  },
];

// ---------- HTML transform ----------
function injectMeta(template, { title, description, canonical, ogImage, keywords, ogType = "website", publishedAt }) {
  const ogImageUrl = ogImage?.startsWith("http") ? ogImage : `${SITE_URL}${ogImage || "/og/og-default.jpg"}`;
  const safeTitle = title.replace(/"/g, "&quot;");
  const safeDesc = description.replace(/"/g, "&quot;");
  const kw = keywords?.length ? keywords.join(", ") : "";

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta name="description"[^/]*\/>/,
    `<meta name="description" content="${safeDesc}" />`,
  );
  if (kw) {
    html = html.replace(
      /<meta name="keywords"[^/]*\/>/,
      `<meta name="keywords" content="${kw}" />`,
    );
  }
  html = html.replace(
    /<link rel="canonical"[^/]*\/>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = html.replace(/<meta property="og:type"[^/]*\/>/, `<meta property="og:type" content="${ogType}" />`);
  html = html.replace(/<meta property="og:url"[^/]*\/>/, `<meta property="og:url" content="${canonical}" />`);
  html = html.replace(/<meta property="og:title"[^/]*\/>/, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(
    /<meta property="og:description"[^/]*\/>/,
    `<meta property="og:description" content="${safeDesc}" />`,
  );
  html = html.replace(/<meta name="twitter:title"[^/]*\/>/, `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(
    /<meta name="twitter:description"[^/]*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`,
  );

  // Add og:image + article:published_time before </head>
  const extra = [
    `<meta property="og:image" content="${ogImageUrl}" />`,
    `<meta name="twitter:image" content="${ogImageUrl}" />`,
    publishedAt ? `<meta property="article:published_time" content="${publishedAt}" />` : "",
  ]
    .filter(Boolean)
    .join("\n    ");
  html = html.replace("</head>", `    ${extra}\n  </head>`);

  // Inject visible H1 + description so Googlebot sees content even if JS fails to render
  const noscriptContent = `
    <noscript>
      <h1>${safeTitle}</h1>
      <p>${safeDesc}</p>
    </noscript>`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>${noscriptContent}`);

  return html;
}

function writeRoute(routePath, html) {
  const cleanPath = routePath.replace(/^\//, "");
  const outDir = resolve(DIST, cleanPath);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), html);
}

// ---------- Generate ----------
let count = 0;

for (const page of staticPages) {
  const html = injectMeta(TEMPLATE, {
    title: page.title,
    description: page.description,
    canonical: `${SITE_URL}${page.path}`,
    keywords: page.keywords,
  });
  writeRoute(page.path, html);
  count++;
}

for (const post of posts) {
  const html = injectMeta(TEMPLATE, {
    title: `${post.title} | AD Scale`,
    description: post.description,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    ogImage: post.ogImage,
    keywords: post.keywords,
    ogType: "article",
    publishedAt: post.publishedAt,
  });
  writeRoute(`/blog/${post.slug}`, html);
  count++;
}

// Refresh 404.html so SPA fallback uses the latest template (no per-route meta).
copyFileSync(resolve(DIST, "index.html"), resolve(DIST, "404.html"));

console.log(`[prerender] Generated ${count} prerendered routes + 404 fallback`);
