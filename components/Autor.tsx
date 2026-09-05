import { autor, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import { Foto, Manchete, Olho } from "./ui";

/**
 * Quem ensina.
 *
 * A foto é a colagem do percurso dele, na COR REAL: nada de duotone, véu ou
 * filtro. O Charllove precisa parecer uma pessoa numa quadra, não um recorte
 * de identidade visual.
 *
 * A citação é a tese do produto em uma linha e por isso vem em display, não
 * em itálico de blockquote.
 */
export default function Autor() {
  return (
    <section
      id="charllove"
      className="border-t border-line px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[80rem] gap-9 sm:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <div className="mx-auto aspect-[3/4] w-full max-w-[22rem] overflow-hidden rounded-2xl border border-line lg:max-w-none">
            <Foto
              src={autor.foto}
              alt={`${autor.nome}, criador do ${marca.nome}`}
              arte={autor.fotoArte}
              desbota={false}
            />
          </div>
          <p className="mono mt-4 text-center text-[0.8125rem] text-mute sm:mt-5 sm:text-left sm:text-[0.7rem]">
            {marca.instagramHandle}
          </p>
        </Reveal>

        <div className="text-center sm:text-left">
          <Reveal>
            <Olho>{autor.olho}</Olho>
          </Reveal>

          <Manchete
            linhas={autor.linhas}
            destaque={autor.linhaDestaque}
            umaLinha
            className="mt-5 text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />

          <div className="mt-7 space-y-5 text-left sm:mt-8">
            {autor.paragrafos.map((p, i) => (
              <Reveal key={i} atraso={i * 60} as="p">
                <span className="block max-w-[40rem] text-[1rem] leading-[1.66] text-mute">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal atraso={80}>
            <blockquote className="mt-9 border-l-2 border-accent pl-5 text-left sm:mt-10 sm:pl-6">
              <p className="display text-[clamp(1.25rem,5.5vw,1.9rem)] text-ink">
                “{autor.citacao}”
              </p>
              <cite className="mono mt-4 block text-[0.8125rem] text-mute not-italic sm:text-[0.66rem]">
                {autor.nome}
              </cite>
            </blockquote>
          </Reveal>

          <Reveal atraso={120}>
            <ul className="mono mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-line pt-6 text-[0.8125rem] text-fraco sm:mt-10 sm:justify-start sm:text-[0.62rem]">
              {autor.credenciais.map((c, i) => (
                <li key={c} className="flex items-center gap-3">
                  {i > 0 ? <span aria-hidden="true">·</span> : null}
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
