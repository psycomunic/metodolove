# Método LLOVE — instruções para agentes

Landing page de venda do Método LLOVE, curso de futevôlei do Charllove (@_charllove).
Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript 6.

Este arquivo é lido por assistentes de código (Antigravity, Cursor, Codex, Claude Code).
Leia antes de mexer em qualquer coisa.

---

## Comandos

```bash
npm install
npm run dev          # localhost:3000
npm run build        # build de produção
npm run lint         # eslint — precisa passar limpo
npm run typecheck    # tsc --noEmit
npm run format       # prettier, com ordenação de classes do Tailwind
```

Antes de dar qualquer tarefa por concluída: `npm run lint && npm run typecheck && npm run build`.

---

## Onde fica cada coisa

| Preciso mudar                           | Vou em                          |
| --------------------------------------- | ------------------------------- |
| Qualquer texto, preço, link de checkout | `lib/content.ts` — **e só ali** |
| Cor, tipografia, espaçamento, movimento | `app/globals.css` (os tokens)   |
| Ordem das seções                        | `app/page.tsx`                  |
| Uma seção específica                    | `components/<NomeDaSeção>.tsx`  |
| Reveal, contador, ímã, spotlight        | `components/movimento.tsx`      |
| Botão, olho, manchete, foto, check      | `components/ui.tsx`             |
| Qualquer desenho do Rio                 | `components/rio/`               |
| Parallax das camadas do Rio             | `components/rio/parallax.ts`    |
| Foto do Charllove no hero               | `public/HERO-DESKTOP.jpg`       |
| Colagem do percurso dele                | `public/colagem-charllove.png`  |

**Nunca escreva texto de interface direto num componente.** Todo conteúdo vem de
`lib/content.ts`, porque quem edita a página é o cliente, não um programador.

---

## Invariantes de design

A direção visual está documentada em `docs/DESIGN.md`, com o raciocínio por trás de cada
escolha. Estas regras não podem ser quebradas sem refazer aquele documento:

1. **ZERO laranja**, e o verde é **só do botão de compra**. Nada de verde em
   texto, ícone, borda, número, glow ou fundo. Teste: se algo verde na tela
   não for clicável e não levar ao checkout, é bug. O destaque de leitura é o
   azul `--accent` (#4FA3FF).
2. **Uma palavra destacada por manchete, nunca duas.** Com duas o olho não
   sabe qual é a promessa e o destaque vira zebra.
3. **Nenhum botão diz "entrar".** A página não tem login nem área de aluno:
   todo CTA leva ao checkout e o rótulo diz isso. Rótulos em `lib/content.ts`.
4. **Foto na cor real.** Sem duotone, `filter`, `grayscale`, `mix-blend-mode`
   ou véu colorido. O cliente reprovou o duotone. Só `mask-image` para fundir
   na base, e escurecimento PRETO onde houver texto por cima.
5. **Profundidade por tom, não por sombra.** Card é `--color-card` + borda 1px
   `--color-line` + highlight inset no topo. `box-shadow` só como glow do CTA
   e do card da oferta.
6. **Emenda entre seções é um fio de 1px.** Nada de troca brusca de fundo,
   elipse ou onda.
7. **O estado escondido das animações mora no CSS, atrás da classe `.js`.**
   Nunca em `style` inline vindo do servidor: sem essa trava a página inteira
   fica invisível quando o JavaScript falha ou demora, e é isso que o crawler
   enxerga. Ver `docs/DESIGN.md`.
8. **Três faces, três funções.** Barlow Condensed na manchete e no placar,
   Manrope no corpo, JetBrains Mono só em label e metadado. Se trocar a face
   de display, releia `docs/DESIGN.md`: a largura da condensada amarra as
   escalas `clamp()` E o fator de 0,415em por caractere que faz as manchetes
   curtas caberem numa linha no celular.
9. **Numeração é mono e nua.** Nada de quadrado, chapa ou caixa em volta do
   número: o cliente reprovou essa direção em set/2026, duas vezes.
10. **Sem contador regressivo, sem escassez falsa.** A barra do topo diz por
    que o preço é o que é, e essa honestidade é o argumento da página inteira.
11. **Celular fecha em 360px**, não em 390. Toda manchete usa `umaLinha`
    (curta, cabe em uma linha) ou `flui` (longa, corre natural em até três
    linhas). Corpo com piso de 16px, label mono com piso de 13px.

12. **O Rio é textura, não ilustração.** Toda peça de `components/rio/` é
    navy sobre navy com contorno em branco translúcido, e movimento lento
    demais para alguém ver acontecer. Se um desenho da cidade disputar o
    olho com a manchete ou com o botão, ele está forte demais. Verde não
    entra em nenhum deles.

**Nunca use travessão (—) em texto da página.** O cliente reprovou em set/2026: é um
dos tells mais denunciados de texto escrito por IA. Reescreva a frase com ponto, vírgula
ou dois-pontos, nunca apenas apague o traço. Vale para `lib/content.ts` e para qualquer
texto em componente; comentários de código podem manter.

Caixa alta sempre com `letter-spacing` (classe `.mono`). Nunca use emoji como ícone.

---

## Conteúdo sensível

**Depoimentos.** A página NÃO tem seção de depoimentos, e `depoimentos` em
`lib/content.ts` está vazio de propósito: não há nenhum real autorizado ainda, e a barra
de urgência no topo diz exatamente isso ("quando entrarem os depoimentos, o preço sobe").
Não preencha com exemplos inventados, nem "só para visualizar". Depoimento fabricado é
propaganda enganosa (CDC art. 37) e derruba conta no Meta Ads. Quando existirem
depoimentos reais com autorização, crie a seção; até lá, a ausência deles é parte do
argumento da página.

**Promessas de resultado.** O produto é treinamento esportivo. Nenhum texto pode prometer
desempenho, classificação em campeonato, renda ou retorno financeiro. O aviso legal no
rodapé (`components/Rodape.tsx`) existe por isso e não deve ser removido.

---

## Armadilhas já encontradas neste código

Defeitos que passaram batido na revisão de código e só apareceram no navegador. Se mexer
nessas áreas, verifique no browser, não só no build:

1. **Página inteira invisível sem JavaScript.** O estado escondido do reveal precisa vir
   do CSS atrás de `.js` (invariante 5). Se ele voltar para `style` inline, o build passa,
   o lint passa, e a página servida é uma tela vazia.
2. **Máscara corta acento.** Em caixa alta, `Ê` e `Á` sobem acima da altura de caixa. A
   classe `.linha` precisa da folga em cima e embaixo, com margem negativa devolvendo o
   espaço ao fluxo.
3. **`overflow-x: hidden` no body mata o `position: sticky`.** Ele transforma o body em
   contêiner de rolagem e a nav para de grudar. Use `overflow-x: clip`.
4. **`mix-blend-mode` some sem erro nenhum** dentro de elemento com `isolation`, `filter`
   ou z-index próprio. Foi por isso que o duotone virou cadeia de filtro.
5. **`onError` de `<img>` não dispara depois da hidratação.** A imagem falha antes de o
   React anexar o handler. `Foto` em `ui.tsx` confere `complete && naturalWidth === 0`
   ao montar.
6. **Hook precisa começar com `use`.** `useNaTela` cria e devolve o próprio ref em vez de
   recebê-lo por argumento: passar ref durante o render é erro de lint e de conceito.
7. **`window.scrollTo` não rola com `scroll-behavior: smooth`** se você pedir a próxima
   posição antes de a anterior chegar. Em script de screenshot, use
   `scrollTo({ top, behavior: "instant" })`, senão a captura sai com metade das seções
   ainda escondidas e parece bug da página.

---

## Mídia

Arquivos que o cliente ainda vai fornecer. Enquanto não existirem, a página cai num
placeholder honesto com a direção de arte escrita e **nada quebra**. Mantenha esse
comportamento em qualquer componente novo que dependa de mídia.

- `public/images/og.jpg` (1200x630) — miniatura de compartilhamento. Hoje o link
  compartilhado no WhatsApp e no Instagram não tem imagem.
- `public/videos/metodo-web.mp4` — o Charllove explicando o método, ao lado da manchete
  do mecanismo. Enquanto não existir, `mecanismo.video.src` em `lib/content.ts` fica
  VAZIO e a seção cai no placeholder com a direção de arte escrita. Não aponte o `src`
  para um arquivo que ainda não está em `public/`: o play aparece, a pessoa clica e não
  acontece nada. O sufixo `-web` não é enfeite, é o que o `.gitignore` versiona.
- Uma versão do mockup `public/bonus-networking.webp` **com fundo transparente**. O
  arquivo atual tem fundo branco chapado e nenhum modo de mistura resolve isso sobre
  navy: multiply come o lettering creme da caixa e screen mantém o branco. Por isso o
  card de bônus é só tipografia hoje (ver comentário em `components/Modulos.tsx`).

---

## Movimento

Regras em `docs/DESIGN.md`. Em resumo: nada com easing linear, nada acima de 900 ms, e
`prefers-reduced-motion` desliga máscara de manchete, ímã, contador, marquee e scroll
suave. Toda animação nova precisa servir a feedback, continuidade ou hierarquia; se não
serve a nenhum dos três, não entra.

Não há Lenis nem qualquer scroll hijacking, de propósito: o smooth scroll é o nativo do
CSS, que o próprio `prefers-reduced-motion` já desarma, e a página não paga por uma
biblioteca de rolagem numa peça que precisa de Lighthouse alto no 4G.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
