import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// XX Circuito Nacional de Quadrilhas Juninas da CONFEBRAQ — Canaã dos Carajás/PA
// Ordenadas pela classificação final de 2026.
const photos = [
  { file: "raio-de-sol-pe", name: "Raio de Sol", uf: "PE", rank: 1 },
  { file: "junina-lumiar-pi", name: "Junina Lumiar", uf: "PI", rank: 2 },
  { file: "arroxa-o-nó-df", name: "Arroxa o Nó", uf: "DF", rank: 3 },
  { file: "moleka-100-vergonha-pb", name: "Moleka 100 Vergonha", uf: "PB", rank: 4 },
  { file: "cafundó-do-brejo-to", name: "Cafundó do Brejo", uf: "TO", rank: 5 },
  { file: "eita-junino-rr", name: "Eita Junino", uf: "RR", rank: 6 },
  { file: "junina-cearense-ce", name: "Junina Cearense", uf: "CE", rank: 7 },
  { file: "arrastão-do-amor-pa", name: "Arrastão do Amor", uf: "PA", rank: 8 },
  { file: "uai-são-joão-go", name: "Uai São João", uf: "GO", rank: 9 },
  { file: "arco-íris-do-cangaço-ma", name: "Arco-Íris do Cangaço", uf: "MA", rank: 10 },
  { file: "unidos-em-asa-branca-se", name: "Unidos em Asa Branca", uf: "SE", rank: 11 },
  { file: "flor-do-sertão-mt", name: "Flor do Sertão", uf: "MT", rank: 12 },
  { file: "luar-do-sertão-ap", name: "Luar do Sertão", uf: "AP", rank: 13 },
  { file: "fogo-de-palha-mg", name: "Fogo de Palha", uf: "MG", rank: 14 },
  { file: "junina-evoé-pa", name: "Junina Evoé", uf: "PA", rank: 15 },
  { file: "caipiras-da-mata-ba", name: "Caipiras da Mata", uf: "BA", rank: 16 },
  { file: "juabp-ro", name: "Quadrilha JUABP", uf: "RO", rank: 17 },
  { file: "sassaricano-na-roça-ac", name: "Sassaricano na Roça", uf: "AC", rank: 18 },
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
    <div className="space-y-5">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {photos.map((photo) => (
            <CarouselItem
              key={photo.file}
              className="pl-3 sm:pl-4 basis-[78%] sm:basis-[52%] md:basis-[38%] lg:basis-[28%]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <img
                  src={`/fotos/${photo.file}.jpg`}
                  alt={`${photo.name} — ${photo.uf}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-black shadow-md ${
                      photo.rank <= 3
                        ? "bg-secondary text-primary"
                        : "bg-black/60 text-white"
                    }`}
                  >
                    {photo.rank}º
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block rounded-full bg-secondary/90 px-2.5 py-0.5 text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                    {photo.uf}
                  </span>
                  <p className="text-white font-display font-bold text-base leading-tight drop-shadow">
                    {photo.name}
                  </p>
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
              Fotos do Concurso 2026
            </h3>
            <p className="text-background/60 mt-2 text-sm">
              XX Circuito Nacional de Quadrilhas Juninas — Canaã dos Carajás/PA · 11 e 12 de julho de 2026
            </p>
          </div>
          <PhotoCarousel />
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
