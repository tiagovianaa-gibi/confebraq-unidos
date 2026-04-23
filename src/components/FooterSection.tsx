import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import logo from "@/assets/confebraq-logo.png";
import { Button } from "@/components/ui/button";
import { repairMojibakeText } from "@/lib/utils";

const quickLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Notícias", href: "/#noticias" },
  { label: "Mídia", href: "/#midia" },
  { label: "Entidades filiadas", href: "/#filiadas" },
  { label: "Hall dos campeões", href: "/#campeoes" },
  { label: "Transparência", href: "/#transparencia" },
];

const FooterSection = () => {
  const normalizedQuickLinks = quickLinks.map((link) => ({
    ...link,
    label: repairMojibakeText(link.label),
  }));
  const description = repairMojibakeText(
    "Confederação Brasileira de Entidades de Quadrilhas Juninas. Unindo o Brasil pelo movimento junino.",
  );
  const quickLinksTitle = repairMojibakeText("Links rápidos");
  const contactDescription = repairMojibakeText(
    "Para mais informações sobre filiação, campeonatos e eventos, entre em contato com a CONFEBRAQ através das nossas redes sociais ou diretamente com a sua entidade estadual filiada.",
  );

  return (
    <footer id="contato" className="gradient-junina text-primary-foreground">
      <div className="mx-auto max-w-7xl section-padding">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src={logo} alt="CONFEBRAQ" className="h-12 w-12 object-contain" />
              <span className="font-display text-xl font-bold">CONFEBRAQ</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              {description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold">{quickLinksTitle}</h3>
            <nav className="flex flex-col gap-2">
              {normalizedQuickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-secondary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold">Contato</h3>
            <p className="mb-5 text-sm leading-relaxed text-primary-foreground/70">
              {contactDescription}
            </p>

            <Button asChild variant="secondary">
              <Link to="/painel">
                <LayoutDashboard className="w-4 h-4" />
                Painel do site
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} CONFEBRAQ. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
