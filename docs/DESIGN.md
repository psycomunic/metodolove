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
2. **Azul como campo dominante, areia como papel, laranja SÓ em CTA e estado ativo.**
   O laranja nunca vira fundo, badge decorativo ou preenchimento.
3. **Numeração de placar** como dispositivo organizador — números grandes e tabulares em
   pilares, objeções e módulos. É o gesto memorável da página.
4. **Horizonte do Rio** (Corcovado, Morro da Urca, Pão de Açúcar, cabo do bondinho) como
   dispositivo recorrente na fronteira das seções — sempre na linha do horizonte, nunca como
   ornamento solto.
5. **Assimetria com trilho à esquerda.** Nenhuma seção centralizada, exceto a oferta.

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

| Token  | Valor                  | Papel — e só ele                                    |
| ------ | ---------------------- | --------------------------------------------------- |
| Papel  | `#F3EAD8` areia        | fundo da página                                     |
| Campo  | `#062A45` mar profundo | faixas dominantes (hero, autor, oferta, CTA final)  |
| Tinta  | `#08243B`              | texto sobre areia                                   |
| Acento | `#F2762E` pôr do sol   | CTA primário, estado ativo, o rabisco único do hero |
| Apoio  | `#1470A6` mar          | rótulos, ícones de confirmação, fios sobre o campo  |
| Raio   | 2px estrutural         | única exceção: pílula do CTA primário               |

### Tipografia

Duas famílias, justificadas por direção de arte real (display de cartaz vs. texto funcional):

- **Anton** — display, caixa alta, condensado. Manchetes, números de placar, o logo.
- **Archivo** — texto, rótulos, interface. 400/500/600/700.

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

| Decisão                                 | Origem                                                         | Papel preservado                 | Por quê                                                                                 |
| --------------------------------------- | -------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| Areia como papel, azul como campo       | briefing do cliente                                            | acento fica fora do papel        | pedido explícito: "as cores são azul e cor de areia"                                    |
| Laranja pôr do sol como acento          | craft `color.md` (dominante + acento afiado)                   | CTA e ativo apenas               | maior contraste possível contra o azul profundo; disciplina de acento único             |
| Anton condensado em caixa alta          | craft `typography.md` (§0 contexto: marketing, não ferramenta) | display apenas                   | tipografia de cartaz esportivo; distinção por escala/peso/caixa em vez de troca de face |
| Placar numerado nos pilares             | briefing (esporte) + `anti-ai-slop` "um detalhe memorável"     | organiza conteúdo, não decora    | tira o conteúdo do grid de cards e devolve vocabulário de torneio                       |
| Horizonte do Rio nas bordas             | briefing ("Pão de Açúcar")                                     | dispositivo de transição         | referência geográfica pedida, usada com função estrutural                               |
| Fios de 1px em vez de sombras           | `anti-ai-slop` teste do card                                   | separação, não elevação          | tirar borda/sombra não prejudicava interação — logo, não era card                       |
| Seção de depoimentos que se auto-oculta | `copywriting.md` "prova vence hype" + CDC art. 37              | prova social real apenas         | depoimento inventado é propaganda enganosa e derruba conta de anúncio                   |
| Um único rabisco à mão no hero          | `anti-ai-slop` (destaque precisa de papel de conteúdo)         | uma ocorrência na página inteira | é o gesto assinatura, desenhado à mão, não troca de fonte — e não se repete             |

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
