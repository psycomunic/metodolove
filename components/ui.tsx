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
 * Destaque de manchete: bloco de cor chapada atrás da palavra.
 * Substituiu o traço à mão — no cartaz o realce é chapado e ocupa área,
 * não é um gesto. A inclinação vive no bloco e o texto volta ao prumo,
 * senão a linha de base entorta e a manchete perde força.
 */
export function Destaque({
  children,
  cor = "creme",
  inclina = -1.4,
}: {
  children: ReactNode;
  cor?: "creme" | "sol" | "noite";
  inclina?: number;
}) {
  const tons = {
    creme: "bg-areia-200 text-noite-900",
    sol: "bg-sol-500 text-white",
    noite: "bg-noite-800 text-white",
  } as const;

  return (
    <span
      className="bloco"
      style={{ "--inclina": `${inclina}deg` } as React.CSSProperties}
    >
      <span className={tons[cor]}>{children}</span>
    </span>
  );
}

/** Pílula vazada: dado secundário. Contorno, nunca preenchimento. */
export function Pilula({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`pilula rotulo inline-flex ${className}`}>{children}</span>;
}

/**
 * Cabeçalho de seção em duas colunas: manchete à esquerda, texto de apoio à
 * direita, alinhados pela base.
 *
 * A versão anterior empilhava rótulo, manchete e parágrafo num trilho
 * estreito à esquerda, e a metade direita da tela ficava morta em quatro
 * seções seguidas. Com a Archivo Black as manchetes ficaram curtas e o vazio
 * piorou. Aqui o texto de apoio ocupa esse lado em vez de o espaço sobrar.
 */
export function CabecalhoSecao({
  rotulo,
  titulo,
  texto,
  tom = "escuro",
  className = "",
}: {
  rotulo: ReactNode;
  titulo: ReactNode;
  texto?: ReactNode;
  tom?: "escuro" | "claro";
  className?: string;
}) {
  return (
    <header
      className={`grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16 ${className}`}
    >
      <div>
        <Reveal>
          <Rotulo tom={tom}>{rotulo}</Rotulo>
        </Reveal>
        {titulo}
      </div>

      {texto ? (
        <Reveal atraso={130}>
          <div
            className={`text-[1rem] leading-[1.68] lg:pb-2 ${
              tom === "claro" ? "text-bruma-200" : "text-tinta/70"
            }`}
          >
            {texto}
          </div>
        </Reveal>
      ) : null}
    </header>
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
      className={`rotulo inline-flex items-center gap-3 before:block before:h-[3px] before:w-8 before:content-[''] ${
        tom === "claro"
          ? "text-bruma-200 before:bg-areia-200"
          : "text-noite-700 before:bg-sol-500"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * CTA primário. Bloco laranja de canto vivo — a mesma forma do bloco de
 * preço do cartaz, que é o elemento mais pesado da peça.
 * NÃO recebe inclinação: botão torto lê como enfeite e perde o affordance
 * de clique. A inclinação é privilégio da manchete.
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
      ? "px-9 py-5 text-[0.94rem] sm:px-12 sm:text-[1.04rem]"
      : "px-6 py-3.5 text-[0.78rem]";

  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta
      className={`group inline-flex items-center justify-center gap-3 bg-sol-500 font-bold tracking-[0.08em] whitespace-nowrap text-white uppercase transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-sol-400 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-areia-200 active:translate-y-0 ${medidas} ${className}`}
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
    <div className={`relative h-full w-full overflow-hidden bg-noite-900 ${className}`}>
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
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-dashed border-areia-300/35 bg-[repeating-linear-gradient(135deg,#102472_0px,#102472_10px,#16308F_10px,#16308F_20px)] p-6 text-center">
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
          <code className="bg-noite-950/80 px-2 py-1 text-[0.66rem] tracking-tight text-areia-300">
            public{src}
          </code>
        </div>
      )}
    </div>
  );
}
