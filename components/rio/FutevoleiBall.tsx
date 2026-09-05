import { useId } from "react";

/**
 * Bola de futevôlei: 32 gomos vistos de frente, um pentágono central e cinco
 * vizinhos, com sombra e brilho para ter volume. Couro em areia, gomos em
 * navy. O pai controla flutuação e rotação (classes .boia e .gira).
 */
export default function FutevoleiBall({
  className = "",
  opacidade = 1,
}: {
  className?: string;
  opacidade?: number;
}) {
  const id = useId().replace(/:/g, "");
  const bola = `bola-${id}`;
  const sombra = `sombra-${id}`;
  return (
    <div className={`boia ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className="gira h-full w-full"
        style={{ opacity: opacidade }}
      >
        <defs>
          <radialGradient id={bola} cx="0.38" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#FFF6E0" />
            <stop offset="0.55" stopColor="#E9D8B4" />
            <stop offset="1" stopColor="#8E7E64" />
          </radialGradient>
          <radialGradient id={sombra} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.35" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="182" rx="56" ry="9" fill={`url(#${sombra})`} />
        <circle cx="100" cy="100" r="78" fill={`url(#${bola})`} />
        {/* pentágono central e cinco vizinhos, como bola de 32 gomos vista de frente */}
        <g
          fill="#0E1F3A"
          fillOpacity="0.92"
          stroke="#0E1F3A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          <path d="M100,72 L126,91 L116,122 L84,122 L74,91 Z" />
          <path d="M100,26 C110,28 118,32 124,38 L112,52 L88,52 L76,38 C82,32 90,28 100,26 Z" />
          <path d="M164,72 C168,80 172,90 173,100 L154,110 L140,90 L150,68 Z" />
          <path d="M36,72 C32,80 28,90 27,100 L46,110 L60,90 L50,68 Z" />
          <path d="M138,166 C130,172 120,176 110,177 L104,160 L120,142 L142,148 Z" />
          <path d="M62,166 C70,172 80,176 90,177 L96,160 L80,142 L58,148 Z" />
        </g>
        {/* costuras dos hexágonos */}
        <g
          fill="none"
          stroke="#0E1F3A"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M100,72 L100,52" />
          <path d="M126,91 L150,68" />
          <path d="M74,91 L50,68" />
          <path d="M116,122 L120,142" />
          <path d="M84,122 L80,142" />
          <path d="M112,52 L140,90" />
          <path d="M88,52 L60,90" />
          <path d="M140,90 L154,110" />
          <path d="M60,90 L46,110" />
          <path d="M104,160 L96,160" />
          <path d="M154,110 L142,148" />
          <path d="M46,110 L58,148" />
        </g>
        {/* brilho */}
        <ellipse
          cx="72"
          cy="58"
          rx="16"
          ry="9"
          transform="rotate(-35 72 58)"
          fill="#fff"
          fillOpacity="0.45"
        />
      </svg>
    </div>
  );
}
