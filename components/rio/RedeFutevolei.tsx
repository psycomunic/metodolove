import { useId } from "react";

/**
 * Rede de quadra de areia, vista de um ângulo raso.
 *
 * O que faz a peça ler como rede e não como grade: a malha é de losangos e
 * não de quadrados, a faixa branca do topo é bem mais grossa que os fios, e
 * os postes passam da altura da rede. Sem a faixa do topo, vira alambrado.
 *
 * A perspectiva é sutil de propósito: um ângulo forte pediria dois pontos de
 * fuga e a peça começaria a disputar atenção com o texto, que é justamente o
 * que uma textura de fundo não pode fazer.
 */
export default function RedeFutevolei({
  className = "",
  opacidade = 0.08,
}: {
  className?: string;
  opacidade?: number;
}) {
  const malha = `malha-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 420 300"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      className={`pointer-events-none h-full w-full ${className}`}
      style={{ opacity: opacidade }}
    >
      <defs>
        <pattern
          id={malha}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
          patternTransform="skewY(-3)"
        >
          <path
            d="M9,0 L18,9 L9,18 L0,9 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* postes, mais altos que a rede */}
      <rect x="24" y="36" width="7" height="248" rx="3" fill="currentColor" />
      <rect x="389" y="52" width="7" height="232" rx="3" fill="currentColor" />

      {/* malha, na leve queda da perspectiva */}
      <path d="M31,58 L389,74 L389,206 L31,196 Z" fill={`url(#${malha})`} />

      {/* faixa branca do topo: é ela que diz que isto é uma rede */}
      <path
        d="M31,44 L389,60 L389,76 L31,60 Z"
        fill="currentColor"
        fillOpacity="0.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* fita de baixo, mais fina */}
      <path
        d="M31,192 L389,202 L389,208 L31,198 Z"
        fill="currentColor"
        fillOpacity="0.4"
      />

      {/* linha da areia */}
      <path
        d="M0,286 C90,280 200,278 300,282 C350,284 390,287 420,290"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
    </svg>
  );
}
