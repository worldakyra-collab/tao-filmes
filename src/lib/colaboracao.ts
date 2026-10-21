/** Conteúdo da página TAO FILMES × HUMANA E-TRAD. Troque textos, mídias e links aqui. */

export const COLABORACAO = {
  brands: {
    tao: {
      name: "TAO Filmes",
      /** Destino temporário interno. Substitua pela página individual quando existir. */
      href: "/inicio",
    },
    humana: {
      name: "Humana & Trad",
      href: "https://humanatraducao.com/",
      linkLabel: "Ver Humana",
    },
  },
  nav: [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Trabalhos", href: "#trabalhos" },
    { label: "Propósito", href: "#proposito" },
    { label: "Fale conosco", href: "#contato" },
  ],
  hero: {
    line: "Histórias que conectam pessoas, em qualquer idioma.",
    video: "/video/esse1.mp4",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80",
  },
  sobre: {
    kicker: "Nossa colaboração",
    title: "Uma ideia.\nMuitas vozes.\nUma só conexão.",
    text: "A TAO Filmes e a Humana & Trad se unem para transformar histórias em experiências completas, com produção audiovisual e interpretação.",
    closing: "Duas expertises. Um só propósito.",
    moreLabel: "Ver mais",
    panel: {
      title: "TAO × Humana",
      role: "Produção audiovisual e interpretação",
      paragraphs: [
        "A TAO Filmes cuida da imagem, do som e da narrativa. A Humana & Trad entra na mesma história com interpretação, para que a mensagem chegue a quem fala outro idioma.",
        "Juntas, as duas empresas podem acompanhar um projeto do roteiro à versão final: gravação, entrevistas, eventos e a tradução falada no momento em que a comunicação acontece.",
        "Este texto é demonstrativo. Substitua pelos dados reais da parceria quando o material estiver aprovado.",
      ],
    },
    images: [
      {
        src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
        alt: "Profissional de câmera em gravação",
      },
      {
        src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
        alt: "Profissional com fone, em escuta e interpretação",
      },
    ],
  },
  trabalhos: {
    kicker: "Trabalhos",
    title: "Alguns trabalhos",
    accent: "",
    allLabel: "Ver todos os trabalhos",
    /** Sem destino definitivo ainda. Preencha quando a página de trabalhos existir. */
    allHref: "",
    items: [
      {
        label: "Documentário | Produção + Interpretação",
        image:
          "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
        alt: "Equipe filmando em paisagem aberta",
      },
      {
        label: "Entrevista | Produção + Interpretação",
        image:
          "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1400&q=80",
        alt: "Entrevista em estúdio, com câmera e microfone",
      },
      {
        label: "Institucional | Produção + Interpretação",
        image:
          "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1400&q=80",
        alt: "Profissional acompanhando uma gravação com fone",
      },
    ],
  },
  proposito: {
    title: "Mais do que produzir. Conectar pessoas.",
    text: "Unimos imagem, som e interpretação para que histórias e ideias alcancem novos públicos, em diferentes idiomas.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80",
    cta: "Vamos conversar",
    /** Destino do botão. Troque pelo canal definido pelas empresas. */
    contactHref: "mailto:coletivo.tao.filmes@gmail.com",
  },
} as const;
