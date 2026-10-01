import { PORTFOLIO_VIDEOS } from "@/lib/portfolio-videos";

const VIDEOS = PORTFOLIO_VIDEOS;

export type HomeWork = {
  slug: string;
  title: string;
  category: string;
  year: string;
  video: string;
  lead: string;
  paragraphs: string[];
};

function work(
  index: number,
  slug: string,
  title: string,
  category: string,
  year: string,
  lead: string,
  paragraphs: string[],
): HomeWork {
  return {
    slug,
    title,
    category,
    year,
    video: VIDEOS[index % VIDEOS.length],
    lead,
    paragraphs,
  };
}

export const HOME_WORKS: HomeWork[] = [
  work(
    0,
    "roadside",
    "Roadside",
    "Longa",
    "2025",
    "Longa-metragem de estrada, filmado entre paisagem aberta e o instante em que a onda fecha.",
    [
      "Roadside é um serviço de direção para longa: roteiro, fotografia e montagem pensados como uma viagem contínua. A câmera fica perto da ação, mas o quadro respira o suficiente para a paisagem entrar na história.",
      "A TAO conduz o projeto do conceito à tela — decupagem, equipe reduzida em locação e uma pós que preserva o grão da luz natural. O resultado é um filme que se sustenta no movimento, sem explicar demais.",
    ],
  ),
  work(
    1,
    "olhar",
    "Olhar",
    "Retrato",
    "2024",
    "Retrato em movimento: o serviço de direção de fotografia para peças em que o rosto é o cenário.",
    [
      "Olhar trata o close como espaço narrativo. Luz, foco e tempo de plano são desenhados para que um gesto pequeno carregue o filme inteiro.",
      "Entregamos direção de fotografia, operação e cor. A peça serve campanha, abertura de marca ou prólogo de um projeto maior — sempre com o mesmo rigor de um set cinematográfico.",
    ],
  ),
  work(
    2,
    "nagano-prefeature",
    "Nagano Prefeature",
    "Esportes",
    "2025",
    "Pré-filme de esporte: a peça que apresenta o atleta antes da competição.",
    [
      "Nagano Prefeature é produção de conteúdo esportivo com linguagem de cinema. Água, corpo e tempo de onda entram no corte como personagem, não como estoque de imagens.",
      "O serviço cobre captação em locação, câmera lenta, som ambiente e uma montagem curta para redes ou para a abertura de um evento. O atleta aparece em ação, sem pose de anúncio.",
    ],
  ),
  work(
    3,
    "alem-do-horizonte",
    "Além do Horizonte",
    "Institucional",
    "2024",
    "Filme institucional para quem precisa mostrar território, gente e propósito no mesmo plano.",
    [
      "Além do Horizonte organiza a história de uma instituição em capítulos visuais: paisagem, ofício e o ponto em que os dois se encontram.",
      "Dirigimos, fotografamos e finalizamos. O filme cabe em site, convenção ou peça de marca, com uma narração enxuta e imagem que não depende de texto na tela.",
    ],
  ),
  work(
    4,
    "nos-bastidores",
    "Nos Bastidores",
    "Documentário",
    "2023",
    "Documentário de processo: o serviço que registra como um trabalho é feito, não só o resultado.",
    [
      "Nos Bastidores acompanha equipe, ferramenta e decisão. A câmera fica no set como testemunha, com acesso combinado e uma ética clara sobre o que entra no corte.",
      "Entregamos um documentário curto ou uma série de capítulos. Serve memória de produção, making of de campanha ou peça para quem contrata e quer ver o método.",
    ],
  ),
  work(
    5,
    "essencia",
    "Essência",
    "Comercial",
    "2022",
    "Comercial de marca construído em torno de um único gesto, não de uma lista de benefícios.",
    [
      "Essência é filme publicitário com duração de cinema e função de anúncio. A promessa da marca aparece na imagem, antes de aparecer na fala.",
      "O serviço inclui conceito, direção, produção e finalização para TV, cinema e digital. Uma peça-mãe e os cortes derivados saem do mesmo material.",
    ],
  ),
  work(
    6,
    "sabores-da-floresta",
    "Sabores da Floresta",
    "Gastronomia",
    "2022",
    "Filme gastronômico: origem, fogo e o tempo entre o ingrediente e o prato.",
    [
      "Sabores da Floresta filma comida como território. Luz baixa, vapor e mão no quadro substituem a foto de cardápio.",
      "Produzimos a peça para restaurante, marca de alimento ou festival. Roteiro curto, captação no local e uma cor que respeita o tom real da cozinha.",
    ],
  ),
  work(
    7,
    "rio-de-encontros",
    "Rio de Encontros",
    "Institucional",
    "2024",
    "Institucional de território: o rio como caminho entre comunidades, trabalho e paisagem.",
    [
      "Rio de Encontros conta uma instituição a partir do lugar onde ela acontece. A câmera segue a água e para nas pessoas que dependem dela.",
      "Dirigimos em campo, com equipe enxuta e um corte que cabe em apresentação, site e sala. O filme explica sem virar relatório.",
    ],
  ),
  work(
    8,
    "liberdade",
    "Liberdade",
    "Campanha",
    "2025",
    "Campanha de imagem: um retrato que sustenta a peça inteira.",
    [
      "Liberdade é direção de campanha para uma ideia simples filmada com precisão. O rosto, a pausa e o corte carregam o discurso.",
      "Entregamos filme hero, versões verticais e stills do mesmo set. A campanha nasce de um plano, não de uma colagem de formatos.",
    ],
  ),
  work(
    9,
    "movimento",
    "Movimento",
    "Esportes",
    "2025",
    "Peça de esporte focada no gesto: repetição, impacto e o corpo em velocidade.",
    [
      "Movimento filma treino e prova como coreografia. O corte segue a respiração do atleta, não o placar.",
      "O serviço inclui câmera em movimento, slow motion e uma montagem ritmada para campanha de marca esportiva ou abertura de evento.",
    ],
  ),
];

export const FEATURE = HOME_WORKS[0];
export const EYE = HOME_WORKS[1];
export const ROW_ONE = HOME_WORKS.slice(2, 6);
export const ROW_TWO = HOME_WORKS.slice(6, 10);

export function getHomeWork(slug: string) {
  return HOME_WORKS.find((item) => item.slug === slug);
}
