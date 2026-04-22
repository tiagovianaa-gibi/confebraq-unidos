import { Play } from "lucide-react";

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

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
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
              href="https://www.youtube.com/@confebraq"
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
                  { id: "XDnXBkAMap4", title: "Concurso Nacional 2025" },
                  { id: "XDnXBkAMap4", title: "Melhores momentos" },
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
      </div>
    </section>
  );
};

export default MediaSection;
