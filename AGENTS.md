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
| Ilustrações (Pão de Açúcar, sol, ondas) | `components/art.tsx`            |
| Parallax, reveal, contador, máscara     | `components/movimento.tsx`      |
| Holofote de vídeo do hero               | `components/HeroReveal.tsx`     |
| Botão, rótulo, foto, rabisco            | `components/ui.tsx`             |

**Nunca escreva texto de interface direto num componente.** Todo conteúdo vem de
`lib/content.ts`, porque quem edita a página é o cliente, não um programador.

---

## Invariantes de design

A direção visual está documentada em `docs/DESIGN.md`, com o raciocínio por trás de cada
escolha. Estas cinco regras não podem ser quebradas sem refazer aquele documento:

1. **O laranja (`sol-*`) é do CTA.** Botão de compra, estado ativo e o rabisco único do
   hero. Nunca vira fundo de seção, badge decorativo, borda ou cor de preço. Se o laranja
   aparecer em mais lugares, o botão de compra deixa de ser a coisa mais óbvia da tela e a
   página converte menos.
2. **Areia é o papel, azul é o campo.** Seções claras usam `areia-*` de fundo; as escuras
   usam `mar-*`. Não invente um terceiro fundo.
3. **Card só onde existe interação.** O bloco da oferta é card porque é o container da
   conversão. O resto se separa com fio de 1px (`border` + classe `.fio`), não com borda,
   sombra e raio. Teste: se tirar borda, sombra, fundo e raio não atrapalha o entendimento,
   não era card.
4. **Uma família de display e uma de texto.** Anton para manchete e número de placar,
   Archivo para o resto. Não acrescente uma serifada para "dar sofisticação" — o projeto
   removeu essa família de propósito.
5. **Um único destaque à mão na página inteira**, o rabisco laranja do hero. Não repita o
   recurso em outras manchetes; a distinção vem de escala, peso e caixa.

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
