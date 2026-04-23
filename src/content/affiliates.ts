import { repairMojibakeText } from "@/lib/utils";

export interface AffiliateEntity {
  num: string;
  entity: string;
  sigla: string;
  uf: string;
  instagram?: string;
}

const rawAffiliateEntities: AffiliateEntity[] = [
  { num: "01", entity: "Liga de Quadrilhas Juninas do Acre", sigla: "LIQUAJAC", uf: "AC", instagram: "https://instagram.com/liquajac" },
  { num: "02", entity: "Liga de Quadrilhas Juninas de Alagoas", sigla: "LIQAL", uf: "AL", instagram: "https://instagram.com/liqal" },
  { num: "03", entity: "Liga das Quadrilhas Juninas do Amazonas", sigla: "LIQUAJUAM", uf: "AM", instagram: "https://instagram.com/liquajuam" },
  { num: "04", entity: "Instituto da Educação, Cultura e Ação Social", sigla: "ICA/AP", uf: "AP", instagram: "https://instagram.com/icaap" },
  { num: "05", entity: "Federação Baiana das Quadrilhas Juninas", sigla: "FEBAQ", uf: "BA", instagram: "https://instagram.com/febaq" },
  { num: "06", entity: "Federação das Quadrilhas Juninas do Ceará", sigla: "FEQUAJUCE", uf: "CE", instagram: "https://instagram.com/fequajuce" },
  { num: "07", entity: "Liga Independente das Quadrilhas Juninas do DF e Entorno", sigla: "LINQDFE", uf: "DF", instagram: "https://instagram.com/linqdfe" },
  { num: "08", entity: "Federação de Quadrilhas Juninas do Estado de Goiás", sigla: "FEQUAJUGO", uf: "GO", instagram: "https://instagram.com/fequajugo" },
  { num: "09", entity: "Liga das Quadrilhas Juninas Maranhense", sigla: "LIQUAJUMA", uf: "MA", instagram: "https://instagram.com/liquajuma" },
  { num: "10", entity: "Federação Mato-Grossense de Quadrilhas", sigla: "FMTQ", uf: "MT", instagram: "https://instagram.com/fmtq" },
  { num: "11", entity: "União Junina Mineira", sigla: "UJM", uf: "MG", instagram: "https://instagram.com/ujm" },
  { num: "12", entity: "Federação de Quadrilhas Juninas e Núcleo de Toadas e Folclore do Pará", sigla: "FEQUANTO", uf: "PA", instagram: "https://instagram.com/fequanto" },
  { num: "13", entity: "Federação das Entidades de Quadrilhas Juninas da Paraíba", sigla: "FEQUAJUNEPB", uf: "PB", instagram: "https://instagram.com/fequajunepb" },
  { num: "14", entity: "Federação das Quadrilhas Juninas e Similares de Pernambuco", sigla: "FEQUAJUPE", uf: "PE", instagram: "https://instagram.com/fequajupe" },
  { num: "15", entity: "Federação das Quadrilhas Juninas do Piauí", sigla: "FEQUAJUPI", uf: "PI", instagram: "https://instagram.com/fequajupi" },
  { num: "16", entity: "Associação Cultural Festrilha do Rio de Janeiro", sigla: "FESTRILHA", uf: "RJ", instagram: "https://instagram.com/festrilha" },
  { num: "17", entity: "Liga Independente de Quadrilhas Juninas do Rio Grande do Norte", sigla: "LIQUAJUTERN", uf: "RN", instagram: "https://instagram.com/liquajutern" },
  { num: "18", entity: "Federação de Quadrilhas, Bois-Bumbás e Grupos Folclóricos de Rondônia", sigla: "FEDERON", uf: "RO", instagram: "https://instagram.com/federon" },
  { num: "19", entity: "Federação Roraimense de Quadrilhas Juninas", sigla: "FERQUAJ", uf: "RR", instagram: "https://instagram.com/ferquaj" },
  { num: "20", entity: "Liga das Quadrilhas Juninas de Aracaju e Sergipe", sigla: "LIQUAJUSE", uf: "SE", instagram: "https://instagram.com/liquajuse" },
  { num: "21", entity: "Federação de Quadrilhas Juninas do Tocantins", sigla: "FEQUAJUNTO", uf: "TO", instagram: "https://instagram.com/fequajunto" },
  { num: "22", entity: "União das Quadrilhas Juninas do Estado do Espírito Santo", sigla: "UQJES", uf: "ES", instagram: "https://instagram.com/uqjes" },
];

export const affiliateEntities: AffiliateEntity[] = rawAffiliateEntities.map((entity) => ({
  ...entity,
  entity: repairMojibakeText(entity.entity),
}));

export const affiliateEntityBySigla = Object.fromEntries(
  affiliateEntities.map((entity) => [entity.sigla, entity]),
) as Record<string, AffiliateEntity>;
