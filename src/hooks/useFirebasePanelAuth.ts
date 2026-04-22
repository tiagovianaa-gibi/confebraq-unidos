import { useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { affiliateEntityBySigla } from "@/content/affiliates";
import {
  auth,
  db,
  googleProvider,
  isFirebaseConfigured,
  missingFirebaseEnvKeys,
} from "@/integrations/firebase/client";

const LOCAL_PANEL_USER_STORAGE_KEY = "confebraq.panel.local-user";
const PANEL_ACCESS_COLLECTION = "panelAccess";

export type PanelUserRole = "admin" | "presidente";

export interface PanelAccessProfile {
  uid: string;
  email: string;
  displayName: string;
  role: PanelUserRole;
  entitySigla?: string;
  active: boolean;
  updatedAt?: string;
}

export interface PanelAuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  provider: "firebase" | "local";
}

const mapFirebaseUser = (user: FirebaseUser): PanelAuthUser => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  provider: "firebase",
});

const isLocalPanelOrigin = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
};

const normalizePanelAccessProfile = (
  rawProfile: Partial<PanelAccessProfile>,
  user: PanelAuthUser,
): PanelAccessProfile | null => {
  const role = rawProfile.role === "admin" || rawProfile.role === "presidente" || rawProfile.role === "entity"
    ? (rawProfile.role === "entity" ? "presidente" : rawProfile.role)
    : null;

  if (!role) {
    return null;
  }

  const entitySigla = rawProfile.entitySigla?.trim().toUpperCase() || undefined;

  if (role === "presidente" && (!entitySigla || !affiliateEntityBySigla[entitySigla])) {
    return null;
  }

  return {
    uid: user.uid,
    email: rawProfile.email?.trim().toLowerCase() || user.email?.toLowerCase() || "",
    displayName: rawProfile.displayName?.trim() || user.displayName || "Usuario do painel",
    role,
    entitySigla: role === "presidente" ? entitySigla : undefined,
    active: rawProfile.active === true,
    updatedAt: rawProfile.updatedAt?.trim() || undefined,
  };
};

const findPanelAccessProfileByEmail = async (
  email: string,
  user: PanelAuthUser,
): Promise<PanelAccessProfile | null> => {
  if (!db) {
    return null;
  }

  const emailQuery = query(
    collection(db, PANEL_ACCESS_COLLECTION),
    where("email", "==", email.trim().toLowerCase()),
  );

  const snapshot = await getDocs(emailQuery);

  if (snapshot.empty) {
    return null;
  }

  const rawProfile = snapshot.docs[0].data() as Partial<PanelAccessProfile>;
  const normalized = normalizePanelAccessProfile(rawProfile, user);

  if (!normalized) {
    return null;
  }

  await setDoc(doc(db, PANEL_ACCESS_COLLECTION, user.uid), normalized, { merge: true });
  return normalized;
};

const readLocalPanelUser = (): PanelAuthUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(LOCAL_PANEL_USER_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<PanelAuthUser>;

    if (!parsedValue.uid || parsedValue.provider !== "local") {
      return null;
    }

    return {
      uid: parsedValue.uid,
      displayName: parsedValue.displayName ?? "Administrador local",
      email: parsedValue.email ?? "painel-local@localhost",
      provider: "local",
    };
  } catch {
    return null;
  }
};

const createLocalPanelUser = (): PanelAuthUser => ({
  uid: "local-panel-user",
  displayName: "Administrador local",
  email: "painel-local@localhost",
  provider: "local",
});

const writeLocalPanelUser = (user: PanelAuthUser | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(LOCAL_PANEL_USER_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(LOCAL_PANEL_USER_STORAGE_KEY, JSON.stringify(user));
};

export const useFirebasePanelAuth = () => {
  const [user, setUser] = useState<PanelAuthUser | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [accessLoaded, setAccessLoaded] = useState(!db);
  const [accessProfile, setAccessProfile] = useState<PanelAccessProfile | null>(null);
  const isLocalAccessEnabled = !isFirebaseConfigured && isLocalPanelOrigin();

  useEffect(() => {
    if (!auth) {
      if (isLocalAccessEnabled) {
        setUser(readLocalPanelUser());
      }

      setAuthLoaded(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser ? mapFirebaseUser(nextUser) : null);
      setAuthLoaded(true);
    });

    return unsubscribe;
  }, [isLocalAccessEnabled]);

  useEffect(() => {
    if (!user) {
      setAccessProfile(null);
      setAccessLoaded(true);
      return;
    }

    if (user.provider === "local") {
      setAccessProfile({
        uid: user.uid,
        email: user.email || "painel-local@localhost",
        displayName: user.displayName || "Administrador local",
        role: "admin",
        active: true,
      });
      setAccessLoaded(true);
      return;
    }

    if (!db) {
      setAccessProfile(null);
      setAccessLoaded(true);
      return;
    }

    setAccessLoaded(false);

    const unsubscribe = onSnapshot(
      doc(db, PANEL_ACCESS_COLLECTION, user.uid),
      async (snapshot) => {
        if (!snapshot.exists()) {
          if (user.email) {
            const foundProfile = await findPanelAccessProfileByEmail(user.email, user);
            setAccessProfile(foundProfile);
            setAccessLoaded(true);
            return;
          }

          setAccessProfile(null);
          setAccessLoaded(true);
          return;
        }

        setAccessProfile(
          normalizePanelAccessProfile(
            snapshot.data() as Partial<PanelAccessProfile>,
            user,
          ),
        );
        setAccessLoaded(true);
      },
      (snapshotError) => {
        console.error("Falha ao carregar o perfil de acesso do painel:", snapshotError);
        setAccessProfile(null);
        setAccessLoaded(true);
      },
    );

    return unsubscribe;
  }, [user]);

  const isAllowedUser = useMemo(() => {
    if (!user) {
      return false;
    }

    if (user.provider === "local") {
      return true;
    }

    return Boolean(accessProfile?.active);
  }, [accessProfile, user]);

  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error("O Firebase Auth ainda nao foi configurado neste projeto.");
    }

    const result = await signInWithPopup(auth, googleProvider);
    return mapFirebaseUser(result.user);
  };

  const signInLocally = async () => {
    if (!isLocalAccessEnabled) {
      throw new Error("O acesso local ao painel so e liberado em localhost sem Firebase configurado.");
    }

    const localUser = createLocalPanelUser();
    writeLocalPanelUser(localUser);
    setUser(localUser);
    return localUser;
  };

  const signOutFromGoogle = async () => {
    if (user?.provider === "local") {
      writeLocalPanelUser(null);
      setUser(null);
      return;
    }

    if (!auth) {
      return;
    }

    await signOut(auth);
  };

  return {
    user,
    accessProfile,
    loading: !authLoaded || !accessLoaded,
    isAllowedUser,
    isFirebaseConfigured,
    isLocalAccessEnabled,
    missingFirebaseEnvKeys,
    signInWithGoogle,
    signInLocally,
    signOutFromGoogle,
    assignedEntitySigla: accessProfile?.role === "presidente" ? accessProfile.entitySigla : undefined,
    userRole: accessProfile?.role ?? (user?.provider === "local" ? "admin" : null),
  };
};
