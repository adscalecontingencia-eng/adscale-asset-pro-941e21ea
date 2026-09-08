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
  /** Optional curated internal links (hub de conteúdo). */
  resourceLinks?: {
    heading: string;
    links: { href: string; label: string; description?: string }[];
  };
};

export const pillars: Pillar[] = [
  {
    slug: "business-manager",
    title: "Business Manager Meta: Guia Completo para Anunciantes e Agências",
    shortTitle: "Business Manager",
    description: "Entenda como funciona o Business Manager da Meta, como organizar ativos, permissões, contas de anúncio e estrutura de tráfego.",
    longDescription:
      "Guia completo de Business Manager Meta para anunciantes e agências: como funciona a verificação, diferença entre BM nova, antiga, verificada e ilimitada, organização de ativos, permissões, contas de anúncio, preços, riscos de fornecedor e checklist de auditoria. Conteúdo para quem opera ou pretende escalar com Facebook Ads em alto volume.",
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
      "comparativo-bm-verificada-vs-ilimitada-qual-escolher",
      "bm-ilimitada-vale-a-pena-100k-dia",
      "como-escolher-fornecedor-bm-verificada",
      "melhor-fornecedor-bm-verificada-brasil-2026",
      "onde-comprar-bm-verificada-com-seguranca-2026",
      "checklist-10-perguntas-antes-comprar-bm-fornecedor",
      "bm-pronta-vs-bm-do-zero-quanto-tempo-economiza",
      "quanto-custa-bm-verificada-facebook-2026",
      "checklist-auditoria-bm-facebook-18-itens",
      "estrutura-bm-conta-pixel-pagina-relacao",
      "arquitetura-contingencia-meta-ads-operacao-alto-volume",
      "estrategia-3-camadas-bm-meta-ads-contingencia",
      "permissoes-equipe-bm-papeis-acesso-correto",
      "auditoria-30-minutos-conta-anuncio-meta",
    ],
    resourceLinks: {
      heading: "Estruturas e guias de Business Manager",
      links: [
        { href: "/business-manager", label: "Business Manager", description: "Estruturas de BM disponíveis e como cada configuração é usada." },
        { href: "/bm-verificada", label: "BM Verificada", description: "O que muda quando a verificação de negócio está concluída." },
        { href: "/bm-ilimitada", label: "BM para maior volume", description: "Configurações voltadas a operações com investimento mais alto." },
        { href: "/blog/permissoes-equipe-bm-papeis-acesso-correto", label: "Permissões dentro da BM", description: "Papéis de acesso e organização da equipe." },
        { href: "/blog/estrutura-bm-conta-pixel-pagina-relacao", label: "BM, conta, pixel e página", description: "Como os ativos se conectam dentro da estrutura." },
        { href: "/blog/pilar/seguranca-e-bloqueios", label: "Segurança e bloqueios", description: "Pilar complementar sobre restrições e recuperação." },
      ],
    },
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
      "preco-perfil-aged-facebook-vale-investimento",
      "pagina-antiga-facebook-impacto-na-performance",
      "fingerprint-ip-residencial-meta-ads",
      "ip-residencial-vs-datacenter-meta-ads",
      "perfil-facebook-vs-conta-de-anuncios",
      "perfil-facebook-antigo-vs-novo",
      "perfil-aged-vs-perfil-antigo-facebook",
      "estrutura-meta-ads-perfil-bm-conta-anuncios",
      "saude-perfil-administrador-bm-rotina-semanal",
    ],
    resourceLinks: {
      heading: "Guias sobre Perfis Facebook",
      links: [
        { href: "/perfil-facebook-antigo", label: "Perfil Facebook Antigo", description: "O que é, quando faz sentido e onde entra na estrutura." },
        { href: "/perfil-aged", label: "Perfil Aged Facebook", description: "O termo técnico usado no mercado e suas características." },
        { href: "/perfis-facebook", label: "Perfil Facebook e Business Manager", description: "Como o perfil se conecta à BM e às contas de anúncio." },
        { href: "/blog/perfil-facebook-vs-conta-de-anuncios", label: "Perfil Facebook vs Conta de Anúncios", description: "Ativos diferentes, funções diferentes." },
        { href: "/blog/estrutura-meta-ads-perfil-bm-conta-anuncios", label: "Segurança e organização de permissões", description: "Arquitetura completa do perfil até a campanha." },
      ],
    },
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
    resourceLinks: {
      heading: "Segurança operacional e ativos relacionados",
      links: [
        { href: "/recuperacao-bm", label: "Recuperação de BM", description: "Quando a estrutura é restringida e precisa ser tratada." },
        { href: "/blog/autenticacao-2-fatores-conta-facebook-ads", label: "Autenticação em dois fatores", description: "Camada básica de proteção do perfil administrador." },
        { href: "/blog/politicas-anuncios-meta-erros-comuns-reprovacao", label: "Políticas de anúncio", description: "Erros comuns que levam à reprovação de criativos." },
        { href: "/blog/recuperar-pagina-facebook-restrita-passo-a-passo", label: "Página restrita", description: "Passo a passo para tratar uma página com restrição." },
        { href: "/blog/pilar/business-manager", label: "Pilar Business Manager", description: "Permissões e organização de contas dentro da BM." },
        { href: "/contingencia", label: "Ativos de contingência", description: "Estruturas alternativas para reduzir dependência de um único ativo." },
      ],
    },
    relatedLandingSlug: "recuperacao-bm",
    relatedLandingLabel: "Falar sobre recuperação",
    postSlugs: [
      "bloqueio-conta-anuncio-meta-como-evitar",
      "recuperar-conta-anuncio-bloqueada-facebook-ads",
      "case-infoproduto-recuperou-conta-bloqueada-48h",
      "bloqueio-conta-nova-facebook-ads-7-motivos",
      "qualidade-conta-anuncio-meta-como-medir",
      "autenticacao-2-fatores-conta-facebook-ads",
      "politicas-anuncios-meta-erros-comuns-reprovacao",
      "nichos-sensiveis-meta-ads-quais-sao",
      "case-nicho-sensivel-emagrecimento-90-dias-sem-ban",
      "recuperar-pagina-facebook-restrita-passo-a-passo",
      "dia-do-bloqueio-runbook-emergencia-meta-ads",
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
    resourceLinks: {
      heading: "Escala, mensuração e operação de volume",
      links: [
        { href: "/guia-facebook-ads-alto-volume", label: "Guia de operação de alto volume", description: "Visão prática de como uma operação de maior investimento se organiza — complementa este pilar, que é o material educacional por tema." },
        { href: "/pixel-capi", label: "Pixel e CAPI", description: "Camada de mensuração de eventos da operação." },
        { href: "/aquecimento-contas", label: "Aquecimento de contas", description: "Warm-up de BMs, perfis e contas antes do volume." },
        { href: "/blog/limite-de-gasto-facebook-ads-como-aumentar", label: "Limite de gasto", description: "Como os degraus de limite evoluem." },
        { href: "/blog/metricas-essenciais-meta-ads-iniciantes", label: "Métricas essenciais", description: "Leitura básica de performance no Meta Ads." },
      ],
    },
    relatedLandingSlug: "aquecimento-contas",
    relatedLandingLabel: "Ver serviço de aquecimento",
    postSlugs: [
      "warm-up-conta-anuncio-meta-passo-a-passo",
      "aquecimento-proprio-vs-servico-warm-up-meta-ads",
      "trust-score-meta-ads-como-funciona",
      "trust-score-facebook-ads-como-meta-avalia-conta",
      "limite-de-gasto-facebook-ads-como-aumentar",
      "pixel-vs-capi-conversions-api-meta-ads",
      "instalar-pixel-meta-passo-a-passo",
      "dominio-verificado-facebook-como-configurar-ios14",
      "como-funciona-leilao-meta-ads",
      "metricas-essenciais-meta-ads-iniciantes",
      "calcular-roi-investimento-contingencia-meta-ads",
      "configurar-capi-conversions-api-server-side",
      "diagnostico-performance-queda-meta-ads-checklist",
      "migrar-pixel-bm-sem-perder-aprendizado",
      "estrutura-campanha-cbo-abo-quando-usar",
      "spending-limit-meta-como-subir-degraus",
      "case-ecommerce-suplementos-escalou-1mi-mes-bm-verificada",
      "case-agencia-trafego-zerou-bloqueios-3-camadas-bm",
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
    resourceLinks: {
      heading: "Estrutura necessária para a Cloud API",
      links: [
        { href: "/whatsapp-cloud-api", label: "BM para WhatsApp Cloud API", description: "Configurações de BM utilizadas em integrações oficiais do WhatsApp." },
        { href: "/bm-verificada", label: "BM Verificada", description: "A verificação de negócio é pré-requisito de parte dos recursos." },
        { href: "/business-manager", label: "Business Manager", description: "Ambiente que organiza os ativos ligados à WABA." },
        { href: "/blog/pilar/business-manager", label: "Pilar Business Manager", description: "Conceitos de BM que sustentam a integração." },
      ],
    },
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
      "gerenciador-anuncios-meta-tour-completo-iniciantes",
      "cnpj-mei-meta-ads-vale-pena",
      "catalogo-meta-commerce-como-criar",
      
      "consultoria-meta-ads-vs-curso-quando-contratar",
      "quanto-cobrar-cliente-gestao-trafego-com-contingencia",
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
