import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPillarBySlug, getPostsForPillar, pillars } from "@/data/blogPillars";

const SITE = "https://www.adscalecontingencia.com";

const BlogPillar = () => {
  const { slug } = useParams<{ slug: string }>();
  const pillar = slug ? getPillarBySlug(slug) : undefined;

  if (!pillar) return <Navigate to="/blog" replace />;

  const posts = getPostsForPillar(pillar.slug);
  const otherPillars = pillars.filter((p) => p.slug !== pillar.slug);

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: pillar.shortTitle },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE}/blog/pilar/${pillar.slug}/#collection`,
        url: `${SITE}/blog/pilar/${pillar.slug}/`,
        name: pillar.title,
        description: pillar.description,
        inLanguage: "pt-BR",
        hasPart: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.publishedAt,
          url: `${SITE}/blog/${p.slug}/`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.label,
          item: b.href ? `${SITE}${b.href}` : undefined,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      <SEO
        title={`${pillar.title} | Blog AD Scale`}
        description={pillar.description}
        keywords={pillar.keywords}
        canonical={`/blog/pilar/${pillar.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o blog
          </Link>

          <header className="mb-12">
            <span className="badge-pill mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Pilar de conteúdo
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              {pillar.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              {pillar.longDescription}
            </p>
            {pillar.relatedLandingSlug && (
              <Link
                to={`/${pillar.relatedLandingSlug}`}
                className="inline-flex items-center gap-2 mt-6 text-primary font-medium text-sm hover:underline"
              >
                {pillar.relatedLandingLabel ?? "Ver página do produto"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </header>

          <section aria-labelledby="pilar-artigos" className="mb-16">
            <h2 id="pilar-artigos" className="font-display text-2xl font-bold mb-6">
              {posts.length} {posts.length === 1 ? "artigo neste pilar" : "artigos neste pilar"}
            </h2>

            {posts.length === 0 ? (
              <p className="text-muted-foreground">Em breve novos artigos neste pilar.</p>
            ) : (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group block rounded-lg border border-border/50 bg-card/60 hover:border-primary/40 transition-all overflow-hidden"
                  >
                    <div className="grid md:grid-cols-[240px_1fr] gap-0">
                      <div className="aspect-[1200/630] md:aspect-auto md:h-full overflow-hidden bg-background">
                        <img
                          src={post.ogImage}
                          alt={post.title}
                          loading="lazy"
                          width={1200}
                          height={630}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 mb-2 text-xs">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {post.readingTime}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section aria-labelledby="outros-pilares" className="mt-16">
            <h2 id="outros-pilares" className="font-display text-2xl font-bold mb-6">
              Outros pilares do blog
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {otherPillars.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/pilar/${p.slug}`}
                  className="border border-border/50 bg-card/60 hover:border-primary/40 transition-colors p-5 rounded-lg"
                >
                  <h3 className="font-display text-lg font-semibold mb-2">{p.shortTitle}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
};

export default BlogPillar;
