import { useParams, Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PainPointsSection from "@/components/PainPointsSection";
import ComparisonSection from "@/components/ComparisonSection";
import AssetsSection from "@/components/AssetsSection";
import WhatsAppApiSection from "@/components/WhatsAppApiSection";
import QualitySection from "@/components/QualitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";
import { productLandings, type ProductLandingData } from "@/data/landings";

interface Props {
  slug?: string; // permite uso direto no roteamento
}

const ProductLanding = ({ slug: slugProp }: Props) => {
  const params = useParams<{ slug?: string }>();
  const slug = slugProp ?? params.slug ?? "";
  const data: ProductLandingData | undefined = productLandings[slug];

  if (!data) return <Navigate to="/404" replace />;

  const featuredGuides = data.featuredGuideSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: data.seo.title,
        serviceType: data.seo.title,
        provider: { "@type": "Organization", name: "AD Scale" },
        areaServed: "BR",
        description: data.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faq.items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://www.adscalecontingencia.com/" },
          {
            "@type": "ListItem",
            position: 2,
            name: data.seo.title.split("|")[0].trim(),
            item: `https://www.adscalecontingencia.com${data.seo.canonical}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
        canonical={data.seo.canonical}
        jsonLd={jsonLd}
      />
      <Navbar />
      <HeroSection
        eyebrow={data.hero.eyebrow}
        badgeText={data.hero.badgeText}
        headline={data.hero.headline}
        headlineMobile={data.hero.headlineMobile}
        subheadline={data.hero.subheadline}
        subheadlineMobile={data.hero.subheadlineMobile}
        trustItems={data.hero.trustItems}
      />
      <TrustBar />
      <PainPointsSection />
      <ComparisonSection />
      <AssetsSection
        badge={data.assets.badge}
        heading={data.assets.heading}
        intro={data.assets.intro}
        assets={data.assets.items}
        footerLine={data.assets.footerLine}
      />
      <WhatsAppApiSection />
      <QualitySection />
      <TestimonialsSection />
      <ProcessSection />

      {featuredGuides.length > 0 && (
        <section className="section-padding" aria-labelledby="guias-relacionados-heading">
          <div className="container max-w-5xl">
            <div className="flex flex-col gap-3 mb-8">
              <p className="text-sm text-primary font-semibold">Conteúdo estratégico</p>
              <h2 id="guias-relacionados-heading" className="font-display text-3xl md:text-4xl font-bold">
                Aprofunde no que sustenta esse ativo
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                Guias técnicos do nosso time sobre estrutura, Trust Score e operação no Meta Ads.
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
          </div>
        </section>
      )}

      <FAQSection heading={data.faq.heading} faqs={data.faq.items} />
      <CTASection heading={data.cta.heading} description={data.cta.description} ctaLabel={data.cta.ctaLabel} />
      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
};

export default ProductLanding;
