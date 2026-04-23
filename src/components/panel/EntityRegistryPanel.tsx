import { useEffect, useRef, useState, type FormEvent } from "react";
import { Plus, Save, Trash2, Users } from "lucide-react";
import { affiliateEntities } from "@/content/affiliates";
import type { PanelUserRole } from "@/hooks/useFirebasePanelAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createEmptyQuadrilhaEntry,
  useEntityRegistry,
  type QuadrilhaEntry,
} from "@/hooks/useEntityRegistry";
import { toast } from "@/hooks/use-toast";

type EntityRegistryPanelProps = {
  userName: string;
  userEmail: string;
  userRole: PanelUserRole;
  assignedEntitySigla?: string;
};

type EntityRegistryFormState = {
  entitySigla: string;
  presidentName: string;
  presidentEmail: string;
  instagram: string;
  quadrilhas: QuadrilhaEntry[];
};

const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR").format(value);

const createEmptyEntityRegistryForm = (
  userName: string,
  userEmail = "",
  entitySigla = "",
): EntityRegistryFormState => ({
  entitySigla,
  presidentName: userName,
  presidentEmail: userEmail,
  instagram: "",
  quadrilhas: [createEmptyQuadrilhaEntry()],
});

const EntityRegistryPanel = ({
  userName,
  userEmail,
  userRole,
  assignedEntitySigla,
}: EntityRegistryPanelProps) => {
  const initialEntitySigla = userRole === "entity" ? assignedEntitySigla || "" : "";
  const [selectedEntitySigla, setSelectedEntitySigla] = useState(initialEntitySigla);
  const { entityReports, metrics, loading, error, saveEntityReport, myEntityReport, targetEntitySigla } =
    useEntityRegistry({
      accessRole: userRole,
      assignedEntitySigla,
      selectedEntitySigla,
    });
  const [formState, setFormState] = useState<EntityRegistryFormState>(() =>
    createEmptyEntityRegistryForm(userName, userEmail, initialEntitySigla),
  );
  const lastLoadedReportRef = useRef<{ id: string | null; updatedAt: string }>({
    id: null,
    updatedAt: "",
  });
  const isAdmin = userRole === "admin";

  useEffect(() => {
    if (!isAdmin && assignedEntitySigla) {
      setSelectedEntitySigla(assignedEntitySigla);
      setFormState((current) => ({
        ...current,
        entitySigla: assignedEntitySigla,
      }));
    }
  }, [assignedEntitySigla, isAdmin]);

  useEffect(() => {
    if (!myEntityReport) {
      lastLoadedReportRef.current = { id: null, updatedAt: "" };
      setFormState((current) => ({
        ...createEmptyEntityRegistryForm(
          userName,
          current.presidentEmail || userEmail,
          isAdmin ? selectedEntitySigla : assignedEntitySigla || current.entitySigla,
        ),
        presidentName: current.presidentName || userName,
      }));
      return;
    }

    if (
      lastLoadedReportRef.current.id === myEntityReport.id &&
      lastLoadedReportRef.current.updatedAt === myEntityReport.updatedAt
    ) {
      return;
    }

    lastLoadedReportRef.current = {
      id: myEntityReport.id,
      updatedAt: myEntityReport.updatedAt,
    };

    setFormState({
      entitySigla: myEntityReport.entitySigla,
      presidentName: myEntityReport.presidentName || userName,
      presidentEmail: myEntityReport.presidentEmail || userEmail,
      instagram: myEntityReport.instagram || "",
      quadrilhas:
        myEntityReport.quadrilhas.length > 0
          ? myEntityReport.quadrilhas.map((quadrilha) => ({ ...quadrilha }))
          : [createEmptyQuadrilhaEntry()],
    });
  }, [assignedEntitySigla, isAdmin, myEntityReport, selectedEntitySigla, userName]);

  const currentEntityTotals = {
    totalQuadrilhas: formState.quadrilhas.filter(
      (quadrilha) => quadrilha.name.trim() && quadrilha.participants > 0,
    ).length,
    totalQuadrilheiros: formState.quadrilhas.reduce(
      (sum, quadrilha) =>
        quadrilha.name.trim() && quadrilha.participants > 0
          ? sum + quadrilha.participants
          : sum,
      0,
    ),
  };

  const updateQuadrilha = (
    quadrilhaId: string,
    field: "name" | "participants",
    value: string,
  ) => {
    setFormState((current) => ({
      ...current,
      quadrilhas: current.quadrilhas.map((quadrilha) =>
        quadrilha.id === quadrilhaId
          ? {
              ...quadrilha,
              [field]:
                field === "participants"
                  ? Math.max(0, Number.parseInt(value || "0", 10) || 0)
                  : value,
            }
          : quadrilha,
      ),
    }));
  };

  const addQuadrilha = () => {
    setFormState((current) => ({
      ...current,
      quadrilhas: [...current.quadrilhas, createEmptyQuadrilhaEntry()],
    }));
  };

  const removeQuadrilha = (quadrilhaId: string) => {
    setFormState((current) => {
      if (current.quadrilhas.length === 1) {
        return {
          ...current,
          quadrilhas: [createEmptyQuadrilhaEntry()],
        };
      }

      return {
        ...current,
        quadrilhas: current.quadrilhas.filter((quadrilha) => quadrilha.id !== quadrilhaId),
      };
    });
  };

  const handleSaveEntityRegistry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const entitySigla = isAdmin ? formState.entitySigla : assignedEntitySigla || formState.entitySigla;

      await saveEntityReport({
        entitySigla,
        presidentName: formState.presidentName,
        presidentEmail: formState.presidentEmail,
        instagram: formState.instagram,
        quadrilhas: formState.quadrilhas,
      });

      if (isAdmin) {
        setSelectedEntitySigla(entitySigla);
      }

      toast({
        title: "Cadastro da entidade salvo",
        description: "Os totais da página inicial já foram recalculados com este envio.",
      });
    } catch (saveError) {
      toast({
        title: "Falha ao salvar cadastro",
        description:
          saveError instanceof Error
            ? saveError.message
            : "Não foi possível salvar os dados da entidade.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Cadastro da entidade estadual</CardTitle>
          <CardDescription>
            {isAdmin
              ? "Como administrador, você pode revisar e atualizar qualquer entidade estadual."
              : "Seu usuário só pode atualizar a própria entidade, as quadrilhas filiadas e o total de quadrilheiros."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveEntityRegistry} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Entidade estadual</label>
                <select
                  value={formState.entitySigla}
                  onChange={(event) => {
                    const nextEntitySigla = event.target.value;

                    setFormState((current) => ({
                      ...current,
                      entitySigla: nextEntitySigla,
                    }));

                    if (isAdmin) {
                      setSelectedEntitySigla(nextEntitySigla);
                    }
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                  disabled={!isAdmin}
                >
                  <option value="">Selecione a entidade</option>
                  {affiliateEntities.map((entity) => (
                    <option key={entity.sigla} value={entity.sigla}>
                      {entity.uf} - {entity.entity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Responsável pelo cadastro</label>
                <Input
                  value={formState.presidentName}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      presidentName: event.target.value,
                    }))
                  }
                  placeholder="Nome do responsável"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail do responsável</label>
              <Input
                type="email"
                value={formState.presidentEmail}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    presidentEmail: event.target.value,
                  }))
                }
                placeholder="responsavel@entidade.com"
                required
                disabled={userRole !== "admin"}
              />
              {userRole !== "admin" && (
                <p className="text-xs text-muted-foreground">
                  Apenas administradores da CONFEBRAQ podem alterar o e-mail do responsável.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Instagram da entidade</label>
              <Input
                value={formState.instagram}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    instagram: event.target.value,
                  }))
                }
                placeholder="https://instagram.com/entidade ou @entidade"
              />
              <p className="text-xs text-muted-foreground">
                Esse link aparece na página pública da entidade.
              </p>
            </div>

            <div className="space-y-3">
              {formState.quadrilhas.map((quadrilha, index) => (
                <div key={quadrilha.id} className="rounded-lg border border-border p-4">
                  <div className="grid md:grid-cols-[1fr_180px_auto] gap-3 items-end">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Nome da quadrilha {index + 1}
                      </label>
                      <Input
                        value={quadrilha.name}
                        onChange={(event) =>
                          updateQuadrilha(quadrilha.id, "name", event.target.value)
                        }
                        placeholder="Ex.: Arraiá Unidos do Sertão"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quadrilheiros</label>
                      <Input
                        type="number"
                        min={0}
                        value={quadrilha.participants}
                        onChange={(event) =>
                          updateQuadrilha(quadrilha.id, "participants", event.target.value)
                        }
                      />
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeQuadrilha(quadrilha.id)}
                      aria-label={`Remover quadrilha ${index + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <div className="text-sm font-medium text-foreground">Resumo deste cadastro</div>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>{formatNumber(currentEntityTotals.totalQuadrilhas)} quadrilhas filiadas</span>
                <span>{formatNumber(currentEntityTotals.totalQuadrilheiros)} quadrilheiros</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={!formState.entitySigla}>
                <Save className="w-4 h-4" />
                Salvar cadastro
              </Button>
              {myEntityReport?.updatedAt && (
                <span className="text-sm text-muted-foreground self-center">
                  Última atualização: {new Date(myEntityReport.updatedAt).toLocaleString("pt-BR")}
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Totais consolidados</CardTitle>
            <CardDescription>
              Esses números alimentam os destaques da página inicial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Entidades com cadastro
                </div>
                <div className="mt-2 text-2xl font-display font-bold text-primary">
                  {formatNumber(metrics.totalEntitiesWithRegistry)}
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Quadrilhas filiadas
                </div>
                <div className="mt-2 text-2xl font-display font-bold text-primary">
                  {formatNumber(metrics.totalQuadrilhas)}
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Quadrilheiros
                </div>
                <div className="mt-2 text-2xl font-display font-bold text-primary">
                  + de {formatNumber(metrics.totalQuadrilheiros)}
                </div>
              </div>
            </div>

            {loading && (
              <div className="text-sm text-muted-foreground">
                Sincronizando cadastros das entidades...
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Entidades cadastradas
            </CardTitle>
            <CardDescription>
              Lista consolidada dos envios recebidos pelo painel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {entityReports.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                Nenhuma entidade enviou dados ainda.
              </div>
            ) : (
              entityReports.map((report) => {
                const isCurrentEntity = report.entitySigla === targetEntitySigla;

                return (
                  <div
                    key={report.entitySigla}
                    className={`rounded-lg border p-4 ${
                      isCurrentEntity
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground">
                          {report.uf} - {report.entitySigla}
                        </div>
                        <h3 className="font-semibold text-foreground">{report.entityName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Responsável: {report.presidentName || "Não informado"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          E-mail: {report.presidentEmail || "Não informado"}
                        </p>
                      </div>

                      {isCurrentEntity && (
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {isAdmin ? "Em edição" : "Sua entidade"}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-muted px-3 py-1">
                        {formatNumber(report.totalQuadrilhas)} quadrilhas
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1">
                        {formatNumber(report.totalQuadrilheiros)} quadrilheiros
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntityRegistryPanel;
