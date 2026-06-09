import { MessageCircle, Zap, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const tiers = [
  {
    icon: MessageCircle,
    tier: "TIER 1",
    title: "BM 250 Disparos",
    subtitle: "Para quem está iniciando operação no WhatsApp Cloud API",
    description:
      "Business Manager verificada e configurada para o tier inicial do WhatsApp Cloud API: 250 conversas iniciadas por empresa em 24h. Ideal para validar fluxo, template e taxa de entrega antes de escalar.",
    bullets: [
      "WABA (WhatsApp Business Account) ativa",
      "Verificação de negócio aprovada no Meta",
      "Display Name pré-aprovado",
      "Pronta para upgrade automático para Tier 1k",
    ],
  },
  {
    icon: Zap,
    tier: "TIER 2K",
    title: "BM 2.000 Disparos",
    subtitle: "Padrão para operações de remarketing e nutrição em escala",
    description:
      "BM já elevada ao tier de 2.000 conversas/24h, com qualidade de número High e histórico de templates aprovados. Estrutura para operações que disparam diariamente sem queimar o número.",
    bullets: [
      "Quality Rating High no número",
      "Templates de marketing aprovados",
      "Histórico positivo de entrega",
      "Caminho rápido para tier 10k",
    ],
    featured: true,
  },
  {
    icon: Rocket,
    tier: "TIER 10K",
    title: "BM 10.000 Disparos",
    subtitle: "Para operações enterprise de mensageria em alto volume",
    description:
      "BM no tier de 10.000 conversas iniciadas/24h, com selo de verificação, número com Quality High e arquitetura preparada para integração com CRM, broker e ferramentas oficiais do WhatsApp Cloud API.",
    bullets: [
      "Tier 10k já liberado pelo Meta",
      "Selo verde (Official Business Account) elegível",
      "Webhooks e CAPI prontos",
      "Suporte para escalar a tier 100k / Unlimited",
    ],
  },
];

const WhatsAppApiSection = () => {
  return (
    <section
      id="disparo-api"
      className="section-padding relative"
      aria-label="BMs verificadas para disparo via API do WhatsApp Cloud"
    >
      <div className="container max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="badge-pill mx-auto mb-8">
            <MessageCircle className="w-4 h-4" />
            DISPARO VIA API — WHATSAPP CLOUD
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            BMs verificadas para{" "}
            <span className="text-gradient">disparo via API</span> oficial
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estruturas verificadas com a documentação do Meta para disparos no
            WhatsApp Business via API. Limite alto de disparos liberados — sem
            warm-up manual, sem risco de derrubar o número logo no primeiro
            envio.🚚
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`section-card group relative ${
                t.featured ? "border-primary/40 shadow-lg shadow-primary/10" : ""
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-[10px] font-bold tracking-widest rounded-full px-3 py-1">
                  MAIS PROCURADA
                </span>
              )}
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <t.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1">
                  {t.tier}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-1">
                {t.title}
              </h3>
              <p className="text-sm text-primary/80 mb-3">{t.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                {t.description}
              </p>
              <ul className="space-y-2 mb-6">
                {t.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                Consultar disponibilidade
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="bg-card/40 border border-border/50 rounded-2xl p-6 md:p-8">
          <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">
            Como funcionam os tiers de disparos da API Oficial do Meta
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Segundo a{" "}
            <a
              href="https://developers.facebook.com/docs/whatsapp/messaging-limits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              documentação oficial do Meta
            </a>
            , cada número conectado à WhatsApp Business Platform tem um limite
            diário de conversas iniciadas pela empresa. Esse limite escala
            automaticamente conforme a qualidade do número, a verificação do
            negócio e a taxa de entrega dos templates.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { tier: "Tier 250", desc: "Inicial / sem verificação" },
              { tier: "Tier 2K", desc: "Pós-verificação + qualidade" },
              { tier: "Tier 10K", desc: "Histórico positivo de envio" },
              { tier: "Tier 100K+", desc: "Operação enterprise" },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-border/50 rounded-xl p-4 text-center"
              >
                <p className="font-display font-bold text-primary">
                  {item.tier}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppApiSection;
