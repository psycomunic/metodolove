"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ *
 *  Regras de movimento
 *  — Toda animação serve a feedback, continuidade ou hierarquia.
 *  — Nada passa de 900ms; nada usa easing linear.
 *  — prefers-reduced-motion desliga máscara, ímã, contador e marquee.
 *    Sobra o fade, que o CSS já resolve sozinho.
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
 * Dispara uma vez quando o elemento entra na viewport.
 * Devolve o próprio ref: passar um ref por argumento durante o render deixa
 * o React sem garantia de quando ele será lido.
 */
function useNaTela<T extends HTMLElement>(threshold = 0.05) {
  const ref = useRef<T>(null);
  const [dentro, setDentro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setDentro(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, dentro };
}

/**
 * Entrada de bloco: desfoca e sobe até ficar nítido. O blur é o que
 * diferencia de um fade comum, porque o bloco "entra em foco" em vez de
 * simplesmente aparecer. A regra visual mora em .reveal, no globals.css.
 */
export function Reveal({
  children,
  atraso = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  atraso?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "p" | "figure";
}) {
  const { ref, dentro } = useNaTela<HTMLElement>();
  const Comp = Tag as React.ElementType;

  return (
    <Comp
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      data-visivel={dentro}
      style={{ "--atraso": `${atraso}ms` } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

/**
 * Manchete revelada linha a linha, cada uma subindo de dentro da própria
 * caixa. Serve a hierarquia: a ordem de leitura fica explícita.
 *
 * O estado escondido NÃO é escrito aqui em style inline, e sim em CSS atrás
 * da classe `.js` (ver .linha em globals.css). Se ele viesse daqui, o HTML
 * que sai do servidor já traria a manchete com opacity 0, e qualquer falha de
 * hidratação deixaria a página de vendas em branco. O que fica inline é só o
 * atraso de cada linha, que é inofensivo sem JavaScript.
 */
export function LinhasReveal({
  linhas,
  className = "",
  atrasoBase = 60,
  passo = 80,
}: {
  linhas: ReactNode[];
  className?: string;
  atrasoBase?: number;
  passo?: number;
}) {
  const { ref, dentro } = useNaTela<HTMLSpanElement>(0.15);

  return (
    <span ref={ref} className={className}>
      {linhas.map((linha, i) => (
        <span
          key={i}
          className="linha"
          data-visivel={dentro}
          style={{ "--atraso": `${atrasoBase + i * passo}ms` } as React.CSSProperties}
        >
          <span>{linha}</span>
          {/* O espaço só aparece no modo de uma linha do celular (.curta), onde
              os blocos viram texto corrido e as palavras colariam. Enquanto
              cada linha é um bloco, ele não ocupa nada. */}
          {i < linhas.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/**
 * Número que sobe até o valor ao entrar na tela. Só faz sentido em dado de
 * mercado: dá a sensação de contador de placar girando e prende o olho no
 * número, que é o argumento da seção.
 */
export function Contador({
  valor,
  prefixo = "",
  sufixo = "",
  duracao = 1200,
}: {
  valor: number;
  prefixo?: string;
  sufixo?: string;
  duracao?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduzido = useMovimentoReduzido();
  const [animado, setAnimado] = useState(0);

  // Com movimento reduzido o número já sai pronto, derivado e não gravado
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
          // desaceleração: o placar chega e para, não bate e volta
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

  return (
    <span ref={ref}>
      {prefixo}
      {Math.round(atual).toLocaleString("pt-BR")}
      {sufixo}
    </span>
  );
}

/**
 * Spotlight do card: devolve o handler que grava a posição do cursor em
 * --mx/--my. O gradiente e a borda que acendem moram em .spot, no CSS, então
 * sem JS o card continua legível: ele só não acende.
 */
export function useSpotlight() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const alvo = e.currentTarget;
    const r = alvo.getBoundingClientRect();
    alvo.style.setProperty("--mx", `${e.clientX - r.left}px`);
    alvo.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}

/**
 * Fio de progresso de leitura, 2px no topo. Numa página longa de vendas ele
 * responde a "quanto falta", que é a pergunta que faz a pessoa desistir no
 * meio. Escala em X, sem layout: só compositing.
 */
export function BarraProgresso() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const el = ref.current;
      if (!el) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      el.style.transform = `scaleX(${p})`;
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
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]">
      <div
        ref={ref}
        className="h-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/**
 * Ímã do CTA: o botão persegue o cursor dentro de um raio curto e volta
 * sozinho ao sair. Serve a feedback, e só existe onde há cursor. Em toque o
 * evento nunca dispara, e com movimento reduzido nem os handlers são presos.
 *
 * A transformação é escrita direto no nó, fora do React: um setState por
 * mousemove derrubaria o quadro numa página com quatro seções animadas.
 */
export function useIma<T extends HTMLElement>(forca = 0.28) {
  const ref = useRef<T>(null);
  const reduzido = useMovimentoReduzido();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduzido) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let quadro = 0;
    let alvoX = 0;
    let alvoY = 0;

    const aplicar = () => {
      quadro = 0;
      el.style.transform = `translate3d(${alvoX.toFixed(2)}px, ${alvoY.toFixed(2)}px, 0)`;
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(aplicar);
    };

    const mover = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      alvoX = (e.clientX - (r.left + r.width / 2)) * forca;
      alvoY = (e.clientY - (r.top + r.height / 2)) * forca;
      el.style.transition = "transform 120ms ease-out";
      agendar();
    };
    const sair = () => {
      alvoX = 0;
      alvoY = 0;
      // volta em mola: overshoot curto, sem balançar duas vezes
      el.style.transition = "transform 520ms cubic-bezier(0.34,1.56,0.64,1)";
      agendar();
    };

    el.addEventListener("mousemove", mover);
    el.addEventListener("mouseleave", sair);
    return () => {
      if (quadro) cancelAnimationFrame(quadro);
      el.removeEventListener("mousemove", mover);
      el.removeEventListener("mouseleave", sair);
      el.style.transform = "";
      el.style.transition = "";
    };
  }, [forca, reduzido]);

  return ref;
}
