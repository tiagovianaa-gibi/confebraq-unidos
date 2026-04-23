import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Instagram, MapPinned, Users } from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { useEntityRegistry } from "@/hooks/useEntityRegistry";
import { affiliateEntityBySigla } from "@/content/affiliates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const quadrilhas = entitySummary?.quadrilhas ?? [];

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
                  </div>
                  <CardTitle className="font-display text-3xl">{entity.entity}</CardTitle>
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
              <div className="grid gap-4 md:grid-cols-2">
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
              </div>

              {quadrilhas.length > 0 ? (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                    Quadrilhas filiadas
                  </h3>
                  <ul className="space-y-3">
                    {quadrilhas.map((quadrilha) => (
                      <li
                        key={quadrilha.id}
                        className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3"
                      >
                        <span className="font-medium text-foreground">{quadrilha.name}</span>
                        {quadrilha.instagram && (
                          <a
                            href={quadrilha.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline shrink-0"
                          >
                            <Instagram className="w-3.5 h-3.5" />
                            Instagram
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : !entitySummary ? (
                <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5 text-sm text-muted-foreground">
                  Esta entidade ainda não enviou seus dados.
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default EntityPage;
