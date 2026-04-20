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
    description: "Por que páginas (fan pages) com idade real performam melhor, têm menos restrições e como integrá-las à sua estrutura de contingência.",
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
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
