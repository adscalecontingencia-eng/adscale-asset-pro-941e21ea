import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PainPointsSection from "@/components/PainPointsSection";
import ComparisonSection from "@/components/ComparisonSection";
import AssetsSection from "@/components/AssetsSection";
import QualitySection from "@/components/QualitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEO from "@/components/SEO";

const Contingencia = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ativos digitais de contingência AD•SCALE",
    serviceType: "Venda de ativos de contingência para tráfego pago",
    provider: { "@type": "Organization", name: "AD Scale" },
    areaServed: "BR",
    description:
      "Venda de ativos digitais de contingência para operações de tráfego pago: BMs, contas de anúncio, páginas antigas, contas de agência e estruturas para Meta Ads, com entrega organizada e suporte no processo.",
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      <SEO
        title="AD•SCALE Contingência | Ativos Digitais para Tráfego Pago"
        description="Marketplace de ativos digitais de contingência para operações de tráfego pago: BMs, contas de anúncio, páginas antigas, contas de agência e estruturas para Meta Ads com entrega organizada."
        keywords={[
          "ativos de contingência meta ads",
          "comprar bm verificada",
          "conta de anúncio meta",
          "página antiga facebook",
          "conta de agência meta",
          "estrutura de contingência facebook ads",
          "marketplace de ativos meta ads",
          "aluguel de estrutura meta ads",
          "bm verificada para tráfego pago",
          "contingência para media buyers",
        ]}
        canonical="/contingencia"
        jsonLd={jsonLd}
      />
      <Navbar />

      <HeroSection
        headline="Ativos digitais de contingência para operações de tráfego pago"
        headlineMobile="Ativos de contingência para tráfego pago"
      />

      <TrustBar />

      {/* Proposta de valor */}
      <section className="section-padding" aria-labelledby="proposta-heading">
        <div className="container max-w-5xl">
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-sm text-primary font-semibold">O que a AD•SCALE entrega</p>
            <h2 id="proposta-heading" className="font-display text-3xl md:text-4xl font-bold">
              Ativos organizados para manter e expandir suas campanhas
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              A AD•SCALE vende ativos digitais de contingência para operações de tráfego pago — BMs,
              contas de anúncio, páginas antigas, contas de agência e estruturas para Meta Ads.
              Trabalhamos com entrega organizada, suporte no processo e um marketplace com entrega
              automatizada, além de atendimento estratégico para operações maiores no modelo de
              aluguel e estrutura gerenciada.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Marketplace de ativos",
                desc: "BMs, contas de anúncio, páginas antigas e contas de agência com entrega automatizada.",
              },
              {
                title: "Estrutura gerenciada",
                desc: "Aluguel e operação de estrutura para media buyers e agências com maior volume.",
              },
              {
                title: "Suporte no processo",
                desc: "Acompanhamento na configuração dos ativos e boas práticas de uso conforme políticas da plataforma.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="border border-border/50 bg-card/60 hover:border-primary/40 transition-colors p-6 rounded-lg"
              >
                <h3 className="font-display text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PainPointsSection />
      <ComparisonSection />
      <AssetsSection />
      <QualitySection />

      {/* Para quem é */}
      <section className="section-padding bg-card/30" aria-labelledby="para-quem-heading">
        <div className="container max-w-5xl">
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-sm text-primary font-semibold">Para quem é</p>
            <h2 id="para-quem-heading" className="font-display text-3xl md:text-4xl font-bold">
              Feito para quem opera tráfego pago de forma profissional
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Atendemos gestores de tráfego, agências, media buyers, afiliados, e-commerces e
              anunciantes que precisam de ativos organizados para manter ou expandir suas campanhas
              no Meta Ads.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              "Gestores de tráfego",
              "Agências de performance",
              "Media buyers",
              "Afiliados",
              "E-commerces",
              "Anunciantes de alto volume",
            ].map((item) => (
              <div
                key={item}
                className="border border-border/50 bg-background/60 px-5 py-4 rounded-lg font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />
      <TestimonialsSection />

      {/* Nota de responsabilidade */}
      <section className="section-padding" aria-labelledby="transparencia-heading">
        <div className="container max-w-4xl">
          <div className="border border-border/50 bg-card/40 rounded-lg p-6 md:p-8">
            <p className="text-sm text-primary font-semibold mb-2">Transparência</p>
            <h2 id="transparencia-heading" className="font-display text-2xl md:text-3xl font-bold mb-4">
              O que não prometemos
            </h2>
            <p className="text-muted-foreground">
              Não trabalhamos com promessas de aprovação garantida, ausência de bloqueios ou
              resultados financeiros. Nosso foco é fornecer ativos e estrutura de apoio para
              operações profissionais, com uso conforme as políticas das plataformas. Os preços
              variam conforme o tipo de ativo, qualidade, disponibilidade e volume solicitado.
            </p>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
};

export default Contingencia;
