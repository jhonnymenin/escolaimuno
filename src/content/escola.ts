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
  /** Satélite: tratamento visual secundário na linha do tempo. */
  satelite?: boolean;
  /** Selo curto ao lado do título, como "20 MIN". */
  selo?: string;
}

export interface Modalidade {
  rotulo: string;
  titulo: string;
  subtitulo: string;
  preco: string;
  itens: string[];
  cta: string;
  /** Mensagem do WhatsApp; sem ela, o CTA é uma âncora para `href`. */
  whatsapp?: string;
  href?: string;
  destaque: boolean;
  selo?: string;
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
    // Fecha o bloco de networking, que começa às 21h35. Usado no .ics e no JSON-LD.
    fim: '22:00',
    diaDaSemana: 'quintas-feiras',
    fuso: 'America/Sao_Paulo',
  },

  seo: {
    title: 'Escola Continuada de Doenças Imunomediadas — Temporada 2027, Campinas',
    description:
      'Oito encontros presenciais na APM Campinas, de março a novembro de 2027. Um caso clínico real por encontro, discutido entre doze especialidades. Cem lugares por encontro.',
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
      { valor: '100', rotulo: 'lugares por encontro' },
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
        descricao: 'Cem lugares por encontro para preservar a qualidade da discussão.',
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
    avulsoCta: 'Quero só este encontro',
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

  comoParticipar: {
    rotulo: 'Como participar',
    titulo: 'A temporada inteira ou só o tema da sua área.',
    apoio:
      'São cem lugares por encontro. Setenta ficam com quem assina a temporada completa. Os outros trinta são abertos por encontro, para quem quer apenas o tema da sua especialidade.',
    modalidades: [
      {
        rotulo: 'Opção 1',
        selo: 'Recomendado',
        titulo: 'Temporada completa',
        subtitulo: '70 vagas',
        preco: 'R$ 999',
        itens: [
          'Os 8 encontros da temporada',
          'Lugar garantido o ano inteiro',
          'Certificado da temporada completa',
          'Conteúdos digitais na plataforma EAD',
          'Melhor valor por encontro',
        ],
        cta: 'Quero a temporada completa',
        whatsapp:
          'Olá, quero me inscrever na temporada completa da Escola Continuada de Doenças Imunomediadas 2027.',
        destaque: true,
      },
      {
        rotulo: 'Opção 2',
        titulo: 'Encontro avulso',
        subtitulo: '30 vagas por encontro',
        preco: 'R$ 250',
        itens: [
          'Um encontro, à sua escolha',
          'Certificado daquele encontro',
          'Vagas liberadas 45 dias antes',
          'Sujeito à disponibilidade',
        ],
        cta: 'Quero um encontro',
        href: '#temporada',
        destaque: false,
      },
    ] satisfies Modalidade[],
    migracao: {
      titulo: 'Mudou de ideia depois do primeiro encontro?',
      texto:
        'Quem entra por um encontro avulso pode migrar para a temporada completa em até 30 dias, abatendo o valor já pago. O certificado da temporada é emitido apenas para quem participa dos oito encontros.',
    },
  },

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
        hora: '19h20',
        titulo: 'Simpósio satélite',
        descricao: 'Apresentação da indústria parceira.',
        satelite: true,
        selo: '20 min',
      },
      {
        hora: '19h40',
        titulo: 'O caso clínico',
        descricao: 'Um paciente real é apresentado à turma.',
      },
      {
        hora: '20h05',
        titulo: 'A discussão',
        descricao: 'Diagnóstico diferencial e condutas em debate aberto.',
      },
      {
        hora: '20h30',
        titulo: 'A ciência',
        descricao: 'Atualização com o especialista convidado do tema.',
      },
      {
        hora: '20h55',
        titulo: 'Simpósio satélite',
        descricao: 'Apresentação da indústria parceira.',
        satelite: true,
        selo: '20 min',
      },
      {
        hora: '21h15',
        titulo: 'Mesa multidisciplinar',
        descricao: 'Cada especialidade devolve o seu olhar sobre o caso.',
      },
      {
        hora: '21h35',
        titulo: 'Coffee e networking',
        descricao: 'A conversa continua fora da sala.',
      },
    ] satisfies PassoTempo[],
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
        titulo: 'Conteúdo independente',
        descricao:
          'Temas, casos e conclusões definidos pelo corpo científico. Os simpósios satélite são identificados e não interferem na discussão.',
      },
    ],
  },

  lugar: {
    rotulo: 'O lugar',
    titulo: 'A Casa do Médico, no centro de Campinas.',
    paragrafos: [
      'Os oito encontros acontecem na APM Campinas — a regional da Associação Paulista de Medicina na cidade, a Sociedade de Medicina e Cirurgia de Campinas. A casa recebe cerca de 300 eventos científicos por ano e fica no Centro, a poucos minutos de quem vem pela Norte-Sul ou pela Anhanguera.',
      'A turma usa três espaços no mesmo encontro: a recepção no credenciamento, o anfiteatro na discussão do caso e o terraço no coffee do fim.',
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
    titulo: 'Setenta médicos atravessam o ano inteiro juntos.',
    apoio:
      'São cem lugares por encontro. Setenta ficam com quem assina a temporada completa — o grupo que atravessa o ano. Os outros trinta são abertos por encontro, para quem quer apenas o tema da sua especialidade.',
    numeros: [
      { valor: '70', rotulo: 'vagas de temporada completa' },
      { valor: '8', rotulo: 'encontros com a mesma turma' },
      { valor: '1', rotulo: 'único grupo por ano' },
    ],
    /** Legenda do grid de 100 pontos. */
    legenda: [
      { tipo: 'temporada' as const, texto: '70 da temporada' },
      { tipo: 'avulso' as const, texto: '30 por encontro' },
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
        descricao: 'Setenta colegas de doze especialidades, oito vezes no ano.',
      },
    ],
    nota:
      'A temporada inaugural começa em 18 de março de 2027. As vagas são confirmadas por ordem de inscrição.',
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
        descricao: 'A vaga é reservada em seu nome na modalidade que você escolher.',
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

/**
 * Mensagem do WhatsApp para a inscrição avulsa de um encontro. É distinta em
 * cada data de propósito: é o que permite ver qual tema puxa mais lead.
 */
export const mensagemEncontroAvulso = (encontro: Encontro): string => {
  const [, mes, dia] = encontro.data.split('-');
  return `Olá, quero me inscrever no encontro de ${dia}/${mes} — ${encontro.tema} — da ${escola.nome} ${escola.temporada}.`;
};

export type Escola = typeof escola;
