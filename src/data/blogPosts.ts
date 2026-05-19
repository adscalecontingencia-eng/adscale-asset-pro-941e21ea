export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: "Topo de funil" | "Meio de funil" | "Fundo de funil";
  readingTime: string;
  publishedAt: string;
  /** OG/social share image path under /og */
  ogImage: string;
  /** Markdown-like content rendered by BlogPost page */
  content: string;
  /** Optional per-post mid-article CTA overrides (rendered by BlogPost page). */
  ctaTitle?: string;
  ctaDescription?: string;
  ctaWhatsappMessage?: string;
  ctaLabel?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "o-que-e-business-manager-verificada-meta",
    title: "O que é uma Business Manager Verificada e por que ela importa em 2025",
    description: "Entenda como funciona a verificação de BM no Meta, quais critérios o Facebook avalia e por que ter uma BM Verificada é essencial para operações de alto volume em Meta Ads.",
    keywords: ["BM verificada", "business manager verificada", "verificação meta business", "como verificar BM facebook", "BM verificada meta ads"],
    category: "Topo de funil",
    readingTime: "6 min",
    publishedAt: "2025-01-08",
    ogImage: "/og/og-bm-verificada.jpg",
    content: `
A Business Manager (BM) é o coração de qualquer operação séria dentro do Meta Ads. Ela centraliza contas de anúncio, páginas, pixels, catálogos e permissões de equipe. Quando essa BM passa pelo processo oficial de verificação de negócio do Meta, ela recebe um selo interno conhecido no mercado como **BM Verificada** — e isso muda completamente como o algoritmo do Meta enxerga a sua estrutura.

## O que significa "verificada" para o Meta

Segundo a documentação oficial do Meta Business Help Center, a verificação de negócio confirma que existe uma empresa real por trás da conta: CNPJ ativo, documentos compatíveis, endereço comercial e domínio próprio. Esse processo libera funcionalidades sensíveis (como acesso a APIs avançadas, WhatsApp Business API, catálogos completos) e, na prática, eleva o **Trust Score** interno do ativo.

## Por que isso impacta sua operação de mídia

- **Limites de gasto maiores e mais estáveis** — Spending caps iniciais costumam ser maiores em BMs verificadas.
- **Menor probabilidade de revisões automáticas agressivas** — O Meta tende a confiar mais em estruturas com histórico documental validado.
- **Recuperação mais rápida em caso de bloqueio** — O fluxo de appeal abre caminhos extras quando a empresa está verificada.
- **Acesso a recursos avançados** — Conversões offline, CAPI, ofertas dinâmicas, integrações com CRM.

## Quando faz sentido comprar uma BM Verificada pronta

Para operações que rodam **R$ 50 mil ou mais por dia**, esperar dias ou semanas pelo processo de verificação significa perder leilão. Por isso, gestores experientes mantêm uma frota de BMs verificadas como camada de contingência — pronta para subir no instante em que uma estrutura principal sofre review.

## Cuidados ao adquirir

Nem toda BM "verificada" no mercado é legítima. Antes de comprar, exija:

1. Histórico real de uso (não apenas verificação fresca).
2. Domínio verificado dentro da BM.
3. Origem rastreável e briefing técnico de handover.
4. Suporte para configurar fingerprint e warm-up corretos.

> **Resumindo:** uma BM Verificada não é luxo, é infraestrutura. Operações que escalam de verdade tratam contingência como linha de produção, não como solução de emergência.
`,
  },
  {
    slug: "trust-score-meta-ads-como-funciona",
    title: "Trust Score no Meta Ads: o sinal invisível que decide se você escala",
    description: "Aprenda como o Meta calcula o Trust Score de contas, perfis e BMs, quais sinais elevam ou derrubam essa pontuação e como proteger seus ativos.",
    keywords: ["trust score meta", "trust score facebook ads", "como funciona trust score", "score de confiança meta", "reputação conta facebook ads"],
    category: "Meio de funil",
    readingTime: "8 min",
    publishedAt: "2025-01-12",
    ogImage: "/og/og-trust-score.jpg",
    content: `
"Trust Score" é o termo de mercado para o **score interno de confiança** que o Meta atribui a cada ativo da plataforma — perfis pessoais, páginas, contas de anúncio e BMs. Embora o Meta não publique a fórmula, o comportamento da plataforma e a documentação oficial deixam claros os sinais que pesam nessa pontuação.

## Sinais que elevam o Trust Score

- **Idade do ativo** — Perfis e páginas com anos de atividade orgânica são vistos como mais legítimos.
- **Histórico de gasto consistente** — Contas que gastaram volume sem disputas ou reembolsos têm peso positivo.
- **Verificação de negócio** — BMs verificadas elevam toda a hierarquia abaixo delas.
- **Fingerprint estável** — IP, navegador, dispositivo e fuso horário consistentes ao longo do tempo.
- **Engajamento orgânico real** — Páginas com seguidores, posts e interações reais (não compradas) têm score mais alto.
- **Conformidade com políticas** — Zero advertências, disputas ganhas, criativos dentro das diretrizes.

## Sinais que derrubam o Trust Score

- Login em IPs de risco (proxies residenciais mal configurados, VPNs públicas).
- Trocas frequentes de método de pagamento.
- Picos abruptos de gasto sem warm-up.
- Criativos com termos sensíveis (saúde, finanças, before/after).
- Disputas de cartão de crédito.
- Acesso compartilhado por muitos usuários em pouco tempo.

## Como proteger o Trust Score na prática

1. **Warm-up disciplinado**: comece com R$ 50–100/dia e dobre a cada 48–72h.
2. **Fingerprint dedicado**: cada ativo deve ter seu próprio ambiente (perfil de navegador, IP residencial, dispositivo).
3. **Não misture nichos sensíveis na mesma BM**.
4. **Documente tudo**: comprovantes de pagamento, NFs, identidade — para defender em revisões.
5. **Diversifique a frota** — não rode 100% do orçamento em uma única BM.

## Por que isso importa para contingência

Quando você compra um ativo de contingência, está comprando **Trust Score** — não só uma BM ou perfil. Ativos antigos, com histórico orgânico real e fingerprint limpo, sustentam volume onde contas novas seriam derrubadas no primeiro pico de leilão.
`,
  },
  {
    slug: "bloqueio-conta-anuncio-meta-como-evitar",
    title: "Bloqueio de conta de anúncio no Meta: causas reais e como evitar",
    description: "Conheça os principais motivos de bloqueio de contas no Meta Ads segundo a documentação oficial e descubra como estruturar contingência profissional.",
    keywords: ["bloqueio conta meta ads", "conta facebook bloqueada", "como evitar bloqueio meta", "anti-bloqueio facebook ads", "conta de anúncio inativada"],
    category: "Meio de funil",
    readingTime: "7 min",
    publishedAt: "2025-01-15",
    ogImage: "/og/og-bloqueio.jpg",
    content: `
Toda operação séria no Meta Ads vai sofrer bloqueio em algum momento. A diferença entre um operador iniciante e um gestor sênior é **quanto tempo ele leva pra voltar ao ar**. Este artigo detalha as causas reais de bloqueio segundo o Meta e como construir uma estrutura que aguenta.

## Tipos de bloqueio no Meta

### 1. Bloqueio de conta de anúncio
A conta específica é desabilitada, mas a BM continua ativa. Costuma vir após violações de política em criativos.

### 2. Bloqueio de BM
A Business Manager inteira é desabilitada — todas as contas de anúncio dentro dela param. Geralmente associado a histórico ruim acumulado.

### 3. Restrição de perfil pessoal
O perfil que administra a BM é restringido. Sem perfil, sem acesso à BM. Esse é o cenário mais devastador.

### 4. Restrições de página
A fan page é restringida de anunciar — geralmente por reclamações repetidas ou conteúdo sinalizado.

## Causas mais comuns segundo a documentação do Meta

- **Violação de políticas de anúncio** (saúde, finanças, dating, before/after, claims falsas).
- **Atividade incomum na conta** (login de geolocalizações distintas em curto intervalo).
- **Pagamentos não autorizados ou disputas** repetidas.
- **Identidade não confirmada** quando solicitada.
- **Atividade em massa** (muitas mudanças simultâneas em campanhas/criativos).
- **Reincidência** após advertências.

## A estrutura de contingência que funciona

Operações profissionais não tentam "evitar" bloqueio — elas se preparam para ele. A arquitetura padrão de contingência inclui:

| Camada | Quantidade típica | Função |
|---|---|---|
| BMs Verificadas em standby | 3–10 | Substituem a BM principal em minutos |
| BMs antigas (aged) | 5–15 | Cama de spending warm-up imediato |
| Perfis aged | 10–20 | Administradores com histórico real |
| Páginas antigas | 5–10 | Continuidade de social proof |

Sem essa frota, você passa dias reconstruindo o que levou meses pra montar.

## O custo real de não ter contingência

Para uma operação que fatura **R$ 80 mil/dia**, cada hora parada equivale a milhares em receita perdida — sem contar a queda de aprendizado das campanhas. Investir em ativos de contingência premium (BM verificada, perfis e páginas aged) deixa de ser custo e vira **proteção de cash flow**.
`,
  },
  {
    slug: "warm-up-conta-anuncio-meta-passo-a-passo",
    title: "Warm-up de conta de anúncio no Meta: protocolo passo a passo",
    description: "Aprenda o protocolo completo de aquecimento de contas no Meta Ads para evitar bloqueios precoces e construir histórico de gasto sólido.",
    keywords: ["warm-up conta meta ads", "aquecimento conta facebook ads", "spending limit meta", "como aquecer conta de anúncio", "D0 facebook ads"],
    category: "Meio de funil",
    readingTime: "9 min",
    publishedAt: "2025-01-18",
    ogImage: "/og/og-warmup.jpg",
    content: `
Warm-up (aquecimento) é o processo de gastar de forma gradual e controlada nos primeiros dias de uma conta de anúncio para que o Meta a reconheça como conta confiável. Pular essa etapa é o erro mais caro que um gestor pode cometer — mesmo com ativo aged.

## Por que warm-up importa mesmo em conta antiga

Mesmo uma BM Verificada com 5 anos de idade tem **D0 spending cap** quando você sobe a primeira campanha. O Meta avalia comportamento recente, não só histórico. Disparar R$ 5 mil no primeiro dia em uma conta zerada é o caminho mais rápido para revisão automática.

## Protocolo de warm-up em 7 dias

### D0 (dia da estreia)
- 1 campanha CBO ou ABO simples
- Orçamento: **R$ 50–80**
- Objetivo: Tráfego ou Engajamento (não Conversão ainda)
- 1 conjunto, 2–3 criativos validados

### D1
- Mesmo orçamento
- Adicione 1 conjunto novo (não duplique)

### D2–D3
- Suba para **R$ 150–200/dia**
- Migre para Conversão se a conversão estiver mapeada
- Mantenha CBO

### D4–D5
- **R$ 400–600/dia**
- Comece a usar criativos novos junto com os validados

### D6–D7
- **R$ 800–1.200/dia**
- A partir daqui, escala segue a mecânica natural da operação

## Regras inegociáveis durante o warm-up

1. **Nunca duplique conjuntos no D0–D2** — o Meta interpreta como bot.
2. **Não pause e reative campanhas no mesmo dia.**
3. **Evite edições em massa** — mude um parâmetro por vez.
4. **Use o mesmo navegador, IP e dispositivo** durante toda a semana.
5. **Pague com cartão real e nominal**, sem trocar de método.
6. **Não suba criativo polêmico no D0** — guarde para depois do D7.

## Sinais de que o warm-up está funcionando

- CPMs estáveis ou em queda.
- Aprovação de criativos sem revisão manual.
- Spending cap diário aumenta organicamente.
- Sem notificações de "atividade incomum".

## Quando algo dá errado

Se aparecer "conta em revisão" no D2 ou D3:
- **Não pause campanhas.** Deixe rodar dentro do limite.
- **Não mude pagamento.** Qualquer alteração agora é gatilho.
- Aguarde 24–48h. Se for review automática, geralmente libera.

Warm-up bem feito é o que separa uma frota de contingência **durável** de uma queimadeira de ativos.
`,
  },
  {
    slug: "como-escolher-fornecedor-bm-verificada",
    title: "Como escolher fornecedor de BM Verificada: 9 critérios técnicos",
    description: "Guia técnico para gestores de tráfego avaliarem fornecedores de ativos de contingência: o que perguntar, o que evitar e o que exigir.",
    keywords: ["comprar BM verificada", "fornecedor de contas facebook ads", "onde comprar BM antiga", "fornecedor ativos meta ads", "comprar conta facebook ads"],
    category: "Fundo de funil",
    readingTime: "8 min",
    publishedAt: "2025-01-22",
    ogImage: "/og/og-fornecedor.jpg",
    content: `
O mercado de ativos de contingência cresceu — e com ele, fornecedores improvisados que entregam BM "verificada" feita na semana, perfis sem histórico real e zero suporte pós-venda. Para um gestor que opera **R$ 100 mil/dia ou mais**, escolher mal aqui custa caro.

## Os 9 critérios que importam

### 1. Origem rastreável do ativo
Pergunte: **"Qual a origem desse ativo? Como ele foi cultivado?"**
Resposta evasiva = passe adiante. Fornecedor sério explica.

### 2. Idade real e comprovável
Não basta dizer "BM antiga". Exija screenshot do histórico de criação dentro do Business Settings.

### 3. Histórico de gasto documentado
BMs com track record de gasto valem 3–5x mais. Peça print do histórico.

### 4. Verificação de domínio
A BM deve ter pelo menos 1 domínio já verificado dentro dela. Isso atesta que a verificação é genuína.

### 5. Briefing técnico de handover
Fornecedor profissional entrega:
- Configuração de fingerprint recomendada
- Tipo de IP (residencial/móvel) compatível
- Cronograma de warm-up sugerido
- Lista de "do's and don'ts" específicos do ativo

### 6. Suporte pós-venda
O que acontece se a BM bloquear no D3? Tem reposição? Tem orientação técnica? Tem grupo de comunicação direto?

### 7. Política de exclusividade
Cada ativo deve ser **vendido uma única vez**. Pergunte explicitamente.

### 8. Curadoria por nicho
Ativo bom para e-commerce físico não é o mesmo que bom para infoproduto. Fornecedor sênior pergunta antes de oferecer.

### 9. Tempo de mercado e referências
Quanto tempo o fornecedor opera? Tem clientes-referência que você pode validar?

## Bandeiras vermelhas

- Preço muito abaixo da média (BM verificada legítima não é barata).
- "BM verificada em 24h" — verificação real leva dias.
- Catálogo público com estoque "infinito".
- Pagamento exclusivamente em cripto, sem CNPJ.
- Sem briefing, sem suporte, sem garantias.

## Pergunta final que filtra fornecedor amador

> *"Qual configuração de fingerprint você recomenda para esse ativo específico, e por quê?"*

Se ele não souber responder, ele não cultivou o ativo — está revendendo.
`,
  },
  {
    slug: "perfil-aged-facebook-por-que-administrador-importa",
    title: "Perfil aged no Facebook: por que o administrador da BM define sua estabilidade",
    description: "Entenda o papel do perfil pessoal antigo (aged) na operação de Meta Ads e por que ele é tão crítico quanto a própria BM Verificada.",
    keywords: ["perfil aged facebook", "perfil antigo facebook ads", "perfil administrador BM", "conta pessoal facebook ads", "perfil para business manager"],
    category: "Meio de funil",
    readingTime: "6 min",
    publishedAt: "2025-01-25",
    ogImage: "/og/og-perfil-aged.jpg",
    content: `
A maior parte dos operadores foca obsessivamente na BM e na conta de anúncio — e esquece que **toda BM precisa de um perfil pessoal administrando**. Esse perfil é o ponto mais frágil (e mais ignorado) da arquitetura de contingência.

## O que é um perfil "aged"

Perfil aged é uma conta pessoal do Facebook com:
- **Idade real de 2+ anos** (preferencialmente 5+).
- Histórico de uso orgânico (posts, fotos, amigos, grupos).
- Sem histórico de violações.
- Verificação de identidade quando solicitada.
- Pagamentos e logins consistentes ao longo do tempo.

## Por que o perfil é o calcanhar de Aquiles

- Se o perfil cai, **toda BM administrada por ele perde acesso simultaneamente**.
- Perfil novo administrando BM antiga = sinal vermelho para o Meta.
- Trocar administrador rapidamente é gatilho de revisão.
- Perfil sem histórico orgânico não consegue passar pela checagem de identidade do Meta.

## Como o Meta avalia um perfil

Segundo padrões observáveis na plataforma:
- Tempo desde a criação.
- Volume e qualidade de conexões (amigos reais).
- Atividade orgânica (posts, comments, reactions).
- Consistência de localização e dispositivo.
- Histórico em grupos e páginas.
- Confirmações de identidade no passado.

## Boas práticas para perfis administradores

1. **Não rode anúncios diretamente do perfil** — administre apenas a BM.
2. **Mantenha atividade orgânica leve mas constante** (1–2 interações/semana).
3. **Cada perfil deve ter ambiente dedicado** — fingerprint próprio, IP residencial fixo.
4. **Não administre dezenas de BMs com o mesmo perfil** — distribua.
5. **Confirme identidade quando solicitado** — perfil que falha em ID-check fica marcado.

## Quando comprar perfil aged

- Quando você precisa de um administrador limpo para uma BM nova.
- Quando seu perfil principal sofreu restrição.
- Quando você quer **isolar operações** (não misturar BMs do mesmo cliente sob o mesmo perfil).

Operações sérias mantêm uma reserva de **5 a 20 perfis aged** prontos pra entrar como administrador no momento em que um perfil principal falha.
`,
  },
  {
    slug: "pagina-antiga-facebook-impacto-na-performance",
    title: "Página antiga no Facebook: o impacto real na performance dos seus anúncios",
    description: "Por que páginas (fan pages) antigos performam melhor, têm menos restrições e como integrá-las à sua estrutura de contingência.",
    keywords: ["página antiga facebook", "fan page aged", "página facebook ads", "página antiga para anúncios", "social proof facebook"],
    category: "Topo de funil",
    readingTime: "5 min",
    publishedAt: "2025-01-28",
    ogImage: "/og/og-pagina-antiga.jpg",
    content: `
A página (fan page) que aparece como remetente do anúncio carrega muito mais peso do que a maioria dos gestores imagina. Ela influencia CTR, qualidade percebida, custo por resultado e — especialmente — a probabilidade de restrições.

## Por que página antiga performa melhor

### 1. Social proof imediato
Páginas com seguidores, avaliações e posts antigos transmitem legitimidade no primeiro impacto. Isso reduz o atrito do scroll e aumenta CTR.

### 2. Menor probabilidade de restrição
O Meta correlaciona idade da página com confiabilidade. Páginas novas anunciando volume alto são vistas com mais suspeita.

### 3. Algoritmo trata como entidade estabelecida
Páginas antigas com histórico de engajamento orgânico tendem a ter melhor entrega inicial em campanhas — especialmente em objetivos como Engajamento e Tráfego.

### 4. Continuidade em caso de bloqueio
Quando a BM principal cai, ter páginas antigas em standby permite continuar operando sem perder histórico de social proof.

## O que faz uma página ser de qualidade

- Idade de 2+ anos.
- Categoria coerente com o nicho que vai anunciar.
- Pelo menos algumas centenas de seguidores reais.
- Posts orgânicos antigos (não apagados).
- Sem histórico de violações ou advertências.
- Username (vanity URL) já configurado.

## O que NÃO importa tanto

- Quantidade massiva de seguidores (10k de seguidores comprados pesa contra).
- Avaliações 5 estrelas todas no mesmo dia (suspeito).
- Página em nicho totalmente diferente do que vai anunciar (gera estranhamento).

## Como integrar páginas antigas à sua frota

1. **Reserve uma página por vertical** — não use a mesma página para nichos conflitantes.
2. **Mantenha postagem orgânica leve** — 1 post por semana já basta.
3. **Faça crossposting com páginas backup** — assim quando uma cai, o conteúdo persiste.
4. **Tenha 2–3 páginas alternativas por operação** — rotacione se sentir queda de entrega.

Página antiga é ativo. Ativo gera resultado. Tratar página como descartável é jogar performance fora.
`,
  },
  {
    slug: "arquitetura-contingencia-meta-ads-operacao-alto-volume",
    title: "Arquitetura de contingência no Meta Ads para operações de alto volume",
    description: "Modelo completo de estrutura de contingência para operações que rodam R$ 50k+/dia: camadas, redundâncias e fluxo de troca em caso de bloqueio.",
    keywords: ["arquitetura de contingência meta ads", "estrutura de contingência facebook", "operação alto volume meta", "contingência profissional meta ads", "frota de BMs"],
    category: "Fundo de funil",
    readingTime: "10 min",
    publishedAt: "2025-02-01",
    ogImage: "/og/og-arquitetura.jpg",
    content: `
Operação amadora trata bloqueio como acidente. Operação profissional trata como **evento esperado** e arquiteta a estrutura para absorver. Este artigo detalha o modelo de contingência usado por gestores que operam volumes acima de R$ 50 mil/dia.

## A regra dos 3 níveis

### Nível 1 — Operação principal (live)
- 1–3 BMs verificadas rodando ativamente
- Contas de anúncio com histórico de gasto
- Páginas estabelecidas com social proof real
- Aqui mora 70% do orçamento diário

### Nível 2 — Hot standby (substituição imediata)
- 3–5 BMs verificadas warmed-up, prontas pra subir em <30 min
- Perfis administradores aged já configurados
- Páginas backup com fingerprint próprio
- Pixels e domínios já verificados em paralelo

### Nível 3 — Cold reserve (reposição estratégica)
- 5–15 BMs em estágios variados de aging/warm-up
- Perfis aged sem operação atual
- Páginas em maturação para uso futuro

## Fluxo de troca quando uma BM cai

1. **Detecção (0–5 min)** — alerta automático ou monitoramento manual identifica bloqueio.
2. **Pause global** — pausar todas as campanhas da BM caída antes de qualquer ação.
3. **Subir hot standby** — ativar BM em standby, importar criativos validados.
4. **Warm-up acelerado** — começar com 50% do orçamento normal, subir em 24h.
5. **Análise de causa** — identificar gatilho (criativo? pagamento? IP? disputa?).
6. **Ajuste estrutural** — aplicar correção antes de retornar à operação plena.
7. **Reposição da reserva** — comprar/cultivar nova BM para repor o nível 2.

## Métricas para acompanhar a saúde da frota

| Métrica | Meta saudável |
|---|---|
| Tempo médio de vida da BM | 60+ dias |
| % de BMs ativas vs em revisão | 85%+ |
| Tempo de troca em caso de bloqueio | <2h |
| % do orçamento concentrado em 1 BM | <40% |
| BMs em hot standby vs em uso | 1.5x |

## Erros que destroem operações grandes

- **Concentrar 100% do gasto em 1–2 BMs** — quando cai, cai tudo.
- **Não ter perfis backup** — perfil é o ponto único de falha mais comum.
- **Comprar tudo do mesmo fornecedor** — exposição a fingerprint similar entre ativos.
- **Não documentar setup de cada ativo** — quando o gestor sai, ninguém sabe configurar.
- **Tratar contingência como custo** — é seguro de receita, não despesa.

## Investimento típico em contingência

Para uma operação de **R$ 100 mil/dia**, o investimento mensal saudável em estrutura de contingência (BMs, perfis, páginas) costuma ficar entre **2% e 5% do faturamento** — número que se paga em uma única substituição rápida bem feita.

## Resumindo

Contingência não é plano B. É infraestrutura. Operações que escalam de verdade gastam tempo e dinheiro construindo a frota antes de precisar dela — porque quando o bloqueio chega, não tem mais tempo de comprar BM.
`,
  },
  {
    slug: "glossario-meta-ads-termos-essenciais-gestor-trafego",
    title: "Glossário do Meta Ads: 25 termos que todo gestor de tráfego precisa dominar",
    description: "Do CBO ao CAPI, do Trust Score ao spending cap — entenda os termos técnicos do Meta Ads que aparecem no dia a dia de quem opera volume de verdade.",
    keywords: [
      "glossário meta ads",
      "termos facebook ads",
      "CBO meta ads",
      "CAPI facebook",
      "spending cap meta",
      "ROAS meta ads",
      "termos técnicos tráfego pago",
    ],
    category: "Topo de funil",
    readingTime: "9 min",
    publishedAt: "2025-02-05",
    ogImage: "/og/og-glossario.jpg",
    content: `
Meta Ads tem um vocabulário próprio. Quando o gestor sênior fala sobre "estourar o spending cap por causa de um CBO mal estruturado que matou o ROAS depois do warm-up", o iniciante sente que entrou no meio de outro idioma. Este glossário organiza os 25 termos mais usados na operação profissional — do básico ao avançado.

## Estrutura de campanhas

### CBO (Campaign Budget Optimization)
Otimização de orçamento no nível da campanha. O Meta distribui o budget automaticamente entre os conjuntos com melhor performance.

### ABO (Ad Set Budget Optimization)
Orçamento definido manualmente em cada conjunto. Dá mais controle, mas exige mais gestão.

### Conjunto de anúncios (Ad Set)
Camada onde você define público, posicionamentos, otimização e orçamento (no ABO).

### Criativo
A peça em si — imagem, vídeo ou carrossel + copy + CTA.

## Identidade e estrutura

### BM (Business Manager)
Painel central que organiza todas as suas contas de anúncio, páginas, pixels e usuários.

### BM Verificada
BM que passou pela verificação oficial de negócio do Meta — recebe selo interno e libera funcionalidades avançadas.

### Conta de anúncio (Ad Account)
Onde os anúncios efetivamente rodam. Uma BM pode ter várias.

### Pixel
Código de rastreamento instalado no site que envia eventos para o Meta.

### CAPI (Conversions API)
API de conversões — envia eventos diretamente do servidor para o Meta, sem depender do navegador.

## Sinais de saúde

### Trust Score
Pontuação interna de confiança que o Meta atribui a perfis, páginas, contas e BMs.

### Spending Cap (D0, D7, D30)
Limite de gasto diário/acumulado que o Meta impõe nos primeiros dias da conta.

### Warm-up
Aquecimento gradual de uma conta nova para construir histórico de gasto e elevar o spending cap.

### Fingerprint
Conjunto de sinais (IP, navegador, dispositivo, fuso) que identifica de forma única quem opera o ativo.

## Performance

### CPM (Custo por Mil impressões)
Quanto custa entregar 1.000 impressões. Métrica de leilão.

### CPC (Custo por Clique)
Quanto custa cada clique. Útil pra avaliar criativo e segmentação.

### CTR (Click-Through Rate)
Taxa de cliques sobre impressões. Mede atratividade do criativo.

### CPA (Custo por Aquisição)
Custo de cada conversão (compra, lead, etc.).

### ROAS (Return on Ad Spend)
Retorno sobre o investimento em anúncios. Receita ÷ gasto.

### Frequência
Quantas vezes em média cada pessoa viu seu anúncio.

## Segmentação

### Lookalike (LAL)
Público parecido construído a partir de uma audiência semente.

### Custom Audience
Público customizado a partir de pixel, lista, engajamento, etc.

### Públicos amplos (Broad)
Sem restrição de interesse — deixa o algoritmo encontrar.

## Risco e operação

### Restrição
Limitação parcial — geralmente afeta uma campanha ou conta específica.

### Bloqueio (Disabled)
Conta, BM ou perfil completamente desabilitado.

### Appeal
Pedido formal de revisão de bloqueio dentro do Meta Business Help.

### Contingência
Frota de ativos em standby pronta pra substituir o que cai.

---

Domínio do vocabulário é o primeiro passo pra escalar com segurança. Quem fala a língua do Meta opera melhor.
`,
  },
  {
    slug: "fingerprint-ip-residencial-meta-ads",
    title: "Fingerprint, IP residencial e isolamento de ambiente no Meta Ads",
    description: "Por que o Meta enxerga muito além do login e como gestores profissionais isolam fingerprint, IP e dispositivo para proteger suas BMs.",
    keywords: [
      "fingerprint meta ads",
      "IP residencial facebook ads",
      "antidetect browser meta",
      "isolamento de conta facebook ads",
      "proxy residencial meta",
      "ambiente seguro facebook ads",
    ],
    category: "Topo de funil",
    readingTime: "8 min",
    publishedAt: "2025-02-08",
    ogImage: "/og/og-fingerprint.jpg",
    content: `
Quando você acessa o Meta, ele coleta muito mais do que seu e-mail e senha. O que o algoritmo realmente avalia é seu **fingerprint** — uma assinatura digital composta por dezenas de sinais que identifica unicamente quem você é, mesmo sem login. Entender isso é o que separa quem perde BMs em série de quem opera com estabilidade.

## O que compõe um fingerprint

- **IP e ASN** — provedor, tipo (residencial, móvel, datacenter), geolocalização.
- **User Agent** — navegador, versão, sistema operacional.
- **Resolução de tela e profundidade de cor**.
- **Timezone e idioma do sistema**.
- **Fontes instaladas** — combinação única em cada máquina.
- **Canvas/WebGL fingerprint** — renderização gráfica única.
- **Cookies, localStorage e IndexedDB** persistentes.
- **Padrão de digitação e movimento de mouse** (mais avançado).

## Por que isso quebra operações

O Meta correlaciona fingerprints. Se duas BMs diferentes acessam do mesmo conjunto IP+navegador+canvas, a plataforma trata como **mesma operação** — e quando uma cai, todas caem juntas.

Cenário típico:
- Operador roda 5 BMs do mesmo notebook
- Mesmo Chrome, mesmo IP residencial, mesmo perfil
- Uma BM viola política e é bloqueada
- O algoritmo mapeia o fingerprint compartilhado
- As outras 4 BMs caem em cascata em 24-48h

## A regra de ouro: 1 ativo = 1 ambiente

Cada BM importante deve ter:

1. **Navegador antidetect próprio** (Multilogin, GoLogin, AdsPower, Dolphin)
2. **IP residencial dedicado** — não compartilhar entre ativos
3. **Perfil de cookies isolado**
4. **User agent fixo e consistente** (não trocar a cada sessão)
5. **Timezone coerente com o IP** (IP brasileiro + timezone BRT)

## Tipos de IP e quando usar

| Tipo | Uso | Risco |
|---|---|---|
| Datacenter | Nunca | Altíssimo — Meta detecta na hora |
| VPN pública | Nunca | Alto — IPs queimados |
| Residencial dedicado | Operação principal | Baixo — recomendado |
| Residencial rotativo | Apenas para tarefas pontuais | Médio |
| Móvel (4G/5G) | Operações sensíveis | Baixo — alta confiança |

## Boas práticas operacionais

- **Não mude IP depois de configurar a BM**. Estabilidade > sofisticação.
- **Acesse sempre do mesmo perfil de navegador**.
- **Não copie/cole sessão entre máquinas** — quebra fingerprint.
- **Evite ferramentas de automação visíveis** (extensões agressivas).
- **Configure o timezone do navegador igual ao do IP**.

## Por que ativos premium já vêm com setup pronto

Fornecedores sérios entregam ativos de contingência **com briefing de fingerprint específico**: qual região o IP deve ser, qual user agent foi usado no warm-up, qual timezone. Isso reduz drasticamente o risco de queda nos primeiros 30 dias.

Comprar um ativo aged sem setup correto é como comprar carro de corrida e instalar pneu careca. Os melhores resultados vêm da combinação **ativo de qualidade + ambiente isolado correto**.
`,
  },
  {
    slug: "pixel-vs-capi-conversions-api-meta-ads",
    title: "Pixel vs CAPI: por que operações sérias rodam os dois (e como configurar)",
    description: "Diferença real entre Pixel e Conversions API, como funcionam juntos, e por que essa configuração é mandatória para operações de alto volume.",
    keywords: [
      "pixel vs CAPI",
      "conversions API meta",
      "configurar CAPI facebook",
      "pixel facebook ads",
      "tracking server-side meta",
      "deduplicação eventos meta",
    ],
    category: "Fundo de funil",
    readingTime: "9 min",
    publishedAt: "2025-02-12",
    ogImage: "/og/og-pixel-capi.jpg",
    content: `
Em 2024 o Meta passou a tratar contas que rodam **somente Pixel** como sinal de operação amadora. A documentação oficial recomenda explicitamente o uso combinado de Pixel + CAPI — e essa configuração impacta diretamente atribuição, otimização e até a estabilidade da conta. Operação de alto volume sem CAPI hoje é dinheiro deixado na mesa.

## O problema do Pixel sozinho

O Pixel funciona via JavaScript no navegador. Em 2025, isso significa:

- **iOS 14.5+ ATT** — usuários Apple bloqueiam tracking nativamente
- **Safari ITP** — Intelligent Tracking Prevention apaga cookies em 7 dias
- **Ad blockers** — bloqueiam o Pixel antes de carregar
- **Modo anônimo** — sem persistência
- **Conexões instáveis** — o evento se perde

Resultado: você está perdendo **20% a 40% dos eventos de conversão**, e o algoritmo do Meta otimiza com dados incompletos.

## O que a CAPI resolve

A Conversions API envia o evento **direto do seu servidor** para o Meta — sem depender do navegador do usuário. Isso significa:

- Eventos chegam mesmo com ad blocker.
- Funciona com iOS 14.5+ sem perda significativa.
- Mais preciso (você controla os parâmetros enviados).
- Permite enviar eventos pós-checkout (assinatura recorrente, upsell offline).

## Como funcionam juntos

A configuração ideal envia o evento pelos **dois canais simultaneamente** com um identificador único (\`event_id\`). O Meta deduplica automaticamente — se chegou pelos dois caminhos, conta uma única vez. Se chegou só pela CAPI (porque o Pixel falhou), você não perde o evento.

## Eventos críticos para enviar via CAPI

1. **PageView** — base de retargeting.
2. **ViewContent** — quem viu produto.
3. **AddToCart** — meio de funil.
4. **InitiateCheckout** — alta intenção.
5. **Purchase** — o evento mais importante para otimização.
6. **Lead** — para operações B2B/educacional.
7. **CompleteRegistration**.

## Parâmetros que aumentam a qualidade do match

Quanto mais parâmetros você envia, melhor o Meta consegue atribuir o evento ao usuário certo:

- \`em\` — email hashed (SHA256)
- \`ph\` — telefone hashed
- \`fn\`, \`ln\` — primeiro/último nome hashed
- \`ge\`, \`db\` — gênero, data nascimento
- \`ct\`, \`st\`, \`zp\`, \`country\` — cidade, estado, CEP, país
- \`client_ip_address\`, \`client_user_agent\` — sinais técnicos
- \`fbc\`, \`fbp\` — cookies do Pixel (passados via CAPI)

> Quanto mais parâmetros enviados (com hash correto), mais alto o **EMQ (Event Match Quality)** — métrica que o Meta usa pra ranquear a qualidade dos seus eventos.

## Como configurar (caminhos possíveis)

### Opção 1 — Plugin oficial
Para WooCommerce, Shopify (oficial parou), o Meta tem integrações diretas. Mais simples, menos controle.

### Opção 2 — Gateway server-side
Stape.io, Server-Side GTM, ou seu próprio backend recebem o evento e repassam pra CAPI. Mais controle, melhor EMQ.

### Opção 3 — Desenvolvimento customizado
Para operações com stack próprio: implementar SDK Node/PHP/Python da Meta diretamente. Máximo controle.

## Sinais de que sua CAPI está bem configurada

- **EMQ acima de 7.0** em todos os eventos críticos.
- **Taxa de match acima de 70%** no Events Manager.
- **Deduplicação acima de 95%** entre Pixel e CAPI.
- **Latência média do evento abaixo de 5 segundos**.

## Por que isso protege a estabilidade da conta

O Meta interpreta contas com tracking de qualidade como **operadores sérios**. Eventos consistentes, EMQ alto e deduplicação correta são sinais positivos no Trust Score. Contas que rodam só Pixel mal configurado são tratadas com mais suspeita — o que aumenta probabilidade de revisão.

CAPI deixou de ser opcional. É infraestrutura padrão para operação profissional.
`,
  },
  {
    slug: "calcular-roi-investimento-contingencia-meta-ads",
    title: "Como calcular o ROI real do investimento em contingência no Meta Ads",
    description: "Modelo financeiro prático para justificar o investimento em ativos de contingência: custo de hora parada, probabilidade de bloqueio e payback.",
    keywords: [
      "ROI contingência meta ads",
      "calcular custo bloqueio facebook",
      "investimento ativos contingência",
      "ROI BM verificada",
      "custo de oportunidade meta ads",
      "payback contingência",
    ],
    category: "Fundo de funil",
    readingTime: "10 min",
    publishedAt: "2025-02-15",
    ogImage: "/og/og-roi-contingencia.jpg",
    content: `
Toda decisão de compra grande precisa de número. Quando você apresenta investimento em estrutura de contingência para um sócio, CFO ou cliente, "porque é importante" não vence objeção — modelo financeiro vence. Este artigo monta o cálculo real de ROI da contingência no Meta Ads.

## Os 4 componentes do custo do bloqueio

### 1. Receita parada
Operação que fatura **R$ 100 mil/dia** com ROAS 2.5 representa **R$ 40 mil/dia de gasto em mídia**. Se a operação para 3 dias enquanto você reconstrói a estrutura, perde-se **R$ 300 mil de faturamento bruto**.

### 2. Custo de aprendizado perdido
Campanhas otimizadas têm CPA 30-50% menor que campanhas zeradas. Subir tudo de novo significa **2-7 dias gastando mais por conversão** até o algoritmo reaprender. Estime 15% de gasto desperdiçado durante o re-aprendizado.

### 3. Custo operacional emergencial
Time correndo, fornecedor de emergência (mais caro), criativos sendo refeitos, novas verificações. Estime **R$ 5 mil a R$ 20 mil por evento** dependendo da operação.

### 4. Custo psicológico/relacional
Quando o cliente percebe operação parada, o churn aumenta. Difícil precificar mas real.

## Modelando o cenário base

Vamos usar uma operação real:

| Variável | Valor |
|---|---|
| Faturamento diário | R$ 100.000 |
| Gasto diário em ads | R$ 40.000 |
| Margem operacional | 25% |
| Lucro diário | R$ 25.000 |
| Tempo médio de bloqueio (sem contingência) | 4 dias |
| Frequência de bloqueio (sem contingência) | A cada 45 dias |

**Custo de cada bloqueio (sem contingência):**
- Receita perdida: 4 × R$ 100.000 = **R$ 400.000**
- Lucro perdido: 4 × R$ 25.000 = **R$ 100.000**
- Re-aprendizado: 15% × 5 dias × R$ 40.000 = **R$ 30.000**
- Operacional emergencial: **R$ 10.000**
- **Total por evento: ~R$ 140.000 de impacto direto no lucro**

**Em 12 meses:** 12 × (365÷45) ≈ 8 eventos × R$ 140.000 = **R$ 1.120.000 de prejuízo anual**.

## Cenário com contingência

Mesma operação, com frota saudável:

| Variável | Valor |
|---|---|
| Tempo médio de troca | 2 horas |
| Frequência de bloqueio efetivo (resolvido com troca) | A cada 60 dias |

**Custo por evento (com contingência):**
- Receita perdida: 0,08 × R$ 100.000 = **R$ 8.000**
- Re-aprendizado leve: 5% × 2 dias × R$ 40.000 = **R$ 4.000**
- Operacional: **R$ 1.000**
- **Total por evento: ~R$ 13.000**

**Em 12 meses:** 6 eventos × R$ 13.000 = **R$ 78.000**

## Calculando o ROI

| | Sem contingência | Com contingência |
|---|---|---|
| Prejuízo anual | R$ 1.120.000 | R$ 78.000 |
| Investimento anual em frota | R$ 0 | ~R$ 60.000 |
| **Custo total** | **R$ 1.120.000** | **R$ 138.000** |

**Economia anual: R$ 982.000**
**ROI sobre o investimento em contingência: ~16x**

## Como adaptar o modelo à sua operação

Substitua estes 4 valores pelos seus números reais:

1. **Faturamento diário médio**
2. **Margem operacional verdadeira** (não bruta)
3. **Frequência histórica de bloqueio** (olhe os últimos 6 meses)
4. **Tempo médio que você leva pra voltar ao ar hoje**

Mesmo operações pequenas (R$ 10k/dia) costumam ter ROI positivo em contingência — porque o impacto relativo do bloqueio é proporcionalmente maior em operações sem reserva.

## Quando NÃO compensa

Honestidade técnica: nem toda operação precisa de frota grande de contingência.

- **Operações abaixo de R$ 5k/dia consistente** — geralmente o investimento mínimo de uma frota saudável (R$ 20-30k inicial) leva mais de 12 meses pra pagar.
- **Operações sazonais** que rodam só em datas comerciais — calcule pelo período ativo.
- **Operações com baixíssima frequência de bloqueio** (alguns nichos têm 0 bloqueios em 12 meses).

Para o restante — especialmente quem opera **R$ 30k+/dia** ou trabalha em nichos sensíveis (dropshipping, infoproduto, finanças, suplementos) — contingência tem ROI matemático de 5-20x. Não é despesa: é o investimento de melhor retorno da operação.
`,
  },
  {
    slug: "trust-score-facebook-ads-como-meta-avalia-conta",
    title: "Trust Score no Facebook Ads: como o Meta avalia sua conta em 2026",
    description: "Entenda o que é Trust Score no Facebook Ads e Meta, quais sinais elevam ou derrubam sua pontuação interna e como proteger contas para escalar com previsibilidade.",
    keywords: ["trust score facebook ads", "trust score meta", "como funciona trust score", "score de confiança facebook", "reputação conta facebook ads", "como meta avalia conta"],
    category: "Topo de funil",
    readingTime: "7 min",
    publishedAt: "2026-04-22",
    ogImage: "/og/og-trust-score-facebook.jpg",
    content: `
O Trust Score é o "score de crédito" interno do Meta. Ele não aparece no Gerenciador, mas decide silenciosamente quem escala e quem trava no Facebook Ads.

## O que é Trust Score no Facebook Ads

É uma pontuação interna que o Meta atribui a cada ativo — conta de anúncio, BM, perfil, página, pixel — com base em centenas de sinais comportamentais, técnicos e documentais. Quanto maior o score, maior a confiança do algoritmo: mais limite, menos revisão, menos bloqueio.

## Os 5 grupos de sinais que mais pesam

### 1. Identidade e verificação
- Verificação de negócio ativa
- Domínio verificado
- Documentos compatíveis com CNPJ
- Selo azul (quando aplicável)

### 2. Comportamento de pagamento
- Histórico longo sem chargeback
- Cartão consistente, idealmente empresarial
- Pagamentos em dia, sem fraudes

### 3. Fingerprint técnico
- IP residencial coerente com o país do anunciante
- Mesmo dispositivo e navegador ao longo do tempo
- Ausência de sinais de automação ou VPNs suspeitas

### 4. Histórico de criativos
- Baixa taxa de reprovação
- Ausência de termos sensíveis recorrentes
- Landing pages compatíveis com políticas

### 5. Comportamento da conta
- Crescimento gradual de gasto (warm-up)
- Sem mudanças bruscas de nicho ou país
- Página com engajamento real

## Por que isso importa para Facebook Ads e Meta Ads

Contas com Trust Score alto recebem **limites de gasto maiores**, **menos revisões automáticas**, **recuperação mais rápida em appeals** e **acesso prioritário a recursos avançados** como CAPI, catálogos e WhatsApp Business API.

## Como aumentar Trust Score sem cair em armadilhas

> **Regra de ouro:** Trust Score se constrói com tempo e consistência. Não existe atalho técnico que substitua histórico real.

1. Faça **warm-up disciplinado** das contas novas
2. Mantenha **fingerprint estável** (mesmo IP, dispositivo)
3. Verifique **domínio e negócio** assim que possível
4. Evite criar e deletar ativos em sequência
5. Considere ativos com histórico já maduro para acelerar

## Conexão com contingência

Operações sérias não dependem de uma única conta com Trust Score alto. Elas mantêm **uma frota de ativos com score elevado em standby** — exatamente o que uma estrutura de contingência profissional entrega.

Se você quer eliminar a aposta no Trust Score isolado, conheça [a estrutura de contingência para Meta Ads](/contingencia-meta-ads) ou avalie [adquirir BM Verificada com histórico real](/bm-verificada).
`,
  },
  {
    slug: "recuperar-conta-anuncio-bloqueada-facebook-ads",
    title: "Como recuperar conta de anúncio bloqueada no Facebook Ads: passo a passo",
    description: "Guia técnico para recuperar conta de anúncio bloqueada no Facebook e Meta Ads: fluxo de appeal, prazos reais, erros comuns e quando partir para contingência.",
    keywords: ["recuperar conta de anúncio facebook", "conta de anúncio bloqueada", "desbloqueio facebook ads", "appeal facebook ads", "como desbloquear bm facebook", "recuperar bm meta"],
    category: "Meio de funil",
    readingTime: "9 min",
    publishedAt: "2026-04-25",
    ogImage: "/og/og-recuperar-conta-bloqueada.jpg",
    content: `
Bloqueio no Facebook Ads não é se, é quando. O que separa operações que voltam ao ar em horas das que ficam dias paradas é o processo de recuperação.

## O que aconteceu: tipos de bloqueio

Antes de qualquer ação, identifique exatamente o que foi restringido:

| Tipo | Sinal no Gerenciador | Gravidade |
|---|---|---|
| **Conta de anúncio desativada** | "Sua conta de anúncio foi desativada" | Média |
| **BM restrita** | "Acesso limitado ao Business Manager" | Alta |
| **Perfil pessoal bloqueado** | "Você não pode anunciar" | Crítica |
| **Página com violação** | Aviso na página, não na conta | Média |
| **Pagamento recusado** | "Não foi possível cobrar" | Baixa (não é bloqueio real) |

Cada tipo tem um fluxo de appeal diferente.

## Passo 1 — Não toque em nada nas primeiras 2h

Erros mais comuns nas primeiras horas:
- Criar nova conta de anúncio na mesma BM
- Trocar método de pagamento na pressa
- Pedir appeal antes de entender o motivo
- Criar nova BM com o mesmo perfil

Cada uma dessas ações pode **agravar a restrição** ou propagá-la para outros ativos.

## Passo 2 — Identifique o motivo real

Vá em **Qualidade da Conta** (Account Quality) e leia a notificação completa. Os motivos mais comuns no Facebook Ads:

1. Política de produto/serviço (especialmente saúde, finanças, dropshipping)
2. Página de destino fora de conformidade
3. Pagamento suspeito
4. Atividade incomum (mudança de IP, dispositivo, país)
5. Violação por criativo aprovado anteriormente (revisão retroativa)

## Passo 3 — Abra o appeal correto

> **Importante:** o botão "Solicitar revisão" só pode ser usado **uma vez** na maioria dos casos. Não chute.

Estrutura de appeal eficaz:
- **1 parágrafo** explicando o contexto da operação
- **Documentação anexa** (CNPJ, contrato social, comprovante de domínio)
- **Linguagem objetiva**, sem emoção
- **Em inglês** quando possível (acelera triagem)

## Passo 4 — Prazos reais (não os oficiais)

| Cenário | Prazo médio real |
|---|---|
| Appeal de conta de anúncio | 24h a 7 dias |
| Appeal de BM | 3 a 14 dias |
| Appeal de perfil pessoal | 7 a 21 dias |
| Casos com selo azul | Geralmente <48h |

## Passo 5 — Plano B: ativar contingência

Se o appeal demorar mais de **48h** e sua operação roda **R$ 20k+/dia**, o ROI de esperar despenca. É a hora de:

1. Subir uma BM reserva já verificada
2. Migrar pixel/CAPI espelhado
3. Reativar campanhas com mesma estrutura
4. Manter o appeal correndo em paralelo

## Erros que destroem a recuperação

- Usar a mesma página em várias BMs novas em sequência
- Trocar de cartão sem warm-up
- Criar perfis novos a partir do mesmo dispositivo bloqueado
- Apagar criativos antes da análise

## Quando recuperação não vale o esforço

Em alguns casos (perfil banido por reincidência, página com violação grave), insistir é desperdício. Migrar para uma estrutura limpa com [contingência profissional](/contingencia-meta-ads) é mais rápido e barato.

## Conclusão

Recuperação de conta no Facebook Ads é processo, não sorte. Quem trata bloqueio como incidente operacional — com fluxo, contingência e disciplina — perde horas. Quem improvisa, perde semanas e faturamento.

Para entender a arquitetura completa, veja também [como evitar bloqueio de conta de anúncio no Meta](/blog/bloqueio-conta-anuncio-meta-como-evitar).
`,
  },
  {
    slug: "quanto-custa-bm-verificada-facebook-2026",
    title: "Quanto custa uma BM Verificada Facebook em 2026: preço, riscos e o que avaliar",
    description: "Faixa de preço real de BM Verificada Facebook e Meta em 2026, o que diferencia ativos baratos dos premium, riscos comuns e checklist para comprar com segurança.",
    keywords: ["quanto custa bm verificada", "preço bm verificada facebook", "comprar bm verificada", "valor business manager verificada", "bm verificada facebook preço", "comprar bm meta verificada"],
    category: "Fundo de funil",
    readingTime: "8 min",
    publishedAt: "2026-04-29",
    ogImage: "/og/og-quanto-custa-bm-verificada.jpg",
    content: `
"Quanto custa uma BM Verificada?" é a pergunta mais frequente de quem busca contingência para Facebook Ads. A resposta honesta: depende do que está dentro dela.

## Faixa de preço real de mercado em 2026

| Tipo de BM Verificada | Faixa de preço | Para quem |
|---|---|---|
| **Verificação fresca, sem histórico** | R$ 800 – R$ 2.000 | Operações iniciantes (alto risco) |
| **Verificada com histórico de gasto baixo** | R$ 2.500 – R$ 5.000 | Operações em crescimento |
| **Verificada com histórico alto + selo azul** | R$ 6.000 – R$ 15.000 | Operações de alto volume |
| **Pacote contingência (BM + perfil aged + página)** | R$ 8.000 – R$ 25.000 | Operações profissionais |

> **Atenção:** ofertas abaixo de R$ 800 quase sempre escondem BMs com histórico ruim, perfis suspeitos ou ativos prestes a cair.

## O que define o preço de verdade

### 1. Histórico documental
BM verificada há 6 meses vale mais que verificada ontem. O Meta dá peso à **maturidade da verificação**, não só ao status atual.

### 2. Histórico de gasto
Uma BM que já gastou R$ 50k+ sem incidente tem Trust Score muito superior à zero-spend.

### 3. Selo azul de página
Páginas com selo azul vinculadas elevam o pacote em 2-3x o preço — e em estabilantigos.

### 4. Domínio e CAPI configurados
BMs entregues prontas (domínio verificado, pixel + CAPI funcionando) economizam dias de setup.

### 5. Perfil administrador
O perfil que controla a BM é tão importante quanto a BM. Perfis aged reais elevam preço e estabilidade.

## Por que BM barata sai caro

Cálculo prático para operação de R$ 50k/dia:

- **BM barata (R$ 1.000)** caindo em 5 dias = **R$ 250k de receita perdida** no período
- **BM premium (R$ 8.000)** rodando 60 dias = **R$ 3M de receita protegida**

A diferença de R$ 7.000 vira ROI de **400x** em proteção operacional.

## Checklist antes de comprar

✅ Vendedor mostra histórico de gasto e idade da verificação?
✅ Domínio já está verificado dentro da BM?
✅ Perfil administrador é aged ou recém-criado?
✅ Há briefing técnico de handover (IP, fingerprint, warm-up)?
✅ Suporte pós-venda existe ou só "vendeu, sumiu"?
✅ Pacote inclui página, pixel e CAPI configurados?

Se 3+ dessas respostas forem "não", o preço baixo é armadilha.

## Onde mora o golpe

- **BM "verificada" reciclada** que cairá em dias
- **Verificação obtida com documento de terceiros** (revertida quando descoberto)
- **BM clonada** vendida para múltiplos compradores
- **Selo azul falso** (alegado mas não comprovado)

## Quanto vale para sua operação

Regra prática de orçamento:

- **Operação até R$ 10k/dia:** invista 1-2% do faturamento mensal em ativos
- **R$ 10k–R$ 50k/dia:** 0,5-1% do faturamento mensal
- **R$ 50k+/dia:** 0,3-0,5% do faturamento mensal

Para operações sérias, o investimento em BM Verificada premium tem retorno em **menos de 7 dias** comparado ao custo de uma única parada operacional.

## Próximos passos

Se quer evitar o risco do mercado paralelo, [conheça nossa curadoria 1 a 1 de BM Verificada](/bm-verificada) — com handover técnico real, suporte e reposição garantida.

Para entender a estrutura completa, veja também [como escolher fornecedor de BM verificada](/blog/como-escolher-fornecedor-bm-verificada) e [a arquitetura de contingência para alto volume](/blog/arquitetura-contingencia-meta-ads-operacao-alto-volume).
`,
  },
  {
    slug: "limite-de-gasto-facebook-ads-como-aumentar",
    title: "Limite de gasto no Facebook Ads: como aumentar e por que sua conta não escala",
    description: "Por que o Facebook Ads e Meta limitam o gasto da sua conta, como o spending cap funciona e o passo a passo técnico para aumentar limite com segurança.",
    keywords: ["limite de gasto facebook ads", "spending cap facebook", "aumentar limite facebook ads", "conta não escala facebook", "limite diário facebook ads", "limite meta ads"],
    category: "Meio de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-02",
    ogImage: "/og/og-limite-gasto-facebook.jpg",
    content: `
Se sua conta de Facebook Ads "não escala" mesmo com criativo bom e oferta validada, provavelmente o gargalo não é estratégico — é o **limite de gasto interno** que o Meta impôs.

## O que é spending cap (limite de gasto)

O Meta aplica dois tipos de limite:

1. **Limite de conta (account spending limit):** definido pelo anunciante
2. **Limite interno do Meta:** invisível, definido pelo algoritmo com base em Trust Score, histórico e risco

O segundo é o que mais trava operações em escala — e ninguém te avisa.

## Por que o Meta limita sua conta

- Conta nova sem histórico de pagamento
- Aumento brusco de gasto (de R$ 100 para R$ 5.000/dia em poucos dias)
- Cartão sem histórico anterior
- Perfil administrador com pouca idade
- Mudança de país, IP ou dispositivo
- BM não verificada
- Setor de risco (saúde, finanças, dropshipping)

## Sinais de que você bateu o teto invisível

- CPM dispara sem motivo aparente
- Campanhas "saem do leilão" no meio do dia
- Entregas erráticas mesmo com budget aumentado
- Pagamento processa, mas anúncios não rodam
- Mensagem genérica "houve um problema com seu pagamento"

## Como aumentar limite no Facebook Ads: passo a passo

### 1. Faça warm-up real
Não pule etapas. Sequência típica para conta nova:
- **Dias 1-3:** R$ 30/dia
- **Dias 4-7:** R$ 100/dia
- **Dias 8-14:** R$ 300/dia
- **Dias 15-30:** R$ 800/dia
- **30+ dias:** crescimento de 30-50% por semana

### 2. Pague antes de ser cobrado
Pagamento manual antecipado (prepago) sinaliza solvência. Faça pagamentos parciais no meio do ciclo.

### 3. Verifique negócio e domínio
BM verificada + domínio verificado liberam limites maiores naturalmente.

### 4. Mantenha fingerprint estável
Mesmo IP, mesmo dispositivo, mesmo navegador. Evite logar de múltiplos lugares.

### 5. Cartão empresarial coerente
Cartão da empresa que está no CNPJ da BM verificada = sinal forte de legitimidade.

### 6. Solicite aumento manual (quando aplicável)
Em conta de anúncio: **Configurações → Limite de gasto da conta → Alterar**. Para limites internos, abra ticket com Meta Business Support apresentando histórico.

## Quando o limite não sobe — e o que fazer

Algumas contas simplesmente **não saem de R$ 1k–R$ 5k/dia** mesmo com warm-up perfeito. Geralmente porque:

- Trust Score do perfil administrador é baixo
- BM tem histórico ruim anterior
- IP/fingerprint sinaliza risco

Nesses casos, o caminho mais rápido é **migrar para um ativo com histórico maduro** ao invés de tentar reabilitar o atual.

## Como contingência destrava escala

Operações em escala mantêm múltiplas BMs com Trust Score alto rodando em paralelo. O limite "agregado" da operação vira a soma dos limites individuais — e cada conta entrega o que pode sem forçar.

> **Estratégia comum em alto volume:** 4 BMs verificadas a R$ 50k/dia cada = R$ 200k/dia totais, sem nenhuma forçar limite.

## Próximos passos

Se sua conta travou em um teto invisível, [uma consultoria técnica](/consultoria-meta-ads) pode mapear se o gargalo é warm-up, fingerprint, BM ou estratégia. Para destravar via ativos, [conheça as BMs Verificadas com limites maiores](/bm-verificada).
`,
  },
  {
    slug: "dominio-verificado-facebook-como-configurar-ios14",
    title: "Domínio verificado no Facebook: como configurar e impacto em iOS 14+",
    description: "Guia técnico para verificar domínio no Facebook Business: métodos DNS, meta tag e arquivo HTML, priorização de eventos e impacto direto em iOS 14+ e CAPI.",
    keywords: ["domínio verificado facebook", "verificar domínio meta", "ios 14 facebook ads", "domain verification facebook", "configurar domínio business manager", "priorização de eventos meta"],
    category: "Topo de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-06",
    ogImage: "/og/og-dominio-verificado-facebook.jpg",
    content: `
Verificar domínio no Facebook deixou de ser opcional desde a atualização do iOS 14. Hoje é pré-requisito para qualquer operação séria de Meta Ads.

## O que é verificação de domínio

É o processo pelo qual você prova ao Meta que controla um domínio específico. Após verificado, **só esse domínio pode configurar e priorizar eventos** de conversão associados ao Pixel e à CAPI.

## Por que se tornou obrigatório com iOS 14+

Com a App Tracking Transparency (ATT) da Apple, o Meta criou o **Aggregated Event Measurement (AEM)** — que limita a 8 eventos priorizados por domínio. Sem domínio verificado:

- Você não pode priorizar eventos
- Conversões em iOS são severamente subreportadas
- CAPI perde poder de matching
- Otimização de campanha fica cega

## Os 3 métodos de verificação

### 1. Meta tag (mais rápido)
- Vá em **Business Settings → Brand Safety → Domains**
- Adicione o domínio
- Copie a meta tag fornecida
- Cole no head da home do site
- Clique em **Verify**

### 2. Arquivo HTML
- Baixe o arquivo .html fornecido pelo Meta
- Hospede em seudominio.com/nome-do-arquivo.html
- Clique em **Verify**

### 3. Registro DNS TXT (mais robusto)
- Adicione um registro TXT no painel DNS:
  - Nome: @
  - Valor: facebook-domain-verification=ABC123...
- Aguarde propagação (até 72h)
- Clique em **Verify**

> **Recomendação técnica:** prefira **DNS TXT**. É o método mais resistente a mudanças no site (troca de tema, migração de CMS, etc).

## Priorização de eventos: o que fazer depois

Após verificar o domínio:

1. Vá em **Events Manager → Aggregated Event Measurement**
2. Selecione o domínio verificado
3. Liste os 8 eventos por ordem de valor para o negócio
4. Coloque conversão de maior valor (Purchase) no topo

Em e-commerce típico:
1. Purchase
2. Initiate Checkout
3. Add to Cart
4. View Content
5. Add Payment Info
6. Search
7. Lead
8. Contact

## Erros comuns

- **Verificar domínio em BM errada** — só uma BM pode verificar cada domínio. Decida com cuidado.
- **Subdomínios** — loja.seudominio.com precisa de verificação separada da raiz
- **Apex vs www** — verifique a forma que aparece no anúncio
- **Múltiplos domínios** — cada loja precisa do próprio processo

## Impacto em CAPI e matching

Domínio verificado + CAPI corretamente configurada eleva o **Event Match Quality (EMQ)** acima de 8/10. Isso significa:

- Audiências mais precisas
- Lookalikes mais qualificados
- Otimização de algoritmo mais rápida
- ROAS reportado mais próximo do real

## Próximos passos

Se você opera múltiplas lojas ou clientes, entender em **qual BM verificar** é estratégico. [Uma consultoria técnica](/consultoria-meta-ads) ajuda a desenhar essa arquitetura. Veja também [Pixel vs CAPI no Meta Ads](/blog/pixel-vs-capi-conversions-api-meta-ads) para complementar a stack.
`,
  },
  {
    slug: "consultoria-meta-ads-vs-curso-quando-contratar",
    title: "Consultoria Meta Ads vs curso: quando contratar especialista em Facebook Ads",
    description: "Quando consultoria de Meta Ads e Facebook Ads supera curso: critérios objetivos, comparativo de custo-benefício e perfil de operação que justifica especialista.",
    keywords: ["consultoria meta ads", "consultor facebook ads", "especialista em facebook ads", "consultoria vs curso meta", "vale a pena consultoria meta ads", "contratar consultor facebook"],
    category: "Fundo de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-09",
    ogImage: "/og/og-consultoria-meta-ads-vs-curso.jpg",
    content: `
Curso ensina o caminho geral. Consultoria resolve o seu caminho. Saber quando trocar um pelo outro pode significar meses de tentativa e erro evitados em Meta Ads e Facebook Ads.

## A diferença real entre os dois formatos

| | Curso | Consultoria |
|---|---|---|
| **Conteúdo** | Genérico, escalável | Sob medida, do seu ativo |
| **Foco** | Aprender o conceito | Resolver o problema |
| **Tempo até resultado** | Semanas/meses | Dias |
| **Custo** | R$ 500 – R$ 5.000 | R$ 3.000 – R$ 30.000+ |
| **Quem se beneficia** | Iniciantes/intermediários | Operações em escala/em crise |

## Quando curso resolve

- Você está começando e ainda não opera com volume
- Quer entender fundamentos (criativo, leilão, segmentação)
- Tem tempo para testar e errar
- Operação está abaixo de R$ 5k/dia consistente

Para esse perfil, gastar com consultoria é desperdício. O retorno do conhecimento básico vem de praticar, não de pagar diagnóstico.

## Quando consultoria é a única saída

### 1. Sua operação travou em escala
Você roda R$ 30k+/dia mas não consegue passar disso há semanas. Provavelmente o gargalo é técnico (Trust Score, fingerprint, CAPI, BM) — não estratégico.

### 2. Bloqueios estão te custando faturamento
Se cada bloqueio te custa R$ 50k+ de receita parada, qualquer hora de especialista paga 10x.

### 3. Você não sabe por que CAC subiu
Curso não vai te explicar **o seu** caso. Diagnóstico técnico sim.

### 4. Você opera múltiplas contas/clientes (agência)
Padronizar arquitetura e governança é trabalho de consultoria, não de aula gravada.

### 5. Você está lançando algo de alto risco
Lançamento de R$ 1M+ não é hora de testar conhecimento de curso — é hora de blindar com quem já fez 50 lançamentos.

## O que uma boa consultoria de Facebook Ads entrega

- **Auditoria técnica** de BM, perfis, páginas, pixel, CAPI
- **Diagnóstico de Trust Score** e fingerprint
- **Plano de contingência** sob medida
- **Roadmap priorizado** de ajustes
- **Acompanhamento técnico** opcional

Tudo isso entregue em **dias**, não em **meses de curso**.

## Como avaliar um consultor

✅ Já operou alto volume na prática?
✅ Mostra casos reais com números?
✅ Entende infraestrutura (BM, CAPI, fingerprint), não só criativo?
✅ Entrega checklist executável, não slide motivacional?
✅ Tem opinião técnica clara, mesmo desconfortável?

## ROI matemático

Operação rodando R$ 50k/dia com CAC mal calibrado:

- **Curso de R$ 2.000:** você aprende em 60 dias, melhora marginal de 5%
- **Consultoria de R$ 8.000:** diagnóstico em 7 dias, melhora de 15-25%

Em 30 dias, a consultoria gera entre **R$ 75k e R$ 375k** a mais em margem. ROI de 10-50x.

## Quando os dois fazem sentido juntos

Operações maduras combinam:
- **Curso** para o time interno aprender fundamentos
- **Consultoria** para resolver gargalos técnicos pontuais
- **Mentoria contínua** para otimização recorrente

## Próximos passos

Se sua operação travou em escala, sofre bloqueios recorrentes ou está sem clareza técnica, [agende uma consultoria Meta Ads e Facebook Ads](/consultoria-meta-ads) com diagnóstico real. Para entender a base estrutural, leia também [como evitar bloqueio de conta de anúncio](/blog/bloqueio-conta-anuncio-meta-como-evitar).
`,
  },
  {
    slug: "checklist-auditoria-bm-facebook-18-itens",
    title: "Checklist de auditoria de BM Facebook: 18 itens antes de escalar",
    description: "Checklist completo de auditoria de Business Manager Facebook em 18 itens técnicos: verificação, perfis, páginas, pixel, CAPI, contingência e governança.",
    keywords: ["auditoria de bm facebook", "checklist business manager", "auditoria facebook ads", "como auditar bm meta", "diagnóstico bm facebook", "checklist meta ads"],
    category: "Meio de funil",
    readingTime: "9 min",
    publishedAt: "2026-05-13",
    ogImage: "/og/og-checklist-auditoria-bm.jpg",
    content: `
Antes de escalar gasto no Facebook Ads, audite a infraestrutura. Esses 18 itens revelam 90% dos problemas que travam operações em alto volume.

## Bloco 1 — Identidade e verificação (itens 1-4)

### 1. BM tem verificação de negócio ativa
- ✅ Documentos compatíveis com CNPJ
- ✅ Endereço comercial validado
- ✅ Status verde em **Business Settings → Business Info**

### 2. Domínio verificado
- ✅ Pelo menos um domínio verificado por DNS TXT
- ✅ Apex e www consistentes
- ✅ Subdomínios principais verificados

### 3. Página com selo (quando aplicável)
- ✅ Selo azul em páginas de marca
- ✅ Categoria correta
- ✅ Avaliações ativas

### 4. Documento da empresa coerente
- ✅ CNPJ ativo na Receita
- ✅ Razão social bate com o que aparece na BM
- ✅ Sem pendências fiscais

## Bloco 2 — Perfis administradores (itens 5-7)

### 5. Perfis admin são aged
- ✅ Mínimo 6 meses de idade
- ✅ Histórico de uso real (posts, amigos, interações)
- ✅ Sem flags anteriores

### 6. Permissões corretamente atribuídas
- ✅ Princípio do menor privilégio
- ✅ Admins essenciais identificados
- ✅ Sem ex-funcionários ainda com acesso

### 7. 2FA ativo em todos os perfis
- ✅ Autenticação em dois fatores obrigatória
- ✅ Backup codes guardados
- ✅ Telefone de recuperação atualizado

## Bloco 3 — Estrutura de ativos (itens 8-11)

### 8. Contas de anúncio organizadas
- ✅ Nomenclatura padrão (cliente, vertical, país)
- ✅ Sem contas zombies
- ✅ Limite de gasto coerente com histórico

### 9. Pixel único e bem configurado
- ✅ 1 pixel principal por loja/marca
- ✅ Eventos padrão (Purchase, ATC, ViewContent) ativos
- ✅ Sem eventos duplicados

### 10. CAPI funcionando com EMQ alto
- ✅ Event Match Quality > 7/10
- ✅ Deduplicação Pixel + CAPI ativa
- ✅ Server-side coberto

### 11. Catálogo (se e-commerce) saudável
- ✅ Feed atualizado nas últimas 24h
- ✅ Menos de 5% de itens reprovados
- ✅ Eventos do catálogo associados

## Bloco 4 — Governança e contingência (itens 12-15)

### 12. Existe plano de contingência documentado
- ✅ Pelo menos 1 BM reserva pronta
- ✅ Fluxo de migração escrito
- ✅ Responsável definido

### 13. Backup de criativos e estruturas
- ✅ Criativos salvos fora da plataforma
- ✅ Configurações de campanha exportadas
- ✅ Públicos salvos

### 14. Acessos de fornecedores externos limitados
- ✅ Apenas o necessário
- ✅ Revisão trimestral
- ✅ Logs de atividade monitorados

### 15. Histórico de bloqueios mapeado
- ✅ Documentação de cada incidente
- ✅ Padrões identificados
- ✅ Aprendizados aplicados

## Bloco 5 — Saúde técnica (itens 16-18)

### 16. Fingerprint estável
- ✅ Mesmo IP residencial coerente com país
- ✅ Mesmo dispositivo principal
- ✅ Sem mudanças bruscas no último ano

### 17. Pagamento limpo
- ✅ Cartão empresarial alinhado ao CNPJ
- ✅ Histórico sem chargebacks
- ✅ Pagamentos em dia

### 18. Trust Score percebido alto
- ✅ Sem revisões frequentes
- ✅ Limites crescendo organicamente
- ✅ Aprovações de criativo rápidas

## Como usar o checklist

1. Faça a auditoria **uma vez por trimestre**
2. Mantenha planilha viva com status de cada item
3. Trate qualquer "não" como prioridade técnica
4. Documente incidentes para aprender padrões

## Quando contratar especialista

Se você marcou "não" em **5+ itens** ou opera **R$ 30k+/dia**, [uma consultoria técnica](/consultoria-meta-ads) acelera a correção. Para reforço de contingência, conheça [a estrutura completa para alto volume](/contingencia-meta-ads).

Veja também: [como escolher fornecedor de BM verificada](/blog/como-escolher-fornecedor-bm-verificada).
`,
  },
  {
    slug: "bloqueio-conta-nova-facebook-ads-7-motivos",
    title: "Por que contas novas de Facebook Ads bloqueiam tão rápido: 7 motivos reais",
    description: "Os 7 motivos técnicos mais comuns pelos quais contas novas de Facebook Ads e Meta bloqueiam nos primeiros dias e como evitar cada um deles.",
    keywords: ["bloqueio conta nova facebook ads", "conta nova bloqueada", "facebook bloqueia conta nova", "porque conta de anúncio bloqueia", "conta nova meta ads bloqueada", "evitar bloqueio conta nova"],
    category: "Topo de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-16",
    ogImage: "/og/og-bloqueio-conta-nova.jpg",
    content: `
Criou conta de Facebook Ads ontem e ela já bloqueou? Não é azar — é padrão. Conta nova é tratada com desconfiança máxima pelo Meta, e existem 7 motivos técnicos que explicam quase tudo.

## 1. Trust Score inicial é zero

O Meta começa cada conta nova com pontuação de risco alta. Qualquer comportamento "fora do esperado para iniciante" dispara revisão automática.

**Como evitar:** trate as primeiras 2 semanas como warm-up real, não como produção.

## 2. Fingerprint inconsistente

Logar de múltiplos dispositivos, IPs ou países nas primeiras horas é o sinal de alarme mais forte.

**Erros típicos:**
- Criar BM em casa, configurar no escritório, anunciar do celular
- Usar VPN de país diferente do anunciante
- Compartilhar acesso com vários colaboradores cedo demais

**Como evitar:** mantenha **um único fingerprint** (IP residencial + dispositivo + navegador) nas primeiras 4 semanas.

## 3. Pagamento sem histórico

Cartão recém-criado, virtual ou pré-pago em conta nova = bandeira vermelha.

**Como evitar:** use cartão da empresa com **histórico de pelo menos 6 meses** de uso anterior, mesmo que em outras plataformas.

## 4. Aumento brusco de gasto

Subir de R$ 50/dia para R$ 2.000/dia em 48h é o gatilho clássico de bloqueio.

**Curva saudável de warm-up:**
- Semana 1: R$ 30-50/dia
- Semana 2: R$ 100-200/dia
- Semana 3: R$ 300-500/dia
- Semana 4+: crescimento de até 50% por semana

## 5. Criativo agressivo no início

Conta nova roda criativo conservador. Começar com promessas exageradas, headlines polêmicas ou claims de saúde/finanças = bloqueio quase certo.

**Como evitar:** primeiros 14 dias com criativo institucional ou genérico, mesmo que converta menos. Depois sim, escala criativo agressivo.

## 6. BM não verificada com nicho de risco

Setores como dropshipping, suplementos, finanças, infoproduto e adulto sofrem revisão muito mais rigorosa em BM não verificada.

**Como evitar:** se você está nesses nichos, **comece já com BM verificada** ou pague o preço do bloqueio repetido.

## 7. Página de destino fora de conformidade

Antes de aprovar o anúncio, o Meta varre sua landing. Problemas comuns:
- Pop-up agressivo
- Falta de política de privacidade
- Termos proibidos no copy
- Redirecionamento suspeito
- Ausência de informações de contato

**Como evitar:** faça **auditoria de landing** antes de subir campanha — não depois.

## O ciclo vicioso da conta nova

| Dia | O que costuma acontecer |
|---|---|
| 1 | Cria conta, sobe gasto |
| 2 | Aprovação de anúncio com warning |
| 3 | Pico de entrega, gasto sobe |
| 4 | Conta entra em revisão |
| 5 | Bloqueio temporário |
| 7 | Cria nova conta na mesma BM |
| 8 | BM cai em conjunto |

Esse ciclo destrói **dezenas de operações novas por mês** no Brasil.

## Como quebrar o ciclo

1. **Paciência no warm-up** (não há atalho)
2. **BM verificada desde o dia 1** (ou histórico maduro)
3. **Fingerprint estável** (mesmo IP, dispositivo)
4. **Pagamento com histórico** (não cartão recém-emitido)
5. **Plano de contingência** (1 BM reserva já pronta)

## Quando usar contingência ao invés de conta nova

Se você precisa **escalar rápido** e não tem 30 dias para warm-up, comprar ativos com histórico maduro é matemática:

- Custo de 1 BM verificada premium: R$ 5k–R$ 10k
- Custo de 30 dias de warm-up: 30 dias de leilão perdido + risco de bloqueio

Para a maioria das operações sérias, **ativo pronto vence warm-up**.

## Próximos passos

Para evitar o ciclo do bloqueio recorrente, [conheça a estrutura de contingência para Meta e Facebook Ads](/contingencia-meta-ads) ou [adquira BM Verificada com histórico real](/bm-verificada).

Veja também: [como recuperar conta de anúncio bloqueada](/blog/recuperar-conta-anuncio-bloqueada-facebook-ads).
`,
  },
  {
    slug: "disparo-via-api-whatsapp-cloud-bm-verificada-guia-completo",
    title: "Disparo via API no WhatsApp Cloud: guia completo de BM, tiers e qualidade do número",
    description:
      "Como funciona o disparo via API oficial do WhatsApp Cloud, quais BMs verificadas são compatíveis, tiers de mensageria (250, 1k, 10k, 100k) e como evitar queda de qualidade do número.",
    keywords: [
      "disparo via api whatsapp",
      "whatsapp cloud api",
      "bm verificada para disparo",
      "bm 250 disparos",
      "bm 1000 disparos",
      "bm 10000 disparos",
      "tier whatsapp api",
      "qualidade do número whatsapp",
      "whatsapp business platform",
      "template whatsapp aprovado",
      "comprar bm para disparo via api",
      "fornecedor bm whatsapp cloud api",
    ],
    category: "Meio de funil",
    readingTime: "10 min",
    publishedAt: "2026-05-07",
    ogImage: "/og/og-default.jpg",
    content: `
Operações sérias de mensageria não rodam mais em chip pessoal nem em automações não oficiais. O caminho profissional, recomendado pelo próprio Meta na [documentação do WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/cloud-api), é o **disparo via API** usando a **WhatsApp Cloud API** vinculada a uma BM verificada.

Este guia explica tudo o que um gestor precisa saber para operar disparo via API com previsibilidade: o que é a Cloud API, qual o papel da BM verificada, como funcionam os tiers de mensageria (250, 1k, 10k, 100k+), como o Meta avalia a qualidade do número e por que comprar uma **BM 250 Disparos**, **BM 1.000 Disparos** ou **BM 10.000 Disparos** pronta acelera o time-to-market em semanas.

## O que é o disparo via API no WhatsApp Cloud

A **WhatsApp Cloud API** é a infraestrutura oficial do Meta para envio e recebimento de mensagens em escala. Diferente da API On-Premises (descontinuada para novos clientes), ela é hospedada pelo próprio Meta — você só conecta sua aplicação, broker ou CRM ao endpoint oficial.

Cada número conectado à Cloud API recebe um **WABA** (WhatsApp Business Account) dentro de uma **Business Manager**. É essa BM que precisa estar verificada para liberar limites maiores e funcionalidades como o selo verde de Official Business Account.

## Por que a BM precisa ser verificada

Segundo o [Meta Business Help Center](https://www.facebook.com/business/help), só BMs com verificação de negócio aprovada têm acesso a:

- Tier de mensageria acima de 250 conversas/24h sem precisar elevar manualmente.
- Solicitação do selo verde (Official Business Account).
- Templates de marketing em volumes elevados.
- Múltiplos números na mesma WABA.
- Integração com provedores oficiais (BSPs) e CRMs.

Tentar disparar via API com uma BM não verificada significa ficar travado em **250 conversas/24h por empresa**, sem caminho rápido para escalar. Por isso, no mercado profissional, a **BM verificada é pré-requisito**, não opcional.

## Tiers de mensageria explicados

A documentação oficial de [Messaging Limits](https://developers.facebook.com/docs/whatsapp/messaging-limits) define os tiers em torno do número de **conversas iniciadas pela empresa em uma janela de 24 horas**:

| Tier | Conversas iniciadas / 24h | Quando se aplica |
|---|---|---|
| Tier 250 | 250 | Inicial, sem verificação completa |
| Tier 1K | 1.000 | Pós-verificação + qualidade High |
| Tier 10K | 10.000 | Histórico positivo de envio + qualidade estável |
| Tier 100K | 100.000 | Operações enterprise |
| Unlimited | Ilimitado | Casos enterprise aprovados pelo Meta |

O Meta promove o número de tier automaticamente quando: a BM está verificada, a **Quality Rating** do número está em **High** e a empresa atinge 50% do limite atual em pelo menos dois dias dentro de uma janela de 7 dias.

## Por que comprar uma BM já no tier desejado

Subir do Tier 250 para o Tier 10K do zero leva, no melhor cenário, **semanas** — e exige enviar volume real com qualidade alta sem queimar o número. Operações que já têm demanda urgente preferem partir de uma estrutura pronta:

- **BM 250 Disparos** — para quem está validando fluxo, template e taxa de entrega antes de investir em volume.
- **BM 1.000 Disparos** — padrão para quem já roda remarketing, recuperação de carrinho e nutrição diária.
- **BM 10.000 Disparos** — para operações enterprise, lançamentos e times comerciais com SDR/BDR rodando em escala.

## Qualidade do número (Quality Rating)

O Meta classifica cada número em três níveis:

- **Green (High)** — feedback positivo, taxa de bloqueio baixa, templates com boa entrega.
- **Yellow (Medium)** — alerta, throttling pode acontecer.
- **Red (Low)** — risco de degradação ou suspensão do número.

A qualidade é influenciada principalmente por:

1. **Taxa de bloqueio** — quanto menos pessoas bloqueiam o número, melhor.
2. **Reportes negativos** — denúncias por spam pesam muito.
3. **Aderência ao template** — usar templates aprovados, sem desvio do conteúdo.
4. **Opt-in real** — disparar só para contatos que aceitaram receber mensagens.

## Templates de mensagem: o que muda no disparo via API

Toda **conversa iniciada pela empresa** (a chamada Marketing/Utility/Authentication) precisa começar por um **template aprovado**. Templates de marketing são os mais sensíveis e os que mais derrubam qualidade de número quando mal escritos.

Boas práticas direto da [documentação de Marketing Messages](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates):

- Personalize com nome do contato.
- Ofereça caminho claro de opt-out.
- Não use linguagem de "pressão" ou urgência exagerada.
- Espace os disparos: nada de mandar 3 mensagens em 1 minuto pro mesmo contato.

## Checklist antes de iniciar disparo via API

1. BM verificada ativa.
2. WABA criada e número conectado à Cloud API.
3. Display Name aprovado.
4. Template de marketing aprovado em pelo menos 3 variações.
5. Webhook configurado para receber status de entrega e respostas.
6. Lista de contatos com opt-in documentado.
7. Plano de warm-up: começar com 30–50% do tier e crescer gradualmente.

## Próximos passos

Se você já tem a operação desenhada e precisa de uma **BM verificada compatível com disparo via API** — seja **BM 250 Disparos**, **BM 1.000 Disparos** ou **BM 10.000 Disparos** — fale com o time da AD Scale para receber a estrutura pronta com handover técnico completo.

Veja também: [O que é Business Manager Verificada no Meta](/blog/o-que-e-business-manager-verificada-meta) e [como o Trust Score do Meta afeta sua operação](/blog/trust-score-meta-ads-como-funciona).
`,
  },
  // ============ WAVE A — Fundamentos (Topo de funil) ============
  {
    slug: "cnpj-mei-meta-ads-vale-pena",
    title: "CNPJ ou MEI para anunciar no Meta Ads: o que muda em 2026",
    description:
      "Quando vale a pena abrir CNPJ ou MEI para rodar Meta Ads, como isso afeta verificação de BM, limites de gasto, faturamento e fiscal. Guia direto para gestores e infoprodutores.",
    keywords: ["cnpj meta ads", "mei facebook ads", "abrir cnpj para anunciar", "cnpj para verificar bm", "mei trafego pago"],
    category: "Topo de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-12",
    ogImage: "/og/og-cnpj-mei.jpg",
    content: `
:::tldr
Anunciar como pessoa física no Meta funciona, mas trava. Para verificar BM, acessar APIs avançadas e escalar com segurança, ter CNPJ é praticamente obrigatório. MEI resolve a maioria dos casos abaixo de R$ 81 mil/ano; acima disso, ME ou LTDA.
:::

Muito gestor começa anunciando como pessoa física, descobre que está pagando IOF caro, não consegue verificar a Business Manager e trava no primeiro bloqueio. Antes de comprar BM verificada ou contratar serviço de contingência, vale entender **o que o CNPJ libera dentro do Meta Ads**.

## Por que o Meta valoriza CNPJ

A verificação de negócio do Meta exige documentos compatíveis: contrato social, comprovante de endereço comercial e domínio. PJ entrega tudo isso de forma natural; pessoa física quase nunca passa pelo fluxo de verificação automática.

- **Trust Score mais alto** para a BM já no primeiro dia.
- Acesso a **WhatsApp Cloud API, CAPI, catálogos e domain verification**.
- Limites de gasto iniciais mais generosos.
- Recuperação de conta com appeal mais aceito.

## MEI x ME x LTDA: qual escolher

| Regime | Faturamento/ano | Indicado para |
|---|---|---|
| MEI | até R$ 81 mil | Gestor solo, infoprodutor iniciante |
| ME (Simples) | até R$ 4,8 mi | Agência pequena, e-commerce em crescimento |
| LTDA | sem teto prático | Operações high-ticket, multi-sócio |

:::callout type=warning
MEI **não permite** atividade de "agência de publicidade". Use CNAEs compatíveis como **promoção de vendas**, **comércio varejista** ou **desenvolvimento de programas sob encomenda**. Errar o CNAE dá problema fiscal e atrasa verificação.
:::

## Como configurar dentro do Meta

1. Abra o CNPJ com endereço comercial real (evite endereço residencial em coworking genérico).
2. Compre um domínio próprio (.com.br ou .com).
3. Crie a BM já em nome da empresa (não migre depois — perde histórico).
4. Suba o domínio em **Configurações → Segurança da marca → Domínios** e valide via DNS.
5. Abra o fluxo de **Verificação de negócio** com contrato social + comprovante de endereço.

## Quando o CNPJ não basta

Em nichos sensíveis (saúde, finanças, apostas, suplementos), ter CNPJ é só o começo. Mesmo verificada, a conta passa por revisão manual mais agressiva — é aí que estrutura de contingência (BM secundária + perfis aged) protege o faturamento.

> Tem CNPJ ativo e quer pular o tempo de verificação? Veja [como funciona uma BM verificada pronta](/blog/o-que-e-business-manager-verificada-meta) e o impacto no [Trust Score](/blog/trust-score-meta-ads-como-funciona).
`,
  },
  {
    slug: "instalar-pixel-meta-passo-a-passo",
    title: "Como instalar o Pixel do Meta passo a passo (2026)",
    description:
      "Tutorial completo de instalação do Pixel do Meta: criar dataset, conectar ao site, validar eventos com Test Events e ativar CAPI. Para WordPress, Shopify, e código próprio.",
    keywords: ["instalar pixel meta", "como instalar pixel facebook", "pixel meta ads passo a passo", "dataset meta", "test events pixel"],
    category: "Topo de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-12",
    ogImage: "/og/og-instalar-pixel.jpg",
    content: `
:::tldr
Crie o **dataset** no Events Manager, instale o Pixel base no <head> de todas as páginas, dispare eventos padrão (PageView, ViewContent, Lead, Purchase) e valide com Test Events. Sem essa base, otimização de campanha não tem sinal para aprender.
:::

O Pixel do Meta é o sensor que devolve para o algoritmo o que aconteceu no seu site depois do clique. Sem ele, a campanha vira loteria. Em 2026, o Pixel virou parte do **Dataset** (que unifica web, app e CAPI), e o fluxo de instalação mudou ligeiramente.

## 1. Criar o Dataset

1. Acesse **Events Manager → Conectar fonte de dados → Web**.
2. Dê um nome ligado ao domínio (ex.: \`pixel-loja-principal\`).
3. Anote o **ID do Dataset** (substituiu o antigo "ID do Pixel").

## 2. Instalar o código base

Cole o snippet abaixo dentro de \`<head>\` em **todas as páginas**:

\`\`\`
<!-- Meta Pixel -->
<script>
!function(f,b,e,v,n,t,s){...} // snippet oficial do Meta
fbq('init', 'SEU_DATASET_ID');
fbq('track', 'PageView');
</script>
\`\`\`

Em **WordPress**, use o plugin **PixelYourSite** ou o **Site Kit**; em **Shopify**, use o campo nativo em *Online Store → Preferences*.

## 3. Eventos padrão obrigatórios

| Evento | Quando disparar |
|---|---|
| PageView | toda página |
| ViewContent | página de produto/oferta |
| Lead | formulário enviado |
| InitiateCheckout | início do checkout |
| Purchase | confirmação de compra |

## 4. Validar com Test Events

Em **Events Manager → Test Events**, cole a URL e navegue pelo site. Cada evento deve aparecer em tempo real. Se não aparecer:

- Bloqueador de anúncios ativo.
- Pixel duplicado disparando \`PageView\` duas vezes.
- Erro no \`init\` (ID errado).

:::callout type=warning
Pixel duplicado é o erro mais comum em e-commerce. Ele infla métricas, polui o aprendizado e pode bloquear a conta por dados inconsistentes. Use a extensão **Meta Pixel Helper** para checar.
:::

## 5. Ativar CAPI (recomendado)

Pixel sozinho perde **30-40% dos eventos** por bloqueadores e iOS. Subir **Conversions API** em paralelo recupera esses dados. Veja o comparativo em [Pixel vs CAPI](/blog/pixel-vs-capi-conversions-api-meta-ads).

## Checklist final

- Dataset criado e nomeado.
- Código base no \`<head>\` global.
- Eventos padrão disparando.
- Test Events validado.
- Domínio verificado em Segurança da marca.
- CAPI configurado (ou no roadmap).

> Sem Pixel saudável, qualquer otimização vira chute. Próximo passo: [verificar o domínio](/blog/dominio-verificado-facebook-como-configurar-ios14) e ativar [Trust Score](/blog/trust-score-meta-ads-como-funciona).
`,
  },
  {
    slug: "catalogo-meta-commerce-como-criar",
    title: "Como criar e configurar Catálogo no Meta Commerce Manager",
    description:
      "Passo a passo para criar Catálogo no Commerce Manager, conectar ao Pixel, subir feed manual ou via plataforma (Shopify, WooCommerce) e rodar campanhas de vendas dinâmicas.",
    keywords: ["catalogo meta", "commerce manager", "criar catalogo facebook", "dpa meta ads", "feed produtos facebook"],
    category: "Topo de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-13",
    ogImage: "/og/og-catalogo-commerce.jpg",
    content: `
:::tldr
Catálogo é pré-requisito para **DPA (Dynamic Product Ads)**, Reels Shopping e WhatsApp Catalog. Cria no Commerce Manager, conecta ao Pixel via Match de eventos e mantém feed atualizado — manual, planilha, plataforma ou via API.
:::

Anunciar produto sem catálogo é como rodar campanha sem Pixel: você até consegue, mas perde a parte mais lucrativa do algoritmo. Catálogo libera **remarketing dinâmico**, **vendas em coleção** e **integração com WhatsApp e Instagram Shop**.

## Quando você precisa de catálogo

- E-commerce com 20+ SKUs.
- Infoprodutor com mais de um produto.
- Marketplace, agência imobiliária, automotivo.
- Quem quer rodar Reels Shopping ou WhatsApp Catalog.

## Passo a passo

1. **Commerce Manager → Catálogos → Criar catálogo**.
2. Escolha o tipo (e-commerce, viagens, imóveis, automotivo).
3. Conecte à BM verificada.
4. Adicione produtos por uma das vias:
   - **Manual** (até 20 itens — para testar).
   - **Feed agendado** (URL CSV/XML atualizado).
   - **Pixel/SDK** (autopopulação por eventos ViewContent).
   - **Parceiro de plataforma** (Shopify, WooCommerce, Nuvemshop).

## Campos obrigatórios do feed

| Campo | Exemplo |
|---|---|
| id | SKU-1234 |
| title | Tênis Runner Pro 41 |
| description | Tênis de corrida com amortecimento |
| availability | in stock |
| condition | new |
| price | 349.90 BRL |
| link | https://loja.com/p/runner-pro |
| image_link | https://cdn.loja.com/runner.jpg |
| brand | AcmeRun |

:::callout type=tip
Use **imagens 1:1 com 1024×1024**, evite watermark e fundo poluído. Catálogos com imagens limpas têm CTR até 2× maior em DPA.
:::

## Conectar ao Pixel

Em **Catálogo → Eventos**, vincule o dataset do Pixel e mapeie:

- \`ViewContent → content_ids\`
- \`AddToCart → content_ids + value\`
- \`Purchase → content_ids + value + currency\`

Esse mapeamento é o que viabiliza o remarketing dinâmico ("mostre exatamente o produto que ele viu").

## Erros comuns

- Feed com IDs duplicados → catálogo rejeita o lote inteiro.
- \`availability\` em português ("disponível") → use sempre o enum em inglês.
- Pixel mandando \`content_ids\` diferentes do feed → matching cai e DPA não roda.

:::callout type=warning
Catálogo em BM não verificada tem limite de produtos e fica fora do WhatsApp Shop. Se a meta é vender pelo WhatsApp, valide a BM **antes** de subir o feed.
:::

> Próximo passo: rodar primeira campanha DPA com público de remarketing de 14 dias e comparar CPA contra tráfego frio.
`,
  },
  {
    slug: "como-funciona-leilao-meta-ads",
    title: "Como funciona o leilão do Meta Ads (e por que seu CPM sobe)",
    description:
      "Entenda os 3 pilares do leilão do Meta — lance, taxa de ação estimada e qualidade — e por que dois anunciantes com o mesmo público pagam preços diferentes pelo mesmo clique.",
    keywords: ["leilao meta ads", "como funciona leilao facebook", "cpm alto meta", "total value leilao", "qualidade anuncio meta"],
    category: "Topo de funil",
    readingTime: "6 min",
    publishedAt: "2026-05-13",
    ogImage: "/og/og-leilao-meta.jpg",
    content: `
:::tldr
O Meta não vende impressão pelo maior lance. Quem vence é quem entrega o **maior Total Value** = lance × taxa de ação estimada × qualidade do anúncio. Por isso, melhorar criativo derruba CPM mais rápido do que aumentar orçamento.
:::

Todo dia gestor reclama: "subi o orçamento e o CPM disparou". O motivo não é o orçamento — é como o leilão calcula o vencedor. Entender essa lógica resolve metade dos problemas de performance.

## A fórmula do Total Value

\`Total Value = Lance × Taxa estimada de ação × Qualidade\`

O Meta escolhe o anúncio que entrega o maior valor combinado **para o usuário e para a plataforma**. Você pode pagar menos que um concorrente e ainda assim vencer o leilão — desde que seu criativo seja melhor.

## Os 3 fatores

### 1. Lance
Em campanhas de **lance automático**, o Meta define dinamicamente. Em **lance manual / target cost**, você fixa o teto.

### 2. Taxa de ação estimada
Probabilidade de o usuário executar a ação otimizada (clique, compra, lead). Quanto mais o Pixel/CAPI mandar sinal de conversão real, melhor.

### 3. Qualidade do anúncio
Combina:
- Feedback negativo (ocultar, denunciar).
- Engajamento (curtidas, comentários, shares).
- Score de relevância e taxa de conclusão de vídeo.
- Detecção de clickbait, sensacionalismo ou *engagement bait*.

## Por que o CPM sobe

- **Audiência saturada**: mesmo público, mais anunciantes competindo.
- **Criativo cansado**: CTR cai, qualidade cai, Total Value cai → para manter entrega, precisa pagar mais.
- **Pixel ruim**: sem sinal de conversão, taxa estimada cai.
- **Sazonalidade**: Black Friday, eleição, datas comerciais elevam todos os leilões.

:::callout type=tip
Renove criativo a cada **5-7 dias** em campanhas de scaling. Não precisa reescrever do zero — varia hook, primeiros 2 segundos e thumb.
:::

## O que melhora seu lugar no leilão

- Pixel + CAPI bem instalados (sinal forte de conversão).
- Domínio verificado.
- Criativos com hook nos primeiros 3 segundos.
- Página de destino rápida (LCP < 2.5s).
- Conta com [Trust Score](/blog/trust-score-meta-ads-como-funciona) alto.

:::callout type=warning
Aumentar orçamento em 30%+ de uma vez resetar o aprendizado. Suba em degraus de 10-20% a cada 48h para preservar o CPM.
:::

> Quer destravar leilão sem queimar conta? Veja o guia de [warm-up de conta de anúncio](/blog/warm-up-conta-anuncio-meta-passo-a-passo).
`,
  },
  {
    slug: "nichos-sensiveis-meta-ads-quais-sao",
    title: "Nichos sensíveis no Meta Ads: lista completa e como anunciar sem bloquear",
    description:
      "Lista atualizada de nichos sensíveis no Meta Ads (saúde, finanças, emagrecimento, apostas, suplementos) e o que muda na criação, BM, página e criativo para evitar bloqueio.",
    keywords: ["nichos sensiveis meta", "anunciar emagrecimento facebook", "anunciar saude meta ads", "anunciar credito facebook", "politica anuncios sensiveis"],
    category: "Topo de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-14",
    ogImage: "/og/og-nichos-sensiveis.jpg",
    content: `
:::tldr
Nichos sensíveis (saúde, emagrecimento, finanças, apostas, suplementos, relacionamento, política) não são proibidos — são **revisados com tolerância zero**. Quem opera sério usa BM verificada, página antiga, criativo livre de promessa e estrutura de contingência.
:::

A diferença entre quem anuncia há 5 anos em nicho sensível e quem é bloqueado toda semana **não é sorte**: é estrutura. O Meta tem uma lista interna de categorias que entram em **fila de revisão mais rígida**, com IA específica analisando texto, imagem, áudio e LP.

## Lista atualizada (2026)

- **Saúde**: clínicas, dentistas, estéticos, terapias, telemedicina.
- **Emagrecimento e antes/depois**: dieta, cirurgia, suplemento.
- **Finanças**: crédito, empréstimo, cartão, investimento, day trade.
- **Criptomoedas e DeFi**.
- **Apostas e iGaming** (mercado regulamentado, requer credenciamento).
- **Suplementos, fitoterápicos, nootrópicos**.
- **Relacionamento, conquista, sedução**.
- **Político e eleitoral** (exige autorização específica).
- **Bebidas alcoólicas, tabaco, vape**.
- **Armas, segurança privada, escoltas**.

## O que muda na operação

| Área | Nicho normal | Nicho sensível |
|---|---|---|
| BM | nova ou aged | **verificada obrigatória** |
| Página | qualquer | **antiga, com seguidores reais** |
| Pixel/CAPI | bom ter | **obrigatório** |
| Criativo | foco em conversão | **livre de promessa, antes/depois e gatilho médico** |
| LP | leve | **com termos, privacy, autoridade visível** |
| Estrutura | conta única | **2-3 BMs em paralelo** |

## Erros que bloqueiam na hora

- "Perca 10kg em 30 dias" → promessa quantificada.
- Foto de barriga *antes/depois*.
- Print de extrato bancário ou contracheque.
- Linguagem em segunda pessoa apontando defeito ("você está acima do peso?").
- Depoimento sem "*resultados podem variar*".
- LP sem CNPJ, sem termos de uso, sem responsável técnico (saúde).

:::callout type=warning
**Antes/depois** continua proibido em emagrecimento mesmo em 2026 — o Meta usa visão computacional para detectar mesmo quando a imagem está dividida em dois posts.
:::

## Como blindar o operacional

1. **BM verificada** em CNPJ com CNAE compatível.
2. Página com **2+ anos**, seguidores orgânicos, sem histórico de denúncia.
3. **Domínio verificado** + Pixel + CAPI.
4. **Plano B**: 1 BM secundária pronta para subir em até 1h se a principal cair.
5. **Criativos pré-aprovados em sandbox** (subir 5 versões, deixar 3 pausadas como backup).

:::callout type=tip
Em saúde, exiba CRM/CRO/CRP do responsável técnico tanto no criativo (rodapé) quanto na LP. Reduz reprovação em ~40%.
:::

> Vai entrar num nicho sensível? Veja [como evitar bloqueio de conta](/blog/bloqueio-conta-anuncio-meta-como-evitar) e [como funciona a BM verificada](/blog/o-que-e-business-manager-verificada-meta).
`,
  },
  {
    slug: "qualidade-conta-anuncio-meta-como-medir",
    title: "Qualidade da conta de anúncio no Meta: como medir e melhorar",
    description:
      "Como o Meta calcula a qualidade da sua conta de anúncio (Account Quality), onde acompanhar, o que derruba o score e o que fazer para recuperar antes do bloqueio.",
    keywords: ["account quality meta", "qualidade conta anuncio facebook", "score conta meta ads", "violacoes facebook ads", "ad account quality"],
    category: "Topo de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-14",
    ogImage: "/og/og-account-quality.jpg",
    content: `
:::tldr
**Account Quality** é o painel onde o Meta mostra advertências, restrições e o score de cada ativo (conta, BM, página, perfil). Verificar semanalmente evita que você descubra um bloqueio quando a campanha já parou de entregar.

:::

Quase ninguém abre o **business.facebook.com/accountquality**. E é exatamente lá que o Meta avisa, com dias de antecedência, que sua conta está prestes a ser restringida.

## Onde acessar

\`Business Suite → Configurações → Qualidade da conta\`

Você verá três níveis:

- **Conta de anúncio**
- **Página**
- **Perfil pessoal administrador**

Cada um tem status: **Ativo / Em revisão / Restrito / Desativado**.

## O que derruba a qualidade

- Anúncios reprovados repetidos (mesmo criativo, mesmo motivo).
- Feedback negativo alto (ocultar, "não quero ver", denúncia).
- Disputas de pagamento (chargeback).
- Sinais de scraping ou automação.
- Login simultâneo em IPs distantes.
- Página com avaliações negativas e baixo CSAT.

## O que melhora

- Renovar criativos antes de saturar.
- Atender pedido de verificação na hora.
- Manter domínio + Pixel + CAPI consistentes.
- Responder reviews da página.
- Pagar com o mesmo método por bastante tempo.

:::callout type=tip
Após qualquer reprovação, **não republique o mesmo anúncio**. Ajuste copy, troque thumb e republique como criativo novo. Reapresentar o mesmo conteúdo conta como reincidência.
:::

## Como ler o histórico de violações

Clique em cada violação para ver:

- **Política violada** (ex.: produtos restritos, conteúdo enganoso).
- **Anúncio específico** (ID).
- **Direito de revisão** (botão "Solicitar nova análise").

Use sempre o appeal — em ~30% dos casos o Meta reverte com um texto bem escrito ([guia de recuperação](/blog/recuperar-conta-anuncio-bloqueada-facebook-ads)).

:::callout type=warning
3 violações em 30 dias = restrição automática. 5 violações = desativação. Reset acontece apenas após 90 dias limpos.
:::

## Rotina recomendada

| Frequência | Ação |
|---|---|
| Diária | Olhar notificações no Business Suite |
| Semanal | Account Quality em todas as BMs |
| Mensal | Revisar páginas, domínios e perfis admin |
| Trimestral | Auditar acessos, remover ex-funcionários |

> Antes do próximo bloqueio, faça o [checklist de auditoria da BM](/blog/checklist-auditoria-bm-facebook-18-itens).
`,
  },
  {
    slug: "autenticacao-2-fatores-conta-facebook-ads",
    title: "Autenticação em 2 fatores no Facebook Ads: como configurar sem perder a conta",
    description:
      "Por que o 2FA é obrigatório para acessar BM, quais métodos o Meta aceita, como configurar com app autenticador e o que fazer se perder o celular sem perder a conta de anúncio.",
    keywords: ["2fa facebook ads", "autenticacao dois fatores meta", "bm 2fa", "perdi celular facebook ads", "codigo seguranca meta"],
    category: "Topo de funil",
    readingTime: "6 min",
    publishedAt: "2026-05-15",
    ogImage: "/og/og-2fa-facebook.jpg",
    content: `
:::tldr
2FA é obrigatório para qualquer administrador de BM. Use **app autenticador (Authy, 1Password, Google Auth)** — nunca só SMS — e guarde os **códigos de recuperação** num gerenciador de senhas. Perder 2FA = perder a conta.
:::

A maioria dos casos de "perdi minha BM" começa com SMS de 2FA num número que o gestor não tem mais acesso. Configurar 2FA do jeito certo leva 5 minutos e evita a tragédia.

## Por que SMS não basta

- SIM swap (clonagem de chip).
- Operadora bloqueia número inativo.
- Número antigo da agência que saiu da empresa.
- Roaming internacional sem sinal.

## Métodos aceitos pelo Meta

| Método | Segurança | Recomendado |
|---|---|---|
| App autenticador (TOTP) | Alta | ✅ Padrão |
| Chave física (YubiKey) | Máxima | ✅ Admin master |
| SMS | Média | Apenas backup |
| Código por e-mail | Baixa | Não usar como principal |

## Passo a passo

1. \`Facebook → Configurações → Senha e segurança → Autenticação em duas etapas\`.
2. Escolha **App de autenticação**.
3. Escaneie o QR no Authy/1Password.
4. Confirme com o código de 6 dígitos.
5. **Salve os 10 códigos de recuperação** no gerenciador de senhas.

:::callout type=warning
Tirar print dos códigos e mandar no WhatsApp **não é guardar**. Use 1Password, Bitwarden ou cofre da empresa. Se vazar, qualquer pessoa com login + código entra sem 2FA.
:::

## Setup para times

- Todo admin master com **2FA + YubiKey**.
- Funcionário operacional com **2FA app + sem permissão de Business Settings**.
- E-mail de recuperação corporativo, **nunca pessoal**.
- Acesso via [perfil aged dedicado à BM](/blog/perfil-aged-facebook-por-que-administrador-importa).

## Perdi celular e códigos — e agora?

1. Tente login pelo dispositivo onde já está logado (Facebook web/app).
2. Abra **Account Center → Segurança → Resetar 2FA** (precisa estar logado em alguma sessão ativa).
3. Sem sessão ativa: peça a outro admin da BM para te re-adicionar com novo e-mail.
4. Sem outro admin: appeal demorado e às vezes irrecuperável.

:::callout type=tip
Toda BM séria tem **dois administradores master** com 2FA independentes. Single point of failure = single point de prejuízo.
:::

> Faça também a [auditoria de acessos da BM](/blog/checklist-auditoria-bm-facebook-18-itens) hoje mesmo.
`,
  },
  {
    slug: "estrutura-bm-conta-pixel-pagina-relacao",
    title: "BM, conta de anúncio, página e pixel: como tudo se conecta no Meta",
    description:
      "Diagrama prático de como Business Manager, conta de anúncio, página, pixel, catálogo e domínio se relacionam — e por que entender essa hierarquia evita 80% dos problemas.",
    keywords: ["hierarquia bm meta", "estrutura business manager", "como funciona bm meta", "bm conta pixel pagina", "arquitetura meta ads"],
    category: "Topo de funil",
    readingTime: "6 min",
    publishedAt: "2026-05-15",
    ogImage: "/og/og-estrutura-bm.jpg",
    content: `
:::tldr
A **BM é o cofre**. Dentro dela ficam contas de anúncio, páginas, pixels, catálogos, domínios e pessoas. Cada ativo pode pertencer a **uma BM por vez** — entender isso evita pixel duplicado, página órfã e perda de histórico em migração.
:::

A maioria dos erros graves de operação vem de não entender a hierarquia: dono confunde página com BM, agência cria pixel em conta de cliente, freela some com domínio verificado. Vamos por partes.

## Hierarquia visual

\`\`\`text
Business Manager (BM)
├─ Pessoas (admin, employee, funcionário do parceiro)
├─ Contas de anúncio (1..N)
├─ Páginas (1..N)
├─ Pixels / Datasets (1..N)
├─ Catálogos
├─ Domínios verificados
├─ Apps
├─ WhatsApp Business Accounts (WABA)
└─ Parceiros (outras BMs com acesso)
\`\`\`

## Regras que ninguém te conta

- **Pixel só pode estar em UMA BM ao mesmo tempo.** Compartilhar com agência? Use *partner access*.
- **Página só pode ter UM proprietário (owner BM).** Outras BMs podem ter acesso, mas não posse.
- **Domínio verificado idem.** Só uma BM "dona". Migrar = perder verificação e recomeçar DNS.
- **Conta de anúncio** segue a regra de pixel.
- **Catálogo** pode ser compartilhado por *Commerce Partner*.

:::callout type=warning
Quando uma agência diz "eu crio o pixel na minha BM e mando os dados", você está entregando o histórico de aprendizado da sua marca para ela. **Crie o pixel na SUA BM** e dê acesso parcial à agência.
:::

## Fluxo correto de criação

1. CNPJ → cria BM no nome da empresa.
2. Verifica negócio (CNPJ + endereço + domínio).
3. Cria domínio + verifica DNS.
4. Cria página (ou reivindica a existente).
5. Cria conta de anúncio dentro da BM.
6. Cria pixel/dataset → conecta no site + na conta de anúncio.
7. Convida parceiros via *Partner Access* (não como administrador master).

## Quando algo dá errado

| Sintoma | Causa provável |
|---|---|
| Pixel some do site | Pixel migrado para outra BM |
| Página fica "sem proprietário" | Owner BM foi desativada |
| Domínio cai da Segurança da marca | Token DNS removido ou DNS trocado |
| Catálogo não puxa eventos | Pixel desconectado do catálogo |

:::callout type=tip
Antes de qualquer migração, faça **backup dos IDs** (pixel, conta, página, catálogo) e printscreen das permissões. Migração mal feita custa anos de Trust Score.
:::

> Para operação séria, veja a [arquitetura de contingência](/blog/arquitetura-contingencia-meta-ads-operacao-alto-volume) que distribui ativos entre BM principal e secundária.
`,
  },
  {
    slug: "tipos-de-bm-meta-nova-antiga-verificada-ilimitada",
    title: "Tipos de BM no Meta: nova, antiga, verificada e ilimitada (comparativo 2026)",
    description:
      "Diferenças práticas entre BM nova, BM aged, BM verificada e BM ilimitada — o que muda em limite de gasto, Trust Score, risco de bloqueio e preço de mercado.",
    keywords: ["tipos de bm", "bm nova vs bm verificada", "bm ilimitada", "bm aged", "comprar bm comparativo"],
    category: "Topo de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-16",
    ogImage: "/og/og-tipos-bm.jpg",
    content: `
:::tldr
BM **nova** tem limite baixo e Trust Score zero. BM **aged** ganha tempo de vida. BM **verificada** tem CNPJ aprovado e libera APIs. BM **ilimitada** soma verificada + spending cap removido — patamar para operações 6-7 dígitos/mês.
:::

Quando você lê "comprar BM" no mercado, são pelo menos quatro produtos diferentes embaixo do mesmo nome. Saber qual encaixa na sua operação evita comprar caro o que não precisa — ou barato o que vai te travar amanhã.

## Comparativo direto

| Tipo | Trust Score inicial | Spending cap | Verificação CNPJ | Uso ideal |
|---|---|---|---|---|
| BM nova | Baixo | R$ 100-1.500/dia | Não | Teste, infoprodutor iniciante |
| BM aged | Médio | R$ 1k-10k/dia | Não | Quem precisa pular o warm-up inicial |
| BM verificada | Alto | R$ 10k-50k/dia | **Sim** | Operação séria, nichos sensíveis, WhatsApp API |
| BM ilimitada | Muito alto | **Sem cap** | Sim | Scaling 6-7 dígitos/mês |

## BM nova

Criada do zero, sem histórico. Você assume todo o warm-up: subir gasto em degraus, criar pixel, verificar domínio, evitar bloqueio na primeira semana.

- **Prós**: barata (gratuita se você mesmo criar).
- **Contras**: limite ridículo nos primeiros dias, alta chance de review.

## BM aged

BM criada há 6m-3 anos, com gasto pequeno mas constante. Trust Score "morno".

- **Prós**: pula warm-up inicial, aceita criativo médio.
- **Contras**: ainda não tem CNPJ aprovado → não acessa WhatsApp API.

## BM verificada

CNPJ aprovado no fluxo oficial. Libera tudo: domain verification automática, CAPI avançado, WhatsApp Cloud API, catálogos grandes.

- **Prós**: limite alto desde o dia 1, base para [WhatsApp API](/blog/disparo-via-api-whatsapp-cloud-bm-verificada-guia-completo).
- **Contras**: requer fornecedor sério ([como escolher](/blog/como-escolher-fornecedor-bm-verificada)).

## BM ilimitada

Verificada **e** com spending limit removido pelo Meta (geralmente após histórico de gasto + CNPJ robusto). Padrão para operações que rodam R$ 50 mil/dia ou mais.

:::callout type=tip
"Ilimitada" não significa "imortal". Mesmo BM sem cap pode ser bloqueada por violação. Quem opera nesse patamar mantém **2 a 3 BMs ilimitadas em paralelo** como contingência.
:::

## Como escolher

Volume mensal de Meta Ads:

- **Até R$ 5k/mês** → BM nova bem aquecida resolve.
- **R$ 5k-30k/mês** → BM aged ou verificada simples.
- **R$ 30k-200k/mês** → Verificada, com BM secundária pronta.
- **R$ 200k+/mês** → Verificada principal + ilimitada secundária + WhatsApp API.

:::callout type=warning
Não compre verificada "barata demais". O Meta detecta padrão de origem — fornecedor que vende em massa atrai revisão. Prefira poucos fornecedores com handover técnico.
:::

> Veja também [quanto custa uma BM verificada em 2026](/blog/quanto-custa-bm-verificada-facebook-2026) e o [ROI da contingência](/blog/calcular-roi-investimento-contingencia-meta-ads).
`,
  },
  {
    slug: "cartao-credito-facebook-ads-boas-praticas",
    title: "Cartão de crédito para Facebook Ads: boas práticas e o que derruba a conta",
    description:
      "Como escolher cartão para anunciar no Meta, por que evitar cartões pré-pagos virtuais, como configurar limite de gasto e o que fazer quando o pagamento é rejeitado.",
    keywords: ["cartao facebook ads", "pagamento meta ads", "cartao pre pago facebook", "pagamento recusado meta", "metodo pagamento bm"],
    category: "Topo de funil",
    readingTime: "6 min",
    publishedAt: "2026-05-16",
    ogImage: "/og/og-cartao-facebook.jpg",
    content: `
:::tldr
Use **cartão de crédito empresarial em nome do CNPJ da BM**, com limite alto e histórico de uso. Evite pré-pago virtual, cartão de terceiros e troca constante de método — esses são os 3 maiores motivos de bloqueio por "atividade suspeita de pagamento".
:::

Cartão é o ativo mais subestimado da operação. Pagamento bom estabiliza Trust Score; pagamento ruim derruba conta verificada em uma semana.

## O que o Meta avalia no método de pagamento

- **Nome do titular** vs nome da BM/empresa.
- **País de emissão** vs país da conta de anúncio.
- **Histórico de cobranças** (sucesso, recusa, chargeback).
- **Tempo do método na conta** (trocas frequentes = alerta).

## Boas práticas

1. Cartão **PJ no CNPJ da BM**, limite ≥ 3× gasto mensal.
2. Cadastrar **dois métodos** (principal + backup).
3. **Pré-pagar** valor em conta para evitar recusa em pico.
4. Manter **endereço de cobrança = endereço do CNPJ**.
5. Avisar o banco antes de elevar muito o gasto (evita antifraude do emissor).

## O que evitar

- Cartão pré-pago virtual gerado a cada semana.
- Cartão pessoal em conta empresarial (e vice-versa).
- Trocar bandeira/banco a cada bloqueio.
- Boleto como método principal (atraso = pausa imediata).
- Cartão de cliente em conta da agência.

:::callout type=warning
Cartão pré-pago virtual descartável é uma das **assinaturas favoritas de operação suspeita**. O Meta cruza BIN, IP e fingerprint — e bloqueia. Se precisa de cartão isolado, use **cartão corporativo nominal** (tipo Stark, Cora) com mesmo CNPJ.
:::

## Pagamento recusado — checklist

1. Verificar limite e fatura no app do banco.
2. Conferir se o Meta cobrou em USD (algumas BMs cobram em dólar + IOF).
3. Liberar transação internacional no banco.
4. Atualizar CVV e validade.
5. Cadastrar segundo método e tentar de novo.

:::callout type=tip
Defina **limite de gasto da conta** (Spending Limit) acima do orçamento, mas abaixo do limite do cartão. Isso evita que um BUG ou pixel duplicado dispare gasto que estoure o cartão e bloqueie a conta.
:::

## Cobrança e fiscal

- Solicite a **fatura mensal em PDF** no Billing.
- Configure CNPJ para que a nota saia com retenção correta.
- Guarde 5 anos para Receita.

> Estabilidade de pagamento é parte do [Trust Score](/blog/trust-score-meta-ads-como-funciona). Pagamento sólido = leilão melhor.
`,
  },
  {
    slug: "politicas-anuncios-meta-erros-comuns-reprovacao",
    title: "Políticas de anúncios do Meta: os 12 erros que mais reprovam criativo",
    description:
      "Top 12 motivos de reprovação de anúncio no Meta em 2026: gatilhos médicos, antes/depois, promessa quantificada, segunda pessoa, screenshots de chat e mais — com exemplos de correção.",
    keywords: ["anuncio reprovado meta", "politica anuncios facebook", "porque anuncio reprovado", "erros criativos meta", "appeal anuncio meta"],
    category: "Topo de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-17",
    ogImage: "/og/og-politicas-meta.jpg",
    content: `
:::tldr
80% das reprovações vêm de 12 erros recorrentes — quase todos resolvíveis com **troca de hook e ajuste de copy**. Saber quais são acelera o tempo de subida e protege Trust Score.
:::

A política do Meta é vaga de propósito. Mas existem padrões claros do que a moderação automática derruba. Use este checklist antes de subir qualquer criativo.

## Os 12 erros mais comuns

### 1. Atributos pessoais
"Você, mulher acima de 40..." → o Meta proíbe apontar idade, peso, condição médica, orientação. Use **3ª pessoa** ou pergunta neutra.

### 2. Antes e depois
Mesmo em fitness, estética, dental, finanças. Substitua por **processo / metodologia / depoimento textual**.

### 3. Promessa quantificada
"Perca 10kg em 30 dias" / "Lucre R$ 10k/mês" → reprovado. Reescreva como **possibilidade** ("o método que ajudou X clientes a...").

### 4. Screenshot de chat ou extrato
Print do WhatsApp ou bancário viola política de prova. Substitua por **case escrito + foto profissional**.

### 5. Linguagem clickbait
"NÃO CLIQUE SE..." / "VOCÊ NÃO VAI ACREDITAR" → reduz score e reprova.

### 6. Caixa alta excessiva
Mais de 30% do texto em maiúsculo é flagged.

### 7. Emojis em excesso
🔥🔥🔥 não convertem mais — e ainda reduzem qualidade.

### 8. LP inconsistente
Anúncio promete X, LP entrega Y → reprovação por desinformação.

### 9. Pixel ausente ou quebrado
Sem Pixel, o Meta classifica como "tráfego de baixa qualidade" e restringe.

### 10. Termos médicos/financeiros sem disclaimer
"cura", "garantido", "rentabilidade certa" → reprovado.

### 11. Imagem com texto em excesso
Voltou a importar em 2026 — acima de 50% texto reduz entrega.

### 12. URL encurtada
Bit.ly e similares parecem phishing. Use **domínio verificado** próprio.

## Como reescrever (exemplos)

| Reprovado | Aprovado |
|---|---|
| "Cansada de barriga flácida?" | "Conheça o método que ajudou 800 mulheres a treinar em casa" |
| "Ganhe R$ 10k/mês" | "Veja como meus alunos estruturam o próprio negócio" |
| "CURE sua ansiedade" | "Terapia online com psicólogos credenciados" |
| "Print do PIX recebido" | Depoimento em vídeo + storytelling escrito |

:::callout type=tip
Antes de subir, rode o texto no **Meta Ad Library** procurando concorrentes ativos. Se ninguém usa essa abordagem há meses, é sinal de que reprova.
:::

## Reprovou — o que fazer

1. **Não republique igual.** Reincidência conta.
2. Leia o motivo exato (Account Quality → violação).
3. Ajuste copy + thumb e republique como **novo criativo**.
4. Se acredita que foi engano, abra **Solicitar nova análise**. Taxa de reversão ~30%.
5. Se repetiu 3+ vezes, troque a conta para a [BM secundária](/blog/arquitetura-contingencia-meta-ads-operacao-alto-volume).

:::callout type=warning
Insistir 5x no mesmo criativo reprovado pode levar a restrição da conta inteira. Trate cada "no" como dado: ajuste, não force.
:::

> Veja também: [como evitar bloqueio de conta](/blog/bloqueio-conta-anuncio-meta-como-evitar) e [Account Quality](/blog/qualidade-conta-anuncio-meta-como-medir).
`,
  },
  {
    slug: "metricas-essenciais-meta-ads-iniciantes",
    title: "Métricas essenciais do Meta Ads para iniciantes: o que olhar (e o que ignorar)",
    description:
      "CPM, CPC, CTR, frequência, ROAS, CPA, hook rate e thumb-stop ratio: o que cada métrica significa, quando importa e quando é vaidade. Guia direto para começar a ler painel.",
    keywords: ["metricas meta ads", "kpi facebook ads", "cpm cpc ctr roas", "hook rate", "como ler painel meta"],
    category: "Topo de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-17",
    ogImage: "/og/og-metricas-meta.jpg",
    content: `
:::tldr
Painel do Ads Manager tem 200+ colunas. Iniciante só precisa de 8: **gasto, impressões, CPM, CTR, CPC, frequência, CPA e ROAS**. Hook rate e thumb-stop ratio entram quando você começa a otimizar criativo.
:::

Métrica demais paralisa. Métrica de menos faz você escalar no escuro. Este é o kit básico para ler campanha sem perder dia inteiro.

## As 8 métricas que importam todo dia

| Métrica | O que mede | Faixa saudável* |
|---|---|---|
| Gasto | quanto saiu hoje | depende do budget |
| Impressões | quantas vezes apareceu | volume mínimo p/ aprendizado |
| CPM | preço por 1.000 impressões | R$ 15-60 (BR) |
| CTR | clique ÷ impressão | > 1% (link) |
| CPC | preço por clique no link | < R$ 2 (varia) |
| Frequência | impressões ÷ pessoas | < 2.5 em prospecting |
| CPA | gasto ÷ resultado | < ticket × margem |
| ROAS | receita ÷ gasto | > 2 para começar |

*Faixas indicativas — varia muito por nicho.

## Como interpretar cada uma

### CPM
Alto demais? Criativo cansado, audiência saturada ou Trust Score baixo. Veja [como funciona o leilão](/blog/como-funciona-leilao-meta-ads).

### CTR
Baixo (< 0.7%)? Hook fraco. Alto (> 3%) mas sem conversão? Promessa enganosa ou LP ruim.

### Frequência
Acima de 3 em campanha de aquisição = público pequeno ou criativo único. Renove ou expanda.

### CPA
A métrica que paga o boleto. Calcule junto com **LTV** e **margem**, não só preço do produto.

### ROAS
2x não é bom nem ruim — depende da estrutura de custos. E-commerce físico precisa de 4-6x; infoproduto digital aceita 1.8-2.5x.

## Métricas de criativo (intermediário)

- **Hook rate** = views de 3s ÷ impressões → mede se o início segura.
- **Thumb-stop ratio** = views de 3s ÷ impressões da capa.
- **Hold rate** = views de 15s ÷ views de 3s → mede meio do vídeo.

:::callout type=tip
Antes de pausar criativo, olhe **hook rate**. Se está bom mas conversão está ruim, o problema é LP ou oferta — não criativo.
:::

## O que ignorar (no início)

- **Frequency por anúncio individual** quando o conjunto tem CBO.
- **Score de relevância antigo** (descontinuado, substituído por diagnósticos).
- **"Pessoas alcançadas"** isolado de conversão.
- Métricas de **engajamento** em campanha de venda (curtidas não pagam boleto).

:::callout type=warning
Otimizar para CPC barato é a forma mais comum de **queimar dinheiro**. Clique barato + zero conversão = leilão te jogando para tráfego ruim.
:::

## Rotina diária

1. Painel de campanhas (gasto, CPA, ROAS).
2. Frequência e CPM dos conjuntos.
3. CTR e hook rate dos criativos.
4. [Account Quality](/blog/qualidade-conta-anuncio-meta-como-medir) (1× por semana).

> Próximo passo: entender [warm-up de conta](/blog/warm-up-conta-anuncio-meta-passo-a-passo) para ler métricas no contexto certo.
`,
  },
  {
    slug: "gerenciador-anuncios-meta-tour-completo-iniciantes",
    title: "Gerenciador de Anúncios do Meta: tour completo para iniciantes (2026)",
    description:
      "Tour por cada área do Ads Manager do Meta: estrutura de campanha/conjunto/anúncio, colunas, segmentações, testes A/B e atalhos para quem está começando.",
    keywords: ["gerenciador anuncios meta", "ads manager tutorial", "como usar ads manager", "facebook ads manager 2026", "iniciar meta ads"],
    category: "Topo de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-18",
    ogImage: "/og/og-ads-manager-tour.jpg",
    content: `
:::tldr
Ads Manager se organiza em 3 níveis: **Campanha (objetivo) → Conjunto (público, orçamento, posicionamento) → Anúncio (criativo)**. Domine esses 3 e você opera 90% do que precisa.
:::

O Ads Manager assusta na primeira vez. Mas tudo que importa cabe em três níveis e quatro telas. Este é o tour para usar com confiança.

## 1. Estrutura de 3 níveis

\`\`\`text
Campanha           → Objetivo (vendas, leads, alcance, tráfego)
 └─ Conjunto      → Público, orçamento, posicionamento, otimização
     └─ Anúncio   → Criativo (vídeo/imagem), copy, CTA, URL
\`\`\`

Regra de ouro: **tudo que muda público ou orçamento vai no conjunto. Tudo que muda criativo vai no anúncio.**

## 2. Objetivos de campanha (2026)

- **Reconhecimento** → impressões/alcance.
- **Tráfego** → cliques no link.
- **Engajamento** → mensagem, vídeo, post.
- **Leads** → formulário instantâneo ou CRM.
- **Promoção do app**.
- **Vendas** → conversão site/loja física.

Para começar com venda direta, use **Vendas → Conversão** + Pixel + CAPI configurados.

## 3. Conjunto de anúncios — o que decide

- **Público** (salvo, lookalike, retargeting, advantage+).
- **Posicionamentos** (deixe automático no início).
- **Orçamento** diário ou vitalício.
- **Otimização** (compra, lead, ViewContent).
- **Janela de atribuição** (7 dias clique padrão).

:::callout type=tip
Em 2026, **Advantage+ Audience** entrega melhor que segmentação manual em ~70% dos casos. Comece com Advantage+ e só ajuste se ele errar.
:::

## 4. Criativos

- 1 vídeo vertical 9:16 (Reels/Stories).
- 1 imagem 1:1 (Feed).
- 1 vídeo quadrado 1:1 backup.
- Copy curta (1ª linha < 125 caracteres).
- CTA alinhado ao objetivo (Comprar / Saiba mais / Enviar mensagem).

## 5. Colunas — preset essencial

Salve um preset com: \`Gasto | Impressões | CPM | CTR (link) | CPC | Frequência | Resultados | CPA | ROAS\`. Detalhes em [métricas essenciais](/blog/metricas-essenciais-meta-ads-iniciantes).

## 6. Testes A/B

Use o botão **Teste A/B** (não duplique conjunto manualmente). O Meta divide audiência sem sobreposição e mostra significância estatística.

- Teste **uma variável por vez** (criativo OU público OU orçamento).
- Duração mínima: **5-7 dias**.
- Volume mínimo: **50 conversões por braço**.

## 7. Atalhos que economizam horas

- \`Ctrl + C / Ctrl + V\` em campanhas selecionadas.
- Aba **Atividade** → vê quem mexeu em quê.
- **Rascunhos** → monte tudo offline antes de publicar.
- **Regras automatizadas** → pausar anúncio quando CPA > X.

:::callout type=warning
Não confie cegamente em "regra automatizada agressiva". Pausar criativo após 1 dia de dado ruim pode matar campanha boa em fase de aprendizado.
:::

## 8. Primeiros 30 dias — o que praticar

1. Subir 1 campanha de tráfego para conhecer painel.
2. Configurar [Pixel](/blog/instalar-pixel-meta-passo-a-passo) e validar Test Events.
3. Subir 1 campanha de conversão com orçamento pequeno.
4. Ler painel todo dia, 10 min.
5. Não mexer nas campanhas nos primeiros **3-4 dias** (fase de aprendizado).

> Quando começar a escalar, leia [como funciona o leilão](/blog/como-funciona-leilao-meta-ads) e [warm-up de conta](/blog/warm-up-conta-anuncio-meta-passo-a-passo).
`,
  },
  // ============ WAVE B — Operação (Meio de funil) ============
  {
    slug: "estrategia-3-camadas-bm-meta-ads-contingencia",
    title: "Estratégia de 3 camadas: principal, secundária e reserva para Meta Ads",
    description:
      "Como estruturar BM principal, secundária e reserva no Meta Ads para nunca parar de rodar — distribuição de gasto, sinal e perfis admin entre camadas.",
    keywords: ["estrategia 3 camadas bm", "bm principal secundaria", "contingencia meta ads", "estrutura bm escalada", "operacao multi bm"],
    category: "Meio de funil",
    readingTime: "9 min",
    publishedAt: "2026-05-19",
    ogImage: "/og/og-3-camadas-bm.jpg",
    ctaTitle: "Quer montar sua arquitetura de 3 camadas hoje?",
    ctaDescription: "A AD Scale entrega BM principal, secundária e reserva já configuradas com handover técnico, pronto para você plugar e rodar sem perder leilão.",
    ctaWhatsappMessage: "Olá! Vim do blog (estratégia 3 camadas) e quero montar minha arquitetura de contingência com BMs prontas.",
    ctaLabel: "Falar com especialista no WhatsApp",
    content: `
:::tldr
Operação séria roda **3 camadas em paralelo**: principal (80% do gasto), secundária (15%) e reserva (5% + warm-up contínuo). Quando a principal cai, a secundária já está aquecida e a reserva entra em até 1h. Sem isso, qualquer bloqueio para o faturamento por dias.
:::

Quem opera Meta Ads em volume sabe: bloqueio não é se, é quando. A diferença entre quem perde 7 dias de faturamento e quem perde 2 horas está na **arquitetura de camadas**.

## As 3 camadas

### Camada 1 — Principal (80% do gasto)
- BM verificada com mais histórico.
- Pixel + CAPI maduros (3-6 meses de evento Purchase).
- Cartão PJ principal com limite alto.
- 1-2 admin masters com 2FA físico.

### Camada 2 — Secundária (15% do gasto, sempre ativa)
- BM verificada **diferente da principal** (outro fornecedor, outro CNPJ idealmente).
- Roda 10-20% do gasto diariamente para manter sinal vivo.
- Pixel próprio (não compartilha com a 1).
- Mesmas campanhas-chave duplicadas em modo "espelho".

### Camada 3 — Reserva (5% gasto + warm-up)
- BM nova ou aged em fase de warm-up controlado ([guia](/blog/warm-up-conta-anuncio-meta-passo-a-passo)).
- Recebe 1 campanha de baixo risco rodando R$ 30-100/dia.
- Pronta para virar Camada 2 se a Camada 1 cair.

## Por que distribuir e não centralizar

| Risco | Conta única | 3 camadas |
|---|---|---|
| Bloqueio principal | Operação parada 3-7 dias | Secundária assume em 1h |
| Reset de aprendizado | Total | Limitado a 80% |
| Limite de gasto | Trava em horário de pico | Soma das 3 camadas |
| Recuperação | Único caminho de appeal | 3 caminhos paralelos |

[Quero montar isso na minha operação esta semana](wa:Vim%20do%20blog%20da%20AD%20Scale%20e%20quero%20montar%20a%20arquitetura%20de%203%20camadas%20%28principal%2Bsecund%C3%A1ria%2Breserva%29%20na%20minha%20operação.)

## Regras de ouro

:::callout type=warning
**Nunca** use o mesmo perfil admin nas 3 camadas. Se o admin cair, as 3 caem juntas. Um admin diferente por camada (todos com 2FA físico) preserva a redundância.
:::

- Cartões diferentes por camada (não use o mesmo BIN).
- IPs residenciais diferentes (anti-detect ou perfis separados).
- Criativos com pequenas variações em cada camada (evita detecção de duplicidade).
- Domínio verificado em todas — mesmo domínio pode estar em até 2 BMs como *partner*.

## Cronograma de rotação

Toda **2ª e 5ª feira**:
1. Auditoria rápida das 3 BMs ([checklist](/blog/checklist-auditoria-bm-facebook-18-itens)).
2. Aumentar 10% do gasto na secundária para manter Trust Score.
3. Subir 1 criativo novo na reserva.
4. Conferir Account Quality em todas.

> Esse nível de operação não é exagero — é o padrão de quem fatura 6-7 dígitos/mês com previsibilidade. Veja a [arquitetura completa de contingência](/blog/arquitetura-contingencia-meta-ads-operacao-alto-volume).
`,
  },
  {
    slug: "ip-residencial-vs-datacenter-meta-ads",
    title: "IP residencial vs datacenter no Meta Ads: qual usar e quando",
    description:
      "Diferença prática entre IP residencial, móvel e datacenter para operar BM no Meta Ads, quando cada um é seguro, e como configurar sem disparar revisão.",
    keywords: ["ip residencial meta ads", "ip datacenter facebook", "proxy bm meta", "ip movel meta", "fingerprint ip facebook"],
    category: "Meio de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-19",
    ogImage: "/og/og-ip-residencial-datacenter.jpg",
    ctaTitle: "Precisa de IP residencial + fingerprint estável?",
    ctaDescription: "Cada BM entregue pela AD Scale vem com configuração de IP residencial / móvel compatível com o histórico do ativo, para você não queimar o aquecimento no primeiro login.",
    ctaWhatsappMessage: "Olá! Vim do blog (IP residencial vs datacenter) e quero configurar IP + fingerprint na minha operação.",
    content: `
:::tldr
**IP residencial** é o padrão para acessar BM séria. **IP móvel** é o nível superior (mesmo nível dos usuários reais). **Datacenter** dispara revisão em horas. Mas o IP só funciona se for **estável, do mesmo país e combinado com fingerprint coerente**.
:::

Trocar de IP toda hora derruba operação tão rápido quanto trocar de senha toda hora. O Meta cruza IP, fingerprint, dispositivo e fuso — qualquer inconsistência alimenta o alerta de "atividade suspeita".

## Os 3 tipos de IP

| Tipo | Origem | Confiança Meta | Custo |
|---|---|---|---|
| Datacenter | AWS, Google, OVH | Baixíssima | Barato |
| Residencial | Provedor doméstico real | Alta | Médio |
| Móvel (4G/5G) | Operadora celular | Altíssima | Alto |

## Por que datacenter queima

ASNs de datacenter são públicos. O Meta tem listas dos principais (AWS, DigitalOcean, OVH, Hetzner). Acesso administrativo a BM verificada vindo dessas faixas = revisão automática.

:::callout type=warning
VPN comercial (NordVPN, ExpressVPN) **é datacenter**. Mesmo em "modo residencial", a maioria roda em IPs marcados. Não use para acessar BM verificada.
:::

## IP residencial — o que checar

1. **País** = país do CNPJ da BM.
2. **Estabilidade** — mesma faixa por meses, não rotaciona por sessão.
3. **ISP coerente** — Vivo Fibra, Claro Net, GVT etc. (não "Residential Proxy Network Inc").
4. **Sem histórico de spam** — checar em [https://www.spamhaus.org](https://www.spamhaus.org/lookup/).

## IP móvel — quando vale

- Acesso ao app do Business Suite no celular.
- Operações de nicho sensível.
- BMs que sofreram revisão recente e precisam de "reset" de confiança.

[Quero IP residencial + perfil aged configurados](wa:Vim%20do%20blog%20%28IP%20residencial%29%20e%20quero%20configurar%20IP%20%2B%20fingerprint%20coerentes%20na%20minha%20BM.)

## Combinação correta IP + Fingerprint

IP sozinho não basta. O Meta lê:

- User-agent (Chrome real, versão recente).
- Resolução de tela, fuso horário, idioma.
- Cookies persistentes da sessão.
- Padrão de navegação humano (movimento de mouse, intervalo entre cliques).

:::callout type=tip
Ferramentas como AdsPower, Multilogin ou Dolphin{anty} sincronizam fingerprint + IP. Combine **1 perfil = 1 IP residencial = 1 BM**. Não compartilhe IPs entre BMs.
:::

## Sinais de queima por IP errado

- Pedido de "Confirmar identidade" no primeiro login.
- 2FA disparado mesmo em dispositivo de confiança.
- Restrição súbita de funcionalidades (criar conta, pagamento).
- Account Quality despencando sem motivo aparente.

> Próximo passo: rever o [fingerprint e perfil administrador](/blog/fingerprint-ip-residencial-meta-ads).
`,
  },
  {
    slug: "anti-detect-browser-meta-ads-quando-usar",
    title: "Navegador anti-detect para Meta Ads: quando usar e como configurar",
    description:
      "Quando faz sentido usar AdsPower, Multilogin ou Dolphin Anty para operar Meta Ads, riscos de uso errado e o setup mínimo que protege a BM sem disparar revisão.",
    keywords: ["anti detect meta ads", "adspower facebook", "multilogin bm", "dolphin anty", "navegador anti deteccao"],
    category: "Meio de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-20",
    ogImage: "/og/og-anti-detect-browser.jpg",
    ctaTitle: "Quer setup de perfil + IP + anti-detect pronto?",
    ctaDescription: "Em vez de gastar semanas testando fingerprint, receba a BM já com perfil aged, IP residencial e configuração de browser compatível. Tudo entregue por WhatsApp em 1 dia útil.",
    ctaWhatsappMessage: "Olá! Vim do blog (anti-detect browser) e quero setup completo de perfil + IP + browser.",
    content: `
:::tldr
Anti-detect browser **não é truque**, é infraestrutura. Ele separa BMs sem cross-contamination de cookies, fingerprint e IP. Usado errado, é flag automático no Meta. Usado certo, sustenta operação multi-BM por meses.
:::

A pergunta certa não é "anti-detect é seguro?" mas "o que você está tentando evitar?". Quem opera 1 BM no notebook pessoal não precisa. Quem opera 3+ BMs em paralelo, sim — e precisa configurar como gente grande.

## Quando você precisa

- 2+ BMs no mesmo computador.
- Acesso compartilhado entre time/agência.
- Operação distribuída entre cidades/países.
- Histórico recente de bloqueio por "atividade suspeita".

## Quando não precisa

- 1 BM, 1 admin, 1 máquina dedicada, IP residencial estável.
- Operação inicial < R$ 5k/mês.

## Os principais players

| Ferramenta | Forte em | Preço típico |
|---|---|---|
| AdsPower | Custo-benefício, BR-friendly | US$ 5-50/mês |
| Multilogin | Stealth máximo | US$ 99-300/mês |
| Dolphin Anty | Times grandes, API | US$ 89-199/mês |
| GoLogin | Iniciante | US$ 24-99/mês |

## Setup mínimo seguro

1. **1 perfil = 1 BM = 1 IP residencial fixo**.
2. País do IP = país da BM.
3. Fuso, idioma e resolução = padrão do mercado-alvo (BR: GMT-3, pt-BR, 1920×1080).
4. User-agent Chrome **estável** (não trocar a cada login).
5. Cookies persistentes do perfil (não limpar entre sessões).
6. Login Meta + WhatsApp + e-mail recovery **dentro do mesmo perfil**.

[Quero meu setup configurado por especialista](wa:Vim%20do%20blog%20%28anti-detect%29%20e%20quero%20setup%20de%20perfil%20%2B%20IP%20%2B%20browser%20pronto%20para%20minha%20BM.)

## Erros que queimam tudo

:::callout type=warning
**Trocar IP por sessão** (rotating proxy) dentro de perfil anti-detect é um dos sinais mais fortes de operação suspeita. Use IP **sticky** (mesmo IP por dias).
:::

- Reusar fingerprint entre perfis.
- Login Meta + Google + e-mail em perfis diferentes.
- Mexer no fuso horário sem ajustar o IP no mesmo país.
- Acessar a mesma BM ora pelo anti-detect, ora pelo Chrome normal.

## Sinais de que está funcionando

- Login sem pedido de verificação adicional.
- Account Quality estável.
- Spending cap sobe nos prazos normais ([guia](/blog/limite-de-gasto-facebook-ads-como-aumentar)).
- Sem 2FA inesperado.

> Combine com a estratégia de [3 camadas de BM](/blog/estrategia-3-camadas-bm-meta-ads-contingencia) para cobertura total.
`,
  },
  {
    slug: "permissoes-equipe-bm-papeis-acesso-correto",
    title: "Permissões da BM: papéis, acessos e o erro que custou a conta de muito gestor",
    description:
      "Mapa completo dos papéis na Business Manager (admin, employee, finanças, analista), o que cada um pode fazer e como evitar perder a BM por dar acesso master a quem não devia.",
    keywords: ["permissoes bm", "papeis business manager", "acesso bm facebook", "admin bm", "remover acesso bm"],
    category: "Meio de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-20",
    ogImage: "/og/og-permissoes-bm.jpg",
    content: `
:::tldr
A BM tem **3 níveis** (Pessoas, Parceiros, Contas conectadas) e papéis específicos em cada um. **Dar admin master a freela ou agência é o erro #1** que faz dono perder a própria empresa em 24h. Use papéis mínimos + 2FA + auditoria semanal.
:::

A história se repete: dono contrata agência → dá admin master → agência sai → não tira → ou pior, agência tira o dono. Tudo previsível, tudo evitável com 5 minutos de configuração correta.

## Os 3 níveis de acesso

### 1. Pessoas (dentro da BM)
- **Admin master**: tudo, inclusive remover outros admins.
- **Employee**: opera contas e páginas, **não** muda configurações.

### 2. Parceiros (BMs externas)
- Você compartilha um ativo (página, pixel, conta) com outra BM.
- A BM parceira não vê seus outros ativos.

### 3. Acessos específicos por ativo
- **Conta de anúncio**: Gerente, Anunciante, Analista.
- **Página**: Admin, Editor, Moderador, Anunciante, Analista.
- **Pixel**: Admin, Analista.

## Matriz: quem precisa de quê

| Papel real | Conta anúncio | Página | Pixel | BM (Pessoas) |
|---|---|---|---|---|
| Dono | Gerente | Admin | Admin | **Admin master** |
| Gestor sênior | Gerente | Admin | Admin | Admin master |
| Analista de mídia | Anunciante | Anunciante | Analista | Employee |
| Designer | – | Editor | – | Employee |
| Agência externa | Gerente | Anunciante | Analista | **Parceiro** (não Pessoa) |
| Financeiro | Analista + Cobrança | – | – | Employee |

[Quero auditoria de acessos da minha BM esta semana](wa:Vim%20do%20blog%20%28permissões%20BM%29%20e%20quero%20auditoria%20de%20acessos%20agora.)

## Regras de ouro

1. **Toda agência entra como Parceiro**, nunca como Pessoa.
2. **2 admins masters, no mínimo** (single point of failure).
3. **2FA obrigatório** em todos os admins ([guia](/blog/autenticacao-2-fatores-conta-facebook-ads)).
4. E-mails admin **corporativos** (não @gmail pessoal).
5. Auditoria mensal: quem ainda está aqui?

:::callout type=warning
**Nunca** dê admin master a freela "por praticidade". Ele pode te remover, mudar e-mail de recovery e te trancar fora da sua própria BM em 5 minutos.
:::

## Saídas seguras

Quando alguém sai do time:

1. Remover do Pessoas **imediatamente**.
2. Remover do 2FA backup (se compartilharam códigos).
3. Trocar senhas de contas de e-mail corporativo.
4. Revisar logs em **Atividade comercial** nos últimos 30 dias.
5. Se era admin master, **mudar o e-mail de recuperação da BM**.

## Quando o problema já aconteceu

- Você ainda tem admin master? Remova o invasor.
- Não tem mais? Use **Account Recovery** com documento + comprovante de domínio.
- Sem domínio verificado? O appeal fica pesado — peça ajuda profissional.

> Faça também o [checklist completo de auditoria](/blog/checklist-auditoria-bm-facebook-18-itens).
`,
  },
  {
    slug: "configurar-capi-conversions-api-server-side",
    title: "Como configurar CAPI (Conversions API) server-side em 2026",
    description:
      "Tutorial prático para subir Conversions API server-side conectada ao Pixel, com deduplicação correta, eventos avançados e validação no Events Manager.",
    keywords: ["configurar capi", "conversions api server side", "capi meta", "deduplicacao pixel capi", "events manager capi"],
    category: "Meio de funil",
    readingTime: "10 min",
    publishedAt: "2026-05-21",
    ogImage: "/og/og-capi-server-side.jpg",
    ctaTitle: "Sem time técnico para subir CAPI?",
    ctaDescription: "A AD Scale entrega CAPI configurada e deduplicada com a sua BM verificada, em até 48h. Você só pluga a URL do servidor e segue rodando.",
    ctaWhatsappMessage: "Olá! Vim do blog (CAPI server-side) e quero configurar Conversions API na minha operação.",
    content: `
:::tldr
CAPI server-side **recupera 30-40% dos eventos** perdidos por bloqueador, iOS e ITP. Mas só funciona com **deduplicação correta** (event_id + event_name + event_time idênticos entre Pixel e CAPI). Errar dedup = inflação de conversão e ruído no algoritmo.
:::

Pixel sozinho em 2026 é instalar metade do sensor. Subir CAPI server-side é o que separa operação amadora de operação que escala mantendo ROAS.

## Por que CAPI server-side

| Fonte | Perde para... | Recupera com CAPI |
|---|---|---|
| Bloqueador (uBlock, Brave) | ~15% | Sim |
| iOS 14+ App Tracking | ~20% | Parcial |
| Safari ITP | ~10% | Sim |
| Conexão instável | ~5% | Sim |

## Pré-requisitos

- BM verificada com pixel/dataset ativo.
- Domínio verificado em **Segurança da marca**.
- Servidor capaz de POST HTTPS (Node, PHP, Edge function, etc.).
- Access token de longa duração gerado no Events Manager.

## Passo a passo

### 1. Gerar Access Token
\`Events Manager → seu dataset → Configurações → Gerar token de acesso\`. Guarde no servidor (variável de ambiente, **nunca** no frontend).

### 2. Endpoint do Meta
\`POST https://graph.facebook.com/v19.0/{dataset_id}/events?access_token={TOKEN}\`

### 3. Payload mínimo (Purchase)
\`\`\`json
{
  "data": [{
    "event_name": "Purchase",
    "event_time": 1716156000,
    "event_id": "ord_abc123",
    "action_source": "website",
    "event_source_url": "https://loja.com/obrigado",
    "user_data": {
      "em": ["sha256_email"],
      "ph": ["sha256_telefone"],
      "client_ip_address": "189.x.x.x",
      "client_user_agent": "Mozilla/5.0..."
    },
    "custom_data": {
      "value": 349.90,
      "currency": "BRL",
      "content_ids": ["sku-1234"]
    }
  }]
}
\`\`\`

### 4. Deduplicação correta
- O **mesmo \`event_id\`** deve sair do Pixel **e** do CAPI para o mesmo evento.
- \`event_name\` e \`event_time\` idênticos.
- O Meta junta os dois e conta como 1.

[Quero CAPI configurada e deduplicada na minha BM](wa:Vim%20do%20blog%20%28CAPI%20server-side%29%20e%20quero%20Conversions%20API%20configurada%20e%20deduplicada.)

### 5. Hash dos dados pessoais
- Sempre SHA-256.
- Lowercase + trim antes do hash.
- E-mail: \`crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex")\`.

### 6. Validação no Events Manager
- \`Test Events\` → cole o test code → dispara evento → confirma recebido.
- \`Visão geral → Diagnostics\` mostra match quality (>7 = bom, >8.5 = excelente).

:::callout type=warning
Não enviar IP + user_agent reduz match quality drasticamente. E sem match quality bom, o algoritmo otimiza pior — você paga CAPI sem colher ROI.
:::

## Eventos prioritários

| Evento | event_id sugerido | Quando enviar |
|---|---|---|
| PageView | uuid por carregamento | Toda navegação |
| ViewContent | content_id + uuid | Página de produto |
| Lead | lead_id do CRM | Form enviado |
| InitiateCheckout | cart_id | Início checkout |
| AddPaymentInfo | cart_id | Cartão preenchido |
| **Purchase** | **order_id** | **Pagamento aprovado** |

## Erros comuns

- Hash em UPPERCASE → quebra match.
- \`event_time\` em milissegundos (Meta espera segundos).
- Enviar CAPI sem Pixel correspondente → conversões duplicadas.
- Esquecer \`fbp\` e \`fbc\` (cookies do navegador) no \`user_data\`.

> Próximo nível: integrar CAPI com [migração de pixel sem perder aprendizado](/blog/migrar-pixel-bm-sem-perder-aprendizado).
`,
  },
  {
    slug: "diagnostico-performance-queda-meta-ads-checklist",
    title: "Performance caiu no Meta Ads: checklist de diagnóstico em 12 pontos",
    description:
      "Roteiro prático para diagnosticar queda de performance no Meta Ads sem chutar — do criativo ao pixel, do leilão à fadiga da audiência, em 12 pontos.",
    keywords: ["queda performance meta ads", "diagnostico meta ads", "cpm subiu", "roas caiu meta", "checklist performance facebook"],
    category: "Meio de funil",
    readingTime: "9 min",
    publishedAt: "2026-05-21",
    ogImage: "/og/og-diagnostico-performance.jpg",
    ctaTitle: "Queda forte agora? Em 15 min a gente acha o gargalo",
    ctaDescription: "Mande seus prints do Ads Manager e faremos diagnóstico ao vivo no WhatsApp, apontando os 3 pontos de maior impacto para reverter a queda esta semana.",
    ctaWhatsappMessage: "Olá! Minha performance no Meta Ads caiu. Vim do blog e quero o diagnóstico em 15 min.",
    ctaLabel: "Pedir diagnóstico de emergência",
    content: `
:::tldr
Antes de duplicar campanha ou jogar mais dinheiro, rode este checklist de **12 pontos** — criativo, pixel, audiência, conta, leilão, sazonalidade. Em 80% dos casos o gargalo está em **2 ou 3** desses pontos, não no orçamento.
:::

Performance caiu. A pior decisão é mexer em tudo ao mesmo tempo. Este é o roteiro que aplico antes de qualquer ajuste estrutural.

## Os 12 pontos

### Criativo (1-3)
1. **Frequência > 3** em conjunto principal? Renovar.
2. **Hook rate < 25%** no vídeo principal? Refazer 3 primeiros segundos.
3. **CTR caindo dia a dia há 5+ dias**? Criativo saturado.

### Pixel/CAPI (4-5)
4. **Match quality < 6** no Events Manager? Subir dados (email, telefone, IP, UA).
5. **Eventos Purchase oscilando** vs Stripe/checkout real? Pixel duplicado ou CAPI com dedup errada ([guia](/blog/configurar-capi-conversions-api-server-side)).

### Audiência (6-7)
6. **Saturação**: gasto acumulado > 30% do tamanho da audiência? Expandir.
7. **Sobreposição** entre conjuntos > 30%? Consolidar.

### Conta (8-9)
8. **[Account Quality](/blog/qualidade-conta-anuncio-meta-como-medir)** com warning novo? Tratar antes de tudo.
9. **Spending limit** chegou perto do teto e bateu freio? Solicitar aumento ([guia](/blog/limite-de-gasto-facebook-ads-como-aumentar)).

### Leilão (10-11)
10. **CPM subiu sem CTR cair**? Concorrência aumentou — concorrente lançou, é sazonalidade ou eleição.
11. **CPM subiu COM CTR caindo**? Trust Score caindo. Auditoria urgente.

### Operacional (12)
12. **Trocas recentes**: novo pixel, novo cartão, mudança de admin, migração de conta? Reverter ou estabilizar antes de otimizar.

[Quero diagnóstico ao vivo no meu painel](wa:Vim%20do%20blog%20%28queda%20de%20performance%29%20e%20quero%20diagn%C3%B3stico%20ao%20vivo%20no%20meu%20Ads%20Manager.)

## Ordem de prioridade na correção

:::callout type=tip
Resolva **conta antes de criativo**, **criativo antes de audiência**, **audiência antes de orçamento**. Mexer em orçamento sem corrigir o resto só amplifica o problema.
:::

## Quando é o algoritmo passando por update

- Queda generalizada no mercado (concorrentes reclamando junto).
- Início de mês (reset de delivery).
- Black Friday, eleição, Copa, Natal.

Nesse caso: segure ajustes, mantenha gasto, espere 5-7 dias antes de declarar problema.

## Quando é a conta

- Você é o único caindo no nicho.
- Notificações recentes no Account Quality.
- Mudanças operacionais recentes.
- Outras contas suas estão bem.

→ Trate como questão de conta: [recuperar performance via warm-up](/blog/warm-up-conta-anuncio-meta-passo-a-passo) ou ativar [BM secundária](/blog/estrategia-3-camadas-bm-meta-ads-contingencia).

## Plano de ação 48h

1. Pause campanhas com CPA > 1.5x meta.
2. Renove 2-3 criativos com hook novo.
3. Verifique pixel/CAPI no Events Manager.
4. Audite Account Quality.
5. Não toque em orçamento por 72h.
6. Mensure no dia 4.

> Se a queda persistir 7+ dias, é hora de considerar [migrar para BM secundária](/blog/estrategia-3-camadas-bm-meta-ads-contingencia).
`,
  },
  {
    slug: "auditoria-30-minutos-conta-anuncio-meta",
    title: "Auditoria de 30 minutos na conta de anúncio do Meta: o que olhar",
    description:
      "Roteiro de auditoria semanal/mensal para conta de anúncio Meta: estrutura, criativos, pixel, audiências, Account Quality, billing e segurança em 30 minutos.",
    keywords: ["auditoria conta meta ads", "auditoria facebook ads", "checklist semanal meta", "diagnostico conta ads", "rotina auditoria meta"],
    category: "Meio de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-22",
    ogImage: "/og/og-auditoria-30min.jpg",
    ctaTitle: "Quer auditoria feita por especialista esta semana?",
    ctaDescription: "Mandamos o relatório em PDF + call de 30 min mostrando os 5 ajustes de maior impacto. Sem custo na primeira auditoria.",
    ctaWhatsappMessage: "Olá! Quero auditoria de 30 min na minha conta de Meta Ads (vim do blog).",
    content: `
:::tldr
Reserve **30 minutos toda 6ª feira**: 5 min em conta, 5 em pixel, 5 em criativos, 5 em audiências, 5 em billing, 5 em segurança. Quem faz audit semanal **previne 80% dos bloqueios** que pegam o resto do mercado de surpresa.
:::

Audit não é luxo de agência grande. É a diferença entre operação que vive 3 anos e operação que vive 3 meses.

## Os 6 blocos (5 min cada)

### Bloco 1 — Conta
- Status: ativa, em revisão ou restrita?
- Saldo + cartão funcionando?
- Limite de gasto vs gasto da semana.
- Notificações novas no Business Suite.

### Bloco 2 — Pixel / CAPI
- Events Manager → últimos 7 dias, eventos chegando?
- Match quality > 7?
- Discrepância Pixel vs CAPI < 10%?
- Test Events validados.

### Bloco 3 — Criativos
- Top 3 anúncios: hook rate, CTR, frequência.
- Algum em frequência > 3 e CTR caindo? Pausar/renovar.
- Algum com reprovação recente? Investigar política.

### Bloco 4 — Audiências
- Lookalikes atualizadas (< 30 dias)?
- Públicos de retargeting com volume mínimo (1k+)?
- Sobreposição entre conjuntos abaixo de 30%.

### Bloco 5 — Billing
- Fatura paga sem atraso?
- Método principal + backup ativos?
- Cobrança em moeda esperada (BRL ou USD).

### Bloco 6 — Segurança
- [Account Quality](/blog/qualidade-conta-anuncio-meta-como-medir): 0 warnings?
- 2FA ativo em todos os admins?
- Lista de Pessoas / Parceiros: quem ainda deveria estar?
- Logs de login: nada estranho?

[Quero a primeira auditoria sem custo](wa:Vim%20do%20blog%20%28auditoria%2030%20min%29%20e%20quero%20auditoria%20da%20minha%20conta.)

## Template de relatório

\`\`\`text
[ Auditoria - Semana DD/MM ]
Conta: ATIVA  Saldo: OK  Notificações: 0
Pixel: match 8.2  CAPI: -8% vs Pixel  Test: OK
Criativos: 2 saturados (renovar)
Audiências: LAL 1% expirada (atualizar)
Billing: cartão principal OK, backup OK
Segurança: 0 warning, 2FA OK, 5 pessoas (ok)

Ações da semana:
1. Renovar criativo vídeo01 e img03
2. Atualizar LAL compra 1%
3. Aumentar 10% gasto camada secundária
\`\`\`

## Sinais de alerta amarelos (priorizar próxima auditoria)

:::callout type=warning
- Match quality caindo 3 semanas seguidas.
- Frequência média subindo + CTR caindo.
- CPM 30% acima da média do trimestre.
- Notificação nova no Account Quality.
- Login de IP novo sem motivo.
:::

## Quando virar auditoria de emergência

- Conta restrita.
- Pixel parou de receber.
- CAPI parou de subir match.
- 2 ou mais criativos reprovados no mesmo dia.

> Audit semanal + [estratégia de 3 camadas](/blog/estrategia-3-camadas-bm-meta-ads-contingencia) = previsibilidade real.
`,
  },
  {
    slug: "migrar-pixel-bm-sem-perder-aprendizado",
    title: "Como migrar Pixel para outra BM sem perder aprendizado",
    description:
      "Roteiro técnico para migrar pixel/dataset entre BMs preservando histórico de eventos, audiências, otimização e match quality. Riscos, plano B e checklist.",
    keywords: ["migrar pixel bm", "transferir pixel meta", "pixel nova bm", "perder aprendizado pixel", "migracao dataset meta"],
    category: "Meio de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-22",
    ogImage: "/og/og-migrar-pixel.jpg",
    ctaTitle: "Vai migrar pixel? Faça acompanhado",
    ctaDescription: "Migrar pixel sem plano é jogar 6 meses de aprendizado fora. A AD Scale faz a migração com você no WhatsApp, validando cada passo em tempo real.",
    ctaWhatsappMessage: "Olá! Vim do blog e quero migrar meu pixel para outra BM sem perder aprendizado.",
    content: `
:::tldr
Pixel **não migra de verdade** — só muda de dono. O histórico de eventos fica, mas **públicos baseados em pixel precisam ser recriados na nova BM**. Migração mal feita reseta otimização e queima 2-4 semanas de performance.
:::

Muita gente "migra pixel" sem entender que está abrindo mão de audiências, lookalikes e parte do aprendizado de campanha. Se for fazer, faça com plano.

## Quando migrar de verdade

- BM antiga vai ser desativada / bloqueada.
- Mudança societária / CNPJ.
- Consolidação de operações (3 BMs viram 1).

## Quando NÃO migrar

- "Achei que a outra BM é melhor" — use **Partner Access** em vez de transferir.
- BM nova ainda não verificada.
- Sem plano B se algo der errado.

## O que se preserva

| Item | Migra | Observação |
|---|---|---|
| ID do pixel | Sim | Mesmo ID, novo dono |
| Histórico de eventos | Sim | Janela 180 dias |
| Domínio verificado | Não direto | Reverificar na nova BM |
| Públicos baseados em pixel | **Não** | Recriar na nova BM |
| Lookalikes | **Não** | Recriar do zero |
| CAPI (token) | Não | Gerar novo |
| Aprendizado de campanha | Reset parcial | 1-2 semanas |

[Quero migrar com acompanhamento técnico](wa:Vim%20do%20blog%20%28migrar%20pixel%29%20e%20quero%20fazer%20a%20migra%C3%A7%C3%A3o%20acompanhado%20por%20especialista.)

## Passo a passo seguro

### Fase 1 — Preparar (3 dias antes)
1. Print da estrutura atual (campanhas, audiências, públicos).
2. Exportar listas customizadas baseadas em pixel.
3. Conferir que domínio verificado está documentado (DNS records).
4. Decidir BM destino (deve ser **verificada** e estável).

### Fase 2 — Migrar
1. Em BM origem: \`Configurações → Pixels → Compartilhar → Transferir propriedade\`.
2. Aceitar em BM destino.
3. **Reverificar domínio** na nova BM (subir novo token DNS ou Meta tag).
4. Gerar novo Access Token CAPI ([guia](/blog/configurar-capi-conversions-api-server-side)).
5. Atualizar variável de ambiente no servidor.

### Fase 3 — Reconstruir
1. Recriar audiências baseadas em eventos (Compradores 30d, Carrinho 14d).
2. Recriar lookalikes a partir dessas audiências (precisam de 24-48h para encherem).
3. Subir campanhas espelho na nova BM com orçamento **30% do total** nos primeiros 7 dias.

:::callout type=warning
**Não pause campanha antiga no dia 1.** Rode 7-14 dias em paralelo enquanto a nova "aprende". Cortar abrupto é o erro que custa as 2-4 semanas perdidas.
:::

## Plano B

Se a nova BM travar logo após migração:

- Mantenha a antiga rodando (não perdeu posse de outras coisas — só o pixel).
- Migre de volta se ainda estiver na janela de 14 dias.
- Suba CAPI server-side enquanto isso (recupera parte do sinal).

## Sinais de migração saudável (dia 7-14)

- Match quality recupera para níveis prévios.
- CPA dentro de +20% da linha de base.
- Sem queda em Account Quality.
- Spending limit estável.

> Antes de migrar, considere se **acesso de parceiro** ([Pessoas e Parceiros](/blog/permissoes-equipe-bm-papeis-acesso-correto)) resolve sem mexer em posse.
`,
  },
  {
    slug: "estrutura-campanha-cbo-abo-quando-usar",
    title: "CBO vs ABO no Meta Ads: quando usar cada um (2026)",
    description:
      "Diferença prática entre Campaign Budget Optimization (CBO) e Ad Set Budget Optimization (ABO), quando cada um performa melhor e como combinar os dois numa estrutura escalável.",
    keywords: ["cbo abo meta ads", "campaign budget optimization", "advantage campaign budget", "estrutura campanha facebook", "orçamento campanha vs conjunto"],
    category: "Meio de funil",
    readingTime: "7 min",
    publishedAt: "2026-05-23",
    ogImage: "/og/og-cbo-abo.jpg",
    content: `
:::tldr
**CBO (Advantage Campaign Budget)** entrega melhor em escala (3+ conjuntos, audiência ampla). **ABO** ganha em **teste de audiência/criativo** (quer dado por conjunto). Operação madura combina: ABO para descobrir, CBO para escalar.
:::

A briga "CBO vs ABO" é antiga e mal colocada. Os dois servem para coisas diferentes — quem entende isso testa mais rápido e escala mais barato.

## Definição rápida

- **ABO**: orçamento definido **por conjunto de anúncio** (Ad Set).
- **CBO**: orçamento definido **na campanha**, Meta distribui entre conjuntos.

## Quando CBO vence

- Campanha com 3+ conjuntos rodando o mesmo objetivo.
- Audiências amplas (advantage+, lookalikes 5-10%).
- Volume de conversão alto (>50 conversões/conjunto/semana).
- Foco em escalar gasto sem microajuste.

## Quando ABO vence

- Teste de público (quer saber qual conjunto bate melhor).
- Teste de criativo isolado (1 conjunto = 1 criativo).
- Budget pequeno (<R$ 200/dia total).
- Nichos com curva de aprendizado longa.

## Estrutura híbrida (avançada)

\`\`\`text
[CAMPANHA] Vendas - Aquisição CBO  → R$ 2.000/dia
  ├─ Conjunto A: LAL 1% compradores
  ├─ Conjunto B: LAL 2-5% compradores
  └─ Conjunto C: Advantage+ Audience

[CAMPANHA] Testes - Criativos ABO  → R$ 50/dia por conjunto
  ├─ Conjunto T1: criativo novo 01
  ├─ Conjunto T2: criativo novo 02
  └─ Conjunto T3: criativo novo 03
\`\`\`

Vencedor do ABO entra no CBO de escala. Padrão de operação madura.

[Quero estrutura híbrida desenhada para minha conta](wa:Vim%20do%20blog%20%28CBO%20vs%20ABO%29%20e%20quero%20estrutura%20h%C3%ADbrida%20desenhada%20para%20minha%20conta.)

## Regras de ouro

:::callout type=tip
No CBO, **não fixe spend cap por conjunto**. Isso quebra a lógica do algoritmo de distribuir. Se precisa garantir mínimo num conjunto específico, use ABO ou crie campanha CBO separada.
:::

- Não duplique conjunto vencedor para "dar mais" — o Meta já distribui no CBO.
- Em ABO, mantenha orçamento estável 5-7 dias antes de julgar.
- Em CBO, espere 3 dias após qualquer alteração de >20% no orçamento.
- Não misture objetivos diferentes na mesma campanha CBO.

## Métricas para comparar

| Métrica | CBO | ABO |
|---|---|---|
| Velocidade de aprendizado | Alta | Média |
| Granularidade de dado | Baixa | Alta |
| Risco de algoritmo "favorecer um errado" | Médio | Baixo |
| Esforço operacional | Baixo | Alto |

## Quando voltar ao ABO depois de só CBO

- Suspeita que algoritmo está alocando mal entre conjuntos.
- Quer reduzir gasto em segmento específico.
- Testando hipótese nova de público.

> Combine com [Account Quality saudável](/blog/qualidade-conta-anuncio-meta-como-medir) e [pixel/CAPI maduros](/blog/configurar-capi-conversions-api-server-side) — sem isso, qualquer estrutura performa mal.
`,
  },
  {
    slug: "spending-limit-meta-como-subir-degraus",
    title: "Subir Spending Limit do Meta Ads em degraus: cronograma de 30 dias",
    description:
      "Cronograma prático de 30 dias para subir o limite de gasto da conta sem disparar revisão: do dia 1 ao dia 30, com valores, sinais e pontos de checagem.",
    keywords: ["aumentar spending limit", "limite gasto meta ads", "subir limite conta facebook", "warm up gasto", "spending cap meta"],
    category: "Meio de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-23",
    ogImage: "/og/og-spending-limit.jpg",
    ctaTitle: "Já tem urgência de subir gasto e não dá pra esperar 30 dias?",
    ctaDescription: "Receba uma BM verificada com limite alto desde o dia 1, evitando todo o cronograma de warm-up. Entrega e handover técnico em até 24h.",
    ctaWhatsappMessage: "Olá! Vim do blog (spending limit) e quero BM com limite alto já no dia 1.",
    content: `
:::tldr
O Meta sobe limite **em degraus**, observando consistência. Cronograma seguro: começa em R$ 100/dia, dobra a cada 3-5 dias enquanto métricas estão saudáveis. Em 30 dias bem feitos, conta nova chega tranquilamente em R$ 5-10k/dia.
:::

Aumentar gasto não é "apertar +30% no orçamento". É construir histórico que o algoritmo entende como negócio real crescendo.

## Cronograma de 30 dias

| Dia | Gasto/dia | Foco |
|---|---|---|
| 1-3 | R$ 100 | Tráfego ou engajamento, criativo limpo |
| 4-7 | R$ 200 | Primeira conversão otimizada (Lead barato) |
| 8-12 | R$ 400 | Subir Purchase, monitorar Account Quality |
| 13-17 | R$ 800 | Lookalike 1%, expansão de audiência |
| 18-22 | R$ 1.500 | 2-3 criativos rodando, dedup CAPI ok |
| 23-30 | R$ 3-10k | Escala via CBO, novos públicos |

[Não quero esperar 30 dias — quero BM pronta com limite alto](wa:Vim%20do%20blog%20%28spending%20limit%29%20e%20quero%20BM%20verificada%20com%20limite%20alto%20no%20dia%201.)

## Regras durante o warm-up

### Pagamento
- Cartão PJ no CNPJ da BM.
- Pré-pagar saldo antes de subir degrau.
- Não trocar de cartão durante o cronograma.

### Criativo
- Começar com criativo limpo, sem palavra forte.
- Não usar nicho sensível nos primeiros 7 dias.
- Renovar criativo a cada 5-7 dias para evitar fadiga.

### Audiência
- Começar amplo (advantage+), não micro-segmentar.
- Lookalike só a partir do dia 13 (quando já tem evento de conversão).

### Pixel
- Subir Pixel + CAPI desde dia 1.
- Match quality >7 antes de dobrar o gasto.

## Sinais para **pausar** o aumento

:::callout type=warning
- CPA fugindo +50% da meta.
- Account Quality com warning novo.
- Spending cap não acompanha (Meta limitou).
- Cartão recusou cobrança alguma vez.
- Frequência > 3 nas audiências principais.

Se qualquer um aparecer, **mantenha o gasto atual por 5 dias** antes de subir de novo.
:::

## Quando o Meta libera "Sem limite"

Geralmente após:
- 90+ dias de gasto consistente.
- CNPJ + domínio verificados.
- Match quality estável >8.
- 0 violações nos últimos 60 dias.

Não há botão — Meta faz automaticamente. Para escala 6-7 dígitos/mês, mantenha pelo menos **1 BM já com limite removido** ([guia](/blog/tipos-de-bm-meta-nova-antiga-verificada-ilimitada)).

## Erros que resetam o warm-up

- Saltos de >100% num único dia.
- Trocar objetivo de campanha durante warm-up.
- Pausar tudo por 3+ dias e voltar.
- Mudar admin master no meio.
- Migrar pixel ([guia](/blog/migrar-pixel-bm-sem-perder-aprendizado)) sem plano.

> Para tese de operação que não pode esperar 30 dias, use [BM secundária pronta](/blog/estrategia-3-camadas-bm-meta-ads-contingencia) como ponte.
`,
  },
  {
    slug: "recuperar-pagina-facebook-restrita-passo-a-passo",
    title: "Recuperar página do Facebook restrita: passo a passo de appeal",
    description:
      "Por que páginas são restritas, como ler o motivo correto, como escrever o appeal certo e o que fazer quando o appeal é negado uma, duas ou três vezes.",
    keywords: ["recuperar pagina facebook", "pagina restrita facebook", "appeal pagina facebook", "pagina bloqueada", "fan page restrita"],
    category: "Meio de funil",
    readingTime: "8 min",
    publishedAt: "2026-05-24",
    ogImage: "/og/og-recuperar-pagina.jpg",
    ctaTitle: "Página caiu e parou seu Meta Ads?",
    ctaDescription: "Mande o print da restrição no WhatsApp e analisamos seu caso em 15 min, indicando se vale appeal próprio, appeal especializado ou troca de página antiga.",
    ctaWhatsappMessage: "Olá! Minha página do Facebook foi restrita e preciso recuperar (vim do blog).",
    ctaLabel: "Enviar caso para análise",
    content: `
:::tldr
Página restrita = anúncios param. O caminho é: **ler o motivo exato → appeal escrito com prova → aguardar 24-72h → se negado, escalar via Business Help**. Em ~40% dos casos o appeal funciona; nos demais, página nova + estratégia de plano B.
:::

Quando a página cai, o desespero faz a maioria postar 5 appeals em sequência. Isso piora. O Meta lê reincidência como confirmação de problema.

## Tipos de restrição

| Status | O que significa | Recuperável? |
|---|---|---|
| Aviso (warning) | Política violada, sem restrição operacional ainda | Sim |
| Restrição parcial | Pode postar, **não pode anunciar** | Sim (appeal) |
| Restrição total | Não posta, não anuncia | Difícil |
| Removida | Página apagada | Quase nunca |

## Passo a passo do appeal

### 1. Identificar a restrição
\`Página → Qualidade da página → Restrições\`. Anote:
- Política exata violada.
- Data e post/anúncio específico (se citado).
- Status atual e prazo de revisão.

### 2. Coletar prova de legitimidade
- CNPJ ativo no nome da página.
- Comprovante de endereço comercial.
- Domínio verificado vinculado.
- Histórico de gasto / posts orgânicos.

### 3. Escrever o appeal certo

Estrutura ideal (em até 1000 caracteres):

\`\`\`text
Sou [nome], responsável pela página [nome]. 
A página representa a empresa [CNPJ], que opera no segmento 
[descrição]. Identifiquei a restrição relacionada a [motivo]. 
Acredito ter havido um erro de classificação porque [argumento 
específico, 2-3 frases]. Em anexo: CNPJ ativo, comprovante de 
endereço e domínio verificado. Estou à disposição para qualquer 
verificação adicional.
\`\`\`

[Quero ajuda para escrever o appeal certo](wa:Vim%20do%20blog%20%28recuperar%20p%C3%A1gina%29%20e%20quero%20ajuda%20para%20escrever%20o%20appeal%20certo.)

### 4. Aguardar 24-72h
- Não envie segundo appeal antes da resposta.
- Não poste conteúdo polêmico nesse intervalo.
- Não troque admin no meio.

### 5. Se negado: escalar

- **Business Help**: \`Suporte → Falar com um especialista → Chat\` (disponível em BMs verificadas).
- Anexar **novos** documentos, não repetir os mesmos.
- Tom profissional, sem urgência emocional.

### 6. Após 3 negações
- Apelar via **WhatsApp Business** se a página estiver vinculada à WABA.
- Considerar página nova com **histórico orgânico de 60+ dias** antes de voltar a anunciar.

## O que NUNCA fazer

:::callout type=warning
- Comentar nos posts do Meta pedindo recuperação.
- Pedir ajuda em grupos públicos com print da BM (vira target).
- Pagar "consultor que recupera 100% garantido em 24h" — golpe.
- Criar página clone com o mesmo nome (suspende as duas).
:::

## Plano B paralelo

Enquanto o appeal corre:

1. Mover anúncios para **página secundária** vinculada à BM ([estrutura](/blog/permissoes-equipe-bm-papeis-acesso-correto)).
2. Subir 1 conjunto com **gasto baixo** na página B para manter sinal.
3. Não pausar tudo — gasto zero por 7 dias derruba a BM inteira.

## Prevenção

- Página com 2 admins masters.
- Posts orgânicos semanais (algoritmo lê como conta viva).
- Resposta a mensagens em <24h (CSAT da página).
- Reviews respondidos.
- Evitar tags em ondas (engagement bait).

> Tem operação em nicho sensível? Mantenha sempre **2 páginas antigas** prontas ([guia de páginas antigas](/blog/pagina-antiga-facebook-impacto-na-performance)).
`,
  },
  {
    slug: "saude-perfil-administrador-bm-rotina-semanal",
    title: "Saúde do perfil administrador da BM: rotina semanal de 10 minutos",
    description:
      "Como manter o perfil administrador da Business Manager saudável: login consistente, atividade orgânica, 2FA, dispositivos confiáveis e checklist semanal de 10 min.",
    keywords: ["perfil administrador bm", "saude perfil facebook", "rotina perfil bm", "perfil admin nao bloquear", "perfil aged manutencao"],
    category: "Meio de funil",
    readingTime: "6 min",
    publishedAt: "2026-05-24",
    ogImage: "/og/og-saude-perfil-admin.jpg",
    content: `
:::tldr
Perfil admin é o ponto fraco mais ignorado. Se ele cair, **toda a BM cai junto**. Rotina semanal de 10 min: login consistente, 1-2 ações orgânicas, conferência de 2FA e dispositivos, log de atividade. Quem faz, dorme tranquilo.
:::

A maioria das BMs que somem foi por causa do perfil admin — não da BM em si. Tratar o perfil como ativo crítico muda o jogo.

## Rotina semanal (10 min)

### Login (2 min)
- Entrar **toda semana** pelo mesmo dispositivo + IP.
- Não ficar 14+ dias sem login (gatilha verificação).
- Abrir Feed e rolar 1 min — comportamento humano.

### Atividade orgânica (3 min)
- Curtir 2-3 posts de amigos/páginas seguidas.
- Comentar algo curto e real em 1 post.
- Reagir a 1 Story.

### Segurança (3 min)
- \`Configurações → Senha e segurança → Onde você está conectado\`.
- Remover sessões antigas e desconhecidas.
- Confirmar dispositivos confiáveis (2-3, não 15).
- 2FA ativo? App autenticador sincronizado?

### Verificação rápida (2 min)
- E-mail e telefone de recuperação corretos.
- Nenhuma notificação de "ação requerida".
- Account Status do perfil = normal.

[Quero perfil aged já configurado e monitorado](wa:Vim%20do%20blog%20%28sa%C3%BAde%20do%20perfil%29%20e%20quero%20perfil%20admin%20aged%20j%C3%A1%20configurado.)

## O que **derruba** perfil admin

:::callout type=warning
- Login de país diferente sem viagem registrada.
- Trocar dispositivo + IP no mesmo dia.
- Adicionar muitos amigos novos de uma vez.
- Entrar em vários grupos numa só sessão.
- Compartilhar conteúdo polêmico ou denunciado.
- Comentar em massa (parece bot).
- Sair do Facebook por 30+ dias.
:::

## Sinais amarelos

- Pedido inesperado de "Confirmar identidade".
- 2FA pedido em dispositivo confiável.
- Captcha em ações simples (curtir, comentar).
- Mensagens demorando para enviar.

→ Pause aumentos de gasto na BM, monitore por 7 dias antes de qualquer mudança grande.

## Sinais vermelhos (ação imediata)

- Perfil em revisão.
- Bloqueio temporário de envio.
- Restrição de criar anúncios.
- Notificação "atividade incomum".

→ **Pare logins novos**, transfira admin master para perfil saudável já cadastrado, abra appeal.

## Estratégia de redundância

- **2 admins master** na BM, em perfis diferentes (cidades/IPs diferentes).
- Cada perfil opera **uma BM principal** — não centralize tudo em 1 perfil só.
- Cadastre **e-mail de recuperação corporativo** em ambos.

## Quando trocar de perfil admin

- Após bloqueio do perfil principal.
- Quando admin sai da empresa.
- Em migração de operação (CNPJ novo, mudança societária).

Faça com sobreposição: novo admin entra → 14 dias de operação juntos → antigo sai. Nunca de uma vez.

> Veja também [permissões corretas da BM](/blog/permissoes-equipe-bm-papeis-acesso-correto) e [tipos de perfil aged](/blog/perfil-aged-facebook-por-que-administrador-importa).
`,
  },
  {
    slug: "dia-do-bloqueio-runbook-emergencia-meta-ads",
    title: "Dia do bloqueio: runbook de emergência para BM ou conta do Meta",
    description:
      "Runbook minuto a minuto para o dia em que sua BM ou conta de anúncio é bloqueada: primeiras 2h, 24h, 72h e 7 dias. Decisão entre appeal e BM reserva.",
    keywords: ["bm bloqueada o que fazer", "runbook bloqueio meta", "conta bloqueada emergencia", "appeal urgente bm", "plano contingencia bloqueio"],
    category: "Meio de funil",
    readingTime: "9 min",
    publishedAt: "2026-05-25",
    ogImage: "/og/og-dia-do-bloqueio.jpg",
    ctaTitle: "Está bloqueado agora? Não perca a próxima hora",
    ctaDescription: "Mande a notificação do Meta no WhatsApp. Em 15 min indicamos se vale appeal próprio, appeal técnico ou subir BM reserva imediatamente — e operamos com você se precisar.",
    ctaWhatsappMessage: "URGENTE: minha BM/conta foi bloqueada AGORA. Vim do blog e preciso de ajuda imediata.",
    ctaLabel: "Pedir ajuda emergencial",
    content: `
:::tldr
Bloqueio aconteceu. Próximas 2h definem se você perde 1 dia ou 1 semana. **Não envie 5 appeals desesperados**. Siga o runbook: diagnóstico → appeal único bem feito → ativação da BM reserva em paralelo.
:::

Toda operação séria tem este runbook impresso. Você vai usar mais cedo ou mais tarde.

## Hora 0 — Primeiros 15 minutos

1. **Pare de mexer.** Não envie appeal ainda.
2. Print de **tudo**: notificação, Account Quality, último anúncio rodando.
3. Identifique o nível do bloqueio:
   - Anúncio individual reprovado? Pequeno.
   - Conta de anúncio restrita? Médio.
   - **BM inteira bloqueada?** Grave.
   - Perfil admin caído? **Crítico**.
4. Anote o motivo exato citado pelo Meta.

[Quero ajuda de especialista AGORA](wa:URGENTE%3A%20minha%20BM%20foi%20bloqueada%20agora.%20Vim%20do%20blog%20e%20preciso%20de%20ajuda%20imediata.)

## Hora 0-2 — Diagnóstico

### Causa provável

| Sinal | Causa típica |
|---|---|
| Reprovação repetida do mesmo criativo | Política de anúncio |
| Pico atípico de gasto antes do bloqueio | Antifraude de pagamento |
| Login estranho recente | Segurança do perfil |
| Migração / mudança recente de admin | Trust Score em queda |
| Nicho sensível em conta nova | Revisão automática |

### Ativação da reserva (em paralelo)
- Tem [BM secundária](/blog/estrategia-3-camadas-bm-meta-ads-contingencia)? Suba +30% do gasto principal nela **agora**.
- Tem reserva? Suba para 10-15% do gasto principal.
- Não tem? Pule para o bloco "Não tem reserva".

## Hora 2-24 — O appeal (uma vez só)

- Use o motivo exato da notificação.
- Anexe CNPJ, comprovante de endereço, domínio verificado.
- Texto profissional, máximo 1000 caracteres.
- **Um único appeal**, não 5.
- Se a BM é verificada, abra também ticket via Business Help.

## Dia 1-3

- **Não republique** criativo que foi reprovado.
- Mantenha gasto na secundária subindo em degraus controlados.
- Verifique Account Quality diariamente, sem mexer.

## Dia 3-7

- Sem resposta do appeal? Envie **segundo apelo** com novos documentos e ângulo diferente.
- Comece a **migrar audiências críticas** para a secundária.
- Suba 1 nova BM reserva se ainda não tinha 3 camadas.

## Dia 7+

- Se o appeal foi negado 2x → mover tudo para secundária + manter principal "morta" 30 dias antes de tentar resgate final.
- Audit completo da operação: por que caiu? O que mudar para não repetir?

## Não tem reserva — plano B emergencial

:::callout type=warning
Sem BM reserva, o caminho é **subir uma nova BM verificada no menor tempo possível**. Isso pode levar de 1 dia (BM pronta de fornecedor) a 30 dias (do zero). Durante esse tempo, o faturamento para — exatamente o que a contingência existe para evitar.
:::

[Preciso de BM reserva pronta hoje](wa:URGENTE%3A%20preciso%20de%20BM%20reserva%20pronta%20HOJE%20%28vim%20do%20blog%29.)

## O que não fazer

- 5 appeals em 1 dia.
- Criar BM clone com mesmo nome/domínio.
- Comprar BM "qualquer uma" no grupo de Telegram.
- Trocar todos os admins de uma vez.
- Cancelar cartão e refazer pagamento.

## Após resolver — autópsia obrigatória

Em até 48h:
- O que causou o bloqueio (raiz, não sintoma)?
- O que da operação amplificou o risco?
- Quais 3 mudanças estruturais evitam a recorrência?
- Adicionar à rotina de [auditoria semanal](/blog/auditoria-30-minutos-conta-anuncio-meta)?

> Bloqueio é evento esperado. Pânico é evitável. Quem tem [3 camadas](/blog/estrategia-3-camadas-bm-meta-ads-contingencia) + reserva pronta resolve no mesmo dia. Quem não tem aprende caro.
`,
  },
];


export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
