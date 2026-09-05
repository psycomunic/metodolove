import { mercado } from "@/lib/content";
import { Contador, Reveal } from "./movimento";
import FutevoleiBall from "./rio/FutevoleiBall";
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
      className="border-t border-line bg-navy px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-[80rem]">
        {/* A bola boia ao lado da manchete, só onde há coluna sobrando. */}
        <FutevoleiBall className="pointer-events-none absolute top-0 right-0 hidden h-40 w-40 text-ink lg:block" />

        <header className="text-center sm:max-w-[46rem] sm:text-left">
          <Reveal>
            <Olho>{mercado.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={mercado.linhas}
            destaque={mercado.linhaDestaque}
            flui
            className="mt-5 text-[clamp(2rem,8.5vw,2.75rem)] text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />
          {/* Onde o esporte nasceu, na mesma areia. É a linha que amarra o
              dado de mercado ao lugar. */}
          <Reveal atraso={100}>
            <p className="mono mt-6 text-[0.8125rem] leading-[1.8] text-fraco sm:mt-7 sm:text-[0.66rem]">
              {mercado.origem}
            </p>
          </Reveal>
        </header>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {mercado.numeros.map((n, i) => (
            <Reveal
              key={n.fonte + n.valor}
              atraso={i * 90}
              className="bg-card p-6 text-left sm:p-8"
            >
              <dt className="placar text-[clamp(2.5rem,12vw,3.6rem)] text-accent">
                <Contador valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} />
              </dt>
              <dd className="mt-3 text-[1rem] leading-[1.55] text-mute sm:mt-4 sm:text-[0.92rem]">
                {n.rotulo}
                <span className="mono mt-3 block text-[0.8125rem] text-fraco sm:mt-4 sm:text-[0.6rem]">
                  {n.fonte}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal atraso={120}>
          <p className="mx-auto mt-10 max-w-[38rem] text-center text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-12 sm:text-left sm:text-[1.05rem]">
            {mercado.texto}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
