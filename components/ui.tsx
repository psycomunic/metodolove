"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { oferta } from "@/lib/content";
import { LinhasReveal, useIma, useSpotlight } from "./movimento";

/**
 * CTA de compra. É o ÚNICO lugar da página onde existe verde.
 *
 * Todo botão daqui aponta para o checkout: a página não tem login nem área
 * de aluno, então não há "entrar" nenhum. Se aparecer um botão que não leva
 * ao checkout, ele não usa esta peça e não usa verde.
 *
 * Verde chapado com texto navy: 8:1 de contraste, AAA. No hover ele vai para
 * o verde fundo E o texto vira branco, senão a combinação navy sobre #15803D
 * cai para 3,8:1 e reprova AA justamente no estado em que a pessoa está
 * olhando para o botão.
 *
 * No celular ele é largura total até 420px e centralizado; o alvo de toque
 * mais clicado da página não pode ser menor que isso.
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
  cheio = false,
  id,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tamanho?: "sm" | "md" | "lg";
  variante?: "primario" | "fantasma";
  ima?: boolean;
  /** Largura total no celular, teto de 420px, centralizado. */
  cheio?: boolean;
  id?: string;
}) {
  const refIma = useIma<HTMLAnchorElement>(0.22);
  const externo = href.startsWith("http");

  const medidas =
    tamanho === "lg"
      ? "px-6 py-4 text-[0.85rem] sm:px-11 sm:py-5 sm:text-[1rem]"
      : tamanho === "md"
        ? "px-5 py-3.5 text-[0.8rem]"
        : "px-4 py-2.5 text-[0.72rem] gap-0";

  const largura = cheio ? "w-full max-w-[420px] sm:w-auto sm:max-w-none" : "";

  const pintura =
    variante === "primario"
      ? "bg-verde text-void shadow-[0_0_40px_rgba(34,197,94,0.28)] hover:bg-fundo-verde hover:text-white hover:shadow-[0_0_56px_rgba(34,197,94,0.42)]"
      : "border border-line-forte text-ink hover:border-accent hover:text-accent";

  return (
    <a
      id={id}
      ref={ima ? refIma : undefined}
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      data-cta
      className={`group inline-flex items-center justify-center gap-3 rounded-full font-bold tracking-[0.04em] whitespace-nowrap uppercase transition-[background-color,color,border-color,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${medidas} ${largura} ${pintura} ${className}`}
    >
      <span>{children}</span>
      {/* A seta não entra no tamanho `sm`. Ela custa 28px entre ícone e gap, e
          é exatamente esse tanto que falta para a pílula da nav caber num
          aparelho de 360px sem empurrar a página para o lado. */}
      {tamanho !== "sm" ? (
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
      ) : null}
    </a>
  );
}

/**
 * Rótulo mono de seção.
 *
 * A cor vem de `--color-rotulo`, que a classe `.claro` remapeia: areia nas
 * seções escuras, terracota forte nas claras. É o mesmo componente nas duas
 * famílias, sem uma linha de condicional, e é por isso que a cor tem de vir
 * de token e nunca de hex escrito aqui.
 *
 * 13px no celular, que é o piso de legibilidade para caixa alta com tracking
 * largo; encolhe no desktop, onde ele é metadado ao lado de uma manchete
 * grande e não precisa competir.
 */
export function Olho({
  children,
  vivo = false,
  className = "",
}: {
  children: ReactNode;
  vivo?: ReactNode;
  className?: string;
}) {
  // Bloco com filhos inline, e não flex: assim o alinhamento vem do
  // text-align do pai. A página centraliza no celular e alinha à esquerda no
  // desktop, e essa peça acompanha sem precisar saber onde está.
  return (
    <p
      className={`mono text-[0.8125rem] leading-[1.9] text-rotulo sm:text-[0.7rem] ${className}`}
    >
      <span>{children}</span>
      {vivo ? (
        <span className="ml-3 inline-flex items-center gap-2 rounded-full border border-rotulo/35 px-3 py-0.5 align-middle text-rotulo">
          <span className="dot-vivo block h-1.5 w-1.5 rounded-full bg-rotulo" />
          {vivo}
        </span>
      ) : null}
    </p>
  );
}

/**
 * Largura de um texto em `em`, na Barlow Condensed 800 caixa alta.
 *
 * Medido no navegador: o avanço médio por caractere da face é 0,40em, estável
 * entre 0,385 e 0,412 em manchetes de 9 a 38 caracteres. 0,415 fica acima do
 * pior caso medido, porque a estimativa nunca pode ficar CURTA: curta demais
 * estoura a linha, larga demais só deixa o título um fio menor. A regra ainda
 * guarda 8px de folga além do padding, como segunda rede.
 *
 * É isso que permite resolver em CSS puro o que normalmente exigiria medir
 * texto em JavaScript. Ver a regra `.curta`, em globals.css.
 */
function larguraEm(texto: string) {
  return +(texto.length * 0.415).toFixed(2);
}

/**
 * Manchete de seção.
 *
 * Uma palavra destacada por manchete, nunca duas: com duas o olho não sabe
 * qual é a promessa e o destaque vira zebra. O destaque é AZUL, nunca verde,
 * porque verde na página é só o botão de compra.
 *
 * Dois modos para o celular, e toda manchete usa um deles:
 *
 * · `umaLinha`, para manchete CURTA (até ~32 caracteres): abaixo de sm as
 *   linhas viram texto corrido e o corpo da fonte encolhe até o título caber
 *   inteiro numa linha só.
 * · `flui`, para manchete LONGA: abaixo de sm as quebras escritas à mão são
 *   ignoradas e o texto corre natural, fechando em até três linhas. Mantê-las
 *   faria cada linha do desktop quebrar de novo, e a manchete viraria cinco.
 */
export function Manchete({
  linhas,
  destaque,
  fim = [],
  className = "",
  umaLinha = false,
  flui = false,
  as: Tag = "h2",
}: {
  linhas: string[];
  destaque?: string;
  fim?: string[];
  className?: string;
  /** Manchete curta: uma linha só no celular, corpo ajustado para caber. */
  umaLinha?: boolean;
  /** Manchete longa: no celular ignora as quebras escritas e corre natural. */
  flui?: boolean;
  as?: "h1" | "h2";
}) {
  const partes: ReactNode[] = [
    ...linhas,
    ...(destaque
      ? [
          <span key="d" className="text-accent">
            {destaque}
          </span>,
        ]
      : []),
    ...fim,
  ];

  const inteiro = [...linhas, destaque ?? "", ...fim].filter(Boolean).join(" ");

  return (
    <Tag
      className={`display ${umaLinha ? "curta" : ""} ${flui ? "flui" : ""} ${className}`}
      style={
        umaLinha ? ({ "--em": larguraEm(inteiro) } as React.CSSProperties) : undefined
      }
    >
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
 * Máscara de recorte na base da foto, para ela fundir no fundo em vez de
 * terminar numa aresta reta.
 *
 * É `mask-image`, não uma camada de cor por cima: recorta a opacidade e não
 * encosta no matiz. A foto continua com a cor real dela até o último pixel
 * que aparece.
 */
const MASCARA = {
  maskImage:
    "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 88%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 88%, transparent 100%)",
} as const;

/**
 * Foto, na cor real dela.
 *
 * NENHUM tratamento de cor: sem duotone, sem grayscale, sem `filter`, sem
 * `mix-blend-mode`, sem véu azul ou navy por cima. O cliente reprovou o
 * duotone, e a razão é boa: o Charllove precisa parecer uma pessoa de verdade
 * numa quadra de verdade, não um recorte de identidade visual.
 *
 * Onde houver texto por cima da imagem, o escurecimento é PRETO, nunca
 * colorido, e fica em quem posiciona o texto, não aqui dentro.
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
        style={desbota ? MASCARA : undefined}
      />
    </div>
  );
}

/**
 * Linha de preço. Aparece sob o CTA do hero, na barra fixa do celular e no
 * bloco da oferta; é uma peça só para os três lugares não divergirem.
 */
export function LinhaPreco({ className = "" }: { className?: string }) {
  // Mesma razão do Olho: bloco com filhos inline, para herdar o alinhamento.
  // Os separadores são o ponto médio e não um fio de 1px, que em linha
  // quebrada no celular ficaria pendurado no fim da primeira linha.
  return (
    <p
      className={`mono text-[0.8125rem] leading-[1.8] text-mute sm:text-[0.68rem] ${className}`}
    >
      <span className="whitespace-nowrap">
        {oferta.parcelasQtd} de {oferta.parcelasValor}
      </span>
      <span aria-hidden="true"> · </span>
      <span className="whitespace-nowrap">{oferta.garantiaDias} dias de garantia</span>
      <span aria-hidden="true"> · </span>
      <span className="whitespace-nowrap">acesso na hora</span>
    </p>
  );
}

/**
 * Card com spotlight: um gradiente azul suave segue o cursor e a borda
 * acende. Azul, não verde: verde na página é só o botão de compra. Serve para
 * dizer "isto aqui responde ao seu toque". A regra visual mora em .spot; sem
 * JS o card continua legível, só não acende.
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
