/**
 * Gaivotas cruzando o céu do hero.
 *
 * Duas curvas por bicho e nada mais: em tamanho pequeno, qualquer detalhe a
 * mais vira borrão. A travessia leva quase um minuto, com alturas, tamanhos e
 * atrasos diferentes, para nunca lerem como uma fila.
 *
 * A regra aqui é a mesma do grão e do horizonte: quem olhar direto vê um
 * pássaro; quem não olhar não vê nada, e é assim que tem de ser numa página
 * cujo trabalho é levar ao botão.
 */

const BANDO = [
  { topo: "18%", escala: 1, duracao: 52, atraso: 0, opacidade: 0.22 },
  { topo: "31%", escala: 0.7, duracao: 64, atraso: -22, opacidade: 0.16 },
  { topo: "12%", escala: 0.5, duracao: 78, atraso: -46, opacidade: 0.13 },
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
