import { Compass, Layers3, ShieldCheck, Users } from "lucide-react";

const ITEMS = [
  {
    icon: Layers3,
    title: "Variedade de ativos",
    text: "Perfis, BMs, páginas, contas gerenciadas, combos e BMs para API oficial em um só lugar.",
  },
  {
    icon: Compass,
    title: "Orientação sobre estruturas",
    text: "Ajudamos a entender qual tipo de configuração faz sentido para o estágio da sua operação.",
  },
  {
    icon: Users,
    title: "Atendimento consultivo",
    text: "Conversa direta com quem entende de infraestrutura para mídia paga, sem catálogo automático.",
  },
  {
    icon: ShieldCheck,
    title: "Foco em operações profissionais",
    text: "Estruturas pensadas para times que trabalham com volume e precisam de contingência organizada.",
  },
];

const WhyAdScale = () => (
  <section className="section-padding" aria-labelledby="por-que-heading">
    <div className="container max-w-6xl">
      <h2 id="por-que-heading" className="font-display text-3xl md:text-5xl font-bold mb-10 max-w-2xl">
        Por que operações escolhem a AD•SCALE
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((i) => {
          const Icon = i.icon;
          return (
            <div key={i.title} className="rounded-2xl border border-border/60 bg-card/70 p-6">
              <Icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold mb-2">{i.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{i.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyAdScale;
