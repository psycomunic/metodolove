"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMovimentoReduzido } from "./movimento";
import { Foto } from "./ui";

/**
 * Carrossel de fotos, com passagem automática e foto ampliada no clique.
 *
 * Mesma mecânica de rolagem do carrossel de depoimentos, e de propósito:
 * `overflow-x` com `scroll-snap` no CSS, sem biblioteca nenhuma. O arraste no
 * celular vem de graça, funciona com teclado e leitor de tela, e não custa um
 * KB numa página que precisa de Lighthouse alto no 4G. O automático e as
 * setas só empurram o mesmo `scrollBy` que o dedo já empurrava.
 *
 * TODA FOTO NA COR REAL. Sem duotone, sem véu, sem filtro: é invariante da
 * página, e o cliente já reprovou a direção contrária. A peça enquadra, nunca
 * tinge.
 *
 * AS FOTOS VÊM EM ORIENTAÇÕES MISTURADAS, retrato e paisagem no mesmo acervo.
 * Por isso cada slide é caixa de proporção fixa com `cover`: sem ela a fita
 * ficaria com alturas diferentes e o snap pararia desalinhado. Quem escolhe a
 * proporção é a seção que hospeda. Ampliada, a foto aparece INTEIRA, com
 * `contain`: o recorte é da fita, nunca da imagem.
 *
 * O AUTOMÁTICO CEDE A VEZ. Ele para enquanto o ponteiro está em cima, enquanto
 * a foto ampliada está aberta, enquanto a aba está em segundo plano, e por
 * oito segundos depois de qualquer toque, arraste ou foco de teclado.
 * Carrossel que continua andando embaixo do dedo da pessoa é o jeito mais
 * rápido de ela desistir de olhar. Com `prefers-reduced-motion` ele não anda:
 * a fita fica inteira no controle de quem lê.
 *
 * O estado de pausa mora em ref, não em state, porque muda a cada passagem de
 * mouse e nada na tela depende dele: em state, cada movimento do ponteiro
 * custaria uma renderização da fita inteira.
 */

const INTERVALO = 4500;
const ESPERA_APOS_TOQUE = 8000;

export type FotoGaleria = {
  src: string;
  alt: string;
};

function Seta({
  sentido,
  rotulo,
  ativa,
  aoClicar,
  className = "",
}: {
  sentido: "anterior" | "proximo";
  rotulo: string;
  ativa: boolean;
  aoClicar: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      disabled={!ativa}
      aria-label={rotulo}
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-line-forte text-ink transition-colors duration-300 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 ${className}`}
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

/**
 * A foto ampliada.
 *
 * `role="dialog"` com `aria-modal`, Escape fecha, as setas do teclado andam e
 * o clique no fundo fecha. O botão de fechar recebe o foco ao abrir: sem
 * isso, quem usa teclado abriria a foto e continuaria com o foco lá atrás, na
 * fita, sem alcançar nada do que está na tela.
 */
function Ampliada({
  fotos,
  indice,
  aoFechar,
  aoAndar,
  rotulos,
}: {
  fotos: readonly FotoGaleria[];
  indice: number;
  aoFechar: () => void;
  aoAndar: (passo: 1 | -1) => void;
  rotulos: { fechar: string; anterior: string; proximo: string };
}) {
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fechar.current?.focus();
  }, []);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
      if (e.key === "ArrowRight") aoAndar(1);
      if (e.key === "ArrowLeft") aoAndar(-1);
    };
    window.addEventListener("keydown", tecla);
    /* Trava a rolagem do fundo: sem isso a página corre atrás da foto aberta
       e, ao fechar, a pessoa não está mais onde estava. */
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = antes;
    };
  }, [aoFechar, aoAndar]);

  const foto = fotos[indice];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={foto.alt}
      onClick={aoFechar}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={fechar}
        type="button"
        onClick={aoFechar}
        aria-label={rotulos.fechar}
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-line-forte text-ink transition-colors duration-300 hover:border-accent hover:text-accent sm:top-6 sm:right-6"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* O clique no fundo fecha; o clique na foto, não. */}
      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-[68rem] flex-col items-center gap-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={foto.src}
          alt={foto.alt}
          className="max-h-[74vh] w-auto max-w-full rounded-2xl border border-line object-contain"
        />
        {/* Legenda em caixa NORMAL, e nao na classe .mono: mono na pagina e
            caixa alta com tracking, e uma frase inteira assim vira grito.
            Label serve, descricao de foto nao. */}
        <figcaption className="max-w-[46rem] text-center text-[0.92rem] leading-relaxed text-mute">
          {foto.alt}
        </figcaption>
      </figure>

      {fotos.length > 1 ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-0 bottom-5 flex justify-center gap-3 sm:bottom-8"
        >
          <Seta
            sentido="anterior"
            rotulo={rotulos.anterior}
            ativa
            aoClicar={() => aoAndar(-1)}
            className="bg-void/80"
          />
          <Seta
            sentido="proximo"
            rotulo={rotulos.proximo}
            ativa
            aoClicar={() => aoAndar(1)}
            className="bg-void/80"
          />
        </div>
      ) : null}
    </div>
  );
}

export default function Galeria({
  fotos,
  aspecto,
  largura,
  anterior,
  proximo,
  ampliar,
  fechar,
  className = "",
  prioridade = false,
}: {
  fotos: readonly FotoGaleria[];
  /** Proporção de cada slide, ex. "aspect-[3/4]". Quem hospeda decide. */
  aspecto: string;
  /** Largura de cada slide. Uma foto por vez, ou fita com várias. */
  largura: string;
  anterior: string;
  proximo: string;
  /** Começo do rótulo do botão que abre a foto. A descrição dela entra no fim. */
  ampliar: string;
  fechar: string;
  className?: string;
  /** Só para galeria acima da dobra. Abaixo dela, carga preguiçosa. */
  prioridade?: boolean;
}) {
  const fita = useRef<HTMLUListElement>(null);
  const reduzido = useMovimentoReduzido();
  const [temAntes, setTemAntes] = useState(false);
  const [aberta, setAberta] = useState<number | null>(null);

  const pausa = useRef(false);
  const retomaEm = useRef(0);
  const marcaInteracao = () => {
    retomaEm.current = Date.now() + ESPERA_APOS_TOQUE;
  };

  /* Só a seta de VOLTAR apaga, e só no começo da fita: dali ela não leva a
     lugar nenhum, e seta morta é a forma mais rápida de a pessoa achar que a
     página travou. A de avançar nunca apaga, porque na ponta ela volta ao
     começo em vez de morrer. */
  const medir = useCallback(() => {
    const el = fita.current;
    if (!el) return;
    setTemAntes(el.scrollLeft > 8);
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

  const empurra = useCallback(
    (direcao: 1 | -1) => {
      const el = fita.current;
      if (!el) return;
      /* Medir o primeiro filho em vez de chutar um número mantém o passo
         certo em qualquer largura de slide. */
      const slide = el.firstElementChild as HTMLElement | null;
      const passo = slide ? slide.offsetWidth + 16 : el.clientWidth * 0.8;
      const suave = reduzido ? ("instant" as const) : ("smooth" as const);
      const fim = el.scrollWidth - el.clientWidth;

      /* Na ponta, indo para a frente, volta ao começo: a fita em movimento
         não pode parar sozinha no fim e parecer travada. */
      if (direcao === 1 && el.scrollLeft >= fim - 8) {
        el.scrollTo({ left: 0, behavior: suave });
        return;
      }
      el.scrollBy({ left: passo * direcao, behavior: suave });
    },
    [reduzido],
  );

  /* Passagem automática. Só DOM aqui dentro, nenhum setState: o `scrollBy`
     dispara o evento `scroll`, e é ele que atualiza as setas, pelo caminho
     normal. */
  useEffect(() => {
    if (reduzido || fotos.length < 2 || aberta !== null) return;

    const id = setInterval(() => {
      if (pausa.current) return;
      if (Date.now() < retomaEm.current) return;
      if (document.visibilityState !== "visible") return;
      empurra(1);
    }, INTERVALO);

    return () => clearInterval(id);
  }, [reduzido, fotos.length, aberta, empurra]);

  const andaAmpliada = useCallback(
    (passo: 1 | -1) => {
      setAberta((i) => (i === null ? i : (i + passo + fotos.length) % fotos.length));
    },
    [fotos.length],
  );

  const fechaAmpliada = useCallback(() => setAberta(null), []);

  if (fotos.length === 0) return null;

  return (
    <div className={className}>
      <ul
        ref={fita}
        onPointerEnter={() => {
          pausa.current = true;
        }}
        onPointerLeave={() => {
          pausa.current = false;
        }}
        onPointerDown={marcaInteracao}
        onFocusCapture={marcaInteracao}
        className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {fotos.map((foto, i) => (
          <li key={foto.src} className={`${largura} shrink-0 snap-start`}>
            <button
              type="button"
              onClick={() => setAberta(i)}
              aria-label={`${ampliar} ${foto.alt}`}
              className={`${aspecto} group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-300 hover:border-accent`}
            >
              <Foto
                src={foto.src}
                alt={foto.alt}
                desbota={false}
                prioridade={prioridade && i === 0}
              />
              {/* A lupa aparece no hover e no foco de teclado. Ela existe para
                  dizer que a foto abre: sem ela ninguém descobre que dá para
                  clicar, e o clique vira função escondida. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-void/80 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M15.8 15.8 20 20M11 8.6v4.8M8.6 11h4.8" />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Setas são conforto de desktop. No celular o dedo arrasta, e uma seta
          ali só rouba espaço da foto. A de avançar nunca apaga, porque na
          ponta ela volta ao começo em vez de morrer. */}
      {fotos.length > 1 ? (
        <div className="mt-5 hidden justify-end gap-3 sm:flex">
          <Seta
            sentido="anterior"
            rotulo={anterior}
            ativa={temAntes}
            aoClicar={() => {
              marcaInteracao();
              empurra(-1);
            }}
          />
          <Seta
            sentido="proximo"
            rotulo={proximo}
            ativa
            aoClicar={() => {
              marcaInteracao();
              empurra(1);
            }}
          />
        </div>
      ) : null}

      {aberta !== null ? (
        <Ampliada
          fotos={fotos}
          indice={aberta}
          aoFechar={fechaAmpliada}
          aoAndar={andaAmpliada}
          rotulos={{ fechar, anterior, proximo }}
        />
      ) : null}
    </div>
  );
}
