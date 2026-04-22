import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Newspaper,
  Pencil,
  RotateCcw,
  Save,
  Trash2,
  Upload,
  User,
  Users,
} from "lucide-react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type { NewsItem, TransparencyItem } from "@/content/siteContent";
import { storage } from "@/integrations/firebase/client";
import type { PanelUserRole } from "@/hooks/useFirebasePanelAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EntityRegistryPanel from "@/components/panel/EntityRegistryPanel";
import PanelAccessManager from "@/components/panel/PanelAccessManager";
import { useSiteContent } from "@/hooks/useSiteContent";
import { toast } from "@/hooks/use-toast";

type NewsFormState = {
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
};

type TransparencyFormState = {
  title: string;
  description: string;
  period: string;
  status: TransparencyItem["status"];
  href: string;
};

type PanelWorkspaceProps = {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: PanelUserRole;
  assignedEntitySigla?: string;
  onSignOut: () => Promise<void>;
};

const createEmptyNewsForm = (): NewsFormState => ({
  title: "",
  summary: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Institucional",
  image: "",
  featured: false,
});

const createEmptyTransparencyForm = (): TransparencyFormState => ({
  title: "",
  description: "",
  period: "",
  status: "Em atualizacao",
  href: "",
});

const sanitizeFileName = (fileName: string) =>
  fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

const uploadSiteFile = async (
  folder: "news" | "transparency",
  ownerId: string,
  file: File,
) => {
  if (!storage) {
    throw new Error("O Firebase Storage nao esta configurado neste projeto.");
  }

  const safeFileName = sanitizeFileName(file.name || "arquivo");
  const filePath = `site/${folder}/${ownerId}/${Date.now()}-${safeFileName}`;
  const storageRef = ref(storage, filePath);

  await uploadBytes(storageRef, file, file.type ? { contentType: file.type } : undefined);
  const downloadUrl = await getDownloadURL(storageRef);

  return {
    url: downloadUrl,
    path: filePath,
  };
};

const removeStoredFile = async (filePath?: string) => {
  if (!storage || !filePath) {
    return;
  }

  try {
    await deleteObject(ref(storage, filePath));
  } catch (error) {
    console.error("Falha ao remover arquivo antigo do Storage:", error);
  }
};

const PanelWorkspace = ({
  userId,
  userName,
  userEmail,
  userRole,
  assignedEntitySigla,
  onSignOut,
}: PanelWorkspaceProps) => {
  const {
    newsItems,
    transparencyItems,
    loading,
    error,
    source,
    setNewsItems,
    setTransparencyItems,
    deleteNewsItem,
    deleteTransparencyItem,
    resetSiteContent,
  } = useSiteContent();
  const isAdmin = userRole === "admin";
  const [activeTab, setActiveTab] = useState<"news" | "transparency" | "entityRegistry" | "panelAccess">(
    isAdmin ? "news" : "entityRegistry",
  );
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [editingTransparencyId, setEditingTransparencyId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState<NewsFormState>(createEmptyNewsForm);
  const [transparencyForm, setTransparencyForm] = useState<TransparencyFormState>(
    createEmptyTransparencyForm,
  );
  const [newsImageFile, setNewsImageFile] = useState<File | null>(null);
  const [transparencyFile, setTransparencyFile] = useState<File | null>(null);
  const [newsUploadInputKey, setNewsUploadInputKey] = useState(0);
  const [transparencyUploadInputKey, setTransparencyUploadInputKey] = useState(0);
  const [savingNews, setSavingNews] = useState(false);
  const [savingTransparency, setSavingTransparency] = useState(false);
  const [restoringDefaults, setRestoringDefaults] = useState(false);

  const sourceLabel = source === "firebase" ? "Firebase" : "armazenamento local";
  const isBusy = loading || savingNews || savingTransparency || restoringDefaults;

  useEffect(() => {
    if (!isAdmin) {
      setActiveTab("entityRegistry");
    }
  }, [isAdmin]);

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsForm(createEmptyNewsForm());
    setNewsImageFile(null);
    setNewsUploadInputKey((current) => current + 1);
  };

  const resetTransparencyForm = () => {
    setEditingTransparencyId(null);
    setTransparencyForm(createEmptyTransparencyForm());
    setTransparencyFile(null);
    setTransparencyUploadInputKey((current) => current + 1);
  };

  const handleSelectNewsImage = (event: ChangeEvent<HTMLInputElement>) => {
    setNewsImageFile(event.target.files?.[0] ?? null);
  };

  const handleSelectTransparencyFile = (event: ChangeEvent<HTMLInputElement>) => {
    setTransparencyFile(event.target.files?.[0] ?? null);
  };

  const handleSaveNews = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAdmin) {
      toast({
        title: "Acesso restrito",
        description: "Somente administradores da CONFEBRAQ podem editar noticias.",
        variant: "destructive",
      });
      return;
    }

    setSavingNews(true);

    const currentItem = editingNewsId
      ? newsItems.find((item) => item.id === editingNewsId) ?? null
      : null;

    let uploadedImagePath: string | undefined;
    let nextImageUrl = newsForm.image.trim() || undefined;
    let nextImagePath = currentItem?.imagePath;

    try {
      if (newsImageFile) {
        const uploadResult = await uploadSiteFile("news", userId, newsImageFile);
        nextImageUrl = uploadResult.url;
        nextImagePath = uploadResult.path;
        uploadedImagePath = uploadResult.path;
      } else if (!nextImageUrl) {
        nextImagePath = undefined;
      }

      const nextItem: NewsItem = {
        id: editingNewsId ?? `news-${Date.now()}`,
        title: newsForm.title.trim(),
        summary: newsForm.summary.trim(),
        date: newsForm.date,
        category: newsForm.category.trim(),
        image: nextImageUrl,
        imagePath: nextImagePath,
        featured: newsForm.featured,
        createdBy: currentItem?.createdBy || userId,
      };

      const baseItems = editingNewsId
        ? newsItems.map((item) => (item.id === editingNewsId ? nextItem : item))
        : [nextItem, ...newsItems];

      const nextItems = nextItem.featured
        ? baseItems.map((item) =>
            item.id === nextItem.id ? item : { ...item, featured: false },
          )
        : baseItems;

      await setNewsItems(nextItems, { userId });

      if (currentItem?.imagePath && currentItem.imagePath !== nextImagePath) {
        await removeStoredFile(currentItem.imagePath);
      }

      resetNewsForm();
      toast({
        title: editingNewsId ? "Noticia atualizada" : "Noticia criada",
        description:
          source === "firebase"
            ? "O conteudo ja esta sincronizado no Firebase."
            : "O conteudo foi salvo neste navegador.",
      });
    } catch (saveError) {
      if (uploadedImagePath && uploadedImagePath !== currentItem?.imagePath) {
        await removeStoredFile(uploadedImagePath);
      }

      toast({
        title: "Falha ao salvar noticia",
        description:
          saveError instanceof Error
            ? saveError.message
            : "Nao foi possivel salvar a noticia.",
        variant: "destructive",
      });
    } finally {
      setSavingNews(false);
    }
  };

  const handleSaveTransparency = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAdmin) {
      toast({
        title: "Acesso restrito",
        description: "Somente administradores da CONFEBRAQ podem editar a transparencia.",
        variant: "destructive",
      });
      return;
    }

    setSavingTransparency(true);

    const currentItem = editingTransparencyId
      ? transparencyItems.find((item) => item.id === editingTransparencyId) ?? null
      : null;

    let uploadedFilePath: string | undefined;
    let nextHref = transparencyForm.href.trim() || undefined;
    let nextHrefPath = currentItem?.hrefPath;

    try {
      if (transparencyFile) {
        const uploadResult = await uploadSiteFile("transparency", userId, transparencyFile);
        nextHref = uploadResult.url;
        nextHrefPath = uploadResult.path;
        uploadedFilePath = uploadResult.path;
      } else if (!nextHref) {
        nextHrefPath = undefined;
      }

      const nextItem: TransparencyItem = {
        id: editingTransparencyId ?? `transparency-${Date.now()}`,
        title: transparencyForm.title.trim(),
        description: transparencyForm.description.trim(),
        period: transparencyForm.period.trim(),
        status: transparencyForm.status,
        href: nextHref,
        hrefPath: nextHrefPath,
        createdBy: currentItem?.createdBy || userId,
      };

      const nextItems = editingTransparencyId
        ? transparencyItems.map((item) =>
            item.id === editingTransparencyId ? nextItem : item,
          )
        : [nextItem, ...transparencyItems];

      await setTransparencyItems(nextItems, { userId });

      if (currentItem?.hrefPath && currentItem.hrefPath !== nextHrefPath) {
        await removeStoredFile(currentItem.hrefPath);
      }

      resetTransparencyForm();
      toast({
        title: editingTransparencyId ? "Item atualizado" : "Item criado",
        description:
          source === "firebase"
            ? "A area de transparencia ja esta sincronizada no Firebase."
            : "O item foi salvo neste navegador.",
      });
    } catch (saveError) {
      if (uploadedFilePath && uploadedFilePath !== currentItem?.hrefPath) {
        await removeStoredFile(uploadedFilePath);
      }

      toast({
        title: "Falha ao salvar item",
        description:
          saveError instanceof Error
            ? saveError.message
            : "Nao foi possivel salvar o item de transparencia.",
        variant: "destructive",
      });
    } finally {
      setSavingTransparency(false);
    }
  };

  const editNews = (item: NewsItem) => {
    setActiveTab("news");
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title,
      summary: item.summary,
      date: item.date,
      category: item.category,
      image: item.image ?? "",
      featured: Boolean(item.featured),
    });
    setNewsImageFile(null);
    setNewsUploadInputKey((current) => current + 1);
  };

  const editTransparency = (item: TransparencyItem) => {
    setActiveTab("transparency");
    setEditingTransparencyId(item.id);
    setTransparencyForm({
      title: item.title,
      description: item.description,
      period: item.period,
      status: item.status,
      href: item.href ?? "",
    });
    setTransparencyFile(null);
    setTransparencyUploadInputKey((current) => current + 1);
  };

  const handleDeleteNews = async (id: string) => {
    if (!isAdmin) {
      return;
    }

    const currentItem = newsItems.find((item) => item.id === id);

    try {
      await deleteNewsItem(id);

      if (currentItem?.imagePath) {
        await removeStoredFile(currentItem.imagePath);
      }

      if (editingNewsId === id) {
        resetNewsForm();
      }

      toast({
        title: "Noticia removida",
        description:
          source === "firebase"
            ? "O item foi excluido do Firebase."
            : "O item foi excluido deste navegador.",
      });
    } catch (deleteError) {
      toast({
        title: "Falha ao remover noticia",
        description:
          deleteError instanceof Error
            ? deleteError.message
            : "Nao foi possivel excluir a noticia.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTransparency = async (id: string) => {
    if (!isAdmin) {
      return;
    }

    const currentItem = transparencyItems.find((item) => item.id === id);

    try {
      await deleteTransparencyItem(id);

      if (currentItem?.hrefPath) {
        await removeStoredFile(currentItem.hrefPath);
      }

      if (editingTransparencyId === id) {
        resetTransparencyForm();
      }

      toast({
        title: "Item removido",
        description:
          source === "firebase"
            ? "O item foi excluido do Firebase."
            : "O item foi excluido deste navegador.",
      });
    } catch (deleteError) {
      toast({
        title: "Falha ao remover item",
        description:
          deleteError instanceof Error
            ? deleteError.message
            : "Nao foi possivel excluir o item de transparencia.",
        variant: "destructive",
      });
    }
  };

  const handleRestoreDefaults = async () => {
    if (!isAdmin) {
      return;
    }

    setRestoringDefaults(true);

    const currentNewsFiles = newsItems.map((item) => item.imagePath).filter(Boolean);
    const currentTransparencyFiles = transparencyItems
      .map((item) => item.hrefPath)
      .filter(Boolean);

    try {
      await resetSiteContent({ userId });
      await Promise.all([
        ...currentNewsFiles.map((filePath) => removeStoredFile(filePath)),
        ...currentTransparencyFiles.map((filePath) => removeStoredFile(filePath)),
      ]);

      resetNewsForm();
      resetTransparencyForm();
      toast({
        title: "Conteudo editorial restaurado",
        description:
          source === "firebase"
            ? "Noticias e transparencia voltaram ao padrao no Firebase."
            : "Noticias e transparencia voltaram ao padrao neste navegador.",
      });
    } catch (restoreError) {
      toast({
        title: "Falha ao restaurar padrao",
        description:
          restoreError instanceof Error
            ? restoreError.message
            : "Nao foi possivel restaurar o conteudo editorial.",
        variant: "destructive",
      });
    } finally {
      setRestoringDefaults(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-primary text-primary-foreground border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
                  CONFEBRAQ
                </div>
                <h1 className="font-display text-2xl font-bold">Painel do site</h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao site
                </Link>
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  onClick={() => void handleRestoreDefaults()}
                  disabled={isBusy}
                >
                  {restoringDefaults ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RotateCcw className="w-4 h-4" />
                  )}
                  Restaurar padrao
                </Button>
              )}
              <Button
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                onClick={() => void onSignOut()}
                disabled={isBusy}
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>

          <div className="text-sm text-primary-foreground/75">
            Conectado como <span className="font-semibold text-primary-foreground">{userName}</span>
            {" "}({userEmail})
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="rounded-xl border border-junina-yellow/30 bg-junina-yellow/15 p-5">
          <p className="text-sm text-foreground leading-relaxed">
            {isAdmin
              ? (
                <>
                  Voce esta com perfil de administrador. Noticias e Transparencia usam
                  {" "}<span className="font-semibold">{sourceLabel}</span>, e os acessos e entidades seguem no Firestore.
                </>
              )
              : (
                <>
                  Voce esta com perfil de entidade
                  {assignedEntitySigla ? <> para <span className="font-semibold">{assignedEntitySigla}</span></> : null}.
                  Seu acesso fica restrito ao cadastro da propria entidade estadual.
                </>
              )}
          </p>
        </div>

        {isAdmin && (loading || error) && (
          <div className="space-y-3">
            {loading && (
              <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                Sincronizando conteudo editorial...
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="flex flex-wrap gap-3">
            <Button variant={activeTab === "news" ? "default" : "outline"} onClick={() => setActiveTab("news")}>
              <Newspaper className="w-4 h-4" />
              Noticias
            </Button>
            <Button
              variant={activeTab === "transparency" ? "default" : "outline"}
              onClick={() => setActiveTab("transparency")}
            >
              <FileText className="w-4 h-4" />
              Transparencia
            </Button>
            <Button
              variant={activeTab === "entityRegistry" ? "default" : "outline"}
              onClick={() => setActiveTab("entityRegistry")}
            >
              <Users className="w-4 h-4" />
              Entidades
            </Button>
            <Button
              variant={activeTab === "panelAccess" ? "default" : "outline"}
              onClick={() => setActiveTab("panelAccess")}
            >
              <User className="w-4 h-4" />
              Acessos
            </Button>
          </div>
        )}

        {activeTab === "entityRegistry" || !isAdmin ? (
          <EntityRegistryPanel
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
            assignedEntitySigla={assignedEntitySigla}
          />
        ) : activeTab === "panelAccess" ? (
          <PanelAccessManager />
        ) : activeTab === "news" ? (
          <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingNewsId ? "Editar noticia" : "Nova noticia"}</CardTitle>
                <CardDescription>
                  Cadastre noticias para a home e envie uma foto para o Firebase Storage, se quiser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveNews} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titulo</label>
                    <Input
                      value={newsForm.title}
                      onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Data</label>
                      <Input
                        type="date"
                        value={newsForm.date}
                        onChange={(event) => setNewsForm({ ...newsForm, date: event.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Categoria</label>
                      <Input
                        value={newsForm.category}
                        onChange={(event) => setNewsForm({ ...newsForm, category: event.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Resumo</label>
                    <Textarea
                      value={newsForm.summary}
                      onChange={(event) => setNewsForm({ ...newsForm, summary: event.target.value })}
                      className="min-h-[140px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL da imagem</label>
                    <Input
                      placeholder="https://..."
                      value={newsForm.image}
                      onChange={(event) => setNewsForm({ ...newsForm, image: event.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload de imagem</label>
                    <Input
                      key={newsUploadInputKey}
                      type="file"
                      accept="image/*"
                      onChange={handleSelectNewsImage}
                      disabled={!storage}
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5" />
                      {newsImageFile
                        ? `Arquivo selecionado: ${newsImageFile.name}`
                        : "Se voce enviar um arquivo, ele substitui a URL acima."}
                    </p>
                  </div>

                  <label className="flex items-center gap-3 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={newsForm.featured}
                      onChange={(event) => setNewsForm({ ...newsForm, featured: event.target.checked })}
                      className="h-4 w-4 rounded border-input"
                    />
                    Destacar esta noticia na grade principal
                  </label>

                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" disabled={savingNews}>
                      {savingNews ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {editingNewsId ? "Salvar alteracoes" : "Adicionar noticia"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetNewsForm} disabled={savingNews}>
                      Limpar formulario
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Noticias cadastradas</CardTitle>
                <CardDescription>
                  {newsItems.length} item(ns) sincronizado(s) em {sourceLabel}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {newsItems.map((item) => (
                  <div key={item.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                          {item.category} | {item.date}
                        </div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.featured && (
                            <span className="inline-flex text-xs font-semibold rounded-full bg-secondary/20 text-primary px-3 py-1">
                              Destaque principal
                            </span>
                          )}
                          {item.image && (
                            <span className="inline-flex text-xs font-semibold rounded-full bg-primary/10 text-primary px-3 py-1">
                              Com imagem
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Button type="button" size="icon" variant="outline" onClick={() => editNews(item)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => void handleDeleteNews(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingTransparencyId ? "Editar item" : "Novo item de transparencia"}</CardTitle>
                <CardDescription>
                  Cadastre documentos, avisos e links publicados na secao de transparencia.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveTransparency} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titulo</label>
                    <Input
                      value={transparencyForm.title}
                      onChange={(event) =>
                        setTransparencyForm({ ...transparencyForm, title: event.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Periodo</label>
                      <Input
                        value={transparencyForm.period}
                        onChange={(event) =>
                          setTransparencyForm({ ...transparencyForm, period: event.target.value })
                        }
                        placeholder="Exercicio 2026"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <select
                        value={transparencyForm.status}
                        onChange={(event) =>
                          setTransparencyForm({
                            ...transparencyForm,
                            status: event.target.value as TransparencyItem["status"],
                          })
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="Disponivel">Disponivel</option>
                        <option value="Em atualizacao">Em atualizacao</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descricao</label>
                    <Textarea
                      value={transparencyForm.description}
                      onChange={(event) =>
                        setTransparencyForm({
                          ...transparencyForm,
                          description: event.target.value,
                        })
                      }
                      className="min-h-[140px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Link externo</label>
                    <Input
                      placeholder="https://... ou /arquivo.pdf"
                      value={transparencyForm.href}
                      onChange={(event) =>
                        setTransparencyForm({ ...transparencyForm, href: event.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload de arquivo</label>
                    <Input
                      key={transparencyUploadInputKey}
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
                      onChange={handleSelectTransparencyFile}
                      disabled={!storage}
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5" />
                      {transparencyFile
                        ? `Arquivo selecionado: ${transparencyFile.name}`
                        : "Se voce enviar um arquivo, ele substitui o link acima."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" disabled={savingTransparency}>
                      {savingTransparency ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {editingTransparencyId ? "Salvar alteracoes" : "Adicionar item"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetTransparencyForm}
                      disabled={savingTransparency}
                    >
                      Limpar formulario
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Itens cadastrados</CardTitle>
                <CardDescription>
                  {transparencyItems.length} item(ns) sincronizado(s) em {sourceLabel}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {transparencyItems.map((item) => (
                  <div key={item.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                          {item.period}
                        </div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="inline-flex text-xs font-semibold rounded-full bg-muted px-3 py-1">
                            {item.status}
                          </span>
                          {item.href && (
                            <span className="inline-flex text-xs font-semibold rounded-full bg-primary/10 text-primary px-3 py-1">
                              Com arquivo
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() => editTransparency(item)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() => void handleDeleteTransparency(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default PanelWorkspace;
