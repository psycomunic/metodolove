"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mecanismo } from "@/lib/content";

/**
 * Vídeo do método, ao lado da manchete do mecanismo.
 *
 * UM CARTÃO 16:9 EM TODA TELA, e o play SEMPRE abre em modal. Não é o que
 * esta peça fazia: ela tinha cartão 9:16 no celular, com o vídeo tocando ali
 * dentro, porque a capa era um quadro do próprio vídeo, que é vertical.
 *
 * O que mudou foi a capa. O cliente entregou arte 16:9 com logo e chamada, e
 * arte deitada não cabe num cartão em pé sem cortar o lettering ou cortar
 * ele. Aí a decisão vira uma só: o cartão segue a forma da CAPA, e o vídeo
 * segue a forma dele no modal, onde usa a altura da janela e fica grande de
 * verdade. Tocar um 9:16 dentro de um cartão 16:9 daria uma tira estreita no
 * meio, com tarja preta dos dois lados.
 *
 * ARQUIVO LOCAL, player nativo, ponto. O vídeo mora em public/videos/ e o
 * play abre um `<video>` do próprio navegador: barra de tempo embaixo, sem
 * nome de canal, sem logo, sem script de terceiro e sem nada que possa
 * falhar por bloqueador ou mudança de API.
 *
 * Houve um player de YouTube aqui, com recorte para esconder a moldura e
 * controles desenhados à mão. Ele nunca funcionou na máquina do cliente, e eu
 * nunca consegui reproduzir a falha porque o navegador que uso para conferir
 * não roda vídeo do YouTube. Com o arquivo em mãos, manter 200 linhas
 * dependentes de uma API de terceiro, carregadas no bundle e nunca
 * exercitadas, era só dívida: saiu. Está no histórico do git se um dia o
 * vídeo voltar a morar lá (o Short era yySJ10SGspA).
 *
 * O MODAL VAI PARA O BODY, por portal, e isso não é preferência de estilo.
 * Esta peça mora dentro de um `<Reveal>`, e `.reveal` anima `opacity` e
 * `transform`. Um ancestral com `transform` faz `position: fixed` deixar de
 * ser fixo em relação à JANELA e passar a ser fixo em relação a ele: o modal
 * saía do lugar, e enquanto o reveal não tivesse disparado ele herdava
 * `opacity: 0` e simplesmente não aparecia. No portal ele nasce filho do
 * body, fora do alcance de qualquer transform ou opacidade de seção.
 *
 * NADA CARREGA ANTES DO CLIQUE. O cartão é uma FACHADA: só a capa, que é
 * servida daqui. O `<video>` nasce junto com o modal, e o modal só existe
 * depois de alguém clicar.
 *
 * O botão é AZUL, não verde: verde na página é só o botão de compra
 * (invariante 1). Um play verde disputaria o ponto mais quente da tela com o
 * checkout e levaria o clique para o lugar errado.
 */
export default function VideoMetodo({ className = "" }: { className?: string }) {
  const { video } = mecanismo;
  const [aberto, setAberto] = useState(false);
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;
    fechar.current?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
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
  }, [aberto]);

  const moldura = `relative mx-auto aspect-video w-full max-w-[40rem] overflow-hidden rounded-2xl bg-card lg:max-w-none ${className}`;

  /* Sem vídeo configurado, a peça cai no placeholder honesto, igual à `Foto`
     de ui.tsx: um play que não toca é pior do que assumir que o vídeo não
     está pronto. A pessoa clica, não acontece nada, e a página perde a
     confiança que ela precisa ter para chegar no botão de compra. */
  if (!video.arquivo) {
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

  return (
    <>
      <div
        className={`${moldura} border border-line shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]`}
      >
        <button
          type="button"
          onClick={() => setAberto(true)}
          aria-label={`Assistir: ${video.legenda}`}
          className="group absolute inset-0 block w-full cursor-pointer"
        >
          {/* A capa é imagem de verdade, não fundo de CSS: assim o navegador
              pode priorizá-la e ela entra no cálculo de layout. O `alt` fica
              vazio porque a chamada já está desenhada dentro da arte e o
              botão tem `aria-label`: repetir viraria eco no leitor de tela. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.capa}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Véu leve, só para o botão ter contraste sobre qualquer ponto da
              arte. Preto, nunca colorido: é a regra para escurecimento sobre
              imagem. */}
          <span className="absolute inset-0 bg-void/10 transition-colors duration-300 group-hover:bg-transparent" />
          {/* Centralizado, a pedido do cliente em set/2026.

              Fica o registro de que ele cai em cima da palavra "Play" da
              arte: a chamada "Aperte o Play" vive na metade esquerda e o
              centro do cartão passa bem por cima dela. Cheguei a deixar o
              botão embaixo da frase, onde a arte é campo escuro, e o cliente
              preferiu no meio. Se um dia a arte mudar e a chamada sair do
              caminho, isto aqui deixa de ser um problema.

              O cartão inteiro continua clicável. O círculo é afordância e
              alvo de foco, não o único lugar que aceita o clique. */}
          <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-void shadow-[0_0_40px_rgba(79,163,255,0.45)] transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 h-6 w-6 sm:ml-1 sm:h-7 sm:w-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </div>

      {/* A guarda de `document` existe para o caso de alguém um dia abrir
          este modal sem clique (um teste, um autoplay). No fluxo normal
          `aberto` só vira true por clique, que só acontece no navegador, mas
          sem ela a pré-renderização da home quebra com "document is not
          defined" e o build inteiro cai. Custa uma comparação. */}
      {aberto && typeof document !== "undefined"
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={video.legenda}
              onClick={() => setAberto(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-void/95 p-4 backdrop-blur-sm sm:p-8"
            >
              <button
                ref={fechar}
                type="button"
                onClick={() => setAberto(false)}
                aria-label={video.fechar}
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

              {/* O vídeo é 9:16. A largura sai do MENOR entre a largura
                  disponível e o que cabe em 86% da altura da janela: só com a
                  altura ele estouraria para fora da tela numa janela baixa, e
                  só com a largura ficaria minúsculo num monitor largo. */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="aspect-[9/16] w-full max-w-[calc(86vh*9/16)] overflow-hidden rounded-2xl border border-line bg-void"
              >
                {/* Controles do navegador, que já trazem a barra de tempo que
                    o cliente queria. `autoPlay` vale porque o modal só existe
                    depois de um clique dele. `contain` para o vídeo 9:16
                    caber inteiro, sem corte. */}
                <video
                  src={video.arquivo}
                  poster={video.capaVideo}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full bg-void object-contain"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
