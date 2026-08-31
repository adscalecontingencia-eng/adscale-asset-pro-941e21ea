import { ArrowRight, MessageCircle } from "lucide-react";
import DotGlobe from "@/components/DotGlobe";
import { WA_MESSAGES } from "./homeData";
import { waHref } from "@/lib/whatsapp";
import { trackHomeEvent } from "@/lib/homeAnalytics";

const CHIPS = [
  "Perfis",
  "BMs",
  "Páginas",
  "Estruturas",
  "Contas Gerenciadas",
  "API Oficial",
];

const HomeHero = () => {
  const waUrl = waHref(WA_MESSAGES.general);

  return (
    <section className="relative overflow-hidden w-full">
      <div className="absolute inset-0 grid-texture opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.10),transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 neon-divider" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 pb-16 md:pt-36 md:pb-24">
        <div className="grid lg:grid-cols-[1.15fr_auto] gap-10 items-center">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="badge-pill mb-6 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Infraestrutura e contingência para Meta Ads
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
              Contingência Meta Ads para Operações de Alto Volume
            </h1>

            <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-4">
              A AD•SCALE fornece Perfis Facebook, Business Managers, Páginas, Contas de
              Anúncios e estruturas para operações profissionais de Meta Ads.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              Encontre a estrutura adequada para sua operação e consulte disponibilidade
              diretamente com nossa equipe.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#categorias"
                className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-8 py-4 rounded-xl text-base md:text-lg transition-all hover:scale-[1.03]"
              >
                Conhecer Soluções
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={waUrl}
                data-wa-message={WA_MESSAGES.general}
                data-cta="homepage_whatsapp_hero"
                data-wa-category="geral"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackHomeEvent("homepage_whatsapp_hero", {
                    category: "geral",
                    cta_location: "hero",
                  })
                }
                className="inline-flex items-center justify-center gap-2 border border-border/60 bg-card/60 px-8 py-4 rounded-xl text-base md:text-lg font-medium text-foreground transition-all hover:border-primary/50"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
                Falar com a AD•SCALE
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2 justify-center lg:justify-start text-sm text-muted-foreground">
              {CHIPS.map((chip, i) => (
                <li key={chip} className="flex items-center gap-3">
                  <span className="text-foreground/80">{chip}</span>
                  {i < CHIPS.length - 1 && (
                    <span aria-hidden="true" className="text-primary/60">
                      •
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <DotGlobe size={420} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
