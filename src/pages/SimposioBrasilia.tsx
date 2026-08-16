import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Mail, Target, Users, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import simposioCard from "@/assets/simposio-brasilia.png";

const juninaStrip = {
  background: `repeating-linear-gradient(90deg,
    hsl(0 72% 50%) 0px, hsl(0 72% 50%) 30px,
    hsl(45 95% 55%) 30px, hsl(45 95% 55%) 60px,
    hsl(140 55% 40%) 60px, hsl(140 55% 40%) 90px,
    hsl(235 65% 25%) 90px, hsl(235 65% 25%) 120px,
    hsl(25 90% 55%) 120px, hsl(25 90% 55%) 150px
  )`,
};

const eixos = [
  {
    titulo: "Economia Criativa e Sustentabilidade Financeira do Movimento Junino",
    palestrantes: "Profª. Ma. Luara Aquino (TO) • Ademir Souza (BA)",
  },
  {
    titulo: "Estética, Inovação e Espetacularização dos Festivais Juninos",
    palestrantes: "Prof. Dr. Samuel Zaratim (GO) • Prof. Me. Hipólito Lucena (PB)",
  },
  {
    titulo: "Tradição em Movimento: Identidade, Memória e Narrativas Contemporâneas",
    palestrantes:
      "Prof. Dr. Marco Teixeira (RO) • Profª. Ma. Larissa Vargas (DF) • Walter Cedro (DF)",
  },
  {
    titulo: "Concursos e Circuitos Competitivos",
    palestrantes: "Prof. Me. Fabrício Alencar (CE)",
  },
  {
    titulo: "Formação, Inclusão e Desenvolvimento Humano nas Quadrilhas",
    palestrantes: "Prof. Me. Eduardo Madeiro (RJ)",
  },
  {
    titulo: "Tecnologia, Comunicação e Presença Digital no Movimento Junino",
    palestrantes: "Prof. Dr. Alexandre Kieling (DF)",
  },
];

type Atividade = { horario: string; titulo: string; detalhe?: string; destaque?: boolean };

const programacao: { dia: string; data: string; itens: Atividade[] }[] = [
  {
    dia: "Dia 1",
    data: "20/08 — Quinta-feira",
    itens: [
      { horario: "15h", titulo: "Credenciamento", detalhe: "Teatro Plínio Marcos" },
      {
        horario: "16h – 17h30",
        titulo: "Cerimônia Oficial de Abertura e Boas-Vindas",
        detalhe: "Sala Grande Roda",
        destaque: true,
      },
      {
        horario: "17h30 – 20h",
        titulo: "Palestras dos Eixos Temáticos",
        detalhe:
          "Economia Criativa (Luara Aquino) • Tradição em Movimento (Marco Teixeira)",
      },
      {
        horario: "20h – 22h",
        titulo: "Jantar Oficial",
        detalhe: "Apresentações culturais e musicais",
      },
    ],
  },
  {
    dia: "Dia 2",
    data: "21/08 — Sexta-feira",
    itens: [
      {
        horario: "08h – 12h",
        titulo: "Palestras dos Eixos Temáticos",
        detalhe:
          "Estética e Espetacularização (Hipólito Lucena • Samuel Zaratim) • Tradição em Movimento (Larissa Vargas)",
      },
      { horario: "12h – 13h50", titulo: "Almoço Oficial" },
      {
        horario: "14h – 18h30",
        titulo: "Palestras dos Eixos Temáticos",
        detalhe:
          "Concursos e Circuitos (Fabrício Alencar) • Formação e Inclusão (Eduardo Madeiro) • Economia Criativa (Ademir Souza)",
      },
      { horario: "19h – 22h", titulo: "Jantar Oficial", detalhe: "Apresentações culturais e musicais" },
    ],
  },
  {
    dia: "Dia 3",
    data: "22/08 — Sábado",
    itens: [
      {
        horario: "08h – 12h",
        titulo: "Palestras dos Eixos Temáticos",
        detalhe:
          "Movimento Junino como Ponto de Cultura (Walter Cedro) • Tecnologia e Presença Digital (Alexandre Kieling)",
      },
      {
        horario: "08h – 15h30",
        titulo: "Encontro Nacional de Avaliadores",
        detalhe: "Mediação: Alexa Guerra (DF), Fabrício Alencar (CE) e Gilson Cezzar (DF)",
      },
      { horario: "12h – 14h", titulo: "Almoço Oficial" },
      {
        horario: "15h30 – 17h30",
        titulo: "Plenária Final",
        detalhe: "Leitura e aprovação da Carta de Brasília 2026 e encerramento oficial",
        destaque: true,
      },
      {
        horario: "17h30 – 19h30",
        titulo: "Jantar Oficial e Confraternização",
      },
    ],
  },
];

const SimposioBrasilia = () => {
  useEffect(() => {
    document.title = "III Simpósio Nacional de Quadrilhas Juninas | CONFEBRAQ";
    const descriptionElement = document.querySelector('meta[name="description"]');
    if (descriptionElement) {
      descriptionElement.setAttribute(
        "content",
        "III Simpósio Nacional de Quadrilhas Juninas — Brasília/DF, 20 a 22 de agosto de 2026. Tradição que se reinventa: cultura, inovação e futuro do movimento junino.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-primary pt-28 pb-16">
        <div className="absolute top-0 left-0 right-0 h-2" style={juninaStrip} />
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
                20 a 22 de agosto de 2026
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl font-black leading-tight">
                III Simpósio Nacional de Quadrilhas Juninas
              </h1>
              <p className="mt-4 text-lg font-semibold text-secondary">
                Tradição que se reinventa: cultura, inovação e futuro do movimento junino
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <span className="font-semibold">20, 21 e 22 de agosto de 2026</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <span className="font-semibold">
                    Eixo Cultural Ibero-Americano — Brasília / DF
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <a href="#programacao">Ver programação</a>
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

      {/* Sobre / Objetivo */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-secondary">
            <Target className="h-6 w-6" />
            <span className="text-sm uppercase tracking-[0.3em]">Sobre o evento</span>
          </div>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl font-bold text-foreground">
            Um encontro nacional da cultura junina
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Promovido pela Confederação Brasileira de Entidades de Quadrilhas Juninas
            (CONFEBRAQ), com a Liga Independente de Quadrilhas Juninas do Distrito Federal e
            Entorno (LINQDFE) como entidade anfitriã, o III Simpósio reúne federações,
            gestores públicos, pesquisadores, produtores culturais, coreógrafos, brincantes e
            artistas de todo o Brasil.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            São três dias de debate técnico, acadêmico e institucional sobre a salvaguarda, o
            financiamento, a espetacularização, a governança e o desenvolvimento social do
            movimento junino — culminando na redação coletiva da{" "}
            <strong className="text-foreground">Carta de Brasília 2026</strong>.
          </p>
        </div>
      </section>

      {/* Eixos temáticos */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-secondary">
            <Layers className="h-6 w-6" />
            <span className="text-sm uppercase tracking-[0.3em]">Eixos temáticos</span>
          </div>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl font-bold text-foreground">
            O que será debatido
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eixos.map((eixo, i) => (
              <div
                key={eixo.titulo}
                className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="font-display text-3xl font-black text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                  {eixo.titulo}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{eixo.palestrantes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programação */}
      <section id="programacao" className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-secondary">
            <CalendarDays className="h-6 w-6" />
            <span className="text-sm uppercase tracking-[0.3em]">Programação</span>
          </div>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl font-bold text-foreground">
            Três dias de atividades
          </h2>

          <div className="mt-12 space-y-10">
            {programacao.map((dia) => (
              <div key={dia.dia} className="rounded-3xl border border-border bg-card overflow-hidden">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 bg-primary px-6 py-4 text-primary-foreground">
                  <span className="font-display text-2xl font-black">{dia.dia}</span>
                  <span className="text-sm uppercase tracking-widest text-secondary">
                    {dia.data}
                  </span>
                </div>
                <ul className="divide-y divide-border">
                  {dia.itens.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-6"
                    >
                      <span className="w-32 shrink-0 font-semibold text-secondary">
                        {item.horario}
                      </span>
                      <div>
                        <p
                          className={
                            item.destaque
                              ? "font-display font-bold text-foreground"
                              : "font-semibold text-foreground"
                          }
                        >
                          {item.titulo}
                        </p>
                        {item.detalhe && (
                          <p className="mt-1 text-sm text-muted-foreground">{item.detalhe}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local + Contato */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center gap-3 text-secondary">
                <MapPin className="h-6 w-6" />
                <span className="text-sm uppercase tracking-[0.3em]">Local</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                Eixo Cultural Ibero-Americano
              </h3>
              <p className="mt-3 text-muted-foreground">
                Setor de Divulgação Cultural, Lote 02 — Eixo Monumental, entre o Centro de
                Convenções e a Torre de TV. Plano Piloto, Brasília/DF.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Espaços do evento: Teatro Plínio Marcos, Sala Cássia Eller e Galeria Fayga
                Ostrower, interligados pelo Espaço Marquise.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center gap-3 text-secondary">
                <Users className="h-6 w-6" />
                <span className="text-sm uppercase tracking-[0.3em]">Realização</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                CONFEBRAQ
              </h3>
              <p className="mt-3 text-muted-foreground">
                Confederação Brasileira de Entidades de Quadrilhas Juninas, com apoio da
                entidade anfitriã LINQDFE e incentivo do Ministério da Cultura.
              </p>
              <a
                href="mailto:simposioconfebraq@gmail.com"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:text-secondary"
              >
                <Mail className="h-5 w-5" />
                simposioconfebraq@gmail.com
              </a>
            </div>
          </div>

          <p className="mt-10 text-center text-base font-semibold text-foreground">
            Em breve, mais informações e a abertura das inscrições.
          </p>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default SimposioBrasilia;
