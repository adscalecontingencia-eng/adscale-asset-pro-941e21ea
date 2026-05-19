import { Link, Navigate, useParams } from "react-router-dom";
import { MapPin, ArrowRight, Calendar, Linkedin, Instagram, Award, Briefcase, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { blogPosts } from "@/data/blogPosts";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/site";
import pedroPhoto from "@/assets/pedro-lucas-fundador.jpg";

const AUTHORS = {
  "pedro-lucas": {
    name: "Pedro Lucas",
    role: "Fundador da AD Scale",
    location: "Minas Gerais, Brasil",
    shortBio:
      "Especialista em Meta Ads e Facebook Ads para operações de alto volume. Trabalho com Business Managers Verificadas, contingência de ativos e consultoria técnica para gestores de tráfego e agências que precisam de previsibilidade na escala.",
    longBio: [
      "Atuo no mercado de tráfego pago desde 2018, com foco em operações que rodam acima de R$ 100 mil/dia em Meta Ads. Ao longo desse tempo, gerenciei mais de R$ 80 milhões em mídia paga e estruturei contingências para e-commerces, infoprodutores e agências em nichos sensíveis (saúde, finanças, suplementos, beleza).",
      "Em 2022, depois de ver gestores perdendo operações inteiras por causa de bloqueios em cadeia, fundei a AD Scale: uma operação dedicada a fornecer Business Managers Verificadas, perfis aged e estruturas de contingência prontas para subir no mesmo dia em que uma BM principal cai.",
      "Hoje, lidero o time técnico responsável por curadoria de ativos, warm-up, recuperação de contas bloqueadas e consultoria estratégica para operações que precisam de uptime real no Meta Ads.",
    ],
    expertise: [
      "Meta Ads e Facebook Ads",
      "BM Verificada e Trust Score",
      "Contingência e recuperação de contas",
      "WhatsApp Cloud API oficial",
      "Consultoria estratégica de tráfego pago",
      "Estrutura anti-bloqueio para nichos sensíveis",
    ],
    experience: [
      { year: "2022 — atual", title: "Fundador & CEO", company: "AD Scale" },
      { year: "2020 — 2022", title: "Head de Tráfego", company: "Agência multi-cliente (ecom + info)" },
      { year: "2018 — 2020", title: "Gestor de Tráfego Sênior", company: "Operações próprias e clientes" },
    ],
    credentials: [
      "Meta Blueprint Certified — Buying Ads Professional",
      "Mais de R$ 80M gerenciados em Meta Ads",
      "Operações ativas em 7 países de língua portuguesa e espanhola",
      "Speaker em eventos de tráfego pago (RD Summit, Afiliados Brasil)",
    ],
    socials: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/pedro-lucas-adscale",
        icon: Linkedin,
      },
      {
        label: "Instagram",
        href: "https://instagram.com/adscale.oficial",
        icon: Instagram,
      },
    ],
    photo: pedroPhoto,
  },
} as const;

const Autor = () => {
  const { slug } = useParams<{ slug: string }>();
  const author = slug && slug in AUTHORS ? AUTHORS[slug as keyof typeof AUTHORS] : undefined;

  if (!author) return <Navigate to="/sobre" replace />;

  // Por ora, todos os posts são atribuídos ao Pedro Lucas
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.shortBio,
    url: `${SITE_URL}/autor/${slug}`,
    image: `${SITE_URL}/autores/pedro-lucas.jpg`,
    sameAs: author.socials.map((s) => s.href),
    worksFor: { "@type": "Organization", name: "AD Scale", url: SITE_URL },
    knowsAbout: author.expertise,
    address: { "@type": "PostalAddress", addressRegion: "MG", addressCountry: "BR" },
    alumniOf: author.credentials,
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title={`${author.name} — ${author.role} | AD Scale`}
        description={`${author.name}, ${author.role}. ${author.shortBio}`}
        keywords={[author.name, "AD Scale", "Meta Ads", "Facebook Ads", "consultor meta ads"]}
        canonical={`/autor/${slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs
            items={[{ label: "Início", href: "/" }, { label: "Autores" }, { label: author.name }]}
            className="mb-8"
          />

          <header className="grid md:grid-cols-[200px_1fr] gap-8 items-start mb-12">
            <img
              src={author.photo}
              alt={`${author.name}, ${author.role}`}
              width={200}
              height={200}
              className="w-full aspect-square object-cover rounded-2xl border border-border/50"
              loading="eager"
            />
            <div>
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">{author.role}</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-1 mb-3">{author.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                {author.location}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">{author.shortBio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {author.expertise.map((e) => (
                  <span key={e} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {e}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {author.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`${author.name} no ${s.label}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </header>

          <section aria-labelledby="autor-bio-heading" className="mb-12">
            <h2 id="autor-bio-heading" className="font-display text-2xl font-bold mb-4">
              Sobre {author.name.split(" ")[0]}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {author.longBio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="autor-credenciais-heading" className="mb-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border/60 bg-card/40">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h2 id="autor-credenciais-heading" className="font-display text-lg font-bold">
                  Credenciais
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {author.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border/60 bg-card/40">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="font-display text-lg font-bold">Experiência</h2>
              </div>
              <ul className="space-y-3 text-sm">
                {author.experience.map((e) => (
                  <li key={e.year}>
                    <div className="text-xs text-primary font-semibold">{e.year}</div>
                    <div className="font-medium text-foreground">{e.title}</div>
                    <div className="text-muted-foreground">{e.company}</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="autor-posts-heading" className="mb-12">
            <h2 id="autor-posts-heading" className="font-display text-2xl font-bold mb-6">
              Artigos publicados ({posts.length})
            </h2>
            <div className="grid gap-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group block p-4 rounded-lg border border-border/50 bg-card/40 hover:border-primary/40 transition-all"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-1 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{p.category}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(p.publishedAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                </Link>
              ))}
            </div>
          </section>

          <section className="text-center p-8 rounded-2xl border border-primary/30 bg-primary/5">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-3">Precisa de ajuda direta?</h2>
            <p className="text-muted-foreground mb-6">Fale comigo no WhatsApp e contextualize sua operação.</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-8 py-3.5 rounded-lg transition-all hover:scale-105"
            >
              Falar com {author.name.split(" ")[0]}
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>
        </div>
      </main>

      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
};

export default Autor;
