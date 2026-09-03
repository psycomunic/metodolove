# Método LLOVE — landing page

Página de vendas do Método LLOVE, curso de futevôlei do [Charllove](https://instagram.com/_charllove).

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript.

---

## Instalando na sua pasta "MÉTODO LOVE"

O projeto vive no GitHub. Para trazê-lo para a pasta onde estão os vídeos, sem apagar nada
do que já está lá, abra o terminal **dentro da pasta MÉTODO LOVE** e rode:

```bash
git init
git remote add origin https://github.com/psycomunic/metodolove.git
git fetch origin claude/landing-page-conversao-fhq6us
git checkout -b claude/landing-page-conversao-fhq6us origin/claude/landing-page-conversao-fhq6us
```

> Usamos `git init` + `fetch` em vez de `git clone` porque o `clone` exige pasta vazia, e a
> sua já tem os vídeos dentro.

Depois mova os dois vídeos para o lugar que a página procura, renomeando:

```bash
mkdir -p public/videos
mv "video 1.mp4" public/videos/bola-1.mp4
mv "video 2.mp4" public/videos/bola-2.mp4
```

(Troque `video 1.mp4` e `video 2.mp4` pelos nomes reais dos seus arquivos.)

Por último:

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. Passe o mouse pelo hero — o holofote deve revelar o segundo
vídeo.

### Abrindo no Antigravity

Abra a pasta MÉTODO LOVE como projeto. O repositório já traz o que o editor precisa:

- **`AGENTS.md`** — instruções para o assistente de código: onde fica cada coisa, os cinco
  invariantes de design que não podem ser quebrados e as cinco armadilhas que este código já
  encontrou. O Antigravity lê esse arquivo sozinho.
- **`.vscode/`** — formatação ao salvar, correção de lint ao salvar e autocomplete das
  classes do Tailwind 4.
- **`.agents/skills/refero-design`** — a skill de design que você instalou, já no formato
  universal que o Antigravity reconhece.

Na primeira vez que abrir um arquivo `.ts`, aceite usar a versão do TypeScript do projeto
quando o editor perguntar ("Use Workspace Version").

### Se for editar com IA

Peça para o agente ler o `AGENTS.md` e o `docs/DESIGN.md` antes de mexer no visual. Sem
isso ele tende a espalhar o laranja pela página, transformar tudo em card e trocar a fonte
por uma serifada — as três coisas que mais rápido fazem a página parecer feita por IA.

---

## Rodando

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de produção
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run format       # prettier + ordenação das classes do Tailwind
```

---

## O que você precisa mexer antes de publicar

Quase tudo da página está em **`lib/content.ts`**. Os pontos que exigem decisão sua estão
marcados no arquivo com `// >>> AJUSTAR`. Em ordem de urgência:

| #   | O quê                                                                                  | Onde                                         |
| --- | -------------------------------------------------------------------------------------- | -------------------------------------------- |
| 1   | **Vídeos das bolas** — `bola-1.mp4` e `bola-2.mp4`, o efeito de holofote depende deles | `public/videos/`, veja o `LEIA-ME.txt` de lá |
| 2   | **Fotos** — retrato e imagem de compartilhamento                                       | `public/images/`, veja o `LEIA-ME.txt` de lá |
| 3   | **Sua história** — o texto atual é rascunho tirado da sua bio                          | `autor.paragrafos`                           |
| 4   | **Nomes dos módulos** — ajuste pro conteúdo real do curso                              | `pilares`                                    |
| 5   | **CNPJ, razão social, e-mail e domínio**                                               | `marca`                                      |
| 6   | **Preço de ancoragem** (o "de R$ ___ por")                                             | `oferta.precoCheio`                          |
| 7   | **Prazo de garantia e tempo de acesso**                                                | `oferta.garantiaDias`, `oferta.acesso`       |

Checkout (`https://pay.kiwify.com.br/y20epeD`) e parcelamento (12x de R$ 30,81) já estão
configurados.

### O holofote do hero

Dois vídeos empilhados: `bola-1.mp4` toca o tempo todo e `bola-2.mp4` só aparece dentro de
um facho circular que segue o cursor. Uma varredura automática roda uma vez ao carregar, pra
quem nunca move o mouse descobrir que o efeito existe.

Enquanto os arquivos não estiverem em `public/videos/`, o hero cai sozinho no desenho de
gradiente + foto — sem espaço vazio e sem erro no console. O código está em
`components/HeroReveal.tsx`; o raio do facho e os véus azuis são as duas coisas que você
pode querer calibrar depois de ver o efeito com o vídeo real.

### Depoimentos

A lista `depoimentos` em `lib/content.ts` está **vazia de propósito**, e a seção só aparece
quando você preencher. Depoimento inventado é propaganda enganosa (CDC, art. 37) e é uma
das causas mais comuns de reprovação de conta no Meta Ads. Coloque só depoimentos reais,
com autorização de uso.

### Páginas legais

`/privacidade` e `/termos` já existem e estão linkadas no rodapé — o Meta costuma exigir
isso para aprovar anúncio. Os textos são um ponto de partida: peça a um advogado que revise
antes de rodar tráfego.

---

## Estrutura

```
app/
  layout.tsx        fontes, metadados, dados estruturados (Course + FAQPage)
  page.tsx          ordem das seções
  globals.css       tokens de cor, tipografia e movimento
  privacidade/ termos/
components/
  Hero, Problema, Autor, Metodo, Publico, Bonus,
  Depoimentos, Oferta, Faq, CtaFinal, Rodape, Nav, Faixa
  art.tsx           silhueta do Rio, sol, ondas, textura de areia (SVG autoral)
  movimento.tsx     parallax, reveal por linha, contador, máscara de imagem
  ui.tsx            botão, rótulo, foto com placeholder, rabisco
lib/content.ts      TODO o texto da página
docs/DESIGN.md      direção de design, reference lock e ledger de decisões
```

---

## Por que a página é assim

A direção visual, os papéis de cada cor e o porquê de cada decisão estão em
[`docs/DESIGN.md`](docs/DESIGN.md). Vale ler antes de mudar cor ou fonte — o laranja, por
exemplo, é reservado para o botão de compra e só para ele. Se ele começar a aparecer como
fundo ou enfeite, o botão perde força e a página converte menos.

---

## Publicando

O jeito mais direto é a Vercel: conecte o repositório e ela detecta o Next.js sozinha.
Depois aponte seu domínio e atualize `marca.dominio` em `lib/content.ts` para os metadados
de compartilhamento saírem certos.

Antes de rodar tráfego, coloque o pixel do Meta e o Google Analytics em `app/layout.tsx`.
