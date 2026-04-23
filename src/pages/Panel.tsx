import type { ReactNode } from "react";
import { AlertTriangle, Laptop, Loader2, Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PanelWorkspace from "@/components/panel/PanelWorkspace";
import { useFirebasePanelAuth } from "@/hooks/useFirebasePanelAuth";
import { toast } from "@/hooks/use-toast";

const PanelPageFrame = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-muted">
    <Header />
    <div className="pt-20">{children}</div>
  </div>
);

const Panel = () => {
  const {
    user,
    accessProfile,
    loading,
    isAllowedUser,
    isFirebaseConfigured,
    isLocalAccessEnabled,
    missingFirebaseEnvKeys,
    signInWithGoogle,
    signInLocally,
    signOutFromGoogle,
    assignedEntitySigla,
    userRole,
  } = useFirebasePanelAuth();

  if (loading) {
    return (
      <PanelPageFrame>
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            Verificando acesso ao painel...
          </div>
        </div>
      </PanelPageFrame>
    );
  }

  if (!isFirebaseConfigured && !isLocalAccessEnabled) {
    return (
      <PanelPageFrame>
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
          <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-secondary" />
              Firebase não configurado
            </CardTitle>
            <CardDescription>
              Preencha as variáveis do Firebase para liberar o login com Google neste ambiente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border border-border bg-muted p-4">
              <p className="text-sm text-muted-foreground mb-3">Variáveis obrigatórias:</p>
              <ul className="space-y-2 text-sm font-mono">
                {missingFirebaseEnvKeys.map((key) => (
                  <li key={key}>{key}</li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              Use o arquivo <span className="font-mono">.env.example</span> como base. Depois habilite o login com
              Google no Firebase Authentication e adicione o domínio local e o domínio de produção como domínios
              autorizados.
            </p>

            <Button asChild>
              <Link to="/">Voltar ao site</Link>
            </Button>
          </CardContent>
          </Card>
        </div>
      </PanelPageFrame>
    );
  }

  if (!user && isLocalAccessEnabled) {
    return (
      <PanelPageFrame>
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
          <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Laptop className="w-5 h-5 text-primary" />
              Painel em modo local
            </CardTitle>
            <CardDescription>
              Como o Firebase não está configurado, este ambiente local pode abrir o painel sem Google.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground leading-relaxed">
              Os dados do painel e os cadastros das entidades serão salvos apenas neste navegador. Para liberar o
              acesso real dos administradores e usuários de entidade com conta Google, volte a preencher as variáveis
              <span className="font-mono"> VITE_FIREBASE_*</span>.
            </div>

            {missingFirebaseEnvKeys.length > 0 && (
              <div className="rounded-lg border border-border bg-muted p-4">
                <p className="text-sm text-muted-foreground mb-3">Variáveis ainda pendentes:</p>
                <ul className="space-y-2 text-sm font-mono">
                  {missingFirebaseEnvKeys.map((key) => (
                    <li key={key}>{key}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={async () => {
                  try {
                    await signInLocally();
                  } catch (error) {
                    toast({
                      title: "Falha no acesso local",
                      description:
                        error instanceof Error
                          ? error.message
                          : "Não foi possível abrir o painel local.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                <LogIn className="w-4 h-4" />
                Entrar no painel local
              </Button>

              <Button asChild variant="outline">
                <Link to="/">Voltar ao site</Link>
              </Button>
            </div>
          </CardContent>
          </Card>
        </div>
      </PanelPageFrame>
    );
  }

  if (!user) {
    return (
      <PanelPageFrame>
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
          <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Acesso ao painel
            </CardTitle>
            <CardDescription>
              Entre com sua conta Google. A autorização é decidida por um perfil de acesso salvo no Firestore.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={async () => {
                try {
                  await signInWithGoogle();
                } catch (error) {
                  const message = error instanceof Error ? error.message : "Não foi possível concluir o login.";
                  toast({
                    title: "Falha no login com Google",
                    description: message,
                    variant: "destructive",
                  });
                }
              }}
            >
              <LogIn className="w-4 h-4" />
              Entrar com Google
            </Button>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Administradores da CONFEBRAQ recebem acesso total. Usuários de entidade recebem acesso apenas à própria
              entidade estadual.
            </p>

            <Button asChild variant="outline" className="w-full">
              <Link to="/">Voltar ao site</Link>
            </Button>
          </CardContent>
          </Card>
        </div>
      </PanelPageFrame>
    );
  }

  if (!isAllowedUser) {
    return (
      <PanelPageFrame>
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
          <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Acesso não liberado</CardTitle>
            <CardDescription>
              Essa conta entrou com sucesso no Google, mas ainda não possui um perfil ativo na coleção
              <span className="font-mono"> panelAccess</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
              Peça para um administrador da CONFEBRAQ criar um documento em
              <span className="font-mono"> panelAccess/{user.uid}</span> com um destes formatos:
              <br />
              admin: <span className="font-mono">{`{ role: "admin", active: true, email: "${user.email || ""}" }`}</span>
              <br />
              entidade: <span className="font-mono">{`{ role: "entity", entitySigla: "UF_SIGLA", active: true, email: "${user.email || ""}" }`}</span>
            </div>

            <div className="rounded-lg border border-border bg-muted p-4 text-sm font-mono space-y-2">
              <div>uid: {user.uid}</div>
              <div>email: {user.email || "não informado"}</div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={async () => {
                  await signOutFromGoogle();
                }}
              >
                Sair desta conta
              </Button>
              <Button asChild>
                <Link to="/">Voltar ao site</Link>
              </Button>
            </div>
          </CardContent>
          </Card>
        </div>
      </PanelPageFrame>
    );
  }

  return (
    <PanelPageFrame>
      <PanelWorkspace
        userId={user.uid}
        userName={accessProfile?.displayName || user.displayName || "Usuário do painel"}
        userEmail={accessProfile?.email || user.email || ""}
        userRole={userRole || "entity"}
        assignedEntitySigla={assignedEntitySigla}
        onSignOut={signOutFromGoogle}
      />
    </PanelPageFrame>
  );
};

export default Panel;
