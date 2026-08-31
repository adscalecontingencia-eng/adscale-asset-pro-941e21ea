import { Link } from "react-router-dom";

const NODES = [
  {
    title: "Perfil Facebook",
    text: "Usuário administrador que recebe permissões e opera os ativos.",
    href: "/perfis-facebook",
    linkLabel: "Perfis Facebook",
  },
  {
    title: "Business Manager",
    text: "Ambiente empresarial que centraliza páginas, contas, pixels e permissões.",
    href: "/business-manager",
    linkLabel: "Business Manager",
  },
  {
    title: "Página",
    text: "Ativo público vinculado às campanhas e à comunicação da operação.",
    href: "/paginas-facebook",
    linkLabel: "Páginas Facebook",
  },
  {
    title: "Conta de Anúncios",
    text: "Onde campanhas, criativos e investimento são gerenciados.",
    href: "/aluguel-de-contas-meta-ads",
    linkLabel: "Contas de Anúncios",
  },
];

const StructureDiagram = () => (
  <section
    className="section-padding bg-secondary/30 border-y border-border/50"
    aria-labelledby="estrutura-heading"
  >
    <div className="container max-w-6xl">
      <div className="max-w-2xl mb-12">
        <h2 id="estrutura-heading" className="font-display text-3xl md:text-5xl font-bold mb-4">
          Como uma estrutura de Meta Ads é organizada
        </h2>
        <p className="text-muted-foreground text-lg">
          Entender o papel de cada ativo ajuda a decidir o que sua operação realmente precisa.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {NODES.map((n, i) => (
          <div key={n.title} className="rounded-2xl border border-border/60 bg-card/70 p-6">
            <span className="text-xs font-semibold text-primary">Etapa {i + 1}</span>
            <h3 className="font-display text-lg font-bold mt-2 mb-2">{n.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{n.text}</p>
            <Link
              to={n.href}
              className="text-primary text-sm font-semibold hover:underline"
            >
              {n.linkLabel}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground max-w-3xl">
        Perfil, Business Manager, Página e Conta de Anúncios são ativos diferentes com funções
        distintas. Combos e estruturas reúnem esses elementos quando a operação precisa de um
        conjunto mais completo.
      </p>
    </div>
  </section>
);

export default StructureDiagram;
