import { mecanismo } from "@/lib/content";
import { Reveal } from "./movimento";
import CalcadaoWaves from "./rio/CalcadaoWaves";
import { CardSpot, Manchete, Olho } from "./ui";

/**
 * O mecanismo: por que método e não mais um curso de fundamento.
 *
 * É a seção que separa este produto de todo curso de futevôlei que a pessoa
 * já viu. Por isso os três pilares são cards horizontais e largos, com o
 * número grande à esquerda: lidos em sequência, eles são o argumento, não
 * uma grade de features.
 */
export default function Mecanismo() {
  return (
    <section
      id="metodo"
      className="relative border-t border-fio-areia px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      {/* Calçadão como divisor, em cima e embaixo. As ondas correm devagar
          demais para alguém ver acontecer, e é essa a intenção. */}
      <CalcadaoWaves className="absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-[80rem]">
        <header className="text-center sm:max-w-[48rem] sm:text-left">
          <Reveal>
            <Olho>{mecanismo.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={mecanismo.linhas}
            destaque={mecanismo.linhaDestaque}
            fim={mecanismo.linhasFim}
            flui
            className="mt-5 text-[clamp(2rem,8.5vw,2.75rem)] text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />
          <Reveal atraso={140}>
            <p className="mx-auto mt-6 max-w-[38rem] text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-7 sm:text-[1.05rem]">
              {mecanismo.texto}
            </p>
          </Reveal>
        </header>

        <ol className="mt-10 flex flex-col gap-4 sm:mt-14">
          {mecanismo.pilares.map((pilar, i) => (
            <Reveal as="li" key={pilar.n} atraso={i * 80}>
              <CardSpot className="grid gap-4 p-6 text-left sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 sm:p-9">
                <span className="placar text-[2.5rem] leading-none text-areia/60 sm:text-[4rem]">
                  {pilar.n}
                </span>
                <div>
                  <h3 className="display text-[1.5rem] text-ink sm:text-[1.75rem]">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-3 max-w-[46rem] text-[1rem] leading-[1.65] text-mute">
                    {pilar.texto}
                  </p>
                </div>
              </CardSpot>
            </Reveal>
          ))}
        </ol>

        <Reveal atraso={100}>
          <p className="display mx-auto mt-12 max-w-[42rem] text-center text-[clamp(1.35rem,6vw,2.15rem)] text-ink sm:mt-14">
            {mecanismo.fecho}
          </p>
        </Reveal>
      </div>

      <CalcadaoWaves className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
