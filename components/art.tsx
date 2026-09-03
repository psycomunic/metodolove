/**
 * Ilustrações vetoriais autorais da página.
 * Silhueta inspirada no recorte da Baía de Guanabara:
 * Corcovado à esquerda, Morro da Urca e Pão de Açúcar à direita.
 */

export type CamadaRio = "fundo" | "meio" | "frente" | "tudo";

/**
 * Recorte da Baía de Guanabara: Corcovado à esquerda, Morro da Urca e
 * Pão de Açúcar à direita, com o cabo do bondinho entre eles.
 *
 * As camadas são separáveis para que o scroll as mova em velocidades
 * diferentes — a profundidade vem da geografia real, não de um efeito solto.
 */
export function SilhuetaRio({
  className = "",
  cor = "currentColor",
  camada = "tudo",
  style,
}: {
  className?: string;
  cor?: string;
  camada?: CamadaRio;
  style?: React.CSSProperties;
}) {
  const mostra = (c: CamadaRio) => camada === "tudo" || camada === c;

  return (
    <svg
      viewBox="0 0 1200 260"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {mostra("fundo") && (
        <>
          {/* serra distante */}
          <g fill={cor} opacity="0.28">
            <path d="M0 260 L0 214 C 44 196 92 158 138 150 C 190 141 232 168 276 186 C 322 205 366 200 412 188 C 470 173 520 190 566 205 C 612 220 664 214 712 200 C 772 183 832 196 884 212 C 940 229 1010 222 1064 206 C 1112 192 1160 196 1200 208 L1200 260 Z" />
          </g>

          {/* Corcovado, com o Cristo no topo */}
          <g fill={cor} opacity="0.55">
            <path d="M96 260 C 132 232 182 176 224 126 L 236 111 L 249 127 C 292 178 342 232 376 260 Z" />
            <rect x="234.2" y="92" width="3.6" height="20" rx="1.4" />
            <rect x="228" y="98" width="16" height="3.2" rx="1.6" />
          </g>
        </>
      )}

      {mostra("meio") && (
        <>
          <g fill={cor} opacity="0.45">
            <path d="M330 260 C 366 236 402 200 448 190 C 496 180 534 202 566 226 C 586 241 602 252 614 260 Z" />
          </g>

          {/* Morro da Urca */}
          <g fill={cor} opacity="0.72">
            <path d="M452 260 C 480 224 520 176 574 154 C 620 135 670 150 700 186 C 722 212 734 240 740 260 Z" />
          </g>
        </>
      )}

      {mostra("frente") && (
        <>
          {/* Pão de Açúcar e o cabo do bondinho */}
          <g fill={cor}>
            <path d="M628 260 C 650 206 686 130 740 84 C 780 50 838 46 876 80 C 930 128 962 208 978 260 Z" />
            <path
              d="M556 152 C 640 116 720 96 806 62"
              fill="none"
              stroke={cor}
              strokeWidth="2"
              opacity="0.75"
            />
            <rect
              x="676"
              y="112"
              width="26"
              height="16"
              rx="3"
              transform="rotate(-9 689 120)"
              opacity="0.9"
            />
          </g>

          <g fill={cor} opacity="0.4">
            <path d="M930 260 C 980 234 1032 206 1090 202 C 1136 199 1172 212 1200 230 L1200 260 Z" />
          </g>
        </>
      )}
    </svg>
  );
}

export function Ondas({
  className = "",
  cor = "currentColor",
}: {
  className?: string;
  cor?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 40 C 120 12 240 12 360 34 C 480 56 600 60 720 42 C 840 24 960 14 1080 30 C 1200 46 1320 56 1440 38 L1440 72 L0 72 Z"
        fill={cor}
      />
    </svg>
  );
}

export function LinhaDagua({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 26"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
      >
        <path d="M-40 8 C 60 -2 140 18 240 8 C 340 -2 420 18 520 8 C 620 -2 700 18 800 8 C 900 -2 980 18 1080 8 C 1180 -2 1260 18 1360 8 C 1420 3 1460 6 1480 8" />
        <path d="M-40 20 C 70 10 150 30 250 20 C 350 10 430 30 530 20 C 630 10 710 30 810 20 C 910 10 990 30 1090 20 C 1190 10 1270 30 1370 20 C 1425 15 1465 18 1480 20" />
      </g>
    </svg>
  );
}

export function Sol({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor="#FFB061" stopOpacity="0.55" />
          <stop offset="58%" stopColor="#FF9147" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#F2762E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="disco" cx="46%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#FFF0D2" />
          <stop offset="52%" stopColor="#FFC46A" />
          <stop offset="100%" stopColor="#FF8A3C" />
        </radialGradient>
      </defs>
      {/* brilho difuso do fim de tarde */}
      <circle
        cx="110"
        cy="110"
        r="108"
        fill="url(#halo)"
        style={{ mixBlendMode: "screen" }}
      />
      {/* disco solar: opaco, para ler como sol e não como mancha */}
      <circle cx="110" cy="110" r="44" fill="url(#disco)" />
    </svg>
  );
}

/** Textura de areia: pontinhos irregulares. */
export function Areia({ className = "" }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="graosAreia" width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="7" r="1.1" />
          <circle cx="19" cy="3" r="0.8" />
          <circle cx="28" cy="14" r="1" />
          <circle cx="10" cy="22" r="0.9" />
          <circle cx="24" cy="28" r="1.2" />
          <circle cx="2" cy="31" r="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#graosAreia)" />
    </svg>
  );
}

/** Bola de futevôlei estilizada (gomos). */
export function Bola({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        d="M60 8 C 34 34 34 86 60 112 M60 8 C 86 34 86 86 60 112 M10 46 C 42 58 78 58 110 46 M12 76 C 44 66 76 66 108 76"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        opacity="0.7"
      />
    </svg>
  );
}
