import { pilares } from "@/lib/content";

/**
 * Faixa infinita de pilares.
 *
 * Duas cópias da lista e uma translação de -50%: a emenda cai fora da tela e
 * o laço fica invisível. As palavras alternam entre cheia e vazada em verde,
 * o que dá ritmo sem acrescentar cor nova à página.
 *
 * Pausa no hover, para quem quiser de fato ler os cinco pilares, e para de vez
 * com prefers-reduced-motion (regra em globals.css).
 */
export default function Marquee() {
  const fita = [...pilares, ...pilares, ...pilares, ...pilares];

  return (
    <section
      aria-label="Pilares do método"
      className="marquee-pai overflow-hidden border-y border-line bg-navy py-7"
    >
      <div className="marquee">
        {fita.map((pilar, i) => (
          <span
            key={i}
            className={`display flex shrink-0 items-center gap-8 px-8 text-[1.6rem] sm:text-[2rem] ${
              i % 2 === 0 ? "text-ink" : "contorno"
            }`}
          >
            {pilar}
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-verde"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
