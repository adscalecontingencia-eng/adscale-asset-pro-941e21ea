# Contrato de prerender e auditoria de HTML

## 1. Fonte única de conteúdo (SPA = HTML inicial)

O HTML estático **não pode** ter conteúdo escrito à mão paralelo ao do React.
`scripts/prerender.mjs` lê as mesmas fontes que a aplicação:

| Tipo de página | Fonte de dados | Como o corpo é gerado |
|---|---|---|
| Artigos do blog | `src/data/blogPosts.ts` | markdown do artigo + navegação de pilar/cluster |
| Pilares | `src/data/blogPillars.ts` | descrição longa, lista de artigos, recursos, próximo passo |
| Índice do blog | pilares + posts | inventário completo com links |
| Landings comerciais | `src/data/landings.tsx` | subheadline, intro, cada ativo como H2 + bullets, cross-links, FAQ, CTA |
| Páginas com layout próprio (React puro) | `MANUAL_BODIES` em `scripts/prerender.mjs` | equivalente **semântico** da página (mesmos H2 e mesma mensagem) |

Regra: só use `MANUAL_BODIES` quando a página não vier de um arquivo de dados.
Ao criar uma landing nova, adicione-a a `src/data/landings.tsx` — o corpo
prerenderizado sai automaticamente e nada precisa ser duplicado.

Componentes visuais (calculadoras, carrosséis, formulários) não são replicados
no HTML estático; o prerender gera o equivalente semântico em texto e links.

## 2. Portões automáticos

Rodam em `npm run build` (via `postbuild`), nesta ordem:

1. **`scripts/prerender.mjs`** — gate de conteúdo mínimo por rota
   (250 palavras, 2 H2, 3 links internos). Falha o build listando a rota.
2. **`scripts/audit-seo-html.mjs`** — auditoria estrutural de `dist/`.
   Também disponível isolada: `npm run audit:seo`. Escreve `dist/seo-audit.json`.

### Classificação da auditoria

**FAIL** (bloqueia o deploy, exit 1) — página indexável com:
- sem `<title>`, sem meta description ou sem canonical;
- canonical diferente da URL oficial da própria página;
- zero ou mais de um H1;
- corpo ausente (menos de 2 parágrafos/itens de lista) — o caso "só H1 + breadcrumb";
- menos de 120 palavras de texto real;
- nenhum H2/H3 — sinal de que as seções não foram renderizadas;
- menos de 2 links internos crawláveis;
- `noindex` em URL que está no sitemap.

**WARNING** (não bloqueia) — corpo curto, poucos H2, poucos links internos,
title acima de 60 caracteres, description fora de 50–160, ausência no sitemap,
página `noindex` e stubs de redirecionamento client-side.

**PASS** — nenhum dos itens acima.

Páginas legais (`/politica-de-privacidade`, `/termos-de-uso`) são isentas dos
critérios de corpo; a lista está em `THIN_BY_DESIGN`.

## 3. Trailing slash

A hospedagem estática atual não emite 301/308. É **proibido** simular redirect
com `Navigate`, `window.location` ou `meta refresh` e chamar isso de 301 — a
auditoria sinaliza qualquer página nessas condições. A consistência é mantida
por canonical sem barra final; a solução definitiva é em nível de HTTP/CDN.

## 4. Dados do Search Console

O projeto não tem integração completa com o Search Console. Em qualquer decisão
de consolidação de URL, os campos de impressões, cliques, CTR, posição e
backlinks devem ser marcados como **"Dados externos necessários"** — nunca
estimados.
