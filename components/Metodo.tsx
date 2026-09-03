import { capacidades } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { Reveal, Rotulo } from "./ui";

/**
 * O que a pessoa passa a saber fazer, em forma de placar de torneio:
 * coluna de números tabulares, fios de 1px, sem card. É o gesto memorável
 * da página.
 *
 * NÃO transforme isto de volta numa lista de módulos. O cliente decidiu em
 * set/2026 que a estrutura do curso não aparece na página: índice convida à
 * comparação aula a aula e não diz nada sobre o que muda para quem compra.
 */
export default function Metodo() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-areia-100 py-24 sm:py-32">
      <span
        aria-hidden="true"
        className="display contorno pointer-events-none absolute -top-8 -right-6 hidden text-[16rem] leading-none select-none lg:block"
      >
        06
      </span>

      <div className="relative mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="max-w-[40rem]">
          <Reveal>
            <Rotulo>O que você passa a saber fazer</Rotulo>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(1.87rem,5.62vw,3.28rem)] text-tinta">
            <LinhasReveal
              linhas={[
                "Jogar bem e ensinar bem",
                "são coisas diferentes.",
                <span key="segunda" className="text-noite-600">
                  A segunda se aprende.
                </span>,
              ]}
            />
          </h2>
          <Reveal atraso={130}>
            <p className="mt-7 max-w-[33rem] text-[1rem] leading-[1.68] text-tinta/70">
              Quem joga há anos costuma travar na primeira aula que dá. Não por falta de
              técnica — por não ter método para ensinar. É esse método que está aqui,
              organizado em seis frentes.
            </p>
          </Reveal>
        </div>

        {/* placar */}
        <div className="fio mt-16 border-t">
          {capacidades.map((pilar, i) => (
            <Reveal key={pilar.n} atraso={i * 55}>
              <article className="group fio grid grid-cols-[3.2rem_1fr] items-baseline gap-x-5 border-b py-7 transition-colors duration-300 sm:grid-cols-[5rem_minmax(0,18rem)_1fr] sm:gap-x-8 sm:py-8">
                <span className="placar text-[2rem] text-areia-400 transition-colors duration-300 group-hover:text-sol-500 sm:text-[3.2rem]">
                  {pilar.n}
                </span>

                <div className="min-w-0">
                  <h3 className="display text-[1.5rem] text-tinta sm:text-[1.75rem]">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-1 text-[0.76rem] font-semibold tracking-wide text-noite-600">
                    {pilar.resumo}
                  </p>
                </div>

                <p className="col-span-2 mt-3 max-w-[34rem] text-[0.95rem] leading-[1.65] text-tinta/65 sm:col-span-1 sm:mt-0">
                  {pilar.texto}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
