/**
 * Cristo Redentor isolado, de frente.
 *
 * Proporções do monumento real: 30 m de estátua sobre 8 m de pedestal, e
 * envergadura de 28 m contra 30 m de altura, ou seja, a figura cabe quase num
 * quadrado. É por isso que o Cristo lido de longe é uma CRUZ LARGA e não uma
 * pessoa alta: quem desenha os braços curtos demais perde a silhueta.
 *
 * Aqui: figura de 240 unidades, pedestal de 62, envergadura de 224.
 *
 * O manto alarga da altura do peito para baixo. Reto ele vira um "T" de
 * sinalização; a queda é o que devolve a pedra-sabão.
 *
 * Os braços têm um arco levíssimo para cima. Uma barra reta lê como sinal de
 * trânsito; o arco devolve a queda do manto sem virar desenho de anatomia.
 */
export default function CristoSilhouette({
  className = "",
  opacidade = 0.15,
}: {
  className?: string;
  opacidade?: number;
}) {
  return (
    <svg
      viewBox="0 0 260 320"
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
      fill="currentColor"
      opacity={opacidade}
    >
      {/* cabeça */}
      <circle cx="130" cy="33" r="15" />
      {/* tronco e manto, alargando até os pés */}
      <path
        d="M113,44 C107,51 103,58 101,68
           L92,224 C90,234 92,241 100,241
           L160,241 C168,241 170,234 168,224
           L159,68 C157,58 153,51 147,44 Z"
      />
      {/* braços */}
      <path
        d="M18,64 C58,61 98,58 130,58 C162,58 202,61 242,64
           L242,90 C202,87 162,85 130,85 C98,85 58,87 18,90 Z"
      />
      {/* pedestal e plinto */}
      <path d="M98,241 L162,241 L168,289 L92,289 Z" />
      <path d="M80,289 L180,289 L180,303 L80,303 Z" />
    </svg>
  );
}
