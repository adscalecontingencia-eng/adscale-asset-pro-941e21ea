#!/usr/bin/env node
/**
 * SEO Rodada 1 — atualiza meta descriptions e injeta bloco SEO/CTA/FAQ
 * no fim do `content` dos 10 artigos prioritários.
 * Idempotente: detecta o marcador <!-- seo-rodada-1 --> e re-substitui.
 */
import { readFileSync, writeFileSync } from "fs";

const FILE = "src/data/blogPosts.ts";
const MARK_OPEN = "<!-- seo-rodada-1:start -->";
const MARK_CLOSE = "<!-- seo-rodada-1:end -->";
const WA = "553198416336";

/** Build a wa.me link with a contextual message. */
const wa = (msg) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

/** Variantes de CTA conforme intenção do artigo. */
const CTA_VARIANTS = {
  seguranca: {
    title: "Sua conta está limitada, instável ou com baixa qualidade?",
    desc: "A AD Scale ajuda operações de tráfego a organizarem ativos, BMs, perfis, páginas e estrutura comercial com mais previsibilidade.",
    label: "Avaliar minha estrutura no WhatsApp",
  },
  bm: {
    title: "Quer entender qual BM faz sentido para sua operação?",
    desc: "Fale com a AD Scale e receba uma orientação direta antes de contratar uma estrutura para Meta Ads.",
    label: "Falar com a AD Scale",
  },
  campanhas: {
    title: "A campanha pode não ser o único problema da operação",
    desc: "Em operações de alto volume, estrutura de conta, BM, domínio, perfil e contingência também influenciam estabilidade e escala.",
    label: "Analisar minha operação",
  },
  default: {
    title: "Precisa de uma estrutura mais segura para operar no Meta Ads?",
    desc: "Se sua operação depende de contas, BMs, páginas, domínios e ativos bem organizados, fale com a AD Scale e entenda qual estrutura faz sentido para o seu momento.",
    label: "Falar com especialista no WhatsApp",
  },
};

/** Configuração por slug. */
const POSTS = {
  "qualidade-conta-anuncio-meta-como-medir": {
    description:
      "Entenda como funciona a qualidade da conta no Meta Ads, quais sinais afetam restrições e como estruturar uma operação mais segura para tráfego pago.",
    cta: "seguranca",
    links: [
      ["contingência Meta Ads", "/contingencia-meta-ads"],
      ["BM verificada", "/bm-verificada"],
      ["consultoria Meta Ads", "/consultoria-meta-ads"],
    ],
    faq: [
      ["O que é qualidade da conta no Meta Ads?", "A qualidade da conta é um conjunto de sinais usados pela Meta para indicar a saúde, restrições e histórico de uma conta, Business Manager ou ativo de anúncio."],
      ["Como saber se minha conta Meta Ads está com problema?", "Você pode verificar alertas, restrições e status de ativos no painel de qualidade da conta, além de analisar reprovações, limitações e queda de entrega."],
      ["Uma BM verificada ajuda na operação de anúncios?", "Uma BM verificada pode contribuir para uma estrutura mais profissional, mas não elimina a necessidade de seguir políticas, boas práticas e manter ativos organizados."],
      ["Quando devo buscar uma estrutura de contingência Meta Ads?", "Quando sua operação depende de volume, estabilidade e continuidade, pode fazer sentido avaliar uma estrutura com BMs, perfis, páginas, domínios e suporte estratégico."],
    ],
  },
  "cartao-credito-facebook-ads-boas-praticas": {
    description:
      "Veja boas práticas para usar cartão de crédito no Facebook Ads, reduzir riscos de falha de pagamento e manter a operação mais estável.",
    cta: "seguranca",
    links: [
      ["contingência Meta Ads", "/contingencia-meta-ads"],
      ["estrutura de Business Manager", "/business-manager"],
      ["BM verificada", "/bm-verificada"],
    ],
    faq: [
      ["Posso usar cartão pessoal no Facebook Ads?", "Sim, mas para operações profissionais é recomendado usar cartão corporativo vinculado a CNPJ para reduzir disputas e proteger a estrutura da empresa."],
      ["Por que meu cartão é recusado no Facebook Ads?", "As causas mais comuns são limite insuficiente, bandeira não aceita pela região, antifraude do emissor e histórico de chargebacks na conta."],
      ["Trocar o cartão pode bloquear a conta?", "Trocar o cartão não bloqueia, mas mudanças frequentes e falhas seguidas de pagamento aumentam o risco de revisão e queda de qualidade da conta."],
      ["Vale a pena ter um cartão dedicado para tráfego?", "Sim. Cartão dedicado reduz risco de fraude, facilita conciliação contábil e mantém o histórico de pagamento limpo, o que ajuda na saúde da conta de anúncio."],
    ],
  },
  "estrutura-campanha-cbo-abo-quando-usar": {
    description:
      "Entenda a diferença entre CBO e ABO no Meta Ads, quando usar cada modelo e como organizar campanhas para escalar com mais controle.",
    cta: "campanhas",
    links: [
      ["contingência Meta Ads", "/contingencia-meta-ads"],
      ["BM ilimitada para operações de alto volume", "/bm-ilimitada"],
      ["consultoria Meta Ads", "/consultoria-meta-ads"],
    ],
    faq: [
      ["O que é CBO no Meta Ads?", "CBO (Campaign Budget Optimization) é quando o orçamento é definido no nível da campanha, e o Meta distribui automaticamente entre os conjuntos de anúncios com melhor desempenho."],
      ["O que é ABO no Meta Ads?", "ABO (Ad Set Budget Optimization) é quando o orçamento é definido em cada conjunto de anúncios, dando ao gestor controle direto sobre quanto cada audiência recebe."],
      ["Quando usar CBO?", "CBO funciona bem em fases de escala, com criativos validados e múltiplos conjuntos de anúncios semelhantes, onde a otimização automática tende a entregar melhor custo."],
      ["Quando usar ABO?", "ABO é indicado para testes de audiência, validação de criativos novos e cenários onde o gestor precisa garantir um mínimo de gasto em cada segmento."],
    ],
  },
  "autenticacao-2-fatores-conta-facebook-ads": {
    description:
      "Aprenda como a autenticação de 2 fatores ajuda a proteger contas no Facebook Ads, Business Manager e operações de tráfego pago.",
    cta: "seguranca",
    links: [
      ["estrutura de Business Manager", "/business-manager"],
      ["perfis Facebook profissionais", "/perfis-facebook"],
      ["contingência Meta Ads", "/contingencia-meta-ads"],
    ],
    faq: [
      ["O que é autenticação de 2 fatores no Facebook?", "É uma camada extra de segurança que exige um segundo código (por app, chave física ou SMS) além da senha para acessar a conta e a Business Manager."],
      ["Qual método de 2FA é mais seguro?", "Aplicativos autenticadores (TOTP) como Authy, 1Password e Google Authenticator são mais seguros que SMS, que está sujeito a clonagem de chip."],
      ["Perdi o celular do 2FA, como recupero?", "Use os códigos de recuperação salvos no momento da configuração ou peça a outro administrador da BM para te re-adicionar. Por isso é essencial ter dois admins master."],
      ["É obrigatório ter 2FA na Business Manager?", "Sim. O Meta exige 2FA para administradores de BM verificada e para acessar ativos sensíveis como conta de anúncio, pixel e domínio verificado."],
    ],
  },
  "como-funciona-leilao-meta-ads": {
    description:
      "Entenda como funciona o leilão do Meta Ads, quais fatores influenciam entrega, custo, qualidade e performance das campanhas.",
    cta: "campanhas",
    links: [
      ["consultoria Meta Ads", "/consultoria-meta-ads"],
      ["estrutura de contingência para Meta Ads", "/contingencia-meta-ads"],
      ["BM verificada", "/bm-verificada"],
    ],
    faq: [
      ["O que é o leilão do Meta Ads?", "É o sistema que decide qual anúncio é exibido para cada usuário, combinando lance do anunciante, taxa de ação estimada e qualidade percebida do anúncio."],
      ["O maior lance sempre vence o leilão?", "Não. O Meta combina lance, qualidade do anúncio e taxa de ação estimada. Um anúncio relevante com lance menor pode vencer um anúncio caro e ruim."],
      ["Como melhorar o desempenho no leilão?", "Criativos relevantes, audiências bem segmentadas, página de destino rápida, pixel ou CAPI bem configurados e uma estrutura de conta com bom histórico ajudam diretamente."],
      ["Estrutura de conta influencia o leilão?", "Sim. Trust Score, qualidade da BM, idade do pixel, página e domínio impactam o custo final e a estabilidade da entrega em escala."],
    ],
  },
  "cnpj-mei-meta-ads-vale-pena": {
    description:
      "Veja quando vale a pena usar CNPJ ou MEI no Meta Ads, quais cuidados tomar e como organizar uma estrutura profissional de anúncios.",
    cta: "default",
    links: [
      ["domínio verificado", "/dominios-verificados"],
      ["estrutura de Business Manager", "/business-manager"],
      ["contingência Meta Ads", "/contingencia-meta-ads"],
    ],
    faq: [
      ["Posso anunciar no Meta Ads como MEI?", "Sim. MEI pode anunciar, emitir nota e ter Business Manager verificada, desde que o CNAE permita a atividade que está sendo divulgada."],
      ["É obrigatório ter CNPJ para verificar uma BM?", "Para a verificação de negócio padrão do Meta, sim. O processo exige documentos da empresa, endereço e comprovações vinculadas ao CNPJ."],
      ["Qual a diferença entre anunciar como PF e como PJ?", "Como PJ você tem acesso a verificação de negócio, melhor estrutura fiscal, maior limite de gasto inicial e mais segurança jurídica para operar tráfego em escala."],
      ["Vale migrar de MEI para outro regime para anunciar mais?", "Depende do faturamento e do nicho. Quando o volume de tráfego e receita ultrapassa o limite do MEI, faz sentido avaliar Simples Nacional com um contador."],
    ],
  },
  "limite-de-gasto-facebook-ads-como-aumentar": {
    description:
      "Entenda como funciona o limite de gasto no Facebook Ads, o que influencia o aumento gradual e quais cuidados tomar ao escalar campanhas.",
    cta: "bm",
    links: [
      ["BM ilimitada", "/bm-ilimitada"],
      ["BM verificada", "/bm-verificada"],
      ["estrutura de contingência para Meta Ads", "/contingencia-meta-ads"],
    ],
    faq: [
      ["O que é o limite de gasto da conta no Facebook Ads?", "É um teto definido pelo Meta para cada conta de anúncio, baseado em histórico, método de pagamento, qualidade da conta e idade da BM."],
      ["Como aumentar o limite de gasto?", "Mantenha gasto consistente, pagamentos em dia, zero chargeback, boas práticas de criativo e considere migrar para uma BM verificada ou ilimitada."],
      ["Posso ter mais de uma conta de anúncio?", "Sim. BMs maiores e verificadas permitem múltiplas contas, o que ajuda a distribuir orçamento e reduzir risco de uma única conta limitar a operação."],
      ["BM ilimitada elimina o limite de gasto?", "BM ilimitada oferece limites bem mais altos por conta, indicada para operações que precisam rodar volumes elevados sem esbarrar no teto padrão."],
    ],
  },
  "metricas-essenciais-meta-ads-iniciantes": {
    description:
      "Conheça as principais métricas do Meta Ads para analisar campanhas, entender performance e tomar decisões com mais segurança.",
    cta: "campanhas",
    links: [
      ["consultoria Meta Ads", "/consultoria-meta-ads"],
      ["contingência Meta Ads", "/contingencia-meta-ads"],
      ["estrutura de Business Manager", "/business-manager"],
    ],
    faq: [
      ["Quais são as métricas mais importantes do Meta Ads?", "CPM, CPC, CTR, taxa de conversão, CPA, ROAS e frequência são as principais. Cada uma responde a uma pergunta diferente sobre custo, interesse e retorno."],
      ["O que é ROAS no Meta Ads?", "ROAS é o retorno sobre o investimento em anúncios — receita gerada dividida pelo valor gasto. Mede se a campanha está sendo lucrativa em valor bruto."],
      ["CTR baixo significa criativo ruim?", "Geralmente sim, mas pode ser também audiência mal segmentada, posicionamento errado ou frequência alta. Vale isolar variáveis antes de descartar o criativo."],
      ["Como saber se o problema é a campanha ou a conta?", "Compare a mesma campanha em contas diferentes. Se a queda é generalizada na conta, o problema costuma ser estrutural — qualidade, BM, pixel ou domínio."],
    ],
  },
  "catalogo-meta-commerce-como-criar": {
    description:
      "Veja como criar um catálogo no Meta Commerce, organizar produtos e preparar sua estrutura para campanhas no Facebook e Instagram Ads.",
    cta: "default",
    links: [
      ["contingência Meta Ads", "/contingencia-meta-ads"],
      ["domínio verificado", "/dominios-verificados"],
      ["estrutura de Business Manager", "/business-manager"],
    ],
    faq: [
      ["O que é o catálogo Meta Commerce?", "É a base de produtos que alimenta campanhas dinâmicas, Loja no Instagram/Facebook e anúncios de vendas, conectada à Business Manager."],
      ["Preciso de domínio verificado para usar catálogo?", "Sim, é altamente recomendado. Domínio verificado vincula o catálogo ao seu site, evita restrições e habilita recursos de e-commerce no Meta."],
      ["Posso integrar Shopify ou WooCommerce ao catálogo?", "Sim. As principais plataformas têm integrações nativas ou via app oficial que enviam produtos, estoque e preços automaticamente."],
      ["Catálogo no Meta funciona para infoproduto?", "Funciona para produtos físicos e digitais com SKU bem definido. Para infoprodutos avulsos, anúncios tradicionais costumam ter melhor encaixe."],
    ],
  },
  "quanto-custa-bm-verificada-facebook-2026": {
    description:
      "Entenda o que influencia o preço de uma BM verificada, quais cuidados tomar antes de contratar e como avaliar fornecedores com segurança.",
    cta: "bm",
    links: [
      ["BM verificada", "/bm-verificada"],
      ["BM ilimitada", "/bm-ilimitada"],
      ["contingência Meta Ads", "/contingencia-meta-ads"],
    ],
    faq: [
      ["Quanto custa uma BM verificada em 2026?", "O preço varia conforme idade da BM, histórico de gasto, presença de WABA, domínio verificado e tier de limite. O ideal é avaliar caso a caso."],
      ["Vale a pena comprar uma BM verificada pronta?", "Para operações que precisam subir rápido e não podem esperar o processo de verificação, sim. Para iniciantes com pouco volume, normalmente não compensa."],
      ["Como avaliar se um fornecedor de BM é confiável?", "Verifique briefing técnico de entrega, suporte pós-venda, origem da BM, possibilidade de teste, política de troca e referências de outros clientes."],
      ["BM verificada é a mesma coisa que BM ilimitada?", "Não. BM verificada passou pelo processo de verificação de negócio do Meta. BM ilimitada é uma camada extra focada em limites de gasto mais altos por conta."],
    ],
  },
};

function buildBlock(slug, cfg) {
  const cta = CTA_VARIANTS[cfg.cta] || CTA_VARIANTS.default;
  const linksLine = cfg.links
    .map(([anchor, href]) => `[${anchor}](${href})`)
    .join(" · ");
  const waMsg = `Olá, vim pelo Google e quero avaliar uma estrutura de contingência para Meta Ads.`;
  const faqMd = cfg.faq
    .map(([q, a]) => `### ${q}\n\n${a}`)
    .join("\n\n");
  return `
${MARK_OPEN}

## ${cta.title}

${cta.desc}

[${cta.label}](${wa(waMsg)})

**Próximos passos na AD Scale:** ${linksLine}.

## Perguntas frequentes

${faqMd}
${MARK_CLOSE}
`;
}

function replaceBetween(content, openMark, closeMark, replacement) {
  const start = content.indexOf(openMark);
  if (start === -1) return content + replacement;
  const end = content.indexOf(closeMark, start);
  if (end === -1) return content + replacement;
  return (
    content.slice(0, start) +
    replacement.trim() +
    "\n" +
    content.slice(end + closeMark.length)
  );
}

let src = readFileSync(FILE, "utf8");
let touched = 0;

for (const [slug, cfg] of Object.entries(POSTS)) {
  const re = new RegExp(
    `(slug:\\s*"${slug.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}"[\\s\\S]*?description:\\s*\\n?\\s*)"([^"]*)"([\\s\\S]*?content:\\s*\`)([\\s\\S]*?)(\`,\\s*\\n\\s*\\})`,
  );
  const m = src.match(re);
  if (!m) {
    console.error("MISS", slug);
    continue;
  }
  const [, pre1, , pre2, oldContent, tail] = m;
  const newDesc = JSON.stringify(cfg.description);
  const block = buildBlock(slug, cfg);
  const newContent = replaceBetween(oldContent, MARK_OPEN, MARK_CLOSE, block);
  const replacement = pre1 + newDesc + pre2 + newContent + tail;
  src = src.replace(re, () => replacement);
  touched++;
  console.log("OK", slug);
}

writeFileSync(FILE, src);
console.log(`\nUpdated ${touched} posts.`);
