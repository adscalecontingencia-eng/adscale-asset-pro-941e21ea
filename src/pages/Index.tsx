import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEO from "@/components/SEO";
import HomeHero from "@/components/home/HomeHero";
import CategoriesSection from "@/components/home/CategoriesSection";
import AssetFinder from "@/components/home/AssetFinder";
import ConversionBlock from "@/components/home/ConversionBlock";
import StructureDiagram from "@/components/home/StructureDiagram";
import HowItWorks from "@/components/home/HowItWorks";
import WhyAdScale from "@/components/home/WhyAdScale";
import TechnicalContent from "@/components/home/TechnicalContent";
import { DISCLAIMER_META, homeFaqs } from "@/components/home/homeData";
import { blogPosts } from "@/data/blogPosts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  const featuredGuides = [
    "o-que-e-business-manager-verificada-meta",
    "bloqueio-conta-anuncio-meta-como-evitar",
    "arquitetura-contingencia-meta-ads-operacao-alto-volume",
  ].map((slug) => blogPosts.find((p) => p.slug === slug)).filter(Boolean);

  const faqEntities = homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  }));


  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Ativos de contingência para Meta Ads",
        serviceType: "Ativos de contingência para Meta Ads",
        provider: { "@type": "Organization", name: "AD Scale" },
        areaServed: "BR",
        description:
          "Comercialização de BMs Verificadas, BMs antigas, perfis e páginas com alto Trust Score no Meta para operações profissionais de Meta Ads.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntities,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      <SEO
        title="Contingência Meta Ads para Alto Volume | AD Scale"
        description="Estrutura de contingência Meta Ads para anunciantes, agências e operações de tráfego que precisam de BMs, perfis, páginas, domínios e suporte estratégico."
        keywords={[
          "contingência meta ads",
          "contingência facebook ads",
          "bm verificada facebook",
          "bm verificada meta",
          "comprar bm verificada",
          "bm antiga facebook",
          "trust score meta",
          "trust score facebook ads",
          "perfil antigos facebook",
          "página antiga facebook",
          "estrutura de contingência facebook",
          "bloqueio conta de anúncio facebook",
          "bloqueio meta ads",
          "consultoria meta ads",
          "consultoria facebook ads",
          "gestor de tráfego facebook",
          "escalar meta ads",
          "escalar facebook ads",
          // Topo de funil — disparo via API (descoberta / educacional)
          "disparo em massa whatsapp",
          "o que é whatsapp cloud api",
          "como funciona disparo via api whatsapp",
          "whatsapp business platform",
          "tier whatsapp api",
          "api oficial whatsapp",
          "whatsapp business api o que é",
          "diferença whatsapp business e cloud api",
          "mensageria em massa o que é",
          "marketing conversacional whatsapp",
          "regras do whatsapp para disparo",
          "limite de mensagens whatsapp business",
          "quality rating whatsapp business",
          "como não cair o número no whatsapp api",
          "whatsapp api vs whatsapp business app",
          // Meio de funil (consideração / comparação)
          "bm verificada para disparo",
          "bm verificada whatsapp api",
          "bm para disparo em massa",
          "como aumentar tier whatsapp api",
          "qualidade do número whatsapp business",
          "template whatsapp aprovado",
          "como verificar negócio no meta para whatsapp api",
          "melhor broker whatsapp cloud api",
          "ferramenta de disparo via api whatsapp",
          "integração whatsapp api com crm",
          "automação de mensagens whatsapp api",
          "waba verificada como conseguir",
          "número aquecido para whatsapp api",
          "custo por conversa whatsapp api",
          "comparativo plataformas disparo whatsapp",
          // Fundo de funil (intenção de compra)
          "comprar bm 250 disparos",
          "comprar bm 1000 disparos",
          "comprar bm 10000 disparos",
          "bm tier 10k whatsapp",
          "bm verificada para disparo via api",
          "fornecedor bm whatsapp cloud api",
          "comprar waba verificada",
          "comprar bm tier 1k whatsapp",
          "comprar bm tier 100k whatsapp",
          "bm com número high quality à venda",
          "preço bm verificada para disparo",
          "contratar bm para disparo via api",
          "bm com template aprovado para venda",
          "comprar bm com selo verde whatsapp",
          "fornecedor confiável bm whatsapp api brasil",
        ]}
        canonical="/"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <HomeHero />
        <CategoriesSection />
        <AssetFinder />
        <ConversionBlock
          heading="Precisa de ajuda para escolher a estrutura certa?"
          text="Explique sua operação no WhatsApp e consulte as opções disponíveis no momento."
          event="homepage_whatsapp_unsure"
          ctaLocation="pos_orientacao"
        />
        <StructureDiagram />
        <HowItWorks />
        <WhyAdScale />
        <TechnicalContent />

        <section className="section-padding" aria-labelledby="guias-estrategicos-heading">
          <div className="container max-w-5xl">
            <div className="flex flex-col gap-3 mb-8">
              <p className="text-sm text-primary font-semibold">Conteúdo estratégico</p>
              <h2 id="guias-estrategicos-heading" className="font-display text-3xl md:text-4xl font-bold">
                Guias para operar com mais previsibilidade no Meta Ads
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                Aprofunde em bloqueio, estrutura de contingência e ativos com Trust Score alto.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featuredGuides.map((post) => (
                <Link
                  key={post!.slug}
                  to={`/blog/${post!.slug}`}
                  className="border border-border/50 bg-card/60 hover:border-primary/40 transition-colors p-5 rounded-lg"
                >
                  <h3 className="font-display text-lg font-semibold mb-2">{post!.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post!.description}</p>
                </Link>
              ))}
            </div>

            <Link to="/blog" className="inline-block mt-6 text-primary font-semibold hover:underline">
              Ver todos os conteúdos do blog
            </Link>
          </div>
        </section>

        <section
          id="faq"
          className="section-padding bg-secondary/30 border-y border-border/50"
          aria-labelledby="faq-heading"
        >
          <div className="container max-w-3xl">
            <h2 id="faq-heading" className="font-display text-3xl md:text-5xl font-bold mb-8">
              Perguntas frequentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {homeFaqs.map((f, i) => (
                <AccordionItem key={f.question} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-display text-base md:text-lg">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <ConversionBlock
          heading="Fale com a AD•SCALE"
          text="Atendimento comercial pelo WhatsApp para consultar disponibilidade e entender qual estrutura faz sentido."
          note={DISCLAIMER_META}
          event="homepage_whatsapp_final"
          ctaLocation="cta_final"
        />
      </main>
      <FooterSection />
      <WhatsAppFloat />

    </div>
  );
};

export default Index;
