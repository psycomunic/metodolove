/**
 * ============================================================
 *  MÉTODO LLOVE — todo o conteúdo da landing page
 * ------------------------------------------------------------
 *  Tudo que aparece na página está aqui. Para trocar textos,
 *  preços ou o link do checkout, mexa SÓ neste arquivo.
 *
 *  ⚠️  O que você precisa revisar antes de publicar está
 *      marcado com  // >>> AJUSTAR
 * ============================================================
 */

export const marca = {
  nome: "Método LLOVE",
  nomeCurto: "LLOVE",
  autor: "Charllove",
  instagram: "https://instagram.com/_charllove",
  instagramHandle: "@_charllove",
  checkout: "https://pay.kiwify.com.br/y20epeD",
  // >>> AJUSTAR: link do Grupo VIP gratuito citado na bio do Instagram
  grupoVip: "https://instagram.com/_charllove",
  email: "contato@metodollove.com.br", // >>> AJUSTAR
  cnpj: "00.000.000/0001-00", // >>> AJUSTAR
  razaoSocial: "CHARLLOVE TREINAMENTOS LTDA", // >>> AJUSTAR
  dominio: "metodollove.com.br", // >>> AJUSTAR
};

export const oferta = {
  precoCheio: "R$ 597,00", // >>> AJUSTAR: valor de ancoragem
  preco: "R$ 297,90",
  parcelasQtd: "12x",
  parcelasValor: "R$ 30,81",
  garantiaDias: 7, // >>> AJUSTAR se sua garantia for diferente
  acesso: "12 meses de acesso", // >>> AJUSTAR (vitalício? 1 ano?)
  vagas: "", // opcional, ex.: "Últimas 30 vagas com esse valor"
};

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
export const hero = {
  olho: "Formação de professor de futevôlei",
  linha1: "Você já dá aula.",
  linha2: "Agora faça disso",
  // A única frase da página sobre bloco de cor chapada.
  linha3Destaque: "uma profissão",
  // O texto anterior descrevia um curso que não existe: falava em refazer o
  // fundamento e preparar o físico do próprio aluno. O produto forma
  // PROFESSOR. Não devolva o foco para a técnica de quem compra.
  subtitulo:
    "Para professor e profissional da área: conduzir a aula com método, atender turma desnivelada, criar vínculo que faz o aluno voltar e sustentar o futevôlei como profissão, não como bico de fim de semana.",
  assinaturaSub:
    "O professor bom ensina. O professor malandro muda de vida com o esporte.",
  cta: "Quero entrar no Método",
  fotoArte: "Charllove em quadra, sol baixo, areia visível",
};

/**
 * Prova de que o Charllove sabe FORMAR professor.
 *
 * A versão anterior trazia seguidores do Instagram e número de posts. Isso
 * prova popularidade, não competência para formar — e quem decide pagar por
 * uma formação profissional não compra por causa de seguidor.
 *
 * >>> AJUSTAR: preencha `valor` com os números verdadeiros. Enquanto
 * estiverem em null a faixa inteira NÃO aparece, pelo mesmo critério dos
 * depoimentos: espaço vazio custa menos que prova fraca em lugar nobre.
 */
export const provas: {
  valor: number | null;
  decimais?: number;
  pad?: number;
  sufixo: string;
  rotulo: string;
}[] = [
  { valor: null, sufixo: "", rotulo: "anos dando aula e formando professor" },
  {
    valor: null,
    sufixo: "",
    rotulo: "alunos e professores que já passaram pelo método",
  },
];

/* ------------------------------------------------------------------ */
/*  O PROBLEMA                                                         */
/* ------------------------------------------------------------------ */
export const problema = {
  olho: "Onde o professor trava",
  titulo: ["Ninguém trava por", "falta de bola.", "Trava por falta", "de método."],
  texto:
    "Dá pra jogar muito bem e dar uma aula ruim. São duas habilidades diferentes, e a segunda quase nunca foi ensinada a você.",
  itens: [
    {
      titulo: "Você ensina como aprendeu",
      texto:
        "Repete o que fizeram com você, sem saber por que funcionou. Vai bem até chegar o aluno que não pega daquele jeito. Aí não há plano B.",
    },
    {
      titulo: "Cada aula começa do zero",
      texto:
        "Sem sequência planejada, o aluno não enxerga a própria evolução. E o que ele não enxerga, ele não renova na semana seguinte.",
    },
    {
      titulo: "A turma desnivelada te trava",
      texto:
        "Iniciante e veterano no mesmo horário. Você atende um e deixa o outro parado esperando. Os dois saem achando que a aula não era pra eles.",
    },
    {
      titulo: "O aluno elogia, paga e some",
      texto:
        "Sem vínculo, aula vira commodity: qualquer professor mais perto ou mais barato leva. Ninguém te ensinou a construir essa relação.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  AUTOR                                                              */
/* ------------------------------------------------------------------ */
export const autor = {
  olho: "Quem te leva até lá",
  nome: "Charllove",
  cargo: "Ex-atleta, treinador e criador do Método LLOVE",
  /**
   * História tirada da própria voz dele, na Aula 0.1 do curso (transcrita em
   * set/2026), e não da bio do Instagram. O rascunho anterior dizia que ele
   * "começou como todo mundo, sem professor e sem método" — é falso: ele veio
   * do futebol profissional e de duas carreiras de vendedor campeão nacional.
   *
   * O que credencia o Charllove a ensinar PROFESSOR não é jogar bem. É a
   * combinação esporte + comunicação de valor + método, que é exatamente o
   * buraco que ele aponta nos outros professores. Não troque isso por
   * biografia de atleta: enfraquece a oferta.
   *
   * Os títulos de vendas foram SUAVIZADOS de propósito (set/2026). No áudio
   * ele diz "quatro vezes o melhor vendedor do país" e "melhor vendedor do
   * Brasil"; a página diz "entre os melhores". Superlativo absoluto sobre
   * pessoa real, em anúncio pago, é afirmação que alguém pode exigir prova —
   * e conta reprovada no Meta custa mais do que a força da frase.
   */
  paragrafos: [
    "Joguei futebol profissional até os 23 anos. Foram anos que me deram disciplina, visão de equipe e resiliência. E que terminaram cedo, como terminam para quase todo mundo.",
    "Depois vim para o varejo. Na Reserva passei anos entre os melhores vendedores do país, e foi ali que aprendi a comunicar valor, não só mostrar produto. Um cliente virou amigo e me levou para a Honda, onde a história se repetiu. Ali entendi que resultado vem de método e consistência, não de talento solto.",
    "Depois da pandemia veio a virada: decidi trabalhar com o que eu amo, agora como treinador e empreendedor. Fundei a GR7, depois a Deca 7 e o CTP 10.",
    "Criei o Método LLOVE porque vejo muito professor bom sem didática, sem método e sem clareza. E, mais grave, sem conexão nenhuma com o aluno. Aqui eu te passo o que aprendi na marra, na rua e na quadra.",
  ],
  // Frase dele, da Aula 0.1. É a tese do produto inteiro em uma linha.
  citacao:
    "Não basta só saber dar aula. É sobre se conectar, saber o seu valor e marcar presença na vida dos alunos.",
  assinatura: "Charllove",
  foto: "/colagem-charllove.png",
  fotoArte: "Colagem do percurso do Charllove",
};

/* ------------------------------------------------------------------ */
/*  OS 6 PILARES                                                       */
/* ------------------------------------------------------------------ */
/**
 * O que a pessoa passa a SABER FAZER.
 *
 * Não é a lista de módulos, de propósito: o cliente decidiu que a estrutura
 * do curso não aparece na página de vendas. Índice não vende; capacidade sim,
 * e ainda evita que alguém compare aula a aula com um concorrente.
 *
 * Regra que não pode ser quebrada aqui: NENHUMA promessa de resultado, renda
 * ou retorno financeiro (CDC art. 37 e política do Meta Ads — ver o aviso
 * legal em components/Rodape.tsx). Descreva o que o curso ENSINA, nunca o que
 * a pessoa vai conquistar.
 */
export const capacidades = [
  {
    n: "01",
    titulo: "Postura de professor",
    resumo: "A virada antes da técnica",
    texto:
      "Sair do lugar de quem joga bem para o de quem consegue ensinar. São coisas diferentes, e é a primeira que trava a maioria.",
  },
  {
    n: "02",
    titulo: "A aula de pé",
    resumo: "Começo, meio e fim",
    texto:
      "Conduzir uma aula do aquecimento ao encerramento sem improviso, e sem aquele silêncio de não saber o que vem agora.",
  },
  {
    n: "03",
    titulo: "Turma desnivelada",
    resumo: "Iniciante e veterano na mesma quadra",
    texto:
      "Adaptar o mesmo exercício para quem nunca tocou na bola e para quem joga há dez anos, sem deixar ninguém parado esperando.",
  },
  {
    n: "04",
    titulo: "Planejamento",
    resumo: "A sequência, não o dia solto",
    texto:
      "Encadear as aulas para que a evolução fique visível para o próprio aluno. É o que faz ele voltar na semana seguinte.",
  },
  {
    n: "05",
    titulo: "Seu nome",
    resumo: "Posicionamento e presença",
    texto:
      "Como se apresentar como professor de futevôlei: o que comunicar, onde aparecer e o que sustenta a diferença entre você e o vizinho de quadra.",
  },
  {
    n: "06",
    titulo: "Profissão, não bico",
    resumo: "Tratar a aula como serviço",
    texto:
      "Organizar o que você oferece, formar preço e combinar regras com o aluno. É o que separa dar uma aula por fora de exercer a coisa como profissão.",
  },
];

/* ------------------------------------------------------------------ */
/*  PRA QUEM É / NÃO É                                                 */
/* ------------------------------------------------------------------ */
export const publico = {
  eh: [
    "Já dá aula e quer parar de improvisar a cada turma",
    "Joga bem e vai começar a ensinar, e não quer começar torto",
    "Trabalha com esporte e quer o futevôlei como profissão, não como bico",
    "Tem aluno, mas sente que a relação não segura ninguém",
    "Cobra pela aula e trava na hora de explicar o próprio valor",
  ],
  naoEh: [
    // Este filtro é o mais importante da lista: o produto NÃO melhora o jogo
    // de quem compra, e deixar isso ambíguo gera reembolso e review ruim.
    "Só quer melhorar o próprio jogo",
    "Acha que jogar bem já basta para ensinar bem",
    "Procura fórmula mágica de sete dias",
  ],
  remate:
    "Prefiro perder a venda a te vender uma expectativa que a areia não vai cumprir.",
};

/* ------------------------------------------------------------------ */
/*  BÔNUS                                                              */
/* ------------------------------------------------------------------ */
// >>> AJUSTAR: liste só os bônus que você realmente entrega.
/**
 * Bônus. Só entra o que existe de verdade.
 *
 * A lista anterior tinha três itens inventados para público jogador (planilha
 * de treino na areia, guia de torneios, achar dupla). Foram removidos. O
 * Networking é o único com evidência: o próprio cliente forneceu a arte
 * public/bonus-networking.png, que traz o selo "MÓDULO BÔNUS".
 *
 * >>> AJUSTAR: se houver outros bônus reais, acrescente aqui. A seção some
 * sozinha se a lista ficar vazia.
 */
export const bonus = [
  {
    titulo: "Networking",
    texto:
      "Módulo bônus sobre a rede que sustenta a carreira: com quem você anda, como se apresenta e as portas que isso abre dentro do esporte.",
    imagem: "/bonus-networking.png",
  },
];

/* ------------------------------------------------------------------ */
/*  DEPOIMENTOS                                                        */
/* ------------------------------------------------------------------ */
/**
 * ⚠️  LEIA ANTES DE PREENCHER
 * A lista está VAZIA de propósito. Depoimento inventado é propaganda
 * enganosa (CDC, art. 37) e derruba conta de anúncio no Meta.
 *
 * Preencha com depoimentos REAIS de alunos, com autorização de uso.
 * A seção só aparece na página quando esta lista tiver itens.
 *
 * Exemplo de formato:
 * {
 *   nome: "Rafael Lima",
 *   local: "Niterói, RJ",
 *   tempo: "Aluno há 4 meses",
 *   texto: "…",
 *   foto: "/images/depoimentos/rafael.jpg",
 * }
 */
export type Depoimento = {
  nome: string;
  local: string;
  tempo: string;
  texto: string;
  foto?: string;
};

export const depoimentos: Depoimento[] = [];

/* ------------------------------------------------------------------ */
/*  O QUE ESTÁ INCLUSO                                                 */
/* ------------------------------------------------------------------ */
/**
 * O que acompanha a compra.
 *
 * A lista anterior era de curso para JOGADOR e trazia coisas que não existem
 * neste produto: correção em câmera lenta, planilha de treino na areia, guia
 * de torneios e montagem de dupla. Também dizia "6 módulos" quando são sete.
 *
 * >>> AJUSTAR: confirme item a item com o cliente. O que sobrou aqui é o que
 * dá para afirmar com o que eu vi na área de membros; se algo não for verdade,
 * tire. Item falso no bloco de conversão é o pior lugar possível para errar.
 */
export const inclusos = [
  "Curso completo, da mentalidade de educador à monetização",
  "Aulas gravadas, assista quando e quantas vezes quiser",
  "Módulo bônus de Networking",
  "Acesso pelo computador e pelo celular",
  "Atualizações do método sem custo extra",
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export const faq = [
  {
    p: "Nunca joguei futevôlei. Serve pra mim?",
    r: "Serve. O método começa no fundamento, antes de qualquer jogada bonita. Quem chega do zero aprende na ordem certa e sai na frente de quem passou anos aprendendo torto.",
  },
  {
    p: "Já jogo há anos. Não vai ser básico demais?",
    r: "Os primeiros módulos refazem a base no detalhe, e é aí que jogador experiente costuma achar o erro que trava a evolução dele. Depois disso o conteúdo vai pra leitura de jogo, preparo específico e a parte profissional.",
  },
  {
    p: "Preciso de quadra e dupla pra treinar?",
    r: "A maior parte dos treinos é individual e cabe em qualquer quadra de areia. Onde a dupla é necessária, o exercício vem com alternativa pra quem treina sozinho.",
  },
  {
    p: "Como funciona o acesso?",
    r: `Depois da compra aprovada você recebe o login por e-mail e entra na plataforma na hora. São ${oferta.acesso}, no celular, tablet ou computador.`,
  },
  {
    p: "E se eu não gostar?",
    r: `Você tem ${oferta.garantiaDias} dias pra pedir reembolso total. Um e-mail basta, sem justificativa. O risco é meu.`,
  },
  {
    p: "Em quanto tempo eu vejo diferença?",
    r: "Depende de quantas vezes por semana você pisa na areia e de quanto aplica. O que o método garante é direção: você para de treinar no escuro. Resultado vem de treino aplicado, não de vídeo assistido.",
  },
];

/* ------------------------------------------------------------------ */
/*  CTA FINAL                                                          */
/* ------------------------------------------------------------------ */
export const ctaFinal = {
  olho: "Última chamada",
  // Pergunta do Charllove, da Aula 0.1. É a melhor linha do curso inteiro:
  // separa quem dá aula de quem constrói uma base de alunos fiéis.
  titulo: ["Alguém já te ensinou", "a fazer o teu aluno", "virar o teu fã?"],
  texto:
    "Dar aula quase todo mundo dá. O que quase ninguém ensinou a você foi o resto: conduzir, se posicionar e sustentar isso como profissão, não como bico de fim de semana.",
  cta: "Entrar no Método LLOVE",
};
