import { Check, X } from "lucide-react";

const ComparisonSection = () => {
  const comparisonPoints = [
    {
      label: "Idade do ativo",
      common: "Perfil recém-criado",
      adscale: "Idade real + warm-up consistente",
    },
    {
      label: "Trust Score no Meta",
      common: "Low / Médio (susceptível a revista)",
      adscale: "High Score (resistência natural)",
    },
    {
      label: "Histórico de gasto",
      common: "Sem histórico",
      adscale: "Spending track D0–30 cap estendido",
    },
    {
      label: "Fingerprints e configurações",
      common: "Genérica ou automatizada",
      adscale: "Manual, única e criptografada",
    },
    {
      label: "Suporte pós-venda",
      common: "Inexistente ou demorado",
      adscale: "Briefing técnico 1 a 1 incluso",
    },
    {
      label: "Troca em caso de bloqueio",
      common: "Sem cobertura",
      adscale: "Avaliação caso a caso",
    },
  ];

  return (
    <section id="comparacao" className="py-24 bg-card/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="badge-pill mb-4 mx-auto">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Por que profissionais confiam nos nossos ativos
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ativo comum vs. <span className="text-gradient">Ativo Adscale</span>
          </h2>
        </div>

        {/* Desktop / Tablet: Table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm">
          <div className="grid grid-cols-[1fr,1fr,1fr] border-b border-border/50 bg-muted/30">
            <div className="p-6 text-left font-semibold text-muted-foreground text-sm uppercase tracking-wider">
              Característica
            </div>
            <div className="p-6 text-center font-semibold text-muted-foreground text-sm uppercase tracking-wider border-x border-border/50">
              Ativo Comum
            </div>
            <div className="p-6 text-center font-semibold text-primary text-sm uppercase tracking-wider">
              Ativo Adscale
            </div>
          </div>

          {comparisonPoints.map((point, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr,1fr,1fr] border-b border-border/50 last:border-b-0"
            >
              <div className="p-6 text-left text-foreground font-medium flex items-center">
                {point.label}
              </div>
              <div className="p-6 text-center border-x border-border/50 flex items-center justify-center gap-2 text-muted-foreground">
                <X className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-sm">{point.common}</span>
              </div>
              <div className="p-6 text-center flex items-center justify-center gap-2 bg-primary/5">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{point.adscale}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Stacked comparison cards */}
        <div className="md:hidden space-y-4">
          {comparisonPoints.map((point, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden"
            >
              <div className="px-5 py-3 bg-muted/30 border-b border-border/50">
                <h3 className="font-display font-semibold text-foreground text-base">
                  {point.label}
                </h3>
              </div>

              <div className="divide-y divide-border/50">
                {/* Ativo comum */}
                <div className="p-5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                      Ativo Comum
                    </p>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {point.common}
                    </p>
                  </div>
                </div>

                {/* Ativo Adscale */}
                <div className="p-5 flex items-start gap-3 bg-primary/5">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                      Ativo Adscale
                    </p>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {point.adscale}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Todos os ativos são curados individualmente para operações de alto volume.
        </p>
      </div>
    </section>
  );
};

export default ComparisonSection;
