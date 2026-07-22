// Prerender static HTML for each route so Googlebot sees unique <title>, <meta description>,
// <link canonical>, and OG tags per page. Without this, every SPA route returns the same
// index.html and Google flags pages as "Detectada, mas não indexada" (duplicate content).
//
// Runs as a postbuild step. Reads dist/index.html and writes dist/<route>/index.html with
// per-route head tags injected. The original index.html (root) is left unchanged.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";

const SITE_URL = "https://www.adscalecontingencia.com";
const DIST = resolve("dist");
const TEMPLATE = readFileSync(resolve(DIST, "index.html"), "utf8");

// ---------- Parse blog posts from src/data/blogPosts.ts via regex ----------
const blogSource = readFileSync(resolve("src/data/blogPosts.ts"), "utf8");
// Per-slug short SEO titles (≤60 chars). Falls back to post.title when absent.
const seoTitlesSource = readFileSync(resolve("src/data/blogSeoTitles.ts"), "utf8");
const seoTitlesMap = {};
for (const m of seoTitlesSource.matchAll(/"([^"]+)":\s*\n?\s*"([^"]+)"/g)) {
  seoTitlesMap[m[1]] = m[2];
}

// Match each post object block. Each post starts with `slug: "..."` and ends at the next `},` followed by `{` or end of array.
const postBlocks = blogSource.split(/\n\s*\{/);

// Minimal markdown → HTML converter. Emits substantial unique HTML so Googlebot
// sees full article content on first crawl (avoids "Crawled - currently not indexed").
function mdToHtml(md) {
  if (!md) return "";
  let src = md.replace(/\r\n/g, "\n").trim();
  src = src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = src.split("\n");
  const out = [];
  let inList = null;
  let inQuote = false;
  let paraBuf = [];
  const inlineFmt = (s) =>
    s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  const flushPara = () => { if (paraBuf.length) { out.push(`<p>${inlineFmt(paraBuf.join(" "))}</p>`); paraBuf = []; } };
  const closeList = () => { if (inList) { out.push(`</${inList}>`); inList = null; } };
  const closeQuote = () => { if (inQuote) { out.push("</blockquote>"); inQuote = false; } };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flushPara(); closeList(); closeQuote(); continue; }
    let m;
    if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      flushPara(); closeList(); closeQuote();
      const lvl = Math.min(m[1].length + 1, 6);
      out.push(`<h${lvl}>${inlineFmt(m[2])}</h${lvl}>`);
    } else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      flushPara(); closeQuote();
      if (inList !== "ul") { closeList(); out.push("<ul>"); inList = "ul"; }
      out.push(`<li>${inlineFmt(m[1])}</li>`);
    } else if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) {
      flushPara(); closeQuote();
      if (inList !== "ol") { closeList(); out.push("<ol>"); inList = "ol"; }
      out.push(`<li>${inlineFmt(m[1])}</li>`);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara(); closeList();
      if (!inQuote) { out.push("<blockquote>"); inQuote = true; }
      out.push(`<p>${inlineFmt(m[1])}</p>`);
    } else {
      closeList(); closeQuote();
      paraBuf.push(line.trim());
    }
  }
  flushPara(); closeList(); closeQuote();
  return out.join("\n");
}

function extractPostBlocks(source) {
  const results = [];
  const re = /\{\s*slug:\s*"([^"]+)"[\s\S]*?content:\s*`([\s\S]*?)`\s*,/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    results.push({ slug: m[1], content: m[2] });
  }
  return results;
}
const contentBySlug = Object.fromEntries(extractPostBlocks(blogSource).map((p) => [p.slug, p.content]));

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
    posts.push({ slug, title, description, ogImage, publishedAt, keywords, content: contentBySlug[slug] || "" });
  }
}
console.log(`[prerender] Parsed ${posts.length} blog posts (${posts.filter((p) => p.content).length} with body)`);

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
  {
    path: "/business-manager",
    title: "Business Manager Facebook Ads | AD Scale",
    description: "Compre Business Manager (BM) para Meta e Facebook Ads: BMs novas, antigas, verificadas e ilimitadas com Trust Score alto e curadoria 1 a 1.",
    keywords: ["business manager facebook", "comprar business manager", "bm facebook ads", "bm aged", "bm ilimitada"],
  },
  {
    path: "/bm-ilimitada",
    title: "BM Ilimitada Facebook Ads | Sem Cap de Gasto",
    description: "BM Ilimitada para Meta Ads: Business Manager sem limite de gasto, com Trust Score alto, ideal para escalar acima de 1k/10k USD por dia.",
    keywords: ["bm ilimitada", "bm sem limite", "bm desbloqueada", "bm com limite alto", "bm 250 dólares"],
  },
  {
    path: "/perfis-facebook",
    title: "Perfis Facebook Farmados e Aged | AD Scale",
    description: "Compre perfis Facebook farmados e aged com timeline real, idade comprovada e Trust Score alto. Base estável para BM, multi-conta e Meta Ads.",
    keywords: ["perfil facebook farmado", "comprar perfil facebook", "perfil aged", "perfil verificado", "conta facebook farmada"],
  },
  {
    path: "/perfil-aged",
    title: "Perfil Aged Facebook | Contas Antigas Ativas",
    description: "Perfis Facebook aged com 2 a 10+ anos de timeline real, amigos, fotos e histórico de login orgânico. Base ideal para BM verificada e Meta Ads.",
    keywords: ["perfil aged facebook", "perfil antigo facebook", "conta aged", "perfil 2010", "perfil envelhecido"],
  },
  {
    path: "/paginas-facebook",
    title: "Comprar Fan Page Facebook | Páginas Antigas Aged",
    description: "Fan Pages antigas e verificadas para Meta Ads: páginas com idade, engajamento real, seguidores orgânicos e nicho coerente para a sua oferta.",
    keywords: ["comprar fan page", "fan page antiga", "página facebook ads", "página com seguidores", "fan page verificada"],
  },
  {
    path: "/dominios-verificados",
    title: "Domínios Verificados Meta | Para Facebook Ads",
    description: "Domínios verificados no Meta para Facebook Ads, conversions API e WhatsApp Cloud API. Verificação ativa, DNS configurado e Trust Score alto.",
    keywords: ["domínio verificado meta", "verificação de domínio facebook", "domínio com trust", "domínio aquecido"],
  },
  {
    path: "/whatsapp-cloud-api",
    title: "WhatsApp Cloud API + BM Verificada | AD Scale",
    description: "BM Verificada para WhatsApp Cloud API: WABA verificada, número high quality, templates aprovados e tier 1k/10k/100k para disparo oficial.",
    keywords: ["whatsapp cloud api", "bm para whatsapp api", "waba verificada", "tier whatsapp api", "comprar bm whatsapp api"],
  },
  {
    path: "/pixel-capi",
    title: "Pixel Facebook + CAPI | Conversions API Meta",
    description: "Pixel verificado e Conversions API (CAPI) configurada para Facebook Ads pós iOS 14+: atribuição estável, eventos prioritários e domínio verificado.",
    keywords: ["pixel facebook capi", "conversions api meta", "capi facebook ads", "pixel verificado"],
  },
  {
    path: "/aquecimento-contas",
    title: "Aquecimento de Contas Facebook Ads | Warm-up",
    description: "Serviço de aquecimento (warm-up) profissional para contas Facebook Ads, BMs e perfis. Estratégia de cap, criativo e cadência para Trust Score alto.",
    keywords: ["aquecimento conta facebook", "warm up facebook ads", "esquentar bm", "esquentar conta ads"],
  },
  {
    path: "/cartoes-bin-internacional",
    title: "BIN para Facebook Ads | Cartões Internacionais",
    description: "BIN e cartões internacionais aprovadores para Meta Ads: testados em volume, com baixa taxa de hard decline e sem disparo de fraude na BM.",
    keywords: ["bin para facebook ads", "cartão internacional ads", "bin que aprova meta", "cartão para bm"],
  },
  {
    path: "/recuperacao-bm",
    title: "Recuperação de BM Bloqueada | Meta Ads | AD Scale",
    description: "Recuperação e desbloqueio de BM bloqueada no Meta Ads: diagnóstico, plano de defesa, contestação documental e contingência imediata.",
    keywords: ["bm bloqueada recuperar", "desbloqueio bm", "recuperar conta facebook ads", "bm restrita"],
  },
  {
    path: "/blog/pilar/business-manager",
    title: "Business Manager: tudo sobre BM no Meta | Blog AD Scale",
    description: "Pilar completo sobre Business Manager no Meta Ads: BM verificada, BM ilimitada, preço, auditoria, fornecedores e arquitetura de contingência.",
    keywords: ["business manager", "bm verificada", "bm ilimitada", "comprar bm", "auditoria bm"],
  },
  {
    path: "/blog/pilar/perfis-e-paginas",
    title: "Perfis e Páginas Facebook | Pilar | Blog AD Scale",
    description: "Perfis aged, fan pages antigas e fingerprint para Meta Ads: por que o administrador importa e como proteger esses ativos.",
    keywords: ["perfil aged", "fan page antiga", "fingerprint meta", "perfil farmado"],
  },
  {
    path: "/blog/pilar/seguranca-e-bloqueios",
    title: "Segurança e Bloqueios Meta Ads | Pilar | Blog AD Scale",
    description: "Como diagnosticar bloqueios, recuperar BMs e contas, montar plano de appeal e blindar contas novas antes do primeiro real gasto.",
    keywords: ["bloqueio conta facebook", "bm bloqueada", "recuperar conta ads", "appeal facebook ads"],
  },
  {
    path: "/blog/pilar/escala-e-performance",
    title: "Escala e Performance Meta Ads | Pilar | Blog AD Scale",
    description: "Warm-up, Trust Score, spending limit, Pixel + CAPI, domínio verificado e ROI de contingência para escalar Meta Ads com previsibilidade.",
    keywords: ["warm up meta ads", "trust score", "limite de gasto", "pixel capi", "conversions api"],
  },
  {
    path: "/blog/pilar/whatsapp-api",
    title: "WhatsApp Cloud API e BM Verificada | Pilar | Blog AD Scale",
    description: "Tudo sobre WhatsApp Cloud API ligado à BM verificada: WABA, número high quality, tiers 1k/10k/100k e templates aprovados.",
    keywords: ["whatsapp cloud api", "waba verificada", "disparo whatsapp api", "tier whatsapp"],
  },
  {
    path: "/blog/pilar/fundamentos-e-estrategia",
    title: "Fundamentos e Estratégia Meta Ads | Pilar | Blog AD Scale",
    description: "Glossário, comparativos de formação e decisões estratégicas para gestores de tráfego que pretendem investir em contingência Meta Ads.",
    keywords: ["glossário meta ads", "consultoria meta ads", "gestor de tráfego"],
  },
  {
    path: "/solucoes-meta-ads",
    title: "Soluções para Estrutura de Meta Ads | AD Scale",
    description: "Conheça a AD Scale, empresa independente com soluções consultivas para organização e estrutura de operações profissionais de Meta Ads.",
    keywords: ["soluções meta ads", "estrutura meta ads", "ad scale"],
  },
  {
    path: "/ativos-ads",
    title: "Ativos para Meta Ads | AD Scale",
    description: "Conheça a AD Scale, empresa independente com soluções consultivas para ativos e estrutura de operações profissionais de Meta Ads.",
    keywords: ["ativos meta ads", "ativos facebook ads", "estrutura meta ads", "ad scale"],
  },
  {
    path: "/aluguel-de-contas-meta-ads",
    title: "Aluguel de Contas Meta Ads e BM de Agência | Sem Mensalidade",
    description: "Alugue contas de agência Meta Ads e BM sem mensalidade: comissão de 5% sobre investimento, crédito de US$ 240 e taxa reduzida até 1% por metas.",
    keywords: [
      "aluguel de contas meta ads",
      "alugar contas de anúncio",
      "conta de agência meta ads",
      "contas de agência para facebook",
      "aluguel de bm",
      "aluguel de contas facebook",
      "conta de anúncios sem mensalidade",
      "acesso gerenciado meta ads",
      "infraestrutura meta ads",
      "páginas antigas para anunciantes",
      "estrutura meta ads para múltiplos clientes",
      "conta de anúncio com comissão",
      "aluguel de estrutura meta ads",
      "comissão sobre investimento meta ads",
    ],
  },
  {
    path: "/politica-de-privacidade",
    title: "Política de Privacidade | AD Scale",
    description: "Política de privacidade da AD Scale: como coletamos, usamos e protegemos os dados de usuários e clientes.",
    keywords: ["política de privacidade", "ad scale"],
  },
  {
    path: "/termos-de-uso",
    title: "Termos de Uso | AD Scale",
    description: "Termos de uso da AD Scale: finalidade informativa, limitação de responsabilidade e independência em relação a Meta e Google.",
    keywords: ["termos de uso", "ad scale"],
  },
];


// ---------- HTML transform ----------
function injectMeta(template, { title, description, canonical, ogImage, keywords, ogType = "website", publishedAt, jsonLd, bodyHtml }) {
  const ogImageUrl = ogImage?.startsWith("http") ? ogImage : `${SITE_URL}${ogImage || "/og/og-default.jpg"}`;
  const safeTitle = title.replace(/"/g, "&quot;");
  const safeDesc = description.replace(/"/g, "&quot;");
  const kw = keywords?.length ? keywords.join(", ") : "";

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${safeDesc}" />`);
  if (kw) {
    html = html.replace(/<meta name="keywords"[^>]*\/>/, `<meta name="keywords" content="${kw}" />`);
  }
  if (/<link rel="canonical"[^>]*\/>/.test(html)) {
    html = html.replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${canonical}" />`);
  } else {
    html = html.replace("</head>", `    <link rel="canonical" href="${canonical}" />\n  </head>`);
  }
  const extra = [
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${safeTitle}" />`,
    `<meta property="og:description" content="${safeDesc}" />`,
    `<meta property="og:image" content="${ogImageUrl}" />`,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    `<meta name="twitter:description" content="${safeDesc}" />`,
    `<meta name="twitter:image" content="${ogImageUrl}" />`,
    publishedAt ? `<meta property="article:published_time" content="${publishedAt}" />` : "",
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : "",
  ].filter(Boolean).join("\n    ");
  html = html.replace("</head>", `    ${extra}\n  </head>`);

  // Static, crawlable article body rendered BEFORE #root. Visible to bots and to
  // users with JS disabled; removed by the React entrypoint as soon as it hydrates,
  // so real users never see it duplicated alongside the SPA UI.
  const articleHtml = bodyHtml
    ? `<article>\n${bodyHtml}\n</article>`
    : "";
  const prerendered = `
    <div id="prerendered-seo" data-prerendered="true" style="max-width:760px;margin:0 auto;padding:32px 16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#111">
      <h1>${safeTitle}</h1>
      <p>${safeDesc}</p>
      ${articleHtml}
    </div>`;
  html = html.replace('<div id="root"></div>', `${prerendered}\n    <div id="root"></div>`);
  return html;
}


// ---------- JSON-LD builders ----------
const ORG_REF = { "@id": `${SITE_URL}/#organization` };

function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function webPageLd({ canonical, title, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: ORG_REF,
  };
}

function articleLd(post, canonical, ogImageUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "pt-BR",
    keywords: (post.keywords || []).join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    image: { "@type": "ImageObject", url: ogImageUrl, width: 1200, height: 630 },
    author: {
      "@type": "Person",
      name: "Pedro Lucas",
      url: `${SITE_URL}/autor/pedro-lucas`,
    },
    publisher: {
      "@type": "Organization",
      name: "AD Scale",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og/logo-adscale.png`,
      },
    },
  };
}


function writeRoute(routePath, html) {
  // Write BOTH dist/<route>.html (served directly at /<route> with 200, no 301)
  // AND dist/<route>/index.html (served at /<route>/ for back-compat with any
  // already-indexed trailing-slash URLs). Canonical points to the no-slash form,
  // so Google consolidates to that and the redirect chain that GSC flagged as
  // "Erro de redirecionamento" disappears.
  const cleanPath = routePath.replace(/^\//, "");
  const fileTarget = resolve(DIST, `${cleanPath}.html`);
  mkdirSync(dirname(fileTarget), { recursive: true });
  writeFileSync(fileTarget, html);
  const dirTarget = resolve(DIST, cleanPath, "index.html");
  mkdirSync(dirname(dirTarget), { recursive: true });
  writeFileSync(dirTarget, html);
}

// ---------- Generate ----------
let count = 0;

for (const page of staticPages) {
  // Trailing slash matches what GitHub Pages serves for directory routes,
  // avoiding 301 redirects that cause "Página com redirecionamento" in GSC.
  // No trailing slash — served directly from dist/<route>.html with 200.
  const canonical = `${SITE_URL}${page.path}`;
  const breadcrumbs = breadcrumbLd([
    { name: "Início", path: "/" },
    { name: page.title.split("|")[0].trim(), path: page.path },
  ]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [webPageLd({ canonical, title: page.title, description: page.description }), breadcrumbs],
  };
  const html = injectMeta(TEMPLATE, {
    title: page.title,
    description: page.description,
    canonical,
    keywords: page.keywords,
    jsonLd,
  });
  writeRoute(page.path, html);
  count++;
}

for (const post of posts) {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImageUrl = post.ogImage?.startsWith("http") ? post.ogImage : `${SITE_URL}${post.ogImage || "/og/og-default.jpg"}`;
  const breadcrumbs = breadcrumbLd([
    { name: "Início", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [articleLd(post, canonical, ogImageUrl), breadcrumbs],
  };
  const html = injectMeta(TEMPLATE, {
    title: seoTitlesMap[post.slug] ?? post.title,
    description: post.description,
    canonical,
    ogImage: post.ogImage,
    keywords: post.keywords,
    ogType: "article",
    publishedAt: post.publishedAt,
    jsonLd,
    bodyHtml: mdToHtml(post.content),
  });
  writeRoute(`/blog/${post.slug}`, html);
  count++;
}

// Refresh 404.html so SPA fallback uses the latest template (no per-route meta).
copyFileSync(resolve(DIST, "index.html"), resolve(DIST, "404.html"));

console.log(`[prerender] Generated ${count} prerendered routes + 404 fallback`);
