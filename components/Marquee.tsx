import { pilares } from "@/lib/content";

/**
 * Faixa infinita de pilares.
 *
 * Faixa de AREIA com texto navy: é a primeira quebra clara da página, logo
 * depois do hero, e serve para dizer de cara que o site não é só navy.
 *
 * Duas cópias da lista e uma translação de -50%: a emenda cai fora da tela e
 * o laço fica invisível. As palavras alternam entre cheia e vazada, o que dá
 * ritmo sem acrescentar cor nova.
 *
 * Pausa no hover, para quem quiser de fato ler os pilares, e para de vez com
 * prefers-reduced-motion (regra em globals.css).
 */
export default function Marquee() {
  const fita = [...pilares, ...pilares, ...pilares, ...pilares];

  return (
    <section
      aria-label="Pilares do método"
      className="marquee-pai overflow-hidden border-y border-areia-quente bg-areia py-5 sm:py-7"
    >
      <div className="marquee">
        {fita.map((pilar, i) => (
          <span
            key={i}
            className={`display flex shrink-0 items-center gap-5 px-5 text-[1.5rem] text-tinta sm:gap-8 sm:px-8 sm:text-[2rem] ${
              i % 2 === 0 ? "" : "contorno-tinta"
            }`}
          >
            {pilar}
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-terracota"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
