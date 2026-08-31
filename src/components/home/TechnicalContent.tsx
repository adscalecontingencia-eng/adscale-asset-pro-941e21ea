import { Link } from "react-router-dom";
import { DISCLAIMER_META } from "./homeData";

const TechnicalContent = () => (
  <section
    className="section-padding bg-secondary/30 border-y border-border/50"
    aria-labelledby="conteudo-tecnico-heading"
  >
    <div className="container max-w-4xl">
      <h2
        id="conteudo-tecnico-heading"
        className="font-display text-3xl md:text-4xl font-bold mb-8"
      >
        Infraestrutura e contingência para Meta Ads: o que você precisa entender
      </h2>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            O que é contingência no contexto de Meta Ads
          </h3>
          <p>
            Contingência é a organização de ativos para que uma operação de mídia paga não
            dependa de um único ponto. Envolve distribuir perfis, Business Managers, páginas e
            contas de anúncios de forma estruturada, mantendo alternativas operacionais quando
            algum ativo deixa de estar disponível. Contingência não elimina riscos: restrições
            podem envolver fatores ligados ao negócio, às campanhas, às políticas da plataforma e
            ao comportamento operacional.
          </p>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Perfil, Business Manager, Página e Conta de Anúncios
          </h3>
          <p>
            O <Link to="/perfis-facebook" className="text-primary hover:underline">perfil Facebook</Link>{" "}
            é o usuário que administra ativos e recebe permissões. A{" "}
            <Link to="/business-manager" className="text-primary hover:underline">Business Manager</Link>{" "}
            é o ambiente empresarial que centraliza páginas, contas de anúncios, pixels, domínios
            e acessos de equipe. A{" "}
            <Link to="/paginas-facebook" className="text-primary hover:underline">página</Link> é o
            ativo público vinculado às campanhas. A conta de anúncios é onde campanhas e
            investimento são gerenciados. São elementos distintos, com funções distintas dentro da
            mesma estrutura.
          </p>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Perfis antigos e histórico de conta
          </h3>
          <p>
            Um{" "}
            <Link to="/perfil-facebook-antigo" className="text-primary hover:underline">
              perfil Facebook antigo
            </Link>{" "}
            é um perfil com histórico anterior de existência e utilização na plataforma. O termo
            técnico equivalente aparece em{" "}
            <Link to="/perfil-aged" className="text-primary hover:underline">perfil aged</Link>.
            Histórico não garante resultado nem estabilidade: é apenas uma característica do ativo.
          </p>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Estruturas para operações de alto volume
          </h3>
          <p>
            Operações com investimento elevado costumam trabalhar com mais de uma estrutura em
            paralelo, separando ativos por finalidade, produto ou mercado. Isso normalmente envolve
            combos de perfil, BM e página, além de{" "}
            <Link to="/aluguel-de-contas-meta-ads" className="text-primary hover:underline">
              contas de anúncios por acesso gerenciado
            </Link>{" "}
            para times que já conduzem as próprias campanhas.
          </p>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            BM para API Oficial do WhatsApp
          </h3>
          <p>
            Algumas Business Managers são voltadas para operações que utilizam integrações oficiais
            do WhatsApp, como a{" "}
            <Link to="/whatsapp-cloud-api" className="text-primary hover:underline">
              WhatsApp Cloud API
            </Link>
            . Características, limites e disponibilidade variam conforme a estrutura e o momento do
            mercado.
          </p>
        </div>

        <p className="text-sm">{DISCLAIMER_META}</p>
      </div>
    </div>
  </section>
);

export default TechnicalContent;
