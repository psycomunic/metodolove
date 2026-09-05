import { useId } from "react";

/**
 * Cristo Redentor de frente, desenhado a partir das fotos e das silhuetas
 * clássicas do monumento: cabeça pequena e levemente baixa, braços quase na
 * horizontal, as mangas caindo do braço coladas ao corpo, cintura marcada e a
 * túnica abrindo até a base sobre o pedestal escalonado.
 *
 * Em cor de pedra-sabão (areia → sombra quente), com as dobras em traço
 * escuro fino. Use com opacidade baixa (0.3–0.5) como fundo de seção, e nunca
 * por cima de texto.
 */
export default function CristoSilhouette({
  className = "",
  opacidade = 0.45,
}: {
  className?: string;
  opacidade?: number;
}) {
  const id = useId().replace(/:/g, "");
  const pedra = `pedra-${id}`;
  const pedraV = `pedrav-${id}`;
  const ped = `ped-${id}`;
  return (
    <svg
      viewBox="0 0 260 340"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
      className={`pointer-events-none h-full w-full ${className}`}
      opacity={opacidade}
    >
      <defs>
        <linearGradient id={pedra} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#EADCBE" />
          <stop offset="0.55" stopColor="#CDBB98" />
          <stop offset="1" stopColor="#8E7E64" />
        </linearGradient>
        <linearGradient id={pedraV} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6D6B6" />
          <stop offset="1" stopColor="#A89877" />
        </linearGradient>
        <linearGradient id={ped} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B8A88A" />
          <stop offset="1" stopColor="#6E6250" />
        </linearGradient>
      </defs>
      <g
        stroke="#3B3325"
        strokeOpacity="0.5"
        strokeWidth="0.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* pedestal */}
        <path fill={`url(#${ped})`} d="M86,340 L86,328 L174,328 L174,340 Z" />
        <path
          fill={`url(#${ped})`}
          d="M100,328 C100,300 100,284 102,268 L158,268 C160,284 160,300 160,328 Z"
        />
        <path fill={`url(#${ped})`} d="M96,268 L96,262 L164,262 L164,268 Z" />

        {/* túnica: peito largo, cintura marcada, saia abrindo até a base */}
        <path
          fill={`url(#${pedra})`}
          d="M104,262 C106,236 110,210 112,186 C114,166 116,150 118,138 C118,124 116,112 116,102 L144,102 C144,112 142,124 142,138 C144,150 146,166 148,186 C150,210 154,236 156,262 Z"
        />

        {/* mangas: o pano que pende do braço e cai colado ao corpo */}
        <path
          fill={`url(#${pedraV})`}
          d="M116,106 C108,108 100,110 92,112 C96,130 102,150 110,170 C113,176 116,180 119,182 C118,156 117,130 116,106 Z"
        />
        <path
          fill={`url(#${pedraV})`}
          d="M144,106 C152,108 160,110 168,112 C164,130 158,150 150,170 C147,176 144,180 141,182 C142,156 143,130 144,106 Z"
        />

        {/* braços: quase na horizontal, levemente caídos, mais grossos no ombro */}
        <path
          fill={`url(#${pedra})`}
          d="M116,94 C100,95 80,97 58,100 C40,102 24,104 10,106 L4,108 L6,118 C22,116 40,114 60,112 C84,110 102,108 116,107 Z"
        />
        <path
          fill={`url(#${pedra})`}
          d="M144,94 C160,95 180,97 202,100 C220,102 236,104 250,106 L256,108 L254,118 C238,116 220,114 200,112 C176,110 158,108 144,107 Z"
        />
        {/* mãos */}
        <path
          fill={`url(#${pedra})`}
          d="M10,106 C6,106 2,108 1,111 C1,115 3,118 6,118 L8,119 L6,110 Z"
        />
        <path
          fill={`url(#${pedra})`}
          d="M250,106 C254,106 258,108 259,111 C259,115 257,118 254,118 L252,119 L254,110 Z"
        />

        {/* ombros e peito */}
        <path
          fill={`url(#${pedra})`}
          d="M116,94 C114,86 120,80 130,79 C140,80 146,86 144,94 L144,107 L116,107 Z"
        />
        {/* pescoço */}
        <path fill={`url(#${pedra})`} d="M124,70 L124,82 L136,82 L136,70 Z" />
        {/* cabeça pequena, levemente inclinada para a frente, cabelo até a nuca */}
        <path
          fill={`url(#${pedra})`}
          d="M130,44 C139,44 146,51 146,61 C146,66 145,71 143,75 L117,75 C115,71 114,66 114,61 C114,51 121,44 130,44 Z"
        />
      </g>
      {/* dobras: traço escuro fino, como sombra da pedra-sabão */}
      <g
        fill="none"
        stroke="#3B3325"
        strokeOpacity="0.35"
        strokeWidth="0.9"
        strokeLinecap="round"
      >
        <path d="M122,140 C121,180 118,220 114,258" />
        <path d="M130,130 C130,180 130,220 130,258" />
        <path d="M138,140 C139,180 142,220 146,258" />
        <path d="M112,180 C110,210 108,240 106,258" />
        <path d="M148,180 C150,210 152,240 154,258" />
        <path d="M96,120 C100,132 106,144 112,154" />
        <path d="M164,120 C160,132 154,144 148,154" />
        <path d="M60,104 C60,108 60,112 60,114" />
        <path d="M200,104 C200,108 200,112 200,114" />
      </g>
    </svg>
  );
}
