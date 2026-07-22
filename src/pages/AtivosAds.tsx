import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const SITE_OFICIAL = "https://www.adscalecontingencia.com/";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Estrutura para Meta Ads | AD Scale",
  description:
    "AD Scale: soluções consultivas para organização e estrutura de operações profissionais de Meta Ads.",
  url: "https://www.adscalecontingencia.com/estrutura-ads",
};

const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
  if (typeof w.gtag === "function") w.gtag("event", name, params);
};

const EstruturaAds = () => {
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
        title="Estrutura para Meta Ads | AD Scale"
        description="Conheça a AD Scale, empresa independente com soluções consultivas para organização e estrutura de operações profissionais de Meta Ads."
        canonical="/estrutura-ads"
        jsonLd={jsonLd}
      />

      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/estrutura-ads" aria-label="AD Scale">
            <Logo size={24} />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/estrutura-ads" className="hover:text-foreground">Início</Link>
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
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">AD Scale Contingência</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5">
          Estrutura e organização para operações profissionais de{" "}
          <span className="text-gradient">Meta Ads</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-8">
          A AD Scale apresenta soluções para anunciantes, agências e operações que precisam organizar
          melhor seus ativos, contas, páginas, domínios e processos antes de escalar campanhas.
        </p>

        <ul className="grid sm:grid-cols-2 gap-3 mb-10 max-w-3xl">
          {[
            "Avaliação de estrutura para Meta Ads",
            "Organização de ativos comerciais",
            "Direcionamento para operações que anunciam de forma profissional",
            "Suporte consultivo para entender o melhor caminho",
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
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">O que é a AD Scale?</h2>
            <p className="text-muted-foreground leading-relaxed">
              A AD Scale é uma empresa voltada para anunciantes e operações que utilizam Meta Ads e
              precisam de mais organização estratégica em sua estrutura de mídia. O trabalho envolve
              análise comercial, orientação sobre ativos, estrutura operacional e direcionamento para
              quem deseja profissionalizar a base da operação.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">Por que isso importa?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Em operações de tráfego pago, o resultado não depende apenas de criativos, públicos e
              orçamento. A organização da estrutura também influencia a previsibilidade da operação,
              incluindo contas, permissões, páginas, domínios, acessos, métodos de pagamento e
              processos internos.
            </p>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="border-t border-border/50 py-16 bg-card/30">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
            Para quem essa solução é indicada?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Agências que gerenciam campanhas no Meta Ads",
              "Gestores de tráfego que atendem múltiplos projetos",
              "Infoprodutores com operação de tráfego direto",
              "E-commerces que dependem de campanhas recorrentes",
              "Empresas que desejam organizar melhor seus ativos de anúncio",
              "Operações que precisam de análise antes de escalar verba",
              "Anunciantes que buscam suporte consultivo",
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
            O que pode ser avaliado em uma operação?
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

export default EstruturaAds;
