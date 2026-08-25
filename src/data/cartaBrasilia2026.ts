// Conteúdo integral da Carta de Brasília 2026, aprovada na Plenária Final do
// III Simpósio Nacional de Quadrilhas Juninas (Brasília/DF, 22 de agosto de 2026).

export type Proposta = { nome: string; texto: string };
export type EixoCarta = { titulo: string; propostas: Proposta[] };

export const cartaPreambulo: string[] = [
  "Nós, delegados, gestores culturais, mestres, brincantes, pesquisadores, jurados, figurinistas, coreógrafos, produtores culturais e demais representantes do movimento junino, reunidos no III Simpósio Nacional de Quadrilhas Juninas, realizado entre os dias 20 e 22 de agosto de 2026, no Eixo Cultural Ibero-Americano, em Brasília, Distrito Federal, com a participação de mais de 300 delegados e mais de 200 participantes, representando 17 Estados da Federação e o Distrito Federal, reunidos em Plenária Final, aprovamos e tornamos públicas as deliberações e proposições resultantes dos debates realizados ao longo deste encontro nacional.",
  "A expressiva participação de representantes de diferentes regiões do país confere a esta Carta amplitude, legitimidade e representatividade nacional, refletindo a diversidade de realidades, experiências, desafios e perspectivas que constituem o movimento junino brasileiro. A presença de representantes de 17 Estados e do Distrito Federal, somada à participação de mais de 500 pessoas entre delegados e participantes de forma rotativa, demonstra a capacidade de mobilização, organização e articulação do movimento junino em âmbito nacional e evidencia que as proposições aqui apresentadas não constituem demandas isoladas ou circunstanciais, mas resultam de um processo coletivo de escuta, debate, construção e deliberação.",
  "Nesse sentido, esta Carta expressa a voz coletiva de um movimento cultural organizado, plural e presente em diferentes territórios brasileiros, constituindo-se como instrumento de diálogo institucional e de reivindicação de políticas públicas permanentes, a ser apresentado às autoridades e aos órgãos responsáveis pela formulação e implementação das políticas culturais nas esferas federal, estadual, distrital e municipal.",
  "O movimento junino constitui uma das mais expressivas manifestações da cultura popular brasileira e representa uma importante cadeia produtiva da economia criativa, mobilizando milhões de pessoas direta e indiretamente e envolvendo trabalhadores, artistas, mestres, brincantes, produtores, profissionais técnicos, empreendedores e agentes culturais em todo o território nacional.",
  "As quadrilhas juninas desempenham, ainda, papel fundamental na preservação da memória coletiva, na transmissão de saberes e fazeres tradicionais, na valorização das identidades regionais e na promoção da inclusão, da participação comunitária e do desenvolvimento cultural, econômico e social.",
  "Diante de sua relevância cultural e de seu impacto na economia criativa brasileira, os participantes do III Simpósio Nacional de Quadrilhas Juninas apresentam, por meio desta Carta, as diretrizes, propostas e deliberações construídas coletivamente nos eixos temáticos do encontro, destinadas ao fortalecimento e à institucionalização de políticas públicas permanentes para o movimento junino.",
];

export const cartaEixos: EixoCarta[] = [
  {
    titulo: "Eixo 1 — Economia Criativa e Sustentabilidade Financeira do Movimento Junino",
    propostas: [
      {
        nome: "Mecanismos Contínuos de Fomento",
        texto:
          "Criação de linhas específicas e permanentes de financiamento público, por meio de Editais e Termos de Fomento, nos termos da MROSC — Lei nº 13.019/2014 — nas esferas federal, estadual e municipal, garantindo o repasse dos recursos com antecedência mínima de seis meses em relação ao ciclo festivo.",
      },
      {
        nome: "Reconhecimento da Cadeia Produtiva",
        texto:
          "Consolidação de programas de crédito facilitado e de incentivos tributários destinados aos microempreendedores que integram a cadeia produtiva do movimento junino, incluindo costureiras, cenógrafos, aderecistas, músicos populares e demais profissionais envolvidos na produção dos festejos.",
      },
      {
        nome: "Capacitação e Captação de Recursos",
        texto:
          "Implementação de módulos nacionais permanentes de formação e capacitação em elaboração de projetos, prestação de contas, utilização do Transferegov e estratégias de captação de recursos junto ao setor privado.",
      },
      {
        nome: "Criação de um Observatório Nacional do Movimento Junino",
        texto:
          "A criação do Observatório Nacional do Movimento Junino constitui medida estratégica para o reconhecimento, a organização e o fortalecimento institucional da cultura junina no Brasil. O Observatório deverá atuar como instrumento permanente de produção, sistematização, monitoramento e difusão de informações sobre o movimento junino, reunindo dados relativos aos grupos, artistas, mestres, trabalhadores, profissionais técnicos, eventos, circuitos, investimentos públicos e privados, geração de trabalho e renda e demais dimensões que compõem essa importante cadeia produtiva da economia criativa. A iniciativa permitirá ampliar a visibilidade e o reconhecimento da dimensão econômica, cultural e social do movimento, contribuindo para a formulação, o planejamento, a execução e a avaliação de políticas públicas baseadas em evidências, bem como para o acompanhamento dos resultados dos investimentos realizados pelo poder público. O Observatório deverá, ainda, constituir-se como espaço de articulação entre o movimento junino, universidades, instituições de pesquisa, órgãos públicos e entidades representativas, promovendo a produção de conhecimento e subsidiando decisões capazes de assegurar maior sustentabilidade, transparência, continuidade e efetividade às políticas públicas destinadas ao setor.",
      },
      {
        nome: "Participação Efetiva do Poder Público",
        texto:
          "Garantia de participação efetiva, contínua e institucionalizada do poder público nos espaços de diálogo, debate e construção coletiva relacionados ao movimento junino, por meio da realização e participação em audiências públicas, fóruns, seminários e demais instâncias de discussão e formulação de políticas culturais. Reivindica-se, ainda, o compromisso das autoridades públicas com a presença institucional no IV Simpósio Nacional de Quadrilhas Juninas, em data a ser definida, fortalecendo o diálogo direto entre gestores públicos e representantes do movimento junino e contribuindo para a construção conjunta de uma agenda permanente de políticas públicas para o setor.",
      },
    ],
  },
  {
    titulo:
      "Eixo 2 — Estética, Inovação e Espetacularização dos Festivais Juninos | Eixo 3 — Tradição em Movimento: Identidade, Memória e Narrativas Contemporâneas",
    propostas: [
      {
        nome: "Salvaguarda do Patrimônio Vivo",
        texto:
          "Reconhecimento oficial das Quadrilhas Juninas como Patrimônio Cultural Imaterial do Brasil, promovendo a preservação de seus saberes tradicionais, narrativas regionais e linguagens artísticas, bem como a criação de instrumentos destinados à valorização, inclusive por meio de premiações, das ações de salvaguarda e dos mestres juninos.",
      },
      {
        nome: "Dramaturgia e Memória Popular",
        texto:
          "Incentivo à pesquisa e à difusão de temas locais e regionais, bem como de temáticas relacionadas à inclusão e aos direitos humanos, nas dramaturgias e composições das quadrilhas juninas.",
      },
      {
        nome: "Integração Curricular Interministerial — MEC/MinC",
        texto:
          "Integração das quadrilhas juninas ao currículo da Educação Básica como patrimônio cultural transdisciplinar e eixo de aprendizagem contínua, como fruto direto da articulação entre o Ministério da Educação (MEC) e o Ministério da Cultura (MinC).",
      },
      {
        nome: "Parceria Escola-Comunidade com a Cultura Viva — Lei nº 15.481/2026",
        texto:
          "Promoção da integração contínua entre as Quadrilhas Juninas locais e as escolas de Educação Básica dos respectivos territórios, utilizando o fazer junino como ferramenta transdisciplinar alinhada ao Projeto Político-Pedagógico (PPP) escolar, viabilizada pela certificação dos grupos juninos como Pontos de Cultura.",
      },
    ],
  },
  {
    titulo: "Eixo 4 — Concursos e Circuitos Competitivos",
    propostas: [
      {
        nome: "Fomento às Premiações",
        texto:
          "Criação de editais específicos destinados ao fomento das premiações dos concursos estaduais e nacionais, garantindo valores suficientes não apenas para a premiação, mas também para subsidiar o deslocamento das quadrilhas nos concursos nacionais realizados pela Confederação e/ou por suas entidades afiliadas.",
      },
    ],
  },
  {
    titulo: "Eixo 5 — Formação, Inclusão e Desenvolvimento Humano nas Quadrilhas",
    propostas: [
      {
        nome: "Letramento para a Diversidade",
        texto:
          "Promoção de processos permanentes de formação, sensibilização e letramento para a diversidade, destinados a dirigentes, brincantes, equipes técnicas, produtores, avaliadores e demais agentes do movimento junino, com o objetivo de fortalecer práticas de respeito, inclusão, acessibilidade e valorização das diferenças. As ações deverão assegurar a participação efetiva, a visibilidade e o reconhecimento das pessoas com deficiência (PCDs) e das pessoas da comunidade LGBTQIA+, contribuindo para a prevenção e o enfrentamento de situações de discriminação, preconceito e exclusão nos espaços de ensaio, produção, convivência e apresentação. Todo esse processo deverá ser desenvolvido em diálogo com os valores, saberes, tradições e identidades que constituem o movimento junino.",
      },
    ],
  },
  {
    titulo: "Eixo 6 — Comunicação, Tecnologia e Direitos",
    propostas: [
      {
        nome: "Digitalização da Memória e Transmissões",
        texto:
          "Promoção da cobertura audiovisual acessível e constituição de acervo digital das apresentações em plataformas públicas.",
      },
    ],
  },
  {
    titulo: "Eixo 7 — Articulação Política e Cultura Viva",
    propostas: [
      {
        nome: "Pontos de Cultura Naturais",
        texto:
          "Reconhecimento pleno e simplificado das Quadrilhas Juninas e das Federações, Ligas e associações Regionais como Pontos de Cultura, no âmbito da Política Nacional de Cultura Viva, instituída pela Lei nº 13.018/2014.",
      },
      {
        nome: "Consolidação do GT Nacional de Cultura Junina",
        texto:
          "Implementação e fortalecimento do Grupo de Trabalho Nacional de Cultura Junina no âmbito do Ministério da Cultura (MinC), bem como criação de Grupos de Trabalho estaduais e municipais destinados à articulação permanente das políticas públicas relacionadas ao movimento junino.",
      },
      {
        nome: "Fortalecimento das Redes e Federações",
        texto:
          "Apoio institucional direto às federações, liga e associações, reconhecendo-as como instâncias legítimas de representação do movimento junino perante os poderes públicos.",
      },
    ],
  },
];

export const cartaProvocacaoTitulo =
  "Provocação ao Poder Público: um chamado ao diálogo estruturante";

export const cartaProvocacao: string[] = [
  "O movimento junino brasileiro não busca apenas aplausos, visibilidade ou reconhecimento pontual durante os períodos festivos. Reivindica participação efetiva nos espaços de formulação, planejamento, execução e avaliação das políticas culturais que impactam sua existência e seu desenvolvimento.",
  "Por essa razão, provocamos e convocamos o Ministério da Cultura (MinC), os Governos Estaduais, os Governos Municipais e do Distrito Federal, bem como suas respectivas Secretarias de Cultura, a ressignificarem e ampliarem a atual visão que possuem do movimento, de modo a reconhecê-lo como uma manifestação cultural permanente e como campo estratégico para a formulação de políticas públicas de Estado.",
  "É necessário reconhecer que, por trás dos grandes espetáculos juninos, existe uma extensa cadeia produtiva constituída por artistas, trabalhadores, profissionais técnicos, empreendedores, mestres, brincantes, pesquisadores, produtores culturais e organizações comunitárias que atuam durante todo o ano.",
  "O movimento junino encontra-se organizado, qualificado e disposto ao diálogo institucional. Apresenta propostas, reúne experiências, produz conhecimento e possui capacidade de contribuir para a construção de políticas públicas capazes de promover desenvolvimento cultural, econômico e social em diferentes territórios brasileiros.",
  "Por isso, colocamo-nos à disposição para construir, em regime de diálogo, cooperação e cogestão, uma agenda nacional permanente de desenvolvimento do movimento junino, articulada entre os diferentes níveis de governo e a sociedade civil organizada.",
  "Esta Carta representa, portanto, um chamado à institucionalização do diálogo e à construção de compromissos concretos entre o poder público e o movimento junino brasileiro.",
];

// Pergunta-síntese destacada como citação dentro da Provocação.
export const cartaPergunta =
  "Até quando uma das maiores manifestações da cultura popular brasileira continuará operando sob a incerteza orçamentária e sustentada, em grande medida, pelo voluntariado e pelo esforço de seus próprios agentes?";

export const cartaFecho: string[] = [
  "As propostas aqui apresentadas constituem a expressão coletiva dos participantes do III Simpósio Nacional de Quadrilhas Juninas e refletem o compromisso de seus representantes com a valorização, o fortalecimento, a sustentabilidade e a continuidade dessa importante manifestação da cultura popular brasileira.",
];

// Frase de encerramento em destaque.
export const cartaEncerramento =
  "O movimento junino está pronto para construir. Cabe agora ao poder público ouvir, dialogar e assumir os compromissos necessários para transformar essas propostas em políticas públicas permanentes.";

export const cartaLocalData = "Brasília — Distrito Federal, 22 de agosto de 2026.";
export const cartaAssinatura = "III Simpósio Nacional de Quadrilhas Juninas";
