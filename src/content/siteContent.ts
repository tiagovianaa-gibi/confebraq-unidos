import heroImage from "@/assets/eita-junino-2025.jpg";

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
    title: "Calendario nacional entra em consolidacao para o proximo ciclo junino",
    summary:
      "A CONFEBRAQ segue articulando criterios tecnicos, cronograma e alinhamento com as entidades filiadas para fortalecer a organizacao do circuito nacional.",
    date: "2026-03-18",
    category: "Institucional",
    image: heroImage,
    featured: true,
    sortOrder: 0,
  },
  {
    id: "rede-filiadas",
    title: "Rede de filiadas mantem articulacao permanente em 22 unidades federativas",
    summary:
      "O trabalho conjunto entre ligas, federacoes e associacoes continua ampliando o intercambio cultural e o fortalecimento do movimento junino em todo o pais.",
    date: "2026-02-27",
    category: "Articulacao",
    sortOrder: 1,
  },
  {
    id: "memoria-e-comunicacao",
    title: "Memoria, registro audiovisual e comunicacao seguem como frentes prioritarias",
    summary:
      "A entidade reforca a importancia de documentar festivais, resultados, trajetorias e boas praticas para preservar a historia das quadrilhas juninas brasileiras.",
    date: "2026-01-30",
    category: "Comunicacao",
    sortOrder: 2,
  },
];

export const defaultTransparencyItems: TransparencyItem[] = [
  {
    id: "estatuto-social",
    title: "Estatuto social",
    description:
      "Documento-base de organizacao institucional, competencias e diretrizes da entidade.",
    period: "Consulta institucional permanente",
    status: "Em atualizacao",
    sortOrder: 0,
  },
  {
    id: "relatorio-institucional",
    title: "Relatorio institucional",
    description:
      "Resumo das principais acoes, articulacoes e frentes de trabalho acompanhadas pela CONFEBRAQ.",
    period: "Exercicio vigente",
    status: "Em atualizacao",
    sortOrder: 1,
  },
  {
    id: "prestacao-de-contas",
    title: "Prestacao de contas anual",
    description:
      "Area reservada para publicacao de demonstrativos, relatorios e arquivos de acompanhamento financeiro.",
    period: "Publicacao anual",
    status: "Em atualizacao",
    sortOrder: 2,
  },
];
