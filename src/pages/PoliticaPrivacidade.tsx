import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";

const PoliticaPrivacidade = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SEO
      title="Política de Privacidade | AD Scale"
      description="Política de privacidade da AD Scale: dados coletados, uso de cookies, ferramentas de análise e canal de contato."
      canonical="/politica-de-privacidade"
    />
    <header className="border-b border-border/50">
      <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/"><Logo size={22} /></Link>
        <Link to="/solucoes-meta-ads" className="text-sm text-muted-foreground hover:text-foreground">Voltar</Link>
      </div>
    </header>
    <main className="container max-w-3xl mx-auto px-4 py-12 prose prose-invert max-w-none">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Política de Privacidade</h1>
      <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

      <h2 className="font-semibold text-xl mt-8 mb-2">1. Dados coletados</h2>
      <p className="text-muted-foreground">
        Podemos coletar dados fornecidos voluntariamente pelo usuário (como nome, e-mail, telefone e
        mensagens enviadas por canais de contato) e dados de navegação coletados automaticamente
        (endereço IP, tipo de dispositivo, páginas visitadas, origem do tráfego e parâmetros de URL
        como UTMs e gclid).
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">2. Cookies</h2>
      <p className="text-muted-foreground">
        Utilizamos cookies próprios e de terceiros para manter a sessão, lembrar preferências e
        analisar o uso do site. O usuário pode desativar cookies nas configurações do navegador, com
        possível impacto na experiência de uso.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">3. Uso dos dados</h2>
      <p className="text-muted-foreground">
        Os dados são utilizados para responder solicitações comerciais, enviar comunicações
        relacionadas aos serviços da AD Scale, analisar o desempenho do site e melhorar a experiência
        do usuário.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">4. Ferramentas de análise e anúncios</h2>
      <p className="text-muted-foreground">
        Podemos utilizar ferramentas como Google Analytics, Google Ads, Google Tag Manager e Meta
        Pixel para mensuração e otimização de campanhas. Essas ferramentas podem coletar dados
        anônimos sobre o uso do site conforme suas próprias políticas.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">5. Compartilhamento</h2>
      <p className="text-muted-foreground">
        Não vendemos dados pessoais. Podemos compartilhar informações com provedores de tecnologia
        utilizados para operar o site (hospedagem, análise, comunicação), respeitando as obrigações
        legais aplicáveis.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">6. Direitos do usuário</h2>
      <p className="text-muted-foreground">
        O usuário pode solicitar acesso, correção, exclusão ou portabilidade de seus dados pessoais
        a qualquer momento, por meio do canal de contato indicado abaixo.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">7. Contato</h2>
      <p className="text-muted-foreground">
        Para dúvidas sobre esta política, entre em contato com a AD Scale pelo WhatsApp disponível
        em nossas páginas de comunicação.
      </p>
    </main>
  </div>
);

export default PoliticaPrivacidade;
