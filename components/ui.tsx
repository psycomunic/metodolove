"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { oferta } from "@/lib/content";
import { LinhasReveal, useIma, useSpotlight } from "./movimento";

/**
 * CTA primário.
 *
 * Verde chapado com texto navy: 8:1 de contraste, AAA. No hover ele vai para
 * o verde fundo E o texto vira branco, senão a combinação navy sobre #15803D
 * cai para 3,8:1 e reprova AA justamente no estado em que a pessoa está
 * olhando para o botão.
 *
 * O ímã (translate proporcional ao cursor) só existe onde há cursor de
 * verdade e some com prefers-reduced-motion. Ver useIma.
 */
export function Botao({
  href,
  children,
  className = "",
  tamanho = "lg",
  variante = "primario",
  ima = false,
  id,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tamanho?: "sm" | "md" | "lg";
  variante?: "primario" | "fantasma";
  ima?: boolean;
  id?: string;
}) {
  const refIma = useIma<HTMLAnchorElement>(0.22);
  const externo = href.startsWith("http");

  const medidas =
    tamanho === "lg"
      ? "px-8 py-5 text-[0.9rem] sm:px-11 sm:text-[1rem]"
      : tamanho === "md"
        ? "px-6 py-3.5 text-[0.8rem]"
        : "px-4 py-2.5 text-[0.7rem]";

  const pintura =
    variante === "primario"
      ? "bg-verde text-void shadow-[0_0_40px_rgba(34,197,94,0.28)] hover:bg-fundo-verde hover:text-white hover:shadow-[0_0_56px_rgba(34,197,94,0.42)]"
      : "border border-line-forte text-ink hover:border-verde hover:text-verde";

  return (
    <a
      id={id}
      ref={ima ? refIma : undefined}
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      data-cta
      className={`group inline-flex items-center justify-center gap-3 rounded-full font-bold tracking-[0.04em] whitespace-nowrap uppercase transition-[background-color,color,border-color,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow ${medidas} ${pintura} ${className}`}
    >
      <span>{children}</span>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

/** Rótulo mono de seção. Caixa alta sempre com tracking. */
export function Olho({
  children,
  vivo = false,
  className = "",
}: {
  children: ReactNode;
  vivo?: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mono flex flex-wrap items-center gap-x-3 gap-y-2 text-mute ${className}`}
    >
      <span>{children}</span>
      {vivo ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-glow">
          <span className="dot-vivo block h-1.5 w-1.5 rounded-full bg-glow" />
          {vivo}
        </span>
      ) : null}
    </p>
  );
}

/**
 * Manchete de seção.
 *
 * Uma palavra por manchete em verde, nunca duas: com duas o olho não sabe
 * qual é a promessa e o destaque vira zebra. `linhas` vem antes do destaque,
 * `fim` depois, e cada uma sobe de dentro da própria máscara.
 */
export function Manchete({
  linhas,
  destaque,
  fim = [],
  className = "",
  as: Tag = "h2",
}: {
  linhas: string[];
  destaque?: string;
  fim?: string[];
  className?: string;
  as?: "h1" | "h2";
}) {
  const partes: ReactNode[] = [
    ...linhas,
    ...(destaque
      ? [
          <span key="d" className="text-glow">
            {destaque}
          </span>,
        ]
      : []),
    ...fim,
  ];

  return (
    <Tag className={`display ${className}`}>
      <LinhasReveal linhas={partes} />
    </Tag>
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
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12.5l5.2 5.2L20 7" />
    </svg>
  );
}

/** Exclusão. Mesmo peso de traço do check, para as duas colunas pesarem igual. */
export function Xis({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Escudo da garantia. */
export function Escudo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l7.5 3v6c0 4.6-3.1 8.2-7.5 9.4C7.6 20.2 4.5 16.6 4.5 12V6z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </svg>
  );
}

/**
 * Duotone navy por cadeia de filtro, e não por `mix-blend-mode`.
 *
 * Blend depende do contexto de empilhamento do pai: basta a foto entrar num
 * elemento com `isolation`, `filter` ou z-index próprio (metade dos lugares
 * onde ela é usada aqui) para a camada de cor sumir sem erro nenhum, e a foto
 * ficar cinza. O filtro viaja com a imagem. `sepia` dá o marrom, o
 * `hue-rotate` leva ao azul da marca e o `saturate` segura o tom.
 */
const DUOTONE =
  "grayscale(1) sepia(1) hue-rotate(186deg) saturate(1.9) brightness(0.8) contrast(1.06)";

/** Máscara na base, para a foto fundir no fundo em vez de terminar em aresta. */
const MASCARA = {
  maskImage:
    "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 88%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 88%, transparent 100%)",
} as const;

/**
 * Foto tratada em duotone navy.
 *
 * Qualquer foto que o cliente mandar cai na paleta da página sem passar pelo
 * Photoshop: o tratamento é o filtro DUOTONE acima.
 *
 * O `onError` do React não resolve sozinho: a imagem pode falhar ANTES da
 * hidratação e o handler nunca dispara. Por isso conferimos o estado real do
 * elemento ao montar.
 */
export function Foto({
  src,
  alt,
  arte,
  className = "",
  desbota = true,
  prioridade = false,
}: {
  src: string;
  alt: string;
  arte?: string;
  className?: string;
  /** Máscara de gradiente na base, para fundir no fundo. */
  desbota?: boolean;
  prioridade?: boolean;
}) {
  const img = useRef<HTMLImageElement>(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFalhou(true);
  }, []);

  if (falhou) {
    return (
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line-forte bg-card p-6 text-center ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 text-mute"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.6" cy="9.6" r="1.7" />
          <path d="M3.6 17.4l4.9-4.6a2 2 0 0 1 2.7 0l3.5 3.3a2 2 0 0 0 2.7 0l2.3-2.1" />
        </svg>
        {arte ? (
          <p className="max-w-[17rem] text-[0.82rem] leading-snug font-semibold text-ink">
            {arte}
          </p>
        ) : null}
        <code className="mono bg-void/70 px-2 py-1 text-[0.62rem] tracking-tight text-mute">
          TODO asset · public{src}
        </code>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={src}
        alt={alt}
        decoding="async"
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : "auto"}
        onError={() => setFalhou(true)}
        className="h-full w-full object-cover"
        style={{ filter: DUOTONE, ...(desbota ? MASCARA : null) }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent"
      />
    </div>
  );
}

/**
 * Linha de preço. Aparece sob o CTA do hero, na barra fixa do celular e no
 * bloco da oferta; é uma peça só para os três lugares não divergirem.
 */
export function LinhaPreco({ className = "" }: { className?: string }) {
  return (
    <p
      className={`mono flex flex-wrap items-center gap-x-2.5 gap-y-1 text-mute ${className}`}
    >
      <span className="whitespace-nowrap">
        {oferta.parcelasQtd} de {oferta.parcelasValor}
      </span>
      <span className="h-3 w-px bg-line-forte" aria-hidden="true" />
      <span className="whitespace-nowrap">{oferta.garantiaDias} dias de garantia</span>
      <span className="h-3 w-px bg-line-forte" aria-hidden="true" />
      <span className="whitespace-nowrap">acesso na hora</span>
    </p>
  );
}

/**
 * Card com spotlight: o gradiente verde segue o cursor e a borda acende. É o
 * único lugar da página onde o verde aparece sem ser CTA, e ele existe para
 * dizer "isto aqui responde ao seu toque", não para colorir o card. A regra
 * visual mora em .spot; sem JS o card só não acende.
 */
export function CardSpot({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const spot = useSpotlight();
  const Comp = Tag as React.ElementType;
  return (
    <Comp onMouseMove={spot} className={`card spot ${className}`}>
      {children}
    </Comp>
  );
}

/** Emenda entre seções: um fio de 1px, nunca troca brusca de fundo. */
export function Fio({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-line ${className}`} aria-hidden="true" />;
}
