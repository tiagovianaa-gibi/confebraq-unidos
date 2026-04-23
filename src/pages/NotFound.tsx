import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("Erro 404: usuário tentou acessar uma rota inexistente:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <main className="container mx-auto flex min-h-screen items-center justify-center px-4 pt-28 pb-12">
        <Card className="w-full max-w-xl text-center">
          <CardHeader>
            <CardTitle className="text-5xl">404</CardTitle>
            <CardDescription className="text-base">
              Ops. Página não encontrada.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              O endereço <span className="font-mono">{location.pathname}</span> não existe no site.
            </p>

            <div className="flex justify-center">
              <Button asChild>
                <Link to="/">Voltar para a página inicial</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <FooterSection />
    </div>
  );
};

export default NotFound;
