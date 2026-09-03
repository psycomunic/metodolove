# Método LLOVE — direção de design

Pesquisa: o MCP da Refero (`api.refero.design/mcp`) foi adicionado ao projeto, mas exige
login OAuth interativo, indisponível numa sessão remota. Seguimos o caminho de fallback
previsto na própria skill: craft references empacotadas + briefing do cliente, com o mesmo
workflow de _reference lock_.

## Briefing

    Landing page de venda do Método LLOVE (curso de futevôlei) para jogadores brasileiros
    amadores e semiprofissionais, em web.
    Objetivo: comprar o curso (R$ 297,90).
    Tom: atlético, solar, direto. Suor e areia, não sala de aula.
    Objeção principal: "já jogo há anos, isso vai ser básico" / "vídeo não me faz evoluir".
    Precisa lembrar: o Rio — Pão de Açúcar, mar, areia de Copacabana.
    Restrições do cliente: azul + cor de areia; referências do Rio; não pode parecer IA.

## Reference lock

**Referência travada pelo cliente (set/2026).** O cliente reprovou a primeira execução —
areia clara, azul contido, laranja racionado — e entregou como referência um cartaz de
campeonato de vôlei de praia: marinho saturado, arcos concêntricos irradiando dos cantos,
manchete em blocos de cor chapada levemente inclinados, verde-lima elétrico como terceira
voz e laranja em área grande. A direção ("cartaz de torneio") estava certa; **a saturação e
o vocabulário de forma estavam tímidos demais**. É isso que esta revisão corrige.

Traduzir cartaz para página exige um ajuste que a referência não resolve sozinha: o cartaz é
lido num golpe de olho, a página tem doze seções de leitura. Por isso o sistema tem **ritmo** —
a intensidade máxima aparece no hero, na faixa, na oferta e no CTA final; as seções de leitura
usam papel quente e recebem a cor só na manchete. Aplicar o cartaz inteiro em toda seção
torna o texto ilegível e apaga o botão de compra, que é o oposto do objetivo.

**Direção primária — cartaz de torneio / transmissão esportiva.** Nada de "calm editorial".
O produto é treino físico vendido a quem pisa na areia; o vocabulário visual desse mundo é
pôster de campeonato, placar, número de peito, lower-third de transmissão, foto estourada de
sol e tipografia condensada em caixa alta.

_Teste editorial:_ se trocássemos o logo por um hotel-butique e a página continuasse
plausível, a direção estaria genérica. Com placar, número de peito e horizonte do Rio, não
continua — é dessa marca.

### Preservar (traços que não podem ser suavizados)

1. **Display condensado em caixa alta, escala extrema, entrelinha travada** (0.86). Energia de
   cartaz, não respiro editorial.
2. **Marinho como campo dominante, areia como papel das seções de leitura, e duas vozes
   de acento — laranja e lima — que nunca gritam no mesmo bloco.** O laranja pode ocupar
   área grande (arcos, bloco de preço), mas o **preenchimento sólido de laranja continua
   sendo do CTA**: se um bloco laranja chapado não for clicável, ele compete com o botão.
   Arcos são vazados (contorno), botão é chapado — é assim que os dois convivem.
3. **Numeração de placar** como dispositivo organizador — números grandes e tabulares em
   pilares, objeções e módulos. É o gesto memorável da página.
4. **Horizonte do Rio** (Corcovado, Morro da Urca, Pão de Açúcar, cabo do bondinho) como
   dispositivo recorrente na fronteira das seções — sempre na linha do horizonte, nunca como
   ornamento solto.
5. **Assimetria com trilho à esquerda.** Nenhuma seção centralizada, exceto a oferta e o
   CTA final.
6. **Os arcos concêntricos JÁ ESTÃO nas artes do hero.** Não desenhe arcos por cima da
   foto — brigam com os dela e a composição vira ruído. O componente `Arcos` só entra em
   seção SEM foto (hoje, o CTA final), e ali irradia de um ponto com significado.
7. **A inclinação é privilégio da manchete.** Bloco de título inclina até 1.5°, com o texto
   contra-rotacionado para a linha de base ficar no prumo. Botão, card e pílula nunca
   inclinam — elemento clicável torto lê como enfeite e perde o affordance.

### Rejeitar explicitamente

| Rejeitado                                           | Motivo                                                                |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| Palavra solta trocada por serifada em itálico / cor | Tell nº4 do guia anti-slop. Removida a família serifada do projeto.   |
| Grid de cards como container padrão                 | Tell nº2. Pilares e bônus viraram tabela/lista com fios.              |
| Stripe lateral colorida decorativa                  | Tell nº6. Sem significado = removida.                                 |
| Hero "texto à esquerda, imagem à direita"           | Sintoma de layout genérico. Hero é imagem-dominante com sobreposição. |
| Raio grande e sombra em tudo                        | Suaviza a direção. Fios de 1px substituem sombras.                    |
| Indigo/violeta                                      | Tell nº1 (e o cliente pediu azul do mar, não roxo).                   |

### Papéis dos tokens

| Token  | Valor             | Papel — e só ele                                         |
| ------ | ----------------- | -------------------------------------------------------- |
| Campo  | `#002F73` marinho | fundo do hero e das faixas de energia                    |
| Papel  | `#FDECD5` areia   | fundo das seções de leitura longa                        |
| Tinta  | `#001736`         | texto sobre areia                                        |
| Acento | `#FC6000` laranja | CTA chapado, bloco de preço, números de placar           |
| Voz 2  | `#009C30` verde   | bloco de manchete. **Nunca em texto corrido**            |
| Apoio  | `#8AA6DE` bruma   | texto secundário sobre marinho                           |
| Rio    | `#0A3D80`         | silhueta: mais clara que o céu, menos saturada que o CTA |
| Raio   | 0, canto vivo     | única exceção: a pílula vazada de dado secundário        |

**Os três primeiros acentos foram amostrados das artes do hero**, não escolhidos: `#002F73`
é o rodapé EXATO das duas imagens (é por ele que a foto emenda com a página), `#FC6000` é o
laranja dos arcos e `#009C30` é o verde do top da atleta. Cor que não sai das artes cria
emenda visível.

O verde é o mais fácil de estragar: ótimo num bloco de manchete, péssimo num parágrafo. Se
aparecer em texto corrido, ícone repetido ou fundo de seção, a página vira néon e o laranja
do botão morre.

**Areia translúcida sobre marinho compõe em cinza.** Foi defeito real, achado em navegador:
`bg-areia-200/45` era um tom sutil quando o `body` era claro e virou uma faixa cinza-lodo
quando o fundo passou a marinho. Seção de leitura usa areia OPACA.

### Tipografia

Duas famílias, justificadas por direção de arte real (display de cartaz vs. texto funcional):

- **Archivo Black** — display, caixa alta. Manchetes, números de placar, o logo.
- **Archivo** — texto, rótulos, interface. 400/500/600/700.

As duas são a MESMA superfamília. A distinção entre manchete e texto vem de peso, escala e
caixa — não de uma face importada de fora, que é o atalho que faz página parecer template.

A Archivo Black substituiu a Anton em set/2026, a pedido do cliente. **Ela é 1,617× mais
larga que a Anton no mesmo corpo** (medido em navegador, não estimado), o que obrigou a
recalibrar duas coisas. Se você trocar a face de display de novo, refaça as duas:

1. Todas as escalas `clamp()` de manchete caíram para 78% do valor anterior. O hero foi
   calibrado à parte: "AGORA APRENDA" a 4,4rem ocupa 680px no contêiner de 704px.
2. `.display` ganhou `letter-spacing: -0.022em` e `line-height: 0.94`. A Anton era
   condensada e dispensava tracking negativo; a Black, sem ele, abre demais e perde o
   bloco. A entrelinha subiu de 0.86 porque a altura-x da Black é maior e as linhas
   colidiam.

Escala: terça maior (1.25) para marketing, `clamp()` fluido nas manchetes.

### Estratégia de mídia

O hero é conduzido por imagem — a foto do atleta na areia é o que carrega a direção. Os slots
de foto têm proporção fixa e direção de arte escrita; enquanto o arquivo não existe, aparece
um placeholder honesto com a instrução, nunca uma "foto falsa" feita de CSS.

| Slot                    | Proporção    | Direção de arte                                                           |
| ----------------------- | ------------ | ------------------------------------------------------------------------- |
| `/images/hero.jpg`      | 3:4 vertical | Charllove em quadra, sol baixo, areia visível, espaço negativo à esquerda |
| `/images/charllove.jpg` | 3:4 vertical | Retrato, contato visual, quadra ao fundo desfocada                        |
| `/images/og.jpg`        | 1200×630     | Foto de quadra + logo, texto grande legível em miniatura                  |

## Ledger de decisões

| Decisão                                 | Origem                                                     | Papel preservado                 | Por quê                                                                        |
| --------------------------------------- | ---------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| Areia como papel, azul como campo       | briefing do cliente                                        | acento fica fora do papel        | pedido explícito: "as cores são azul e cor de areia"                           |
| Laranja pôr do sol como acento          | craft `color.md` (dominante + acento afiado)               | CTA e ativo apenas               | maior contraste possível contra o azul profundo; disciplina de acento único    |
| Archivo Black em caixa alta             | cliente reprovou a Anton (set/2026)                        | display apenas                   | grotesca larga e pesada como a referência; mesma superfamília do texto do site |
| Paleta amostrada da arte do hero        | artes `FUNDO-HERO-*.jpg` (set/2026)                        | nenhuma cor inventada            | o hero é uma FOTO: cor que não sai dela cria emenda visível                    |
| Hero = foto no topo, texto no azul      | mapa de luminância das duas artes                          | texto sempre sobre área escura   | o topo das artes passa de 170 de luminância; branco ali seria ilegível         |
| Placar numerado nos pilares             | briefing (esporte) + `anti-ai-slop` "um detalhe memorável" | organiza conteúdo, não decora    | tira o conteúdo do grid de cards e devolve vocabulário de torneio              |
| Horizonte do Rio nas bordas             | briefing ("Pão de Açúcar")                                 | dispositivo de transição         | referência geográfica pedida, usada com função estrutural                      |
| Fios de 1px em vez de sombras           | `anti-ai-slop` teste do card                               | separação, não elevação          | tirar borda/sombra não prejudicava interação — logo, não era card              |
| Seção de depoimentos que se auto-oculta | `copywriting.md` "prova vence hype" + CDC art. 37          | prova social real apenas         | depoimento inventado é propaganda enganosa e derruba conta de anúncio          |
| Um único rabisco à mão no hero          | `anti-ai-slop` (destaque precisa de papel de conteúdo)     | uma ocorrência na página inteira | é o gesto assinatura, desenhado à mão, não troca de fonte — e não se repete    |

## QA visual

Checklist do guia anti-slop rodado antes da entrega — ver seção final do README.

---

## Movimento

Referência pedida pelo cliente: [motionsites.ai](https://motionsites.ai). O site em si está
bloqueado pela política de rede deste ambiente; a pesquisa veio da descrição pública do
catálogo dele.

**O que foi aproveitado:** as técnicas — parallax em camadas no scroll, revelação de texto
linha a linha por máscara, abertura de imagem por _clip-path_.

**O que foi rejeitado:** a estética do catálogo (fundos "Neon Pulse", "Cosmic Ripple",
heróis 3D de Web3). Ela brigaria com o reference lock e, pior, é justamente o visual de
"hero animado gerado por IA" que a página precisa evitar.

A adaptação: em vez de um efeito genérico de fundo, o parallax move as três camadas reais do
horizonte do Rio em velocidades diferentes — serra distante quase parada, Morro da Urca no
meio, Pão de Açúcar na frente. A profundidade vem da geografia, não de um gerador de
partículas.

| Efeito                | Onde                                         | Serve a                                                     |
| --------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| Parallax de 3 camadas | horizonte do Rio no hero, oferta e CTA final | hierarquia — dá fundo ao campo azul                         |
| Deriva vertical       | sol, linha d'água                            | continuidade                                                |
| Reveal linha a linha  | todas as manchetes                           | hierarquia — impõe a ordem de leitura                       |
| Máscara de abertura   | fotos                                        | continuidade — a imagem "chega" no lugar                    |
| Contador              | placar de números do hero                    | hierarquia — o número é o argumento                         |
| Faixa correndo        | dizeres entre seções                         | textura de cartaz de torneio                                |
| Holofote de revelação | dois vídeos empilhados no hero               | hierarquia — a mídia vira o argumento, e o cursor participa |

Regras seguidas de `references/motion.md`: nada com easing linear, nada acima de 900 ms, e
`prefers-reduced-motion` desliga parallax, contador e máscara por completo.

---

## QA visual — o que a verificação em navegador pegou

Rodado com Chromium em 1440×900 e 390×844, seção por seção. Cinco defeitos reais que a
revisão de código sozinha não teria encontrado:

1. **Acentos sumindo no título.** "VOCÊ JÁ" aparecia como "VOCE JA". A máscara do reveal
   (`overflow-hidden`) cortava os diacríticos, que em caixa alta ficam acima da altura de
   caixa. Corrigido com folga interna e margem negativa compensando.
2. **Fotos presas fechadas.** Um elemento com `clip-path: inset(0 0 100%)` tem área visível
   zero — e o `IntersectionObserver` nunca dispara nele. O observador passou para o elemento
   de fora, sem recorte, e o clip-path foi para o filho.
3. **Placeholder de imagem invisível.** A `<img>` falha antes da hidratação, então o
   `onError` do React nunca chega a rodar. Passou a conferir `complete && naturalWidth === 0`
   ao montar.
4. **O horizonte do Rio não aparecia.** Estava desenhado em `#04192B` sobre um fundo quase
   da mesma cor. Virou azul de bruma (`#0D4671`) — que é como o morro distante se lê da
   praia ao entardecer, mais claro que o céu já escuro.
5. **Papel de token furado.** O preço estava em laranja, competindo com o botão de compra.
   Voltou para a tinta; o laranja é do CTA e do rabisco do hero, e de mais nada.

## Checklist anti-slop

- [x] Acento não é indigo/violeta
- [x] Cards só onde há interação (o bloco da oferta) — o resto é fio de 1px
- [x] Sem stripe lateral decorativa
- [x] Nenhum emoji como ícone
- [x] Troca decorativa de palavra em serifada/itálico: removida do projeto (a família serifada nem está instalada)
- [x] Paleta terrosa vem do briefing do cliente ("azul e cor de areia"), não de default
- [x] Caixa alta sempre com `letter-spacing`
- [x] Papéis de mídia preservados: hero é conduzido por foto, com placeholder honesto e direção de arte
- [x] Um detalhe memorável: o placar numerado + o horizonte da Guanabara em parallax
- [x] Teste editorial: trocando o logo por um hotel-butique, a página deixa de fazer sentido — logo, é específica

---

## Holofote do hero

Referência trazida pelo cliente: o hero "Cyber Ronin", em que uma imagem base é atravessada
por uma segunda cena revelada num facho radial que segue o cursor.

**O que foi aproveitado:** a mecânica. Duas camadas empilhadas, a de cima recortada por uma
`radial-gradient` como `mask-image` que acompanha o ponteiro, com queda suave em cinco
paradas e raio responsivo (120px abaixo de 480, 160px abaixo de 720, 260px acima).

**O que foi rejeitado:** tudo o mais daquele hero — paleta laranja/creme cyberpunk, tipografia
Orbitron, o vocabulário de "Neural Edges". Nada disso pertence a um curso de futevôlei, e
adotar aquilo jogaria fora o reference lock.

**A adaptação:** em vez de duas imagens, dois vídeos das bolas. A camada base toca sempre; a
revelada mostra a mesma cena em outro momento. Dois véus azuis diferentes — mais pesado à
esquerda, onde vive a manchete, mais leve à direita — mantêm o texto legível e a cena dentro
da paleta de mar e areia.

Duas decisões que o hero original não precisava tomar:

- **Varredura de apresentação.** Numa página de vendas, quem chega pelo Instagram muitas
  vezes não move o mouse antes de decidir sair. O facho faz uma passada sozinho ao carregar,
  uma vez só, e devolve o controle no primeiro movimento do ponteiro.
- **Degradação sem os arquivos.** Se os vídeos não carregarem — arquivo ausente, rede ruim,
  codec sem suporte — as camadas se apagam e o hero volta ao desenho de gradiente com o
  painel de foto. Nunca sobra um retângulo preto no lugar mais caro da página.

`prefers-reduced-motion` pausa os dois vídeos e desliga o facho por completo.
