import { mercado } from "@/lib/content";
import { Contador, Reveal } from "./movimento";
import BolaTroca from "./BolaTroca";
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
      className="border-t border-fio-areia bg-navy px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-[80rem]">
        {/* A bola boia à direita da manchete, e só onde há coluna sobrando: a
            headline abaixo tem teto de 60% da largura justamente para os dois
            nunca se cruzarem. */}
        {/* A posição vai num WRAPPER, e não na própria BolaTroca: a raiz dela
            já traz `relative`, e no Tailwind `relative` é emitido depois de
            `absolute`, então ganharia na cascata e a bola cairia no fluxo.

            Ela ocupa o espaço vazio à direita da manchete e DESCE por cima do
            quadro de números: a sobreposição com sombra é o que dá o 3D.

            O quanto ela desce é medido, não chutado. Em 1280, 1440 e 1920 a
            bola entra ~27px no quadro e para acima do "50 mi", e a sombra
            alcança uns 22px além dela. Descer mais escurece o número do
            último tile, que foi exatamente o que aconteceu na primeira
            tentativa. */}
        <div className="pointer-events-none absolute top-6 right-4 z-10 hidden lg:block xl:right-8">
          <BolaTroca className="h-80 w-80 xl:h-[22rem] xl:w-[22rem]" />
        </div>

        <header className="text-center sm:max-w-[46rem] sm:text-left lg:max-w-[60%]">
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

        <dl className="relative mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {mercado.numeros.map((n, i) => (
            <Reveal
              key={n.fonte + n.valor}
              atraso={i * 90}
              className="bg-card p-6 text-left sm:p-8"
            >
              <dt className="placar text-[clamp(2.5rem,12vw,3.6rem)] text-areia">
                <Contador valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} />
              </dt>
              <dd className="mt-3 text-[1rem] leading-[1.55] text-mute sm:mt-4 sm:text-[0.92rem]">
                {n.rotulo}
                <span className="mono mt-3 block text-[0.8125rem] text-areia/50 sm:mt-4 sm:text-[0.6rem]">
                  {n.fonte}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Celular: a bola entra DEPOIS dos números, centralizada. Ao lado da
            manchete numa coluna de 350px ela não caberia sem espremer o
            título. */}
        <Reveal atraso={80} className="mt-10 flex justify-center lg:hidden">
          <BolaTroca className="h-40 w-40" />
        </Reveal>

        <Reveal atraso={120}>
          <p className="mx-auto mt-10 max-w-[38rem] text-center text-[1rem] leading-[1.6] text-mute sm:mx-0 sm:mt-12 sm:text-left sm:text-[1.05rem]">
            {mercado.texto}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
