import { Trophy, Medal, Award } from "lucide-react";
import { useState } from "react";
import { repairMojibakeText } from "@/lib/utils";

interface Champion {
  year: number;
  champion: string;
  vice: string;
  third: string;
  city: string;
  note?: string;
  noData?: boolean;
}

const champions: Champion[] = [
  { year: 2025, champion: "Eita Junino (RR)", vice: "Raio de Sol (PE)", third: "ArraiÃ¡ ZÃ© Testinha (CE)", city: "CanaÃ£ dos CarajÃ¡s (PA)" },
  { year: 2024, champion: "Arroxa o NÃ³ (DF)", vice: "Amor Caipira (RR)", third: "Junina Lumiar (PE)", city: "Taguatinga (DF)" },
  { year: 2023, champion: "Junina Flor de Mandacaru (MA)", vice: "Formiga da RoÃ§a (DF)", third: "CafundÃ³ do Brejo (TO)", city: "CanaÃ£ dos CarajÃ¡s (PA)" },
  { year: 2022, champion: "Luar do SÃ£o JoÃ£o (PI)", vice: "Raio do Sol (PE)", third: "Si BobiÃ¡ a Gente Pimba (DF)", city: "Belo Horizonte (MG)" },
  { year: 2021, champion: "â€”", vice: "â€”", third: "â€”", city: "â€”", noData: true, note: "InformaÃ§Ã£o nÃ£o disponÃ­vel" },
  { year: 2020, champion: "â€”", vice: "â€”", third: "â€”", city: "â€”", noData: true, note: "InformaÃ§Ã£o nÃ£o disponÃ­vel" },
  { year: 2019, champion: "Si BombiÃ¡ a Gente Pimba (DF)", vice: "Santa FÃ© (AL)", third: "Arriba Saia (GO)", city: "MaceiÃ³ (AL)" },
  { year: 2018, champion: "SÃ£o GererÃª (MG)", vice: "Raio de Sol (PE)", third: "SinhÃ¡ Benta (RR)", city: "Boa Vista (RR)" },
  { year: 2017, champion: "Arroxa o NÃ³ (DF) / Arriba Saia (GO)", vice: "NÃ£o informado", third: "Capelinha do ForrÃ³ (BA)", city: "Palmas (TO)", note: "CampeÃ£s compartilhadas" },
  { year: 2016, champion: "CearÃ¡ Junino (CE)", vice: "ChapÃ©u do VovÃ³ (GO)", third: "Origem Nordestina (PE)", city: "BelÃ©m (PA)" },
  { year: 2015, champion: "Moleka 100 Vergonha (PB)", vice: "Raio de Sol (PE)", third: "Amanhecer do SertÃ£o (AL)", city: "ParnaÃ­ba (PI)" },
  { year: 2014, champion: "Luar do SertÃ£o (AL)", vice: "Capelinha do ForrÃ³ (BA)", third: "Caipiras do BorocoxÃ³ (TO)", city: "MaracanaÃº (CE)" },
  { year: 2013, champion: "Caipiras do BorocoxÃ³ (TO)", vice: "Luar do SertÃ£o (AL)", third: "Luar da Minha Terra (CE)", city: "Palmas (TO)" },
  { year: 2012, champion: "ForrÃ³ Asa Branca (BA)", vice: "Caipiras do BorocoxÃ³ (TO)", third: "Raio de Sol (PE)", city: "Palmas (TO)" },
  { year: 2011, champion: "Junina TradiÃ§Ã£o (PE)", vice: "Encanto da Juventude (PA)", third: "Junina BabaÃ§u (CE)", city: "Aracaju (SE)" },
  { year: 2010, champion: "Raio de Sol (PE)", vice: "CafundÃ³ do Brejo (TO)", third: "Rancho Alegre (RN)", city: "Rio Branco (AC)" },
  { year: 2009, champion: "PaixÃ£o Nordestina (CE)", vice: "Pau Melado (DF)", third: "Traque da Massa (PE)", city: "Fortaleza (CE)" },
  { year: 2008, champion: "Beija Flor do SertÃ£o (CE)", vice: "Si BobiÃ¡ a Gente Pimba (DF)", third: "ChapÃ©u do VovÃ³ (GO)", city: "Aparecida de GoiÃ¢nia (GO)" },
  { year: 2007, champion: "Beija Flor do SertÃ£o (CE)", vice: "Pioneiros na RoÃ§a (SE)", third: "ZÃ© Testinha (CE)", city: "Fortaleza (CE)" },
  { year: 2006, champion: "Mala Veia (DF)", vice: "Assum Preto (SE)", third: "QJ Abusados da RoÃ§a (GO)", city: "Rio Verde (GO)" },
  { year: 2005, champion: "Assum Preto (SE)", vice: "Arroxa o NÃ³ (DF)", third: "ChapÃ©u do VovÃ³ (GO)", city: "BrasÃ­lia (DF)" },
];

const ChampionsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? champions : champions.slice(0, 6);
  const eyebrow = repairMojibakeText("Histórico");
  const title = repairMojibakeText("Hall dos Campeões");
  const description = repairMojibakeText(
    "Todos os campeões do Concurso Nacional de Quadrilhas, desde a primeira edição em 2005.",
  );
  const championLabel = repairMojibakeText("Campeão");
  const thirdPlaceLabel = repairMojibakeText("3º lugar");
  const hostCityLabel = repairMojibakeText("Cidade-sede");
  const showAllLabel = repairMojibakeText(
    `Ver todos os campeões (${champions.length - 6} restantes)`,
  );

  return (
    <section id="campeoes" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">{eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
          <div className="w-24 h-1 gradient-warm mx-auto rounded-full mt-6" />
        </div>

        <div className="grid gap-4">
          {displayed.map((champion) => (
            <div
              key={champion.year}
              className={`bg-card rounded-xl border border-border p-5 sm:p-6 hover:shadow-md transition-all ${champion.noData ? "opacity-50" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="gradient-junina text-primary-foreground w-20 h-20 rounded-xl flex flex-col items-center justify-center shrink-0">
                  <span className="text-2xl font-display font-black">{champion.year}</span>
                </div>

                <div className="flex-1 grid sm:grid-cols-3 gap-3">
                  <div className="flex items-start gap-2">
                    <Trophy className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{championLabel}</div>
                      <div className="font-semibold text-foreground text-sm">{repairMojibakeText(champion.champion)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Medal className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Vice</div>
                      <div className="text-sm text-foreground">{repairMojibakeText(champion.vice)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{thirdPlaceLabel}</div>
                      <div className="text-sm text-foreground">{repairMojibakeText(champion.third)}</div>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{hostCityLabel}</div>
                  <div className="text-sm font-medium text-foreground">{repairMojibakeText(champion.city)}</div>
                  {champion.note && (
                    <div className="text-xs text-secondary mt-1 italic">
                      {repairMojibakeText(champion.note)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              {showAllLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChampionsSection;
