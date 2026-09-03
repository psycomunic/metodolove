"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Anima o bloco quando ele entra na viewport. */
export function Reveal({
  children,
  atraso = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  atraso?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Comp = Tag as React.ElementType;

  return (
    <Comp
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      data-visivel={visivel}
      style={{ "--atraso": `${atraso}ms` } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

/**
 * O único destaque à mão da página, usado uma vez só, no hero.
 * Não é troca de fonte — é um traço desenhado, o gesto assinatura da marca.
 */
export function Rabisco({ children }: { children: ReactNode }) {
  return (
    <span className="rabisco">
      {children}
      <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M5 13 C 62 4 134 3 191 8 C 237 12 269 15 295 9" />
      </svg>
    </span>
  );
}

/** Rótulo de seção. Caixa alta sempre com tracking. */
export function Rotulo({
  children,
  tom = "escuro",
}: {
  children: ReactNode;
  tom?: "escuro" | "claro";
}) {
  return (
    <span
      className={`rotulo inline-flex items-center gap-3 before:block before:h-px before:w-7 before:content-[''] ${
        tom === "claro"
          ? "text-mar-300 before:bg-mar-500"
          : "text-mar-600 before:bg-mar-600"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * CTA primário. A pílula é a única forma arredondada do sistema —
 * exceção deliberada, para que o botão seja a coisa mais "clicável" da tela.
 * O laranja não aparece em nenhum outro fundo da página.
 */
export function Botao({
  href,
  children,
  className = "",
  tamanho = "lg",
  id,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tamanho?: "md" | "lg";
  id?: string;
}) {
  const medidas =
    tamanho === "lg"
      ? "px-9 py-5 text-[0.92rem] sm:px-11 sm:text-[1rem]"
      : "px-6 py-3.5 text-[0.78rem]";

  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-sol-500 font-bold tracking-[0.07em] text-white uppercase transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-sol-400 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-mar-600 active:translate-y-0 ${medidas} ${className}`}
    >
      <span>{children}</span>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

/** Confirmação. Ícone de traço, nunca emoji. */
export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12.5l5.2 5.2L20 7" />
    </svg>
  );
}

/**
 * Slot de foto com proporção fixa.
 * Enquanto o arquivo não existe, mostra a direção de arte do slot em vez de
 * uma imagem quebrada — placeholder honesto, nunca foto falsa em CSS.
 */
export function Foto({
  src,
  alt,
  arte,
  className = "",
}: {
  src: string;
  alt: string;
  arte?: string;
  className?: string;
}) {
  const img = useRef<HTMLImageElement>(null);
  const [falhou, setFalhou] = useState(false);

  // A imagem pode falhar ANTES da hidratação — nesse caso o onError do React
  // nunca dispara. Por isso conferimos o estado real do elemento ao montar.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFalhou(true);
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-mar-900 ${className}`}>
      {!falhou ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={src}
          alt={alt}
          decoding="async"
          onError={() => setFalhou(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-dashed border-areia-300/35 bg-[repeating-linear-gradient(135deg,#0A3B5F_0px,#0A3B5F_10px,#0E5180_10px,#0E5180_20px)] p-6 text-center">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-areia-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="16" rx="1" />
            <circle cx="8.6" cy="9.6" r="1.7" />
            <path d="M3.6 17.4l4.9-4.6a2 2 0 0 1 2.7 0l3.5 3.3a2 2 0 0 0 2.7 0l2.3-2.1" />
          </svg>
          {arte ? (
            <p className="max-w-[17rem] text-[0.82rem] leading-snug font-semibold text-areia-100">
              {arte}
            </p>
          ) : null}
          <code className="bg-mar-950/80 px-2 py-1 text-[0.66rem] tracking-tight text-areia-300">
            public{src}
          </code>
        </div>
      )}
    </div>
  );
}
