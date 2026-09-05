import { dor } from "@/lib/content";
import { Reveal } from "./movimento";
import RedeFutevolei from "./rio/RedeFutevolei";
import { CardSpot, Manchete, Olho } from "./ui";

/**
 * Onde o professor trava.
 *
 * No desktop a manchete fica presa (sticky) enquanto os quatro cards rolam ao
 * lado: a acusação continua na tela o tempo todo em que a pessoa se reconhece
 * nos exemplos, que é exatamente o efeito que se quer aqui. No celular vira
 * pilha simples, com o cabeçalho centralizado e o texto dos cards alinhado à
 * esquerda: cabeçalho centralizado organiza a entrada da seção, parágrafo
 * centralizado atrapalha a leitura.
 *
 * A numeração é mono e nua. Nada de quadrado ou chapa em volta do número: o
 * cliente reprovou essa direção duas vezes.
 */
export default function Dor() {
  const total = String(dor.itens.length).padStart(2, "0");

  return (
    <section
      id="dor"
      className="claro relative isolate overflow-hidden bg-creme px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      {/* A quadra é uma FAIXA na borda direita, não um fundo atrás dos cards:
          textura por baixo de texto foi o que o cliente reprovou. Só entra em
          telas largas o bastante para haver margem sobrando. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-14rem] -z-10 hidden h-[30rem] w-[30rem] -translate-y-1/2 text-areia-quente xl:block"
      >
        <RedeFutevolei opacidade={0.12} />
      </div>
      <div className="mx-auto grid max-w-[80rem] gap-10 sm:gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-20">
        <header className="text-center sm:text-left lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Olho>{dor.olho}</Olho>
          </Reveal>

          <Manchete
            linhas={dor.linhas}
            destaque={dor.linhaDestaque}
            flui
            className="mt-5 text-[clamp(2rem,8.5vw,2.75rem)] text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />

          <Reveal atraso={140}>
            <p className="mx-auto mt-6 max-w-[38rem] text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-7">
              {dor.texto}
            </p>
          </Reveal>
        </header>

        <ol className="flex flex-col gap-4 sm:gap-5">
          {dor.itens.map((item, i) => (
            <Reveal as="li" key={item.titulo} atraso={i * 70}>
              <CardSpot className="p-6 text-left sm:p-9">
                {/* Dourado puro sobre creme não passa em AA num rótulo de
                    13px. A versão escurecida abaixo passa e mantém o calor. */}
                <p className="mono text-[0.8125rem] text-[#9A6F24] sm:text-[0.7rem]">
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-[#9A6F24]/45">/{total}</span>
                </p>
                <h3 className="display mt-3 text-[1.5rem] text-ink sm:mt-4 sm:text-[1.85rem]">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.65] text-mute sm:mt-3.5">
                  {item.texto}
                </p>
              </CardSpot>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal atraso={80}>
        <p className="display mx-auto mt-14 max-w-[46rem] text-center text-[clamp(1.5rem,6.5vw,2.5rem)] text-ink sm:mt-24">
          {dor.fechoAntes} <span className="text-accent">{dor.fechoDestaque}</span>
          {dor.fechoDepois}
        </p>
      </Reveal>
    </section>
  );
}
