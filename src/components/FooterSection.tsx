import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import logo from "@/assets/confebraq-logo.png";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Notícias", href: "#noticias" },
  { label: "Mídia", href: "#midia" },
  { label: "Entidades filiadas", href: "#filiadas" },
  { label: "Hall dos campeões", href: "#campeoes" },
  { label: "Transparência", href: "#transparencia" },
];

const FooterSection = () => {
  return (
    <footer id="contato" className="gradient-junina text-primary-foreground">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="CONFEBRAQ" className="w-12 h-12 object-contain" />
              <span className="font-display text-xl font-bold">CONFEBRAQ</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Confederação Brasileira de Entidades de Quadrilhas Juninas.
              Unindo o Brasil pelo movimento junino.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Links rápidos</h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-primary-foreground/70 hover:text-secondary text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contato</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-5">
              Para mais informações sobre filiação, campeonatos e eventos, entre em contato com a CONFEBRAQ
              através das nossas redes sociais ou diretamente com a sua entidade estadual filiada.
            </p>

            <Button asChild variant="secondary">
              <Link to="/painel">
                <LayoutDashboard className="w-4 h-4" />
                Painel do site
              </Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} CONFEBRAQ. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
