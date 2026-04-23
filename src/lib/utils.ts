import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizePublicAssetUrl(value?: string) {
  if (!value) {
    return undefined;
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return undefined;
  }

  if (/^(?:https?:)?\/\//i.test(trimmedValue) || trimmedValue.startsWith("/")) {
    return trimmedValue;
  }

  const normalizedPath = trimmedValue.replace(/^\/+|\/+$/g, "").replace(/\\/g, "/");
  if (/^noticias\//i.test(normalizedPath)) {
    return `/${normalizedPath}`;
  }

  return `/noticias/${normalizedPath}`;
}
