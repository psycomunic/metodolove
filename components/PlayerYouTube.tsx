"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Player de YouTube sem a moldura do YouTube.
 *
 * O PROBLEMA. O embed padrão desenha o título e o nome do canal no topo e o
 * logo "Shorts" na base, e isso não sai por parâmetro nenhum: `showinfo` foi
 * removido pelo Google em 2018 e `modestbranding` foi descontinuado. Testei
 * as combinações no navegador, e a única que apaga a moldura é `controls=0`,
 * que leva junto a barra de tempo.
 *
 * A SAÍDA, em duas partes.
 *
 * 1. RECORTE. O iframe é 40% mais alto que a janela e sobe 20%, então as
 *    faixas onde a moldura é desenhada ficam fora do quadro. Não se perde
 *    imagem: nessa proporção o player encaixa o vídeo 9:16 pela LARGURA e
 *    sobra tarja preta em cima e embaixo, exatamente 20% de cada lado. O que
 *    o recorte corta é a tarja; o vídeo ocupa a janela inteira.
 *
 *    A conta precisa fechar: altura interna de 140% com topo em -20%. Mexer
 *    num número sem mexer no outro passa a cortar vídeo de verdade.
 *
 * 2. CONTROLES PRÓPRIOS. Com `controls=0` a barra do YouTube some, então o
 *    play e o tempo são desenhados aqui, com a IFrame Player API servindo só
 *    para ler o relógio e mandar tocar ou pausar.
 *
 * A API é carregada NO CLIQUE, nunca antes: quem monta esta peça já mostra
 * uma capa própria, e a página não toca em servidor do Google enquanto
 * ninguém pedir o vídeo.
 */

type Player = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (s: number, allow: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy?: () => void;
};

type YTGlobal = {
  Player: new (el: HTMLElement, opcoes: unknown) => Player;
  PlayerState: { PLAYING: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/** Carrega a IFrame API uma única vez por página, mesmo com vários players. */
let carregando: Promise<YTGlobal> | null = null;
function carregaAPI(): Promise<YTGlobal> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (carregando) return carregando;
  carregando = new Promise<YTGlobal>((ok) => {
    const anterior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      anterior?.();
      ok(window.YT as YTGlobal);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  });
  return carregando;
}

/** 63 vira "1:03", o mesmo formato que o player do YouTube usava. */
function relogio(s: number) {
  const seg = Number.isFinite(s) && s > 0 ? s : 0;
  return `${Math.floor(seg / 60)}:${String(Math.floor(seg % 60)).padStart(2, "0")}`;
}

export default function PlayerYouTube({
  videoId,
  titulo,
  rotuloPlay,
  rotuloPausa,
}: {
  videoId: string;
  titulo: string;
  rotuloPlay: string;
  rotuloPausa: string;
}) {
  const alvo = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const [tocando, setTocando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    let vivo = true;
    let relogioId: number | undefined;

    carregaAPI().then((YT) => {
      if (!vivo || !alvo.current) return;

      player.current = new YT.Player(alvo.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: { target: Player }) => {
            if (!vivo) return;
            setDuracao(e.target.getDuration());
            e.target.playVideo();
          },
          onStateChange: (e: { data: number; target: Player }) => {
            if (!vivo) return;
            setTocando(e.data === YT.PlayerState.PLAYING);
            if (e.data === YT.PlayerState.ENDED) setTempo(e.target.getDuration());
          },
        },
      });

      /* Relógio de quatro batidas por segundo. A API avisa mudança de
         estado, não a passagem do tempo, então a barra precisa perguntar. */
      relogioId = window.setInterval(() => {
        const p = player.current;
        if (!p?.getCurrentTime) return;
        setTempo(p.getCurrentTime());
        setDuracao((d) => d || p.getDuration());
      }, 250);
    });

    /* REDE DE SEGURANÇA. Este player depende de um script de terceiro, e
       script de terceiro falha: bloqueador, rede ruim, mudança na API. Se em
       7 segundos ele não tiver ficado pronto, a peça cai no embed simples,
       que traz a moldura do YouTube de volta mas TOCA. Vídeo com a marca do
       canal é chato; play que não faz nada quebra a confiança da página
       inteira, e essa troca não vale. */
    const desistencia = window.setTimeout(() => {
      if (vivo && !player.current) setFalhou(true);
    }, 7000);

    return () => {
      vivo = false;
      clearTimeout(desistencia);
      if (relogioId) clearInterval(relogioId);
      player.current?.destroy?.();
      player.current = null;
    };
  }, [videoId]);

  const alterna = useCallback(() => {
    const p = player.current;
    if (!p) return;
    if (tocando) p.pauseVideo();
    else p.playVideo();
  }, [tocando]);

  const busca = (e: React.MouseEvent<HTMLDivElement>) => {
    const p = player.current;
    if (!p || !duracao) return;
    const r = e.currentTarget.getBoundingClientRect();
    p.seekTo(((e.clientX - r.left) / r.width) * duracao, true);
  };

  const pct = duracao ? Math.min(100, (tempo / duracao) * 100) : 0;

  if (falhou) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
        title={titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full border-0"
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-void">
      {/* A JANELA. 140% de altura com topo em -20% joga a moldura do YouTube
          para fora do quadro sem comer vídeo. Ver o cabeçalho do arquivo. */}
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] h-[140%]">
        <div ref={alvo} className="h-full w-full" />
      </div>

      {/* Toda a área do vídeo alterna play e pausa, como no player nativo. */}
      <button
        type="button"
        onClick={alterna}
        aria-label={tocando ? rotuloPausa : rotuloPlay}
        className="group absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-full bg-accent text-void shadow-[0_0_40px_rgba(79,163,255,0.45)] transition-opacity duration-300 ${
            tocando ? "opacity-0 group-hover:opacity-90" : "opacity-100"
          }`}
        >
          {tocando ? (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 5h3.2v14H7zM13.8 5H17v14h-3.2z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
      </button>

      {/* O TEMPO. Por cima do vídeo, sobre um degradê preto, porque o rodapé
          da imagem é claro em boa parte deste vídeo. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-4">
        <div className="mono mb-2 text-[0.7rem] text-ink/90">
          {relogio(tempo)} <span className="text-ink/45">/ {relogio(duracao)}</span>
        </div>
        <div
          onClick={busca}
          role="presentation"
          className="pointer-events-auto h-3 cursor-pointer py-[5px]"
        >
          <div className="h-[2px] w-full rounded-full bg-ink/25">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-200 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <span className="sr-only">{titulo}</span>
    </div>
  );
}
