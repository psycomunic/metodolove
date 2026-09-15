"use client";

import { useEffect, useRef, useState } from "react";
import { mecanismo } from "@/lib/content";

/**
 * Vídeo do método, ao lado da manchete do mecanismo.
 *
 * O VÍDEO É VERTICAL (um Short do YouTube), e a seção é de duas colunas. Daí
 * as duas formas:
 *
 * · Celular: o cartão é 9:16, do tamanho do vídeo, e o play acontece ALI
 *   mesmo. Abrir modal num aparelho onde o cartão já ocupa a tela inteira
 *   seria trocar seis por meia dúzia.
 * · Desktop: o cartão é 16:9, para caber ao lado da manchete sem espremer o
 *   texto, e o play abre em MODAL. Um 9:16 dentro de um 16:9 daria uma tira
 *   de 190px de largura no meio de um cartão de 600px; no modal ele usa a
 *   altura da janela e fica grande de verdade.
 *
 * NADA DO YOUTUBE ANTES DO CLIQUE. O cartão é uma FACHADA: capa própria,
 * servida daqui, mais o botão. O iframe só é criado quando alguém clica.
 * Isso vale ~1 MB de script de terceiro e os cookies que o player planta só
 * por existir na página, num site que precisa de Lighthouse alto no 4G. A
 * capa é um quadro do próprio vídeo, guardado em public/, então nem a
 * miniatura vai buscar nada no Google.
 *
 * DEPOIS do clique, o que dá para conter foi contido: domínio
 * `youtube-nocookie`, `rel=0` para as sugestões do fim ficarem no mesmo
 * canal, `modestbranding` e `color=white`. O logo do YouTube no canto da
 * barra de controle NÃO tem como sair: é condição de uso do embed. Quem quer
 * player sem marca nenhuma precisa hospedar o arquivo.
 *
 * O botão é AZUL, não verde: verde na página é só o botão de compra
 * (invariante 1). Um play verde disputaria o ponto mais quente da tela com o
 * checkout e levaria o clique para o lugar errado.
 */

/** Abaixo de lg o play é no próprio cartão; de lg para cima, em modal. */
function useEhCelular() {
  const [movel, setMovel] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const aplica = () => setMovel(mq.matches);
    aplica();
    mq.addEventListener("change", aplica);
    return () => mq.removeEventListener("change", aplica);
  }, []);
  return movel;
}

function Player({ src, titulo }: { src: string; titulo: string }) {
  return (
    <iframe
      src={src}
      title={titulo}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="h-full w-full border-0"
    />
  );
}

export default function VideoMetodo({ className = "" }: { className?: string }) {
  const { video } = mecanismo;
  const celular = useEhCelular();
  const [tocando, setTocando] = useState(false);
  const fechar = useRef<HTMLButtonElement>(null);

  const emModal = tocando && !celular;

  useEffect(() => {
    if (!emModal) return;
    fechar.current?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTocando(false);
    };
    window.addEventListener("keydown", tecla);
    /* Trava a rolagem do fundo: sem isso a página corre atrás do vídeo aberto
       e, ao fechar, a pessoa não está mais onde estava. */
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = antes;
    };
  }, [emModal]);

  const moldura = `relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl bg-card aspect-[9/16] lg:aspect-video lg:max-w-none ${className}`;

  /* Sem vídeo configurado, a peça cai no placeholder honesto, igual à `Foto`
     de ui.tsx: um play que não toca é pior do que assumir que o vídeo não
     está pronto. A pessoa clica, não acontece nada, e a página perde a
     confiança que ela precisa ter para chegar no botão de compra. */
  if (!video.youtubeId) {
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
      </div>
    );
  }

  const src = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&color=white`;

  return (
    <>
      <div
        className={`${moldura} border border-line shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]`}
      >
        {tocando && celular ? (
          <Player src={src} titulo={video.legenda} />
        ) : (
          <button
            type="button"
            onClick={() => setTocando(true)}
            aria-label={`Assistir: ${video.legenda}`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            {/* A capa é uma imagem de verdade, não fundo de CSS, para o
                navegador poder priorizá-la e para o `alt` existir. Duas
                versões: a vertical é o quadro cheio, a horizontal é o mesmo
                quadro centrado sobre ele mesmo desfocado, que é como Short
                aparece em tela larga sem tarja preta. */}
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={video.capaHorizontal}
                width={1280}
                height={720}
              />
              <img
                src={video.capaVertical}
                alt=""
                width={720}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
            <span className="absolute inset-0 bg-void/35 transition-colors duration-300 group-hover:bg-void/20" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-void shadow-[0_0_40px_rgba(79,163,255,0.45)] transition-transform duration-300 group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-8 w-8"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="mono relative max-w-[16rem] text-[0.7rem] tracking-[0.12em] text-ink/85 uppercase">
              {video.legenda}
            </span>
          </button>
        )}
      </div>

      {emModal ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={video.legenda}
          onClick={() => setTocando(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            ref={fechar}
            type="button"
            onClick={() => setTocando(false)}
            aria-label={video.fechar}
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-line-forte text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
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

          {/* O modal respeita a forma do vídeo: 9:16 dimensionado pela ALTURA
              da janela, e não pela largura. Pela largura ele estouraria para
              fora da tela numa janela baixa. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="aspect-[9/16] h-[86vh] max-h-[86vh] w-auto max-w-full overflow-hidden rounded-2xl border border-line bg-void"
          >
            <Player src={src} titulo={video.legenda} />
          </div>
        </div>
      ) : null}
    </>
  );
}
