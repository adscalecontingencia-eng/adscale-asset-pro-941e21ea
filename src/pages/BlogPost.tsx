import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, RefreshCw, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";
import MidArticleCTA from "@/components/MidArticleCTA";
import ShareButtons from "@/components/ShareButtons";
import NewsletterCTA from "@/components/NewsletterCTA";
import TableOfContents, { extractTocFromMarkdown } from "@/components/TableOfContents";
import { getPostBySlug } from "@/data/blogPosts";
import { blogSeoTitles } from "@/data/blogSeoTitles";
import { getPillarForPost } from "@/data/blogPillars";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/site";
import pedroPhoto from "@/assets/pedro-lucas-fundador.jpg";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Markdown renderer — handles h2/h3 (with anchor IDs), lists, tables, blockquotes, paragraphs, bold. */
const renderMarkdown = (md: string, campaign = "blog_post") => {
  const lines = md.trim().split("\n");
  const blocks: JSX.Element[] = [];
  let i = 0;

  const WA_NUMBER = "553198416336";
  const buildInlineWaHref = (msg: string, campaign: string) => {
    const qs = new URLSearchParams({
      text: msg,
      utm_source: "blog",
      utm_medium: "inline_cta",
      utm_campaign: campaign,
    }).toString();
    return `https://wa.me/${WA_NUMBER}?${qs}`;
  };

  const inline = (text: string, cmp = campaign) => {
    // First split by bold, then within each segment parse links.
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    const out: JSX.Element[] = [];
    let key = 0;
    for (const part of boldParts) {
      if (part.startsWith("**") && part.endsWith("**")) {
        out.push(
          <strong key={key++} className="text-foreground font-semibold">
            {part.slice(2, -2)}
          </strong>,
        );
        continue;
      }
      // Parse [text](url) links inside this segment.
      const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
      let lastIdx = 0;
      let m: RegExpExecArray | null;
      while ((m = linkRe.exec(part)) !== null) {
        if (m.index > lastIdx) {
          out.push(<span key={key++}>{part.slice(lastIdx, m.index)}</span>);
        }
        const label = m[1];
        const url = m[2];
        if (url.startsWith("wa:")) {
          // WhatsApp CTA with tracking
          const msg = url.slice(3);
          out.push(
            <a
              key={key++}
              href={buildInlineWaHref(msg, cmp)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {label}
            </a>,
          );
        } else {
          const isExternal = /^https?:\/\//.test(url);
          out.push(
            <a
              key={key++}
              href={url}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {label}
            </a>,
          );
        }
        lastIdx = m.index + m[0].length;
      }
      if (lastIdx < part.length) {
        out.push(<span key={key++}>{part.slice(lastIdx)}</span>);
      }
    }
    return out;
  };


  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Fenced TL;DR / Callout blocks: :::tldr ... ::: or :::callout type=warning ... :::
    const fence = line.match(/^:::(tldr|callout)(?:\s+type=(info|warning|success|tip))?\s*$/);
    if (fence) {
      const kind = fence[1];
      const type = fence[2] || "info";
      i++;
      const buf: string[] = [];
      while (i < lines.length && !lines[i].startsWith(":::")) {
        buf.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // consume closing :::
      const body = buf.join(" ").trim();
      if (kind === "tldr") {
        blocks.push(
          <aside
            key={`tldr-${i}`}
            className="my-8 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-5 md:p-6"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">TL;DR</div>
            <p className="text-foreground/90 leading-relaxed m-0">{inline(body)}</p>
          </aside>,
        );
      } else {
        const styleMap: Record<string, string> = {
          info: "border-blue-500/30 bg-blue-500/5 text-foreground/90",
          warning: "border-amber-500/40 bg-amber-500/10 text-foreground/90",
          success: "border-emerald-500/30 bg-emerald-500/5 text-foreground/90",
          tip: "border-primary/30 bg-primary/5 text-foreground/90",
        };
        const labelMap: Record<string, string> = {
          info: "Importante",
          warning: "Atenção",
          success: "Boa prática",
          tip: "Dica",
        };
        blocks.push(
          <aside
            key={`cb-${i}`}
            className={`my-6 rounded-lg border-l-4 p-4 md:p-5 ${styleMap[type]}`}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">
              {labelMap[type]}
            </div>
            <p className="leading-relaxed m-0">{inline(body)}</p>
          </aside>,
        );
      }
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3);
      blocks.push(
        <h2
          key={i}
          id={slugify(text)}
          className="font-display text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-24"
        >
          {text}
        </h2>,
      );
      i++;
    } else if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-3">
          {line.slice(4)}
        </h3>,
      );
      i++;
    } else if (line.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={i}
          className="border-l-4 border-primary bg-primary/5 px-5 py-3 my-6 rounded-r-lg italic text-foreground/90"
        >
          {inline(line.slice(2))}
        </blockquote>,
      );
      i++;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="list-disc pl-6 space-y-2 my-4 text-muted-foreground">
          {items.map((it, idx) => (
            <li key={idx}>{inline(it)}</li>
          ))}
        </ul>,
      );
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="list-decimal pl-6 space-y-2 my-4 text-muted-foreground">
          {items.map((it, idx) => (
            <li key={idx}>{inline(it)}</li>
          ))}
        </ol>,
      );
    } else if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const headers = tableLines[0].split("|").slice(1, -1).map((c) => c.trim());
        const rows = tableLines.slice(2).map((r) => r.split("|").slice(1, -1).map((c) => c.trim()));
        blocks.push(
          <div key={`tbl-${i}`} className="overflow-x-auto my-6">
            <table className="w-full border border-border/50 rounded-lg overflow-hidden text-sm">
              <thead className="bg-muted/30">
                <tr>
                  {headers.map((h, idx) => (
                    <th key={idx} className="px-4 py-3 text-left font-semibold text-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-t border-border/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-muted-foreground">
                        {inline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
      }
    } else {
      blocks.push(
        <p key={i} className="text-muted-foreground leading-relaxed my-4">
          {inline(line)}
        </p>,
      );
      i++;
    }
  }

  return blocks;
};

const extractFaqs = (content: string) => {
  const questions = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## ") && /\?|como|por que|o que|quando|qual/i.test(line));

  return questions.slice(0, 4).map((question) => ({
    "@type": "Question",
    name: question.replace(/^##\s*/, ""),
    acceptedAnswer: {
      "@type": "Answer",
      text: "Veja o artigo completo para a explicação detalhada, contexto técnico e recomendações práticas para operações de Meta Ads e Facebook Ads.",
    },
  }));
};

const isHowToPost = (slug: string) =>
  /(passo-a-passo|como-|recuperar|configurar|warm-up|checklist|auditoria)/.test(slug);

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const toc = extractTocFromMarkdown(post.content);
  const faqEntities = extractFaqs(post.content);
  const dateModified = post.updatedAt ?? post.publishedAt;
  const formattedPublished = new Date(post.publishedAt).toLocaleDateString("pt-BR");
  const formattedModified = new Date(dateModified).toLocaleDateString("pt-BR");
  const wasUpdated = post.updatedAt && post.updatedAt !== post.publishedAt;

  const pillar = getPillarForPost(post.slug);

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(pillar ? [{ label: pillar.shortTitle, href: `/blog/pilar/${pillar.slug}` }] : []),
    { label: post.title },
  ];

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}/`;
  const ogImageAbs = `${SITE_URL}${post.ogImage}`;

  const articleSchema: Record<string, unknown> = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified,
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: "Pedro Lucas",
      url: `${SITE_URL}/autor/pedro-lucas`,
    },
    publisher: {
      "@type": "Organization",
      name: "AD Scale",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og/logo-adscale.png`,
      },
    },
    keywords: post.keywords.join(", "),
    image: {
      "@type": "ImageObject",
      url: ogImageAbs,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: b.href ? `${SITE_URL}${b.href}` : undefined,
    })),
  };

  const graph: Record<string, unknown>[] = [articleSchema, breadcrumbSchema];
  if (faqEntities.length) {
    graph.push({ "@type": "FAQPage", mainEntity: faqEntities });
  }
  if (isHowToPost(post.slug) && toc.length >= 3) {
    graph.push({
      "@type": "HowTo",
      name: post.title,
      description: post.description,
      step: toc.slice(0, 8).map((t, idx) => ({
        "@type": "HowToStep",
        position: idx + 1,
        name: t.label,
        url: `${canonicalUrl}#${t.id}`,
      })),
    });
  }

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      <SEO
        title={blogSeoTitles[post.slug] ?? post.title}
        description={post.description}
        keywords={post.keywords}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        publishedAt={post.publishedAt}
        image={post.ogImage}
        jsonLd={jsonLd}
      />
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o blog
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-3 h-3" />
                Publicado em {formattedPublished}
              </span>
              {wasUpdated && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <RefreshCw className="w-3 h-3" />
                  Atualizado em {formattedModified}
                </span>
              )}
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">{post.description}</p>

            <Link
              to="/autor/pedro-lucas"
              className="inline-flex items-center gap-3 mb-6 group"
              aria-label="Ver perfil do autor Pedro Lucas"
            >
              <img
                src={pedroPhoto}
                alt="Pedro Lucas, fundador da AD Scale"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-border/50"
                loading="lazy"
              />
              <span className="text-sm">
                <span className="block text-foreground font-medium group-hover:text-primary transition-colors">
                  Por Pedro Lucas
                </span>
                <span className="block text-xs text-muted-foreground">Fundador da AD Scale</span>
              </span>
            </Link>

            <img
              src={post.ogImage}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full rounded-lg border border-border/50"
              loading="eager"
            />
          </header>

          <ShareButtons slug={post.slug} title={post.title} />

          <TableOfContents items={toc} />


          {(() => {
            const blocks = renderMarkdown(post.content, `blog_${post.slug}`);
            const mid = Math.floor(blocks.length / 2);
            return (
              <div className="prose-content">
                {blocks.slice(0, mid)}
                <MidArticleCTA
                  title={post.ctaTitle ?? `Quer aplicar isso (${pillar?.shortTitle ?? "contingência Meta Ads"}) na sua operação?`}
                  description={post.ctaDescription ?? "A AD Scale faz um diagnóstico rápido pelo WhatsApp e mostra o caminho mais curto para você sair do bloqueio, escalar com previsibilidade ou subir uma BM verificada na mesma semana."}
                  whatsappMessage={post.ctaWhatsappMessage ?? `Olá! Li o artigo "${post.title}" no blog da AD Scale e quero entender como aplicar isso na minha operação.`}
                  ctaLabel={post.ctaLabel}
                />

                {blocks.slice(mid)}
              </div>
            );
          })()}

          {pillar && (
            <aside className="mt-12 p-6 rounded-lg border border-border/60 bg-card/60">
              <div className="flex items-start gap-3">
                <Layers className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Faz parte do pilar
                  </p>
                  <Link
                    to={`/blog/pilar/${pillar.slug}`}
                    className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {pillar.title}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                  <Link
                    to={`/blog/pilar/${pillar.slug}`}
                    className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3"
                  >
                    Ver todos os artigos do pilar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          )}

          <div className="mt-12 p-8 rounded-lg border border-primary/30 bg-primary/5 text-center">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-3">
              Pronto para resolver isso de vez?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              BMs Verificadas, BMs antigas, perfis aged e páginas com Trust Score alto — curadoria 1 a 1
              e suporte de quem opera Meta Ads em alto volume todos os dias.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-8 py-3.5 rounded-lg transition-all hover:scale-105"
            >
              Falar com o time no WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <NewsletterCTA pillarLabel={pillar?.shortTitle} pillarSlug={pillar?.slug} />

          <RelatedPosts currentSlug={post.slug} category={post.category} />

        </div>
      </article>

      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
};

export default BlogPost;
