import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";

const PoliticaPrivacidade = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SEO
      title="Política de Privacidade | AD Scale"
      description="Política de privacidade da AD Scale em conformidade com a LGPD (Lei 13.709/2018): dados coletados, bases legais, cookies, direitos do titular e canal de contato."
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
      <p className="text-muted-foreground">Última atualização: 16 de junho de 2026</p>

      <p className="text-muted-foreground mt-4">
        Esta Política de Privacidade descreve como a AD Scale ("nós") coleta, utiliza e protege
        dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº
        13.709/2018 — LGPD)</strong>.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">1. Controlador e Encarregado de Dados</h2>
      <p className="text-muted-foreground">
        Controlador: AD Scale. Encarregado de Dados (DPO) responsável por requisições da LGPD:
        <strong> privacidade@adscalecontingencia.com</strong>. Prazo de resposta às requisições de
        titulares: <strong>até 15 dias úteis</strong>.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">2. Dados coletados</h2>
      <p className="text-muted-foreground">
        Coletamos dados fornecidos voluntariamente (nome, e-mail, telefone, conteúdo de mensagens
        enviadas pelos canais de contato — incluindo WhatsApp) e dados de navegação coletados
        automaticamente (endereço IP, tipo de dispositivo, páginas visitadas, origem do tráfego,
        identificadores de sessão e parâmetros de URL como UTMs e gclid).
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">3. Finalidades e bases legais (art. 7º LGPD)</h2>
      <ul className="text-muted-foreground list-disc pl-5 space-y-2">
        <li><strong>Contato comercial e execução pré-contratual:</strong> responder solicitações via formulário ou WhatsApp — base legal: execução de contrato/procedimentos preliminares (art. 7º, V).</li>
        <li><strong>Newsletter:</strong> envio de comunicações sobre conteúdo e serviços — base legal: consentimento (art. 7º, I). Você pode cancelar a qualquer momento.</li>
        <li><strong>Analytics e melhoria do site:</strong> análise de uso e desempenho — base legal: legítimo interesse (art. 7º, IX).</li>
        <li><strong>Cumprimento de obrigações legais e fiscais</strong> (art. 7º, II).</li>
      </ul>

      <h2 className="font-semibold text-xl mt-8 mb-2">4. Cookies e tecnologias de rastreamento</h2>
      <p className="text-muted-foreground">
        Utilizamos cookies próprios (essenciais para funcionamento) e cookies de terceiros para
        análise (Google Analytics) e publicidade (Google Ads, Meta Pixel). Cookies não essenciais
        dependem de consentimento, gerenciável pelo banner de cookies exibido no primeiro acesso
        e revisável a qualquer momento nas configurações do navegador.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">5. Compartilhamento de dados</h2>
      <p className="text-muted-foreground">
        Não vendemos dados pessoais. Compartilhamos dados estritamente necessários com operadores
        de tecnologia (hospedagem, banco de dados, e-mail, analytics, comunicação). Alguns desses
        operadores (Google, Meta) podem processar dados em servidores fora do Brasil, em
        conformidade com o art. 33 da LGPD.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">6. Direitos do titular (art. 18 LGPD)</h2>
      <p className="text-muted-foreground">
        Você pode, a qualquer momento e de forma gratuita, solicitar: confirmação da existência
        de tratamento; acesso aos dados; correção; anonimização, bloqueio ou eliminação;
        portabilidade; informações sobre compartilhamento; revogação do consentimento. Requisições
        pelo e-mail do DPO acima ou pelo WhatsApp da AD Scale.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">7. Comunicação via WhatsApp</h2>
      <p className="text-muted-foreground">
        Ao iniciar conversa pelo WhatsApp da AD Scale, seus dados de contato e informações
        comerciais compartilhadas são tratados para atendimento e execução pré-contratual (art.
        7º, V). Retenção: enquanto durar a relação comercial ou por obrigação legal aplicável.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">8. Retenção</h2>
      <p className="text-muted-foreground">
        Mantemos dados pelo tempo necessário às finalidades descritas ou conforme exigência
        legal. Leads não convertidos: até 24 meses. Clientes ativos: durante toda a relação +
        prazo de obrigações fiscais. Dados de analytics agregados: até 26 meses (padrão GA4).
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">9. Segurança</h2>
      <p className="text-muted-foreground">
        Aplicamos medidas técnicas e administrativas razoáveis para proteger dados pessoais
        contra acesso não autorizado, perda ou alteração. Em caso de incidente que possa gerar
        risco relevante, notificamos a ANPD e os titulares afetados, conforme art. 48 da LGPD.
      </p>

      <h2 className="font-semibold text-xl mt-8 mb-2">10. Contato e reclamações</h2>
      <p className="text-muted-foreground">
        Dúvidas e requisições: <strong>privacidade@adscalecontingencia.com</strong>. Você também
        pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
      </p>
    </main>
  </div>
);

export default PoliticaPrivacidade;
