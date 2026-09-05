"use client";

import { useRef, useState } from "react";
import { mecanismo } from "@/lib/content";

/**
 * Vídeo do método, ao lado da manchete do mecanismo.
 *
 * Antes do play é um quadro (poster) com o botão. Só ao clicar o vídeo
 * carrega e toca com som: não é fundo, é conteúdo, e conteúdo a pessoa
 * escolhe assistir. `preload="none"` para não pesar a página.
 *
 * O arquivo ainda não existe. Sem `src` em `lib/content.ts` a peça cai no
 * placeholder honesto com a direção de arte escrita, igual à `Foto` de
 * ui.tsx: um play que não toca é pior do que assumir que o vídeo não está
 * pronto, porque a pessoa clica, não acontece nada e a página perde a
 * confiança que ela precisa ter para chegar no botão de compra. O `onError`
 * é a mesma queda para o caso do nome do arquivo vir errado.
 *
 * O botão é AZUL, não verde: verde na página é só o botão de compra
 * (invariante 1 do AGENTS.md). Um play verde disputaria o ponto mais quente
 * da tela com o checkout e levaria o clique para o lugar errado.
 */
export default function VideoMetodo({ className = "" }: { className?: string }) {
  const { video } = mecanismo;
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const [falhou, setFalhou] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setTocando(true);
    v.play().catch(() => setTocando(false));
  };

  const moldura = `relative mx-auto aspect-video w-full max-w-[40rem] overflow-hidden rounded-2xl bg-card lg:max-w-none ${className}`;

  if (!video.src || falhou) {
    return (
      <div
        className={`${moldura} flex flex-col items-center justify-center gap-4 border border-dashed border-line-forte p-6 text-center`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 text-mute"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M10.5 9.5l4.2 2.5-4.2 2.5z" />
        </svg>
        <p className="max-w-[24rem] text-[0.82rem] leading-snug font-semibold text-ink">
          {video.arte}
        </p>
        <code className="mono bg-void/70 px-2 py-1 text-[0.62rem] tracking-tight text-mute">
          TODO asset · public/videos/metodo-web.mp4
        </code>
      </div>
    );
  }

  return (
    <div
      className={`${moldura} border border-line shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]`}
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        preload="none"
        playsInline
        controls={tocando}
        onEnded={() => setTocando(false)}
        onError={() => setFalhou(true)}
        className="h-full w-full object-cover"
      />
      {!tocando ? (
        <button
          type="button"
          onClick={play}
          aria-label={`Assistir: ${video.legenda}`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-void/35 text-ink transition-colors hover:bg-void/20"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-void shadow-[0_0_40px_rgba(79,163,255,0.45)] transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-8 w-8"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="mono text-[0.7rem] tracking-[0.12em] text-ink/85 uppercase">
            {video.legenda}
          </span>
        </button>
      ) : null}
    </div>
  );
}
