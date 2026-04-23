export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image?: string;
  imagePath?: string;
  featured?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface TransparencyItem {
  id: string;
  title: string;
  description: string;
  period: string;
  status: "Disponivel" | "Em atualizacao";
  href?: string;
  hrefPath?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export const defaultNewsItems: NewsItem[] = [
  {
    id: "calendario-nacional",
    title: "Calendário nacional entra em consolidação para o próximo ciclo junino",
    summary:
      "A CONFEBRAQ segue articulando critérios técnicos, cronograma e alinhamento com as entidades filiadas para fortalecer a organização do circuito nacional.",
    date: "2026-03-18",
    category: "Institucional",
    image: "/noticias/anej.png",
    featured: true,
    sortOrder: 0,
  },
  {
    id: "rede-filiadas",
    title: "Rede de filiadas mantém articulação permanente em 22 unidades federativas",
    summary:
      "O trabalho conjunto entre ligas, federações e associações continua ampliando o intercâmbio cultural e o fortalecimento do movimento junino em todo o país.",
    date: "2026-02-27",
    category: "Articulação",
    sortOrder: 1,
  },
  {
    id: "memoria-e-comunicacao",
    title: "Memória, registro audiovisual e comunicação seguem como frentes prioritárias",
    summary:
      "A entidade reforça a importância de documentar festivais, resultados, trajetórias e boas práticas para preservar a história das quadrilhas juninas brasileiras.",
    date: "2026-01-30",
    category: "Comunicação",
    sortOrder: 2,
  },
];

export const defaultTransparencyItems: TransparencyItem[] = [
  {
    id: "estatuto-social",
    title: "Estatuto social",
    description:
      "Documento-base de organização institucional, competências e diretrizes da entidade.",
    period: "Consulta institucional permanente",
    status: "Em atualizacao",
    sortOrder: 0,
  },
  {
    id: "relatorio-institucional",
    title: "Relatório institucional",
    description:
      "Resumo das principais ações, articulações e frentes de trabalho acompanhadas pela CONFEBRAQ.",
    period: "Exercício vigente",
    status: "Em atualizacao",
    sortOrder: 1,
  },
  {
    id: "prestacao-de-contas",
    title: "Prestação de contas anual",
    description:
      "Área reservada para publicação de demonstrativos, relatórios e arquivos de acompanhamento financeiro.",
    period: "Publicação anual",
    status: "Em atualizacao",
    sortOrder: 2,
  },
];
