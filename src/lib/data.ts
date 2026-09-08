export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  video?: string;
  layout: "left" | "right" | "full" | "offset";
  description: string;
  client?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export const SITE_VIDEO_1 = "/video/esse1.mp4";
export const SITE_VIDEO_2 = "/video/esse2.mp4";

export const HERO_VIDEO = SITE_VIDEO_1;

export const ABOUT_VIDEO = SITE_VIDEO_2;

export const ABOUT_STATS = [
  { value: 120, label: "Projetos" },
  { value: 12, label: "Anos" },
  { value: 85, label: "Clientes" },
  { value: 200, label: "Produções" },
] as const;

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "horizonte",
    title: "Horizonte",
    category: "Filme Publicitário",
    year: "2025",
    client: "Marca Nacional",
    image:
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1600&q=80",
    video: SITE_VIDEO_1,
    layout: "left",
    description:
      "Um filme que explora os limites entre o real e o imaginado. Horizonte captura a essência da transformação através de narrativa visual cinematográfica, onde cada frame constrói uma jornada emocional.",
  },
  {
    id: "02",
    slug: "eclipse",
    title: "Eclipse",
    category: "Clipe Musical",
    year: "2025",
    client: "Artista Independente",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&q=80",
    video: SITE_VIDEO_2,
    layout: "full",
    description:
      "Clipe musical com linguagem visual ousada e atmosfera densa. Eclipse utiliza luz e sombra como elementos narrativos, criando uma experiência sensorial que acompanha cada nota da composição.",
  },
  {
    id: "03",
    slug: "ressonancia",
    title: "Resonância",
    category: "Conteúdo Digital",
    year: "2024",
    client: "Plataforma Digital",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80",
    video: SITE_VIDEO_1,
    layout: "right",
    description:
      "Série de conteúdos digitais desenvolvida para múltiplas plataformas. Resonância mantém identidade visual coesa enquanto adapta a narrativa para cada formato e audiência.",
  },
  {
    id: "04",
    slug: "metamorfose",
    title: "Metamorfose",
    category: "Produção Cinematográfica",
    year: "2024",
    client: "Festival de Cinema",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80",
    video: SITE_VIDEO_2,
    layout: "offset",
    description:
      "Curta-metragem cinematográfico que investiga temas de mudança e identidade. Metamorfose foi produzido com abordagem autoral, priorizando composição visual e ritmo narrativo.",
  },
  {
    id: "05",
    slug: "fragmentos",
    title: "Fragmentos",
    category: "Audiovisual",
    year: "2024",
    client: "Instituição Cultural",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&q=80",
    video: SITE_VIDEO_1,
    layout: "left",
    description:
      "Documentário visual em formato experimental. Fragmentos entrelaça memória, arquitetura e movimento urbano em uma montagem que questiona a linearidade do tempo.",
  },
];

export type TeamMember = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  image: string;
  bio: string[];
};

export const TEAM: TeamMember[] = [
  {
    id: "01",
    name: "Rafael Mendes",
    firstName: "Rafael",
    lastName: "Mendes",
    role: "Diretor Criativo",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    bio: [
      "Rafael Mendes é diretor criativo e cofundador da TAO Filmes. Com mais de uma década de experiência em produção audiovisual, lidera a visão artística de cada projeto, do conceito à finalização.",
      "Sua abordagem combina narrativa cinematográfica com sensibilidade contemporânea, criando peças que transcendem o formato publicitário tradicional. Já dirigiu campanhas para marcas nacionais e internacionais.",
      "Formado em Cinema pela USP, Rafael acredita que cada frame deve carregar intenção — transformação não como conceito abstrato, mas como experiência visual tangível.",
    ],
  },
  {
    id: "02",
    name: "Camila Rocha",
    firstName: "Camila",
    lastName: "Rocha",
    role: "Produtora Executiva",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    bio: [
      "Camila Rocha é produtora executiva da TAO Filmes, responsável por orquestrar cada etapa da produção com precisão e criatividade. Sua expertise em gestão de projetos complexos garante que visões ambiciosas se tornem realidade.",
      "Com background em produção de entretenimento e publicidade, Camila construiu uma rede de colaboradores que compartilham o mesmo padrão de excelência. Ela é a força operacional por trás de cada transformação.",
      "Acredita que produzir é transformar caos em harmonia — encontrar ordem no movimento constante que define a essência da TAO.",
    ],
  },
  {
    id: "03",
    name: "Lucas Ferreira",
    firstName: "Lucas",
    lastName: "Ferreira",
    role: "Diretor de Fotografia",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    bio: [
      "Lucas Ferreira é diretor de fotografia da TAO Filmes, mestre em luz e composição. Seu olhar técnico e artístico define a identidade visual de cada produção, criando atmosferas que permanecem na memória.",
      "Especialista em câmeras digitais e analógicas, Lucas traz referências do cinema clássico para projetos contemporâneos. Sua paleta monocromática e uso dramático de sombras são assinatura reconhecível.",
      "Para Lucas, fotografar é capturar transformação em tempo real — a luz que muda, o movimento que revela, o instante que nunca se repete.",
    ],
  },
  {
    id: "04",
    name: "Marina Costa",
    firstName: "Marina",
    lastName: "Costa",
    role: "Editora",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    bio: [
      "Marina Costa é editora da TAO Filmes, onde o ritmo e a narrativa ganham forma final. Com formação em montagem cinematográfica, ela transforma horas de material bruto em histórias coesas e impactantes.",
      "Sua sensibilidade para timing e transições elevou dezenas de projetos, de clipes musicais a documentários. Marina entende que editar é o último ato de direção — onde a história realmente nasce.",
      "Cada corte é uma decisão de transformação: o que mostrar, o que esconder, o que permanece.",
    ],
  },
];

export const SERVICES: Service[] = [
  {
    id: "clipes",
    title: "Clipes Musicais",
    description:
      "Narrativas visuais que amplificam a música — ritmo, atmosfera e direção de arte alinhados ao artista.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80",
  },
  {
    id: "publicidade",
    title: "Filmes Publicitários",
    description:
      "Campanhas com linguagem cinematográfica para marcas que querem ser lembradas, não só vistas.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80",
  },
  {
    id: "digital",
    title: "Conteúdo Digital",
    description:
      "Peças ágeis para redes e plataformas, sem abrir mão de intenção estética e storytelling.",
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1600&q=80",
  },
  {
    id: "audiovisual",
    title: "Produções Audiovisuais",
    description:
      "Do briefing à entrega final: direção, fotografia, som e pós-produção em um fluxo único.",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1600&q=80",
  },
  {
    id: "cinema",
    title: "Projetos Cinematográficos",
    description:
      "Curtas, documentários e peças autorais — projetos que pedem tempo, olhar e transformação.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80",
  },
];
