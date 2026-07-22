import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const SITE_OFICIAL = "https://www.adscalecontingencia.com/";

const FAQS = [
  {
    question: "O que são ativos para Meta Ads?",
    answer:
      "Ativos são os recursos operacionais que sustentam uma conta de Meta Ads em escala: Business Manager (BM verificada, BM API oficial, BM de disparo), contas de anúncio, fan page, perfis antigos com Trust Score, domínios verificados e infraestrutura de Pixel/CAPI.",
  },
  {
    question: "Qual a diferença entre BM verificada, BM API oficial e BM de disparo?",
    answer:
      "A BM verificada passou pela verificação documental do Meta. A BM API oficial tem a API de anúncios habilitada para integrações. A BM de disparo (250 ou 2k) é otimizada para volume alto de criação de campanhas via API oficial.",
  },
  {
    question: "Perfil antigo (aged) faz diferença no Trust Score?",
    answer:
      "Sim. Perfis com idade real (2010+), histórico consistente e fingerprint limpo entregam Trust Score mais alto, reduzem revisão de conta e sustentam melhor escala em nichos sensíveis.",
  },
  {
    question: "A AD Scale garante que a conta nunca será bloqueada?",
    answer:
      "Não existe garantia de imunidade a bloqueio no Meta. O que a AD Scale entrega é curadoria de ativos com histórico limpo, handover técnico, warm-up correto e política de reposição alinhada no briefing.",
  },
  {
    question: "Como é feita a entrega dos ativos?",
    answer:
      "Handover 1 a 1 por canal seguro, com walkthrough ao vivo: vinculação de BM, conta de anúncio, fan page, Pixel/CAPI, domínio verificado e orientações de warm-up. Suporte técnico ativo nas primeiras 72h.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Ativos para Meta Ads | AD Scale",
      description:
        "AD Scale: soluções consultivas para ativos e estrutura de operações profissionais de Meta Ads.",
      url: "https://www.adscalecontingencia.com/ativos-ads",
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


const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
  if (typeof w.gtag === "function") w.gtag("event", name, params);
};

const AtivosAds = () => {
  useEffect(() => {
    trackEvent("view_presell");
    let fired50 = false;
    let fired90 = false;
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      if (!fired50 && scrolled >= 0.5) {
        fired50 = true;
        trackEvent("scroll_50");
      }
      if (!fired90 && scrolled >= 0.9) {
        fired90 = true;
        trackEvent("scroll_90");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSiteClick = () => trackEvent("click_site_oficial");
  const handleWhatsClick = () => trackEvent("click_whatsapp_presell");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Ativos Meta Ads: BM, Contas de Anúncio, Fan Page e Perfis | AD Scale"
        description="Ativos para Meta Ads: BM verificada, conta de anúncio, conta de agência, aluguel de contas, fan page, perfil antigo e BM API oficial para disparo."
        canonical="/ativos-ads"
        keywords={[
          "conta de anuncios meta","conta de anuncios facebook","conta para anunciar no facebook",
          "conta para anunciar no instagram","conta para meta ads","conta para facebook ads",
          "aluguel de contas","alugar conta de anuncio","conta de agencia","conta meta ads",
          "comprar bm","bm verificada","bm meta ads","bm api","bm api oficial","bm de disparo",
          "bm 250 disparos","bm 2k disparo","comprar bm de disparo","comprar bm via api",
          "comprar bm verificada","comprar bm meta","comprar pagina","comprar fan page",
          "pagina antiga","comprar perfil","comprar perfil antigo","comprar perfil verificado",
          "perfil antigo","perfil verificado","anunciar no meta","campanha meta","facebook campanhas",
          "conta de anuncio meta","bms meta","disparo api oficial",
        ]}
        jsonLd={jsonLd}
      />

      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/ativos-ads" aria-label="AD Scale">
            <Logo size={24} />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/ativos-ads" className="hover:text-foreground">Início</Link>
            <a href={SITE_OFICIAL} onClick={handleSiteClick} className="hover:text-foreground">Site oficial</a>
            <Link to="/politica-de-privacidade" className="hover:text-foreground">Política de Privacidade</Link>
          </nav>
          <a
            href={SITE_OFICIAL}
            onClick={handleSiteClick}
            className="bg-gradient-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg text-sm hover:scale-105 transition-transform"
          >
            Acessar site oficial
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="container max-w-5xl mx-auto px-4 py-16 md:py-24">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">AD Scale · Ativos Meta Ads</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5">
          Ativos para <span className="text-gradient">Meta Ads</span>: BM verificada, contas de anúncio, fan page e perfis antigos
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-8">
          Estrutura completa para anunciar no Meta com previsibilidade: aluguel de contas de anúncio,
          conta de agência, BM API oficial para disparo (BM 250 disparos, BM 2k disparo), fan pages
          antigas, perfis verificados e perfis antigos com Trust Score elevado.
        </p>

        <ul className="grid sm:grid-cols-2 gap-3 mb-10 max-w-3xl">
          {[
            "Aluguel de contas de anúncio Meta Ads e conta de agência",
            "BM verificada, BM meta ads e BM API oficial (disparo)",
            "Fan page antiga, página verificada e domínio configurado",
            "Perfil antigo, perfil verificado e perfil farmado para BM",
            "Governança de ativos, CAPI/Pixel e handover técnico 1 a 1",
            "Contingência operacional para campanhas Meta de alto volume",
          ].map((b) => (
            <li key={b} className="flex items-start gap-2 text-foreground/90">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={SITE_OFICIAL}
            onClick={handleSiteClick}
            className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-7 py-3.5 rounded-xl"
          >
            Conhecer a AD Scale <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="presell_hero_whatsapp"
            onClick={handleWhatsClick}
            className="inline-flex items-center justify-center gap-2 border border-border bg-card/60 px-7 py-3.5 rounded-xl font-medium hover:border-primary/50"
          >
            <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-6 max-w-2xl">
          A AD Scale é uma empresa independente e não possui afiliação oficial com Meta, Facebook,
          Instagram, WhatsApp ou Google.
        </p>
      </section>

      {/* Explicação */}
      <section className="border-t border-border/50 py-16">
        <div className="container max-w-4xl mx-auto px-4 space-y-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Ativos Meta Ads: BM, contas de anúncio, páginas e perfis</h2>
            <p className="text-muted-foreground leading-relaxed">
              A AD Scale atua com curadoria e handover técnico de ativos para operações que rodam
              campanha meta em escala: BM verificada, BM API oficial, BM de disparo, conta de
              anúncio meta, conta de agência, aluguel de contas, fan page antiga e perfis antigos
              ou verificados. Cada ativo é validado em fingerprint, histórico de gasto, verificação
              documental e Trust Score antes da entrega.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">Por que a estrutura importa em Meta Ads?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Em operações de tráfego pago no Meta (Facebook Ads e Instagram Ads), estabilidade
              depende de conta de anúncio saudável, BM com verificação ativa, domínio verificado,
              CAPI/Pixel corretos, perfil administrador antigo e política de contingência. Sem essa
              base, criativos e verba não sustentam escala.
            </p>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="border-t border-border/50 py-16 bg-card/30">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Para quem indicamos aluguel de contas e ativos Meta Ads?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Agências que operam múltiplas contas de anúncio Meta",
              "Gestores de tráfego que precisam alugar conta de anúncio",
              "Infoprodutores que rodam campanha meta em alto volume",
              "E-commerces dependentes de Facebook Ads e Instagram Ads",
              "Operações que precisam de BM API oficial para disparo",
              "Times que exigem contingência antes de escalar verba",
              "Anunciantes buscando conta para meta ads com histórico",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-border/60 bg-background/60 p-5 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que pode ser avaliado */}
      <section className="border-t border-border/50 py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
            Checklist técnico de ativos: BM, conta de anúncio, fan page e perfis
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              "Business Manager",
              "Contas de anúncio",
              "Páginas",
              "Perfis de acesso",
              "Domínios",
              "Organização de permissões",
              "Histórico de restrições",
              "Qualidade da conta",
              "Estrutura de contingência operacional",
              "Necessidade de suporte estratégico",
              "Fluxo comercial antes de escalar investimento",
            ].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-foreground/90">{i}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">
            Cada operação possui um cenário diferente. Por isso, a AD Scale trabalha com uma abordagem
            consultiva para entender o momento do anunciante antes de indicar qualquer caminho.
          </p>
        </div>
      </section>

      {/* Transparência */}
      <section className="border-t border-border/50 py-16 bg-card/30">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="rounded-2xl border border-border/60 bg-background/60 p-6 md:p-8">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-3">Transparência importante</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A AD Scale não promete aprovação garantida de anúncios, ausência total de restrições ou
              resultados específicos de campanha. A performance e a aprovação de anúncios dependem de
              diversos fatores, incluindo política das plataformas, qualidade da oferta, criativos,
              página de destino, histórico da conta e gestão profissional.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A proposta da AD Scale é ajudar anunciantes a entenderem melhor sua estrutura e avaliarem
              possíveis caminhos para uma operação mais organizada.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/50 py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
            Perguntas frequentes sobre ativos Meta Ads
          </h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.question}
                className="group border border-border/50 rounded-xl bg-card/40 p-5 open:border-primary/40"
              >
                <summary className="cursor-pointer font-semibold list-none flex justify-between items-center gap-4">
                  <span>{f.question}</span>
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}

      <section className="border-t border-border/50 py-16">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Quer conhecer as soluções da AD Scale?
          </h2>
          <p className="text-muted-foreground mb-8">
            Acesse o site oficial para entender melhor as soluções disponíveis para operações de Meta Ads.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SITE_OFICIAL}
              onClick={handleSiteClick}
              className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-7 py-3.5 rounded-xl"
            >
              Acessar site oficial <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="presell_final_whatsapp"
              onClick={handleWhatsClick}
              className="inline-flex items-center justify-center gap-2 border border-border bg-card/60 px-7 py-3.5 rounded-xl font-medium hover:border-primary/50"
            >
              <MessageCircle className="w-5 h-5" /> Falar com a AD Scale no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <Logo size={22} />
            <p className="text-sm text-muted-foreground mt-3">
              Soluções consultivas para organização e estrutura de operações de Meta Ads.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={SITE_OFICIAL} onClick={handleSiteClick} className="hover:text-foreground">Site oficial</a></li>
              <li><Link to="/politica-de-privacidade" className="hover:text-foreground">Política de Privacidade</Link></li>
              <li><Link to="/termos-de-uso" className="hover:text-foreground">Termos de Uso</Link></li>
              <li><a href={WHATSAPP_URL} onClick={handleWhatsClick} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Contato</a></li>
              <li><a href="https://www.adscalecontingencia.com/blog" className="hover:text-foreground">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Aviso</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A AD Scale é uma empresa independente e não possui afiliação oficial com Meta, Facebook,
              Instagram, WhatsApp ou Google. Todas as marcas citadas pertencem aos seus respectivos
              proprietários.
            </p>
          </div>
        </div>
        <div className="container max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-border/50 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} AD Scale Contingência. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default AtivosAds;
