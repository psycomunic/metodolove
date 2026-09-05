import { investimento, marca, oferta } from "@/lib/content";
import { Reveal } from "./movimento";
import CalcadaoWaves from "./rio/CalcadaoWaves";
import { Botao, Check, Escudo, Olho } from "./ui";

/**
 * Investimento.
 *
 * Coluna única e estreita: no bloco de conversão nada pode disputar o olho
 * com o preço e o botão. O preço fica COLADO no botão, sem parágrafo entre os
 * dois, porque a distância entre ler o valor e poder agir é a fricção mais
 * cara da página.
 *
 * A garantia vem depois do botão, não antes: ela é o que derruba a última
 * objeção de quem já leu o preço, e antes do botão só adiaria a decisão.
 */
export default function Oferta() {
  return (
    <section
      id="oferta"
      className="relative isolate overflow-hidden border-t border-fio-areia px-5 py-16 sm:px-8 sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[24rem] w-[24rem] -translate-x-1/2 opacity-[0.16] sm:h-[38rem] sm:w-[38rem]"
        style={{
          background: "radial-gradient(circle, #4FA3FF 0%, transparent 68%)",
          filter: "blur(140px)",
        }}
      />

      {/* Só o fio de calçadão no topo. Aqui nada pode disputar o olho com o
          preço e com o botão. */}
      <CalcadaoWaves className="absolute inset-x-0 top-0" opacidade={0.12} />

      <div className="mx-auto max-w-[42rem]">
        <Reveal className="text-center">
          <Olho>{investimento.olho}</Olho>
          <h2 className="display mt-4 text-[clamp(2.5rem,13vw,4.5rem)] text-ink sm:mt-5 sm:text-[clamp(2.5rem,7vw,4.5rem)]">
            {investimento.titulo}
          </h2>
        </Reveal>

        {/* Fio de areia de 2px no topo do card: marca a entrada do bloco de
            conversão sem acrescentar mais um contorno aceso em volta dele. */}
        <Reveal
          atraso={100}
          className="card relative mt-8 overflow-hidden border-accent/45 p-6 shadow-[0_0_80px_-30px_rgba(79,163,255,0.5)] sm:mt-10 sm:p-10"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px] bg-areia/70"
          />
          <ul className="space-y-4 text-left">
            {investimento.inclusos.map((item) => (
              <li key={item} className="flex gap-3.5">
                <Check className="mt-1 h-5 w-5 text-accent" />
                <span className="text-[1rem] leading-[1.55] text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center border-t border-line pt-7 text-center sm:mt-10 sm:pt-8">
            <p className="mono text-[0.8125rem] text-fraco line-through sm:text-[0.7rem]">
              de {oferta.precoCheio}
            </p>
            <p className="placar mt-3 text-[clamp(2.5rem,13vw,4.5rem)] text-ink">
              {oferta.parcelasQtd} de {oferta.parcelasValor}
            </p>
            <p className="mt-2 text-[1rem] text-mute">ou {oferta.preco} à vista</p>

            <Botao href={marca.checkout} ima cheio className="mt-7" id="cta-oferta">
              {investimento.cta}
            </Botao>

            <p className="mono mt-4 text-[0.8125rem] leading-[1.7] text-fraco sm:text-[0.62rem]">
              {investimento.microcopy}
            </p>
          </div>

          <p className="mt-7 border-t border-line pt-6 text-center text-[1rem] leading-[1.6] text-mute sm:mt-8 sm:pt-7 sm:text-[0.92rem]">
            {investimento.ancora}
          </p>
        </Reveal>

        <Reveal atraso={140} className="card mt-4 p-6 sm:p-9">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left">
            <Escudo className="h-8 w-8 shrink-0 text-accent sm:mt-0.5" />
            <div>
              <h3 className="display text-[1.35rem] text-ink sm:text-[1.6rem]">
                {investimento.garantia.titulo}
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.6] text-mute sm:text-[0.95rem]">
                {investimento.garantia.texto}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
