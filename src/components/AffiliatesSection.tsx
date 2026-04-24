import mapaBr from "@/assets/mapa-br.svg";
import { affiliateEntities } from "@/content/affiliates";
import { repairMojibakeText } from "@/lib/utils";
import { Link } from "react-router-dom";

const regionColors: Record<string, string> = {
  AC: "bg-junina-green", AM: "bg-junina-green", AP: "bg-junina-green", PA: "bg-junina-green", RO: "bg-junina-green", RR: "bg-junina-green", TO: "bg-junina-green",
  AL: "bg-junina-orange", BA: "bg-junina-orange", CE: "bg-junina-orange", MA: "bg-junina-orange", PB: "bg-junina-orange", PE: "bg-junina-orange", PI: "bg-junina-orange", RN: "bg-junina-orange", SE: "bg-junina-orange",
  DF: "bg-junina-red", GO: "bg-junina-red", MT: "bg-junina-red",
  ES: "bg-junina-yellow", MG: "bg-junina-yellow", RJ: "bg-junina-yellow",
};

const AffiliatesSection = () => {
  const mapCaption = repairMojibakeText("Presença da CONFEBRAQ no Brasil");

  return (
    <section id="filiadas" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Entidades</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            Entidades filiadas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            22 entidades filiadas representando o Brasil.
          </p>
          <div className="w-24 h-1 gradient-warm mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-10 items-start mb-8">
          <div className="hidden lg:flex flex-col items-center sticky top-28">
            <img src={mapaBr} alt="Mapa do Brasil" className="w-full max-w-[280px] opacity-80" />
            <p className="text-xs text-muted-foreground mt-4 text-center">{mapCaption}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {affiliateEntities.map((affiliate) => (
              <Link
                key={affiliate.sigla}
                to={`/entidade/${encodeURIComponent(affiliate.sigla)}`}
                className="bg-card rounded-lg p-5 border border-border hover:shadow-md transition-all group flex items-start gap-4 cursor-pointer"
              >
                <div className={`${regionColors[affiliate.uf] || "bg-primary"} text-accent-foreground w-11 h-11 rounded-lg flex items-center justify-center font-bold text-xs shrink-0`}>
                  {affiliate.uf}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-foreground leading-tight group-hover:text-primary transition-colors">
                    {affiliate.entity}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">{affiliate.sigla}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-10 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded bg-junina-green" /> Norte
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded bg-junina-orange" /> Nordeste
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded bg-junina-red" /> Centro-Oeste
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded bg-junina-yellow" /> Sudeste
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliatesSection;
