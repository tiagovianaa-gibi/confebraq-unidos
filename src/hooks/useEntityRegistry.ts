import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { affiliateEntities, affiliateEntityBySigla } from "@/content/affiliates";
import { db } from "@/integrations/firebase/client";
import type { PanelUserRole } from "@/hooks/useFirebasePanelAuth";

const ENTITY_REPORTS_STORAGE_KEY = "confebraq.site.entity-reports";
const ENTITY_REPORTS_UPDATED_EVENT = "confebraq.site.entity-reports.updated";
const PUBLIC_REPORTS_COLLECTION = "entityReportSummaries";
const PRIVATE_REPORTS_COLLECTION = "entityReports";

export interface QuadrilhaEntry {
  id: string;
  name: string;
  participants: number;
}

export interface EntityReportSummary {
  id: string;
  entitySigla: string;
  entityName: string;
  uf: string;
  presidentName: string;
  presidentEmail: string;
  instagram?: string;
  totalQuadrilhas: number;
  totalQuadrilheiros: number;
  updatedAt: string;
}

export interface EntityReport extends EntityReportSummary {
  quadrilhas: QuadrilhaEntry[];
}

export interface EntityReportInput {
  entitySigla: string;
  presidentName: string;
  presidentEmail: string;
  instagram?: string;
  quadrilhas: QuadrilhaEntry[];
}

const normalizeQuadrilha = (item: Partial<QuadrilhaEntry>, index: number): QuadrilhaEntry => ({
  id: item.id?.trim() || `quadrilha-${index + 1}`,
  name: item.name?.trim() || "",
  participants: Number.isFinite(item.participants)
    ? Math.max(0, Number(item.participants))
    : 0,
});

const normalizeSummary = (
  item: Partial<EntityReportSummary>,
  fallbackId: string,
): EntityReportSummary | null => {
  const entitySigla = item.entitySigla?.trim().toUpperCase() || "";
  const entity = affiliateEntityBySigla[entitySigla];

  if (!entity) {
    return null;
  }

  return {
    id: item.id?.trim() || fallbackId,
    entitySigla,
    entityName: entity.entity,
    uf: entity.uf,
    presidentName: item.presidentName?.trim() || "",
    presidentEmail: item.presidentEmail?.trim().toLowerCase() || "",
    instagram: item.instagram?.trim() || "",
    totalQuadrilhas: Number.isFinite(item.totalQuadrilhas)
      ? Math.max(0, Number(item.totalQuadrilhas))
      : 0,
    totalQuadrilheiros: Number.isFinite(item.totalQuadrilheiros)
      ? Math.max(0, Number(item.totalQuadrilheiros))
      : 0,
    updatedAt: item.updatedAt?.trim() || new Date(0).toISOString(),
  };
};

const normalizeReport = (item: Partial<EntityReport>, fallbackId: string): EntityReport | null => {
  const summary = normalizeSummary(item, fallbackId);

  if (!summary) {
    return null;
  }

  const quadrilhas = Array.isArray(item.quadrilhas)
    ? item.quadrilhas
        .map((quadrilha, index) => normalizeQuadrilha(quadrilha, index))
        .filter((quadrilha) => quadrilha.name && quadrilha.participants > 0)
    : [];

  return {
    ...summary,
    presidentEmail: item.presidentEmail?.trim().toLowerCase() || "",
    quadrilhas,
  };
};

const dedupeEntityReports = <T extends { entitySigla: string; updatedAt: string }>(
  reports: T[],
) => {
  const reportsByEntity = new Map<string, T>();

  reports.forEach((report) => {
    const current = reportsByEntity.get(report.entitySigla);

    if (!current || report.updatedAt.localeCompare(current.updatedAt) >= 0) {
      reportsByEntity.set(report.entitySigla, report);
    }
  });

  return [...reportsByEntity.values()];
};

const sortSummaries = (reports: EntityReportSummary[]) =>
  [...reports].sort((left, right) =>
    left.entityName.localeCompare(right.entityName, "pt-BR"),
  );

const buildSummaryFromReport = (report: EntityReport): EntityReportSummary => ({
  id: report.id,
  entitySigla: report.entitySigla,
  entityName: report.entityName,
  uf: report.uf,
  presidentName: report.presidentName,
  presidentEmail: report.presidentEmail,
  totalQuadrilhas: report.totalQuadrilhas,
  totalQuadrilheiros: report.totalQuadrilheiros,
  updatedAt: report.updatedAt,
});

const buildSummariesFromReports = (reports: EntityReport[]) =>
  sortSummaries(
    dedupeEntityReports(reports).map((report) => buildSummaryFromReport(report)),
  );

const findReportByEntitySigla = (
  reports: EntityReport[],
  entitySigla?: string,
) => {
  if (!entitySigla) {
    return null;
  }

  const normalizedEntitySigla = entitySigla.trim().toUpperCase();

  return dedupeEntityReports(reports).find(
    (report) => report.entitySigla === normalizedEntitySigla,
  ) ?? null;
};

const readLocalReports = () => {
  if (typeof window === "undefined") {
    return [] as EntityReport[];
  }

  try {
    const rawValue = window.localStorage.getItem(ENTITY_REPORTS_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return dedupeEntityReports(
      parsedValue
        .map((item) => normalizeReport(item as Partial<EntityReport>, item?.id ?? ""))
        .filter((item): item is EntityReport => Boolean(item)),
    );
  } catch {
    return [];
  }
};

const readLocalState = (targetEntitySigla?: string) => {
  const reports = readLocalReports();

  return {
    reports,
    summaries: buildSummariesFromReports(reports),
    myReport: findReportByEntitySigla(reports, targetEntitySigla),
  };
};

const writeLocalReports = (reports: EntityReport[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    ENTITY_REPORTS_STORAGE_KEY,
    JSON.stringify(dedupeEntityReports(reports)),
  );
  window.dispatchEvent(new Event(ENTITY_REPORTS_UPDATED_EVENT));
};

const upsertReport = (reports: EntityReport[], nextReport: EntityReport) => {
  const nextReports = reports.filter(
    (report) => report.entitySigla !== nextReport.entitySigla,
  );

  return dedupeEntityReports([...nextReports, nextReport]);
};

export const createEmptyQuadrilhaEntry = (): QuadrilhaEntry => ({
  id: `quadrilha-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name: "",
  participants: 0,
});

export const useEntityRegistry = ({
  accessRole,
  assignedEntitySigla,
  selectedEntitySigla,
}: {
  accessRole: PanelUserRole;
  assignedEntitySigla?: string;
  selectedEntitySigla?: string;
}) => {
  const targetEntitySigla = accessRole === "admin"
    ? selectedEntitySigla?.trim().toUpperCase() || ""
    : assignedEntitySigla?.trim().toUpperCase() || "";
  const initialLocalState = readLocalState(targetEntitySigla);
  const [entityReports, setEntityReports] = useState<EntityReportSummary[]>(
    () => initialLocalState.summaries,
  );
  const [myEntityReport, setMyEntityReport] = useState<EntityReport | null>(
    () => initialLocalState.myReport,
  );
  const [publicLoaded, setPublicLoaded] = useState(!db);
  const [privateLoaded, setPrivateLoaded] = useState(!db || !targetEntitySigla);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncLocalReports = (forceSummariesFromLocal = false) => {
      const nextLocalState = readLocalState(targetEntitySigla);

      if (forceSummariesFromLocal || !db) {
        setEntityReports(nextLocalState.summaries);
      }

      setMyEntityReport(nextLocalState.myReport);
    };

    window.addEventListener("storage", syncLocalReports);
    window.addEventListener(ENTITY_REPORTS_UPDATED_EVENT, syncLocalReports);

    if (!db) {
      setPublicLoaded(true);
      setPrivateLoaded(true);

      return () => {
        window.removeEventListener("storage", syncLocalReports);
        window.removeEventListener(ENTITY_REPORTS_UPDATED_EVENT, syncLocalReports);
      };
    }

    setPublicLoaded(false);
    setPrivateLoaded(!targetEntitySigla);

    const unsubscribePublic = onSnapshot(
      collection(db, PUBLIC_REPORTS_COLLECTION),
      (snapshot) => {
        const nextReports = sortSummaries(
          dedupeEntityReports(
            snapshot.docs
              .map((snapshotItem) =>
                normalizeSummary(
                  snapshotItem.data() as Partial<EntityReportSummary>,
                  snapshotItem.id,
                ),
              )
              .filter((item): item is EntityReportSummary => Boolean(item)),
          ),
        );

        setEntityReports(nextReports);
        setError(null);
        setPublicLoaded(true);
      },
      (snapshotError) => {
        console.error("Falha ao ler os resumos das entidades:", snapshotError);
        syncLocalReports(true);
        setError("Nao foi possivel sincronizar os cadastros das entidades no momento.");
        setPublicLoaded(true);
      },
    );

    let unsubscribePrivate = () => undefined;

    if (targetEntitySigla) {
      const privateSource = accessRole === "admin"
        ? collection(db, PRIVATE_REPORTS_COLLECTION)
        : query(
            collection(db, PRIVATE_REPORTS_COLLECTION),
            where("entitySigla", "==", targetEntitySigla),
          );

      unsubscribePrivate = onSnapshot(
        privateSource,
        (snapshot) => {
          const docs = "docs" in snapshot ? snapshot.docs : [];
          const nextReports = dedupeEntityReports(
            docs
              .map((snapshotItem) =>
                normalizeReport(
                  snapshotItem.data() as Partial<EntityReport>,
                  snapshotItem.id,
                ),
              )
              .filter((item): item is EntityReport => Boolean(item)),
          );

          const nextReport = nextReports.find(
            (report) => report.entitySigla === targetEntitySigla,
          ) ?? null;

          setMyEntityReport(nextReport);

          if (nextReport) {
            writeLocalReports(upsertReport(readLocalReports(), nextReport));
          }

          setError(null);
          setPrivateLoaded(true);
        },
        (snapshotError) => {
          console.error("Falha ao ler o cadastro privado da entidade:", snapshotError);
          syncLocalReports(true);
          setError("Nao foi possivel sincronizar os cadastros das entidades no momento.");
          setPrivateLoaded(true);
        },
      );
    } else {
      setMyEntityReport(null);
      setPrivateLoaded(true);
    }

    return () => {
      unsubscribePublic();
      unsubscribePrivate();
      window.removeEventListener("storage", syncLocalReports);
      window.removeEventListener(ENTITY_REPORTS_UPDATED_EVENT, syncLocalReports);
    };
  }, [accessRole, targetEntitySigla]);

  const metrics = useMemo(() => {
    const totalQuadrilhas = entityReports.reduce(
      (sum, report) => sum + report.totalQuadrilhas,
      0,
    );
    const totalQuadrilheiros = entityReports.reduce(
      (sum, report) => sum + report.totalQuadrilheiros,
      0,
    );

    return {
      totalQuadrilhas,
      totalQuadrilheiros,
      totalEntitiesWithRegistry: entityReports.length,
      totalStatesRepresented: affiliateEntities.length,
    };
  }, [entityReports]);

  const saveEntityReport = async (input: EntityReportInput) => {
    const normalizedEntitySigla = input.entitySigla.trim().toUpperCase();
    const entity = affiliateEntityBySigla[normalizedEntitySigla];

    if (!entity) {
      throw new Error("Selecione a entidade estadual responsavel por este cadastro.");
    }

    if (
      accessRole === "presidente" &&
      assignedEntitySigla &&
      normalizedEntitySigla !== assignedEntitySigla.trim().toUpperCase()
    ) {
      throw new Error("Seu usuario so pode atualizar a propria entidade estadual.");
    }

    const quadrilhas = input.quadrilhas
      .map((quadrilha, index) => normalizeQuadrilha(quadrilha, index))
      .filter((quadrilha) => quadrilha.name && quadrilha.participants > 0);

    if (quadrilhas.length === 0) {
      throw new Error("Cadastre pelo menos uma quadrilha com a quantidade de quadrilheiros.");
    }

    const nextReport: EntityReport = {
      id: normalizedEntitySigla,
      entitySigla: normalizedEntitySigla,
      entityName: entity.entity,
      uf: entity.uf,
      presidentName: input.presidentName.trim(),
      presidentEmail: input.presidentEmail.trim().toLowerCase(),
      quadrilhas,
      totalQuadrilhas: quadrilhas.length,
      totalQuadrilheiros: quadrilhas.reduce(
        (sum, quadrilha) => sum + quadrilha.participants,
        0,
      ),
      updatedAt: new Date().toISOString(),
    };

    const nextSummary = buildSummaryFromReport(nextReport);
    const optimisticReports = upsertReport(readLocalReports(), nextReport);
    setEntityReports((current) =>
      sortSummaries(
        dedupeEntityReports(
          current
            .filter((report) => report.entitySigla !== nextSummary.entitySigla)
            .concat(nextSummary),
        ),
      ),
    );
    setMyEntityReport(nextReport);
    writeLocalReports(optimisticReports);

    if (!db) {
      return nextReport;
    }

    const batch = writeBatch(db);
    batch.set(doc(db, PRIVATE_REPORTS_COLLECTION, normalizedEntitySigla), nextReport, {
      merge: true,
    });
    batch.set(
      doc(db, PUBLIC_REPORTS_COLLECTION, normalizedEntitySigla),
      nextSummary,
      { merge: true },
    );

    await batch.commit();
    return nextReport;
  };

  return {
    entityReports,
    myEntityReport,
    metrics,
    loading: !publicLoaded || !privateLoaded,
    error,
    saveEntityReport,
    targetEntitySigla,
  };
};
