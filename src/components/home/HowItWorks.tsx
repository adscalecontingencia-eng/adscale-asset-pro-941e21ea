const STEPS = [
  {
    n: "01",
    title: "Você explica sua operação",
    text: "Conte como sua operação de Meta Ads funciona hoje, o volume envolvido e o que precisa ser estruturado.",
  },
  {
    n: "02",
    title: "Entendemos qual tipo de estrutura faz sentido",
    text: "Avaliamos quais categorias de ativos — perfil, BM, página, conta ou combo — são relevantes para o seu cenário.",
  },
  {
    n: "03",
    title: "Consultamos disponibilidade",
    text: "Disponibilidade, configuração e condições variam conforme mercado e tipo de ativo, por isso a consulta é feita caso a caso.",
  },
  {
    n: "04",
    title: "Você recebe as opções disponíveis",
    text: "Apresentamos as opções compatíveis com a necessidade descrita e as características de cada estrutura.",
  },
  {
    n: "05",
    title: "Entrega e orientação inicial",
    text: "Após a definição, a estrutura é entregue com orientação inicial de uso. A operação das campanhas segue com o seu time.",
  },
];

const HowItWorks = () => (
  <section id="como-funciona" className="section-padding" aria-labelledby="como-funciona-heading">
    <div className="container max-w-5xl">
      <div className="max-w-2xl mb-12">
        <h2 id="como-funciona-heading" className="font-display text-3xl md:text-5xl font-bold mb-4">
          Como funciona
        </h2>
        <p className="text-muted-foreground text-lg">
          Um processo simples e consultivo, do primeiro contato à entrega da estrutura.
        </p>
      </div>

      <ol className="space-y-4">
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="flex gap-5 rounded-2xl border border-border/60 bg-card/60 p-6"
          >
            <span className="font-display text-2xl font-bold text-primary shrink-0">{s.n}</span>
            <div>
              <h3 className="font-display text-lg font-bold mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
