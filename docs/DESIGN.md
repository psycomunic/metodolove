# Método LLOVE — direção de design

Redesign de set/2026. Substitui a direção anterior ("cartaz de torneio": areia clara,
marinho saturado, arcos concêntricos, laranja no CTA, verde-lima como terceira voz).
O que motivou a troca está em [Por que a direção mudou](#por-que-a-direção-mudou).

## Briefing

    Landing page de venda do Método LLOVE, formação para PROFESSORES de futevôlei.
    Objetivo: comprar o curso (12x de R$ 30,81 ou R$ 297,90 à vista).
    Público: quem já dá aula e improvisa, e quem joga bem e vai começar a ensinar.
    Tom: direto, honesto, coloquial. Sem promessa de renda, sem contador falso.
    Objeção principal: "eu já jogo bem, o que é que esse curso me acrescenta?"
    Restrição inegociável: ZERO laranja. O acento cromático é verde, e só ele.

## Reference lock

Dark SaaS premium cruzado com esporte: Linear, Mercury e Auros para a superfície e a
disciplina de hairline; WHOOP e Nike para a energia esportiva e o peso da manchete
condensada. O que essas referências têm em comum, e que é o coração deste sistema:
**profundidade por tom, não por sombra**, e **um acento cromático só**.

---

## Paleta

| Token                 | Valor                   | Papel                                  |
| --------------------- | ----------------------- | -------------------------------------- |
| `--color-void`        | `#06111F`               | fundo base, navy quase preto           |
| `--color-navy`        | `#0B1A2E`               | seções alternadas                      |
| `--color-card`        | `#12233B`               | cards                                  |
| `--color-line`        | `rgba(255,255,255,.08)` | Todo contorno da página, sempre 1px    |
| `--color-ink`         | `#E8EEF5`               | texto                                  |
| `--color-mute`        | `#9AA8BB`               | texto de apoio, label mono             |
| `--color-fraco`       | `#64748B`               | metadado, fonte do dado, preço riscado |
| `--color-verde`       | `#22C55E`               | **só** o botão de compra               |
| `--color-fundo-verde` | `#15803D`               | hover do botão de compra               |
| `--color-accent`      | `#4FA3FF`               | palavra destacada, check, dot, borda   |
| `--color-accent-soft` | `#7CC4FF`               | glow, hover leve                       |
| `--color-areia`       | `#E9D8B4`               | herança da marca, só no logo           |

### Duas cores, dois papéis que não se cruzam

**Verde é exclusivo do botão de compra.** Não existe verde em texto, ícone,
borda, número, glow ou fundo. A regra tem uma razão prática: quando o acento
ocupa cinco papéis, ele para de significar "clique aqui". Foi assim que o
laranja da direção anterior morreu, e o verde não vai pelo mesmo caminho.

**Azul claro (`--accent`) é todo o resto do destaque:** a palavra realçada da
manchete (uma por manchete, nunca duas), os checks, o dot de turma aberta, a
borda do card de bônus, o glow das auroras, o fio de progresso de leitura e o
spotlight dos cards.

Teste rápido: aponte para qualquer coisa verde na tela. Se ela não for
clicável e não levar ao checkout, é bug.

### Contraste do CTA

Repouso: texto `#06111F` sobre `#22C55E` = **8:1** (AAA). No hover o fundo vai
para `#15803D` **e o texto vira branco**: navy sobre `#15803D` daria 3,8:1 e
reprovaria AA justamente no estado em que a pessoa está olhando para o botão.

### Nenhum botão diz "entrar"

A página não tem login nem área de aluno. Todo botão leva ao checkout, e os
rótulos dizem isso: "Garantir minha vaga" (nav), "Quero dar aula com método"
(hero), "Quero minha vaga no método" (oferta), "Garantir minha vaga agora"
(CTA final), "Garantir vaga" (barra fixa). Rótulo que promete uma porta que
não existe fura a expectativa de quem clica.

---

## Tipografia

| Face                 | Onde                                       | Ajuste                                              |
| -------------------- | ------------------------------------------ | --------------------------------------------------- |
| **Barlow Condensed** | manchete, placar, número de stat           | 800, caixa alta, tracking -0.02em, line-height 0.95 |
| **Manrope**          | corpo, UI                                  | 400–700, 16–18px, line-height 1.6                   |
| **JetBrains Mono**   | label, `01/04`, `MÓDULO 03`, fonte do dado | 12–13px, caixa alta, tracking 0.12em                |

H1 em `clamp(3rem, 7.4vw, 6.5rem)`. O teto é 104px e não os 120px do briefing porque a
manchete divide a linha com a foto do Charllove: acima disso "Pare de improvisar aula."
atravessa a coluna e encosta no rosto dele.

Medida de leitura: `.leitura`, 38rem. Linha mais longa faz o olho perder o retorno.

Mono em label é o que faz `01/04` ler como referência e não como número solto de
parágrafo. Não troque por sans "só para uniformizar".

---

## Superfície

- **Grão** de filme sobre a página inteira: `feTurbulence` em data URI, 4,5% de opacidade,
  `mix-blend-mode: overlay`, `position: fixed`. Fixo porque é o papel, não a textura de um
  bloco; se rolasse junto, viraria papel de parede.
- **Aurora**: dois blobs radiais com `blur(140px)`, verde a 18% e azul `#1E3A8A` a 25%.
  Só no hero, na oferta e no CTA final. É o que dá volume ao navy sem acender uma cor.
- **Card**: `--color-card`, borda 1px `--color-line`, highlight `inset 0 1px 0` branco 6%
  no topo, raio 16px. **Sem sombra**: a elevação vem da luz na aresta de cima e do tom.
- **Emenda entre seções**: um fio de 1px, nunca troca brusca de fundo.
- **Spotlight** nos cards: gradiente verde a 12% seguindo o cursor por `--mx/--my`, com a
  borda acendendo junto. Sem JS o card continua legível, só não acende.

---

## Movimento

Toda animação serve a feedback, continuidade ou hierarquia. Nada passa de 900ms, nada usa
easing linear.

| Peça             | O que faz                                                    |
| ---------------- | ------------------------------------------------------------ |
| `Reveal`         | blur(8px) + y:24 → nítido, `once`, 600ms, ease [.22,1,.36,1] |
| `LinhasReveal`   | manchete linha a linha, máscara, stagger de 80ms             |
| `Contador`       | número sobe até o valor ao entrar na viewport                |
| `useIma`         | CTA persegue o cursor num raio curto e volta em mola         |
| `useSpotlight`   | gradiente do card segue o cursor                             |
| `BarraProgresso` | fio verde de 2px no topo, `scaleX` puro                      |
| `.marquee`       | faixa de pilares, 42s linear, pausa no hover                 |

### A trava do `.js`

O estado **escondido** de toda animação de entrada mora no CSS, atrás da classe `.js` que
um script inline põe no `<html>` antes da primeira pintura. Nunca em `style` inline vindo
do servidor.

Sem essa trava, o HTML servido já sai com `opacity: 0` e a página de vendas inteira fica
invisível quando o JavaScript falha, demora ou vem bloqueado. É isso que o crawler do
Google e o robô de preview de link do WhatsApp enxergam. Com JS, o script roda antes da
pintura e ninguém vê o texto aparecer e sumir.

O `<html>` leva `suppressHydrationWarning` por causa disso: o className É diferente no
servidor e no cliente, de propósito.

### `prefers-reduced-motion`

Desliga máscara de manchete, ímã, contador, marquee, dot e scroll suave. Sobra o conteúdo
no lugar. Não há Lenis nem scroll hijacking na página: o smooth scroll é o nativo do CSS,
que o próprio `prefers-reduced-motion` já desarma.

---

## Fotografia

**Nenhum tratamento de cor.** Sem duotone, sem grayscale, sem `filter`, sem
`mix-blend-mode`, sem véu azul ou navy por cima. As fotos ficam na cor real
delas.

O duotone navy chegou a existir aqui e o cliente reprovou, com razão: o
Charllove precisa parecer uma pessoa de verdade numa quadra de verdade, não um
recorte de identidade visual. Foto tratada em cima da paleta é decisão de
marca de refrigerante, não de quem vende a própria credibilidade.

O que sobra é recorte e máscara, que mexem em enquadramento e opacidade e
nunca em matiz:

- `mask-image` na base, para a foto fundir no fundo em vez de terminar numa
  aresta reta.
- Onde há texto por cima da imagem, o escurecimento é **preto** (40%), nunca
  colorido, e vive em quem posiciona o texto, não dentro do componente.
- `object-position` à esquerda no banner do hero: a arte original é 2:1 com o
  Charllove à esquerda e o lettering MÉTODO LLOVE à direita, e qualquer
  recorte que passe de ~46% da largura traz junto a faixa creme do lettering.

Quando o arquivo não existe, `Foto` cai num placeholder honesto com a direção
de arte escrita e o caminho marcado como `TODO asset`. **Mantenha esse
comportamento** em qualquer componente novo que dependa de mídia.

---

## Celular

O alvo é 360px, não 390: se fecha no iPhone SE, fecha em tudo. Testado em 360,
390 e 430 a cada mudança, com auditoria de rolagem horizontal, contagem de
linhas por manchete e piso de corpo de fonte.

- **Centralizado**: hero inteiro, cabeçalho de todas as seções, preço, CTA e
  footer. Dentro dos cards o texto continua alinhado à esquerda: cabeçalho
  centralizado organiza a entrada da seção, parágrafo centralizado atrapalha
  a leitura.
- **Manchete curta em uma linha** (`umaLinha`): a largura do texto vai em `em`
  para o CSS na variável `--em`, e o corpo da fonte encolhe até caber
  (`min(3rem, calc((100vw - 3rem) / var(--em)))`). Resolve em CSS puro o que
  normalmente exigiria medir texto em JavaScript. O fator de 0,415em por
  caractere foi medido no navegador, na própria Barlow Condensed 800.
- **Manchete longa fluindo** (`flui`): abaixo de 640px as quebras escritas à
  mão são ignoradas e o texto corre natural. Mantê-las faria cada linha do
  desktop quebrar de novo, e a manchete de três linhas viraria cinco.
- **Pisos de tipografia**: 16px no corpo, 13px em label mono. Exceções
  conscientes: a barra de urgência (14px, é aviso de topo) e o aviso legal do
  rodapé (13px, é letra miúda por definição).
- **Botão** de largura total, teto de 420px, centralizado. No tamanho `sm` a
  seta some: ela custa 28px, e é esse tanto que falta para a pílula da nav
  caber em 360px sem empurrar a página para o lado.
- **Barra fixa de compra**: 64px, preço à esquerda, botão à direita,
  `safe-area-inset-bottom`, e some quando a seção de oferta entra na tela.

---

## Verão: o ritmo claro/escuro

A página deixou de ser toda navy em set/2026. O cliente foi direto: "muito,
muito escuro, sem vida. É futevôlei: tem que passar VERÃO." O que resolveu não
foi clarear tudo, foi **alternar**.

| Seção     | Fundo               | Família |
| --------- | ------------------- | ------- |
| Hero      | céu de fim de tarde | escura  |
| Marquee   | areia               | clara   |
| Dor       | creme               | clara   |
| Mercado   | areia               | clara   |
| Mecanismo | creme               | clara   |
| Módulos   | navy                | escura  |
| Autor     | creme               | clara   |
| Público   | areia               | clara   |
| Oferta    | void, card em creme | escura  |
| FAQ       | creme               | clara   |
| CTA final | void                | escura  |
| Rodapé    | navy                | escura  |

### `.claro` remapeia, não duplica

A seção clara recebe a classe `.claro`, que **remapeia os tokens que os
componentes já usam**: `--color-ink`, `--color-mute`, `--color-card`,
`--color-line`, `--color-accent` e `--color-rotulo`. `Olho`, `Manchete`,
`Reveal`, `.card`, `.spot` e o accordion do FAQ servem às duas famílias sem
uma linha de condicional e sem uma variante clara de cada um.

Isso só funciona porque o Tailwind 4 emite as utilidades de cor como
`var(--color-*)` e não como valor literal. **A regra que sustenta tudo: nunca
escreva hex solto num componente.** Um `text-[#E9D8B4]` para de acompanhar a
família da seção e vira bug invisível na próxima troca de fundo.

O que NÃO é remapeado, de propósito: `--color-verde` e `--color-void`, porque
o botão de compra é o mesmo nas duas famílias (verde com texto navy passa em
AA sobre creme e sobre navy).

### Contraste, medido e não estimado

Auditoria por CDP percorre todo texto dentro de `.claro`, acha o fundo
realmente pintado atrás dele e compara com o piso AA (4,5:1, ou 3:1 em texto
grande). Zero reprovações é condição de merge.

Foi essa medição que definiu a terracota: `#C96F4A` dá 2,8:1 sobre areia e
`#A85536` dá 3,9:1, os dois reprovam. `--color-terracota-forte` é `#8F4529`,
que dá 4,9:1. A terracota clara sobrou só para o que não é texto nem ícone.

### Emenda entre famílias

Toda troca de família passa pelo `Emenda`: uma faixa de 64px com o calçadão,
navy sobre creme quando a seção que chega é clara, areia sobre navy quando é
escura. Corte reto entre claro e escuro lê como duas páginas coladas.

A emenda vive na FRONTEIRA, em `app/page.tsx`, e não dentro de uma das duas
seções. No rodapé ela foi removida: dentro de um contêiner com padding o
recorte comia a barriga da onda e o que sobrava lia como uma fileira de "V".

### Grão só no escuro

`.escuro` traz o grão de filme como `::after`. Sobre creme ele lê como papel
sujo, não como fotografia, e por isso deixou de ser uma camada fixa sobre o
documento inteiro.

### Sombra quente

No escuro a profundidade vem da luz na aresta de cima do card. No claro vem de
`--sombra-card`, que é **quente** (`rgba(201,111,74,.1)`). Sombra neutra sobre
creme acinzenta o papel e desmancha o fim de tarde.

---

## Rio de Janeiro

O professor é do Rio e o esporte nasceu em Copacabana. A cidade aparece na
página inteira, sempre no mesmo registro: **navy sobre navy, contorno em
branco translúcido, movimento lento demais para chamar atenção sozinho**. Se
um elemento do Rio disputar o olho com a manchete ou com o botão, ele está
forte demais e a página perde, não ganha.

Tudo em SVG desenhado no código, em `components/rio/`. Nenhum raster, nenhum
ícone de biblioteca, nenhum emoji.

| Peça               | Onde                                                    |
| ------------------ | ------------------------------------------------------- |
| `RioSkyline`       | base do hero (dia) e do CTA final (noite)               |
| `GaivotasLoop`     | céu do hero                                             |
| `RedeFutevolei`    | fundo da seção Dor, à direita                           |
| `FutevoleiBall`    | ao lado da manchete de Mercado                          |
| `CalcadaoWaves`    | divisores de Mecanismo, Oferta e rodapé; textura da bio |
| `CristoSilhouette` | atrás do texto da bio                                   |
| `PaoDeAcucar`      | canto do card de bônus, com o bondinho                  |
| `Monograma`        | rodapé (e `app/icon.svg` no favicon)                    |

### O que faz a silhueta ler como Rio

Os morros do Rio são domos de granito: **altos para a base que têm**. A
primeira versão do `RioSkyline` espalhou cada morro por 200 a 300 unidades de
largura e o resultado foi uma serra genérica de papel de parede. A inclinação
entrega a cidade mais do que o contorno.

Depois disso, três detalhes carregam o reconhecimento e não podem sumir:

1. **O topo achatado da Pedra da Gávea**, com a face de pedra quase vertical
   do lado do mar.
2. **Os dois picos do Dois Irmãos**, colados, o da esquerda bem mais alto e
   mais pontiagudo.
3. **O cabo do bondinho** ligando o cume da Urca ao do Pão de Açúcar. Sem ele,
   os dois morros da direita são só dois montes.

O Cristo tem 30 m num morro de 710 m, ou 4% da altura (5,4% com o pedestal).
No desenho ele tem 6,5%: um fio acima do real, porque abaixo disso some no
traço, e ainda muito longe do bonequinho de ilustração de agência.

### Três camadas, e a de trás é a mais clara

Sobre fundo escuro a perspectiva atmosférica **inverte**: o que está longe
recebe bruma e clareia. Escurecer a camada distante para "afastar" faz ela
sumir no fundo. Serra distante `#16294A` a 32%, cartões-postais `#0E1F3A` a
68%, mar e areia por último.

### Enquadramento, que muda de eixo com a tela

`xMidYMax slice` corta o excedente, e o eixo do corte depende da razão da
tela:

- **Desktop** (mais achatado que o viewBox): corta EM CIMA. Por isso nenhum
  cume passa de y=42 e o Cristo tem folga acima.
- **Celular**: corta NAS LATERAIS. Em 360px sobra a faixa de x=350 a x=1250,
  e é por isso que a composição inteira vive entre x=300 e x=1300 em vez de
  espalhada nos 1600 do viewBox.

### Movimento

Só `transform` e `opacity`, `will-change: transform`, e tudo desligado em
`prefers-reduced-motion`.

- **Parallax** (`useParallax`): scroll mais mouse, uma escuta para as três
  camadas, transformação escrita direto no nó. O deslocamento é sempre PARA
  BAIXO: a camada que desce enquanto a página sobe é o que lê como
  profundidade, e subir empurraria o desenho para fora do topo do contêiner,
  que é recortado, decapitando o cume mais alto. No celular tudo entra pela
  metade.
- **Bondinho**: os passos saem da própria curva quadrática do cabo, amostrada
  em t = 0, ¼, ½, ¾ e 1. Mexeu no cabo, refaça a conta em `@keyframes
bondinho`. O `translate` inicial fica num grupo POR FORA do animado:
  `transform` de CSS sobrepõe o atributo `transform` do SVG, e com os dois no
  mesmo nó o carrinho salta para a origem do viewBox.
- **Ondas do calçadão**: oito ladrilhos numa fila e translação de -50%, que
  equivale a quatro ladrilhos idênticos. A emenda nunca aparece.
- **Bola**: o pai boia e o filho gira. Compor rotação e translação no mesmo nó
  faz a bola parecer presa a um fio em vez de boiar.
- **Luzes da orla**: posições e ritmos escritos à mão. `Math.random` daria
  valores diferentes no servidor e no cliente e quebraria a hidratação.

### Cor

Só navy, azul-noite e branco de baixa opacidade. O azul `--accent` entra
apenas como brilho fino de contraluz na crista dos morros. **Verde não existe
em nenhuma peça do Rio**: verde é do botão de compra e de mais nada.

---

## Por que a direção mudou

A direção anterior ("cartaz de torneio") tinha três problemas que o redesign resolve:

1. **O laranja estava em toda parte.** Botão, arco, régua, rótulo e bloco de preço. Quando
   o acento ocupa cinco papéis, ele deixa de marcar o clique.
2. **A página parecia um curso para jogador**, não uma formação profissional. Areia clara,
   sol e arco irradiando falam de praia; quem compra aqui está decidindo sobre a própria
   profissão.
3. **Faltava mercado.** Não havia nenhum dado, nenhuma fonte, nenhum argumento de tamanho
   de oportunidade. A seção de mercado, com fonte visível em cada número, é a peça nova
   mais importante da página.

O que **não** mudou, e não deve mudar:

- Nada de promessa de resultado, renda ou retorno (CDC art. 37, política do Meta Ads).
- Nada de depoimento inventado. A lista está vazia de propósito, e a barra de urgência
  no topo diz exatamente isso.
- Nada de travessão no texto da página. O cliente reprovou duas vezes.
- Numeração é mono e nua. Nada de quadrado, chapa ou caixa em volta do número: o cliente
  reprovou essa direção duas vezes.
- Caixa alta sempre com `letter-spacing`. Emoji nunca é ícone.
