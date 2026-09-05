import { mercado } from "@/lib/content";
import { Contador, Reveal } from "./movimento";
import { Manchete, Olho } from "./ui";

/**
 * A oportunidade, em quatro números.
 *
 * Cada tile carrega a fonte visível, na própria peça. Dado de mercado sem
 * fonte numa página de vendas lê como número inventado, e aí o leitor
 * desconta os quatro de uma vez. O contador sobe ao entrar na viewport porque
 * o número É o argumento da seção: ele precisa do olho, não o parágrafo.
 */
export default function Mercado() {
  return (
    <section
      id="mercado"
      className="border-t border-line bg-navy px-5 py-20 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[80rem]">
        <header className="max-w-[46rem]">
          <Reveal>
            <Olho>{mercado.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={mercado.linhas}
            destaque={mercado.linhaDestaque}
            className="mt-6 text-[clamp(2.25rem,5.4vw,4rem)] text-ink"
          />
        </header>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {mercado.numeros.map((n, i) => (
            <Reveal
              key={n.fonte + n.valor}
              atraso={i * 90}
              className="bg-card p-7 sm:p-8"
            >
              <dt className="placar text-[clamp(2.6rem,6vw,3.6rem)] text-glow">
                <Contador valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} />
              </dt>
              <dd className="mt-4 text-[0.92rem] leading-[1.6] text-mute">
                {n.rotulo}
                <span className="mono mt-4 block text-[0.6rem] text-fraco">
                  {n.fonte}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal atraso={120}>
          <p className="leitura mt-12 text-[1rem] text-mute sm:text-[1.05rem]">
            {mercado.texto}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
