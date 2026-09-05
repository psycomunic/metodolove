import { modulos } from "@/lib/content";
import { Reveal } from "./movimento";
import PaoDeAcucar from "./rio/PaoDeAcucar";
import { CardSpot, Manchete, Olho } from "./ui";

/**
 * O que você passa a saber fazer.
 *
 * Bento de 3x2 com o bônus ocupando a linha inteira embaixo. O card do bônus
 * é o único da página com borda azul acesa, e é assim que ele diz "isto vem
 * junto" sem precisar de selo, adesivo ou fita de "grátis".
 *
 * Cada card carrega o rótulo MÓDULO 0N em mono, o título e uma linha de
 * resumo antes do texto: quem varre a página lendo só os resumos ainda
 * entende o curso inteiro.
 *
 * TODO asset: `public/bonus-networking.webp` (o mockup da caixa) está fora
 * daqui de propósito. O arquivo tem fundo BRANCO chapado, e sobre navy ele
 * abriria um retângulo branco no meio da seção. Assim que existir uma versão
 * em PNG com fundo transparente, ela entra à direita deste card.
 */
export default function Modulos() {
  return (
    <section id="modulos" className="escuro bg-navy px-5 py-16 sm:px-8 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[80rem]">
        <header className="text-center sm:max-w-[50rem] sm:text-left">
          <Reveal>
            <Olho>{modulos.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={modulos.linhas}
            destaque={modulos.linhaDestaque}
            flui
            className="mt-5 text-[clamp(2rem,8.5vw,2.75rem)] text-ink sm:mt-6 sm:text-[clamp(2.25rem,5.4vw,4rem)]"
          />
        </header>

        <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {modulos.itens.map((item, i) => (
            <Reveal as="li" key={item.n} atraso={(i % 3) * 80}>
              <CardSpot className="flex h-full flex-col rounded-2xl border-areia/22 p-6 text-left sm:p-7">
                <p className="mono text-[0.8125rem] text-areia sm:text-[0.66rem]">
                  Módulo {item.n}
                </p>
                <h3 className="display mt-3 text-[1.5rem] text-ink sm:mt-4">
                  {item.titulo}
                </h3>
                {/* Duas linhas reservadas a partir de sm: sem isso o fio abaixo
                    do resumo cai numa altura diferente em cada card da linha, e
                    a grade lê como desalinhada. */}
                <p className="mt-2 text-[1rem] leading-snug font-semibold text-mute sm:min-h-[2.6em] sm:text-[0.86rem]">
                  {item.resumo}
                </p>
                <p className="mt-4 border-t border-line pt-4 text-[1rem] leading-[1.6] text-mute sm:text-[0.93rem]">
                  {item.texto}
                </p>
              </CardSpot>
            </Reveal>
          ))}

          <Reveal as="li" className="sm:col-span-2 lg:col-span-3">
            <div className="card relative h-full overflow-hidden rounded-2xl border-areia/35 p-6 text-left sm:p-9">
              {/* Areia escorrendo do canto superior direito, por trás do
                  bondinho. Aquece o card sem chapar cor nenhuma. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(215deg, rgba(233,216,180,0.08) 0%, rgba(233,216,180,0.03) 32%, transparent 62%)",
                }}
              />
              {/* O bondinho sobe no canto do card de bônus. Networking é
                  justamente sobre chegar do outro lado; o desenho diz isso sem
                  precisar de metáfora escrita. */}
              <PaoDeAcucar
                className="pointer-events-none absolute right-4 bottom-0 h-32 w-44 text-areia sm:h-40 sm:w-56"
                opacidade={0.38}
              />

              <p className="mono relative text-[0.8125rem] text-areia sm:text-[0.66rem]">
                {modulos.bonus.n}
              </p>
              <h3 className="display relative mt-3 text-[1.65rem] text-ink sm:mt-4 sm:text-[2.1rem]">
                {modulos.bonus.titulo}
              </h3>
              <p className="relative mt-3 max-w-[42rem] text-[1rem] leading-[1.6] text-mute">
                {modulos.bonus.texto}
              </p>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
