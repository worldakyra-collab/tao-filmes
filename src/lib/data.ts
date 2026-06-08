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
  image: string;
};

export type ServiceGridItem = {
  id: string;
  image: string;
  title?: string;
  slug: string;
  gridColumn: string;
  gridRow: string;
};

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-film-reel-close-up-in-the-dark-4077-large.mp4";

export const ABOUT_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-people-watching-a-movie-in-a-cinema-4356-large.mp4";

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
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-a-man-recording-a-video-with-a-professional-camera-34586-large.mp4",
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
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7dbc2?w=1600&q=80",
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
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&q=80",
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
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
  },
  {
    id: "publicidade",
    title: "Filmes Publicitários",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
  },
  {
    id: "digital",
    title: "Conteúdo Digital",
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&q=80",
  },
  {
    id: "audiovisual",
    title: "Produções Audiovisuais",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200&q=80",
  },
  {
    id: "cinema",
    title: "Projetos Cinematográficos",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
  },
];

export const SERVICE_GRID: ServiceGridItem[] = [
  {
    id: "01",
    slug: "eclipse",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    title: "Clipes Musicais",
    gridColumn: "1 / 3",
    gridRow: "1 / 3",
  },
  {
    id: "02",
    slug: "horizonte",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    gridColumn: "1 / 2",
    gridRow: "3 / 5",
  },
  {
    id: "03",
    slug: "ressonancia",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    gridColumn: "2 / 3",
    gridRow: "3 / 5",
  },
  {
    id: "04",
    slug: "horizonte",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
    title: "Filmes Publicitários",
    gridColumn: "3 / 5",
    gridRow: "1 / 5",
  },
  {
    id: "05",
    slug: "metamorfose",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
    title: "Conteúdo Digital",
    gridColumn: "1 / 3",
    gridRow: "5 / 7",
  },
  {
    id: "06",
    slug: "fragmentos",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    gridColumn: "1 / 2",
    gridRow: "7 / 9",
  },
  {
    id: "07",
    slug: "eclipse",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    gridColumn: "2 / 3",
    gridRow: "7 / 9",
  },
  {
    id: "08",
    slug: "ressonancia",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200&q=80",
    title: "Produções Audiovisuais",
    gridColumn: "3 / 5",
    gridRow: "5 / 9",
  },
  {
    id: "09",
    slug: "metamorfose",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    title: "Projetos Cinematográficos",
    gridColumn: "1 / 3",
    gridRow: "9 / 12",
  },
  {
    id: "10",
    slug: "fragmentos",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80",
    gridColumn: "3 / 5",
    gridRow: "9 / 12",
  },
];
