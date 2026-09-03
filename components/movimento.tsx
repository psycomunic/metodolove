"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SilhuetaRio } from "./art";

/* ------------------------------------------------------------------ *
 *  Regras de movimento (ver .agents/skills/refero-design/references/motion.md)
 *  — Toda animação serve a feedback, continuidade ou hierarquia.
 *  — Nada passa de 900ms; nada usa easing linear.
 *  — prefers-reduced-motion desliga parallax por completo.
 * ------------------------------------------------------------------ */

function usaMovimentoReduzido() {
  const [reduzido, setReduzido] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplica = () => setReduzido(mq.matches);
    aplica();
    mq.addEventListener("change", aplica);
    return () => mq.removeEventListener("change", aplica);
  }, []);
  return reduzido;
}

/**
 * Progresso do elemento pela viewport, de 0 (entrando por baixo)
 * a 1 (saindo por cima). Atualiza dentro de rAF, num único listener.
 */
function usaProgresso(ref: React.RefObject<HTMLElement | null>, ativo: boolean) {
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    if (!ativo) return;
    const el = ref.current;
    if (!el) return;

    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const r = el.getBoundingClientRect();
      const alcance = window.innerHeight + r.height;
      const p = (window.innerHeight - r.top) / alcance;
      setProgresso(Math.min(1, Math.max(0, p)));
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      if (quadro) cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [ref, ativo]);

  return progresso;
}

/**
 * Horizonte do Rio em três camadas, cada uma correndo numa velocidade.
 * A serra distante quase não anda; o Pão de Açúcar anda mais — é o mesmo
 * efeito de quem passa de carro pelo Aterro olhando pra baía.
 */
export function Horizonte({
  className = "",
  cor = "#0D4671",
  forca = 1,
}: {
  className?: string;
  cor?: string;
  forca?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = usaMovimentoReduzido();
  const p = usaProgresso(ref, !reduzido);

  // desloca em torno do centro da tela para não haver salto na entrada
  const d = (p - 0.5) * 2;
  const camadas: { camada: "fundo" | "meio" | "frente"; vel: number }[] = [
    { camada: "fundo", vel: 6 },
    { camada: "meio", vel: 16 },
    { camada: "frente", vel: 30 },
  ];

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      {camadas.map(({ camada, vel }) => (
        <SilhuetaRio
          key={camada}
          cor={cor}
          camada={camada}
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{
            transform: reduzido
              ? undefined
              : `translate3d(${(-d * vel * forca).toFixed(2)}px, ${(d * vel * forca * 0.35).toFixed(2)}px, 0)`,
          }}
        />
      ))}
    </div>
  );
}

/** Deslocamento vertical suave para elementos de fundo (sol, textura). */
export function Deriva({
  children,
  velocidade = 40,
  className = "",
}: {
  children: ReactNode;
  velocidade?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = usaMovimentoReduzido();
  const p = usaProgresso(ref, !reduzido);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={
        reduzido
          ? undefined
          : { transform: `translate3d(0, ${((p - 0.5) * velocidade).toFixed(2)}px, 0)` }
      }
    >
      {children}
    </div>
  );
}

/**
 * Manchete revelada linha a linha, cada uma subindo de dentro da própria
 * caixa. Serve a hierarquia: a ordem de leitura fica explícita.
 */
export function LinhasReveal({
  linhas,
  className = "",
  atrasoBase = 80,
  passo = 110,
}: {
  linhas: ReactNode[];
  className?: string;
  atrasoBase?: number;
  passo?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [dentro, setDentro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDentro(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {/*
        A máscara precisa de folga em cima (acentos de VOCÊ/JÁ, que ficam acima
        da altura de caixa alta) e embaixo (o rabisco laranja). As margens
        negativas devolvem o espaço para o fluxo do texto.
      */}
      {linhas.map((linha, i) => (
        <span
          key={i}
          className="block overflow-hidden pt-[0.2em] pb-[0.42em] -mt-[0.2em] -mb-[0.42em]"
        >
          <span
            className="block will-change-transform"
            style={{
              transform: dentro ? "translateY(0)" : "translateY(105%)",
              opacity: dentro ? 1 : 0,
              transition:
                "transform 780ms cubic-bezier(0.16,1,0.3,1), opacity 500ms ease-out",
              transitionDelay: `${atrasoBase + i * passo}ms`,
            }}
          >
            {linha}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Placar que sobe até o valor. Só faz sentido em número —
 * dá a sensação de marcador de quadra girando.
 */
export function Contador({
  valor,
  decimais = 0,
  pad = 0,
  duracao = 1100,
}: {
  valor: number;
  decimais?: number;
  pad?: number;
  duracao?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduzido = usaMovimentoReduzido();
  const [atual, setAtual] = useState(reduzido ? valor : 0);

  useEffect(() => {
    if (reduzido) {
      setAtual(valor);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let quadro = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / duracao);
          // desaceleração — o placar chega e para, não bate e volta
          setAtual(valor * (1 - Math.pow(1 - t, 3)));
          if (t < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [valor, duracao, reduzido]);

  const texto = atual.toLocaleString("pt-BR", {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
  });

  return (
    <span ref={ref}>{pad ? texto.padStart(pad, "0") : texto}</span>
  );
}

/**
 * Foto que se abre por máscara ao entrar na tela, em vez de só surgir.
 * Continuidade: a imagem "chega" no lugar dela.
 */
export function Desmascara({
  children,
  className = "",
  atraso = 0,
}: {
  children: ReactNode;
  className?: string;
  atraso?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = usaMovimentoReduzido();
  const [dentro, setDentro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDentro(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Movimento reduzido: sem máscara, só a imagem no lugar.
  if (reduzido) return <div className={className}>{children}</div>;

  return (
    /*
      O observador fica NO ELEMENTO DE FORA, sem recorte.
      O clip-path vai no filho: um elemento recortado a 100% tem área
      visível zero, e o IntersectionObserver nunca dispararia nele.
    */
    <div ref={ref} className={className}>
      <div
        className="h-full w-full will-change-[clip-path]"
        style={{
          clipPath: dentro ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 900ms cubic-bezier(0.16,1,0.3,1)",
          transitionDelay: `${atraso}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
