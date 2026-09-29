/**
 * Todo o texto e os dados da Escola vivem aqui.
 * Para duplicar a página para outra escola, troque este arquivo e src/assets/.
 * Nenhum componente contém copy.
 */

export type TemaIcone =
  | 'pulmao'
  | 'pele'
  | 'placas'
  | 'intestino'
  | 'borboleta'
  | 'articulacao'
  | 'escudo'
  | 'neuronio';

export interface Encontro {
  /** 01–08 */
  numero: string;
  /** ISO, usado no JSON-LD e no .ics */
  data: string;
  /** "18 mar" */
  dataCurta: string;
  tema: string;
  especialidades: string[];
  icone: TemaIcone;
}

export interface Realizador {
  nome: string;
  descricao: string;
  logo: 'on' | 'immunogenic' | 'alergologica';
  url?: string;
}

export interface PassoTempo {
  hora?: string;
  titulo: string;
  descricao: string;
}

export const escola = {
  nome: 'Escola Continuada de Doenças Imunomediadas',
  temporada: '2027',
  cidade: 'Campinas',
  uf: 'SP',

  local: {
    nome: 'APM Campinas — Associação Paulista de Medicina, Regional Campinas',
    nomeCurto: 'APM Campinas',
    logradouro: 'Rua Delfino Cintra, 63',
    bairro: 'Centro',
    cep: '13013-055',
    endereco: 'Rua Delfino Cintra, 63 — Centro, Campinas/SP, CEP 13013-055',
    cidade: 'Campinas',
    uf: 'SP',
    pais: 'BR',
    telefone: '(19) 3231-2811',
    mapsQuery: 'Rua Delfino Cintra, 63 - Centro, Campinas - SP, 13013-055',
  },

  horario: {
    inicio: '19:00',
    fim: '21:30',
    diaDaSemana: 'quintas-feiras',
    fuso: 'America/Sao_Paulo',
  },

  seo: {
    title: 'Escola Continuada de Doenças Imunomediadas — Temporada 2027, Campinas',
    description:
      'Oito encontros presenciais na APM Campinas, de março a novembro de 2027. Um caso clínico real por encontro, discutido entre doze especialidades. Cem vagas na turma inaugural.',
    ogAlt: 'Escola Continuada de Doenças Imunomediadas — temporada 2027, Campinas',
  },

  header: {
    cta: 'Inscreva-se',
  },

  hero: {
    selo: 'Inscrições abertas',
    contexto: 'Campinas · março a novembro de 2027',
    titulo:
      'Oito eventos para mudar a forma como você discute pacientes com doenças imunomediadas.',
    apoio:
      'Um caso clínico real por encontro. Debate aberto entre especialidades. A ciência que muda a conduta na segunda-feira.',
    numeros: [
      { valor: '8', rotulo: 'encontros presenciais' },
      { valor: '100', rotulo: 'vagas na turma' },
      { valor: '12+', rotulo: 'especialidades na mesma sala' },
    ],
    cta: 'Garantir minha vaga',
    ctaNota: 'Sempre às quintas, 19h, na APM Campinas.',
    realizacao: 'Uma realização',
  },

  porQueExiste: {
    rotulo: 'Por que esta escola existe',
    titulo: 'Você já atendeu esse paciente. E ele já passou por outros consultórios.',
    paragrafos: [
      'Asma grave, dermatite atópica, psoríase, doença inflamatória intestinal, lúpus, artrite reumatoide, imunodeficiências e neuropatias autoimunes são doenças imunomediadas, abordadas em consultórios isoladamente.',
      'A Escola Continuada de Doenças Imunomediadas nasce para reunir, uma vez por mês, os médicos que atendem esse mesmo paciente — e colocá-los na mesma discussão, diante do mesmo caso.',
    ],
    principios: [
      {
        titulo: 'Caso real, não teoria',
        descricao: 'Cada encontro abre com um paciente da prática dos realizadores.',
      },
      {
        titulo: 'Debate entre pares',
        descricao: 'Condutas divergentes discutidas abertamente, sem plateia passiva.',
      },
      {
        titulo: 'Turma pequena',
        descricao: 'Cem vagas para preservar a qualidade da discussão.',
      },
    ],
    publicoTitulo: 'Para quem é',
    publico:
      'Médicos alergistas e imunologistas, pneumologistas, otorrinolaringologistas, dermatologistas, reumatologistas, gastroenterologistas, neurologistas, pediatras, clínicos, infectologistas, hematologistas e geneticistas, além de residentes, fellows e pós-graduandos dessas áreas.',
  },

  temporadaSecao: {
    rotulo: 'A temporada',
    titulo: 'Oito encontros presenciais. Oito temas. Um por mês.',
    apoio:
      'Cada evento é dedicado a um grupo de doenças, com caso clínico, discussão dirigida e atualização científica com especialista convidado.',
    agendaCta: 'Adicionar à agenda',
    rodape:
      'Sempre às quintas-feiras, 19h, na APM Campinas — Rua Delfino Cintra, 63, Centro.',
    selo: '100% presencial',
  },

  encontros: [
    {
      numero: '01',
      data: '2027-03-18',
      dataCurta: '18 mar',
      tema: 'Asma grave e rinossinusite crônica com polipose nasal',
      especialidades: ['Pneumologia', 'Otorrinolaringologia', 'Alergia'],
      icone: 'pulmao',
    },
    {
      numero: '02',
      data: '2027-04-15',
      dataCurta: '15 abr',
      tema: 'Dermatite atópica e urticária crônica',
      especialidades: ['Dermatologia', 'Alergia', 'Pediatria'],
      icone: 'pele',
    },
    {
      numero: '03',
      data: '2027-05-20',
      dataCurta: '20 mai',
      tema: 'Psoríase',
      especialidades: ['Dermatologia', 'Reumatologia'],
      icone: 'placas',
    },
    {
      numero: '04',
      data: '2027-06-17',
      dataCurta: '17 jun',
      tema: 'Doenças inflamatórias intestinais',
      especialidades: ['Gastroenterologia', 'Clínica médica'],
      icone: 'intestino',
    },
    {
      numero: '05',
      data: '2027-08-19',
      dataCurta: '19 ago',
      tema: 'Lúpus eritematoso sistêmico',
      especialidades: ['Reumatologia', 'Nefrologia', 'Clínica'],
      icone: 'borboleta',
    },
    {
      numero: '06',
      data: '2027-09-16',
      dataCurta: '16 set',
      tema: 'Artrite reumatoide e espondiloartrites',
      especialidades: ['Reumatologia', 'Ortopedia', 'Clínica'],
      icone: 'articulacao',
    },
    {
      numero: '07',
      data: '2027-10-21',
      dataCurta: '21 out',
      tema: 'Imunodeficiências primárias e secundárias',
      especialidades: ['Imunologia', 'Hematologia', 'Infectologia'],
      icone: 'escudo',
    },
    {
      numero: '08',
      data: '2027-11-11',
      dataCurta: '11 nov',
      tema: 'Neuropatias autoimunes e neuroimunologia',
      especialidades: ['Neurologia', 'Imunologia'],
      icone: 'neuronio',
    },
  ] satisfies Encontro[],

  comoE: {
    rotulo: 'Como é o encontro',
    titulo: 'Duas horas e meia desenhadas para discussão.',
    apoio:
      'Não é aula expositiva. O caso abre o encontro, a turma discute, o especialista traz a evidência e a mesa fecha com as condutas possíveis.',
    linha: [
      {
        hora: '19h00',
        titulo: 'Credenciamento e café',
        descricao: 'Chegada da turma e conversa antes de começar.',
      },
      {
        hora: '19h30',
        titulo: 'O caso clínico',
        descricao: 'Um paciente real é apresentado à turma.',
      },
      {
        hora: '20h00',
        titulo: 'A discussão',
        descricao: 'Diagnóstico diferencial e condutas em debate aberto.',
      },
      {
        hora: '20h30',
        titulo: 'A ciência',
        descricao: 'Atualização com o especialista convidado do tema.',
      },
      {
        hora: '21h00',
        titulo: 'Mesa multidisciplinar',
        descricao: 'Cada especialidade devolve o seu olhar sobre o caso.',
      },
      {
        // exibido apenas quando showEndTime está ligado
        hora: '21h30',
        titulo: 'Networking',
        descricao: 'A conversa continua no coffee.',
        horaCondicional: true,
      },
    ],
    principios: [
      {
        titulo: 'Discussão dirigida',
        descricao: 'A turma opina antes da resposta. O erro faz parte do método.',
      },
      {
        titulo: 'Especialista convidado',
        descricao: 'Um nome diferente a cada tema, trazendo a evidência atual.',
      },
      {
        titulo: 'Sem palestra comercial',
        descricao: 'Conteúdo definido pelo corpo científico, sem indicação de produto.',
      },
    ],
  },

  lugar: {
    rotulo: 'O lugar',
    titulo: 'A Casa do Médico, no centro de Campinas.',
    paragrafos: [
      'Os oito encontros acontecem na APM Campinas — a regional da Associação Paulista de Medicina na cidade, a Sociedade de Medicina e Cirurgia de Campinas. A casa recebe cerca de 300 eventos científicos por ano e fica no Centro, a poucos minutos de quem vem pela Norte-Sul ou pela Anhanguera.',
      'A turma usa três espaços na mesma noite: a recepção no credenciamento, o anfiteatro na discussão do caso e o terraço no coffee do fim.',
    ],
    espacos: [
      {
        foto: 'recepcao',
        titulo: 'Recepção',
        descricao: 'Onde a turma chega, se credencia e toma o café das 19h.',
        alt: 'Recepção da APM Campinas, com balcão de atendimento e máquina de café',
      },
      {
        foto: 'anfiteatro',
        titulo: 'Anfiteatro',
        descricao: 'O caso clínico, a discussão dirigida e a mesa multidisciplinar.',
        alt: 'Anfiteatro da APM Campinas montado em formato auditório',
      },
      {
        foto: 'terraco',
        titulo: 'Terraço',
        descricao: 'O coffee do fim, quando a conversa continua fora da sala.',
        alt: 'Terraço da APM Campinas, com mesas redondas e vista para a cidade',
      },
    ],
    comoChegarTitulo: 'Como chegar',
    comoChegarCta: 'Abrir no Google Maps',
    mapaCta: 'Abrir no Google Maps',
    informacoes: [
      {
        titulo: 'Endereço',
        texto: 'Rua Delfino Cintra, 63 — Centro, Campinas/SP. CEP 13013-055.',
      },
      {
        titulo: 'Estacionamento',
        texto: 'Marechal Park, na Rua Delfino Cintra, 33, ao lado da casa, é conveniado.',
      },
      {
        titulo: 'Secretaria',
        texto: '(19) 3231-2811, de segunda a sexta, das 8h às 18h.',
      },
    ],
  },

  quemConduz: {
    rotulo: 'Quem conduz',
    titulo: 'Três casas que já dividem pacientes, laboratório e sala de aula.',
    realizadores: [
      {
        nome: 'ON Educação',
        logo: 'on',
        descricao:
          'Instituição de ensino com pós-graduações e cursos livres reconhecidos, plataforma EAD própria e certificação.',
      },
      {
        nome: 'Immunogenic',
        logo: 'immunogenic',
        descricao:
          'Laboratório pioneiro em triagem neonatal para erros inatos da imunidade, com pesquisa em colaboração com a Universidade de Massachusetts, o CDC, a Fundação Jeffrey Modell e o Karolinska.',
      },
      {
        nome: 'Clínica Alergológica',
        logo: 'alergologica',
        descricao:
          'Mais de 20 anos em Campinas, com corpo clínico multiespecialidade e responsabilidade técnica do Dr. Antonio Condino-Neto (CRM 51204).',
      },
    ] satisfies Realizador[],
  },

  turma: {
    rotulo: 'A turma',
    titulo: 'São cem vagas. E a turma é a mesma o ano inteiro.',
    apoio:
      'Quem entra assume os oito encontros. É isso que transforma uma plateia em comunidade — e o que permite discutir de verdade, sem auditório lotado.',
    numeros: [
      { valor: '100', rotulo: 'vagas na temporada inaugural' },
      { valor: '8', rotulo: 'encontros com a mesma turma' },
      { valor: '1', rotulo: 'único grupo por ano' },
    ],
    levaTitulo: 'O que você leva da temporada',
    leva: [
      {
        titulo: 'Certificação',
        descricao: 'Certificado de participação emitido pela ON Educação.',
        flag: 'showCertificate' as const,
      },
      {
        titulo: 'Conteúdo continuado',
        descricao: 'Material e conteúdos digitais da temporada na plataforma EAD.',
      },
      {
        titulo: 'Uma rede de verdade',
        descricao: 'Cem colegas de doze especialidades, oito vezes no ano.',
      },
    ],
    nota:
      'A temporada inaugural começa em 18 de março de 2027. As vagas são confirmadas por ordem de inscrição e não há turma paralela.',
  },

  inscricao: {
    rotulo: 'Inscrição',
    selo: 'Vagas limitadas',
    titulo: 'Garanta a sua vaga na turma inaugural.',
    apoio:
      'As inscrições são confirmadas por ordem de chegada, até o limite de cem participantes.',
    passos: [
      {
        numero: '01',
        titulo: 'Entre em contato',
        descricao: 'Fale com a equipe da ON Educação e receba as condições da turma.',
      },
      {
        numero: '02',
        titulo: 'Confirme a inscrição',
        descricao: 'A vaga é reservada em seu nome para os oito encontros.',
      },
      {
        numero: '03',
        titulo: 'Nos vemos em 18 de março',
        descricao: 'Primeiro encontro da temporada, 19h, na APM Campinas.',
      },
    ],
    cta: 'Quero me inscrever',
  },

  rodape: {
    realizacao: 'Uma realização',
    patrocinioTitulo: 'Sua empresa na Escola?',
    patrocinioTexto: 'Fale com a equipe comercial',
    local: 'Campinas/SP, temporada 2027',
  },

  ctaStickyLabel: 'Garantir minha vaga',

  whatsappMensagem:
    'Olá, quero me inscrever na Escola Continuada de Doenças Imunomediadas 2027.',
} as const;

export type Escola = typeof escola;
