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
| Ilustrações (arcos, Pão de Açúcar, sol) | `components/art.tsx`            |
| Parallax, reveal, contador, máscara     | `components/movimento.tsx`      |
| Fundo do hero (as duas artes)           | `public/FUNDO-HERO-*.jpg`       |
| Botão, rótulo, foto, rabisco            | `components/ui.tsx`             |

**Nunca escreva texto de interface direto num componente.** Todo conteúdo vem de
`lib/content.ts`, porque quem edita a página é o cliente, não um programador.

---

## Invariantes de design

A direção visual está documentada em `docs/DESIGN.md`, com o raciocínio por trás de cada
escolha. Estas cinco regras não podem ser quebradas sem refazer aquele documento:

1. **Laranja chapado é do CTA.** O laranja pode ocupar área grande em arco vazado, mas
   preenchimento sólido de laranja é do botão de compra e do bloco de preço. Se um bloco
   laranja chapado não for clicável, ele compete com o botão e a página converte menos.
2. **Marinho é o campo, areia é o papel da leitura.** Seções de energia (hero, faixa,
   oferta, CTA final) usam `noite-*`; seções de texto longo usam `areia-*`. Não invente um
   quarto fundo.
3. **Lima (`lima-*`) só em display.** Bloco de manchete e número de placar. Nunca em texto
   corrido, ícone repetido ou fundo de seção — vira néon e mata o laranja do botão.
4. **Arco irradia de ponto com significado**: o canto da mídia, o pé da manchete, o centro
   do bloco de conversão. Arco em posição arbitrária é papel de parede.
5. **Inclinação é privilégio da manchete** (até 1.5°, texto contra-rotacionado pela classe
   `.bloco`). Botão, card e pílula nunca inclinam — clicável torto perde o affordance.
6. **Uma superfamília só.** Archivo Black na manchete e no placar, Archivo no resto. Se
   trocar a face de display, releia `docs/DESIGN.md` §Tipografia: a largura da face amarra
   as escalas `clamp()` e o `letter-spacing` da classe `.display`.
7. **Nunca use areia translúcida sobre o marinho** (`bg-areia-*/NN`) — compõe em cinza.
   Seção de leitura usa areia opaca.
8. **Não desenhe arcos por cima do hero**: as artes `FUNDO-HERO-*.jpg` já os trazem.

Caixa alta sempre com `letter-spacing` (use a classe `.rotulo`). Nunca use emoji como ícone.

---

## Conteúdo sensível

**Depoimentos.** `depoimentos` em `lib/content.ts` começa vazio e a seção se auto-oculta.
Não preencha com exemplos inventados, nem "só para visualizar". Depoimento fabricado é
propaganda enganosa (CDC art. 37) e derruba conta no Meta Ads. Só entram depoimentos reais
com autorização.

**Promessas de resultado.** O produto é treinamento esportivo. Nenhum texto pode prometer
desempenho, classificação em campeonato, renda ou retorno financeiro. O aviso legal no
rodapé (`components/Rodape.tsx`) existe por isso e não deve ser removido.

---

## Armadilhas já encontradas neste código

Cinco defeitos que passaram batido na revisão de código e só apareceram no navegador. Se
mexer nessas áreas, verifique no browser, não só no build:

1. **Máscara corta acento.** Em caixa alta, `Ê` e `Á` sobem acima da altura de caixa. O
   reveal por máscara em `LinhasReveal` precisa de folga em cima (`pt-[0.2em]`) e embaixo
   (`pb-[0.42em]`, para o rabisco), com margem negativa devolvendo o espaço.
2. **`clip-path` mata o IntersectionObserver.** Um elemento recortado a 100% tem área
   visível zero e o observador nunca dispara nele. Em `Desmascara`, o observador fica no
   elemento de fora e o recorte no filho. Não junte os dois.
3. **`onError` de `<img>` não dispara depois da hidratação.** A imagem falha antes do React
   anexar o handler. `Foto` em `ui.tsx` confere `complete && naturalWidth === 0` ao montar.
4. **Silhueta escura sobre fundo escuro some.** O horizonte do Rio é desenhado em azul de
   bruma (`#0D4671`), mais claro que o céu. Não "corrija" para uma cor mais escura.
5. **Hook precisa começar com `use`.** `useProgresso` cria e devolve o próprio ref em vez de
   recebê-lo por argumento — passar ref durante o render é erro de lint e de conceito.

---

## Mídia

Arquivos que o cliente ainda vai fornecer. Enquanto não existirem, a página cai num
placeholder honesto com a direção de arte escrita e **nada quebra**. Mantenha esse
comportamento em qualquer componente novo que dependa de mídia.

- `public/videos/bola-1.mp4` e `bola-2.mp4` — ver `public/videos/LEIA-ME.txt`
- `public/images/hero.jpg`, `charllove.jpg`, `og.jpg` — ver `public/images/LEIA-ME.txt`

---

## Movimento

Regras em `docs/DESIGN.md`. Em resumo: nada com easing linear, nada acima de 900 ms, e
`prefers-reduced-motion` desliga parallax, contador, máscaras e pausa os vídeos. Toda
animação nova precisa servir a feedback, continuidade ou hierarquia — se não serve a
nenhum dos três, não entra.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
