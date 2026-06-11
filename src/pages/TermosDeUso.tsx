import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";

const TermosDeUso = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SEO
      title="Termos de Uso | AD Scale"
      description="Termos de uso da AD Scale: finalidade informativa, limitação de responsabilidade e independência em relação a Meta e Google."
      canonical="/termos-de-uso"
    />
    <header className="border-b border-border/50">
      <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/"><Logo size={22} /></Link>
        <Link to="/solucoes-meta-ads" className="text-sm text-muted-foreground hover:text-foreground">Voltar</Link>
      </div>
    </header>
    <main className="container max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Termos de Uso</h1>
      <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

      <h2 className="font-semibold text-xl mt-8 mb-2">1. Finalidade informativa</h2>
      <p className="text-muted-foreground">
        Esta página e seus conteúdos têm finalidade exclusivamente informativa, apresentando a
        atuação consultiva da AD Scale para organização e estrutura de operações de Meta Ads.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">2. Ausência de garantia de resultados</h2>
      <p className="text-muted-foreground">
        A AD Scale não garante aprovação de anúncios, ausência de restrições, retorno financeiro ou
        qualquer resultado específico de campanha. Resultados em Meta Ads dependem de inúmeros
        fatores fora do controle da AD Scale, incluindo políticas das plataformas, qualidade da
        oferta, criativos, página de destino e gestão da operação.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">3. Limitação de responsabilidade</h2>
      <p className="text-muted-foreground">
        A AD Scale não se responsabiliza por decisões tomadas pelo usuário com base nos conteúdos
        publicados, nem por eventuais perdas decorrentes do uso de informações desta página.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">4. Independência</h2>
      <p className="text-muted-foreground">
        A AD Scale é uma empresa independente e não possui afiliação oficial com Meta Platforms,
        Facebook, Instagram, WhatsApp, Google ou quaisquer outras plataformas mencionadas. Todas as
        marcas citadas pertencem aos seus respectivos proprietários.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">5. Alterações</h2>
      <p className="text-muted-foreground">
        Estes termos podem ser atualizados a qualquer momento. A versão vigente é sempre a publicada
        nesta página.
      </p>
    </main>
  </div>
);

export default TermosDeUso;
