/**
 * Gaivotas cruzando o céu do hero.
 *
 * Duas curvas por bicho e nada mais: em tamanho pequeno, qualquer detalhe a
 * mais vira borrão.
 *
 * As três levam os mesmos 45 s para atravessar, com atrasos diferentes: mesma
 * velocidade, posições diferentes, que é como um bando de verdade se comporta.
 * O traço é areia, para pertencer ao mesmo fim de tarde do horizonte.
 */

const BANDO = [
  { topo: "17%", escala: 1, duracao: 45, atraso: 0, opacidade: 0.5 },
  { topo: "29%", escala: 0.72, duracao: 45, atraso: -17, opacidade: 0.38 },
  { topo: "11%", escala: 0.52, duracao: 45, atraso: -31, opacidade: 0.3 },
];

export default function GaivotasLoop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {BANDO.map((g) => (
        <div
          key={g.topo}
          className="voa absolute left-0"
          style={
            {
              top: g.topo,
              opacity: g.opacidade,
              "--duracao": `${g.duracao}s`,
              "--atraso": `${g.atraso}s`,
            } as React.CSSProperties
          }
        >
          <svg
            width={34 * g.escala}
            height={12 * g.escala}
            viewBox="0 0 34 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M1,8 C6,1 12,0 17,6 C22,0 28,1 33,8" />
          </svg>
        </div>
      ))}
    </div>
  );
}
