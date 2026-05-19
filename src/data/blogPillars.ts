import { blogPosts, type BlogPost } from "./blogPosts";

export type Pillar = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  keywords: string[];
  /** Slug of the related commercial landing page (without leading slash). */
  relatedLandingSlug?: string;
  relatedLandingLabel?: string;
  /** Post slugs that belong to this pillar (ordered by relevance). */
  postSlugs: string[];
};

export const pillars: Pillar[] = [
  {
    slug: "business-manager",
    title: "Business Manager: tudo sobre BM no Meta",
    shortTitle: "Business Manager",
    description: "BM verificada, BM ilimitada, preço, auditoria e fornecedores.",
    longDescription:
      "Tudo o que você precisa saber sobre Business Manager no Meta Ads: como funciona a verificação, diferença entre BM nova, antiga, verificada e ilimitada, preços, riscos de fornecedor e checklist de auditoria. Conteúdo para quem opera ou pretende escalar com Facebook Ads em alto volume.",
    keywords: [
      "business manager",
      "bm verificada",
      "bm ilimitada",
      "comprar bm",
      "bm facebook ads",
      "auditoria bm",
    ],
    relatedLandingSlug: "business-manager",
    relatedLandingLabel: "Ver BMs disponíveis",
    postSlugs: [
      "o-que-e-business-manager-verificada-meta",
      "tipos-de-bm-meta-nova-antiga-verificada-ilimitada",
      "como-escolher-fornecedor-bm-verificada",
      "quanto-custa-bm-verificada-facebook-2026",
      "checklist-auditoria-bm-facebook-18-itens",
      "estrutura-bm-conta-pixel-pagina-relacao",
      "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    ],
  },
  {
    slug: "perfis-e-paginas",
    title: "Perfis e páginas: ativos que sustentam a BM",
    shortTitle: "Perfis & Páginas",
    description: "Perfis aged, fan pages antigas e fingerprint para Meta Ads.",
    longDescription:
      "Perfis pessoais farmados, perfis aged e fan pages antigas são a base de qualquer BM saudável. Aqui você entende por que o administrador importa, como uma página antiga muda a performance e como configurar fingerprint e IP residencial para proteger esses ativos.",
    keywords: [
      "perfil aged",
      "perfil farmado",
      "fan page antiga",
      "página facebook ads",
      "fingerprint meta",
      "ip residencial",
    ],
    relatedLandingSlug: "perfis-facebook",
    relatedLandingLabel: "Ver perfis e páginas",
    postSlugs: [
      "perfil-aged-facebook-por-que-administrador-importa",
      "pagina-antiga-facebook-impacto-na-performance",
      "fingerprint-ip-residencial-meta-ads",
    ],
  },
  {
    slug: "seguranca-e-bloqueios",
    title: "Segurança e bloqueios: como proteger a operação",
    shortTitle: "Segurança & Bloqueios",
    description: "Bloqueios, recuperação, appeal e proteção de contas novas.",
    longDescription:
      "Bloqueio de conta no Meta Ads é questão de quando, não de se. Este pilar reúne os guias para diagnosticar a causa, recuperar BMs e contas bloqueadas, montar plano de appeal e blindar contas novas antes do primeiro real gasto.",
    keywords: [
      "bloqueio conta facebook",
      "bm bloqueada",
      "recuperar conta ads",
      "appeal facebook ads",
      "conta nova facebook",
    ],
    relatedLandingSlug: "recuperacao-bm",
    relatedLandingLabel: "Falar sobre recuperação",
    postSlugs: [
      "bloqueio-conta-anuncio-meta-como-evitar",
      "recuperar-conta-anuncio-bloqueada-facebook-ads",
      "bloqueio-conta-nova-facebook-ads-7-motivos",
      "qualidade-conta-anuncio-meta-como-medir",
      "autenticacao-2-fatores-conta-facebook-ads",
      "politicas-anuncios-meta-erros-comuns-reprovacao",
      "nichos-sensiveis-meta-ads-quais-sao",
    ],
  },
  {
    slug: "escala-e-performance",
    title: "Escala e performance: warm-up, Trust Score e CAPI",
    shortTitle: "Escala & Performance",
    description: "Warm-up, Trust Score, limite de gasto, Pixel + CAPI e ROI.",
    longDescription:
      "Como subir uma BM do zero, elevar o Trust Score, aumentar o spending limit, configurar Pixel + Conversions API e calcular o ROI real do investimento em contingência. Tudo o que separa uma operação que escala de uma operação que estagna.",
    keywords: [
      "warm up meta ads",
      "trust score",
      "limite de gasto facebook",
      "pixel capi",
      "conversions api",
      "roi contingência",
    ],
    relatedLandingSlug: "aquecimento-contas",
    relatedLandingLabel: "Ver serviço de aquecimento",
    postSlugs: [
      "warm-up-conta-anuncio-meta-passo-a-passo",
      "trust-score-meta-ads-como-funciona",
      "trust-score-facebook-ads-como-meta-avalia-conta",
      "limite-de-gasto-facebook-ads-como-aumentar",
      "pixel-vs-capi-conversions-api-meta-ads",
      "instalar-pixel-meta-passo-a-passo",
      "dominio-verificado-facebook-como-configurar-ios14",
      "como-funciona-leilao-meta-ads",
      "metricas-essenciais-meta-ads-iniciantes",
      "calcular-roi-investimento-contingencia-meta-ads",
    ],
  },
  {
    slug: "whatsapp-api",
    title: "WhatsApp Cloud API: BM verificada e disparo oficial",
    shortTitle: "WhatsApp API",
    description: "WABA verificada, tiers, templates e disparo via Cloud API.",
    longDescription:
      "Como funciona o WhatsApp Cloud API conectado a uma BM verificada: WABA, número high quality, tiers 1k/10k/100k, templates aprovados e o passo a passo para subir disparo oficial sem cair em ban.",
    keywords: [
      "whatsapp cloud api",
      "waba verificada",
      "disparo whatsapp api",
      "tier whatsapp",
      "bm whatsapp api",
    ],
    relatedLandingSlug: "whatsapp-cloud-api",
    relatedLandingLabel: "Ver BM para WhatsApp API",
    postSlugs: ["disparo-via-api-whatsapp-cloud-bm-verificada-guia-completo"],
  },
  {
    slug: "fundamentos-e-estrategia",
    title: "Fundamentos e estratégia para gestores de tráfego",
    shortTitle: "Fundamentos & Estratégia",
    description: "Glossário, consultoria vs curso e decisões estratégicas.",
    longDescription:
      "Os termos, decisões e leituras de mercado que todo gestor de tráfego sério precisa dominar antes de investir em contingência. Glossário do Meta Ads, comparativos de formação e referências de estratégia.",
    keywords: [
      "glossário meta ads",
      "consultoria meta ads",
      "curso facebook ads",
      "gestor de tráfego",
    ],
    postSlugs: [
      "glossario-meta-ads-termos-essenciais-gestor-trafego",
      "consultoria-meta-ads-vs-curso-quando-contratar",
    ],
  },
];

/** Map: post slug → pillar (first matching). */
const slugToPillar = new Map<string, Pillar>();
for (const pillar of pillars) {
  for (const slug of pillar.postSlugs) {
    if (!slugToPillar.has(slug)) slugToPillar.set(slug, pillar);
  }
}

export const getPillarForPost = (postSlug: string): Pillar | undefined =>
  slugToPillar.get(postSlug);

export const getPillarBySlug = (slug: string): Pillar | undefined =>
  pillars.find((p) => p.slug === slug);

export const getPostsForPillar = (pillarSlug: string): BlogPost[] => {
  const pillar = getPillarBySlug(pillarSlug);
  if (!pillar) return [];
  return pillar.postSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p));
};

/** Posts that don't belong to any pillar yet — fallback bucket. */
export const orphanPosts = (): BlogPost[] => {
  const claimed = new Set<string>();
  pillars.forEach((p) => p.postSlugs.forEach((s) => claimed.add(s)));
  return blogPosts.filter((p) => !claimed.has(p.slug));
};
