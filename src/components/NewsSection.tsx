import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const NewsSection = () => {
  const { newsItems } = useSiteContent();

  return (
    <section id="noticias" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
            Atualizações
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            Notícias
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conteúdo institucional alimentado pelo painel do site e sincronizado pelo Firebase.
          </p>
          <div className="w-24 h-1 gradient-warm mx-auto rounded-full mt-6" />
        </div>

        {newsItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className={`bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1 ${
                  item.featured ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {item.image ? (
                  <div className={item.featured ? "aspect-[21/9] overflow-hidden" : "aspect-video overflow-hidden"}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-2 gradient-junina" />
                )}

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 uppercase tracking-wider">
                      <Newspaper className="w-3.5 h-3.5" />
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </span>
                  </div>

                  <h3 className={`font-display font-bold text-foreground mb-3 ${item.featured ? "text-2xl" : "text-xl"}`}>
                    <Link to={`/noticia/${item.id}`} className="hover:text-primary transition-colors">
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <Link to={`/noticia/${item.id}`} className="inline-flex items-center gap-2 hover:underline">
                      Leia mais
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border p-10 text-center">
            <Newspaper className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">
              Nenhuma notícia cadastrada no painel do site.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
