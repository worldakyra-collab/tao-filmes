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

export const SITE_MENU_ITEMS = [
  { label: "Início", href: "/inicio" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Teste 2", href: "/teste-2" },
] as const;

/** @deprecated use SITE_MENU_ITEMS — mantido como alias para compatibilidade */
export const NAV_ITEMS = SITE_MENU_ITEMS;

export const PAGE_META = {
  servicos: {
    title: "Serviços",
    subtitle: "O que produzimos",
    number: "02",
    heroImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2000&q=80",
  },
  sobre: {
    title: "Sobre",
    subtitle: "Nossa essência",
    number: "03",
  },
  contato: {
    title: "Contato",
    subtitle: "Vamos conversar",
    number: "05",
  },
} as const;
