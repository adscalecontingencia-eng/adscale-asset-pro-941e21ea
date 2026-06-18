import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle, Calculator, Shield, Wallet, BarChart3, Users, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FAQSection, { type FAQItem } from "@/components/FAQSection";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const INITIAL_CREDIT_USD = 240;

const faqs: FAQItem[] = [
  { question: "Existe mensalidade?", answer: "Não cobramos mensalidade fixa pelo aluguel da estrutura. A cobrança é baseada em uma comissão inicial de 5% sobre o valor efetivamente investido em anúncios." },
  { question: "Existem taxas extras?", answer: "A AD Scale não cobra taxas adicionais ocultas. Todas as condições são apresentadas antes do início. Eventuais impostos, custos bancários ou tarifas de terceiros, quando aplicáveis, devem ser informados separadamente." },
  { question: "O que são os US$ 240 iniciais?", answer: "É um crédito operacional utilizado para iniciar a estrutura e abater as primeiras comissões. O valor não é perdido nem cobrado novamente como uma taxa separada." },
  { question: "Quando começo a pagar a comissão?", answer: "A comissão é calculada desde o início, mas descontada do crédito de US$ 240. Novos pagamentos começam somente quando todo o crédito for utilizado." },
  { question: "Como o crédito é descontado?", answer: "A cada período, calculamos a comissão sobre o valor investido em anúncios e abatemos esse valor do saldo disponível." },
  { question: "A comissão pode ser menor que 5%?", answer: "Sim. Dependendo do volume de investimento, metas, histórico e condições comerciais, a taxa poderá ser reduzida e chegar a até 1%." },
  { question: "Todos recebem a taxa de 1%?", answer: "Não. A taxa de 1% não é automática. Ela depende da elegibilidade da operação e deve ser formalizada em uma proposta ou contrato." },
  { question: "O que está incluído?", answer: "A estrutura poderá incluir contas de agência, páginas antigas, onboarding, suporte e acesso ao sistema ou relatório de gestão, conforme o plano contratado." },
  { question: "As páginas antigas garantem aprovação?", answer: "Não. A idade de uma página não garante aprovação de anúncios, desempenho ou ausência de restrições." },
  { question: "A conta nunca será restringida?", answer: "Não. Nenhuma empresa independente pode garantir que uma conta nunca será revisada, restringida ou desativada pela Meta." },
  { question: "Como acompanho os valores?", answer: "A operação é acompanhada por um sistema de gestão, painel, relatório ou canal definido no onboarding, mostrando investimento, comissão e saldo do crédito." },
  { question: "Posso solicitar mais contas?", answer: "Sim, conforme a necessidade, análise, disponibilidade e condições comerciais." },
  { question: "Existe contrato?", answer: "Sim. As condições de acesso, comissão, crédito, cancelamento, suporte e responsabilidades devem ser formalizadas." },
  { question: "A AD Scale é parceira oficial da Meta?", answer: "Não. A AD Scale é uma prestadora independente e não é afiliada, patrocinada ou endossada pela Meta Platforms, Inc." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Aluguel de Contas Meta Ads",
      serviceType: "Aluguel de contas de agência e estrutura para Meta Ads",
      provider: { "@type": "Organization", name: "AD Scale" },
      areaServed: "BR",
      description:
        "Aluguel de contas de agência, páginas antigas e estrutura gerenciada para Meta Ads. Comissão inicial de 5% sobre o investimento, sem mensalidade fixa, com crédito inicial de US$ 240 abatido das primeiras comissões.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const valueCards = [
  { icon: Wallet, title: "Pague conforme investir", text: "A comissão é calculada sobre o investimento realizado em mídia." },
  { icon: Check, title: "Sem mensalidade", text: "Não existe uma cobrança fixa mensal da AD Scale." },
  { icon: Users, title: "Estrutura para agências", text: "Acesso a contas de agência e soluções para operações com múltiplos clientes." },
  { icon: FileText, title: "Páginas antigas", text: "Disponibilidade de páginas antigas para anunciantes, conforme análise, finalidade e disponibilidade." },
  { icon: Shield, title: "Crédito aproveitado", text: "O crédito inicial de US$ 240 é convertido em saldo para abater as primeiras comissões." },
  { icon: BarChart3, title: "Controle da operação", text: "Acompanhe o investimento, o crédito e os pagamentos por meio do sistema ou relatório disponibilizado." },
];

const steps = [
  { t: "Análise da operação", d: "Entendemos o modelo de negócio, o investimento mensal, os clientes atendidos e a quantidade de contas necessária." },
  { t: "Definição da estrutura", d: "Selecionamos a configuração mais adequada, incluindo contas de agência, páginas e formato de acesso." },
  { t: "Crédito inicial", d: "O cliente disponibiliza US$ 240 para iniciar a operação. Esse valor se transforma em crédito para abater as primeiras comissões." },
  { t: "Início dos anúncios", d: "A operação começa e a comissão padrão de 5% é calculada sobre o valor efetivamente investido em anúncios." },
  { t: "Abatimento automático", d: "Enquanto houver crédito, as comissões são descontadas desse saldo. Nenhum novo pagamento de comissão é necessário nesse período." },
  { t: "Pagamentos posteriores", d: "Depois que o crédito terminar, as comissões passam a ser pagas normalmente. Dependendo do volume e das metas, a taxa poderá ser reduzida para até 1%." },
];

const presets = [1000, 5000, 10000, 25000, 50000];

const AluguelContasMetaAds = () => {
  const [spend, setSpend] = useState<number>(10000);

  const sim = useMemo(() => {
    const commission = +(spend * 0.05).toFixed(2);
    const coveredByCredit = Math.min(commission, INITIAL_CREDIT_USD);
    const remainingCredit = Math.max(0, INITIAL_CREDIT_USD - commission);
    const toPay = Math.max(0, commission - INITIAL_CREDIT_USD);
    const reducedCommission = +(spend * 0.01).toFixed(2);
    const savings = +(commission - reducedCommission).toFixed(2);
    return { commission, coveredByCredit, remainingCredit, toPay, reducedCommission, savings };
  }, [spend]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      <SEO
        title="Aluguel de Contas Meta Ads e BM de Agência | Sem Mensalidade"
        description="Alugue contas de agência Meta Ads e BM sem mensalidade: comissão de 5% sobre investimento, crédito de US$ 240 e taxa reduzida até 1% por metas."
        keywords={[
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
        ]}
        canonical="/aluguel-de-contas-meta-ads"
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* HERO */}
      <section className="section-padding pt-32">
        <div className="container max-w-5xl text-center">
          <p className="text-xs md:text-sm font-semibold tracking-widest text-primary uppercase mb-4">
            Contas de agência para operações que precisam escalar
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            Aluguel de Contas Meta Ads <span className="text-gradient">sem mensalidade</span> e com pagamento por investimento
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Tenha acesso a contas de agência, páginas antigas e estruturas gerenciadas. Você paga uma comissão inicial de 5% sobre o valor investido, sem mensalidade e sem cobranças extras da AD Scale.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8 text-sm">
            {["Comissão inicial de 5%", "Taxa que pode chegar a 1%", "Sem mensalidade fixa", "Crédito inicial revertido em comissão", "Contas de agência", "Páginas antigas", "Sistema de gestão"].map((b) => (
              <span key={b} className="px-3 py-1 rounded-full bg-card border border-border/50 text-muted-foreground">{b}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" data-cta="hero_consultar">
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                Consultar disponibilidade <ArrowRight className="ml-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#como-funciona">Entender como funciona</a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            A redução da taxa depende do volume, das metas e das condições comerciais da operação.
          </p>
        </div>
      </section>

      {/* PROPOSTA DE VALOR */}
      <section className="section-padding bg-card/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Pare de comprar contas, configurar estruturas e <span className="text-gradient">começar tudo de novo</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Com o aluguel de contas da AD Scale, sua operação utiliza estruturas já organizadas, com contas de agência, páginas antigas para anunciantes, suporte e acompanhamento. O custo acompanha o valor efetivamente investido em anúncios.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {valueCards.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="bg-card border-border/50">
                <CardContent className="p-6">
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CRÉDITO US$ 240 */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Crédito inicial</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              US$ 240 que viram <span className="text-gradient">crédito da operação</span>
            </h2>
          </div>
          <Card className="bg-card border-primary/30">
            <CardContent className="p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Para iniciar, disponibilizamos a estrutura mediante um crédito operacional de <strong className="text-foreground">US$ 240</strong>. Esse valor não é perdido e não representa uma cobrança adicional separada. Ele é integralmente utilizado para abater as primeiras comissões da operação.
              </p>
              <p>
                Enquanto o crédito tiver saldo, você continua anunciando sem realizar novos pagamentos de comissão. As cobranças começam somente depois que o crédito inicial for totalmente utilizado.
              </p>
            </CardContent>
          </Card>

          {/* Exemplo prático */}
          <h3 className="font-display text-2xl md:text-3xl font-bold mt-12 mb-6 text-center">
            Veja como o crédito inicial funciona na prática
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: "Exemplo 1 — Comissão de 5%", l: [["Investido em anúncios", "US$ 1.000"], ["Comissão 5%", "US$ 50"], ["Saldo inicial", "US$ 240"], ["Crédito restante", "US$ 190"]], n: "Sem novo pagamento." },
              { t: "Exemplo 2 — Continuação", l: [["Investido adicional", "US$ 2.000"], ["Comissão 5%", "US$ 100"], ["Crédito anterior", "US$ 190"], ["Novo saldo", "US$ 90"]], n: "Ainda sem pagamento." },
              { t: "Exemplo 3 — Finalização", l: [["Investido adicional", "US$ 2.000"], ["Comissão 5%", "US$ 100"], ["Crédito disponível", "US$ 90"], ["A pagar", "US$ 10"]], n: "Próximas comissões pagas normalmente." },
            ].map((ex) => (
              <Card key={ex.t} className="bg-card border-border/50">
                <CardContent className="p-6">
                  <h4 className="font-display font-semibold mb-4">{ex.t}</h4>
                  <ul className="space-y-2 text-sm mb-4">
                    {ex.l.map(([k, v]) => (
                      <li key={k} className="flex justify-between border-b border-border/30 pb-1">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="font-semibold text-foreground">{v}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-primary">{ex.n}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4 italic">
            Os exemplos são meramente ilustrativos. O cálculo real será baseado no investimento registrado, na taxa contratada e nas condições comerciais da operação.
          </p>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="section-padding bg-card/30">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <Calculator className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Simule sua operação
            </h2>
            <p className="text-muted-foreground">Quanto você pretende investir em anúncios por mês?</p>
          </div>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSpend(p)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-colors ${spend === p ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border/50 hover:border-primary/40"}`}
                  >
                    US$ {p.toLocaleString("en-US")}
                  </button>
                ))}
              </div>

              <div className="max-w-sm mx-auto mb-8">
                <Label htmlFor="custom" className="mb-2 block text-center">Valor personalizado (US$)</Label>
                <Input
                  id="custom"
                  type="number"
                  min={0}
                  value={spend}
                  onChange={(e) => setSpend(Math.max(0, Number(e.target.value) || 0))}
                  className="text-center text-lg"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2 text-sm">
                {[
                  ["Investimento mensal", `US$ ${spend.toLocaleString("en-US")}`],
                  ["Comissão estimada (5%)", `US$ ${sim.commission.toLocaleString("en-US")}`],
                  ["Crédito inicial", `US$ ${INITIAL_CREDIT_USD}`],
                  ["Coberto pelo crédito (1º mês)", `US$ ${sim.coveredByCredit.toLocaleString("en-US")}`],
                  ["Crédito restante após 1º mês", `US$ ${sim.remainingCredit.toLocaleString("en-US")}`],
                  ["A pagar após esgotar o crédito", `US$ ${sim.toPay.toLocaleString("en-US")}`],
                  ["Comissão se reduzida para 1%", `US$ ${sim.reducedCommission.toLocaleString("en-US")}`],
                  ["Economia potencial com taxa reduzida", `US$ ${sim.savings.toLocaleString("en-US")}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between bg-background border border-border/40 rounded-lg px-4 py-3">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold text-foreground">{v}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6 italic">
                Esta simulação não representa proposta comercial definitiva. A taxa final e as condições dependem da análise da operação.
              </p>

              <div className="text-center mt-6">
                <Button asChild size="lg" data-cta="calculadora_simulacao">
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    Receber uma simulação <ArrowRight className="ml-1" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="section-padding">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Como funciona o <span className="text-gradient">aluguel de contas</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {steps.map((s, i) => (
              <Card key={s.t} className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{i + 1}</span>
                    <h3 className="font-display font-semibold text-lg">{s.t}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PREÇOS E CONDIÇÕES */}
      <section className="section-padding bg-card/30">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Uma cobrança simples e <span className="text-gradient">proporcional à sua operação</span>
            </h2>
          </div>

          <Card className="bg-card border-primary/30">
            <CardContent className="p-6 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { t: "Comissão inicial", v: "5%", d: "Do valor investido em anúncios. Você paga de acordo com o investimento efetivamente realizado." },
                  { t: "Meta de redução", v: "Até 1%", d: "Disponível conforme volume, metas, histórico e condições comerciais definidas com a AD Scale." },
                  { t: "Mensalidade", v: "R$ 0", d: "Não cobramos mensalidade adicional pelo acesso à estrutura." },
                  { t: "Custos extras", v: "Sem cobranças", d: "As condições são apresentadas antes do início. Custos externos, impostos ou tarifas de terceiros, quando aplicáveis, devem ser informados separadamente." },
                  { t: "Crédito inicial", v: "US$ 240", d: "Crédito operacional utilizado para abater as primeiras comissões. Os novos pagamentos começam somente após o encerramento do saldo." },
                ].map((p) => (
                  <div key={p.t} className="border border-border/40 rounded-lg p-5 bg-background">
                    <p className="text-sm text-muted-foreground mb-1">{p.t}</p>
                    <p className="font-display text-3xl font-bold text-gradient mb-2">{p.v}</p>
                    <p className="text-sm text-muted-foreground">{p.d}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg" data-cta="pricing_simulacao">
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    Receber uma simulação
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Valores, taxas, crédito, critérios de redução e condições de pagamento devem constar na proposta e no contrato.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CONTAS DE AGÊNCIA + PÁGINAS ANTIGAS */}
      <section className="section-padding">
        <div className="container max-w-6xl grid gap-8 md:grid-cols-2">
          <Card className="bg-card border-border/50">
            <CardContent className="p-6 md:p-8">
              <Users className="w-8 h-8 text-primary mb-3" />
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                Contas de agência para gestores e operações profissionais
              </h2>
              <p className="text-muted-foreground mb-4">
                Fornecemos acesso a contas de agência voltadas para anunciantes, gestores de tráfego e empresas que precisam de uma estrutura mais organizada para operar campanhas.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Estrutura para múltiplos clientes","Organização de acessos","Onboarding assistido","Suporte operacional","Possibilidade de expansão","Controle centralizado","Análise do perfil da operação","Condições definidas contratualmente"].map((i) => (
                  <li key={i} className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{i}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6 md:p-8">
              <FileText className="w-8 h-8 text-primary mb-3" />
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
                Páginas antigas disponíveis para anunciantes
              </h2>
              <p className="text-muted-foreground mb-4">
                A estrutura pode incluir páginas antigas para anunciantes, conforme a necessidade, disponibilidade e análise da operação.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                {["As páginas não garantem aprovação","Idade da página não garante desempenho","Uso deve seguir políticas da plataforma","Acesso depende da finalidade","Conteúdo deve ser legítimo","Alterações podem exigir validação","Condições devem constar no contrato"].map((i) => (
                  <li key={i} className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{i}</li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic border-t border-border/30 pt-3">
                Uma página antiga pode facilitar a organização da operação, mas não representa garantia de aprovação, desempenho ou ausência de restrições.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* REDUÇÃO DE TAXA */}
      <section className="section-padding bg-card/30">
        <div className="container max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Quanto maior e mais consistente a operação, <span className="text-gradient">menor pode ser a taxa</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            A comissão padrão começa em 5%, mas pode ser reduzida de acordo com o crescimento e a consistência da operação.
          </p>
          <div className="grid gap-3 md:grid-cols-3 text-sm">
            {["Volume mensal investido","Histórico de pagamento","Regularidade da operação","Quantidade de contas","Tempo de relacionamento","Metas previamente definidas","Perfil de risco","Necessidade de suporte","Custos operacionais"].map((c) => (
              <div key={c} className="px-4 py-3 rounded-lg bg-card border border-border/40">{c}</div>
            ))}
          </div>
          <p className="font-display text-xl font-semibold mt-8">
            Operações elegíveis podem alcançar uma comissão de <span className="text-gradient">até 1%</span> sobre o investimento.
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic">
            A redução não é automática e deve ser formalizada em proposta ou contrato.
          </p>
        </div>
      </section>

      {/* SISTEMA DE GESTÃO */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <BarChart3 className="w-10 h-10 text-primary mx-auto mb-3" />
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Você acompanha toda a <span className="text-gradient">operação com clareza</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A AD Scale utiliza um sistema de controle e gestão para registrar o investimento em anúncios, o saldo do crédito inicial, a comissão acumulada e os pagamentos da operação.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 text-sm">
            {["Acompanhar o valor investido","Acompanhar o percentual da comissão","Visualizar o saldo do crédito de US$ 240","Visualizar quando o crédito foi utilizado","Acompanhar valores devidos","Consultar histórico de pagamentos","Controlar contas disponíveis","Organizar acessos","Acompanhar solicitações","Registrar ampliações da estrutura","Facilitar a comunicação com o suporte"].map((i) => (
              <div key={i} className="flex gap-2 px-4 py-3 rounded-lg bg-card border border-border/40">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{i}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6 italic">
            O acompanhamento poderá ser realizado pelo painel disponibilizado, relatório periódico ou canal de atendimento definido durante o onboarding.
          </p>
        </div>
      </section>

      {/* COMPARATIVO */}
      <section className="section-padding bg-card/30">
        <div className="container max-w-5xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-10">
            Compra tradicional ou <span className="text-gradient">aluguel com comissão?</span>
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border/40">
            <table className="w-full text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="text-left p-4 font-display">Critério</th>
                  <th className="text-left p-4 font-display">Compra de contas</th>
                  <th className="text-left p-4 font-display text-primary">Aluguel AD Scale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Investimento inicial","Compra individual dos ativos","Crédito inicial aproveitado"],
                  ["Mensalidade","Pode variar","Sem mensalidade fixa"],
                  ["Cobrança","Valor antecipado por ativo","Percentual sobre o investimento"],
                  ["Configuração","Responsabilidade do comprador","Onboarding assistido"],
                  ["Ampliação","Nova compra","Solicitação conforme demanda"],
                  ["Contas de agência","Depende do fornecedor","Disponíveis conforme análise"],
                  ["Páginas antigas","Compra separada","Podem integrar a estrutura"],
                  ["Controle","Gestão interna","Sistema ou relatório"],
                  ["Suporte","Pode ser limitado","Atendimento durante a operação"],
                  ["Redução de custo","Não necessariamente","Comissão pode cair conforme metas"],
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-background" : "bg-card/40"}>
                    <td className="p-4 font-semibold">{row[0]}</td>
                    <td className="p-4 text-muted-foreground">{row[1]}</td>
                    <td className="p-4">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4 italic">
            As condições reais dependem do plano, disponibilidade, contrato e análise da operação.
          </p>
        </div>
      </section>

      {/* RESUMO 4 PONTOS */}
      <section className="section-padding">
        <div className="container max-w-5xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-10">
            Resumindo em <span className="text-gradient">quatro pontos</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { n: "1", t: "Você começa com US$ 240", d: "Esse valor vira crédito dentro da operação." },
              { n: "2", t: "A comissão inicial é de 5%", d: "Ela é calculada somente sobre o valor investido em anúncios." },
              { n: "3", t: "O crédito paga as primeiras comissões", d: "Enquanto houver saldo, você não realiza novos pagamentos de comissão." },
              { n: "4", t: "Depois, você paga proporcionalmente", d: "Quando o crédito acabar, as comissões passam a ser pagas normalmente. A taxa pode ser reduzida até 1% conforme metas e condições." },
            ].map((p) => (
              <Card key={p.n} className="bg-card border-border/50">
                <CardContent className="p-6 flex gap-4">
                  <span className="font-display text-4xl font-bold text-gradient leading-none">{p.n}</span>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-1">{p.t}</h3>
                    <p className="text-sm text-muted-foreground">{p.d}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={faqs}
        heading={<>Perguntas <span className="text-gradient">frequentes</span></>}
      />

      {/* CTA FINAL */}
      <section className="section-padding">
        <div className="container max-w-4xl text-center">
          <Card className="bg-card border-primary/40">
            <CardContent className="p-8 md:p-12">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Tenha contas de agência sem mensalidade e <span className="text-gradient">pague conforme sua operação cresce</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Comece com um crédito de US$ 240, utilize esse saldo para abater as primeiras comissões e pague somente depois que o crédito terminar.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" data-cta="cta_final_analise">
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    Solicitar análise da operação <ArrowRight className="ml-1" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" data-cta="cta_final_whatsapp">
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1" /> Falar pelo WhatsApp
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                Comissão inicial de 5%, podendo chegar a até 1% conforme metas e condições comerciais.
              </p>
            </CardContent>
          </Card>

          {/* Compliance */}
          <div className="mt-10 text-xs text-muted-foreground space-y-2 text-left max-w-3xl mx-auto">
            <p>A AD Scale é uma prestadora independente e não é afiliada, patrocinada ou endossada pela Meta Platforms, Inc.</p>
            <p>Os serviços não garantem aprovação de anúncios, permanência de contas, ausência de restrições, limites de gastos ou desempenho de campanhas.</p>
            <p>O tratamento do crédito em casos de cancelamento, suspensão ou encerramento da operação deve seguir as condições contratuais. Consulte nossos <Link to="/termos-de-uso" className="underline">Termos</Link> e <Link to="/politica-de-privacidade" className="underline">Política de Privacidade</Link>.</p>
          </div>
        </div>
      </section>

      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
};

export default AluguelContasMetaAds;
