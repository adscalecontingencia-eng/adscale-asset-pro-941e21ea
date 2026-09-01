import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  ShieldAlert,
  Building2,
  Users,
  Cog,
  Headphones,
  Server,
  Boxes,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildWhatsAppUrl, onWhatsAppClick } from "@/lib/whatsapp";

const SITE = "https://www.adscalecontingencia.com";

/** Eventos de analytics desta landing (gtag GA4 / Google Ads). */
function trackApiEvent(
  event: string,
  params: { bm_type?: string; cta_location?: string }
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("event", event, {
    bm_type: params.bm_type,
    cta_location: params.cta_location,
    page_path: window.location.pathname || "/whatsapp-cloud-api",
    transport_type: "beacon",
  });
}

type BmOption = {
  id: string;
  title: string;
  profile: string;
  description: string;
  idealFor: string;
  note?: string;
  event: string;
  waMessage: string;
  ctaLabel: string;
};

const BM_OPTIONS: BmOption[] = [
  {
    id: "bm250",
    title: "BM 250",
    profile: "Entrada / menor capacidade",
    description:
      "Opção de entrada para operações que precisam de uma estrutura com capacidade inicial.",
    idealFor: "Operações menores ou em início de estruturação.",
    note: "Consulte a configuração disponível.",
    event: "whatsapp_api_bm250",
    ctaLabel: "Consultar BM 250",
    waMessage:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e gostaria de consultar disponibilidade da BM 250.",
  },
  {
    id: "bm2k",
    title: "BM 2K",
    profile: "Operação em crescimento",
    description:
      "Estrutura com capacidade superior à opção inicial, indicada para operações que precisam de maior volume.",
    idealFor: "Operações em crescimento que já possuem rotina de mensageria.",
    note: "Consulte a configuração disponível.",
    event: "whatsapp_api_bm2k",
    ctaLabel: "Consultar BM 2K",
    waMessage:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e gostaria de consultar disponibilidade da BM 2K.",
  },
  {
    id: "bm10k",
    title: "BM 10K",
    profile: "Maior volume",
    description:
      "Opção voltada para operações que precisam trabalhar com uma capacidade maior dentro da estrutura.",
    idealFor: "Times com volume constante de mensagens e integrações.",
    note: "Consulte a configuração disponível.",
    event: "whatsapp_api_bm10k",
    ctaLabel: "Consultar BM 10K",
    waMessage:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e gostaria de consultar disponibilidade da BM 10K.",
  },
  {
    id: "bm100k",
    title: "BM 100K",
    profile: "Alto volume",
    description: "Estrutura voltada para operações de maior volume.",
    idealFor: "Operações de alto volume com processos já estabelecidos.",
    note: "Consulte disponibilidade e características da estrutura atual.",
    event: "whatsapp_api_bm100k",
    ctaLabel: "Consultar BM 100K",
    waMessage:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e gostaria de consultar disponibilidade da BM 100K.",
  },
  {
    id: "bm_unlimited",
    title: "BM Ilimitada",
    profile: "Configuração específica de maior capacidade",
    description:
      "Categoria de BM com configuração específica para operações de maior capacidade. Consulte com nossa equipe exatamente quais características estão disponíveis.",
    idealFor: "Operações que buscam uma configuração específica de maior capacidade.",
    note: "O nome da categoria não representa promessa de uso irrestrito ou ausência de limitações da plataforma.",
    event: "whatsapp_api_bm_unlimited",
    ctaLabel: "Consultar BM Ilimitada",
    waMessage:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e gostaria de consultar disponibilidade da BM Ilimitada.",
  },
  {
    id: "bm_balao",
    title: "BM Balão",
    profile: "Estrutura específica — consulte características",
    description:
      "Estrutura específica disponível na AD•SCALE. Consulte nossa equipe para verificar características, finalidade e disponibilidade atual.",
    idealFor: "Operações que já conhecem esse tipo de estrutura ou querem entender a finalidade.",
    event: "whatsapp_api_bm_balao",
    ctaLabel: "Consultar BM Balão",
    waMessage:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e gostaria de consultar disponibilidade e características da BM Balão.",
  },
];

const FAQS = [
  {
    question: "O que é uma BM para WhatsApp Cloud API?",
    answer:
      "BM é a abreviação de Business Manager: a estrutura empresarial usada para organizar ativos e acessos dentro do ecossistema da Meta. Em operações que utilizam a WhatsApp Cloud API, essa estrutura empresarial é usada em conjunto com os demais componentes necessários para operar a WhatsApp Business Platform.",
  },
  {
    question: "Quais BMs a AD•SCALE oferece?",
    answer:
      "Trabalhamos com as categorias BM 250, BM 2K, BM 10K, BM 100K, BM Ilimitada e BM Balão. As características e a disponibilidade de cada estrutura devem ser confirmadas com a equipe antes da contratação.",
  },
  {
    question: "Qual a diferença entre BM 250, 2K, 10K e 100K?",
    answer:
      "São categorias comerciais que indicam diferentes níveis de capacidade e configuração de estrutura. Não são etapas obrigatórias: são opções distintas, e a configuração atual de cada uma deve ser confirmada com a equipe.",
  },
  {
    question: "O que é BM Ilimitada?",
    answer:
      "É a denominação comercial de uma categoria de BM com configuração específica para operações de maior capacidade. O nome não representa promessa de envios ilimitados nem de ausência de limitações das plataformas da Meta.",
  },
  {
    question: "O que é BM Balão?",
    answer:
      "É uma estrutura específica disponível na AD•SCALE. Consulte nossa equipe para verificar características, finalidade e disponibilidade atual.",
  },
  {
    question: "A BM já vem com número de WhatsApp?",
    answer:
      "Não presuma que exista um número incluído. A configuração de cada estrutura deve ser confirmada com nossa equipe antes da contratação.",
  },
  {
    question: "A BM já vem com templates aprovados?",
    answer:
      "Não prometemos templates aprovados como característica padrão das BMs. Consulte a configuração disponível.",
  },
  {
    question: "BM e WABA são a mesma coisa?",
    answer:
      "Não. A Business Manager é a estrutura empresarial que organiza ativos e acessos. A WABA (WhatsApp Business Account) é a conta usada dentro da WhatsApp Business Platform. São componentes diferentes da mesma estrutura.",
  },
  {
    question: "A BM já vem conectada a um CRM?",
    answer:
      "Não presuma que exista CRM, disparador ou software externo configurado. Esses elementos devem ser confirmados individualmente quando aplicável.",
  },
  {
    question: "Como saber qual BM preciso?",
    answer:
      "Depende do volume e da estrutura da sua operação. Nossa equipe pode ajudar a comparar as opções disponíveis.",
  },
  {
    question: "Como consultar disponibilidade?",
    answer:
      "Fale com a equipe da AD•SCALE pelo WhatsApp. Verificamos quais estruturas estão disponíveis no momento e quais são as características de cada uma.",
  },
  {
    question: "A AD•SCALE é parceira oficial da Meta?",
    answer:
      "Não. A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta.",
  },
];

const breadcrumbItems = [
  { label: "Início", href: "/" },
  { label: "WhatsApp Cloud API" },
];

const TITLE = "WhatsApp Cloud API + BM Verificada | AD Scale";
const DESCRIPTION =
  "Business Managers para operações que utilizam a WhatsApp Cloud API: BM 250, 2K, 10K, 100K, Ilimitada e Balão. Consulte disponibilidade e configuração.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE}/whatsapp-cloud-api#webpage`,
      url: `${SITE}/whatsapp-cloud-api`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.label,
        ...(b.href ? { item: `${SITE}${b.href}` } : {}),
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const STEPS = [
  {
    n: "01",
    title: "Escolha a opção",
    text: "Veja as BMs disponíveis ou informe sua necessidade.",
  },
  {
    n: "02",
    title: "Consulte disponibilidade",
    text: "Nossa equipe verifica quais estruturas estão disponíveis no momento.",
  },
  {
    n: "03",
    title: "Confirme as características",
    text: "Antes da contratação, você recebe as informações da configuração escolhida.",
  },
  {
    n: "04",
    title: "Siga o processo comercial",
    text: "Após a confirmação, nossa equipe orienta os próximos passos.",
  },
];

const AUDIENCES = [
  { icon: Building2, title: "Empresas", text: "Negócios que usam o WhatsApp como canal de comunicação com clientes." },
  { icon: Users, title: "Agências", text: "Times que estruturam operações de mensageria para vários clientes." },
  { icon: Headphones, title: "Times de atendimento", text: "Operações de suporte e atendimento que precisam de estrutura organizada." },
  { icon: Boxes, title: "Operações de CRM", text: "Times que conectam o WhatsApp a um CRM ou plataforma de atendimento." },
  { icon: Server, title: "Desenvolvedores e integradores", text: "Quem implementa integrações com a WhatsApp Business Platform." },
  { icon: Cog, title: "Mensageria empresarial", text: "Operações que precisam integrar sistemas ao WhatsApp de forma profissional." },
];

const STACK = [
  { label: "Empresa", desc: "sua operação" },
  { label: "Business Manager (BM)", desc: "organiza ativos e acessos na Meta" },
  { label: "WhatsApp Business / WABA", desc: "conta usada na WhatsApp Business Platform" },
  { label: "Número", desc: "linha associada à conta" },
  { label: "Cloud API", desc: "interface oficial de integração" },
  { label: "Sistema / CRM / automação", desc: "onde as mensagens são operadas" },
];

const WhatsappCloudApi = () => {
  const waHero = buildWhatsAppUrl({
    message:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e gostaria de consultar disponibilidade das BMs.",
    category: "bm_api",
    cta: "whatsapp_api_hero",
  });
  const waHelp = buildWhatsAppUrl({
    message:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e preciso de ajuda para escolher a BM adequada para minha operação.",
    category: "bm_api",
    cta: "whatsapp_api_help_choose",
  });
  const waFinal = buildWhatsAppUrl({
    message:
      "Olá! Vim pela página de WhatsApp Cloud API da AD•SCALE e gostaria de falar com a equipe sobre as estruturas disponíveis.",
    category: "bm_api",
    cta: "whatsapp_api_final",
  });

  const handleClick = (event: string, bmType: string, location: string, label: string) => {
    trackApiEvent(event, { bm_type: bmType, cta_location: location });
    onWhatsAppClick({
      ctaLabel: label,
      source: "whatsapp-cloud-api",
      category: "bm_api",
      ctaId: event,
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        keywords={[
          "whatsapp cloud api",
          "bm para whatsapp api",
          "business manager whatsapp",
          "bm verificada",
          "api oficial do whatsapp",
          "whatsapp business platform",
          "waba",
          "whatsapp api",
          "integração whatsapp",
          "estrutura whatsapp",
        ]}
        canonical="/whatsapp-cloud-api"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-28 md:pt-32 pb-20">
        <div className="container max-w-5xl px-4">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          {/* HERO */}
          <header className="mb-16">
            <span className="badge-pill mb-4 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Business Manager para API Oficial do WhatsApp
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
              BM Verificada e WABA para{" "}
              <span className="text-gradient">WhatsApp Cloud API</span> que escala.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              Business Managers para operações que utilizam a API Oficial do WhatsApp, com diferentes
              capacidades e configurações conforme disponibilidade.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mt-3">
              Escolha entre BM 250, 2K, 10K, 100K, Ilimitada e BM Balão e consulte nossa equipe para
              verificar a opção disponível para sua operação.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={waHero}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick("whatsapp_api_hero", "geral", "hero", "Consultar disponibilidade")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar disponibilidade
              </a>
              <a
                href="#bms-disponiveis"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold hover:border-primary/50 transition-colors"
              >
                Entender as opções
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground max-w-2xl">
              <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
              As características de cada estrutura podem variar conforme disponibilidade.
            </p>
          </header>

          {/* O QUE É UMA BM */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              O que é uma BM para WhatsApp Cloud API?
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed max-w-3xl">
              <p>
                BM é a abreviação de Business Manager. Ela faz parte da estrutura empresarial utilizada
                para organizar ativos e acessos dentro do ecossistema da Meta.
              </p>
              <p>
                Em operações com WhatsApp Cloud API, a estrutura empresarial é utilizada em conjunto com
                os recursos necessários para operar a WhatsApp Business Platform.
              </p>
              <p>
                Na AD•SCALE existem diferentes opções de BM, com características e capacidades diferentes.
              </p>
              <p className="text-foreground">
                Você não precisa saber exatamente qual escolher. Nossa equipe pode ajudar a identificar a
                opção adequada.
              </p>
            </div>

            <a
              href={waHelp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick("whatsapp_api_help_choose", "indefinido", "explicacao", "Preciso de ajuda para escolher")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              Preciso de ajuda para escolher
            </a>

            {/* Caixa: BM não é a mesma coisa que... */}
            <div className="mt-10 rounded-xl border border-border bg-card/50 p-6">
              <h3 className="font-display text-lg font-bold mb-3">
                BM não é a mesma coisa que:
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                {[
                  "número de WhatsApp",
                  "template de mensagem",
                  "WABA (conta do WhatsApp Business)",
                  "software de disparo",
                  "CRM",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                A Business Manager é uma parte da estrutura. Outros componentes podem ser necessários
                dependendo da operação.
              </p>
            </div>
          </section>

          {/* BMs DISPONÍVEIS */}
          <section id="bms-disponiveis" className="mb-16 scroll-mt-28">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              BMs disponíveis para WhatsApp Cloud API
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Trabalhamos com diferentes configurações de Business Manager. Consulte disponibilidade e
              características atuais antes da contratação.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BM_OPTIONS.map((bm) => (
                <article
                  key={bm.id}
                  className="flex flex-col rounded-xl border border-border bg-card/50 p-6 hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-display text-xl font-bold">{bm.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-primary">{bm.profile}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{bm.description}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">Ideal para: </span>
                    {bm.idealFor}
                  </p>
                  {bm.note && (
                    <p className="mt-3 text-xs text-muted-foreground/80">{bm.note}</p>
                  )}
                  <a
                    href={buildWhatsAppUrl({ message: bm.waMessage, category: "bm_api", cta: bm.event })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleClick(bm.event, bm.id, "card_bm", bm.ctaLabel)}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/40 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {bm.ctaLabel}
                  </a>
                </article>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground max-w-3xl">
              As opções acima são estruturas diferentes e não representam etapas obrigatórias. Todos os
              ativos permanecem sujeitos às políticas, análises e limitações das plataformas da Meta.
            </p>
          </section>

          {/* QUAL BM ESCOLHER */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Qual BM é mais adequada para minha operação?
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card/60">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Opção</th>
                    <th className="px-4 py-3 text-left font-semibold">Perfil geral</th>
                  </tr>
                </thead>
                <tbody>
                  {BM_OPTIONS.map((bm) => (
                    <tr key={bm.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium">{bm.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{bm.profile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-3xl">
              Essa comparação é apenas uma orientação inicial. A configuração e disponibilidade de cada
              ativo devem ser confirmadas antes da contratação.
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-3xl">
              <span className="text-foreground font-medium">Tier, ou capacidade de envio</span>, é uma
              forma utilizada no mercado para diferenciar estruturas com volumes diferentes. Cap é o
              limite associado a essa capacidade.
            </p>
            <a
              href={waHelp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick("whatsapp_api_help_choose", "indefinido", "tabela_comparativa", "Me ajude a escolher")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              Me ajude a escolher
            </a>
          </section>

          {/* O QUE ESTÁ INCLUÍDO */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">O que está incluído?</h2>
            <div className="space-y-2 text-muted-foreground leading-relaxed max-w-3xl">
              <p>As características podem variar de acordo com a BM disponível.</p>
              <p>
                Antes da contratação, nossa equipe informa exatamente a configuração do ativo.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card/50 p-6">
                <h3 className="font-display text-lg font-bold mb-4">Você deve confirmar</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Tipo de BM",
                    "Capacidade/configuração",
                    "Situação atual da estrutura",
                    "Ativos associados, caso existam",
                    "Condições comerciais",
                    "Disponibilidade",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card/50 p-6">
                <h3 className="font-display text-lg font-bold mb-4">Não presuma que está incluído</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "número de WhatsApp",
                    "template aprovado",
                    "WABA",
                    "CRM",
                    "disparador",
                    "software externo",
                    "configuração de campanhas",
                    "gestão da operação",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  A inclusão desses elementos deve ser confirmada individualmente quando aplicável.
                </p>
              </div>
            </div>
          </section>

          {/* COMO FUNCIONA */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Como funciona?</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <div key={s.n} className="rounded-xl border border-border bg-card/50 p-5">
                  <span className="font-display text-2xl font-bold text-primary">{s.n}</span>
                  <h3 className="mt-2 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
            <a
              href={waHero}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick("whatsapp_api_hero", "geral", "como_funciona", "Consultar disponibilidade")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar disponibilidade
            </a>
          </section>

          {/* PARA QUEM É */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Para quem essas estruturas podem fazer sentido?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AUDIENCES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-border bg-card/50 p-5">
                  <Icon className="w-5 h-5 text-primary" aria-hidden />
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* O QUE É CLOUD API */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              O que é WhatsApp Cloud API?
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed max-w-3xl">
              <p>
                A WhatsApp Cloud API faz parte da WhatsApp Business Platform e permite que empresas
                conectem o WhatsApp a sistemas, plataformas de atendimento, automações e outras
                integrações.
              </p>
              <p>
                Para utilizar esse ecossistema profissional, diferentes componentes podem fazer parte da
                estrutura. A Business Manager é um deles.
              </p>
            </div>

            <ol className="mt-8 space-y-2 max-w-xl">
              {STACK.map((s, i) => (
                <li key={s.label} className="rounded-lg border border-border bg-card/50 px-4 py-3">
                  <span className="text-xs text-primary font-mono mr-2">{i + 1}</span>
                  <span className="font-semibold">{s.label}</span>
                  <span className="block text-sm text-muted-foreground mt-0.5">{s.desc}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              Essa representação é simplificada e a configuração pode variar.
            </p>
          </section>

          {/* BM x WABA */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              BM e WABA são a mesma coisa?
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed max-w-3xl">
              <p className="text-foreground font-medium">Não.</p>
              <p>
                A Business Manager é a estrutura empresarial que organiza ativos e acessos. A WABA
                (WhatsApp Business Account) é a conta usada dentro da WhatsApp Business Platform. São
                componentes diferentes.
              </p>
              <ul className="space-y-1">
                <li>Número de WhatsApp não é BM.</li>
                <li>Template de mensagem não é BM.</li>
                <li>Cloud API não é BM.</li>
              </ul>
            </div>
          </section>

          {/* LINK PARA O PILAR */}
          <section className="mb-16 rounded-xl border border-border bg-card/50 p-6">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
              Quer entender a parte técnica?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Veja nossos conteúdos sobre WhatsApp Cloud API, Business Manager, WABA e estrutura de
              mensageria.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/blog/pilar/whatsapp-api"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/40 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Guia sobre WhatsApp Cloud API
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/business-manager"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary/50 transition-colors"
              >
                Business Manager
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/bm-verificada"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary/50 transition-colors"
              >
                BM Verificada
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA FINAL */}
          <section className="rounded-2xl border border-border bg-card/50 p-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Consulte a estrutura disponível para sua operação
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa equipe verifica quais BMs estão disponíveis e informa as características antes da
              contratação.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waFinal}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick("whatsapp_api_final", "geral", "cta_final", "Consultar disponibilidade")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar disponibilidade
              </a>
              <a
                href={waFinal}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick("whatsapp_api_final", "geral", "cta_final_secundario", "Falar com a equipe")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold hover:border-primary/50 transition-colors"
              >
                Falar com a equipe
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="mt-6 flex items-start justify-center gap-2 text-xs text-muted-foreground">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
              A AD•SCALE é uma empresa independente e não possui vínculo oficial com a Meta. Todos os
              ativos permanecem sujeitos às políticas, análises e limitações das plataformas da Meta.
            </p>
          </section>
        </div>
      </main>

      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
};

export default WhatsappCloudApi;
