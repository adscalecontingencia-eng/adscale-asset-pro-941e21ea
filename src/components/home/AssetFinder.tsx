import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { finderOptions } from "./homeData";
import { waHref } from "@/lib/whatsapp";
import { trackHomeEvent } from "@/lib/homeAnalytics";

const AssetFinder = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const option = finderOptions.find((o) => o.id === selected) ?? null;

  return (
    <section
      id="qual-ativo"
      className="section-padding bg-secondary/30 border-y border-border/50"
      aria-labelledby="qual-ativo-heading"
    >
      <div className="container max-w-5xl">
        <div className="max-w-2xl mb-10">
          <h2 id="qual-ativo-heading" className="font-display text-3xl md:text-5xl font-bold mb-4">
            Não sabe qual ativo precisa?
          </h2>
          <p className="text-muted-foreground text-lg">
            Escolha o que você precisa fazer e entenda qual tipo de estrutura pode ser
            relevante para sua operação.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {finderOptions.map((o) => {
            const active = o.id === selected;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(active ? null : o.id)}
                className={`text-left rounded-xl border px-5 py-4 text-sm md:text-base font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/60 bg-card/60 text-foreground/85 hover:border-primary/40"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>

        {option && (
          <div className="mt-6 rounded-2xl border border-primary/30 bg-card/80 p-6 md:p-8">
            <h3 className="font-display text-xl font-bold mb-3">{option.label}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{option.explanation}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              {option.href && option.linkLabel && (
                <Link
                  to={option.href}
                  className="inline-flex items-center justify-center gap-2 border border-border/60 bg-card px-6 py-3 rounded-xl font-medium text-foreground hover:border-primary/50 transition-colors"
                >
                  {option.linkLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <a
                href={waHref(option.waMessage)}
                data-wa-message={option.waMessage}
                data-cta={option.whatsappEvent}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackHomeEvent(option.whatsappEvent, {
                    category: option.analyticsCategory,
                    cta_location: "orientacao",
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-bold px-6 py-3 rounded-xl transition-all hover:scale-[1.03]"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com a AD•SCALE
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AssetFinder;
