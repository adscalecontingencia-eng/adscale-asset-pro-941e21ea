import CommercialLanding from "@/components/CommercialLanding";

const ConsultoriaMetaAds = () => (
  <CommercialLanding
    seo={{
      title: "Consultoria Meta Ads e Facebook Ads para Escala | AD Scale",
      description:
        "Consultoria especializada em Meta Ads e Facebook Ads: arquitetura de ativos, Trust Score, contingência, CAPI e governança para operações que escalam.",
      keywords: [
        "consultoria meta ads",
        "consultoria facebook ads",
        "consultor meta ads",
        "consultor facebook ads",
        "consultoria tráfego pago facebook",
        "especialista em facebook ads",
        "especialista em meta ads",
        "estrutura de tráfego pago facebook",
        "consultoria para gestor de tráfego",
        "consultoria para agência facebook ads",
        "consultoria recuperação de conta facebook",
        "auditoria de bm facebook",
      ],
      canonical: "/consultoria-meta-ads",
    }}
    eyebrow="Consultoria"
    h1="Consultoria Meta Ads e Facebook Ads para operações que escalam"
    subheadline="Arquitetura de ativos, contingência, Trust Score, CAPI e governança — diagnóstico e plano de ação direto ao ponto, sem teoria desnecessária."
    bullets={[
      "Auditoria de BM, perfis e páginas",
      "Plano de contingência sob medida",
      "Implementação de CAPI e Pixel coerente",
      "Estratégia para Facebook Ads, Instagram e Meta como um todo",
      "Diagnóstico de Trust Score e fingerprint",
      "Acompanhamento técnico contínuo opcional",
    ]}
    benefits={[
      {
        title: "Foco em alto volume",
        description:
          "Atendemos operações que escalam de R$ 50 mil a 7 dígitos por mês, com gargalos típicos de bloqueio, limite e revisão.",
      },
      {
        title: "Recomendações executáveis",
        description:
          "Você sai da consultoria com checklist técnico, prioridades e responsáveis — não com slides genéricos.",
      },
      {
        title: "Visão integrada de ativos",
        description:
          "Combinamos infraestrutura (BM, perfil, página, IP, fingerprint) com estratégia de mídia para reduzir risco e ampliar previsibilidade.",
      },
    ]}
    faqs={[
      {
        question: "Para quem é a consultoria Meta Ads e Facebook Ads?",
        answer:
          "Gestores de tráfego, agências, in-house teams e e-commerces operando volume relevante mensal e enfrentando instabilidade, bloqueio ou teto de escala.",
      },
      {
        question: "Como funciona o diagnóstico inicial?",
        answer:
          "Mapeamos seus ativos atuais (BMs, perfis, páginas, pixels, CAPI), identificamos pontos de risco e entregamos um plano priorizado de correções e contingência.",
      },
      {
        question: "A consultoria inclui ativos de contingência?",
        answer:
          "Os ativos são contratados separadamente. A consultoria define o que faz sentido para sua operação; você adquire só o necessário.",
      },
      {
        question: "Vocês atendem só Meta Ads ou também Facebook Ads e Instagram?",
        answer:
          "Atendemos todo o ecossistema Meta — Facebook Ads, Instagram Ads, Messenger e Audience Network — já que compartilham a mesma infraestrutura de BM e ativos.",
      },
    ]}
    relatedPosts={[
      { slug: "calcular-roi-investimento-contingencia-meta-ads", label: "Como calcular ROI de contingência" },
      { slug: "pixel-vs-capi-conversions-api-meta-ads", label: "Pixel vs CAPI: o que escolher" },
      { slug: "fingerprint-ip-residencial-meta-ads", label: "Fingerprint e IP residencial no Meta Ads" },
    ]}
    internalLinks={[
      { href: "/bm-verificada", label: "Comprar BM Verificada" },
      { href: "/contingencia-meta-ads", label: "Estrutura de contingência" },
    ]}
    ctaPrimary="Agendar consultoria"
  />
);

export default ConsultoriaMetaAds;
