"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Holofote de revelação no hero.
 *
 * Duas camadas de vídeo empilhadas: a de baixo toca sempre; a de cima é
 * recortada por uma máscara radial que segue o cursor (ou o dedo). Onde o
 * ponteiro passa, o segundo vídeo aparece — como se a luz abrisse um buraco
 * na cena.
 *
 * Se os arquivos não existirem em /public/videos, o componente se apaga e o
 * hero volta ao desenho de gradiente + foto. A página nunca quebra.
 */

const BASE = "/videos/bola-1.mp4";
const REVELA = "/videos/bola-2.mp4";

/** Raio do holofote conforme a largura da tela. */
function raio(largura: number) {
  if (largura < 480) return 120;
  if (largura < 720) return 160;
  return 260;
}

const MASCARA_OCULTA = "radial-gradient(circle 0px at -999px -999px, #fff, transparent)";

function mascara(x: number, y: number, r: number) {
  return (
    `radial-gradient(circle ${r}px at ${x}px ${y}px, ` +
    "#fff 0%, #fff 40%, " +
    "rgba(255,255,255,0.75) 60%, " +
    "rgba(255,255,255,0.4) 75%, " +
    "rgba(255,255,255,0.12) 88%, " +
    "transparent 100%)"
  );
}

export default function HeroReveal({
  aoCarregar,
}: {
  /** Avisa o hero que os vídeos existem, para ele esconder o painel de foto. */
  aoCarregar?: (ok: boolean) => void;
}) {
  const camada = useRef<HTMLDivElement>(null);
  const videoBase = useRef<HTMLVideoElement>(null);
  const videoRevela = useRef<HTMLVideoElement>(null);
  const quadro = useRef(0);
  const jaInteragiu = useRef(false);

  const [ok, setOk] = useState(false);
  const [reduzido, setReduzido] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplica = () => setReduzido(mq.matches);
    aplica();
    mq.addEventListener("change", aplica);
    return () => mq.removeEventListener("change", aplica);
  }, []);

  const posicionar = useCallback((x: number, y: number) => {
    const el = camada.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const g = mascara(x - r.left, y - r.top, raio(window.innerWidth));
    el.style.webkitMaskImage = g;
    el.style.maskImage = g;
  }, []);

  /* ---- ponteiro ---- */
  useEffect(() => {
    if (!ok || reduzido) return;

    const mover = (x: number, y: number) => {
      jaInteragiu.current = true;
      if (quadro.current) cancelAnimationFrame(quadro.current);
      quadro.current = requestAnimationFrame(() => posicionar(x, y));
    };

    const noMouse = (e: MouseEvent) => mover(e.clientX, e.clientY);
    const noToque = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) mover(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", noMouse);
    window.addEventListener("touchmove", noToque, { passive: true });
    return () => {
      window.removeEventListener("mousemove", noMouse);
      window.removeEventListener("touchmove", noToque);
      if (quadro.current) cancelAnimationFrame(quadro.current);
    };
  }, [ok, reduzido, posicionar]);

  /* ---- varredura de apresentação ----
     Sem ela, quem chega e não mexe o mouse nunca descobre que o efeito existe.
     Roda uma vez, e o primeiro movimento do ponteiro assume o controle. */
  useEffect(() => {
    if (!ok || reduzido) return;
    const el = camada.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const y = r.top + r.height * 0.52;
    const de = r.left + r.width * 0.22;
    const ate = r.left + r.width * 0.8;
    const duracao = 2200;
    let inicio = 0;
    let id = 0;

    const passo = (agora: number) => {
      if (jaInteragiu.current) return;
      if (!inicio) inicio = agora;
      const t = Math.min(1, (agora - inicio) / duracao);
      // acelera e desacelera, para parecer um facho conduzido à mão
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      posicionar(de + (ate - de) * e, y);
      if (t < 1) id = requestAnimationFrame(passo);
      else {
        el.style.webkitMaskImage = MASCARA_OCULTA;
        el.style.maskImage = MASCARA_OCULTA;
      }
    };

    const atraso = window.setTimeout(() => {
      id = requestAnimationFrame(passo);
    }, 900);

    return () => {
      window.clearTimeout(atraso);
      if (id) cancelAnimationFrame(id);
    };
  }, [ok, reduzido, posicionar]);

  /* ---- movimento reduzido: nada de laço tocando sozinho ---- */
  useEffect(() => {
    if (!reduzido) return;
    videoBase.current?.pause();
    videoRevela.current?.pause();
  }, [reduzido]);

  /* ---- os arquivos existem? ---- */
  const falhou = useCallback(() => {
    setOk(false);
    aoCarregar?.(false);
  }, [aoCarregar]);

  const carregou = useCallback(() => {
    setOk(true);
    aoCarregar?.(true);
  }, [aoCarregar]);

  const comum =
    "absolute inset-0 h-full w-full object-cover" as const;

  return (
    <div
      className="absolute inset-0 z-0 transition-opacity duration-700"
      style={{ opacity: ok ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* camada de baixo: a cena normal */}
      <video
        ref={videoBase}
        className={comum}
        src={BASE}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={carregou}
        onError={falhou}
      />

      {/* véu azul: mantém o título legível e a cena dentro da paleta */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,#04192B_0%,rgba(4,25,43,0.93)_24%,rgba(4,25,43,0.62)_56%,rgba(4,25,43,0.42)_100%)]" />

      {/* camada de cima: só aparece sob o holofote */}
      <div
        ref={camada}
        className="absolute inset-0 will-change-[mask-image]"
        style={{
          WebkitMaskImage: MASCARA_OCULTA,
          maskImage: MASCARA_OCULTA,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <video
          ref={videoRevela}
          className={comum}
          src={REVELA}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={falhou}
        />
        {/* véu mais leve: o facho fica vivo, mas sem estourar sobre o texto */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,25,43,0.86)_0%,rgba(4,25,43,0.42)_38%,rgba(4,25,43,0.16)_100%)]" />
      </div>
    </div>
  );
}
