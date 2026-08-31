import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { DISCLAIMER_META, homeCategories } from "./homeData";
import { waHref } from "@/lib/whatsapp";
import { trackHomeEvent } from "@/lib/homeAnalytics";

const CategoriesSection = () => {
  return (
    <section id="categorias" className="section-padding" aria-labelledby="categorias-heading">
      <div className="container max-w-6xl">
        <div className="max-w-2xl mb-12">
          <p className="text-sm text-primary font-semibold mb-3">O que a AD•SCALE oferece</p>
          <h2 id="categorias-heading" className="font-display text-3xl md:text-5xl font-bold mb-4">
            Infraestrutura para sua operação de Meta Ads
          </h2>
          <p className="text-muted-foreground text-lg">
            Perfis, Business Managers, Páginas, Contas de Anúncios e outras estruturas para
            diferentes necessidades operacionais.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <article
                key={cat.id}
                className="flex flex-col rounded-2xl border border-border/60 bg-card/70 p-6 transition-colors hover:border-primary/40"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>

                <h3 className="font-display text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {cat.description}
                </p>

                <ul className="space-y-1.5 mb-6 text-sm">
                  {cat.concepts.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-foreground/80">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  {cat.href ? (
                    <Link
                      to={cat.href}
                      onClick={() =>
                        trackHomeEvent(cat.categoryEvent, {
                          category: cat.analyticsCategory,
                          cta_location: "categorias",
                        })
                      }
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      {cat.ctaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={waHref(cat.waMessage!)}
                      data-wa-message={cat.waMessage}
                      data-cta={cat.whatsappEvent}
                      data-wa-category={cat.analyticsCategory}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackHomeEvent(cat.categoryEvent, {
                          category: cat.analyticsCategory,
                          cta_location: "categorias",
                        });
                        trackHomeEvent(cat.whatsappEvent, {
                          category: cat.analyticsCategory,
                          cta_location: "categorias",
                        });
                      }}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {cat.ctaLabel}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{DISCLAIMER_META}</p>
      </div>
    </section>
  );
};

export default CategoriesSection;
