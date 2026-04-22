import { Trophy, Medal, Award } from "lucide-react";
import { useState } from "react";

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
  { year: 2025, champion: "Eita Junino (RR)", vice: "Raio de Sol (PE)", third: "Arraiá Zé Testinha (CE)", city: "Canaã dos Carajás (PA)" },
  { year: 2024, champion: "Arroxa o Nó (DF)", vice: "Amor Caipira (RR)", third: "Junina Lumiar (PE)", city: "Taguatinga (DF)" },
  { year: 2023, champion: "Junina Flor de Mandacaru (MA)", vice: "Formiga da Roça (DF)", third: "Cafundó do Brejo (TO)", city: "Canaã dos Carajás (PA)" },
  { year: 2022, champion: "Luar do São João (PI)", vice: "Raio do Sol (PE)", third: "Si Bobiá a Gente Pimba (DF)", city: "Belo Horizonte (MG)" },
  { year: 2021, champion: "—", vice: "—", third: "—", city: "—", noData: true, note: "Informação não disponível" },
  { year: 2020, champion: "—", vice: "—", third: "—", city: "—", noData: true, note: "Informação não disponível" },
  { year: 2019, champion: "Si Bombiá a Gente Pimba (DF)", vice: "Santa Fé (AL)", third: "Arriba Saia (GO)", city: "Maceió (AL)" },
  { year: 2018, champion: "São Gererê (MG)", vice: "Raio de Sol (PE)", third: "Sinhá Benta (RR)", city: "Boa Vista (RR)" },
  { year: 2017, champion: "Arroxa o Nó (DF) / Arriba Saia (GO)", vice: "Não informado", third: "Capelinha do Forró (BA)", city: "Palmas (TO)", note: "Campeãs compartilhadas" },
  { year: 2016, champion: "Ceará Junino (CE)", vice: "Chapéu do Vovó (GO)", third: "Origem Nordestina (PE)", city: "Belém (PA)" },
  { year: 2015, champion: "Moleka 100 Vergonha (PB)", vice: "Raio de Sol (PE)", third: "Amanhecer do Sertão (AL)", city: "Parnaíba (PI)" },
  { year: 2014, champion: "Luar do Sertão (AL)", vice: "Capelinha do Forró (BA)", third: "Caipiras do Borocoxó (TO)", city: "Maracanaú (CE)" },
  { year: 2013, champion: "Caipiras do Borocoxó (TO)", vice: "Luar do Sertão (AL)", third: "Luar da Minha Terra (CE)", city: "Palmas (TO)" },
  { year: 2012, champion: "Forró Asa Branca (BA)", vice: "Caipiras do Borocoxó (TO)", third: "Raio de Sol (PE)", city: "Palmas (TO)" },
  { year: 2011, champion: "Junina Tradição (PE)", vice: "Encanto da Juventude (PA)", third: "Junina Babaçu (CE)", city: "Aracaju (SE)" },
  { year: 2010, champion: "Raio de Sol (PE)", vice: "Cafundó do Brejo (TO)", third: "Rancho Alegre (RN)", city: "Rio Branco (AC)" },
  { year: 2009, champion: "Paixão Nordestina (CE)", vice: "Pau Melado (DF)", third: "Traque da Massa (PE)", city: "Fortaleza (CE)" },
  { year: 2008, champion: "Beija Flor do Sertão (CE)", vice: "Si Bobiá a Gente Pimba (DF)", third: "Chapéu do Vovó (GO)", city: "Aparecida de Goiânia (GO)" },
  { year: 2007, champion: "Beija Flor do Sertão (CE)", vice: "Pioneiros na Roça (SE)", third: "Zé Testinha (CE)", city: "Fortaleza (CE)" },
  { year: 2006, champion: "Mala Veia (DF)", vice: "Assum Preto (SE)", third: "QJ Abusados da Roça (GO)", city: "Rio Verde (GO)" },
  { year: 2005, champion: "Assum Preto (SE)", vice: "Arroxa o Nó (DF)", third: "Chapéu do Vovó (GO)", city: "Brasília (DF)" },
];

const ChampionsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? champions : champions.slice(0, 6);

  return (
    <section id="campeoes" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Histórico</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mt-3 mb-6">
            Hall dos Campeões
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todos os campeões do Concurso Nacional de Quadrilhas, desde a primeira edição em 2005.
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
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Campeão</div>
                      <div className="font-semibold text-foreground text-sm">{champion.champion}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Medal className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Vice</div>
                      <div className="text-sm text-foreground">{champion.vice}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">3º lugar</div>
                      <div className="text-sm text-foreground">{champion.third}</div>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Cidade-sede</div>
                  <div className="text-sm font-medium text-foreground">{champion.city}</div>
                  {champion.note && <div className="text-xs text-secondary mt-1 italic">{champion.note}</div>}
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
              Ver todos os campeões ({champions.length - 6} restantes)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChampionsSection;
