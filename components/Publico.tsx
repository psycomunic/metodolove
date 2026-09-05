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
      className="border-t border-line bg-navy px-5 py-20 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[80rem]">
        <header className="max-w-[46rem]">
          <Reveal>
            <Olho>{publico.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={publico.linhas}
            destaque={publico.linhaDestaque}
            fim={publico.linhasFim}
            className="mt-6 text-[clamp(2.25rem,5.4vw,4rem)] text-ink"
          />
          <Reveal atraso={140}>
            <p className="leitura mt-7 text-[1rem] text-mute">{publico.texto}</p>
          </Reveal>
        </header>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal className="card p-7 sm:p-9">
            <h3 className="mono text-[0.7rem] text-glow">É pra você se…</h3>
            <ul className="mt-6 space-y-4">
              {publico.eh.map((item) => (
                <li key={item} className="flex gap-4">
                  <Check className="mt-0.5 h-5 w-5 text-verde" />
                  <span className="text-[0.97rem] leading-[1.6] text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal atraso={90} className="card border-dashed p-7 sm:p-9">
            <h3 className="mono text-[0.7rem] text-fraco">Não é pra você se…</h3>
            <ul className="mt-6 space-y-4">
              {publico.naoEh.map((item) => (
                <li key={item} className="flex gap-4">
                  <Xis className="mt-0.5 h-5 w-5 text-fraco" />
                  <span className="text-[0.97rem] leading-[1.6] text-mute">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal atraso={80}>
          <p className="mt-10 max-w-[42rem] text-[0.97rem] leading-[1.6] text-mute italic">
            {publico.remate}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
