import { dor } from "@/lib/content";
import { Reveal } from "./movimento";
import { CardSpot, Manchete, Olho } from "./ui";

/**
 * Onde o professor trava.
 *
 * No desktop a manchete fica presa (sticky) enquanto os quatro cards rolam ao
 * lado: a acusação continua na tela o tempo todo em que a pessoa se reconhece
 * nos exemplos, que é exatamente o efeito que se quer aqui. No celular vira
 * pilha simples, porque sticky em coluna única só rouba altura.
 *
 * A numeração é mono e nua. Nada de quadrado ou chapa em volta do número: o
 * cliente reprovou essa direção duas vezes.
 */
export default function Dor() {
  const total = String(dor.itens.length).padStart(2, "0");

  return (
    <section
      id="dor"
      className="border-t border-line px-5 py-20 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[80rem] gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-20">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Olho>{dor.olho}</Olho>
          </Reveal>

          <Manchete
            linhas={dor.linhas}
            destaque={dor.linhaDestaque}
            className="mt-6 text-[clamp(2.25rem,5.4vw,4rem)] text-ink"
          />

          <Reveal atraso={140}>
            <p className="leitura mt-7 text-[1rem] text-mute">{dor.texto}</p>
          </Reveal>
        </header>

        <ol className="flex flex-col gap-5">
          {dor.itens.map((item, i) => (
            <Reveal as="li" key={item.titulo} atraso={i * 70}>
              <CardSpot className="p-7 sm:p-9">
                <p className="mono text-[0.7rem] text-mute">
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-fraco">/{total}</span>
                </p>
                <h3 className="display mt-4 text-[1.6rem] text-ink sm:text-[1.85rem]">
                  {item.titulo}
                </h3>
                <p className="mt-3.5 text-[0.97rem] leading-[1.65] text-mute">
                  {item.texto}
                </p>
              </CardSpot>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal atraso={80}>
        <p className="display mx-auto mt-16 max-w-[46rem] text-center text-[clamp(1.6rem,3.6vw,2.5rem)] text-ink sm:mt-24">
          {dor.fechoAntes} <span className="text-glow">{dor.fechoDestaque}</span>
          {dor.fechoDepois}
        </p>
      </Reveal>
    </section>
  );
}
