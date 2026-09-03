"use client";

import { useEffect, useRef, useState } from "react";
import { useMovimentoReduzido } from "./movimento";

/**
 * A bola do Método girando. Um holofote que segue o cursor abre um buraco nela
 * e mostra a bola de dinheiro por baixo.
 *
 * A troca não é enfeite: é a promessa do produto em uma imagem. A bola azul é
 * o esporte, a de dinheiro é o esporte virando profissão, que é exatamente o
 * que a manchete ao lado diz. E o facho obriga a pessoa a DESCOBRIR isso, o
 * que prende mais que uma troca automática.
 *
 * Os vídeos vêm com fundo branco, e o ENQUADRAMENTO deles resolve isso.
 * Medido quadro a quadro nos dois arquivos: a bola tem raio de 0,389 da
 * largura do quadro e o centro dela fica em (49,5%, 51,0%), não em (50%, 50%).
 *
 * Esse 1% de desvio é o que produzia uma meia-lua branca no topo quando eu só
 * escalava: escalar a partir do centro amplia o desvio junto. Por isso o
 * transform desloca ANTES de escalar.
 *
 * A escala saiu do perfil radial de luminância, não do contorno. O contorno
 * dá raio 0,389, mas ali já é HALO: a bola é sólida até 0,380 e de 0,385 em
 * diante a luminância salta para 208-237, que é o fundo desbotando. Foi esse
 * anel de meio ponto percentual que sobrou como borda clara na primeira
 * correção. Com 0,5 / 0,376 = 1,33 a borda do disco cai dentro da parte
 * sólida e o halo fica todo fora.
 *
 * Não tente remover o branco por blend mode: multiply escurece a bola azul e
 * darken come a de dinheiro.
 *
 * A sombra existe porque a bola preenche o disco inteiro: sem fundo branco
 * sobrando, o círculo É a esfera, e a sombra a tira do plano em vez de deixá-la
 * com cara de adesivo.
 *
 * Ela é forte de propósito. O fundo é marinho quase preto (#082038), e sombra
 * discreta ali simplesmente não aparece — some no próprio fundo. São duas
 * camadas: uma curta e opaca logo abaixo, para o contato, e uma longa e muito
 * difusa, para a distância. É como sombra real se comporta.
 */
export default function BolaTroca({ className = "" }: { className?: string }) {
  const caixa = useRef<HTMLDivElement>(null);
  const revela = useRef<HTMLVideoElement>(null);
  const base = useRef<HTMLVideoElement>(null);
  const reduzido = useMovimentoReduzido();
  const [tocado, setTocado] = useState(false);

  useEffect(() => {
    const el = caixa.current;
    const alvo = revela.current;
    if (!el || !alvo) return;

    for (const v of [base.current, alvo]) {
      if (!v) continue;
      if (reduzido) v.pause();
      else void v.play().catch(() => {});
    }

    // Fora da tela = facho fechado. É o estado de repouso.
    const esconder = () => {
      alvo.style.webkitMaskImage = FECHADO;
      alvo.style.maskImage = FECHADO;
    };
    const pintar = (x: number, y: number) => {
      const r = el.offsetWidth * 0.42;
      const g =
        `radial-gradient(circle ${r}px at ${x}px ${y}px, #fff 0%, #fff 42%,` +
        ` rgba(255,255,255,0.72) 62%, rgba(255,255,255,0.34) 78%,` +
        ` rgba(255,255,255,0.1) 90%, transparent 100%)`;
      alvo.style.webkitMaskImage = g;
      alvo.style.maskImage = g;
    };
    esconder();

    const mover = (e: PointerEvent) => {
      const c = el.getBoundingClientRect();
      pintar(e.clientX - c.left, e.clientY - c.top);
    };
    const sair = () => setTocado(false);

    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", () => {
      esconder();
      sair();
    });

    // Varredura única na entrada: sem ela, quem nunca mexe o mouse não
    // descobre que existe uma segunda bola.
    let quadro = 0;
    if (!reduzido) {
      const largura = el.offsetWidth;
      const meio = el.offsetHeight / 2;
      const inicio = performance.now() + 900;
      const passo = (agora: number) => {
        const t = (agora - inicio) / 1400;
        if (t < 0) {
          quadro = requestAnimationFrame(passo);
          return;
        }
        if (t >= 1) {
          esconder();
          return;
        }
        // ida e volta, com desaceleração nas pontas
        const p = t < 0.5 ? t * 2 : 2 - t * 2;
        const suave = p * p * (3 - 2 * p);
        pintar(largura * (0.12 + suave * 0.76), meio);
        quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    }

    return () => {
      cancelAnimationFrame(quadro);
      el.removeEventListener("pointermove", mover);
    };
  }, [reduzido]);

  return (
    <div
      ref={caixa}
      onPointerDown={() => setTocado((t) => !t)}
      role="img"
      aria-label="Bola do Método LLOVE girando. Um facho de luz revela uma bola feita de dinheiro por baixo."
      className={`relative aspect-square overflow-hidden rounded-full bg-[#FAFAF8] shadow-[0_22px_28px_-10px_rgba(0,0,0,0.9),0_60px_90px_-24px_rgba(0,0,0,0.95)] ${className}`}
    >
      <video
        ref={base}
        src="/videos/bola-1-web.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={ENQUADRA}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={revela}
        src="/videos/bola-2-web.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        // Em toque não existe cursor: o toque troca a bola inteira.
        style={ENQUADRA}
        className={`absolute inset-0 h-full w-full object-cover ${
          tocado ? "[mask-image:none] opacity-100 [-webkit-mask-image:none]" : ""
        }`}
      />
    </div>
  );
}

/**
 * Centraliza a bola e a amplia até encostar na borda do disco.
 * O translate vem depois do scale na string porque o CSS aplica da direita
 * para a esquerda: desloca primeiro, em coordenadas não escaladas, e só então
 * amplia em torno do centro.
 */
const ENQUADRA = { transform: "scale(1.33) translate(0.5%, -1%)" } as const;

/** Facho fechado: círculo de raio zero, longe da tela. */
const FECHADO = "radial-gradient(circle 0px at -999px -999px, #fff, transparent)";
