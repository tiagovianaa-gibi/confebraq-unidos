import { ExternalLink, FileText } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const statusClassName: Record<string, string> = {
  Disponivel: "bg-junina-green/15 text-junina-green border border-junina-green/20",
  "Em atualizacao": "bg-junina-yellow/20 text-primary border border-junina-yellow/30",
};

const TransparencySection = () => {
  const { transparencyItems } = useSiteContent();

  return (
    <section id="transparencia" className="section-padding bg-muted bandeirinha">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
            Prestacao de contas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            Transparencia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Documentos e avisos publicados pelo painel do site e organizados em uma area unica.
          </p>
          <div className="w-24 h-1 gradient-warm mx-auto rounded-full mt-6" />
        </div>

        {transparencyItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transparencyItems.map((item) => {
              const card = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClassName[item.status]}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{item.period}</div>
                    <h3 className="font-display font-bold text-xl text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {item.href ? "Abrir arquivo" : "Arquivo em preparacao"}
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </>
              );

              if (item.href) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card rounded-xl border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    {card}
                  </a>
                );
              }

              return (
                <div
                  key={item.id}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  {card}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border p-10 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">
              Nenhum item de transparencia cadastrado no painel do site.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransparencySection;
