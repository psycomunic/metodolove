/**
 * Pão de Açúcar e Morro da Urca, com o bondinho subindo o cabo.
 *
 * A leitura depende de três coisas, nessa ordem: a Urca ser MENOR e estar NA
 * FRENTE (por isso ela é desenhada depois e recorta por cima), o cume do Pão
 * de Açúcar ser arredondado e não pontudo, e o cabo ligar os dois cumes. Sem
 * o cabo, são dois montes quaisquer.
 *
 * O bondinho anda pelos passos da própria curva do cabo, amostrada em t = 0,
 * ¼, ½, ¾ e 1 (ver @keyframes bondinho, em globals.css). Cabo de A=(88,139) a
 * B=(222,64), com controle em (155,116): é daí que saem os 134px de avanço e
 * os 75px de subida. Mexeu no cabo, refaça a conta.
 */
export default function PaoDeAcucar({
  className = "",
  opacidade = 0.2,
}: {
  className?: string;
  opacidade?: number;
}) {
  return (
    <svg
      viewBox="0 0 280 200"
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
      opacity={opacidade}
    >
      {/* Pão de Açúcar primeiro: é o morro de trás. */}
      <path
        fill="currentColor"
        d="M140,192 C148,166 158,132 176,106 C190,86 204,66 222,64
           C240,66 254,88 262,116 C270,144 274,170 276,192 Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1"
        d="M140,192 C148,166 158,132 176,106 C190,86 204,66 222,64
           C240,66 254,88 262,116 C270,144 274,170 276,192"
      />

      {/* Morro da Urca: menor, na frente, recortando o outro. */}
      <path
        fill="currentColor"
        d="M14,192 C30,184 46,170 60,156 C70,146 78,140 88,139
           C99,140 108,146 116,157 C127,171 138,182 148,192 Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1"
        d="M14,192 C30,184 46,170 60,156 C70,146 78,140 88,139
           C99,140 108,146 116,157 C127,171 138,182 148,192"
      />

      {/* cabo */}
      <path
        d="M88,139 Q155,116 222,64"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="0.9"
      />

      {/* Bondinho. O `translate` inicial fica num grupo POR FORA do animado:
          `transform` de CSS sobrepõe o atributo `transform` do SVG, e com os
          dois no mesmo nó o carrinho saltava para a origem do viewBox e subia
          o cabo a partir do canto. */}
      <g transform="translate(88 139)">
        <g className="bondinho">
          <path
            d="M0,-1 L0,3"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="0.9"
            fill="none"
          />
          <rect
            x="-6"
            y="3"
            width="12"
            height="8"
            rx="2.4"
            fill="currentColor"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="0.8"
          />
        </g>
      </g>
    </svg>
  );
}
