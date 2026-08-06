import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import simposioCard from "@/assets/simposio-brasilia.png";

const SimposioBrasilia = () => {
  useEffect(() => {
    document.title = "III Simpósio Nacional de Quadrilhas Juninas | CONFEBRAQ";
    const descriptionElement = document.querySelector('meta[name="description"]');
    if (descriptionElement) {
      descriptionElement.setAttribute(
        "content",
        "III Simpósio Nacional de Quadrilhas Juninas — Brasília/DF, 20, 21 e 22 de agosto.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-16">
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: `repeating-linear-gradient(90deg,
              hsl(0 72% 50%) 0px, hsl(0 72% 50%) 30px,
              hsl(45 95% 55%) 30px, hsl(45 95% 55%) 60px,
              hsl(140 55% 40%) 60px, hsl(140 55% 40%) 90px,
              hsl(235 65% 25%) 90px, hsl(235 65% 25%) 120px,
              hsl(25 90% 55%) 120px, hsl(25 90% 55%) 150px
            )`,
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-primary-foreground/10 shadow-2xl">
              <img
                src={simposioCard}
                alt="III Simpósio Nacional de Quadrilhas Juninas — Brasília/DF"
                className="w-full h-auto"
              />
            </div>

            <div className="text-primary-foreground">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary">
                Anote na agenda
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl font-black leading-tight">
                III Simpósio Nacional de Quadrilhas Juninas
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Tradição que movimenta • Cultura que transforma
              </p>

              <div className="mt-8 space-y-3">
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
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link to="/">Voltar ao site</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o evento */}
      <main className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Sobre o evento
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            O III Simpósio Nacional de Quadrilhas Juninas reúne entidades,
            grupos e apaixonados pela cultura junina em Brasília, para três dias
            de troca de experiências, valorização da tradição e fortalecimento do
            movimento em todo o Brasil.
          </p>
          <p className="mt-6 text-base font-semibold text-foreground">
            Em breve, mais informações e a abertura das inscrições.
          </p>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default SimposioBrasilia;
