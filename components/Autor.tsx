import { autor, marca } from "@/lib/content";
import { Reveal } from "./movimento";
import { Foto, Manchete, Olho } from "./ui";

/**
 * Quem ensina.
 *
 * A foto ocupa a coluna esquerda inteira e é tratada em duotone navy, como
 * toda imagem da página, para não abrir um buraco colorido no meio do
 * sistema. A citação é a tese do produto em uma linha e por isso vem em
 * display, não em itálico de blockquote.
 */
export default function Autor() {
  return (
    <section
      id="charllove"
      className="border-t border-line px-5 py-20 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[80rem] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line">
            <Foto
              src={autor.foto}
              alt={`${autor.nome}, criador do ${marca.nome}`}
              arte={autor.fotoArte}
              desbota={false}
            />
          </div>
          <p className="mono mt-5 text-[0.7rem] text-mute">{marca.instagramHandle}</p>
        </Reveal>

        <div>
          <Reveal>
            <Olho>{autor.olho}</Olho>
          </Reveal>

          <Manchete
            linhas={autor.linhas}
            destaque={autor.linhaDestaque}
            className="mt-6 text-[clamp(2.25rem,5.4vw,4rem)] text-ink"
          />

          <div className="mt-8 space-y-5">
            {autor.paragrafos.map((p, i) => (
              <Reveal key={i} atraso={i * 60} as="p">
                <span className="block max-w-[40rem] text-[1rem] leading-[1.66] text-mute">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal atraso={80}>
            <blockquote className="mt-10 border-l-2 border-verde pl-6">
              <p className="display text-[clamp(1.3rem,2.8vw,1.9rem)] text-ink">
                “{autor.citacao}”
              </p>
              <cite className="mono mt-4 block text-[0.66rem] text-mute not-italic">
                {autor.nome}
              </cite>
            </blockquote>
          </Reveal>

          <Reveal atraso={120}>
            <ul className="mono mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6 text-[0.62rem] text-fraco">
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
