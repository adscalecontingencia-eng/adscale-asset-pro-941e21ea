import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, ShieldAlert, Users, Building2, LayoutGrid, Target } from "lucide-react";
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

const FAQS = [
  {
    question: "O que é um perfil Facebook antigo?",
    answer:
      "É um perfil pessoal do Facebook que possui histórico anterior de existência e utilização — tempo de criação, atividade e conexões acumuladas ao longo dos anos.",
  },
  {
    question: "Perfil antigo e perfil aged são a mesma coisa?",
    answer:
      "Na prática, o mercado usa o termo aged para descrever perfis com histórico anterior. No Brasil, perfil antigo é a forma mais natural de se referir ao mesmo tipo de ativo.",
  },
  {
    question: "Perfil Facebook é a mesma coisa que conta de anúncios?",
    answer:
      "Não. O perfil representa o usuário que possui permissões de acesso. A conta de anúncios é o ativo onde campanhas e investimento em mídia são gerenciados, normalmente organizada dentro de uma Business Manager.",
  },
  {
    question: "Para que serve um perfil em uma estrutura de Meta Ads?",
    answer:
      "O perfil é o ponto de acesso e de permissão dentro da estrutura: ele pode administrar ou acessar Business Manager, páginas, contas de anúncio e demais ativos empresariais.",
  },
  {
    question: "Perfil antigo pode acessar uma Business Manager?",
    answer:
      "Sim, desde que receba as permissões adequadas dentro da Business Manager. A configuração de papéis e acessos depende da estrutura definida pela operação.",
  },
  {
    question: "Perfil Facebook antigo é garantia contra bloqueios?",
    answer:
      "Não. Nenhum perfil ou estrutura elimina totalmente o risco de restrições. Todos os ativos permanecem sujeitos às políticas e análises da plataforma.",
  },
  {
    question: "Qual a diferença entre perfil antigo e perfil novo?",
    answer:
      "O perfil antigo possui histórico anterior; o perfil novo possui histórico recente. A escolha depende da estrutura e das necessidades operacionais, e nenhum dos dois garante estabilidade automática.",
  },
  {
    question: "Como consultar os perfis disponíveis?",
    answer:
      "A disponibilidade e as características variam. Você pode consultar as opções atuais falando com a equipe da AD Scale pelo WhatsApp.",
  },
  {
    question: "Posso utilizar um perfil antigo em uma estrutura de contingência?",
    answer:
      "Sim. Perfis costumam compor estruturas de contingência junto de Business Managers, páginas e contas de anúncio, distribuindo acessos entre ativos diferentes.",
  },
  {
    question: "A AD Scale gerencia as campanhas?",
    answer:
      "A AD Scale fornece infraestrutura e ativos. A criação e gestão das campanhas permanecem sob responsabilidade do cliente ou do profissional contratado.",
  },
];

const breadcrumbItems = [
  { label: "Início", href: "/" },
  { label: "Perfis Facebook", href: "/perfis-facebook" },
  { label: "Perfil Facebook Antigo" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE}/perfil-facebook-antigo#webpage`,
      url: `${SITE}/perfil-facebook-antigo`,
      name: "Perfil Facebook Antigo para Anúncios | AD Scale",
      description:
        "Perfis Facebook antigos com histórico para operações de Meta Ads. Entenda características, diferenças e consulte opções disponíveis na AD Scale.",
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

const STRUCTURE = [
  { label: "Perfil Facebook", desc: "usuário com permissões de acesso" },
  { label: "Business Manager", desc: "organiza ativos, usuários e permissões" },
  { label: "Página", desc: "identidade pública usada nos anúncios" },
  { label: "Conta de anúncios", desc: "onde o investimento é gerenciado" },
  { label: "Campanhas", desc: "entrega e distribuição da mídia" },
];

const AUDIENCES = [
  { icon: Target, title: "Gestores de tráfego", text: "Profissionais que operam múltiplas contas e precisam organizar acessos." },
  { icon: Building2, title: "Agências", text: "Times que administram ativos de vários clientes na mesma estrutura." },
  { icon: Users, title: "Media buyers", text: "Operações que trabalham com volume e distribuem responsabilidades." },
  { icon: LayoutGrid, title: "E-commerces e geração de leads", text: "Operações contínuas que dependem de estrutura organizada." },
];

const PerfilFacebookAntigo = () => {
  const waPrimary = buildWhatsAppUrl({
    message: "Olá! Vim da página de Perfil Facebook Antigo e quero consultar disponibilidade.",
  });
  const waSecondary = buildWhatsAppUrl({
    message: "Olá! Vim da página de Perfil Facebook Antigo e quero falar com a equipe.",
  });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      <SEO
        title="Perfil Facebook Antigo para Anúncios | AD Scale"
        description="Perfis Facebook antigos com histórico para operações de Meta Ads. Entenda características, diferenças e consulte opções disponíveis na AD Scale."
        keywords={[
          "perfil facebook antigo",
          "perfil antigo facebook",
          "comprar perfil facebook antigo",
          "comprar perfil antigo",
          "perfil antigo para anúncios",
          "perfil facebook antigo para anúncios",
          "perfil antigo meta ads",
          "perfil com histórico",
          "perfil administrador",
          "perfil para business manager",
          "perfil para estrutura meta ads",
        ]}
        canonical="/perfil-facebook-antigo"
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
              Perfis Facebook com histórico
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
              Perfil Facebook Antigo para <span className="text-gradient">Meta Ads</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              Perfis Facebook com histórico para compor estruturas profissionais de anúncios, Business Managers e
              operações de contingência.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={waPrimary}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onWhatsAppClick({ ctaLabel: "Consultar disponibilidade", source: "perfil-facebook-antigo-hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar disponibilidade
              </a>
              <a
                href={waSecondary}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onWhatsAppClick({ ctaLabel: "Falar com a equipe", source: "perfil-facebook-antigo-hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold hover:border-primary/50 transition-colors"
              >
                Falar com a equipe
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground max-w-2xl">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
              Todos os ativos permanecem sujeitos às políticas, análises e sistemas da plataforma.
            </p>
          </header>

          {/* O QUE É */}
          <section aria-labelledby="o-que-e" className="mb-16">
            <h2 id="o-que-e" className="font-display text-2xl md:text-3xl font-bold mb-4">
              O que é um Perfil Facebook Antigo?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Um perfil Facebook antigo é um perfil que possui histórico anterior de existência e utilização. Ele
                acumulou tempo de criação, atividade e conexões antes de ser incorporado a uma operação de mídia.
              </p>
              <p>
                Dentro de uma estrutura de Meta Ads, esse perfil pode se relacionar com outros ativos empresariais:
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {["Business Manager", "Página", "Conta de anúncios", "Permissões", "Usuários", "Outros ativos empresariais"].map((i) => (
                  <li key={i} className="rounded-lg border border-border/50 bg-card/60 px-4 py-3 text-sm text-foreground">
                    {i}
                  </li>
                ))}
              </ul>
              <p className="rounded-lg border border-border/50 bg-card/60 p-4 text-sm">
                O histórico de um perfil não elimina o risco de restrições e não substitui uma operação compatível com
                as políticas da Meta.
              </p>
            </div>
          </section>

          {/* ANTIGO VS NOVO */}
          <section aria-labelledby="antigo-vs-novo" className="mb-16">
            <h2 id="antigo-vs-novo" className="font-display text-2xl md:text-3xl font-bold mb-4">
              Perfil Facebook Antigo vs Perfil Novo
            </h2>
            <div className="overflow-x-auto rounded-lg border border-border/50">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-card/80">
                  <tr>
                    <th className="text-left font-semibold p-4">Critério</th>
                    <th className="text-left font-semibold p-4">Perfil antigo</th>
                    <th className="text-left font-semibold p-4">Perfil novo</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border/50">
                    <td className="p-4 text-foreground font-medium">Histórico</td>
                    <td className="p-4">Possui histórico anterior</td>
                    <td className="p-4">Histórico recente</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="p-4 text-foreground font-medium">Uso</td>
                    <td className="p-4" colSpan={2}>
                      Depende da estrutura e do objetivo da operação
                    </td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="p-4 text-foreground font-medium">Contexto</td>
                    <td className="p-4" colSpan={2}>
                      Perfis podem exercer funções diferentes dentro de estruturas empresariais
                    </td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="p-4 text-foreground font-medium">Estabilidade</td>
                    <td className="p-4" colSpan={2}>
                      Nenhum dos dois possui garantia automática de estabilidade ou aprovação
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              A escolha depende da estrutura e das necessidades operacionais.
            </p>
          </section>

          {/* ANTIGO E AGED */}
          <section aria-labelledby="antigo-aged" className="mb-16">
            <h2 id="antigo-aged" className="font-display text-2xl md:text-3xl font-bold mb-4">
              Perfil Antigo e Perfil Aged são a mesma coisa?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                No mercado, o <Link to="/perfil-aged" className="text-primary hover:underline">termo aged utilizado no mercado</Link>{" "}
                normalmente é usado para descrever perfis com histórico anterior. No Brasil, “perfil antigo” é uma forma
                mais natural de se referir a esse tipo de perfil.
              </p>
              <p>
                Para entender especificamente o termo aged e suas características, consulte nosso guia de{" "}
                <Link to="/perfil-aged" className="text-primary hover:underline">Perfil Aged Facebook</Link>.
              </p>
            </div>
          </section>

          {/* PERFIL VS CONTA DE ANÚNCIOS */}
          <section aria-labelledby="perfil-vs-conta" className="mb-16">
            <h2 id="perfil-vs-conta" className="font-display text-2xl md:text-3xl font-bold mb-4">
              Perfil Facebook e Conta de Anúncios são a mesma coisa?
            </h2>
            <p className="text-muted-foreground mb-6">Não. São ativos diferentes dentro da mesma estrutura.</p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { t: "Perfil Facebook", d: "Representa o usuário que possui permissões para acessar determinados ativos." },
                { t: "Business Manager", d: "Estrutura utilizada para organizar ativos empresariais, permissões, páginas e contas." },
                { t: "Conta de anúncios", d: "Ativo onde campanhas e investimentos em mídia são efetivamente gerenciados." },
              ].map((c) => (
                <div key={c.t} className="rounded-lg border border-border/50 bg-card/60 p-5">
                  <h3 className="font-display text-lg font-semibold mb-2">{c.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
            <ol className="mt-6 flex flex-col gap-2 text-sm">
              {["Perfil", "Business Manager", "Conta de anúncios", "Campanhas"].map((s, i, arr) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 font-medium text-primary">{s}</span>
                  {i < arr.length - 1 && <span className="text-muted-foreground" aria-hidden>↓</span>}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              A estrutura pode variar dependendo da configuração da operação.
            </p>
          </section>

          {/* PERFIL + BM */}
          <section aria-labelledby="perfil-bm" className="mb-16">
            <h2 id="perfil-bm" className="font-display text-2xl md:text-3xl font-bold mb-4">
              Como o Perfil Facebook se relaciona com o Business Manager?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                O perfil pode receber permissões para acessar determinados ativos empresariais — páginas, contas de
                anúncio, pixels e catálogos organizados dentro da estrutura. Quem define o nível de acesso é a própria
                configuração da Business Manager.
              </p>
              <p>
                Se você ainda está organizando essa camada,{" "}
                <Link to="/business-manager" className="text-primary hover:underline">entenda como funciona uma Business Manager</Link>,{" "}
                veja a <Link to="/bm-verificada" className="text-primary hover:underline">estrutura de Business Manager verificada</Link> ou{" "}
                <Link to="/bm-ilimitada" className="text-primary hover:underline">conheça as opções de BM</Link> para operações de volume maior.
              </p>
            </div>
          </section>

          {/* ESTRUTURA META ADS */}
          <section aria-labelledby="estrutura" className="mb-16">
            <h2 id="estrutura" className="font-display text-2xl md:text-3xl font-bold mb-4">
              Onde o Perfil Antigo entra em uma estrutura de Meta Ads?
            </h2>
            <div className="grid gap-3">
              {STRUCTURE.map((s, i) => (
                <div key={s.label} className="rounded-lg border border-border/50 bg-card/60 p-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold">{s.label}</span>
                    <span className="text-sm text-muted-foreground">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Essa representação é simplificada — estruturas reais podem variar conforme a operação. Times que precisam
              distribuir esses ativos costumam avaliar uma{" "}
              <Link to="/contingencia-meta-ads" className="text-primary hover:underline">estrutura de contingência Meta Ads</Link>.
            </p>
          </section>

          {/* PARA QUEM */}
          <section aria-labelledby="para-quem" className="mb-16">
            <h2 id="para-quem" className="font-display text-2xl md:text-3xl font-bold mb-6">
              Para quem os Perfis Facebook Antigos podem fazer sentido?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {AUDIENCES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-lg border border-border/50 bg-card/60 p-5">
                  <Icon className="w-5 h-5 text-primary mb-3" aria-hidden />
                  <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Também faz sentido para empresas com múltiplos ativos de Meta Ads e operações que precisam organizar
              contingência. A adequação depende da estrutura e necessidade da operação.
            </p>
          </section>

          {/* DISPONIBILIDADE */}
          <section aria-labelledby="disponibilidade" className="mb-16 rounded-xl border border-primary/25 bg-card/60 p-6 md:p-8">
            <h2 id="disponibilidade" className="font-display text-2xl md:text-3xl font-bold mb-3">
              Consulte Perfis Facebook Antigos Disponíveis
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              As características e a disponibilidade podem variar. Consulte as opções atuais para encontrar a estrutura
              adequada à sua operação.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href={waPrimary}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onWhatsAppClick({ ctaLabel: "Consultar disponibilidade", source: "perfil-facebook-antigo-oferta" })}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar disponibilidade
              </a>
              <Link
                to="/perfis-facebook"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold hover:border-primary/50 transition-colors"
              >
                Ver opções de perfis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq" className="mb-8">
            <h2 id="faq" className="font-display text-2xl md:text-3xl font-bold mb-6">
              Perguntas frequentes sobre perfil Facebook antigo
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.question} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

        </div>
      </main>

      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
};

export default PerfilFacebookAntigo;
