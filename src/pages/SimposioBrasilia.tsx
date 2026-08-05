import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import simposioCard from "@/assets/simposio-brasilia.png";

const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdGpcyjMeNgRXdZG47eHbAbO6x68RQUNYxWd_mIfky74BHE9g/viewform?embedded=true";
const FORM_PUBLIC_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdGpcyjMeNgRXdZG47eHbAbO6x68RQUNYxWd_mIfky74BHE9g/viewform";

const SimposioBrasilia = () => {
  useEffect(() => {
    document.title = "III Simpósio Nacional de Quadrilhas Juninas | CONFEBRAQ";
    const descriptionElement = document.querySelector('meta[name="description"]');
    if (descriptionElement) {
      descriptionElement.setAttribute(
        "content",
        "Inscreva-se no III Simpósio Nacional de Quadrilhas Juninas — Brasília/DF, 20, 21 e 22 de agosto.",
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
                Inscrições abertas
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

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <a href="#inscricao">Fazer inscrição</a>
                </Button>
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

      {/* Formulário */}
      <main id="inscricao" className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Formulário de inscrição
            </h2>
            <p className="mt-4 text-muted-foreground">
              Preencha o formulário abaixo para garantir a sua vaga. Se preferir,
              abra o formulário em uma nova aba.
            </p>
          </div>

          <div className="mb-6 flex justify-center">
            <Button asChild variant="secondary">
              <a href={FORM_PUBLIC_URL} target="_blank" rel="noopener noreferrer">
                Abrir formulário em nova aba
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <iframe
              src={FORM_EMBED_URL}
              title="Formulário de inscrição do III Simpósio Nacional de Quadrilhas Juninas"
              className="w-full"
              style={{ height: "1400px", border: "none" }}
              loading="lazy"
            >
              Carregando…
            </iframe>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default SimposioBrasilia;
