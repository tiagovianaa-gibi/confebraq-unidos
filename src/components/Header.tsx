import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Menu, X } from "lucide-react";
import logo from "@/assets/confebraq-logo.png";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Notícias", href: "/#noticias" },
  { label: "Mídia", href: "/#midia" },
  { label: "Filiadas", href: "/#filiadas" },
  { label: "Campeões", href: "/#campeoes" },
  { label: "Documentos", href: "/#documentos" },
  { label: "Transparência", href: "/#transparencia" },
  { label: "Contato", href: "/#contato" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="/#inicio" className="flex items-center gap-3">
            <img src={logo} alt="CONFEBRAQ" className="h-14 w-14 object-contain" />
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold tracking-wide text-primary-foreground">
                CONFEBRAQ
              </span>
              <p className="text-xs font-body text-primary-foreground/70">
                Confederação Brasileira de Entidades de Quadrilhas Juninas
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-4 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-secondary"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <Button asChild size="sm" variant="secondary">
              <Link to="/painel">
                <LayoutDashboard className="w-4 h-4" />
                Painel
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen((current) => !current)}
            className="p-2 text-primary-foreground md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-primary-foreground/10 bg-primary md:hidden">
          <nav className="flex flex-col gap-1 px-4 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-secondary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="px-4 py-4">
            <Button asChild className="w-full" variant="secondary">
              <Link to="/painel" onClick={() => setMenuOpen(false)}>
                <LayoutDashboard className="w-4 h-4" />
                Acessar o painel do site
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
