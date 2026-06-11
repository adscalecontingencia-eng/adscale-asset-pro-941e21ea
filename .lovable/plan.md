## Objetivo

Adicionar ao admin um módulo de SEO orientado a ação, alimentado por (1) Google Search Console via connector já existente e (2) upload manual de CSV/XLSX exportados do GSC. Saída: oportunidades, quick wins, baixo CTR, páginas comerciais, blog, técnico/indexação, conversões WhatsApp, plano de ação com score 0–100, antes/depois.

## Escopo desta entrega (Rodada 1 — fundação)

Para caber em uma rodada útil e testável, entrego a fundação completa e 6 das 12 abas funcionais. As 6 abas restantes ficam scaffold (UI vazia + TODO) e são preenchidas na Rodada 2.

**Rodada 1 entrega:**
1. Nova rota `/admin/seo` (separada do dashboard de cliques atual, que continua intacto).
2. Tabelas no Lovable Cloud para persistir snapshots GSC, otimizações e plano de ação.
3. Edge function `gsc-sync` (puxa Performance + Index Coverage do GSC, salva snapshot diário).
4. Upload CSV/XLSX (Performance, Consultas, Páginas, Consultas×Página, Indexação).
5. Classificador de intenção (comercial / problema-dor / informacional / marca / técnica / navegacional) por regex sobre keywords da AD Scale.
6. Classificador de tipo de página (home / comercial / blog / pilar) por path.
7. Motor de oportunidades (A–F: quick win, baixo CTR, comercial prioritária, lead informacional, nova página, canibalização).
8. Score 0–100 (impressões + proximidade posição + gap CTR + intenção comercial + peso página comercial + problema técnico).
9. Filtros globais (período, tipo de página, intenção, dispositivo, país, faixa de posição, status de oportunidade).
10. Abas funcionais nesta rodada: **Visão Geral, Consultas, Páginas, Quick Wins, Baixo CTR, Plano de Ação SEO**.
11. Cards topo com variação vs período anterior e setas verde/amarelo/vermelho.
12. Gráficos diários (cliques, impressões, CTR, posição) com markers de otimização.

**Rodada 2 (próxima):** Consulta×Página com decisão automática, Páginas Comerciais (10 LPs), Blog e Conteúdo, SEO Técnico e Indexação detalhado, Conversões WhatsApp (cruza `whatsapp_clicks` × GSC), Antes/Depois com markers e alertas automáticos.

## Modelo de dados (migration)

```text
gsc_daily_metrics       (date, clicks, impressions, ctr, position)              -- série temporal site-wide
gsc_query_snapshots     (snapshot_date, query, page, clicks, impressions,
                         ctr, position, device, country, intent, opportunity,
                         score, page_type)
gsc_page_snapshots      (snapshot_date, page, clicks, impressions, ctr,
                         position, query_count, top_query, page_type, status)
gsc_index_status        (snapshot_date, page, state, reason, priority)
seo_optimizations       (page, type, applied_at, notes, before_json, after_json)
seo_action_items        (priority, type, page, query, metric, recommendation,
                         status, created_at, completed_at, result_json)
```
Todas com GRANT para `authenticated` + `service_role`, RLS via `has_role(auth.uid(),'admin')`.

## Edge functions

- `gsc-sync` (novo): chama `searchAnalytics/query` (dimensions query+page, country, device) e `urlInspection`/`inspectionResult` para indexação dos 10 LPs + top 50 páginas; popula snapshots. Roda on-demand (botão "Sincronizar agora") e idealmente em cron diário.
- Mantém `gsc-queries-for-page` atual.

## UI

Nova página `src/pages/admin/SeoDashboard.tsx` com `Tabs` (shadcn). Componentes em `src/components/admin/seo/`:
- `SeoFilters.tsx`, `SeoKpiCards.tsx`, `SeoTrendChart.tsx`
- `QueriesTable.tsx`, `PagesTable.tsx`, `QuickWinsTable.tsx`, `LowCtrTable.tsx`, `ActionPlanTable.tsx`
- `CsvImporter.tsx` (usa `xlsx` via `bun add xlsx`)
- `lib/seo/intent.ts`, `lib/seo/opportunity.ts`, `lib/seo/score.ts`, `lib/seo/pageType.ts`

Link no admin atual: card "Abrir Dashboard SEO".

## Detalhes técnicos

- Score: `clamp(round(0.25*log10(impr+1)/4*100 + 25*posBonus + 20*ctrGap + 15*intentWeight + 10*pageWeight + 5*techIssue), 0, 100)` com `posBonus` em [0,1] (1 para pos 4–10, 0.6 para 11–20, 0.3 para 21–50, 0 acima).
- Intenção: dicionário em `intent.ts` com listas exatas que o usuário forneceu.
- CTR esperado por posição: tabela [pos→CTR base] para calcular gap.
- Variação vs período anterior: query duas janelas iguais e compara.
- Cores: verde ≥ +5%, amarelo entre -5 e +5%, vermelho ≤ -5%.

## Pergunta antes de implementar

A Rodada 1 acima já é grande (≈15 arquivos novos + 1 migration + 1 edge function). Confirma que posso:
- (a) Criar rota separada `/admin/seo` sem mexer no `/admin` atual; e
- (b) Seguir com a Rodada 1 nesse escopo (6 abas funcionais + fundação) e deixar as outras 6 abas para a Rodada 2?

Se preferir outro recorte (ex.: só upload CSV + Quick Wins + Plano de Ação primeiro, sem edge function GSC), me diga e eu re-planejo.