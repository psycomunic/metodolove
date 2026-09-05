import { modulos } from "@/lib/content";
import { Reveal } from "./movimento";
import { CardSpot, Manchete, Olho } from "./ui";

/**
 * O que você passa a saber fazer.
 *
 * Bento de 3x2 com o bônus ocupando duas colunas embaixo. O card do bônus é o
 * único da página com borda verde, e é assim que ele diz "isto vem junto" sem
 * precisar de selo, adesivo ou fita de "grátis".
 *
 * Cada card carrega o rótulo MÓDULO 0N em mono, o título e uma linha de
 * resumo antes do texto: quem varre a página lendo só os resumos ainda
 * entende o curso inteiro.
 *
 * TODO asset: `public/bonus-networking.webp` (o mockup da caixa) está fora
 * daqui de propósito. O arquivo tem fundo BRANCO chapado, e nenhum modo de
 * mistura resolve isso sobre navy: multiply come o lettering creme da caixa e
 * screen mantém o branco. Assim que existir uma versão em PNG com fundo
 * transparente, ela entra à direita deste card.
 */
export default function Modulos() {
  return (
    <section
      id="modulos"
      className="border-t border-line bg-navy px-5 py-20 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[80rem]">
        <header className="max-w-[50rem]">
          <Reveal>
            <Olho>{modulos.olho}</Olho>
          </Reveal>
          <Manchete
            linhas={modulos.linhas}
            destaque={modulos.linhaDestaque}
            className="mt-6 text-[clamp(2.25rem,5.4vw,4rem)] text-ink"
          />
        </header>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modulos.itens.map((item, i) => (
            <Reveal as="li" key={item.n} atraso={(i % 3) * 80}>
              <CardSpot className="flex h-full flex-col p-7">
                <p className="mono text-[0.66rem] text-mute">Módulo {item.n}</p>
                <h3 className="display mt-4 text-[1.5rem] text-ink">{item.titulo}</h3>
                {/* Duas linhas reservadas a partir de sm: sem isso o fio abaixo do
                    resumo cai numa altura diferente em cada card da linha, e a
                    grade lê como desalinhada. */}
                <p className="mt-2 text-[0.86rem] leading-snug font-semibold text-mute sm:min-h-[2.6em]">
                  {item.resumo}
                </p>
                <p className="mt-4 border-t border-line pt-4 text-[0.93rem] leading-[1.62] text-mute">
                  {item.texto}
                </p>
              </CardSpot>
            </Reveal>
          ))}

          <Reveal as="li" className="sm:col-span-2 lg:col-span-3">
            <div className="card relative h-full overflow-hidden border-verde/45 p-7 sm:p-9">
              {/* Glow curto no canto: dá volume ao card sem pintar área. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-25"
                style={{
                  background: "radial-gradient(circle, #22C55E 0%, transparent 70%)",
                  filter: "blur(70px)",
                }}
              />
              <p className="mono text-[0.66rem] text-glow">{modulos.bonus.n}</p>
              <h3 className="display mt-4 text-[1.75rem] text-ink sm:text-[2.1rem]">
                {modulos.bonus.titulo}
              </h3>
              <p className="mt-3 max-w-[42rem] text-[0.97rem] leading-[1.62] text-mute">
                {modulos.bonus.texto}
              </p>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
