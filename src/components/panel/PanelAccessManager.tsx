import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Plus, Save, Trash2, User } from "lucide-react";
import { affiliateEntities } from "@/content/affiliates";
import type { PanelAccessProfile, PanelUserRole } from "@/hooks/useFirebasePanelAuth";
import { usePanelAccess } from "@/hooks/usePanelAccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const sanitizeEmail = (value: string) => value.trim().toLowerCase();

const initialFormState = {
  id: "",
  uid: "",
  email: "",
  displayName: "",
  role: "presidente" as PanelUserRole,
  entitySigla: "",
  active: true,
};

type PanelAccessFormState = typeof initialFormState;

const PanelAccessManager = () => {
  const { profiles, loading, error, savePanelAccess, deletePanelAccess } = usePanelAccess();
  const [formState, setFormState] = useState<PanelAccessFormState>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editingId) {
      setFormState((current) => ({
        ...initialFormState,
        role: current.role,
        entitySigla: current.entitySigla,
      }));
    }
  }, [editingId]);

  const resetForm = () => {
    setEditingId(null);
    setFormState(initialFormState);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.email.trim()) {
      toast({
        title: "E-mail necessario",
        description: "Informe o e-mail do usuario para cadastrar o acesso.",
        variant: "destructive",
      });
      return;
    }

    if (formState.role === "presidente" && !formState.entitySigla) {
      toast({
        title: "Entidade obrigatoria",
        description: "Selecione a entidade estadual para o perfil de presidente.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      await savePanelAccess({
        id: editingId || formState.id,
        uid: formState.uid.trim() || undefined,
        email: sanitizeEmail(formState.email),
        displayName: formState.displayName.trim() || formState.email.trim(),
        role: formState.role,
        entitySigla: formState.role === "presidente" ? formState.entitySigla.trim().toUpperCase() : undefined,
        active: formState.active,
      });

      toast({
        title: editingId ? "Acesso atualizado" : "Acesso criado",
        description: "O perfil de acesso foi salvo no Firestore.",
      });
      resetForm();
    } catch (saveError) {
      toast({
        title: "Falha ao salvar acesso",
        description:
          saveError instanceof Error
            ? saveError.message
            : "Nao foi possivel salvar o perfil de acesso.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (profile: PanelAccessProfile) => {
    setEditingId(profile.id);
    setFormState({
      id: profile.id,
      uid: profile.uid || "",
      email: profile.email,
      displayName: profile.displayName,
      role: profile.role,
      entitySigla: profile.entitySigla || "",
      active: profile.active,
    });
  };

  const handleDelete = async (profileId: string) => {
    if (!confirm("Deseja remover este acesso do Firestore?")) {
      return;
    }

    try {
      await deletePanelAccess(profileId);
      toast({
        title: "Acesso removido",
        description: "O perfil de acesso foi excluido do Firestore.",
      });
      if (editingId === profileId) {
        resetForm();
      }
    } catch (deleteError) {
      toast({
        title: "Falha ao remover acesso",
        description:
          deleteError instanceof Error
            ? deleteError.message
            : "Nao foi possivel excluir o perfil de acesso.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar acessos</CardTitle>
          <CardDescription>
            Cadastre administradores e presidentes de entidade diretamente no Firestore.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail do usuario</label>
                <Input
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="usuario@gmail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome exibido</label>
                <Input
                  value={formState.displayName}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, displayName: event.target.value }))
                  }
                  placeholder="Nome do usuario"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de acesso</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formState.role}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      role: event.target.value as PanelUserRole,
                      entitySigla:
                        event.target.value === "presidente" ? current.entitySigla : "",
                    }))
                  }
                >
                  <option value="admin">Administrador</option>
                  <option value="presidente">Presidente de entidade</option>
                </select>
              </div>

              {formState.role === "presidente" ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Entidade estadual</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formState.entitySigla}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, entitySigla: event.target.value }))
                    }
                    required
                  >
                    <option value="">Selecione a entidade</option>
                    {affiliateEntities.map((entity) => (
                      <option key={entity.sigla} value={entity.sigla}>
                        {entity.uf} - {entity.entity}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium">UID opcional</label>
                  <Input
                    value={formState.uid}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, uid: event.target.value }))
                    }
                    placeholder="UID do Firebase (opcional)"
                  />
                </div>
              )}
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formState.active}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, active: event.target.checked }))
                }
                className="h-4 w-4 rounded border-input"
              />
              Acesso ativo
            </label>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={saving}>
                <Save className="w-4 h-4" />
                {editingId ? "Salvar alteracoes" : "Adicionar acesso"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} disabled={saving}>
                Limpar formulario
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usuários do painel</CardTitle>
          <CardDescription>
            Lista de perfis de acesso salvos no Firestore (ou localmente se o Firebase não estiver configurado).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="text-sm text-muted-foreground">Carregando acessos...</div>
          ) : error ? (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : profiles.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
              Nenhum acesso cadastrado ainda.
            </div>
          ) : (
            <div className="space-y-3">
              {profiles.map((profile) => (
                <div key={profile.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {profile.role === "admin" ? "Administrador" : "Presidente"}
                      </div>
                      <h3 className="font-semibold text-foreground">{profile.displayName || profile.email}</h3>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                      {profile.role === "presidente" && profile.entitySigla ? (
                        <p className="text-sm text-muted-foreground">Entidade: {profile.entitySigla}</p>
                      ) : null}
                      <p className="text-xs text-muted-foreground">{profile.active ? "Ativo" : "Inativo"}</p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Button type="button" size="icon" variant="outline" onClick={() => handleEdit(profile)}>
                        <User className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => void handleDelete(profile.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PanelAccessManager;
