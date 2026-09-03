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
  olho: "Método completo de futevôlei",
  linha1: "Você já joga.",
  linha2: "Agora aprenda",
  // A única frase da página sobre bloco de cor chapada.
  linha3Destaque: "a viver disso",
  subtitulo:
    "Seis módulos que refazem seu fundamento, corrigem sua leitura de jogo e preparam seu físico pra areia — e depois mostram como entrar em torneio, dar aula e transformar quadra em renda.",
  assinaturaSub: "É o material que eu queria ter recebido no meu primeiro ano de quadra.",
  cta: "Quero entrar no Método",
  notas: [
    "Aulas gravadas, no seu ritmo",
    "Do primeiro toque ao nível competitivo",
    "Feito por quem vive de areia",
  ],
  fotoArte: "Charllove em quadra, sol baixo, areia visível",
};

// Números reais, tirados do perfil @_charllove. Se mudarem, atualize aqui.
export const provas = [
  { valor: 93.5, decimais: 1, sufixo: "mil", rotulo: "seguidores no Instagram" },
  { valor: 821, decimais: 0, sufixo: "", rotulo: "conteúdos publicados sobre o esporte" },
  {
    valor: 6,
    decimais: 0,
    pad: 2,
    sufixo: "",
    rotulo: "frentes do trabalho de dar aula",
  },
  {
    valor: 100,
    decimais: 0,
    sufixo: "%",
    rotulo: "online — treine na areia perto de casa",
  },
];

/* ------------------------------------------------------------------ */
/*  O PROBLEMA                                                         */
/* ------------------------------------------------------------------ */
export const problema = {
  olho: "Onde o jogo trava",
  titulo: ["Ninguém trava por", "falta de vontade.", "Trava por falta", "de caminho."],
  texto:
    "Dá pra jogar cinco anos e continuar errando o mesmo toque. Não é falta de talento. É que ninguém nunca parou pra te mostrar o porquê.",
  itens: [
    {
      titulo: "Você aprendeu copiando",
      texto:
        "Repetiu o toque de quem jogava do lado. Funciona até o adversário subir de nível — aí o erro aparece e ninguém sabe te dizer qual é.",
    },
    {
      titulo: "A perna some no segundo set",
      texto:
        "Começa bem. Aí o salto encurta, a defesa atrasa e o jogo escapa. Areia cobra preparo específico, e treino de academia não resolve.",
    },
    {
      titulo: "Ganha o racha, some no torneio",
      texto:
        "Domingo você vence todo mundo na praia. Segunda, continua sem dupla, sem categoria definida e sem ninguém pra te chamar.",
    },
    {
      titulo: "Treina três vezes por semana e empaca",
      texto:
        "Sem progressão e sem alguém apontando o detalhe, repetição não vira evolução. Vira cansaço acumulado.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  AUTOR                                                              */
/* ------------------------------------------------------------------ */
export const autor = {
  olho: "Quem te leva até lá",
  nome: "Charllove",
  cargo: "Atleta, professor e criador do Método LLOVE",
  // >>> AJUSTAR: escreva aqui a SUA história real. O texto abaixo é rascunho,
  //     feito a partir da sua bio do Instagram. Troque por números, títulos e
  //     datas verdadeiros — história específica converte, história genérica não.
  paragrafos: [
    "Comecei como quase todo mundo começa: bola, areia e vontade. Sem professor, sem método, sem ninguém pra dizer se o que eu estava fazendo ia me levar a algum lugar.",
    "Errei muito. Repeti fundamento torto por temporadas inteiras, treinei pesado no dia errado, entrei em torneio despreparado. Cada coisa que hoje eu ensino em dez minutos me custou meses pra descobrir sozinho.",
    "O Método LLOVE é o material que eu queria ter recebido no meu primeiro ano de quadra. Ele existe pra encurtar o seu caminho — e pra que sua paixão pelo futevôlei tenha chance de virar profissão.",
  ],
  assinatura: "Charllove",
  foto: "/images/charllove.jpg", // >>> COLOQUE sua foto em public/images/
  fotoArte: "Retrato, contato visual, quadra desfocada ao fundo",
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
      "Conduzir uma aula do aquecimento ao encerramento sem improviso — e sem aquele silêncio de não saber o que vem agora.",
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
      "Encadear as aulas para que a evolução fique visível para o próprio aluno — que é o que faz ele voltar na semana seguinte.",
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
    titulo: "O lado do negócio",
    resumo: "Tratar a aula como serviço",
    texto:
      "Organizar o que você oferece, formar preço e combinar regras com o aluno. A parte que quase ninguém ensina a quem veio da quadra.",
  },
];

/* ------------------------------------------------------------------ */
/*  PRA QUEM É / NÃO É                                                 */
/* ------------------------------------------------------------------ */
export const publico = {
  eh: [
    "Joga por diversão e cansou de estacionar no mesmo nível",
    "Está começando agora e não quer aprender torto",
    "Já compete e sente que falta detalhe fino pra subir de chave",
    "Quer dar aula e viver do esporte com estrutura, não no improviso",
    "Treina sozinho e precisa de um plano, não de bater bola aleatória",
  ],
  naoEh: [
    "Quer resultado sem pisar na areia",
    "Procura fórmula mágica de sete dias",
    "Não aceita refazer fundamento pra evoluir",
  ],
  remate:
    "Prefiro perder a venda a te vender uma expectativa que a areia não vai cumprir.",
};

/* ------------------------------------------------------------------ */
/*  BÔNUS                                                              */
/* ------------------------------------------------------------------ */
// >>> AJUSTAR: liste só os bônus que você realmente entrega.
export const bonus = [
  {
    titulo: "Grupo VIP de alunos",
    texto:
      "Comunidade fechada pra tirar dúvida, achar dupla e acompanhar quem está na mesma jornada.",
  },
  {
    titulo: "Planilha de treino na areia",
    texto:
      "A semana montada, com progressão, pra você chegar na quadra sabendo o que fazer.",
  },
  {
    titulo: "Guia de torneios",
    texto: "Como escolher categoria, montar dupla e se preparar pro primeiro campeonato.",
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
export const inclusos = [
  "6 módulos completos, do fundamento ao profissional",
  "Aulas gravadas em alta definição, assista quando quiser",
  "Correções em câmera lenta e ângulo de quadra",
  "Planilha de treino pra areia",
  "Guia de torneios e montagem de dupla",
  "Acesso ao grupo VIP de alunos",
  "Atualizações do método sem custo extra",
  "Certificado de conclusão",
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
  titulo: ["Daqui a um ano você", "vai jogar melhor", "de qualquer jeito."],
  texto:
    "A pergunta é se vai ser por tentativa e erro, como foi comigo, ou por um caminho que alguém já andou e desenhou pra você.",
  cta: "Entrar no Método LLOVE",
};
