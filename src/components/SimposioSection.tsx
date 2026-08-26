import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GaleriaSimposio from "@/components/GaleriaSimposio";
import simposioCard from "@/assets/simposio-brasilia.jpg";

const SimposioSection = () => {
  return (
    <section id="simposio" className="bg-muted py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Link
            to="/simposio-brasilia"
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
              Evento realizado
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-black text-foreground leading-tight">
              III Simpósio Nacional de Quadrilhas Juninas
            </h2>
            <p className="mt-4 text-lg font-semibold text-secondary">
              Tradição que se reinventa: cultura, inovação e futuro do movimento junino
            </p>
            <p className="mt-4 text-muted-foreground">
              Três dias de debates, palestras e construção coletiva da Carta de Brasília 2026,
              reunindo o movimento junino de todo o Brasil na capital.
            </p>

            <div className="mt-6 space-y-3 text-foreground">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-secondary" />
                <span className="font-semibold">20, 21 e 22 de agosto de 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="font-semibold">
                  Eixo Cultural Ibero-Americano — Brasília / DF
                </span>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <Link to="/simposio-brasilia">Ver materiais e registro</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Galeria — prévia */}
        <div className="mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-secondary">
                <Camera className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.3em]">Registro fotográfico</span>
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-foreground">
                Galeria do III Simpósio
              </h3>
            </div>
            <Link
              to="/simposio-brasilia#galeria"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:text-secondary"
            >
              Ver todas as 60 fotos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8">
            <GaleriaSimposio limite={8} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimposioSection;
