/**
 * Ilustrações vetoriais autorais da página.
 *
 * A silhueta do Rio (Corcovado, Urca, Pão de Açúcar) foi REMOVIDA em set/2026
 * a pedido do cliente, que vai substituí-la por imagens próprias. Os pontos
 * onde ela vivia estão marcados com ">>> SLOT DE IMAGEM" em CtaFinal e Oferta.
 */

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
