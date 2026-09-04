import { capacidades } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { CabecalhoSecao, Regua, Reveal } from "./ui";

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
    <section id="metodo" className="relative overflow-hidden bg-areia-100 py-11 sm:py-20">
      <span
        aria-hidden="true"
        className="display contorno pointer-events-none absolute -top-12 -right-12 hidden text-[28rem] leading-none select-none opacity-20 lg:block"
      >
        06
      </span>

      <div className="relative mx-auto max-w-[80rem] px-5 sm:px-8">
        <CabecalhoSecao
          rotulo="O que você passa a saber fazer"
          titulo={
            <h2 className="display mt-8 text-[clamp(2.2rem,6vw,3.6rem)] leading-none tracking-tight text-tinta">
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

        {/* Mesma anatomia da lista de travas: régua, fração, título, texto. */}
        <div className="mt-9 sm:mt-14">
          {capacidades.map((pilar, i) => (
            <Reveal key={pilar.n} atraso={i * 55} className="group block pt-7 first:pt-0">
              <Regua atual={i + 1} total={capacidades.length} />

              <div className="mt-3 sm:flex sm:items-baseline sm:gap-5">
                <h3 className="display text-[1.45rem] leading-[1.05] text-tinta sm:text-[1.95rem]">
                  {pilar.titulo}
                </h3>
                <p className="mt-1.5 text-[0.72rem] font-semibold tracking-wide text-noite-600 sm:mt-0 sm:text-[0.78rem]">
                  {pilar.resumo}
                </p>
              </div>

              <p className="mt-3 max-w-[42rem] pb-1 text-[0.92rem] leading-[1.55] text-tinta/75 sm:text-[0.98rem]">
                {pilar.texto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
