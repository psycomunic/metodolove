import { capacidades } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { CabecalhoSecao, Reveal } from "./ui";

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
    <section id="metodo" className="relative overflow-hidden bg-areia-100 py-14 sm:py-20">
      <span
        aria-hidden="true"
        className="display contorno pointer-events-none absolute -top-8 -right-6 hidden text-[16rem] leading-none select-none lg:block"
      >
        06
      </span>

      <div className="relative mx-auto max-w-[80rem] px-5 sm:px-8">
        <CabecalhoSecao
          rotulo="O que você passa a saber fazer"
          titulo={
            <h2 className="display mt-6 text-[clamp(1.87rem,5.46vw,3.04rem)] text-tinta">
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
          }
          texto="Quem joga há anos costuma travar na primeira aula que dá. Não por falta de técnica. Por não ter método para ensinar. É esse método que está aqui, organizado em seis frentes."
        />

        {/* placar */}
        <div className="fio mt-16 border-t">
          {capacidades.map((pilar, i) => (
            <Reveal key={pilar.n} atraso={i * 55}>
              <article className="group fio grid grid-cols-[auto_1fr] items-start gap-x-5 border-b py-7 sm:grid-cols-[auto_minmax(0,17rem)_1fr] sm:gap-x-8 sm:py-8">
                <span className="placa" aria-hidden="true">
                  {pilar.n}
                </span>

                <div className="min-w-0 self-center">
                  <h3 className="display text-[1.5rem] text-tinta sm:text-[1.75rem]">
                    {pilar.titulo}
                  </h3>
                  <p className="mt-1 text-[0.76rem] font-semibold tracking-wide text-noite-600">
                    {pilar.resumo}
                  </p>
                </div>

                <p className="col-span-2 mt-4 max-w-[34rem] text-[0.95rem] leading-[1.65] text-tinta/70 sm:col-span-1 sm:mt-0 sm:self-center">
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
