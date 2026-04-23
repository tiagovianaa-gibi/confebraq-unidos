import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type PublicAssetFolder = "noticias" | "transparencia";

const ENCODING_REPAIRS = new Map<string, string>([
  ["Ã¡", "á"],
  ["Ã¢", "â"],
  ["Ã£", "ã"],
  ["Ã¤", "ä"],
  ["Ã§", "ç"],
  ["Ã©", "é"],
  ["Ãª", "ê"],
  ["Ã­", "í"],
  ["Ã³", "ó"],
  ["Ã´", "ô"],
  ["Ãµ", "õ"],
  ["Ãº", "ú"],
  ["Ã", "Á"],
  ["Ã‚", "Â"],
  ["Ãƒ", "Ã"],
  ["Ã‡", "Ç"],
  ["Ã‰", "É"],
  ["ÃŠ", "Ê"],
  ["Ã“", "Ó"],
  ["Ã”", "Ô"],
  ["Ã•", "Õ"],
  ["Ãš", "Ú"],
  ["Âº", "º"],
  ["Âª", "ª"],
  ["Â ", " "],
  ["â€”", "—"],
  ["â€“", "–"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€¦", "…"],
]);

const COMMON_TEXT_REPAIRS = new Map<string, string>([
  ["Organiza��o", "Organização"],
  ["Confedera��o", "Confederação"],
  ["Presta��o", "Prestação"],
  ["publica��o", "publicação"],
  ["Publica��o", "Publicação"],
  ["articula��o", "articulação"],
  ["Articula��o", "Articulação"],
  ["descri��o", "descrição"],
  ["Descri��o", "Descrição"],
  ["atualiza��o", "atualização"],
  ["Atualiza��o", "Atualização"],
  ["informa��o", "informação"],
  ["Informa��o", "Informação"],
  ["movimenta��o", "movimentação"],
  ["organiza��o", "organização"],
  ["quadrilh�es", "quadrilhões"],
  ["N�", "Nº"],
]);

const applyStringMap = (value: string, replacements: Map<string, string>) => {
  let repairedValue = value;

  for (const [broken, fixed] of replacements.entries()) {
    repairedValue = repairedValue.split(broken).join(fixed);
  }

  return repairedValue;
};

export function repairMojibakeText(value?: string) {
  if (!value) {
    return value ?? "";
  }

  let repairedValue = applyStringMap(value, ENCODING_REPAIRS);
  repairedValue = applyStringMap(repairedValue, COMMON_TEXT_REPAIRS);

  return repairedValue;
}

function extractHostedPublicPath(value: string) {
  const normalizedValue = value.trim().replace(/\\/g, "/");
  const withoutOrigin = normalizedValue.replace(/^https?:\/\/[^/]+/i, "");
  const normalizedWithoutOrigin = withoutOrigin.replace(/^\/+/, "");
  const strippedBuildPrefix = normalizedWithoutOrigin.replace(
    /^(?:\.\/)?(?:dist|public)\//i,
    "",
  );

  if (/^(?:noticias|transparencia)\//i.test(strippedBuildPrefix)) {
    return `/${strippedBuildPrefix}`;
  }

  const publicFolderMatch = strippedBuildPrefix.match(/(?:^|\/)(noticias|transparencia)\/.+$/i);
  if (!publicFolderMatch) {
    return undefined;
  }

  const folderPrefix = `${publicFolderMatch[1].toLowerCase()}/`;
  const folderIndex = strippedBuildPrefix.toLowerCase().indexOf(folderPrefix);

  if (folderIndex < 0) {
    return undefined;
  }

  return `/${strippedBuildPrefix.slice(folderIndex)}`;
}

const mapLegacyLocalAssetUrl = (value: string) => {
  const normalizedValue = value.toLowerCase();

  if (normalizedValue.includes("eita-junino-2025")) {
    return "/noticias/eita-junino-2025.jpg";
  }

  if (normalizedValue.includes("anej")) {
    return "/noticias/anej.png";
  }

  return undefined;
};

export function normalizePublicAssetUrl(
  value?: string,
  defaultFolder: PublicAssetFolder = "noticias",
) {
  if (!value) {
    return undefined;
  }

  const trimmedValue = value.trim().replace(/\\/g, "/");
  if (!trimmedValue) {
    return undefined;
  }

  const hostedPublicPath = extractHostedPublicPath(trimmedValue);
  if (hostedPublicPath) {
    return hostedPublicPath;
  }

  if (
    /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i.test(trimmedValue) ||
    /^\/(?:dist|src)\/assets\//i.test(trimmedValue)
  ) {
    return mapLegacyLocalAssetUrl(trimmedValue);
  }

  if (/^(?:https?:)?\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith("/")) {
    return trimmedValue;
  }

  const normalizedPath = trimmedValue.replace(/^\/+|\/+$/g, "").replace(/\\/g, "/");
  if (/^(?:noticias|transparencia)\//i.test(normalizedPath)) {
    return `/${normalizedPath}`;
  }

  return `/${defaultFolder}/${normalizedPath}`;
}
