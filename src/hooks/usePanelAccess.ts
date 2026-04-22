import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import type { PanelAccessProfile } from "@/hooks/useFirebasePanelAuth";

const PANEL_ACCESS_COLLECTION = "panelAccess";
const PANEL_ACCESS_STORAGE_KEY = "confebraq.panel.access-list";

const normalizePanelAccessProfile = (
  item: Partial<PanelAccessProfile>,
  fallbackId: string,
): PanelAccessProfile => ({
  id: item.id?.trim() || fallbackId,
  uid: item.uid?.trim() || "",
  email: item.email?.trim().toLowerCase() || "",
  displayName: item.displayName?.trim() || "",
  role: item.role === "admin" || item.role === "presidente" ? item.role : "presidente",
  entitySigla: item.entitySigla?.trim().toUpperCase(),
  active: item.active === true,
  updatedAt: item.updatedAt?.trim() || new Date().toISOString(),
});

const readLocalPanelAccess = (): PanelAccessProfile[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(PANEL_ACCESS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => normalizePanelAccessProfile(item as Partial<PanelAccessProfile>, item?.id || ""))
      .filter((item) => item.email);
  } catch {
    return [];
  }
};

const writeLocalPanelAccess = (items: PanelAccessProfile[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PANEL_ACCESS_STORAGE_KEY, JSON.stringify(items));
};

const makeDocId = (profile: Partial<PanelAccessProfile>) => {
  if (profile.id) {
    return profile.id;
  }

  if (profile.uid) {
    return profile.uid.trim();
  }

  const email = profile.email?.trim().toLowerCase() || "unknown";
  return email.replace(/[^a-z0-9]/g, "_");
};

export const usePanelAccess = () => {
  const [profiles, setProfiles] = useState<PanelAccessProfile[]>(() => readLocalPanelAccess());
  const [loading, setLoading] = useState(!db);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const accessQuery = query(collection(db, PANEL_ACCESS_COLLECTION));
    const unsubscribe = onSnapshot(
      accessQuery,
      (snapshot) => {
        const nextProfiles = snapshot.docs
          .map((docItem) =>
            normalizePanelAccessProfile(docItem.data() as Partial<PanelAccessProfile>, docItem.id),
          )
          .filter((item) => item.email);

        setProfiles(nextProfiles);
        setError(null);
        setLoading(false);
      },
      (snapshotError) => {
        console.error("Falha ao ler acessos do painel:", snapshotError);
        setProfiles(readLocalPanelAccess());
        setError("Nao foi possivel sincronizar os acessos do painel no Firestore.");
        setLoading(false);
      },
    );n
    return () => unsubscribe();
  }, []);

  const savePanelAccess = async (profile: Partial<PanelAccessProfile>) => {
    const normalized: PanelAccessProfile = normalizePanelAccessProfile(profile, makeDocId(profile));
    const nextProfiles = [normalized, ...profiles.filter((item) => item.id !== normalized.id)];

    if (!db) {
      writeLocalPanelAccess(nextProfiles);
      setProfiles(nextProfiles);
      return normalized;
    }

    await setDoc(doc(db, PANEL_ACCESS_COLLECTION, normalized.id), normalized, {
      merge: true,
    });

    return normalized;
  };

  const deletePanelAccess = async (profileId: string) => {
    if (!db) {
      const nextProfiles = profiles.filter((item) => item.id !== profileId);
      writeLocalPanelAccess(nextProfiles);
      setProfiles(nextProfiles);
      return;
    }

    await deleteDoc(doc(db, PANEL_ACCESS_COLLECTION, profileId));
  };

  return {
    profiles,
    loading,
    error,
    savePanelAccess,
    deletePanelAccess,
  };
};
