import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Mail,
  Target,
  Users,
  Layers,
  Download,
  FileText,
  ScrollText,
  Quote,
  MapPinned,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import simposioCard from "@/assets/simposio-brasilia.jpg";
import {
  cartaPreambulo,
  cartaEixos,
  cartaProvocacaoTitulo,
  cartaProvocacao,
  cartaPergunta,
  cartaFecho,
  cartaEncerramento,
  cartaLocalData,
  cartaAssinatura,
} from "@/data/cartaBrasilia2026";

const MANUAL_URL = "/documentos/manual-do-participante-iii-simposio.pdf";
const CARTA_URL = "/documentos/carta-de-brasilia-2026.pdf";

const numeros = [
  { valor: "3", rotulo: "dias de programação", icon: CalendarDays },
  { valor: "17 + DF", rotulo: "estados representados", icon: MapPinned },
  { valor: "+300", rotulo: "delegados", icon: Users },
  { valor: "+500", rotulo: "participantes", icon: UsersRound },
  { valor: "9", rotulo: "palestrantes", icon: Layers },
  { valor: "1", rotulo: "Carta de Brasília 2026", icon: ScrollText },
];

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
    palestrantes: "Profª. Ma. Larissa Vargas (DF) • Walter Cedro (DF)",
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

const PALESTRAS_BASE = "/simposio/palestras";
const CARDS_BASE = "/simposio/cards";

type Material = {
  nome: string;
  titulacao?: string;
  uf: string;
  slug: string;
  card?: boolean; // possui card ilustrado em /simposio/cards/{slug}.jpg
  pdf?: boolean; // possui apresentação em /simposio/palestras/{slug}.pdf
};

type EixoMaterial = { eixo: string; palestrantes: Material[] };

const materiais: EixoMaterial[] = [
  {
    eixo: "Economia Criativa e Sustentabilidade Financeira do Movimento Junino",
    palestrantes: [
      { nome: "Luara Aquino", titulacao: "Profª. Ma.", uf: "TO", slug: "luara-aquino", card: true, pdf: true },
      { nome: "Ademir Souza", uf: "BA", slug: "ademir-souza", card: true, pdf: true },
    ],
  },
  {
    eixo: "Estética, Inovação e Espetacularização dos Festivais Juninos",
    palestrantes: [
      { nome: "Hipólito Lucena", titulacao: "Prof. Me.", uf: "PB", slug: "hipolito-lucena", card: true, pdf: true },
      { nome: "Samuel Zaratim", titulacao: "Prof. Dr.", uf: "GO", slug: "samuel-zaratim", card: true, pdf: true },
    ],
  },
  {
    eixo: "Tradição em Movimento: Identidade, Memória e Narrativas Contemporâneas",
    palestrantes: [
      { nome: "Larissa Vargas", titulacao: "Profª. Ma.", uf: "DF", slug: "larissa-vargas", card: true, pdf: true },
      { nome: "Walter Cedro", uf: "DF", slug: "walter-cedro", card: true },
    ],
  },
  {
    eixo: "Concursos e Circuitos Competitivos",
    palestrantes: [
      { nome: "Fabrício Alencar", titulacao: "Prof. Me.", uf: "CE", slug: "fabricio-alencar", card: true },
    ],
  },
  {
    eixo: "Formação, Inclusão e Desenvolvimento Humano nas Quadrilhas",
    palestrantes: [
      { nome: "Eduardo Madeiro", titulacao: "Prof. Me.", uf: "RJ", slug: "eduardo-madeiro", card: true, pdf: true },
    ],
  },
  {
    eixo: "Tecnologia, Comunicação e Presença Digital no Movimento Junino",
    palestrantes: [
      { nome: "Alexandre Kieling", titulacao: "Prof. Dr.", uf: "DF", slug: "alexandre-kieling", card: true, pdf: true },
    ],
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
        detalhe: "Economia Criativa (Luara Aquino)",
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
                Evento realizado
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

              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
                <Button asChild size="lg" variant="secondary">
                  <a href="#carta">
                    <ScrollText className="h-4 w-4" />
                    Ler a Carta de Brasília
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a href="#materiais">
                    <FileText className="h-4 w-4" />
                    Materiais das palestras
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a href="#programacao">Ver programação</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Simpósio em números */}
      <section className="bg-secondary py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-sm uppercase tracking-[0.3em] text-secondary-foreground/70">
            O Simpósio em números
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {numeros.map((n) => (
              <div
                key={n.rotulo}
                className="flex flex-col items-center rounded-2xl bg-secondary-foreground/5 p-5 text-center text-secondary-foreground"
              >
                <n.icon className="h-6 w-6 opacity-70" />
                <span className="mt-3 font-display text-3xl font-black leading-none sm:text-4xl">
                  {n.valor}
                </span>
                <span className="mt-2 text-xs font-semibold uppercase tracking-wide opacity-80">
                  {n.rotulo}
                </span>
              </div>
            ))}
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
            Entorno (LINQDFE) como entidade anfitriã, o III Simpósio reuniu federações,
            gestores públicos, pesquisadores, produtores culturais, coreógrafos, brincantes e
            artistas de todo o Brasil.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Foram três dias de debate técnico, acadêmico e institucional sobre a salvaguarda, o
            financiamento, a espetacularização, a governança e o desenvolvimento social do
            movimento junino — que culminaram na redação coletiva da{" "}
            <strong className="text-foreground">Carta de Brasília 2026</strong>.
          </p>
        </div>
      </section>

      {/* Manual do participante */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileText className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Manual do Participante
              </h2>
              <p className="mt-2 text-muted-foreground">
                Programação completa, eixos temáticos, orientações e informações
                úteis sobre o evento e sobre Brasília.
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0">
              <a href={MANUAL_URL} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Baixar (PDF)
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Materiais das palestras */}
      <section id="materiais" className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-secondary">
            <FileText className="h-6 w-6" />
            <span className="text-sm uppercase tracking-[0.3em]">Materiais das palestras</span>
          </div>
          <h2 className="mt-4 text-center font-display text-3xl sm:text-4xl font-bold text-foreground">
            Registro e material de apoio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Conheça os palestrantes por eixo temático: clique em cada card para ler a minibiografia
            e, quando disponível, abra a apresentação em PDF. Material de apoio aos participantes e
            registro histórico do evento.
          </p>

          <div className="mt-12 space-y-10">
            {materiais.map((grupo, i) => (
              <div key={grupo.eixo}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-black text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground">{grupo.eixo}</h3>
                </div>

                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {grupo.palestrantes.map((p) => {
                    const nomeCompleto = [p.titulacao, p.nome].filter(Boolean).join(" ");
                    const cardHref = `${CARDS_BASE}/${p.slug}.jpg`;
                    const pdfHref = `${PALESTRAS_BASE}/${p.slug}.pdf`;

                    return (
                      <div
                        key={p.slug}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                      >
                        {p.card ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className="relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                                aria-label={`Ver card de ${nomeCompleto}`}
                              >
                                <img
                                  src={cardHref}
                                  alt={`Card do palestrante ${nomeCompleto}`}
                                  loading="lazy"
                                  className="aspect-[4/5] w-full object-cover object-top"
                                />
                                <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-black/0 to-transparent p-4 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                                  Ver card completo
                                </span>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg overflow-hidden p-0">
                              <DialogTitle className="sr-only">{nomeCompleto}</DialogTitle>
                              <DialogDescription className="sr-only">
                                Card do palestrante {nomeCompleto} — {p.uf}
                              </DialogDescription>
                              <img
                                src={cardHref}
                                alt={`Card do palestrante ${nomeCompleto}`}
                                className="h-auto w-full"
                              />
                              <div className="flex items-center justify-between gap-3 border-t border-border p-4">
                                <span className="text-sm font-semibold text-muted-foreground">
                                  {p.uf}
                                </span>
                                {p.pdf ? (
                                  <Button asChild size="sm">
                                    <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                                      <Download className="h-4 w-4" />
                                      Abrir apresentação (PDF)
                                    </a>
                                  </Button>
                                ) : (
                                  <span className="text-sm text-muted-foreground">
                                    Sem apresentação disponibilizada
                                  </span>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <div className="flex aspect-[4/5] flex-col items-center justify-center bg-muted p-6 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-muted-foreground">
                              <Users className="h-7 w-7" />
                            </div>
                            <p className="mt-4 font-display font-bold text-foreground">{nomeCompleto}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{p.uf}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-2 border-t border-border p-3">
                          <span className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {p.uf}
                          </span>
                          {p.pdf ? (
                            <Button asChild size="sm" variant="secondary">
                              <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4" />
                                Apresentação (PDF)
                              </a>
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">Sem apresentação</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            O conteúdo das apresentações é de responsabilidade e autoria de cada palestrante e foi
            disponibilizado para fins de estudo e registro.
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
            O que foi debatido
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

      {/* Carta de Brasília 2026 */}
      <section id="carta" className="bg-primary py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-3 text-secondary">
              <ScrollText className="h-6 w-6" />
              <span className="text-sm uppercase tracking-[0.3em]">Documento final</span>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
              Carta de Brasília 2026
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Deliberações e proposições aprovadas coletivamente na Plenária Final do III Simpósio
              Nacional de Quadrilhas Juninas, em 22 de agosto de 2026, dirigidas ao poder público
              como agenda permanente de políticas para o movimento junino.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary">
                <a href={CARTA_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  Baixar a Carta (PDF)
                </a>
              </Button>
            </div>
          </div>

          {/* Documento */}
          <article className="mt-10 overflow-hidden rounded-3xl bg-card shadow-2xl">
            <div className="h-2" style={juninaStrip} />
            <div className="p-6 sm:p-10">
              <div className="space-y-4 text-justify leading-relaxed text-muted-foreground">
                {cartaPreambulo.map((par, i) => (
                  <p key={`pre-${i}`}>{par}</p>
                ))}
              </div>

              {cartaEixos.map((eixo) => (
                <div key={eixo.titulo} className="mt-10">
                  <h3 className="font-display text-lg font-bold text-primary">{eixo.titulo}</h3>
                  <div className="mt-4 space-y-5">
                    {eixo.propostas.map((prop) => (
                      <div
                        key={prop.nome}
                        className="border-l-2 border-secondary/60 pl-4"
                      >
                        <h4 className="font-semibold text-foreground">{prop.nome}</h4>
                        <p className="mt-1 text-justify leading-relaxed text-muted-foreground">
                          {prop.texto}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-10">
                <h3 className="font-display text-lg font-bold text-primary">
                  {cartaProvocacaoTitulo}
                </h3>
                <div className="mt-4 space-y-4 text-justify leading-relaxed text-muted-foreground">
                  {cartaProvocacao.slice(0, 3).map((par, i) => (
                    <p key={`prov-a-${i}`}>{par}</p>
                  ))}
                </div>

                <blockquote className="my-6 rounded-2xl border-l-4 border-secondary bg-muted p-5">
                  <Quote className="h-6 w-6 text-secondary" />
                  <p className="mt-2 font-display text-lg font-semibold italic text-foreground">
                    {cartaPergunta}
                  </p>
                </blockquote>

                <div className="space-y-4 text-justify leading-relaxed text-muted-foreground">
                  {cartaProvocacao.slice(3).map((par, i) => (
                    <p key={`prov-b-${i}`}>{par}</p>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-4 text-justify leading-relaxed text-muted-foreground">
                {cartaFecho.map((par, i) => (
                  <p key={`fecho-${i}`}>{par}</p>
                ))}
              </div>

              <p className="mt-6 font-display text-lg font-bold text-foreground">
                {cartaEncerramento}
              </p>

              <div className="mt-10 border-t border-border pt-6 text-center">
                <p className="font-semibold text-foreground">{cartaLocalData}</p>
                <p className="mt-1 text-sm uppercase tracking-widest text-secondary">
                  {cartaAssinatura}
                </p>
              </div>
            </div>
          </article>
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

          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="secondary">
              <a href="#materiais">
                <FileText className="h-4 w-4" />
                Materiais das palestras
              </a>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default SimposioBrasilia;
