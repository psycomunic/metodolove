import { publico } from "@/lib/content";
import { Reveal } from "./movimento";
import { Check, Manchete, Olho, Xis } from "./ui";

/**
 * O filtro.
 *
 * A coluna da direita não é enfeite de honestidade: ela existe para afastar
 * quem quer aprender a JOGAR, que é o comprador errado deste produto e a
 * origem quase certa de pedido de reembolso e review ruim. Vender menos aqui
 * sai mais barato do que vender errado.
 */
export default function Publico() {
  return (
    <section
      id="filtro"
      className="border-t border-line bg-navy px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[80rem]">
        <header className="text-center sm:max-w-[46rem] sm:text-left">
          <Reveal>
            <Olho>{publico.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={publico.linhas}
            destaque={publico.linhaDestaque}
            fim={publico.linhasFim}
            umaLinha
            className="mt-5 text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />
          <Reveal atraso={140}>
            <p className="mx-auto mt-6 max-w-[38rem] text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-7">
              {publico.texto}
            </p>
          </Reveal>
        </header>

        <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-2">
          <Reveal className="card p-6 text-left sm:p-9">
            <h3 className="mono text-[0.8125rem] text-accent sm:text-[0.7rem]">
              É pra você se…
            </h3>
            <ul className="mt-5 space-y-4 sm:mt-6">
              {publico.eh.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <Check className="mt-1 h-5 w-5 text-accent" />
                  <span className="text-[1rem] leading-[1.55] text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal atraso={90} className="card border-dashed p-6 text-left sm:p-9">
            <h3 className="mono text-[0.8125rem] text-fraco sm:text-[0.7rem]">
              Não é pra você se…
            </h3>
            <ul className="mt-5 space-y-4 sm:mt-6">
              {publico.naoEh.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <Xis className="mt-1 h-5 w-5 text-fraco" />
                  <span className="text-[1rem] leading-[1.55] text-mute">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal atraso={80}>
          <p className="mx-auto mt-8 max-w-[42rem] text-center text-[1rem] leading-[1.6] text-mute italic sm:mx-0 sm:mt-10 sm:text-left">
            {publico.remate}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
