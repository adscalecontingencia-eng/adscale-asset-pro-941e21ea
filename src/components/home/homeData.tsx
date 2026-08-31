import {
  Boxes,
  Building2,
  Flag,
  Layers,
  MessagesSquare,
  UserRound,
} from "lucide-react";
import type { HomeEventName } from "@/lib/homeAnalytics";

export const DISCLAIMER_META =
  "A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta.";

export const WA_MESSAGES = {
  profiles:
    "Olá! Vim pelo site da AD•SCALE e gostaria de consultar as opções de Perfis Facebook disponíveis.",
  bm: "Olá! Vim pelo site da AD•SCALE e gostaria de consultar as opções de Business Manager disponíveis.",
  pages: "Olá! Vim pelo site da AD•SCALE e gostaria de consultar opções de Páginas Facebook.",
  structures:
    "Olá! Vim pelo site da AD•SCALE e gostaria de informações sobre Combos e Estruturas.",
  managed:
    "Olá! Vim pelo site da AD•SCALE e gostaria de informações sobre Contas de Anúncios por acesso gerenciado.",
  api: "Olá! Vim pelo site da AD•SCALE e gostaria de consultar opções de BM para API Oficial.",
  unsure:
    "Olá! Vim pelo site da AD•SCALE e preciso de ajuda para entender qual estrutura é mais adequada para minha operação.",
  general:
    "Olá! Vim pelo site da AD•SCALE e gostaria de conhecer as estruturas disponíveis para minha operação de Meta Ads.",
} as const;

export type HomeCategory = {
  id: string;
  icon: typeof UserRound;
  title: string;
  description: string;
  concepts: string[];
  ctaLabel: string;
  /** Rota interna quando existe landing dedicada. */
  href?: string;
  /** Mensagem de WhatsApp quando o CTA vai direto para atendimento. */
  waMessage?: string;
  categoryEvent: HomeEventName;
  whatsappEvent: HomeEventName;
  analyticsCategory: string;
};

export const homeCategories: HomeCategory[] = [
  {
    id: "perfis",
    icon: UserRound,
    title: "Perfis Facebook",
    description:
      "Perfis para administrar ativos e compor diferentes estruturas de Meta Ads.",
    concepts: ["Perfil Facebook", "Perfil Facebook Antigo", "Perfis para estruturas"],
    ctaLabel: "Conhecer Perfis",
    href: "/perfis-facebook",
    categoryEvent: "homepage_category_profiles",
    whatsappEvent: "homepage_whatsapp_profiles",
    analyticsCategory: "perfis",
  },
  {
    id: "business-managers",
    icon: Building2,
    title: "Business Managers",
    description:
      "BMs para organizar Páginas, Contas de Anúncios, permissões e outros ativos dentro de operações Meta Ads.",
    concepts: ["Business Manager", "BM Verificada", "Diferentes configurações"],
    ctaLabel: "Conhecer BMs",
    href: "/business-manager",
    categoryEvent: "homepage_category_bm",
    whatsappEvent: "homepage_whatsapp_bm",
    analyticsCategory: "business_manager",
  },
  {
    id: "paginas",
    icon: Flag,
    title: "Páginas Facebook",
    description:
      "Páginas para compor estruturas comerciais, publicitárias e operacionais dentro do ecossistema Meta.",
    concepts: ["Página Facebook", "Página para estruturas", "Vínculo com BM"],
    ctaLabel: "Consultar Páginas",
    href: "/paginas-facebook",
    categoryEvent: "homepage_category_pages",
    whatsappEvent: "homepage_whatsapp_pages",
    analyticsCategory: "paginas",
  },
  {
    id: "estruturas",
    icon: Layers,
    title: "Combos e Estruturas",
    description:
      "Combinações de diferentes ativos para operações que precisam montar uma estrutura mais completa.",
    concepts: ["Perfil + BM", "Página vinculada", "Outros ativos conforme a configuração"],
    ctaLabel: "Consultar Estruturas",
    waMessage: WA_MESSAGES.structures,
    categoryEvent: "homepage_category_structures",
    whatsappEvent: "homepage_whatsapp_structures",
    analyticsCategory: "estruturas",
  },
  {
    id: "contas-gerenciadas",
    icon: Boxes,
    title: "Contas de Anúncios Gerenciadas",
    description:
      "Acesso gerenciado a contas de anúncios para operações que já possuem equipe responsável pelas campanhas.",
    concepts: ["Acesso gerenciado", "Operação conduzida pelo seu time", "Estrutura de apoio"],
    ctaLabel: "Consultar Contas",
    href: "/aluguel-de-contas-meta-ads",
    categoryEvent: "homepage_category_managed_accounts",
    whatsappEvent: "homepage_whatsapp_managed",
    analyticsCategory: "contas_gerenciadas",
  },
  {
    id: "bm-api",
    icon: MessagesSquare,
    title: "BM para API Oficial",
    description:
      "Business Managers voltadas para operações que utilizam integrações oficiais do WhatsApp, conforme características e disponibilidade da estrutura.",
    concepts: ["WhatsApp Cloud API", "API Oficial do WhatsApp", "Configurações variáveis"],
    ctaLabel: "Consultar BM para API",
    href: "/whatsapp-cloud-api",
    categoryEvent: "homepage_category_api",
    whatsappEvent: "homepage_whatsapp_api",
    analyticsCategory: "bm_api",
  },
];

export type FinderOption = {
  id: string;
  label: string;
  explanation: string;
  linkLabel?: string;
  href?: string;
  waMessage: string;
  whatsappEvent: HomeEventName;
  analyticsCategory: string;
};

export const finderOptions: FinderOption[] = [
  {
    id: "estrutura",
    label: "Quero montar uma estrutura para Meta Ads",
    explanation:
      "Uma estrutura combina perfil, Business Manager, página e conta de anúncios. A configuração adequada depende do estágio e do volume da sua operação.",
    linkLabel: "Ver Business Managers",
    href: "/business-manager",
    waMessage: WA_MESSAGES.structures,
    whatsappEvent: "homepage_whatsapp_structures",
    analyticsCategory: "estruturas",
  },
  {
    id: "perfil",
    label: "Quero um Perfil Facebook",
    explanation:
      "O perfil é o usuário que administra ativos dentro do ecossistema Meta e recebe permissões na Business Manager.",
    linkLabel: "Conhecer Perfis",
    href: "/perfis-facebook",
    waMessage: WA_MESSAGES.profiles,
    whatsappEvent: "homepage_whatsapp_profiles",
    analyticsCategory: "perfis",
  },
  {
    id: "bm",
    label: "Quero uma Business Manager",
    explanation:
      "A Business Manager é utilizada para organizar e controlar ativos empresariais como Páginas, Contas de Anúncios e permissões.",
    linkLabel: "Conhecer BMs",
    href: "/business-manager",
    waMessage: WA_MESSAGES.bm,
    whatsappEvent: "homepage_whatsapp_bm",
    analyticsCategory: "business_manager",
  },
  {
    id: "pagina",
    label: "Quero uma Página",
    explanation:
      "A Página é o ativo público vinculado às campanhas e à comunicação da operação dentro do ecossistema Meta.",
    linkLabel: "Consultar Páginas",
    href: "/paginas-facebook",
    waMessage: WA_MESSAGES.pages,
    whatsappEvent: "homepage_whatsapp_pages",
    analyticsCategory: "paginas",
  },
  {
    id: "conta",
    label: "Preciso de uma Conta de Anúncios",
    explanation:
      "A conta de anúncios é onde campanhas e investimento são gerenciados. Em acesso gerenciado, a operação das campanhas continua com o seu time.",
    linkLabel: "Ver contas gerenciadas",
    href: "/aluguel-de-contas-meta-ads",
    waMessage: WA_MESSAGES.managed,
    whatsappEvent: "homepage_whatsapp_managed",
    analyticsCategory: "contas_gerenciadas",
  },
  {
    id: "combo",
    label: "Preciso de Perfil + BM + Página",
    explanation:
      "Nesse caso a conversa é sobre combos e estruturas: um conjunto de ativos combinados conforme a necessidade operacional.",
    waMessage: WA_MESSAGES.structures,
    whatsappEvent: "homepage_whatsapp_structures",
    analyticsCategory: "estruturas",
  },
  {
    id: "api",
    label: "Preciso de BM para API Oficial",
    explanation:
      "Algumas Business Managers têm finalidade específica para operações que utilizam integrações oficiais do WhatsApp, como a Cloud API.",
    linkLabel: "Entender WhatsApp Cloud API",
    href: "/whatsapp-cloud-api",
    waMessage: WA_MESSAGES.api,
    whatsappEvent: "homepage_whatsapp_api",
    analyticsCategory: "bm_api",
  },
  {
    id: "nao-sei",
    label: "Não sei qual escolher",
    explanation:
      "Sem problema. Explique como sua operação funciona hoje e nossa equipe orienta quais tipos de estrutura podem fazer sentido.",
    waMessage: WA_MESSAGES.unsure,
    whatsappEvent: "homepage_whatsapp_unsure",
    analyticsCategory: "indefinido",
  },
];

export const homeFaqs = [
  {
    question: "O que a AD•SCALE oferece?",
    answer:
      "Infraestrutura e contingência para operações de Meta Ads: Perfis Facebook, Business Managers, Páginas, Contas de Anúncios por acesso gerenciado, combos e estruturas, além de BMs voltadas para integrações oficiais do WhatsApp.",
  },
  {
    question: "Qual a diferença entre Perfil Facebook e Business Manager?",
    answer:
      "O perfil é o usuário que administra ativos e recebe permissões. A Business Manager é o ambiente empresarial que organiza páginas, contas de anúncios, permissões e outros ativos.",
  },
  {
    question: "Perfil e Conta de Anúncios são a mesma coisa?",
    answer:
      "Não. O perfil é o usuário administrador. A conta de anúncios é o ativo dentro da Business Manager onde campanhas e investimento são gerenciados.",
  },
  {
    question: "O que é uma Business Manager?",
    answer:
      "É a estrutura empresarial do ecossistema Meta usada para centralizar páginas, contas de anúncios, pixels, domínios e permissões de equipe em um único ambiente.",
  },
  {
    question: "O que é um Perfil Facebook Antigo?",
    answer:
      "É um perfil com histórico anterior de existência e utilização na plataforma. Saiba mais na página de perfil Facebook antigo.",
  },
  {
    question: "O que são Combos e Estruturas?",
    answer:
      "São combinações de ativos — como perfil, BM e página — montadas para operações que precisam de uma estrutura mais completa. A composição varia conforme a configuração e a disponibilidade.",
  },
  {
    question: "Como funcionam as Contas de Anúncios Gerenciadas?",
    answer:
      "Funcionam por acesso gerenciado: a estrutura é disponibilizada para operações que já possuem equipe responsável pelas campanhas. A AD•SCALE não gerencia campanhas.",
  },
  {
    question: "O que significa BM para API Oficial?",
    answer:
      "São Business Managers voltadas para operações que utilizam integrações oficiais do WhatsApp, como a Cloud API, conforme características e disponibilidade da estrutura.",
  },
  {
    question: "A AD•SCALE gerencia campanhas?",
    answer:
      "Não. Fornecemos infraestrutura e orientação sobre os tipos de estrutura. A operação das campanhas permanece com o time do cliente.",
  },
  {
    question: "Como consultar disponibilidade?",
    answer:
      "Todo o atendimento comercial acontece pelo WhatsApp. Explique sua operação e a equipe apresenta as opções disponíveis no momento.",
  },
  {
    question: "Os preços são fixos?",
    answer:
      "Não. As condições variam conforme mercado, disponibilidade, tipo de ativo, quantidade e características da estrutura. Por isso a consulta é feita diretamente com a equipe.",
  },
  {
    question: "A AD•SCALE possui vínculo oficial com a Meta?",
    answer: DISCLAIMER_META,
  },
  {
    question: "Contingência elimina o risco de restrições?",
    answer:
      "Não. Restrições podem envolver diversos fatores relacionados ao negócio, aos ativos, às campanhas, às políticas e ao comportamento operacional. Contingência é organização de ativos para reduzir a dependência de um único ponto.",
  },
];
