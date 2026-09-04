import { capacidades } from "@/lib/content";
import { LinhasReveal } from "./movimento";
import { CabecalhoSecao, Reveal } from "./ui";

/**
 * O que a pessoa passa a saber fazer.
 *
 * Era uma pilha de seis linhas de largura inteira, todas com o mesmo desenho:
 * número, título, texto. Seis vezes a mesma coisa lê como tabela, cansa antes
 * do fim e desperdiça a metade direita em cada linha.
 *
 * Agora é grade de dois por três. O número deixou de ser um dígito pequeno na
 * lateral e virou marca d'água vazada atrás do conteúdo, grande o bastante
 * para dar peso à célula sem disputar leitura com o título. Os fios formam a
 * grade em vez de empilhar traços.
 *
 * NÃO transforme isto de volta numa lista de módulos. O cliente decidiu em
 * set/2026 que a estrutura do curso não aparece na página: índice convida à
 * comparação aula a aula e não diz nada sobre o que muda para quem compra.
 */
export default function Metodo() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-areia-100 py-14 sm:py-20">
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

        <div className="fio mt-14 grid border-t sm:grid-cols-2">
          {capacidades.map((pilar, i) => (
            <Reveal
              key={pilar.n}
              atraso={i * 55}
              className={`fio border-b ${i % 2 === 0 ? "sm:border-r" : ""}`}
            >
              <article className="group relative isolate overflow-hidden px-0 py-8 sm:px-9 sm:py-10">
                {/* Marca d'água: o número dá peso à célula sem competir com o
                    título, porque é vazado e fica atrás. */}
                <span
                  aria-hidden="true"
                  className="placar contorno pointer-events-none absolute -top-4 right-1 text-[6.5rem] leading-none text-areia-300 transition-colors duration-500 select-none group-hover:text-sol-400 sm:right-4 sm:text-[8.5rem]"
                >
                  {pilar.n}
                </span>

                <h3 className="display relative max-w-[13ch] text-[1.55rem] text-tinta sm:text-[1.9rem]">
                  {pilar.titulo}
                </h3>
                <p className="rotulo relative mt-2 text-noite-600">{pilar.resumo}</p>

                <p className="relative mt-5 max-w-[30rem] text-[0.95rem] leading-[1.68] text-tinta/68">
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
