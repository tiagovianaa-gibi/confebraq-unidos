import { Download, FileText } from "lucide-react";

const documentos = [
  {
    title: "Regulamento do Concurso Nacional de Quadrilhas Juninas 2025",
    description: "Normas, critérios de avaliação e disposições gerais do Concurso Nacional de Quadrilhas Juninas da CONFEBRAQ 2025.",
    href: "/documentos/regulamento-concurso-nacional-2025.pdf",
  },
  {
    title: "Regulamento do Concurso de Destaque de 2025",
    description: "Normas, critérios de avaliação e disposições gerais do Concurso Nacional de Destaques Juninos da CONFEBRAQ 2025.",
    href: "/documentos/regulamento-concurso-destaque-2025.pdf",
  },
];

const DocumentosSection = () => {
  return (
    <section id="documentos" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
            Oficial
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            Documentos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Regulamentos e documentos oficiais dos concursos da CONFEBRAQ.
          </p>
          <div className="w-24 h-1 gradient-warm mx-auto rounded-full mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {documentos.map((doc) => (
            <div
              key={doc.href}
              className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-foreground leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex gap-3">
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Visualizar
                </a>
                <a
                  href={doc.href}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Baixar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentosSection;
