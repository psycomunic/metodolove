"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ *
 *  Regras de movimento (ver .agents/skills/refero-design/references/motion.md)
 *  — Toda animação serve a feedback, continuidade ou hierarquia.
 *  — Nada passa de 900ms; nada usa easing linear.
 *  — prefers-reduced-motion desliga parallax por completo.
 * ------------------------------------------------------------------ */

export function useMovimentoReduzido() {
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
 *
 * O hook cria o próprio ref e devolve junto: passar um ref como argumento
 * durante o render deixa o React sem garantia de quando ele será lido.
 */
function useProgresso<T extends HTMLElement>(ativo: boolean) {
  const ref = useRef<T>(null);
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
  }, [ativo]);

  return { ref, progresso };
}

export function Deriva({
  children,
  velocidade = 40,
  className = "",
}: {
  children: ReactNode;
  velocidade?: number;
  className?: string;
}) {
  const reduzido = useMovimentoReduzido();
  const { ref, progresso } = useProgresso<HTMLDivElement>(!reduzido);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={
        reduzido
          ? undefined
          : {
              transform: `translate3d(0, ${((progresso - 0.5) * velocidade).toFixed(2)}px, 0)`,
            }
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
          className="-mt-[0.2em] -mb-[0.42em] block overflow-hidden pt-[0.2em] pb-[0.42em]"
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
  const reduzido = useMovimentoReduzido();
  const [animado, setAnimado] = useState(0);

  // Com movimento reduzido o número já sai pronto — derivado, não gravado
  // dentro de um efeito, que dispararia um render em cascata.
  const atual = reduzido ? valor : animado;

  useEffect(() => {
    if (reduzido) return;
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
          setAnimado(valor * (1 - Math.pow(1 - t, 3)));
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

  return <span ref={ref}>{pad ? texto.padStart(pad, "0") : texto}</span>;
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
  const reduzido = useMovimentoReduzido();
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
