import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const photos = [
  { file: "arrastao-do-amor-pa", name: "Arrastão do Amor", uf: "PA" },
  { file: "arroxa-o-no-df", name: "Arroxa o No", uf: "DF" },
  { file: "balance-do-cerrado-go", name: "Balance do Cerrado", uf: "GO" },
  { file: "eita-juino-rr", name: "Eita Juino", uf: "RR" },
  { file: "estrela-do-norte-ap", name: "Estrela do Norte", uf: "AP" },
  { file: "explode-coracao-ma", name: "Explode Coração", uf: "MA" },
  { file: "explosao-amor-caipira-to", name: "Explosão Amor Caipira", uf: "TO" },
  { file: "explosao-estrelar-pi", name: "Explosão Estrelar", uf: "PI" },
  { file: "feijao-queimado-mg", name: "Feijão Queimado", uf: "MG" },
  { file: "fogo-no-rabo-pa", name: "Fogo no Rabo", uf: "PA" },
  { file: "junina-girasol-ro", name: "Junina Girasol", uf: "RO" },
  { file: "matutos-na-roca-ac", name: "Matutos na Roça", uf: "AC" },
  { file: "moleka-sem-vergonha-pb", name: "Moleka Sem Vergonha", uf: "PB" },
  { file: "os-de-fora-mt", name: "Os de Fora", uf: "MT" },
  { file: "padre-pina-rn", name: "Padre Pina", uf: "RN" },
  { file: "raio-de-sol-pe", name: "Raio de Sol", uf: "PE" },
  { file: "unidos-em-asa-branca-se", name: "Unidos em Asa Branca", uf: "SE" },
  { file: "ze-testinha-ce", name: "Zé Testinha", uf: "CE" },
];

const PhotoCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <div className="space-y-4">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
        className="w-full"
      >
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselItem key={photo.file}>
              <div className="relative h-[70vh] max-h-[600px] overflow-hidden rounded-2xl bg-black">
                {/* fundo desfocado para preencher as laterais */}
                <img
                  src={`/fotos/${photo.file}.jpg`}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-40"
                />
                {/* foto principal sem corte */}
                <img
                  src={`/fotos/${photo.file}.jpg`}
                  alt={`${photo.name} — ${photo.uf}`}
                  className="relative z-10 mx-auto h-full w-auto max-w-full object-contain"
                  loading="lazy"
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 flex items-end justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-secondary/90 px-3 py-1 text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      {photo.uf}
                    </span>
                    <p className="text-white font-display font-bold text-lg sm:text-2xl drop-shadow">
                      {photo.name}
                    </p>
                  </div>
                  <div className="text-white/60 text-sm font-medium shrink-0">
                    {current + 1} / {photos.length}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => api?.scrollPrev()}
          className="rounded-full border border-background/20 bg-background/10 p-2 text-background hover:bg-background/20 transition-colors"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-1.5 flex-wrap justify-center">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir para foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-secondary"
                  : "w-1.5 bg-background/30 hover:bg-background/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => api?.scrollNext()}
          className="rounded-full border border-background/20 bg-background/10 p-2 text-background hover:bg-background/20 transition-colors"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const MediaSection = () => {
  return (
    <section id="midia" className="section-padding bg-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Mídia</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-background mt-3 mb-6">
            Canal CONFEBRAQ
          </h2>
          <p className="text-background/60 max-w-2xl mx-auto">
            Acompanhe vídeos, minisséries e a cobertura completa dos concursos no nosso canal do YouTube.
          </p>
          <div className="w-24 h-1 gradient-warm mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mb-16">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/XDnXBkAMap4"
              title="CONFEBRAQ — Concurso Nacional de Quadrilhas"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="https://www.youtube.com/@confebraqconfederacaobrasi6833"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-warm rounded-xl p-5 text-center hover:scale-[1.02] transition-transform"
            >
              <Play className="w-10 h-10 mx-auto mb-2 text-primary" />
              <span className="text-primary font-display font-bold text-lg block">Inscreva-se</span>
              <span className="text-primary/70 text-sm">no canal do YouTube</span>
            </a>

            <div className="bg-background/10 backdrop-blur rounded-xl p-5 flex-1">
              <h3 className="text-background font-display font-bold mb-4 text-sm uppercase tracking-wider">
                Mais vídeos
              </h3>
              <div className="space-y-3">
                {[
                  { id: "aT2QPtqS1NI", title: "Concurso Nacional de Destaques Juninos CONFEBRAQ 2025 — Casal de Noivos" },
                  { id: "xCutwoSEtcE", title: "XIX Concurso Nacional de Quadrilhas Juninas da CONFEBRAQ — AO VIVO | 13/07/2024" },
                  { id: "3p8K8I62aws", title: "No Coração do Arraial, Primeiro Ato — Chegada" },
                  { id: "J62WJgk0_Uk", title: "XVIII Concurso Nacional de Quadrilha Junina CONFEBRAQ 28/07/2024" },
                ].map((video, index) => (
                  <a
                    key={index}
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-20 h-12 rounded-md overflow-hidden shrink-0 bg-background/20">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-background/80 text-sm group-hover:text-secondary transition-colors line-clamp-2">
                      {video.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
              <Images className="w-4 h-4" />
              Galeria
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-background">
              Fotos do Concurso
            </h3>
          </div>
          <PhotoCarousel />
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
