import { mecanismo } from "@/lib/content";
import { Reveal } from "./movimento";
import { CardSpot, Manchete, Olho } from "./ui";

/**
 * O mecanismo: por que método e não mais um curso de fundamento.
 *
 * É a seção que separa este produto de todo curso de futevôlei que a pessoa
 * já viu. Por isso os três pilares são cards horizontais e largos, com o
 * número gigante à esquerda: lidos em sequência, eles são o argumento, não
 * uma grade de features.
 */
export default function Mecanismo() {
  return (
    <section
      id="metodo"
      className="border-t border-line px-5 py-20 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[80rem]">
        <header className="max-w-[48rem]">
          <Reveal>
            <Olho>{mecanismo.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={mecanismo.linhas}
            destaque={mecanismo.linhaDestaque}
            fim={mecanismo.linhasFim}
            className="mt-6 text-[clamp(2.25rem,5.4vw,4rem)] text-ink"
          />
          <Reveal atraso={140}>
            <p className="leitura mt-7 text-[1rem] text-mute sm:text-[1.05rem]">
              {mecanismo.texto}
            </p>
          </Reveal>
        </header>

        <ol className="mt-14 flex flex-col gap-4">
          {mecanismo.pilares.map((pilar, i) => (
            <Reveal as="li" key={pilar.n} atraso={i * 80}>
              <CardSpot className="grid gap-5 p-7 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 sm:p-9">
                <span className="placar text-[3rem] leading-none text-fraco sm:text-[4rem]">
                  {pilar.n}
                </span>
                <div>
                  <h3 className="display text-[1.5rem] text-ink sm:text-[1.75rem]">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-3 max-w-[46rem] text-[0.97rem] leading-[1.65] text-mute">
                    {pilar.texto}
                  </p>
                </div>
              </CardSpot>
            </Reveal>
          ))}
        </ol>

        <Reveal atraso={100}>
          <p className="display mx-auto mt-14 max-w-[42rem] text-center text-[clamp(1.4rem,3.2vw,2.15rem)] text-ink">
            {mecanismo.fecho}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
