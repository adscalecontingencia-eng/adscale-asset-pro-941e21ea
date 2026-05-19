## Plano: tornar o blog AD Scale a maior referência do Brasil em contingência Meta Ads

Hoje temos **20 posts publicados**, organizados em ToF/MoF/BoF, com SEO técnico decente (canonical, JSON-LD, sitemap, prerender). O plano abaixo eleva o blog a referência nacional em 4 frentes: **conteúdo (cobertura + profundidade)**, **arquitetura de informação (UX/navegação)**, **SEO/E-E-A-T** e **distribuição/conversão**.

---

### Fase 1 — Arquitetura de informação (UX do blog)

Objetivo: o leitor encontra o que precisa em ≤ 2 cliques e entende a jornada.

1. **Hub central `/blog`** redesenhado em 3 zonas:
   - Hero com **busca interativa** (filtro client-side por título/keyword).
   - **Pilares temáticos** (cards grandes) que levam a páginas-índice dedicadas.
   - Grid de posts recentes com filtro por funil (ToF/MoF/BoF) + **filtro por tema**.
2. **Páginas-índice de pilar** (novas rotas `/blog/pilar/<slug>`):
   - `/blog/pilar/business-manager` — tudo sobre BM (verificada, ilimitada, bloqueio, recuperação).
   - `/blog/pilar/perfis-e-paginas` — perfis aged, fan pages, fingerprint.
   - `/blog/pilar/seguranca-e-bloqueios` — bloqueios, recuperação, appeal, checklist.
   - `/blog/pilar/escala-e-performance` — warm-up, trust score, limite de gasto, CAPI.
   - `/blog/pilar/whatsapp-api` — Cloud API, BM para WhatsApp, disparo.
   - Cada pilar agrega posts + linka para a LP comercial correspondente.
3. **Categorias visíveis no Navbar do blog** (chips fixos no topo).
4. **Breadcrumbs** consistentes: Início › Blog › Pilar › Post.
5. **Paginação melhor**: já existe paginação, adicionar contador "X de Y" e prev/next SEO (`rel="prev|next"`).

### Fase 2 — Cobertura editorial (expandir de 20 → 60 posts em 3 ondas)

Mapa de novos posts agrupados por pilar. Cada onda = ~13 posts.

**Onda A — Fundamentos e dúvidas frequentes (ToF, alto volume de busca)**
- "Diferença entre conta pessoal, perfil de anúncio e BM no Facebook"
- "O que é Meta Business Suite e como usar em 2026"
- "Como criar uma BM passo a passo (e os erros que travam a verificação)"
- "O que é fan page e por que ainda é obrigatória para anunciar"
- "CNPJ MEI serve para verificar BM no Meta? Mitos e verdades"
- "Glossário visual: 40 termos do Meta Ads explicados"
- "Conta de anúncio nova: limites, restrições e como escalar do zero"
- "O que é pixel do Facebook e como instalar corretamente em 2026"
- "Catálogo de produtos no Meta: quando faz sentido e como configurar"
- "Como funciona o leilão do Meta Ads (e por que sua conta importa)"
- "Política do Meta para nichos sensíveis: o que é proibido em 2026"
- "Account Quality: como interpretar o painel de qualidade da conta"
- "Como verificar domínio no Facebook em 2026 (passo a passo iOS 17+)"

**Onda B — Operação e técnica (MoF, intenção crescente)**
- "Estratégia de contingência: como montar 3 camadas para operações 7 dígitos"
- "Warm-up de BM verificada: cronograma de 14 dias"
- "Warm-up de perfil novo para administrar BM (sem queimar)"
- "IP residencial vs móvel vs datacenter: qual usar para Meta Ads"
- "Antidetect browser: GoLogin, AdsPower, Multilogin comparados"
- "Como organizar permissões em uma BM (papéis, partners, agências)"
- "Conversions API (CAPI): tutorial completo com Google Tag Manager"
- "CAPI Gateway vs Stape vs implementação nativa: comparativo"
- "Como diagnosticar queda de performance em 24h"
- "Auditoria de 30 minutos para identificar BM em risco"
- "Como migrar pixels e domínios entre BMs sem perder histórico"
- "Estrutura de campanhas para BM nova: CBO, ABO, Advantage+"
- "Como funciona o Spending Limit do Meta e como elevar com segurança"

**Onda C — Cases, comparativos e long-tail (BoF, conversão)**
- "Quanto custa rodar R$ 1 milhão/mês em Meta Ads: estrutura ideal"
- "BM Verificada vs BM Antiga: qual escolher para cada cenário"
- "Comprar BM verificada no Telegram: por que é uma armadilha"
- "Mercado Livre, OLX, Telegram: onde NUNCA comprar ativos Meta"
- "Estudo de caso: como uma operação de e-commerce sobreviveu a 3 bloqueios"
- "Estudo de caso: WhatsApp Cloud API para clínica com 12k leads/mês"
- "Comparativo: WhatsApp Cloud API oficial vs disparadores não oficiais"
- "Comparativo: AD Scale vs alternativas (sem citar nomes — categorias)"
- "Recuperação de BM bloqueada: nossa taxa real de sucesso"
- "Como precificar contingência no orçamento da operação"
- "Checklist de troca de gestor de tráfego sem perder ativos"
- "FAQ definitivo sobre contingência (40 perguntas com resposta curta)"
- "O futuro da contingência Meta Ads: tendências 2026-2027"

> Conteúdo gerado com **profundidade real** (mínimo 1.500 palavras nos pilares, 800+ nos demais), exemplos, tabelas, capturas anonimizadas quando possível.

### Fase 3 — Profundidade e UX de leitura

1. **Reescrever os 5 posts mais estratégicos** atuais para virarem **guias pilares** (≥ 3.000 palavras, índice expandido, FAQ rico, infográficos):
   - Guia BM Verificada, Trust Score, Warm-up, Recuperação de BM, Arquitetura de contingência.
2. **Componente "TL;DR"** no topo de cada post (3-5 bullets).
3. **Caixas visuais reutilizáveis**: "Atenção", "Dica do especialista", "Resumo", "Exemplo real".
4. **Progress bar** de leitura no topo + **tempo restante** dinâmico.
5. **Sumário sticky** lateral em desktop (já existe TOC, melhorar UX).
6. **Botão "copiar link da seção"** ao passar mouse sobre H2/H3.
7. **Posts relacionados inteligentes**: por pilar + por keywords compartilhadas (já existe por categoria, refinar).
8. **CTA contextual** no meio do post (não só no final): caixa "Precisa de [tema do post]? Fale com a AD Scale".

### Fase 4 — SEO técnico e E-E-A-T

1. **Schema enriquecido**:
   - `Article` → `TechArticle` para guias técnicos.
   - `HowTo` em todos os tutoriais passo-a-passo.
   - `FAQPage` real (já parcial, expandir com respostas completas).
   - `BreadcrumbList` em todos os posts.
2. **Página de autor** robusta (`/autor/pedro-lucas` já existe — expandir com bio longa, credenciais, links sociais, schema `Person`).
3. **Datas de atualização visíveis** + campo `updatedAt` por post (hoje só `publishedAt`).
4. **Linkagem interna obrigatória**: cada post linka para 3-5 outros + 1-2 LPs comerciais (script de validação no build).
5. **Sitemap dinâmico** por pilar (`sitemap-blog-bm.xml`, etc.) e atualização automática do `sitemap-posts.xml` ao adicionar post.
6. **Imagens otimizadas**: WebP, lazy-load, alt descritivo, `width/height` para evitar CLS.
7. **Core Web Vitals**: lazy-load do DotGlobe e imagens abaixo da dobra; reduzir JS no `/blog`.
8. **OG images únicas** por post (template SVG → PNG gerado em build).

### Fase 5 — Distribuição e conversão

1. **Newsletter** "Contingência Semanal" — captura no final de cada post + página `/newsletter`.
2. **Lead magnets** por pilar (PDF gated):
   - "Checklist de auditoria de BM (40 itens)" — pilar BM.
   - "Cronograma de warm-up 14 dias" — pilar escala.
   - "Guia de recuperação de BM bloqueada" — pilar segurança.
3. **Banner contextual de LP** no fim de cada post (já parcial, automatizar por keyword do post).
4. **Compartilhamento social**: botões discretos (X, LinkedIn, WhatsApp, copiar link).
5. **Comentários/perguntas via WhatsApp**: CTA "tem dúvida sobre este post? pergunte aqui" no rodapé do artigo.

### Fase 6 — Execução faseada

| Sprint | Entrega |
|---|---|
| 1 | Fase 1 completa (hub redesenhado, pilares, navegação). |
| 2 | Onda A de posts (13) + componentes TL;DR/Atenção/Dica. |
| 3 | Reescrita dos 5 pilares + schema HowTo/TechArticle + autor expandido. |
| 4 | Onda B (13 posts) + newsletter + 1 lead magnet. |
| 5 | Onda C (13 posts) + CTAs contextuais + 2 lead magnets restantes. |
| 6 | Polimento Core Web Vitals, OG images, validação interna de links, submissão GSC. |

### Detalhes técnicos (para referência)

- Estrutura de dados: adicionar campos `pillar`, `updatedAt`, `tldr: string[]`, `relatedSlugs?: string[]` em `BlogPost`.
- Novas rotas em `src/App.tsx`: `/blog/pilar/:slug`.
- Novo arquivo: `src/data/blogPillars.ts` (definição de pilares + agregação de posts).
- Novos componentes: `PostTLDR`, `PostCallout` (variants: warning/tip/example/summary), `PillarHero`, `BlogSearch`.
- `scripts/prerender.mjs`: adicionar rotas de pilares e regenerar sitemap automaticamente lendo `blogPosts.ts`.
- Build-time check: script que falha se algum post tiver < 2 links internos.

---

Quer que eu comece pela **Fase 1 (arquitetura/UX)** ou prefere atacar primeiro a **Fase 2 (volume de conteúdo)**? Também posso ajustar o mapa editorial — adicionar/remover temas — antes de começar.