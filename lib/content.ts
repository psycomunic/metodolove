/**
 * ============================================================
 *  MÉTODO LLOVE — todo o conteúdo da landing page
 * ------------------------------------------------------------
 *  Tudo que aparece na página está aqui. Para trocar textos,
 *  preços ou o link do checkout, mexa SÓ neste arquivo.
 *
 *  ⚠️  O que você precisa revisar antes de publicar está
 *      marcado com  // >>> AJUSTAR
 *
 *  Duas regras de escrita que valem para o arquivo inteiro:
 *
 *  1. NENHUMA promessa de resultado, renda ou retorno. O produto
 *     é treinamento esportivo (CDC art. 37 e política do Meta
 *     Ads). Descreva o que o método ENSINA, nunca o que a pessoa
 *     vai conquistar.
 *  2. Nada de travessão no texto da página. O cliente reprovou
 *     duas vezes em set/2026: é um dos tells mais denunciados de
 *     texto escrito por IA. Use ponto, vírgula ou dois-pontos.
 * ============================================================
 */

export const marca = {
  nome: "Método LLOVE",
  nomeCurto: "LLOVE",
  autor: "Charllove",
  instagram: "https://instagram.com/_charllove",
  instagramHandle: "@_charllove",
  checkout: "https://pay.kiwify.com.br/y20epeD",
  email: "contato@metodollove.com.br", // >>> AJUSTAR
  cnpj: "00.000.000/0001-00", // >>> AJUSTAR
  razaoSocial: "CHARLLOVE TREINAMENTOS LTDA", // >>> AJUSTAR
  dominio: "metodollove.com.br", // >>> AJUSTAR
  resumo: "Formação para professores de futevôlei: da postura à profissão.",
};

export const oferta = {
  precoCheio: "R$ 597,00", // >>> AJUSTAR: valor de ancoragem
  preco: "R$ 297,90",
  parcelasQtd: "12x",
  parcelasValor: "R$ 30,81",
  garantiaDias: 7,
  acesso: "12 meses de acesso",
};

/* ------------------------------------------------------------------ */
/*  BARRA DE URGÊNCIA HONESTA                                          */
/* ------------------------------------------------------------------ */
/**
 * Não é contador regressivo. A escassez aqui é verdadeira e verificável: o
 * preço é de lançamento porque ainda não há depoimento nenhum na página.
 * Contador falso numa página que se vende como honesta destrói a única coisa
 * que essa copy tem de diferente.
 */
export const urgencia =
  "Sem contador falso aqui. O preço é R$ 297,90 porque o curso é novo. Quando entrarem os depoimentos dos primeiros professores, ele sobe.";

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
export const hero = {
  olho: "Formação para professores de futevôlei · 6 módulos + bônus",
  selo: "Turma aberta",
  /**
   * Manchete, opção A (no ar).
   *
   * A palavra em verde é a promessa, e é a ÚNICA da manchete. Duas palavras
   * destacadas viram zebra e nenhuma destaca.
   *
   * Variantes guardadas para teste A/B, não apague:
   *   B: linhas ["Tem professor que dá aula.", "E tem professor que tem"] +
   *      destaque "método."
   *   C: linhas ["O futevôlei cresceu 168%", "em um ano. Os professores"] +
   *      destaque "preparados, não."
   */
  linhas: ["Pare de improvisar aula.", "Comece a"],
  linhaDestaque: "viver de futevôlei.",
  subtitulo:
    "O Método LLOVE é o passo a passo pra você dar aula com começo, meio e fim, segurar turma desnivelada sem perder ninguém e cobrar como profissional, mesmo que hoje seja só um bico de fim de semana.",
  cta: "Quero dar aula com método",
  ctaSecundario: "Ver o método",
  stats: [
    { valor: "6", rotulo: "módulos" },
    { valor: "+1", rotulo: "bônus Networking" },
    { valor: "12", rotulo: "meses de acesso" },
  ],
  fotoArte: "Charllove em quadra, sol baixo, areia visível",
};

/* ------------------------------------------------------------------ */
/*  MARQUEE DE PILARES                                                 */
/* ------------------------------------------------------------------ */
export const pilares = [
  "fundamento antes de firula",
  "areia todo dia",
  "leitura de jogo",
  "do racha ao circuito",
  "paixão vira profissão",
];

/* ------------------------------------------------------------------ */
/*  DOR — onde o professor trava                                       */
/* ------------------------------------------------------------------ */
export const dor = {
  olho: "Onde o professor trava",
  linhas: ["Ninguém trava por", "falta de bola. Trava", "por falta de"],
  linhaDestaque: "método.",
  texto:
    "Dá pra jogar muito bem e dar uma aula ruim. São duas habilidades diferentes, e a segunda quase nunca foi ensinada a você.",
  itens: [
    {
      titulo: "A aula que desanda",
      texto:
        "Você chega na quadra, dá um “vamo aquecer aí”, solta um toque, um cabeceio, um joguinho no final… e vai embora sem saber se ensinou alguma coisa. O aluno também não sabe. E aluno que não sente evolução não renova.",
    },
    {
      titulo: "A turma desnivelada",
      texto:
        "Na mesma hora tem o cara que joga há 5 anos e a menina que nunca tocou na bola. Você tenta agradar os dois e acaba entediando um e assustando o outro. Semana que vem, um deles some, e você fica achando que foi o horário.",
    },
    {
      titulo: "Só o jogador, sem o professor",
      texto:
        "Você joga bem. Todo mundo sabe. Mas saber fazer não é saber ensinar. Quando o aluno pergunta “por que minha bola não sobe?”, você responde “tenta de novo”. Funciona uma vez. Na terceira, ele vai pra outro professor.",
    },
    {
      titulo: "Bico que não vira profissão",
      texto:
        "Cobra R$ 30 porque tem vergonha de cobrar R$ 60. Não tem pacote, não tem regra de falta, não tem plano. Quando chove, não recebe. Quando o aluno some, não cobra. Você ama a areia, mas a areia ainda não te paga.",
    },
  ],
  fechoAntes: "Nada disso é falta de talento. É falta de",
  fechoDestaque: "método",
  fechoDepois: ". E método se aprende.",
};

/* ------------------------------------------------------------------ */
/*  MERCADO — a oportunidade, com fonte                                */
/* ------------------------------------------------------------------ */
/**
 * Todo número aqui carrega a fonte visível, na própria peça. Dado de mercado
 * sem fonte numa página de vendas lê como número inventado, e o leitor
 * desconta os quatro de uma vez.
 */
export const mercado = {
  olho: "O mercado",
  linhas: ["O futevôlei virou mercado.", "O professor preparado"],
  linhaDestaque: "ainda é raro.",
  numeros: [
    {
      valor: 168,
      prefixo: "+",
      sufixo: "%",
      rotulo:
        "de crescimento na prática de futevôlei em um ano (2023 a 2024). Mais que vôlei de praia e beach tennis.",
      fonte: "TotalPass/Wellhub, 2025",
    },
    {
      valor: 379,
      prefixo: "+",
      sufixo: "%",
      rotulo: "de crescimento dos esportes de areia no mesmo período.",
      fonte: "Band, 2025",
    },
    {
      valor: 1000,
      prefixo: "+",
      sufixo: "",
      rotulo: "arenas espalhadas pelo Brasil já em 2022.",
      fonte: "Ibope Repucom",
    },
    {
      valor: 50,
      prefixo: "",
      sufixo: " mi",
      rotulo: "de fãs do esporte no país. Metade mulheres, 62% entre 18 e 39 anos.",
      fonte: "Ibope Repucom",
    },
  ],
  texto:
    "Todo mês abre arena nova, e toda arena precisa de professor. Mas arena não quer “o cara que joga bem”. Arena quer quem segura turma, fideliza aluno e cuida do próprio nome. É isso que o Método LLOVE forma.",
};

/* ------------------------------------------------------------------ */
/*  MECANISMO — por que método e não mais um curso de fundamento       */
/* ------------------------------------------------------------------ */
export const mecanismo = {
  olho: "O mecanismo",
  linhas: ["Por que"],
  linhaDestaque: "método,",
  linhasFim: ["e não mais um curso", "de fundamento?"],
  texto:
    "Todo curso de futevôlei ensina toque, cabeceio e shark. O Método LLOVE não é sobre o que você já sabe fazer. É sobre o que ninguém te ensinou: como transformar o que você sabe em uma aula que o aluno paga, sente e recomenda.",
  pilares: [
    {
      n: "01",
      titulo: "Postura",
      texto:
        "Antes da aula, o professor. Como você chega, fala, corrige e cria vínculo define se o aluno volta. É o que o Charllove aprendeu vendendo na Reserva e na Honda: gente compra de quem confia.",
    },
    {
      n: "02",
      titulo: "Aula de pé",
      texto:
        "Toda aula tem começo, meio e fim. Um objetivo, uma progressão e um fechamento que mostra ao aluno onde ele evoluiu hoje. É a estrutura que resolve a turma desnivelada.",
    },
    {
      n: "03",
      titulo: "Profissão",
      texto:
        "Nome, preço, pacote, regra. O que separa “o cara que dá aula na praia” do professor que a cidade conhece pelo nome.",
    },
  ],
  fecho:
    "Sem os três, você tem um bom jogador ensinando. Com os três, você tem um profissional.",
};

/* ------------------------------------------------------------------ */
/*  MÓDULOS                                                            */
/* ------------------------------------------------------------------ */
export const modulos = {
  olho: "O que você passa a saber fazer",
  linhas: ["Jogar bem e ensinar bem", "são coisas diferentes.", "A segunda"],
  linhaDestaque: "se aprende.",
  itens: [
    {
      n: "01",
      titulo: "Postura de Professor",
      resumo: "O aluno decide se volta nos primeiros 10 minutos",
      texto:
        "Como se apresentar, corrigir sem humilhar e criar vínculo real. A diferença entre “o professor” e “aquele cara que joga bem”.",
    },
    {
      n: "02",
      titulo: "A Aula de Pé",
      resumo: "Começo, meio e fim que o aluno sente",
      texto:
        "Aquecimento com intenção, parte principal com progressão e fechamento que mostra evolução. Você entra na quadra sabendo o que vai fazer, e por quê.",
    },
    {
      n: "03",
      titulo: "Turma Desnivelada",
      resumo: "Uma aula, vários níveis, ninguém parado",
      texto:
        "Exercícios em camadas, agrupar sem excluir, iniciante e veterano saindo satisfeitos da mesma hora. O módulo que mais segura aluno.",
    },
    {
      n: "04",
      titulo: "Planejamento",
      resumo: "A sequência que faz o aluno ver progresso semana a semana",
      texto:
        "Como planejar 4, 8 e 12 semanas sem virar refém do “o que eu dou hoje?”. Aluno que percebe evolução renova. Aluno que percebe repetição some.",
    },
    {
      n: "05",
      titulo: "Seu Nome na Areia",
      resumo: "Posicionamento pra ser lembrado (e procurado)",
      texto:
        "Uma identidade de professor que a cidade reconhece, sem virar influencer. O que comunicar, onde aparecer e como fazer indicação acontecer sozinha.",
    },
    {
      n: "06",
      titulo: "Profissão, Não Bico",
      resumo: "Precificar, empacotar e cobrar sem culpa",
      texto:
        "Quanto cobrar, como montar pacote, regra de falta e chuva, como apresentar e fechar. O que o Charllove aprendeu vendendo em loja, adaptado pra areia.",
    },
  ],
  bonus: {
    n: "Bônus +01",
    titulo: "Networking na Areia",
    texto:
      "A rede que enche sua turma: arenas, outros professores, organizadores de torneio e lojas, sem ser chato. Incluso no mesmo acesso.",
    imagem: "/bonus-networking.webp",
    imagemArte: "Caixa do módulo bônus Networking",
  },
};

/* ------------------------------------------------------------------ */
/*  QUEM ENSINA                                                        */
/* ------------------------------------------------------------------ */
/**
 * O que credencia o Charllove a ensinar PROFESSOR não é jogar bem. É a
 * combinação esporte + comunicação de valor + método, que é exatamente o
 * buraco que ele aponta nos outros professores. Não troque isso por
 * biografia de atleta: enfraquece a oferta.
 *
 * Os títulos de vendas foram SUAVIZADOS de propósito. No áudio da Aula 0.1
 * ele diz "quatro vezes o melhor vendedor do país"; a página diz "entre os
 * melhores". Superlativo absoluto sobre pessoa real, em anúncio pago, é
 * afirmação que alguém pode exigir prova, e conta reprovada no Meta custa
 * mais do que a força da frase.
 */
export const autor = {
  olho: "Quem ensina",
  linhas: ["Quem te leva"],
  linhaDestaque: "até lá",
  nome: "Charllove",
  paragrafos: [
    "Charllove começou onde muito professor de futevôlei sonha começar: no campo, jogando futebol profissional até os 23. Aprendeu cedo o que é treinar com método, cobrar rendimento e viver de esporte, e viu isso acabar cedo, como acaba pra quase todo mundo.",
    "Quando o futebol acabou, foi vender. Reserva. Honda. Ficou entre os melhores vendedores do país nos dois lugares. Não porque era o mais falante, mas porque aprendeu a ouvir, criar confiança e fechar sem empurrar. É essa parte que faz diferença na hora de cobrar por uma aula.",
    "Depois da pandemia veio a virada: trabalhar com o que ama. Começou dando aula como quase todo mundo começa, no improviso, na marra. Só que juntou as duas vidas: o atleta que sabe treinar e o vendedor que sabe atender. Fundou a GR7, depois a Deca 7 e o CTP 10. Três escolas do zero.",
    "O Método LLOVE é tudo isso organizado em 6 módulos pra você não precisar errar anos pra chegar onde ele chegou.",
  ],
  // Frase dele, da Aula 0.1. É a tese do produto inteiro em uma linha.
  citacao:
    "Não basta só saber dar aula. É sobre se conectar, saber o seu valor e marcar presença na vida dos alunos.",
  credenciais: [
    "Ex-atleta profissional",
    "Top vendas Reserva e Honda",
    "Fundador GR7",
    "Deca 7",
    "CTP 10",
  ],
  foto: "/colagem-charllove.png",
  fotoArte: "Colagem do percurso do Charllove",
};

/* ------------------------------------------------------------------ */
/*  PRA QUEM É / NÃO É                                                 */
/* ------------------------------------------------------------------ */
export const publico = {
  olho: "O filtro",
  linhas: ["Isso aqui"],
  linhaDestaque: "não",
  linhasFim: ["é pra todo mundo."],
  texto:
    "Se você se reconhecer na lista da esquerda, o método foi feito pra você. Se se reconhecer na da direita, economize seu dinheiro.",
  eh: [
    "Já dá aula e sente que está improvisando a cada turma",
    "Joga bem, vai começar a ensinar e não quer aprender na marra",
    "Tem turma desnivelada e perde aluno sem entender por quê",
    "Ama a areia e quer que ela pague as contas, com preço e pacote",
    "Quer ser lembrado pelo nome, não por “o cara da quadra 3”",
  ],
  // O primeiro filtro é o mais importante da lista: o produto NÃO melhora o
  // jogo de quem compra, e deixar isso ambíguo gera reembolso e review ruim.
  naoEh: [
    "Quer aprender a jogar futevôlei. Isso aqui é pra quem ensina.",
    "Procura promessa de “R$ 10 mil no primeiro mês”. Não existe, e a gente não vende isso.",
    "Quer só assistir vídeo. O método funciona pra quem aplica na próxima aula.",
  ],
  remate:
    "Prefiro perder a venda a te vender uma expectativa que a areia não vai cumprir.",
};

/* ------------------------------------------------------------------ */
/*  OFERTA                                                             */
/* ------------------------------------------------------------------ */
export const investimento = {
  olho: "Investimento",
  titulo: "Você leva",
  inclusos: [
    "Método LLOVE completo: 6 módulos, da postura de professor à precificação",
    "Bônus: módulo Networking na Areia",
    "Aulas gravadas, assista quando e quantas vezes quiser",
    "12 meses de acesso, no celular ou computador",
    "Atualizações do método sem custo extra",
  ],
  ancora:
    "Menos do que você cobra por uma semana de aula de um único aluno. Um aluno que renova por causa do método já pagou o curso.",
  cta: "Quero minha vaga no método",
  microcopy: "Compra segura · Cartão, Pix ou boleto · Acesso na hora",
  garantia: {
    titulo: "7 dias pra testar na quadra. Não gostou, devolvemos.",
    texto:
      "Assiste os dois primeiros módulos, aplica na sua próxima aula. Se não sentir diferença, ou achar que não é pra você, manda um e-mail em até 7 dias e eu devolvo cada centavo. Sem justificativa. O risco é meu. A aula é sua.",
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
/**
 * Regra desta lista: nada de promessa de resultado, renda ou retorno. A
 * pergunta sobre ganhar dinheiro é a mais provável de todas e a mais
 * perigosa; a resposta diz o que o curso ENSINA, nunca o que a pessoa vai
 * faturar.
 */
export const faq = [
  {
    p: "Ainda não dou aula. Faz sentido pra mim?",
    r: "Faz, e é onde o método mais economiza tempo. Ele começa na postura de professor e na estrutura da aula, que é justamente o que ninguém ensina a quem vem da quadra. Você começa com método em vez de descobrir na tentativa e erro.",
  },
  {
    p: "Já dou aula há anos. Não vai ser básico demais?",
    r: "O conteúdo não é sobre fundamento, é sobre ensinar: sequência de aulas, turma desnivelada, vínculo com o aluno e o lado profissional. As partes que quem já dá aula costuma resolver no improviso.",
  },
  {
    p: "É curso de fundamento? Vou aprender toque, shark, cabeceio?",
    r: "Não. Isso aqui é sobre ensinar, não sobre jogar. A gente parte do princípio que você já joga.",
  },
  {
    p: "Preciso ter turma montada pra começar?",
    r: "Não. Funciona pra quem já tem alunos e pra quem ainda vai dar a primeira aula. O que muda é a ordem em que você aplica.",
  },
  {
    p: "Serve pra quem dá aula em cidade sem praia?",
    r: "Serve. Turma desnivelada, aula sem estrutura e preço mal cobrado acontecem em qualquer areia: praia, arena ou condomínio.",
  },
  {
    p: "Isso me garante ganhar dinheiro dando aula?",
    r: "Não, e desconfie de quem prometer isso. O que está aqui é o método: conduzir a aula, se posicionar, estruturar e precificar o seu serviço. O resultado depende de você aplicar, da sua região e da sua dedicação.",
  },
  {
    p: "Como funciona o acesso?",
    r: "Compra aprovada, você recebe o login por e-mail e entra na hora. 12 meses de acesso, no celular, tablet ou computador.",
  },
  {
    p: "E se eu não gostar?",
    r: "7 dias pra pedir reembolso total. Um e-mail basta, sem justificativa. O risco é meu.",
  },
];

export const faqRemate = "Não achou a sua? Manda a pergunta que eu respondo.";

/* ------------------------------------------------------------------ */
/*  CTA FINAL                                                          */
/* ------------------------------------------------------------------ */
export const ctaFinal = {
  linhas: ["Você pode continuar dando", "aula do jeito que dá.", "Ou pode dar aula com"],
  linhaDestaque: "método.",
  texto:
    "A areia vai continuar crescendo. Arena nova vai continuar abrindo. A pergunta é se, daqui a um ano, você vai ser o professor que a cidade conhece pelo nome ou o cara que ainda improvisa. O Charllove levou anos e três escolas pra organizar isso. Você leva um fim de semana.",
  cta: "Entrar no Método LLOVE",
  microcopy:
    "12x de R$ 30,81 ou R$ 297,90 à vista · 7 dias de garantia · 12 meses de acesso",
};

/* ------------------------------------------------------------------ */
/*  NAVEGAÇÃO                                                          */
/* ------------------------------------------------------------------ */
export const menu = [
  { rotulo: "O método", href: "#metodo" },
  { rotulo: "Quem ensina", href: "#charllove" },
  { rotulo: "Investimento", href: "#oferta" },
  { rotulo: "Dúvidas", href: "#duvidas" },
];

/* ------------------------------------------------------------------ */
/*  DEPOIMENTOS                                                        */
/* ------------------------------------------------------------------ */
/**
 * ⚠️  A página NÃO tem seção de depoimentos, e isso é proposital: não há
 * depoimento real autorizado ainda, e a barra de urgência no topo diz
 * exatamente isso ("quando entrarem os depoimentos, o preço sobe").
 *
 * Depoimento inventado é propaganda enganosa (CDC art. 37) e derruba conta de
 * anúncio no Meta. Quando existirem depoimentos REAIS com autorização de uso,
 * crie a seção; até lá, não preencha nada "só para visualizar".
 */
export type Depoimento = {
  nome: string;
  local: string;
  tempo: string;
  texto: string;
  foto?: string;
};

export const depoimentos: Depoimento[] = [];
