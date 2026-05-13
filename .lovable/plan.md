# Plano: Landing Pages por Produto + Cluster de Palavras-Chave

Objetivo: criar uma LP dedicada para cada produto/intenção de busca (BMs, Perfis, Páginas/Fan Pages, Domínios, WhatsApp API, Pixel/CAPI, Aquecimento, Cartões/BIN), cada uma otimizada para um cluster de keywords, com SEO técnico, schema, links internos e prerender.

---

## 1. Mapa de URLs e Clusters de Keywords

Estrutura de URL: `/<produto-slug>/` (curto, kebab-case, em PT-BR).


| #   | Rota                                      | H1 / Foco                           | Keyword principal          | Keywords secundárias                                                                             |
| --- | ----------------------------------------- | ----------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | `/bm-verificada/` *(já existe — refinar)* | BM Verificada Meta Ads              | bm verificada              | comprar bm verificada, bm verificada facebook, bm para api, bm com trust score alto              |
| 2   | `/business-manager/`                      | Business Manager (BM) para Meta Ads | business manager facebook  | comprar business manager, bm facebook ads, bm nova, bm aged, bm ilimitada                        |
| 3   | `/bm-ilimitada/`                          | BM Ilimitada / sem limite de gasto  | bm ilimitada               | bm sem limite, bm desbloqueada, bm com limite alto, bm 250 dólares                               |
| 4   | `/perfis-facebook/`                       | Perfis Facebook Farmados e Aged     | perfil facebook farmado    | comprar perfil facebook, perfil aged, perfil verificado, perfil para ads, conta facebook farmada |
| 5   | `/perfil-aged/`                           | Perfis Aged (antigos)               | perfil aged facebook       | perfil antigo facebook, conta aged, perfil 2010, perfil envelhecido                              |
| 6   | `/paginas-facebook/`                      | Páginas / Fan Pages para Ads        | comprar fan page           | fan page antiga, página facebook ads, página com seguidores, página aged, fan page verificada    |
| 7   | `/dominios-verificados/`                  | Domínios Verificados Meta           | domínio verificado meta    | verificação de domínio facebook, domínio com trust, domínio aquecido                             |
| 8   | `/whatsapp-cloud-api/`                    | WhatsApp Cloud API + BM             | whatsapp cloud api         | bm para whatsapp api, disparo whatsapp api, whatsapp business api oficial                        |
| 9   | `/pixel-capi/`                            | Pixel + Conversions API             | pixel facebook capi        | conversions api meta, capi facebook ads, pixel verificado                                        |
| 10  | `/aquecimento-contas/`                    | Aquecimento (warm-up) de contas     | aquecimento conta facebook | warm up facebook ads, esquentar bm, esquentar conta ads                                          |
| 11  | `/cartoes-bin-internacional/`             | Cartões / BIN para Meta Ads         | bin para facebook ads      | cartão internacional ads, bin que aprova meta, cartão para bm                                    |
| 12  | `/recuperacao-bm/`                        | Recuperação de BM bloqueada         | bm bloqueada recuperar     | desbloqueio bm, recuperar conta facebook ads, bm restrita                                        |


> Cada rota é um **cluster** — a LP é a página-pilar comercial, e os artigos do blog que já existem (warm-up, trust score, bloqueio, etc.) viram **support content** linkando para ela.

---

## 2. Anatomia padrão da LP (reuso do `CommercialLanding`)

Já existe `src/components/CommercialLanding.tsx` — reaproveitar 100%. Cada nova rota é só um arquivo de dados + página fina.

Seções por LP:

1. Breadcrumb + eyebrow + H1 + subheadline + 4–6 bullets + CTA WhatsApp
2. 3 benefícios (cards)
3. 3 depoimentos (testimonials)
4. 2–4 casos de uso (use cases)
5. FAQ (6–10 perguntas — alimenta `FAQPage` schema)
6. Posts relacionados do blog (linkagem interna do cluster)
7. Links para outros produtos AD Scale (linkagem horizontal)
8. CTA final

---

## 3. SEO técnico por LP

Para cada nova rota, garantir:

- `**<title>` ≤ 60 chars**, único, com keyword principal + marca.
- `**<meta description>` ≤ 155 chars**, com keyword + proposta de valor + CTA.
- `**<link rel="canonical">**` self-reference com trailing slash.
- **OG/Twitter** únicos via `SEO.tsx` (já existe).
- **JSON-LD**: `Service` + `FAQPage` + `BreadcrumbList` (já incluso no `CommercialLanding`).
- **H1 único** + H2/H3 hierárquicos com variações de keyword (LSI).
- **Alt text** em qualquer imagem.
- **Internal linking**: cada LP linka para 3–5 posts do blog do mesmo cluster e 2–3 LPs irmãs.

---

## 4. Mudanças no SEO global

1. `**scripts/prerender.mjs**` — adicionar as 11 novas rotas ao array `staticPages` com title/description/keywords. Isso gera HTML estático por rota com meta + JSON-LD (essencial para Googlebot e crawlers sem JS).
2. `**public/sitemap-paginas.xml**` — adicionar `<url>` para cada nova rota com `lastmod`, `changefreq=weekly`, `priority=0.8`.
3. `**public/llms.txt**` — adicionar bullet por nova LP na seção Pages.
4. `**src/App.tsx**` — registrar 11 novas `<Route>`.
5. `**Navbar.tsx` / `FooterSection.tsx**` — adicionar menu "Produtos" (dropdown ou seção do footer) listando todas as LPs — fortalece linkagem interna sitewide.

---

## 5. Estrutura de arquivos

```text
src/
├─ data/landings/
│  ├─ businessManager.ts
│  ├─ bmIlimitada.ts
│  ├─ perfisFacebook.ts
│  ├─ perfilAged.ts
│  ├─ paginasFacebook.ts
│  ├─ dominiosVerificados.ts
│  ├─ whatsappCloudApi.ts
│  ├─ pixelCapi.ts
│  ├─ aquecimentoContas.ts
│  ├─ cartoesBin.ts
│  └─ recuperacaoBm.ts
└─ pages/landings/
   ├─ BusinessManager.tsx        (importa data + <CommercialLanding {...data} />)
   ├─ BmIlimitada.tsx
   ├─ ... (11 arquivos finos)
```

Cada `data/*.ts` exporta `{ seo, eyebrow, h1, subheadline, bullets, benefits, faqs, testimonials, useCases, relatedPosts, internalLinks }`.

---

## 6. Mapeamento Cluster → Posts existentes (linkagem interna)


| LP                                              | Posts do blog que devem linkar                                     |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| BM Verificada / Business Manager / BM Ilimitada | guia BM verificada, trust score, bloqueio, arquitetura, preço 2026 |
| Perfis / Perfil Aged                            | warm-up, escolher fornecedor, recuperação                          |
| Páginas / Fan Page                              | arquitetura, escolher fornecedor                                   |
| WhatsApp Cloud API                              | guia BM verificada, arquitetura                                    |
| Pixel + CAPI                                    | trust score, arquitetura                                           |
| Aquecimento                                     | warm-up, trust score                                               |
| Cartões/BIN                                     | arquitetura, preço 2026                                            |
| Recuperação BM                                  | bloqueio, recuperação, trust score                                 |


Em cada post desses, adicionar 1 link contextual de volta para a LP correspondente (aumenta autoridade interna da LP).

---

## 7. Execução faseada

**Fase 1 — Fundação (1 entrega):** App.tsx routes, scaffolding `data/landings/` e `pages/landings/`, atualização do prerender + sitemap + llms.txt. Criar 3 LPs prioritárias: **Business Manager**, **Perfis Facebook**, **Páginas Facebook**.

**Fase 2 — Expansão:** WhatsApp Cloud API, BM Ilimitada, Perfil Aged, Domínios Verificados.

**Fase 3 — Long-tail:** Pixel/CAPI, Aquecimento, Cartões/BIN, Recuperação BM.

**Fase 4 — Linkagem & polimento:** menu "Produtos" no Navbar + bloco no Footer; inserir links contextuais nos posts do blog apontando para LPs; revisão de titles/descriptions com Semrush.

---

## 8. Validação pós-deploy

- Submeter sitemap atualizado no Google Search Console.
- Conferir cada rota via `view-source:` para garantir title/description/canonical/JSON-LD únicos.
- Rich Results Test para validar `Service` + `FAQPage`.
- Acompanhar impressões por cluster no GSC ao longo de 30–60 dias.

---

Posso começar pela **Fase 1** (3 LPs + infraestrutura) assim que aprovar — confirma se a lista de 11 rotas/clusters está correta ou quer adicionar/remover alguma? 

Mantenha o mesmo designer e layout da landing page atual, so altere a copy para ficar especifica para cada publico, pois a landing page esta validada