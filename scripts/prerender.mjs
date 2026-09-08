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

const INSTAGRAM_LINK_HTML = `
<a
  href="https://www.instagram.com/adscale_hub/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram oficial da AD•SCALE"
  style="display:inline-flex;align-items:center;gap:8px;color:#64748b;text-decoration:none;font-size:14px"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
  <span>Instagram oficial</span>
</a>`;

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

const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));

// ---------- Parse content pillars from src/data/blogPillars.ts ----------
// Os pilares e o índice do blog passam a receber corpo completo gerado a partir
// da MESMA fonte de dados que o React usa. Nenhuma página depende mais de um
// `bodyHtml` escrito à mão para ter conteúdo indexável.
const pillarSource = readFileSync(resolve("src/data/blogPillars.ts"), "utf8");
const pillars = [];
{
  const arr = pillarSource.split("export const pillars: Pillar[] = [")[1]?.split("\n];")[0] ?? "";
  for (const block of arr.split(/\n  \{\n/).slice(1)) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    if (!slug) continue;
    pillars.push({
      slug,
      title: block.match(/\n    title:\s*"([^"]+)"/)?.[1] ?? "",
      shortTitle: block.match(/shortTitle:\s*"([^"]+)"/)?.[1] ?? "",
      description: block.match(/\n    description:\s*"([^"]+)"/)?.[1] ?? "",
      longDescription: block.match(/longDescription:\s*\n?\s*"([\s\S]*?)",\n/)?.[1] ?? "",
      keywords: (block.match(/keywords:\s*\[([\s\S]*?)\]/)?.[1].match(/"([^"]+)"/g) ?? []).map((k) => k.slice(1, -1)),
      relatedLandingSlug: block.match(/relatedLandingSlug:\s*"([^"]+)"/)?.[1],
      relatedLandingLabel: block.match(/relatedLandingLabel:\s*"([^"]+)"/)?.[1],
      postSlugs: (block.match(/postSlugs:\s*\[([\s\S]*?)\]/)?.[1].match(/"([^"]+)"/g) ?? []).map((s) => s.slice(1, -1)),
      resourceLinks: [
        ...(block.match(/resourceLinks:\s*\{[\s\S]*?\n    \},/)?.[0] ?? "")
          .matchAll(/\{\s*href:\s*"([^"]+)",\s*label:\s*"([^"]+)"(?:,\s*description:\s*"([^"]+)")?\s*\}/g),
      ].map((m) => ({ href: m[1], label: m[2], description: m[3] })),
    });
  }
}
console.log(`[prerender] Parsed ${pillars.length} pilares de conteúdo`);

const pillarForPost = new Map();
for (const pillar of pillars) {
  for (const slug of pillar.postSlugs) if (!pillarForPost.has(slug)) pillarForPost.set(slug, pillar);
}

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const link = (href, label) => `<a href="${SITE_URL}${href}">${esc(label)}</a>`;

/** Corpo completo de um pilar: intro, artigos, recursos e próximo passo. */
function pillarBodyHtml(pillar) {
  const postItems = pillar.postSlugs
    .map((s) => postBySlug[s])
    .filter(Boolean)
    .map((p) => `<li>${link(`/blog/${p.slug}`, p.title)} — ${esc(p.description)}</li>`)
    .join("\n");
  const resources = pillar.resourceLinks?.length
    ? `<h2>Páginas e guias relacionados</h2>\n<ul>${pillar.resourceLinks
        .map((r) => `<li>${link(r.href, r.label)}${r.description ? ` — ${esc(r.description)}` : ""}</li>`)
        .join("")}</ul>`
    : "";
  const landing = pillar.relatedLandingSlug
    ? `<h2>Próximo passo</h2>\n<p>${esc(pillar.relatedLandingLabel || "Ver opções disponíveis")}: ${link(
        `/${pillar.relatedLandingSlug}`,
        pillar.relatedLandingLabel || pillar.shortTitle,
      )}. A AD•SCALE fornece infraestrutura e ativos; a gestão das campanhas permanece com o cliente.</p>`
    : `<h2>Próximo passo</h2>\n<p>Continue pelos demais ${link("/blog", "artigos do blog da AD Scale")}.</p>`;
  const siblings = pillars
    .filter((p) => p.slug !== pillar.slug)
    .map((p) => `<li>${link(`/blog/pilar/${p.slug}`, p.shortTitle)} — ${esc(p.description)}</li>`)
    .join("");
  return `
<p>${esc(pillar.longDescription)}</p>
<h2>O que este pilar cobre</h2>
<p>${esc(pillar.title)}. Temas centrais: ${pillar.keywords.map(esc).join(", ")}.</p>
<h2>Artigos deste pilar</h2>
<ul>
${postItems}
</ul>
${resources}
${landing}
<h2>Outros pilares de conteúdo</h2>
<ul>${siblings}</ul>`;
}

/** Corpo completo do índice do blog: pilares + inventário de artigos. */
function blogIndexBodyHtml() {
  const pillarList = pillars
    .map((p) => `<li>${link(`/blog/pilar/${p.slug}`, p.shortTitle)} — ${esc(p.description)}</li>`)
    .join("");
  const postList = posts
    .map((p) => `<li>${link(`/blog/${p.slug}`, p.title)}</li>`)
    .join("");
  return `
<h2>Pilares de conteúdo</h2>
<p>Os artigos estão organizados em pilares temáticos. Cada pilar reúne os guias de um mesmo assunto.</p>
<ul>${pillarList}</ul>
<h2>Todos os artigos</h2>
<ul>${postList}</ul>
<h2>Páginas de estrutura e ativos</h2>
<ul>
  <li>${link("/business-manager", "Business Manager")}</li>
  <li>${link("/perfis-facebook", "Perfis Facebook")}</li>
  <li>${link("/paginas-facebook", "Páginas Facebook")}</li>
  <li>${link("/aluguel-de-contas-meta-ads", "Contas de anúncios por acesso gerenciado")}</li>
</ul>`;
}

/** Bloco de navegação semântica anexado ao final de cada artigo. */
function postClusterNavHtml(post) {
  const pillar = pillarForPost.get(post.slug);
  if (!pillar) {
    return `<h2>Continue lendo</h2>\n<p>Veja os demais ${link("/blog", "artigos do blog da AD Scale")}.</p>`;
  }
  const idx = pillar.postSlugs.indexOf(post.slug);
  const related = [];
  for (let i = 1; related.length < 6 && i < pillar.postSlugs.length; i++) {
    const p = postBySlug[pillar.postSlugs[(idx + i) % pillar.postSlugs.length]];
    if (p && p.slug !== post.slug) related.push(p);
  }
  const landing = pillar.relatedLandingSlug
    ? ` Consulte também ${link(`/${pillar.relatedLandingSlug}`, pillar.relatedLandingLabel || pillar.shortTitle)}.`
    : "";
  const fallback = pillars
    .filter((x) => x.slug !== pillar.slug)
    .slice(0, 4)
    .map((x) => `<li>${link(`/blog/pilar/${x.slug}`, x.shortTitle)}</li>`)
    .join("");
  const extra = related.length < 3 ? `<h2>Outros pilares</h2><ul>${fallback}</ul>` : "";
  return `
<h2>Este artigo faz parte do pilar ${esc(pillar.shortTitle)}</h2>
<p>Veja o guia completo em ${link(`/blog/pilar/${pillar.slug}`, pillar.title)}.${landing}</p>
<h2>Artigos relacionados</h2>
<ul>${related.map((p) => `<li>${link(`/blog/${p.slug}`, p.title)}</li>`).join("")}</ul>
${extra}`;
}



// ---------- Parse product landings from src/data/landings.tsx ----------
// Mesma fonte de dados que o React renderiza: nenhuma landing precisa de um
// bodyHtml manual para ter H2, corpo, FAQ e links internos no HTML inicial.
const landingSource = readFileSync(resolve("src/data/landings.tsx"), "utf8");
const landings = {};
for (const chunk of landingSource.split(/const \w+: ProductLandingData = \{/).slice(1)) {
  const body = chunk.split("\n};")[0];
  const slug = body.match(/slug:\s*"([^"]+)"/)?.[1];
  if (!slug) continue;
  const sub = body.match(/subheadline:\s*\n?\s*"([\s\S]*?)",\n/)?.[1];
  const intro = body.match(/assets:\s*\{[\s\S]*?intro:\s*\n?\s*"([\s\S]*?)",\n/)?.[1];
  const footerLine = body.match(/footerLine:\s*\n?\s*"([\s\S]*?)",\n/)?.[1];
  const items = [...body.matchAll(/mk\(\s*\w+,\s*"([^"]*)",\s*"([^"]*)",\s*"([^"]*)",\s*\[([\s\S]*?)\]\s*\)/g)].map((m) => ({
    tag: m[1],
    title: m[2],
    description: m[3],
    bullets: (m[4].match(/"([^"]+)"/g) || []).map((b) => b.slice(1, -1)),
  }));
  const faqs = [...body.matchAll(/question:\s*"([^"]*)",\s*\n\s*answer:\s*\n?\s*"([\s\S]*?)",\n/g)].map((m) => ({ q: m[1], a: m[2] }));
  const crossBlocks = [...body.matchAll(/h2:\s*"([^"]*)",\s*\n\s*text:\s*\n?\s*"([\s\S]*?)",\n([\s\S]*?)\n\s{6}\}/g)].map((m) => ({
    h2: m[1],
    text: m[2],
    links: [...m[3].matchAll(/href:\s*"([^"]+)",\s*label:\s*"([^"]+)"/g)].map((l) => ({ href: l[1], label: l[2] })),
  }));
  const ctaDescription = body.match(/cta:\s*\{[\s\S]*?description:\s*\n?\s*"([\s\S]*?)",\n/)?.[1];
  landings[slug] = { slug, sub, intro, footerLine, items, faqs, crossBlocks, ctaDescription };
}
console.log(`[prerender] Parsed ${Object.keys(landings).length} landings comerciais`);

const RELATED_LANDINGS = {
  "business-manager": ["/bm-verificada", "/bm-ilimitada", "/perfis-facebook", "/paginas-facebook", "/aluguel-de-contas-meta-ads"],
  "bm-ilimitada": ["/business-manager", "/bm-verificada", "/aquecimento-contas", "/aluguel-de-contas-meta-ads"],
  "perfis-facebook": ["/perfil-facebook-antigo", "/perfil-aged", "/business-manager", "/paginas-facebook"],
  "perfil-aged": ["/perfis-facebook", "/perfil-facebook-antigo", "/paginas-facebook", "/business-manager"],
  "paginas-facebook": ["/perfis-facebook", "/business-manager", "/bm-verificada", "/perfil-aged"],
  "dominios-verificados": ["/pixel-capi", "/bm-verificada", "/business-manager", "/whatsapp-cloud-api"],
  "pixel-capi": ["/dominios-verificados", "/bm-verificada", "/business-manager", "/aquecimento-contas"],
  "aquecimento-contas": ["/business-manager", "/bm-ilimitada", "/bm-verificada", "/perfis-facebook"],
  "recuperacao-bm": ["/business-manager", "/bm-verificada", "/aluguel-de-contas-meta-ads", "/perfis-facebook"],
  "whatsapp-cloud-api": ["/bm-verificada", "/business-manager", "/dominios-verificados"],
};

const LANDING_LABEL = {
  "/business-manager": "Business Manager",
  "/bm-verificada": "BM verificada",
  "/bm-ilimitada": "BM ilimitada",
  "/perfis-facebook": "Perfis Facebook",
  "/perfil-facebook-antigo": "Perfil Facebook antigo",
  "/perfil-aged": "Perfil aged",
  "/paginas-facebook": "Páginas Facebook",
  "/dominios-verificados": "Domínios verificados",
  "/pixel-capi": "Pixel + CAPI",
  "/aquecimento-contas": "Aquecimento de contas",
  "/recuperacao-bm": "Recuperação de BM",
  "/whatsapp-cloud-api": "WhatsApp Cloud API",
  "/aluguel-de-contas-meta-ads": "Aluguel de contas Meta Ads",
};

/** FAQ + links relacionados de uma landing (usado quando o corpo é curado à mão). */
function landingExtrasHtml(slug) {
  const l = landings[slug];
  if (!l) return "";
  const out = [];
  const related = RELATED_LANDINGS[slug] || [];
  if (related.length) {
    out.push("<h2>Estruturas relacionadas</h2>");
    out.push(`<ul>${related.map((href) => `<li>${link(href, LANDING_LABEL[href] || href)}</li>`).join("")}</ul>`);
  }
  if (l.faqs.length) {
    out.push("<h2>Perguntas frequentes</h2>");
    for (const f of l.faqs) out.push(`<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`);
  }
  return out.join("\n");
}

/** Corpo completo de uma landing comercial, derivado dos dados do React. */
function landingBodyHtml(slug) {
  const l = landings[slug];
  if (!l) return "";
  const out = [];
  if (l.sub) out.push(`<p>${esc(l.sub)}</p>`);
  if (l.intro) out.push(`<p>${esc(l.intro)}</p>`);
  for (const item of l.items) {
    out.push(`<h2>${esc(item.title)}</h2>`);
    out.push(`<p>${esc(item.description)}</p>`);
    if (item.bullets.length) out.push(`<ul>${item.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`);
  }
  for (const b of l.crossBlocks) {
    out.push(`<h2>${esc(b.h2)}</h2>`);
    out.push(`<p>${esc(b.text)}</p>`);
    if (b.links?.length) out.push(`<ul>${b.links.map((x) => `<li>${link(x.href, x.label)}</li>`).join("")}</ul>`);
  }
  const related = RELATED_LANDINGS[slug] || [];
  if (related.length) {
    out.push("<h2>Estruturas relacionadas</h2>");
    out.push(`<ul>${related.map((href) => `<li>${link(href, LANDING_LABEL[href] || href)}</li>`).join("")}</ul>`);
  }
  if (l.faqs.length) {
    out.push("<h2>Perguntas frequentes</h2>");
    for (const f of l.faqs) out.push(`<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`);
  }
  if (l.footerLine) out.push(`<p>${esc(l.footerLine)}</p>`);
  if (l.ctaDescription) out.push(`<p>${esc(l.ctaDescription)}</p>`);
  out.push(`<p>A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta. Consulte também os ${link("/blog", "artigos do blog")}.</p>`);
  return out.join("\n");
}


// Páginas editoriais/institucionais que não vêm de landings.tsx nem de pilares.
// O corpo abaixo é o equivalente semântico do que o React renderiza.
const MANUAL_BODIES = {
  "/bm-verificada": `
<p>Business Manager verificada para operações de Meta Ads e WhatsApp Cloud API: estrutura com verificação de negócio concluída junto à Meta, utilizada por operações que precisam de limites maiores e de acesso a recursos que exigem verificação. Disponibilidade e características são confirmadas caso a caso.</p>
<h2>O que é uma BM verificada</h2>
<p>É uma Business Manager que passou pela verificação de negócio da Meta, com documentação empresarial validada. A verificação é um requisito para determinados recursos da plataforma, como parte das integrações oficiais do WhatsApp, e costuma estar associada a limites de gasto mais altos.</p>
<h2>Quando a verificação faz diferença</h2>
<ul>
  <li>Operações que precisam de cap de gasto mais alto desde o início.</li>
  <li>Estruturas que vão operar integrações oficiais do WhatsApp (WABA / Cloud API).</li>
  <li>Times que trabalham com várias contas de anúncios e precisam de organização de permissões.</li>
  <li>Operações que já sofreram restrições e estão reconstruindo a estrutura.</li>
</ul>
<h2>O que a verificação não garante</h2>
<p>Verificação não é imunidade. Contas verificadas continuam sujeitas a revisão, restrição e desativação conforme as políticas da Meta. Nenhuma empresa independente pode garantir aprovação de anúncios ou ausência de bloqueio.</p>
<h2>Estruturas relacionadas</h2>
<ul>
  <li>${link("/business-manager", "Business Manager: tipos disponíveis")}</li>
  <li>${link("/bm-ilimitada", "BM ilimitada")}</li>
  <li>${link("/whatsapp-cloud-api", "BM para WhatsApp Cloud API")}</li>
  <li>${link("/dominios-verificados", "Domínios verificados")}</li>
  <li>${link("/recuperacao-bm", "Recuperação de BM bloqueada")}</li>
</ul>
<h2>Conteúdo sobre BM verificada</h2>
<ul>
  <li>${link("/blog/o-que-e-business-manager-verificada-meta", "O que é Business Manager verificada")}</li>
  <li>${link("/blog/quanto-custa-bm-verificada-facebook-2026", "Quanto custa uma BM verificada")}</li>
  <li>${link("/blog/como-escolher-fornecedor-bm-verificada", "Como escolher fornecedor de BM verificada")}</li>
  <li>${link("/blog/pilar/business-manager", "Pilar: Business Manager no Meta")}</li>
</ul>
<p>A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta.</p>`,

  "/contingencia-meta-ads": `
<p>Contingência em Meta Ads é a prática de manter estrutura redundante pronta para assumir a operação quando um ativo é restrito. Em vez de depender de uma única Business Manager, a operação passa a trabalhar com camadas: perfis, BMs, páginas, domínios e contas de anúncios organizados para que um bloqueio não pare a verba.</p>
<h2>Por que operações de alto volume precisam de contingência</h2>
<p>Quanto maior o investimento diário, maior o custo de cada hora parada. Restrições podem ocorrer por política, por análise automática ou por comportamento da conta, e o tempo de resposta da Meta não é previsível. Contingência reduz o tempo de retomada, não a probabilidade de revisão.</p>
<h2>Camadas de uma estrutura de contingência</h2>
<ul>
  <li>Perfis administradores separados por camada, com fingerprint estável.</li>
  <li>Business Managers em camadas, cada uma com sua função na operação.</li>
  <li>Páginas e domínios verificados coerentes com a oferta anunciada.</li>
  <li>Pixel e Conversions API planejados para sobreviver à troca de estrutura.</li>
  <li>Runbook definido: quem aciona o backup, quando e como medir o downtime.</li>
</ul>
<h2>Estruturas e ativos</h2>
<ul>
  <li>${link("/business-manager", "Business Manager")}</li>
  <li>${link("/bm-verificada", "BM verificada")}</li>
  <li>${link("/perfis-facebook", "Perfis Facebook")}</li>
  <li>${link("/paginas-facebook", "Páginas Facebook")}</li>
  <li>${link("/aluguel-de-contas-meta-ads", "Contas de anúncios por acesso gerenciado")}</li>
  <li>${link("/recuperacao-bm", "Recuperação de BM bloqueada")}</li>
</ul>
<h2>Guias sobre contingência</h2>
<ul>
  <li>${link("/blog/arquitetura-contingencia-meta-ads-operacao-alto-volume", "Arquitetura de contingência para alto volume")}</li>
  <li>${link("/blog/estrategia-3-camadas-bm-meta-ads-contingencia", "Estratégia de 3 camadas de BM")}</li>
  <li>${link("/blog/dia-do-bloqueio-runbook-emergencia-meta-ads", "Runbook do dia do bloqueio")}</li>
  <li>${link("/blog/pilar/seguranca-e-bloqueios", "Pilar: segurança e bloqueios")}</li>
</ul>
<p>A AD•SCALE fornece infraestrutura e ativos; a gestão das campanhas permanece com o cliente. Empresa independente, sem vínculo oficial com a Meta.</p>`,

  "/consultoria-meta-ads": `
<p>Consultoria técnica para operações de Meta Ads de alto volume: leitura da estrutura atual, diagnóstico de riscos e desenho da arquitetura de contingência. A consultoria não substitui a gestão de campanhas — ela organiza a infraestrutura em que as campanhas rodam.</p>
<h2>O que a consultoria cobre</h2>
<ul>
  <li>Mapa dos ativos atuais: perfis, BMs, páginas, contas de anúncios, domínios e Pixel.</li>
  <li>Diagnóstico dos pontos de falha que derrubam a operação inteira.</li>
  <li>Desenho da estrutura em camadas e do plano de retomada em caso de bloqueio.</li>
  <li>Organização de permissões e de rotina de segurança da equipe.</li>
  <li>Plano de escala: warm-up, spending limit e leitura de qualidade da conta.</li>
</ul>
<h2>Para quem faz sentido</h2>
<p>Para agências e operações que já investem verba recorrente, têm equipe própria de gestão e perdem faturamento quando um ativo é restrito. Não é indicada para quem está começando e ainda não roda campanhas.</p>
<h2>O que a consultoria não é</h2>
<p>Não é curso, não é gestão de campanhas e não é garantia de aprovação, desempenho ou ausência de bloqueio. As decisões finais sobre contas e anúncios são sempre da Meta.</p>
<h2>Páginas e conteúdos relacionados</h2>
<ul>
  <li>${link("/contingencia-meta-ads", "Contingência Meta Ads")}</li>
  <li>${link("/business-manager", "Business Manager")}</li>
  <li>${link("/aquecimento-contas", "Aquecimento de contas")}</li>
  <li>${link("/blog/consultoria-meta-ads-vs-curso-quando-contratar", "Consultoria vs curso: quando contratar")}</li>
  <li>${link("/blog/quanto-cobrar-cliente-gestao-trafego-com-contingencia", "Quanto cobrar do cliente com contingência")}</li>
  <li>${link("/blog/pilar/fundamentos-e-estrategia", "Pilar: fundamentos e estratégia")}</li>
</ul>
<p>A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta.</p>`,

  "/sobre": `
<p>A AD•SCALE é uma empresa independente que fornece infraestrutura e ativos para operações profissionais de Meta Ads: perfis Facebook, Business Managers, páginas, contas de anúncios por acesso gerenciado e estruturas de contingência.</p>
<h2>No que a AD•SCALE acredita</h2>
<p>Operação séria de tráfego não depende de sorte com a plataforma. Depende de estrutura organizada, redundância planejada e expectativa realista sobre o que a Meta permite. Por isso trabalhamos com curadoria de ativos e orientação, e não com promessas de imunidade.</p>
<h2>Como trabalhamos</h2>
<ul>
  <li>Você explica a operação: verba, nicho, número de contas e histórico de bloqueios.</li>
  <li>Verificamos disponibilidade real dos ativos no momento da consulta.</li>
  <li>Apresentamos as opções e as limitações de cada uma, por escrito.</li>
  <li>Entregamos com orientação inicial de uso e de organização de permissões.</li>
</ul>
<h2>O que não prometemos</h2>
<p>Não prometemos aprovação de anúncios, ausência de revisão, desempenho de campanha ou reversão garantida de bloqueio. Nenhuma empresa independente pode garantir isso.</p>
<h2>Conheça a estrutura</h2>
<ul>
  <li>${link("/business-manager", "Business Manager")}</li>
  <li>${link("/perfis-facebook", "Perfis Facebook")}</li>
  <li>${link("/aluguel-de-contas-meta-ads", "Aluguel de contas Meta Ads")}</li>
  <li>${link("/blog", "Blog com guias técnicos")}</li>
  <li>${link("/autor/pedro-lucas", "Pedro Lucas, fundador da AD Scale")}</li>
</ul>
<h2>Perguntas frequentes sobre a AD Scale</h2>
<h3>A AD•SCALE gerencia campanhas?</h3>
<p>Não. Fornecemos infraestrutura, ativos e orientação inicial. A criação, a otimização e a responsabilidade pelas campanhas permanecem com o cliente ou com o profissional contratado por ele.</p>
<h3>A AD•SCALE tem vínculo com a Meta?</h3>
<p>Não. Somos uma empresa independente, sem vínculo, patrocínio ou endosso da Meta Platforms, Inc. Todos os ativos permanecem sujeitos às políticas e análises da plataforma.</p>
<h3>Como falo com a equipe?</h3>
<p>O atendimento é feito por WhatsApp, a partir de qualquer página do site. Descreva a operação — verba, nicho e histórico — para receber uma leitura realista das opções disponíveis no momento.</p>`,

  "/autor/pedro-lucas": `
<p>Pedro Lucas é fundador da AD•SCALE e escreve os conteúdos técnicos do blog sobre Business Manager, contingência em Meta Ads, bloqueios e escala de operações de alto volume.</p>
<h2>Área de atuação</h2>
<p>Estrutura e contingência para Meta Ads: arquitetura de Business Managers em camadas, organização de perfis administradores e páginas, diagnóstico de bloqueios, recuperação de ativos e planejamento de escala com Pixel e Conversions API.</p>
<h2>Onde ele publica</h2>
<ul>
  <li>${link("/blog/pilar/business-manager", "Pilar: Business Manager no Meta")}</li>
  <li>${link("/blog/pilar/seguranca-e-bloqueios", "Pilar: segurança e bloqueios")}</li>
  <li>${link("/blog/pilar/escala-e-performance", "Pilar: escala e performance")}</li>
  <li>${link("/blog/pilar/perfis-e-paginas", "Pilar: perfis e páginas")}</li>
  <li>${link("/blog", "Todos os artigos do blog")}</li>
</ul>
<h2>Sobre a empresa</h2>
<p>Conheça a ${link("/sobre", "história e a forma de trabalho da AD Scale")} e as ${link("/contingencia-meta-ads", "estruturas de contingência")} disponíveis. A AD•SCALE é uma empresa independente, sem vínculo oficial com a Meta.</p>
<h2>Temas que ele cobre com mais frequência</h2>
<ul>
  <li>Diferença entre BM nova, antiga, verificada e ilimitada, e quando cada uma faz sentido.</li>
  <li>Como montar redundância de estrutura sem multiplicar custo desnecessário.</li>
  <li>Diagnóstico de bloqueios: o que a mensagem da Meta indica e o que fazer em seguida.</li>
  <li>Rotina de segurança de perfis administradores e organização de permissões da equipe.</li>
  <li>Mensuração: Pixel, Conversions API, verificação de domínio e leitura de métricas.</li>
</ul>
<h2>Linha editorial</h2>
<p>Os conteúdos evitam promessas de imunidade, de aprovação garantida ou de resultado. O objetivo é explicar como a estrutura funciona, quais são os riscos reais e quais decisões cabem ao anunciante — inclusive quando a recomendação é não comprar nada.</p>`,

  "/guia-facebook-ads-alto-volume": `
<p>Guia de Facebook Ads para alto volume: o que muda quando a operação passa a investir valores relevantes por dia e por que a estrutura, e não o criativo, costuma ser o gargalo nessa faixa.</p>
<h2>O que muda no alto volume</h2>
<p>Em verba alta, cada restrição custa faturamento por hora parada. A operação precisa de redundância, de rotina de segurança e de leitura constante da qualidade das contas. Escalar é tanto trabalho de estrutura quanto de campanha.</p>
<h2>Checklist de estrutura</h2>
<ul>
  <li>BMs e perfis de backup já configurados, com domínio e Pixel ativos.</li>
  <li>Fingerprint estável (IP, navegador, dispositivo, fuso) para todos os logins.</li>
  <li>Documentação de handover técnica pronta para qualquer membro do time.</li>
  <li>Plano de comunicação interno: quem aciona o backup, quando e como medir o downtime.</li>
  <li>Warm-up planejado: não subir campanha de alto valor em conta nova.</li>
</ul>
<h2>Aprofunde por tema</h2>
<ul>
  <li>${link("/blog/pilar/escala-e-performance", "Escala e performance")}</li>
  <li>${link("/blog/pilar/seguranca-e-bloqueios", "Segurança e bloqueios")}</li>
  <li>${link("/blog/warm-up-conta-anuncio-meta-passo-a-passo", "Warm-up de conta passo a passo")}</li>
  <li>${link("/blog/spending-limit-meta-como-subir-degraus", "Spending limit: como subir degraus")}</li>
  <li>${link("/blog/arquitetura-contingencia-meta-ads-operacao-alto-volume", "Arquitetura de contingência")}</li>
</ul>
<h2>Estrutura disponível</h2>
<ul>
  <li>${link("/contingencia-meta-ads", "Contingência Meta Ads")}</li>
  <li>${link("/business-manager", "Business Manager")}</li>
  <li>${link("/aquecimento-contas", "Aquecimento de contas")}</li>
</ul>
<p>Nenhuma estrutura garante aprovação, desempenho ou ausência de restrição. A AD•SCALE é uma empresa independente, sem vínculo oficial com a Meta.</p>
<h2>Erros que aparecem sempre nessa faixa de verba</h2>
<ul>
  <li>Concentrar toda a operação em uma única Business Manager.</li>
  <li>Subir verba alta em conta recém-criada, sem warm-up.</li>
  <li>Compartilhar o mesmo perfil administrador entre todas as camadas.</li>
  <li>Deixar Pixel e domínio vinculados apenas à estrutura principal.</li>
  <li>Não ter um responsável definido para acionar o backup no dia do bloqueio.</li>
</ul>
<h2>Como usar este guia</h2>
<p>Leia primeiro os pilares de escala e de segurança, aplique o checklist de estrutura e só então aumente o degrau de investimento. Cada aumento de verba deve vir acompanhado de uma camada de redundância proporcional.</p>`,

  "/solucoes-meta-ads": `
<p>A AD•SCALE reúne soluções consultivas para organizar a estrutura de operações profissionais de Meta Ads: quais ativos a operação precisa, como eles se conectam e o que fazer quando um deles é restrito.</p>
<h2>Soluções por necessidade</h2>
<ul>
  <li>Estrutura inicial organizada: perfil, Business Manager, página e conta de anúncios coerentes entre si.</li>
  <li>Redundância para operações que já investem verba recorrente.</li>
  <li>Acesso gerenciado para times que preferem custo variável em vez de compra de ativo.</li>
  <li>Diagnóstico e apoio quando a operação já está restrita.</li>
</ul>
<h2>Ativos e estruturas</h2>
<ul>
  <li>${link("/business-manager", "Business Manager")}</li>
  <li>${link("/bm-verificada", "BM verificada")}</li>
  <li>${link("/perfis-facebook", "Perfis Facebook")}</li>
  <li>${link("/paginas-facebook", "Páginas Facebook")}</li>
  <li>${link("/aluguel-de-contas-meta-ads", "Aluguel de contas Meta Ads")}</li>
  <li>${link("/whatsapp-cloud-api", "BM para WhatsApp Cloud API")}</li>
</ul>
<h2>Como funciona o atendimento</h2>
<p>Você descreve a operação, verificamos disponibilidade, apresentamos opções com as limitações de cada uma e entregamos com orientação inicial. A operação das campanhas permanece com o seu time.</p>
<h2>Conteúdo técnico</h2>
<p>Os guias do ${link("/blog", "blog da AD Scale")} explicam cada camada da estrutura, do ${link("/blog/pilar/business-manager", "pilar de Business Manager")} ao ${link("/blog/pilar/escala-e-performance", "pilar de escala e performance")}.</p>
<p>A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta.</p>
<h2>Limites do que oferecemos</h2>
<p>Não vendemos garantia de aprovação, de desempenho ou de ausência de bloqueio, e não gerenciamos campanhas. Qualquer estrutura, verificada ou não, pode ser revisada, restringida ou desativada pela Meta a qualquer momento.</p>
<h2>Perguntas frequentes</h2>
<h3>Preciso comprar tudo de uma vez?</h3>
<p>Não. A maioria das operações começa pela camada que resolve o gargalo atual e amplia a estrutura conforme o volume cresce.</p>
<h3>Vocês atendem operações pequenas?</h3>
<p>Sim, desde que já existam campanhas rodando. Para quem ainda não anuncia, a recomendação é começar pela estrutura própria antes de investir em contingência.</p>`,

  "/ativos-ads": `
<p>Ativos para Meta Ads são os elementos que compõem uma operação de anúncios: perfil administrador, Business Manager, página, conta de anúncios, domínio verificado e Pixel. Cada um tem função própria e um risco próprio quando falta ou é restrito.</p>
<h2>Por que a estrutura importa em Meta Ads</h2>
<p>Campanha não roda sozinha: ela depende de uma cadeia de ativos. Um perfil administrador restrito derruba o acesso à BM; uma página com histórico ruim afeta a entrega; um domínio não verificado limita eventos. Organizar essa cadeia é o que dá previsibilidade.</p>
<h2>Ativos disponíveis</h2>
<ul>
  <li>${link("/perfis-facebook", "Perfis Facebook")} — usuários que administram a estrutura.</li>
  <li>${link("/business-manager", "Business Managers")} — ambiente que organiza ativos e permissões.</li>
  <li>${link("/paginas-facebook", "Páginas Facebook")} — ativo público vinculado às campanhas.</li>
  <li>${link("/aluguel-de-contas-meta-ads", "Contas de anúncios por acesso gerenciado")}.</li>
  <li>${link("/dominios-verificados", "Domínios verificados")} e ${link("/pixel-capi", "Pixel + CAPI")} — camada de mensuração.</li>
</ul>
<h2>Como escolher</h2>
<p>A escolha depende da verba diária, do nicho, do número de contas simultâneas e do histórico de bloqueios da operação. Consulte a equipe para verificar disponibilidade e características atuais antes de contratar.</p>
<h2>Conteúdo relacionado</h2>
<ul>
  <li>${link("/blog/estrutura-meta-ads-perfil-bm-conta-anuncios", "Estrutura Meta Ads: perfil, BM e conta de anúncios")}</li>
  <li>${link("/blog/estrutura-bm-conta-pixel-pagina-relacao", "Como BM, conta, Pixel e página se relacionam")}</li>
  <li>${link("/blog/pilar/business-manager", "Pilar: Business Manager")}</li>
</ul>
<p>Todos os ativos permanecem sujeitos às políticas e análises da Meta. A AD•SCALE é uma empresa independente.</p>
<h2>Perguntas frequentes sobre ativos</h2>
<h3>Perfil e conta de anúncios são a mesma coisa?</h3>
<p>Não. O perfil é o usuário administrador que recebe permissões; a conta de anúncios é o ativo dentro da Business Manager onde campanhas e investimento são gerenciados.</p>
<h3>Idade do ativo garante alguma coisa?</h3>
<p>Não. Histórico pode ajudar em análise, mas não garante aprovação de anúncios, desempenho nem ausência de restrição.</p>
<h3>Como verificar disponibilidade?</h3>
<p>Fale com a equipe pelo WhatsApp. A disponibilidade e as características de cada ativo mudam com frequência e são confirmadas no momento da consulta.</p>`,
};

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
    title: "Comprar Perfil Facebook para Anúncios | AD Scale",
    h1: "Comprar Perfil Facebook para Anúncios",
    description: "Perfis Facebook para anúncios e estruturas de Meta Ads. Compare opções de perfis, entenda as diferenças e consulte disponibilidade na AD Scale.",
    keywords: ["comprar perfil facebook", "comprar perfil facebook para anúncios", "perfil facebook para anúncios", "perfis facebook", "perfil facebook meta ads", "perfil administrador"],
    bodyHtml: `
      <p>Perfis Facebook para compor estruturas profissionais de Meta Ads, Business Managers, páginas e contas de anúncios. Consulte as opções disponíveis conforme a necessidade da sua operação. Todos os ativos permanecem sujeitos às políticas e análises da plataforma.</p>
      <h2>Perfil Facebook antigo</h2>
      <p>Perfis com histórico anterior de existência e utilização. Veja as <a href="${SITE_URL}/perfil-facebook-antigo">opções de perfis Facebook antigos</a>.</p>
      <h2>Perfil Aged Facebook</h2>
      <p>Aged é o termo técnico de mercado para perfis com histórico. Consulte o <a href="${SITE_URL}/perfil-aged">guia sobre perfil aged</a>.</p>
      <h2>Perfil Facebook e Business Manager</h2>
      <p>O perfil recebe permissões dentro da estrutura empresarial. Entenda como funciona uma <a href="${SITE_URL}/business-manager">Business Manager</a>, as <a href="${SITE_URL}/bm-verificada">opções de BM verificada</a> e a <a href="${SITE_URL}/bm-ilimitada">estrutura de BM ilimitada</a>.</p>
      <h2>Perfil Facebook e Conta de Anúncios</h2>
      <p>São ativos diferentes: o perfil é o usuário com permissões; a conta de anúncios é onde campanhas e investimentos são gerenciados.</p>
      <h2>Como funciona uma estrutura completa de Meta Ads?</h2>
      <p>Perfil → Business Manager → Página → Conta de anúncios → Campanhas. A estrutura pode variar conforme a operação.</p>`,
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
    h1: "BM Verificada e WABA para WhatsApp Cloud API que escala.",
    description: "Business Managers para operações que utilizam a WhatsApp Cloud API: BM 250, 2K, 10K, 100K, Ilimitada e Balão. Consulte disponibilidade e configuração.",
    keywords: ["whatsapp cloud api", "bm para whatsapp api", "business manager whatsapp", "bm verificada", "api oficial do whatsapp", "whatsapp business platform", "waba", "integração whatsapp"],
    breadcrumb: [
      { name: "Início", path: "/" },
      { name: "WhatsApp Cloud API", path: "/whatsapp-cloud-api" },
    ],
    bodyHtml: `
      <p>Business Managers para operações que utilizam a API Oficial do WhatsApp, com diferentes capacidades e configurações conforme disponibilidade. Escolha entre BM 250, 2K, 10K, 100K, Ilimitada e BM Balão e consulte nossa equipe para verificar a opção disponível para sua operação.</p>
      <p>As características de cada estrutura podem variar conforme disponibilidade. Todos os ativos permanecem sujeitos às políticas, análises e limitações das plataformas da Meta.</p>
      <h2>O que é uma BM para WhatsApp Cloud API?</h2>
      <p>BM é a abreviação de Business Manager. Ela faz parte da estrutura empresarial utilizada para organizar ativos e acessos dentro do ecossistema da Meta. Em operações com WhatsApp Cloud API, a estrutura empresarial é utilizada em conjunto com os recursos necessários para operar a WhatsApp Business Platform.</p>
      <p>BM não é a mesma coisa que número de WhatsApp, template de mensagem, WABA, software de disparo ou CRM. A Business Manager é uma parte da estrutura; outros componentes podem ser necessários dependendo da operação.</p>
      <h2>BMs disponíveis para WhatsApp Cloud API</h2>
      <p>Trabalhamos com diferentes configurações de Business Manager. Consulte disponibilidade e características atuais antes da contratação.</p>
      <ul>
        <li><strong>BM 250</strong> — opção de entrada para operações que precisam de uma estrutura com capacidade inicial. Consulte a configuração disponível.</li>
        <li><strong>BM 2K</strong> — estrutura com capacidade superior à opção inicial, indicada para operações que precisam de maior volume.</li>
        <li><strong>BM 10K</strong> — opção voltada para operações que precisam trabalhar com uma capacidade maior dentro da estrutura.</li>
        <li><strong>BM 100K</strong> — estrutura voltada para operações de maior volume. Consulte disponibilidade e características da estrutura atual.</li>
        <li><strong>BM Ilimitada</strong> — categoria de BM com configuração específica para operações de maior capacidade. O nome da categoria não representa promessa de uso irrestrito ou ausência de limitações da plataforma.</li>
        <li><strong>BM Balão</strong> — estrutura específica disponível na AD•SCALE. Consulte nossa equipe para verificar características, finalidade e disponibilidade atual.</li>
      </ul>
      <h2>Qual BM é mais adequada para minha operação?</h2>
      <p>BM 250: entrada / menor capacidade. BM 2K: operação em crescimento. BM 10K: maior volume. BM 100K: alto volume. BM Ilimitada: configuração específica de maior capacidade. BM Balão: estrutura específica — consulte características. Essa comparação é apenas uma orientação inicial. A configuração e disponibilidade de cada ativo devem ser confirmadas antes da contratação.</p>
      <h2>O que está incluído?</h2>
      <p>As características podem variar de acordo com a BM disponível. Antes da contratação, nossa equipe informa exatamente a configuração do ativo. Confirme: tipo de BM, capacidade/configuração, situação atual da estrutura, ativos associados caso existam, condições comerciais e disponibilidade.</p>
      <p>Não presuma que estão incluídos: número de WhatsApp, template aprovado, WABA, CRM, disparador, software externo, configuração de campanhas ou gestão da operação. A inclusão desses elementos deve ser confirmada individualmente quando aplicável.</p>
      <h2>Como funciona?</h2>
      <p>1) Escolha a opção ou informe sua necessidade. 2) Consulte disponibilidade com nossa equipe. 3) Confirme as características da configuração escolhida. 4) Siga o processo comercial orientado pela equipe.</p>
      <h2>Para quem essas estruturas podem fazer sentido?</h2>
      <p>Empresas, agências, times de atendimento, operações de CRM, empresas que utilizam a WhatsApp Business Platform, operações que precisam integrar sistemas ao WhatsApp, desenvolvedores, integradores e operações de mensageria empresarial.</p>
      <h2>O que é WhatsApp Cloud API?</h2>
      <p>A WhatsApp Cloud API faz parte da WhatsApp Business Platform e permite que empresas conectem o WhatsApp a sistemas, plataformas de atendimento, automações e outras integrações. Para utilizar esse ecossistema profissional, diferentes componentes podem fazer parte da estrutura: empresa → Business Manager → WhatsApp Business / WABA → número → Cloud API → sistema, CRM ou automação. Essa representação é simplificada e a configuração pode variar.</p>
      <h2>BM e WABA são a mesma coisa?</h2>
      <p>Não. A Business Manager é a estrutura empresarial que organiza ativos e acessos. A WABA (WhatsApp Business Account) é a conta usada dentro da WhatsApp Business Platform. Número de WhatsApp, template e Cloud API também não são a BM.</p>
      <h2>Conteúdo técnico sobre WhatsApp Cloud API</h2>
      <p>Veja o <a href="${SITE_URL}/blog/pilar/whatsapp-api">guia sobre WhatsApp Cloud API</a>, a página de <a href="${SITE_URL}/business-manager">Business Manager</a> e as opções de <a href="${SITE_URL}/bm-verificada">BM verificada</a>.</p>`,
    faqs: [
      { q: "O que é uma BM para WhatsApp Cloud API?", a: "BM é a abreviação de Business Manager: a estrutura empresarial usada para organizar ativos e acessos dentro do ecossistema da Meta. Em operações que utilizam a WhatsApp Cloud API, essa estrutura é usada em conjunto com os demais componentes necessários para operar a WhatsApp Business Platform." },
      { q: "Quais BMs a AD•SCALE oferece?", a: "BM 250, BM 2K, BM 10K, BM 100K, BM Ilimitada e BM Balão. Características e disponibilidade devem ser confirmadas com a equipe antes da contratação." },
      { q: "Qual a diferença entre BM 250, 2K, 10K e 100K?", a: "São categorias comerciais que indicam diferentes níveis de capacidade e configuração. Não são etapas obrigatórias: são opções distintas, e a configuração atual de cada uma deve ser confirmada com a equipe." },
      { q: "O que é BM Ilimitada?", a: "É a denominação comercial de uma categoria de BM com configuração específica para operações de maior capacidade. O nome não representa promessa de envios ilimitados nem ausência de limitações das plataformas da Meta." },
      { q: "O que é BM Balão?", a: "É uma estrutura específica disponível na AD•SCALE. Consulte nossa equipe para verificar características, finalidade e disponibilidade atual." },
      { q: "A BM já vem com número de WhatsApp?", a: "Não presuma que exista um número incluído. A configuração de cada estrutura deve ser confirmada com nossa equipe antes da contratação." },
      { q: "A BM já vem com templates aprovados?", a: "Não prometemos templates aprovados como característica padrão das BMs. Consulte a configuração disponível." },
      { q: "BM e WABA são a mesma coisa?", a: "Não. A Business Manager é a estrutura empresarial que organiza ativos e acessos. A WABA é a conta usada dentro da WhatsApp Business Platform. São componentes diferentes." },
      { q: "A BM já vem conectada a um CRM?", a: "Não presuma que exista CRM, disparador ou software externo configurado. Esses elementos devem ser confirmados individualmente quando aplicável." },
      { q: "Como saber qual BM preciso?", a: "Depende do volume e da estrutura da sua operação. Nossa equipe pode ajudar a comparar as opções disponíveis." },
      { q: "Como consultar disponibilidade?", a: "Fale com a equipe da AD•SCALE pelo WhatsApp. Verificamos quais estruturas estão disponíveis no momento e as características de cada uma." },
      { q: "A AD•SCALE é parceira oficial da Meta?", a: "Não. A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta." },
    ],
  },
  {
    path: "/pixel-capi",
    title: "Pixel Facebook + CAPI | Conversions API Meta",
    description: "Pixel verificado e Conversions API (CAPI) configurada para Facebook Ads pós iOS 14+: atribuição estável, eventos prioritários e domínio verificado.",
    keywords: ["pixel facebook capi", "conversions api meta", "capi facebook ads", "pixel verificado"],
    bodyHtml: `
      <p>Implementação e configuração de Pixel do Meta com Conversions API (CAPI) para operações que já anunciam e precisam de rastreamento server-side estável depois do iOS 14+. Serviço executado pela equipe da AD•SCALE dentro da sua estrutura: Pixel, eventos, domínio verificado e deduplicação. As políticas e análises da Meta continuam se aplicando.</p>
      <h2>O que é entregue na implementação de Pixel + CAPI</h2>
      <ul>
        <li>Criação ou revisão do Pixel dentro da Business Manager correta.</li>
        <li>Configuração da Conversions API (server-side) e do envio duplicado de eventos com deduplicação por event_id.</li>
        <li>Definição e priorização dos 8 eventos de mensuração agregada de eventos.</li>
        <li>Verificação de domínio no Meta e vinculação ao Pixel.</li>
        <li>Checagem de qualidade de correspondência de eventos e parâmetros enviados.</li>
      </ul>
      <h2>Quando faz sentido contratar em vez de configurar sozinho</h2>
      <p>Se você tem equipe técnica e tempo, os guias do blog cobrem o passo a passo completo. O serviço existe para operações que precisam da configuração feita e validada por terceiros, normalmente em estruturas com várias BMs, domínios e contas de anúncios em contingência.</p>
      <h2>Pixel e CAPI dentro de uma estrutura de contingência</h2>
      <p>Em operações com múltiplas Business Managers, o Pixel precisa ser planejado junto da estrutura: qual BM é a proprietária, como compartilhar o ativo e o que acontece em caso de bloqueio. Veja as opções de ${link("/business-manager", "Business Manager")}, de ${link("/bm-verificada", "BM verificada")} e de ${link("/dominios-verificados", "domínios verificados")}.</p>
      <h2>Guias técnicos sobre Pixel e Conversions API</h2>
      <ul>
        <li>${link("/blog/pixel-vs-capi-conversions-api-meta-ads", "Pixel vs CAPI: diferença e por que usar os dois")}</li>
        <li>${link("/blog/instalar-pixel-meta-passo-a-passo", "Como instalar o Pixel do Meta passo a passo")}</li>
        <li>${link("/blog/configurar-capi-conversions-api-server-side", "Como configurar a Conversions API server-side")}</li>
        <li>${link("/blog/migrar-pixel-bm-sem-perder-aprendizado", "Migrar Pixel de BM sem perder aprendizado")}</li>
        <li>${link("/blog/dominio-verificado-facebook-como-configurar-ios14", "Verificação de domínio e iOS 14+")}</li>
        <li>${link("/blog/pilar/escala-e-performance", "Pilar: escala e performance no Meta Ads")}</li>
      </ul>
      <h2>Perguntas frequentes sobre Pixel e CAPI</h2>
      <h3>CAPI substitui o Pixel?</h3>
      <p>Não. A recomendação da Meta é usar os dois em paralelo, com deduplicação de eventos.</p>
      <h3>A implementação garante melhora de resultado?</h3>
      <p>Não. A configuração melhora a qualidade do sinal enviado; o resultado depende de oferta, criativo, verba e leilão.</p>
      <h3>Como consultar disponibilidade?</h3>
      <p>Fale com a equipe da AD•SCALE para verificar prazo, escopo e condições da implementação.</p>`,
  },
  {
    path: "/aquecimento-contas",
    title: "Aquecimento de Contas Facebook Ads | Warm-up",
    description: "Serviço de aquecimento (warm-up) profissional para contas Facebook Ads, BMs e perfis. Estratégia de cap, criativo e cadência para Trust Score alto.",
    keywords: ["aquecimento conta facebook", "warm up facebook ads", "esquentar bm", "esquentar conta ads"],
  },
  {
    path: "/recuperacao-bm",
    title: "Recuperação de BM Bloqueada | Meta Ads | AD Scale",
    description: "Recuperação e desbloqueio de BM bloqueada no Meta Ads: diagnóstico, plano de defesa, contestação documental e contingência imediata.",
    keywords: ["bm bloqueada recuperar", "desbloqueio bm", "recuperar conta facebook ads", "bm restrita"],
    bodyHtml: `
      <p>Serviço de diagnóstico e apoio na recuperação de Business Manager bloqueada, restrita ou com ativos desativados no Meta Ads. A AD•SCALE atua no diagnóstico da causa, na organização da documentação de contestação e na contingência imediata para a operação não ficar parada. Nenhuma empresa independente pode garantir a reversão de uma decisão da Meta.</p>
      <h2>O que o serviço de recuperação de BM inclui</h2>
      <ul>
        <li>Diagnóstico da restrição: qual ativo foi atingido (BM, conta de anúncios, página, perfil administrador) e qual política foi citada.</li>
        <li>Plano de contestação: quais documentos e evidências enviar e em qual ordem.</li>
        <li>Acompanhamento das tentativas de appeal e dos prazos de resposta.</li>
        <li>Contingência imediata: estrutura alternativa para a operação continuar durante a análise.</li>
        <li>Correções estruturais para reduzir a chance de reincidência.</li>
      </ul>
      <h2>Recuperação não é garantia de desbloqueio</h2>
      <p>A decisão final é sempre da Meta. O trabalho aumenta a qualidade da contestação e reduz o tempo de operação parada, mas casos de violação reiterada de políticas podem não ser revertidos.</p>
      <h2>Contingência enquanto a BM está em análise</h2>
      <p>Enquanto o appeal corre, a operação normalmente migra para uma estrutura paralela. Veja ${link("/business-manager", "Business Manager")}, ${link("/bm-verificada", "BM verificada")} e ${link("/aluguel-de-contas-meta-ads", "contas de anúncios por acesso gerenciado")}.</p>
      <h2>Guias sobre bloqueio e recuperação</h2>
      <ul>
        <li>${link("/blog/recuperar-conta-anuncio-bloqueada-facebook-ads", "Como recuperar conta de anúncios bloqueada no Facebook Ads")}</li>
        <li>${link("/blog/dia-do-bloqueio-runbook-emergencia-meta-ads", "Runbook de emergência para o dia do bloqueio")}</li>
        <li>${link("/blog/bloqueio-conta-anuncio-meta-como-evitar", "Como evitar bloqueio de conta de anúncios")}</li>
        <li>${link("/blog/recuperar-pagina-facebook-restrita-passo-a-passo", "Recuperar página do Facebook restrita")}</li>
        <li>${link("/blog/politicas-anuncios-meta-erros-comuns-reprovacao", "Políticas de anúncios: erros comuns de reprovação")}</li>
        <li>${link("/blog/pilar/seguranca-e-bloqueios", "Pilar: segurança e bloqueios no Meta Ads")}</li>
      </ul>
      <h2>Perguntas frequentes sobre recuperação de BM</h2>
      <h3>Quanto tempo demora?</h3>
      <p>Depende exclusivamente da fila de análise da Meta. Não existe prazo garantido.</p>
      <h3>Dá para recuperar qualquer BM?</h3>
      <p>Não. Casos com violação grave ou reincidente costumam não ser revertidos, e a recomendação passa a ser reconstruir a estrutura.</p>
      <h3>Como começar?</h3>
      <p>Fale com a equipe da AD•SCALE com o print do aviso de restrição e o histórico da conta para o diagnóstico inicial.</p>`,
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
    bodyHtml: `
      <p>Aluguel de contas de anúncios Meta Ads por acesso gerenciado, sem mensalidade fixa: a cobrança é uma comissão inicial de 5% sobre o valor efetivamente investido em anúncios, com crédito operacional de US$ 240 para iniciar a estrutura. A AD•SCALE fornece a infraestrutura publicitária; a criação e a gestão das campanhas permanecem com o seu time.</p>
      <h2>Como funciona o modelo de comissão</h2>
      <ul>
        <li>Sem mensalidade fixa pelo acesso à estrutura.</li>
        <li>Comissão inicial de 5% sobre o investimento realizado em anúncios.</li>
        <li>Crédito operacional de US$ 240 no início, usado para abater as primeiras comissões.</li>
        <li>Novos pagamentos só começam depois que o crédito é totalmente utilizado.</li>
        <li>Conforme volume, metas e histórico, a taxa pode ser reduzida e chegar a até 1%. A redução não é automática e precisa ser formalizada.</li>
      </ul>
      <h2>O que é acesso gerenciado</h2>
      <p>Você recebe acesso a contas de agência dentro de uma estrutura administrada pela AD•SCALE, em vez de comprar o ativo. Isso mantém a manutenção, o suporte e a substituição da estrutura sob nossa responsabilidade, enquanto a operação de campanhas continua sendo sua.</p>
      <h2>O que a estrutura pode incluir</h2>
      <ul>
        <li>Contas de agência Meta Ads e Business Manager de agência.</li>
        <li>Páginas antigas quando aplicável ao plano contratado.</li>
        <li>Onboarding, suporte e acompanhamento de investimento, comissão e saldo do crédito.</li>
        <li>Possibilidade de solicitar contas adicionais conforme análise e disponibilidade.</li>
      </ul>
      <h2>Para quem faz sentido alugar em vez de comprar</h2>
      <p>Faz sentido para agências e gestores que rodam verba recorrente, precisam de várias contas em paralelo e preferem custo variável atrelado ao investimento. Quem prefere ser proprietário do ativo deve consultar as opções de ${link("/business-manager", "Business Manager")}, ${link("/bm-verificada", "BM verificada")} e ${link("/bm-ilimitada", "BM ilimitada")}.</p>
      <h2>Limites e responsabilidades</h2>
      <p>Nenhuma estrutura garante aprovação de anúncios, ausência de revisão ou desempenho. Páginas antigas não garantem aprovação. A AD•SCALE é uma prestadora independente, sem vínculo, patrocínio ou endosso da Meta Platforms, Inc. Todas as condições de acesso, comissão, crédito, cancelamento e suporte são formalizadas em contrato.</p>
      <h2>Conteúdo relacionado</h2>
      <ul>
        <li>${link("/blog/quanto-cobrar-cliente-gestao-trafego-com-contingencia", "Quanto cobrar do cliente em gestão de tráfego com contingência")}</li>
        <li>${link("/blog/calcular-roi-investimento-contingencia-meta-ads", "Como calcular o ROI do investimento em contingência")}</li>
        <li>${link("/blog/arquitetura-contingencia-meta-ads-operacao-alto-volume", "Arquitetura de contingência para alto volume")}</li>
        <li>${link("/blog/pilar/business-manager", "Pilar: Business Manager no Meta")}</li>
      </ul>
      <h2>Perguntas frequentes sobre aluguel de contas Meta Ads</h2>
      <h3>Existe mensalidade?</h3>
      <p>Não. A cobrança é a comissão sobre o valor efetivamente investido em anúncios.</p>
      <h3>O que são os US$ 240 iniciais?</h3>
      <p>É um crédito operacional para iniciar a estrutura e abater as primeiras comissões. Não é uma taxa separada.</p>
      <h3>Todos recebem a taxa de 1%?</h3>
      <p>Não. A taxa reduzida depende de elegibilidade e é formalizada em proposta ou contrato.</p>
      <h3>A conta nunca será restringida?</h3>
      <p>Não existe essa garantia. Qualquer conta pode ser revisada, restringida ou desativada pela Meta.</p>`,
  },
  {
    path: "/perfil-facebook-antigo",
    title: "Perfil Facebook Antigo para Anúncios | AD Scale",
    description: "Perfis Facebook antigos com histórico para operações de Meta Ads. Entenda características, diferenças e consulte opções disponíveis na AD Scale.",
    keywords: [
      "perfil facebook antigo",
      "perfil antigo facebook",
      "comprar perfil facebook antigo",
      "perfil antigo para anúncios",
      "perfil antigo meta ads",
      "perfil com histórico",
      "perfil administrador",
      "perfil para business manager",
    ],
    h1: "Perfil Facebook Antigo para Meta Ads",
    breadcrumb: [
      { name: "Início", path: "/" },
      { name: "Perfis Facebook", path: "/perfis-facebook" },
      { name: "Perfil Facebook Antigo", path: "/perfil-facebook-antigo" },
    ],
    bodyHtml: `
      <p>Um perfil Facebook antigo é um perfil pessoal com histórico anterior de existência e utilização. Em operações de Meta Ads, ele costuma ser usado como perfil administrador dentro de uma estrutura empresarial: recebe permissões em uma <a href="${SITE_URL}/business-manager">Business Manager</a>, acessa páginas e contas de anúncios e participa da organização de acessos de agências, gestores de tráfego e media buyers. A AD Scale disponibiliza esses perfis mediante consulta de disponibilidade, junto de outras opções de <a href="${SITE_URL}/perfis-facebook">perfis Facebook para operações de Meta Ads</a>. Todos os ativos permanecem sujeitos às políticas, análises e sistemas da plataforma.</p>
      <h2>O que é um Perfil Facebook Antigo?</h2>
      <p>É um perfil com tempo de criação e atividade anteriores, que pode compor uma estrutura envolvendo Business Manager, página, conta de anúncios, permissões e usuários. O histórico de um perfil não elimina o risco de restrições e não substitui uma operação compatível com as políticas da Meta.</p>
      <h2>Perfil Facebook Antigo vs Perfil Novo</h2>
      <p>O perfil antigo possui histórico anterior; o novo possui histórico recente. Nenhum dos dois oferece garantia automática de estabilidade ou aprovação — a escolha depende da estrutura e das necessidades operacionais.</p>
      <h2>Perfil Antigo e Perfil Aged são a mesma coisa?</h2>
      <p>No mercado, o <a href="${SITE_URL}/perfil-aged">termo aged utilizado no mercado</a> normalmente descreve perfis com histórico anterior. No Brasil, "perfil antigo" é uma forma mais natural de se referir a esse tipo de perfil.</p>
      <h2>Perfil Facebook e Conta de Anúncios são a mesma coisa?</h2>
      <p>Não. O perfil representa o usuário com permissões; a Business Manager organiza ativos, permissões, páginas e contas; a conta de anúncios é onde campanhas e investimentos são gerenciados. Fluxo simplificado: Perfil → Business Manager → Página → Conta de anúncios → Campanhas. A estrutura pode variar conforme a operação.</p>
      <h2>Como o Perfil Facebook se relaciona com o Business Manager?</h2>
      <p>O perfil recebe permissões para acessar ativos empresariais. Veja as <a href="${SITE_URL}/bm-verificada">opções de BM verificada</a> e a <a href="${SITE_URL}/bm-ilimitada">estrutura de BM ilimitada</a> para entender onde cada ativo se encaixa.</p>
      <h2>Para quem os Perfis Facebook Antigos podem fazer sentido?</h2>
      <p>Gestores de tráfego, agências, media buyers, e-commerces, operações de geração de leads e estruturas de <a href="${SITE_URL}/contingencia">contingência</a> com múltiplos ativos. A adequação depende da estrutura e necessidade da operação.</p>
      <h2>Consulte Perfis Facebook Antigos Disponíveis</h2>
      <p>As características e a disponibilidade podem variar. Consulte as opções atuais para encontrar a estrutura adequada à sua operação.</p>`,
    faqs: [
      { q: "O que é um perfil Facebook antigo?", a: "É um perfil pessoal do Facebook com histórico anterior de existência e utilização." },
      { q: "Perfil antigo e perfil aged são a mesma coisa?", a: "São formas de se referir ao mesmo tipo de perfil: aged é o termo de mercado, antigo é a forma mais natural em português." },
      { q: "Perfil Facebook é a mesma coisa que conta de anúncios?", a: "Não. O perfil é o usuário com permissões; a conta de anúncios é o ativo onde campanhas e investimentos são gerenciados." },
      { q: "Para que serve um perfil em uma estrutura de Meta Ads?", a: "Para acessar e administrar ativos empresariais como Business Manager, páginas e contas de anúncios conforme as permissões concedidas." },
      { q: "Perfil antigo pode acessar uma Business Manager?", a: "Sim, desde que receba as permissões adequadas dentro da estrutura empresarial." },
      { q: "Perfil Facebook antigo é garantia contra bloqueios?", a: "Não. Nenhum perfil ou estrutura elimina totalmente o risco de restrições. Todos os ativos permanecem sujeitos às políticas e análises da plataforma." },
      { q: "Qual a diferença entre perfil antigo e perfil novo?", a: "O antigo possui histórico anterior e o novo histórico recente; a escolha depende da estrutura e das necessidades operacionais." },
      { q: "Como consultar os perfis disponíveis?", a: "Basta falar com a equipe da AD Scale para verificar as opções e características disponíveis no momento." },
      { q: "Posso utilizar um perfil antigo em uma estrutura de contingência?", a: "Sim, perfis podem compor estruturas de contingência junto de BMs, páginas e contas de anúncios." },
      { q: "A AD•SCALE gerencia as campanhas?", a: "Não. A AD Scale fornece infraestrutura e ativos. A criação e gestão das campanhas permanecem sob responsabilidade do cliente ou do profissional contratado." },
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
function injectMeta(template, { title, h1, description, canonical, ogImage, keywords, ogType = "website", publishedAt, jsonLd, bodyHtml }) {
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
      <h1>${(h1 || title).replace(/"/g, "&quot;")}</h1>
      <p>${safeDesc}</p>
      ${articleHtml}
      <footer style="padding:48px 16px;text-align:center;margin-top:48px;border-top:1px solid #e2e8f0">
        ${INSTAGRAM_LINK_HTML.trim()}
      </footer>
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


// ---------- Content gate ----------
// Toda rota indexável precisa sair do build com corpo real no HTML inicial.
// Se uma landing/pilar futura for criada sem conteúdo, o build FALHA aqui em vez
// de publicar uma página de ~50 palavras que o Google classifica como
// "Rastreada, mas não indexada no momento".
const MIN_WORDS = 250;
const MIN_H2 = 2;
const MIN_INTERNAL_LINKS = 3;
// Páginas utilitárias, legítimas com pouco conteúdo (não são alvo de busca).
const CONTENT_GATE_EXEMPT = new Set(["/politica-de-privacidade", "/termos-de-uso"]);
const contentStats = [];

function auditPrerenderedHtml(routePath, html) {
  const block = html.split('<div id="prerendered-seo"')[1]?.split('<div id="root">')[0] ?? "";
  const words = block.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
  const h2 = (block.match(/<h2[\s>]/g) || []).length;
  const links = new Set([...block.matchAll(new RegExp(`href="${SITE_URL}([^"#]*)`, "g"))].map((m) => m[1] || "/")).size;
  contentStats.push({ routePath, words, h2, links });
}

function assertContentGate() {
  const failures = contentStats.filter(
    (s) => !CONTENT_GATE_EXEMPT.has(s.routePath) && (s.words < MIN_WORDS || s.h2 < MIN_H2 || s.links < MIN_INTERNAL_LINKS),
  );
  if (failures.length) {
    console.error(`\n[prerender] ${failures.length} rota(s) sem conteúdo indexável suficiente no HTML inicial:`);
    for (const f of failures) {
      console.error(`  ✗ ${f.routePath} — ${f.words} palavras (mín. ${MIN_WORDS}), ${f.h2} H2 (mín. ${MIN_H2}), ${f.links} links internos (mín. ${MIN_INTERNAL_LINKS})`);
    }
    console.error("\n  → Adicione bodyHtml/faqs à rota em scripts/prerender.mjs (ou conteúdo à fonte de dados dela) antes de publicar.\n");
    process.exit(1);
  }
  const worst = [...contentStats].sort((a, b) => a.words - b.words).slice(0, 3);
  console.log(`[prerender] Content gate OK em ${contentStats.length} rotas. Menores: ${worst.map((w) => `${w.routePath} (${w.words}p/${w.h2}h2/${w.links}links)`).join(", ")}`);
}

function writeRoute(routePath, html) {
  auditPrerenderedHtml(routePath, html);
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

// Corpo automático: índice do blog e pilares nunca dependem de bodyHtml manual.
for (const page of staticPages) {
  const slugOfPage = page.path.replace(/^\//, "");
  if (page.bodyHtml) {
    // Corpo curado à mão: complementa com FAQ e links da fonte de dados quando faltarem.
    if (landings[slugOfPage] && !page.bodyHtml.includes("Perguntas frequentes")) {
      page.bodyHtml += `\n${landingExtrasHtml(slugOfPage)}`;
    }
    continue;
  }
  if (page.path === "/blog") page.bodyHtml = blogIndexBodyHtml();
  if (MANUAL_BODIES[page.path]) page.bodyHtml = MANUAL_BODIES[page.path];
  else if (landings[slugOfPage]) page.bodyHtml = landingBodyHtml(slugOfPage);
  const pm = page.path.match(/^\/blog\/pilar\/(.+)$/);
  if (pm) {
    const pillar = pillars.find((x) => x.slug === pm[1]);
    if (pillar) page.bodyHtml = pillarBodyHtml(pillar);
  }
}

for (const page of staticPages) {
  // Trailing slash matches what GitHub Pages serves for directory routes,
  // avoiding 301 redirects that cause "Página com redirecionamento" in GSC.
  // No trailing slash — served directly from dist/<route>.html with 200.
  const canonical = `${SITE_URL}${page.path}`;
  const crumbItems = page.breadcrumb ?? [
    { name: "Início", path: "/" },
    { name: page.title.split("|")[0].trim(), path: page.path },
  ];
  const breadcrumbs = breadcrumbLd(crumbItems);
  const graph = [webPageLd({ canonical, title: page.title, description: page.description }), breadcrumbs];
  if (page.faqs?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };
  const crumbNav = `<nav aria-label="Breadcrumb"><ol>${crumbItems
    .map((c) => `<li><a href="${SITE_URL}${c.path}">${c.name}</a></li>`)
    .join("")}</ol></nav>`;
  const faqHtml = page.faqs?.length
    ? `<h2>Perguntas frequentes</h2>${page.faqs.map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`).join("")}`
    : "";
  const html = injectMeta(TEMPLATE, {
    title: page.title,
    h1: page.h1,
    description: page.description,
    canonical,
    keywords: page.keywords,
    jsonLd,
    bodyHtml: page.bodyHtml ? `${crumbNav}${page.bodyHtml}${faqHtml}` : faqHtml || undefined,
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
    bodyHtml: `${mdToHtml(post.content)}\n${postClusterNavHtml(post)}`,
  });
  writeRoute(`/blog/${post.slug}`, html);
  count++;
}

// Refresh 404.html so SPA fallback uses the latest template (no per-route meta).
// Done BEFORE the homepage is prerendered so the fallback stays generic.
copyFileSync(resolve(DIST, "index.html"), resolve(DIST, "404.html"));

// ---------- Homepage ----------
{
  const canonical = `${SITE_URL}/`;
  const title = "Contingência Meta Ads para Alto Volume | AD Scale";
  const description =
    "Perfis Facebook, Business Managers, Páginas, Contas de Anúncios e estruturas para operações profissionais de Meta Ads. Consulte disponibilidade com nossa equipe.";
  const faqs = [
    { q: "O que a AD•SCALE oferece?", a: "Infraestrutura e contingência para operações de Meta Ads: Perfis Facebook, Business Managers, Páginas, Contas de Anúncios por acesso gerenciado, combos e estruturas, além de BMs voltadas para integrações oficiais do WhatsApp." },
    { q: "Qual a diferença entre Perfil Facebook e Business Manager?", a: "O perfil é o usuário que administra ativos e recebe permissões. A Business Manager é o ambiente empresarial que organiza páginas, contas de anúncios, permissões e outros ativos." },
    { q: "Perfil e Conta de Anúncios são a mesma coisa?", a: "Não. O perfil é o usuário administrador. A conta de anúncios é o ativo dentro da Business Manager onde campanhas e investimento são gerenciados." },
    { q: "O que são Combos e Estruturas?", a: "São combinações de ativos — como perfil, BM e página — montadas para operações que precisam de uma estrutura mais completa." },
    { q: "Como funcionam as Contas de Anúncios Gerenciadas?", a: "Funcionam por acesso gerenciado: a estrutura é disponibilizada para operações que já possuem equipe responsável pelas campanhas. A AD•SCALE não gerencia campanhas." },
    { q: "O que significa BM para API Oficial?", a: "São Business Managers voltadas para operações que utilizam integrações oficiais do WhatsApp, como a Cloud API, conforme características e disponibilidade da estrutura." },
    { q: "A AD•SCALE possui vínculo oficial com a Meta?", a: "A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta." },
  ];
  const graph = [
    webPageLd({ canonical, title, description }),
    breadcrumbLd([{ name: "Início", path: "/" }]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  const bodyHtml = `
    <h2>Infraestrutura para sua operação de Meta Ads</h2>
    <p>A AD•SCALE fornece Perfis Facebook, Business Managers, Páginas, Contas de Anúncios e estruturas para operações profissionais de Meta Ads.</p>
    <ul>
      <li><a href="${SITE_URL}/perfis-facebook">Perfis Facebook</a> — usuários que administram ativos e compõem estruturas.</li>
      <li><a href="${SITE_URL}/business-manager">Business Managers</a> — ambiente que organiza páginas, contas de anúncios e permissões.</li>
      <li><a href="${SITE_URL}/paginas-facebook">Páginas Facebook</a> — ativo público vinculado às campanhas.</li>
      <li><a href="${SITE_URL}/aluguel-de-contas-meta-ads">Contas de Anúncios gerenciadas</a> — acesso gerenciado para times que operam as próprias campanhas.</li>
      <li><a href="${SITE_URL}/whatsapp-cloud-api">BM para API Oficial</a> — estruturas voltadas a integrações oficiais do WhatsApp.</li>
      <li><a href="${SITE_URL}/perfil-facebook-antigo">Perfil Facebook antigo</a> e <a href="${SITE_URL}/perfil-aged">perfil aged</a> — perfis com histórico anterior na plataforma.</li>
    </ul>
    <h2>Como uma estrutura de Meta Ads é organizada</h2>
    <p>Perfil, Business Manager, Página e Conta de Anúncios são ativos distintos com funções distintas. Combos e estruturas reúnem esses elementos quando a operação precisa de um conjunto mais completo.</p>
    <h2>Como funciona</h2>
    <p>Você explica sua operação, entendemos qual tipo de estrutura faz sentido, consultamos disponibilidade, apresentamos as opções e entregamos com orientação inicial. A operação das campanhas permanece com o seu time.</p>
    <p>A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta.</p>
  `;
  const faqHtml = `<h2>Perguntas frequentes</h2>${faqs.map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`).join("")}`;
  const homeHtml = injectMeta(TEMPLATE, {
    title,
    h1: "Contingência Meta Ads para Operações de Alto Volume",
    description,
    canonical,
    jsonLd: { "@context": "https://schema.org", "@graph": graph },
    bodyHtml: `${bodyHtml}${faqHtml}`,
  });
  writeFileSync(resolve(DIST, "index.html"), homeHtml);
  count++;
}

auditPrerenderedHtml("/", readFileSync(resolve(DIST, "index.html"), "utf8"));
assertContentGate();
console.log(`[prerender] Generated ${count} prerendered routes + 404 fallback`);

