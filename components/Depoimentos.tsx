"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { depoimentos, depoimentosSecao, type Depoimento } from "@/lib/content";
import { Reveal, useMovimentoReduzido } from "./movimento";
import { Manchete, Olho } from "./ui";

/**
 * Carrossel de depoimentos em vídeo.
 *
 * A SEÇÃO SOME QUANDO NÃO HÁ DEPOIMENTO. Não é degradação, é o estado
 * correto: hoje `depoimentos` em lib/content.ts está vazio de propósito, e a
 * barra de urgência do topo vende exatamente essa ausência ("quando entrarem
 * os depoimentos, o preço sobe"). Uma fita de cards vazios, ou com nome
 * inventado "só para visualizar", desmentiria a barra na mesma tela e
 * derrubaria o único argumento que essa página tem de diferente.
 *
 * ROLAGEM NATIVA, sem biblioteca. `overflow-x` com `scroll-snap` no CSS faz o
 * arrasto no celular de graça, funciona com teclado e com leitor de tela, e
 * não custa nem um KB de JavaScript numa página que precisa de Lighthouse
 * alto no 4G. As setas só empurram o mesmo `scrollBy`.
 *
 * UM VÍDEO POR VEZ. Ao dar play num card, o card que estava tocando pausa:
 * dois professores falando juntos não é depoimento, é barulho.
 *
 * Vertical (9:16) porque é como o professor grava no celular, e `preload`
 * fica em "none": o vídeo só baixa quando alguém escolhe assistir.
 */

/**
 * Um card.
 *
 * Quem está tocando é UM estado só, no carrossel, e o card lê dele. Guardar
 * um `tocando` local aqui dentro obrigaria a sincronizar os dois com um
 * setState dentro de effect: renderização em cascata, e o lint reprova com
 * razão. `ativo` já é a resposta inteira.
 */
function CardDepoimento({
  item,
  ativo,
  aoTocar,
  aoParar,
}: {
  item: Depoimento & { video: NonNullable<Depoimento["video"]> };
  ativo: boolean;
  aoTocar: () => void;
  aoParar: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  /* Quando outro card assume o play, este para de verdade, não só no rótulo.
     Só DOM aqui, nenhum setState: o pause dispara `onPause`, que devolve o
     estado ao carrossel pelo caminho normal. */
  useEffect(() => {
    if (ativo) return;
    const v = ref.current;
    if (v && !v.paused) v.pause();
  }, [ativo]);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    aoTocar();
    v.play().catch(aoParar);
  };

  return (
    <li className="w-[78vw] max-w-[19rem] shrink-0 snap-start sm:w-[17rem] lg:w-[19rem]">
      <figure className="card flex h-full flex-col overflow-hidden p-0">
        <div className="relative aspect-[9/16] w-full bg-void">
          <video
            ref={ref}
            src={item.video.src}
            poster={item.video.poster}
            preload="none"
            playsInline
            controls={ativo}
            onPause={aoParar}
            onEnded={aoParar}
            className="h-full w-full object-cover"
          />
          {!ativo ? (
            <button
              type="button"
              onClick={play}
              aria-label={`Assistir o depoimento de ${item.nome}`}
              className="group absolute inset-0 flex items-center justify-center bg-void/30 transition-colors hover:bg-void/10"
            >
              {/* Azul, nunca verde: verde na página é só o botão de compra. */}
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-void transition-transform duration-300 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-6 w-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          ) : null}
        </div>

        <figcaption className="flex flex-col gap-2 p-5">
          <p className="text-[0.95rem] leading-[1.55] text-ink">{item.texto}</p>
          <p className="mono text-[0.8125rem] text-mute sm:text-[0.68rem]">
            {item.nome} · {item.local} · {item.tempo}
          </p>
        </figcaption>
      </figure>
    </li>
  );
}

/**
 * Um quadro da fita enquanto não há depoimento nenhum.
 *
 * Tracejado e sem play, igual ao placeholder da `Foto` em ui.tsx e ao do
 * vídeo do método: a página inteira usa esse mesmo desenho para dizer "a
 * mídia ainda não existe", e quem lê é o cliente.
 *
 * Sem nome, sem aspa, sem rosto, sem play que não toca. O quadro é vazio de
 * verdade, porque é isso que ele está dizendo.
 */
function QuadroVazio({ n }: { n: number }) {
  return (
    <li
      aria-hidden="true"
      className="w-[78vw] max-w-[19rem] shrink-0 snap-start sm:w-[17rem] lg:w-[19rem]"
    >
      <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-dashed border-line-forte bg-card p-6">
        <div className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-4 text-center">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-mute"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="7" y="3" width="10" height="18" rx="2.5" />
            <path d="M10.8 10.2v3.6l3.2-1.8z" />
          </svg>
          <p className="max-w-[15rem] text-[0.82rem] leading-snug font-semibold text-ink">
            {depoimentosSecao.vazio.arte}
          </p>
        </div>
        <code className="mono self-center bg-void/70 px-2 py-1 text-[0.62rem] tracking-tight text-mute">
          TODO asset · depoimento-{n}-web.mp4
        </code>
      </div>
    </li>
  );
}

function Seta({
  sentido,
  rotulo,
  ativa,
  aoClicar,
}: {
  sentido: "anterior" | "proximo";
  rotulo: string;
  ativa: boolean;
  aoClicar: () => void;
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      disabled={!ativa}
      aria-label={rotulo}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line-forte text-ink transition-colors duration-300 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 ${sentido === "anterior" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h13M12 5.5 18.5 12 12 18.5" />
      </svg>
    </button>
  );
}

export default function Depoimentos() {
  /* Só vídeo entra na fita. Um card de texto no meio de vídeos lê como o
     vídeo que não carregou. */
  const itens = depoimentos.filter(
    (d): d is Depoimento & { video: NonNullable<Depoimento["video"]> } =>
      Boolean(d.video),
  );

  const fita = useRef<HTMLUListElement>(null);
  const reduzido = useMovimentoReduzido();
  const [tocandoId, setTocandoId] = useState<string | null>(null);
  const [temAntes, setTemAntes] = useState(false);
  const [temDepois, setTemDepois] = useState(false);

  /**
   * Parar é POR ID, nunca um `null` seco.
   *
   * Quando alguém dá play no card B, o card A é pausado, e esse pause dispara
   * o `onPause` de A. Um `setTocandoId(null)` ali limparia o play de B, que
   * acabou de começar: o vídeo tocaria com o botão de play por cima. Só quem
   * ainda é o dono do estado pode soltá-lo.
   */
  const parar = useCallback((id: string) => {
    setTocandoId((atual) => (atual === id ? null : atual));
  }, []);

  /* As setas apagam nas pontas. Uma seta que não leva a lugar nenhum é a
     forma mais rápida de a pessoa achar que a página travou. */
  const medir = useCallback(() => {
    const el = fita.current;
    if (!el) return;
    const fim = el.scrollWidth - el.clientWidth;
    setTemAntes(el.scrollLeft > 8);
    setTemDepois(el.scrollLeft < fim - 8);
  }, []);

  useEffect(() => {
    const el = fita.current;
    if (!el) return;
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [medir]);

  const empurra = (direcao: 1 | -1) => {
    const el = fita.current;
    if (!el) return;
    /* Um card mais o vão. Medir o primeiro filho em vez de chutar um número
       mantém o passo certo nas três larguras de card. */
    const card = el.firstElementChild as HTMLElement | null;
    const passo = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    /* `scroll-behavior: smooth` do CSS não alcança o scrollBy programático:
       quem pediu menos movimento no sistema precisa do salto seco aqui. */
    el.scrollBy({ left: passo * direcao, behavior: reduzido ? "instant" : "smooth" });
  };

  /* Sem depoimento, a fita mostra QUADROS VAZIOS, não some. A seção some
     seria mais discreta, mas some também a resposta para "cadê os
     depoimentos?", e o vazio aqui é argumento, não falha: é a mesma coisa
     que a barra de urgência do topo diz para justificar o preço. */
  const vazia = itens.length === 0;
  const copy = vazia ? depoimentosSecao.vazio : depoimentosSecao;

  return (
    <section
      id="depoimentos"
      className="border-t border-fio-areia px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[80rem]">
        <header className="text-center sm:max-w-[46rem] sm:text-left">
          <Reveal>
            <Olho>{copy.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={copy.linhas}
            destaque={copy.linhaDestaque}
            fim={copy.linhasFim}
            umaLinha
            className="mt-5 text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />
          <Reveal atraso={140}>
            <p className="mx-auto mt-6 max-w-[38rem] text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-7">
              {copy.texto}
            </p>
          </Reveal>
        </header>

        <Reveal atraso={200}>
          <div className="mt-10 sm:mt-14">
            {/* `-mx-5` e o padding de volta: a fita sangra até a borda da tela
                no celular, senão o card seguinte fica escondido e ninguém
                descobre que dá para arrastar. */}
            <ul
              ref={fita}
              className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {vazia
                ? Array.from({ length: depoimentosSecao.vazio.quadros }, (_, i) => (
                    <QuadroVazio key={i} n={i + 1} />
                  ))
                : itens.map((item) => {
                    const id = `${item.nome}-${item.video.src}`;
                    return (
                      <CardDepoimento
                        key={id}
                        item={item}
                        ativo={tocandoId === id}
                        aoTocar={() => setTocandoId(id)}
                        aoParar={() => parar(id)}
                      />
                    );
                  })}
            </ul>

            {/* As setas são conforto de desktop. No celular o dedo arrasta, e
                uma seta ali só rouba espaço do card. */}
            {!vazia && itens.length > 1 ? (
              <div className="mt-6 hidden justify-end gap-3 sm:flex">
                <Seta
                  sentido="anterior"
                  rotulo={depoimentosSecao.anterior}
                  ativa={temAntes}
                  aoClicar={() => empurra(-1)}
                />
                <Seta
                  sentido="proximo"
                  rotulo={depoimentosSecao.proximo}
                  ativa={temDepois}
                  aoClicar={() => empurra(1)}
                />
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
