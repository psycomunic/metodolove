"use client";

import { useRef, useState } from "react";
import { mecanismo } from "@/lib/content";

/**
 * Vídeo do método, ao lado da manchete do mecanismo.
 *
 * Antes do play é um quadro (poster) com o botão. Só ao clicar o vídeo
 * carrega e toca com som: não é fundo, é conteúdo, e conteúdo a pessoa
 * escolhe assistir. `preload="none"` para não pesar a página.
 */
export default function VideoMetodo({ className = "" }: { className?: string }) {
  const { video } = mecanismo;
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setTocando(true);
    v.play().catch(() => setTocando(false));
  };

  return (
    <div
      className={`relative mx-auto aspect-video w-full max-w-[40rem] overflow-hidden rounded-2xl border border-line bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] lg:max-w-none ${className}`}
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        preload="none"
        playsInline
        controls={tocando}
        onEnded={() => setTocando(false)}
        className="h-full w-full object-cover"
      />
      {!tocando ? (
        <button
          type="button"
          onClick={play}
          aria-label={`Assistir: ${video.legenda}`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-void/35 text-ink transition-colors hover:bg-void/20"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-verde text-void shadow-[0_0_40px_rgba(34,197,94,0.45)] transition-transform group-hover:scale-105">
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
