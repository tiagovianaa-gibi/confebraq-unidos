// Conteúdo integral do Relatório da Plenária Final do III Simpósio Nacional de
// Quadrilhas Juninas (Brasília/DF, 20 a 22 de agosto de 2026). O relatório
// sistematiza as sínteses dos eixos temáticos e as propostas aprovadas, das
// quais a Área I (Políticas Públicas) foi incorporada à Carta de Brasília 2026.

export type RelatorioEixo = {
  numero: string;
  titulo: string;
  sintese: string[];
  propostas: string[];
  semPropostas?: string;
};

// Parágrafos de introdução (contextualização e as três áreas de proposições).
export const relatorioIntro: string[] = [
  "O III Simpósio Nacional de Quadrilhas Juninas constituiu-se como um importante espaço de encontro, diálogo, reflexão e construção coletiva em torno dos desafios, das potencialidades e dos caminhos para o fortalecimento do Movimento Junino brasileiro. Realizado em Brasília, entre os dias 20 e 22 de agosto de 2026, no Eixo Cultural Ibero-Americano, o evento reuniu mais de 300 delegados e mais de 200 participantes, contando com representantes de 17 Estados da Federação e do Distrito Federal. O Simpósio reuniu gestores culturais, mestres, brincantes, pesquisadores, avaliadores, coreógrafos, figurinistas, produtores culturais e representantes de diferentes regiões do país, promovendo debates sobre temas fundamentais para a salvaguarda, a valorização, a sustentabilidade, a inovação e o desenvolvimento do movimento. A expressiva participação nacional conferiu legitimidade às discussões e reafirmou a importância da construção coletiva de propostas capazes de contribuir para o reconhecimento e a consolidação de políticas públicas permanentes para as Quadrilhas Juninas.",
  "Este Relatório Final apresenta a sistematização das principais reflexões, debates e propostas construídas ao longo dos eixos temáticos e consolidadas na Plenária Final do III Simpósio Nacional de Quadrilhas Juninas. As proposições apresentadas foram organizadas em três grandes áreas: I — Políticas Públicas, cujas propostas foram incorporadas à Carta de Brasília 2026, como expressão das reivindicações e diretrizes do Movimento Junino brasileiro perante o poder público; II — Demandas destinadas às entidades filiadas à CONFEBRAQ; e III — Demandas destinadas à própria CONFEBRAQ. As propostas relacionadas às duas últimas áreas serão devidamente encaminhadas para apreciação, discussão e deliberação pelas entidades filiadas e pela CONFEBRAQ, no âmbito de suas respectivas assembleias e instâncias deliberativas. Dessa forma, o presente relatório registra não apenas os encaminhamentos construídos durante o encontro, mas também estabelece os caminhos institucionais necessários para que as propostas apresentadas possam ser analisadas e deliberadas pelos atores responsáveis por sua implementação.",
];

// Seção 1 — Apresentação.
export const relatorioApresentacao: string[] = [
  "A Plenária Final do III Simpósio Nacional de Quadrilhas Juninas consolidou as discussões, reflexões e propostas apresentadas ao longo dos diferentes eixos temáticos do evento.",
  "O Simpósio teve como objetivo promover o debate técnico, acadêmico e institucional sobre a salvaguarda, o financiamento, a espetacularização, a governança e o desenvolvimento social do Movimento Junino. A iniciativa buscou alinhar diretrizes nacionais, fomentar a inovação sustentável e consolidar propostas coletivas que culminaram na redação da Carta de Brasília 2026.",
  "O presente relatório sistematiza as sínteses dos eixos e as propostas apresentadas na Plenária Final, preservando o conteúdo registrado durante o Simpósio.",
];

// Seção 2 — Eixos temáticos, sínteses e propostas aprovadas.
export const relatorioEixos: RelatorioEixo[] = [
  {
    numero: "2.1",
    titulo: "Economias Criativas e Sustentabilidade Financeira do Movimento Junino",
    sintese: [
      "O eixo discutiu estratégias para garantir a sustentabilidade financeira e a profissionalização das Quadrilhas Juninas.",
      "Foram abordados mecanismos de financiamento, como a Lei Rouanet, a Política Nacional Aldir Blanc, editais, emendas parlamentares e parcerias públicas.",
      "Destacou-se a importância da formalização jurídica dos grupos, da criação de CNPJ, da organização institucional e da inserção em programas como os Pontos de Cultura.",
      "Também foram apresentadas ferramentas de gestão e captação, como portfólio artístico, clipping, mídia kit, apresentação comercial, redes sociais e planejamento financeiro.",
      "A síntese do eixo aponta que o Movimento Junino precisa superar a informalidade, ampliar a formação técnica e fortalecer sua capacidade de acessar políticas públicas.",
      "A quadrilha foi reconhecida como parte da economia criativa, capaz de gerar trabalho, renda, circulação cultural e desenvolvimento territorial.",
    ],
    propostas: [
      "Captação de recursos para o Concurso Nacional da CONFEBRAQ, com liberdade para divulgação de apoiadores durante as apresentações.",
      "Unificação dos tempos de produção, apresentação e dispersão das quadrilhas no concurso nacional.",
      "Oferta de assessoria contábil e jurídica para abertura de CNPJ e estruturação institucional.",
      "Elaboração de um guia orientativo para captação via Lei Rouanet.",
      "Criação de categoria específica “Quadrilhas Juninas” em editais federais.",
      "Implantação da Escola Nacional do Movimento Junino em formato EAD.",
      "Realização de audiência pública e organização do 4º Simpósio com autoridades.",
      "Reconhecimento das quadrilhas como Escolas Livres da Cultura.",
      "Ampliação de editais para quadrilhas infantis e atuação nas escolas.",
    ],
  },
  {
    numero: "2.2",
    titulo: "Estética, Inovação e Espetacularização",
    sintese: [
      "O eixo refletiu sobre o corpo, a identidade, a coreografia, o figurino, a música e a inovação estética nos festivais juninos.",
      "A quadrilha foi apresentada como uma linguagem cênica capaz de absorver questões do tempo presente, mantendo, porém, vínculos com suas referências regionais e culturais.",
      "O corpo foi compreendido como arquivo vivo, portador de memórias e experiências coletivas.",
      "A coreografia foi analisada como dramaturgia do movimento, construída a partir dos corpos que a executam e das narrativas que o grupo deseja comunicar.",
      "A síntese do eixo indica que a inovação estética é legítima quando não apaga a essência da cultura junina.",
    ],
    propostas: [
      "Criação de acervo digital pelas federações, com acompanhamento da CONFEBRAQ.",
      "Construção de matriz estética de referência regional para subsidiar avaliações e formações.",
      "Criação de instrumento de valorização dos mestres e salvaguardas juninos.",
      "Fiscalização das ações e assembleias das federações filiadas à CONFEBRAQ.",
    ],
  },
  {
    numero: "2.3",
    titulo: "Concursos e Circuitos Competitivos",
    sintese: [
      "O eixo debateu a organização dos concursos juninos, com foco nos critérios de avaliação, na ética, na transparência e na formação dos avaliadores.",
      "A quadrilha foi reconhecida simultaneamente como cultura popular tradicional, manifestação artística e patrimônio imaterial.",
      "Defendeu-se a construção coletiva de critérios avaliativos mais claros, equilibrados e adequados às diferentes realidades regionais.",
      "A avaliação deve considerar aspectos técnicos, artísticos, estéticos e éticos, sem transformar os concursos em instrumentos de homogeneização cultural.",
      "Também foram discutidas a subjetividade das notas, a formação dos jurados, a proporcionalidade regional das mesas avaliadoras, a valorização dos elementos tradicionais, como o casamento junino, e o respeito às diversidades de gênero, raça e orientação sexual.",
    ],
    propostas: [
      "Formação nacional pautada na regionalidade e nas particularidades de cada estado, com participação ampla de avaliadores, fazedores e público.",
      "Moção para realização de simpósios estaduais, fortalecendo a formação descentralizada.",
      "Congresso técnico antes do Concurso Nacional, reunindo jurados, quadrilhas, brincantes e fazedores.",
      "Mediação da CONFEBRAQ para organização de simpósios de quadrilhas mirins.",
      "Inclusão da contribuição das mãos LGBTQIAPN+ na construção do São João e combate a discursos de intolerância nos eventos da CONFEBRAQ.",
    ],
  },
  {
    numero: "2.4",
    titulo: "Formações, Inclusão e Desenvolvimento Humano nas Quadrilhas",
    sintese: [
      "O eixo refletiu sobre a importância da inclusão, da acessibilidade, da diversidade e da garantia de direitos nas Quadrilhas Juninas.",
      "A cultura popular foi compreendida como manifestação viva, plural e em constante transformação, formada pelas trocas entre territórios, gerações e linguagens artísticas.",
      "A participação de pessoas negras, LGBTQIAPN+, pessoas com deficiência, diferentes corpos e faixas etárias foi defendida não apenas como presença, mas como protagonismo legítimo.",
      "Também foram enfatizadas a saúde mental, a segurança, o pertencimento e as condições adequadas para a participação dos brincantes.",
      "O eixo reforçou que preservar a memória não significa impedir a atualização da manifestação. A formação humana deve caminhar junto com a valorização da diversidade, da pesquisa, do registro das memórias e do respeito às diferentes identidades.",
    ],
    propostas: [
      "Revisão de regulamentos para garantir papéis de destaque independentemente de gênero.",
      "Criação de espaços permanentes de discussão sobre preconceito.",
      "Promoção de encontros de pesquisadores.",
      "Debates sobre acessibilidade na linguagem da dança.",
      "Inclusão do letramento junino e da temática da diversidade nas próximas edições do Simpósio.",
    ],
  },
  {
    numero: "2.5",
    titulo: "Tradições em Movimento: Identidade, Memória e Narrativas Contemporâneas",
    sintese: [
      "O eixo discutiu a quadrilha junina contemporânea como uma manifestação cultural em permanente processo de criação, apropriação, transformação e reinvenção.",
      "A dramaturgia, o figurino, a cenografia, a música, os personagens, a coreografia e os elementos visuais foram analisados como componentes da construção de novas narrativas.",
      "A quadrilha foi compreendida como uma linguagem cênica híbrida, que articula dança, teatro, performance e dramaturgia.",
      "O corpo aparece como texto, memória e elemento dramatúrgico, enquanto a estética é entendida como experiência sensível capaz de comunicar valores, histórias e identidades.",
      "O eixo defendeu a preservação das referências tradicionais sem impedir a inovação. Ressaltou-se a necessidade de respeitar as identidades regionais, contextualizar os elementos incorporados aos espetáculos e evitar fragmentações que possam descaracterizar a manifestação.",
      "O eixo dialogou ainda com o conceito de Ponto de Cultura como entidade, coletivo ou grupo cultural reconhecido oficialmente pela Política Nacional de Cultura Viva, cuja missão central é a preservação, salvaguarda e promoção das tradições do ciclo junino e da cultura popular.",
      "Foram abordados aspectos estruturantes da política cultural, destacando a importância da formalização das organizações, da capilaridade territorial, da mobilização comunitária e da produção de dados sobre grupos existentes.",
      "Discutiu-se também o papel dos Pontões de Cultura, a relevância da representação nacional e as possibilidades de participação dos grupos juninos em políticas públicas, editais e programas do Ministério da Cultura.",
    ],
    propostas: [
      "Criação de um banco de dados nacional sobre Quadrilhas Juninas, mediado pela CONFEBRAQ, alimentado pelas entidades estaduais.",
      "Inclusão do quesito TEMA na avaliação da CONFEBRAQ.",
      "Inclusão do quesito CASAMENTO na avaliação da CONFEBRAQ.",
      "Convocação de representantes estaduais para atualização do regulamento da CONFEBRAQ no segundo semestre de 2026.",
      "Criação de um núcleo permanente para atuação e fomento das quadrilhas infanto-juvenis.",
      "Formação técnica nacional de avaliadores, com enfoque multicultural e respeito às identidades regionais.",
      "Recomendação para que avaliadores considerem informações presentes nas sinopses, evitando despontuações indevidas.",
    ],
  },
  {
    numero: "2.6",
    titulo: "Tecnologias, Comunicação e Presença Digital no Movimento Junino",
    sintese: [
      "A atividade contribuiu diretamente para o eixo ao aprofundar o entendimento sobre o uso da tecnologia como ferramenta de fortalecimento do Movimento Junino.",
      "A palestra evidenciou que a presença digital qualificada amplia a visibilidade, a circulação e o impacto cultural das quadrilhas, reforçando sua relevância no cenário contemporâneo.",
      "Também foram abordadas atividades, bens e relações econômicas baseadas na geração de produtos culturais, tecnológicos e científicos, sustentados pelo capital intelectual e pela inovação.",
      "Foi ressaltado que o Movimento Junino movimenta aproximadamente 9 bilhões de reais, mobilizando 140 milhões de pessoas, sendo 45 milhões diretamente envolvidas.",
      "A palestra enfatizou a importância da inclusão social, da função cultural e do papel das quadrilhas como agentes de impacto simbólico e econômico.",
    ],
    propostas: [],
    semPropostas: "Não houve propostas apresentadas para este eixo.",
  },
];

// Seção 3 — Considerações finais.
export const relatorioConsideracoes: string[] = [
  "A Plenária Final reuniu as principais reflexões e propostas construídas nos diferentes eixos do III Simpósio Nacional de Quadrilhas Juninas.",
  "As discussões registradas apontam para a necessidade de fortalecimento institucional, profissionalização, sustentabilidade financeira, valorização das referências regionais, qualificação dos processos avaliativos, formação dos agentes do Movimento Junino, ampliação da inclusão e da acessibilidade, preservação das memórias e utilização estratégica da tecnologia e da comunicação.",
  "As propostas apresentadas abrangem diferentes dimensões do Movimento Junino, incluindo financiamento, políticas públicas, formação, concursos, avaliação, salvaguarda, pesquisa, diversidade, atuação com crianças e adolescentes, comunicação e presença digital.",
  "O conjunto das discussões e proposições constitui subsídio para a consolidação das diretrizes nacionais e para a redação da Carta de Brasília 2026, conforme objetivo estabelecido para o Simpósio.",
];

export const relatorioLocalData = "Brasília — Distrito Federal, 22 de agosto de 2026.";
export const relatorioAssinatura = "III Simpósio Nacional de Quadrilhas Juninas";
