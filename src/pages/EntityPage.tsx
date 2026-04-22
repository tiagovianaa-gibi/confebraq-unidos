import { useParams, Link } from "react-router-dom";
import { useEntityRegistry } from "@/hooks/useEntityRegistry";
import { affiliateEntityBySigla } from "@/content/affiliates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Instagram } from "lucide-react";

const EntityPage = () => {
  const { sigla } = useParams<{ sigla: string }>();
  const entity = sigla ? affiliateEntityBySigla[sigla.toUpperCase()] : null;
  const { summaries } = useEntityRegistry();

  if (!entity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Entidade não encontrada</CardTitle>
          </CardHeader>
          <CardContent>
            <p>A entidade com sigla "{sigla}" não foi encontrada.</p>
            <Button asChild className="mt-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const entitySummary = summaries.find(s => s.entitySigla === entity.sigla);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-800">
              {entity.entity}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{entity.uf}</Badge>
              {(entitySummary?.instagram || entity.instagram) && (
                <Button variant="outline" size="sm" asChild>
                  <a href={entitySummary?.instagram || entity.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </a>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Estatísticas por Estado</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Estado</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Quadrilhas</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Quadrilheiros</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">{entity.uf}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {entitySummary?.totalQuadrilhas || 0}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {entitySummary?.totalQuadrilheiros || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {entitySummary && (
              <div className="mt-4 text-sm text-gray-600">
                <p>Última atualização: {new Date(entitySummary.updatedAt).toLocaleDateString('pt-BR')}</p>
                {entitySummary.presidentName && (
                  <p>Presidente: {entitySummary.presidentName}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntityPage;