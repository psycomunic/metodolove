/**
 * As ondas do calçadão de Copacabana.
 *
 * O desenho do Burle Marx é uma onda contínua de amplitude constante, não uma
 * senoide de livro: cada meia-onda é uma curva cúbica cheia, e as faixas
 * correm paralelas com amplitudes ligeiramente diferentes, o que dá o
 * movimento de água que o padrão tem no chão.
 *
 * Aqui ela é só traço em branco translúcido, nunca preenchimento: o calçadão
 * é preto e branco chapado, e chapado numa página navy viraria zebra.
 *
 * O laço: oito ladrilhos idênticos numa fila e uma translação de -50%, que
 * equivale a exatamente quatro ladrilhos. A emenda nunca aparece.
 */

/* Um ladrilho: 480 de largura, quatro meias-ondas por linha (período de 120).
   Os controles em `c` relativos garantem tangente contínua na emenda. */
function linha(y: number, a: number) {
  const sobe = `c 15,${-a} 45,${-a} 60,0`;
  const desce = `c 15,${a} 45,${a} 60,0`;
  return `M0,${y} ${sobe} ${desce} ${sobe} ${desce} ${sobe} ${desce} ${sobe} ${desce}`;
}

const LINHAS: [number, number][] = [
  [10, 5],
  [21, 6.5],
  [33, 6.5],
  [44, 5],
];

function Ladrilho() {
  return (
    <svg
      width="480"
      height="54"
      viewBox="0 0 480 54"
      aria-hidden="true"
      className="block shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {LINHAS.map(([y, a]) => (
        <path key={y} d={linha(y, a)} />
      ))}
    </svg>
  );
}

export default function CalcadaoWaves({
  className = "",
  opacidade = 0.07,
}: {
  className?: string;
  /** 6 a 8% como divisor; 5% quando é textura de seção inteira. */
  opacidade?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ opacity: opacidade }}
    >
      <div className="ondas-correm">
        {Array.from({ length: 8 }, (_, i) => (
          <Ladrilho key={i} />
        ))}
      </div>
    </div>
  );
}
