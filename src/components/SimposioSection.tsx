import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import simposioCard from "@/assets/simposio-brasilia.png";

const SimposioSection = () => {
  return (
    <section id="simposio" className="bg-muted py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Link
            to="/inscricao-simposio-brasilia"
            className="block overflow-hidden rounded-3xl border border-border shadow-xl transition-transform hover:scale-[1.02]"
          >
            <img
              src={simposioCard}
              alt="III Simpósio Nacional de Quadrilhas Juninas — Brasília/DF"
              className="w-full h-auto"
            />
          </Link>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">
              Inscrições abertas
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-black text-foreground leading-tight">
              III Simpósio Nacional de Quadrilhas Juninas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tradição que movimenta • Cultura que transforma
            </p>

            <div className="mt-6 space-y-3 text-foreground">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-secondary" />
                <span className="font-semibold">20, 21 e 22 de agosto</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="font-semibold">Brasília / DF</span>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link to="/inscricao-simposio-brasilia">Fazer inscrição</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimposioSection;
