# Regra editorial de SEO — Cluster Perfis Facebook

> Documento normativo. Consultar **antes** de alterar Title, H1, descrição,
> conteúdo ou links internos de qualquer página deste cluster.
> Não cria redirects, não cria URLs, não cria rotas alternativas.
> Finalidade: definir a página principal candidata a cada intenção e evitar canibalização.

## 1. Mapa de intenção → URL

### /perfis-facebook — categoria comercial ampla
Landing comercial principal para quem **ainda não especificou** antigo ou aged.

Priorizar semanticamente: comprar perfil facebook · comprar perfis facebook ·
comprar perfil facebook ads · comprar perfil facebook para anúncios ·
perfil facebook para anúncios · perfis facebook para meta ads ·
perfil para anúncios · perfis para operações de Meta Ads.

Não transformar "perfil facebook antigo" em keyword principal desta página.

### /perfil-facebook-antigo — intenção "antigo"
Resposta principal para buscas que mencionem explicitamente **ANTIGO** ou **HISTÓRICO**.

Priorizar: perfil facebook antigo · perfil antigo facebook · comprar perfil facebook antigo ·
comprar perfil antigo · perfil antigo para anúncios · perfil facebook antigo para anúncios ·
perfil antigo meta ads · perfil com histórico facebook.

Não tentar dominar o termo genérico "comprar perfil facebook".

### /perfil-aged — termo específico "aged"
Priorizar: perfil aged · perfil aged facebook · perfil facebook aged ·
comprar perfil aged · perfil aged para meta ads · o que é perfil aged.

Pode explicar que "aged" normalmente corresponde a um perfil antigo/com histórico,
mas **AGED permanece o termo principal desta URL**.

## 2. Artigos (intenção informacional)

| URL | Intenção priorizada |
|---|---|
| /blog/perfil-facebook-vs-conta-de-anuncios | perfil facebook vs conta de anúncios · diferença perfil e conta de anúncios · perfil facebook é conta de anúncios |
| /blog/perfil-facebook-antigo-vs-novo | perfil antigo vs novo facebook · diferença perfil antigo e novo · perfil facebook antigo ou novo |
| /blog/perfil-aged-vs-perfil-antigo-facebook | perfil aged vs perfil antigo · aged e antigo são a mesma coisa · diferença perfil aged e antigo |
| /blog/estrutura-meta-ads-perfil-bm-conta-anuncios | perfil bm conta de anúncios · estrutura meta ads · como funciona perfil business manager conta · estrutura facebook ads |

## 3. Links internos

| Contexto do texto | Link preferencial |
|---|---|
| "perfis Facebook", "perfil para anúncios", "opções de perfis" (genérico) | /perfis-facebook |
| "perfil Facebook antigo", "perfil antigo", "perfil com histórico" | /perfil-facebook-antigo |
| "perfil aged" | /perfil-aged |

Não usar as três URLs no mesmo parágrafo sem necessidade real.

## 4. Anchor text

- **/perfis-facebook**: perfis Facebook · perfis para Meta Ads · perfis para anúncios · opções de perfis Facebook
- **/perfil-facebook-antigo**: perfil Facebook antigo · perfil antigo · perfil com histórico · perfil antigo para Meta Ads
- **/perfil-aged**: perfil aged · perfil Facebook aged · termo aged

Variar as âncoras; não repetir a mesma âncora artificialmente em todo o site.

## 5. Sem keyword stuffing

As consultas acima são um **mapa de intenção**, não uma lista de inserção literal.
Conteúdo natural, em português brasileiro, com variações semânticas.

## 6. Não criar páginas para variações

Proibido criar: `/comprar-perfil-facebook`, `/comprar-perfil-antigo`,
`/perfil-facebook-para-anuncios`, `/perfil-antigo-meta-ads`,
`/perfil-aged-facebook-comprar`. Essas intenções já têm página designada.

## 7. Regra de canibalização

```text
/perfis-facebook        → categoria comercial ampla
/perfil-facebook-antigo → produto/intenção "antigo"
/perfil-aged            → termo específico "aged"
artigos do blog         → dúvidas e comparações informacionais
```

A página genérica não tenta dominar a intenção específica; a específica não substitui
a categoria geral. Não alterar essa divisão sem revisão SEO.

## Estado atual conforme ao mapa (verificado)

| URL | Title | H1 |
|---|---|---|
| /perfis-facebook | Comprar Perfil Facebook para Anúncios \| AD Scale | Comprar Perfil Facebook para Anúncios |
| /perfil-facebook-antigo | Perfil Facebook Antigo para Anúncios \| AD Scale | Perfil Facebook Antigo para Meta Ads |
| /perfil-aged | Perfil Aged Facebook \| Contas Antigas Ativas | Perfil Aged Facebook \| Contas Antigas Ativas |

Validador: `npx tsx scripts/validate-seo-intent-map.ts`
