import type { ReactNode } from "react";
import {
  BadgeCheck,
  Building2,
  UserCircle2,
  FileText,
  Globe,
  MessageSquare,
  Activity,
  CreditCard,
  RotateCcw,
  Flame,
  Layers,
  type LucideIcon,
} from "lucide-react";
import type { AssetItem } from "@/components/AssetsSection";
import type { FAQItem } from "@/components/FAQSection";

export interface ProductLandingData {
  slug: string;
  seo: {
    title: string; // ≤60 chars
    description: string; // ≤155 chars
    keywords: string[];
    canonical: string;
  };
  hero: {
    eyebrow: string;
    badgeText: string;
    headline?: ReactNode;
    headlineMobile?: ReactNode;
    subheadline?: string;
    subheadlineMobile?: string;
    trustItems?: { value: string; label: string }[];
  };
  assets: {
    badge: string;
    heading: ReactNode;
    intro: string;
    items: AssetItem[];
    footerLine: string;
  };
  faq: {
    heading: ReactNode;
    items: FAQItem[];
  };
  cta: {
    heading: ReactNode;
    description: string;
    ctaLabel: string;
  };
  /** slugs de blogPosts para a seção "Conteúdo estratégico" */
  featuredGuideSlugs: string[];
}

const trustDefault = [
  { value: "Alto", label: "Trust Score" },
  { value: "Idade real", label: "BMs & Perfis" },
  { value: "Verified", label: "Curadoria 1 a 1" },
];

// ---------- Helpers ----------
const mk = (
  icon: LucideIcon,
  tag: string,
  title: string,
  description: string,
  bullets: string[],
): AssetItem => ({ icon, tag, title, description, bullets });

// ============================================================
// 1. Business Manager
// ============================================================
const businessManager: ProductLandingData = {
  slug: "business-manager",
  seo: {
    title: "Business Manager Facebook Ads | AD Scale",
    description:
      "Compre Business Manager (BM) para Meta e Facebook Ads: BMs novas, antigas, verificadas e ilimitadas com Trust Score alto e curadoria 1 a 1.",
    keywords: [
      "business manager facebook",
      "comprar business manager",
      "bm facebook ads",
      "bm nova",
      "bm aged",
      "bm ilimitada",
      "business manager meta",
    ],
    canonical: "/business-manager",
  },
  hero: {
    eyebrow: "BUSINESS MANAGER PARA QUEM ESCALA NO META",
    badgeText: "BM nova, antiga, verificada e ilimitada",
    headline: (
      <>
        A <span className="text-gradient">Business Manager</span> certa pra escalar Meta Ads sem trava de leilão.
      </>
    ),
    headlineMobile: (
      <>
        <span className="text-gradient">Business Manager</span> pra escalar Meta Ads sem trava.
      </>
    ),
    subheadline:
      "BMs novas, aged, verificadas e ilimitadas — todas validadas no fingerprint do Meta antes de chegar em você. Curadoria 1 a 1 para operações que rodam volume de verdade.",
    subheadlineMobile:
      "BMs novas, aged, verificadas e ilimitadas, validadas no Meta. Para operações de volume.",
    trustItems: trustDefault,
  },
  assets: {
    badge: "🛡️ TIPOS DE BM DISPONÍVEIS",
    heading: (
      <>
        Cada BM com um propósito. <span className="text-gradient">Combinadas, sustentam o seu volume.</span>
      </>
    ),
    intro:
      "Trabalhamos quatro categorias de Business Manager. Você não precisa escolher uma — em estrutura de contingência, elas se complementam.",
    items: [
      mk(BadgeCheck, "VERIFIED", "BM Verificada", "Selo oficial do Meta, cap de gasto alto desde D0 e prioridade no leilão. A base para escalar com previsibilidade.", [
        "Verificação documental ativa",
        "Cap alto desde o primeiro real",
        "Resistência a review automática",
      ]),
      mk(Building2, "AGED", "BM Antiga", "Anos de histórico de gastos limpo. Resiste a auditoria e brilha em nichos sensíveis onde BM nova não dura.", [
        "Idade comprovável no Meta",
        "Histórico de gastos consistente",
        "Estável em vertical pesada",
      ]),
      mk(Layers, "UNLIMITED", "BM Ilimitada", "BM sem limite de gasto pré-definido — para escalar acima de 250/1k/10k USD/dia sem ficar travado em cap.", [
        "Sem trava de cap diário",
        "Ideal para operações 6+ dígitos/mês",
        "Combinada com perfil aged",
      ]),
      mk(Globe, "FRESH", "BM Nova validada", "BMs recém-criadas, validadas no fingerprint, prontas para warm-up estruturado em operações que precisam de ativos descartáveis.", [
        "Fingerprint limpo",
        "Pronta para warm-up",
        "Camada de contingência",
      ]),
    ],
    footerLine: "BM certa, vinculação certa, warm-up certo. Cotação sob consulta.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">Business Manager</span>
      </>
    ),
    items: [
      {
        question: "Qual a diferença entre BM nova, antiga, verificada e ilimitada?",
        answer:
          "BM nova é recém-criada e precisa de warm-up. BM antiga tem histórico de gastos e idade — resiste a auditoria. BM verificada passou pela validação documental do Meta — cap alto e prioridade. BM ilimitada não tem cap de gasto travado. Em estrutura madura, todas convivem.",
      },
      {
        question: "Como vocês comprovam que a BM é real e tem o Trust Score que dizem?",
        answer:
          "Walkthrough ao vivo no Meta antes da entrega: timestamp interno, histórico de gastos exportável e fingerprint validado. Nada de print editado.",
      },
      {
        question: "BM ilimitada existe mesmo? Não é só marketing?",
        answer:
          "Existe. São BMs sem cap de gasto pré-definido pela Meta, normalmente vinculadas a perfis verificados e com histórico financeiro robusto. Não é truque, é estrutura — e a Meta pode revisar se o ativo for mal usado.",
      },
      {
        question: "Posso vincular minha conta de anúncio existente em uma BM nova?",
        answer:
          "Pode, mas existe técnica certa. Vinculação errada queima ativo de R$ 20k em horas. No handover a gente faz isso junto com você.",
      },
      {
        question: "Vocês entregam BM exclusiva ou compartilhada?",
        answer:
          "Sempre exclusiva. Compartilhada dispara fingerprint cruzado e queima as duas pontas.",
      },
      {
        question: "Qual o tempo médio de entrega de uma BM?",
        answer:
          "BM nova validada e BM verificada: até 24h após o briefing. BM antiga e BM ilimitada: 48 a 72h, porque a curadoria é mais rigorosa.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Sua próxima Business Manager <span className="text-gradient italic">não pode ser sorteada.</span>
      </>
    ),
    description:
      "Briefing 1 a 1 para entender seu volume, vertical e histórico — e indicar a combinação certa de BM antes de qualquer entrega.",
    ctaLabel: "QUERO MINHA BM",
  },
  featuredGuideSlugs: [
    "o-que-e-business-manager-verificada-meta",
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    "preco-bm-verificada-2026-quanto-custa",
  ],
};

// ============================================================
// 2. BM Ilimitada
// ============================================================
const bmIlimitada: ProductLandingData = {
  slug: "bm-ilimitada",
  seo: {
    title: "BM Ilimitada Facebook Ads | Sem Cap de Gasto",
    description:
      "BM Ilimitada para Meta Ads: Business Manager sem limite de gasto, com Trust Score alto, ideal para escalar acima de 1k/10k USD por dia.",
    keywords: [
      "bm ilimitada",
      "bm sem limite",
      "bm desbloqueada",
      "bm com limite alto",
      "bm 250 dólares",
      "business manager ilimitada",
    ],
    canonical: "/bm-ilimitada",
  },
  hero: {
    eyebrow: "ESCALE SEM TRAVAR NO CAP DE GASTO",
    badgeText: "BM Ilimitada · Cap alto · Verificadas",
    headline: (
      <>
        <span className="text-gradient">BM Ilimitada</span> para escalar Meta Ads sem barreira de gasto.
      </>
    ),
    headlineMobile: (
      <>
        <span className="text-gradient">BM Ilimitada</span> sem barreira de gasto.
      </>
    ),
    subheadline:
      "Business Manager sem cap pré-definido, com perfil verificado, histórico financeiro robusto e Trust Score alto. Para quem opera 6 e 7 dígitos por mês no Meta Ads.",
    subheadlineMobile: "BM sem cap pré-definido, com perfil verificado e Trust Score alto. Para quem opera volume.",
    trustItems: [
      { value: "Sem cap", label: "de gasto" },
      { value: "10k+", label: "USD/dia" },
      { value: "Verified", label: "Profile + BM" },
    ],
  },
  assets: {
    badge: "🛡️ COMBINAÇÕES PARA BM ILIMITADA",
    heading: (
      <>
        BM ilimitada não é um ativo, é uma <span className="text-gradient">estrutura.</span>
      </>
    ),
    intro:
      "O que destrava o limite de gasto é a soma de perfil verificado + BM com histórico + vinculação certa. Trabalhamos a combinação inteira.",
    items: [
      mk(Layers, "UNLIMITED", "BM Ilimitada", "Cap de gasto desbloqueado pela Meta — 1k, 10k ou 100k+ USD/dia conforme combinação.", [
        "Sem trava de cap",
        "Histórico financeiro robusto",
        "Pronta para escalar pesado",
      ]),
      mk(BadgeCheck, "VERIFIED", "Perfil Verificado", "Perfil pessoal verificado é pré-requisito para destravar BM ilimitada na maioria das verticais.", [
        "Selo de verificação ativo",
        "Idade real",
        "Vinculação 1 a 1",
      ]),
      mk(Building2, "AGED", "BM Aged base", "BM com anos de histórico de gastos limpos serve como camada-mãe da estrutura ilimitada.", [
        "Histórico de gastos comprovado",
        "Sem strike",
        "Estável em auditoria",
      ]),
      mk(CreditCard, "BIN", "BIN internacional aprovador", "Cartão e BIN que sustentam volume alto sem disparo de fraude na Meta.", [
        "BIN testado em volume",
        "Aprovação consistente",
        "Sem hard decline",
      ]),
    ],
    footerLine: "BM ilimitada de verdade só existe quando a estrutura inteira está coerente.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">BM Ilimitada</span>
      </>
    ),
    items: [
      {
        question: "BM ilimitada significa gastar quanto eu quiser, no dia 1?",
        answer:
          "Não. Significa que o cap de gasto não está pré-travado pela Meta. Mesmo assim, warm-up estruturado é obrigatório — escalar do zero pra 10k USD/dia em 24h queima qualquer ativo.",
      },
      {
        question: "Qual a diferença entre BM 250, BM 1k, BM 10k e BM ilimitada?",
        answer:
          "São degraus do cap de gasto da Meta. 250 e 1k são caps iniciais; 10k já exige verificação documental robusta; ilimitada não tem cap pré-definido. Cada degrau exige um nível diferente de Trust Score e histórico.",
      },
      {
        question: "BM ilimitada é arriscada?",
        answer:
          "Como qualquer BM, depende do uso. Criativo dentro de policy, vinculação correta e warm-up bem feito mantém o ativo de pé. Operação afobada queima qualquer estrutura.",
      },
      {
        question: "Vocês entregam BM ilimitada para qualquer nicho?",
        answer:
          "Não. Em verticais agressivas (apostas, nutra pesado, cripto) a curadoria é mais rigorosa e o ativo é separado. Os detalhes a gente alinha no briefing.",
      },
      {
        question: "Quanto custa uma BM ilimitada?",
        answer:
          "Depende da combinação (perfil verificado + BM aged + BIN), do nicho e do tier de gasto desejado. Cotação 1 a 1 no WhatsApp.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Pare de escalar travado em <span className="text-gradient italic">cap de gasto.</span>
      </>
    ),
    description: "BM ilimitada com perfil verificado, BIN aprovador e curadoria 1 a 1. Para operações que precisam rodar volume sem amarras.",
    ctaLabel: "QUERO BM ILIMITADA",
  },
  featuredGuideSlugs: [
    "preco-bm-verificada-2026-quanto-custa",
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    "trust-score-meta-ads-como-medir-aumentar",
  ],
};

// ============================================================
// 3. Perfis Facebook (Farmados)
// ============================================================
const perfisFacebook: ProductLandingData = {
  slug: "perfis-facebook",
  seo: {
    title: "Perfis Facebook Farmados e Aged | AD Scale",
    description:
      "Compre perfis Facebook farmados e aged com timeline real, idade comprovada e Trust Score alto. Base estável para BM, multi-conta e Meta Ads.",
    keywords: [
      "perfil facebook farmado",
      "comprar perfil facebook",
      "perfil aged",
      "perfil verificado",
      "perfil para ads",
      "conta facebook farmada",
      "perfil antigo facebook",
    ],
    canonical: "/perfis-facebook",
  },
  hero: {
    eyebrow: "PERFIS QUE SEGURAM A SUA BM EM PÉ",
    badgeText: "Perfis farmados, aged e verificados",
    headline: (
      <>
        Perfis Facebook <span className="text-gradient">farmados de verdade</span> — não conta nova com nome bonito.
      </>
    ),
    headlineMobile: (
      <>
        Perfis Facebook <span className="text-gradient">farmados de verdade</span>.
      </>
    ),
    subheadline:
      "Perfis com timeline real, amigos, fotos e atividade orgânica de anos. A base que sustenta sua BM, libera multi-conta e mantém o Trust Score alto no Meta.",
    subheadlineMobile: "Perfis com timeline, amigos e atividade orgânica de anos. Sustentam BM e multi-conta.",
    trustItems: [
      { value: "Aged", label: "2+ anos" },
      { value: "Real", label: "Atividade orgânica" },
      { value: "Verified", label: "Selo opcional" },
    ],
  },
  assets: {
    badge: "🛡️ PERFIS DISPONÍVEIS",
    heading: (
      <>
        Perfil de verdade tem <span className="text-gradient">história, não só idade.</span>
      </>
    ),
    intro:
      "Cada perfil é validado em fingerprint, atividade orgânica e histórico de login antes de chegar em você. Sem perfil de catálogo.",
    items: [
      mk(UserCircle2, "AGED", "Perfil Aged (2+ anos)", "Perfis com 2 a 5+ anos de atividade real, login orgânico, amigos e timeline coerente.", [
        "Timeline real e ativa",
        "Amigos e fotos orgânicos",
        "Histórico de login limpo",
      ]),
      mk(BadgeCheck, "VERIFIED", "Perfil Verificado", "Perfil com selo de verificação ativo — pré-requisito para BM ilimitada e operações pesadas.", [
        "Verificação ativa no Meta",
        "Resistência a review",
        "Combinável com BM ilimitada",
      ]),
      mk(Flame, "FARMED", "Perfil Farmado fresh", "Perfis criados e farmados pelo nosso time — atividade real, navegação humana e fingerprint limpo.", [
        "Farm humano, não bot",
        "Fingerprint exclusivo",
        "Pronto para BM nova",
      ]),
      mk(Layers, "MULTI", "Perfil para multi-conta", "Perfis preparados para operação multi-conta sem disparar fingerprint cruzado entre BMs.", [
        "Sem cruzamento de fingerprint",
        "Estável em operação paralela",
        "Setup de proxy orientado",
      ]),
    ],
    footerLine: "BM cai sem perfil sólido. Perfil sólido não se improvisa.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">Perfis Facebook</span>
      </>
    ),
    items: [
      {
        question: "Qual a diferença entre perfil aged, farmado e verificado?",
        answer:
          "Aged: anos de uso real e timeline orgânica. Farmado: foi cuidado por humano (não bot) com navegação e atividade reais. Verificado: tem selo oficial do Meta. Um perfil pode ser todos os três ao mesmo tempo.",
      },
      {
        question: "Vocês entregam perfil 'BM ready' ou só o perfil cru?",
        answer:
          "BM ready: já com 2FA, e-mail dedicado, autenticador, recuperação configurada e orientação de login (proxy, fingerprint). É o que evita queda nas primeiras 72h.",
      },
      {
        question: "Posso operar várias BMs com o mesmo perfil?",
        answer:
          "Tecnicamente sim, mas é receita pra fingerprint cruzado. Em operação séria, cada perfil sustenta uma BM principal — e a contingência tem perfis paralelos.",
      },
      {
        question: "Como funciona o handover do perfil?",
        answer:
          "Walkthrough ao vivo: você assume login, troca senha, ativa 2FA no seu dispositivo e a gente valida fingerprint junto. Nas primeiras 72h, suporte técnico ativo.",
      },
      {
        question: "Existe perfil PJ?",
        answer:
          "Não no Facebook — perfil é sempre pessoal. Quem é PJ é a Página, a BM e a verificação documental. Para verticais sensíveis, combinamos perfil aged + verificação documental da BM.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Sua BM só dura <span className="text-gradient italic">o que o perfil aguenta.</span>
      </>
    ),
    description: "Perfis aged, farmados e verificados — entregues com walkthrough técnico e suporte de 72h.",
    ctaLabel: "QUERO MEU PERFIL",
  },
  featuredGuideSlugs: [
    "trust-score-meta-ads-como-medir-aumentar",
    "warm-up-perfil-facebook-passo-a-passo",
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
  ],
};

// ============================================================
// 4. Perfil Aged
// ============================================================
const perfilAged: ProductLandingData = {
  slug: "perfil-aged",
  seo: {
    title: "Perfil Aged Facebook | Contas Antigas Ativas",
    description:
      "Perfis Facebook aged com 2 a 10+ anos de timeline real, amigos, fotos e histórico de login orgânico. Base ideal para BM verificada e Meta Ads.",
    keywords: [
      "perfil aged facebook",
      "perfil antigo facebook",
      "conta aged",
      "perfil 2010",
      "perfil envelhecido",
      "conta facebook antiga",
    ],
    canonical: "/perfil-aged",
  },
  hero: {
    eyebrow: "PERFIS COM ANOS DE TIMELINE REAL",
    badgeText: "Perfis 2010+ · Atividade orgânica",
    headline: (
      <>
        Perfis Facebook <span className="text-gradient">aged</span> com 2 a 10+ anos de história real.
      </>
    ),
    headlineMobile: (
      <>
        Perfis <span className="text-gradient">aged</span> com 2 a 10+ anos.
      </>
    ),
    subheadline:
      "Perfis envelhecidos com timeline orgânica, amigos reais, fotos antigas e histórico de login limpo. O ativo que mais sustenta Trust Score alto na operação.",
    subheadlineMobile: "Perfis com timeline orgânica, amigos e histórico real. Sustentam Trust Score.",
    trustItems: [
      { value: "2-10+", label: "anos de uso" },
      { value: "Real", label: "Login orgânico" },
      { value: "Limpo", label: "Sem strike" },
    ],
  },
  assets: {
    badge: "🛡️ FAIXAS DE PERFIL AGED",
    heading: (
      <>
        Idade importa. <span className="text-gradient">Mas o que segura é o histórico.</span>
      </>
    ),
    intro:
      "Trabalhamos perfis em três faixas de idade — cada uma resolve um problema diferente da operação.",
    items: [
      mk(UserCircle2, "2-3 ANOS", "Perfil Aged Médio", "Perfis com 2 a 3 anos, atividade orgânica e timeline coerente. Excelente custo-benefício para BM nova.", [
        "Timeline coerente",
        "Histórico limpo",
        "Bom para warm-up de BM nova",
      ]),
      mk(UserCircle2, "4-7 ANOS", "Perfil Aged Sênior", "Perfis com 4 a 7 anos, amigos antigos e histórico de gastos pessoal. Sustenta BM verificada e operação pesada.", [
        "Resistência em auditoria",
        "Combinável com BM verificada",
        "Estável em vertical pesada",
      ]),
      mk(UserCircle2, "8-10+ ANOS", "Perfil Aged Premium (2010+)", "Perfis criados em 2010-2014 com timeline rica e atividade orgânica de uma década. O topo da pirâmide.", [
        "Idade premium 2010+",
        "Timeline rica",
        "Pré-requisito para BM ilimitada",
      ]),
      mk(BadgeCheck, "VERIFIED", "Perfil Aged + Verified", "Perfis aged que também passaram pela verificação oficial do Meta — combinação rara e poderosa.", [
        "Idade + verificação",
        "Cap alto de BM destravado",
        "Estoque limitado",
      ]),
    ],
    footerLine: "Perfil aged não se fabrica em uma noite. É anos de história validada.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">Perfis Aged</span>
      </>
    ),
    items: [
      {
        question: "Como vocês comprovam que o perfil tem mesmo a idade que dizem?",
        answer:
          "Pelo próprio Facebook: timestamp de criação no histórico de atividade, fotos antigas com data, primeiros amigos. Walkthrough ao vivo antes da entrega.",
      },
      {
        question: "Perfil aged tem amigos reais ou comprados?",
        answer:
          "Reais. Perfil com amigos comprados dispara fingerprint de fazenda e queima a BM em uma semana. Os perfis que vendemos têm rede social orgânica.",
      },
      {
        question: "Posso usar perfil aged para criar uma BM nova?",
        answer:
          "Pode e deve. Perfil aged + BM nova é uma das combinações mais usadas em contingência: você queima a BM se precisar, mas mantém o perfil intacto.",
      },
      {
        question: "Qual a diferença real entre perfil 2 anos e perfil 10 anos?",
        answer:
          "Resistência a review e cap inicial de gasto. Perfil de 2 anos serve operação média; perfil de 10 anos sustenta vertical pesada e destrava cap mais alto na BM vinculada.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Trust Score alto começa com <span className="text-gradient italic">perfil de verdade.</span>
      </>
    ),
    description: "Perfis aged validados em fingerprint, idade e histórico — com handover técnico ao vivo.",
    ctaLabel: "QUERO PERFIL AGED",
  },
  featuredGuideSlugs: [
    "trust-score-meta-ads-como-medir-aumentar",
    "warm-up-perfil-facebook-passo-a-passo",
    "como-escolher-fornecedor-bm-verificada-meta",
  ],
};

// ============================================================
// 5. Páginas Facebook / Fan Pages
// ============================================================
const paginasFacebook: ProductLandingData = {
  slug: "paginas-facebook",
  seo: {
    title: "Comprar Fan Page Facebook | Páginas Antigas Aged",
    description:
      "Fan Pages antigas e verificadas para Meta Ads: páginas com idade, engajamento real, seguidores orgânicos e nicho coerente para a sua oferta.",
    keywords: [
      "comprar fan page",
      "fan page antiga",
      "página facebook ads",
      "página com seguidores",
      "página aged",
      "fan page verificada",
      "comprar página facebook",
    ],
    canonical: "/paginas-facebook",
  },
  hero: {
    eyebrow: "FAN PAGES PRONTAS PARA RODAR ANÚNCIO",
    badgeText: "Páginas aged · Engajamento real · Verificáveis",
    headline: (
      <>
        Fan Pages <span className="text-gradient">aged</span>, com engajamento real e nicho coerente.
      </>
    ),
    headlineMobile: (
      <>
        Fan Pages <span className="text-gradient">aged</span> e por nicho.
      </>
    ),
    subheadline:
      "Páginas Facebook com anos de idade, seguidores orgânicos e engajamento real. Reduz risco de derrubada por denúncia, alimenta lookalikes melhores e dá cara séria ao criativo.",
    subheadlineMobile:
      "Páginas com idade, seguidores orgânicos e engajamento real. Reduz risco e melhora lookalike.",
    trustItems: [
      { value: "Aged", label: "Idade real" },
      { value: "Real", label: "Engajamento orgânico" },
      { value: "Nicho", label: "Match com oferta" },
    ],
  },
  assets: {
    badge: "🛡️ TIPOS DE PÁGINA",
    heading: (
      <>
        Página não é detalhe. <span className="text-gradient">É a cara da sua oferta no leilão.</span>
      </>
    ),
    intro:
      "Página fraca derruba CTR, CPM e Trust Score. Trabalhamos quatro categorias para cada momento da operação.",
    items: [
      mk(FileText, "AGED", "Página Antiga (2+ anos)", "Páginas com 2 a 8+ anos de criação, posts orgânicos e seguidores reais.", [
        "Idade comprovada",
        "Seguidores orgânicos",
        "Histórico de posts",
      ]),
      mk(BadgeCheck, "VERIFIED", "Página Verificada (selo)", "Páginas com selo azul oficial — credibilidade máxima na timeline e proteção contra denúncias.", [
        "Selo azul ativo",
        "Resistência a denúncia",
        "Boost natural de CTR",
      ]),
      mk(Layers, "NICHE", "Página por Nicho", "Páginas com público e engajamento alinhados ao seu nicho — fitness, finanças, beleza, infoprodutos.", [
        "Público pré-segmentado",
        "Lookalike de qualidade",
        "Match com criativo",
      ]),
      mk(Flame, "ENGAGED", "Página com Engajamento Alto", "Páginas com base ativa de seguidores que comentam, curtem e compartilham — sustenta posts impulsionados.", [
        "Engajamento orgânico vivo",
        "Boa para social proof",
        "Performance em impulsionamento",
      ]),
    ],
    footerLine: "Sua oferta merece uma página à altura. Curadoria por nicho.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">Fan Pages</span>
      </>
    ),
    items: [
      {
        question: "Vocês têm página do meu nicho específico?",
        answer:
          "Trabalhamos com curadoria por nicho — fitness, finanças, beleza, infoprodutos, ecommerce, apostas, nutra. Manda no WhatsApp o nicho da sua oferta e a gente verifica disponibilidade.",
      },
      {
        question: "Página verificada (selo azul) ainda existe pra comprar?",
        answer:
          "Sim, mas é estoque limitado e curadoria caso a caso. Página com selo azul ativo é o que dá maior credibilidade e mais resistência a denúncia.",
      },
      {
        question: "Posso renomear a página depois que comprar?",
        answer:
          "Pode, com técnica certa. Renomear errado dispara revisão. No handover orientamos cadência segura de mudança de nome, foto e descrição.",
      },
      {
        question: "Página antiga garante que o anúncio não vai cair?",
        answer:
          "Não. Página é uma camada — junto com BM, perfil e criativo. Mas reduz drasticamente o risco de derrubada por denúncia e melhora CTR no leilão.",
      },
      {
        question: "Como vocês validam que os seguidores não são bot?",
        answer:
          "Auditoria manual: padrão de comentários, datas de criação dos seguidores, geolocalização. Página com 100k seguidores fake vale menos que página com 5k orgânicos.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Página fraca queima criativo bom. <span className="text-gradient italic">Equilibre a balança.</span>
      </>
    ),
    description: "Páginas aged, verificadas e por nicho, com auditoria de engajamento e handover técnico.",
    ctaLabel: "QUERO MINHA FAN PAGE",
  },
  featuredGuideSlugs: [
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    "como-escolher-fornecedor-bm-verificada-meta",
    "trust-score-meta-ads-como-medir-aumentar",
  ],
};

// ============================================================
// 6. Domínios Verificados
// ============================================================
const dominiosVerificados: ProductLandingData = {
  slug: "dominios-verificados",
  seo: {
    title: "Domínios Verificados Meta | Para Facebook Ads",
    description:
      "Domínios verificados no Meta para Facebook Ads, conversions API e WhatsApp Cloud API. Verificação ativa, DNS configurado e Trust Score alto.",
    keywords: [
      "domínio verificado meta",
      "verificação de domínio facebook",
      "domínio com trust",
      "domínio aquecido",
      "domain verification meta",
    ],
    canonical: "/dominios-verificados",
  },
  hero: {
    eyebrow: "DOMÍNIO É A CAMADA QUE GOOGLE E META OBSERVAM",
    badgeText: "Verificação ativa · DNS · CAPI ready",
    headline: (
      <>
        Domínios <span className="text-gradient">verificados no Meta</span> e prontos para CAPI.
      </>
    ),
    headlineMobile: (
      <>
        Domínios <span className="text-gradient">verificados no Meta</span>.
      </>
    ),
    subheadline:
      "Domínios com verificação ativa no Business Manager, DNS configurado, e-mail profissional e idade. Pré-requisito para iOS 14+, CAPI e WhatsApp Cloud API estável.",
    subheadlineMobile:
      "Domínios verificados no Meta, com DNS e e-mail. Pré-requisito para CAPI e iOS 14+.",
    trustItems: [
      { value: "Verified", label: "Meta domain" },
      { value: "DNS", label: "Configurado" },
      { value: "Aged", label: "Idade real" },
    ],
  },
  assets: {
    badge: "🛡️ TIPOS DE DOMÍNIO",
    heading: (
      <>
        Domínio resolve mais coisa do que parece. <span className="text-gradient">Especialmente pós iOS 14.</span>
      </>
    ),
    intro:
      "Verificação de domínio destrava 8 eventos de conversão no iOS 14+, melhora atribuição CAPI e dá camada extra de Trust Score.",
    items: [
      mk(Globe, "VERIFIED", "Domínio Verificado Meta", "Domínio com selo de verificação ativo no Business Manager — destrava priorização de eventos.", [
        "8 eventos prioritários",
        "Atribuição estável",
        "Pré-requisito CAPI",
      ]),
      mk(Activity, "AGED", "Domínio Aged + DNS", "Domínios com 1+ ano de registro, DNS configurado e histórico limpo.", [
        "Idade no WHOIS",
        "DNS produção",
        "Sem blacklist",
      ]),
      mk(MessageSquare, "WABA", "Domínio para WhatsApp Cloud API", "Domínio dedicado preparado para verificação WABA + Meta + Cloud API.", [
        "WABA ready",
        "Verificação documental orientada",
        "E-mail profissional",
      ]),
      mk(BadgeCheck, "PREMIUM", "Domínio Premium aquecido", "Domínios com tráfego orgânico residual e histórico de campanha — máxima credibilidade.", [
        "Tráfego orgânico residual",
        "Histórico Meta limpo",
        "Trust Score topo",
      ]),
    ],
    footerLine: "Domínio certo é a base silenciosa que o Meta observa em todo o checkout.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">Domínios Verificados</span>
      </>
    ),
    items: [
      {
        question: "Por que verificar domínio no Meta é importante hoje?",
        answer:
          "Pós iOS 14+, só domínios verificados destravam os 8 eventos de conversão prioritários. Sem verificação, atribuição cai e otimização engasga.",
      },
      {
        question: "Vocês entregam domínio já com verificação ativa?",
        answer:
          "Sim. O domínio chega com verificação ativa no Business Manager que indicarmos, ou orientamos passo a passo a transferência para a sua BM.",
      },
      {
        question: "Posso usar o domínio para WhatsApp Cloud API também?",
        answer:
          "Sim. Para WABA, recomendamos domínio dedicado com e-mail profissional configurado — a curadoria leva isso em conta.",
      },
      {
        question: "Domínio aquecido vale mais?",
        answer:
          "Para vertical sensível, vale muito. Domínio com histórico de tráfego orgânico residual passa por menos review automática que domínio recém-criado.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        CAPI sem domínio verificado é <span className="text-gradient italic">métrica chutada.</span>
      </>
    ),
    description: "Domínios verificados, aged e WABA-ready com DNS e e-mail configurados.",
    ctaLabel: "QUERO DOMÍNIO VERIFICADO",
  },
  featuredGuideSlugs: [
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    "trust-score-meta-ads-como-medir-aumentar",
    "o-que-e-business-manager-verificada-meta",
  ],
};

// ============================================================
// 7. WhatsApp Cloud API
// ============================================================
const whatsappCloudApi: ProductLandingData = {
  slug: "whatsapp-cloud-api",
  seo: {
    title: "WhatsApp Cloud API + BM Verificada | AD Scale",
    description:
      "BM Verificada para WhatsApp Cloud API: WABA verificada, número high quality, templates aprovados e tier 1k/10k/100k para disparo oficial.",
    keywords: [
      "whatsapp cloud api",
      "bm para whatsapp api",
      "disparo whatsapp api",
      "whatsapp business api oficial",
      "waba verificada",
      "tier whatsapp api",
      "comprar bm whatsapp api",
    ],
    canonical: "/whatsapp-cloud-api",
  },
  hero: {
    eyebrow: "ESTRUTURA OFICIAL PARA DISPARO VIA API",
    badgeText: "WABA · BM Verificada · Tier 1k/10k/100k",
    headline: (
      <>
        BM Verificada e WABA para <span className="text-gradient">WhatsApp Cloud API</span> que escala.
      </>
    ),
    headlineMobile: (
      <>
        BM + WABA para <span className="text-gradient">WhatsApp Cloud API</span>.
      </>
    ),
    subheadline:
      "Estrutura oficial Meta: BM verificada, WABA verificada, número high quality, templates aprovados e tier 1k/10k/100k. Disparo dentro da policy, sem queda de número.",
    subheadlineMobile:
      "BM + WABA verificadas, número HQ, templates aprovados e tier 1k/10k/100k. Dentro da policy.",
    trustItems: [
      { value: "Tier 100k", label: "WhatsApp" },
      { value: "HQ", label: "Quality Rating" },
      { value: "Verified", label: "WABA + BM" },
    ],
  },
  assets: {
    badge: "🛡️ STACK COMPLETO WHATSAPP API",
    heading: (
      <>
        WABA verificada não é um produto. <span className="text-gradient">É uma cadeia.</span>
      </>
    ),
    intro:
      "Disparo via Cloud API estável depende de cinco peças encaixadas. Trabalhamos a cadeia inteira para sua operação não cair no número 0800.",
    items: [
      mk(BadgeCheck, "VERIFIED", "BM Verificada para API", "Business Manager com verificação documental ativa — pré-requisito para tier alto na WABA.", [
        "Verificação documental Meta",
        "Cap alto de envio",
        "Sustenta tier 100k",
      ]),
      mk(MessageSquare, "WABA", "WABA Verificada", "WhatsApp Business Account oficialmente verificada, com selo verde e templates pré-aprovados.", [
        "Selo verde ativo",
        "Templates aprovados",
        "Pronta para disparo",
      ]),
      mk(Activity, "TIER", "Número High Quality (HQ)", "Número aquecido com Quality Rating verde, sem strike e pronto para tier 1k/10k/100k.", [
        "Quality Rating HQ",
        "Sem histórico de bloqueio",
        "Aquecimento orientado",
      ]),
      mk(Globe, "DOMAIN", "Domínio + E-mail profissional", "Domínio verificado e e-mail corporativo necessários para verificação Meta da WABA.", [
        "Domínio verificado",
        "E-mail profissional",
        "Documentação orientada",
      ]),
    ],
    footerLine: "Disparo estável só nasce de estrutura oficial. Sem gambiarra, sem número queimado.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">WhatsApp Cloud API</span>
      </>
    ),
    items: [
      {
        question: "Qual a diferença entre WhatsApp Business App e Cloud API?",
        answer:
          "Business App é o aplicativo no celular (envio manual, limites baixos). Cloud API é a API oficial Meta para envio em massa via integração — única forma legal de disparo em escala.",
      },
      {
        question: "Como subir o tier da WABA de 1k para 10k ou 100k?",
        answer:
          "Quality Rating verde + volume crescente + zero bloqueios. A Meta sobe automaticamente quando os critérios são atendidos. BM verificada acelera muito o processo.",
      },
      {
        question: "Vocês entregam WABA já verificada ou só a BM?",
        answer:
          "Pacote completo: BM verificada + WABA verificada + número HQ + templates aprovados + domínio verificado. Você recebe a estrutura inteira pronta para integrar no seu CRM/disparador.",
      },
      {
        question: "Como evitar que o número caia em disparo?",
        answer:
          "Quality Rating depende de: opt-in real, template dentro de policy, frequência sã, baixa taxa de bloqueio do destinatário. Disparo sem opt-in queima qualquer número, mesmo HQ.",
      },
      {
        question: "Posso integrar com qual disparador?",
        answer:
          "Cloud API é padrão Meta — integra com qualquer ferramenta que suporte WhatsApp Business Platform (Z-API, Twilio, MessageBird, custom). A gente entrega a credencial e orienta a integração.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Disparo profissional pede <span className="text-gradient italic">estrutura profissional.</span>
      </>
    ),
    description: "BM + WABA verificadas, número HQ, templates aprovados e tier alto. Tudo dentro da policy Meta.",
    ctaLabel: "QUERO ESTRUTURA WABA",
  },
  featuredGuideSlugs: [
    "o-que-e-business-manager-verificada-meta",
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    "trust-score-meta-ads-como-medir-aumentar",
  ],
};

// ============================================================
// 8. Pixel + CAPI
// ============================================================
const pixelCapi: ProductLandingData = {
  slug: "pixel-capi",
  seo: {
    title: "Pixel Facebook + CAPI | Conversions API Meta",
    description:
      "Pixel verificado e Conversions API (CAPI) configurada para Facebook Ads pós iOS 14+: atribuição estável, eventos prioritários e domínio verificado.",
    keywords: [
      "pixel facebook capi",
      "conversions api meta",
      "capi facebook ads",
      "pixel verificado",
      "atribuição ios 14 facebook",
    ],
    canonical: "/pixel-capi",
  },
  hero: {
    eyebrow: "ATRIBUIÇÃO ESTÁVEL PÓS IOS 14+",
    badgeText: "Pixel + CAPI + Domínio Verificado",
    headline: (
      <>
        <span className="text-gradient">Pixel + CAPI</span> configurados pra parar de chutar atribuição.
      </>
    ),
    headlineMobile: (
      <>
        <span className="text-gradient">Pixel + CAPI</span> configurados.
      </>
    ),
    subheadline:
      "Pixel verificado, Conversions API rodando server-side, domínio verificado e 8 eventos prioritários. A camada técnica que a Meta exige pra otimizar com precisão.",
    subheadlineMobile: "Pixel + CAPI server-side e domínio verificado. A camada técnica que a Meta exige.",
    trustItems: [
      { value: "8 eventos", label: "prioritários" },
      { value: "Server", label: "side CAPI" },
      { value: "Verified", label: "Domínio" },
    ],
  },
  assets: {
    badge: "🛡️ STACK ATRIBUIÇÃO",
    heading: (
      <>
        Sem CAPI, sua otimização é <span className="text-gradient">cega.</span>
      </>
    ),
    intro:
      "Pós iOS 14+, pixel sozinho perde até 40% dos eventos. Stack completo recupera atribuição e devolve a IA da Meta para o leilão.",
    items: [
      mk(Activity, "PIXEL", "Pixel Facebook configurado", "Pixel instalado em todas as páginas críticas com eventos padrão e eventos custom mapeados.", [
        "Eventos padrão + custom",
        "Match Quality alto",
        "Deduplicação configurada",
      ]),
      mk(Layers, "CAPI", "Conversions API server-side", "CAPI rodando direto do servidor, com hash de e-mail/telefone para Match Quality máximo.", [
        "Eventos server-side",
        "Hash SHA-256",
        "Sem perda iOS 14+",
      ]),
      mk(Globe, "DOMAIN", "Domínio Verificado Meta", "Domínio verificado destrava os 8 eventos prioritários — pré-requisito do iOS 14+.", [
        "8 eventos destravados",
        "Verificação ativa",
        "DNS validado",
      ]),
      mk(BadgeCheck, "BM", "BM Verificada hospedando", "BM verificada com pixel + CAPI ganha mais peso na atribuição da Meta.", [
        "BM verificada base",
        "Stack coerente",
        "Score combinado",
      ]),
    ],
    footerLine: "Atribuição certa é o que separa escala de chute. Stack completo, sem gambiarra.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">Pixel + CAPI</span>
      </>
    ),
    items: [
      {
        question: "CAPI substitui o Pixel?",
        answer:
          "Não — complementa. O setup ideal é Pixel (client-side) + CAPI (server-side) com deduplicação. Cada um cobre o que o outro perde.",
      },
      {
        question: "Vocês configuram o CAPI no meu site/CRM?",
        answer:
          "Sim. Avaliamos sua stack (WordPress, Shopify, headless, custom) e implementamos via GTM, Stape, server custom ou nativo. Walkthrough técnico ao vivo.",
      },
      {
        question: "Sem CAPI eu perco quanto de atribuição?",
        answer:
          "Em iOS 14+ a perda chega a 30–40% dos eventos. Em e-commerce com checkout web, sem CAPI a IA da Meta otimiza com dados pela metade.",
      },
      {
        question: "Posso usar CAPI sem domínio verificado?",
        answer:
          "Pode, mas perde os 8 eventos prioritários. Verificação de domínio é o que devolve a hierarquia de eventos pós iOS 14+.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Pare de otimizar com <span className="text-gradient italic">métrica pela metade.</span>
      </>
    ),
    description: "Pixel + CAPI server-side + domínio verificado, configurados na sua stack com walkthrough técnico.",
    ctaLabel: "CONFIGURAR PIXEL + CAPI",
  },
  featuredGuideSlugs: [
    "trust-score-meta-ads-como-medir-aumentar",
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    "o-que-e-business-manager-verificada-meta",
  ],
};

// ============================================================
// 9. Aquecimento de Contas
// ============================================================
const aquecimentoContas: ProductLandingData = {
  slug: "aquecimento-contas",
  seo: {
    title: "Aquecimento de Contas Facebook Ads | Warm-up",
    description:
      "Serviço de aquecimento (warm-up) profissional para contas Facebook Ads, BMs e perfis. Estratégia de cap, criativo e cadência para Trust Score alto.",
    keywords: [
      "aquecimento conta facebook",
      "warm up facebook ads",
      "esquentar bm",
      "esquentar conta ads",
      "aquecimento bm",
      "warm-up perfil facebook",
    ],
    canonical: "/aquecimento-contas",
  },
  hero: {
    eyebrow: "ATIVO NOVO QUEIMA SEM WARM-UP",
    badgeText: "Warm-up estruturado · Cap · Criativo · Cadência",
    headline: (
      <>
        <span className="text-gradient">Aquecimento profissional</span> de BMs, perfis e contas no Meta.
      </>
    ),
    headlineMobile: (
      <>
        <span className="text-gradient">Aquecimento profissional</span> no Meta.
      </>
    ),
    subheadline:
      "Warm-up estruturado em 14 a 30 dias: cadência de gasto, criativo dentro de policy, vinculação certa e leitura de Quality Rating diária. Trust Score sobe, ativo dura.",
    subheadlineMobile:
      "Warm-up estruturado: cadência de gasto, criativo certo e Quality Rating monitorado. Ativo dura.",
    trustItems: [
      { value: "14-30d", label: "Programa" },
      { value: "Daily", label: "Monitoria" },
      { value: "High", label: "Trust Score final" },
    ],
  },
  assets: {
    badge: "🛡️ MODALIDADES DE AQUECIMENTO",
    heading: (
      <>
        Não existe ativo "pronto para escalar". <span className="text-gradient">Existe ativo bem aquecido.</span>
      </>
    ),
    intro:
      "Warm-up errado queima ativo de R$ 30k em 72h. Trabalhamos quatro modalidades, conforme o tipo de ativo e o destino final.",
    items: [
      mk(Flame, "BM", "Warm-up de BM nova", "Cadência de gasto + vinculação + criativos seed durante 14 a 21 dias até liberar cap maior.", [
        "Plano D1-D21",
        "Criativos seed orientados",
        "Leitura de Quality Rating",
      ]),
      mk(UserCircle2, "PROFILE", "Warm-up de Perfil aged", "Atividade orgânica controlada (login, browsing, interação) para devolver Trust Score ao perfil parado.", [
        "Atividade orgânica",
        "Geolocalização consistente",
        "Fingerprint protegido",
      ]),
      mk(MessageSquare, "WABA", "Warm-up de WABA / número API", "Aquecimento de número HQ no WhatsApp Cloud API — opt-in, template e cadência para subir tier.", [
        "Cadência por tier",
        "Quality Rating verde",
        "Subida 1k → 10k → 100k",
      ]),
      mk(Activity, "RESCUE", "Warm-up de resgate", "Reaquecimento de ativos com Trust Score derrubado por strike, pausa longa ou bloqueio recente.", [
        "Diagnóstico do strike",
        "Plano de recuperação",
        "Monitoria diária",
      ]),
    ],
    footerLine: "Warm-up não é tempo — é cadência. E cadência se faz com método.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">Aquecimento</span>
      </>
    ),
    items: [
      {
        question: "Quanto tempo dura um warm-up profissional?",
        answer:
          "Depende do ativo. BM nova: 14 a 21 dias. Perfil aged parado: 7 a 10 dias. WABA até tier 100k: 30 a 45 dias. Apressar queima.",
      },
      {
        question: "Vocês fazem o warm-up por mim ou eu executo seguindo um plano?",
        answer:
          "Os dois modelos. Done-for-you (a gente executa) ou Done-with-you (você opera, a gente orienta diariamente).",
      },
      {
        question: "Por que minha BM cai mesmo eu seguindo plano de warm-up que vi no YouTube?",
        answer:
          "Plano genérico ignora vertical, criativo e perfil vinculado. Warm-up de nutra é diferente de info, que é diferente de e-commerce. Cadência tem que ser específica.",
      },
      {
        question: "Posso pular warm-up se a BM é verificada?",
        answer:
          "Não. Mesmo BM verificada tem cap inicial e Quality Rating em formação. Warm-up é o que destrava o cap real.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Pare de queimar ativo de R$ 30k <span className="text-gradient italic">por pressa.</span>
      </>
    ),
    description: "Programa de warm-up estruturado para BMs, perfis e WABA, com monitoria diária de Quality Rating.",
    ctaLabel: "QUERO AQUECIMENTO PROFISSIONAL",
  },
  featuredGuideSlugs: [
    "warm-up-perfil-facebook-passo-a-passo",
    "trust-score-meta-ads-como-medir-aumentar",
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
  ],
};

// ============================================================
// 10. Cartões / BIN Internacional
// ============================================================
const cartoesBin: ProductLandingData = {
  slug: "cartoes-bin-internacional",
  seo: {
    title: "BIN para Facebook Ads | Cartões Internacionais",
    description:
      "BIN e cartões internacionais aprovadores para Meta Ads: testados em volume, com baixa taxa de hard decline e sem disparo de fraude na BM.",
    keywords: [
      "bin para facebook ads",
      "cartão internacional ads",
      "bin que aprova meta",
      "cartão para bm",
      "bin meta ads",
      "cartão internacional facebook",
    ],
    canonical: "/cartoes-bin-internacional",
  },
  hero: {
    eyebrow: "PAGAMENTO É A CAMADA QUE DERRUBA OPERAÇÃO MADURA",
    badgeText: "BIN testado em volume · Sem hard decline",
    headline: (
      <>
        <span className="text-gradient">BIN internacional</span> que aprova no Meta — sem fraude, sem decline.
      </>
    ),
    headlineMobile: (
      <>
        <span className="text-gradient">BIN</span> que aprova no Meta.
      </>
    ),
    subheadline:
      "Cartões e BINs internacionais testados em volume real, com baixa taxa de hard decline, sem disparo de fraude na BM e compatíveis com tier alto de gasto.",
    subheadlineMobile:
      "BINs internacionais testados em volume, sem hard decline e sem disparo de fraude.",
    trustItems: [
      { value: "Aprovado", label: "Em volume" },
      { value: "Baixo", label: "Hard decline" },
      { value: "10k+", label: "USD/dia" },
    ],
  },
  assets: {
    badge: "🛡️ TIPOS DE BIN",
    heading: (
      <>
        BIN errado derruba <span className="text-gradient">a melhor BM da operação.</span>
      </>
    ),
    intro:
      "Cartão e BIN são revisados pelo sistema antifraude da Meta a cada cobrança. Trabalhamos as quatro frentes que sustentam pagamento estável.",
    items: [
      mk(CreditCard, "PRIME", "BIN Prime testado", "BINs com histórico de aprovação consistente em Meta Ads, validado em milhares de transações.", [
        "Aprovação consistente",
        "Sem hard decline",
        "Compatível com tier alto",
      ]),
      mk(Globe, "INTL", "Cartão Internacional", "Cartões emitidos fora do BR — payout estável e sem trava cambial em ticket alto.", [
        "Sem IOF de variação",
        "Limite alto",
        "Aprovação USD",
      ]),
      mk(Activity, "VCC", "Virtual Card Card (VCC)", "Cartões virtuais dedicados por BM — isola risco e protege ativos da operação.", [
        "1 cartão por BM",
        "Risco isolado",
        "Top-up controlado",
      ]),
      mk(BadgeCheck, "BACKUP", "BIN de Backup", "BINs reserva para troca rápida quando o cartão principal cai — zero downtime de operação.", [
        "Troca em minutos",
        "Sem campanha pausada",
        "Continuidade garantida",
      ]),
    ],
    footerLine: "Pagamento estável é metade da contingência. Sem cartão, não tem leilão.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">BIN e Cartões</span>
      </>
    ),
    items: [
      {
        question: "Por que meu cartão BR cai no Meta toda hora?",
        answer:
          "Meta usa antifraude global. Cartão BR em USD passa por mais checagens (cambio, banco emissor, BIN). BINs internacionais ou VCCs reduzem fricção drasticamente.",
      },
      {
        question: "VCC é seguro? Não dispara fraude?",
        answer:
          "VCC sério (não cartão de loja) é seguro e amplamente usado por operações grandes. Dispara fraude quando vem de provedor amador, sem KYC, ou usado em desktop sujo.",
      },
      {
        question: "Vocês emitem cartão ou indicam fornecedor?",
        answer:
          "Indicamos provedores parceiros validados em volume real, e orientamos setup (KYC, top-up, vinculação na BM). Cada caso é avaliado.",
      },
      {
        question: "Quantos BINs eu preciso ter de reserva?",
        answer:
          "Mínimo 2 por operação ativa. Em operação 6+ dígitos, recomendamos 3 BINs distintos (de bancos diferentes) sempre prontos para troca.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        Sua escala não pode parar por <span className="text-gradient italic">cartão recusado.</span>
      </>
    ),
    description: "BINs Prime, cartões internacionais e VCCs testados em volume real. Indicação de provedor validado.",
    ctaLabel: "QUERO BIN APROVADOR",
  },
  featuredGuideSlugs: [
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    "preco-bm-verificada-2026-quanto-custa",
    "como-escolher-fornecedor-bm-verificada-meta",
  ],
};

// ============================================================
// 11. Recuperação de BM
// ============================================================
const recuperacaoBm: ProductLandingData = {
  slug: "recuperacao-bm",
  seo: {
    title: "Recuperação de BM Bloqueada | Meta Ads | AD Scale",
    description:
      "Recuperação e desbloqueio de BM bloqueada no Meta Ads: diagnóstico, plano de defesa, contestação documental e contingência imediata para não parar operação.",
    keywords: [
      "bm bloqueada recuperar",
      "desbloqueio bm",
      "recuperar conta facebook ads",
      "bm restrita",
      "como desbloquear bm meta",
      "conta de anúncio bloqueada",
    ],
    canonical: "/recuperacao-bm",
  },
  hero: {
    eyebrow: "QUANDO A BM CAI, A OPERAÇÃO NÃO PODE PARAR",
    badgeText: "Diagnóstico · Defesa · Contingência imediata",
    headline: (
      <>
        Recuperação de <span className="text-gradient">BM bloqueada</span> com defesa documental e contingência em 24h.
      </>
    ),
    headlineMobile: (
      <>
        Recuperação de <span className="text-gradient">BM bloqueada</span> em 24h.
      </>
    ),
    subheadline:
      "Diagnóstico do bloqueio, plano de defesa documental, contestação na Meta e estrutura de contingência ativada no mesmo dia. Sua operação não pausa enquanto a BM é resolvida.",
    subheadlineMobile:
      "Diagnóstico, defesa documental e contingência em 24h. Sua operação não pausa.",
    trustItems: [
      { value: "24h", label: "Contingência" },
      { value: "Defense", label: "Documental" },
      { value: "Stand-by", label: "BMs reserva" },
    ],
  },
  assets: {
    badge: "🛡️ FRENTES DE RECUPERAÇÃO",
    heading: (
      <>
        Bloqueio não se resolve <span className="text-gradient">com botão "contestar".</span>
      </>
    ),
    intro:
      "Recuperar BM exige diagnóstico técnico, defesa documental e — principalmente — não parar a operação enquanto isso. Trabalhamos as quatro frentes em paralelo.",
    items: [
      mk(Activity, "DIAG", "Diagnóstico do bloqueio", "Análise do tipo de strike (policy, segurança, fraude), histórico recente da BM e probabilidade real de recuperação.", [
        "Tipo de strike identificado",
        "Histórico mapeado",
        "Probabilidade calculada",
      ]),
      mk(FileText, "DEFENSE", "Defesa documental", "Construção de dossiê com nota fiscal, comprovante de domínio, política de privacidade, KYC — tudo o que a Meta exige.", [
        "Dossiê completo",
        "Documentos certos",
        "Submissão orientada",
      ]),
      mk(RotateCcw, "APPEAL", "Contestação Meta", "Submissão estratégica do recurso, com follow-up e escalada via canal certo conforme o tipo de bloqueio.", [
        "Texto de contestação",
        "Canal correto",
        "Follow-up ativo",
      ]),
      mk(BadgeCheck, "STANDBY", "BM Stand-by ativada", "BM verificada de contingência ativada em 24h para a campanha não parar — paga só pelo uso.", [
        "BM verificada reserva",
        "Ativação em 24h",
        "Continuidade total",
      ]),
    ],
    footerLine: "Bloqueio é normal em volume. O que separa operação séria é tempo de retomada.",
  },
  faq: {
    heading: (
      <>
        Tudo sobre <span className="text-gradient">Recuperação de BM</span>
      </>
    ),
    items: [
      {
        question: "Toda BM bloqueada pode ser recuperada?",
        answer:
          "Não. Bloqueio por policy grave, fraude confirmada ou strike acumulado tem chance baixa. Mas o diagnóstico que fazemos no D0 já te diz se vale a pena tentar — antes de gastar tempo.",
      },
      {
        question: "Quanto tempo demora a recuperação?",
        answer:
          "Strike leve: 3 a 7 dias. Bloqueio por segurança/identidade: 7 a 21 dias. Bloqueio por fraude: 30+ dias com baixa probabilidade. Contingência (BM stand-by) é em 24h.",
      },
      {
        question: "Vocês recuperam BM que eu nem comprei aqui?",
        answer:
          "Sim. Atendemos recuperação de BMs próprias (sua operação) ou compradas em outro lugar. Avaliamos no diagnóstico inicial.",
      },
      {
        question: "Quanto custa o serviço?",
        answer:
          "Diagnóstico inicial é por consulta. O serviço de recuperação varia por complexidade do strike. BM stand-by é cobrada por uso. Cotação 1 a 1.",
      },
      {
        question: "Vale mais comprar uma BM nova do que recuperar?",
        answer:
          "Em alguns casos sim — e a gente fala isso com franqueza no diagnóstico. Não vendemos recuperação fadada ao fracasso.",
      },
    ],
  },
  cta: {
    heading: (
      <>
        BM caiu? <span className="text-gradient italic">Operação não pode esperar.</span>
      </>
    ),
    description: "Diagnóstico em horas, defesa documental, contestação Meta e BM stand-by ativada em 24h.",
    ctaLabel: "QUERO RECUPERAR MINHA BM",
  },
  featuredGuideSlugs: [
    "bloqueio-conta-anuncio-meta-como-evitar",
    "recuperar-bm-bloqueada-meta-ads",
    "trust-score-meta-ads-como-medir-aumentar",
  ],
};

// ============================================================
// REGISTRY
// ============================================================
export const productLandings: Record<string, ProductLandingData> = {
  "business-manager": businessManager,
  "bm-ilimitada": bmIlimitada,
  "perfis-facebook": perfisFacebook,
  "perfil-aged": perfilAged,
  "paginas-facebook": paginasFacebook,
  "dominios-verificados": dominiosVerificados,
  "whatsapp-cloud-api": whatsappCloudApi,
  "pixel-capi": pixelCapi,
  "aquecimento-contas": aquecimentoContas,
  "cartoes-bin-internacional": cartoesBin,
  "recuperacao-bm": recuperacaoBm,
};

export const productLandingSlugs = Object.keys(productLandings);
