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
    <div className="overflow-hidden border-y-[3px] border-noite-600/50 bg-noite-950 py-3">
      <div className="faixa-corre">
        {[0, 1].map((volta) => (
          <div
            key={volta}
            className="flex shrink-0 items-center"
            aria-hidden={volta === 1}
          >
            {dizeres.map((d, i) => (
              <span
                key={d}
                className="rotulo flex items-center gap-6 px-6 whitespace-nowrap text-areia-100/70"
              >
                {d}
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    i % 2 === 0 ? "bg-sol-500" : "bg-areia-300"
                  }`}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
