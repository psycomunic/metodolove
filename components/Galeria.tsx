"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMovimentoReduzido } from "./movimento";
import { Foto } from "./ui";

/**
 * Carrossel de fotos.
 *
 * Mesma mecânica do carrossel de depoimentos, e de propósito: rolagem nativa
 * com `scroll-snap`, sem biblioteca nenhuma. O arraste no celular vem de
 * graça, funciona com teclado e leitor de tela, e não custa um KB numa página
 * que precisa de Lighthouse alto no 4G.
 *
 * TODA FOTO NA COR REAL. Sem duotone, sem véu, sem filtro: é invariante da
 * página, e o cliente já reprovou a direção contrária. O que a peça faz é
 * enquadrar, nunca tingir.
 *
 * AS FOTOS VÊM EM ORIENTAÇÕES MISTURADAS, retrato e paisagem no mesmo acervo.
 * Por isso cada slide é uma caixa de proporção fixa com `cover`: sem ela a
 * fita ficaria com alturas diferentes e o scroll-snap pararia em lugares
 * desalinhados. Quem escolhe a proporção é a seção que hospeda, porque numa
 * coluna estreita o retrato serve e numa faixa larga a paisagem serve.
 */

export type FotoGaleria = {
  src: string;
  alt: string;
};

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

export default function Galeria({
  fotos,
  aspecto,
  largura,
  anterior,
  proximo,
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
  className?: string;
  /** Só para galeria acima da dobra. Abaixo dela, carga preguiçosa. */
  prioridade?: boolean;
}) {
  const fita = useRef<HTMLUListElement>(null);
  const reduzido = useMovimentoReduzido();
  const [temAntes, setTemAntes] = useState(false);
  const [temDepois, setTemDepois] = useState(false);

  /* As setas apagam nas pontas: seta que não leva a lugar nenhum é a forma
     mais rápida de a pessoa achar que a página travou. */
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
    /* Medir o primeiro filho em vez de chutar um número mantém o passo certo
       em qualquer largura de slide. */
    const slide = el.firstElementChild as HTMLElement | null;
    const passo = slide ? slide.offsetWidth + 16 : el.clientWidth * 0.8;
    /* `scroll-behavior: smooth` do CSS não alcança o scrollBy programático:
       quem pediu menos movimento no sistema precisa do salto seco aqui. */
    el.scrollBy({ left: passo * direcao, behavior: reduzido ? "instant" : "smooth" });
  };

  if (fotos.length === 0) return null;

  return (
    <div className={className}>
      <ul
        ref={fita}
        className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {fotos.map((foto, i) => (
          <li key={foto.src} className={`${largura} shrink-0 snap-start`}>
            <div
              className={`${aspecto} w-full overflow-hidden rounded-2xl border border-line bg-card`}
            >
              <Foto
                src={foto.src}
                alt={foto.alt}
                desbota={false}
                prioridade={prioridade && i === 0}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Setas são conforto de desktop. No celular o dedo arrasta, e uma seta
          ali só rouba espaço da foto. */}
      {fotos.length > 1 ? (
        <div className="mt-5 hidden justify-end gap-3 sm:flex">
          <Seta
            sentido="anterior"
            rotulo={anterior}
            ativa={temAntes}
            aoClicar={() => empurra(-1)}
          />
          <Seta
            sentido="proximo"
            rotulo={proximo}
            ativa={temDepois}
            aoClicar={() => empurra(1)}
          />
        </div>
      ) : null}
    </div>
  );
}
