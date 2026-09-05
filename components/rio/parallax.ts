"use client";

import { useEffect, useRef } from "react";
import { useMovimentoReduzido } from "../movimento";

/**
 * Parallax de camadas, por scroll e por mouse.
 *
 * Devolve um ref para o contêiner e um coletor de refs para as camadas. Uma
 * escuta de scroll e uma de mouse servem as três camadas, e a transformação é
 * escrita direto no nó, fora do React: um setState por quadro numa página com
 * quatro seções animadas derruba o frame rate em celular.
 *
 * `velocidades` é em pixels de deslocamento vertical ao longo da travessia
 * inteira do elemento pela viewport, e o deslocamento é sempre PARA BAIXO. A
 * camada que desce enquanto a página sobe é justamente o que lê como
 * profundidade; subir junto empurraria o desenho para fora do topo do
 * contêiner, que é recortado, e decapitaria o cume mais alto.
 *
 * No celular tudo entra pela metade: lá a viewport é curta e o mesmo
 * deslocamento lê como tremor.
 *
 * Não usa Framer Motion de propósito. `useScroll`/`useTransform` resolveriam o
 * mesmo, mas a biblioteca custa ~35 KB comprimidos numa página que precisa de
 * Lighthouse alto no 4G, e o que ela faria aqui cabe nas 40 linhas abaixo.
 */
export function useParallax(velocidades: number[], forcaMouse = 6) {
  const raiz = useRef<HTMLDivElement>(null);
  const camadas = useRef<(SVGGElement | HTMLElement | null)[]>([]);
  const reduzido = useMovimentoReduzido();

  const coleta = (i: number) => (el: SVGGElement | HTMLElement | null) => {
    camadas.current[i] = el;
  };

  useEffect(() => {
    const alvo = raiz.current;
    if (!alvo || reduzido) return;

    // Cópia local do array de nós: na limpeza, `camadas.current` já pode
    // apontar para outra coisa, e o lint avisa disso com razão.
    const nos = camadas.current;

    const movel = window.matchMedia("(max-width: 639px)").matches;
    const escala = movel ? 0.5 : 1;
    const temMouse = window.matchMedia("(hover: hover)").matches;

    let quadro = 0;
    let mx = 0;
    let my = 0;
    let progresso = 0;

    const pinta = () => {
      quadro = 0;
      for (let i = 0; i < nos.length; i++) {
        const g = nos[i];
        if (!g) continue;
        const v = (velocidades[i] ?? 0) * escala;
        const peso = ((i + 1) / nos.length) * forcaMouse * escala;
        const x = mx * peso;
        const y = progresso * v + my * peso;
        g.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }
    };

    const agenda = () => {
      if (!quadro) quadro = requestAnimationFrame(pinta);
    };

    const mede = () => {
      const r = alvo.getBoundingClientRect();
      // 0 quando o elemento acaba de entrar por baixo, 1 quando saiu por cima.
      const alcance = window.innerHeight + r.height;
      progresso = Math.min(1, Math.max(0, (window.innerHeight - r.top) / alcance));
      agenda();
    };

    const move = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
      agenda();
    };

    mede();
    window.addEventListener("scroll", mede, { passive: true });
    window.addEventListener("resize", mede);
    if (temMouse) window.addEventListener("mousemove", move, { passive: true });

    return () => {
      if (quadro) cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", mede);
      window.removeEventListener("resize", mede);
      window.removeEventListener("mousemove", move);
      for (const g of nos) if (g) g.style.transform = "";
    };
  }, [velocidades, forcaMouse, reduzido]);

  return { raiz, coleta };
}
