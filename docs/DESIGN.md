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
| `--color-verde`       | `#22C55E`               | CTA, e nada além disso                 |
| `--color-glow`        | `#7CFF6B`               | palavra destacada, dot ao vivo, glow   |
| `--color-fundo-verde` | `#15803D`               | hover do CTA                           |
| `--color-areia`       | `#E9D8B4`               | herança da marca, só no logo           |

### A regra do acento

O verde aparece em **cinco** lugares, e em nenhum outro:

1. CTA (fundo chapado);
2. uma palavra por manchete, em `--color-glow`;
3. o ponto pulsante de "turma aberta";
4. os checks da coluna "é pra você se…" e da lista da oferta;
5. o glow das auroras (hero, oferta, CTA final) e a borda do card de bônus.

Verde em título de card, ícone repetido, fundo de seção ou texto corrido vira néon, e o
botão de compra deixa de ser o ponto mais quente da tela. Foi exatamente por isso que o
laranja caiu: ele estava em botão, arco, régua e rótulo ao mesmo tempo.

### Contraste do CTA

Repouso: texto `#06111F` sobre `#22C55E` = **8:1** (AAA). No hover o fundo vai para
`#15803D` **e o texto vira branco**: navy sobre `#15803D` daria 3,8:1 e reprovaria AA
justamente no estado em que a pessoa está olhando para o botão.

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

Todas as fotos entram em **duotone navy**, por cadeia de filtro:

```
grayscale(1) sepia(1) hue-rotate(186deg) saturate(1.9) brightness(0.8) contrast(1.06)
```

Filtro e não `mix-blend-mode`: blend depende do contexto de empilhamento do pai, e basta a
foto entrar num elemento com `isolation`, `filter` ou z-index próprio (metade dos lugares
onde ela é usada aqui) para a camada de cor sumir sem erro nenhum e a foto voltar a cinza.
O filtro viaja com a imagem.

Máscara de gradiente na base para fundir no fundo, sem aresta reta de foto no meio do navy.

Quando o arquivo não existe, `Foto` cai num placeholder honesto com a direção de arte
escrita e o caminho marcado como `TODO asset`. **Mantenha esse comportamento** em qualquer
componente novo que dependa de mídia.

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
