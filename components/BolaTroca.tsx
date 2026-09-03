"use client";

import { useEffect, useRef, useState } from "react";
import { useMovimentoReduzido } from "./movimento";

/**
 * A bola do Método girando; ao passar o mouse, ela vira a bola de dinheiro.
 *
 * A troca não é enfeite: é a promessa do produto em uma imagem. A bola azul é
 * o esporte, a de dinheiro é o esporte virando profissão, que é exatamente o
 * que a manchete ao lado diz.
 *
 * Os dois vídeos vêm com fundo branco, e é por isso que o disco existe: a cor
 * dele é a MESMA do fundo dos arquivos (#FAFAF8, amostrada), então a máscara
 * circular não deixa emenda. Não tente remover o branco por blend mode —
 * multiply escurece a bola azul e darken come a de dinheiro.
 *
 * Em toque não há hover, então o toque alterna. E o `title` mais o botão real
 * dão a mesma troca por teclado.
 */
export default function BolaTroca({ className = "" }: { className?: string }) {
  const [dinheiro, setDinheiro] = useState(false);
  const reduzido = useMovimentoReduzido();
  const azulRef = useRef<HTMLVideoElement>(null);
  const verdeRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vs = [azulRef.current, verdeRef.current];
    for (const v of vs) {
      if (!v) continue;
      if (reduzido) v.pause();
      else void v.play().catch(() => {});
    }
  }, [reduzido]);

  return (
    <button
      type="button"
      aria-pressed={dinheiro}
      aria-label={
        dinheiro
          ? "Bola de dinheiro. Toque para voltar à bola do Método"
          : "Bola do Método girando. Toque para ver a bola de dinheiro"
      }
      onPointerEnter={() => setDinheiro(true)}
      onPointerLeave={() => setDinheiro(false)}
      onFocus={() => setDinheiro(true)}
      onBlur={() => setDinheiro(false)}
      onClick={() => setDinheiro((d) => !d)}
      className={`group relative aspect-square overflow-hidden rounded-full bg-[#FAFAF8] outline-offset-4 focus-visible:outline-3 focus-visible:outline-sol-500 ${className}`}
    >
      <video
        ref={azulRef}
        src="/videos/bola-1-web.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover"
      />
      <video
        ref={verdeRef}
        src="/videos/bola-2-web.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full scale-110 object-cover ${
          reduzido ? "" : "transition-opacity duration-500 ease-out"
        } ${dinheiro ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  );
}
