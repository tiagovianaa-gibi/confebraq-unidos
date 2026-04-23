import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Instagram, MapPinned, Users } from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { useEntityRegistry } from "@/hooks/useEntityRegistry";
import { affiliateEntityBySigla } from "@/content/affiliates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formatNumber = (value: number) => new Intl.NumberFormat("pt-BR").format(value);

const EntityPage = () => {
  const { sigla } = useParams<{ sigla: string }>();
  const normalizedSigla = sigla?.trim().toUpperCase() || "";
  const entity = normalizedSigla ? affiliateEntityBySigla[normalizedSigla] : null;
  const { entityReports } = useEntityRegistry();

  if (!entity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
        <Header />
        <main className="container mx-auto flex min-h-screen items-center justify-center px-4 pt-28 pb-12">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Entidade não encontrada</CardTitle>
              <CardDescription>
                A sigla informada não corresponde a uma entidade cadastrada na CONFEBRAQ.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao início
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <FooterSection />
      </div>
    );
  }

  const entitySummary =
    entityReports.find((report) => report.entitySigla === entity.sigla) || null;
  const instagramUrl = entitySummary?.instagram || entity.instagram || "";
  const hasPublishedData = Boolean(entitySummary);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <Header />

      <main className="container mx-auto px-4 pt-28 pb-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <div>
            <Button variant="ghost" asChild>
              <Link to="/#filiadas">
                <ArrowLeft className="w-4 h-4" />
                Voltar às filiadas
              </Link>
            </Button>
          </div>

          <Card className="overflow-hidden border-primary/10">
            <CardHeader className="bg-primary text-primary-foreground">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{entity.uf}</Badge>
                    <Badge variant="secondary">{entity.sigla}</Badge>
                    {hasPublishedData && (
                      <Badge variant="secondary">Dados enviados pelo painel</Badge>
                    )}
                  </div>
                  <CardTitle className="font-display text-3xl">{entity.entity}</CardTitle>
                  <CardDescription className="max-w-2xl text-primary-foreground/80">
                    Página pública da entidade estadual com os dados enviados pelo presidente no
                    painel da CONFEBRAQ.
                  </CardDescription>
                </div>

                {instagramUrl ? (
                  <Button asChild variant="secondary" className="shrink-0 self-start">
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-4 h-4" />
                      Instagram da entidade
                    </a>
                  </Button>
                ) : null}
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPinned className="w-4 h-4" />
                    Quadrilhas filiadas
                  </div>
                  <div className="mt-3 text-3xl font-display font-bold text-primary">
                    {formatNumber(entitySummary?.totalQuadrilhas || 0)}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Quadrilheiros
                  </div>
                  <div className="mt-3 text-3xl font-display font-bold text-primary">
                    {formatNumber(entitySummary?.totalQuadrilheiros || 0)}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    Última atualização
                  </div>
                  <div className="mt-3 text-lg font-semibold text-foreground">
                    {entitySummary?.updatedAt
                      ? new Date(entitySummary.updatedAt).toLocaleDateString("pt-BR")
                      : "Aguardando envio"}
                  </div>
                </div>
              </div>

              {hasPublishedData ? (
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="text-sm font-medium text-muted-foreground">
                      Informações públicas
                    </div>
                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Responsável pelo cadastro</div>
                        <div className="font-medium text-foreground">
                          {entitySummary?.presidentName || "Não informado"}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Instagram</div>
                        <div className="font-medium text-foreground">
                          {instagramUrl ? (
                            <a
                              href={instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary underline-offset-4 hover:underline"
                            >
                              {instagramUrl}
                            </a>
                          ) : (
                            "Não informado"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-junina-yellow/30 bg-junina-yellow/10 p-5">
                    <div className="text-sm font-medium text-foreground">
                      Resumo enviado pela entidade
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Esses números são atualizados no painel da CONFEBRAQ pelo presidente da
                      entidade estadual.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5 text-sm leading-relaxed text-muted-foreground">
                  Esta entidade ainda não publicou seus dados no painel. Assim que o presidente
                  enviar as informações da entidade, esta página passará a mostrar Instagram,
                  quantidade de quadrilhas e quantidade de quadrilheiros.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default EntityPage;
