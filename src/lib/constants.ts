export const BRAND = {
  name: "TAO Filmes",
  tagline: "Transformação em movimento",
  email: "contato@toafilmes.com",
  instagram: "https://instagram.com/toafilmes",
  vimeo: "https://vimeo.com/toafilmes",
} as const;

export const COLORS = {
  black: "#0A0A0A",
  white: "#F5F5F0",
  green: "#3D6B4F",
  blue: "#2A4A6B",
} as const;

export const NAV_ITEMS = [
  { label: "Portfólio", href: "/portfolio" },
  { label: "Serviços", href: "/servicos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Equipe", href: "/equipe" },
  { label: "Contato", href: "/contato" },
] as const;

export const PAGE_META = {
  portfolio: {
    title: "Portfólio",
    subtitle: "Projetos em destaque",
    number: "01",
  },
  servicos: {
    title: "Serviços",
    subtitle: "O que produzimos",
    number: "02",
  },
  sobre: {
    title: "Sobre",
    subtitle: "Nossa essência",
    number: "03",
  },
  equipe: {
    title: "Equipe",
    subtitle: "Quem faz acontecer",
    number: "04",
  },
  contato: {
    title: "Contato",
    subtitle: "Vamos conversar",
    number: "05",
  },
} as const;
