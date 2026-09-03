const dizeres = [
  "fundamento antes de firula",
  "areia todo dia",
  "leitura de jogo",
  "do racha ao circuito",
  "paixão vira profissão",
];

/** Faixa de dizeres em movimento — vocabulário de cartaz de torneio. */
export default function Faixa() {
  return (
    <div className="overflow-hidden border-y border-mar-800 bg-mar-950 py-3">
      <div className="faixa-corre">
        {[0, 1].map((volta) => (
          <div
            key={volta}
            className="flex shrink-0 items-center"
            aria-hidden={volta === 1}
          >
            {dizeres.map((d) => (
              <span
                key={d}
                className="rotulo flex items-center gap-6 px-6 whitespace-nowrap text-areia-200/60"
              >
                {d}
                <span className="h-1 w-1 rounded-full bg-sol-500" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
