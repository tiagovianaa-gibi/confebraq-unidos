import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function normalizePublicAssetUrl(value?: string) {
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
  if (/^noticias\//i.test(normalizedPath)) {
    return `/${normalizedPath}`;
  }

  return `/noticias/${normalizedPath}`;
}
