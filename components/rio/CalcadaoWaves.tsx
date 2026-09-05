import { useId } from "react";

/**
 * As ondas do calçadão de Copacabana, do Burle Marx.
 *
 * O padrão real é preto e branco chapado, em faixas largas que serpenteiam
 * com transições curtas e cristas longas: não é uma senoide, é um "S"
 * esticado. Aqui a onda é um traço grosso (a faixa "preta" do calçadão) em
 * areia translúcida sobre o navy, com a faixa "branca" sendo o próprio fundo.
 *
 * Três linhas de onda por ladrilho, empilhadas com deslocamento de meio
 * período, exatamente como no chão. O ladrilho tem 240 de largura; a fila de
 * 12 ladrilhos anda -50% (seis ladrilhos) em 60 s e a emenda nunca aparece.
 */

const ONDA =
  "M-60,30 C-26,30 -34,90 0,90 C34,90 26,30 60,30 C94,30 86,90 120,90 C154,90 146,30 180,30 C214,30 206,90 240,90 C274,90 266,30 300,30";

function Ladrilho({
  altura,
  grosso,
  id,
}: {
  altura: number;
  grosso: number;
  id: string;
}) {
  return (
    <svg
      width="240"
      height={altura}
      viewBox={`0 ${60 - altura / 2} 240 ${altura}`}
      aria-hidden="true"
      className="block shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={grosso}
    >
      <g id={id}>
        <path d={ONDA} transform="translate(0,-60)" />
        <path d={ONDA} />
        <path d={ONDA} transform="translate(0,60)" />
        <path d={ONDA} transform="translate(0,120)" />
      </g>
    </svg>
  );
}

export default function CalcadaoWaves({
  className = "",
  opacidade = 0.22,
  altura = 64,
  grosso = 30,
}: {
  className?: string;
  /** 0.14–0.2 como divisor; 0.08–0.1 quando é textura de seção inteira. */
  opacidade?: number;
  /** Altura da faixa em px. 64 é o divisor; 240+ para textura de fundo. */
  altura?: number;
  /** Espessura da faixa "preta". 24 é a proporção do calçadão. */
  grosso?: number;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ opacity: opacidade, height: altura }}
    >
      <div className="ondas-correm">
        {Array.from({ length: 12 }, (_, i) => (
          <Ladrilho key={i} altura={altura} grosso={grosso} id={`${id}-${i}`} />
        ))}
      </div>
    </div>
  );
}
