import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import {
  defaultNewsItems,
  defaultTransparencyItems,
  type NewsItem,
  type TransparencyItem,
} from "@/content/siteContent";
import { db } from "@/integrations/firebase/client";
import { normalizePublicAssetUrl } from "@/lib/utils";

const NEWS_STORAGE_KEY = "confebraq.site.news";
const TRANSPARENCY_STORAGE_KEY = "confebraq.site.transparency";
const SITE_CONTENT_UPDATED_EVENT = "confebraq.site.content.updated";
const NEWS_COLLECTION = "siteNews";
const TRANSPARENCY_COLLECTION = "siteTransparency";

type SiteContentSource = "firebase" | "local";

const repairMojibake = (value: string) => {
  if (!/[ÃƒÃ¢Ã‚]/.test(value)) {
    return value;
  }

  try {
    return new TextDecoder("utf-8").decode(
      Uint8Array.from(value, (char) => char.charCodeAt(0)),
    );
  } catch {
    return value;
  }
};

const normalizeTransparencyStatus = (
  status: string,
): TransparencyItem["status"] => {
  const repairedStatus = repairMojibake(status).trim().toLowerCase();

  if (["disponivel", "disponível"].includes(repairedStatus)) {
    return "Disponivel";
  }

  return "Em atualizacao";
};

const normalizeNewsItem = (
  item: Partial<NewsItem>,
  fallbackId: string,
  fallbackSortOrder: number,
): NewsItem | null => {
  const title = repairMojibake(item.title?.trim() || "");
  const summary = repairMojibake(item.summary?.trim() || "");
  const date = item.date?.trim() || "";
  const category = repairMojibake(item.category?.trim() || "");

  if (!title || !summary || !date || !category) {
    return null;
  }

  return {
    id: item.id?.trim() || fallbackId,
    title,
    summary,
    date,
    category,
    image: normalizePublicAssetUrl(item.image?.trim()),
    imagePath: item.imagePath?.trim() || undefined,
    featured: Boolean(item.featured),
    sortOrder:
      Number.isFinite(item.sortOrder) && Number(item.sortOrder) >= 0
        ? Number(item.sortOrder)
        : fallbackSortOrder,
    createdAt: item.createdAt?.trim() || undefined,
    updatedAt: item.updatedAt?.trim() || undefined,
    createdBy: item.createdBy?.trim() || "",
  };
};

const normalizeTransparencyItem = (
  item: Partial<TransparencyItem>,
  fallbackId: string,
  fallbackSortOrder: number,
): TransparencyItem | null => {
  const title = repairMojibake(item.title?.trim() || "");
  const description = repairMojibake(item.description?.trim() || "");
  const period = repairMojibake(item.period?.trim() || "");

  if (!title || !description || !period) {
    return null;
  }

  return {
    id: item.id?.trim() || fallbackId,
    title,
    description,
    period,
    status: normalizeTransparencyStatus(item.status || ""),
    href: item.href?.trim() || undefined,
    hrefPath: item.hrefPath?.trim() || undefined,
    sortOrder:
      Number.isFinite(item.sortOrder) && Number(item.sortOrder) >= 0
        ? Number(item.sortOrder)
        : fallbackSortOrder,
    createdAt: item.createdAt?.trim() || undefined,
    updatedAt: item.updatedAt?.trim() || undefined,
    createdBy: item.createdBy?.trim() || "",
  };
};

const sortNewsItems = (items: NewsItem[]) =>
  [...items].sort((left, right) => {
    const sortOrderDifference = (left.sortOrder ?? 0) - (right.sortOrder ?? 0);

    if (sortOrderDifference !== 0) {
      return sortOrderDifference;
    }

    return right.date.localeCompare(left.date);
  });

const sortTransparencyItems = (items: TransparencyItem[]) =>
  [...items].sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));

const normalizeDefaultNewsItems = () =>
  sortNewsItems(
    defaultNewsItems
      .map((item, index) => normalizeNewsItem(item, item.id, index))
      .filter((item): item is NewsItem => Boolean(item)),
  );

const normalizeDefaultTransparencyItems = () =>
  sortTransparencyItems(
    defaultTransparencyItems
      .map((item, index) => normalizeTransparencyItem(item, item.id, index))
      .filter((item): item is TransparencyItem => Boolean(item)),
  );

const readStoredItems = <T,>(
  key: string,
  fallback: T[],
  normalizeItem: (item: T, index: number) => T | null,
) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    const parsedValue = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) {
      return fallback;
    }

    return parsedValue
      .map((item, index) => normalizeItem(item as T, index))
      .filter((item): item is T => Boolean(item));
  } catch {
    return fallback;
  }
};

const writeStoredItems = <T,>(
  key: string,
  items: T[],
  dispatchUpdateEvent = true,
) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(items));

  if (dispatchUpdateEvent) {
    window.dispatchEvent(new Event(SITE_CONTENT_UPDATED_EVENT));
  }
};

const readLocalNewsItems = () =>
  sortNewsItems(
    readStoredItems(
      NEWS_STORAGE_KEY,
      normalizeDefaultNewsItems(),
      (item, index) =>
        normalizeNewsItem(item as Partial<NewsItem>, (item as NewsItem)?.id ?? "", index),
    ),
  );

const readLocalTransparencyItems = () =>
  sortTransparencyItems(
    readStoredItems(
      TRANSPARENCY_STORAGE_KEY,
      normalizeDefaultTransparencyItems(),
      (item, index) =>
        normalizeTransparencyItem(
          item as Partial<TransparencyItem>,
          (item as TransparencyItem)?.id ?? "",
          index,
        ),
    ),
  );

const normalizePreparedNewsItems = (
  items: NewsItem[],
  currentItems: NewsItem[],
  userId?: string,
) => {
  const now = new Date().toISOString();
  const previousById = new Map(currentItems.map((item) => [item.id, item]));
  const preparedItems = items
    .map((item, index) => {
      const fallbackId = item.id?.trim() || `news-${Date.now()}-${index}`;
      const previousItem = previousById.get(fallbackId);
      const normalizedItem = normalizeNewsItem(item, fallbackId, index);

      if (!normalizedItem) {
        return null;
      }

      return {
        ...normalizedItem,
        sortOrder: index,
        createdAt: previousItem?.createdAt || normalizedItem.createdAt || now,
        updatedAt: now,
        createdBy: previousItem?.createdBy || normalizedItem.createdBy || userId || "",
        imagePath: normalizedItem.imagePath || previousItem?.imagePath,
      };
    })
    .filter((item): item is NewsItem => Boolean(item));

  const featuredId = preparedItems.find((item) => item.featured)?.id;

  return sortNewsItems(
    preparedItems.map((item) =>
      featuredId ? { ...item, featured: item.id === featuredId } : item,
    ),
  );
};

const normalizePreparedTransparencyItems = (
  items: TransparencyItem[],
  currentItems: TransparencyItem[],
  userId?: string,
) => {
  const now = new Date().toISOString();
  const previousById = new Map(currentItems.map((item) => [item.id, item]));

  return sortTransparencyItems(
    items
      .map((item, index) => {
        const fallbackId = item.id?.trim() || `transparency-${Date.now()}-${index}`;
        const previousItem = previousById.get(fallbackId);
        const normalizedItem = normalizeTransparencyItem(item, fallbackId, index);

        if (!normalizedItem) {
          return null;
        }

        return {
          ...normalizedItem,
          sortOrder: index,
          createdAt: previousItem?.createdAt || normalizedItem.createdAt || now,
          updatedAt: now,
          createdBy: previousItem?.createdBy || normalizedItem.createdBy || userId || "",
          hrefPath: normalizedItem.hrefPath || previousItem?.hrefPath,
        };
      })
      .filter((item): item is TransparencyItem => Boolean(item)),
  );
};

const prepareNewsItemForFirestore = (item: NewsItem) => ({
  id: item.id,
  title: item.title,
  summary: item.summary,
  date: item.date,
  category: item.category,
  ...(item.image ? { image: item.image } : {}),
  ...(item.imagePath ? { imagePath: item.imagePath } : {}),
  featured: Boolean(item.featured),
  sortOrder: item.sortOrder ?? 0,
  createdAt: item.createdAt || new Date().toISOString(),
  updatedAt: item.updatedAt || new Date().toISOString(),
  createdBy: item.createdBy || "",
});

const prepareTransparencyItemForFirestore = (item: TransparencyItem) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  period: item.period,
  status: item.status,
  ...(item.href ? { href: item.href } : {}),
  ...(item.hrefPath ? { hrefPath: item.hrefPath } : {}),
  sortOrder: item.sortOrder ?? 0,
  createdAt: item.createdAt || new Date().toISOString(),
  updatedAt: item.updatedAt || new Date().toISOString(),
  createdBy: item.createdBy || "",
});

export const useSiteContent = () => {
  const [newsItems, setNewsState] = useState<NewsItem[]>(() => readLocalNewsItems());
  const [transparencyItems, setTransparencyState] = useState<TransparencyItem[]>(() =>
    readLocalTransparencyItems(),
  );
  const [loading, setLoading] = useState(Boolean(db));
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<SiteContentSource>(db ? "firebase" : "local");

  useEffect(() => {
    const syncLocalContent = () => {
      if (db) {
        return;
      }

      setNewsState(readLocalNewsItems());
      setTransparencyState(readLocalTransparencyItems());
      setSource("local");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", syncLocalContent);
      window.addEventListener(SITE_CONTENT_UPDATED_EVENT, syncLocalContent);
    }

    if (!db) {
      setLoading(false);
      setSource("local");

      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("storage", syncLocalContent);
          window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, syncLocalContent);
        }
      };
    }

    setLoading(true);
    setSource("firebase");

    let newsLoaded = false;
    let transparencyLoaded = false;

    const markNewsLoaded = () => {
      if (newsLoaded) {
        return;
      }

      newsLoaded = true;

      if (transparencyLoaded) {
        setLoading(false);
      }
    };

    const markTransparencyLoaded = () => {
      if (transparencyLoaded) {
        return;
      }

      transparencyLoaded = true;

      if (newsLoaded) {
        setLoading(false);
      }
    };

    const unsubscribeNews = onSnapshot(
      collection(db, NEWS_COLLECTION),
      (snapshot) => {
        const nextItems = sortNewsItems(
          snapshot.docs
            .map((snapshotItem, index) =>
              normalizeNewsItem(
                snapshotItem.data() as Partial<NewsItem>,
                snapshotItem.id,
                index,
              ),
            )
            .filter((item): item is NewsItem => Boolean(item)),
        );

        const normalizedItems = nextItems.length > 0 ? nextItems : normalizeDefaultNewsItems();

        setNewsState(normalizedItems);
        writeStoredItems(NEWS_STORAGE_KEY, normalizedItems, false);
        setError(null);
        setSource("firebase");
        markNewsLoaded();
      },
      (snapshotError) => {
        console.error("Falha ao ler notícias do Firebase:", snapshotError);
        setNewsState(readLocalNewsItems());
        setError("Não foi possível sincronizar as notícias no momento.");
        setSource("local");
        markNewsLoaded();
      },
    );

    const unsubscribeTransparency = onSnapshot(
      collection(db, TRANSPARENCY_COLLECTION),
      (snapshot) => {
        const nextItems = sortTransparencyItems(
          snapshot.docs
            .map((snapshotItem, index) =>
              normalizeTransparencyItem(
                snapshotItem.data() as Partial<TransparencyItem>,
                snapshotItem.id,
                index,
              ),
            )
            .filter((item): item is TransparencyItem => Boolean(item)),
        );

        const normalizedItems =
          nextItems.length > 0 ? nextItems : normalizeDefaultTransparencyItems();

        setTransparencyState(normalizedItems);
        writeStoredItems(TRANSPARENCY_STORAGE_KEY, normalizedItems, false);
        setError(null);
        setSource("firebase");
        markTransparencyLoaded();
      },
      (snapshotError) => {
        console.error("Falha ao ler transparência do Firebase:", snapshotError);
        setTransparencyState(readLocalTransparencyItems());
        setError("Não foi possível sincronizar a transparência no momento.");
        setSource("local");
        markTransparencyLoaded();
      },
    );

    return () => {
      unsubscribeNews();
      unsubscribeTransparency();

      if (typeof window !== "undefined") {
        window.removeEventListener("storage", syncLocalContent);
        window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, syncLocalContent);
      }
    };
  }, []);

  const setNewsItems = async (items: NewsItem[], options?: { userId?: string }) => {
    const nextItems = normalizePreparedNewsItems(items, newsItems, options?.userId);

    if (!db) {
      setNewsState(nextItems);
      writeStoredItems(NEWS_STORAGE_KEY, nextItems);
      setSource("local");
      return nextItems;
    }

    const nextIds = new Set(nextItems.map((item) => item.id));
    const batch = writeBatch(db);

    newsItems.forEach((item) => {
      if (!nextIds.has(item.id)) {
        batch.delete(doc(db, NEWS_COLLECTION, item.id));
      }
    });

    nextItems.forEach((item) => {
      batch.set(doc(db, NEWS_COLLECTION, item.id), prepareNewsItemForFirestore(item), {
        merge: true,
      });
    });

    await batch.commit();
    writeStoredItems(NEWS_STORAGE_KEY, nextItems, false);
    setSource("firebase");
    return nextItems;
  };

  const setTransparencyItems = async (
    items: TransparencyItem[],
    options?: { userId?: string },
  ) => {
    const nextItems = normalizePreparedTransparencyItems(
      items,
      transparencyItems,
      options?.userId,
    );

    if (!db) {
      setTransparencyState(nextItems);
      writeStoredItems(TRANSPARENCY_STORAGE_KEY, nextItems);
      setSource("local");
      return nextItems;
    }

    const nextIds = new Set(nextItems.map((item) => item.id));
    const batch = writeBatch(db);

    transparencyItems.forEach((item) => {
      if (!nextIds.has(item.id)) {
        batch.delete(doc(db, TRANSPARENCY_COLLECTION, item.id));
      }
    });

    nextItems.forEach((item) => {
      batch.set(
        doc(db, TRANSPARENCY_COLLECTION, item.id),
        prepareTransparencyItemForFirestore(item),
        { merge: true },
      );
    });

    await batch.commit();
    writeStoredItems(TRANSPARENCY_STORAGE_KEY, nextItems, false);
    setSource("firebase");

    return nextItems;
  };

  const deleteNewsItem = async (id: string) => {
    const nextItems = newsItems.filter((item) => item.id !== id);
    return setNewsItems(nextItems);
  };

  const deleteTransparencyItem = async (id: string) => {
    const nextItems = transparencyItems.filter((item) => item.id !== id);
    return setTransparencyItems(nextItems);
  };

  const resetSiteContent = async (options?: { userId?: string }) => {
    await Promise.all([
      setNewsItems(normalizeDefaultNewsItems(), options),
      setTransparencyItems(normalizeDefaultTransparencyItems(), options),
    ]);
  };

  const purgeNewsItem = async (id: string) => {
    if (!db) {
      return deleteNewsItem(id);
    }

    await deleteDoc(doc(db, NEWS_COLLECTION, id));
  };

  const purgeTransparencyItem = async (id: string) => {
    if (!db) {
      return deleteTransparencyItem(id);
    }

    await deleteDoc(doc(db, TRANSPARENCY_COLLECTION, id));
  };

  return {
    newsItems,
    transparencyItems,
    loading,
    error,
    source,
    setNewsItems,
    setTransparencyItems,
    deleteNewsItem: db ? purgeNewsItem : deleteNewsItem,
    deleteTransparencyItem: db ? purgeTransparencyItem : deleteTransparencyItem,
    resetSiteContent,
  };
};
